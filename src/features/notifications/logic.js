/**
 * What changed since she was last here — ENR-161.
 *
 * Three things live here so no component has to know them:
 *
 *   the ranking     AC 4 gives three categories, and they are plainly not equal
 *                   in weight. The panel shows two groups — what needs her, and
 *                   what does not — because a taxonomy of three equal tabs makes
 *                   the reader do the sorting the product should have done.
 *
 *   the read store  AC 3 says the read state persists. It lives in
 *                   `localStorage`, read through the same try/catch fallback
 *                   `Sidebar.jsx` uses for group collapse, and the fallback is
 *                   deliberately **everything unread**: showing a student
 *                   something twice is recoverable, hiding it is not.
 *
 *   the count       `unreadCount` returns both a total and whether any of it
 *                   needs her, so the bell can pick its colour without the
 *                   topbar having to know what a category is. That is the whole
 *                   of the brief's "findable without being anxious" — crimson
 *                   when something needs her, ink when it is only news.
 */

import { PORTAL_TODAY } from '../enrollment/data.js';

const STORE = 'aster.notifications.read';

/** AC 4, closed set. Anything else is a bug and should read as needing her. */
export const CATEGORIES = ['action-required', 'action-completed', 'record-changed'];

export function needsAction(item) {
  return item.category !== 'action-completed' && item.category !== 'record-changed';
}

export function readIds() {
  try {
    const raw = window.localStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  try {
    window.localStorage.setItem(STORE, JSON.stringify([...new Set(ids)]));
  } catch {
    /* A student in a private window still gets a working panel. */
  }
}

export function markRead(ids, next) {
  const merged = [...ids, ...(Array.isArray(next) ? next : [next])];
  writeIds(merged);
  return [...new Set(merged)];
}

/** Every notification currently listed, so `Mark all read` cannot reach past it. */
export function markAllRead(ids, feed) {
  return markRead(ids, feed.map((item) => item.id));
}

export function isRead(ids, id) {
  return ids.includes(id);
}

/**
 * `{ total, needsAction }` — the bell reads both. `null` in, `null` out: when
 * counts are unavailable the bell renders no dot rather than a `0` that reads
 * as final, which is the rule ENR-180 already set for the nav badges.
 */
export function unreadCount(feed, ids) {
  if (!feed) return null;
  const unread = feed.filter((item) => !isRead(ids, item.id));
  return { total: unread.length, needsAction: unread.some(needsAction) };
}

/** The two groups the panel renders. A group with no items renders no heading. */
export function groupFeed(feed) {
  return [
    { id: 'needs-you', label: 'Needs you', items: feed.filter(needsAction) },
    { id: 'also-new', label: 'Also new', items: feed.filter((item) => !needsAction(item)) },
  ].filter((group) => group.items.length > 0);
}

const DAY = 24 * 60 * 60 * 1000;

/**
 * Read against `PORTAL_TODAY` like every other date in this portal, so the feed
 * cannot drift from the dates the sections show.
 */
export function relativeWhen(when, today = PORTAL_TODAY) {
  const days = Math.round((Date.parse(today) - Date.parse(when)) / DAY);
  if (!Number.isFinite(days)) return '';
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'Last week';
  const weeks = Math.floor(days / 7);
  return weeks < 5 ? `${weeks} weeks ago` : 'Over a month ago';
}
