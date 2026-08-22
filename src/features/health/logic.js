/**
 * What the Health section is in, said once — ENR-206, from ENR-205; widened by
 * the changes of 2026-08-21 (`.scratch/ENR-206-health/health-changes-2026-08-21.md`).
 *
 * ## Why the record's vocabulary is not in here
 *
 * The immunization record is a document requirement and its vocabulary is
 * `features/documents/logic.js`, unchanged: `checking` advances on a clock, `in
 * review` never does. Health renders it through the same helpers My Documents
 * uses, so the two screens cannot describe one record differently. What this
 * file adds is the *reading* Health gives it — the pill, the consequence and the
 * line, in H8's order: one pill for the state of the thing, one line for the
 * consequence, always in that order and always in the same place — and the
 * rule for the page's one band (H6).
 *
 * ## Why the accommodation answer is read here and held elsewhere
 *
 * ADR-0001 / ADR-0003: the answer reaches no module but `App`. This file reads
 * it to say its state on the panel's foot and on the door row, and adds it to
 * nothing — there is still no expression in the portal in which *not right
 * now* could be counted. `answered` is what both answers read as.
 */

import { officeOf, stateInfo, stateOf } from '../documents/logic.js';
import { answerState } from '../accessibility/logic.js';
import { registration } from '../registration/data.js';

/**
 * The record, as the panel and the card say it: `pill` is the state in one
 * word (`DOCUMENT_STATES`' label and tone), `consequence` is what follows from
 * it — the gate while the record is hers, the helper's own line while it is
 * Aster's, nothing once it is accepted — and `line` is the one line under the
 * figure: the deadline with days remaining while she holds it, the office and
 * its usual time while they do.
 */
export function recordStanding({ requirement, task, gating = false, unavailable = false }) {
  if (unavailable || !requirement) {
    // No claim. Neither "not sent" nor "in review" can be said without knowing.
    return {
      state: null,
      pill: null,
      consequence: null,
      figure: '—',
      line: 'Your record couldn’t be read just now, so nothing here is a claim about where it is.',
    };
  }

  const state = stateOf(requirement);
  const info = stateInfo(requirement);
  const office = officeOf(requirement);
  const hers = info.holder === 'you';
  const decision = requirement.submissions?.at(-1)?.decision ?? null;

  return {
    state,
    pill: { label: info.label, tone: info.tone, pulse: state === 'checking' },
    consequence: hers
      ? gating
        ? `Holds ${registration.label}`
        : null
      : (info.consequence ?? null),
    line: hers
      ? task?.due
        ? `${office.name.replace(/^Student /, '')} asks for it by ${task.due} · ${task.daysLeft} days`
        : null
      : state === 'accepted'
        ? decision?.on
          ? `Accepted ${decision.on} by ${office.name}`
          : null
        : state === 'checking'
          ? // The consequence already says Aster is checking it; the helper's
            // line would say it twice on one panel.
            null
          : info.line(office, requirement),
  };
}

/**
 * The question, as the foot of the panel and the face of the door row say it.
 * Three conditions (`accessibility/logic.js`): never answered is the one open
 * question and wears the quiet pill; yes and not right now both read
 * `answered` — a complete answer is not a standing and is never outstanding.
 */
export function questionStanding({ answer, unavailable = false }) {
  if (unavailable) {
    return {
      pill: null,
      consequence: 'Your answer couldn’t be read just now.',
      where: 'Open',
      foot: 'Accessibility question: couldn’t be read just now.',
    };
  }

  if (answerState(answer) === 'unanswered') {
    return {
      pill: { label: 'Not answered', tone: 'quiet' },
      consequence: 'Optional. Nothing happens until you answer.',
      where: 'See the question',
      foot: 'Accessibility question: not answered · Optional. Nothing happens until you answer.',
    };
  }

  return {
    pill: { label: 'Answered', tone: 'done' },
    consequence: null,
    where: 'See your answer',
    foot: 'Accessibility question: answered.',
  };
}

/**
 * The page's one band — H6, and the rule is this screen's:
 *
 *   1. the record needs her → the band names the record's state;
 *   2. the record needs nothing and the question was never answered → the band
 *      names the question, once, and says it is optional;
 *   3. the record needs nothing and the question is answered → no band.
 *
 * Case 2 never fires while the record still needs her: a question about
 * disability is not stacked on a registration blocker. And it fires only for
 * *never answered* — the glossary's one open condition — never for *not right
 * now*, which would be the count ADR-0001 refuses.
 */
export function bandFor({ state, answer, gating = false, unavailable = false }) {
  if (unavailable || !state) return null;

  if (state === 'changes-requested') {
    return { kind: 'record', icon: 'alert', label: 'One page came back from Health Services' };
  }
  if (state === 'needed') {
    return {
      kind: 'record',
      icon: 'flag',
      label: gating ? 'Class registration is waiting on this' : 'A record still to send',
    };
  }
  if (answerState(answer) === 'unanswered') {
    return { kind: 'question', icon: 'spark', label: 'There’s one optional question left' };
  }
  return null;
}
