/**
 * What the Accessibility section is in, said once — ENR-206, from ENR-208,
 * moved out of Health by ADR-0003.
 *
 * ## The distinction this file exists to protect
 *
 * There are **three** conditions the accommodation question can be in, and the
 * whole section turns on the difference between two of them:
 *
 *   - `unanswered` — she has never answered. An open question.
 *   - `no` — she answered *not right now*. **A complete answer.**
 *   - `yes` — she asked to talk, and Accessibility Services has it.
 *
 * `no` is not a lesser `yes` and it is not a deferred `unanswered`. It blocks
 * nothing, it is never outstanding, never skipped, never pending, and it never
 * appears in a count of things that need her. The tone that is deliberately not
 * `act` is that rule made structural, so a future component cannot re-introduce
 * the collapse by writing one careless ternary.
 */

import { ACCOMMODATION_ANSWERS } from './data.js';

export const ANSWER_STATES = {
  unanswered: {
    label: 'Not answered yet',
    // Deliberately not `act`. An open question is not an obligation; this page
    // spends no colour on it at all.
    tone: 'open',
    settled: false,
  },
  yes: { label: 'Asked to talk', tone: 'done', settled: true },
  no: { label: 'Not right now', tone: 'done', settled: true },
};

export function answerState(answer) {
  return answer?.value ?? 'unanswered';
}

export function answerInfo(answer) {
  return ANSWER_STATES[answerState(answer)] ?? ANSWER_STATES.unanswered;
}

export function answerOption(id) {
  return ACCOMMODATION_ANSWERS.find((item) => item.id === id) ?? null;
}
