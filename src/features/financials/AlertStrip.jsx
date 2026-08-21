import Notice from '../../design-system/patterns/Notice.jsx';
import { deadlineLabel, escalation } from './logic.js';

/**
 * ENR-160 AC 6: a deadline approaching inside the configured window is visually
 * escalated. It escalates here, on the foot of the balance panel, and again on
 * the row — a student who scrolls past one still meets the other.
 *
 * The panel is where it belongs rather than a band under it: the balance reads
 * *estimate · this number will go down*, and this is the one thing that would
 * settle it. `escalation()` already returns this notice's tone, so the level is
 * decided once, in the logic, and never again in the markup.
 *
 * Renders nothing when nothing is close. An alert that is always on screen
 * stops being an alert.
 */
export default function AlertStrip({ task, onOpen }) {
  if (!task) return null;
  const level = escalation(task.daysLeft);
  if (!level) return null;

  return (
    <Notice
      tone={level}
      icon="alert"
      title={`${task.title} · ${deadlineLabel(task.daysLeft).toLowerCase()}`}
      action={{ label: task.shortAction ?? 'Open it', onClick: () => onOpen(task) }}
    >
      {task.consequence}
    </Notice>
  );
}
