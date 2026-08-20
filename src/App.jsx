import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import TaskCard from './components/TaskCard.jsx';
import TaskDrawer from './components/TaskDrawer.jsx';
import InfoModal from './components/InfoModal.jsx';
import InsightColumn from './components/InsightColumn.jsx';
import { sortTasks } from './lib/task-helpers.js';
import {
  TOTAL_STEPS,
  initialCompleted,
  initialReviewing,
  initialTasks,
  lockedTasks,
} from './data.js';

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completed, setCompleted] = useState(initialCompleted);
  const [reviewing, setReviewing] = useState(initialReviewing);
  const [activeTask, setActiveTask] = useState(null);
  const [drawerTab, setDrawerTab] = useState('action');
  const [sort, setSort] = useState('smart');
  const [completedOpen, setCompletedOpen] = useState(false);
  const [smartModal, setSmartModal] = useState(false);
  const [pointsModal, setPointsModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [housing, setHousing] = useState('on-campus');
  const [toast, setToast] = useState(null);

  const sortedTasks = useMemo(() => sortTasks(tasks, sort), [tasks, sort]);
  const earnedPoints = completed.reduce((total, item) => total + item.points, 0);
  const availableToday = tasks.reduce((total, task) => total + task.points, 0);
  const progress = Math.round((completed.length / TOTAL_STEPS) * 100);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveTask(null);
        setSmartModal(false);
        setPointsModal(false);
        setNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function openTask(task, tab = 'action') {
    setActiveTask(task);
    setDrawerTab(tab);
    setFileReady(false);
  }

  function completeTask(task, sendToReview = false) {
    setTasks((current) => current.filter((item) => item.id !== task.id));

    if (sendToReview) {
      setReviewing((current) => [
        {
          title: task.title,
          description:
            'Your record was submitted successfully. Aster’s team is reviewing it now.',
          submitted: 'Submitted just now',
          eta: 'Usually 2–3 business days',
          points: task.points,
        },
        ...current,
      ]);
      setToast('Record submitted — your points are reserved while Aster reviews it.');
    } else {
      setCompleted((current) => [
        { title: task.title, date: 'Just now', points: task.points },
        ...current,
      ]);
      setToast(`Nice work — ${task.points} Momentum points added.`);
    }

    setActiveTask(null);
  }

  return (
    <main className="app-shell">
      <Sidebar open={navOpen} taskCount={tasks.length} onNavigate={() => setNavOpen(false)} />
      {navOpen && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <section className="workspace" id="my-enrollment">
        <Topbar onOpenNav={() => setNavOpen(true)} />

        <div className="content-wrap">
          <section className="welcome-panel">
            <div className="welcome-copy">
              <p className="eyebrow">
                <span>Offer accepted</span> · Class of 2031
              </p>
              <h1>You’re in, Maya. Let’s make it official.</h1>
              <p>
                We’ve put your next steps in the order that will keep everything moving. Start with
                the first one—or choose any task you can do now.
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

          <section className="progress-panel" aria-label="Enrollment progress">
            <div className="progress-summary">
              <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}>
                <span>{progress}%</span>
              </div>
              <div>
                <span className="panel-label">Your enrollment progress</span>
                <strong>
                  {completed.length} of {TOTAL_STEPS} steps complete
                </strong>
                <p>You’re right on track. Your next task takes about 4 minutes.</p>
              </div>
            </div>
            <button className="points-summary" onClick={() => setPointsModal(true)}>
              <span className="points-icon">
                <Icon name="spark" size={19} />
              </span>
              <span>
                <small>Momentum points</small>
                <strong>{earnedPoints.toLocaleString()}</strong>
              </span>
              <span className="points-today">+{availableToday} available today</span>
              <Icon name="chevron" size={17} />
            </button>
          </section>

          <div className="page-grid">
            <div className="task-column">
              <div className="section-heading">
                <div>
                  <p className="eyebrow muted">Your next steps</p>
                  <h2>Ready when you are</h2>
                </div>
                <div className="sort-group" aria-label="Sort your next steps">
                  <button
                    className={sort === 'smart' ? 'selected' : ''}
                    onClick={() => setSort('smart')}
                  >
                    <Icon name="spark" size={15} /> Smart order
                  </button>
                  <button className={sort === 'due' ? 'selected' : ''} onClick={() => setSort('due')}>
                    Due soon
                  </button>
                  <button
                    className={sort === 'quick' ? 'selected' : ''}
                    onClick={() => setSort('quick')}
                  >
                    Quick wins
                  </button>
                  <button
                    className="sort-info"
                    aria-label="How smart order works"
                    onClick={() => setSmartModal(true)}
                  >
                    <Icon name="info" size={17} />
                  </button>
                </div>
              </div>

              <div className="task-list">
                {sortedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    recommended={index === 0 && sort === 'smart'}
                    onOpen={openTask}
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
                  <span className="status-count">{reviewing.length}</span>
                </div>
                <div className="review-list">
                  {reviewing.map((item) => (
                    <article
                      className="compact-task review-task"
                      key={`${item.title}-${item.submitted}`}
                    >
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
                  <span className="status-count">{lockedTasks.length}</span>
                </div>
                <div className="locked-list">
                  {lockedTasks.map((item) => (
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
              </section>

              <section className={`completed-section ${completedOpen ? 'expanded' : ''}`}>
                <button
                  className="completed-toggle"
                  onClick={() => setCompletedOpen((open) => !open)}
                  aria-expanded={completedOpen}
                >
                  <div className="completed-mark">
                    <Icon name="check" size={19} />
                  </div>
                  <div>
                    <strong>{completed.length} steps completed</strong>
                    <span>{earnedPoints.toLocaleString()} Momentum points earned</span>
                  </div>
                  <Icon name="chevron" size={19} />
                </button>
                {completedOpen && (
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
              onResume={() => {
                const task = tasks.find((item) => item.id === 'profile');
                if (task) openTask(task);
              }}
              onOpenPoints={() => setPointsModal(true)}
              onAskQuestion={() =>
                setToast('A message window would open here in the production experience.')
              }
            />
          </div>

          <footer>
            <span>Aster University sample experience · Designed with Audentra</span>
            <span>
              <a href="#privacy">Privacy</a>
              <a href="#accessibility">Accessibility</a>
              <a href="#help">Get help</a>
            </span>
          </footer>
        </div>
      </section>

      {activeTask && (
        <TaskDrawer
          task={activeTask}
          tab={drawerTab}
          onTab={setDrawerTab}
          onClose={() => setActiveTask(null)}
          onComplete={completeTask}
          onOpenPoints={() => setPointsModal(true)}
          onToast={setToast}
          fileReady={fileReady}
          onPickFile={() => setFileReady(true)}
          housing={housing}
          onHousing={setHousing}
        />
      )}

      {(smartModal || pointsModal) && (
        <InfoModal
          variant={smartModal ? 'smart' : 'points'}
          onClose={() => {
            setSmartModal(false);
            setPointsModal(false);
          }}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span>
            <Icon name="check" size={17} />
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}
