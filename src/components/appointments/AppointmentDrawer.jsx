import { useRef, useState } from 'react';
import Icon from '../../Icon.jsx';
import { useOverlay } from '../../lib/overlay.js';
import { longDate } from '../../lib/campus-helpers.js';
import { placeOf, relativeDay, stateOf, timeRange } from '../../lib/appointments.js';

/**
 * One conversation, in full — what it is, whether it exists, and what the student can still do
 * about it.
 *
 * The state banner is the first thing in the sheet, because it is the question the student came
 * with. A failed booking says so before it says anything else, and offers the only two moves that
 * are honest: try the same time again, or reach the team another way.
 *
 * Cancelling asks once, here, rather than through a browser dialog, and then leaves the
 * conversation in the record labelled `Cancelled` — ENR-178 AC 5. Rescheduling is out of scope on
 * the epic, so nothing on this sheet offers it.
 */
export default function AppointmentDrawer({
  appointment,
  type,
  today,
  onClose,
  onCancel,
  onRebook,
  onToast,
}) {
  const panel = useRef(null);
  const [confirming, setConfirming] = useState(false);

  useOverlay(panel, { onClose });

  const state = stateOf(appointment, today);
  const place = placeOf(type, appointment.format);

  const banner = {
    confirmed: {
      tone: 'ok',
      icon: 'check',
      title: `Confirmed · ${relativeDay(appointment.date, today)}`,
      body: `This is on your calendar and on ${type.team}’s. ${type.person.name} has what you wrote it is about.`,
    },
    failed: {
      tone: 'failed',
      icon: 'alert',
      title: 'Not booked',
      body: `This never reached ${type.team}, so nothing is scheduled. The time may still be open — trying again is the fastest way to find out.`,
    },
    cancelled: {
      tone: 'quiet',
      icon: 'close',
      title: `Cancelled by ${appointment.cancelledBy ?? 'you'}${
        appointment.cancelledOn ? ` on ${appointment.cancelledOn}` : ''
      }`,
      body: `The time went back to ${type.person.name}’s calendar. Nothing about your enrollment changed because of it.`,
    },
    done: {
      tone: 'quiet',
      icon: 'clock',
      title: `This happened ${relativeDay(appointment.date, today)}`,
      body: 'It stays here so you can see who you have already spoken to, and about what.',
    },
  }[state.tone];

  return (
    <>
      <button className="modal-scrim" aria-label="Close conversation" onClick={onClose} />
      <aside
        className="task-drawer appointment-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-drawer-title"
        ref={panel}
      >
        <div className="drawer-header">
          <div className="drawer-label">
            <span>{type.label}</span>
            <span>{longDate(appointment.date)}</span>
          </div>
          <button className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-content">
          <div className={`drawer-icon appointment ${state.tone}`}>
            <Icon name={appointment.format === 'video' ? 'video' : 'calendar'} size={25} />
          </div>
          <h2 id="appointment-drawer-title">
            {type.label} with {type.person.name}
          </h2>
          <p className="drawer-description">{type.blurb}</p>

          <div className={`appt-note ${banner.tone}`} role={state.tone === 'failed' ? 'alert' : undefined}>
            <span aria-hidden="true">
              <Icon name={banner.icon} size={17} />
            </span>
            <div>
              <strong>{banner.title}</strong>
              <p>{banner.body}</p>
            </div>
          </div>

          {/* The campus drawer's fact list, reused rather than re-cut: when, where, who is the
              same question on both screens. */}
          <dl className="campus-facts">
            <div>
              <dt>
                <Icon name="clock" size={15} /> When
              </dt>
              <dd>
                {longDate(appointment.date)}, {timeRange(appointment)}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name={appointment.format === 'video' ? 'video' : 'pin'} size={15} /> Where
              </dt>
              <dd>
                {place}
                {appointment.format === 'video' && ` · ${type.videoNote}`}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="profile" size={15} /> Who
              </dt>
              <dd>
                {type.person.name}, {type.person.office}
              </dd>
            </div>
          </dl>

          <div className="register-panel">
            <span className="panel-label">What you said it is about</span>
            <p>
              {appointment.subject ? (
                <em>“{appointment.subject}”</em>
              ) : (
                'You did not add a subject when you booked.'
              )}
            </p>
            <small className="prototype-note">
              {state.tone === 'failed'
                ? `This has not been sent to anyone — the booking never reached ${type.team}.`
                : `${type.team} received this with the booking, so nobody has to be caught up on the day.`}
            </small>
          </div>

          {state.tone === 'failed' && (
            <div className="drawer-actions">
              <button className="primary-button full" onClick={() => onRebook(type, appointment)}>
                Try this booking again <Icon name="refresh" size={17} />
              </button>
              <button
                className="secondary-button"
                onClick={() =>
                  onToast(`${type.otherRoute} would open here — nothing is sent in this preview.`)
                }
              >
                <Icon name="mail" size={16} /> {type.otherRoute}
              </button>
            </div>
          )}

          {state.tone === 'confirmed' && (
            <div className="drawer-actions">
              <button
                className="primary-button full"
                onClick={() =>
                  onToast('This would download an invite for your own calendar — nothing is sent.')
                }
              >
                Add to my calendar <Icon name="calendar" size={17} />
              </button>
              <button
                className="secondary-button"
                onClick={() =>
                  onToast(
                    `A message to ${type.person.name} would open here — nothing is sent in this preview.`,
                  )
                }
              >
                <Icon name="message" size={16} /> Message {type.person.name}
              </button>

              {confirming ? (
                <div className="cancel-confirm" role="group" aria-label="Cancel this conversation">
                  <p>
                    Cancel this conversation? The time goes back to {type.person.name}, and it stays
                    in your list marked <strong>Cancelled</strong>. Nothing reschedules it for you.
                  </p>
                  <div>
                    <button className="text-button danger" onClick={() => onCancel(appointment)}>
                      Yes, cancel it
                    </button>
                    <button className="text-button" onClick={() => setConfirming(false)}>
                      Keep it
                    </button>
                  </div>
                </div>
              ) : (
                <button className="text-button danger" onClick={() => setConfirming(true)}>
                  Cancel this conversation
                </button>
              )}
            </div>
          )}

          <p className="published-note">
            {appointment.bookedOn && state.tone !== 'failed'
              ? `You booked this ${appointment.bookedOn}. `
              : ''}
            Aster’s teams publish the times; the portal only books one of them.
          </p>
        </div>
      </aside>
    </>
  );
}
