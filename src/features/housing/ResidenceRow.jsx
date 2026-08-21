import Icon from '../../design-system/Icon.jsx';
import { formatMoney } from '../financials/logic.js';
import { mealsLabel, ordinal, rateFrom } from './logic.js';

/**
 * One residence in the catalogue.
 *
 * Every row carries the same fields in the same order — that is the whole comparison feature.
 * ENR-211 AC 2 asks that residences can be compared;
 * [Zillow](https://mobbin.com/screens/a8e8b6ba-4655-4505-8d1c-64f2386e12bf) and
 * [Navan](https://mobbin.com/screens/5a6271b9-66f8-4f3b-8339-c293c91b682b) both answer it with
 * disciplined columns rather than a compare mode, which is what survives a catalogue of forty.
 *
 * The tile is a monogram, as `OrgRow` already does for clubs. This design system has no image
 * library, and a grey rectangle promising a photograph that is never coming is worse than a letter.
 *
 * When the shortlist is full the action is disabled **with its reason on the row**. A dead button
 * with no explanation is the thing this repo keeps not doing.
 */
export default function ResidenceRow({ residence, rankIndex, canAdd, readOnly, onAdd, onOpen }) {
  const ranked = rankIndex >= 0;

  return (
    <div className={`residence-row ${ranked ? 'ranked' : ''}`}>
      <button
        className="residence-main"
        onClick={(clickEvent) => onOpen(residence, clickEvent.currentTarget)}
      >
        <span className="org-tile" aria-hidden="true">
          {residence.initials}
        </span>

        <span className="residence-copy">
          <span className="residence-title">
            {residence.name}
            {ranked && <span className="rank-chip">{ordinal(rankIndex)}</span>}
          </span>
          <span className="residence-summary">{residence.summary}</span>
          <span className="residence-meta">
            <span>
              <Icon name="pin" size={13} /> {residence.area}
            </span>
            <span>
              <Icon name="clock" size={13} /> {residence.walk} min walk
            </span>
            <span>
              <Icon name="home" size={13} /> {residence.rooms.map((room) => room.label).join(' · ')}
            </span>
          </span>
        </span>

        <span className="residence-rate">
          <strong>from {formatMoney(rateFrom(residence))}</strong>
          <small>{mealsLabel(residence)}</small>
        </span>
      </button>

      {!readOnly && (
        <div className="residence-action">
          {ranked ? (
            <span className="ranked-mark">
              <Icon name="check" size={15} /> On your shortlist
            </span>
          ) : canAdd ? (
            <button className="secondary-button" onClick={() => onAdd(residence.id)}>
              <Icon name="arrow" size={15} /> Add to shortlist
            </button>
          ) : (
            <span className="action-reason">
              <Icon name="info" size={14} /> Your shortlist is full. Remove one to add this
            </span>
          )}
        </div>
      )}
    </div>
  );
}
