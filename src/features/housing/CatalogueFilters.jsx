import Icon from '../../design-system/Icon.jsx';
import { formatMoney } from '../financials/logic.js';
import {
  MEAL_PLANS,
  NO_FILTERS,
  PRICE_CEILINGS,
  ROOM_KINDS,
  activeFilterCount,
  countWith,
} from './logic.js';

const REASON = 'No residences match this with your other filters.';

/**
 * The filters — G10 of the review of 2026-08-21, on the compare view.
 *
 * Three, and they are the attributes the cards show: the room type, the meal plan, a ceiling on
 * the lowest rate. The chips are the same treatment the two sorts wear, because a filter and a
 * sort are the same kind of control on this screen.
 *
 * The rule that matters is the negative one: **no filter produces an empty list.** Every chip
 * carries the count it would return with the other two as they are — the number
 * [Walmart](https://mobbin.com/screens/8df6d24a-9cda-46d8-a0bc-1a682ceeb583) prints on its chips —
 * and a chip that would return nothing is disabled and says why, in a line she can read without
 * hovering, since hover reaches neither a phone nor a keyboard.
 */
export default function CatalogueFilters({ catalogue, filters, onChange }) {
  const groups = [
    { key: 'kind', label: 'Room type', options: ROOM_KINDS },
    { key: 'meals', label: 'Meal plan', options: MEAL_PLANS },
    {
      key: 'ceiling',
      label: 'Price up to',
      options: PRICE_CEILINGS.map((ceiling) => [ceiling, formatMoney(ceiling)]),
    },
  ];

  const dead = [];
  for (const group of groups) {
    for (const [value, label] of group.options) {
      if (filters[group.key] !== value && countWith(catalogue, filters, group.key, value) === 0) {
        dead.push(label);
      }
    }
  }

  function toggle(key, value) {
    onChange({ ...filters, [key]: filters[key] === value ? null : value });
  }

  return (
    <div className="catalogue-filters" aria-label="Filter the residence halls">
      {groups.map((group) => (
        <div className="catalogue-filter" key={group.key}>
          <span>{group.label}</span>
          <div className="sort-group">
            {group.options.map(([value, label]) => {
              const active = filters[group.key] === value;
              const count = countWith(catalogue, filters, group.key, value);
              const disabled = !active && count === 0;
              return (
                <button
                  key={String(value)}
                  type="button"
                  className={active ? 'selected' : ''}
                  aria-pressed={active}
                  disabled={disabled}
                  title={disabled ? REASON : undefined}
                  onClick={() => toggle(group.key, value)}
                >
                  {label}
                  {!active && !disabled ? <small>{count}</small> : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {dead.length > 0 || activeFilterCount(filters) > 0 ? (
        <div className="catalogue-filters-foot">
          {dead.length > 0 ? (
            <p className="filter-reason">
              <Icon name="info" size={13} /> No residences match {listOf(dead)} with your other
              filters.
            </p>
          ) : null}
          {activeFilterCount(filters) > 0 ? (
            <button type="button" className="text-button" onClick={() => onChange(NO_FILTERS)}>
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function listOf(items) {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
}
