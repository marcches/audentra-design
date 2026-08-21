/**
 * What a request is doing, said in the student's terms — ENR-182, ENR-177 AC 3.
 *
 * Every state here describes the **request**. None of them describes a person,
 * a queue or an inbox, and there is no state that could only be explained by
 * naming one. That is the whole constraint: a student watching their question
 * move should learn that it is moving, and nothing at all about who is moving
 * it.
 *
 * `line` takes the office because the office is the one internal fact that is
 * meant to be said out loud (AC 7). Everything else about the inside of Aster
 * stays inside it.
 */

import { offices } from './data.js';

export const REQUEST_STATES = {
  received: {
    label: 'Received',
    tone: 'neutral',
    line: (office) => `${office} has it. Nothing is needed from you.`,
  },
  working: {
    label: 'In progress',
    tone: 'progress',
    line: (office) => `${office} is working on it. The answer lands here.`,
  },
  'needs-you': {
    label: 'Needs you',
    tone: 'act',
    line: (office) => `${office} asked you something. Reply here to keep it moving.`,
  },
  answered: {
    label: 'Answered',
    tone: 'done',
    line: (office) => `${office} answered. Reply here if it is not settled.`,
  },
};

/**
 * There is deliberately no `failed` state in this table.
 *
 * A send that does not arrive creates nothing: the words are still in the form,
 * which is what the failure says, and a `Not sent` row in a list of *what Aster
 * has* would be a lie about where they are. The failure grammar this card needs
 * — a send that never landed must not resemble one that did — is served better
 * by the absence of a record than by a record of an absence.
 */

/** Still moving. An answered request is finished until she says otherwise. */
const OPEN = new Set(['received', 'working', 'needs-you']);

export function officeOf(request) {
  return offices[request.office] ?? offices.admissions;
}

export function stateOf(request) {
  return REQUEST_STATES[request.state] ?? REQUEST_STATES.received;
}

export function openRequests(requests) {
  return requests.filter((request) => OPEN.has(request.state));
}

/** The one that can reach the summary as an alert: it is the only state that asks her for anything. */
export function waitingOnYou(requests) {
  return requests.find((request) => request.state === 'needs-you') ?? null;
}

export function unreadCount(requests) {
  return requests.filter((request) => request.unread).length;
}

/** Newest movement first. What moved last is what she came back to read. */
export function sortRequests(requests) {
  return [...requests].sort((a, b) => (a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : 0));
}

const DAY_MS = 86400000;

function toDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * How long ago something moved, read against the portal's own today so this
 * page cannot disagree with the checklist about what day it is.
 */
export function sinceLabel(iso, today) {
  const days = Math.round((toDate(today) - toDate(iso)) / DAY_MS);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'last week';
  return `${Math.floor(days / 7)} weeks ago`;
}

/**
 * A sent request, the moment it is sent. It is `received` and it says so in the
 * thread, because ENR-177 AC 1 and AC 2 are one gesture rather than two
 * features: the receipt the student reads and the row they will come back to
 * are the same object.
 */
export function newRequest({ topic, subject, message, today }) {
  const office = offices[topic.office];
  return {
    id: `req-${topic.id}-${subject.length}-${message.length}`,
    subject,
    topic: topic.id,
    office: topic.office,
    state: 'received',
    opened: today,
    updated: today,
    unread: false,
    thread: [
      {
        id: 'sent-1',
        kind: 'message',
        from: 'student',
        when: today,
        body: message.split('\n').filter(Boolean),
      },
      { id: 'sent-2', kind: 'event', when: today, text: `Received by ${office.name}` },
    ],
  };
}

/**
 * Her reply, appended. An answered request reopens — ENR-177 AC 5 — and the
 * event says where it went: back to the office, never back to whoever handled
 * it, which is true and is not hers to be told.
 */
export function appendReply(request, text, today) {
  const office = offices[request.office];
  const reopening = request.state === 'answered';

  return {
    ...request,
    state: 'working',
    updated: today,
    unread: false,
    reopened: reopening,
    thread: [
      ...request.thread,
      {
        id: `${request.id}-reply-${request.thread.length}`,
        kind: 'message',
        from: 'student',
        when: today,
        body: text.split('\n').filter(Boolean),
      },
      {
        id: `${request.id}-event-${request.thread.length}`,
        kind: 'event',
        when: today,
        text: reopening
          ? `Reopened · back with ${office.name}`
          : `Your reply is with ${office.name}`,
      },
    ],
  };
}

/** Read once so the row, the drawer and the receipt cannot count differently. */
export function markRead(requests, id) {
  return requests.map((request) => (request.id === id ? { ...request, unread: false } : request));
}
