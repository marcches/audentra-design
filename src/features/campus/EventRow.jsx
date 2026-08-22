import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { dateTile, rowRegistration } from './logic.js';

/**
 * One event in the list — and since the review of 2026-08-21 (C4, C7) a row that acts.
 *
 * It stopped being one button the day it grew inner ones: the title is the way into the drawer,
 * and the trailing edge carries what the RSVP line used to only describe — a booking that links
 * out and says so, *Email the host* where it is by email, and a label where there is nothing to do
 * ("No RSVP needed" stays a label). Events take **Follow**: an event is dated, so following it is
 * about being reminded, and it changes nothing about her interests, her progress or her points.
 *
 * [Circle](https://mobbin.com/screens/bbb7b785-2793-4264-9123-5a7a24f8191b): date tile, title,
 * the control at the row's edge — taken. [Nextdoor](https://mobbin.com/screens/3d683c37-08d4-41b2-bb44-86342b04b12d):
 * "Interested?" as a low-commitment signal per event — taken for the register of *Follow*.
 */
export default function EventRow({ event, past, matched, following, onOpen, onAct, onFollow }) {
  const tile = dateTile(event.date);
  const registration = rowRegistration(event, past);

  return (
    <div className={`campus-row ${event.required ? 'required' : ''} ${past ? 'past' : ''}`}>
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
          <button
            type="button"
            className="row-title-button"
            onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
          >
            {event.title}
          </button>
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

      <span className="campus-row-actions">
        {registration.control ? (
          <Button
            kind="secondary"
            icon={registration.control.icon}
            onClick={() => onAct(event, registration.control)}
          >
            {registration.control.label}
          </Button>
        ) : (
          <span className={`campus-row-action ${event.required ? 'required' : ''}`}>
            {registration.label}
          </span>
        )}
        {!past && !event.required && (
          <button
            type="button"
            className={`text-button follow ${following ? 'on' : ''}`}
            aria-pressed={following}
            onClick={() => onFollow(event)}
          >
            <Icon name="follow" size={14} weight={following ? 'fill' : 'regular'} />{' '}
            {following ? 'Following' : 'Follow'}
          </button>
        )}
      </span>
    </div>
  );
}
