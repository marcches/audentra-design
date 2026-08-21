import Icon from '../Icon.jsx';
import { registration } from '../registration-data.js';

/**
 * The mark a gating requirement carries — ENR-214 AC 1.
 *
 * One component, so the sentence cannot be phrased five ways on the five
 * surfaces a requirement appears on: My Enrollment, My Documents, Health, My
 * Campus Life and the task drawer.
 *
 * A chip in the row that already holds standing — **not** a border, not a left
 * bar, not a tinted card. This repo does not accent a rounded card with a
 * painted edge, and the card already has a place where facts about the step are
 * written.
 *
 * It says **blocks**, never **blocked**. *Blocked* belongs to a locked step
 * whose prerequisite is unmet (ENR-156), which is a different state with a
 * different answer, and one word for both would teach the student nothing.
 *
 * It is a mark, not a control: never focusable, never pressable.
 */
export default function GateChip({ state = 'needed', since = null }) {
  // AC 6. Submitting did not lift the gate, so the chip stays and says where the
  // requirement actually is. Accepted is the only state with no chip at all —
  // the requirement is met and says so the ordinary way.
  const detail =
    state === 'in-review'
      ? since
        ? `In review since ${since}`
        : 'In review'
      : state === 'checking'
        ? 'Checking'
        : state === 'changes-requested'
          ? 'Needs another try'
          : null;

  return (
    <span className="gate-chip">
      <Icon name="flag" size={13} />
      Blocks {registration.label}
      {detail && <span className="gate-detail">· {detail}</span>}
    </span>
  );
}
