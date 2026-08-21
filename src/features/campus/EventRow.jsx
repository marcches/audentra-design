import Icon from '../../design-system/Icon.jsx';
import { dateTile, registrationChip } from './logic.js';

export default function EventRow({ event, past, matched, onOpen }) {
  const tile = dateTile(event.date);

  return (
    <button
      className={`campus-row ${event.required ? 'required' : ''} ${past ? 'past' : ''}`}
      onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
    >
      <span className="date-tile" aria-hidden="true">
        <small>{tile.month}</small>
        <strong>{tile.day}</strong>
      </span>

      <span className="campus-row-copy">
        <span className="campus-row-when">
          {event.time}
          <i aria-hidden="true">·</i>
          {event.location ?? 'Location to be announced'}
        </span>
        <span className="campus-row-title">
          {event.title}
          {event.required ? (
            <span className="required-chip small">
              <Icon name="alert" size={11} /> Required
            </span>
          ) : (
            <span className="category-chip">{event.category}</span>
          )}
        </span>
        <span className="campus-row-meta">
          <span>Hosted by {event.host}</span>
          {matched && (
            <span className="match-chip">
              <Icon name="spark" size={12} /> Matches {matched}
            </span>
          )}
        </span>
      </span>

      <span className={`campus-row-action ${event.required ? 'required' : ''}`}>
        {registrationChip(event, past)}
      </span>
    </button>
  );
}
