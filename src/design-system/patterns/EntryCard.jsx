import Icon from '../Icon.jsx';
import Card, { CardFoot, CardHead } from '../primitives/Card.jsx';

/**
 * The card that opens a section living under this one.
 *
 * The Jam of 2026-08-21 took two rows out of the sidebar without taking the
 * pages away: My Documents lives under Profile now, and Accessibility under
 * Health. A destination with a `parent` in `navigation.js` has no row of its
 * own, so the parent's page has to be the way in — and this is the one shape
 * for that, so the two do not get invented twice. Deel's person page is the
 * reference: name, one line saying what is there, and the way in.
 *
 * Head, then foot, and nothing between: the card is a door, not a copy of the
 * room behind it. What stands there today goes in the foot beside the action,
 * and the count on the head is the same count the page itself shows.
 */
export default function EntryCard({ id, icon, title, note, count = 0, standing, href, action }) {
  const titleId = `${id}-entry-title`;
  return (
    <Card className="entry-card" aria-labelledby={titleId}>
      <CardHead
        kind="card"
        icon={icon}
        title={title}
        titleId={titleId}
        note={note}
        aside={count > 0 ? <span className="status-count">{count}</span> : null}
      />
      <CardFoot className="entry-foot">
        <span>{standing}</span>
        <a className="secondary-button" href={href}>
          {action} <Icon name="arrow" size={15} />
        </a>
      </CardFoot>
    </Card>
  );
}
