import { responseDeadline } from '../housing/data.js';
import { rewards } from '../rewards/data.js';

export const TOTAL_STEPS = 14;

/** Every date in the portal is read against this day. Matches `CAMPUS_TODAY` in campus-data.js. */
export const PORTAL_TODAY = '2026-08-20';

/** A deadline this many days out or closer is escalated on screen. ENR-160 AC 6. */
export const ESCALATION_WINDOW = 14;

/**
 * The checklist. No task carries a points figure any more — ENR-162 AC 3 asks
 * for point values to come from the published configuration and never to be
 * hard coded, so `rewards-data.js` holds them and `withValues` reads them in.
 * A task the configuration says nothing about is worth nothing and says so.
 */
const TASKS = [
  {
    id: 'deposit',
    category: 'Your offer',
    title: 'Lock in your place',
    description:
      'Pay your $500 enrollment deposit to confirm you’re joining Aster’s incoming class.',
    due: 'Nov 16',
    daysLeft: 88,
    minutes: 4,
    action: 'Pay deposit',
    kind: 'external',
    priority: 'critical',
    unlocks: 3,
    office: 'Student Financial Services',
    why: 'This confirms your enrollment and opens housing, advising, and orientation.',
    destination: {
      // Aster's own site carries Aster's mark; a third party keeps a monogram.
      mark: 'aster',
      name: 'Aster secure payment portal',
      url: 'payments.aster.edu',
      note: 'You’ll finish payment on Aster’s website. When it’s received, this checklist will update automatically, usually within a minute.',
      cta: 'Open Aster payment page',
      prototypeNote: 'Prototype: this button simulates Aster confirming payment.',
    },
    steps: [
      'Continue to Aster’s secure payment page.',
      'Pay by card or bank transfer.',
      'Come back any time. Aster marks this complete automatically.',
    ],
  },
  {
    id: 'income-verification',
    category: 'Money and aid',
    title: 'Verify your household income',
    description:
      'Student Financial Services needs to confirm the income you reported. Your federal loan stays pending until they do.',
    due: 'Sep 2',
    daysLeft: 13,
    minutes: 6,
    action: 'Upload documents',
    // The verb the financials alert uses for the same step (UX writing §2.4).
    shortAction: 'Verify income',
    kind: 'upload',
    priority: 'critical',
    unlocks: 1,
    financial: true,
    office: 'Student Financial Services',
    consequence:
      'Verification is the check that your reported income matches your tax records. Your federal loan stays pending until it’s done.',
    why: 'Your loan cannot be finalized while verification is open, so its amount stays off your balance until this clears.',
    upload: {
      prompt: 'Choose your income documents',
      hint: 'PDF, JPG, or PNG · Up to 10 MB',
      fileName: 'household_income_2025.pdf',
      fileSize: '2.4 MB',
      privacy: 'Encrypted and shared only with authorized Student Financial Services staff.',
    },
    steps: [
      'Gather last year’s tax return, or a signed statement of non-filing.',
      'Upload every page, including schedules.',
      'Financial Services reviews it in 3–5 business days and updates your package.',
    ],
  },
  {
    id: 'loan-agreement',
    category: 'Money and aid',
    title: 'Sign your federal loan agreement',
    description:
      'Sign the Master Promissory Note, the federal form where you promise to repay the loan. Aster can’t release your money without it.',
    due: 'Sep 30',
    daysLeft: 41,
    minutes: 8,
    action: 'Sign agreement',
    kind: 'external',
    priority: 'soon',
    financial: true,
    office: 'Student Financial Services',
    consequence: 'Aster cannot release your loan money without a signed agreement.',
    why: 'The agreement is a federal requirement. Signing it early means your loan is ready the moment verification clears.',
    destination: {
      mark: 'F',
      name: 'Federal Student Aid',
      url: 'studentaid.gov',
      note: 'You’ll sign on the federal student aid website using your FSA ID. When it’s signed, this checklist will update automatically, usually within a day.',
      cta: 'Open Federal Student Aid',
      prototypeNote: 'Prototype: this button simulates the federal site confirming your signature.',
    },
    steps: [
      'Sign in with your FSA ID.',
      'Read the agreement and sign it electronically.',
      'Come back any time. Aster marks this complete automatically.',
    ],
  },
  {
    id: 'profile',
    category: 'About you',
    title: 'Finish your setup',
    description:
      'Add the contact details you didn’t have during setup. You can change them any time.',
    due: 'Nov 23',
    daysLeft: 95,
    minutes: 2,
    action: 'Add details',
    kind: 'profile',
    priority: 'soon',
    office: 'Admissions Office',
    why: 'Aster needs a reliable way to reach you with time-sensitive enrollment updates.',
    steps: [
      'Confirm your mobile number.',
      'Add an emergency contact.',
      'Review your preferred name and mailing address.',
    ],
  },
  {
    id: 'health',
    category: 'Health and wellness',
    title: 'Send your immunization record',
    description:
      'Aster University Health Services needs your immunization record. You can’t register for classes until they have it.',
    // Before class registration opens on Sep 1: the record gates it, so a
    // deadline after the gate was the portal contradicting itself (UX writing 6.1).
    due: 'Aug 28',
    dueFull: 'Aug 28, 2026',
    daysLeft: 8,
    minutes: 5,
    action: 'Send record',
    kind: 'upload',
    // ENR-206 AC 4 of ENR-205. The record used to be uploaded inside this
    // drawer, which made three doors for one file once My Documents and Health
    // both existed. The step now routes to the section that owns the door, and
    // the `upload` panel it used to carry is gone rather than left disabled — a
    // second field for the same record is a second place a send can fail.
    section: '#/health',
    sectionLine:
      'This one is sent from your Health section, where the record’s review state lives.',
    // ENR-207 moved this sentence out of the drawer too, so a second step can
    // route to a second section without the foot still talking about Health.
    sectionFoot: 'Sending it there ticks this step off and opens class registration.',
    priority: 'soon',
    office: 'Aster University Health Services',
    why: 'Submitting early leaves time to resolve a missing dose or incomplete record before you register for classes.',
    steps: [
      'Ask your doctor for a current immunization record.',
      'Send it from your Health section, up to eight photos or scans.',
      'Health Services decides within 5 business days.',
    ],
  },
  {
    id: 'housing',
    category: 'Campus life',
    title: 'Choose your housing plan',
    description:
      'Tell Aster whether you’ll live on campus, commute, arrange your own housing, or want help deciding.',
    // ENR-207 — one date, owned by the section that is about it. This used to be
    // a literal here that happened to agree with the move-in step below.
    due: responseDeadline.label,
    daysLeft: responseDeadline.daysLeft,
    minutes: 3,
    action: 'Choose housing plan',
    kind: 'form',
    // ENR-207. The plan used to be answered inside the drawer — this was the
    // file's only `kind: 'form'`, three radios and a save. The question now has
    // a section of its own, so the step routes there and the radios are gone
    // rather than left in place: two doors to one answer is two records of it.
    section: '#/housing',
    sectionLine:
      'This one is answered in your Housing section, where you can also read the residences Housing Services publishes and rank the ones you would like.',
    sectionFoot: 'Answering there ticks this step off and unlocks your move-in time.',
    priority: 'normal',
    unlocks: 1,
    office: 'Housing Services',
    why: 'Your answer opens the right housing or commuter next steps.',
    steps: [
      'Choose the option that best matches your current plan.',
      'If you’re unsure, select ‘Help me decide.’',
      'You can change your answer before the housing deadline.',
    ],
  },
];

function withValues(task) {
  const value = rewards.values[task.id];
  return { ...task, points: value?.points ?? 0, tomorrow: value?.tomorrow ?? 0 };
}

export const initialTasks = TASKS.map(withValues);

export const lockedTasks = [
  {
    title: 'Choose your move-in time',
    description: 'Your arrival window will appear after your housing plan is confirmed.',
    prerequisite: 'Complete ‘Choose your housing plan’ first',
    due: 'Jan 12',
  },
  {
    title: 'Meet your academic adviser',
    description: 'Available advisers appear after Aster assigns your academic program.',
    prerequisite: 'Waiting for program assignment',
    due: 'Date coming soon',
  },
];

/**
 * The award ledger — ENR-162 AC 4. `points` here is **what she was given at the
 * time**, and nothing ever re-reads `rewards-data.js` to recompute it. That is
 * why a change to what a requirement is worth cannot reach a point she has
 * already earned: history does not read the configuration.
 */
export const initialCompleted = [
  { title: 'Accept your offer', date: 'Aug 7', points: 150 },
  { title: 'Confirm your identity', date: 'Aug 7', points: 100 },
  { title: 'Choose your preferred name', date: 'Aug 7', points: 78 },
  { title: 'Set communication preferences', date: 'Aug 7', points: 60 },
  { title: 'Review your admission details', date: 'Aug 7', points: 40 },
];

export const initialReviewing = [
  {
    title: 'Final transcript check',
    description: 'Aster received your transcript and is reviewing it now.',
    submitted: 'Submitted Aug 6',
    eta: 'Usually 2–3 business days',
    points: rewards.reviewing['final-transcript'],
  },
];

export const enrollmentAdvisor = {
  name: 'Tomás Okafor',
  initials: 'TO',
  office: 'Admissions Office',
  label: 'Your enrollment advisor',
  intro:
    'Tomás holds your file, decides what you send to Admissions, and is the person to ask when a step is blocked.',
  location: { building: 'Building C', where: 'ground floor' },
  hours: { window: '9:00 AM–5:00 PM', days: 'Monday to Friday' },
};

export const financialAidAdvisor = {
  name: 'Amara Nwosu',
  initials: 'AN',
  office: 'Student Financial Services',
  label: 'Your financial aid advisor',
  intro:
    'Amara reads your aid package, explains what each figure means, and is the person to ask before you borrow anything.',
  location: { building: 'Building A', where: 'ground floor' },
  hours: { window: '9:00 AM–4:00 PM', days: 'Monday to Friday' },
};

/* ------------------------------------------------------------------ *
 * My Financials — ENR-166
 * ------------------------------------------------------------------ */

export const academicYear = {
  label: '2026–27 academic year',
  years: '2026–27',
  entry: 'Fall 2026 entry',
};

/**
 * `direct` marks what Aster bills the student for. The rest is money the year
 * costs but that Aster never charges — the distinction the card asks for when
 * it says an estimate must never look like a bill.
 */
export const costOfAttendance = [
  { id: 'tuition', label: 'Tuition', amount: 41200, direct: true },
  { id: 'fees', label: 'Fees', amount: 2860, direct: true },
  { id: 'housing', label: 'Housing', amount: 12400, direct: true },
  { id: 'meals', label: 'Meals', amount: 6300, direct: true },
  { id: 'books', label: 'Books and supplies', amount: 1240, direct: false, estimate: true },
  { id: 'personal', label: 'Personal and travel', amount: 2000, direct: false, estimate: true },
];

export const additionalAid = [
  {
    id: 'merit-topup',
    label: 'Aster Merit Top-up',
    amount: 2500,
    prefix: 'up to',
    note: 'Apply by Dec 1 · one essay, no separate form',
  },
  {
    id: 'work-study',
    label: 'Federal Work-Study',
    gloss: 'a part-time campus job paid from federal aid',
    amount: 2400,
    note: 'Offered and not yet accepted · about 8 hours a week',
  },
];

const ACADEMIC_METRICS = [
  {
    id: 'gpa',
    label: 'Grade point average',
    term: 'gpa',
    minimumLabel: 'minimum 2.0',
    minimum: 2,
    max: 4,
  },
  {
    id: 'pace',
    label: 'Completion pace',
    gloss: 'the share of credits you finish out of the ones you start',
    term: 'pace',
    minimumLabel: 'minimum 67%',
    minimum: 67,
    max: 100,
  },
  {
    id: 'credits',
    label: 'Attempted credits',
    gloss: 'every credit you start whether or not you pass',
    term: 'credits',
    minimumLabel: 'maximum 180',
    minimum: 0,
    max: 180,
  },
];

const academicNotStarted = {
  started: false,
  intro:
    'Aster checks three things at the end of each term to keep your aid. You have not started classes yet, so there is nothing to check.',
  firstCheck: 'Your first check: after the Spring 2027 term ends.',
  metrics: ACADEMIC_METRICS.map((metric) => ({ ...metric, value: null })),
};

const academicStarted = {
  started: true,
  intro:
    'Aster checks three things at the end of each term to keep your aid. This is what your record showed after the Spring 2027 term.',
  firstCheck: 'Last checked: May 22, 2027 · next check after the Fall 2027 term.',
  metrics: [
    { ...ACADEMIC_METRICS[0], value: 3.42, display: '3.42', above: true },
    { ...ACADEMIC_METRICS[1], value: 88, display: '88%', above: true },
    { ...ACADEMIC_METRICS[2], value: 31, display: '31', above: true, invert: true },
  ],
};

/**
 * One entry per state in the topbar switcher. `aid`, `payments` and `schedule`
 * are the only things that move; cost of attendance never does.
 */
export const financialStates = {
  pending: {
    aid: [
      { id: 'aster-grant', label: 'Aster Grant', kind: 'grant', source: 'Aster University', amount: 28000, status: 'accepted' },
      { id: 'pell', label: 'Federal Pell Grant', kind: 'grant', term: 'pell', source: 'U.S. Department of Education', amount: 5600, status: 'accepted' },
      {
        id: 'direct-loan',
        label: 'Federal Direct Subsidized Loan',
        kind: 'loan',
        term: 'subsidized',
        gloss: 'where the government covers the interest while you study',
        source: 'U.S. Department of Education',
        amount: null,
        status: 'pending',
        blockedBy: 'income-verification',
        blockedNote: 'waiting on your income verification',
      },
    ],
    payments: [],
    schedule: [
      { id: 'deposit', date: 'Nov 16', label: 'Enrollment deposit', amount: 500, status: 'due', taskId: 'deposit' },
      { id: 'i1', date: 'Jan 5', label: 'Installment 1', amount: 7165, status: 'scheduled' },
      { id: 'i2', date: 'Feb 5', label: 'Installment 2', amount: 7165, status: 'scheduled' },
      { id: 'i3', date: 'Mar 5', label: 'Installment 3', amount: 7165, status: 'scheduled' },
      { id: 'i4', date: 'Apr 5', label: 'Installment 4', amount: 7165, status: 'scheduled' },
    ],
    academic: academicNotStarted,
  },
  final: {
    aid: [
      { id: 'aster-grant', label: 'Aster Grant', kind: 'grant', source: 'Aster University', amount: 28000, status: 'accepted' },
      { id: 'pell', label: 'Federal Pell Grant', kind: 'grant', term: 'pell', source: 'U.S. Department of Education', amount: 5600, status: 'accepted' },
      {
        id: 'direct-loan',
        label: 'Federal Direct Subsidized Loan',
        kind: 'loan',
        term: 'subsidized',
        gloss: 'where the government covers the interest while you study',
        source: 'U.S. Department of Education',
        amount: 3500,
        status: 'accepted',
      },
    ],
    payments: [{ id: 'deposit', date: 'Aug 7', label: 'Enrollment deposit', amount: 500, status: 'received' }],
    schedule: [
      { id: 'deposit', date: 'Aug 7', label: 'Enrollment deposit', amount: 500, status: 'received' },
      { id: 'i1', date: 'Jan 5', label: 'Installment 1', amount: 6290, status: 'due' },
      { id: 'i2', date: 'Feb 5', label: 'Installment 2', amount: 6290, status: 'scheduled' },
      { id: 'i3', date: 'Mar 5', label: 'Installment 3', amount: 6290, status: 'scheduled' },
      { id: 'i4', date: 'Apr 5', label: 'Installment 4', amount: 6290, status: 'scheduled' },
    ],
    academic: academicStarted,
  },
};

export const paymentPlan = {
  name: '4-month plan',
  term: 'plan',
  detail: 'Interest-free · set up Aug 7',
};

/**
 * Written once, read everywhere. A term that appears in the ledger, the
 * schedule and the rail cannot drift into three different explanations.
 */
export const financialTerms = {
  coa: {
    title: 'Cost of attendance',
    body: 'Everything the year is expected to cost: tuition and fees, plus housing, meals, books, and travel. It’s a planning figure, not a bill. Aster only charges you for part of it.',
  },
  aid: {
    title: 'Financial aid',
    body: 'Money that lowers what you owe. Grants and scholarships are not repaid. Loans are. Each source below says which it is.',
  },
  pell: {
    title: 'Federal Pell Grant',
    body: 'A federal grant for students with high financial need. It is not repaid, and the amount depends on the income your family reported.',
  },
  subsidized: {
    title: 'Federal Direct Subsidized Loan',
    body: 'A federal loan you repay after you leave school. Subsidized means the government pays the interest while you are enrolled at least half time.',
  },
  balance: {
    title: 'Estimated remaining balance',
    body: 'What is left after the aid you have accepted and the payments Aster has recorded. It is an estimate: it changes when aid is finalized, when your housing or meal plan changes, or after verification.',
  },
  direct: {
    title: 'What Aster bills you directly',
    body: 'Tuition, fees, housing, and meals. The part of the cost that arrives as a bill from Aster and appears in your payment schedule.',
  },
  indirect: {
    title: 'What you spend elsewhere',
    body: 'Books, supplies, travel and personal costs. Aster estimates these so your aid can cover them, but Aster never charges you for them.',
  },
  estimate: {
    title: 'Why this is an estimate',
    body: 'Aster has not finished confirming every figure. Estimates can change after verification, after your housing choice, and after your aid package is final.',
  },
  plan: {
    title: '4-month plan',
    body: 'Instead of one bill, what Aster charges you is split into four equal monthly payments at no extra cost. The total does not change.',
  },
  schedule: {
    title: 'How installments are worked out',
    body: 'Aster divides what it bills you, minus your accepted aid, across the payments left in the year. If your aid changes, every remaining installment is recalculated.',
  },
  gpa: {
    title: 'Grade point average',
    body: 'The average of your grades so far, on a four-point scale. Aster asks for at least 2.0 to keep federal aid.',
  },
  pace: {
    title: 'Completion pace',
    body: 'The share of the credits you signed up for that you actually finished. Aster asks for at least 67%. Dropping a class after the deadline lowers it.',
  },
  credits: {
    title: 'Attempted credits',
    body: 'Every credit you have signed up for, including ones you dropped or repeated. Federal aid stops after 180 for a four-year degree.',
  },
  progress: {
    title: 'Academic progress',
    body: 'A check Aster runs at the end of each term to confirm you are moving through your degree. It decides whether your federal aid continues.',
  },
};
