import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { program } from './data.js';

/**
 * The rail carries no Momentum points. A curriculum requirement is not a task
 * and earns nothing — rendering the momentum card here would say it does,
 * against the ENR-173 guardrail.
 *
 * After the brief of 2026-08-21 (D10) the anchor card stopped repeating the
 * approved-credit figure; what it kept was the amount under review, rendered at
 * display size with a line underneath disclaiming it — the same defect the
 * Appointments document removed with its "24", on another screen (the Housing
 * changes of 2026-08-21, §9.1). Since 2026-08-22 that card is gone: the
 * under-review figure sits in the summary panel, beside the approved total it
 * qualifies, and **the program takes the dark slot** — the frame everything on
 * this page is measured against: the degree, the catalog year that governs it,
 * and the credits the ring counts toward. It holds facts, not progress: the
 * credits to graduate never render as a counter, a bar or a fraction, and the
 * card carries no action. No other metric takes the slot — a percentage would
 * repeat the ring, and a pace figure would be the one claim on a screen whose
 * premise is that it shows Aster's reading of the record, not the record.
 */
export default function ClassroomsRail({ unknownProgram, onOpenCredit }) {
  return (
    <>
      <AnchorCard
        variant="program"
        label="Your program"
        figureClass="program-lead"
        figure={unknownProgram ? 'Not assigned yet' : program.name}
      >
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
      </AnchorCard>

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
