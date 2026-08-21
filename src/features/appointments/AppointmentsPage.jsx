import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import AppointmentDrawer from './AppointmentDrawer.jsx';
import AppointmentRow from './AppointmentRow.jsx';
import AppointmentsRail from './AppointmentsRail.jsx';
import BookingDrawer from './BookingDrawer.jsx';
import NextAppointment from './NextAppointment.jsx';
import TypeRow from './TypeRow.jsx';
import {
  bookedAppointments,
  conversationTypes,
  failedAppointment,
  publishedTimes,
  schedulingPublisher,
} from './data.js';
import { PORTAL_TODAY, enrollmentAdvisor } from '../enrollment/data.js';
import {
  availabilitySummary,
  daysFor,
  failedBookings,
  nextConfirmed,
  relativeDay,
  splitAppointments,
  typeById,
} from './logic.js';

/**
 * Appointments — ENR-183, behaviour from ENR-178.
 *
 * The card is a change of register: a free date and time field becomes a picker over published
 * availability, so that booking means the conversation will happen. Everything on this page follows
 * from that one move.
 *
 *   - A conversation type is chosen first, because the type decides which team receives it.
 *   - Only published times are selectable, and a team with none says so on its row before the
 *     picker can open on an empty calendar.
 *   - A booking is confirmed or it failed. There is no third state, no optimistic row, and a
 *     failure keeps a visible record instead of vanishing.
 *
 * `loading` and `error` are the frame's and never reach this component — App renders PageSkeleton
 * and PageError before dispatching. What is left is what only this section can express: the two
 * different emptinesses the card asks us to tell apart, a half-loaded page, and a team whose
 * calendar cannot be reached.
 */

/** The states this section adds to the frame's. Both emptinesses are here, deliberately apart. */
export const APPOINTMENT_PREVIEW_STATES = [
  ['ready', 'Ready', 'Two conversations booked; one team has published nothing.'],
  ['empty', 'Nothing booked', 'Times are published; the student has taken none of them.'],
  ['no-times', 'No times published', 'Nothing booked, and no team has opened a calendar yet.'],
  [
    'booking-fails',
    'Team unreachable',
    'One booking never reached its team — and a new one will not either.',
  ],
  ['loading', 'Loading', 'Before the published times arrive.'],
  ['partial', 'Partial data', 'Your conversations loaded; the published times did not.'],
  ['error', 'Error', 'Nothing on this page could be loaded.'],
];

const NO_TIMES = { enrollment: [], 'financial-aid': [], academic: [] };

function seedFor(previewState) {
  if (previewState === 'empty' || previewState === 'no-times') return [];
  if (previewState === 'booking-fails') return [failedAppointment, ...bookedAppointments];
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

  const returnFocus = useRef(null);

  // The preview control is a change of student, not a filter over one. Anything booked in the
  // previous state belonged to that student and goes with them.
  useEffect(() => {
    setAppointments(seedFor(previewState));
    setBooking(null);
    setOpen(null);
  }, [previewState]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay it does not itself
  // hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(booking || open));
  }, [onOverlay, booking, open]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  // Partial data is not the same claim as "no team has published anything", so it is carried as its
  // own flag rather than as an empty calendar that would read like the other emptiness.
  const timesFailed = previewState === 'partial';
  const teamFails = previewState === 'booking-fails';
  const times = timesFailed || previewState === 'no-times' ? NO_TIMES : publishedTimes;

  const { current, record } = splitAppointments(appointments, PORTAL_TODAY);
  const next = nextConfirmed(current);
  const failed = failedBookings(current);
  const nextType = next ? typeById(conversationTypes, next.typeId) : null;
  const failedType = failed[0] ? typeById(conversationTypes, failed[0].typeId) : null;

  const availability = useMemo(
    () => availabilitySummary(times, conversationTypes),
    [times],
  );

  const hero = {
    lede: next
      ? `Your next conversation is ${relativeDay(next.date, PORTAL_TODAY)}, with ${
          nextType.person.name
        }. Every time here is one a team published — you choose from them rather than proposing one.`
      : availability.total > 0
        ? 'Aster’s teams publish the times they can offer. You take one, and it lands on their calendar and yours at the same moment.'
        : 'Aster’s teams publish the times they can offer here. None of them has opened a calendar yet, so there is nothing to book — and nothing waiting on you.',
  };

  function openBooking(type, node, replaceId) {
    returnFocus.current = node ?? null;
    setOpen(null);
    setBooking({ typeId: type.id, replaceId });
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
   * failed twice is one unbooked conversation rather than two.
   */
  function book(appointment) {
    setAppointments((list) => [
      appointment,
      ...list.filter((item) => item.id !== appointment.id),
    ]);
    if (appointment.state === 'confirmed') {
      onToast(`Booked — ${typeById(conversationTypes, appointment.typeId).team} has it too.`);
    }
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
    onToast('Cancelled. The time went back to their calendar — nothing else changed.');
  }

  function rebook(type, appointment) {
    setOpen(null);
    setBooking({ typeId: type.id, replaceId: appointment.id });
  }

  const openAppointmentRecord = appointments.find((item) => item.id === open) ?? null;

  // A booking that failed is a footnote to the figure above it: *this one is not it.* The shell
  // rides it on the foot of the summary rather than stacking another band into the page.
  const alert =
    failed.length === 0 ? null : (
      <div className="alert-strip urgent" role="status">
        <span className="alert-strip-icon" aria-hidden="true">
          <Icon name="alert" size={19} />
        </span>
        <p>
          <strong>{failedType.label} · not booked</strong>
          This never reached {failedType.team}, so nothing is scheduled. The time you chose may
          still be open.
        </p>
        <button
          className="secondary-button"
          onClick={() => openBooking(failedType, null, failed[0].id)}
        >
          Try again <Icon name="refresh" size={15} />
        </button>
      </div>
    );

  const notice = timesFailed ? (
    <div className="alert-strip urgent" role="alert">
      <span className="alert-strip-icon" aria-hidden="true">
        <Icon name="alert" size={19} />
      </span>
      <p>
        <strong>The published times couldn’t be loaded</strong>
        Booking is closed until they do, rather than opening a picker with nothing in it. The
        conversations you have already booked loaded normally and are unaffected.
      </p>
      <button className="secondary-button" onClick={onRetry}>
        Try again <Icon name="refresh" size={15} />
      </button>
    </div>
  ) : null;

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summaryLabel="Your next conversation"
      summary={
        <NextAppointment
          next={next}
          type={nextType}
          today={PORTAL_TODAY}
          advisor={nextType ? nextType.person : enrollmentAdvisor}
          openTimes={availability.total}
          unavailable={timesFailed}
          onContact={(channel) =>
            onToast(
              `${channel === 'email' ? 'An email' : 'A message'} to ${
                (nextType ?? { person: enrollmentAdvisor }).person.name
              } would open here — nothing is sent yet.`,
            )
          }
        />
      }
      alert={alert}
      notice={notice}
      rail={
        <AppointmentsRail
          availability={availability}
          publisher={schedulingPublisher}
          unavailable={timesFailed}
          onToast={onToast}
        />
      }
    >
      <section className="section-card" aria-labelledby="book-heading">
        <div className="card-heading">
          <span className="card-icon" aria-hidden="true">
            <Icon name="calendar" size={19} />
          </span>
          <div>
            <h2 id="book-heading">Book a conversation</h2>
            <p>What it is about decides which team receives it.</p>
          </div>
        </div>

        <div className="card-rows type-list">
          {conversationTypes.map((type) => (
            <TypeRow
              key={type.id}
              type={type}
              days={daysFor(times, type.id)}
              unavailable={timesFailed}
              onOpen={openBooking}
            />
          ))}
        </div>
      </section>

      <section className="section-card" aria-labelledby="conversations-heading">
        <div className="card-heading">
          <span className="card-icon" aria-hidden="true">
            <Icon name="check" size={19} />
          </span>
          <div>
            <h2 id="conversations-heading">Your conversations</h2>
            <p>What is booked — and anything that did not reach a team.</p>
          </div>
        </div>

        {current.length === 0 ? (
          availability.total > 0 ? (
            <StateCard
              icon="calendar"
              title="Nothing booked yet"
              action={{
                label: 'Book a conversation',
                icon: 'arrow',
                onClick: () => openBooking(conversationTypes[0]),
              }}
            >
              You have not taken any of the {availability.total} times Aster’s teams have published.
              Booking one is a single choice — there is no request to wait on afterwards.
            </StateCard>
          ) : (
            <StateCard
              icon="clock"
              title="No team has published times yet"
              action={{
                label: conversationTypes[0].otherRoute,
                icon: 'mail',
                onClick: () =>
                  onToast(
                    `${conversationTypes[0].otherRoute} would open here — nothing is sent yet.`,
                  ),
              }}
            >
              This is a different kind of empty: nothing is booked because there is nothing to book.
              Each team opens its calendar when it is ready, and the times appear here on their own.
              If something cannot wait for that, the office is still the route.
            </StateCard>
          )
        ) : (
          <div className="card-rows appointment-list">
            {current.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                type={typeById(conversationTypes, appointment.typeId)}
                today={PORTAL_TODAY}
                onOpen={openAppointment}
              />
            ))}
          </div>
        )}
      </section>

      {record.length > 0 && (
        <section className="section-card" aria-labelledby="record-heading">
          <div className="card-heading">
            <span className="card-icon" aria-hidden="true">
              <Icon name="clock" size={19} />
            </span>
            <div>
              <h2 id="record-heading">Past and cancelled</h2>
              <p>Kept, so you can see who you have already spoken to.</p>
            </div>
          </div>

          <div className="card-rows appointment-list">
            {record.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                type={typeById(conversationTypes, appointment.typeId)}
                today={PORTAL_TODAY}
                onOpen={openAppointment}
              />
            ))}
          </div>
        </section>
      )}

      {booking && (
        <BookingDrawer
          types={conversationTypes}
          published={times}
          initialTypeId={booking.typeId}
          replaceId={booking.replaceId}
          teamFails={teamFails}
          onBook={book}
          onClose={closeBooking}
          onToast={onToast}
        />
      )}

      {openAppointmentRecord && (
        <AppointmentDrawer
          appointment={openAppointmentRecord}
          type={typeById(conversationTypes, openAppointmentRecord.typeId)}
          today={PORTAL_TODAY}
          onClose={closeAppointment}
          onCancel={cancel}
          onRebook={rebook}
          onToast={onToast}
        />
      )}
    </PageShell>
  );
}
