import StateCard from '../../design-system/patterns/StateCard.jsx';
import FinancialsPage from './FinancialsPage.jsx';
import CoverageBar from './CoverageBar.jsx';
import CostCard from './CostCard.jsx';
import DocumentList from './DocumentList.jsx';
import NextPaymentCard from './NextPaymentCard.jsx';
import AidOpportunityCard from './AidOpportunityCard.jsx';
import { daysUntil } from './logic.js';

/**
 * My Financials · Overview — ENR-166, serving ENR-159 and ENR-160.
 *
 * The five figures ENR-159 AC 1 requires to be shown together live on this page,
 * each linking to the leaf that details it. Reading order: what is on fire, what
 * it costs, what still needs me.
 *
 * The band, the balance, the escalation under it and the tab row are the
 * group's and come from `FinancialsPage`. What is left here is what this tab
 * switches.
 */
export default function OverviewPage({
  destination,
  ledger,
  snapshot,
  year,
  documents,
  urgent,
  unavailable,
  isEmpty,
  onOpenTask,
  onPay,
  onContact,
  onRetry,
}) {
  const frame = { destination, ledger, year, urgent, isEmpty, onOpenTask, onContact };
  // The next payment is whatever the schedule says it is — the fall installment on
  // Aug 12 today — and its distance is read off the schedule, not off a task.
  const dueInDays = ledger.nextPayment ? daysUntil(ledger.nextPayment.date) : null;

  if (isEmpty) {
    return (
      <FinancialsPage {...frame}>
        <StateCard variant="empty" icon="wallet" title="Your financial file isn’t open yet">
          Aster builds your cost and aid package once your enrollment deposit is recorded. Nothing
          is owed before then, and nothing here is missing from your record.
        </StateCard>
      </FinancialsPage>
    );
  }

  return (
    <FinancialsPage
      {...frame}
      rail={
        <>
          <NextPaymentCard ledger={ledger} dueInDays={dueInDays} onPay={onPay} />
          <AidOpportunityCard total={ledger.additionalTotal} />
        </>
      }
    >
      <CostCard ledger={ledger} snapshot={snapshot} year={year}>
        <CoverageBar ledger={ledger} />
      </CostCard>

      <DocumentList
        documents={documents}
        unavailable={unavailable}
        onOpen={onOpenTask}
        onRetry={onRetry}
      />
    </FinancialsPage>
  );
}
