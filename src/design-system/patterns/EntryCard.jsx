import Icon from '../Icon.jsx';
import Card, { CardFoot, CardHead } from '../primitives/Card.jsx';

/**
 * The card that opens a panel living under this page.
 *
 * The Jam of 2026-08-21 took two rows out of the sidebar without taking the
 * screens away: My Documents belongs to Profile now, and Accessibility to
 * Health. Neither is a destination any more — `PANELS` in `navigation.js` — so
 * the parent's page has to be the way in, and this is the one shape for that,
 * so the two do not get invented twice. Deel's person page is the reference:
 * name, one line saying what is there, and the way in.
 *
 * The action is a **button, not a link**, and that is the whole point of the
 * second pass: it opens the side panel where the rest of the portal opens
 * everything that lives inside a page. It used to be an `<a href>` to a route,
 * which made a page reachable from exactly one card and from no navigation —
 * a fourth kind of destination nobody navigates.
 *
 * Head, then foot, and nothing between: the card is a door, not a copy of the
 * room behind it. What stands there today goes in the foot beside the action,
 * and the count on the head is the same count the panel itself shows.
 */
export default function EntryCard({ id, icon, title, note, count = 0, standing, onOpen, action }) {
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
        <button className="secondary-button" onClick={onOpen}>
          {action} <Icon name="arrow" size={15} />
        </button>
      </CardFoot>
    </Card>
  );
}
