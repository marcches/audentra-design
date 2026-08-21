import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { offices } from '../help/data.js';

/**
 * The rail — Accessibility.
 *
 * The anchor is the office's own usual reply time, the figure Help already
 * publishes for it. It is a service expectation, the one kind of time statement
 * the copy keeps (UX writing §1.5): it says how long the office usually takes,
 * and promises nothing about how or whether anyone will be contacted.
 *
 * Then the one office, in the same *Who is on the other side* shape Health uses
 * for its own: who receives the answer, what they decide (nothing), and where
 * they are. The shape is `.teams-list`, written once in `health.css` and reused
 * here the way every rail reuses `.provenance-card` from `campus.css`.
 */
export default function AccessibilityRail({ unavailable }) {
  const accessibility = offices.accessibility;

  return (
    <>
      <AnchorCard
        variant="reply"
        label="Usual reply"
        figure={unavailable ? '—' : accessibility.reply}
      >
        <p>
          {unavailable
            ? 'Your answer could not be read just now, so nothing here is a claim about where it is.'
            : `That’s how long ${accessibility.name} usually takes to answer when you ask to talk. Nothing for you to do while they have it.`}
        </p>
      </AnchorCard>

      <div className="provenance-card teams-card">
        <span className="panel-label">Who is on the other side</span>
        <ul className="teams-list">
          <li>
            <strong>{accessibility.name}</strong>
            <span>{accessibility.decides}</span>
            <span className="team-where">
              <Icon name="pin" size={13} /> {accessibility.location} · {accessibility.hours}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
