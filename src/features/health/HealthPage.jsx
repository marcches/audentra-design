import { useEffect, useState } from 'react';
import EntryCard from '../../design-system/patterns/EntryCard.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import { destinationById } from '../../lib/navigation.js';
import RecordCard from './RecordCard.jsx';
import HealthRail from './HealthRail.jsx';
import DocumentDrawer from '../documents/DocumentDrawer.jsx';
import { filesLabel } from '../documents/logic.js';
import { healthStanding } from './logic.js';

/**
 * Health — ENR-206, behaviour from ENR-205, ENR-208 and ENR-209.
 *
 * One block: the immunization record, a card with a banded head, a state chip
 * and a history. The accommodation question ENR-206 built beside it moved to a
 * section of its own, Accessibility, on 2026-08-21 (ADR-0003): filed under
 * Health it read as a medical matter, which is the one thing the question says
 * Aster is not asking about. It has no sidebar row — the sidebar is the Jam's
 * list — so the entry card under the record is its way in.
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
  const accessibility = destinationById('accessibility');
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
      /* No summary panel, since the Jam of 2026-08-21, and this was the clearest
         case of the four: the panel said `Immunization record / In review / you
         need this before you can register`, and `RecordCard` — the only card on
         the page, immediately below — says the same three things as its
         heading, its state chip and its gate chip. A panel is the section's
         standing where the content below is a list of things; where the content
         *is* the one thing, the panel is that thing read twice. */
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

      <EntryCard
        id="accessibility"
        icon={accessibility.icon}
        title={accessibility.label}
        note={accessibility.lede}
        standing="Yours to answer, or not. Not right now is a complete answer, and nothing here is a medical matter."
        href={accessibility.route}
        action="Open Accessibility"
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
