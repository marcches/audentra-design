import Icon from '../Icon.jsx';
import { housingOptions } from '../data.js';
import { kindIcon } from '../lib/task-helpers.js';

export default function TaskDrawer({
  task,
  tab,
  onTab,
  onClose,
  onComplete,
  onOpenPoints,
  onToast,
  fileReady,
  onPickFile,
  housing,
  onHousing,
}) {
  return (
    <>
      <button className="modal-scrim" aria-label="Close task" onClick={onClose} />
      <aside
        className="task-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-header">
          <div className="drawer-label">
            <span>{task.category}</span>
            <span>Due {task.due}</span>
          </div>
          <button className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-content">
          <div className={`drawer-icon ${task.kind}`}>
            <Icon name={kindIcon(task.kind)} size={25} />
          </div>
          <h2 id="drawer-title">{task.title}</h2>
          <p className="drawer-description">{task.description}</p>

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
                    <div className="university-mark small">H</div>
                    <div>
                      <strong>Harvard secure payment portal</strong>
                      <span>payments.harvard.edu</span>
                    </div>
                    <Icon name="shield" size={19} />
                  </div>
                  <p>
                    You’ll finish payment on Harvard’s website. When it’s received, this checklist
                    will update automatically—usually within a minute.
                  </p>
                  <button className="primary-button full" onClick={() => onComplete(task)}>
                    Open Harvard payment page <Icon name="external" size={17} />
                  </button>
                  <small className="prototype-note">
                    Prototype: this button simulates Harvard confirming payment.
                  </small>
                </div>
              )}

              {task.kind === 'upload' && (
                <div className="upload-panel">
                  <button
                    className={`upload-zone ${fileReady ? 'has-file' : ''}`}
                    onClick={onPickFile}
                  >
                    <span>
                      <Icon name={fileReady ? 'check' : 'upload'} size={24} />
                    </span>
                    {fileReady ? (
                      <>
                        <strong>immunization_record.pdf</strong>
                        <small>1.8 MB · Ready to submit</small>
                      </>
                    ) : (
                      <>
                        <strong>Choose a record to upload</strong>
                        <small>PDF, JPG, or PNG · Up to 10 MB</small>
                      </>
                    )}
                  </button>
                  <div className="privacy-line">
                    <Icon name="shield" size={16} /> Encrypted and shared only with authorized
                    Health Services staff.
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

              {task.kind === 'form' && (
                <div className="choice-panel">
                  {housingOptions.map(([value, label, hint]) => (
                    <label key={value} className={housing === value ? 'chosen' : ''}>
                      <input
                        type="radio"
                        name="housing"
                        value={value}
                        checked={housing === value}
                        onChange={() => onHousing(value)}
                      />
                      <span>
                        <strong>{label}</strong>
                        <small>{hint}</small>
                      </span>
                      <span className="radio-mark">
                        <Icon name="check" size={14} />
                      </span>
                    </label>
                  ))}
                  <button className="primary-button full" onClick={() => onComplete(task)}>
                    Save my plan <Icon name="arrow" size={17} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
