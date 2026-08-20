/* ------------------------------------------------------------------ *
 * My Documents — ENR-165, behaviour from ENR-157 and ENR-158.
 *
 * Two kinds of thing live on this screen and they share almost nothing.
 *
 * A **document requirement** is a named piece of evidence Aster is waiting for.
 * It is owned by one office, it holds up something, and it carries a history of
 * `submissions` — one per attempt. A submission is never removed: a replacement
 * is appended beside the one it replaces, so a rejection and its reason stay
 * readable after the fix (ENR-158 Scenario 4). That is why `state` is derived
 * from the history in `lib/documents.js` rather than stored here — a stored
 * state and a stored history are two things that can disagree.
 *
 * An **issued document** is a file Aster produced *for* the student. It is
 * read-only, has no state and asks nothing. It shares the screen with the
 * requirements and shares no field with them beyond a name and a date, which is
 * why it is a separate export rather than a requirement with a flag.
 *
 * `taskId` is the one link outward. A requirement that is also a step on the
 * enrollment checklist names the task, and the page reads that task's live
 * deadline and office from `data.js` — never a copy. The count here and the
 * count there are the same number because they are the same object, which is
 * the pattern `DocumentList` established for ENR-160 AC 5.
 *
 * Every office id resolves against `help-data.js`. No sixth office is invented.
 * ------------------------------------------------------------------ */

/**
 * What Aster accepts, per requirement. Stated before the file field, never only
 * in an error — ENR-157 AC 2. The limits differ by requirement, so they are
 * printed from the requirement rather than from one global sentence.
 */
const PDF_IMAGE = { formats: ['PDF', 'JPG', 'PNG'], extensions: '.pdf, .jpg, .png', maxMb: 10 };

export const documentRequirements = [
  {
    id: 'income-verification',
    title: 'Household income verification',
    office: 'financial-services',
    taskId: 'income-verification',
    // ENR-157 AC 1: what is needed, in what format, and why — before the file
    // field, not after a refusal.
    needs: 'Last year’s federal tax return, including every schedule. If nobody in your household filed, a signed statement of non-filing instead.',
    why: 'Aster has to confirm the income you reported before your federal loan can be finalized.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Student Financial Services staff.',
    // ENR-158 AC 6: what acceptance releases, named on the requirement itself so
    // the release is part of the same state change rather than a later surprise.
    unblocks: 'Your federal loan is finalized and its amount joins your balance.',
    // The one requirement that offers extraction. ENR-165's design brief: the
    // result invites correction, and is never confirmed by silence.
    extract: {
      note: 'We read these from the file you sent. Check each one — nothing is saved until you say so.',
      fields: [
        { id: 'tax-year', label: 'Tax year', read: '2025' },
        { id: 'filing-status', label: 'Filing status', read: 'Married filing jointly' },
        { id: 'household-size', label: 'People in household', read: '4' },
        { id: 'agi', label: 'Adjusted gross income', read: '$48,310' },
      ],
    },
    submissions: [
      {
        id: 'income-1',
        fileName: 'household_income_2025.pdf',
        fileSize: '2.4 MB',
        sent: 'Aug 12',
        decision: {
          outcome: 'changes-requested',
          on: 'Aug 15',
          // ENR-158 AC 2 and the épico guardrail: specific, and about this file.
          reason:
            'Pages 3 and 4 are cut off, so Schedule 1 could not be read. The income on page 1 also does not match the figure on your application.',
          // OKX's shape: what would actually satisfy the request, in concrete
          // physical terms, so "try again" is not a guess.
          remedies: [
            'Send every page, including the schedules, with all four corners visible.',
            'Scan or photograph flat — a phone photo is fine if nothing is cropped.',
            'If the income really did change, say so when you send it and Financial Services will reconcile it.',
          ],
          unread: true,
        },
      },
    ],
  },
  {
    id: 'immunization-record',
    title: 'Immunization record',
    office: 'health',
    taskId: 'health',
    needs: 'A current immunization record from your doctor or your previous school, showing each required vaccine and the date it was given.',
    why: 'Health Services has to clear the required vaccines before you can move in.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Health Services staff.',
    unblocks: 'Move-in booking opens once your record clears.',
    submissions: [],
  },
  {
    id: 'final-transcript',
    title: 'Final high school transcript',
    office: 'registrar',
    // The same subject My Enrollment renders as `Aster is reviewing`. It is in
    // review there and in review here because both read the one record.
    reviewOf: 'Final transcript check',
    needs: 'Your final transcript, issued after graduation, sent by your school or uploaded here.',
    why: 'Your offer is conditional on the final record matching what you applied with.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by the Registrar’s office.',
    submissions: [{ id: 'transcript-1', fileName: 'final_transcript.pdf', fileSize: '840 KB', sent: 'Aug 6' }],
  },
  {
    id: 'photo-id',
    title: 'Photo identification',
    office: 'admissions',
    needs: 'A government-issued photo ID — passport, driver’s licence or national ID card.',
    why: 'Aster confirms that the person enrolling is the person who applied.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Admissions staff.',
    submissions: [
      {
        id: 'id-1',
        fileName: 'passport.jpg',
        fileSize: '1.2 MB',
        sent: 'Jul 21',
        decision: { outcome: 'accepted', on: 'Jul 23' },
      },
    ],
  },
  {
    id: 'proof-of-address',
    title: 'Proof of address',
    office: 'housing',
    needs: 'A utility bill, bank statement or lease dated within the last three months, showing your name and address.',
    why: 'Housing uses it to confirm your residency category before assigning a room.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Housing & Residential Life staff.',
    submissions: [
      {
        id: 'address-1',
        fileName: 'utility_bill_june.pdf',
        fileSize: '310 KB',
        sent: 'Jul 28',
        decision: { outcome: 'accepted', on: 'Jul 30' },
      },
    ],
  },
  {
    id: 'english-proficiency',
    title: 'English proficiency result',
    office: 'admissions',
    needs: 'Your official test result, sent by the testing service or uploaded here.',
    why: 'It settles the language requirement on your offer.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Admissions staff.',
    submissions: [
      {
        id: 'english-1',
        fileName: 'toefl_result.pdf',
        fileSize: '190 KB',
        sent: 'Jun 14',
        decision: { outcome: 'accepted', on: 'Jun 17' },
      },
    ],
  },
];

/**
 * What Aster sent *her*. The sidebar promises both directions — "everything you
 * have sent Aster, and everything Aster has sent you" — and this is the second
 * half. It is deliberately not a third card: these rows sit in the same record
 * list as the settled requirements, with the caption on the row saying which way
 * the file went (Gusto). A separate card would say the same thing twice.
 */
export const issuedDocuments = [
  {
    id: 'offer-letter',
    title: 'Your offer of admission',
    office: 'admissions',
    issued: 'Jul 12',
    note: 'The conditions on it, and the date they have to be met by.',
  },
  {
    id: 'aid-award',
    title: 'Financial aid award letter',
    office: 'financial-services',
    issued: 'Aug 3',
    note: 'Every source in your package, and what each one is worth.',
  },
  {
    id: 'immunization-requirements',
    title: 'Required immunizations for 2026–27',
    office: 'health',
    issued: 'Jul 12',
    note: 'What Health Services needs, and what counts as proof of each.',
  },
];

/**
 * One entry per state in the topbar switcher.
 *
 * `empty` is not "nothing here": Aster has asked for things from day one, so it
 * is a record where nothing has been sent and nothing issued yet — which is the
 * honest first day, and the state `navigation.js` describes in `produces`.
 */
export function documentsFor(state) {
  if (state === 'empty') {
    return {
      requirements: documentRequirements.map((item) => ({ ...item, submissions: [] })),
      issued: [],
    };
  }

  if (state === 'changes-requested') {
    // The rejection as the whole subject: the one thing outstanding is the one
    // that came back, so the reason has nowhere to hide.
    return {
      requirements: documentRequirements.map((item) =>
        item.id === 'immunization-record'
          ? {
              ...item,
              submissions: [
                {
                  id: 'immunization-1',
                  fileName: 'immunization_record.pdf',
                  fileSize: '1.8 MB',
                  sent: 'Aug 11',
                  decision: { outcome: 'accepted', on: 'Aug 14' },
                },
              ],
            }
          : item,
      ),
      issued: issuedDocuments,
    };
  }

  return { requirements: documentRequirements, issued: issuedDocuments };
}
