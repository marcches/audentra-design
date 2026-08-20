import { ESCALATION_WINDOW, additionalAid, costOfAttendance } from '../data.js';

const WHOLE = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatMoney(amount) {
  return WHOLE.format(amount);
}

/** Ledger credits read as −$33,600 rather than -$33,600. */
export function formatCredit(amount) {
  return amount === 0 ? formatMoney(0) : `−${formatMoney(Math.abs(amount))}`;
}

function total(items) {
  return items.reduce((sum, item) => sum + (item.amount ?? 0), 0);
}

/**
 * Every figure the screen prints comes from here, so the ledger, the payment
 * schedule and the rail cannot disagree — ENR-159 AC 7.
 *
 * The invariants this keeps:
 *   balance          = cost − accepted aid − recorded payments
 *   balance          = billed remaining + spent elsewhere
 *   schedule total   = what Aster bills − accepted aid
 */
export function buildLedger(snapshot) {
  const cost = total(costOfAttendance);
  const billed = total(costOfAttendance.filter((item) => item.direct));
  const elsewhere = cost - billed;

  const accepted = snapshot.aid.filter((item) => item.status === 'accepted');
  const pending = snapshot.aid.filter((item) => item.status === 'pending');
  const aidAccepted = total(accepted);
  const paid = total(snapshot.payments);

  const balance = cost - aidAccepted - paid;
  const billedRemaining = billed - aidAccepted - paid;

  const upcoming = snapshot.schedule.filter((row) => row.status !== 'received');

  return {
    cost,
    billed,
    elsewhere,
    aidAccepted,
    hasPending: pending.length > 0,
    pending,
    paid,
    balance,
    billedRemaining,
    scheduleTotal: total(snapshot.schedule),
    nextPayment: upcoming[0] ?? null,
    nextPaymentIndex: snapshot.schedule.length - upcoming.length,
    paymentCount: snapshot.schedule.length,
    additionalTotal: total(additionalAid),
    coverage: [
      { key: 'aid', label: 'Aid accepted', amount: aidAccepted },
      { key: 'paid', label: 'You’ve paid', amount: paid },
      {
        key: 'open',
        label: pending.length > 0 ? 'Still to cover — before your pending loan' : 'Still to cover',
        amount: balance,
      },
    ].filter((segment) => segment.amount > 0),
  };
}

/** How hard a deadline is pushed on screen. ENR-160 AC 6. */
export function escalation(daysLeft) {
  if (daysLeft <= ESCALATION_WINDOW) return 'urgent';
  if (daysLeft <= 30) return 'soon';
  return null;
}

export function deadlineLabel(daysLeft) {
  if (daysLeft <= 0) return 'Overdue';
  if (daysLeft === 1) return 'Due tomorrow';
  return `Due in ${daysLeft} days`;
}

/** Reads a percentage for the coverage bar without ever dividing by zero. */
export function share(amount, whole) {
  if (!whole) return 0;
  return Math.max(0, Math.min(100, (amount / whole) * 100));
}
