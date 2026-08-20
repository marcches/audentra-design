import PageShell from '../components/PageShell.jsx';
import StateCard from '../components/StateCard.jsx';
import GroupTabs from '../components/GroupTabs.jsx';
import BalanceStrip from '../components/financials/BalanceStrip.jsx';
import AidSources from '../components/financials/AidSources.jsx';
import AidOpportunityCard from '../components/financials/AidOpportunityCard.jsx';
import ProgressPreview from '../components/financials/ProgressPreview.jsx';

/**
 * My Financials · Financial aid — where each source is itemised, where a pending
 * award keeps its own row, and where the academic progress preview lives.
 *
 * The progress panel sits here rather than on Overview because it answers the
 * second half of the epic's question — *is anything about to affect my aid?* —
 * and because it must never be the first thing a student reads about money.
 */
export default function FinancialsAid({
  destination,
  ledger,
  snapshot,
  year,
  blockers,
  unavailable,
  isEmpty,
  onOpenTask,
  onExplainProgress,
  onContact,
  onRetry,
}) {
  const tabs = <GroupTabs group="financials" activeId={destination.id} />;
  const summary = <BalanceStrip ledger={ledger} year={year} onContact={onContact} />;

  if (isEmpty) {
    return (
      <PageShell destination={destination} tabs={tabs}>
        <StateCard variant="empty" icon="award" title="No aid package yet">
          Student Financial Services releases your package after your deposit is recorded. When it
          lands, every source appears here with what it is and whether you repay it.
        </StateCard>
      </PageShell>
    );
  }

  return (
    <PageShell destination={destination} summaryLabel="Your balance" summary={summary} tabs={tabs}>
      <AidSources
        snapshot={snapshot}
        ledger={ledger}
        blockers={blockers}
        onOpenBlocker={onOpenTask}
      />

      <section className="opportunity-section" aria-labelledby="opportunity-title">
        <h2 id="opportunity-title" className="sr-only">
          Possible additional aid
        </h2>
        <AidOpportunityCard total={ledger.additionalTotal} />
      </section>

      <ProgressPreview
        progress={snapshot.academic}
        unavailable={unavailable}
        onExplain={onExplainProgress}
        onRetry={onRetry}
      />
    </PageShell>
  );
}
