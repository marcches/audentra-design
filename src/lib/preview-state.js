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
  ['partial', 'Partial data', 'The catalog loaded; your transcript could not be checked.'],
  ['error', 'Error', 'The published catalog could not be loaded at all.'],
  ['aid-final', 'Aid finalized', 'My Financials with the federal loan approved and nothing outstanding.'],
  ['empty', 'No programme yet', 'Before Aster assigns your academic programme.'],
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
