import Icon from '../../Icon.jsx';
import TermTip from './TermTip.jsx';
import { formatMoney } from '../../lib/money.js';

/**
 * The slot `.momentum-card` holds on My Enrollment: the dark card at the top of
 * the rail carrying the one hard number. Paying is out of scope for this card,
 * so the button hands off exactly as the enrollment deposit task already does.
 */
export default function NextPaymentCard({ ledger, dueInDays, onPay }) {
  const next = ledger.nextPayment;
  if (!next) return null;

  return (
    <div className="next-payment-card">
      <span className="panel-label">Next payment</span>
      <strong className="next-payment-figure">{formatMoney(next.amount)}</strong>
      <p className="next-payment-meta">
        {next.label} · due {next.date}
        {dueInDays ? ` · in ${dueInDays} days` : ''}
      </p>

      <ol
        className="payment-track"
        aria-label={`Payment ${ledger.nextPaymentIndex + 1} of ${ledger.paymentCount}`}
      >
        {Array.from({ length: ledger.paymentCount }, (_, index) => (
          <li
            key={index}
            className={
              index < ledger.nextPaymentIndex
                ? 'done'
                : index === ledger.nextPaymentIndex
                  ? 'next'
                  : ''
            }
          />
        ))}
      </ol>
      <p className="payment-track-label">
        Payment {ledger.nextPaymentIndex + 1} of {ledger.paymentCount}
      </p>

      <button className="primary-button full" onClick={onPay}>
        Make a payment <Icon name="external" size={16} />
      </button>

      <p className="next-payment-note">
        {formatMoney(ledger.scheduleTotal)} scheduled across {ledger.paymentCount} payments this
        year. Each one is an estimate and is recalculated if your aid changes.
        <TermTip term="schedule" label="how installments are worked out" />
      </p>
    </div>
  );
}
