/**
 * What the Health section is in, said once — ENR-206, from ENR-205.
 *
 * ## Why the record is not in here
 *
 * The immunization record is a document requirement and its vocabulary is
 * `lib/documents.js`, unchanged: `checking` advances on a clock, `in review`
 * never does. Health renders it through the same helpers My Documents uses, so
 * the two screens cannot describe one record differently.
 *
 * ## Why the accommodation answer is not in here either
 *
 * It was, until 2026-08-21. The question ENR-208 asks has its own section now,
 * Accessibility, and its vocabulary lives in `features/accessibility/logic.js`
 * (ADR-0003). Nothing in this file reads the answer, which is how "answered no
 * is not outstanding" stays true by construction: there is no expression in the
 * portal in which it could be counted.
 */

import { stateOf } from '../documents/logic.js';

/**
 * The section's one figure is the **record's** state and nothing else.
 */
export function healthStanding({ requirement, unavailable }) {
  if (unavailable || !requirement) {
    return { figure: null, label: 'Immunization record', line: null };
  }

  const state = stateOf(requirement);
  const figures = {
    needed: 'Not sent yet',
    checking: 'Sent, being checked',
    'in-review': 'In review',
    accepted: 'Accepted',
    'changes-requested': 'Came back',
  };

  return {
    state,
    label: 'Immunization record',
    figure: figures[state] ?? 'Not sent yet',
    // The one line the panel allows. The record gates class registration, so
    // it is never described as optional (UX writing 6.1). The date lives on the
    // record itself, next to the thing that acts on it — a deadline written
    // across the section reads as a threat, which the brief forbids.
    line: state === 'accepted' ? 'Cleared for class registration' : 'You need this before you can register',
  };
}
