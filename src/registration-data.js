/**
 * The registration gate — ENR-214 AC 7.
 *
 * **Which requirements hold class registration is configuration, not code.** No
 * component below may name an id; they all ask `lib/registration.js`. The test
 * of whether that held is simple: adding a financial hold should be one entry
 * here and no other change anywhere.
 *
 * The two chosen on 2026-08-20 each earn their place rather than being invented
 * for the card:
 *
 *   immunization-record   a document requirement that goes through **review**,
 *                         so it is the one that can exercise AC 6 — the gate
 *                         lifts on acceptance and not on submission. Its own
 *                         entry in `documents-data.js` has said
 *                         "Class registration opens once your record clears"
 *                         since ENR-206, with nothing reading it.
 *
 *   orientation           a required event whose note in `campus-data.js` has
 *                         said "the Registrar holds your course registration
 *                         until you attend a make-up session" since ENR-189,
 *                         with nothing in the checklist knowing. This card is
 *                         what joins the two screens.
 *
 * `opens` matches the date `appointments-data.js` already gives out: course
 * advisors publish their times once registration opens on 1 September.
 */

export const registration = {
  opens: '2026-09-01',
  label: 'class registration',
  gatedBy: ['immunization-record', 'orientation'],
};
