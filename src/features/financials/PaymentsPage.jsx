import Icon from '../../design-system/Icon.jsx';
import Card from '../../design-system/primitives/Card.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import FinancialsPage from './FinancialsPage.jsx';
import ScheduleList from './ScheduleList.jsx';
import TermTip from './TermTip.jsx';
import { formatMoney } from './logic.js';

/**
 * My Financials · Payments — the difference between what the year costs and what
 * Aster actually bills you, then the schedule that follows from it.
 *
 * Making a payment is out of scope, so the button hands off the way the
 * enrollment deposit already does. Payment plans are named, not changed.
 *
 * The band, the balance, the escalation under it and the tab row are the
 * group's and come from `FinancialsPage`. What is left here is what this tab
 * switches.
 */
export default function PaymentsPage({
  destination,
  ledger,
  snapshot,
  year,
  urgent,
  unavailable,
  isEmpty,
  onOpenTask,
  onPay,
  onChangePlan,
  onContact,
  onRetry,
}) {
  const frame = { destination, ledger, year, urgent, isEmpty, onOpenTask, onPay, onContact };

  if (isEmpty) {
    return (
      <FinancialsPage {...frame}>
        <StateCard variant="empty" icon="card" title="Nothing has been billed yet">
          Your first charge is posted once your place is confirmed. Until then there is no schedule
          to show and nothing is late.
        </StateCard>
      </FinancialsPage>
    );
  }

  return (
    <FinancialsPage {...frame}>
      <Card aria-labelledby="billed-title">
        <div className="card-heading">
          <span className="card-icon">
            <Icon name="receipt" size={19} />
          </span>
          <div>
            <h2 id="billed-title">What Aster bills you, and what it doesn’t</h2>
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
          Only the amount Aster bills you ever arrives as a bill.
        </p>
      </Card>

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
    </FinancialsPage>
  );
}
