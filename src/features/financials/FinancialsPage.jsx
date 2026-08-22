import PageShell from '../../design-system/patterns/PageShell.jsx';
import GroupTabs from '../../design-system/patterns/GroupTabs.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import BalanceStrip from './BalanceStrip.jsx';
import { deadlineLabel, escalation } from './logic.js';

/**
 * The frame the three My Financials leaves share — Overview, Financial aid and
 * Payments.
 *
 * `PageShell` owns the *order* of the slots, so a page cannot arrange them
 * wrongly. It cannot own their *content*, and that is the hole this closes:
 * three leaf pages each remembered the group's standing separately, and two of
 * them forgot. The escalation strip — `Verify your household income · due in 13
 * days` — was written into Overview alone, so opening Financial aid made a
 * deadline vanish; and in the empty state Overview showed the balance panel
 * while the other two showed none, so the panel blinked in and out as you moved
 * along the tab row.
 *
 * One subject read three ways is one screen, not three. So the group owns what
 * is true of the group: **everything above the tab row is written once, here.**
 * A leaf supplies only what its tab actually switches — the body, and the rail
 * beside it. It can no longer differ, because it is no longer asked.
 *
 * Since the review of 2026-08-21 (F7) what sits under the balance is the
 * **band**, the same component the reference screen points with, docked where
 * the shell docks a sentence that is true of the whole section — the panel's
 * foot — because it is true of all three tabs. The rule that decides what it
 * says is this screen's own:
 *
 *   1. a document is outstanding   → the nearest one by due date, and its action;
 *   2. nothing outstanding, a
 *      payment due                 → the payment, and `Make a payment`;
 *   3. neither                     → no band at all. It never renders empty.
 *
 * A deadline inside the configured window (ENR-160 AC 6, B3.2) is escalated
 * here as well as on its row: the band says the days and carries the alert
 * glyph; the row's chip carries the state colour.
 */
export default function FinancialsPage({
  destination,
  ledger,
  year,
  urgent,
  isEmpty,
  onOpenTask,
  onPay,
  onContact,
  rail,
  children,
}) {
  const level = urgent ? escalation(urgent.daysLeft) : null;

  const band = isEmpty
    ? null
    : urgent
      ? {
          icon: level === 'urgent' ? 'alert' : 'clock',
          label: `${urgent.title} · ${deadlineLabel(urgent.daysLeft).toLowerCase()}`,
          action: { label: urgent.shortAction ?? 'Open it', onClick: () => onOpenTask(urgent) },
        }
      : ledger.nextPayment
        ? {
            icon: 'calendar',
            label: `Your ${ledger.nextPayment.label.toLowerCase()} is due ${ledger.nextPayment.date}`,
            action: { label: 'Make a payment', icon: 'external', onClick: onPay },
          }
        : null;

  return (
    <PageShell
      destination={destination}
      summaryLabel="Your balance"
      summary={
        <BalanceStrip ledger={ledger} year={year} unknown={isEmpty} onContact={onContact} />
      }
      notice={band ? <ActionBand icon={band.icon} label={band.label} action={band.action} /> : null}
      tabs={<GroupTabs group="financials" activeId={destination.id} />}
      rail={rail}
    >
      {children}
    </PageShell>
  );
}
