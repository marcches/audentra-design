import Icon from '../../design-system/Icon.jsx';
import GateChip from '../registration/GateChip.jsx';
import { officeOf, stateInfo, stateOf } from './logic.js';
import { deadlineLabel, escalation } from '../financials/logic.js';

/**
 * One document requirement, as the student reads it.
 *
 * The state is the **line under the title**, not a pill floating on the right
 * ([Revolut](https://mobbin.com/screens/92e54678-09da-479f-8d03-baa0ae45ad12)).
 * A pill on all six rows is texture; a sentence that changes per row is
 * information, and it is the only place `In review` can say who holds it and
 * how long that usually takes without a second line.
 *
 * The mark goes on the **tile**, which is square, and never as a painted edge on
 * the row, which is not. Only the two states where she owes the next move carry
 * one — a mark on every row marks nothing.
 *
 * The trailing cell is empty on a row that is settled or with Aster, and that
 * emptiness is the hierarchy: the eye runs down the column and stops only where
 * there is something to do.
 */
export default function DocumentRow({ requirement, task, gating = false, onOpen }) {
  const office = officeOf(requirement);
  const state = stateOf(requirement);
  const info = stateInfo(requirement);
  const decision = requirement.submissions?.at(-1)?.decision ?? null;

  // The deadline is the task's, read live — never copied onto the requirement,
  // so this date and the one on the checklist cannot drift (ENR-160 AC 5).
  const days = task?.daysLeft;
  const level = typeof days === 'number' ? escalation(days) : null;
  const showDeadline = typeof days === 'number' && info.holder === 'you';

  return (
    <button
      className={`document-row ${info.tone}`}
      onClick={() => onOpen(requirement)}
      aria-label={`${requirement.title}, ${info.label}, ${office.name}`}
    >
      <span className={`document-tile ${info.tone}`} aria-hidden="true">
        <Icon name={state === 'accepted' ? 'check' : 'file'} size={17} />
      </span>

      <span className="document-body">
        <strong>
          {requirement.title}
          {decision?.unread && <i className="document-new" aria-hidden="true" />}
        </strong>
        {/* ENR-214 AC 1 — the same mark, on every surface the requirement
            appears on. AC 6 keeps it here while the record is in review. */}
        {gating && state !== 'accepted' && <GateChip state={state} />}
        <span className="document-state">
          {state === 'checking' && <i className="pulse" aria-hidden="true" />}
          {state === 'accepted' && decision?.on
            ? `Accepted ${decision.on} · ${office.name}`
            : info.line(office, requirement)}
        </span>
        {/* A helper line only where it changes what she does. On every row it
            would be a template; here it is the consequence of not acting. */}
        {state === 'changes-requested' && (
          <span className="document-consequence">
            <Icon name="alert" size={13} /> {decision.reason}
          </span>
        )}
      </span>

      <span className="document-trail">
        {showDeadline && (
          <span className={`deadline-chip${level ? ` ${level}` : ''}`}>{deadlineLabel(days)}</span>
        )}
        <span className="document-open" aria-hidden="true">
          <Icon name="arrow" size={15} />
        </span>
      </span>
    </button>
  );
}

/**
 * A file Aster sent *her*. Same row grid so the two line up, and quieter by
 * construction: no state, no mark, no deadline, because there is nothing for
 * her to do to a letter. The caption is what says which way the file went
 * ([Gusto](https://mobbin.com/screens/e74f522b-aab3-40de-bb2f-0b6cd895f2b9)).
 */
export function IssuedRow({ document, onOpen }) {
  const office = officeOf(document);

  return (
    <button
      className="document-row issued"
      onClick={() => onOpen(document)}
      aria-label={`${document.title}, sent by ${office.name} on ${document.issued}`}
    >
      <span className="document-tile issued" aria-hidden="true">
        <Icon name="mail" size={17} />
      </span>

      <span className="document-body">
        <strong>{document.title}</strong>
        <span className="document-state">
          Sent to you by {office.name} · {document.issued}
        </span>
      </span>

      <span className="document-trail">
        <span className="document-open" aria-hidden="true">
          <Icon name="download" size={16} />
        </span>
      </span>
    </button>
  );
}
