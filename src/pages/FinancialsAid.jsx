import AdvisorBar from '../components/AdvisorBar.jsx';
import PageShell from '../components/PageShell.jsx';
import StateCard from '../components/StateCard.jsx';
import SectionTabs from '../components/financials/SectionTabs.jsx';
import BalanceMini from '../components/financials/BalanceMini.jsx';
import AidSources from '../components/financials/AidSources.jsx';
import AidOpportunityCard from '../components/financials/AidOpportunityCard.jsx';
import ProgressPreview from '../components/financials/ProgressPreview.jsx';
import { financialAidAdvisor } from '../data.js';

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
  eyebrow,
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
  if (isEmpty) {
    return (
      <PageShell eyebrow={eyebrow} title={destination.label} lede={destination.lede}>
        <SectionTabs activeId={destination.id} />
        <StateCard variant="empty" icon="award" title="No aid package yet">
          Student Financial Services releases your package after your deposit is recorded. When it
          lands, every source appears here with what it is and whether you repay it.
        </StateCard>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow={eyebrow} title={destination.label} lede={destination.lede}>
      <SectionTabs activeId={destination.id} />
      <BalanceMini ledger={ledger} year={year} />

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

      <AdvisorBar advisor={financialAidAdvisor} onContact={onContact} />
    </PageShell>
  );
}
