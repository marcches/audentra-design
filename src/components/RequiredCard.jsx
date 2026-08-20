import Icon from '../Icon.jsx';
import { longDate } from '../lib/campus-helpers.js';

export default function RequiredCard({ event, onOpen }) {
  return (
    <article className="required-card">
      <div className="required-top">
        <span className="required-chip">
          <Icon name="alert" size={13} /> Required
        </span>
        <span>
          {longDate(event.date)} · {event.time}
        </span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.requiredNote}</p>
      <div className="required-facts">
        <span>
          <Icon name="pin" size={14} /> {event.location ?? 'Location to be announced'}
        </span>
        <span>
          <Icon name="shield" size={14} /> Required by {event.requiredBy}
        </span>
      </div>
      <button
        className="primary-button"
        onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
      >
        {event.registration.kind === 'tba' ? 'See what is required' : 'How to register'}{' '}
        <Icon name="arrow" size={16} />
      </button>
    </article>
  );
}
