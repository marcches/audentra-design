import Icon from '../../design-system/Icon.jsx';
import { deadlineLabel, escalation } from './logic.js';

/**
 * ENR-160 AC 6: a deadline approaching inside the configured window is visually
 * escalated. It escalates here, at the top of the page, and again on the row —
 * a student who scrolls past one still meets the other.
 *
 * Renders nothing when nothing is close. An alert that is always on screen
 * stops being an alert.
 */
export default function AlertStrip({ task, onOpen }) {
  if (!task) return null;
  const level = escalation(task.daysLeft);
  if (!level) return null;

  return (
    <div className={`alert-strip ${level}`} role="status">
      <span className="alert-strip-icon" aria-hidden="true">
        <Icon name="alert" size={19} />
      </span>
      <p>
        <strong>
          {task.title} · {deadlineLabel(task.daysLeft).toLowerCase()}
        </strong>
        {task.consequence}
      </p>
      <button className="secondary-button" onClick={() => onOpen(task)}>
        Open it <Icon name="arrow" size={15} />
      </button>
    </div>
  );
}
