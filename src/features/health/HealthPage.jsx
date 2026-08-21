import { useEffect, useState } from 'react';
import { enrollmentAdvisor } from '../enrollment/data.js';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import RecordCard from './RecordCard.jsx';
import AccommodationCard from './AccommodationCard.jsx';
import HealthRail from './HealthRail.jsx';
import DocumentDrawer from '../documents/DocumentDrawer.jsx';
import { filesLabel } from '../documents/logic.js';
import { healthStanding } from './logic.js';
import { registration } from '../registration/data.js';

/**
 * Health — ENR-206, behaviour from ENR-205, ENR-208 and ENR-209.
 *
 * Two blocks that share a screen and share nothing else, in the order that keeps
 * them apart: the record first, because it is the one with an obligation and a
 * date, then the question, which is optional and belongs to another team
 * entirely. The construction does the separating — a card with a banded head, a
 * state chip and a history, then a card with no band at all that opens in prose.
 *
 * The section's one figure is the **record's state**. The accommodation answer
 * is deliberately not an input to it: keeping it out of the summary is how
 * "answered no is not outstanding" becomes structural instead of a rule someone
 * has to remember every time a count is written (ENR-208 AC 3).
 *
 * No tabs. Health is a destination, not a group, and an obligation must not be
 * able to hide behind a tab nobody opened.
 *
 * The record itself lives in `App` — it is the same object My Documents renders,
 * and the send and its clock run there so that leaving this page does not stop
 * them. What is local here is what is local to a visit: which overlay is open.
 *
 * `loading` and `error` are the frame's and never reach this component.
 */

/** The states this section adds to the frame's. */
export const HEALTH_PREVIEW_STATES = [
  // `ready` leaves the record unsent on purpose: the checklist still carries the
  // health step, and a record shown as in review here while My Enrollment asks
  // for it would be the portal disagreeing with itself. Sending it from this
  // state is also the live demonstration of the wait — checking runs on the
  // clock, and `in review` is what it lands in and stays in.
  ['ready', 'Ready', 'A record still to send, and “not right now” answered at onboarding.'],
  ['empty', 'Nothing answered yet', 'The health step skipped at onboarding: an open question, no record.'],
  ['health-returned', 'Record came back', 'A record sent back with a reason, and a yes already with Accessibility Services.'],
  ['health-settled', 'Both resolved', 'Record accepted, question answered — and the section still shows both.'],
  ['send-fails', 'Sending fails', 'The next thing you send does not reach Aster.'],
  ['partial', 'Partial data', 'One half of the section could not be read.'],
  ['loading', 'Loading', 'Before your health record arrives.'],
  ['error', 'Error', 'The section could not be loaded at all.'],
];

export default function HealthPage({
  destination,
  previewState = 'ready',
  requirement,
  task,
  answer,
  savingAnswer = false,
  answerFailed = null,
  sendingId = null,
  failedId = null,
  onAnswer = () => {},
  onSubmit = () => {},
  onToast = () => {},
  onOverlay = () => {},
  onRetry = () => {},
}) {
  const [open, setOpen] = useState(false);

  const unavailable = previewState === 'partial';

  useEffect(() => {
    setOpen(false);
  }, [previewState]);

  useEffect(() => {
    onOverlay(open);
  }, [open, onOverlay]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const standing = healthStanding({ requirement, unavailable });

  return (
    <PageShell
      destination={destination}
      summaryLabel="Your health section"
      summary={
        <>
          <SummaryFigure
            label={standing.label}
            explain={{
              title: 'Your immunization record',
              body: `The one health record Aster must hold before term. ${registration.label[0].toUpperCase()}${registration.label.slice(1)} stays shut until an office has accepted it — sending it is not the same as it being accepted.`,
            }}
            // `partial`: no figure at all rather than a zero or a "not sent",
            // either of which would be a claim about a record we could not read
            // (ENR-205 Scenario 5).
            figure={standing.figure ?? 'Not available'}
          >
            {standing.line ??
              'Your record could not be read just now, so nothing here is shown as done or as outstanding.'}
          </SummaryFigure>
          <AdvisorBar
            advisor={enrollmentAdvisor}
            onContact={(channel) =>
              onToast(
                `${channel === 'email' ? 'An email' : 'A message'} about your record would open here — nothing is sent yet.`,
              )
            }
          />
        </>
      }
      rail={<HealthRail unavailable={unavailable} onToast={onToast} />}
    >
      <RecordCard
        requirement={requirement}
        task={task}
        previewState={previewState}
        unavailable={unavailable}
        onOpen={() => setOpen(true)}
        onRetry={onRetry}
      />

      <AccommodationCard
        answer={answer}
        saving={savingAnswer}
        failed={Boolean(answerFailed)}
        unavailable={unavailable}
        onAnswer={onAnswer}
        onRetry={() => (unavailable ? onRetry() : onAnswer(answerFailed))}
      />

      {open && requirement && (
        <DocumentDrawer
          requirement={requirement}
          task={task}
          // This section owns the record's door, so the drawer offers the field
          // here instead of routing somewhere else for it.
          atDoor
          sending={sendingId === requirement.id}
          failed={failedId === requirement.id}
          onClose={() => setOpen(false)}
          onSubmit={(item, files) => onSubmit(item, files, () => setOpen(false))}
          onRetry={(item, files) => onSubmit(item, files, () => setOpen(false))}
          onOriginal={(submission) =>
            onToast(`${filesLabel(submission)} would open exactly as you sent it.`)
          }
          onOpenStep={() => setOpen(false)}
        />
      )}
    </PageShell>
  );
}

/** Named for the toast the page raises when an answer lands. */
export function answerToast(answer, office) {
  return answer === 'yes'
    ? { title: `${office} has your name.`, body: 'They will reach out before term starts.' }
    : {
        title: 'Saved as your current answer.',
        body: 'Nothing is pending, and you can change it whenever you like.',
      };
}
