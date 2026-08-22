import Icon from '../../design-system/Icon.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import { EDWARD } from '../edward/data.js';
import { confidenceIcon, confidenceLabel, effectLine, matchEffect } from './logic.js';
import { program } from './data.js';

/**
 * A match is evidence under discussion. There is no accept control and no
 * dismiss control on this card, and there is not supposed to be one:
 * ENR-186 AC 4 means the affordance is absent, not disabled.
 *
 * ## An accordion, closed by default — the brief of 2026-08-21, D16
 *
 * The head is the route — what Aster read, the arrow, what it might cover —
 * and the confidence chip, which is the one status family on the page that
 * expresses uncertainty and so the one that takes an icon (D12). The whole
 * head is the handle, the way every disclosure head in the product is.
 *
 * The body is what the card used to say all at once, plus the one thing it
 * never said: the *effect*. "LIKELY" gave the odds and not the stakes; the
 * effect line says what would move if the Registrar approved it, in the
 * conditional, so it cannot be read as a decision (D7). Under it the standing
 * — not approved, nothing has changed — which R1 protects and which is said
 * here and in the rail and nowhere else on first paint (D11). Then the two
 * routes: the evidence drawer, and the office that decides (D15). *See the
 * course* is D4's reverse link — the course row already says a match targets
 * it; this is the way back.
 */
export default function CreditMatchCard({
  match,
  requirements,
  open,
  onToggle,
  onOpen,
  onAsk,
  onRevealCourse,
}) {
  const bodyId = `match-${match.id}-body`;
  const effect = effectLine(matchEffect(match, requirements));

  return (
    <article className={`match-card${open ? ' open' : ''}`} id={`match-${match.id}`}>
      <button
        type="button"
        className="match-head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => onToggle(match.id)}
      >
        <span className="match-route">
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
        </span>
        <span className={`confidence-chip ${match.confidence}`}>
          <Icon name={confidenceIcon(match.confidence)} size={12} />
          {confidenceLabel(match.confidence)}
        </span>
        <span className="match-chevron" aria-hidden="true">
          <Icon name="chevron" size={18} />
        </span>
      </button>

      <div className="match-body" id={bodyId} hidden={!open}>
        <div className="match-meta">
          <span>Rule {match.rule.code}</span>
          <span>{program.officialRecord.office} decides</span>
        </div>

        {effect ? (
          <p className="match-effect">
            <Icon name="arrow" size={15} />
            {effect}
          </p>
        ) : null}

        <p className="match-standing">
          <Icon name="info" size={15} />
          Not approved. This has not changed a requirement, a credit total or your degree progress.
        </p>

        <div className="match-actions">
          <button type="button" className="secondary-button" onClick={() => onOpen(match)}>
            See the evidence <Icon name="arrow" size={15} />
          </button>
          {/* One route to a person, and it starts in Edward — Part A §12 of the
              review of 2026-08-21, which supersedes B2.1's two controls. The
              Registrar still decides and the advisor is still reachable: both
              are what Edward offers next, with the question already written. */}
          <EdwardAsk mark={EDWARD.mark} onClick={() => onAsk(match)} />
          <button type="button" className="text-button" onClick={() => onRevealCourse(match)}>
            See the course
          </button>
        </div>
      </div>
    </article>
  );
}
