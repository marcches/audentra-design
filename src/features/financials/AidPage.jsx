import StateCard from '../../design-system/patterns/StateCard.jsx';
import FinancialsPage from './FinancialsPage.jsx';
import AidSources from './AidSources.jsx';
import AidOpportunityCard from './AidOpportunityCard.jsx';
import ProgressPreview from './ProgressPreview.jsx';

/**
 * My Financials · Financial aid — where each source is itemised, where a pending
 * award keeps its own row, and where the academic progress preview lives.
 *
 * The progress panel sits here rather than on Overview because it answers the
 * second half of the epic's question — *is anything about to affect my aid?* —
 * and because it must never be the first thing a student reads about money.
 *
 * The band, the balance, the escalation under it and the tab row are the
 * group's and come from `FinancialsPage`. What is left here is what this tab
 * switches.
 */
export default function AidPage({
  destination,
  ledger,
  snapshot,
  year,
  blockers,
  urgent,
  unavailable,
  isEmpty,
  onOpenTask,
  onExplainProgress,
  onContact,
  onRetry,
}) {
  const frame = { destination, ledger, year, urgent, isEmpty, onOpenTask, onContact };

  if (isEmpty) {
    return (
      <FinancialsPage {...frame}>
        <StateCard variant="empty" icon="award" title="No aid package yet">
          Student Financial Services releases your package after your deposit is recorded. When it
          lands, every source appears here with what it is and whether you repay it.
        </StateCard>
      </FinancialsPage>
    );
  }

  return (
    <FinancialsPage {...frame}>
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
    </FinancialsPage>
  );
}
