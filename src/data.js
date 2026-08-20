export const TOTAL_STEPS = 12;

export const initialTasks = [
  {
    id: 'deposit',
    category: 'Your offer',
    title: 'Lock in your place',
    description:
      'Pay your $500 enrollment deposit to confirm that you’re joining Aster’s incoming class.',
    due: 'Nov 16',
    daysLeft: 100,
    points: 100,
    tomorrow: 99,
    minutes: 4,
    action: 'Pay deposit',
    kind: 'external',
    priority: 'critical',
    unlocks: 3,
    why: 'This confirms your enrollment and opens housing, advising, and orientation.',
    steps: [
      'Continue to Aster’s secure payment page.',
      'Pay by card or bank transfer.',
      'Come back anytime—Audentra will mark this complete automatically.',
    ],
  },
  {
    id: 'profile',
    category: 'About you',
    title: 'Finish the details you skipped',
    description:
      'Add the contact details you didn’t have during welcome setup. It’s okay to update them later.',
    due: 'Nov 23',
    daysLeft: 107,
    points: 72,
    tomorrow: 71,
    minutes: 2,
    action: 'Add details',
    kind: 'profile',
    priority: 'soon',
    why: 'Aster needs a reliable way to reach you with time-sensitive enrollment updates.',
    steps: [
      'Confirm your mobile number.',
      'Add an emergency contact.',
      'Review your preferred name and mailing address.',
    ],
  },
  {
    id: 'health',
    category: 'Health & wellness',
    title: 'Share your health records',
    description:
      'Upload your immunization record so Aster University Health Services can verify the required vaccines before arrival.',
    due: 'Nov 30',
    daysLeft: 114,
    points: 83,
    tomorrow: 82,
    minutes: 5,
    action: 'Upload record',
    kind: 'upload',
    priority: 'soon',
    why: 'Submitting early leaves time to resolve a missing dose or incomplete record before move-in.',
    steps: [
      'Ask your doctor for a current immunization record.',
      'Upload a clear PDF, JPG, or PNG.',
      'Health Services will review it in 2–3 business days.',
    ],
  },
  {
    id: 'housing',
    category: 'Campus life',
    title: 'Tell us where you’ll live',
    description:
      'Let Aster know whether you plan to live on campus, commute, or need help deciding.',
    due: 'Dec 15',
    daysLeft: 129,
    points: 68,
    tomorrow: 67,
    minutes: 3,
    action: 'Choose housing plan',
    kind: 'form',
    priority: 'normal',
    unlocks: 1,
    why: 'Your answer opens the right housing or commuter next steps.',
    steps: [
      'Choose the option that best matches your current plan.',
      'If you’re unsure, select ‘Help me decide.’',
      'You can change your answer before the housing deadline.',
    ],
  },
];

export const lockedTasks = [
  {
    title: 'Choose your move-in time',
    description: 'Your arrival window will appear after your housing plan is confirmed.',
    prerequisite: 'Complete ‘Tell us where you’ll live’ first',
    due: 'Jan 12',
  },
  {
    title: 'Meet your academic adviser',
    description: 'We’ll show available advisers after Aster assigns your academic program.',
    prerequisite: 'Waiting for program assignment',
    due: 'Date coming soon',
  },
];

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
    points: 60,
  },
];

export const housingOptions = [
  ['on-campus', 'I plan to live on campus', 'Show me Aster housing options'],
  ['commute', 'I plan to commute', 'Share commuter resources with me'],
  ['unsure', 'I’m not sure yet', 'Help me compare my options'],
];
