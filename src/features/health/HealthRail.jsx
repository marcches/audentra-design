import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { offices } from '../help/data.js';
import { issuedDocuments } from '../documents/data.js';

/**
 * The rail — ENR-206.
 *
 * The anchor is how long Health Services takes. That number is what makes *in
 * review* read as pending rather than as broken, and it is genuinely secondary
 * to the record's own state, which is the summary panel's figure.
 *
 * Then the team on the other side: who decides on the file, and where they are.
 * Accessibility Services used to sit beside it here; it has its own section now
 * (ADR-0003).
 *
 * Last, a route to the list Aster already published. "What counts as proof?" has
 * an answer written by Health Services and sitting in her own record; writing a
 * second version of it here would be a second version of a policy.
 */
export default function HealthRail({ unavailable, onToast }) {
  const health = offices.health;
  const published = issuedDocuments.find((item) => item.office === 'health') ?? null;

  return (
    <>
      <AnchorCard
        variant="reply"
        label="How long a review takes"
        figure={unavailable ? '—' : health.reply}
      >
        <p>
          {unavailable
            ? 'Your record could not be read just now, so nothing here is a claim about where it is.'
            : 'That’s how long Health Services usually takes to decide. Nothing for you to do while they have it.'}
        </p>
      </AnchorCard>

      <div className="provenance-card teams-card">
        <span className="panel-label">Who is on the other side</span>
        <ul className="teams-list">
          <li>
            <strong>{health.name}</strong>
            <span>{health.decides}</span>
            <span className="team-where">
              <Icon name="pin" size={13} /> {health.location} · {health.hours}
            </span>
          </li>
        </ul>
      </div>

      {published && (
        <div className="provenance-card published-card">
          <span className="panel-label">What counts as proof</span>
          <p>
            {health.name} published the list of required vaccines and what Aster accepts as evidence
            of each. It’s on your record, sent to you {published.issued}.
          </p>
          <a
            className="link-button"
            href="#/profile"
            onClick={() => onToast(`${published.title} is on your record in My Documents.`)}
          >
            <Icon name="file" size={14} /> {published.title}
          </a>
        </div>
      )}
    </>
  );
}
