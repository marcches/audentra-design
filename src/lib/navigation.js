/**
 * Where the portal can go — the destination model, completed by ENR-180.
 *
 * Every destination is declared once. The navigation rows, the page head, the
 * section placeholder and the Dashboard shortcuts all read this file, so a
 * concept cannot end up with two names on two screens — ENR-174 AC4 as
 * structure rather than as discipline.
 *
 * Started by ENR-166, which declared the rows it builds. ENR-180 extends it
 * with the grouping ENR-174 AC1 requires, the copy each empty section needs and
 * the routing helpers. The flat `SIDEBAR_ROWS` ENR-167 shipped is gone: `NAV`
 * below is the shape of the navigation now.
 *
 * `appears` and `produces` are the two halves of the placeholder sentence: what
 * will be here, and what puts it here. The Dashboard shortcut card shows
 * `appears` alone, so the two surfaces cannot drift apart.
 *
 * `built` says a card owns that screen. Whether it renders is decided by the
 * page registry in `App.jsx` — a destination whose page has not landed yet
 * shows its placeholder, which is its honest state.
 */

export const GROUPS = {
  academic: 'Academic',
  financials: 'My Financials',
  campus: 'My Campus Life',
};

export const DESTINATIONS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '#/dashboard',
    icon: 'home',
    lede: 'Where everything stands today, and where to go next.',
    appears: 'A summary of your enrollment, your advisor and your momentum appears here.',
    produces: 'It fills in as you complete steps, so nothing here asks you to do the work twice.',
    next: 'my-enrollment',
    built: true,
  },
  {
    id: 'my-enrollment',
    label: 'My Enrollment',
    route: '#/my-enrollment',
    icon: 'check',
    badge: 'openSteps',
    lede: 'Everything Aster still needs from you, in the order that keeps you moving.',
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
    lede: 'Everything you have sent Aster, and everything Aster has sent you.',
    appears: 'Documents you upload and documents Aster sends you appear here.',
    produces: 'The first one arrives when you complete a step that asks for a file.',
    next: 'my-enrollment',
    built: false,
  },
  {
    id: 'appointments',
    label: 'Appointments',
    route: '#/appointments',
    icon: 'calendar',
    lede: 'Time booked with the people who can unblock a step.',
    appears: 'Appointments you book with Aster staff appear here.',
    produces: 'Booking opens as each team publishes its availability.',
    next: 'help',
    built: false,
  },
  {
    id: 'messages',
    label: 'Messages',
    route: '#/messages',
    icon: 'message',
    badge: 'unread',
    lede: 'Everything your enrollment team has written to you.',
    appears: 'Messages from your enrollment team appear here.',
    produces: 'You will see one when someone at Aster writes to you.',
    next: 'help',
    built: false,
  },

  {
    id: 'my-classrooms',
    label: 'My Classrooms',
    route: '#/my-classrooms',
    icon: 'book',
    group: 'academic',
    lede: 'What your degree asks of you, and the courses that satisfy each requirement.',
    appears: 'Your degree requirements appear here, with the courses that satisfy each one.',
    produces: 'They arrive when Aster assigns your academic program.',
    next: 'my-enrollment',
    built: true,
  },
  {
    id: 'my-progress',
    label: 'My Progress',
    route: '#/my-progress',
    icon: 'progress',
    group: 'academic',
    lede: 'How far your degree has come, and what is still ahead.',
    appears:
      'Your degree progress — credits earned, requirements met, and what is left — appears here.',
    produces: 'It starts once your program is assigned and your first credits are recorded.',
    next: 'my-classrooms',
    built: false,
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
    id: 'help',
    label: 'Help',
    route: '#/help',
    icon: 'help',
    kind: 'utility',
    lede: 'Ask Aster anything that is blocking a step.',
    appears: 'Answers from Aster, and the questions you have asked, appear here.',
    produces: 'Ask your advisor anything that is blocking a step.',
    next: 'appointments',
    built: false,
  },
  {
    id: 'profile',
    label: 'Profile',
    route: '#/profile',
    icon: 'profile',
    kind: 'profile',
    lede: 'The record Aster keeps about you.',
    appears: 'The details Aster holds about you appear here.',
    produces: 'Some you control; the rest an office changes for you.',
    next: 'my-enrollment',
    built: false,
  },
];

/** The home ENR-180 adds, because thirteen destinations need a place that explains them. */
export const DEFAULT_ROUTE = '#/dashboard';

/**
 * The sidebar, in order: what I must do, what I sent and who I talk to, then the
 * rest of my life at Aster. Groups are labels, never destinations — the page a
 * student wanted is always a leaf, which is why My Financials holds an Overview
 * rather than being clickable itself (ENR-174 AC1).
 */
export const NAV = [
  { kind: 'link', id: 'dashboard' },
  { kind: 'link', id: 'my-enrollment' },
  { kind: 'link', id: 'my-documents' },
  { kind: 'link', id: 'appointments' },
  { kind: 'link', id: 'messages' },
  { kind: 'group', id: 'academic', label: GROUPS.academic, items: ['my-classrooms', 'my-progress'] },
  {
    kind: 'group',
    id: 'financials',
    label: GROUPS.financials,
    items: ['financials-overview', 'financials-aid', 'financials-payments'],
  },
  { kind: 'group', id: 'campus', label: GROUPS.campus, items: ['events', 'clubs'] },
];

/** Reachable from the foot of the sidebar, not from the section list. */
export const UTILITY_ID = 'help';

/** Reachable from the profile chip only, so the concept is never listed twice. */
export const PROFILE_ID = 'profile';

/** The Dashboard's shortcut grid: everything except the home it sits on. */
export const SHORTCUTS = DESTINATIONS.filter((item) => item.id !== 'dashboard');

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

/** The label a page shows above its title: the group it belongs to. */
export function groupLabel(item) {
  return item?.group ? GROUPS[item.group] : 'Aster';
}

/** The leaves of a group that have a page behind them. */
export function groupLeaves(group) {
  return DESTINATIONS.filter((item) => item.group === group && item.built);
}
