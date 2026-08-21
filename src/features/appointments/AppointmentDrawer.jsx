import { useState } from 'react';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import { longDate } from '../campus/logic.js';
import { articled, placeOf, relativeDay, stateOf, teamName, timeRange } from './logic.js';

/**
 * One conversation, in full — what it is, whether it exists, and what the student can still do
 * about it.
 *
 * The state banner is the first thing in the sheet, because it is the question the student came
 * with. A failed booking says so before it says anything else, and offers the one move that is
 * honest: try the same time again. A time request (ADR 0005) says it is waiting, and on whom.
 *
 * The actions here are the row's actions, at full width: add to calendar, reschedule, and cancel —
 * which asks once, here, rather than through a browser dialog, and then leaves the conversation in
 * the record labelled `Cancelled` (ENR-178 AC 5). Rescheduling is the same picker, opened from the
 * conversation; what it books replaces this record (changes of 2026-08-21, A3).
 */
export default function AppointmentDrawer({
  appointment,
  type,
  today,
  onClose,
  onCancel,
  onRebook,
  onReschedule,
  onBookAgain,
  onCancelRequest,
  onToast,
}) {
  const [confirming, setConfirming] = useState(false);

  const state = stateOf(appointment, today);
  const place = placeOf(type, appointment.format);
  const team = teamName(type);

  const banner = {
    confirmed: {
      tone: 'ok',
      icon: 'check',
      title: `Confirmed · ${relativeDay(appointment.date, today)}`,
      body: `This is on your calendar and on ${articled(type.team)}’s. ${type.person.name} has what you wrote it is about.`,
    },
    failed: {
      tone: 'failed',
      icon: 'alert',
      title: 'Not booked',
      body: `This never reached ${articled(type.team)}, so nothing is scheduled. The time may still be open. Trying again is the fastest way to find out.`,
    },
    requested: {
      tone: 'quiet',
      icon: 'send',
      title: `Requested · sent ${appointment.requestedOn}`,
      body: 'Waiting on the team. Their answer shows up here. Nothing is booked until they do.',
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

  const requested = state.tone === 'requested';

  return (
    <Drawer
      variant="appointment"
      label={[type.category, requested ? `Sent ${appointment.requestedOn}` : longDate(appointment.date)]}
      titleId="appointment-drawer-title"
      closeLabel="Close"
      onClose={onClose}
    >
      <div className={`drawer-icon appointment ${state.tone}`} aria-hidden="true">
        <Icon
          weight="duotone"
          name={requested ? 'clock' : appointment.format === 'video' ? 'video' : 'calendar'}
          size={25}
        />
      </div>
      <h2 id="appointment-drawer-title">
        {requested ? `${type.label} · ${team}` : `${type.label} with ${type.person.name}`}
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
            {requested
              ? `Not set yet. You asked for: “${appointment.window}”`
              : `${longDate(appointment.date)}, ${timeRange(appointment)}`}
          </dd>
        </div>
        <div>
          <dt>
            <Icon name={appointment.format === 'video' ? 'video' : 'pin'} size={15} /> Where
          </dt>
          <dd>
            {requested ? type.place : place}
            {appointment.format === 'video' && ` · ${type.videoNote}`}
          </dd>
        </div>
        <div>
          <dt>
            <Icon name={requested ? 'users' : 'profile'} size={15} /> Who
          </dt>
          <dd>{requested ? team : `${type.person.name}, ${type.person.office}`}</dd>
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
            ? `This has not been sent to anyone. The booking never reached ${articled(type.team)}.`
            : requested
              ? `${articled(type.team, true)} has this with your request.`
              : `${articled(type.team, true)} received this with the booking, so nobody has to be caught up on the day.`}
        </small>
      </div>

      {state.tone === 'failed' && (
        <div className="drawer-actions">
          <Button kind="primary" full icon="refresh" onClick={() => onRebook(type, appointment)}>
            Try this booking again
          </Button>
        </div>
      )}

      {state.tone === 'cancelled' && (
        <div className="drawer-actions">
          <Button kind="primary" full icon="arrow" onClick={() => onBookAgain(appointment)}>
            Book this again
          </Button>
        </div>
      )}

      {requested && (
        <div className="drawer-actions">
          <button
            type="button"
            className="text-button danger"
            onClick={() => onCancelRequest(appointment)}
          >
            Cancel request
          </button>
        </div>
      )}

      {state.tone === 'confirmed' && (
        <div className="drawer-actions">
          <Button
            kind="primary"
            full
            icon="calendar"
            onClick={() =>
              onToast('This would download an invite for your own calendar. Nothing is sent.')
            }
          >
            Add to calendar
          </Button>
          <Button kind="secondary" full icon="arrow" onClick={() => onReschedule(appointment)}>
            Reschedule
          </Button>

          {confirming ? (
            <div className="cancel-confirm" role="group" aria-label="Cancel this conversation">
              <p>
                Cancel this conversation? The time goes back to {type.person.name}, and it stays
                in your list marked <strong>Cancelled</strong>. Nothing reschedules it for you.
              </p>
              <div>
                <button type="button" className="text-button danger" onClick={() => onCancel(appointment)}>
                  Yes, cancel it
                </button>
                <button type="button" className="text-button" onClick={() => setConfirming(false)}>
                  Keep it
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="text-button danger" onClick={() => setConfirming(true)}>
              Cancel this conversation
            </button>
          )}
        </div>
      )}

      <p className="published-note">
        {appointment.bookedOn && state.tone !== 'failed' && !requested
          ? `You booked this ${appointment.bookedOn}. `
          : ''}
        Aster’s teams publish the times; the portal books one of them, or asks them for another.
      </p>
    </Drawer>
  );
}
