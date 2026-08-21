import { useRef, useState } from 'react';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import Icon from '../../design-system/Icon.jsx';
import Button, { IconButton } from '../../design-system/primitives/Button.jsx';
import ExtractReview from './ExtractReview.jsx';
import {
  doorOf,
  filesLabel,
  latestDecision,
  listFormats,
  officeOf,
  refuse,
  refuseCount,
  stateInfo,
  stateOf,
} from './logic.js';

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
  atDoor = false,
  onClose,
  onSubmit,
  onOpenStep,
  onOriginal,
  onRetry,
}) {
  const picker = useRef(null);

  const [files, setFiles] = useState([]);
  const [refusal, setRefusal] = useState(null);
  const [values, setValues] = useState(() => initialValues(requirement));
  const [decisions, setDecisions] = useState({});

  const office = officeOf(requirement);
  const state = stateOf(requirement);
  const info = stateInfo(requirement);
  const decision = latestDecision(requirement);
  const accepts = requirement.accepts;
  const maxFiles = accepts?.maxFiles ?? 1;

  const history = [...(requirement.submissions ?? [])].reverse();

  // Send it the first time from the one place that owns the door — the checklist
  // step, or since ENR-206 the Health section — and send it *again* from here.
  // The two paths are disjoint, so a duplicate submission has nowhere to come
  // from. `atDoor` is how the section that *is* the door says so.
  const door = doorOf(requirement);
  const routeAway = state === 'needed' && !atDoor && (door.id === 'task' ? Boolean(task) : true);
  const canUpload = info.holder === 'you' && !routeAway;

  const extract = state === 'changes-requested' ? requirement.extract : null;
  const undecided = extract ? extract.fields.filter((f) => !decisions[f.id]).length : 0;
  const ready = files.length > 0 && undecided === 0 && !sending;

  function pick(event) {
    const chosen = [...(event.target.files ?? [])];
    event.target.value = '';
    if (chosen.length === 0) return;

    // Refused before the upload, against the rule it broke — never after it, and
    // never in a modal over the top of everything else. ENR-209 Scenario 5: what
    // is within the limits is kept, so a refusal never clears the selection.
    const full = refuseCount(requirement, files.length, chosen.length);
    const room = Math.max(0, maxFiles - files.length);
    const taking = full ? chosen.slice(0, room) : chosen;

    const kept = [];
    let problem = full;
    for (const item of taking) {
      const said = refuse(requirement, { name: item.name, bytes: item.size });
      if (said) {
        problem = problem ?? said;
        continue;
      }
      kept.push({ name: item.name, size: sizeLabel(item.size) });
    }

    setRefusal(problem);
    if (kept.length > 0) setFiles((current) => [...current, ...kept]);
  }

  function removeFile(name) {
    setFiles((current) => current.filter((item) => item.name !== name));
    setRefusal(null);
  }

  return (
    <Drawer
      variant="document"
      label={[office.name, info.label]}
      titleId="document-drawer-title"
      closeLabel="Close document"
      onClose={onClose}
    >
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
            {maxFiles > 1 ? ` · up to ${maxFiles} files` : ''}
          </p>
        )}
        {requirement.unblocks && (
          <p className="document-unblocks">
            <Icon name="lock" size={14} /> {requirement.unblocks}
          </p>
        )}
      </section>

      {/* 3 — the field, only when she is the one who owes a move. */}
      {routeAway && (
        <div className="document-route">
          <p>{door.line}</p>
          {door.route ? (
            <a className="primary-button" href={door.route} onClick={onClose}>
              {door.label} <Icon name="arrow" size={17} />
            </a>
          ) : (
            <button className="primary-button" onClick={() => onOpenStep(task)}>
              {door.label} <Icon name="arrow" size={17} />
            </button>
          )}
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
            multiple={maxFiles > 1}
            onChange={pick}
          />

          <div className={`upload-zone ${refusal ? 'refused' : files.length > 0 ? 'has-file' : ''}`}>
            <span className="upload-mark" aria-hidden="true">
              <Icon name={refusal ? 'alert' : files.length > 0 ? 'check' : 'upload'} size={22} />
            </span>
            <div className="upload-chosen">
              <strong>
                {files.length === 0
                  ? maxFiles > 1
                    ? 'Choose your files'
                    : 'Choose a file'
                  : files.length === 1
                    ? files[0].name
                    : `${files.length} files ready to send`}
              </strong>
              <span>
                {files.length === 1
                  ? files[0].size
                  : accepts
                    ? `${listFormats(accepts.formats)} · up to ${accepts.maxMb} MB${maxFiles > 1 ? ` · ${maxFiles} files` : ''}`
                    : ''}
              </span>
            </div>
            <button className="secondary-button" onClick={() => picker.current?.click()}>
              {files.length === 0 ? 'Browse' : maxFiles > 1 ? 'Add more' : 'Choose another'}
            </button>
            {files.length === 1 && (
              <IconButton
                name="close"
                size={18}
                label={`Remove ${files[0].name}`}
                tip="Remove"
                onClick={() => removeFile(files[0].name)}
              />
            )}
          </div>

          {/* Every page she chose, named. A record that is eight photographs
              has to be countable before it is sent, or "did they all go?" is
              a question the screen cannot answer — ENR-209 Scenario 5. */}
          {files.length > 1 && (
            <ul className="upload-files">
              {files.map((item) => (
                <li key={item.name}>
                  <Icon name="file" size={15} />
                  <span className="upload-file-name">{item.name}</span>
                  <span className="upload-file-size">{item.size}</span>
                  <IconButton
                    name="close"
                    size={16}
                    label={`Remove ${item.name}`}
                    tip="Remove"
                    onClick={() => removeFile(item.name)}
                  />
                </li>
              ))}
            </ul>
          )}

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
          {extract && files.length > 0 && (
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
                {office.name} has not seen it. {files.length > 1 ? 'Your files are' : 'Your file is'} still here.
              </p>
              <div className="upload-failed-actions">
                <button className="primary-button" onClick={() => onRetry(requirement, files)}>
                  <Icon name="refresh" size={16} /> Try again
                </button>
                <button className="secondary-button" onClick={() => picker.current?.click()}>
                  Choose {files.length > 1 ? 'other files' : 'another file'}
                </button>
              </div>
            </div>
          ) : (
            <Button
              kind="primary"
              icon="arrow"
              disabled={!ready}
              pending={sending}
              onClick={() => onSubmit(requirement, files)}
            >
              Send to Aster
            </Button>
          )}

          {extract && files.length > 0 && undecided > 0 && (
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
                  <strong>{filesLabel(submission)}</strong>
                  <span>
                    {submissionSize(submission)} · sent {submission.sent}
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
    </Drawer>
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

/** Every page of one submission, on one line. */
function submissionSize(submission) {
  const files = submission.files ?? [];
  if (files.length <= 1) return files[0]?.size ?? '';
  return files.map((item) => item.size).join(' + ');
}

function sizeLabel(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
