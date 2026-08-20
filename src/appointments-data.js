// Appointments — ENR-183, behaviour from ENR-178.
//
// Two kinds of thing live here and they must not be confused. **Availability** is published by a
// team: the portal reads it and never writes it. **Appointments** are the student's, created only
// by taking one of those published times. There is deliberately no shape in this file that could
// hold a time the student invented, because the whole point of the card is that they cannot.
//
// The people are the ones the student already knows — Tomás from My Enrollment, Amara from My
// Financials — so booking a conversation is booking time with a name, not with an office.

import { enrollmentAdvisor, financialAidAdvisor } from './data.js';

/** The course advisor. Only this section knows her, so she is declared here. */
export const courseAdvisor = {
  name: 'Ines Barros',
  initials: 'IB',
  office: 'Academic Advising, Computer Science',
  label: 'Your course advisor',
  intro:
    'Ines advises Computer Science students on which courses satisfy which requirement, and on what a term should look like.',
  location: { building: 'Ferrand Building', where: 'second floor' },
  hours: { window: '10:00 AM–3:00 PM', days: 'Tuesday to Thursday' },
};

/**
 * The three conversations a student can book. The type is what decides which team receives the
 * booking — ENR-178 AC 2 — so the team is a property of the type, never something the student
 * picks separately and could get wrong.
 */
export const conversationTypes = [
  {
    id: 'enrollment',
    label: 'Enrollment step',
    blurb: 'A step on your checklist that is blocked, unclear, or that you would rather do with someone.',
    team: 'Admissions Office',
    person: enrollmentAdvisor,
    duration: '30 minutes',
    place: 'Building C, ground floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    publishes: 'Tomás publishes his times every Monday, two weeks ahead.',
    otherRoute: 'Email the Admissions Office',
  },
  {
    id: 'financial-aid',
    label: 'Financial aid',
    blurb: 'Your package, what a figure means, or what happens to it if something changes.',
    team: 'Student Financial Services',
    person: financialAidAdvisor,
    duration: '30 minutes',
    place: 'Building A, ground floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    publishes: 'Student Financial Services opens its calendar a fortnight ahead.',
    otherRoute: 'Email Student Financial Services',
  },
  {
    id: 'academic',
    label: 'Academic advising',
    blurb: 'Which courses satisfy which requirement, and what your first term should hold.',
    team: 'Academic Advising, Computer Science',
    person: courseAdvisor,
    duration: '45 minutes',
    place: 'Ferrand Building, second floor',
    videoNote: 'A link reaches your Aster address the morning of the conversation.',
    // The reason this team has published nothing. Without it the empty picker would be a shrug.
    publishes: 'Course advisors publish their times once course registration opens on 1 September.',
    otherRoute: 'Email Academic Advising',
  },
];

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
      date: '2026-08-21',
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
      date: '2026-08-24',
      slots: [
        { id: 'enr-24-0900', time: '9:00 AM', end: '9:30 AM', format: 'in-person' },
        { id: 'enr-24-0930', time: '9:30 AM', end: '10:00 AM', format: 'video' },
      ],
    },
    {
      date: '2026-08-26',
      slots: [
        { id: 'enr-26-1030', time: '10:30 AM', end: '11:00 AM', format: 'in-person' },
        { id: 'enr-26-1100', time: '11:00 AM', end: '11:30 AM', format: 'in-person' },
        { id: 'enr-26-1330', time: '1:30 PM', end: '2:00 PM', format: 'video' },
        { id: 'enr-26-1600', time: '4:00 PM', end: '4:30 PM', format: 'in-person' },
      ],
    },
    {
      // Afternoons only — the mirror case.
      date: '2026-08-28',
      slots: [
        { id: 'enr-28-1500', time: '3:00 PM', end: '3:30 PM', format: 'in-person' },
        { id: 'enr-28-1530', time: '3:30 PM', end: '4:00 PM', format: 'in-person' },
        { id: 'enr-28-1600', time: '4:00 PM', end: '4:30 PM', format: 'video' },
      ],
    },
  ],
  'financial-aid': [
    {
      date: '2026-08-25',
      slots: [
        { id: 'aid-25-1100', time: '11:00 AM', end: '11:30 AM', format: 'video' },
        { id: 'aid-25-1130', time: '11:30 AM', end: '12:00 PM', format: 'in-person' },
        { id: 'aid-25-1300', time: '1:00 PM', end: '1:30 PM', format: 'in-person' },
        { id: 'aid-25-1330', time: '1:30 PM', end: '2:00 PM', format: 'video' },
      ],
    },
    {
      date: '2026-08-27',
      slots: [
        { id: 'aid-27-0900', time: '9:00 AM', end: '9:30 AM', format: 'in-person' },
        { id: 'aid-27-0930', time: '9:30 AM', end: '10:00 AM', format: 'in-person' },
        { id: 'aid-27-1000', time: '10:00 AM', end: '10:30 AM', format: 'video' },
      ],
    },
    {
      date: '2026-09-02',
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
 * and nothing is booked, `cancelled` means it was called off after being booked. What a confirmed
 * appointment in the past is called is derived from the date, not stored — see `lib/appointments.js`.
 */
export const bookedAppointments = [
  {
    id: 'appt-transcript',
    typeId: 'enrollment',
    date: '2026-08-27',
    time: '10:30 AM',
    end: '11:00 AM',
    format: 'in-person',
    state: 'confirmed',
    subject: 'Whether the transcript I uploaded is the one Admissions needs.',
    bookedOn: '18 August',
  },
  {
    id: 'appt-loan',
    typeId: 'financial-aid',
    date: '2026-09-01',
    time: '3:30 PM',
    end: '4:00 PM',
    format: 'video',
    state: 'confirmed',
    subject: 'What happens to my first payment if the federal loan is still pending.',
    bookedOn: '19 August',
  },
  {
    id: 'appt-checklist',
    typeId: 'enrollment',
    date: '2026-08-11',
    time: '9:00 AM',
    end: '9:30 AM',
    format: 'in-person',
    state: 'confirmed',
    subject: 'How the order of the checklist is decided.',
    bookedOn: '6 August',
  },
  {
    id: 'appt-housing',
    typeId: 'enrollment',
    date: '2026-08-14',
    time: '2:00 PM',
    end: '2:30 PM',
    format: 'video',
    state: 'cancelled',
    cancelledBy: 'you',
    cancelledOn: '13 August',
    subject: 'Whether I can change my housing preference after the deposit.',
    bookedOn: '10 August',
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
  date: '2026-08-25',
  time: '11:00 AM',
  end: '11:30 AM',
  format: 'video',
  state: 'failed',
  subject: 'Why my aid still says pending three weeks after I sent the tax return.',
  attemptedOn: 'yesterday',
};

/** Who stands behind the times on this page, for the rail. */
export const schedulingPublisher = {
  system: 'Aster scheduling',
  updated: '20 minutes ago',
  note: 'Each team publishes its own times. Nothing here is offered on a team’s behalf.',
};
