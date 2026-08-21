/**
 * What the Health section is in, said once — ENR-206, from ENR-205 and ENR-208.
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
 * appears in a count of things that need her. Everything below that looks like
 * over-engineering — a tone that is deliberately not `act`, a standing that
 * refuses to accept the answer as an input — is that rule made structural, so a
 * future component cannot re-introduce the collapse by writing one careless
 * ternary.
 *
 * ## Why the record is not in here
 *
 * The immunization record is a document requirement and its vocabulary is
 * `lib/documents.js`, unchanged: `checking` advances on a clock, `in review`
 * never does. Health renders it through the same helpers My Documents uses, so
 * the two screens cannot describe one record differently.
 */

import { ACCOMMODATION_ANSWERS } from './data.js';
import { stateOf } from '../documents/logic.js';

export const ANSWER_STATES = {
  unanswered: {
    label: 'Not answered yet',
    // Deliberately not `act`. An open question is not an obligation, and the one
    // colour this page spends belongs to the record when it is asking.
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

/**
 * The section's one figure is the **record's** state and nothing else.
 *
 * This is ENR-208 AC 3 as arithmetic rather than as copy: the accommodation
 * answer is not an input to this function, so there is no expression anywhere in
 * the portal in which *not right now* can be counted as outstanding. A count of
 * two parts was the obvious alternative and it is exactly the trap — it turns a
 * question into a checklist item, and then a complete answer has to be defended
 * with words instead of being true.
 */
export function healthStanding({ requirement, unavailable }) {
  if (unavailable || !requirement) {
    return { figure: null, label: 'Immunization record', line: null };
  }

  const state = stateOf(requirement);
  const figures = {
    needed: 'Not sent yet',
    checking: 'Sent — being checked',
    'in-review': 'In review',
    accepted: 'Accepted',
    'changes-requested': 'Came back',
  };

  return {
    state,
    label: 'Immunization record',
    figure: figures[state] ?? 'Not sent yet',
    // The shift over time, in the one line the panel allows. The date lives on
    // the record itself, next to the thing that acts on it — a distant deadline
    // written across the section reads as a threat, which the brief forbids.
    line: state === 'accepted' ? 'Cleared for class registration' : 'Optional now · required before you register',
  };
}
