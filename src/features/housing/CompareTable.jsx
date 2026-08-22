import Icon from '../../design-system/Icon.jsx';
import PlaceTile from '../../design-system/primitives/PlaceTile.jsx';
import { formatMoney } from '../financials/logic.js';
import { ordinal, rateFrom } from './logic.js';

/**
 * The compare view — B4.3 of the review of 2026-08-21 (ENR-211 AC 2, "residences can be compared").
 *
 * The same residences as the list, one per row, with the attributes the cards carry laid out as
 * columns so two halls read against each other without scrolling between cards: the hall, its
 * rooms with their rates, the lowest rate, the meal plan, the walk, and the shortlist. The name
 * opens the detail; the last column does what the card's action does.
 *
 * It is a table and it scrolls sideways inside its own box below 720px — the body never does.
 * Reference: Zillow's units table and Expedia's results, the facts in columns (ENR-207
 * references.md).
 */
export default function CompareTable({
  residences,
  shortlist,
  canAdd,
  readOnly,
  onAdd,
  onOpen,
  onSeeShortlist,
}) {
  return (
    <div className="compare-wrap">
      <table className="compare-table">
        <caption className="sr-only">Residence halls side by side</caption>
        <thead>
          <tr>
            <th scope="col">Residence</th>
            <th scope="col">Rooms and rates</th>
            <th scope="col">From</th>
            <th scope="col">Meal plan</th>
            <th scope="col">Walk</th>
            {!readOnly && (
              <th scope="col">
                <span className="sr-only">Shortlist</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {residences.map((residence) => {
            const rankIndex = shortlist.indexOf(residence.id);
            const ranked = rankIndex >= 0;
            return (
              <tr key={residence.id} className={ranked ? 'ranked' : ''}>
                <td>
                  <span className="compare-name">
                    <PlaceTile image={residence.image} initials={residence.initials} size="sm" />
                    <span>
                      <button
                        type="button"
                        onClick={(clickEvent) => onOpen(residence, clickEvent.currentTarget)}
                      >
                        {residence.name}
                      </button>
                      <small>{residence.area}</small>
                    </span>
                  </span>
                </td>
                <td>
                  <ul className="compare-rooms">
                    {residence.rooms.map((room) => (
                      <li key={room.label}>
                        {room.label} · {formatMoney(room.rate)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="numeric compare-from">{formatMoney(rateFrom(residence))}</td>
                <td>
                  {residence.meals.included
                    ? `Included · ${formatMoney(residence.meals.amount)}`
                    : 'Self-catered · plan optional'}
                </td>
                <td className="numeric">{residence.walk} min</td>
                {!readOnly && (
                  <td className="compare-action">
                    {ranked ? (
                      <span className="ranked-mark">
                        <Icon name="check" size={14} /> {ordinal(rankIndex)}
                      </span>
                    ) : canAdd ? (
                      <button className="secondary-button" onClick={() => onAdd(residence.id)}>
                        <Icon name="arrow" size={14} /> Add
                      </button>
                    ) : (
                      <button type="button" className="text-button" onClick={onSeeShortlist}>
                        See your shortlist
                      </button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
