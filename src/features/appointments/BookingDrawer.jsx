import { useId, useMemo, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import SlotPicker from './SlotPicker.jsx';
import { longDate } from '../campus/logic.js';
import { articled, placeOf, teamName, timeRange } from './logic.js';
import { runningName } from '../edward/logic.js';

/**
 * Booking, in one drawer — ENR-178, and §9 of the changes of 2026-08-21 as Part A of the review of
 * 2026-08-21 amended it (ADR 0010).
 *
 * The drawer is always about one topic. The topic comes from the row that opened it and is not
 * editable inside, which keeps the screen's rule intact: what it is about decides which team gets
 * it (AC 2). One panel, the picker over what the team posted, the About field, `Book this time`.
 * Selecting a time books nothing; it only marks. The second tab this drawer had for a day — asking
 * the team for a time — is gone: ENR-178 never allowed a time the student proposes, and the review
 * call chose a callback instead, offered by Edward (`CallbackDrawer`), never from here.
 *
 * The result replaces the body of this sheet rather than opening a layer over it
 * ([Fiverr](https://mobbin.com/screens/3299ae75-0af5-4acf-b8bd-7c4bef88c6bf)). A modal that can be
 * dismissed back to an unchanged-looking form is precisely the ambiguity the guardrail is about:
 * the student must not be able to walk away unsure whether the conversation exists.
 *
 * `teamFails` is the preview's way of holding the team's calendar down. What matters is what the
 * code does with it: one attempt, one honest state. Nothing is written as confirmed and corrected
 * afterwards, and a retry re-uses the same appointment id so a second failure does not leave two
 * failed records of one intention — and a reschedule re-uses the id it replaces.
 */
export default function BookingDrawer({
  type,
  days,
  replaceId = null,
  prefill = null,
  teamFails = false,
  onBook,
  onClose,
}) {
  const attempt = useRef(replaceId);
  const ids = useId();

  const [dayIso, setDayIso] = useState(null);
  const [slot, setSlot] = useState(null);
  const [subject, setSubject] = useState(prefill?.subject ?? '');
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

  const canBook = Boolean(slot && day) && subject.trim().length > 0;

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

  const foot =
    !result &&
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
    );

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
            <Icon name={result === 'booked' ? 'check' : 'alert'} size={24} />
          </span>

          <h2 id="booking-drawer-title">
            {result === 'booked'
              ? `Booked · ${longDate(day.date)}`
              : `This didn’t reach ${articled(team)}`}
          </h2>

          <p>
            {result === 'booked'
              ? `${timeRange({ time: slot.time, end: slot.end })} with ${type.person.name}, ${slot.format === 'video' ? 'video call' : place}.`
              : 'Nothing is booked. The time is still open on their calendar, so you have not lost it. Until this goes through, the conversation does not exist.'}
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

          {day ? (
            <div className="action-panel">
              <SlotPicker
                type={type}
                days={days}
                day={day}
                slot={slot}
                onDay={chooseDay}
                onSlot={setSlot}
              />
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
                  One line is enough. It goes to the team with your booking, so nobody starts from
                  nothing.
                </span>
              </label>
            </div>
          ) : (
            // Never an empty panel (9.5): the absence, stated as a fact about the institution,
            // and the way out — the row's button is the door to Edward; the drawer only says why
            // there is nothing to pick.
            <div className="action-panel">
              <p className="no-slots">
                {runningName(type.team)} hasn’t posted times yet. Ask Edward from the row and he’ll
                get you a callback from them, or we’ll email you when times go up.
              </p>
              <Button kind="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </>
      )}
    </Drawer>
  );
}
