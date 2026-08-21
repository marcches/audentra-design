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
const PDF_IMAGE = {
  formats: ['PDF', 'JPG', 'PNG'],
  extensions: '.pdf, .jpg, .png',
  maxMb: 10,
  maxFiles: 1,
};

/**
 * The immunization record is the one requirement that is physically several
 * pages — a vaccination booklet gets photographed, not scanned — so ENR-209 AC 1
 * gives it eight files and 30 MB. The limits live on the requirement, which is
 * why they can differ without anything else in the portal having to know.
 */
const IMMUNIZATION = {
  formats: ['PDF', 'JPG', 'PNG'],
  extensions: '.pdf, .jpg, .png',
  maxMb: 30,
  maxFiles: 8,
};

export const documentRequirements = [
  {
    id: 'income-verification',
    title: 'Household income verification',
    // The step this document belongs to, in the checklist's words: a task is a
    // verb phrase, a document is a noun phrase (UX writing §3.1).
    step: 'Verify your household income',
    office: 'financial-services',
    taskId: 'income-verification',
    // ENR-157 AC 1: what is needed, in what format, and why — before the file
    // field, not after a refusal.
    needs: 'Last year’s federal tax return, including every schedule. If nobody in your household filed, a signed statement of non-filing instead.',
    why: 'Verification is the check that your reported income matches your tax records. Aster has to finish it before your federal loan can be finalized.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Financial Aid Office staff.',
    // ENR-158 AC 6: what acceptance releases, named on the requirement itself so
    // the release is part of the same state change rather than a later surprise.
    unblocks: 'Your federal loan is finalized and its amount joins your balance.',
    // The one requirement that offers extraction. ENR-165's design brief: the
    // result invites correction, and is never confirmed by silence.
    extract: {
      note: 'Aster read these from the file you sent. Check each one. Nothing is saved until you say so.',
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
        files: [{ name: 'household_income_2025.pdf', size: '2.4 MB' }],
        sent: 'Aug 12',
        decision: {
          outcome: 'changes-requested',
          on: 'Aug 15',
          // ENR-158 AC 2 and the épico guardrail: specific, and about this file.
          reason:
            'Pages 3 and 4 got cut off, so Schedule 1, the extra IRS form, couldn’t be read. The income on page 1 doesn’t match your application. Send all pages again, full page this time.',
          // OKX's shape: what would actually satisfy the request, in concrete
          // physical terms, so "try again" is not a guess.
          remedies: [
            'Send every page, including the schedules, with all four corners visible.',
            'Scan or photograph flat. A phone photo is fine if nothing is cropped.',
            'If the income really did change, say so when you send it and the Financial Aid Office will reconcile it.',
          ],
          unread: true,
        },
      },
    ],
  },
  {
    id: 'immunization-record',
    title: 'Immunization record',
    step: 'Send your immunization record',
    // What the row says while it is still to send: the consequence, with the
    // gate it holds, not the bare fact that an office is waiting (UX writing 5.3).
    neededLine: 'Not sent yet. Health Services needs it before you can register for classes.',
    office: 'health',
    taskId: 'health',
    // ENR-206. The door this requirement is sent from is the Health section, not
    // the checklist step and not My Documents. The rule ENR-165 wrote — a first
    // submission has exactly one place it can be made — is unchanged; this card
    // only moves where that place is, and `doorOf` in `lib/documents.js` is what
    // both screens read so neither can disagree about it.
    door: 'health',
    needs: 'A current immunization record from your doctor or your previous school, showing each required vaccine and the date it was given.',
    why: 'Health Services has to clear the required vaccines before you can register for classes.',
    accepts: IMMUNIZATION,
    privacy: 'Encrypted, and read only by authorized Health Services staff.',
    unblocks: 'Class registration opens once your record clears.',
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
    privacy: 'Encrypted, and read only by the Office of the Registrar.',
    submissions: [
      { id: 'transcript-1', files: [{ name: 'final_transcript.pdf', size: '840 KB' }], sent: 'Aug 6' },
    ],
  },
  {
    id: 'photo-id',
    title: 'Photo identification',
    office: 'admissions',
    needs: 'A government-issued photo ID: passport, driver’s license, or national ID card.',
    why: 'Aster confirms that the person enrolling is the person who applied.',
    accepts: PDF_IMAGE,
    privacy: 'Encrypted, and read only by authorized Admissions staff.',
    submissions: [
      {
        id: 'id-1',
        files: [{ name: 'passport.jpg', size: '1.2 MB' }],
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
    privacy: 'Encrypted, and read only by authorized Housing and Residential Life staff.',
    submissions: [
      {
        id: 'address-1',
        files: [{ name: 'utility_bill_june.pdf', size: '310 KB' }],
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
        files: [{ name: 'toefl_result.pdf', size: '190 KB' }],
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
                  files: [{ name: 'immunization_record.pdf', size: '1.8 MB' }],
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

  // ENR-206. Health's own two. They live here rather than in `health-data.js`
  // because the immunization record is one of these six requirements and not a
  // second copy of one — Health is a window onto this list, not an owner of it.
  if (state === 'health-returned' || state === 'health-settled') {
    const submission =
      state === 'health-settled'
        ? {
            id: 'immunization-1',
            files: [
              { name: 'immunization_page_1.jpg', size: '2.1 MB' },
              { name: 'immunization_page_2.jpg', size: '1.9 MB' },
            ],
            sent: 'Aug 11',
            decision: { outcome: 'accepted', on: 'Aug 16' },
          }
        : {
            id: 'immunization-1',
            files: [
              { name: 'immunization_page_1.jpg', size: '2.1 MB' },
              { name: 'immunization_page_2.jpg', size: '1.9 MB' },
            ],
            sent: 'Aug 11',
            decision: {
              outcome: 'changes-requested',
              on: 'Aug 16',
              // Specific, and about this record: the guardrail of the épico is
              // that a student is never told only that something is wrong.
              reason:
                'The second photograph cuts off the dates beside the MMR and Tdap lines, so neither dose could be read. The first page is fine and is already on your record.',
              // The reason says it and the list has to agree with it — CONTEXT.md,
              // Decision, widened 2026-08-21: one page is on the record, one came back.
              pages: {
                'immunization_page_1.jpg': 'accepted',
                'immunization_page_2.jpg': 'changes-requested',
              },
              remedies: [
                'Photograph the page flat, with all four edges of the sheet visible.',
                'Make sure the date beside every vaccine is legible. That is the part Health Services reads.',
                'Send only the page that came back; the one that was accepted stays where it is.',
              ],
              unread: true,
            },
          };

    return {
      requirements: documentRequirements.map((item) =>
        item.id === 'immunization-record' ? { ...item, submissions: [submission] } : item,
      ),
      issued: issuedDocuments,
    };
  }

  return { requirements: documentRequirements, issued: issuedDocuments };
}
