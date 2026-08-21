/**
 * The demo-state control behind the `Concept preview` pill.
 *
 * The vocabulary and the `?state=` transport are ENR-180's, adopted here so the
 * navigation card can generalise this to every page without renaming anything.
 * `no-matches` is the one addition My Classrooms needs: ENR-186 AC 5 requires a
 * state for a student whose documents produced nothing, and it has nowhere else
 * to live.
 */
export const PREVIEW_STATES = [
  ['ready', 'Ready', 'Requirements, approved credit and two potential matches.'],
  ['loading', 'Loading', 'Before the published catalog arrives.'],
  ['no-matches', 'No credit matches', 'Requirements, and nothing found in your documents.'],
  // ENR-189: the density the card asks about — four items and forty — is a state
  // you can look at rather than a claim in a spec.
  ['full-board', 'Full board', 'Three required sessions, forty-three events, eighteen clubs.'],
  // ENR-183: the two states Appointments adds. `no-times` is the second of the
  // card's two emptinesses — nothing booked because no team has published
  // anything — and `booking-fails` is the guardrail state, a team whose calendar
  // cannot be reached. Both are here so a `?state=` link to one survives a reload.
  ['no-times', 'No times published', 'Appointments before any team opens a calendar.'],
  ['booking-fails', 'Team unreachable', 'A booking that never reaches the team it was for.'],
  // 2026-08-21, ADR 0005: a time the student asked a team for, and the team
  // has not answered. Seeded so the REQUESTED badge, the row and the rail's
  // waiting card can be looked at without sending one.
  ['requested', 'A time asked for', 'Appointments with one request waiting on a team.'],
  // ENR-182: the two things only Help can be in. One is a request an office has
  // put back to the student; the other is a send that never arrived, which has
  // to be reachable to be looked at rather than only described in a spec.
  ['needs-you', 'A request needs you', 'Help with an office waiting on the student.'],
  ['send-fails', 'Sending fails', 'Help where the next thing sent does not reach Aster.'],
  // ENR-165: the one state My Documents is actually about — a submission an
  // office sent back with a reason. It shares `send-fails` with Help, because a
  // send that never arrived is the same failure whatever it was carrying.
  ['changes-requested', 'One came back', 'A document an office sent back, with its reason.'],
  // ENR-206: Health needs its own two, and `changes-requested` cannot be either
  // of them — that fixture is about the financial document, and it deliberately
  // shows the immunization record as accepted so the rejection has nowhere to
  // hide. `health-returned` is the immunization record itself coming back;
  // `health-settled` is both halves resolved, which the section still has to
  // show rather than turning into a congratulatory page (ENR-205 Scenario 4).
  ['health-returned', 'Record came back', 'The immunization record sent back with a reason.'],
  ['health-settled', 'Health resolved', 'The record accepted and the accommodation question answered, and both sections still show it.'],
  // ENR-207: the three worlds Housing cannot be clicked into. The four plans are
  // reachable by answering the question, so they need no id; these are not.
  // `onboarding-answered` is a shortlist that arrived already written, which is
  // the only way to see ENR-210 AC 6 without answering it yourself. The other two
  // are the far side of the response deadline — the card's "effectively two
  // screens" — and they are states rather than a clock, because Housing Services
  // assigning is institutional action and this repo does not simulate that on a
  // timer. Same rule `lib/documents.js` follows: checking advances on a clock, a
  // person's decision never does.
  ['onboarding-answered', 'Answered at onboarding', 'Living on campus, three residences already ranked.'],
  ['deadline-passed', 'After the housing deadline', 'The submitted shortlist, and Housing Services assigning.'],
  ['room-assigned', 'Room assigned', 'A room that isn’t the first preference, and is still valid.'],
  // ENR-163. The five onboarding adds. `empty`, `partial`, `loading` and
  // `error` mean something there too, but they already exist above; these are
  // the ones with nowhere else to live, and they are listed here so a `?state=`
  // link to any of them survives a reload — `readPreviewState` validates
  // against this list and nothing else.
  ['resume-skipped', 'Back after a skip', 'Onboarding resumed with one step set aside.'],
  ['onboarding-permissions', 'Family permissions', 'Onboarding parked on the family permissions step.'],
  ['onboarding-housing', 'Where you will live', 'Onboarding parked on the housing step, shortlist partial.'],
  ['onboarding-complete', 'Onboarding resolved', 'Six steps saved, two set aside, and the flow says so.'],
  ['save-fails', 'A save that fails', 'A step that does not reach Aster, and does not pretend to.'],
  // ENR-167 second pass and ENR-214. Listed here too, so a `?state=` link to
  // either survives a reload — `readPreviewState` validates against this list.
  ['rewards-off', 'Rewards off', 'An institution that does not run a points program.'],
  ['registration-open', 'No registration gate', 'Class registration does not wait on any step.'],
  ['partial', 'Partial data', 'The catalog loaded; your transcript could not be checked.'],
  ['error', 'Error', 'The published catalog could not be loaded at all.'],
  ['aid-final', 'Aid finalized', 'My Financials with the federal loan approved and nothing outstanding.'],
  ['empty', 'No program yet', 'Before Aster assigns your academic program.'],
];

/**
 * What the frame itself can show on any page. A section may offer more — My
 * Classrooms adds `no-matches` above — by passing its own list to the control;
 * `?state=` still validates against every id, so a page-specific link survives
 * a visit to another section.
 */
export const FRAME_STATES = [
  ['ready', 'Ready', 'Everything the student has today.'],
  ['loading', 'Loading', 'Before the portal has its sections.'],
  ['partial', 'Partial data', 'The sections opened; their counts did not arrive.'],
  ['error', 'Error', 'The sections could not be loaded.'],
  ['empty', 'Empty', 'A student with nothing in this section yet.'],
  // ENR-162 AC 5 and ENR-214. Two switches an institution owns, and both have
  // to leave nothing behind — no empty area, no orphaned control, no gap where
  // something used to be. A state nobody can open is a state nobody verified,
  // so they are offered on every page rather than described in a spec. Neither
  // is loading, error, empty or partial, so every page renders exactly as it
  // does when ready; what reads them is the shell and the checklist, from the
  // raw preview value, the way ENR-188 already does.
  ['rewards-off', 'Rewards off', 'An institution that does not run a points program.'],
  ['registration-open', 'No registration gate', 'Class registration does not wait on any step.'],
];

const FRAME_IDS = new Set(FRAME_STATES.map(([id]) => id));

/** A page-specific state means nothing to the frame, which renders it as ready. */
export function frameState(state) {
  return FRAME_IDS.has(state) ? state : 'ready';
}

const VALID = new Set(PREVIEW_STATES.map(([id]) => id));

export function previewStateLabel(state) {
  const found = PREVIEW_STATES.find(([id]) => id === state);
  return found ? found[1] : 'Ready';
}

export function readPreviewState() {
  if (typeof window === 'undefined') return 'ready';
  const value = new URLSearchParams(window.location.search).get('state');
  return VALID.has(value) ? value : 'ready';
}

/** Linkable, so a Jam recording can point at the exact state it is showing. */
export function writePreviewState(state) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (state === 'ready') url.searchParams.delete('state');
  else url.searchParams.set('state', state);
  window.history.replaceState(null, '', url);
}

/**
 * My Financials adds one state of its own: ENR-166 opens on a package that is
 * still pending, because that is the state its guardrail is about. `aid-final`
 * is the same page once the loan is approved. The frame reads both as ready.
 */
export const FINANCIALS_STATES = [
  ['ready', 'Aid still pending', 'The federal loan is not final and two documents still need you.'],
  ['aid-final', 'Aid finalized', 'The loan is approved, nothing is outstanding, and progress has a record.'],
  ['loading', 'Loading', 'Before your financial package arrives.'],
  ['partial', 'Partial data', 'The package loaded; your schedule and progress did not.'],
  ['error', 'Error', 'Your financial information could not be loaded.'],
  ['empty', 'No financial file yet', 'Before Aster opens your financial record.'],
];

/**
 * Profile — ENR-184. `empty` is not "nothing here": it is a record Aster opened
 * today, which holds what the application gave it and nothing the student has
 * chosen yet. `partial` is the one that matters most on this screen, because a
 * verification nobody could check must never render as verified.
 *
 * The last two were My Documents' own while it was a page of its own. It is a
 * panel on this page since 2026-08-21, and a state you cannot reach is a state
 * nobody can look at — so the list this page offers is the list of everything
 * reachable from it, panel included. `empty` and `partial` already meant
 * something to both, and they still do: the same id switches the record under
 * the card and under the panel at once, which is the point of holding one
 * record in `App`.
 */
export const PROFILE_STATES = [
  ['ready', 'Ready', 'The full record: one number pending, one address unverified, one authorization. Three documents still need her.'],
  ['empty', 'New record', 'The day Aster opened it, only what your application gave it, and nothing sent yet.'],
  ['partial', 'Partial data', 'The record loaded; verification, family permissions and what Aster decided could not be read.'],
  ['changes-requested', 'A document came back', 'One submission an office sent back, with its reason, as the only thing outstanding.'],
  ['send-fails', 'Sending fails', 'The next file you send from My Documents does not reach Aster.'],
  ['loading', 'Loading', 'Before the record arrives.'],
  ['error', 'Error', 'The record could not be loaded.'],
];
