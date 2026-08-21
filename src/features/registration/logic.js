/**
 * The registration gate — ENR-214.
 *
 * The distinction this file exists to protect, because the screen is unreadable
 * without it:
 *
 *   a **locked step** (ENR-156, `lockedTasks`) is one she *cannot start yet* —
 *   its prerequisite is unmet, and the answer is to go and do the other thing;
 *
 *   a **gating requirement** (this file) is one she *can act on right now* and
 *   whose being unmet will refuse something later.
 *
 * They share no words. A gating requirement is never called *blocked*, because
 * that word already belongs to the other state, and a student who reads the
 * same word for both learns nothing from either.
 *
 * Three gate states, and the third is the one that matters. `waiting` is not
 * `open` — AC 6, submitting did not lift it — and it is not `held` either,
 * because telling a student to act when the institution is the holder is the
 * failure the holder principle in `CONTEXT.md` exists to prevent.
 */

import { registration } from './data.js';
import { stateOf } from '../documents/logic.js';
import { PORTAL_TODAY } from '../enrollment/data.js';

const DAY = 24 * 60 * 60 * 1000;

/** No component may test an id. AC 7 is this function existing. */
export function isGating(id, config = registration) {
  return config.gatedBy.includes(id);
}

/**
 * The configuration in force. `registration-open` is an institution that holds
 * registration for nothing — the real code path with an empty list, not a
 * branch that skips it, so the state proves AC 7 rather than describing it.
 */
export function configFor(previewState) {
  return previewState === 'registration-open' ? { ...registration, gatedBy: [] } : registration;
}

export function daysUntilOpen(config = registration, today = PORTAL_TODAY) {
  return Math.max(0, Math.round((Date.parse(config.opens) - Date.parse(today)) / DAY));
}

export function opensOn(config = registration) {
  return new Date(`${config.opens}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });
}

/**
 * What each gating requirement is, wherever it lives. A document requirement
 * and a required event are different objects on different screens; the gate does
 * not care, so this is where the two are read into one vocabulary.
 *
 * `holder` says whose move it is, and it is what keeps the `waiting` state
 * honest.
 */
export function gateItems({ requirements = [], events = [], config = registration } = {}) {
  return config.gatedBy
    .map((id) => {
      const requirement = requirements.find((item) => item.id === id);
      if (requirement) {
        const state = stateOf(requirement);
        return {
          id,
          label: requirement.title,
          // AC 6: in review is pending, never met. `checking` is a machine wait
          // and belongs on the same side — neither has been decided.
          met: state === 'accepted',
          holder: state === 'in-review' || state === 'checking' ? 'aster' : 'you',
          state,
          // The checklist step whose subject this requirement is, so AC 1 can
          // mark it on My Enrollment too without the card knowing an id.
          taskId: requirement.taskId ?? null,
          since: requirement.submissions?.at(-1)?.sent ?? null,
          route: '#/my-documents',
        };
      }

      const event = events.find((item) => item.id === id);
      if (event) {
        return {
          id,
          label: event.title,
          // Nothing in this prototype records attendance, so a required session
          // is outstanding until it is not. Stated rather than faked.
          met: false,
          holder: 'you',
          state: 'needed',
          route: '#/events',
        };
      }

      return null;
    })
    .filter(Boolean);
}

/**
 * `open` · `held` · `waiting`.
 *
 * An institution that gates nothing gets `open`, which renders no notice and no
 * chip — the same discipline ENR-162 AC 5 asks of rewards, and reachable from
 * the preview menu as `registration-open`.
 */
export function gateState(items) {
  const outstanding = items.filter((item) => !item.met);
  if (outstanding.length === 0) return 'open';
  return outstanding.every((item) => item.holder === 'aster') ? 'waiting' : 'held';
}

export function outstanding(items) {
  return items.filter((item) => !item.met);
}

/** What the student still has to act on herself — the count the notice states. */
export function yoursToAct(items) {
  return items.filter((item) => !item.met && item.holder === 'you');
}

/**
 * The ids a surface can mark, by what that surface renders. Keeps AC 7 true one
 * level further down: a card asks "is this one of mine", never "is this the
 * immunization record".
 */
export function gatingIds(items) {
  return new Set(outstanding(items).map((item) => item.id));
}

export function gatingTaskIds(items) {
  return new Set(outstanding(items).map((item) => item.taskId).filter(Boolean));
}

/** The state a surface should show for one gating id, or null if it is not one. */
export function gateFor(items, id) {
  return items.find((item) => item.id === id && !item.met) ?? null;
}
