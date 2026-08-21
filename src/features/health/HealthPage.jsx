import { useEffect, useState } from 'react';
import { enrollmentAdvisor } from '../enrollment/data.js';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import RecordCard from './RecordCard.jsx';
import HealthRail from './HealthRail.jsx';
import DocumentDrawer from '../documents/DocumentDrawer.jsx';
import { filesLabel } from '../documents/logic.js';
import { healthStanding } from './logic.js';
import { registration } from '../registration/data.js';

/**
 * Health — ENR-206, behaviour from ENR-205, ENR-208 and ENR-209.
 *
 * One block: the immunization record, a card with a banded head, a state chip
 * and a history. The accommodation question ENR-206 built beside it moved to a
 * section of its own, Accessibility, on 2026-08-21 (ADR-0003): filed under
 * Health it read as a medical matter, which is the one thing the question says
 * Aster is not asking about.
 *
 * The section's one figure is the **record's state** and nothing else.
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
  ['ready', 'Ready', 'A record still to send.'],
  ['empty', 'Nothing sent yet', 'The health step skipped at onboarding: no record.'],
  ['health-returned', 'Record came back', 'A record sent back with a reason.'],
  ['health-settled', 'Record accepted', 'The record accepted, and the section still shows it.'],
  ['send-fails', 'Sending fails', 'The next thing you send doesn’t reach Aster.'],
  ['partial', 'Partial data', 'The record couldn’t be read.'],
  ['loading', 'Loading', 'Before your health record arrives.'],
  ['error', 'Error', 'The section couldn’t be loaded at all.'],
];

export default function HealthPage({
  destination,
  previewState = 'ready',
  requirement,
  task,
  sendingId = null,
  failedId = null,
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
              body: `The one health record Aster must hold before term. ${registration.label[0].toUpperCase()}${registration.label.slice(1)} stays shut until an office has accepted it. Sending it is not the same as it being accepted.`,
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
                `${channel === 'email' ? 'An email' : 'A message'} about your record would open here. Nothing is sent yet.`,
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
