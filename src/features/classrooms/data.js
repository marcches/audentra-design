/* ------------------------------------------------------------------ *
 * My Classrooms — ENR-188
 *
 * A read model published by staff (ENR-185 AC 5). Nothing here is the
 * student's own record: the catalog is Aster's, the approved credit is the
 * Registrar's decision, and a credit match is a suggestion that has not been
 * decided by anyone yet.
 * ------------------------------------------------------------------ */

export const program = {
  name: 'BA Computer Science',
  classOf: 'Class of 2031',
  catalog: '2026–27',
  publishedOn: 'Published by Aster on Aug 12',
  creditsToGraduate: 120,
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
  { id: 'electives', name: 'Electives', summary: 'The part of the degree you choose.' },
];

/**
 * `creditsApproved` is credit the Registrar has already granted. It is the only
 * input to a requirement's status — see `requirementStatus` in
 * `src/lib/academic-helpers.js`. A credit match never appears in this field.
 *
 * Course `state`: 'approved' (credit granted) · 'open' (you can take it) ·
 * 'locked' (a prerequisite is not met yet).
 */
export const requirements = [
  {
    id: 'writing',
    group: 'core',
    name: 'Writing & Rhetoric',
    summary: 'Two seminars that teach you to build an argument in writing, in any discipline.',
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
  {
    id: 'electives',
    group: 'electives',
    name: 'Free Electives',
    summary: 'Any Aster course that is not already counted toward a requirement above.',
    creditsRequired: 46,
    creditsApproved: 0,
    courses: [],
    emptyNote:
      'Aster does not choose these for you. Courses you register for that are not already counted above land here.',
  },
];

/**
 * Advisory only. ENR-186: a match never changes a requirement status, a credit
 * total or a progress figure, and there is deliberately no control on the
 * screen that could accept, dismiss or apply one.
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
