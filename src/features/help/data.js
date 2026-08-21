/* ------------------------------------------------------------------ *
 * Help — ENR-182, behaviour from ENR-177.
 *
 * Four things live here: the offices a question can reach, the topics that
 * route to them, the guidance Aster publishes, and the requests this student
 * has raised.
 *
 * Two absences are deliberate and are the card's whole point.
 *
 * There is **no person on a request**. A message has a `from` of `student` or
 * `office` and there is no field for a name, an avatar or a role, so ENR-177
 * AC 3 — the state shown never exposes internal assignment — is a property of
 * the shape rather than something a component has to remember not to render.
 *
 * And there is **no second copy of a policy**. The guides Aster publishes are
 * read out of `GUIDANCE` in `data-edward.js`, which already held them for the
 * assistant. A policy with two wordings is a policy the product disagrees with
 * itself about; Help adds the office that publishes each one and three guides
 * of its own that no assistant answer needed.
 * ------------------------------------------------------------------ */

import { GUIDANCE } from '../edward/data.js';

/**
 * The offices. Every name here already exists elsewhere in the portal — four of
 * them as `task.office` in `data.js`, the Registrar as `requiredBy` in
 * `campus-data.js`. No sixth office is invented for this page: a support route
 * that names an office nobody else names is not an accountable route.
 */
export const offices = {
  admissions: {
    id: 'admissions',
    name: 'Admissions Office',
    decides: 'Your offer, your record, and the steps in your checklist.',
    hours: '9:00 AM–5:00 PM, Monday to Friday',
    location: 'Building C, ground floor',
    reply: '2 business days',
  },
  'financial-services': {
    id: 'financial-services',
    name: 'Financial Aid Office',
    decides: 'Your aid package, your bill, and every payment on it.',
    hours: '9:00 AM–4:00 PM, Monday to Friday',
    location: 'Building A, ground floor',
    reply: '3 business days',
  },
  housing: {
    id: 'housing',
    name: 'Housing Services',
    decides: 'Where you live, your room assignment, and your meal plan.',
    hours: '10:00 AM–4:00 PM, Monday to Thursday',
    location: 'Halloway House',
    reply: '2 business days',
  },
  health: {
    id: 'health',
    // ENR-209 AC 8 asks for the full institutional name, so it is the name
    // everywhere rather than a longer one Health wears and a shorter one the
    // rest of the portal wears.
    name: 'Student Health Services',
    decides: 'Immunization records, medical clearance, and health forms.',
    hours: '8:30 AM–4:30 PM, Monday to Friday',
    location: 'Building D, first floor',
    reply: '5 business days',
  },
  registrar: {
    id: 'registrar',
    name: 'Office of the Registrar',
    decides: 'Your program, approved credit, and your official academic record.',
    hours: '9:00 AM–5:00 PM, Monday to Friday',
    location: 'Whitfield Hall',
    reply: '3 business days',
  },
  // ENR-206. The sixth office, and the first that owns no document requirement
  // and decides nothing: it *receives* what the Health section routes to it and
  // makes contact. It is declared here rather than inside Health so a team at
  // Aster cannot end up with two names in two modules — but it is deliberately
  // absent from `OFFICE_ORDER` and from `helpTopics` below, so Help's rail and
  // its list of subjects are unchanged. Widening this office's reach is a
  // decision for a card, not a side effect of Health existing.
  accessibility: {
    id: 'accessibility',
    name: 'Accessibility Services',
    decides: 'Nothing. Accessibility Services arranges accommodations with you. They decide no part of your file.',
    hours: '9:00 AM–5:00 PM, Monday to Friday',
    location: 'Building C, second floor',
    reply: '3 business days',
  },
};

/** The order the rail lists them in: the two a first-year meets first, then the rest. */
export const OFFICE_ORDER = ['admissions', 'financial-services', 'housing', 'health', 'registrar'];

/**
 * The figure on the rail's anchor card. Most offices answer inside this; the
 * two that take longer say so themselves the moment their topic is picked, so
 * the page never quotes an average it cannot keep.
 */
export const TYPICAL_REPLY = '2 business days';

/**
 * What a question can be about, written as things that happen to a student
 * rather than as the queues they land in. Each one carries the office that
 * receives it — ENR-177 AC 7, decided in the data instead of in the copy — and,
 * where Aster has already published something, the guide that may answer it
 * before a person has to.
 */
export const helpTopics = [
  { id: 'money', label: 'Money, aid or a payment', office: 'financial-services', guide: 'aid-terms' },
  { id: 'documents', label: 'A document I sent or need to send', office: 'admissions', guide: 'verification' },
  { id: 'deadline', label: 'A deadline or a step I can’t finish', office: 'admissions', guide: 'deadlines' },
  { id: 'housing', label: 'Housing and where I’ll live', office: 'housing', guide: 'housing-answer' },
  { id: 'health', label: 'Health records and forms', office: 'health', guide: null },
  { id: 'program', label: 'My program, credit, or the catalog', office: 'registrar', guide: 'progress' },
  { id: 'other', label: 'Something else', office: 'admissions', guide: 'replies' },
];

/**
 * Aster's published guidance. The first four are the corpus Edward already
 * reads, given the office that publishes them; the last three are Help's own.
 *
 * `replies` is on this page because ENR-177 AC 6 has to be answerable, not only
 * obeyed: a student who wonders whether they can just reply to the email should
 * find Aster saying no, in Aster's own words.
 */
export const helpGuides = [
  { id: 'points', ...GUIDANCE.points, office: 'admissions', updated: '2026-08-04' },
  { id: 'aid-terms', ...GUIDANCE.aidTerms, office: 'financial-services', updated: '2026-07-28' },
  { id: 'verification', ...GUIDANCE.verificationPolicy, office: 'financial-services', updated: '2026-08-11' },
  { id: 'progress', ...GUIDANCE.progress, office: 'registrar', updated: '2026-06-30' },
  {
    id: 'replies',
    topic: 'How Aster replies to you',
    office: 'admissions',
    updated: '2026-08-05',
    body: [
      'Every answer to a request lands on this page, and stays here. That is the record. Nothing you are told about your enrollment lives only in an inbox.',
      'Aster does send email, but only to say that something has arrived here. Those messages come from an address that nobody reads, so replying to one reaches no person and starts nothing.',
    ],
  },
  {
    id: 'deadlines',
    topic: 'If you are going to miss a deadline',
    office: 'admissions',
    updated: '2026-07-19',
    body: [
      'Tell the office that owns the step before the date, not after. A step that is late is a conversation; a step that is late and silent is a decision somebody else has to make without you.',
      'Nothing is decided against you for asking. Deadlines move for documented reasons more often than students expect, and the office holding the step is the only one that can move it.',
    ],
  },
  {
    id: 'housing-answer',
    topic: 'Changing your housing answer',
    office: 'housing',
    updated: '2026-08-08',
    body: [
      'Your housing answer can be changed at any point before the housing deadline. Housing Services only uses it to open the right next steps for you, so changing it changes what your checklist asks of you.',
      'After the deadline it becomes a room assignment. You change a room assignment by request, not by editing an answer.',
    ],
  },
];

export function guideById(id) {
  return helpGuides.find((guide) => guide.id === id) ?? null;
}

export function topicById(id) {
  return helpTopics.find((topic) => topic.id === id) ?? null;
}

/* ------------------------------------------------------------------ *
 * The student's requests.
 *
 * A thread is one ordered list holding two kinds of thing: `message`, which
 * somebody wrote, and `event`, which happened to the request. Keeping them in
 * one list is what lets the drawer draw receipt, work and answer as a single
 * path — the student never has to reconcile a status field against a
 * conversation that disagrees with it.
 * ------------------------------------------------------------------ */

const transcript = {
  id: 'req-transcript',
  subject: 'My final transcript is not showing on my checklist',
  topic: 'documents',
  office: 'admissions',
  state: 'answered',
  opened: '2026-08-14',
  updated: '2026-08-16',
  unread: true,
  thread: [
    {
      id: 'transcript-1',
      kind: 'message',
      from: 'student',
      when: '2026-08-14',
      body: [
        'Aster received my final transcript on Aug 6, but my checklist still shows the step as waiting. I want to know whether something is missing before the deadline.',
      ],
    },
    { id: 'transcript-2', kind: 'event', when: '2026-08-14', text: 'Received by the Admissions Office' },
    {
      id: 'transcript-3',
      kind: 'message',
      from: 'office',
      when: '2026-08-16',
      body: [
        'Nothing is missing. Your transcript arrived on Aug 6 and it is with the review team; the checklist step clears itself once the check is recorded, which usually takes two to three business days from arrival.',
        'You do not need to send anything again. If the step is still open on Aug 21, reply here and we will look at it directly.',
      ],
    },
  ],
};

const depositSplit = {
  id: 'req-deposit-split',
  subject: 'Can I pay the enrollment deposit in two parts?',
  topic: 'money',
  office: 'financial-services',
  state: 'working',
  opened: '2026-08-18',
  updated: '2026-08-19',
  unread: false,
  thread: [
    {
      id: 'deposit-1',
      kind: 'message',
      from: 'student',
      when: '2026-08-18',
      body: [
        'I can pay half of the $500 deposit now and the rest at the start of October. Is that something Aster allows, or does it have to be one payment?',
      ],
    },
    { id: 'deposit-2', kind: 'event', when: '2026-08-18', text: 'Received by the Financial Aid Office' },
    { id: 'deposit-3', kind: 'event', when: '2026-08-19', text: 'The Financial Aid Office is working on this' },
  ],
};

/** The same request, one move further on: the office has asked her something back. */
const depositSplitAsked = {
  ...depositSplit,
  state: 'needs-you',
  updated: '2026-08-20',
  unread: true,
  thread: [
    ...depositSplit.thread,
    {
      id: 'deposit-4',
      kind: 'message',
      from: 'office',
      when: '2026-08-20',
      body: [
        'A split deposit is possible, and it is approved case by case rather than automatically. Before we can put it to the committee we need one thing from you: the date you expect the second payment, and whether it is tied to a specific source of funds.',
        'Reply here with that and the request keeps moving. Nothing is late while this is open.',
      ],
    },
  ],
};

const baseRequests = [transcript, depositSplit];

/**
 * The board this page opens on. `empty` is a student who has never raised
 * anything; `partial` means the list itself could not be read, which is not the
 * same as it being empty and must not be drawn as though it were.
 */
export function requestsFor(previewState) {
  if (previewState === 'empty') return [];
  if (previewState === 'needs-you') return [depositSplitAsked, transcript];
  return baseRequests;
}
