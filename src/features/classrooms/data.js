/* ------------------------------------------------------------------ *
 * My Degree (the section the code calls `classrooms`) — ENR-188, and the
 * brief of 2026-08-21.
 *
 * A read model published by staff (ENR-185 AC 5). Nothing here is the
 * student's own record: the catalog is Aster's, the approved credit is the
 * Registrar's decision, and a potential match is evidence that has not been
 * decided by anyone yet. Four rules the brief rests on, and this file carries
 * the data for each: the university decides what a course counts toward
 * (`doubleCountRules`, and the requirement a course is listed under); double
 * counting is per pair of requirements with a rule ID; the student's plan is
 * hers alone and lives in the page, never here; and every route to a person
 * leads to the Office of the Registrar (`registrarOffice`).
 * ------------------------------------------------------------------ */

export const program = {
  name: 'BA Computer Science',
  classOf: 'Class of 2031',
  catalog: '2026–27',
  publishedOn: 'Published by Aster on Aug 12',
  creditsToGraduate: 120,
  /* Credit approved for courses that are not counted toward any requirement
     above lands in the free-elective remainder. The remainder itself is not a
     requirement and is never listed as one: 120 minus what the requirements
     ask for, minus this (brief, D9). */
  electiveCreditsApproved: 0,
  /* The term the student is deciding about. A course is takeable this term
     when it is offered in it and its prerequisite is met (brief, D3). */
  currentTerm: 'Fall',
  officialRecord: {
    office: 'Office of the Registrar',
    where: 'Building A, second floor',
    note: 'This page shows Aster’s published catalog and the credit the Registrar has already approved. Your official academic record lives with the Office of the Registrar.',
  },
};

export const requirementGroups = [
  { id: 'core', name: 'Core curriculum', summary: 'Every Aster degree asks for these.' },
  {
    id: 'major',
    name: 'Computer Science major',
    summary: 'The sequence your program is built on.',
  },
];

/**
 * The office that decides on credit, as the subject of the summary panel's
 * person block (brief, D15). An office is a thing, not a person: it gets a
 * glyph, never a face, and `AdvisorBar` draws it that way when `kind` says so.
 * The student is told the name and where to find it; both contact actions
 * route here, because this screen names the Registrar as the decider on every
 * match and must not then route her to Admissions.
 */
export const registrarOffice = {
  kind: 'office',
  icon: 'bank',
  label: 'Office of the Registrar',
  name: 'Building A, second floor',
  contact: 'the Office of the Registrar',
};

/**
 * Rule 2 of the brief: double counting is decided per pair of requirements,
 * by the university, and carries a rule ID in the same style a credit match
 * does. A course listed under one side of a pair counts toward the other too.
 * `between` names a requirement id or a group id. Everything not covered by a
 * pair counts toward the one requirement it is listed under and is not
 * elective credit.
 */
export const doubleCountRules = [
  {
    id: 'QR-03',
    between: ['quantitative', 'major'],
    text: 'A calculus sequence course taken for Quantitative Reasoning also counts toward the Computer Science major.',
  },
];

/**
 * `creditsApproved` is credit the Registrar has already granted. It is the only
 * input to a requirement's standing — see `requirementStatus` in `logic.js`. A
 * potential match never appears in this field, and neither does the plan.
 *
 * `remaining` is what is left, said in courses, the unit the student decides
 * in (brief, D2) — "4 of 8 credits" made her divide. It is copy, not a number,
 * because "one more lab course" and "two seminars" are not the same sentence;
 * `remainingLine` in `logic.js` falls back to the credit gap when a requirement
 * carries none, or when its courses carry different credit values.
 *
 * Course `state`: 'approved' (credit granted) · 'open' (you can take it) ·
 * 'locked' (a prerequisite is not met yet). Which group a course lands in when
 * the requirement is open — counted, takeable this term, later, blocked — is
 * read off `state`, `terms` and `prerequisiteMet` by `courseSituation`.
 */
export const requirements = [
  {
    id: 'writing',
    group: 'core',
    name: 'Writing & Rhetoric',
    summary: 'Two seminars that teach you to build an argument in writing, in any discipline.',
    remaining: 'Two seminars finish this.',
    creditsRequired: 6,
    creditsApproved: 0,
    courses: [
      {
        code: 'WRIT 101',
        title: 'Writing Seminar I',
        credits: 3,
        terms: 'Fall and Spring',
        state: 'open',
      },
      {
        code: 'WRIT 102',
        title: 'Writing Seminar II',
        credits: 3,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'WRIT 101',
      },
      {
        code: 'WRIT 140',
        title: 'The Rhetoric of Science',
        credits: 3,
        terms: 'Fall',
        state: 'open',
        note: 'Counts in place of WRIT 102 for science programs.',
      },
    ],
  },
  {
    id: 'quantitative',
    group: 'core',
    name: 'Quantitative Reasoning',
    summary: 'One calculus sequence course, or credit Aster has already accepted for it.',
    creditsRequired: 4,
    creditsApproved: 4,
    decidedOn: 'Approved Aug 4 by the Registrar',
    courses: [
      {
        code: 'MATH 101',
        title: 'Calculus I',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'approved',
        evidence: 'AP Calculus BC, score 5',
        decidedOn: 'Approved Aug 4',
      },
    ],
  },
  {
    id: 'natural-science',
    group: 'core',
    name: 'Natural Science',
    summary: 'Two laboratory courses. One is already covered by credit you brought with you.',
    remaining: 'One more lab course finishes this.',
    creditsRequired: 8,
    creditsApproved: 4,
    courses: [
      {
        code: 'PHYS 121',
        title: 'Mechanics',
        credits: 4,
        terms: 'Fall',
        state: 'approved',
        evidence: 'AP Physics C: Mechanics, score 5',
        decidedOn: 'Approved Aug 4',
      },
      {
        code: 'PHYS 122',
        title: 'Electricity and Magnetism',
        credits: 4,
        terms: 'Spring',
        state: 'open',
        prerequisite: 'PHYS 121',
        prerequisiteMet: true,
      },
      {
        code: 'CHEM 110',
        title: 'General Chemistry',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'open',
      },
      {
        code: 'BIOL 115',
        title: 'Cells and Organisms',
        credits: 4,
        terms: 'Fall',
        state: 'open',
      },
    ],
  },
  {
    id: 'arts-humanities',
    group: 'core',
    name: 'Arts & Humanities',
    summary: 'One course in how people make and read culture.',
    creditsRequired: 4,
    creditsApproved: 4,
    decidedOn: 'Approved Aug 4 by the Registrar',
    courses: [
      {
        code: 'ARTS 150',
        title: 'Visual Culture',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'approved',
        evidence: 'Northside College ARTS 150, transferred in full',
        decidedOn: 'Approved Aug 4',
      },
    ],
  },
  {
    id: 'historical',
    group: 'core',
    name: 'Historical Inquiry',
    summary: 'One course that asks you to read a period on its own terms.',
    remaining: 'One course finishes this.',
    creditsRequired: 3,
    creditsApproved: 0,
    courses: [
      {
        code: 'HIST 120',
        title: 'The Modern World',
        credits: 3,
        terms: 'Fall and Spring',
        state: 'open',
      },
      {
        code: 'HIST 155',
        title: 'Histories of Technology',
        credits: 3,
        terms: 'Spring',
        state: 'open',
      },
    ],
  },
  {
    id: 'foreign-language',
    group: 'core',
    name: 'Foreign Language',
    summary: 'Three courses in one language, or the level Aster places you into.',
    remaining: 'Two more Spanish courses finish this.',
    creditsRequired: 9,
    creditsApproved: 3,
    courses: [
      {
        code: 'SPAN 101',
        title: 'Elementary Spanish I',
        credits: 3,
        terms: 'Fall',
        state: 'approved',
        evidence: 'Aster placement exam',
        decidedOn: 'Approved Aug 6',
      },
      {
        code: 'SPAN 102',
        title: 'Elementary Spanish II',
        credits: 3,
        terms: 'Fall and Spring',
        state: 'open',
        prerequisite: 'SPAN 101',
        prerequisiteMet: true,
      },
      {
        code: 'SPAN 201',
        title: 'Intermediate Spanish II',
        credits: 3,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'SPAN 102',
      },
    ],
  },
  {
    id: 'programming-foundations',
    group: 'major',
    name: 'Programming Foundations',
    summary: 'The three-course sequence every later Computer Science course assumes.',
    remaining: 'Three courses finish this, taken in order.',
    creditsRequired: 12,
    creditsApproved: 0,
    courses: [
      {
        code: 'CS 110',
        title: 'Introduction to Programming',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'open',
      },
      {
        code: 'CS 111',
        title: 'Data Structures',
        credits: 4,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'CS 110',
      },
      {
        code: 'CS 210',
        title: 'Algorithms',
        credits: 4,
        terms: 'Fall',
        state: 'locked',
        prerequisite: 'CS 111',
      },
    ],
  },
  {
    id: 'systems',
    group: 'major',
    name: 'Systems',
    summary: 'How a machine actually runs the programs you write.',
    remaining: 'Three courses finish this.',
    creditsRequired: 12,
    creditsApproved: 0,
    courses: [
      {
        code: 'CS 220',
        title: 'Computer Organization',
        credits: 4,
        terms: 'Fall',
        state: 'locked',
        prerequisite: 'CS 111',
      },
      {
        code: 'CS 240',
        title: 'Operating Systems',
        credits: 4,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'CS 220',
      },
      {
        code: 'CS 245',
        title: 'Computer Networks',
        credits: 4,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'CS 220',
      },
    ],
  },
  {
    id: 'theory',
    group: 'major',
    name: 'Theory',
    summary: 'What can be computed, and what it costs to compute it.',
    remaining: 'Three courses finish this.',
    creditsRequired: 12,
    creditsApproved: 0,
    courses: [
      {
        code: 'CS 230',
        title: 'Discrete Mathematics',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'open',
        prerequisite: 'MATH 101',
        prerequisiteMet: true,
      },
      {
        code: 'CS 310',
        title: 'Theory of Computation',
        credits: 4,
        terms: 'Fall',
        state: 'locked',
        prerequisite: 'CS 230',
      },
      {
        code: 'CS 320',
        title: 'Analysis of Algorithms',
        credits: 4,
        terms: 'Spring',
        state: 'locked',
        prerequisite: 'CS 210',
      },
    ],
  },
  {
    id: 'capstone',
    group: 'major',
    name: 'Senior Capstone',
    summary: 'One project, carried for a year, that stands for the whole degree.',
    remaining: 'One year-long project finishes this.',
    creditsRequired: 4,
    creditsApproved: 0,
    courses: [
      {
        code: 'CS 490',
        title: 'Capstone Project',
        credits: 4,
        terms: 'Fall and Spring',
        state: 'locked',
        prerequisite: '90 credits and adviser approval',
      },
    ],
  },
];

/**
 * Advisory only. ENR-186: a match never changes a requirement standing, a
 * credit total or a progress figure, and there is deliberately no control on
 * the screen that could accept, dismiss or apply one. What it *would* change
 * if approved is computed by `matchEffect` from the target and its
 * requirement, and said in the conditional (brief, D7).
 */
export const creditMatches = [
  {
    id: 'span-201',
    evidence: {
      document: 'IB Diploma transcript',
      source: 'International Baccalaureate',
      detail: 'Spanish B, Higher Level · score 6',
      uploadedOn: 'Uploaded Aug 6 with your application',
    },
    target: {
      requirementId: 'foreign-language',
      requirementName: 'Foreign Language',
      courseCode: 'SPAN 201',
      courseTitle: 'Intermediate Spanish II',
      credits: 3,
    },
    rule: {
      code: 'TR-14',
      text: 'A Higher Level language examination with a score of 5 or above may map to the 200 level of that language, subject to Registrar approval.',
    },
    confidence: 'likely',
    confidenceNote:
      'The examination level and the score both match the rule exactly. A reviewer still has to sign it.',
    advice:
      'Nothing to do yet. If the Registrar approves it, SPAN 201 opens to you without SPAN 102 first.',
  },
  {
    id: 'cs-110',
    evidence: {
      document: 'Northside College transcript',
      source: 'Northside College',
      detail: 'CSCI 140 Introduction to Computing · grade A−, Spring 2026, 3 credits',
      uploadedOn: 'Uploaded Aug 6 with your application',
    },
    target: {
      requirementId: 'programming-foundations',
      requirementName: 'Programming Foundations',
      courseCode: 'CS 110',
      courseTitle: 'Introduction to Programming',
      credits: 4,
    },
    rule: {
      code: 'TR-09',
      text: 'Transfer credit from an accredited institution with a grade of C or better may substitute for a 100-level course, after a review of the syllabus.',
    },
    confidence: 'needs-review',
    confidenceNote:
      'The syllabus is not on file, so nobody has compared contact hours yet. Aster’s course carries 4 credits; Northside’s carries 3.',
    advice:
      'Plan to register for CS 110 as if this match does not exist. If you skip it and the review says no, CS 111 is closed to you in the spring.',
  },
];

/** What produces a match, for the student who has none. ENR-186 AC 5. */
export const matchSources = [
  'A transcript from another college or university',
  'AP, IB or A-level examination results',
  'An Aster placement exam result',
];

/** Shown while the program itself has not been assigned. */
export const unassignedProgram = {
  heading: 'Your program hasn’t been assigned yet',
  body: 'Aster assigns your academic program after your enrollment deposit clears. When it does, your degree requirements appear here: every requirement, what satisfies it, and any credit you already have.',
  produces: 'Complete ‘Lock in your place’ on My Enrollment',
};
