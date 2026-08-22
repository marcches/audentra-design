import { useEffect, useState } from 'react';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import Icon from '../../design-system/Icon.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import DocumentRow, { IssuedRow } from './DocumentRow.jsx';
import DocumentDrawer from './DocumentDrawer.jsx';
import { configFor, isGating } from '../registration/logic.js';
import {
  checkingOne,
  filesLabel,
  needsYou,
  officeOf,
  onRecord,
  rejectedOne,
  standing,
  standingLede,
} from './logic.js';

/**
 * My Documents — ENR-165, behaviour from ENR-157 and ENR-158, as a panel.
 *
 * It was a page until 2026-08-21. The Jam of that morning moved it under
 * Profile; Marco's remark the same afternoon finished the move: a section with
 * no row in the sidebar must not open a page either, because the portal has one
 * way of opening what lives inside a page and it is the side panel. A page you
 * can only reach from another page is a fourth kind of destination nobody
 * navigates. So the entry card on Profile opens this, `#/profile/documents` is
 * gone, and the record is read where the student already is.
 *
 * What the panel is *not* is the page at 465px. Three things stayed behind:
 *
 *   - the **progress ring**. A figure earns a panel when it is the section's
 *     standing and the content below is the detail. Here the whole panel is a
 *     list of eight rows, and a ring saying `62%` above them is the same eight
 *     rows counted rather than read.
 *   - the **advisor bar**. Reaching Dana is not what this door was opened for,
 *     and she is on My Enrollment, where the steps she can unblock live.
 *   - the **rail**. `With Aster right now` restated the rows below it, and the
 *     retention guardrail moved to where it is actually load-bearing: the foot,
 *     under the record it is about.
 *
 * What is kept is the page's spine, unchanged: cut by **who owes the next
 * move** ([Revolut](https://mobbin.com/screens/92e54678-09da-479f-8d03-baa0ae45ad12)),
 * what still needs her first, then the record with the caption on each run
 * saying which way the file went
 * ([Gusto](https://mobbin.com/screens/e74f522b-aab3-40de-bb2f-0b6cd895f2b9)).
 *
 * Opening a row opens `DocumentDrawer` **on top of this one**, and this one goes
 * `suspended` while it is there — `Esc` unwinds one layer at a time, which is
 * the contract `lib/overlay.js` exists to keep.
 *
 * Since the review of 2026-08-21 (C1.3) Profile is sectioned, and *My documents*
 * is one of its sections: `inline` renders the same runs as a card under the
 * tab row instead of as a side panel, so the record is read where the student
 * already is and reached from a row she can see.
 */
export default function DocumentsPanel({
  previewState = 'ready',
  record,
  sendingId = null,
  failedId = null,
  tasks = [],
  onSubmit = () => {},
  onMarkRead = () => {},
  onToast = () => {},
  onOpenTask = () => {},
  onRetry = () => {},
  onClose = () => {},
  inline = false,
  onOverlay = () => {},
}) {
  // ENR-214 AC 1 — a requirement that holds registration is marked here too.
  const gateConfig = configFor(previewState);
  const [openId, setOpenId] = useState(null);

  const unavailable = previewState === 'partial';

  // The preview control switches the record underneath the panel; a drawer
  // holding a requirement from the old one must not survive onto the new one.
  useEffect(() => {
    setOpenId(null);
  }, [previewState]);

  // Inline, the panel is a section of Profile and the drawer it opens is the
  // overlay App has to hear about (ENR-181); as a panel it is that overlay itself.
  useEffect(() => {
    if (inline) onOverlay(Boolean(openId));
  }, [inline, openId, onOverlay]);

  const requirements = record?.requirements ?? [];
  const byTaskId = Object.fromEntries(tasks.map((task) => [task.id, task]));
  const taskFor = (requirement) => (requirement.taskId ? byTaskId[requirement.taskId] : null);

  // `partial` must never render a decision as a decision: what could not be read
  // is shown as unread, not as settled.
  const mine = unavailable ? [] : needsYou(requirements);
  const settled = unavailable ? [] : onRecord(requirements);
  const issued = unavailable ? [] : (record?.issued ?? []);
  const figures = standing(unavailable ? [] : requirements);

  const rejected = unavailable ? null : rejectedOne(requirements);
  const checking = unavailable ? null : checkingOne(requirements);
  const open = requirements.find((item) => item.id === openId) ?? null;

  /**
   * The record, the send and the clock live in `App` since ENR-206, because
   * Health is a second window onto the same requirement and two windows holding
   * two copies is the one way this record can lie. It also fixes what a page
   * could not do alone: the check survives closing this panel, which is what
   * ENR-157 AC 3 promises in words in the run below.
   */
  function openDocument(requirement) {
    setOpenId(requirement.id);
    // ENR-158 AC 5, the half this repo can honour: a decision she has not seen
    // is marked, and opening it clears the mark.
    onMarkRead(requirement.id);
  }

  return (
    <>
      {inline ? (
        <section className="section-card documents-section" aria-labelledby="documents-section-title">
          <div className="status-heading">
            <span className="status-icon record">
              <Icon name="file" size={18} />
            </span>
            <div>
              <h2 id="documents-section-title">Everything on file</h2>
              <p>{standingLede({ unavailable, mine, checking, figures })}</p>
            </div>
          </div>
        {/* Sent back is the one thing here that is hers to act on and has a
            consequence, so it is the first thing under the sentence. It docks
            into the panel head rather than getting a band of its own. */}
        {rejected && (
          <Notice
            tone="urgent"
            icon="alert"
            title={`${rejected.step ?? rejected.title} · sent back`}
            action={{ label: 'See what to fix', onClick: () => openDocument(rejected) }}
          >
            {officeOf(rejected).name} sent it back and said why. Send a new copy in the same place.
            Nothing else on your record is affected.
          </Notice>
        )}

        <section className="panel-run" aria-labelledby="panel-needs-title">
          <p className="panel-label" id="panel-needs-title">
            <span>What Aster still needs</span>
            {!unavailable && mine.length > 0 && <span className="status-count">{mine.length}</span>}
          </p>

          {unavailable ? (
            <StateCard
              variant="error"
              icon="alert"
              title="What Aster decided couldn’t be read"
              action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
            >
              Your files are safe and nothing has changed on your record. Until this loads, nothing
              here is shown as accepted. An unread decision is not the same as a decision.
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

        <section className="panel-run" aria-labelledby="panel-record-title">
          <p className="panel-label" id="panel-record-title">
            <span>On your record</span>
          </p>

          {/* The permission to leave, stated by the panel rather than left for
              the student to guess — ENR-157 AC 3, drawn by Airwallex. It heads
              this run and not the panel: what is being checked is one row of
              this list, and the row it is about is a few pixels below it. */}
          {checking ? (
            <Notice
              tone="working"
              icon="clock"
              title={`Aster is checking your ${checking.title.toLowerCase()}`}
            >
              You can close this panel or go somewhere else. It keeps going, and your record shows
              where it got to whenever you come back.
            </Notice>
          ) : null}

          {unavailable ? (
            // Not the empty state. "Nothing on the record yet" would be a lie
            // about where her files are — they are on the record; it is the
            // decisions on them that did not load.
            <StateCard variant="empty" icon="alert" title="Your record is here, but not readable yet">
              Nothing has been lost and nothing has changed. The files you sent are on your record.
              It is what Aster decided about them that could not be loaded.
            </StateCard>
          ) : settled.length === 0 && issued.length === 0 ? (
            <StateCard variant="empty" icon="file" title="Nothing on the record yet">
              The first entry arrives when you send something Aster asked for, or when Aster issues
              you a letter. Both land here, and both stay.
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
                        onToast(`${doc.title} would open as a PDF. Nothing is downloaded here.`)
                      }
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </section>

        {/* The retention guardrail. It was a card in the rail, where it stood
            beside the record; here it stands under it, which is the only place
            left that is still about the whole record rather than one row. */}
        <p className="card-foot panel-foot">
          <Icon name="shield" size={14} />
          <span>
            Every file you send is kept exactly as you sent it. Aster never writes over your first
            file — the new one sits next to it, and the reason the first came back stays readable.
          </span>
        </p>
        </section>
      ) : (
      <Drawer
        variant="documents"
        label={['Profile', 'My Documents']}
        titleId="documents-panel-title"
        closeLabel="Close My Documents"
        onClose={onClose}
        suspended={Boolean(open)}
      >
        <div className="drawer-icon">
          <Icon weight="duotone" name="file" size={25} />
        </div>
        <h2 id="documents-panel-title">Everything on file</h2>
        <p className="drawer-description">
          {standingLede({ unavailable, mine, checking, figures })}
        </p>

        {/* Sent back is the one thing here that is hers to act on and has a
            consequence, so it is the first thing under the sentence. It docks
            into the panel head rather than getting a band of its own. */}
        {rejected && (
          <Notice
            tone="urgent"
            icon="alert"
            title={`${rejected.step ?? rejected.title} · sent back`}
            action={{ label: 'See what to fix', onClick: () => openDocument(rejected) }}
          >
            {officeOf(rejected).name} sent it back and said why. Send a new copy in the same place.
            Nothing else on your record is affected.
          </Notice>
        )}

        <section className="panel-run" aria-labelledby="panel-needs-title">
          <p className="panel-label" id="panel-needs-title">
            <span>What Aster still needs</span>
            {!unavailable && mine.length > 0 && <span className="status-count">{mine.length}</span>}
          </p>

          {unavailable ? (
            <StateCard
              variant="error"
              icon="alert"
              title="What Aster decided couldn’t be read"
              action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
            >
              Your files are safe and nothing has changed on your record. Until this loads, nothing
              here is shown as accepted. An unread decision is not the same as a decision.
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

        <section className="panel-run" aria-labelledby="panel-record-title">
          <p className="panel-label" id="panel-record-title">
            <span>On your record</span>
          </p>

          {/* The permission to leave, stated by the panel rather than left for
              the student to guess — ENR-157 AC 3, drawn by Airwallex. It heads
              this run and not the panel: what is being checked is one row of
              this list, and the row it is about is a few pixels below it. */}
          {checking ? (
            <Notice
              tone="working"
              icon="clock"
              title={`Aster is checking your ${checking.title.toLowerCase()}`}
            >
              You can close this panel or go somewhere else. It keeps going, and your record shows
              where it got to whenever you come back.
            </Notice>
          ) : null}

          {unavailable ? (
            // Not the empty state. "Nothing on the record yet" would be a lie
            // about where her files are — they are on the record; it is the
            // decisions on them that did not load.
            <StateCard variant="empty" icon="alert" title="Your record is here, but not readable yet">
              Nothing has been lost and nothing has changed. The files you sent are on your record.
              It is what Aster decided about them that could not be loaded.
            </StateCard>
          ) : settled.length === 0 && issued.length === 0 ? (
            <StateCard variant="empty" icon="file" title="Nothing on the record yet">
              The first entry arrives when you send something Aster asked for, or when Aster issues
              you a letter. Both land here, and both stay.
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
                        onToast(`${doc.title} would open as a PDF. Nothing is downloaded here.`)
                      }
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </section>

        {/* The retention guardrail. It was a card in the rail, where it stood
            beside the record; here it stands under it, which is the only place
            left that is still about the whole record rather than one row. */}
        <p className="card-foot panel-foot">
          <Icon name="shield" size={14} />
          <span>
            Every file you send is kept exactly as you sent it. Aster never writes over your first
            file — the new one sits next to it, and the reason the first came back stays readable.
          </span>
        </p>
      </Drawer>
      )}

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
            onClose();
            onOpenTask(task);
          }}
          onOriginal={(submission) =>
            onToast(`${filesLabel(submission)} would open exactly as you sent it.`)
          }
        />
      )}
    </>
  );
}
