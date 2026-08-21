import Icon from '../../design-system/Icon.jsx';
import { shortDate } from '../campus/logic.js';

/**
 * One conversation type, and the team that receives it — ENR-178 AC 2 as a row rather than as a
 * sentence somewhere else. The trailing edge is the part that matters: **a type with nothing
 * published says so here**, before the picker opens, so the student is never walked into an empty
 * calendar (AC 7, Scenario 5). The row still opens, because what they need then is the route to the
 * team, not a disabled button.
 *
 * `unavailable` is the partial-data case: the times did not load. That is not the same claim as
 * "this team has published nothing", so it does not borrow its words.
 */
export default function TypeRow({ type, days, unavailable, onOpen }) {
  const count = days.reduce((total, day) => total + day.slots.length, 0);
  const next = days[0]?.date ?? null;
  const quiet = unavailable || count === 0;

  // The strip above the card already says why booking is closed; three rows repeating it is noise.
  const trailing = unavailable ? (
    <strong>Times unavailable</strong>
  ) : count === 0 ? (
    <>
      <strong>No times available</strong>
    </>
  ) : (
    <>
      <strong>Next {shortDate(next)}</strong>
      <small>
        {count} {count === 1 ? 'time' : 'times'} open
      </small>
    </>
  );

  const body = (
    <>
      <span className="type-tile" aria-hidden="true">
        <Icon name={quiet ? 'clock' : 'calendar'} size={19} />
      </span>

      <span className="type-copy">
        <span className="type-name">{type.label}</span>
        <span className="type-team">
          {type.team} · {type.duration}
        </span>
        <span className="type-blurb">{type.blurb}</span>
      </span>

      <span className={`type-next ${quiet ? 'quiet' : ''}`}>{trailing}</span>
    </>
  );

  // Nothing to open when the times themselves failed: a row that opens onto an error it already
  // states is a dead end with a hover state.
  if (unavailable) return <div className="type-row static quiet">{body}</div>;

  return (
    <button
      className={`type-row ${quiet ? 'quiet' : ''}`}
      onClick={(event) => onOpen(type, event.currentTarget)}
    >
      {body}
    </button>
  );
}
