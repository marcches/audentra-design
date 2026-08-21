import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { program } from './data.js';

/**
 * The rail carries no Momentum points. A curriculum requirement is not a task
 * and earns nothing — rendering the momentum card here would say it does,
 * against the ENR-173 guardrail.
 *
 * After the brief of 2026-08-21 (D10) the anchor card no longer repeats the
 * approved-credit figure, which the white card now leads with; it keeps the
 * one thing the card does not carry — the amount under review — and that is
 * its figure. The sentence under it is the only place on the page, with the
 * match card, where "not counted yet" is said (D11).
 */
export default function ClassroomsRail({
  underReview,
  unavailable,
  unknownProgram,
  onOpenCredit,
}) {
  const hasFigure = !unknownProgram && !unavailable && underReview > 0;

  return (
    <>
      <AnchorCard
        variant="counts"
        label="What counts right now"
        figureClass="counts-figure"
        figure={
          hasFigure ? (
            <>
              {underReview} <small>credits under review, not counted yet</small>
            </>
          ) : undefined
        }
      >
        <p className={`counts-review${hasFigure ? ' quiet' : ''}`}>
          <Icon name="info" size={15} />
          {/* Never claim nothing is under review when nobody could look. */}
          {unknownProgram
            ? 'Anything you have already sent Aster is kept and reviewed once your program is assigned'
            : unavailable
              ? 'What’s under review couldn’t be checked right now'
              : hasFigure
                ? 'Credit the Registrar approves shows in your total; nothing here has been decided'
                : 'Nothing is under review right now'}
        </p>
      </AnchorCard>

      <div className="program-card">
        <span className="panel-label">Your program</span>
        <strong>{unknownProgram ? 'Not assigned yet' : program.name}</strong>
        {unknownProgram ? (
          <p className="program-pending">
            Your catalog, your requirements and the credits you need to graduate all arrive with the
            program.
          </p>
        ) : (
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
        )}
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
    </>
  );
}
