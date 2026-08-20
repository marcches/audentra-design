import PageShell from '../components/PageShell.jsx';
import StateCard from '../components/StateCard.jsx';
import GroupTabs from '../components/GroupTabs.jsx';
import AlertStrip from '../components/financials/AlertStrip.jsx';
import BalanceStrip from '../components/financials/BalanceStrip.jsx';
import CoverageBar from '../components/financials/CoverageBar.jsx';
import CostCard from '../components/financials/CostCard.jsx';
import DocumentList from '../components/financials/DocumentList.jsx';
import NextPaymentCard from '../components/financials/NextPaymentCard.jsx';
import AidOpportunityCard from '../components/financials/AidOpportunityCard.jsx';

/**
 * My Financials · Overview — ENR-166, serving ENR-159 and ENR-160.
 *
 * The five figures ENR-159 AC 1 requires to be shown together live on this page,
 * each linking to the leaf that details it. Reading order: what is on fire, what
 * it costs, what still needs me.
 */
export default function FinancialsOverview({
  destination,
  ledger,
  snapshot,
  year,
  documents,
  urgent,
  unavailable,
  isEmpty,
  depositDays,
  onOpenTask,
  onPay,
  onContact,
  onRetry,
}) {
  const tabs = <GroupTabs group="financials" activeId={destination.id} />;

  if (isEmpty) {
    return (
      <PageShell
        destination={destination}
        summaryLabel="Your balance"
        summary={<BalanceStrip ledger={ledger} year={year} unknown onContact={onContact} />}
        tabs={tabs}
      >
        <StateCard variant="empty" icon="wallet" title="Your financial file isn’t open yet">
          Aster builds your cost and aid package once your enrollment deposit is recorded. Nothing
          is owed before then, and nothing here is missing from your record.
        </StateCard>
      </PageShell>
    );
  }

  return (
    <PageShell
      destination={destination}
      summaryLabel="Your balance"
      summary={<BalanceStrip ledger={ledger} year={year} onContact={onContact} />}
      alert={<AlertStrip task={urgent} onOpen={onOpenTask} />}
      tabs={tabs}
      rail={
        <>
          <NextPaymentCard ledger={ledger} dueInDays={depositDays} onPay={onPay} />
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
    </PageShell>
  );
}
