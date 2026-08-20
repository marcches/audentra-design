import Icon from '../Icon.jsx';
import AdvisorBar from '../components/AdvisorBar.jsx';
import PageShell from '../components/PageShell.jsx';
import StateCard from '../components/StateCard.jsx';
import SectionTabs from '../components/financials/SectionTabs.jsx';
import BalanceMini from '../components/financials/BalanceMini.jsx';
import ScheduleList from '../components/financials/ScheduleList.jsx';
import TermTip from '../components/financials/TermTip.jsx';
import { financialAidAdvisor } from '../data.js';
import { formatMoney } from '../lib/money.js';

/**
 * My Financials · Payments — the difference between what the year costs and what
 * Aster actually bills you, then the schedule that follows from it.
 *
 * Making a payment is out of scope, so the button hands off the way the
 * enrollment deposit already does. Payment plans are named, not changed.
 */
export default function FinancialsPayments({
  destination,
  eyebrow,
  ledger,
  snapshot,
  year,
  unavailable,
  isEmpty,
  onPay,
  onChangePlan,
  onContact,
  onRetry,
}) {
  if (isEmpty) {
    return (
      <PageShell eyebrow={eyebrow} title={destination.label} lede={destination.lede}>
        <SectionTabs activeId={destination.id} />
        <StateCard variant="empty" icon="card" title="Nothing has been billed yet">
          Your first charge is posted once your place is confirmed. Until then there is no schedule
          to show and nothing is late.
        </StateCard>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow={eyebrow} title={destination.label} lede={destination.lede}>
      <SectionTabs activeId={destination.id} />
      <BalanceMini ledger={ledger} year={year} />

      <section className="billed-split" aria-labelledby="billed-title">
        <div className="card-heading">
          <span className="card-icon">
            <Icon name="receipt" size={19} />
          </span>
          <div>
            <h2 id="billed-title">What is a bill and what is not</h2>
            <p>Aster only charges you for part of what the year costs.</p>
          </div>
        </div>

        <div className="split-grid">
          <div className="split-cell billed">
            <span className="panel-label">
              Aster bills you directly
              <TermTip term="direct" label="what Aster bills you directly" />
            </span>
            <strong>{formatMoney(ledger.billedRemaining)}</strong>
            <p>Tuition, fees, housing and meals, after the aid you have accepted.</p>
          </div>
          <div className="split-cell elsewhere">
            <span className="panel-label">
              You spend elsewhere
              <TermTip term="indirect" label="what you spend elsewhere" />
            </span>
            <strong>{formatMoney(ledger.elsewhere)}</strong>
            <p>Books, supplies, travel and personal costs. Aster never charges you for these.</p>
          </div>
        </div>

        <p className="ledger-foot">
          <Icon name="info" size={15} />
          Together they make the {formatMoney(ledger.balance)} estimated balance on your Overview.
          Only the left-hand figure ever arrives as a bill.
        </p>
      </section>

      <ScheduleList
        schedule={snapshot.schedule}
        ledger={ledger}
        unavailable={unavailable}
        onChangePlan={onChangePlan}
        onRetry={onRetry}
      />

      <div className="pay-cta">
        <div>
          <strong>Ready to pay?</strong>
          <span>You finish on Aster’s secure payment page. Nothing is charged here.</span>
        </div>
        <button className="primary-button" onClick={onPay}>
          Make a payment <Icon name="external" size={16} />
        </button>
      </div>

      <AdvisorBar advisor={financialAidAdvisor} onContact={onContact} />
    </PageShell>
  );
}
