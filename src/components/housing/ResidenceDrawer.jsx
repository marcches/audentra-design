import { useRef } from 'react';
import Icon from '../../Icon.jsx';
import { useOverlay } from '../../lib/overlay.js';
import { formatMoney } from '../../lib/money.js';
import { housingOffice } from '../../housing-data.js';
import { SHORTLIST_MAX, ordinal, reconciliation } from '../../lib/housing.js';

/**
 * One residence, in full — the side panel over the list that
 * [TravelPerk](https://mobbin.com/screens/400742aa-9385-480d-bf89-288a39775c5c) uses for the same
 * job, and the drawer construction this repo already runs everywhere else.
 *
 * This is where ENR-211 AC 8 is actually answered. Rates vary by residence, so they cannot be made
 * identical to the single figure `costOfAttendance` carries; instead each residence states, in
 * money, exactly how it sits against the figure My Financials built its estimate on, and says what
 * would have to happen for that estimate to move. A number that differs and explains itself does
 * not contradict anything. A number that differs silently does.
 */
export default function ResidenceDrawer({
  residence,
  rankIndex,
  canAdd,
  readOnly,
  onAdd,
  onRemove,
  onClose,
}) {
  const panel = useRef(null);
  useOverlay(panel, { onClose });

  const ranked = rankIndex >= 0;

  return (
    <>
      <button className="modal-scrim" aria-label="Close residence" onClick={onClose} />
      <aside
        className="task-drawer residence-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="residence-drawer-title"
        ref={panel}
      >
        <div className="drawer-header">
          <div className="drawer-label">
            <span>{residence.area}</span>
            <span>{residence.walk} min walk</span>
          </div>
          <button className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-icon housing">
            <span className="org-tile large" aria-hidden="true">
              {residence.initials}
            </span>
          </div>
          <h2 id="residence-drawer-title">{residence.name}</h2>
          <p className="drawer-description">{residence.about}</p>

          {ranked && (
            <p className="ranked-banner">
              <Icon name="check" size={16} /> This is your {ordinal(rankIndex)}.
            </p>
          )}

          <h3 className="drawer-subheading">Rooms and rates</h3>
          <table className="rate-table">
            <caption className="sr-only">Room types at {residence.name} and their annual rates</caption>
            <tbody>
              {residence.rooms.map((room) => (
                <tr key={room.label}>
                  <th scope="row">{room.label}</th>
                  <td>{formatMoney(room.rate)}</td>
                </tr>
              ))}
              <tr className={residence.meals.included ? '' : 'optional'}>
                <th scope="row">
                  Meal plan
                  <small>
                    {residence.meals.included
                      ? 'Required with this residence'
                      : 'Optional — this residence is self-catered'}
                  </small>
                </th>
                <td>{formatMoney(residence.meals.amount)}</td>
              </tr>
            </tbody>
          </table>

          <p className="reconcile-note">
            <Icon name="wallet" size={16} />
            <span>{reconciliation(residence)}</span>
          </p>

          <h3 className="drawer-subheading">What is in the building</h3>
          <ul className="feature-list">
            {residence.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={14} /> {feature}
              </li>
            ))}
          </ul>

          {!readOnly && (
            <div className="drawer-actions">
              {ranked ? (
                <button className="secondary-button full" onClick={() => onRemove(residence.id)}>
                  <Icon name="close" size={16} /> Remove from my shortlist
                </button>
              ) : canAdd ? (
                <button className="primary-button full" onClick={() => onAdd(residence.id)}>
                  Add to my shortlist <Icon name="arrow" size={17} />
                </button>
              ) : (
                <p className="action-reason block">
                  <Icon name="info" size={15} /> Your shortlist already names {SHORTLIST_MAX}{' '}
                  residences. Remove one to add this instead.
                </p>
              )}
              <p className="drawer-foot">
                Adding a residence tells {housingOffice} what you would like. It does not hold a room.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
