import Icon from '../../design-system/Icon.jsx';
import PlaceTile from '../../design-system/primitives/PlaceTile.jsx';
import { formatMoney } from '../financials/logic.js';
import { mealsLabel, ordinal, rateFrom } from './logic.js';

/**
 * One residence in the catalogue.
 *
 * Every row carries the same fields in the same order — that is the whole comparison feature.
 * ENR-211 AC 2 asks that residences can be compared;
 * [Zillow](https://mobbin.com/screens/a8e8b6ba-4655-4505-8d1c-64f2386e12bf) and
 * [Navan](https://mobbin.com/screens/5a6271b9-66f8-4f3b-8339-c293c91b682b) both answer it with
 * disciplined columns rather than a compare mode, which is what survives a catalogue of forty —
 * and since the review of 2026-08-21 the catalogue also has a compare view, where the filters live.
 *
 * The leading slot is the hall's **picture** (G1, rule 4): what Residential Life published, fixed
 * ratio, cropped to fill — the building, never a specific room. The monogram survives only as the
 * fallback for a hall with no picture on file, as `OrgRow` does for clubs. Reference: Expedia's
 * results card, the photograph leading (ENR-207 references.md).
 *
 * When the shortlist is full the row says so **and takes her there** (G8): the sentence is the
 * action, because with a long catalogue the shortlist is off screen when she reads it.
 */
export default function ResidenceRow({
  residence,
  rankIndex,
  canAdd,
  readOnly,
  onAdd,
  onOpen,
  onSeeShortlist,
}) {
  const ranked = rankIndex >= 0;

  return (
    <div className={`residence-row ${ranked ? 'ranked' : ''}`}>
      <button
        className="residence-main"
        onClick={(clickEvent) => onOpen(residence, clickEvent.currentTarget)}
      >
        <PlaceTile image={residence.image} initials={residence.initials} size="md" />

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
            <button type="button" className="text-button shortlist-full" onClick={onSeeShortlist}>
              <Icon name="info" size={14} /> Your shortlist is full. See your shortlist to swap one.
            </button>
          )}
        </div>
      )}
    </div>
  );
}
