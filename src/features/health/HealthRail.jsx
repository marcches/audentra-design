import Icon from '../../design-system/Icon.jsx';
import { offices } from '../help/data.js';
import { issuedDocuments } from '../documents/data.js';

/**
 * The rail — ENR-206.
 *
 * The anchor is how long Health Services takes. That number is what makes *in
 * review* read as pending rather than as broken, and it is genuinely secondary
 * to the record's own state, which is the summary panel's figure.
 *
 * Then the two teams, side by side, because the section is the only place in the
 * portal where two offices own one screen and the student has to be able to tell
 * which is which — one decides on a file, the other decides nothing at all and
 * says so.
 *
 * Last, a route to the list Aster already published. "What counts as proof?" has
 * an answer written by Health Services and sitting in her own record; writing a
 * second version of it here would be a second version of a policy.
 */
export default function HealthRail({ unavailable, onToast }) {
  const health = offices.health;
  const accessibility = offices.accessibility;
  const published = issuedDocuments.find((item) => item.office === 'health') ?? null;

  return (
    <>
      <div className="anchor-card reply-card">
        <span className="panel-label">How long a review takes</span>
        <strong>{unavailable ? '—' : health.reply}</strong>
        <p>
          {unavailable
            ? 'Your record could not be read just now, so nothing here is a claim about where it is.'
            : `That is how long ${health.name} usually takes to decide on a record. While they have it, nothing is needed from you — a wait is not a problem to solve.`}
        </p>
      </div>

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
          <li>
            <strong>{accessibility.name}</strong>
            <span>{accessibility.decides}</span>
            <span className="team-where">
              <Icon name="pin" size={13} /> {accessibility.location} · {accessibility.hours}
            </span>
          </li>
        </ul>
      </div>

      {published && (
        <div className="provenance-card published-card">
          <span className="panel-label">What counts as proof</span>
          <p>
            {health.name} published the list of required vaccines and what Aster accepts as evidence
            of each. It is on your record, sent to you {published.issued}.
          </p>
          <a
            className="link-button"
            href="#/my-documents"
            onClick={() => onToast(`${published.title} is on your record in My Documents.`)}
          >
            <Icon name="file" size={14} /> {published.title}
          </a>
        </div>
      )}
    </>
  );
}
