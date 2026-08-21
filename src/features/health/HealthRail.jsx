import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { offices } from '../help/data.js';
import { issuedDocuments } from '../documents/data.js';

/**
 * The rail — ENR-206, and the changes of 2026-08-21 (H5).
 *
 * The anchor is how long Health Services takes. That number is what makes *in
 * review* read as pending rather than as broken, and it is genuinely secondary
 * to the record's own state, which is the panel's figure.
 *
 * Then the team on the other side of the record: who decides on the file, and
 * where they are. Then a route to the list Aster already published — "What
 * counts as proof?" has an answer written by Health Services and sitting in her
 * own record; writing a second version of it here would be a second version of
 * a policy.
 *
 * Last, the other team. The page carries two things, and until the changes of
 * 2026-08-21 every card here was about the record: a student deciding whether
 * to answer the accessibility question had nowhere to learn who Accessibility
 * Services is, where they are, or what happens after she says yes. ADR-0003's
 * third amendment had taken this card out of the rail when the question moved
 * into the side panel; it is back because the question's state is on the page
 * again, and it renders in every state, because the question exists in every
 * state. The first three cards name the record in their titles so it is clear
 * which of the two things each one is about.
 */
export default function HealthRail({ unavailable, onToast }) {
  const health = offices.health;
  const access = offices.accessibility;
  const published = issuedDocuments.find((item) => item.office === 'health') ?? null;

  return (
    <>
      <AnchorCard
        variant="reply"
        label="How long a record review takes"
        figure={unavailable ? '—' : health.reply}
      >
        <p>
          {unavailable
            ? 'Your record could not be read just now, so nothing here is a claim about where it is.'
            : 'That’s how long Health Services usually takes to decide. Nothing for you to do while they have it.'}
        </p>
      </AnchorCard>

      <div className="provenance-card teams-card">
        <span className="panel-label">Who reviews your record</span>
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

      {/* The office is named from `offices`, as every office is — one name per
          office (CONTEXT.md), never an institutional prefix the rest of the
          portal does not use. */}
      <div className="provenance-card teams-card">
        <span className="panel-label">Who handles accessibility</span>
        <ul className="teams-list">
          <li>
            <strong>{access.name}</strong>
            <span>
              Extra time, note-taking, accessible rooms, flexible attendance. They talk to you first
              and set up whatever fits.
            </span>
            <span className="team-where">
              <Icon name="pin" size={13} /> {access.location} · {access.hours}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
