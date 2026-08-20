import Icon from '../Icon.jsx';
import { program } from '../data-academics.js';

/**
 * The rail carries no Momentum points. A curriculum requirement is not a task
 * and earns nothing — rendering the momentum card here would say it does,
 * against the ENR-173 guardrail.
 */
export default function AcademicColumn({ approved, underReview, unknownProgram, onOpenCredit }) {
  return (
    <aside className="insight-column">
      <div className="counts-card">
        <span className="panel-label">What counts right now</span>
        <strong className="counts-figure">
          {approved} <small>of {program.creditsToGraduate} credits approved</small>
        </strong>
        <div className="counts-divider" />
        <p className="counts-review">
          <Icon name="info" size={15} />
          {underReview > 0
            ? `${underReview} credits under review — not counted above`
            : 'Nothing is under review right now'}
        </p>
      </div>

      <div className="program-card">
        <span className="panel-label">Your program</span>
        <strong>{unknownProgram ? 'Not assigned yet' : program.name}</strong>
        <dl className="program-facts">
          <div>
            <dt>Catalog</dt>
            <dd>{program.catalog}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{program.publishedOn.replace('Published by Aster on ', '')}</dd>
          </div>
          <div>
            <dt>To graduate</dt>
            <dd>{program.creditsToGraduate} credits</dd>
          </div>
        </dl>
      </div>

      <div className="record-card">
        <span className="record-icon" aria-hidden="true">
          <Icon name="shield" size={19} />
        </span>
        <span className="panel-label">Your official record</span>
        <p>{program.officialRecord.note}</p>
        <p className="record-where">
          <Icon name="pin" size={13} /> {program.officialRecord.office},{' '}
          {program.officialRecord.where}
        </p>
        <button className="learn-link" onClick={onOpenCredit}>
          How credit is approved <Icon name="arrow" size={14} />
        </button>
      </div>
    </aside>
  );
}
