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
 *                         "The hold on your class registration lifts once your record clears"
 *                         since ENR-206, with nothing reading it.
 *
 *   orientation           a required event whose note in `campus-data.js` has
 *                         said "the Registrar holds your course registration
 *                         until you attend a make-up session" since ENR-189,
 *                         with nothing in the checklist knowing. This card is
 *                         what joins the two screens.
 *
 * `opens` is the day Maya registers: day two of her Aster Orientation session,
 * Jul 14 (`docs/domain/aster.md` §8). First-years register at orientation, as
 * US campuses do, behind the holds in §9 — there is no "registration opens on
 * Sep 1" anywhere in the product any more (US-standard brief, Q10).
 */

export const registration = {
  opens: '2026-07-14',
  label: 'class registration',
  gatedBy: ['immunization-record', 'orientation'],
};
