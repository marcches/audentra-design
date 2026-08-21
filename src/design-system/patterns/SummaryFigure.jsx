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
 */
export default function SummaryFigure({ mark, label, figure, money, children }) {
  return (
    <div className={`summary-figure ${money ? 'money' : ''} ${mark ? '' : 'bare'}`}>
      {mark}
      <div className="summary-figure-copy">
        <span className="panel-label">{label}</span>
        <strong>{figure}</strong>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}
