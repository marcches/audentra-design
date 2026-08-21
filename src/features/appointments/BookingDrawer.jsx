import { useId, useMemo, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import SlotPicker from './SlotPicker.jsx';
import { longDate, shortDate } from '../campus/logic.js';
import { articled, placeOf, teamName, timeRange } from './logic.js';

/**
 * Booking, in one drawer — ENR-178, and §9 of the changes of 2026-08-21.
 *
 * The drawer is always about one topic. The topic comes from the row that opened it and is not
 * editable inside, which keeps the screen's rule intact: what it is about decides which team gets
 * it (AC 2). Two tabs, in this order, and the row decides which one opens:
 *
 *   Published times   the picker over what the team published, the About field, `Book this time`.
 *                     Selecting a time books nothing; it only marks.
 *   Ask for a time    the second path (ADR 0005): when could you meet, in words, and what it is
 *                     about. It is not instant, and the tab says so.
 *
 * The result replaces the body of this sheet rather than opening a layer over it
 * ([Fiverr](https://mobbin.com/screens/3299ae75-0af5-4acf-b8bd-7c4bef88c6bf)). A modal that can be
 * dismissed back to an unchanged-looking form is precisely the ambiguity the guardrail is about:
 * the student must not be able to walk away unsure whether the conversation exists. The three
 * sentences that used to sit in the rail as "After you book" are the confirmation here, after the
 * click they are about (C4).
 *
 * `teamFails` is the preview's way of holding the team's calendar down. What matters is what the
 * code does with it: one attempt, one honest state. Nothing is written as confirmed and corrected
 * afterwards, and a retry re-uses the same appointment id so a second failure does not leave two
 * failed records of one intention — and a reschedule re-uses the id it replaces.
 */
const TABS = [
  { id: 'times', label: 'Published times' },
  { id: 'ask', label: 'Ask for a time' },
];

export default function BookingDrawer({
  type,
  days,
  initialTab = 'times',
  replaceId = null,
  prefill = null,
  teamFails = false,
  today,
  onBook,
  onRequest,
  onClose,
}) {
  const attempt = useRef(replaceId);
  const ids = useId();
  const tabRefs = useRef([]);

  const [tab, setTab] = useState(initialTab);
  const [dayIso, setDayIso] = useState(null);
  const [slot, setSlot] = useState(null);
  const [subject, setSubject] = useState(prefill?.subject ?? '');
  const [when, setWhen] = useState('');
  const [result, setResult] = useState(null);

  const day = useMemo(
    () => days.find((entry) => entry.date === dayIso) ?? days[0] ?? null,
    [days, dayIso],
  );
  const place = placeOf(type, slot?.format);
  const team = teamName(type);

  function chooseDay(next) {
    setDayIso(next);
    setSlot(null);
  }

  /** The tablist pattern: arrow keys move between tabs and the moved-to tab takes focus. */
  function onTabKey(event, index) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  const canBook = Boolean(slot && day) && subject.trim().length > 0;
  const canSend = when.trim().length > 0 && subject.trim().length > 0;

  function book() {
    if (!canBook) return;
    if (!attempt.current) attempt.current = `appt-${slot.id}`;
    onBook({
      id: attempt.current,
      typeId: type.id,
      date: day.date,
      time: slot.time,
      end: slot.end,
      format: slot.format,
      subject: subject.trim(),
      state: teamFails ? 'failed' : 'confirmed',
      bookedOn: 'just now',
      attemptedOn: 'just now',
    });
    setResult(teamFails ? 'failed' : 'booked');
  }

  function send() {
    if (!canSend) return;
    onRequest({
      id: `req-${type.id}-${Date.now()}`,
      typeId: type.id,
      state: 'requested',
      date: null,
      window: when.trim(),
      subject: subject.trim(),
      requestedOn: shortDate(today),
    });
    setResult('requested');
  }

  const aboutField = (
    <label className="drawer-field" htmlFor={`${ids}-about`}>
      <span className="drawer-field-label">What’s it about?</span>
      <textarea
        id={`${ids}-about`}
        rows={2}
        required
        aria-required="true"
        aria-describedby={`${ids}-about-help`}
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        placeholder="Whether the transcript I uploaded is the one Admissions needs."
      />
      <span className="form-help" id={`${ids}-about-help`}>
        One line is enough. It goes to the team with your booking, so nobody starts from nothing.
      </span>
    </label>
  );

  const foot =
    !result &&
    (tab === 'times' ? (
      day && (
        <div className="booking-foot">
          <div className="booking-chosen">
            <span className="panel-label">You are booking</span>
            <strong>
              {slot
                ? `${longDate(day.date)} · ${timeRange({ time: slot.time, end: slot.end })}`
                : 'Pick one of the times above'}
            </strong>
            <span>{slot ? `${place} · with ${type.person.name}` : `${team} · ${type.minutes} min`}</span>
          </div>
          <div className="drawer-actions">
            <Button kind="primary" full icon="arrow" disabled={!canBook} onClick={book}>
              Book this time
            </Button>
            <Button kind="secondary" full onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      )
    ) : (
      <div className="booking-foot">
        <div className="drawer-actions">
          <Button kind="primary" full icon="send" disabled={!canSend} onClick={send}>
            Send request
          </Button>
          <Button kind="secondary" full onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    ));

  return (
    <Drawer
      variant="booking"
      label={[type.category]}
      titleId="booking-drawer-title"
      closeLabel="Close"
      onClose={onClose}
      foot={foot}
    >
      {result ? (
        <div className={`booking-result ${result}`}>
          <span className="result-icon" aria-hidden="true">
            <Icon
              name={result === 'booked' ? 'check' : result === 'failed' ? 'alert' : 'send'}
              size={24}
            />
          </span>

          <h2 id="booking-drawer-title">
            {result === 'booked'
              ? `Booked · ${longDate(day.date)}`
              : result === 'failed'
                ? `This didn’t reach ${articled(team)}`
                : `Sent to ${articled(team)}`}
          </h2>

          <p>
            {result === 'booked'
              ? `${timeRange({ time: slot.time, end: slot.end })} with ${type.person.name}, ${slot.format === 'video' ? 'video call' : place}.`
              : result === 'failed'
                ? 'Nothing is booked. The time is still open on their calendar, so you have not lost it. Until this goes through, the conversation does not exist.'
                : 'They come back to you here. Nothing is booked until they do.'}
          </p>

          <div className="result-facts">
            {result === 'booked' && (
              <>
                <p>
                  <Icon name="calendar" size={15} />
                  <span>The time lands on your calendar and on the team’s, at the same moment.</span>
                </p>
                <p>
                  <Icon name="send" size={15} />
                  <span>
                    What you wrote goes with the booking, so the team arrives prepared: “
                    {subject.trim()}”
                  </span>
                </p>
              </>
            )}
            {result === 'failed' && (
              <p>
                <Icon name="alert" size={15} />
                <span>
                  It stays in your list as <strong>Not booked</strong>. It’s never shown as
                  confirmed.
                </span>
              </p>
            )}
            {result === 'requested' && (
              <p>
                <Icon name="clock" size={15} />
                <span>
                  It is in your list as <strong>Requested</strong>. Waiting on the team. Their
                  answer shows up here.
                </span>
              </p>
            )}
          </div>

          <div className="result-actions">
            {result === 'failed' ? (
              <>
                <Button kind="primary" full icon="refresh" onClick={() => setResult(null)}>
                  Try again
                </Button>
                <Button kind="secondary" full onClick={onClose}>
                  Close
                </Button>
              </>
            ) : (
              <Button kind="primary" full icon="check" onClick={onClose}>
                Done
              </Button>
            )}
          </div>

          <small className="prototype-note">
            Preview: Aster’s scheduling system owns these calendars. Audentra never books anything
            on a team’s behalf.
          </small>
        </div>
      ) : (
        <>
          <div className="drawer-icon appointment" aria-hidden="true">
            <Icon name="calendar" size={25} weight="duotone" />
          </div>
          <h2 id="booking-drawer-title">{type.label}</h2>
          <p className="drawer-description">
            {type.blurb} {team}, {type.minutes} minutes.
          </p>

          <div className="drawer-tabs" role="tablist" aria-label="How to get a time">
            {TABS.map((entry, index) => (
              <button
                key={entry.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${ids}-tab-${entry.id}`}
                aria-selected={tab === entry.id}
                aria-controls={`${ids}-panel-${entry.id}`}
                tabIndex={tab === entry.id ? 0 : -1}
                className={tab === entry.id ? 'active' : ''}
                onClick={() => setTab(entry.id)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                {entry.label}
              </button>
            ))}
          </div>

          {tab === 'times' ? (
            <div
              className="action-panel"
              role="tabpanel"
              id={`${ids}-panel-times`}
              aria-labelledby={`${ids}-tab-times`}
            >
              {day ? (
                <>
                  <SlotPicker
                    type={type}
                    days={days}
                    day={day}
                    slot={slot}
                    onDay={chooseDay}
                    onSlot={setSlot}
                  />
                  {aboutField}
                </>
              ) : (
                // Never an empty tab (9.5): the absence, stated, and the way out.
                <>
                  <p className="no-slots">
                    They haven’t opened a calendar yet. You can ask for a time, or wait and we’ll
                    tell you when they open one.
                  </p>
                  <Button kind="secondary" icon="arrow" onClick={() => setTab('ask')}>
                    Ask for a time
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div
              className="action-panel"
              role="tabpanel"
              id={`${ids}-panel-ask`}
              aria-labelledby={`${ids}-tab-ask`}
            >
              <p className="drawer-lead">
                None of the published times work? Tell this team what does, and they’ll come back to
                you here.
              </p>
              <label className="drawer-field" htmlFor={`${ids}-when`}>
                <span className="drawer-field-label">When could you meet?</span>
                <textarea
                  id={`${ids}-when`}
                  rows={2}
                  required
                  aria-required="true"
                  aria-describedby={`${ids}-when-help`}
                  value={when}
                  onChange={(event) => setWhen(event.target.value)}
                />
                <span className="form-help" id={`${ids}-when-help`}>
                  Days and rough times are enough.
                </span>
              </label>
              {aboutField}
              <p className="picker-note">
                <Icon name="info" size={13} />
                This one isn’t instant. Picking a published time books it on the spot, a request
                waits on the team.
              </p>
            </div>
          )}
        </>
      )}
    </Drawer>
  );
}
