import Icon from '../Icon.jsx';

export default function StateCard({ variant = 'empty', icon, title, children, action }) {
  return (
    <div className={`state-card ${variant}`} role={variant === 'error' ? 'alert' : undefined}>
      <span className="state-icon">
        <Icon name={icon} size={24} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action && (
        <button className="secondary-button" onClick={action.onClick}>
          {action.icon && <Icon name={action.icon} size={16} />} {action.label}
        </button>
      )}
    </div>
  );
}
