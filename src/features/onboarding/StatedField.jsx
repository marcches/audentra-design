import Icon from '../../design-system/Icon.jsx';

/**
 * A fact Aster holds and the student does not change. It names who does.
 *
 * The pair to `design-system/primitives/Field` — the same record read at the
 * other moment. It stays here, and not in the design system, because what it
 * carries is an *office*: a read-only input would be a control that refuses,
 * and this product keeps deciding not to ship one, so the thing it ships
 * instead has to say whose desk the change happens on.
 */
export default function StatedField({ label, value, office }) {
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
