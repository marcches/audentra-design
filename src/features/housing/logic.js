/**
 * The rules that keep the two housing questions apart — ENR-207.
 *
 * The plan is an answer: the student gives it, three of the four options are complete, and giving
 * one is what unlocks the move-in step. The shortlist is a set of **preferences**: she writes it,
 * and it decides nothing. Everything in this file exists so no component has to remember which of
 * those two it is holding.
 *
 * The one rule worth stating out loud, because the whole screen leans on it: **after the response
 * deadline every mutating control is absent, not disabled.** A disabled control is an offer
 * withdrawn; an absent one is a stage that has passed, which is what the stage tracker says.
 */
import { formatMoney } from '../financials/logic.js';
import {
  housingOffice,
  planOptions,
  residences,
  responseDeadline,
  standardMeals,
  standardRate,
} from './data.js';

/** Fixed by the institution, whatever the size of the catalogue. ENR-211 AC 1. */
export const SHORTLIST_MAX = 3;

/** The three stages the section moves through. The tracker renders these in order. */
export const STAGES = ['Preferences submitted', 'Residential Life assigning', 'Room assigned'];

export function planById(id) {
  return planOptions.find((option) => option.id === id) ?? null;
}

export function residenceById(id) {
  return residences.find((item) => item.id === id) ?? null;
}

/**
 * Answered means a plan Aster can act on. `undecided` is deliberately not one: ENR-210 AC 4 says
 * needing help leaves the plan open rather than recording a decision, so it must not satisfy
 * anything that asks whether the question has been answered.
 */
export function planIsAnswered(plan) {
  return Boolean(planById(plan)?.complete);
}

/** Only one plan opens the second question. ENR-210 AC 3. */
export function opensShortlist(plan) {
  return plan === 'on-campus';
}

/**
 * Who gets to see the catalogue. Someone who asked for help deciding needs the information — hiding
 * it would be the opposite of helping — but she cannot rank from it, because ranking is the second
 * question and the second question is not open. Looking is not ranking.
 */
export function showsCatalogue(plan) {
  return plan === 'on-campus' || plan === 'undecided';
}

/** `none`, `partial` or `complete`. A partial shortlist is saved and never presented as complete. */
export function shortlistState(shortlist) {
  if (!shortlist || shortlist.length === 0) return 'none';
  return shortlist.length >= SHORTLIST_MAX ? 'complete' : 'partial';
}

/**
 * Whether the housing item on the checklist is still asking for something — the single item that
 * covers both questions, per ENR-211 Scenario 4, which keeps "the housing item" outstanding for a
 * partial shortlist.
 */
export function housingOutstanding({ plan, shortlist, deadlinePassed }) {
  if (deadlinePassed) return false;
  if (!planIsAnswered(plan)) return true;
  if (!opensShortlist(plan)) return false;
  return shortlistState(shortlist) !== 'complete';
}

/** What that one checklist item is asking for right now. */
export function checklistAsk({ plan, shortlist, deadlinePassed }) {
  if (deadlinePassed) return 'Residential Life is assigning rooms.';
  if (!planIsAnswered(plan)) return 'Tell Aster where you plan to live.';
  if (!opensShortlist(plan)) return 'Answered.';
  const state = shortlistState(shortlist);
  if (state === 'complete') return 'Answered, with three residence halls ranked.';
  if (state === 'partial') {
    const left = SHORTLIST_MAX - shortlist.length;
    return `Rank ${left} more ${left === 1 ? 'residence' : 'residences'}.`;
  }
  return 'Rank the residence halls you would like.';
}

/** Confirming a plan is what unlocks the move-in step — ENR-210 AC 7. */
export function moveInUnlocked(plan) {
  return planIsAnswered(plan);
}

/**
 * The word on a ranked row. `preference`, never `choice`: the student is choosing what to ask for,
 * not choosing a room, and `CONTEXT.md` gives the interface `preference` for exactly this reason.
 */
export function ordinal(index) {
  return `${['1st', '2nd', '3rd'][index] ?? `${index + 1}th`} preference`;
}

/** Derived, never stored, so a room type cannot be added without the row's figure following it. */
export function rateFrom(residence) {
  return Math.min(...residence.rooms.map((room) => room.rate));
}

export function mealsLabel(residence) {
  return residence.meals.included
    ? `Full meal plan · ${formatMoney(residence.meals.amount)}`
    : 'Self-catered · plan optional';
}

/** Room plus meals, which is the pair `costOfAttendance` splits across two lines. */
export function annualTotal(residence) {
  return rateFrom(residence) + (residence.meals.included ? residence.meals.amount : 0);
}

/**
 * ENR-211 AC 8 — the rates here must not contradict My Financials. They cannot be made identical
 * without freezing every residence at one price, so instead every residence says, in its own detail,
 * exactly how it sits against the figure the estimate was built on. The comparison is stated, not
 * implied.
 */
function against(amount, reference) {
  const gap = amount - reference;
  if (gap === 0) return `the same as the ${formatMoney(reference)}`;
  return `${formatMoney(Math.abs(gap))} ${gap > 0 ? 'more' : 'less'} than the ${formatMoney(reference)}`;
}

export function reconciliation(residence) {
  // A self-catered residence cannot be compared against both lines at once, and pretending it can
  // is the contradiction this function exists to prevent: its room is cheaper than the housing
  // line, but the meals line stops being something Aster bills at all. `costOfAttendance` marks
  // Meals `direct: true`, so on this residence that money moves from what Aster charges to what
  // the student spends elsewhere. Quietly subtracting it would have shown a saving that is not one.
  if (!residence.meals.included) {
    const room = rateFrom(residence);
    return (
      `${formatMoney(room)} for the room, ${against(room, standardRate)} My Financials uses for ` +
      `housing. It is self-catered, so the ${formatMoney(standardMeals)} on the meals line stops ` +
      `being something Aster bills you and becomes money you spend yourself; the full meal plan is ` +
      `available at the same price, which would bring the year to ${formatMoney(room + residence.meals.amount)}. ` +
      'Either way, that estimate only changes once Residential Life assigns your room.'
    );
  }

  const total = annualTotal(residence);
  const standard = standardRate + standardMeals;

  if (total === standard) {
    return (
      `${formatMoney(total)} for room and meals, the same figure My Financials is already using, ` +
      'so your estimated balance there would not move.'
    );
  }

  return (
    `${formatMoney(total)} for room and meals, ${against(total, standard)} My Financials is ` +
    'using for the two together. That estimate only changes once Residential Life assigns your room.'
  );
}

/** Which stage the tracker is on. Index into `STAGES`. */
export function stageOf({ deadlinePassed, assignment }) {
  if (assignment) return 2;
  if (deadlinePassed) return 1;
  return 0;
}

/* ------------------------------------------------------------------ *
 * The review of 2026-08-21 — the standing (G4, G5), the band (G7), the filters (G10)
 * ------------------------------------------------------------------ */

/**
 * What the page is asking of her, said once, in the summary panel (G4; copy §6.1). The figure
 * is the plan's *standing*, which moves — which is what lets the panel come back after the Jam
 * of 2026-08-21 removed one whose figure was the plan itself. The line under it is the deadline
 * with its days, or the assignment.
 *
 * `ready`, `empty` and `partial` are the skipped-at-onboarding case: Housing is always present
 * in the portal and becomes work only because she did not answer it while accepting her offer
 * (rule 1). An onboarding answer of *off campus* is recorded and still owes one question (G2).
 * Needing help deciding is not a decision, so it stays on the checklist (ENR-210 AC 4).
 */
export function planStanding({ plan, planSource, deadlinePassed, assignment }) {
  const until = `${responseDeadline.label} · ${responseDeadline.daysLeft} days`;
  if (assignment) {
    const residence = residenceById(assignment.residenceId);
    return {
      status: 'Room assigned',
      tone: 'done',
      line: `${residence.name}, ${assignment.room}. Move in ${assignment.moveIn}.`,
      asking: false,
    };
  }
  if (deadlinePassed) {
    return {
      status: 'Submitted',
      tone: 'quiet',
      line: `${housingOffice} is assigning rooms from what you submitted.`,
      asking: false,
    };
  }
  if (plan === 'off-campus') {
    return {
      status: 'Recorded at onboarding',
      tone: 'wait',
      line: `You said off campus. One question left below — due ${until}.`,
      asking: true,
    };
  }
  if (planIsAnswered(plan)) {
    return planSource === 'onboarding'
      ? {
          status: 'Recorded at onboarding',
          tone: 'done',
          line: `Nothing is being asked of you here. You can change it until ${until}.`,
          asking: false,
        }
      : { status: 'Recorded', tone: 'done', line: `Yours to change until ${until}.`, asking: false };
  }
  if (plan === 'undecided') {
    return {
      status: 'On your checklist',
      tone: 'wait',
      line: `${housingOffice} will help you decide. Due ${until}.`,
      asking: true,
    };
  }
  return {
    status: 'On your checklist',
    tone: 'wait',
    line: `You skipped this while accepting your offer. Due ${until}.`,
    asking: true,
  };
}

/** The panel's second line — "3 of 3 residences ranked" — only where the plan is on campus (G5). */
export function rankedLine({ plan, shortlist }) {
  return opensShortlist(plan) ? `${shortlist.length} of ${SHORTLIST_MAX} residences ranked` : null;
}

/**
 * The band — G7, and the rule is this screen's. A rejected change names itself and the button
 * retries; an unanswered first question names the deadline and focuses it; a plan on campus with
 * slots open names them and scrolls to the catalogue. It never asks for something the deadline
 * has closed, never renders after a room, and never says *rank* where there is nothing to rank.
 * `kind` says which card hosts it: the plan card or the shortlist panel.
 */
export function bandFor({ plan, shortlist, catalogue, deadlinePassed, assignment, failure }) {
  if (assignment || deadlinePassed) return null;
  if (failure) {
    return {
      kind: 'retry',
      icon: 'alert',
      label: `${housingOffice} didn’t accept that change`,
      action: { label: 'Try again', icon: 'refresh' },
    };
  }
  if (!planIsAnswered(plan)) {
    return {
      kind: 'plan',
      icon: 'flag',
      label: `Your housing plan is due ${responseDeadline.label}`,
      action: { label: 'Choose your plan' },
    };
  }
  if (opensShortlist(plan) && shortlistState(shortlist) !== 'complete' && catalogue?.length > 0) {
    return {
      kind: 'shortlist',
      icon: 'spark',
      label: `You’ve ranked ${shortlist.length} of ${SHORTLIST_MAX} residences`,
      action: { label: 'Rank residences' },
    };
  }
  return null;
}

/**
 * The filters — G10. Three, and they are the attributes the cards show: the room type, the meal
 * plan, and a ceiling on the lowest rate. A value that would return nothing with the other two as
 * they are is disabled and says so, never an empty list — `countWith` is the number Walmart prints
 * on its chip, read here to grey the chip rather than to decorate it.
 */
export const ROOM_KINDS = [
  ['single', 'Single'],
  ['double', 'Shared double'],
  ['triple', 'Shared triple'],
  ['suite', 'Suite'],
  ['studio', 'Studio'],
];
export const MEAL_PLANS = [
  ['included', 'Meal plan included'],
  ['optional', 'Self-catered'],
];
export const PRICE_CEILINGS = [11000, 13000, 15000];
export const NO_FILTERS = { kind: null, meals: null, ceiling: null };

export function matchesFilters(residence, { kind, meals, ceiling }) {
  if (kind && !residence.rooms.some((room) => room.kind === kind)) return false;
  if (meals === 'included' && !residence.meals.included) return false;
  if (meals === 'optional' && residence.meals.included) return false;
  if (ceiling && rateFrom(residence) > ceiling) return false;
  return true;
}

export function filterCatalogue(catalogue, filters) {
  return catalogue.filter((residence) => matchesFilters(residence, filters));
}

export function countWith(catalogue, filters, key, value) {
  return filterCatalogue(catalogue, { ...filters, [key]: value }).length;
}

export function activeFilterCount(filters) {
  return Object.values(filters).filter(Boolean).length;
}

/** The two sorts — the rate and the walk, the pair students actually trade against each other. */
export function orderCatalogue(catalogue, sort) {
  return [...catalogue].sort((a, b) =>
    sort === 'walk' ? a.walk - b.walk : rateFrom(a) - rateFrom(b),
  );
}
