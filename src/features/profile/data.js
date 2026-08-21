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
  studentId: 'AST-2031-04417',
  // AC 6. A record with a version is a record you can talk to an office about.
  version: 4,
  updated: 'Aug 12, 2026',
  // What a record that has just been opened says instead.
  opened: 'Aug 20, 2026',
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
    name: 'Student Financial Services',
    short: 'Student Financial Services',
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
    grantedOn: 'Aug 2, 2026',
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
        value: 'AST-2031-04417',
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
        label: 'Term-time address',
        owner: 'student',
        value: '1226 University Drive, Apt 4B, Aster, MA 02139',
        newBlank: 'Not set · Aster is writing to your home address',
        verify: {
          state: 'unverified',
          label: 'Not verified',
          detail: 'Aster confirms an address against a document before it sends anything that matters there.',
          action: 'Confirm this address',
        },
      },
      {
        id: 'home-address',
        label: 'Home address',
        owner: 'student',
        value: '84 Rosewood Lane, Fall River, MA 02720',
        verify: {
          state: 'verified',
          label: 'Verified',
          detail: 'Confirmed against your application, Jul 14, 2026.',
        },
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
