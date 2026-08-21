/**
 * Where the portal can go — the destination model, completed by ENR-180.
 *
 * Every destination is declared once. The navigation rows, the page hero and the
 * section placeholder all read this file, so a concept cannot end up with two
 * names on two screens — ENR-174 AC4 as structure rather than as discipline.
 *
 * Started by ENR-166, which declared the rows it builds. ENR-180 extends it with
 * the grouping ENR-174 AC1 requires, the copy each empty section needs and the
 * routing helpers.
 *
 * The page shell pass adds `hero`. Every section opens with the same band — the
 * one My Enrollment has carried since ENR-164 — and its copy lives here rather
 * than inside the page, so a section cannot grow a title that drifts from the
 * name the sidebar gives it. A group owns one hero for all of its leaves: the
 * hero says where you are, the tab row below says which leaf you are reading.
 *
 * `appears` and `produces` are the two halves of the placeholder sentence: what
 * will be here, and what puts it here.
 *
 * `built` says a card owns that screen. Whether it renders is decided by the
 * page registry in `App.jsx` — a destination whose page has not landed yet
 * shows its placeholder, which is its honest state.
 */

export const GROUPS = {
  financials: 'My Financials',
  campus: 'My Campus Life',
};

/**
 * The hero a group's leaves share. Overview, Financial aid and Payments are one
 * subject read three ways, so they get one band and one balance — the tab row
 * under it is what changes.
 */
export const GROUP_HEROES = {
  financials: {
    kicker: 'My Financials · 2026–27 academic year',
    title: 'Let’s make the year add up, Maya.',
    lede: 'What the year costs, what is covering it, and what still needs you — with the person who can change it.',
    motif: 'wallet',
  },
  campus: {
    kicker: 'Campus life · Published by Aster Student Life',
    title: 'Find your people, Maya.',
    lede: 'Events, clubs and the people who run them. One session is required; everything else is yours to choose.',
    motif: 'users',
  },
};

export const DESTINATIONS = [
  {
    id: 'my-enrollment',
    label: 'My Enrollment',
    route: '#/my-enrollment',
    icon: 'check',
    badge: 'openSteps',
    lede: 'Everything Aster still needs from you, in the order that keeps you moving.',
    // The one hero with a flag: the eyebrow states a fact about her standing,
    // not the name of a section. ENR-164's Jam approved this copy as it is.
    hero: {
      flag: 'Offer accepted',
      kicker: 'Class of 2031',
      title: 'You’re in, Maya. Let’s make it official.',
      lede: 'We’ve put your next steps in the order that will keep everything moving. Start with the first one—or choose any task you can do now.',
      motif: 'check',
    },
    appears: 'The steps Aster still needs from you appear here.',
    produces: 'New steps open as you finish the ones before them.',
    next: 'my-documents',
    built: true,
  },
  {
    id: 'my-documents',
    label: 'My Documents',
    route: '#/my-documents',
    icon: 'file',
    // ENR-158 AC 5, the half a portal with no mail server can honour: a
    // decision she has not opened is counted here, so it reaches her somewhere
    // other than the page it happened on.
    badge: 'decisions',
    lede: 'Everything you have sent Aster, and everything Aster has sent you.',
    hero: {
      kicker: 'My Documents',
      title: 'Everything on the record, Maya.',
      lede: 'Everything you have sent Aster, and everything Aster has sent you, in one place.',
    },
    appears: 'Documents you upload and documents Aster sends you appear here.',
    produces: 'The first one arrives when you complete a step that asks for a file.',
    next: 'my-enrollment',
    built: true,
  },
  {
    id: 'appointments',
    label: 'Appointments',
    route: '#/appointments',
    icon: 'calendar',
    lede: 'Time booked with the people who can unblock a step.',
    // The eyebrow names who owns what is on this page: the times are the teams',
    // not the portal's, and that is the whole premise of ENR-178.
    hero: {
      kicker: 'Appointments · Times published by Aster teams',
      title: 'Book time with the people who can help, Maya.',
      lede: 'Time with the offices that own a step — booked, confirmed and in one calendar.',
    },
    appears: 'Appointments you book with Aster staff appear here.',
    produces: 'Booking opens as each team publishes its availability.',
    next: 'help',
    built: true,
  },
  {
    id: 'my-classrooms',
    label: 'My Classrooms',
    route: '#/my-classrooms',
    icon: 'book',
    lede: 'What your degree asks of you, and the courses that satisfy each requirement.',
    hero: {
      kicker: 'Academic · BA Computer Science',
      title: 'Here’s what your degree asks of you, Maya.',
      lede: 'Every requirement your program sets, and the courses that satisfy each one. Aster’s reading of your record, not the record itself.',
      motif: 'book',
    },
    appears: 'Your degree requirements appear here, with the courses that satisfy each one.',
    produces: 'They arrive when Aster assigns your academic program.',
    next: 'my-enrollment',
    built: true,
  },

  {
    id: 'health',
    label: 'Health',
    route: '#/health',
    // Not a heart and not a cross: this section is not a medical record, and the
    // first thing a student reads must not suggest it is.
    icon: 'shield',
    // No badge, deliberately. The record's unread decision is already counted on
    // My Documents — the same event twice in one sidebar is a lie about how much
    // is outstanding — and any counter that could one day include the
    // accommodation question would turn a complete "not right now" into a
    // pending item, which is the one thing this section exists to avoid.
    lede: 'One record Health Services needs, and one question Accessibility Services asked.',
    // The eyebrow names both owners, because the whole screen turns on the two
    // halves belonging to different teams.
    hero: {
      kicker: 'Health · Accessibility Services and Aster University Health Services',
      title: 'Only two things here, Maya.',
      lede: 'One record Health Services needs before you register, and one question that is yours to answer — or not.',
      motif: 'shield',
    },
    appears: 'The health step from onboarding is finished here, whatever is left of it.',
    produces: 'Both parts are open to you from the day your offer is accepted.',
    next: 'my-documents',
    built: true,
  },

  {
    id: 'financials-overview',
    label: 'Overview',
    route: '#/financials/overview',
    icon: 'wallet',
    group: 'financials',
    lede: 'What the year costs, what is covering it, and what still needs you.',
    appears: 'What your year costs, what your aid covers and what is left to pay appear here.',
    produces: 'They arrive when Aster publishes your financial package.',
    next: 'financials-aid',
    built: true,
  },
  {
    id: 'financials-aid',
    label: 'Financial aid',
    route: '#/financials/aid',
    icon: 'award',
    group: 'financials',
    lede: 'Every source paying towards your year, and what could still be added.',
    appears: 'Aid you have been offered, and the paperwork it still needs, appear here.',
    produces: 'They arrive once your aid package is released.',
    next: 'my-documents',
    built: true,
  },
  {
    id: 'financials-payments',
    label: 'Payments',
    route: '#/financials/payments',
    icon: 'card',
    group: 'financials',
    lede: 'What Aster bills you, when each payment is due, and what it has recorded.',
    appears: 'Payments you make and payments still scheduled appear here.',
    produces: 'The first one appears after your first charge is posted.',
    next: 'financials-overview',
    built: true,
  },

  {
    id: 'events',
    label: 'Events',
    route: '#/events',
    icon: 'ticket',
    group: 'campus',
    lede: 'What Aster has scheduled for your class.',
    appears: 'Events Aster publishes for your class appear here.',
    produces: 'Nothing is scheduled yet.',
    next: 'clubs',
    // Obligations only — ENR-189. Campus life is optional; the count is not.
    badge: 'required',
    built: true,
  },
  {
    id: 'clubs',
    label: 'Clubs',
    route: '#/clubs',
    icon: 'users',
    group: 'campus',
    lede: 'The groups you can join once the list is published.',
    appears: 'Clubs you can join appear here.',
    produces: 'Student Life publishes this year’s list before term starts.',
    next: 'events',
    built: true,
  },

  {
    id: 'housing',
    label: 'Housing',
    route: '#/housing',
    icon: 'home',
    // A destination of its own rather than a third leaf of My Campus Life. The
    // reasoning is in docs/adr/0002-housing-is-not-a-campus-life-leaf.md: a
    // group's hero, summary and notice are true of every leaf, and a housing
    // deadline is true of neither Events nor Clubs.
    //
    // No badge, for the reason Health gives above: the housing step is already
    // counted in `openSteps` on My Enrollment, and the same obligation counted
    // twice in one sidebar is a discrepancy the student cannot resolve.
    lede: 'Where you plan to live, and the residences you would like if that is on campus.',
    // The eyebrow names who publishes the catalogue, because the eight
    // residences on this page are the institution's list and not the portal's.
    hero: {
      kicker: 'Housing · Catalogue published by Housing Services',
      title: 'Let’s settle where you’ll live, Maya.',
      lede: 'Two questions: where you plan to live, and which residences you would like. Housing Services assigns the rooms.',
      motif: 'home',
    },
    appears: 'Your housing plan appears here, with the residences Housing Services publishes.',
    produces: 'Both are open to you from the day your offer is accepted.',
    next: 'my-enrollment',
    built: true,
  },

  {
    id: 'help',
    label: 'Help',
    route: '#/help',
    icon: 'help',
    kind: 'utility',
    // ENR-181 took "ask" back for Edward. Help is where Aster's own guides live
    // and where a request reaches a named office — a different promise, so it
    // stops being written in the assistant's words. ENR-182 built the page to
    // this sentence: guides, then a route to an office that can decide.
    lede: 'Aster’s guides, and a way to reach the office that owns a step.',
    hero: {
      kicker: 'Help',
      title: 'Let’s get you unstuck, Maya.',
      lede: 'Aster’s own guides, and a way to put a named office on a step that is blocked.',
    },
    appears: 'Aster’s guides, and any request you raise with an office, appear here.',
    produces: 'Raise one when a step is blocked and you need a person on it.',
    next: 'appointments',
    built: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    route: '#/profile',
    icon: 'profile',
    kind: 'profile',
    lede: 'The record Aster keeps about you.',
    hero: {
      kicker: 'Profile',
      title: 'This is what Aster knows about you, Maya.',
      lede: 'Some of it is yours to change. The rest belongs to an office, and this page says which one.',
    },
    appears: 'The details Aster holds about you appear here.',
    produces: 'Some you control; the rest an office changes for you.',
    next: 'my-enrollment',
    built: true,
  },
];

/**
 * The home. The Dashboard that used to hold this slot summarised sections the
 * student then had to open anyway; the Jam of 2026-08-20 removed it. My
 * Enrollment is the page that already answers "what now", so it is the landing.
 */
export const DEFAULT_ROUTE = '#/my-enrollment';

/**
 * The design system, rendered — `src/design-system/styleguide/Styleguide.jsx`.
 *
 * It is a route and not a destination: it has no place in a student's
 * navigation, no preview states, and no entry in `DESTINATIONS`. `isRouteHash`
 * already accepts it, so nothing else has to know about it — `App` checks the
 * hash before it looks a destination up.
 */
export const STYLEGUIDE_ROUTE = '#/styleguide';

/**
 * Onboarding — ENR-163. A route, and deliberately not a destination.
 *
 * It has no row in `NAV`, no entry in `DESTINATIONS` and no hero, because it is
 * not a section of the portal: it is what a newly admitted student walks
 * through once, before the portal exists for her. `App` checks the hash before
 * it looks a destination up, the same way it does for the styleguide — except
 * that onboarding replaces the chrome instead of rendering inside it, since a
 * sidebar is a list of ways out of a flow that is required to refuse them
 * (ENR-151 AC 1).
 *
 * The step is part of the route so a later one is *attemptable*: a refusal that
 * cannot be attempted is a refusal nobody can verify.
 */
export const ONBOARDING_ROUTE = '#/onboarding';

export function isOnboardingHash(hash) {
  if (typeof hash !== 'string') return false;
  return hash === ONBOARDING_ROUTE || hash.startsWith(`${ONBOARDING_ROUTE}/`);
}

/** The 1-based step in `#/onboarding/5`, or null for the bare route. */
export function onboardingStepFrom(hash) {
  if (!isOnboardingHash(hash)) return null;
  const rest = hash.slice(ONBOARDING_ROUTE.length).replace(/^\//, '');
  const step = Number(rest);
  return Number.isInteger(step) && step >= 1 ? step : null;
}

/**
 * The sidebar, in order: what I must do, what I sent and who I talk to, then the
 * rest of my life at Aster.
 *
 * Messages is gone. It was never a card: it arrived in the product base as a
 * decorative row and ENR-180 kept it because the topbar bell needed somewhere to
 * point. Its copy promised a channel the product decided not to have — ENR-161
 * AC5 and ENR-177 AC6 both hold "while no inbound channel exists" — and the
 * thread it would have shown is the one Help already owns (ENR-177 AC4). The
 * bell went with it: what changed since I was last here belongs to ENR-161, and
 * until that lands the sidebar counts are the honest version of it. Groups are labels, never destinations — the page a
 * student wanted is always a leaf, which is why My Financials holds an Overview
 * rather than being clickable itself (ENR-174 AC1).
 *
 * Academic is gone with My Progress: a heading holding one leaf costs a click
 * and buys nothing, so My Classrooms is a destination in its own right. This
 * diverges from ENR-174 AC1, which names both leaves — the divergence is the
 * Jam's, and it is recorded on the card.
 */
export const NAV = [
  { kind: 'link', id: 'my-enrollment' },
  { kind: 'link', id: 'my-documents' },
  { kind: 'link', id: 'appointments' },
  { kind: 'link', id: 'my-classrooms' },
  { kind: 'link', id: 'health' },
  {
    kind: 'group',
    id: 'financials',
    label: GROUPS.financials,
    items: ['financials-overview', 'financials-aid', 'financials-payments'],
  },
  { kind: 'group', id: 'campus', label: GROUPS.campus, items: ['events', 'clubs'] },
  // Last, because Housing belongs to the block about a life at Aster rather than
  // to the academic or the money block — and it is a link, not a leaf of the
  // group above it. ADR 0002.
  { kind: 'link', id: 'housing' },
];

/** Reachable from the foot of the sidebar, not from the section list. */
export const UTILITY_ID = 'help';

/** Reachable from the profile chip only, so the concept is never listed twice. */
export const PROFILE_ID = 'profile';

export function destinationById(id) {
  return DESTINATIONS.find((item) => item.id === id) ?? null;
}

/**
 * Only a hash that starts with `#/` is a route. `#privacy` in the footer is a
 * plain anchor and must not be read as a page that does not exist.
 */
export function isRouteHash(hash) {
  return typeof hash === 'string' && hash.startsWith('#/');
}

/** Reads a hash into a destination. Returns null for a route nobody owns. */
export function destinationByRoute(hash) {
  if (!hash || hash === '#' || hash === '#/') return destinationByRoute(DEFAULT_ROUTE);
  if (!isRouteHash(hash)) return null;
  const route = hash.split('?')[0].replace(/(.)\/$/, '$1');
  return DESTINATIONS.find((item) => item.route === route) ?? null;
}

/**
 * The band a destination opens with. A leaf inside a group inherits the group's
 * hero, so all three financials pages say the same thing about where you are;
 * a destination's own `hero` wins over it. Anything a section still has to say
 * dynamically — how many sessions are required today — is passed as an override
 * by the page and merged on top of this.
 *
 * The fallback is built from the fields every destination already carries, so a
 * new destination renders a correct hero before anyone writes copy for it.
 */
export function heroFor(item) {
  if (!item) return { kicker: 'Aster', title: 'That page doesn’t exist', motif: 'help' };

  const group = item.group ? GROUP_HEROES[item.group] : null;
  const own = item.hero ?? null;

  return {
    kicker: item.label,
    title: item.label,
    lede: item.lede,
    motif: item.icon,
    ...group,
    ...own,
  };
}

/** The leaves of a group that have a page behind them. */
export function groupLeaves(group) {
  return DESTINATIONS.filter((item) => item.group === group && item.built);
}
