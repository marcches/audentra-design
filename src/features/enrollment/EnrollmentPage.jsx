import Icon from '../../design-system/Icon.jsx';
import AdvisorBar from '../../design-system/patterns/AdvisorBar.jsx';
import SummaryFigure from '../../design-system/patterns/SummaryFigure.jsx';
import EnrollmentRail from './EnrollmentRail.jsx';
import GateNotice from '../registration/GateNotice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import TaskCard from './TaskCard.jsx';

/**
 * My Enrollment — the screen ENR-164 approved in Jam, and the one the Jam of
 * 2026-08-20 pointed at when it asked for every other section to be built the
 * same way. Nothing here is relitigated: the page now names the slots the shell
 * always had, rather than building them itself, so what the rest of the portal
 * copies is this file's structure and not a screenshot of it.
 *
 * Its hero copy moved to `navigation.js` with everyone else's.
 */
export default function EnrollmentPage({
  destination,
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
  nextReward,
  rewardsOn,
  gate,
  unavailable,
  onSort,
  onOpenSmart,
  onOpenTask,
  onOpenPoints,
  onToggleCompleted,
  onResume,
  onContact,
}) {
  return (
    <PageShell
      destination={destination}
      summaryLabel="Enrollment progress"
      summary={
        <>
          <SummaryFigure
            mark={
              <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
                <span>{progress}%</span>
              </div>
            }
            label="Your enrollment progress"
            figure={`${completed.length} of ${totalSteps} steps complete`}
          >
            {tasks.length > 0
              ? 'You’re right on track. Your next task takes about 4 minutes.'
              : 'Nothing is waiting on you right now.'}
          </SummaryFigure>
          <AdvisorBar onContact={onContact} />
        </>
      }
      /* ENR-214 AC 2. One line true of the whole section, above the cards:
         what is blocked, and by when. */
      notice={
        <GateNotice
          state={gate.state}
          items={gate.items}
          unavailable={unavailable}
          onShow={() => {
            const first = document.querySelector('.task-card.gating');
            first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        />
      }
      rail={
        <EnrollmentRail
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          nextReward={nextReward}
          rewardsOn={rewardsOn}
          unavailable={unavailable}
          onResume={onResume}
          onOpenPoints={onOpenPoints}
        />
      }
    >
      <section className="section-card">
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
            <button className="sort-info" aria-label="How smart order works" onClick={onOpenSmart}>
              <Icon name="info" size={17} />
            </button>
          </div>
        </div>

        <div className="card-rows task-list">
          {tasks.map((task, index) => (
            <TaskCard
              rewardsOn={rewardsOn}
              gates={gate.taskIds.has(task.id)}
              gateState={gate.items.find((item) => item.taskId === task.id)}
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
      </section>

      <section className="section-card">
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
          <div className="card-rows review-list">
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

      <section className="section-card">
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
          <div className="card-rows locked-list">
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
              {/* ENR-162 AC 5: with rewards off, the group still counts steps —
                  it just stops being about points, and nothing is left empty. */}
              {completed.length === 0
                ? rewardsOn
                  ? 'Each step you finish is listed here with the points it earned.'
                  : 'Each step you finish is listed here.'
                : rewardsOn
                  ? `${earnedPoints.toLocaleString()} Momentum points earned`
                  : 'Everything you have already finished.'}
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
    </PageShell>
  );
}
