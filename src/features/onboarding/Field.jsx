import { useId } from 'react';
import Icon from '../../design-system/Icon.jsx';

/**
 * One field of one step. Two kinds, and the difference between them is who owns
 * the value — the same split `features/profile` draws, because it is the same
 * record read at two moments.
 *
 * `Field` carries a control: the value is hers. `StatedField` carries no
 * control at all and names the office that changes it. A read-only input would
 * be a control that refuses, which is the thing this repo keeps deciding not to
 * ship.
 *
 * The hierarchy rule inside a card applies here: the label is small and muted,
 * the value carries the size and the weight, and the eye can run down the
 * column of values without reading a label.
 */
export function Field({ label, hint, value, type = 'text', autoComplete, invalid, onChange }) {
  const id = useId();
  return (
    <label className={invalid ? 'field invalid' : 'field'} htmlFor={id}>
      <span className="field-label">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <small className="field-hint">{hint}</small> : null}
    </label>
  );
}

/** A fact Aster holds and the student does not change. It names who does. */
export function StatedField({ label, value, office }) {
  return (
    <div className="stated-field">
      <span className="field-label">{label}</span>
      <strong>{value}</strong>
      <small>
        <Icon name="lock" size={12} /> {office} changes this
      </small>
    </div>
  );
}
