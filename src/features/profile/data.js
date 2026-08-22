/**
 * The record Aster keeps about Maya — ENR-184, serving ENR-179.
 *
 * Two facts shape this file. First, every field says who owns it: `student`
 * means the row carries a control, an office id means the row carries a route
 * to that office and never a control (ENR-179 AC 1 and AC 2 as data rather than
 * as markup discipline). Second, the preferred name lives here and nowhere
 * else, so the sidebar, the topbar and the greeting read the same string — AC 3
 * cannot drift when there is only one copy of it.
 *
 * The seven record categories are ENR-144's vocabulary. They are the words a
 * student consented in, so they are quoted here rather than re-invented, and
 * every other surface that shares data must use these names.
 */

export const record = {
  preferredName: 'Maya',
  legalName: 'Amelia Maya Johnson',
  legalFirstName: 'Amelia',
  familyName: 'Johnson',
  standing: 'Incoming student',
  // The photo on her record — the one the campus card uses, and the one every
  // place that draws her reads (Jam, 2026-08-21).
  photo: '/people/maya-johnson.webp',
  studentId: 'AST-2030-04417',
  // AC 6. A record with a version is a record you can talk to an office about.
  version: 4,
  updated: 'Jun 8, 2026',
  // What a record that has just been opened says instead.
  opened: 'Jun 15, 2026',
};

/**
 * Who changes what the student cannot. Every institution-owned field names one
 * of these, and the rail lists them once with what each one holds — so the
 * route on the row is a shortcut, not the only place the office is explained.
 */
export const offices = {
  registrar: {
    id: 'registrar',
    name: 'Office of the Registrar',
    short: 'the Registrar',
    holds: 'Your legal identity, your date of birth and your student number.',
    where: 'Halloran Hall, room 120',
    hours: '9:00 AM–4:30 PM, Monday to Friday',
  },
  it: {
    id: 'it',
    name: 'IT Service Desk',
    short: 'the IT Service Desk',
    holds: 'Your Aster address and how you sign in to everything Aster runs.',
    where: 'Library, ground floor',
    hours: '8:00 AM–8:00 PM, seven days',
  },
  financial: {
    id: 'financial',
    name: 'Financial Aid Office',
    short: 'Financial Aid Office',
    holds: 'What Aster bills you, and the aid that covers it.',
    where: 'Building A, ground floor',
    hours: '9:00 AM–4:00 PM, Monday to Friday',
  },
};

/**
 * The person who owns the subject of this page, in the shape `AdvisorBar`
 * already renders. On every other section that slot holds an advisor; here it
 * holds the office that changes what the student cannot, which is the same
 * promise: a name, a place and an hour, not a form.
 */
export const registrarContact = {
  name: 'Dana Whitfield',
  initials: 'DW',
  office: 'Office of the Registrar',
  label: 'Who changes the rest',
  location: { building: 'Halloran Hall', where: 'room 120' },
  hours: { window: '9:00 AM–4:30 PM', days: 'Monday to Friday' },
};

/**
 * AC 4. The channel is not a label on a record — it decides what Aster does, so
 * each option says what Aster will do, and the row restates it after a change.
 *
 * Defined in `features/onboarding/data.js` and re-exported here, for the same
 * reason as the record categories below: it is chosen at onboarding, step 2,
 * and this screen is where it is changed afterwards. The dependency runs one
 * way — profile reads onboarding, never the reverse — so there is no cycle.
 */
export { channelOptions } from '../onboarding/data.js';

/**
 * The seven categories a student can grant, and what each one actually exposes.
 *
 * They are defined in `features/onboarding/data.js` and re-exported here. They
 * are, in this file's own earlier words, "the words a student consented in" —
 * and consent happens at onboarding, on step 4. The feature that owns a concept
 * exports it and the others import, which is the rule `enrollment/data.js`
 * already follows when it reads `responseDeadline` out of housing.
 */
export { RECORD_CATEGORIES } from '../onboarding/data.js';

/**
 * What onboarding captured (ENR-144). This screen shows it, narrows it and ends
 * it; it never adds a person, because capture belongs to onboarding — ENR-190
 * out of scope.
 */
export const initialGrants = [
  {
    id: 'grant-oliveira',
    person: {
      name: 'Renata Oliveira',
      initials: 'RO',
      relation: 'Mother',
      email: 'r.oliveira@outlook.com',
    },
    purpose: 'Help me with billing and financial aid while I am away.',
    granted: ['enrollment', 'billing', 'aid'],
    grantedOn: 'Jun 8, 2026',
    endsOn: 'May 31, 2027',
  },
];

/** AC 7. The reason comes before the control, and it is about a real risk. */
export const session = {
  device: 'Chrome on this computer',
  since: 'Signed in at 8:42 AM today',
  reason:
    'On a shared or library computer, closing the tab does not sign you out. Whoever opens the portal next would land in your record: your aid, your address, your grades.',
};

/**
 * The academic documents panel this page used to carry duplicated My Documents.
 * ENR-190 names that as a divergence, so the fix is a route rather than a copy:
 * the record is one thing, and the section that owns it is named here. Since the
 * Jam of 2026-08-21 My Documents lives under this page — its entry card is the
 * first block — so this list holds only what is genuinely elsewhere.
 */
export const elsewhere = [
  {
    id: 'academic',
    icon: 'book',
    label: 'Your degree and your courses',
    note: 'Requirements, approved credit and what still counts. The Registrar holds the official transcript.',
    route: '#/my-classrooms',
    where: 'My Degree',
  },
  {
    id: 'money',
    icon: 'wallet',
    label: 'What the year costs you',
    note: 'Your balance, your aid and every payment Aster has recorded.',
    route: '#/financials/overview',
    where: 'My Financials',
  },
];

/**
 * The record, by subject. Grouped the way a student looks for a field — "my
 * phone number", never "the fields the registrar owns" — with the ownership
 * boundary running between the rows of a card rather than around it. Inside a
 * card the rows the student owns come first and the office's follow, so
 * `profile-helpers` can label each run once instead of tagging twelve rows.
 *
 * A `note` is for something that changes what the student does — what the law
 * needs, what a change costs, what Aster will do next. A field that is simply a
 * fact carries none, and that is where the rhythm of the card comes from: the
 * rows that ask something of her are taller than the rows that do not.
 *
 * `newBlank` marks a field a record does not have on the day it is opened. It
 * is what the empty state reads; nothing else in the file needs to know.
 */
/**
 * Campus interests — the one list. My Campus Life ranks events and clubs by it
 * and re-exports it, so the record and the ranking cannot disagree (UX writing 6.4).
 */
export const campusInterests = ['Music', 'Volunteering'];

export const fieldGroups = [
  {
    id: 'you',
    title: 'You',
    icon: 'profile',
    lede: 'Your name as Aster uses it, and the identity the law records.',
    fields: [
      {
        id: 'preferred-name',
        label: 'Preferred name',
        owner: 'student',
        value: 'Maya',
        note: 'Used everywhere in the portal. Your legal name appears only where the law needs it.',
        newBlank: 'Not set · Aster is calling you Amelia',
      },
      {
        id: 'photo',
        label: 'Photo',
        owner: 'student',
        value: 'On file · the one on your campus card',
        note: 'The one place your photograph appears in the portal is the head of this page. You upload it; nobody else sees it here.',
        newBlank: 'Not set · your initials are used until you add one',
      },
      {
        id: 'pronouns',
        label: 'Pronouns',
        owner: 'student',
        value: 'she / her',
        newBlank: 'Not set',
      },
      {
        id: 'interests',
        label: 'Campus interests',
        owner: 'student',
        value: campusInterests.join(' · '),
        newBlank: 'Not set',
      },
      {
        id: 'legal-name',
        label: 'Legal name',
        owner: 'registrar',
        value: 'Amelia Maya Johnson',
        note: 'On your transcript and your diploma. Changing it needs a document.',
      },
      {
        id: 'date-of-birth',
        label: 'Date of birth',
        owner: 'registrar',
        value: 'Mar 14, 2008',
      },
      {
        id: 'student-id',
        label: 'Student ID',
        owner: 'registrar',
        value: 'AST-2030-04417',
        mono: true,
        note: 'It never changes, and it is safe to quote in an email.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'How Aster reaches you',
    icon: 'mail',
    lede: 'Where a decision, a bill, or a deadline lands, and which one Aster uses first.',
    fields: [
      {
        id: 'channel',
        label: 'Preferred channel',
        owner: 'student',
        choice: 'channel',
        value: 'portal',
      },
      {
        id: 'personal-email',
        label: 'Personal email',
        owner: 'student',
        value: 'maya.johnson@gmail.com',
        verify: { state: 'verified', label: 'Verified', detail: 'Confirmed Aug 2, 2026.' },
      },
      {
        id: 'mobile',
        label: 'Mobile number',
        owner: 'student',
        value: '+1 (415) 555-0148',
        newBlank: 'Not set',
        // The state the card is about: pending reads as pending, not as broken.
        verify: {
          state: 'pending',
          label: 'Verification pending',
          detail: 'Aster texted a code to this number 6 minutes ago. It works until midnight tonight.',
          action: 'Resend the code',
        },
      },
      {
        id: 'term-address',
        label: 'Campus address',
        owner: 'student',
        // No campus address before Residential Life assigns a room (Jul 20); until
        // then Aster writes home. The room, once assigned, is what fills this.
        value: null,
        blank: 'Not set · Aster writes to your permanent address until your room is assigned',
        newBlank: 'Not set · Aster writes to your permanent address until your room is assigned',
        verify: null,
      },
      {
        id: 'home-address',
        label: 'Permanent address',
        owner: 'student',
        value: '84 Rosewood Lane, Fall River, MA 02720',
        verify: {
          state: 'verified',
          label: 'Verified',
          detail: 'Confirmed against your application, May 6, 2026.',
        },
      },
      {
        id: 'mailing-address',
        label: 'Mailing address',
        owner: 'student',
        // Only where it differs from the permanent one (C1.9); until she sets
        // one, mail goes to the permanent address and the row says so.
        value: null,
        blank: 'Same as your permanent address',
        newBlank: 'Same as your permanent address',
      },
      {
        id: 'aster-email',
        label: 'Aster email',
        owner: 'it',
        value: 'm.johnson@aster.edu',
        note: 'Yours for life, and official mail always goes here as well.',
      },
    ],
  },
];

/**
 * Where she came from — C1.8 of the review of 2026-08-21. The schools and colleges before Aster,
 * as their transcripts say: coursework, grades and credits, presented as a record rather than a
 * form, each transcript with the state of the Registrar's reading of it. Owned here and read by
 * My Degree, whose potential matches cite a line of it by `id` (`#/profile/origins?line=<id>`).
 * `requirementId` points at the document in My Documents where one exists; the IB transcript
 * arrived with the application.
 */
export const priorRecord = [
  {
    id: 'northside-hs',
    name: 'Northside High School',
    kind: 'High school',
    where: 'Fall River, MA',
    years: '2022–2026',
    transcript: {
      label: 'Final high school transcript',
      requirementId: 'final-transcript',
      state: 'under-review',
      received: 'Jun 12, 2026',
    },
    lines: [
      { id: 'hs-calc-bc', course: 'AP Calculus BC', term: '2025–26', grade: 'A', credits: '1.0', note: 'AP exam score 5' },
      { id: 'hs-physics-c', course: 'AP Physics C: Mechanics', term: '2025–26', grade: 'A−', credits: '1.0', note: 'AP exam score 5' },
      { id: 'hs-english-12', course: 'English 12 Honors', term: '2025–26', grade: 'A', credits: '1.0' },
      { id: 'hs-us-gov', course: 'U.S. Government', term: '2025–26', grade: 'A−', credits: '0.5' },
      { id: 'hs-spanish-4', course: 'Spanish IV', term: '2024–25', grade: 'A', credits: '1.0' },
      { id: 'hs-chem', course: 'Chemistry Honors', term: '2024–25', grade: 'B+', credits: '1.0' },
    ],
  },
  {
    id: 'ib',
    name: 'International Baccalaureate',
    kind: 'Diploma Programme',
    where: 'at Northside High School',
    years: '2024–2026',
    transcript: {
      label: 'IB Diploma transcript',
      requirementId: null,
      state: 'reviewed',
      received: 'Aug 6, 2025 · with your application',
    },
    lines: [
      { id: 'ib-spanish-b-hl', course: 'Spanish B, Higher Level', term: 'May 2026', grade: '6', credits: null, note: 'Cited by a potential match on My Degree' },
      { id: 'ib-math-aa-hl', course: 'Mathematics: Analysis and Approaches, Higher Level', term: 'May 2026', grade: '6', credits: null },
      { id: 'ib-physics-sl', course: 'Physics, Standard Level', term: 'May 2026', grade: '5', credits: null },
      { id: 'ib-english-sl', course: 'English A: Literature, Standard Level', term: 'May 2026', grade: '6', credits: null },
    ],
  },
  {
    id: 'northside-college',
    name: 'Northside College',
    kind: 'Dual enrollment',
    where: 'Fall River, MA',
    years: 'Spring 2026',
    transcript: {
      label: 'Northside College transcript',
      requirementId: 'dual-enrollment-transcript',
      state: 'reviewed',
      received: 'May 28, 2026',
    },
    lines: [
      { id: 'nc-csci-140', course: 'CSCI 140 Introduction to Computing', term: 'Spring 2026', grade: 'A−', credits: '3', note: 'Cited by a potential match on My Degree' },
      { id: 'nc-arts-150', course: 'ARTS 150 Introduction to Drawing', term: 'Spring 2026', grade: 'A', credits: '3', note: 'Transferred in full' },
    ],
  },
];
