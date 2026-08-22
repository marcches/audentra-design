/* ------------------------------------------------------------------ *
 * Edward — ENR-181
 *
 * The copy Edward owns, and nothing else. Every figure Edward says out loud
 * comes from `src/data.js` through `src/lib/edward.js`; this file holds the
 * words around them, the guidance corpus that is Aster's rather than the
 * student's, and the conversations that already existed before this control
 * did (ENR-175 Scenario 3 needs something to browse).
 *
 * Two things are deliberately absent: any second student, and any figure
 * written twice. See the note at the top of `src/lib/edward.js`.
 * ------------------------------------------------------------------ */

export const EDWARD = {
  name: 'Edward',
  mark: 'E',
  role: 'Aster’s AI assistant',
};

/**
 * Pinned under the composer in every form, including the phone sheet — ENR-176
 * AC 6. It is one line because it has to survive a 380px-wide surface without
 * becoming the loudest thing in it.
 */
export const STANDING_CAUTION =
  'Edward can be wrong. Check anything about your record, aid or payments against your official record before you act on it.';

export const VOICE_NOTE = 'Prototype: voice is simulated here. Nothing is recorded or spoken.';

export const GREETING = {
  title: 'Hi Maya. Ask me about your enrollment.',
  body: 'I can read your record and what Aster has published. I can point you to the right page, but I never change anything for you.',
};

/** Shown once under the greeting, so AC 2 is a promise on screen, not only in code. */
export const BOUNDARY_NOTE = 'Edward can only see your record.';

export const EMPTY_HISTORY = {
  title: 'No conversations yet',
  body: 'Anything you ask Edward is kept here, so you can come back to an answer without asking again.',
};

/**
 * Aster's published guidance. Not the student's record — which is why these
 * still answer when the record is unreachable (`partial`). Each one names the
 * published thing it comes from.
 */
export const GUIDANCE = {
  points: {
    topic: 'Momentum points',
    body: [
      'Every step carries a reward that Aster sets, and it usually drops by one point a day until you finish it.',
      'Points are a nudge, not a judgement: your deadline never moves because of them, and they never affect an admission decision.',
    ],
  },
  aidTerms: {
    topic: 'Grants and loans',
    body: [
      'A grant is money you keep. The Aster Grant and the Federal Pell Grant are both grants.',
      'A loan is money you repay after you leave school. Subsidized means the government covers the interest while you are enrolled at least half time.',
    ],
  },
  verificationPolicy: {
    topic: 'Income verification',
    body: [
      'Verification is a federal check. The Financial Aid Office compares the income you reported against your tax return or a signed statement of non-filing.',
      'It usually takes three to five business days once every page is uploaded. A loan cannot be finalized while it is open.',
    ],
  },
  progress: {
    topic: 'Academic progress',
    body: [
      'At the end of each term Aster checks three things to keep your federal aid: your grade average, the share of credits you finish, and how many you have attempted overall.',
      'The check happens after grades are final, never mid-term, and a decision always comes to you from Aster directly.',
    ],
  },
  privacy: {
    topic: 'What Edward can see',
    body: [
      'I can read your own record and the guidance Aster publishes. I cannot see another student’s record, and there is no way for me to ask for one.',
      'I also never change anything: no payment, no upload, no booking. When something needs doing, I send you to the page that does it.',
    ],
  },
};

/**
 * One or two per destination, so the first thing Edward offers is about the
 * thing the student is looking at. Keyed to `id` in `src/lib/navigation.js`, so
 * a page that loses its entry loses its questions with it.
 */
export const PAGE_QUESTIONS = {
  'my-enrollment': [
    { text: 'What should I do next?', intent: 'outstanding' },
    { text: 'What is due soonest?', intent: 'next-deadline' },
    { text: 'How do momentum points work?', intent: 'points' },
  ],
  appointments: [{ text: 'Who should I talk to about a blocked step?', intent: 'advisor' }],
  messages: [{ text: 'Who should I talk to about a blocked step?', intent: 'advisor' }],
  'my-classrooms': [
    { text: 'What does my degree ask of me?', intent: 'program' },
    { text: 'How does Aster check my academic progress?', intent: 'progress' },
  ],
  'financials-overview': [
    { text: 'What will I actually owe?', intent: 'balance' },
    { text: 'What is paying for my year?', intent: 'aid-sources' },
  ],
  'financials-aid': [
    { text: 'Why is my federal loan still pending?', intent: 'loan-pending' },
    { text: 'What is the difference between a grant and a loan?', intent: 'aid-terms' },
  ],
  'financials-payments': [
    { text: 'When is my next payment due?', intent: 'next-payment' },
    { text: 'Has my enrollment deposit been paid?', intent: 'deposit' },
  ],
  events: [{ text: 'Which campus events am I required to attend?', intent: 'events' }],
  clubs: [{ text: 'Which campus events am I required to attend?', intent: 'events' }],
  help: [{ text: 'Who should I talk to about a blocked step?', intent: 'advisor' }],
  profile: [
    { text: 'Which documents does Aster still need from me?', intent: 'documents' },
    { text: 'What can you see about me?', intent: 'privacy' },
  ],
};

/**
 * Conversations from before this control existed. ENR-175 Scenario 3 asks that
 * history survive the move, and a history you cannot see has not survived
 * anything. Answers here are frozen text: they were true when they were given.
 */
export const seededConversations = [
  {
    id: 'seed-transcript',
    title: 'When will my transcript be checked?',
    when: 'Jun 13',
    messages: [
      {
        id: 'seed-transcript-q',
        role: 'student',
        text: 'When will my transcript be checked?',
        context: 'My Enrollment',
      },
      {
        id: 'seed-transcript-a',
        role: 'edward',
        body: [
          'Aster received your final transcript on Jun 12 and it is with the review team now. Reviews usually take two to three business days.',
          'Nothing is needed from you while it is open. The step moves on its own once the check is recorded.',
        ],
        source: { basis: 'record', label: 'My Enrollment', destination: 'my-enrollment' },
      },
    ],
  },
  {
    id: 'seed-housing',
    title: 'Can I change my housing answer later?',
    when: 'Jun 9',
    messages: [
      {
        id: 'seed-housing-q',
        role: 'student',
        text: 'Can I change my housing answer later?',
        context: 'My Enrollment',
      },
      {
        id: 'seed-housing-a',
        role: 'edward',
        body: [
          'Yes. Your housing answer can be changed any time before the housing deadline. Residential Life only uses it to open the right next steps for you.',
        ],
        source: { basis: 'guidance', label: 'Residential Life', destination: null },
      },
    ],
  },
  {
    id: 'seed-roommate',
    title: 'Has my friend Priya accepted her offer?',
    when: 'Jun 8',
    messages: [
      {
        id: 'seed-roommate-q',
        role: 'student',
        text: 'Has my friend Priya accepted her offer?',
        context: 'My Enrollment',
      },
      {
        id: 'seed-roommate-a',
        role: 'edward',
        kind: 'none',
        body: [
          'I don’t have an answer for that. I can only read your own record, and another student’s record is not something I can reach.',
        ],
        person: 'enrollment',
      },
    ],
  },
];
