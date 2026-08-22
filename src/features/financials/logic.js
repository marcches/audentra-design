import { ESCALATION_WINDOW, PORTAL_TODAY, additionalAid, costOfAttendance } from '../enrollment/data.js';

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
 * Days from today to a schedule date written the way the schedule writes it ('Aug 12').
 * The year is today’s, or the next one when the date has already passed — the spring
 * installments. Read against `PORTAL_TODAY` like every other day in the portal.
 */
export function daysUntil(shortDate, today = PORTAL_TODAY) {
  const [y, m, d] = today.split('-').map(Number);
  const from = new Date(y, m - 1, d);
  let to = new Date(`${shortDate}, ${y}`);
  if (to < from) to = new Date(`${shortDate}, ${y + 1}`);
  return Math.round((to - from) / (24 * 60 * 60 * 1000));
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

  // One framing on both tabs — F1 of the review of 2026-08-21: the deposit is a
  // separate payment that comes before the plan; the plan is the installments.
  const deposit = snapshot.schedule.find((row) => row.id === 'deposit') ?? null;
  const installments = snapshot.schedule.filter((row) => row.id !== 'deposit');
  const openInstallments = installments.filter((row) => row.status !== 'received');

  return {
    deposit,
    installmentCount: installments.length,
    installmentTotal: total(installments),
    nextInstallmentIndex: installments.length - openInstallments.length,
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
      // One label for one figure, everywhere it appears (F3, the review of
      // 2026-08-21); the pending-loan qualifier lives in the note under the
      // table, where the pending rule is explained.
      { key: 'open', label: 'Estimated remaining balance', amount: balance },
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
