/**
 * The published reward configuration — ENR-162 AC 3, AC 4 and AC 5.
 *
 * Two halves that must never be confused:
 *
 *   values    what a requirement is worth **now**
 *   awarded   what the student was given **then** — in `data.js`, because it is
 *             part of her record and not part of the configuration
 *
 * Nothing recomputes a balance from `values`. `lib/rewards.js` only ever adds up
 * the ledger, which is AC 4 as structure rather than as discipline: history
 * cannot be recalculated by a configuration change because history never reads
 * the configuration.
 *
 * `enabled` is the institution's switch — AC 5. An institution that turns
 * rewards off must be left with no empty area and no orphaned control, and that
 * is a state you can open rather than a claim in a spec: `rewards-off` in
 * `lib/preview-state.js`.
 */

export const rewards = {
  enabled: true,

  /**
   * Points a requirement is worth today, and what it will be worth tomorrow —
   * most rewards decrease a little each day, which is why the checklist can say
   * so. Keyed by task id; a task with no entry is worth nothing and says so.
   */
  values: {
    'income-verification': { points: 95, tomorrow: 94 },
    'loan-agreement': { points: 80, tomorrow: 79 },
    profile: { points: 72, tomorrow: 71 },
    health: { points: 83, tomorrow: 82 },
    housing: { points: 68, tomorrow: 67 },
    'orientation-session': { points: 90, tomorrow: 89 },
    placement: { points: 60, tomorrow: 59 },
    'entrance-counseling': { points: 70, tomorrow: 69 },
    insurance: { points: 55, tomorrow: 54 },
  },

  /** What a requirement already in review was worth when it was submitted. */
  reviewing: { 'final-transcript': 60 },

  /**
   * What points are worth. **The catalogue is the institution-defined value**
   * ENR-162 AC 1 asks for — Aster does not convert points into money, so there
   * is no exchange rate to state and none is invented.
   *
   * Redemption mechanics are out of scope on ENR-148, so nothing in here is an
   * action. A row states a threshold and the office that honours it. It never
   * carries a button, and `PointsPopover` must never give it one.
   */
  catalogue: [
    { id: 'late-fee', label: 'One late fee waived', cost: 800, office: 'financial-services' },
    { id: 'early-move-in', label: 'Early move-in', cost: 1300, office: 'housing' },
    { id: 'store-voucher', label: 'Campus store voucher', cost: 2000, office: 'registrar' },
    { id: 'regalia', label: 'Graduation regalia hire', cost: 3000, office: 'registrar' },
  ],
};
