import { useEffect, useState } from 'react';
import Card, { CardRows } from '../../design-system/primitives/Card.jsx';
import StatusPill from '../../design-system/primitives/StatusPill.jsx';
import ActionBand from '../../design-system/patterns/ActionBand.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import EntryRow from '../../design-system/patterns/EntryRow.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import { panelById } from '../../lib/navigation.js';
import { enrollmentAdvisor } from '../enrollment/data.js';
import { configFor, isGating } from '../registration/logic.js';
import RecordCard from './RecordCard.jsx';
import RecordHistory from './RecordHistory.jsx';
import HealthRail from './HealthRail.jsx';
import AccessibilityPanel from '../accessibility/AccessibilityPanel.jsx';
import DocumentDrawer from '../documents/DocumentDrawer.jsx';
import { filesLabel } from '../documents/logic.js';
import { bandFor, questionStanding, recordStanding } from './logic.js';

/**
 * Health — ENR-206, behaviour from ENR-205, ENR-208 and ENR-209; reshaped by
 * the changes of 2026-08-21 (`.scratch/ENR-206-health/health-changes-2026-08-21.md`).
 *
 * The page carries **two things** and, until that evening, was written as
 * though it carried one: the record had the title, the subtitle, the rail and
 * the only visible action, and the accessibility question sat behind a
 * one-word control with nothing outside it saying it existed. Now:
 *
 *   - the **panel** is back (the Jam of 2026-08-21 had removed it as "the one
 *     card read twice"; a page of two things is summarised, not repeated): the
 *     record's state as the figure — the pill and its consequence, H8's order —
 *     the deadline with days under it, and the enrollment advisor, with the
 *     one line that says what he is for here. Its **foot** is the question's
 *     state, and that is all the question is on the panel: a line, not a
 *     figure, not a badge, not a count (ADR-0003, amended that evening);
 *   - the **door** to the question carries its state on its face and says what
 *     it opens (*See the question* / *See your answer*), so a student who never
 *     opens it still knows the question exists and whether she answered. It
 *     still opens the side panel — Marco's decision of that afternoon, the
 *     portal's one way of opening what lives inside a page — not an accordion;
 *   - the page has **one band** (`bandFor`): on the record while the record
 *     needs her, on the door once — and only once — when the record needs
 *     nothing and the question was never answered, nowhere when both are
 *     settled;
 *   - the pages she sent are a **card of their own** under the record, one row
 *     per page with its own state, so the page that came back is identifiable
 *     from its row (`RecordHistory`).
 *
 * No tabs. Health is a destination, not a group, and an obligation must not be
 * able to hide behind a tab nobody opened.
 *
 * The record itself lives in `App` — it is the same object My Documents renders,
 * and the send and its clock run there so that leaving this page does not stop
 * them. The answer lives there too and reaches no other module (ADR-0001). What
 * is local here is what is local to a visit: which overlay is open.
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
  ['empty', 'Nothing sent yet', 'The health step skipped at onboarding: no record, and the question still open.'],
  ['health-returned', 'Record came back', 'A record sent back with a reason.'],
  ['health-settled', 'Record accepted', 'The record accepted and the accommodation question answered, and the section still shows both.'],
  ['send-fails', 'Sending fails', 'The next thing you send — a record, or an answer to the question — doesn’t reach Aster.'],
  ['partial', 'Partial data', 'Neither the record nor your answer could be read.'],
  ['loading', 'Loading', 'Before your health record arrives.'],
  ['error', 'Error', 'The section couldn’t be loaded at all.'],
];

/** The one line the advisor bar may add, and only here — H2, rule 1. */
const ADVISOR_SCOPE =
  'For anything about enrollment. He isn’t part of your health record or your accessibility answer.';

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
  onContact = () => {},
  answer,
  savingAnswer = false,
  answerFailed = null,
  onAnswer = () => {},
  onRetry = () => {},
}) {
  const accessibility = panelById('accessibility');
  const [open, setOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  const unavailable = previewState === 'partial';

  useEffect(() => {
    setOpen(false);
    setAccessOpen(false);
  }, [previewState]);

  // Either panel is an overlay App has to hear about, so Edward stands down for
  // it — ENR-181. The record drawer opens from the card, the question from the
  // door under it; they are never both open, because each is opened from the
  // page and the page is behind whichever one is up.
  useEffect(() => {
    onOverlay(open || accessOpen);
  }, [open, accessOpen, onOverlay]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const gating = requirement ? isGating(requirement.id, configFor(previewState)) : false;
  const record = recordStanding({ requirement, task, gating, unavailable });
  const question = questionStanding({ answer, unavailable });
  const band = bandFor({ state: record.state, answer, gating, unavailable });

  return (
    <PageShell
      destination={destination}
      summaryLabel="Health standing"
      summary={
        <>
          {/* The record is the figure: the pill, then the consequence, on one
              line — the same order the record card says it in, so the panel is
              the summary of the card and not a second vocabulary for it. The
              line under it is the deadline while she holds the record, the
              office's usual time while they do. `partial` claims nothing. */}
          <SummaryFigure
            label="Immunization record"
            figure={
              record.pill ? (
                <>
                  <StatusPill tone={record.pill.tone} pulse={record.pill.pulse}>
                    {record.pill.label}
                  </StatusPill>
                  {record.consequence ? (
                    <span className="figure-consequence">{record.consequence}</span>
                  ) : null}
                </>
              ) : (
                record.figure
              )
            }
          >
            {record.line}
          </SummaryFigure>
          <AdvisorBar advisor={enrollmentAdvisor} note={ADVISOR_SCOPE} onContact={onContact} />
        </>
      }
      /* The foot of the panel is the question's state, said once, quietly, with
         no action: the door two cards down is where it opens. Not a figure and
         not a count — a line that says the second thing on this page exists
         and whether it was answered. */
      notice={
        <Notice tone="quiet" icon="accessibility">
          {question.foot}
        </Notice>
      }
      rail={<HealthRail unavailable={unavailable} onToast={onToast} />}
    >
      <RecordCard
        requirement={requirement}
        task={task}
        previewState={previewState}
        unavailable={unavailable}
        band={band?.kind === 'record' ? band : null}
        onOpen={() => setOpen(true)}
        onRetry={onRetry}
      />

      {/* Everything she has sent, one row per page — and not drawn at all while
          nothing has been sent. */}
      {!unavailable && requirement && (requirement.submissions?.length ?? 0) > 0 ? (
        <RecordHistory requirement={requirement} onReplace={() => setOpen(true)} />
      ) : null}

      {/* The door to Accessibility, and it is a door and not a second card.
          Drawn at the record's weight it read as a second obligation, which is
          the one thing this question must never look like (ADR-0001, ENR-208
          AC 3). One row, no head, because the row says everything a head would
          — and since the changes of 2026-08-21 it says the one more thing it
          owed her: whether the question was answered, with *optional* in the
          same breath. The band above it is the page's pointer in the one case
          the rule sends it here. */}
      <Card>
        {band?.kind === 'question' ? <ActionBand icon={band.icon} label={band.label} /> : null}
        <CardRows>
          <EntryRow
            icon={accessibility.icon}
            title={accessibility.label}
            note={accessibility.lede}
            status={
              question.pill ? (
                <>
                  <StatusPill tone={question.pill.tone}>{question.pill.label}</StatusPill>
                  {question.consequence}
                </>
              ) : (
                question.consequence
              )
            }
            where={question.where}
            onOpen={() => setAccessOpen(true)}
          />
        </CardRows>
      </Card>

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

      {accessOpen && (
        <AccessibilityPanel
          answer={answer}
          saving={savingAnswer}
          failed={Boolean(answerFailed)}
          unavailable={unavailable}
          onAnswer={onAnswer}
          onRetry={() => (unavailable ? onRetry() : onAnswer(answerFailed))}
          onClose={() => setAccessOpen(false)}
        />
      )}
    </PageShell>
  );
}
