import Icon from '../../design-system/Icon.jsx';
import { channelOptions, offices } from './data.js';

/**
 * One field of the record — ENR-179 AC 1 and AC 2.
 *
 * The row has one anchor, and it is the **value**: the label is small and muted
 * above it, so the eye runs down the column of answers rather than down a
 * column of headings. Twelve rows with a bold label and a bold value are twelve
 * rows with no hierarchy, which is what the first build of this screen was.
 *
 * Ownership is not tagged on every row any more. The card labels each run once
 * — "Yours to change", then "Aster's record" — and a row an office owns keeps a
 * lock on its label, a muted value and no edit control. Marking the exception
 * rather than the rule is what makes the locked rows visible at a glance; a
 * `Yours` pill on eight of twelve rows only added noise to all twelve.
 *
 * Verification stays beside the label (Airwallex, Square — see
 * `references.md`), and a row that is *waiting on the student* takes a faint
 * amber wash. That wash is the one place colour is spent inside these cards, so
 * it means exactly one thing: this row is asking you for something.
 */

const VERIFY_ICON = {
  verified: 'check',
  pending: 'clock',
  unverified: 'info',
  unknown: 'info',
};

/** A row waiting on the student, rather than one simply stating a fact. */
export function needsYou(field) {
  return field.verify?.state === 'pending' || field.verify?.state === 'unverified';
}

export default function FieldRow({
  field,
  channel,
  textBlocked,
  choiceOpen,
  onToggleChoice,
  onChannel,
  onEdit,
  onAsk,
  onVerify,
}) {
  const office = field.owner === 'student' ? null : offices[field.owner];
  const option = field.choice ? channelOptions.find(([value]) => value === channel) : null;

  const value = option ? option[1] : field.value;
  const note = option ? option[2] : field.note;
  const verify = field.verify;

  const editLabel = field.value || option ? 'Change' : 'Add';

  return (
    <div className={`field-row${office ? ' owned' : ''}${needsYou(field) ? ' needs-you' : ''}`}>
      <div className="field-head">
        <span className="field-row-label">
          {office && <Icon name="lock" size={11} />}
          {field.label}
        </span>
        {verify && (
          <span className={`verify-pill ${verify.state}`}>
            <Icon name={VERIFY_ICON[verify.state]} size={12} />
            {verify.label}
          </span>
        )}
      </div>

      <div className="field-body">
        <p
          className={`field-value${field.value || option ? '' : ' blank'}${field.mono ? ' mono' : ''}`}
        >
          {value ?? field.blank ?? 'Not set'}
        </p>
        {note && <p className="field-note">{note}</p>}
        {option && textBlocked && (
          <p className="field-note pending">
            Aster can’t text you until that number is verified, so it will email you until then.
          </p>
        )}
        {verify?.detail && (
          <p className={`field-note${verify.state === 'verified' ? ' evidence' : ''}`}>
            {verify.detail}
          </p>
        )}

        {option && choiceOpen && (
          <fieldset className="choice-panel field-choice">
            <legend className="sr-only">How Aster should reach you first</legend>
            {channelOptions.map(([id, label, hint]) => (
              <label key={id} className={channel === id ? 'chosen' : ''}>
                <input
                  type="radio"
                  name="preferred-channel"
                  value={id}
                  checked={channel === id}
                  onChange={() => onChannel(id)}
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
          </fieldset>
        )}
      </div>

      <div className="field-actions">
        {verify?.action && (
          <button
            className="field-action quiet"
            aria-label={`${verify.action} for your ${field.label.toLowerCase()}`}
            onClick={() => onVerify(field)}
          >
            <Icon name="refresh" size={14} />
            {verify.action}
          </button>
        )}

        {office ? (
          /* AC 2: every field an office owns offers the route to that office.
             It is rendered from the owner, so a row cannot be added without it. */
          <button
            className="field-action office"
            aria-label={`Ask ${office.short} about your ${field.label.toLowerCase()}`}
            onClick={() => onAsk(office)}
          >
            Ask {office.short}
            <Icon name="arrow" size={14} />
          </button>
        ) : option ? (
          <button
            className="field-action"
            aria-expanded={choiceOpen}
            aria-label={`${choiceOpen ? 'Done choosing' : 'Change'} your preferred channel`}
            onClick={onToggleChoice}
          >
            <Icon name="pen" size={14} />
            {choiceOpen ? 'Done' : editLabel}
          </button>
        ) : (
          <button
            className="field-action"
            aria-label={`${editLabel} your ${field.label.toLowerCase()}`}
            onClick={() => onEdit(field)}
          >
            <Icon name="pen" size={14} />
            {editLabel}
          </button>
        )}
      </div>
    </div>
  );
}
