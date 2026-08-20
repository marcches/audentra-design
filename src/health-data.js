/* ------------------------------------------------------------------ *
 * Health — ENR-206, behaviour from ENR-205, ENR-208 and ENR-209.
 *
 * Half of this section is not here. The immunization record is a **document
 * requirement** and lives in `documents-data.js` with the other five, because
 * My Documents and Health are two windows onto one record and a second copy is
 * the only way the two screens could ever disagree about it.
 *
 * What is here is the other half, which is not evidence at all: the
 * **accommodation answer**. One question, two answers, and a third condition
 * that is not an answer — never asked, never answered.
 *
 * Two absences are deliberate and are the card's whole point.
 *
 * There is **no field for a condition**. No diagnosis, no name of anything, no
 * supporting file, and no free text that could become one. ENR-208 AC 2 is a
 * property of this shape rather than a rule a form has to remember, and that is
 * also why the answer is a value and not a message.
 *
 * And **nothing here reaches another module**. Answering creates no help
 * request, no appointment and no notification, and the answer is absent from
 * the record Edward speaks from. That is ADR-0001, and it is the reason this
 * file exports data and not a route.
 * ------------------------------------------------------------------ */

/**
 * The question, in the words the student reads. It asks whether she wants to
 * talk — not whether she needs anything, not what she has — so that answering
 * costs nothing and declining costs nothing either.
 */
export const accommodationQuestion = {
  office: 'accessibility',
  title: 'Would you like to talk to Accessibility Services?',
  lede: 'They arrange things like extra time, note-taking, accessible rooms and flexible attendance. Talking to them is a conversation, not an application, and you do not have to explain anything here to start it.',
  // ENR-208 AC 7. It sits on the card, before either answer is given, because a
  // promise made after the fact does not make the answer any cheaper.
  seenBy: 'Accessibility Services sees this. Your instructors and your advisor do not.',
  // ENR-208 AC 2 said out loud, so its absence is legible rather than merely true.
  collects: 'Aster is not asking what your condition is, and this section has nowhere to put it.',
};

/**
 * The two answers, weighted equally — neither is recommended, neither is the
 * default. Each carries the line that says what it means, in the way YNAB's
 * Support Access Mode writes the declining option in full rather than as an
 * absence.
 *
 * `next` is what the screen owes her after she answers: ENR-208 Scenario 1 for
 * the yes, and for the no the fact that nothing is now pending, which is the
 * whole of "a complete answer".
 */
export const ACCOMMODATION_ANSWERS = [
  {
    id: 'yes',
    label: 'Yes, I’d like to talk',
    means: 'Accessibility Services gets your name and reaches out. Nothing about your health is sent with it.',
    said: 'You asked to talk to Accessibility Services',
    next: 'They will reach out before term starts, with enough time to put anything you agree on in place for your first classes.',
  },
  {
    id: 'no',
    label: 'Not right now',
    means: 'Nothing is sent and nothing opens. You can come back and change this at any point, including after term starts.',
    said: 'You said not right now',
    next: 'This is a complete answer. Nothing is pending, nothing is blocked, and nobody is waiting on you for it.',
  },
];

/**
 * What the section holds per preview state. `onboarding` is where the answer was
 * given — ENR-205 AC 3 asks the screen to show what she already resolved rather
 * than ask again, and naming the place she did it is how the screen proves it is
 * not asking again.
 */
export function healthAnswerFor(state) {
  if (state === 'empty' || state === 'send-fails') return null;
  if (state === 'health-returned' || state === 'health-settled') {
    return { value: 'yes', on: 'Aug 12', where: 'onboarding' };
  }
  return { value: 'no', on: 'Aug 12', where: 'onboarding' };
}
