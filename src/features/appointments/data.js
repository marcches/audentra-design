// Appointments — ENR-183, behaviour from ENR-178, and the changes of 2026-08-21
// (`.scratch/ENR-183-appointments/appointments-changes-2026-08-21.md`).
//
// Three kinds of thing live here and they must not be confused. **Availability** is published by a
// team: the portal reads it and never writes it. **Appointments** are the student's, created by
// taking one of those published times. A **time request** is the second path, added 2026-08-21
// (ADR 0005): when none of the published times work, the student asks the team for one, and what
// she sends is a sentence about when she could meet — never a time on a calendar. The request waits
// on the team; nothing is booked until they answer.
//
// The people are the ones the student already knows — Tomás from My Enrollment, Amara from My
// Financials, Ines from My Degree — so a booked conversation is time with a name. A request, by
// contrast, is with the team, because nobody has been assigned to it yet.

import { enrollmentAdvisor, financialAidAdvisor, initialTasks, lockedTasks } from '../enrollment/data.js';
import { courseAdvisor } from '../classrooms/data.js';

/**
 * The conversations a student can book, and where each one sits.
 *
 * The type is what decides which team receives the booking — ENR-178 AC 2 — so the team is a
 * property of the type, never something the student picks separately and could get wrong. Since
 * 2026-08-21 (A9) the list is organised by the **checklist's categories** rather than by a grouping of
 * this screen's own: `category` names a category that exists, under the same name, on My Enrollment,
 * and the list renders in the checklist's category order (`topicsInCategoryOrder`). A team that has
 * no checklist category does not appear here; a category the checklist gains appears here the moment
 * a team under it publishes conversations.
 *
 * `team` is the office, in the portal-wide name (8.11); `department` is the part of it that handles
 * this student, printed after the office where the name is read in full.
 */
export const conversationTypes = [
  {
    id: 'enrollment',
    category: 'Your offer',
    label: 'Enrollment step',
    blurb: 'A step on your checklist that is blocked, unclear, or that you would rather do with someone.',
    team: 'Admissions Office',
    person: enrollmentAdvisor,
    minutes: 30,
    place: 'Building C, ground floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    publishes: 'Tomás publishes his times every Monday, two weeks ahead.',
  },
  {
    id: 'financial-aid',
    category: 'Money and aid',
    label: 'Financial aid',
    blurb: 'Your package, what a figure means, or what happens to it if something changes.',
    team: 'Financial Aid Office',
    person: financialAidAdvisor,
    minutes: 30,
    place: 'Building A, ground floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    publishes: 'The Financial Aid Office opens its calendar two weeks ahead.',
  },
  {
    id: 'academic',
    category: 'Your degree',
    label: 'Academic advising',
    blurb: 'Which courses satisfy which requirement, and what your first term should hold.',
    team: 'Academic Advising',
    department: 'Computer Science',
    person: courseAdvisor,
    minutes: 45,
    place: 'Ferrand Building, second floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    // The reason this team has published nothing. Without it the empty picker would be a shrug.
    publishes: 'Academic advisors meet first-years at orientation in July and publish times for the fall once classes begin.',
  },
];

/**
 * The checklist's categories, in the checklist's order — read off the steps themselves rather than
 * retyped, so the two screens cannot drift (A9: "no grouping is invented for this screen alone").
 * A locked step counts: *Meet your academic advisor* is where academic advising gets its category.
 */
export const checklistCategories = [...initialTasks, ...lockedTasks]
  .map((task) => task.category)
  .filter((category, index, all) => category && all.indexOf(category) === index);

/**
 * What each team has published, keyed by conversation type. A day that is not in the list is a day
 * with nothing on it — absence is the absence of an entry, never an entry with an empty `slots`.
 * A part of the day with nothing in it is a different thing, and the picker states that one.
 *
 * `academic` is published as an empty list on purpose: ENR-178 Scenario 5 has to be visible in the
 * ready state, not only behind a preview switch.
 */
export const publishedTimes = {
  enrollment: [
    {
      date: '2026-06-16',
      slots: [
        { id: 'enr-21-0930', time: '9:30 AM', end: '10:00 AM', format: 'in-person' },
        { id: 'enr-21-1000', time: '10:00 AM', end: '10:30 AM', format: 'in-person' },
        { id: 'enr-21-1130', time: '11:30 AM', end: '12:00 PM', format: 'video' },
        { id: 'enr-21-1400', time: '2:00 PM', end: '2:30 PM', format: 'in-person' },
        { id: 'enr-21-1430', time: '2:30 PM', end: '3:00 PM', format: 'in-person' },
      ],
    },
    {
      // Mornings only. The picker prints "No availability" under Afternoon rather than hiding it.
      date: '2026-06-19',
      slots: [
        { id: 'enr-24-0900', time: '9:00 AM', end: '9:30 AM', format: 'in-person' },
        { id: 'enr-24-0930', time: '9:30 AM', end: '10:00 AM', format: 'video' },
      ],
    },
    {
      date: '2026-06-23',
      slots: [
        { id: 'enr-26-1030', time: '10:30 AM', end: '11:00 AM', format: 'in-person' },
        { id: 'enr-26-1100', time: '11:00 AM', end: '11:30 AM', format: 'in-person' },
        { id: 'enr-26-1330', time: '1:30 PM', end: '2:00 PM', format: 'video' },
        { id: 'enr-26-1600', time: '4:00 PM', end: '4:30 PM', format: 'in-person' },
      ],
    },
    {
      // Afternoons only — the mirror case.
      date: '2026-06-25',
      slots: [
        { id: 'enr-28-1500', time: '3:00 PM', end: '3:30 PM', format: 'in-person' },
        { id: 'enr-28-1530', time: '3:30 PM', end: '4:00 PM', format: 'in-person' },
        { id: 'enr-28-1600', time: '4:00 PM', end: '4:30 PM', format: 'video' },
      ],
    },
  ],
  'financial-aid': [
    {
      date: '2026-06-17',
      slots: [
        { id: 'aid-25-1100', time: '11:00 AM', end: '11:30 AM', format: 'video' },
        { id: 'aid-25-1130', time: '11:30 AM', end: '12:00 PM', format: 'in-person' },
        { id: 'aid-25-1300', time: '1:00 PM', end: '1:30 PM', format: 'in-person' },
        { id: 'aid-25-1330', time: '1:30 PM', end: '2:00 PM', format: 'video' },
      ],
    },
    {
      date: '2026-06-22',
      slots: [
        { id: 'aid-27-0900', time: '9:00 AM', end: '9:30 AM', format: 'in-person' },
        { id: 'aid-27-0930', time: '9:30 AM', end: '10:00 AM', format: 'in-person' },
        { id: 'aid-27-1000', time: '10:00 AM', end: '10:30 AM', format: 'video' },
      ],
    },
    {
      date: '2026-06-29',
      slots: [
        { id: 'aid-02-1400', time: '2:00 PM', end: '2:30 PM', format: 'video' },
        { id: 'aid-02-1430', time: '2:30 PM', end: '3:00 PM', format: 'in-person' },
        { id: 'aid-02-1500', time: '3:00 PM', end: '3:30 PM', format: 'in-person' },
      ],
    },
  ],
  academic: [],
};

/**
 * What the student has booked. `state` is the record of what happened when the booking was made,
 * never an assumption: `confirmed` means it reached the team's calendar, `failed` means it did not
 * and nothing is booked, `cancelled` means it was called off after being booked, `requested` means
 * the student asked the team for a time and the team has not answered — it has no `date`, because
 * there is no time until they do. What a confirmed appointment in the past is called is derived from
 * the date, not stored — see `logic.js`.
 */
export const bookedAppointments = [
  {
    id: 'appt-transcript',
    typeId: 'enrollment',
    date: '2026-06-18',
    time: '10:30 AM',
    end: '11:00 AM',
    format: 'in-person',
    state: 'confirmed',
    subject: 'Whether the transcript I uploaded is the one Admissions needs.',
    bookedOn: 'Jun 10',
  },
  {
    id: 'appt-loan',
    typeId: 'financial-aid',
    date: '2026-06-24',
    time: '3:30 PM',
    end: '4:00 PM',
    format: 'video',
    state: 'confirmed',
    subject: 'What happens to my first payment if the federal loan is still pending.',
    bookedOn: 'Jun 11',
  },
  {
    id: 'appt-checklist',
    typeId: 'enrollment',
    date: '2026-06-05',
    time: '9:00 AM',
    end: '9:30 AM',
    format: 'in-person',
    state: 'confirmed',
    subject: 'How the order of the checklist is decided.',
    bookedOn: 'Jun 1',
  },
  {
    id: 'appt-housing',
    typeId: 'enrollment',
    date: '2026-06-12',
    time: '2:00 PM',
    end: '2:30 PM',
    format: 'video',
    state: 'cancelled',
    cancelledBy: 'you',
    cancelledOn: 'Jun 11',
    subject: 'Whether I can change my housing preference after the deposit.',
    bookedOn: 'Jun 8',
  },
];

/**
 * The state the guardrail is about: a booking that never reached the team. It stays in the list
 * saying exactly that, because the alternative — removing it — leaves a student who remembers
 * booking something and cannot find it.
 */
export const failedAppointment = {
  id: 'appt-aid-failed',
  typeId: 'financial-aid',
  date: '2026-06-17',
  time: '11:00 AM',
  end: '11:30 AM',
  format: 'video',
  state: 'failed',
  subject: 'Why my aid still says pending three weeks after I sent the tax return.',
  attemptedOn: 'yesterday',
};

/**
 * A time request, sent and not yet answered — A7. It carries what was asked (`window`, in the
 * student's words), what it is about, and the day it was sent; it has no time, because the team
 * has not given one. The `requested` preview state seeds it so the badge, the row and the rail's
 * waiting card can be looked at without sending one.
 */
export const pendingRequest = {
  id: 'req-academic',
  typeId: 'academic',
  state: 'requested',
  date: null,
  window: 'Any weekday afternoon after my orientation session on Jul 14, ideally a Tuesday or a Wednesday.',
  subject: 'Which courses I should take first if I might switch to a double major.',
  requestedOn: 'Jun 12',
};

/** Who stands behind the times on this page, for the rail's permanent card. */
export const schedulingPublisher = {
  system: 'Aster scheduling',
  updated: '20 minutes ago',
};
