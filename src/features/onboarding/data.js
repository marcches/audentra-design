import { planOptions, residences, responseDeadline } from '../housing/data.js';

/**
 * Onboarding — ENR-163, behaviour from ENR-149 through ENR-154.
 *
 * The eight steps a newly admitted student walks through once, after accepting
 * the offer and before the portal exists for her. Three of the answers captured
 * here are already rendered elsewhere in the product, and this file is written
 * so they are the *same* answers rather than lookalikes:
 *
 *   step 4  →  `features/profile/data.js` renders the authorizations, and its
 *              comment already says "capture belongs to onboarding".
 *   step 5  →  `features/housing/data.js` carries `planSource: 'onboarding'`
 *              and a shortlist that "arrived from onboarding". The plans and
 *              the residences are imported from there, never re-typed.
 *   step 6  →  `features/health/data.js` returns `where: 'onboarding'` for the
 *              accommodation answer.
 *
 * `RECORD_CATEGORIES` moved here from profile for the same reason. They are, in
 * profile's own words, "the words a student consented in" — and consent happens
 * on step 4. The feature that owns a concept exports it and the others import,
 * which is the rule `enrollment/data.js` already follows when it reads
 * `responseDeadline` out of housing. Profile now re-exports from here.
 */

/** The day onboarding is read against. `PORTAL_TODAY` is Aug 20; she started earlier. */
export const ONBOARDING_TODAY = 'Aug 20';

export const advisor = {
  name: 'Priya Raman',
  initials: 'PR',
  office: 'Admissions',
  label: 'Stuck on something?',
  email: 'p.raman@aster.edu',
  phone: '+1 (617) 555-0180',
};

/**
 * The eight steps, in the order the institution published them — ENR-151 AC 2.
 * The interface reads this list and never decides an order of its own.
 *
 * `required: false` is the only thing that produces a skip control (ENR-150
 * AC 4), and `after` is the only thing that locks a step (ENR-151 AC 2). Both
 * are configuration here because both are configuration in the story.
 */
export const STEPS = [
  {
    id: 'details',
    name: 'Confirm your details',
    question: 'Is this you, Maya?',
    lede: 'Aster’s admissions file says this. Tell Aster what to call you. The Registrar keeps the rest.',
    required: true,
    minutes: 2,
  },
  {
    id: 'contact',
    name: 'How Aster reaches you',
    question: 'Where should Aster reach you?',
    lede: 'One address for anything urgent, and one place Aster writes to first.',
    required: true,
    minutes: 2,
  },
  {
    id: 'emergency',
    name: 'Emergency contact',
    question: 'Who should Aster call in an emergency?',
    lede: 'One person Aster can reach if something happens to you on campus. That is the only thing it does.',
    required: true,
    minutes: 2,
  },
  {
    id: 'permissions',
    name: 'Family permissions',
    question: 'Who can talk to Aster about you?',
    lede: 'Right now, that is just you. This is where you change it, or decide not to.',
    required: true,
    minutes: 4,
  },
  {
    id: 'housing',
    name: 'Where you will live',
    question: 'Where will you live?',
    lede: `Your answer opens your move-in time. You can change it until ${responseDeadline.full}.`,
    required: true,
    minutes: 3,
  },
  {
    id: 'health',
    name: 'Health and accessibility',
    question: 'Anything Aster should know before you arrive?',
    lede: 'One question, and “not right now” is a complete answer to it.',
    required: false,
    minutes: 2,
  },
  {
    id: 'photo',
    name: 'Your student photo',
    question: 'Want your campus card ready before you arrive?',
    lede: 'A photo now means your card is waiting for you at move-in instead of being made in a queue.',
    required: false,
    minutes: 1,
  },
  {
    id: 'orientation',
    name: 'Choose your orientation session',
    question: 'Which orientation will you come to?',
    lede: 'Two days, run twice. Pick the one that works. The seats are held as you choose.',
    required: true,
    minutes: 2,
    // ENR-151 AC 3. Residents and commuters are given different sessions, so
    // this genuinely cannot be answered before the plan is recorded. The reason
    // is true, which is the only kind of reason worth printing.
    after: 'housing',
    lockReason: 'Opens once your housing plan is recorded',
  },
];

export const TOTAL_STEPS = STEPS.length;

/**
 * Step 2's channel choice — ENR-179 AC 4. A channel is not a label on a record:
 * it decides what Aster *does*, so each option says what Aster will do. Chosen
 * here, changed afterwards on Profile, which re-exports this.
 */
export const channelOptions = [
  [
    'portal',
    'Portal',
    'Aster answers in the portal and emails you that something is waiting.',
  ],
  ['email', 'Email', 'Aster writes to your personal email first, and keeps a copy in the portal.'],
  ['text', 'Text message', 'Aster texts you first for anything time-critical. Needs a verified number.'],
];

/**
 * The seven categories a student can grant, and what each one actually exposes.
 * ENR-153 AC 2: a closed set, and a new one is a product decision.
 */
export const RECORD_CATEGORIES = [
  {
    id: 'enrollment',
    name: 'Enrollment status',
    sees: 'Whether you are enrolled, and the steps you still owe Aster.',
  },
  {
    id: 'academic',
    name: 'Academic record',
    sees: 'Your courses, your grades and your degree progress.',
  },
  {
    id: 'billing',
    name: 'Billing and payments',
    sees: 'What Aster charges you, what is paid, and what is due next.',
  },
  {
    id: 'aid',
    name: 'Financial aid',
    sees: 'The aid you were offered, what you accepted, and what it still needs.',
  },
  {
    id: 'housing',
    name: 'Housing and meals',
    sees: 'Where you live on campus and which meal plan you hold.',
  },
  {
    id: 'wellness',
    name: 'Health and wellness',
    sees: 'That you used a wellness service, never what was said in one.',
  },
  { id: 'conduct', name: 'Conduct', sees: 'Any conduct case Aster has opened about you.' },
];

export const PRONOUNS = [
  { id: 'she', label: 'She / her' },
  { id: 'he', label: 'He / him' },
  { id: 'they', label: 'They / them' },
  { id: 'unsaid', label: 'I’d rather not say' },
];

/** The default end date the drawer offers, and the date `initialGrants` already carries. */
export const DEFAULT_END = { value: '2027-05-31', label: 'May 31, 2027', note: 'End of the academic year' };

/**
 * Step 8. Two dates, run twice, and each one says who it is for — which is the
 * reason the step cannot open before the plan is known.
 */
export const ORIENTATION_SESSIONS = [
  {
    id: 'residents-aug',
    label: 'Move-in weekend',
    when: 'Saturday Aug 29 – Sunday Aug 30',
    where: 'Halloran Hall, then your residence',
    forPlans: ['on-campus'],
    hint: 'Starts the morning you move in. Your room key is handed over at the desk.',
  },
  {
    id: 'commuters-aug',
    label: 'Commuter day',
    when: 'Thursday, Aug 27, 9:00 AM–4:00 PM',
    where: 'Halloran Hall',
    forPlans: ['commuting', 'own-housing', 'undecided'],
    hint: 'One day, with parking held for you. Lunch is included.',
  },
  {
    id: 'late-aug',
    label: 'Late orientation',
    when: 'Monday, Aug 31, 9:00 AM–4:00 PM',
    where: 'Halloran Hall',
    forPlans: ['on-campus', 'commuting', 'own-housing', 'undecided'],
    hint: 'For anyone who can’t make the first two. Covers the same ground.',
  },
];

export const PHOTO_RULES = [
  'Face forward, with your whole face visible.',
  'A plain wall behind you, and nothing covering your head unless it is worn daily.',
  'Taken in the last six months. This is the photo on your card for four years.',
];

/** What the photo is used for, and the sentence that says what it is not used for. */
export const PHOTO_USE =
  'Your campus card, and the class list your instructors see. Nothing else, and never outside Aster.';

/** Housing's own, quoted rather than re-typed. Housing publishes them; step 5 reads them. */
export { planOptions, residences, responseDeadline };

/**
 * The person Aster already has on file for her, from the application. Step 3
 * confirms it rather than asking from nothing, and step 4 names her again —
 * because the sentence that separates an emergency contact from record access
 * is only convincing when it uses the name she just typed (ENR-152 AC 4).
 */
const EMERGENCY = {
  name: 'Renata Oliveira',
  relation: 'Mother',
  phone: '+55 11 98812-4460',
};

/** The record as the application left it: what step 1 and 2 open with. */
const APPLICATION = {
  legalName: 'Amelia Maya Johnson',
  birthDate: 'Mar 14, 2008',
  studentId: 'AST-2031-04417',
  preferredName: 'Maya',
  pronouns: 'she',
  email: 'maya.johnson@gmail.com',
  mobile: '+1 (617) 555-0142',
  address: '84 Fern Hollow Road, Newton, MA 02459',
  channel: 'email',
};

/** The authorization the `permissions` state opens with — the one Profile renders. */
const RENATA_GRANT = {
  id: 'grant-oliveira',
  person: {
    name: 'Renata Oliveira',
    initials: 'RO',
    relation: 'Mother',
    email: 'r.oliveira@outlook.com',
  },
  purpose: 'Help me with billing and financial aid while I am away.',
  granted: ['enrollment', 'billing', 'aid'],
  endsOn: DEFAULT_END.label,
};

const BLANK = {
  saved: [],
  skipped: [],
  grants: [],
  plan: null,
  shortlist: [],
  answer: null,
  photo: null,
  session: null,
  emergency: EMERGENCY,
  ...APPLICATION,
};

/**
 * What onboarding holds per preview state.
 *
 * `saved` and `skipped` are the server's word — the browser never adds to them
 * on its own (ENR-149 AC 1), which is why they arrive from here and not from
 * anything the page wrote. `unknown: true` is the one that matters most: the
 * published configuration arrived and her answers did not, so the interface may
 * not claim a single step is saved (ENR-149 Scenario 4).
 */
export function recordFor(previewState) {
  switch (previewState) {
    case 'empty':
      return { ...BLANK };

    case 'resume-skipped':
      return {
        ...BLANK,
        saved: ['details', 'contact', 'emergency', 'permissions', 'housing'],
        skipped: ['health'],
        savedOn: 'Aug 12',
        grants: [RENATA_GRANT],
        plan: 'commuting',
      };

    case 'onboarding-permissions':
      return {
        ...BLANK,
        saved: ['details', 'contact', 'emergency'],
        savedOn: 'Aug 12',
        grants: [RENATA_GRANT],
      };

    case 'onboarding-housing':
      return {
        ...BLANK,
        saved: ['details', 'contact', 'emergency', 'permissions'],
        savedOn: 'Aug 12',
        grants: [RENATA_GRANT],
        plan: 'on-campus',
        shortlist: ['alcott', 'brackenridge'],
      };

    case 'onboarding-complete':
      return {
        ...BLANK,
        saved: ['details', 'contact', 'emergency', 'permissions', 'housing', 'orientation'],
        skipped: ['health', 'photo'],
        savedOn: 'Aug 12',
        grants: [RENATA_GRANT],
        plan: 'on-campus',
        shortlist: ['alcott', 'brackenridge', 'coleridge'],
        session: 'residents-aug',
      };

    case 'partial':
      // The configuration loaded; the record did not. Nothing may be presented
      // as saved, and nothing may be saved on top of a state nobody could read.
      return { ...BLANK, unknown: true };

    default:
      // `ready`, and every state the frame owns. Two saved, the third in hand.
      return { ...BLANK, saved: ['details', 'contact'], savedOn: 'Aug 12' };
  }
}

/** The states this screen adds, offered on its own pill. */
export const ONBOARDING_PREVIEW_STATES = [
  ['ready', 'Ready', 'Two steps saved, the third in hand, the last one locked.'],
  ['empty', 'First visit', 'Nothing saved and nothing skipped, 0 of 8.'],
  [
    'resume-skipped',
    'Back after a skip',
    'Five saved, health skipped, and the flow resumes where it stopped.',
  ],
  [
    'onboarding-permissions',
    'Family permissions',
    'Step 4, with one person already authorized for three categories.',
  ],
  [
    'onboarding-housing',
    'Where you will live',
    'Step 5, living on campus, with a shortlist that is still partial.',
  ],
  ['onboarding-complete', 'All eight resolved', 'Six saved and two skipped, and the flow says so.'],
  ['save-fails', 'A save that fails', 'The step stays in progress and the count does not move.'],
  ['loading', 'Loading', 'Before the published steps arrive.'],
  ['partial', 'Answers unreadable', 'The eight steps loaded; what you already saved did not.'],
  ['error', 'Error', 'The published steps could not be loaded at all.'],
];
