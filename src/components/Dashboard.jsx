import Icon from '../Icon.jsx';
import AdvisorBar from './AdvisorBar.jsx';
import MomentumCard from './MomentumCard.jsx';
import PageShell from './PageShell.jsx';
import { SHORTCUTS } from '../lib/navigation.js';
import { kindIcon } from '../lib/task-helpers.js';

/**
 * The home. It invents no data: every figure already lives in `src/data.js` and
 * every block routes to the section that owns it, so the Dashboard is never a
 * second place to do the work. The shortcut grid is also how the grouped
 * navigation earns its headings — the leaves are findable from here too.
 */
export default function Dashboard({
  progress,
  totalSteps,
  completedCount,
  nextSteps,
  earnedPoints,
  availableToday,
  unavailable,
  isEmpty,
  onOpenTask,
  onOpenPoints,
  onContact,
}) {
  return (
    <PageShell
      eyebrow="Aster"
      title="Good to see you, Maya."
      lede="Where everything stands today, and where to go next."
    >
      {isEmpty && (
        <p className="inline-empty wide">
          Your semester summary builds itself here. As you complete steps, book appointments and
          receive documents, this page fills in.
        </p>
      )}

      <section className="progress-panel" aria-label="Enrollment progress">
        <div className="progress-summary">
          <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
            <span>{progress}%</span>
          </div>
          <div>
            <span className="panel-label">Your enrollment progress</span>
            <strong>
              {completedCount} of {totalSteps} steps complete
            </strong>
            <p>
              {nextSteps.length > 0
                ? 'Your next steps are below, in the order that keeps everything moving.'
                : 'Nothing is waiting on you right now.'}
            </p>
          </div>
        </div>
        <AdvisorBar onContact={onContact} />
      </section>

      <div className="page-grid">
        <div className="task-column">
          <div className="section-heading">
            <div>
              <p className="eyebrow muted">From My Enrollment</p>
              <h2>Your next steps</h2>
            </div>
            <a className="section-route" href="#/my-enrollment">
              Open My Enrollment <Icon name="arrow" size={15} />
            </a>
          </div>

          {nextSteps.length > 0 ? (
            <div className="review-list">
              {nextSteps.map((task) => (
                <button
                  className="compact-task summary-task"
                  key={task.id}
                  onClick={() => onOpenTask(task)}
                >
                  <span className="compact-check">
                    <Icon name={kindIcon(task.kind)} size={18} />
                  </span>
                  <span className="compact-copy">
                    <strong>{task.title}</strong>
                    <span>{task.description}</span>
                    <span className="compact-meta">
                      <span>Due {task.due}</span>
                      <span>{task.minutes} min</span>
                    </span>
                  </span>
                  <span className="summary-open" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="inline-empty">
              Nothing is waiting on you right now. New steps appear here as Aster opens them.
            </p>
          )}

          <section className="status-section">
            <div className="status-heading">
              <span className="status-icon guide">
                <Icon name="home" size={18} />
              </span>
              <div>
                <h2>Where to go next</h2>
                <p>Every part of your Aster life, and what lives in each one.</p>
              </div>
            </div>
            <div className="shortcut-grid">
              {SHORTCUTS.map((item) => (
                <a className="shortcut-card" href={item.route} key={item.id}>
                  <span className="shortcut-icon" aria-hidden="true">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <strong>{item.label}</strong>
                  <p>{item.appears}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="insight-column">
          <MomentumCard
            earnedPoints={earnedPoints}
            availableToday={availableToday}
            completedCount={completedCount}
            unavailable={unavailable}
            onOpenPoints={onOpenPoints}
          />
        </aside>
      </div>
    </PageShell>
  );
}
