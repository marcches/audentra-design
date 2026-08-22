import { responseDeadline, standardMeals, standardRate } from '../housing/data.js';
import { rewards } from '../rewards/data.js';

export const TOTAL_STEPS = 20;

/** Every date in the portal is read against this day — Monday, June 15, 2026 (ADR 0007, `docs/domain/aster.md` §2). Matches `CAMPUS_TODAY` in campus/data.js. */
export const PORTAL_TODAY = '2026-06-15';

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
    id: 'orientation-session',
    category: 'Your degree',
    title: 'Choose your orientation session',
    description:
      'Aster Orientation is two days in July. You meet your academic advisor and register for fall classes there, so pick one of the three sessions by Jun 26.',
    due: 'Jun 26',
    daysLeft: 11,
    minutes: 2,
    action: 'Choose a session',
    kind: 'meeting',
    priority: 'critical',
    unlocks: 1,
    office: 'Student Life',
    // The session is booked where Aster Orientation is published — the required
    // event on My Campus Life — so the step routes there rather than opening a
    // second door to the same booking (the rule ENR-206 and ENR-207 set).
    section: '#/events',
    sectionLine:
      'This one is booked from your Campus Life section, where Aster Orientation is listed with its three July dates.',
    sectionFoot: 'Booking there ticks this step off and opens your advising meeting.',
    why: 'You register for fall classes at your session, and sessions fill up. The make-up in August means registering after everyone else.',
    steps: [
      'Pick one of the three sessions: Jul 6–7, Jul 13–14 or Jul 20–21.',
      'Finish the online modules and your placement tests before you go.',
      'Day two is advising and registration. You leave with your fall schedule.',
    ],
  },
  {
    id: 'placement',
    category: 'Your degree',
    title: 'Take your placement tests',
    description:
      'A math placement test online, and a language test if you want to continue one. Your advisor uses the results at orientation to place you in the right first courses.',
    due: 'Jun 26',
    daysLeft: 11,
    minutes: 60,
    action: 'Start the tests',
    kind: 'external',
    priority: 'soon',
    office: 'Academic Advising, Computer Science',
    why: 'Results have to reach your advisor before your session. Without them you are placed by your transcript alone, which often means a lower course than you could take.',
    destination: {
      mark: 'aster',
      name: 'Aster placement testing',
      url: 'placement.aster.edu',
      note: 'You’ll take the tests on Aster’s testing site, signed in with your Aster account. Results go straight to your advisor; this checklist updates when the math test is scored, usually within an hour.',
      cta: 'Open Aster placement testing',
      prototypeNote: 'Prototype: this button simulates the testing site reporting a score.',
    },
    steps: [
      'Sign in with your Aster account and choose the math test. It takes about 45 minutes.',
      'Add a language test if you want to keep studying one. It is optional.',
      'Come back any time. Aster marks this complete when your math score is in.',
    ],
  },
  {
    id: 'housing',
    category: 'Your campus life',
    title: 'Choose your housing plan',
    description:
      'Tell Aster whether you’ll live on campus, commute, arrange your own housing, or want help deciding.',
    // ENR-207 — one date, owned by the section that is about it. This used to be
    // a literal here that happened to agree with the move-in step below.
    due: responseDeadline.label,
    daysLeft: responseDeadline.daysLeft,
    minutes: 3,
    action: 'Choose housing plan',
    kind: 'housing',
    // ENR-207. The plan used to be answered inside the drawer — this was the
    // file's only `kind: 'form'`, three radios and a save. The question now has
    // a section of its own, so the step routes there and the radios are gone
    // rather than left in place: two doors to one answer is two records of it.
    section: '#/housing',
    sectionLine:
      'This one is answered in your Housing section, where you can also read the residence halls Residential Life publishes and rank the ones you would like.',
    sectionFoot: 'Answering there ticks this step off and unlocks your move-in time.',
    priority: 'soon',
    unlocks: 1,
    office: 'Residential Life',
    why: 'Your answer opens the right housing or commuter next steps, and Residential Life assigns rooms from Jul 20.',
    steps: [
      'Choose the option that best matches your current plan.',
      'If you’re unsure, select ‘Help me decide.’',
      'You can change your answer until Jun 30, the housing deadline.',
    ],
  },
  {
    id: 'income-verification',
    category: 'Your financials',
    title: 'Verify your household income',
    description:
      'The Financial Aid Office selected your FAFSA for verification and needs last year’s tax documents. Your federal loan stays pending until they do.',
    due: 'Jul 1',
    daysLeft: 16,
    minutes: 6,
    action: 'Upload documents',
    // The verb the financials alert uses for the same step (UX writing §2.4).
    shortAction: 'Verify income',
    kind: 'upload',
    priority: 'critical',
    unlocks: 1,
    financial: true,
    office: 'Financial Aid Office',
    consequence:
      'Verification is the check that your reported income matches your tax records. Your federal loan stays pending until it’s done.',
    why: 'Your loan cannot be finalized while verification is open, so its amount stays off your balance until this clears.',
    upload: {
      prompt: 'Choose your income documents',
      hint: 'PDF, JPG, or PNG · Up to 10 MB',
      fileName: 'household_income_2025.pdf',
      fileSize: '2.4 MB',
      privacy: 'Encrypted and shared only with authorized Financial Aid Office staff.',
    },
    steps: [
      'Gather your family’s 2025 tax return, or a signed statement of non-filing.',
      'Upload every page, including schedules.',
      'The Financial Aid Office reviews it in 3–5 business days and updates your package.',
    ],
  },
  {
    id: 'health',
    category: 'Your health',
    title: 'Send your immunization record',
    description:
      'Student Health Services needs your immunization record. Their hold on your class registration lifts once they accept it, and you register at orientation on Jul 14.',
    // Before registration at orientation on Jul 14: the record holds it, and
    // Health Services takes up to five business days to decide (US-standard
    // brief, Q10; `docs/domain/aster.md` §9).
    due: 'Jul 1',
    dueFull: 'Jul 1, 2026',
    daysLeft: 16,
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
    sectionFoot: 'Sending it there ticks this step off; the hold lifts when Health Services accepts the record.',
    priority: 'critical',
    office: 'Student Health Services',
    why: 'Health Services takes up to 5 business days. Sending it now leaves time to fix a missing dose before you register at orientation.',
    steps: [
      'Ask your doctor for a current immunization record.',
      'Send it from your Health section, up to eight photos or scans.',
      'Health Services decides within 5 business days.',
    ],
  },
  {
    id: 'profile',
    category: 'Your details',
    title: 'Finish your setup',
    description:
      'Add the contact details you didn’t have during setup. You can change them any time.',
    due: 'Jul 31',
    daysLeft: 46,
    minutes: 2,
    action: 'Add details',
    kind: 'profile',
    priority: 'normal',
    office: 'Admissions Office',
    why: 'Aster needs a reliable way to reach you with time-sensitive enrollment updates.',
    steps: [
      'Confirm your mobile number.',
      'Add an emergency contact.',
      'Review your preferred name and mailing address.',
    ],
  },
  {
    id: 'entrance-counseling',
    category: 'Your financials',
    title: 'Complete loan entrance counseling',
    description:
      'A one-time course on the federal student aid website about what borrowing means: interest, repayment, what you owe and when. Your first federal loan can’t be paid out until it’s done.',
    due: 'Aug 1',
    daysLeft: 47,
    minutes: 25,
    action: 'Start counseling',
    kind: 'external',
    priority: 'soon',
    financial: true,
    office: 'Financial Aid Office',
    consequence: 'A first federal loan cannot be paid out until entrance counseling is complete.',
    why: 'It is the second federal requirement for a first loan, with the promissory note, and it is the one students leave to the last week.',
    destination: {
      mark: 'F',
      name: 'Federal Student Aid',
      url: 'studentaid.gov',
      note: 'You’ll complete it on the federal student aid website using your FSA ID. Aster is told when it’s done, and this checklist updates within a day.',
      cta: 'Open Federal Student Aid',
      prototypeNote: 'Prototype: this button simulates the federal site reporting completion.',
    },
    steps: [
      'Sign in with your FSA ID and choose Entrance Counseling.',
      'Name Aster University as your school so the result reaches the Financial Aid Office.',
      'It takes about 25 minutes. Come back any time; Aster marks this complete automatically.',
    ],
  },
  {
    id: 'loan-agreement',
    category: 'Your financials',
    title: 'Sign your Master Promissory Note',
    description:
      'The Master Promissory Note is the contract for your federal loan: your promise to repay it. Aster can’t pay the loan out without it.',
    due: 'Aug 1',
    daysLeft: 47,
    minutes: 8,
    action: 'Sign the note',
    kind: 'external',
    priority: 'soon',
    financial: true,
    office: 'Financial Aid Office',
    consequence: 'Aster cannot pay out your loan without a signed Master Promissory Note.',
    why: 'It is a federal requirement for a first loan. Signing it early means your loan is ready the moment verification clears.',
    destination: {
      mark: 'F',
      name: 'Federal Student Aid',
      url: 'studentaid.gov',
      note: 'You’ll sign on the federal student aid website using your FSA ID. When it’s signed, this checklist updates automatically, usually within a day.',
      cta: 'Open Federal Student Aid',
      prototypeNote: 'Prototype: this button simulates the federal site confirming your signature.',
    },
    steps: [
      'Sign in with your FSA ID.',
      'Read the note and sign it electronically.',
      'Come back any time. Aster marks this complete automatically.',
    ],
  },
  {
    id: 'insurance',
    category: 'Your health',
    title: 'Enroll in or waive the student health plan',
    description:
      'Massachusetts requires every student to have health insurance. You’re enrolled in Aster’s plan, and its premium is on your fall bill, unless you waive it with comparable coverage by Aug 1, 11:59 p.m. ET.',
    due: 'Aug 1',
    daysLeft: 47,
    minutes: 6,
    action: 'Enroll or waive',
    kind: 'external',
    priority: 'normal',
    office: 'Student Health Services',
    why: 'The plan’s premium stays on your bill until you waive it. A waiver by the deadline takes it off before the bill is due.',
    destination: {
      mark: 'aster',
      name: 'Aster student health plan',
      url: 'healthplan.aster.edu',
      note: 'You’ll enroll or waive on Aster’s health plan site. A waiver needs your family’s insurance card. When it’s confirmed, this checklist updates, usually within 2 business days.',
      cta: 'Open Aster student health plan',
      prototypeNote: 'Prototype: this button simulates the health plan site confirming your choice.',
    },
    steps: [
      'Have your family’s insurance card ready if you plan to waive.',
      'Enroll in Aster’s plan, or enter the policy details to waive it.',
      'Aster confirms within 2 business days and your fall bill updates.',
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
    title: 'Pay your fall bill',
    category: 'Your financials',
    kind: 'external',
    description: 'The Bursar issues your fall bill on Jul 24: what’s due after your aid, with the payment plan as an option.',
    prerequisite: 'Waiting for the Bursar to issue the bill',
    due: 'Aug 12',
  },
  {
    title: 'Choose your move-in time',
    category: 'Your campus life',
    kind: 'housing',
    description: 'Your arrival window appears after Residential Life assigns your room on Jul 20.',
    prerequisite: 'Complete ‘Choose your housing plan’ first',
    due: 'Aug 7',
  },
  {
    title: 'Meet your academic advisor',
    // Appointments groups its conversations by the checklist's categories (A9 of
    // the appointments changes, 2026-08-21), and academic advising is a
    // conversation, so the step that names it carries the category it sits in.
    // Since 2026-08-22 a locked row prints its category too (C2.3), and this is
    // still the one place the category is decided.
    category: 'Your degree',
    kind: 'meeting',
    description: 'You meet your advisor at your orientation session and register for fall classes there.',
    prerequisite: 'Complete ‘Choose your orientation session’ first',
    due: 'At orientation',
  },
];

/**
 * The award ledger — ENR-162 AC 4. `points` here is **what she was given at the
 * time**, and nothing ever re-reads `rewards-data.js` to recompute it. That is
 * why a change to what a requirement is worth cannot reach a point she has
 * already earned: history does not read the configuration.
 *
 * The dates follow `docs/domain/aster.md` §2 and §4: the offer accepted and the
 * deposit paid by May 1, the account on May 4, and setup walked on Jun 8.
 */
// Every row carries its category since the walkthrough of 2026-08-20 (C2.3):
// the category is what ties a step to the screen that owns it, and a finished
// step is still a step of its part of the enrollment.
export const initialCompleted = [
  { title: 'Accept your offer', category: 'Your offer', kind: 'decision', date: 'Apr 30', points: 150 },
  { title: 'Pay your $500 enrollment deposit', category: 'Your offer', kind: 'external', date: 'May 1', points: 100 },
  { title: 'Set up your Aster account', category: 'Your details', kind: 'profile', date: 'May 4', points: 40 },
  { title: 'Confirm your identity', category: 'Your details', kind: 'identity', date: 'Jun 8', points: 100 },
  { title: 'Choose your preferred name', category: 'Your details', kind: 'profile', date: 'Jun 8', points: 78 },
  { title: 'Set communication preferences', category: 'Your details', kind: 'preferences', date: 'Jun 8', points: 60 },
  { title: 'Review your admission details', category: 'Your offer', kind: 'review', date: 'Jun 8', points: 40 },
];

export const initialReviewing = [
  {
    title: 'Final transcript check',
    kind: 'review',
    description: 'Aster received your final transcript and is reviewing it now.',
    submitted: 'Submitted Jun 12',
    eta: 'Usually 2–3 business days',
    points: rewards.reviewing['final-transcript'],
  },
];

export const enrollmentAdvisor = {
  name: 'Tomás Okafor',
  initials: 'TO',
  photo: '/people/tomas-okafor.webp',
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
  photo: '/people/amara-nwosu.webp',
  office: 'Financial Aid Office',
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
  // Read from the housing data, not typed here — ENR-211 AC 8 / B4.5 of the
  // review of 2026-08-21: neither screen holds its own housing number. The
  // figure is the standard double's rate until Residential Life assigns a room.
  { id: 'housing', label: 'Housing', amount: standardRate, direct: true, conditional: true },
  { id: 'meals', label: 'Meals', amount: standardMeals, direct: true, conditional: true },
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
    payments: [{ id: 'deposit', date: 'May 1', label: 'Enrollment deposit', amount: 500, status: 'received' }],
    // The fall bill is issued Jul 24 and due Aug 12; the spring bill in January.
    // Four installments a term (`docs/domain/aster.md` §6). While the loan is
    // pending the year is $28,660 after grants and the deposit; it cannot split
    // evenly, so fall carries the extra dollar on each row.
    schedule: [
      { id: 'deposit', date: 'May 1', label: 'Enrollment deposit', amount: 500, status: 'received' },
      { id: 'f1', date: 'Aug 12', label: 'Fall installment 1', amount: 3583, status: 'scheduled' },
      { id: 'f2', date: 'Sep 12', label: 'Fall installment 2', amount: 3583, status: 'scheduled' },
      { id: 'f3', date: 'Oct 12', label: 'Fall installment 3', amount: 3583, status: 'scheduled' },
      { id: 'f4', date: 'Nov 12', label: 'Fall installment 4', amount: 3583, status: 'scheduled' },
      { id: 's1', date: 'Jan 12', label: 'Spring installment 1', amount: 3582, status: 'scheduled' },
      { id: 's2', date: 'Feb 12', label: 'Spring installment 2', amount: 3582, status: 'scheduled' },
      { id: 's3', date: 'Mar 12', label: 'Spring installment 3', amount: 3582, status: 'scheduled' },
      { id: 's4', date: 'Apr 12', label: 'Spring installment 4', amount: 3582, status: 'scheduled' },
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
    payments: [{ id: 'deposit', date: 'May 1', label: 'Enrollment deposit', amount: 500, status: 'received' }],
    // With the loan accepted the year is $25,160 after aid and the deposit: eight equal rows.
    schedule: [
      { id: 'deposit', date: 'May 1', label: 'Enrollment deposit', amount: 500, status: 'received' },
      { id: 'f1', date: 'Aug 12', label: 'Fall installment 1', amount: 3145, status: 'due' },
      { id: 'f2', date: 'Sep 12', label: 'Fall installment 2', amount: 3145, status: 'scheduled' },
      { id: 'f3', date: 'Oct 12', label: 'Fall installment 3', amount: 3145, status: 'scheduled' },
      { id: 'f4', date: 'Nov 12', label: 'Fall installment 4', amount: 3145, status: 'scheduled' },
      { id: 's1', date: 'Jan 12', label: 'Spring installment 1', amount: 3145, status: 'scheduled' },
      { id: 's2', date: 'Feb 12', label: 'Spring installment 2', amount: 3145, status: 'scheduled' },
      { id: 's3', date: 'Mar 12', label: 'Spring installment 3', amount: 3145, status: 'scheduled' },
      { id: 's4', date: 'Apr 12', label: 'Spring installment 4', amount: 3145, status: 'scheduled' },
    ],
    academic: academicStarted,
  },
};

export const paymentPlan = {
  name: 'payment plan',
  term: 'plan',
  detail: 'Four installments a term · $50 setup fee · chosen May 1',
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
    title: 'Payment plan',
    body: 'Instead of paying each term’s bill at once, what Aster bills you is split into four monthly installments a term: August to November, then January to April. There is a $50 setup fee for the year, and the total does not otherwise change.',
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
