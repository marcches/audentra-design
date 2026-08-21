/**
 * Points — ENR-162.
 *
 * The one rule this file exists to hold: **the balance is read from the ledger,
 * never from the configuration.** `balanceFrom` takes awards and adds them up.
 * It cannot take `values`, so a change to what a requirement is worth cannot
 * reach a point the student has already earned (AC 4).
 *
 * Everything a points surface needs to render is derived here, so the topbar
 * chip, the popover and `MomentumCard` cannot arrive at three different
 * sentences about the same balance.
 */

import { rewards } from './data.js';

/** AC 5. Read this before rendering anything; there is no partial rewards UI. */
export function rewardsEnabled(config = rewards) {
  return config.enabled === true;
}

/** AC 4 — the ledger is the only input. */
export function balanceFrom(awarded) {
  return (awarded ?? []).reduce((total, award) => total + award.points, 0);
}

/** What a requirement is worth today. A task with no entry is worth nothing. */
export function valueOf(taskId, config = rewards) {
  return config.values[taskId]?.points ?? 0;
}

export function tomorrowValueOf(taskId, config = rewards) {
  return config.values[taskId]?.tomorrow ?? 0;
}

/**
 * The catalogue with the balance read against it. `reached` is what the
 * institution-defined value amounts to today — AC 1 — and it is a statement,
 * never an offer: redemption is out of scope on ENR-148.
 */
export function catalogueFor(balance, config = rewards) {
  return [...config.catalogue]
    .sort((a, b) => a.cost - b.cost)
    .map((item) => ({ ...item, reached: balance >= item.cost, away: Math.max(0, item.cost - balance) }));
}

export function withinReach(balance, config = rewards) {
  return catalogueFor(balance, config).filter((item) => item.reached).length;
}

/** The next thing worth having, or null once everything is reached. */
export function nextReward(balance, config = rewards) {
  return catalogueFor(balance, config).find((item) => !item.reached) ?? null;
}

/**
 * The ladder the popover draws: the full range, so the last threshold has room
 * to sit at the end rather than at the edge of the balance.
 */
export function ladderFor(balance, config = rewards) {
  const items = catalogueFor(balance, config);
  const top = items.length ? items[items.length - 1].cost : 0;
  const span = Math.max(top, balance) || 1;
  return {
    items: items.map((item) => ({ ...item, at: Math.round((item.cost / span) * 100) })),
    fill: Math.min(100, Math.round((balance / span) * 100)),
  };
}
