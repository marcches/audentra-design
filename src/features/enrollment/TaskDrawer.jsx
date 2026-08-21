import Icon from '../../design-system/Icon.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import { kindIcon } from './logic.js';

export default function TaskDrawer({
  task,
  suspended,
  tab,
  onTab,
  onClose,
  onComplete,
  rewardsOn = true,
  onOpenPoints,
  onToast,
  fileReady,
  onPickFile,
}) {

  return (
    <Drawer
      label={[task.category, `Due ${task.due}`]}
      titleId="drawer-title"
      closeLabel="Close task"
      onClose={onClose}
      suspended={suspended}
    >
      <div className={`drawer-icon ${task.kind}`}>
        <Icon name={kindIcon(task.kind)} size={25} />
      </div>
      <h2 id="drawer-title">{task.title}</h2>
      <p className="drawer-description">{task.description}</p>

      {/* ENR-162 AC 5. Rewards off leaves no orphaned control: the drawer
          keeps its action and loses the panel, rather than holding an empty
          one where the points used to be. */}
      {rewardsOn && (
        <div className="drawer-reward">
          <div>
            <Icon name="spark" size={18} />
            <span>
              <strong>Earn {task.points} points today</strong>
              <small>That becomes {task.tomorrow} tomorrow</small>
            </span>
          </div>
          <button onClick={onOpenPoints} aria-label="Learn how points work">
            <Icon name="info" size={17} />
          </button>
        </div>
      )}

      <div className="drawer-tabs" role="tablist">
        <button
          className={tab === 'action' ? 'active' : ''}
          onClick={() => onTab('action')}
          role="tab"
        >
          Do this now
        </button>
        <button
          className={tab === 'how' ? 'active' : ''}
          onClick={() => onTab('how')}
          role="tab"
        >
          Step-by-step help
        </button>
      </div>

      {tab === 'how' ? (
        <div className="how-panel">
          <h3>Here’s what to expect</h3>
          <ol>
            {task.steps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="help-note">
            <Icon name="help" size={18} />
            <p>
              <strong>Still unsure?</strong> Ask your enrollment team. They typically reply
              within one business day.
            </p>
          </div>
          <button className="primary-button full" onClick={() => onTab('action')}>
            I’m ready to start <Icon name="arrow" size={17} />
          </button>
        </div>
      ) : (
        <div className="action-panel">
          <div className="why-card">
            <span>
              <Icon name="spark" size={17} />
            </span>
            <div>
              <strong>Why this matters now</strong>
              <p>{task.why}</p>
            </div>
          </div>

          {task.kind === 'external' && (
            <div className="external-panel">
              <div className="external-destination">
                <div className="university-mark small">{task.destination.mark}</div>
                <div>
                  <strong>{task.destination.name}</strong>
                  <span>{task.destination.url}</span>
                </div>
                <Icon name="shield" size={19} />
              </div>
              <p>
                You’ll finish payment on Aster’s website. When it’s received, this checklist
                will update automatically—usually within a minute.
              </p>
              <button className="primary-button full" onClick={() => onComplete(task)}>
                Open Aster payment page <Icon name="external" size={17} />
              </button>
              <small className="prototype-note">
                Prototype: this button simulates Aster confirming payment.
              </small>
            </div>
          )}

          {/* ENR-206. A step whose subject has a section of its own routes
              there rather than asking for the same file a second time. The
              section owns the door; this is a signpost to it. */}
          {task.section && (
            <div className="external-panel">
              <p>{task.sectionLine}</p>
              <a className="primary-button full" href={task.section} onClick={onClose}>
                {task.action} <Icon name="arrow" size={17} />
              </a>
              <small className="prototype-note">{task.sectionFoot}</small>
            </div>
          )}

          {task.kind === 'upload' && !task.section && (
            <div className="upload-panel">
              <button
                className={`upload-zone ${fileReady ? 'has-file' : ''}`}
                onClick={onPickFile}
              >
                <span>
                  <Icon name={fileReady ? 'check' : 'upload'} size={24} />
                </span>
                {/* The requirement's own words. These were hard-coded to the
                    immunization record while Health shared this branch; the
                    record left with ENR-206 and the copy would have been
                    about the wrong document. */}
                {fileReady ? (
                  <>
                    <strong>{task.upload.fileName}</strong>
                    <small>{task.upload.fileSize} · Ready to submit</small>
                  </>
                ) : (
                  <>
                    <strong>{task.upload.prompt}</strong>
                    <small>{task.upload.hint}</small>
                  </>
                )}
              </button>
              <div className="privacy-line">
                <Icon name="shield" size={16} /> {task.upload.privacy}
              </div>
              <button
                className="primary-button full"
                disabled={!fileReady}
                onClick={() => onComplete(task, true)}
              >
                Submit for review <Icon name="arrow" size={17} />
              </button>
              <button
                className="skip-link"
                onClick={() => {
                  onClose();
                  onToast('No problem — this task will stay on your checklist.');
                }}
              >
                I don’t have this with me
              </button>
            </div>
          )}

          {task.kind === 'profile' && (
            <div className="form-panel">
              <label>
                Mobile number
                <input defaultValue="(617) 555-0148" aria-label="Mobile number" />
              </label>
              <label>
                Emergency contact
                <input placeholder="Name and relationship" aria-label="Emergency contact" />
              </label>
              <p className="form-help">You can edit these details anytime from your profile.</p>
              <button className="primary-button full" onClick={() => onComplete(task)}>
                Save details <Icon name="arrow" size={17} />
              </button>
              <button
                className="skip-link"
                onClick={() => {
                  onClose();
                  onToast('Saved for later — you can come back whenever you’re ready.');
                }}
              >
                Skip for now
              </button>
            </div>
          )}

        </div>
      )}
    </Drawer>
  );
}
