import { useEffect, useState } from 'react';
import { enrollmentAdvisor } from '../enrollment/data.js';
import Icon from '../../design-system/Icon.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import DocumentRow, { IssuedRow } from './DocumentRow.jsx';
import DocumentDrawer from './DocumentDrawer.jsx';
import DocumentsRail from './DocumentsRail.jsx';
import { configFor, isGating } from '../registration/logic.js';
import {
  checkingOne,
  filesLabel,
  needsYou,
  officeOf,
  onRecord,
  rejectedOne,
  standing,
  unreadDecisions,
} from './logic.js';

/**
 * My Documents — ENR-165, behaviour from ENR-157 and ENR-158.
 *
 * The only destination in the portal that four other screens already route to
 * and that could not be used. What it answers is one question in two halves:
 * *did Aster get it*, and *what do I do if it came back*.
 *
 * The page is cut by **who owes the next move**, not by direction of origin
 * ([Revolut](https://mobbin.com/screens/92e54678-09da-479f-8d03-baa0ae45ad12)).
 * One card for what still needs her, one for the record. Files Aster sent *her*
 * live in the second card with the caption on the row saying which way they
 * went ([Gusto](https://mobbin.com/screens/e74f522b-aab3-40de-bb2f-0b6cd895f2b9)),
 * rather than in a third card that would say the same thing twice.
 *
 * No tabs. My Documents is a destination rather than a group, and a rejection
 * must not be able to hide behind a tab nobody opened.
 *
 * `loading` and `error` are the frame's and never reach this component — App
 * renders `PageSkeleton` and `PageError` before dispatching.
 */

/** The states this section adds to the frame's. */
export const DOCUMENT_PREVIEW_STATES = [
  ['ready', 'Ready', 'All four states at once — one back with a reason, one with Aster, three settled.'],
  ['changes-requested', 'One came back', 'A rejection with its reason, as the only thing outstanding.'],
  ['send-fails', 'Sending fails', 'The next thing you send does not reach Aster.'],
  ['empty', 'Nothing sent yet', 'Aster has asked for six things and has none of them.'],
  ['loading', 'Loading', 'Before your record arrives.'],
  ['partial', 'Partial data', 'The record loaded; what Aster decided could not be read.'],
  ['error', 'Error', 'Your record could not be loaded.'],
];

export default function DocumentsPage({
  destination,
  previewState = 'ready',
  record,
  sendingId = null,
  failedId = null,
  tasks = [],
  onSubmit = () => {},
  onMarkRead = () => {},
  onToast = () => {},
  onOverlay = () => {},
  onOpenTask = () => {},
  onRetry = () => {},
}) {
  // ENR-214 AC 1 — a requirement that holds registration is marked here too.
  const gateConfig = configFor(previewState);
  const [openId, setOpenId] = useState(null);

  const unavailable = previewState === 'partial';

  useEffect(() => {
    setOpenId(null);
  }, [previewState]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(openId));
  }, [onOverlay, openId]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  const requirements = record.requirements;
  const byTaskId = Object.fromEntries(tasks.map((task) => [task.id, task]));
  const taskFor = (requirement) => (requirement.taskId ? byTaskId[requirement.taskId] : null);

  // `partial` must never render a decision as a decision: what could not be read
  // is shown as unread, not as settled.
  const mine = unavailable ? [] : needsYou(requirements);
  const settled = unavailable ? [] : onRecord(requirements);
  const issued = unavailable ? [] : record.issued;
  const figures = standing(unavailable ? [] : requirements);

  const rejected = unavailable ? null : rejectedOne(requirements);
  const checking = unavailable ? null : checkingOne(requirements);
  const unread = unavailable ? 0 : unreadDecisions(requirements);
  const open = requirements.find((item) => item.id === openId) ?? null;

  /**
   * The record, the send and the clock all live in `App` since ENR-206, because
   * Health is a second window onto the same requirement and two windows holding
   * two copies is the one way this record can lie. It also fixes what this page
   * could not do alone: the check now survives leaving the page, which is what
   * ENR-157 AC 3 promises in words on the strip below.
   */
  function openDocument(requirement) {
    setOpenId(requirement.id);
    // ENR-158 AC 5, the half this repo can honour: a decision she has not seen
    // is marked, and opening it clears the mark.
    onMarkRead(requirement.id);
  }

  const hero = { lede: heroLede({ unavailable, mine, checking, figures }) };

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summaryLabel="Your record"
      summary={
        <>
          <SummaryFigure
            mark={
              <div className="progress-ring" style={{ '--progress': `${figures.percent * 3.6}deg` }}>
                <span>{Math.round(figures.percent)}%</span>
              </div>
            }
            label="What Aster has accepted"
            figure={
              unavailable ? 'Not available' : `${figures.accepted} of ${figures.total} accepted`
            }
          >
            {standingLine({ unavailable, figures, unread })}
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
      alert={
        rejected ? (
          <div className="alert-strip urgent" role="status">
            <span className="alert-strip-icon" aria-hidden="true">
              <Icon name="alert" size={19} />
            </span>
            <p>
              <strong>{rejected.title} came back</strong>
              {officeOf(rejected).name} sent it back with a reason, and a replacement goes in the
              same place. Nothing else on your record is affected.
            </p>
            <button className="secondary-button" onClick={() => openDocument(rejected)}>
              See why <Icon name="arrow" size={15} />
            </button>
          </div>
        ) : null
      }
      notice={
        checking ? (
          // The permission to leave, stated by the page rather than left for the
          // student to guess — ENR-157 AC 3, drawn by Airwallex.
          <div className="alert-strip checking" role="status">
            <span className="alert-strip-icon" aria-hidden="true">
              <i className="pulse" />
            </span>
            <p>
              <strong>Aster is checking your {checking.title.toLowerCase()}</strong>
              You can close this page or go somewhere else — it keeps going, and this record shows
              where it got to whenever you come back.
            </p>
          </div>
        ) : null
      }
      rail={<DocumentsRail requirements={requirements} unavailable={unavailable} onToast={onToast} />}
    >
      <section className="section-card" aria-labelledby="needs-title">
        <div className="status-heading">
          <span className="status-icon docs">
            <Icon name="file" size={18} />
          </span>
          <div>
            <h2 id="needs-title">What Aster still needs</h2>
            <p>Everything where the next move is yours. Each one says what it is holding up.</p>
          </div>
          {!unavailable && mine.length > 0 && <span className="status-count">{mine.length}</span>}
        </div>

        {unavailable ? (
          <StateCard
            variant="error"
            icon="alert"
            title="We couldn’t read what Aster decided"
            action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
          >
            Your files are safe and nothing has changed on your record. Until this loads, nothing
            here is shown as accepted — an unread decision is not the same as a decision.
          </StateCard>
        ) : mine.length === 0 ? (
          <StateCard variant="empty" icon="check" title="Nothing is waiting on you">
            Every document Aster has asked for is either settled or with Aster. If something comes
            back, it appears here and on your enrollment checklist at the same time.
          </StateCard>
        ) : (
          <div className="card-rows document-list">
            {mine.map((requirement) => (
              <DocumentRow
                key={requirement.id}
                requirement={requirement}
                task={taskFor(requirement)}
                gating={isGating(requirement.id, gateConfig)}
                onOpen={openDocument}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section-card" aria-labelledby="record-title">
        <div className="status-heading">
          <span className="status-icon signpost">
            <Icon name="progress" size={18} />
          </span>
          <div>
            <h2 id="record-title">On the record</h2>
            <p>Everything you have sent Aster, and everything Aster has sent you.</p>
          </div>
        </div>

        {unavailable ? (
          // Not the empty state. "Nothing on the record yet" would be a lie about
          // where her files are — they are on the record; it is the decisions on
          // them that did not load. One loud error above, one quiet caveat here.
          <StateCard variant="empty" icon="alert" title="Your record is here, but not readable yet">
            Nothing has been lost and nothing has changed. The files you sent are on your record — it
            is what Aster decided about them that could not be loaded.
          </StateCard>
        ) : settled.length === 0 && issued.length === 0 ? (
          <StateCard variant="empty" icon="file" title="Nothing on the record yet">
            The first entry arrives when you send something Aster asked for, or when Aster issues you
            a letter. Both land here, and both stay.
          </StateCard>
        ) : (
          <div className="card-rows document-list">
            {settled.length > 0 && (
              <>
                <p className="rows-caption">Sent by you</p>
                {settled.map((requirement) => (
                  <DocumentRow
                    key={requirement.id}
                    requirement={requirement}
                    task={taskFor(requirement)}
                    gating={isGating(requirement.id, gateConfig)}
                    onOpen={openDocument}
                  />
                ))}
              </>
            )}

            {issued.length > 0 && (
              <>
                <p className="rows-caption">Sent to you by Aster</p>
                {issued.map((item) => (
                  <IssuedRow
                    key={item.id}
                    document={item}
                    onOpen={(doc) =>
                      onToast(`${doc.title} would open as a PDF — nothing is downloaded here.`)
                    }
                  />
                ))}
              </>
            )}
          </div>
        )}
      </section>

      {open && (
        <DocumentDrawer
          requirement={open}
          task={taskFor(open)}
          sending={sendingId === open.id}
          failed={failedId === open.id}
          onClose={() => setOpenId(null)}
          onSubmit={(requirement, files) => onSubmit(requirement, files, () => setOpenId(null))}
          onRetry={(requirement, files) => onSubmit(requirement, files, () => setOpenId(null))}
          onOpenStep={(task) => {
            setOpenId(null);
            onOpenTask(task);
          }}
          onOriginal={(submission) =>
            onToast(`${filesLabel(submission)} would open exactly as you sent it.`)
          }
        />
      )}
    </PageShell>
  );
}

/** The band's only dynamic line; everything else about the hero lives in `navigation.js`. */
function heroLede({ unavailable, mine, checking, figures }) {
  if (unavailable) {
    return 'Everything you have sent Aster, and everything Aster has sent you. What Aster decided could not be read just now, so nothing below is shown as settled.';
  }
  if (checking) {
    return 'Something you just sent is still being checked. You can leave this page — it keeps going without you.';
  }
  if (mine.length > 0) {
    return `${mine.length === 1 ? 'One document needs' : `${mine.length} documents need`} something from you. Everything else is either with Aster or settled.`;
  }
  if (figures.withAster > 0) {
    return 'Nothing needs you. What is left is with Aster, and each one says who is holding it.';
  }
  return 'Everything Aster asked for has been accepted. This is the whole record, both directions.';
}

/** The sentence under the figure: what the number means today. */
function standingLine({ unavailable, figures, unread }) {
  if (unavailable) {
    return 'Your files are safe. It is the decisions on them that could not be read.';
  }
  if (figures.total === 0) return 'Aster has not asked you for anything yet.';
  if (unread > 0) {
    return `${unread === 1 ? 'One decision' : `${unread} decisions`} arrived that you have not opened yet.`;
  }
  if (figures.mine > 0 && figures.withAster > 0) {
    return `${figures.mine === 1 ? 'One needs' : `${figures.mine} need`} you · ${figures.withAster} with Aster.`;
  }
  if (figures.mine > 0) {
    return `${figures.mine === 1 ? 'One is' : `${figures.mine} are`} waiting on you. Nothing is with Aster.`;
  }
  if (figures.withAster > 0) {
    return `${figures.withAster === 1 ? 'One is' : `${figures.withAster} are`} with Aster. Nothing needs you.`;
  }
  return 'Every document Aster asked for has been accepted.';
}
