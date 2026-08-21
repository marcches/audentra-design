import PageShell from '../../design-system/patterns/PageShell.jsx';
import GroupTabs from '../../design-system/patterns/GroupTabs.jsx';
import AlertStrip from './AlertStrip.jsx';
import BalanceStrip from './BalanceStrip.jsx';
import { escalation } from './logic.js';

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
 * The same reading of `PageShell`'s rule holds on My Campus Life, where the two
 * leaves are one component and the required strip is passed once. This is that,
 * for a group whose leaves are three files.
 */
export default function FinancialsPage({
  destination,
  ledger,
  year,
  urgent,
  isEmpty,
  onOpenTask,
  onContact,
  rail,
  children,
}) {
  // `AlertStrip` renders nothing when nothing is close, but from the outside
  // `PageShell` cannot see that and would still draw the divider above an empty
  // strip. Deciding it here keeps the foot of the panel honest.
  const escalated = urgent && escalation(urgent.daysLeft) ? urgent : null;

  return (
    <PageShell
      destination={destination}
      summaryLabel="Your balance"
      summary={
        <BalanceStrip ledger={ledger} year={year} unknown={isEmpty} onContact={onContact} />
      }
      notice={escalated ? <AlertStrip task={escalated} onOpen={onOpenTask} /> : null}
      tabs={<GroupTabs group="financials" activeId={destination.id} />}
      rail={rail}
    >
      {children}
    </PageShell>
  );
}
