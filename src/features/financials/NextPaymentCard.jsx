import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import TermTip from './TermTip.jsx';
import { formatMoney } from './logic.js';

/**
 * The slot `.momentum-card` holds on My Enrollment: the dark card at the top of
 * the rail carrying the one hard number. Paying is out of scope for this card,
 * so the button hands off exactly as the enrollment deposit task already does.
 *
 * One framing on both tabs since the review of 2026-08-21 (F1): the deposit is
 * a separate payment that came before the plan, and the plan is the
 * installments — so the track counts installments, and the deposit is named as
 * what it is. The figure is the dark card's lead (9.0), not a display figure.
 */
export default function NextPaymentCard({ ledger, dueInDays, onPay }) {
  const next = ledger.nextPayment;
  if (!next) return null;

  const depositPaid = ledger.deposit?.status === 'received';

  return (
    <AnchorCard
      variant="next-payment"
      label="Next payment"
      figure={formatMoney(next.amount)}
      figureClass="next-payment-figure"
    >
      <p className="next-payment-meta">
        {next.label} · due {next.date}
        {dueInDays ? ` · in ${dueInDays} days` : ''}
      </p>

      <ol
        className="payment-track"
        aria-label={`Installment ${ledger.nextInstallmentIndex + 1} of ${ledger.installmentCount}`}
      >
        {Array.from({ length: ledger.installmentCount }, (_, index) => (
          <li
            key={index}
            className={
              index < ledger.nextInstallmentIndex
                ? 'done'
                : index === ledger.nextInstallmentIndex
                  ? 'next'
                  : ''
            }
          />
        ))}
      </ol>
      <p className="payment-track-label">
        Installment {ledger.nextInstallmentIndex + 1} of {ledger.installmentCount}
        {ledger.deposit
          ? depositPaid
            ? ` · your ${formatMoney(ledger.deposit.amount)} deposit is paid`
            : ` · your ${formatMoney(ledger.deposit.amount)} deposit comes first`
          : ''}
      </p>

      <button className="primary-button full" onClick={onPay}>
        Make a payment <Icon name="external" size={16} />
      </button>

      <p className="next-payment-note">
        {formatMoney(ledger.installmentTotal)} across {ledger.installmentCount} installments this
        year{ledger.deposit ? `, after your ${formatMoney(ledger.deposit.amount)} deposit` : ''}.
        Each installment is an estimate and is recalculated if your aid changes.
        <TermTip term="schedule" label="how installments are worked out" />
      </p>
    </AnchorCard>
  );
}
