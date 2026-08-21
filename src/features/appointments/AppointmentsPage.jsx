import { useEffect, useMemo, useRef, useState } from 'react';
import InfoModal from '../../design-system/patterns/InfoModal.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import Card, { CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import AppointmentDrawer from './AppointmentDrawer.jsx';
import AppointmentRow from './AppointmentRow.jsx';
import AppointmentsRail from './AppointmentsRail.jsx';
import BookingDrawer from './BookingDrawer.jsx';
import TopicRow from './TopicRow.jsx';
import {
  bookedAppointments,
  checklistCategories,
  conversationTypes,
  failedAppointment,
  pendingRequest,
  publishedTimes,
  schedulingPublisher,
} from './data.js';
import { PORTAL_TODAY } from '../enrollment/data.js';
import {
  articled,
  availabilitySummary,
  bandFor,
  daysFor,
  failedBookings,
  splitAppointments,
  timeRequests,
  topicsInCategoryOrder,
  typeById,
} from './logic.js';

/**
 * Appointments — ENR-183, behaviour from ENR-178, and the changes of 2026-08-21
 * (`.scratch/ENR-183-appointments/appointments-changes-2026-08-21.md`, ADR 0005).
 *
 * The card is a change of register: a free date and time field becomes a picker over published
 * availability, so that booking means the conversation will happen. Since 2026-08-21 the picker has
 * a second path: when none of the published times work, the student asks the team for one, and the
 * request waits on the team, visibly, until they answer.
 *
 *   - A topic is chosen first, because the topic decides which team receives it. The list is the
 *     checklist's categories, under the checklist's names (A9).
 *   - Only published times are selectable; a team with none says so on its row before the picker
 *     can open on an empty calendar, and offers the ask instead.
 *   - A booking is confirmed or it failed. There is no third state, no optimistic row, and a
 *     failure keeps a visible record instead of vanishing. A request is a fourth thing, and it is
 *     never shown as booked.
 *
 * `loading` and `error` are the frame's and never reach this component — App renders PageSkeleton
 * and PageError before dispatching. What is left is what only this section can express: the two
 * different emptinesses the card asks us to tell apart, a half-loaded page, a team whose calendar
 * cannot be reached, and a request that is waiting.
 *
 * ## The band, and whose turn it is
 *
 * The page's one primary action band (`ActionBand`, A6) sits on the row it points at, and the rule
 * that decides which is `bandFor` in `logic.js`: a booking that never reached its team, else the
 * first topic with times when nothing is booked, else the team with no calendar while others have
 * one, else nothing. What depends on the team — a request they have not answered — is the rail's
 * conditional card instead, not the band.
 *
 * ## Two groups that close
 *
 * *Your conversations* and *Past and cancelled* are the product's disclosure (`CardHead` with a
 * toggle). The first starts open — a group that changes without the student acting starts open,
 * and a failed booking and a team's answer both land here — and the second starts closed, because
 * it is history. Her choice is remembered the way My Enrollment remembers its groups; and when the
 * band points at a booking inside *Your conversations*, the group opens whatever she chose, because
 * a band pointing at something hidden makes no sense (A8).
 */

/** The states this section adds to the frame's. Both emptinesses are here, deliberately apart. */
export const APPOINTMENT_PREVIEW_STATES = [
  ['ready', 'Ready', 'Two conversations booked; one team has published nothing.'],
  ['empty', 'Nothing booked', 'Times are published; the student has taken none of them.'],
  ['no-times', 'No times published', 'Nothing booked, and no team has opened a calendar yet.'],
  [
    'booking-fails',
    'Team unreachable',
    'One booking never reached its team, and a new one will not either.',
  ],
  ['requested', 'A time asked for', 'One request sent to a team, and no answer yet.'],
  ['loading', 'Loading', 'Before the published times arrive.'],
  ['partial', 'Partial data', 'Your conversations loaded; the published times did not.'],
  ['error', 'Error', 'Nothing on this page could be loaded.'],
];

const NO_TIMES = { enrollment: [], 'financial-aid': [], academic: [] };

const GROUPS_STORE = 'aster.appointments.groups';
const GROUPS_DEFAULT = { conversations: true, record: false };

function readGroups() {
  try {
    const raw = window.localStorage.getItem(GROUPS_STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? { ...GROUPS_DEFAULT, ...parsed } : GROUPS_DEFAULT;
  } catch {
    return GROUPS_DEFAULT;
  }
}

function seedFor(previewState) {
  if (previewState === 'empty' || previewState === 'no-times') return [];
  if (previewState === 'booking-fails') return [failedAppointment, ...bookedAppointments];
  if (previewState === 'requested') return [pendingRequest, ...bookedAppointments];
  return bookedAppointments;
}

export default function AppointmentsPage({
  destination,
  previewState = 'ready',
  onToast = () => {},
  onOverlay = () => {},
  onRetry = () => {},
}) {
  const [appointments, setAppointments] = useState(() => seedFor(previewState));
  const [booking, setBooking] = useState(null);
  const [open, setOpen] = useState(null);
  const [how, setHow] = useState(false);
  const [groups, setGroups] = useState(readGroups);
  const [notified, setNotified] = useState([]);

  const returnFocus = useRef(null);

  // The preview control is a change of student, not a filter over one. Anything booked in the
  // previous state belonged to that student and goes with them.
  useEffect(() => {
    setAppointments(seedFor(previewState));
    setBooking(null);
    setOpen(null);
    setNotified([]);
  }, [previewState]);

  useEffect(() => {
    try {
      window.localStorage.setItem(GROUPS_STORE, JSON.stringify(groups));
    } catch {
      // A portal that cannot remember a preference still has to work.
    }
  }, [groups]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay it does not itself
  // hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(booking || open || how));
  }, [onOverlay, booking, open, how]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  // Partial data is not the same claim as "no team has published anything", so it is carried as its
  // own flag rather than as an empty calendar that would read like the other emptiness.
  const timesFailed = previewState === 'partial';
  const teamFails = previewState === 'booking-fails';
  const times = timesFailed || previewState === 'no-times' ? NO_TIMES : publishedTimes;

  const topics = useMemo(
    () => topicsInCategoryOrder(conversationTypes, checklistCategories),
    [],
  );
  const { current, record } = splitAppointments(appointments, PORTAL_TODAY);
  const failed = failedBookings(current);
  const requests = timeRequests(current);
  const failedType = failed[0] ? typeById(conversationTypes, failed[0].typeId) : null;

  const availability = useMemo(() => availabilitySummary(times, topics), [times, topics]);
  const band = bandFor({ current, availability, timesFailed });
  const firstWithTimes = availability.perType.find((entry) => entry.count > 0)?.type ?? null;

  const conversationsOpen = groups.conversations || band?.kind === 'failed';

  function openBooking(type, node, { tab = 'times', replaceId = null, prefill = null } = {}) {
    returnFocus.current = node ?? null;
    setOpen(null);
    setBooking({ typeId: type.id, tab, replaceId, prefill });
  }

  function closeBooking() {
    setBooking(null);
    returnFocus.current?.focus();
  }

  function openAppointment(appointment, node) {
    returnFocus.current = node ?? null;
    setOpen(appointment.id);
  }

  function closeAppointment() {
    setOpen(null);
    returnFocus.current?.focus();
  }

  /**
   * One attempt, one record. A retry re-uses the id of the attempt it repeats, so a booking that
   * failed twice is one unbooked conversation rather than two — and a reschedule re-uses the id of
   * the conversation it replaces, so the old time is gone the moment the new one exists.
   */
  function book(appointment) {
    const replaced = appointments.find((item) => item.id === appointment.id) ?? null;
    setAppointments((list) => [
      appointment,
      ...list.filter((item) => item.id !== appointment.id),
    ]);
    if (appointment.state !== 'confirmed') return;
    const type = typeById(conversationTypes, appointment.typeId);
    if (replaced?.state === 'confirmed') {
      onToast({
        tone: 'success',
        title: 'Rescheduled.',
        body: `The old time went back to ${articled(type.team)}’s calendar. The new one is on both.`,
      });
    } else {
      onToast({ tone: 'success', title: 'Booked.', body: `${articled(type.team, true)} has it too.` });
    }
  }

  function request(record) {
    setAppointments((list) => [record, ...list]);
    const type = typeById(conversationTypes, record.typeId);
    onToast({
      tone: 'success',
      title: 'Sent.',
      body: `${articled(type.team, true)} has your request. Their answer shows up here.`,
    });
  }

  function cancelRequest(appointment) {
    setAppointments((list) => list.filter((item) => item.id !== appointment.id));
    setOpen(null);
    onToast('Request cancelled. Nothing was booked, so nothing else changed.');
  }

  function cancel(appointment) {
    setAppointments((list) =>
      list.map((item) =>
        item.id === appointment.id
          ? { ...item, state: 'cancelled', cancelledBy: 'you', cancelledOn: 'today' }
          : item,
      ),
    );
    closeAppointment();
    onToast('Cancelled. The time went back to their calendar. Nothing else changed.');
  }

  function retry(appointment, node) {
    const type = typeById(conversationTypes, appointment.typeId);
    openBooking(type, node, { replaceId: appointment.id, prefill: { subject: appointment.subject } });
  }

  function reschedule(appointment, node) {
    const type = typeById(conversationTypes, appointment.typeId);
    openBooking(type, node, { replaceId: appointment.id, prefill: { subject: appointment.subject } });
  }

  function bookAgain(appointment, node) {
    const type = typeById(conversationTypes, appointment.typeId);
    openBooking(type, node, { prefill: { subject: appointment.subject } });
  }

  function toggleGroup(id) {
    setGroups((value) => ({ ...value, [id]: !value[id] }));
  }

  /** The rail's "See the request": open the group and put focus on the request itself. */
  function seeRequest(id) {
    setGroups((value) => ({ ...value, conversations: true }));
    window.requestAnimationFrame(() => {
      const row = document.querySelector(`[data-appointment="${id}"]`);
      row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row?.querySelector('.row-link')?.focus({ preventScroll: true });
    });
  }

  const bookingType = booking ? typeById(conversationTypes, booking.typeId) : null;
  const openAppointmentRecord = appointments.find((item) => item.id === open) ?? null;

  /**
   * Two failures, two scopes. A booking that never reached its team is about the student's own
   * list, so it rides the page's notice line; times that would not load are about the card that
   * books one, so they head that card and nothing else. Neither is a band of its own.
   */
  const alert =
    failed.length === 0 ? null : (
      <Notice
        tone="urgent"
        icon="alert"
        title={`${failedType.label} · not booked`}
        action={{
          label: 'Try again',
          icon: 'refresh',
          onClick: () => retry(failed[0], null),
        }}
      >
        This never reached {articled(failedType.team)}, so nothing is scheduled. The time you chose may still
        be open.
      </Notice>
    );

  const bookingNotice = timesFailed ? (
    <Notice
      tone="urgent"
      icon="alert"
      title="The published times couldn’t be loaded"
      action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
    >
      Booking is closed until they do, rather than opening a picker with nothing in it. The
      conversations you have already booked loaded normally and are unaffected.
    </Notice>
  ) : null;

  const rowHandlers = {
    today: PORTAL_TODAY,
    onOpen: openAppointment,
    onCalendar: () =>
      onToast('This would download an invite for your own calendar. Nothing is sent.'),
    onReschedule: reschedule,
    onRetry: retry,
    onBookAgain: bookAgain,
    onCancelRequest: cancelRequest,
  };

  return (
    <PageShell
      destination={destination}
      /* No summary panel, since the Jam of 2026-08-21: the figure it would hold is the first row
         of `Your conversations`, and the person beside it is the person in that row. */
      notice={alert}
      rail={
        <AppointmentsRail
          publisher={schedulingPublisher}
          unavailable={timesFailed}
          requests={requests.map((appointment) => ({
            appointment,
            type: typeById(conversationTypes, appointment.typeId),
          }))}
          onOpenHow={() => setHow(true)}
          onSeeRequest={seeRequest}
        />
      }
    >
      {/* The task of the screen. It never collapses. */}
      <Card aria-labelledby="book-heading">
        <CardHead
          kind="status"
          icon="calendar"
          tone="accent"
          title="Book a conversation"
          titleId="book-heading"
          note="What it’s about"
          aside={
            <button type="button" className="text-button" onClick={() => setHow(true)}>
              How booking works
            </button>
          }
        />

        {bookingNotice}

        <CardRows className="topic-list">
          {topics.map((type) => (
            <TopicRow
              key={type.id}
              type={type}
              days={daysFor(times, type.id)}
              unavailable={timesFailed}
              band={band && band.typeId === type.id ? band.kind : null}
              notified={notified.includes(type.id)}
              onChoose={(entry, node) => openBooking(entry, node)}
              onAsk={(entry, node) => openBooking(entry, node, { tab: 'ask' })}
              onNotify={(entry) => setNotified((list) => [...list, entry.id])}
            />
          ))}
        </CardRows>
      </Card>

      <Card
        className={current.length > 0 && !conversationsOpen ? 'collapsed' : ''}
        aria-labelledby="conversations-heading"
      >
        <CardHead
          kind="status"
          icon="users"
          title="Your conversations"
          titleId="conversations-heading"
          count={current.length > 0 ? current.length : undefined}
          open={conversationsOpen}
          onToggle={current.length > 0 ? () => toggleGroup('conversations') : undefined}
          controls="appointments-conversations"
        />

        {current.length === 0 ? (
          availability.total > 0 ? (
            <StateCard
              icon="calendar"
              title="Nothing booked yet"
              action={{
                label: 'Book a conversation',
                icon: 'arrow',
                onClick: (event) => openBooking(firstWithTimes, event.currentTarget),
              }}
            >
              You haven’t taken any of the {availability.total} times Aster’s teams have published.
              Picking one books it straight away. If none of them fit, asking a team for a different
              time is the other way, and that one you wait on.
            </StateCard>
          ) : (
            <StateCard
              icon="clock"
              title="No team has published times yet"
              action={{
                label: 'Ask a team for a time',
                icon: 'send',
                onClick: (event) => openBooking(topics[0], event.currentTarget, { tab: 'ask' }),
              }}
            >
              Nothing is booked because there’s nothing to pick from yet. Each team opens its
              calendar when it’s ready, and the times show up here on their own. If what you need
              can’t wait, ask a team for a time and they’ll come back to you.
            </StateCard>
          )
        ) : (
          <CardRows
            className="appointment-list"
            id="appointments-conversations"
            hidden={!conversationsOpen}
          >
            {current.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                type={typeById(conversationTypes, appointment.typeId)}
                band={band?.kind === 'failed' && band.appointmentId === appointment.id}
                {...rowHandlers}
              />
            ))}
          </CardRows>
        )}
      </Card>

      {record.length > 0 && (
        <Card className={groups.record ? '' : 'collapsed'} aria-labelledby="record-heading">
          <CardHead
            kind="status"
            icon="clock"
            tone="locked"
            title="Past and cancelled"
            titleId="record-heading"
            count={record.length}
            open={groups.record}
            onToggle={() => toggleGroup('record')}
            controls="appointments-record"
          />
          <CardRows className="appointment-list" id="appointments-record" hidden={!groups.record}>
            {record.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                type={typeById(conversationTypes, appointment.typeId)}
                {...rowHandlers}
              />
            ))}
          </CardRows>
        </Card>
      )}

      {booking && (
        <BookingDrawer
          type={bookingType}
          days={daysFor(times, booking.typeId)}
          initialTab={booking.tab}
          replaceId={booking.replaceId}
          prefill={booking.prefill}
          teamFails={teamFails}
          today={PORTAL_TODAY}
          onBook={book}
          onRequest={request}
          onClose={closeBooking}
        />
      )}

      {openAppointmentRecord && (
        <AppointmentDrawer
          appointment={openAppointmentRecord}
          type={typeById(conversationTypes, openAppointmentRecord.typeId)}
          today={PORTAL_TODAY}
          onClose={closeAppointment}
          onCancel={cancel}
          onRebook={(type, appointment) => retry(appointment, null)}
          onReschedule={(appointment) => reschedule(appointment, null)}
          onBookAgain={(appointment) => bookAgain(appointment, null)}
          onCancelRequest={cancelRequest}
          onToast={onToast}
        />
      )}

      {how && <InfoModal variant="booking" onClose={() => setHow(false)} />}
    </PageShell>
  );
}
