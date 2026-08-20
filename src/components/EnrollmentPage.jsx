import Icon from '../Icon.jsx';
import AdvisorBar from './AdvisorBar.jsx';
import InsightColumn from './InsightColumn.jsx';
import PageShell from './PageShell.jsx';
import TaskCard from './TaskCard.jsx';

/**
 * My Enrollment — the screen ENR-164 approved in Jam. This card only moves it
 * behind a route and into the shared page template; the welcome panel stays the
 * hero, and nothing inside it is relitigated.
 */
export default function EnrollmentPage({
  tasks,
  reviewing,
  locked,
  completed,
  completedOpen,
  sort,
  progress,
  totalSteps,
  earnedPoints,
  availableToday,
  unavailable,
  onSort,
  onOpenSmart,
  onOpenTask,
  onOpenPoints,
  onToggleCompleted,
  onResume,
  onContact,
}) {
  const hero = (
    <section className="welcome-panel">
      <div className="welcome-copy">
        <p className="eyebrow">
          <span>Offer accepted</span> · Class of 2031
        </p>
        <h1>You’re in, Maya. Let’s make it official.</h1>
        <p>
          We’ve put your next steps in the order that will keep everything moving. Start with the
          first one—or choose any task you can do now.
        </p>
      </div>
      <div className="celebration-orbit" aria-hidden="true">
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="orbit-core">
          <Icon name="check" size={30} />
        </div>
        <i className="spark-dot one" />
        <i className="spark-dot two" />
        <i className="spark-dot three" />
      </div>
    </section>
  );

  return (
    <PageShell hero={hero}>
      <section className="progress-panel" aria-label="Enrollment progress">
        <div className="progress-summary">
          <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
            <span>{progress}%</span>
          </div>
          <div>
            <span className="panel-label">Your enrollment progress</span>
            <strong>
              {completed.length} of {totalSteps} steps complete
            </strong>
            <p>
              {tasks.length > 0
                ? 'You’re right on track. Your next task takes about 4 minutes.'
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
              <p className="eyebrow muted">Your next steps</p>
              <h2>Ready when you are</h2>
            </div>
            <div className="sort-group" aria-label="Sort your next steps">
              <button className={sort === 'smart' ? 'selected' : ''} onClick={() => onSort('smart')}>
                <Icon name="spark" size={15} /> Smart order
              </button>
              <button className={sort === 'due' ? 'selected' : ''} onClick={() => onSort('due')}>
                Due soon
              </button>
              <button className={sort === 'quick' ? 'selected' : ''} onClick={() => onSort('quick')}>
                Quick wins
              </button>
              <button
                className="sort-info"
                aria-label="How smart order works"
                onClick={onOpenSmart}
              >
                <Icon name="info" size={17} />
              </button>
            </div>
          </div>

          <div className="task-list">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                recommended={index === 0 && sort === 'smart'}
                onOpen={onOpenTask}
              />
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="all-done-card">
              <div>
                <Icon name="spark" size={28} />
              </div>
              <h3>You’re all caught up!</h3>
              <p>We’ll let you know when Aster adds another step.</p>
            </div>
          )}

          <section className="status-section">
            <div className="status-heading">
              <span className="status-icon review">
                <Icon name="clock" size={18} />
              </span>
              <div>
                <h2>Aster is reviewing</h2>
                <p>You’ve done your part. No action needed right now.</p>
              </div>
              {reviewing.length > 0 && <span className="status-count">{reviewing.length}</span>}
            </div>
            {reviewing.length > 0 ? (
              <div className="review-list">
                {reviewing.map((item) => (
                  <article className="compact-task review-task" key={`${item.title}-${item.submitted}`}>
                    <div className="compact-check">
                      <Icon name="clock" size={18} />
                    </div>
                    <div className="compact-copy">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="compact-meta">
                        <span>{item.submitted}</span>
                        <span>{item.eta}</span>
                      </div>
                    </div>
                    <div className="status-pill">
                      <span className="pulse" /> In review
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="inline-empty">
                Nothing is with Aster right now. Anything you send appears here while a team reads it.
              </p>
            )}
          </section>

          <section className="status-section">
            <div className="status-heading">
              <span className="status-icon locked">
                <Icon name="lock" size={18} />
              </span>
              <div>
                <h2>Coming up later</h2>
                <p>These will open automatically when you’re ready for them.</p>
              </div>
              {locked.length > 0 && <span className="status-count">{locked.length}</span>}
            </div>
            {locked.length > 0 ? (
              <div className="locked-list">
                {locked.map((item) => (
                  <article className="compact-task locked-task" key={item.title}>
                    <div className="compact-check">
                      <Icon name="lock" size={17} />
                    </div>
                    <div className="compact-copy">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="prerequisite">
                        <Icon name="arrow" size={14} /> {item.prerequisite}
                      </div>
                    </div>
                    <span className="locked-due">{item.due}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="inline-empty">
                Nothing is waiting on a prerequisite. Steps that need another one first appear here.
              </p>
            )}
          </section>

          <section className={`completed-section ${completedOpen ? 'expanded' : ''}`}>
            <button
              className="completed-toggle"
              onClick={onToggleCompleted}
              aria-expanded={completedOpen}
              disabled={completed.length === 0}
            >
              <div className="completed-mark">
                <Icon name="check" size={19} />
              </div>
              <div>
                <strong>
                  {completed.length === 0
                    ? 'No steps completed yet'
                    : `${completed.length} steps completed`}
                </strong>
                <span>
                  {completed.length === 0
                    ? 'Each step you finish is listed here with the points it earned.'
                    : `${earnedPoints.toLocaleString()} Momentum points earned`}
                </span>
              </div>
              {completed.length > 0 && <Icon name="chevron" size={19} />}
            </button>
            {completedOpen && completed.length > 0 && (
              <div className="completed-list">
                {completed.map((item) => (
                  <div className="completed-row" key={`${item.title}-${item.date}`}>
                    <span className="mini-check">
                      <Icon name="check" size={14} />
                    </span>
                    <strong>{item.title}</strong>
                    <span>{item.date}</span>
                    <span className="earned">
                      <Icon name="spark" size={13} /> +{item.points}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <InsightColumn
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          completedCount={completed.length}
          unavailable={unavailable}
          onResume={onResume}
          onOpenPoints={onOpenPoints}
        />
      </div>
    </PageShell>
  );
}
