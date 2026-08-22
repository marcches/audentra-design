import { RECORD_CATEGORIES, STEPS, TOTAL_STEPS } from './data.js';

/**
 * What onboarding computes. Nothing here reads the DOM, the URL or storage —
 * every function takes the record the server sent and returns a reading of it,
 * because ENR-149 AC 1 is only true if the browser has no way to decide that a
 * step is complete.
 */

/**
 * Resolved is **saved or skipped**, and that distinction is the whole of
 * ENR-150. A skipped step is resolved — the flow moves past it — and it is
 * never complete, so it is never counted in the saved figure (AC 2, AC 6).
 */
export function isResolved(id, record) {
  return record.saved.includes(id) || record.skipped.includes(id);
}

/** ENR-151 AC 2. The lock comes from the published configuration, never from the interface. */
export function isLocked(step, record) {
  return Boolean(step.after) && !record.saved.includes(step.after);
}

/**
 * The first step that is neither saved nor skipped — where a returning student
 * lands (ENR-149 AC 6). A locked step is skipped over: it is not refusing her,
 * it has simply not arrived.
 */
export function firstUnresolved(record) {
  const open = STEPS.find(
    (step) => !isResolved(step.id, record) && !isLocked(step, record),
  );
  if (open) return open.id;
  const locked = STEPS.find((step) => !isResolved(step.id, record));
  return locked ? locked.id : STEPS[STEPS.length - 1].id;
}

/**
 * The four states, and the two conditions that are not states.
 *
 * `locked` is not a fifth state — ENR-149 AC 3 names four and means four. It is
 * an upcoming step that carries a reason, and the rail draws it as one.
 * `unknown` is not a state either: it is what the interface must say when the
 * answers could not be read, instead of guessing (ENR-149 Scenario 4).
 */
export function stepState(id, record, currentId) {
  if (record.unknown) return 'unknown';
  if (record.saved.includes(id)) return 'saved';
  if (record.skipped.includes(id)) return 'skipped';
  if (id === currentId) return 'current';
  const step = STEPS.find((item) => item.id === id);
  if (step && isLocked(step, record)) return 'locked';
  return 'upcoming';
}

/**
 * ENR-151 AC 1 and AC 2. A step is openable when it is not locked and it is
 * either resolved, or the one she is on, or the first thing still open. Every
 * other step is refused — from the rail, and from a hash typed by hand.
 */
export function isReachable(id, record) {
  const step = STEPS.find((item) => item.id === id);
  if (!step) return false;
  if (isLocked(step, record)) return false;
  return isResolved(id, record) || id === firstUnresolved(record);
}

export function stepById(id) {
  return STEPS.find((step) => step.id === id) ?? null;
}

export function stepIndex(id) {
  return STEPS.findIndex((step) => step.id === id);
}

/** 1-based, because it is read out loud as "step 3 of 8". */
export function stepNumber(id) {
  return stepIndex(id) + 1;
}

export function savedCount(record) {
  return record.saved.length;
}

export function skippedCount(record) {
  return record.skipped.length;
}

/** ENR-150 AC 6. Saved and skipped are counted apart, and the line says both. */
export function progressLine(record) {
  const skipped = skippedCount(record);
  const left = TOTAL_STEPS - savedCount(record) - skipped;
  if (left === 0 && skipped === 0) return 'Everything Aster asked for.';
  const parts = [];
  if (skipped) parts.push(`${skipped} skipped`);
  parts.push(left === 0 ? 'nothing left to do' : `${left} still to do`);
  return parts.join(' · ');
}

export function allResolved(record) {
  return STEPS.every((step) => isResolved(step.id, record));
}

/** What the meter draws: two runs, not one. Skipped is progress through the flow, not progress. */
export function meter(record) {
  return {
    saved: (savedCount(record) / TOTAL_STEPS) * 100,
    skipped: (skippedCount(record) / TOTAL_STEPS) * 100,
  };
}

export function categoryById(id) {
  return RECORD_CATEGORIES.find((category) => category.id === id) ?? null;
}

/**
 * ENR-154 AC 5 and ENR-153 AC 6. What one person may discuss, in that person's
 * own row and in the sentence confirming a change — the same list either way,
 * so the two can never disagree.
 */
export function grantedNames(grant) {
  return grant.granted.map((id) => categoryById(id)?.name).filter(Boolean);
}

/** The sentence a revocation is confirmed with: what they can no longer discuss. */
export function revokedSentence(grant) {
  const first = grant.person.name.split(' ')[0];
  const names = grantedNames(grant);
  if (!names.length) return `${first} could not discuss anything, and still cannot.`;
  return `${first} can no longer discuss ${listSentence(names.map((name) => name.toLowerCase()))}.`;
}

/** The sentence a narrowing is confirmed with. */
export function narrowedSentence(grant, category) {
  const first = grant.person.name.split(' ')[0];
  return `${first} can no longer discuss ${category.name.toLowerCase()}.`;
}

export function listSentence(items) {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * ENR-153 AC 3 and Scenario 2. An authorization with no category is refused,
 * and the reason is stated — so the check returns the reason rather than a
 * boolean, and the drawer prints what it gets back.
 */
export function grantProblem(draft) {
  if (!draft.name.trim()) return { field: 'name', reason: 'Add the name of the person you are authorizing.' };
  if (!draft.email.trim() || !draft.email.includes('@')) {
    return { field: 'email', reason: 'Aster needs an email address to reach them on.' };
  }
  if (!draft.granted.length) {
    return {
      field: 'categories',
      reason:
        'Pick at least one thing they may discuss. An authorization that covers nothing is not saved. If you do not want to share anything, leave them off the list.',
    };
  }
  if (!draft.endsOn) return { field: 'endsOn', reason: 'Every authorization ends on a date. Choose one.' };
  return null;
}

/** ENR-210 AC 6 in onboarding's half of it: two of three is saved, and it says partial. */
export function shortlistLine(shortlist) {
  if (!shortlist.length) return 'No residence halls ranked yet.';
  if (shortlist.length === 3) return 'Three ranked. This is a complete shortlist.';
  return `${shortlist.length} of 3 ranked. A partial shortlist is saved, and Residential Life reads it as partial.`;
}

/**
 * The rows `StepRail` renders. The pattern owns what a state looks like and
 * what it is called; this owns which state each step is in and the two metas
 * that are onboarding's own — why a locked step is not open, and how long a
 * step nobody has reached yet takes. The step she is on carries no meta: its
 * position is the number on its mark and the eyebrow over the question.
 */
export function railSteps(record, currentId) {
  return STEPS.map((step) => {
    const state = stepState(step.id, record, currentId);
    const meta =
      state === 'locked'
        ? step.lockReason
        : state === 'upcoming'
          ? `${step.minutes} min${step.required ? '' : ' · optional'}`
          : undefined;

    return {
      id: step.id,
      name: step.name,
      state,
      meta,
      faint: state === 'upcoming',
      reachable: !record.unknown && isReachable(step.id, record) && step.id !== currentId,
    };
  });
}
