import { CAMPUS_TODAY } from './data.js';

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

/**
 * Inside a week of today the weekday is worth saying; past that, and for anything
 * already gone, it is noise (UX writing §2.3). Every formatter below reads the
 * frozen portal date unless a caller has a better one.
 */
function withinWeek(iso, today) {
  const diff = Math.round((toDate(iso) - toDate(today)) / DAY_MS);
  return diff >= 0 && diff <= 7;
}

/** `Aug 27, 2026`, or `Thursday, Aug 27, 2026` when it is less than a week away. */
export function longDate(iso, today = CAMPUS_TODAY) {
  const date = toDate(iso);
  const day = `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  return withinWeek(iso, today) ? `${DAYS[date.getDay()]}, ${day}` : day;
}

// "Thursday, Aug 27" — what a required row needs to say before the student can
// decide whether the day is free. The year is not in it: the date tile beside it
// carries the month, and a session on the board is always this year's. Past a
// week out the weekday goes too, and the row says `Sep 15`.
export function weekdayDate(iso, today = CAMPUS_TODAY) {
  const date = toDate(iso);
  const day = `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
  return withinWeek(iso, today) ? `${DAYS[date.getDay()]}, ${day}` : day;
}

/** `Aug 27` — month first, always. */
export function shortDate(iso) {
  const date = toDate(iso);
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
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

/* ------------------------------------------------------------------ *
 * The review of 2026-08-21 — rows that act (C2, C4), the match label (C8.3), the door (§12)
 * ------------------------------------------------------------------ */

/**
 * The match label is suppressed where the club's own category is the interest that matched it —
 * "Matches Music" on a music club says nothing (C8.3) — and kept where the match is not obvious.
 */
export function matchLabel(item, matched) {
  return matched && matched !== item.category ? matched : null;
}

/**
 * What a row offers about registering (C2, C4): a control where there is something to do — a
 * booking that links out and says so, an email to the named host — and a label where there is
 * not: "No RSVP needed" stays a label, and so do "Full" and "Details coming". A past event says it
 * ended and offers nothing.
 */
export function rowRegistration(event, past) {
  if (past) return { label: 'Ended', control: null };
  const { kind, label, contact } = event.registration;
  if (kind === 'external') return { label: null, control: { act: 'external', label, icon: 'external' } };
  if (kind === 'email') {
    return { label: null, control: { act: 'email', label: 'Email the host', icon: 'mail', contact } };
  }
  return { label, control: null };
}

/** "the Aster Chamber Choir", "Aster Robotics" — the name as a sentence says it. */
export function orgInSentence(org) {
  return /(Club|Society|Choir|Network|Bank|Collective|Orchestra|Exchange|Circle|Radio)$/.test(org.name)
    ? `the ${org.name}`
    : org.name;
}

/** The question the door writes for Edward — Part A §12.4, the club's person named. */
export function contactQuestion(org) {
  return `How do I get in touch with ${org.contact.name} about ${orgInSentence(org)}?`;
}
