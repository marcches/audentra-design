/* ------------------------------------------------------------------ *
 * Accessibility — the accommodation answer, on a route of its own.
 *
 * Built for ENR-206 (behaviour from ENR-208) as the second card inside
 * Health, and moved here by the UX writing pass of 2026-08-21: filing the
 * question under Health read as a medical matter, which is the one thing the
 * card itself says Aster is not asking about. ADR-0003 records the move;
 * ADR-0001's rule travels with it unchanged — **nothing here reaches another
 * module**. Answering creates no help request, no appointment, no notification,
 * no sidebar count, and the answer is absent from the record Edward speaks from.
 *
 * What is here is not evidence. One question, two answers, and a third
 * condition that is not an answer — never asked, never answered.
 *
 * Two absences are deliberate and are the card's whole point.
 *
 * There is **no field for a condition**. No diagnosis, no name of anything, no
 * supporting file, and no free text that could become one. ENR-208 AC 2 is a
 * property of this shape rather than a rule a form has to remember, and that is
 * also why the answer is a value and not a message.
 * ------------------------------------------------------------------ */

/**
 * The question, in the words the student reads. It asks whether she wants to
 * talk — not whether she needs anything, not what she has — so that answering
 * costs nothing and declining costs nothing either.
 */
export const accommodationQuestion = {
  office: 'accessibility',
  title: 'Would you like to talk to Accessibility Services?',
  lede: 'They set up things like extra time, note-taking, accessible rooms, and flexible attendance. It’s a conversation, not an application. You don’t have to explain anything to start it.',
  // ENR-208 AC 7. It sits on the card, before either answer is given, because a
  // promise made after the fact does not make the answer any cheaper.
  seenBy: 'Accessibility Services sees this. Your instructors and your advisor don’t.',
  // ENR-208 AC 2 said out loud, so its absence is legible rather than merely true.
  collects: 'Aster isn’t asking what your condition is, and this page has nowhere to put it.',
};

/**
 * The two answers, weighted equally — neither is recommended, neither is the
 * default. Each carries the line that says what it means, in the way YNAB's
 * Support Access Mode writes the declining option in full rather than as an
 * absence.
 *
 * `next` is what the screen owes her after she answers. For the yes it says
 * what the office has and does; it never promises that the office will make
 * contact, and it names no channel (UX writing §1.5). For the no it says that
 * nothing is now pending, which is the whole of "a complete answer".
 */
export const ACCOMMODATION_ANSWERS = [
  {
    id: 'yes',
    label: 'Yes, I’d like to talk',
    means: 'Accessibility Services gets your name. Nothing about your health is sent with it.',
    said: 'You asked to talk to Accessibility Services',
    next: 'Accessibility Services has your name. Nothing’s pending on you, and they set up anything you agree on before your first classes.',
  },
  {
    id: 'no',
    label: 'Not right now',
    means: 'Nothing is sent and nothing opens. You can change this any time, including after term starts.',
    said: 'You said not right now',
    next: 'This is a complete answer. Nothing’s pending and nobody’s waiting on you.',
  },
];

/**
 * What the section holds per preview state. `onboarding` is where the answer was
 * given — ENR-205 AC 3 asks the screen to show what she already resolved rather
 * than ask again, and naming the place she did it is how the screen proves it is
 * not asking again. The state ids are shared with Health, because the same
 * fixture student is shown on both pages.
 */
export function answerFor(state) {
  if (state === 'empty' || state === 'send-fails') return null;
  if (state === 'health-returned' || state === 'health-settled') {
    return { value: 'yes', on: 'Aug 12', where: 'onboarding' };
  }
  return { value: 'no', on: 'Aug 12', where: 'onboarding' };
}
