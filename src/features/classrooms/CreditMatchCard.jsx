import Icon from '../../design-system/Icon.jsx';
import { confidenceLabel } from './logic.js';
import { program } from './data.js';

/**
 * A match is evidence under discussion. There is no accept control and no
 * dismiss control on this card, and there is not supposed to be one:
 * ENR-186 AC 4 means the affordance is absent, not disabled.
 */
export default function CreditMatchCard({ match, onOpen, onAsk }) {
  return (
    <article className="match-card">
      <div className="match-route">
        <span className="match-from">
          <small>From your documents</small>
          <strong>{match.evidence.detail}</strong>
          <span>{match.evidence.source}</span>
        </span>
        <span className="match-arrow" aria-hidden="true">
          <Icon name="arrow" size={16} />
        </span>
        <span className="match-to">
          <small>Might count toward</small>
          <strong>
            {match.target.courseCode} · {match.target.courseTitle}
          </strong>
          <span>
            {match.target.requirementName} · {match.target.credits} credits
          </span>
        </span>
      </div>

      <div className="match-meta">
        <span className={`confidence-chip ${match.confidence}`}>
          {confidenceLabel(match.confidence)}
        </span>
        <span>Rule {match.rule.code}</span>
        <span>{program.officialRecord.office} decides</span>
      </div>

      <p className="match-standing">
        <Icon name="info" size={15} />
        Not approved. This has not changed a requirement, a credit total or your degree progress.
      </p>

      <div className="match-actions">
        <button className="secondary-button" onClick={() => onOpen(match)}>
          See the evidence <Icon name="arrow" size={15} />
        </button>
        <button className="text-button" onClick={() => onAsk(match)}>
          Ask your advisor
        </button>
      </div>
    </article>
  );
}
