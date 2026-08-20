import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import TaskDrawer from './components/TaskDrawer.jsx';
import InfoModal from './components/InfoModal.jsx';
import Dashboard from './components/Dashboard.jsx';
import EnrollmentPage from './components/EnrollmentPage.jsx';
import MyCampusLife, { CAMPUS_PREVIEW_STATES } from './components/MyCampusLife.jsx';
import PageShell from './components/PageShell.jsx';
import PageSkeleton from './components/PageSkeleton.jsx';
import PageError from './components/PageError.jsx';
import SectionPlaceholder from './components/SectionPlaceholder.jsx';
import MyClassrooms from './components/MyClassrooms.jsx';
import { sortTasks } from './lib/task-helpers.js';
import {
  DEFAULT_ROUTE,
  destinationByRoute,
  groupLabel,
  isRouteHash,
} from './lib/navigation.js';
import {
  PREVIEW_STATES,
  frameState,
  readPreviewState,
  writePreviewState,
} from './lib/preview-state.js';
import {
  TOTAL_STEPS,
  enrollmentAdvisor,
  initialCompleted,
  initialReviewing,
  initialTasks,
  lockedTasks,
  unreadMessages,
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
  const [hash, setHash] = useState(() => window.location.hash || DEFAULT_ROUTE);
  const [preview, setPreview] = useState(readPreviewState);

  const main = useRef(null);
  const menuButton = useRef(null);
  const pendingTask = useRef(null);
  const lastHash = useRef(hash);
  const navWasOpen = useRef(false);

  const current = destinationByRoute(hash);
  const state = frameState(preview);
  const isEmpty = state === 'empty';
  const unavailable = state === 'partial';

  const sortedTasks = useMemo(() => sortTasks(tasks, sort), [tasks, sort]);
  const viewTasks = isEmpty ? [] : sortedTasks;
  const viewCompleted = isEmpty ? [] : completed;
  const viewReviewing = isEmpty ? [] : reviewing;
  const viewLocked = isEmpty ? [] : lockedTasks;

  const earnedPoints = viewCompleted.reduce((total, item) => total + item.points, 0);
  const availableToday = viewTasks.reduce((total, task) => total + task.points, 0);
  const progress = Math.round((viewCompleted.length / TOTAL_STEPS) * 100);

  // Partial data shows no count at all rather than a zero that reads as final.
  const unread = unavailable ? null : isEmpty ? 0 : unreadMessages;
  const badges = unavailable ? {} : { openSteps: viewTasks.length, unread };

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash;
      if (!next || next === '#') {
        setHash(DEFAULT_ROUTE);
        return;
      }
      // `#privacy` in the footer is an anchor, not a page. Leave the route alone.
      if (!isRouteHash(next)) return;
      setHash(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Arriving on a page: close what was open, start at the top, focus the page.
  useEffect(() => {
    setNavOpen(false);
    setSmartModal(false);
    setPointsModal(false);
    setActiveTask(null);

    if (pendingTask.current) {
      const task = pendingTask.current;
      pendingTask.current = null;
      setActiveTask(task);
      setDrawerTab('action');
      setFileReady(false);
    }

    // Only a real route change moves focus. Comparing the route rather than a
    // mounted flag survives the effect running twice under StrictMode, which
    // would otherwise drop the keyboard inside the page on first load.
    if (lastHash.current === hash) return;
    lastHash.current = hash;

    window.scrollTo({ top: 0 });
    // preventScroll: focus is for the screen reader, not for the scroll
    // position — without it the browser tucks the page head under the topbar.
    main.current?.focus({ preventScroll: true });
  }, [hash]);

  // Closing the drawer hands focus back to the control that opened it.
  useEffect(() => {
    if (navWasOpen.current && !navOpen) menuButton.current?.focus();
    navWasOpen.current = navOpen;
  }, [navOpen]);

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

  function choosePreview(next) {
    setPreview(next);
    writePreviewState(next);
  }

  function openTask(task, tab = 'action') {
    setActiveTask(task);
    setDrawerTab(tab);
    setFileReady(false);
  }

  /** From the Dashboard: go to the section that owns the work, then open it. */
  function openTaskFromSummary(task) {
    if (current?.id === 'my-enrollment') {
      openTask(task);
      return;
    }
    pendingTask.current = task;
    window.location.hash = '#/my-enrollment';
  }

  function completeTask(task, sendToReview = false) {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id));

    if (sendToReview) {
      setReviewing((currentReviewing) => [
        {
          title: task.title,
          description:
            'Your record was submitted successfully. Aster’s team is reviewing it now.',
          submitted: 'Submitted just now',
          eta: 'Usually 2–3 business days',
          points: task.points,
        },
        ...currentReviewing,
      ]);
      setToast('Record submitted — your points are reserved while Aster reviews it.');
    } else {
      setCompleted((currentCompleted) => [
        { title: task.title, date: 'Just now', points: task.points },
        ...currentCompleted,
      ]);
      setToast(`Nice work — ${task.points} Momentum points added.`);
    }

    setActiveTask(null);
  }

  function contactAdvisor(channel) {
    setToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${
        enrollmentAdvisor.name
      } would open here—nothing is sent yet.`,
    );
  }

  function renderPage() {
    if (state === 'loading') return <PageSkeleton />;

    if (!current) {
      return (
        <PageShell
          eyebrow="Aster"
          title="That page doesn’t exist"
          lede="The link you followed points at a section this portal doesn’t have."
        >
          <p className="inline-empty wide">
            Nothing is wrong with your account. Start again from your Dashboard, or use the
            navigation to pick a section.
          </p>
          <a className="placeholder-route standalone" href={DEFAULT_ROUTE}>
            Go to Dashboard
            <Icon name="arrow" size={16} />
          </a>
        </PageShell>
      );
    }

    if (state === 'error') {
      return (
        <PageShell eyebrow={groupLabel(current)} title={current.label} lede={current.lede}>
          <PageError label={current.label} onRetry={() => choosePreview('ready')} />
        </PageShell>
      );
    }

    if (current.id === 'dashboard') {
      return (
        <Dashboard
          progress={progress}
          totalSteps={TOTAL_STEPS}
          completedCount={viewCompleted.length}
          nextSteps={viewTasks.slice(0, 3)}
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          unavailable={unavailable}
          isEmpty={isEmpty}
          onOpenTask={openTaskFromSummary}
          onOpenPoints={() => setPointsModal(true)}
          onContact={contactAdvisor}
        />
      );
    }

    if (current.id === 'my-enrollment') {
      return (
        <EnrollmentPage
          tasks={viewTasks}
          reviewing={viewReviewing}
          locked={viewLocked}
          completed={viewCompleted}
          completedOpen={completedOpen}
          sort={sort}
          progress={progress}
          totalSteps={TOTAL_STEPS}
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          unavailable={unavailable}
          onSort={setSort}
          onOpenSmart={() => setSmartModal(true)}
          onOpenTask={openTask}
          onOpenPoints={() => setPointsModal(true)}
          onToggleCompleted={() => setCompletedOpen((open) => !open)}
          onResume={() => {
            const task = viewTasks.find((item) => item.id === 'profile');
            if (task) openTask(task);
          }}
          onContact={contactAdvisor}
        />
      );
    }

    // ENR-188. The page reads the raw preview value, not `frameState`, because
    // `no-matches` means something here and nothing to the frame.
    if (current.id === 'my-classrooms') {
      return (
        <PageShell eyebrow={groupLabel(current)} title={current.label} lede={current.lede}>
          <MyClassrooms state={preview} onToast={setToast} />
        </PageShell>
      );
    }

    // My Campus Life is a group of two destinations and one screen — ENR-189.
    // The route chooses the tab; the required band sits above both.
    if (current.group === 'campus') {
      return <MyCampusLife previewState={preview} tab={current.id} onToast={setToast} />;
    }

    // Every other destination states what will appear there and what produces
    // it — ENR-174 AC8. As each section's own card lands (ENR-165, ENR-166,
    // ENR-182, ENR-183, ENR-184, ENR-188) its page takes this slot.
    return (
      <PageShell eyebrow={groupLabel(current)} title={current.label} lede={current.lede}>
        <SectionPlaceholder section={current} />
      </PageShell>
    );
  }

  return (
    <div className="app-shell">
      <a className="skip-to-content" href="#main-content">
        Skip to main content
      </a>

      <Sidebar
        open={navOpen}
        activeId={current?.id}
        badges={badges}
        state={state}
        onNavigate={() => setNavOpen(false)}
        onClose={() => setNavOpen(false)}
        onRetry={() => choosePreview('ready')}
      />
      {navOpen && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <section className="workspace">
        <Topbar
          onOpenNav={() => setNavOpen(true)}
          menuRef={menuButton}
          unread={unread}
          previewState={preview}
          previewStates={
            current?.group === 'campus'
              ? CAMPUS_PREVIEW_STATES
              : current?.id === 'my-classrooms'
                ? PREVIEW_STATES
                : undefined
          }
          onPreviewState={choosePreview}
        />

        <main className="content-wrap" id="main-content" tabIndex={-1} ref={main}>
          {renderPage()}
        </main>
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
    </div>
  );
}
