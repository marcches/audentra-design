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
    decides: 'Your aid package, verification, and your federal loan paperwork.',
    hours: '9:00 AM–4:00 PM, Monday to Friday',
    location: 'Building A, ground floor',
    reply: '3 business days',
  },
  bursar: {
    id: 'bursar',
    name: 'Office of the Bursar',
    decides: 'Your bill, its due dates, the payment plan, refunds, and the 1098-T.',
    hours: '9:00 AM–4:00 PM, Monday to Friday',
    location: 'Building A, first floor',
    reply: '2 business days',
  },
  housing: {
    id: 'housing',
    name: 'Residential Life',
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
export const OFFICE_ORDER = ['admissions', 'financial-services', 'bursar', 'housing', 'health', 'registrar'];

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
  { id: 'money', label: 'Financial aid or verification', office: 'financial-services', guide: 'aid-terms' },
  { id: 'bill', label: 'My bill or a payment', office: 'bursar', guide: null },
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
  { id: 'points', ...GUIDANCE.points, office: 'admissions', updated: '2026-05-04' },
  { id: 'aid-terms', ...GUIDANCE.aidTerms, office: 'financial-services', updated: '2026-04-28' },
  { id: 'verification', ...GUIDANCE.verificationPolicy, office: 'financial-services', updated: '2026-06-01' },
  { id: 'progress', ...GUIDANCE.progress, office: 'registrar', updated: '2026-04-30' },
  {
    id: 'replies',
    topic: 'How Aster replies to you',
    office: 'admissions',
    updated: '2026-05-05',
    body: [
      'Every answer to a request lands on this page, and stays here. That is the record. Nothing you are told about your enrollment lives only in an inbox.',
      'Aster does send email, but only to say that something has arrived here. Those messages come from an address that nobody reads, so replying to one reaches no person and starts nothing.',
    ],
  },
  {
    id: 'deadlines',
    topic: 'If you are going to miss a deadline',
    office: 'admissions',
    updated: '2026-05-19',
    body: [
      'Tell the office that owns the step before the date, not after. A step that is late is a conversation; a step that is late and silent is a decision somebody else has to make without you.',
      'Nothing is decided against you for asking. Deadlines move for documented reasons more often than students expect, and the office holding the step is the only one that can move it.',
    ],
  },
  {
    id: 'housing-answer',
    topic: 'Changing your housing answer',
    office: 'housing',
    updated: '2026-06-08',
    body: [
      'Your housing answer can be changed at any point before the housing deadline. Residential Life only uses it to open the right next steps for you, so changing it changes what your checklist asks of you.',
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
  opened: '2026-06-12',
  updated: '2026-06-15',
  unread: true,
  thread: [
    {
      id: 'transcript-1',
      kind: 'message',
      from: 'student',
      when: '2026-06-12',
      body: [
        'Aster received my final transcript on Jun 12, but my checklist still shows the step as waiting. I want to know whether something is missing before the deadline.',
      ],
    },
    { id: 'transcript-2', kind: 'event', when: '2026-06-12', text: 'Received by the Admissions Office' },
    {
      id: 'transcript-3',
      kind: 'message',
      from: 'office',
      when: '2026-06-15',
      body: [
        'Nothing is missing. Your transcript arrived on Jun 12 and it is with the review team; the checklist step clears itself once the check is recorded, which usually takes two to three business days from arrival.',
        'You do not need to send anything again. If the step is still open on Jun 19, reply here and we will look at it directly.',
      ],
    },
  ],
};

const billPayer = {
  id: 'req-bill-payer',
  subject: 'Can my mother pay my fall bill directly?',
  topic: 'bill',
  office: 'bursar',
  state: 'working',
  opened: '2026-06-11',
  updated: '2026-06-12',
  unread: false,
  thread: [
    {
      id: 'payer-1',
      kind: 'message',
      from: 'student',
      when: '2026-06-11',
      body: [
        'My mother will be paying most of my fall bill. Can she pay Aster directly and see the bill herself, or does everything have to go through me?',
      ],
    },
    { id: 'payer-2', kind: 'event', when: '2026-06-11', text: 'Received by the Office of the Bursar' },
    { id: 'payer-3', kind: 'event', when: '2026-06-12', text: 'The Office of the Bursar is working on this' },
  ],
};

/** The same request, one move further on: the office has asked her something back. */
const billPayerAsked = {
  ...billPayer,
  state: 'needs-you',
  updated: '2026-06-15',
  unread: true,
  thread: [
    ...billPayer.thread,
    {
      id: 'payer-4',
      kind: 'message',
      from: 'office',
      when: '2026-06-15',
      body: [
        'Yes. You can name her as an authorized payer: she gets her own sign-in to the bill, can pay it directly, and sees nothing else unless you release it. That is your call under FERPA, not ours. Before we set it up we need one thing from you: the email address she wants to use.',
        'Reply here with that and the request keeps moving. Nothing is late while this is open.',
      ],
    },
  ],
};

const baseRequests = [transcript, billPayer];

/**
 * The board this page opens on. `empty` is a student who has never raised
 * anything; `partial` means the list itself could not be read, which is not the
 * same as it being empty and must not be drawn as though it were.
 */
export function requestsFor(previewState) {
  if (previewState === 'empty') return [];
  if (previewState === 'needs-you') return [billPayerAsked, transcript];
  return baseRequests;
}
