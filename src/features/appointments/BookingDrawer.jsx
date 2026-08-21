import { useMemo, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import SlotPicker from './SlotPicker.jsx';
import { longDate } from '../campus/logic.js';
import { daysFor, placeOf, timeRange, typeById } from './logic.js';

/**
 * Booking, in one scroll — ENR-178.
 *
 * Three questions in the order the story asks them: what about, when, and what it is about. The
 * type is asked first because it decides which team receives the booking (AC 2), and the picker
 * below re-reads itself from that answer.
 *
 * The result replaces the body of this sheet rather than opening a layer over it
 * ([Fiverr](https://mobbin.com/screens/3299ae75-0af5-4acf-b8bd-7c4bef88c6bf)). A modal that can be
 * dismissed back to an unchanged-looking form is precisely the ambiguity the guardrail is about:
 * the student must not be able to walk away unsure whether the conversation exists.
 *
 * `teamFails` is the preview's way of holding the team's calendar down. What matters is what the
 * code does with it: one attempt, one honest state. Nothing is written as confirmed and corrected
 * afterwards, and a retry re-uses the same appointment id so a second failure does not leave two
 * failed records of one intention.
 */
export default function BookingDrawer({
  types,
  published,
  initialTypeId,
  replaceId,
  teamFails,
  onBook,
  onClose,
  onToast,
}) {
  // A retry writes over the attempt it repeats rather than adding a second one:
  // one intention, one record, however many times the team's calendar refuses it.
  const attempt = useRef(replaceId ?? null);

  const [typeId, setTypeId] = useState(initialTypeId ?? types[0].id);
  const [dayIso, setDayIso] = useState(null);
  const [slot, setSlot] = useState(null);
  const [subject, setSubject] = useState('');
  const [result, setResult] = useState(null);


  const type = typeById(types, typeId);
  const days = useMemo(() => daysFor(published, typeId), [published, typeId]);
  const day = days.find((entry) => entry.date === dayIso) ?? days[0] ?? null;
  const place = placeOf(type, slot?.format);

  function chooseType(next) {
    setTypeId(next);
    setDayIso(null);
    setSlot(null);
  }

  function chooseDay(next) {
    setDayIso(next);
    setSlot(null);
  }

  function book() {
    if (!slot || !day) return;
    if (!attempt.current) attempt.current = `appt-${slot.id}`;

    onBook({
      id: attempt.current,
      typeId,
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

  return (
    <Drawer
      variant="booking"
      label={['Book a conversation', type.team]}
      titleId="booking-drawer-title"
      closeLabel="Close booking"
      onClose={onClose}
      foot={
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
              <span>
                {slot ? `${place} · with ${type.person.name}` : `${type.team} · ${type.duration}`}
              </span>
            </div>
            <button className="primary-button full" disabled={!slot} onClick={book}>
              Book this time <Icon name="arrow" size={17} />
            </button>
          </div>
        )
      }
    >
      {result ? (
        <>
            <div className={`booking-result ${result === 'booked' ? 'ok' : 'failed'}`}>
              <span className="result-icon" aria-hidden="true">
                <Icon name={result === 'booked' ? 'check' : 'alert'} size={24} />
              </span>

              <h2 id="booking-drawer-title">
                {result === 'booked'
                  ? `Booked — ${longDate(day.date)}`
                  : `This didn’t reach ${type.team}`}
              </h2>

              <p>
                {result === 'booked'
                  ? `${timeRange({ time: slot.time, end: slot.end })} with ${type.person.name}, ${place.toLowerCase()}.`
                  : `Nothing is booked. The time is still open on their calendar, so you have not lost it — but until this goes through, the conversation does not exist.`}
              </p>

              {result === 'booked' ? (
                <div className="result-facts">
                  <p>
                    <Icon name="calendar" size={15} />
                    <span>It is on your calendar and on {type.team}’s calendar.</span>
                  </p>
                  <p>
                    <Icon name="send" size={15} />
                    <span>
                      {subject.trim()
                        ? `${type.person.name} received what you wrote: “${subject.trim()}”`
                        : `You didn’t add a subject, so ${type.person.name} will ask at the start.`}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="result-facts">
                  <p>
                    <Icon name="alert" size={15} />
                    <span>
                      It is in your list as <strong>Not booked</strong>, so you don’t have to
                      remember that this happened.
                    </span>
                  </p>
                </div>
              )}

              <div className="result-actions">
                {result === 'booked' ? (
                  <button className="primary-button full" onClick={onClose}>
                    Done <Icon name="check" size={17} />
                  </button>
                ) : (
                  <>
                    <button className="primary-button full" onClick={() => setResult(null)}>
                      Try again <Icon name="refresh" size={17} />
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        onToast(
                          `${type.otherRoute} would open here — nothing is sent in this preview.`,
                        )
                      }
                    >
                      <Icon name="mail" size={16} /> {type.otherRoute}
                    </button>
                  </>
                )}
              </div>

              <small className="prototype-note">
                Preview: Aster’s scheduling system owns these calendars. Audentra never books
                anything on a team’s behalf.
              </small>
            </div>
        </>
      ) : (
        <>
              <h2 id="booking-drawer-title" className="sr-only">
                Book a conversation with {type.team}
              </h2>

              <div className="booking-step">
                <p className="panel-label">1 · What do you want to talk about?</p>
                <div className="choice-panel">
                  {types.map((entry) => (
                    <label key={entry.id} className={entry.id === typeId ? 'chosen' : ''}>
                      <input
                        type="radio"
                        name="conversation-type"
                        value={entry.id}
                        checked={entry.id === typeId}
                        onChange={() => chooseType(entry.id)}
                      />
                      <span>
                        <strong>{entry.label}</strong>
                        <small>
                          Goes to {entry.team} · {entry.duration}
                        </small>
                      </span>
                      <span className="radio-mark">
                        <Icon name="check" size={14} />
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="booking-step">
                <p className="panel-label">2 · When?</p>
                {day ? (
                  <SlotPicker
                    days={days}
                    day={day}
                    slotId={slot?.id ?? null}
                    team={type.team}
                    onDay={chooseDay}
                    onSlot={setSlot}
                  />
                ) : (
                  <div className="no-times">
                    <span aria-hidden="true">
                      <Icon name="clock" size={22} />
                    </span>
                    <h3>{type.team} hasn’t published any times</h3>
                    <p>
                      {type.publishes} There is nothing to pick from until then, and this page will
                      not pretend otherwise.
                    </p>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        onToast(
                          `${type.otherRoute} would open here — nothing is sent in this preview.`,
                        )
                      }
                    >
                      <Icon name="mail" size={16} /> {type.otherRoute}
                    </button>
                  </div>
                )}
              </div>

              {day && (
                <div className="booking-step">
                  <p className="panel-label">3 · What is it about?</p>
                  <label className="subject-field">
                    <span className="sr-only">What do you want to discuss?</span>
                    <textarea
                      rows={3}
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder="For example: whether the transcript I uploaded is the one you need."
                    />
                  </label>
                  <p className="form-help">
                    Optional, and worth writing: this travels with the booking to {type.team}, so{' '}
                    {type.person.name} can read it before you sit down.
                  </p>
                </div>
              )}
        </>
      )}
    </Drawer>
  );
}
