/**
 * What the Appointments page derives — ENR-183, and the changes of 2026-08-21.
 *
 * Nothing here formats a month or a weekday: `campus/logic.js` already owns that vocabulary and
 * this section borrows it, so a date cannot read one way on the campus board and another way here.
 * What is genuinely this section's is time-of-day: a published slot has a clock time, and a picker
 * has to group by part of the day and say which parts are empty — and, since 2026-08-21, the rule
 * that decides where the page's one primary action band sits (`bandFor`).
 */

import { weekdayDate } from '../campus/logic.js';

const DAY_MS = 86400000;

/** '10:30 AM' → 630. The only place a clock string is parsed. */
export function minutesOf(time) {
  const [clock, meridiem] = time.split(' ');
  const [hour, minute] = clock.split(':').map(Number);
  const base = hour % 12;
  return (meridiem === 'PM' ? base + 12 : base) * 60 + minute;
}

/**
 * The parts a picker is divided into. Morning and Afternoon are always shown, even when empty —
 * that is how the absence of a time gets stated instead of merely happening
 * ([Square](https://mobbin.com/screens/5c191789-20a8-4f82-8ee5-2f0be71714b4)). Evening appears only
 * when a team has actually published one, because no office here works evenings by default.
 */
const NOON = 12 * 60;
const EVENING = 17 * 60;

export function partOfDay(time) {
  const minutes = minutesOf(time);
  if (minutes < NOON) return 'Morning';
  return minutes < EVENING ? 'Afternoon' : 'Evening';
}

export function slotParts(day) {
  const slots = [...(day?.slots ?? [])].sort((a, b) => minutesOf(a.time) - minutesOf(b.time));
  const parts = [
    { part: 'Morning', slots: slots.filter((slot) => partOfDay(slot.time) === 'Morning') },
    { part: 'Afternoon', slots: slots.filter((slot) => partOfDay(slot.time) === 'Afternoon') },
  ];
  const evening = slots.filter((slot) => partOfDay(slot.time) === 'Evening');
  if (evening.length > 0) parts.push({ part: 'Evening', slots: evening });
  return parts;
}

/** The days a team has actually published. A day with nothing on it is not one of them. */
export function daysFor(published, typeId) {
  return (published[typeId] ?? []).filter((day) => day.slots.length > 0);
}

export function openTimes(published, typeId) {
  return daysFor(published, typeId).reduce((total, day) => total + day.slots.length, 0);
}

/** Per type: how many times are open and when the first one is. The total is what the copy says. */
export function availabilitySummary(published, types) {
  const perType = types.map((type) => ({
    type,
    count: openTimes(published, type.id),
    nextDate: daysFor(published, type.id)[0]?.date ?? null,
  }));
  return { perType, total: perType.reduce((sum, entry) => sum + entry.count, 0) };
}

/**
 * The list in the checklist's order — A9. A type whose category the checklist does not know is not
 * shown: the grouping belongs to the reference screen, and this one only reads it.
 */
export function topicsInCategoryOrder(types, categories) {
  return categories.flatMap((category) => types.filter((type) => type.category === category));
}

/** The office as it reads in full: "Academic Advising Office, Computer Science". */
export function teamName(type) {
  return type.department ? `${type.team}, ${type.department}` : type.team;
}

/**
 * An office named in running text takes its article — *the Financial Aid Office needs…* — and a
 * team that is not an "Office" (Student Health Services) takes none. `CONTEXT.md`, Office.
 */
export function articled(name, capital = false) {
  if (!/\bOffice\b/.test(name)) return name;
  return `${capital ? 'The' : 'the'} ${name}`;
}

function whenValue(appointment) {
  if (!appointment.date) return '9999';
  return `${appointment.date} ${String(minutesOf(appointment.time)).padStart(4, '0')}`;
}

/**
 * Two lists, and the rule that decides which one an appointment is in.
 *
 * `current` is what is still ahead: a confirmed conversation, a booking that failed — the failure
 * belongs where the student is looking, not filed away as history (ENR-178 AC 6) — and a time
 * request the team has not answered, which has no date and sorts after everything that has one.
 * `record` is everything that is over: conversations that happened, and anything cancelled,
 * whatever its date. A cancelled appointment never sits in `current` looking like a plan.
 */
export function splitAppointments(list, today) {
  const current = list
    .filter(
      (item) =>
        item.state === 'requested' || (item.date >= today && item.state !== 'cancelled'),
    )
    .sort((a, b) => whenValue(a).localeCompare(whenValue(b)));
  const record = list
    .filter((item) => !current.includes(item))
    .sort((a, b) => whenValue(b).localeCompare(whenValue(a)));
  return { current, record };
}

export function nextConfirmed(current) {
  return current.find((item) => item.state === 'confirmed') ?? null;
}

export function failedBookings(current) {
  return current.filter((item) => item.state === 'failed');
}

export function timeRequests(current) {
  return current.filter((item) => item.state === 'requested');
}

/**
 * Where the page's one primary action band sits — A6, in this order of precedence:
 *
 *   1. a booking never reached its team   → that item, `Try again`
 *   2. nothing booked, and times published → the first topic with times, `Choose a time`
 *   3. one team has no calendar while others do → that topic, `Ask for a time` — unless she has
 *      already asked it, which makes it the team's turn (the rail's card), not hers
 *   4. anything else                       → no band
 *
 * The rule is this screen's, not the checklist's: a band saying *book a conversation* to a student
 * who has two booked would be asking for a third. Case 3 points at the real blockage instead — the
 * team that has not opened a calendar — and is what makes the band fire in the ready state.
 * Published times that failed to load are not "no calendar", so in `partial` nothing fires.
 */
export function bandFor({ current, availability, timesFailed }) {
  const failed = failedBookings(current);
  if (failed.length > 0) return { kind: 'failed', appointmentId: failed[0].id };
  if (timesFailed) return null;

  const booked = current.some((item) => item.state === 'confirmed');
  const asked = new Set(timeRequests(current).map((item) => item.typeId));
  const withTimes = availability.perType.filter((entry) => entry.count > 0);
  // A team she has already asked is the team's turn, not hers: the band does not point at it,
  // the rail's waiting card does.
  const without = availability.perType.filter(
    (entry) => entry.count === 0 && !asked.has(entry.type.id),
  );

  if (!booked && withTimes.length > 0) return { kind: 'start', typeId: withTimes[0].type.id };
  if (withTimes.length > 0 && without.length > 0) {
    return { kind: 'closed', typeId: without[0].type.id };
  }
  return null;
}

/** 'Thu, Aug 27' inside a week, 'Aug 27' after. Short enough for a 21px figure on a 380px screen. */
export function shortWeekdayDate(iso, today) {
  const text = weekdayDate(iso, today);
  return text.includes(',') ? `${text.slice(0, 3)},${text.split(',')[1]}` : text;
}

/** 'Fri' — the day strip has room for three letters and nothing more. */
export function weekdayShort(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(year, month - 1, day).getDay()];
}

function dayDiff(iso, today) {
  const [ay, am, ad] = iso.split('-').map(Number);
  const [by, bm, bd] = today.split('-').map(Number);
  return Math.round((Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd)) / DAY_MS);
}

/** How far away it is, in the words a student would use. */
export function relativeDay(iso, today) {
  const days = dayDiff(iso, today);
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 1) return days < 14 ? `in ${days} days` : `in ${Math.round(days / 7)} weeks`;
  return `${Math.abs(days)} days ago`;
}

/**
 * What the row's badge says. A confirmed conversation whose date has passed is not still
 * "Confirmed" — it happened. That is derived here so no stored state can go stale. `requested` is
 * the fifth badge (A7): sent, and waiting on the team.
 */
export function stateOf(appointment, today) {
  if (appointment.state === 'failed') return { tone: 'failed', label: 'Not booked' };
  if (appointment.state === 'cancelled') return { tone: 'cancelled', label: 'Cancelled' };
  if (appointment.state === 'requested') return { tone: 'requested', label: 'Requested' };
  if (appointment.date < today) return { tone: 'done', label: 'Completed' };
  return { tone: 'confirmed', label: 'Confirmed' };
}

export function timeRange(appointment) {
  return appointment.end ? `${appointment.time}–${appointment.end}` : appointment.time;
}

/** Where the conversation happens, which the format decides and the type supplies. */
export function placeOf(type, format) {
  if (!type) return 'Aster campus';
  return format === 'video' ? 'Video call' : type.place;
}

/** The picker's note on the format of the chosen time: "In person, Building C, ground floor." */
export function formatNote(type, format) {
  if (format === 'video') return 'Video call.';
  return `In person, ${type.place}.`;
}

export function typeById(types, id) {
  return types.find((type) => type.id === id) ?? null;
}
