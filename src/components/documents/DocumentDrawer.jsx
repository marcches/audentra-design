import { useRef, useState } from 'react';
import Icon from '../../Icon.jsx';
import ExtractReview from './ExtractReview.jsx';
import { useOverlay } from '../../lib/overlay.js';
import {
  latestDecision,
  listFormats,
  officeOf,
  refuse,
  stateInfo,
  stateOf,
} from '../../lib/documents.js';

/**
 * One document requirement, opened: what happened to it, and the way forward.
 *
 * The order never changes, and it is the order the stories ask the questions in:
 * the reason first when there is one, then what this requirement actually wants,
 * then the field, then the history. A student who was rejected reads why before
 * being asked for anything.
 *
 * **`in-review` renders no control at all** — not a disabled one, none. ENR-158
 * AC 7 says the student is never asked to act on something already under review,
 * and a greyed-out button is still an ask. It is the one branch here that is
 * shorter than the others on purpose
 * ([Airbnb](https://mobbin.com/screens/d3a8ceec-6af8-4f17-8e78-a9526936ac10):
 * once it is in review the action link *disappears*).
 *
 * The file field is a real `<input type="file">`. Nothing is uploaded, but the
 * name and the size are real, so the refusal in ENR-157 AC 5 is a real check
 * against the requirement's own accepted formats rather than a mock of one.
 */
export default function DocumentDrawer({
  requirement,
  task,
  sending,
  failed,
  onClose,
  onSubmit,
  onOpenStep,
  onOriginal,
  onRetry,
}) {
  const panel = useRef(null);
  const picker = useRef(null);
  useOverlay(panel, { onClose });

  const [file, setFile] = useState(null);
  const [refusal, setRefusal] = useState(null);
  const [values, setValues] = useState(() => initialValues(requirement));
  const [decisions, setDecisions] = useState({});

  const office = officeOf(requirement);
  const state = stateOf(requirement);
  const info = stateInfo(requirement);
  const decision = latestDecision(requirement);
  const accepts = requirement.accepts;

  const history = [...(requirement.submissions ?? [])].reverse();

  // Send it the first time from the step that asks for it; send it *again* from
  // here. The two paths are disjoint, so a duplicate submission has nowhere to
  // come from — see the interactions table in the spec.
  const routeToStep = state === 'needed' && Boolean(task);
  const canUpload = info.holder === 'you' && !routeToStep;

  const extract = state === 'changes-requested' ? requirement.extract : null;
  const undecided = extract ? extract.fields.filter((f) => !decisions[f.id]).length : 0;
  const ready = Boolean(file) && undecided === 0 && !sending;

  function pick(event) {
    const chosen = event.target.files?.[0];
    event.target.value = '';
    if (!chosen) return;

    // Refused before the upload, against the rule it broke — never after it,
    // and never in a modal over the top of everything else.
    const problem = refuse(requirement, chosen.name);
    if (problem) {
      setRefusal(problem);
      setFile({ fileName: chosen.name, rejected: true });
      return;
    }

    setRefusal(null);
    setFile({ fileName: chosen.name, fileSize: sizeLabel(chosen.size) });
  }

  function clearFile() {
    setFile(null);
    setRefusal(null);
  }

  return (
    <>
      <button className="modal-scrim" aria-label="Close document" onClick={onClose} />
      <aside
        className="task-drawer document-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-drawer-title"
        ref={panel}
      >
        <div className="drawer-header">
          <div className="drawer-label">
            <span>{office.name}</span>
            <span>{info.label}</span>
          </div>
          <button className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-icon">
            <Icon name="file" size={25} />
          </div>
          <h2 id="document-drawer-title">{requirement.title}</h2>
          <p className="document-lede" role="status">
            {info.line(office)}
          </p>

          {/* 1 — the reason, and what would satisfy it. The only tinted block
              in the drawer: spend colour once, on the thing that is asking. */}
          {state === 'changes-requested' && decision && (
            <section className="reject-panel" aria-labelledby="reject-title">
              <h3 id="reject-title">
                <Icon name="alert" size={17} /> Why it came back
              </h3>
              <p className="reject-reason">{decision.reason}</p>
              <p className="reject-lead">What would fix it</p>
              <ul className="reject-remedies">
                {decision.remedies.map((remedy) => (
                  <li key={remedy}>
                    <Icon name="check" size={14} />
                    {remedy}
                  </li>
                ))}
              </ul>
              <p className="reject-by">
                {office.name} · {decision.on}
              </p>
            </section>
          )}

          {/* 2 — what this requirement wants, before any file field. */}
          <section className="document-brief">
            <h3>What Aster needs</h3>
            <p>{requirement.needs}</p>
            <p className="document-why">
              <Icon name="info" size={14} /> {requirement.why}
            </p>
            {accepts && (
              <p className="document-accepts">
                {listFormats(accepts.formats)} · up to {accepts.maxMb} MB
              </p>
            )}
            {requirement.unblocks && (
              <p className="document-unblocks">
                <Icon name="lock" size={14} /> {requirement.unblocks}
              </p>
            )}
          </section>

          {/* 3 — the field, only when she is the one who owes a move. */}
          {routeToStep && (
            <div className="document-route">
              <p>
                This one is a step on your checklist, and that is where it is sent from — so there is
                only ever one place it can be submitted.
              </p>
              <button className="primary-button" onClick={() => onOpenStep(task)}>
                Open the step <Icon name="arrow" size={17} />
              </button>
            </div>
          )}

          {canUpload && (
            <section className="document-upload" aria-labelledby="upload-title">
              <h3 id="upload-title">
                {state === 'changes-requested' ? 'Send a replacement' : 'Send it'}
              </h3>

              <input
                type="file"
                ref={picker}
                className="visually-hidden"
                accept={accepts?.extensions}
                onChange={pick}
              />

              <div className={`upload-zone ${refusal ? 'refused' : file ? 'has-file' : ''}`}>
                <span className="upload-mark" aria-hidden="true">
                  <Icon name={refusal ? 'alert' : file ? 'check' : 'upload'} size={22} />
                </span>
                {file ? (
                  <div className="upload-chosen">
                    <strong>{file.fileName}</strong>
                    <span>{file.rejected ? 'Not sent' : file.fileSize}</span>
                  </div>
                ) : (
                  <div className="upload-chosen">
                    <strong>Choose a file</strong>
                    <span>{accepts ? `${listFormats(accepts.formats)} · up to ${accepts.maxMb} MB` : ''}</span>
                  </div>
                )}
                <button className="secondary-button" onClick={() => picker.current?.click()}>
                  {file ? 'Choose another' : 'Browse'}
                </button>
                {file && (
                  <button className="icon-button" aria-label="Remove this file" onClick={clearFile}>
                    <Icon name="close" size={18} />
                  </button>
                )}
              </div>

              {/* The refusal sits under the same line that stated the rule, so
                  the rule is learned from the requirement and not from the error. */}
              {refusal && (
                <p className="upload-refusal" role="alert">
                  <Icon name="alert" size={14} /> {refusal}
                </p>
              )}

              {requirement.privacy && (
                <p className="upload-privacy">
                  <Icon name="shield" size={14} /> {requirement.privacy}
                </p>
              )}

              {/* 4 — the extraction, once there is a file to have read. */}
              {extract && file && !file.rejected && (
                <ExtractReview
                  extract={extract}
                  values={values}
                  decisions={decisions}
                  onChange={(field, value) => {
                    setValues((current) => ({ ...current, [field.id]: value }));
                    setDecisions((current) => {
                      const next = { ...current };
                      if (value.trim() === field.read) delete next[field.id];
                      else next[field.id] = 'fixed';
                      return next;
                    });
                  }}
                  onConfirm={(field) =>
                    setDecisions((current) => ({ ...current, [field.id]: 'right' }))
                  }
                />
              )}

              {failed ? (
                // A send that did not arrive created nothing. Retrying resends
                // the file already chosen; it never makes a second submission.
                <div className="upload-failed" role="alert">
                  <p>
                    <strong>This did not reach Aster.</strong> Nothing was recorded, and{' '}
                    {office.name} has not seen it. Your file is still here.
                  </p>
                  <div className="upload-failed-actions">
                    <button className="primary-button" onClick={() => onRetry(requirement, file)}>
                      <Icon name="refresh" size={16} /> Try again
                    </button>
                    <button className="secondary-button" onClick={() => picker.current?.click()}>
                      Choose another file
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="primary-button"
                  disabled={!ready}
                  onClick={() => onSubmit(requirement, file)}
                >
                  {sending ? 'Sending…' : 'Send to Aster'} <Icon name="arrow" size={17} />
                </button>
              )}

              {extract && file && !file.rejected && undecided > 0 && (
                <p className="upload-blocked">
                  {undecided === 1
                    ? 'One field above still needs your answer'
                    : `${undecided} fields above still need your answer`}{' '}
                  before this can be sent.
                </p>
              )}
            </section>
          )}

          {/* 5 — the history. A replacement is appended, never written over. */}
          <section className="document-history" aria-labelledby="history-title">
            <h3 id="history-title">Everything you have sent</h3>
            {history.length === 0 ? (
              <p className="inline-empty">
                Nothing has been sent for this one yet. When you send something it stays here, and
                so does whatever Aster decides about it.
              </p>
            ) : (
              <ol className="history-list">
                {history.map((submission) => (
                  <li key={submission.id}>
                    <div className="history-head">
                      <strong>{submission.fileName}</strong>
                      <span>
                        {submission.fileSize} · sent {submission.sent}
                      </span>
                    </div>
                    <p className={`history-outcome ${outcomeTone(submission)}`}>
                      {submission.checking
                        ? 'Aster is checking it.'
                        : !submission.decision
                          ? `With ${office.name}. No decision yet.`
                          : submission.decision.outcome === 'accepted'
                            ? `Accepted ${submission.decision.on}.`
                            : `Changes requested ${submission.decision.on} — ${submission.decision.reason}`}
                    </p>
                    <button className="link-button" onClick={() => onOriginal(submission)}>
                      <Icon name="download" size={14} /> Open the original
                    </button>
                  </li>
                ))}
              </ol>
            )}
            <p className="history-rule">
              Aster keeps every file you send. A replacement is added beside the one before it, never
              over it.
            </p>
          </section>
        </div>
      </aside>
    </>
  );
}

function initialValues(requirement) {
  const fields = requirement.extract?.fields ?? [];
  return Object.fromEntries(fields.map((field) => [field.id, field.read]));
}

function outcomeTone(submission) {
  if (submission.checking || !submission.decision) return 'wait';
  return submission.decision.outcome === 'accepted' ? 'done' : 'stop';
}

function sizeLabel(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
