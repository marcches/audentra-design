// Campus life is institution-published content, not student data. Staff publish it through the
// Campus life editor; the portal only projects it. Nothing here is authored by the student and
// nothing here writes back to their record.

export const CAMPUS_TODAY = '2026-08-20';

export const studentInterests = ['Music', 'Volunteering'];

export const campusPublisher = {
  office: 'Aster Student Life',
  coordinator: { name: 'Priya Raman', role: 'Student Life coordinator' },
  updated: '2 hours ago',
};

export const campusEvents = [
  {
    id: 'orientation',
    title: 'New Student Orientation',
    category: 'Orientation',
    interests: [],
    required: true,
    requiredBy: 'Aster Registrar',
    requiredNote:
      'Every new student attends one orientation session. If you miss all of them, the Registrar holds your course registration until you attend a make-up session.',
    date: '2026-09-03',
    time: '9:00 AM – 4:00 PM',
    location: 'Whitfield Hall · Main campus',
    format: 'in-person',
    host: 'Student Life',
    summary: 'A full day of introductions, campus tours and your first advising conversation.',
    about:
      'You’ll meet your advising group, walk the campus with a current student, and leave with your library card, your ID and a timetable for your first week. Lunch is provided. Sessions run on three dates and you attend one.',
    registration: {
      kind: 'external',
      label: 'Choose your session',
      detail:
        'Pick one of the three dates on Aster’s events site. Sessions fill up, so earlier is safer.',
    },
  },
  {
    id: 'bbq',
    title: 'Welcome BBQ on the Quad',
    category: 'Social',
    interests: ['Social'],
    date: '2026-08-22',
    time: '6:00 PM – 9:00 PM',
    location: 'The Quad',
    format: 'in-person',
    host: 'Student Life',
    summary: 'Food, music and everyone who arrives before term starts.',
    about:
      'The first thing on the calendar every year. No programme, no speeches — just food from six campus kitchens and a lot of people who also do not know anyone yet.',
    registration: {
      kind: 'walk-in',
      label: 'Just turn up',
      detail: 'No registration. Bring your student ID if you already have it.',
    },
  },
  {
    id: 'choir',
    title: 'Chamber Choir open auditions',
    category: 'Music',
    interests: ['Music'],
    date: '2026-08-25',
    time: '7:30 PM – 9:30 PM',
    location: 'Ferrand Music Building, Room 2',
    format: 'in-person',
    host: 'Aster Chamber Choir',
    summary: 'Open to every student, no sheet music reading required.',
    about:
      'Auditions run in ten-minute slots. Prepare one short piece of anything you like; an accompanist is available if you need one. The choir takes about eighteen new voices each autumn.',
    registration: {
      kind: 'email',
      label: 'RSVP by email',
      detail: 'Email Dana Whitfield to book a slot. Say what you plan to sing.',
      contact: 'Dana Whitfield',
    },
  },
  {
    id: 'foodbank',
    title: 'Campus food bank volunteer shift',
    category: 'Volunteering',
    interests: ['Volunteering'],
    date: '2026-08-27',
    time: '10:00 AM – 1:00 PM',
    location: 'Student Union, lower level',
    format: 'in-person',
    host: 'Campus Food Bank',
    summary: 'Sorting and packing the Saturday delivery boxes.',
    about:
      'Three-hour shifts, no experience needed, training happens on the day. The food bank covers around 240 households a week during term.',
    registration: {
      kind: 'external',
      label: 'Book a shift',
      detail: 'Shifts are booked on the volunteering site and released two weeks ahead.',
    },
  },
  {
    id: 'latenight',
    title: 'Late-night jazz on the lawn',
    category: 'Music',
    interests: ['Music', 'Social'],
    date: '2026-09-05',
    time: '8:00 PM – 11:00 PM',
    location: null,
    format: 'in-person',
    host: 'Aster Student Radio',
    summary: 'Three student bands, blankets encouraged.',
    about:
      'An informal end-of-first-week concert. The location moves depending on the weather and is confirmed on the morning of the event.',
    registration: {
      kind: 'walk-in',
      label: 'Just turn up',
      detail: 'Free and open to students, staff and their guests.',
    },
  },
  {
    id: 'firstgen',
    title: 'First-generation student meetup',
    category: 'Community',
    interests: ['Community'],
    date: '2026-09-08',
    time: '5:00 PM – 6:30 PM',
    location: 'Alcott House lounge',
    format: 'in-person',
    host: 'First-Gen Network',
    summary: 'For students who are the first in their family at university.',
    about:
      'A standing monthly meetup. The September one is deliberately unstructured: coffee, second-year students who have been through the first term, and the questions nobody wants to ask in a lecture hall.',
    registration: {
      kind: 'walk-in',
      label: 'Just turn up',
      detail: 'Drop in at any point. You do not need to stay the whole time.',
    },
  },
  {
    id: 'careerfair',
    title: 'Autumn career fair',
    category: 'Career',
    interests: ['Career'],
    date: '2026-09-17',
    time: '11:00 AM – 4:00 PM',
    location: 'Sports Center, main hall',
    format: 'in-person',
    host: 'Careers Service',
    summary: 'Eighty employers, internships and graduate roles.',
    about:
      'First-year students are welcome and it is the cheapest way to find out what your degree leads to. Bring a printed CV if you have one; the Careers Service reviews CVs at the door from 10:00 AM.',
    registration: {
      kind: 'external',
      label: 'Register to attend',
      detail: 'Registration gives you the employer list and a badge waiting at the entrance.',
    },
  },
  {
    id: 'buildnight',
    title: '24-hour build night',
    category: 'Academic',
    interests: ['Academic'],
    date: '2026-09-19',
    time: '6:00 PM – 6:00 PM',
    location: 'Kessler Lab',
    format: 'in-person',
    host: 'Aster Robotics',
    summary: 'Teams of four, one weekend, whatever you can finish.',
    about:
      'Open to any discipline — last year’s winning team was two historians and a biologist. Food, floor space and a lot of extension cables provided.',
    registration: {
      kind: 'closed',
      label: 'Full',
      detail: 'All 120 places are taken. A waiting list opens one week before the event.',
    },
  },
  {
    id: 'readingday',
    title: 'Reading day: quiet study and free coffee',
    category: 'Wellbeing',
    interests: ['Wellbeing'],
    date: '2026-09-24',
    time: '9:00 AM – 8:00 PM',
    location: 'Ferrand Library, floors 2 and 3',
    format: 'in-person',
    host: 'Student Life',
    summary: 'Silent floors, long tables and someone else paying for the coffee.',
    about:
      'Held before the first assessment deadlines of the term. Two library floors go silent for the day and the café serves free filter coffee from 9:00 AM.',
    registration: {
      kind: 'tba',
      label: 'Details coming',
      detail: null,
    },
  },
  {
    id: 'harvest',
    title: 'Harvest volunteering day',
    category: 'Volunteering',
    interests: ['Volunteering'],
    date: '2026-10-03',
    time: '8:00 AM – 3:00 PM',
    location: 'Meet at North Gate',
    format: 'in-person',
    host: 'Campus Food Bank',
    summary: 'A day on the partner farms that supply the food bank.',
    about:
      'Transport leaves North Gate at 8:00 AM and returns by 3:00 PM. Boots and gloves are provided; bring a waterproof coat and a lunch.',
    registration: {
      kind: 'email',
      label: 'RSVP by email',
      detail: 'Email Miguel Santos to claim one of the forty places on the bus.',
      contact: 'Miguel Santos',
    },
  },
  {
    id: 'openmic',
    title: 'Open mic night',
    category: 'Music',
    interests: ['Music'],
    date: '2026-10-09',
    time: '7:00 PM – 10:00 PM',
    location: 'The Cellar, Student Union',
    format: 'in-person',
    host: 'Aster Student Radio',
    summary: 'Eight-minute slots, sign up on the night.',
    about:
      'Music, comedy, poetry and one person who reads out their worst emails. The sound engineer is a third-year and genuinely good.',
    registration: {
      kind: 'walk-in',
      label: 'Just turn up',
      detail: 'The sign-up sheet goes up at 6:30 PM at the door.',
    },
  },
  {
    id: 'movein',
    title: 'Move-in day walkthrough',
    category: 'Orientation',
    interests: [],
    date: '2026-08-12',
    time: '4:00 PM – 5:00 PM',
    location: 'Online',
    format: 'online',
    host: 'Housing Office',
    summary: 'What arrival day looks like, hour by hour.',
    about:
      'A recorded walkthrough of arrival day: where to park, what to bring, and what the first night in halls actually looks like.',
    registration: {
      kind: 'external',
      label: 'Watch the recording',
      detail: 'The recording stays on Aster’s events site for the rest of the year.',
    },
  },
  {
    id: 'intlwelcome',
    title: 'International student welcome call',
    category: 'Community',
    interests: ['Community'],
    date: '2026-08-06',
    time: '9:00 AM – 10:00 AM',
    location: 'Online',
    format: 'online',
    host: 'International Office',
    summary: 'Visas, arrival, and the questions asked every year.',
    about:
      'The International Office runs this call twice each summer. Both sessions are recorded and the slides are published afterwards.',
    registration: {
      kind: 'external',
      label: 'Watch the recording',
      detail: 'Slides and the recording are on the International Office pages.',
    },
  },
  {
    id: 'summerreading',
    title: 'Summer reading discussion',
    category: 'Academic',
    interests: ['Academic'],
    date: '2026-07-29',
    time: '6:00 PM – 7:30 PM',
    location: 'Online',
    format: 'online',
    host: 'Ferrand Library',
    summary: 'The common reading, discussed before term.',
    about:
      'Every incoming student is sent one book in June. This is the conversation about it, run by two librarians and open to anyone who read it, started it, or did not.',
    registration: {
      kind: 'walk-in',
      label: 'Open to all',
      detail: 'The room was open to anyone with an Aster account.',
    },
  },
];

export const campusOrganisations = [
  {
    id: 'choir-org',
    name: 'Aster Chamber Choir',
    initials: 'AC',
    category: 'Music',
    interests: ['Music'],
    description:
      'Forty voices, two concerts a term, and a reputation for taking beginners seriously. No audition experience needed.',
    meets: 'Tuesdays, 7:30 PM · Ferrand Music Building',
    contact: { name: 'Dana Whitfield', role: 'Faculty adviser', email: 'd.whitfield@aster.edu' },
    latestUpdate: {
      text: 'Auditions for the autumn concert close on 12 September. Slots are going quickly.',
      date: '2026-08-18',
    },
  },
  {
    id: 'foodbank-org',
    name: 'Campus Food Bank',
    initials: 'CF',
    category: 'Volunteering',
    interests: ['Volunteering'],
    description:
      'Student-run since 2019. Packs and delivers weekly boxes to households in the three neighbourhoods around campus.',
    meets: 'Saturdays, 10:00 AM · Student Union, lower level',
    contact: { name: 'Miguel Santos', role: 'Student coordinator', email: 'm.santos@aster.edu' },
    latestUpdate: {
      text: 'We are covering 240 households a week and need six more Saturday volunteers.',
      date: '2026-08-19',
    },
  },
  {
    id: 'firstgen-org',
    name: 'First-Gen Network',
    initials: 'FG',
    category: 'Community',
    interests: ['Community'],
    description:
      'For students who are the first in their family to go to university, and the staff who were too.',
    meets: 'Second Tuesday of the month, 5:00 PM · Alcott House',
    contact: { name: 'Rae Okonjo', role: 'Network chair', email: 'r.okonjo@aster.edu' },
    latestUpdate: null,
  },
  {
    id: 'robotics',
    name: 'Aster Robotics',
    initials: 'AR',
    category: 'Academic',
    interests: ['Academic'],
    description:
      'Builds two competition robots a year and runs an open lab night every Thursday. Every discipline welcome.',
    meets: 'Thursdays, 6:00 PM · Kessler Lab',
    contact: { name: 'Lena Duarte', role: 'Faculty adviser', email: 'l.duarte@aster.edu' },
    latestUpdate: {
      text: 'Build season starts 21 September. The open lab nights run all through August.',
      date: '2026-08-11',
    },
  },
  {
    id: 'outdoors',
    name: 'Outdoors Club',
    initials: 'OC',
    category: 'Sports',
    interests: ['Sports'],
    description:
      'Weekend hikes, two climbing walls and kit you can borrow instead of buy. Trips are subsidised for first-years.',
    meets: 'Wednesdays, 5:30 PM · Sports Center foyer',
    contact: { name: 'Sam Iyer', role: 'Trips secretary', email: 's.iyer@aster.edu' },
    latestUpdate: {
      text: 'Three places left on the September ridge hike. Boots can be borrowed from the kit room.',
      date: '2026-08-17',
    },
  },
  {
    id: 'radio',
    name: 'Aster Student Radio',
    initials: 'SR',
    category: 'Music',
    interests: ['Music'],
    description:
      'Broadcasts eighteen hours a day during term. Runs the open mic night and trains anyone who wants a show.',
    meets: 'Mondays, 7:00 PM · Student Union, studio 3',
    contact: { name: 'Noor Haddad', role: 'Station manager', email: 'n.haddad@aster.edu' },
    latestUpdate: {
      text: 'Applications for autumn shows are open until 5 September. No experience required.',
      date: '2026-08-15',
    },
  },
];

// The card asks the layout to hold four items and forty. `Full board` in the preview state control
// publishes this second wave on top of the set above, so the density is something you can look at
// rather than something the spec claims.
const denseEvents = [
  ['debate', 'Debating Society trials', 'Academic', '2026-08-21', '5:00 PM – 7:00 PM', 'Alcott House, room 4', 'Debating Society', 'walk-in', ['Academic']],
  ['yoga', 'Sunrise yoga on the lawn', 'Wellbeing', '2026-08-23', '7:00 AM – 8:00 AM', 'The Quad', 'Sports Center', 'walk-in', ['Wellbeing']],
  ['filmnight', 'Outdoor film night: Rear Window', 'Social', '2026-08-24', '9:00 PM – 11:00 PM', 'Alcott lawn', 'Film Society', 'walk-in', ['Social']],
  ['bikeclinic', 'Free bike repair clinic', 'Wellbeing', '2026-08-26', '12:00 PM – 4:00 PM', 'North Gate', 'Sustainability Office', 'walk-in', ['Wellbeing']],
  ['orchestra', 'Symphony orchestra reading session', 'Music', '2026-08-28', '6:30 PM – 9:00 PM', 'Ferrand Music Building, hall', 'Aster Orchestra', 'email', ['Music']],
  ['beachclean', 'River clean-up morning', 'Volunteering', '2026-08-29', '9:00 AM – 12:00 PM', 'Meet at Mill Bridge', 'Sustainability Office', 'external', ['Volunteering']],
  ['boardgames', 'Board game marathon', 'Social', '2026-08-30', '2:00 PM – 10:00 PM', 'Student Union, upper hall', 'Games Society', 'walk-in', ['Social']],
  ['labtour', 'Materials lab open tour', 'Academic', '2026-09-01', '3:00 PM – 4:30 PM', 'Kessler Lab', 'School of Engineering', 'external', ['Academic']],
  ['langcafe', 'Language café: nine tables, nine languages', 'Community', '2026-09-02', '6:00 PM – 8:00 PM', 'Student Union café', 'Language Centre', 'walk-in', ['Community']],
  ['climbing', 'Beginner climbing session', 'Sports', '2026-09-04', '5:00 PM – 7:00 PM', 'Sports Center wall', 'Outdoors Club', 'external', ['Sports']],
  ['choirsocial', 'Choir welcome social', 'Music', '2026-09-06', '8:00 PM – 11:00 PM', 'The Cellar, Student Union', 'Aster Chamber Choir', 'walk-in', ['Music']],
  ['tutoring', 'Maths tutoring drop-in opens', 'Academic', '2026-09-07', '1:00 PM – 5:00 PM', 'Ferrand Library, floor 1', 'Maths Department', 'walk-in', ['Academic']],
  ['soupkitchen', 'Evening soup kitchen shift', 'Volunteering', '2026-09-09', '5:30 PM – 8:30 PM', 'St Brigid’s hall, Mill Street', 'Campus Food Bank', 'email', ['Volunteering']],
  ['photowalk', 'Campus photography walk', 'Arts', '2026-09-10', '4:00 PM – 6:00 PM', 'Meet at the library steps', 'Photography Society', 'walk-in', ['Arts']],
  ['startup', 'Student startup pitch night', 'Career', '2026-09-11', '6:00 PM – 9:00 PM', 'Kessler Lab, atrium', 'Careers Service', 'external', ['Career']],
  ['fivea', 'Five-a-side league opens', 'Sports', '2026-09-12', '10:00 AM – 4:00 PM', 'North fields', 'Sports Center', 'external', ['Sports']],
  ['poetry', 'Poetry night: first-years read', 'Arts', '2026-09-14', '7:30 PM – 9:30 PM', 'The Cellar, Student Union', 'Literary Society', 'walk-in', ['Arts']],
  ['mentalhealth', 'Talking about a hard first month', 'Wellbeing', '2026-09-15', '5:00 PM – 6:30 PM', 'Alcott House lounge', 'Counselling Service', 'walk-in', ['Wellbeing']],
  ['radiotraining', 'Radio training: your first show', 'Music', '2026-09-16', '6:00 PM – 8:00 PM', 'Student Union, studio 3', 'Aster Student Radio', 'email', ['Music']],
  ['alumni', 'Alumni evening: five years out', 'Career', '2026-09-18', '6:30 PM – 9:00 PM', 'Whitfield Hall', 'Careers Service', 'external', ['Career']],
  ['gardening', 'Community garden planting day', 'Volunteering', '2026-09-20', '10:00 AM – 2:00 PM', 'East campus garden', 'Sustainability Office', 'walk-in', ['Volunteering']],
  ['jazzband', 'Jazz band open rehearsal', 'Music', '2026-09-21', '7:00 PM – 9:00 PM', 'Ferrand Music Building, room 5', 'Aster Orchestra', 'walk-in', ['Music']],
  ['careercv', 'CV clinic: twenty-minute slots', 'Career', '2026-09-22', '10:00 AM – 4:00 PM', 'Careers Service, Building C', 'Careers Service', 'external', ['Career']],
  ['chess', 'Chess ladder opening night', 'Social', '2026-09-23', '6:00 PM – 10:00 PM', 'Student Union, upper hall', 'Games Society', 'walk-in', ['Social']],
  ['ceramics', 'Ceramics taster workshop', 'Arts', '2026-09-25', '2:00 PM – 5:00 PM', 'Art block, studio 2', 'Art Society', 'closed', ['Arts']],
  ['nightrun', 'Friday night 5k', 'Sports', '2026-09-26', '7:00 PM – 8:30 PM', 'Meet at the Sports Center', 'Running Club', 'walk-in', ['Sports']],
  ['filmfest', 'Student film festival, night one', 'Arts', '2026-09-28', '7:00 PM – 10:30 PM', 'Whitfield Hall', 'Film Society', 'external', ['Arts']],
  ['hackday', 'Accessibility hack day', 'Academic', '2026-09-30', '9:00 AM – 6:00 PM', 'Kessler Lab', 'Aster Robotics', 'external', ['Academic']],
  ['choirconcert', 'Autumn concert: Chamber Choir', 'Music', '2026-10-06', '7:30 PM – 9:30 PM', 'Whitfield Hall', 'Aster Chamber Choir', 'external', ['Music']],
  ['volunteerfair', 'Volunteering fair', 'Volunteering', '2026-10-08', '11:00 AM – 3:00 PM', 'Student Union, main hall', 'Student Life', 'walk-in', ['Volunteering']],
];

const denseOrganisations = [
  ['film-soc', 'Film Society', 'FS', 'Arts', 'Two screenings a week and a 16mm projector nobody is allowed to touch unattended.', 'Thursdays, 8:00 PM · Whitfield Hall', 'Ana Reis', 'President'],
  ['games-soc', 'Games Society', 'GS', 'Social', 'Board games, chess ladder and a lending library of about four hundred titles.', 'Mondays, 6:00 PM · Student Union', 'Tom Baptista', 'Secretary'],
  ['lit-soc', 'Literary Society', 'LS', 'Arts', 'Reading groups, a termly magazine and the poetry nights in the Cellar.', 'Wednesdays, 7:00 PM · Alcott House', 'Iris Nakamura', 'Editor'],
  ['debate-soc', 'Debating Society', 'DS', 'Academic', 'Weekly debates and a competitive team that travels most weekends.', 'Fridays, 5:00 PM · Alcott House', 'Kofi Mensah', 'Convenor'],
  ['running', 'Running Club', 'RC', 'Sports', 'Three paces every session, including one that is genuinely a walk with company.', 'Tuesdays and Fridays, 7:00 PM · Sports Center', 'Elena Popa', 'Captain'],
  ['photo-soc', 'Photography Society', 'PS', 'Arts', 'Darkroom access, monthly walks and equipment you can borrow for a week.', 'Sundays, 2:00 PM · Art block', 'Yusuf Demir', 'Kit officer'],
  ['sustain', 'Sustainability Collective', 'SC', 'Volunteering', 'Runs the community garden, the river clean-ups and the bike repair clinics.', 'Mondays, 5:30 PM · East campus garden', 'Marta Silva', 'Coordinator'],
  ['orchestra-org', 'Aster Orchestra', 'AO', 'Music', 'Full orchestra and a jazz band, both open to players at any level.', 'Wednesdays, 7:00 PM · Ferrand Music Building', 'Peter Lindqvist', 'Conductor'],
  ['lang-club', 'Language Exchange', 'LE', 'Community', 'Nine language tables a week, and volunteers who translate for new arrivals.', 'Wednesdays, 6:00 PM · Student Union café', 'Sofia Marchetti', 'Chair'],
  ['art-soc', 'Art Society', 'AS', 'Arts', 'Open studio, life drawing and the ceramics kiln in the art block basement.', 'Saturdays, 2:00 PM · Art block', 'Grace Adeyemi', 'Studio lead'],
  ['coding', 'Aster Coding Circle', 'CC', 'Academic', 'Weekly build sessions and a mentoring scheme that pairs first and third years.', 'Tuesdays, 6:30 PM · Kessler Lab', 'Hassan Karimi', 'Organiser'],
  ['mind', 'Mind Matters', 'MM', 'Wellbeing', 'Peer support run with the Counselling Service, plus a quiet room open every afternoon.', 'Thursdays, 4:00 PM · Alcott House', 'Bea Fontaine', 'Peer lead'],
];

const REGISTRATION_TEMPLATES = {
  'walk-in': { label: 'Just turn up', detail: 'No registration needed.' },
  external: { label: 'Register to attend', detail: 'Registration opens on Aster’s events site.' },
  email: { label: 'RSVP by email', detail: 'Email the organiser to claim a place.' },
  closed: { label: 'Full', detail: 'Every place is taken. A waiting list opens a week before.' },
  tba: { label: 'Details coming', detail: null },
};

function expandEvent([id, title, category, date, time, location, host, kind, interests]) {
  return {
    id,
    title,
    category,
    interests,
    date,
    time,
    location,
    format: 'in-person',
    host,
    summary: `Published by ${host}.`,
    about: `${title} is published by ${host}. Full details, including anything you need to bring, are on the Aster events site.`,
    registration: {
      kind,
      ...REGISTRATION_TEMPLATES[kind],
      contact: kind === 'email' ? host : undefined,
    },
  };
}

function expandOrganisation([id, name, initials, category, description, meets, contactName, role]) {
  return {
    id,
    name,
    initials,
    category,
    interests: [category],
    description,
    meets,
    contact: {
      name: contactName,
      role,
      email: `${contactName.split(' ')[0].toLowerCase()}@aster.edu`,
    },
    latestUpdate: null,
  };
}

// A busy institution has more than one obligation on the board at once.
const denseRequired = [
  {
    id: 'integrity',
    title: 'Academic integrity briefing',
    category: 'Orientation',
    interests: [],
    required: true,
    requiredBy: 'Aster Registrar',
    requiredNote:
      'Required before your first assessment. The Registrar blocks assessment submission until the briefing is recorded as attended.',
    date: '2026-09-10',
    time: '2:00 PM – 3:30 PM',
    location: 'Whitfield Hall',
    format: 'in-person',
    host: 'Registrar',
    summary: 'What counts as your own work, and what happens when it is not.',
    about:
      'Ninety minutes covering referencing, collaboration and the use of AI tools in assessed work, with the department’s own examples.',
    registration: {
      kind: 'external',
      label: 'Choose your session',
      detail: 'Four sessions run in September. Book the one that fits your timetable.',
    },
  },
  {
    id: 'firesafety',
    title: 'Halls fire safety briefing',
    category: 'Orientation',
    interests: [],
    required: true,
    requiredBy: 'Aster Housing Office',
    requiredNote:
      'Required for every student living in halls. Housing cannot issue your room key until you have attended.',
    date: '2026-09-13',
    time: '11:00 AM – 11:45 AM',
    location: 'Alcott House common room',
    format: 'in-person',
    host: 'Housing Office',
    summary: 'Forty-five minutes, held in your own building.',
    about:
      'Run separately in each hall during the first week. Your building’s time is confirmed by the Housing Office once your room is allocated.',
    registration: {
      kind: 'tba',
      label: 'Details coming',
      detail: null,
    },
  },
];

export const fullBoardEvents = [
  ...campusEvents,
  ...denseRequired,
  ...denseEvents.map(expandEvent),
];
export const fullBoardOrganisations = [
  ...campusOrganisations,
  ...denseOrganisations.map(expandOrganisation),
];
