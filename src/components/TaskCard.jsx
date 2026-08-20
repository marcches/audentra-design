import Icon from '../Icon.jsx';
import { kindIcon, priorityLabel } from '../lib/task-helpers.js';

export default function TaskCard({ task, recommended, onOpen }) {
  return (
    <article className={`task-card ${recommended ? 'recommended' : ''}`}>
      {recommended && (
        <div className="recommended-banner">
          <span>
            <Icon name="spark" size={14} /> Best next step
          </span>
          {task.unlocks ? (
            <span>Unlocks {task.unlocks} more steps</span>
          ) : (
            <span>Highest priority right now</span>
          )}
        </div>
      )}

      <div className="task-card-body">
        <div className={`task-type-icon ${task.kind}`}>
          <Icon name={kindIcon(task.kind)} size={21} />
        </div>

        <div className="task-main">
          <div className="task-meta-row">
            <span>{task.category}</span>
            <span className={`priority-badge ${task.priority}`}>{priorityLabel(task.priority)}</span>
          </div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-facts">
            <span>
              <Icon name="calendar" size={15} /> Due {task.due} <b>· {task.daysLeft} days</b>
            </span>
            <span>
              <Icon name="clock" size={15} /> About {task.minutes} min
            </span>
            {task.kind === 'external' && (
              <span>
                <Icon name="shield" size={15} /> Verified automatically
              </span>
            )}
          </div>
        </div>

        <div className="task-action">
          <div className="point-reward">
            <span>
              <Icon name="spark" size={14} /> {task.points} pts today
            </span>
            <small>{task.tomorrow} tomorrow</small>
          </div>
          <button
            className={recommended ? 'primary-button' : 'secondary-button'}
            onClick={() => onOpen(task)}
          >
            {task.action} <Icon name="arrow" size={16} />
          </button>
          <button className="text-button" onClick={() => onOpen(task, 'how')}>
            See how
          </button>
        </div>
      </div>
    </article>
  );
}
