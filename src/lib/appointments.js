/**
 * What the Appointments page derives — ENR-183.
 *
 * Nothing here formats a month or a weekday: `campus-helpers.js` already owns that vocabulary and
 * this section borrows it, so a date cannot read one way on the campus board and another way here.
 * What is genuinely this section's is time-of-day: a published slot has a clock time, and a picker
 * has to group by part of the day and say which parts are empty.
 */

import { weekdayDate } from './campus-helpers.js';

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

/** The rail's figure: how many times are open, and where they are. */
export function availabilitySummary(published, types) {
  const perType = types.map((type) => ({
    type,
    count: openTimes(published, type.id),
    nextDate: daysFor(published, type.id)[0]?.date ?? null,
  }));
  return { perType, total: perType.reduce((sum, entry) => sum + entry.count, 0) };
}

function whenValue(appointment) {
  return `${appointment.date} ${String(minutesOf(appointment.time)).padStart(4, '0')}`;
}

/**
 * Two lists, and the rule that decides which one an appointment is in.
 *
 * `current` is what is still ahead: a confirmed conversation, and a booking that failed — the
 * failure belongs where the student is looking, not filed away as history (ENR-178 AC 6).
 * `record` is everything that is over: conversations that happened, and anything cancelled,
 * whatever its date. A cancelled appointment never sits in `current` looking like a plan.
 */
export function splitAppointments(list, today) {
  const current = list
    .filter((item) => item.date >= today && item.state !== 'cancelled')
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

/** 'Thu 27 August'. Short enough for a 21px figure on a 380px screen. */
export function shortWeekdayDate(iso) {
  const [weekday, ...rest] = weekdayDate(iso).split(' ');
  return `${weekday.slice(0, 3)} ${rest.join(' ')}`;
}

/** 'Fri' — the day strip has room for three letters and nothing more. */
export function weekdayShort(iso) {
  return shortWeekdayDate(iso).split(' ')[0];
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
 * What the row's chip says. A confirmed conversation whose date has passed is not still
 * "Confirmed" — it happened. That is derived here so no stored state can go stale.
 */
export function stateOf(appointment, today) {
  if (appointment.state === 'failed') return { tone: 'failed', label: 'Not booked' };
  if (appointment.state === 'cancelled') return { tone: 'cancelled', label: 'Cancelled' };
  if (appointment.date < today) return { tone: 'done', label: 'Happened' };
  return { tone: 'confirmed', label: 'Confirmed' };
}

export function timeRange(appointment) {
  return appointment.end ? `${appointment.time} – ${appointment.end}` : appointment.time;
}

/** Where the conversation happens, which the format decides and the type supplies. */
export function placeOf(type, format) {
  if (!type) return 'Aster campus';
  return format === 'video' ? 'Video call' : type.place;
}

export function typeById(types, id) {
  return types.find((type) => type.id === id) ?? null;
}
