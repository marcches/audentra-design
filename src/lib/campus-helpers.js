const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DAY_MS = 86400000;

function toDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function dateTile(iso) {
  const date = toDate(iso);
  return {
    month: MONTHS[date.getMonth()].slice(0, 3).toUpperCase(),
    day: String(date.getDate()).padStart(2, '0'),
  };
}

export function longDate(iso) {
  const date = toDate(iso);
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

// "Thursday 3 September" — what a required row needs to say before the student
// can decide whether the day is free. The year is not in it: the date tile
// beside it carries the month, and a session on the board is always this year's.
export function weekdayDate(iso) {
  const date = toDate(iso);
  return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function shortDate(iso) {
  const date = toDate(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

// A past event leaves the browsable set without being deleted: the partition is derived from the
// date every time the page renders, and `campusEvents` is never mutated.
export function splitByTime(events, today) {
  return {
    upcoming: events.filter((event) => event.date >= today).sort(byDate),
    past: events.filter((event) => event.date < today).sort(byDateDescending),
  };
}

function byDate(a, b) {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
}

function byDateDescending(a, b) {
  return byDate(b, a);
}

export function groupLabel(iso, today) {
  const date = toDate(iso);
  const now = toDate(today);
  // A past event is grouped by the month it happened in. `This week` would be
  // true of last Tuesday and read as an invitation to something already over.
  if (iso < today) {
    return `${MONTHS[date.getMonth()]}${
      date.getFullYear() === now.getFullYear() ? '' : ` ${date.getFullYear()}`
    }`;
  }
  const endOfWeek = new Date(now.getTime() + ((7 - now.getDay()) % 7) * DAY_MS);
  if (date <= endOfWeek) return 'This week';
  if (date <= new Date(endOfWeek.getTime() + 7 * DAY_MS)) return 'Next week';
  return `${MONTHS[date.getMonth()]}${
    date.getFullYear() === now.getFullYear() ? '' : ` ${date.getFullYear()}`
  }`;
}

export function groupEvents(events, today) {
  const groups = [];
  events.forEach((event) => {
    const label = groupLabel(event.date, today);
    const current = groups[groups.length - 1];
    if (current && current.label === label) current.items.push(event);
    else groups.push({ label, items: [event] });
  });
  return groups;
}

export function matchedInterest(item, interests) {
  return interests.find((interest) => item.interests?.includes(interest)) ?? null;
}

export function categoriesOf(items) {
  return [...new Set(items.map((item) => item.category))].sort();
}

// What the row shows at its trailing edge, and what the drawer boxes under `How to register`.
export function registrationChip(event, past) {
  if (past) return 'Ended';
  if (event.required) return 'Required';
  return event.registration.label;
}

export function registrationHeading(event) {
  if (event.registration.kind === 'closed') return 'Registration is closed';
  if (event.registration.kind === 'tba') return 'Registration details are not published yet';
  return 'How to register';
}

export function registrationAction(event) {
  const { kind, contact } = event.registration;
  if (kind === 'external') return 'Open registration page';
  if (kind === 'email') return `Email ${contact}`;
  return null;
}
