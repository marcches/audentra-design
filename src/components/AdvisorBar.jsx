import Icon from '../Icon.jsx';
import { enrollmentAdvisor } from '../data.js';

export default function AdvisorBar({ onContact }) {
  const advisor = enrollmentAdvisor;

  return (
    <div className="advisor-bar">
      <span className="advisor-avatar" aria-hidden="true">
        {advisor.initials}
      </span>
      <div className="advisor-bar-copy">
        <span className="panel-label">Your enrollment advisor</span>
        <strong>
          {advisor.name} <span>· {advisor.office}</span>
        </strong>
        <p className="advisor-bar-meta">
          <span>
            <span aria-hidden="true">
              <Icon name="pin" size={13} />
            </span>
            {advisor.location.building}, {advisor.location.where}
          </span>
          <span>
            <span aria-hidden="true">
              <Icon name="clock" size={13} />
            </span>
            {advisor.hours.window}, {advisor.hours.days}
          </span>
        </p>
      </div>
      <div className="advisor-actions">
        <button aria-label={`Email ${advisor.name}`} onClick={() => onContact('email')}>
          Email
        </button>
        <button aria-label={`Message ${advisor.name}`} onClick={() => onContact('message')}>
          Message
        </button>
      </div>
    </div>
  );
}
