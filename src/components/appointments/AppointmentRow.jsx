import Icon from '../../Icon.jsx';
import { dateTile } from '../../lib/campus-helpers.js';
import { placeOf, stateOf, timeRange } from '../../lib/appointments.js';

/**
 * One conversation, in the list. Same grid as the campus row, so the two lists in the portal that
 * hold dated things line up rather than each inventing a shape.
 *
 * The state is a chip **on the row** — never a tab above the list. A booking that failed has to be
 * where the student is already looking (ENR-178 AC 6); a filter it could hide behind is exactly the
 * thing the guardrail forbids. A failed row is marked by tinting its own ink — the tile and the
 * chip — because painting an edge on a rounded row is a rule bar wearing a card's corners.
 */
export default function AppointmentRow({ appointment, type, today, onOpen }) {
  const tile = dateTile(appointment.date);
  const state = stateOf(appointment, today);
  const quiet = state.tone === 'done' || state.tone === 'cancelled';

  return (
    <button
      className={`campus-row appointment-row ${state.tone} ${quiet ? 'past' : ''}`}
      onClick={(event) => onOpen(appointment, event.currentTarget)}
    >
      <span className="date-tile" aria-hidden="true">
        <small>{tile.month}</small>
        <strong>{tile.day}</strong>
      </span>

      <span className="campus-row-copy">
        <span className="campus-row-when">
          {timeRange(appointment)}
          <i aria-hidden="true">·</i>
          {appointment.format === 'video' && <Icon name="video" size={12} />}
          {placeOf(type, appointment.format)}
        </span>
        <span className="campus-row-title">
          {type.label} with {type.person.name}
        </span>
        <span className="campus-row-meta">
          <span className="appointment-subject">
            {appointment.subject ? `About: ${appointment.subject}` : 'No subject was added'}
          </span>
        </span>
      </span>

      <span className={`appt-state ${state.tone}`}>{state.label}</span>
    </button>
  );
}
