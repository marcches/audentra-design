import Icon from '../../design-system/Icon.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { dateTile } from '../campus/logic.js';
import { placeOf, stateOf, teamName, timeRange } from './logic.js';
import { runningName } from '../edward/logic.js';

/**
 * One conversation, in the list — booked, failed, requested, happened or cancelled.
 *
 * The grid is the campus row's (date tile, the copy, a trailing cell), so the two lists in the
 * portal that hold dated things line up; the trailing cell is the task row's action column, since
 * the changes of 2026-08-21 (A3, A5, A7): the state badge, then what the student can do about it.
 * That is why the row is an `article` and not one big button any more — a button inside a button
 * is invalid, and a confirmed conversation now carries two. The title is the way into the detail
 * sheet, which still holds the facts and the cancel.
 *
 * The state is a badge **on the row** — never a tab above the list. A booking that failed has to be
 * where the student is already looking (ENR-178 AC 6); a filter it could hide behind is exactly
 * the thing the guardrail forbids. A failed row is marked by tinting its own ink — the tile and the
 * badge — because painting an edge on a rounded row is a rule bar wearing a card's corners.
 *
 * A time request (ADR 0005) has no date: its tile is a clock, it says what was asked and when, and
 * it waits. The band of the page (A6) sits on this row only when it is the booking that never
 * reached its team — the one thing here that depends on her.
 */
export default function AppointmentRow({
  appointment,
  type,
  today,
  band = false,
  onOpen,
  onCalendar,
  onReschedule,
  onRetry,
  onBookAgain,
  onCancelRequest,
}) {
  const state = stateOf(appointment, today);
  const requested = state.tone === 'requested';
  const past = state.tone === 'done' || state.tone === 'cancelled';
  const tile = requested ? null : dateTile(appointment.date);

  const title = requested
    ? `${type.label} · ${teamName(type)}`
    : `${type.label} with ${type.person.name}`;

  return (
    <article
      className={['appointment-row', state.tone, past && 'past', band && 'recommended']
        .filter(Boolean)
        .join(' ')}
      data-appointment={appointment.id}
    >
      {band && <ActionBand icon="alert" label="This one didn’t reach the team" />}

      <div className="appointment-row-body">
        {requested ? (
          <span className="date-tile pending" aria-hidden="true">
            <Icon name="clock" size={20} weight="duotone" />
          </span>
        ) : (
          <span className="date-tile" aria-hidden="true">
            <small>{tile.month}</small>
            <strong>{tile.day}</strong>
          </span>
        )}

        <div className="campus-row-copy">
          <span className="campus-row-when">
            {requested ? (
              <>Sent {appointment.requestedOn}</>
            ) : (
              <>
                {timeRange(appointment)}
                <i aria-hidden="true">·</i>
                {appointment.format === 'video' && <Icon name="video" size={12} />}
                {placeOf(type, appointment.format)}
              </>
            )}
            {state.tone === 'cancelled' && (
              <>
                <i aria-hidden="true">·</i>
                Cancelled by {appointment.cancelledBy ?? 'you'}
                {appointment.cancelledOn ? ` on ${appointment.cancelledOn}` : ''}
              </>
            )}
          </span>

          <h3 className="campus-row-title">
            <button
              type="button"
              className="row-link"
              onClick={(event) => onOpen(appointment, event.currentTarget)}
            >
              {title}
            </button>
          </h3>

          {/* The "About" field is the best detail on the screen (N1): the student's question, in
              her words, travelling into the room. It stays, whatever else has to go. */}
          <span className="campus-row-meta">
            <span className="appointment-subject">
              {appointment.subject ? `About: ${appointment.subject}` : 'No subject was added'}
            </span>
          </span>

          {requested && (
            <>
              <span className="campus-row-meta">
                <span className="appointment-subject">Usually free: “{appointment.window}”</span>
              </span>
              {/* §6.2 of the review of 2026-08-21: the reply arrives here — an email
                  only says it is waiting (ENR-177) — and no assignee is named. */}
              <span className="appointment-support">
                Waiting on {runningName(type.team)}. You’ll see their reply here.
              </span>
            </>
          )}
        </div>

        <div className="task-action">
          <span className={`appt-state ${state.tone}`}>{state.label}</span>

          {state.tone === 'confirmed' && (
            <>
              <Button
                kind="secondary"
                leadingIcon="calendar"
                onClick={() => onCalendar(appointment)}
              >
                Add to calendar
              </Button>
              <button
                type="button"
                className="text-button"
                onClick={(event) => onReschedule(appointment, event.currentTarget)}
              >
                Reschedule
              </button>
            </>
          )}

          {state.tone === 'failed' && (
            <Button
              kind={band ? 'primary' : 'secondary'}
              icon="refresh"
              onClick={(event) => onRetry(appointment, event.currentTarget)}
            >
              Try again
            </Button>
          )}

          {state.tone === 'cancelled' && (
            <Button
              kind="secondary"
              icon="arrow"
              onClick={(event) => onBookAgain(appointment, event.currentTarget)}
            >
              Book this again
            </Button>
          )}

          {requested && (
            <button
              type="button"
              className="text-button danger"
              onClick={() => onCancelRequest(appointment)}
            >
              Cancel request
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
