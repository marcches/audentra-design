import { InfoTip } from '../primitives/Tooltip.jsx';

/**
 * The left half of the summary panel: the section's one figure.
 *
 * Five sections fill this slot — My Enrollment, My Classrooms, My Financials,
 * Appointments, My Profile — and every one of them had built its own cell.
 * Four class names (`.progress-summary`, `.balance-summary`,
 * `.next-appointment`, `.profile-standing`), two different internal structures,
 * and one of them, `.balance-panel .balance-summary`, addressed a class that
 * exists in no JSX file at all, so the balance cell had been running with no
 * layout rules and no `min-width: 0` since it was written. The panel came out
 * 123px tall on three sections, 137 on one and 139 on another.
 *
 * This is the shape, once:
 *
 *   [ mark ]  LABEL
 *             The figure
 *             one line under it
 *
 * The mark is what differs between sections — a progress ring, an avatar, or
 * nothing — not the arrangement. Anything that qualifies the figure rather than
 * stating it goes to the foot of the panel, in `PageShell`'s `alert` slot, and
 * never becomes a fourth line here: that is what made My Classrooms taller than
 * every other section and pushed its advisor off-centre.
 *
 * `explain` is the one thing that may sit *in* the label: the rule behind the
 * count. "2 of 11 requirements met" is a number a student can read and cannot
 * check — what makes a requirement met, and what is deliberately not counted
 * yet, is the question the figure provokes and the panel has no line for. It
 * takes a sentence, or `{ title, body }` when the term is not the label, and it
 * is an `InfoTip` rather than a hint because none of that is said anywhere
 * else. Sections whose line under the figure already answers it pass nothing:
 * an explainer on every label is an explainer that means nothing.
 */
export default function SummaryFigure({ mark, label, explain, figure, money, children }) {
  return (
    <div className={`summary-figure ${money ? 'money' : ''} ${mark ? '' : 'bare'}`}>
      {mark}
      <div className="summary-figure-copy">
        <span className="panel-label">
          {label}
          {explain ? (
            <InfoTip title={explain.title ?? label}>{explain.body ?? explain}</InfoTip>
          ) : null}
        </span>
        <strong>{figure}</strong>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}
