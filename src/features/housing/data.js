/**
 * Housing — ENR-207, behaviour from ENR-210 and ENR-211.
 *
 * Two things live here and they are not the same kind of thing.
 *
 * The **catalogue** is institution-published content, like campus life: Residential Life publishes
 * residences, the portal projects them, and nothing the student does writes back to a residence.
 * How many exist is the institution's business — eight here, three or forty elsewhere — so nothing
 * in the interface may assume a number.
 *
 * The **plan and the shortlist** are the student's own record. The plan is her answer and it is
 * final; the shortlist is a set of preferences and it decides nothing. `src/lib/housing.js` holds
 * the rules that keep those two apart.
 *
 * The response deadline is exported from here and read by the checklist task in `data.js`, so the
 * section owns its own date and the checklist quotes it. Before this file existed the date was a
 * literal in two places that happened to agree.
 */

/** The date after which the plan and the shortlist stop being editable and Residential Life assigns. */
export const responseDeadline = {
  label: 'Jun 30',
  full: 'Jun 30, 2026',
  daysLeft: 15,
};

/**
 * The figures My Financials' estimate is built on. `costOfAttendance` carries Housing at 12,400 and
 * Meals at 6,300; those are these two, and the qualifier on `CostCard` names them out loud. A
 * residence that costs something else is not a contradiction — it is the reason the qualifier exists.
 */
export const standardRate = 12400;
export const standardMeals = 6300;

export const housingOffice = 'Residential Life';

/**
 * The four answers. Three of them are complete; `undecided` is the absence of an answer said out
 * loud, and it is the only one that leaves the checklist item outstanding on its own.
 *
 * `consequence` is what the interface prints under the choice once it is made — ENR-210 AC 7 wants
 * the effect of confirming a plan stated where the plan is confirmed.
 */
export const planOptions = [
  {
    id: 'on-campus',
    label: 'Living on campus',
    hint: 'Rank the residence halls you would like. Residential Life assigns your room.',
    consequence:
      'Your move-in time opens once this is confirmed, and you can rank residence halls below until ' +
      `${responseDeadline.label}.`,
    complete: true,
  },
  {
    id: 'commuting',
    label: 'Commuting',
    hint: 'You will live at home and travel in. No residence hall to rank.',
    consequence:
      'Your move-in time opens once this is confirmed. Commuter parking and transit information ' +
      'appears on this page before term starts.',
    complete: true,
  },
  {
    id: 'own-housing',
    label: 'Arranging my own housing',
    hint: 'You will rent near campus yourself. Aster needs nothing further.',
    consequence:
      'Your move-in time opens once this is confirmed. This is a complete answer. Nothing about ' +
      'housing stays open on your checklist.',
    complete: true,
  },
  {
    id: 'undecided',
    label: 'I need help deciding',
    hint: 'Residential Life will help you decide. Your plan stays open.',
    consequence:
      'Nothing is recorded as your plan yet. Residential Life will help you decide, and you can ' +
      `still answer any time before ${responseDeadline.label}.`,
    complete: false,
  },
];

/**
 * The published catalogue. Every residence carries the same fields in the same order, because the
 * catalogue *is* the comparison — there is no compare mode to enter, which is also what stops the
 * screen breaking when a school publishes forty of these.
 *
 * `rooms` is what actually carries a price. `rate` is derived, never stored: see `rateFrom` in
 * `lib/housing.js`, so a room type cannot be added without the row's figure following it.
 */
export const residences = [
  {
    id: 'alcott',
    name: 'Alcott House',
    initials: 'AH',
    area: 'Main campus, east side',
    walk: 6,
    rooms: [
      { label: 'Shared double', rate: 12400 },
      { label: 'Single', rate: 13900 },
    ],
    meals: { included: true, amount: standardMeals },
    summary: 'The oldest hall still in use, and the one closest to the library.',
    about:
      'Four floors around a courtyard, with the common room where your building’s hall meeting is ' +
      'held in the first week. Rooms are furnished; bathrooms are shared between four.',
    features: ['Laundry on every floor', 'Common room and kitchenette', 'Bike store'],
  },
  {
    id: 'brackenridge',
    name: 'Brackenridge Hall',
    initials: 'BH',
    area: 'North campus',
    walk: 14,
    rooms: [
      { label: 'Shared triple', rate: 10400 },
      { label: 'Shared double', rate: 11200 },
    ],
    meals: { included: true, amount: standardMeals },
    summary: 'The cheapest rooms on campus, and the largest of them.',
    about:
      'Built as staff housing in the 1950s and converted since. Rooms are noticeably bigger than ' +
      'the newer halls, bathrooms are shared between six, and the walk is the trade.',
    features: ['Music practice rooms', 'Laundry in the basement', 'Late bus stop outside'],
  },
  {
    id: 'coyne',
    name: 'Coyne House',
    initials: 'CH',
    area: 'Main campus, west side',
    walk: 4,
    rooms: [{ label: 'Single with ensuite', rate: 15800 }],
    meals: { included: true, amount: standardMeals },
    summary: 'Singles with their own bathroom, and the shortest walk to anywhere.',
    about:
      'Opened in 2024. Every room is a single with an ensuite, which is why it is the most ' +
      'expensive and why it is the first to fill.',
    features: ['Ensuite in every room', 'Study rooms bookable by the hour', 'Step-free entrance'],
  },
  {
    id: 'dunmore',
    name: 'Dunmore Court',
    initials: 'DC',
    area: 'South campus',
    walk: 9,
    rooms: [
      { label: 'Room in a six-person suite', rate: 12900 },
      { label: 'Room in a four-person suite', rate: 13600 },
    ],
    meals: { included: false, amount: standardMeals },
    summary: 'Self-catered flats with a shared kitchen, for people who would rather cook.',
    about:
      'Flats of four or six with a full kitchen and a living room. No meal plan is included in the ' +
      'rate. You can add one, or you can shop and cook, which most people here do.',
    features: ['Full kitchen in every suite', 'Living room per suite', 'Laundry in the courtyard'],
  },
  {
    id: 'elmsworth',
    name: 'Elmsworth Hall',
    initials: 'EH',
    area: 'North campus',
    walk: 11,
    rooms: [
      { label: 'Shared double', rate: 12400 },
      { label: 'Single', rate: 13700 },
    ],
    meals: { included: true, amount: standardMeals },
    summary: 'Two quiet floors, kept quiet by agreement rather than by rule.',
    about:
      'The same rooms and the same rate as Alcott, further out and considerably quieter. The top ' +
      'two floors are quiet floors, which residents sign up to rather than are assigned to.',
    features: ['Two quiet floors', 'Laundry on every floor', 'Reading room'],
  },
  {
    id: 'fairholt',
    name: 'Fairholt House',
    initials: 'FH',
    area: 'Riverside',
    walk: 18,
    rooms: [
      { label: 'Shared triple', rate: 9800 },
      { label: 'Shared double', rate: 10900 },
    ],
    meals: { included: true, amount: standardMeals },
    summary: 'The furthest out, the cheapest, and the only one on the river.',
    about:
      'Eighteen minutes on foot or six by the shuttle, which runs until midnight. In exchange it is ' +
      'the lowest rate Aster publishes and the rooms look over the water.',
    features: ['Shuttle every 15 minutes', 'River terrace', 'Laundry on two floors'],
  },
  {
    id: 'garrow',
    name: 'Garrow Court',
    initials: 'GC',
    area: 'Main campus, north gate',
    walk: 7,
    rooms: [{ label: 'Studio', rate: 14200 }],
    meals: { included: false, amount: standardMeals },
    summary: 'Self-contained studios. Your own kitchen, your own bathroom, no flatmates.',
    about:
      'Twenty-eight studios, each with a kitchenette and a bathroom. Self-catered, so no meal plan ' +
      'is in the rate. Usually the choice of students who have lived away from home before.',
    features: ['Own kitchenette and bathroom', 'Bike store', 'Step-free entrance'],
  },
  {
    id: 'kestrel',
    name: 'Kestrel House',
    initials: 'KH',
    area: 'Main campus, east side',
    walk: 12,
    rooms: [
      { label: 'Shared double, step-free', rate: 12200 },
      { label: 'Single, step-free', rate: 13100 },
    ],
    meals: { included: true, amount: standardMeals },
    summary: 'Designed step-free throughout, with wider doors and adjustable furniture.',
    about:
      'Every room, corridor and shared space is step-free, and rooms can be fitted out on request ' +
      'before you arrive. Open to any student; ask Residential Life about a specific adjustment.',
    features: ['Step-free throughout', 'Adjustable-height furniture', 'Accessible laundry'],
  },
];

/** A shortlist submitted at onboarding, and the one shown after the deadline. */
const RANKED = ['coyne', 'alcott', 'dunmore'];

/**
 * The assignment. It carries who assigned it and when, which is the rule a room assignment shares
 * with a decision and the only thing it shares with one — ENR-213 AC 5. Note that it does not match
 * the first preference: an assignment that differs from a ranking is still a valid assignment, and
 * this data says so rather than letting the happy path imply otherwise.
 */
const ASSIGNMENT = {
  residenceId: 'alcott',
  room: 'Room 214, shared double',
  moveIn: 'Aug 22',
  assignedBy: 'Nadia Aslam, Residential Life',
  assignedOn: 'July 20, 2026',
};

/**
 * One shape per preview state. `catalogue: null` is the partial case — the plan loaded and the
 * published catalogue did not, which is a different thing from a catalogue that is empty because
 * Residential Life has not published one.
 */
export function housingFor(previewState) {
  switch (previewState) {
    case 'onboarding-answered':
      return {
        plan: 'on-campus',
        planSource: 'onboarding',
        shortlist: RANKED,
        catalogue: residences,
        deadlinePassed: false,
        assignment: null,
        failure: null,
      };
    case 'deadline-passed':
      return {
        plan: 'on-campus',
        planSource: 'portal',
        shortlist: RANKED,
        catalogue: residences,
        deadlinePassed: true,
        assignment: null,
        failure: null,
      };
    case 'room-assigned':
      return {
        plan: 'on-campus',
        planSource: 'portal',
        shortlist: RANKED,
        catalogue: residences,
        deadlinePassed: true,
        assignment: ASSIGNMENT,
        failure: null,
      };
    case 'send-fails':
      return {
        plan: 'commuting',
        planSource: 'portal',
        shortlist: [],
        catalogue: residences,
        deadlinePassed: false,
        assignment: null,
        failure:
          'Residential Life did not accept the change. Their record still says you are commuting, ' +
          'and that is what is shown above.',
      };
    case 'partial':
      return {
        plan: null,
        planSource: 'portal',
        shortlist: [],
        catalogue: null,
        deadlinePassed: false,
        assignment: null,
        failure: null,
      };
    case 'empty':
      return {
        plan: null,
        planSource: 'portal',
        shortlist: [],
        catalogue: [],
        deadlinePassed: false,
        assignment: null,
        failure: null,
      };
    default:
      return {
        plan: null,
        planSource: 'portal',
        shortlist: [],
        catalogue: residences,
        deadlinePassed: false,
        assignment: null,
        failure: null,
      };
  }
}
