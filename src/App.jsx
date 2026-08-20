import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import TaskDrawer from './components/TaskDrawer.jsx';
import InfoModal from './components/InfoModal.jsx';
import EnrollmentPage from './components/EnrollmentPage.jsx';
import MyCampusLife, { CAMPUS_PREVIEW_STATES } from './components/MyCampusLife.jsx';
import { requiredEventCount } from './campus-data.js';
import PageShell from './components/PageShell.jsx';
import PageSkeleton from './components/PageSkeleton.jsx';
import PageError from './components/PageError.jsx';
import SectionPlaceholder from './components/SectionPlaceholder.jsx';
import FinancialsOverview from './pages/FinancialsOverview.jsx';
import FinancialsAid from './pages/FinancialsAid.jsx';
import FinancialsPayments from './pages/FinancialsPayments.jsx';
import MyClassrooms from './components/MyClassrooms.jsx';
import MyProfile from './components/MyProfile.jsx';
import MyDocuments, { DOCUMENT_PREVIEW_STATES } from './components/MyDocuments.jsx';
import Appointments, { APPOINTMENT_PREVIEW_STATES } from './components/Appointments.jsx';
import HelpPage, { HELP_PREVIEW_STATES } from './components/HelpPage.jsx';
import HousingPage, { HOUSING_PREVIEW_STATES } from './components/HousingPage.jsx';
import Health, { HEALTH_PREVIEW_STATES, answerToast } from './components/Health.jsx';
import { documentsFor } from './documents-data.js';
import { healthAnswerFor } from './health-data.js';
import { offices } from './help-data.js';
import {
  addSubmission,
  checkingOne,
  finishChecking,
  markDecisionRead,
  officeOf,
  unreadDecisions,
} from './lib/documents.js';
import Edward from './components/edward/Edward.jsx';
import { buildRecord } from './lib/edward.js';
import { identityFor } from './lib/profile-helpers.js';
import { sortTasks } from './lib/task-helpers.js';
import { buildLedger } from './lib/money.js';
import { DEFAULT_ROUTE, destinationByRoute, isRouteHash } from './lib/navigation.js';
import {
  FINANCIALS_STATES,
  PREVIEW_STATES,
  PROFILE_STATES,
  frameState,
  readPreviewState,
  writePreviewState,
} from './lib/preview-state.js';
import {
  TOTAL_STEPS,
  academicYear,
  enrollmentAdvisor,
  financialAidAdvisor,
  financialStates,
  initialCompleted,
  initialReviewing,
  initialTasks,
  lockedTasks,
  unreadMessages,
} from './data.js';

/** The machine's part of the wait. Long enough to be seen, short enough not to be a wait. */
const CHECK_MS = 4200;
const SEND_MS = 700;

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
  const [progressModal, setProgressModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [toast, setToast] = useState(null);
  const [hash, setHash] = useState(() => window.location.hash || DEFAULT_ROUTE);
  const [preview, setPreview] = useState(readPreviewState);
  // A section that owns its own drawer reports it, so the rule "one overlay owns
  // the screen at a time" survives an overlay App does not hold — ENR-181.
  const [sectionOverlay, setSectionOverlay] = useState(false);

  // ENR-206. One record, read by My Documents and by Health; one answer, which
  // never leaves Health. Both are here because both have to survive a route
  // change — see `submitDocument` and `answerAccommodation` below.
  const [record, setRecord] = useState(() => documentsFor(readPreviewState()));
  const [sendingId, setSendingId] = useState(null);
  const [failedId, setFailedId] = useState(null);
  const [answer, setAnswer] = useState(() => healthAnswerFor(readPreviewState()));
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [answerFailed, setAnswerFailed] = useState(null);

  const main = useRef(null);
  const menuButton = useRef(null);
  const pendingTask = useRef(null);
  const lastHash = useRef(hash);
  const navWasOpen = useRef(false);
  const sendTimer = useRef(null);
  const checkTimer = useRef(null);
  const answerTimer = useRef(null);

  const current = destinationByRoute(hash);
  const state = frameState(preview);
  // The name the portal uses, read from the record rather than typed into each
  // component — ENR-179 AC 3. A record with no preferred name greets her by her
  // legal first name, which is what the `New record` preview shows.
  const identity = identityFor(preview);
  const isEmpty = state === 'empty';
  const unavailable = state === 'partial';

  // The one requirement Health owns the door to, taken from the same list My
  // Documents renders — never a copy of it.
  const immunization = record.requirements.find((item) => item.id === 'immunization-record') ?? null;
  const checking = checkingOne(record.requirements);

  const sortedTasks = useMemo(() => sortTasks(tasks, sort), [tasks, sort]);
  const viewTasks = isEmpty ? [] : sortedTasks;
  const viewCompleted = isEmpty ? [] : completed;
  const viewReviewing = isEmpty ? [] : reviewing;
  const viewLocked = isEmpty ? [] : lockedTasks;

  const earnedPoints = viewCompleted.reduce((total, item) => total + item.points, 0);
  const availableToday = viewTasks.reduce((total, task) => total + task.points, 0);
  const progress = Math.round((viewCompleted.length / TOTAL_STEPS) * 100);

  // My Financials opens on a package that is still pending — the state the
  // card's guardrail is about. `aid-final` is the same page once it settles.
  const inFinancials = current?.group === 'financials';
  const snapshot = financialStates[preview === 'aid-final' ? 'final' : 'pending'];
  const ledger = useMemo(() => buildLedger(snapshot), [snapshot]);

  // The same task objects the checklist renders, filtered — never a copy.
  // ENR-160 AC 5 holds because there is only one list.
  const financialDocs =
    isEmpty || preview === 'aid-final' ? [] : viewTasks.filter((task) => task.financial);
  const urgentDoc = [...financialDocs].sort((a, b) => a.daysLeft - b.daysLeft)[0] ?? null;
  const byId = useMemo(() => Object.fromEntries(tasks.map((t) => [t.id, t])), [tasks]);

  // Partial data shows no count at all rather than a zero that reads as final.
  const unread = unavailable ? null : isEmpty ? 0 : unreadMessages;
  // A decision the student has not opened is counted on the sidebar, so it
  // reaches her somewhere other than the page it happened on — ENR-158 AC 5.
  const decisions = unavailable ? null : unreadDecisions(record.requirements);
  const badges = unavailable
    ? {}
    : { openSteps: viewTasks.length, unread, decisions, required: requiredEventCount(preview) };

  // Edward reads the same objects the pages render — never a copy of them, so a
  // figure it says out loud cannot drift from the figure on screen. ENR-181.
  const edwardRecord = useMemo(
    () =>
      buildRecord({
        state,
        tasks: viewTasks,
        completed: viewCompleted,
        reviewing: viewReviewing,
        totalSteps: TOTAL_STEPS,
        snapshot,
        ledger,
        requiredEvents: requiredEventCount(preview),
      }),
    [state, viewTasks, viewCompleted, viewReviewing, snapshot, ledger, preview],
  );

  const dialogOpen = Boolean(
    activeTask || smartModal || pointsModal || progressModal || navOpen || sectionOverlay,
  );

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
    setProgressModal(false);
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

  // A preview state is a different student, so the record and the answer are
  // re-read rather than carried across.
  useEffect(() => {
    setRecord(documentsFor(preview));
    setAnswer(healthAnswerFor(preview));
    setSendingId(null);
    setFailedId(null);
    setSavingAnswer(false);
    setAnswerFailed(null);
  }, [preview]);

  useEffect(
    () => () => {
      window.clearTimeout(sendTimer.current);
      window.clearTimeout(checkTimer.current);
      window.clearTimeout(answerTimer.current);
    },
    [],
  );

  // Every overlay reads `Esc` for itself through `useOverlay`, and stops there,
  // so a stack unwinds one layer at a time. The navigation drawer is the one
  // overlay that never unmounts, so its key stays here — ENR-181.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function choosePreview(next) {
    setPreview(next);
    writePreviewState(next);
  }

  /**
   * ENR-206. The record, the send and the clock live here rather than inside a
   * page, because two sections now read one record: My Documents lists it with
   * five others, Health owns its door. Two pages holding two copies is the one
   * way a record can lie about itself.
   *
   * It also buys what neither page could do alone. `checking` is the only wait
   * this prototype may advance on its own, and it now advances while the student
   * is somewhere else — which is what ENR-157 AC 3 and ENR-209 AC 2 promise in
   * words and what the checking strip tells her she can do.
   */
  useEffect(() => {
    if (!checking) return undefined;
    const id = checking.id;
    checkTimer.current = window.setTimeout(() => {
      setRecord((current) => ({
        ...current,
        requirements: finishChecking(current.requirements, id),
      }));
    }, CHECK_MS);
    return () => window.clearTimeout(checkTimer.current);
  }, [checking]);

  function submitDocument(requirement, files, onSent = () => {}) {
    setSendingId(requirement.id);
    setFailedId(null);
    window.clearTimeout(sendTimer.current);

    sendTimer.current = window.setTimeout(() => {
      setSendingId(null);

      // A send that did not arrive creates nothing — no submission, no row, no
      // "not sent" record. Retrying resends the same files, so there was never a
      // first submission to duplicate.
      if (preview === 'send-fails') {
        setFailedId(requirement.id);
        return;
      }

      setRecord((current) => ({
        ...current,
        requirements: addSubmission(current.requirements, requirement.id, files),
      }));
      onSent();
      setToast(
        `Sent to ${officeOf(requirement).name}. You can close this page — the check keeps going.`,
      );
    }, SEND_MS);
  }

  function markDocumentRead(id) {
    setFailedId(null);
    setRecord((current) => ({
      ...current,
      requirements: markDecisionRead(current.requirements, id),
    }));
  }

  /**
   * The accommodation answer — ENR-208, and ADR-0001.
   *
   * It is held here for the same reason the record is: an answer that forgets
   * itself when she visits another section is indistinguishable from an answer
   * that never reached anyone. What it deliberately does **not** do is create
   * anything — no request, no appointment, no notification, no badge — and
   * nothing about it enters the record Edward speaks from.
   *
   * A failure follows Help's grammar: nothing is saved, the question stays open,
   * and the card says so. The attempted answer is remembered only so that
   * "Try again" does not ask her to choose a second time.
   */
  function answerAccommodation(value) {
    if (!value) return;
    setSavingAnswer(true);
    setAnswerFailed(null);
    window.clearTimeout(answerTimer.current);

    answerTimer.current = window.setTimeout(() => {
      setSavingAnswer(false);

      if (preview === 'send-fails') {
        setAnswerFailed(value);
        return;
      }

      setAnswer({ value, on: 'just now', where: null });
      setToast(answerToast(value, offices.accessibility.name));
    }, SEND_MS);
  }

  function openTask(task, tab = 'action') {
    setActiveTask(task);
    setDrawerTab(tab);
    setFileReady(false);
  }

  /** From anywhere that names a step: go to the section that owns it, then open it. */
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

  function contactAid(channel) {
    setToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${
        financialAidAdvisor.name
      } would open here—nothing is sent yet.`,
    );
  }

  function payHandoff() {
    setToast('Aster’s secure payment page would open here — nothing is sent yet.');
  }

  function changePlan() {
    setToast('Payment plans are changed in Aster’s billing portal — nothing is changed here.');
  }

  function contactAdvisor(channel) {
    setToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${
        enrollmentAdvisor.name
      } would open here—nothing is sent yet.`,
    );
  }

  /**
   * Edward hands the student to the page that does the thing — ENR-176 AC 5. A
   * route that names a step lands inside that step, not merely near it.
   */
  function edwardRoute(target) {
    const task = target.taskId ? byId[target.taskId] : null;
    if (task) {
      openTaskFromSummary(task);
      return;
    }
    window.location.hash = target.route;
  }

  function edwardContact(person) {
    setToast(`A message to ${person.name} would open here — nothing is sent yet.`);
  }

  function renderPage() {
    if (state === 'loading') return <PageSkeleton />;

    if (!current) {
      return (
        <PageShell>
          <p className="inline-empty wide">
            Nothing is wrong with your account. Start again from My Enrollment, or use the
            navigation to pick a section.
          </p>
          <a className="placeholder-route standalone" href={DEFAULT_ROUTE}>
            Go to My Enrollment
            <Icon name="arrow" size={16} />
          </a>
        </PageShell>
      );
    }

    if (state === 'error') {
      return (
        <PageShell destination={current}>
          <PageError label={current.label} onRetry={() => choosePreview('ready')} />
        </PageShell>
      );
    }

    if (current.id === 'my-enrollment') {
      return (
        <EnrollmentPage
          destination={current}
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
        <MyClassrooms
          destination={current}
          state={preview}
          onToast={setToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // ENR-184. `empty` means a record opened today rather than a section with
    // nothing in it, so this page reads the raw preview value too.
    if (current.id === 'profile') {
      return <MyProfile destination={current} state={preview} onToast={setToast} />;
    }

    // ENR-183. Two of this page's states are its own — a student with nothing
    // booked and a set of teams that published nothing are different emptinesses
    // — so it also reads the raw preview value.
    if (current.id === 'appointments') {
      return (
        <Appointments
          destination={current}
          previewState={preview}
          onToast={setToast}
          onOverlay={setSectionOverlay}
          onRetry={() => choosePreview('ready')}
        />
      );
    }

    // ENR-182. `needs-you` and `send-fails` are Help's own, and `empty` here is
    // a student who has never raised a request rather than a section with
    // nothing in it, so this page reads the raw preview value too.
    if (current.id === 'help') {
      return (
        <HelpPage
          destination={current}
          previewState={preview}
          onToast={setToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // ENR-165. `changes-requested` is this page's own, and `empty` here is a
    // record Aster has asked things of and received none of them, so this page
    // reads the raw preview value too.
    if (current.id === 'my-documents') {
      return (
        <MyDocuments
          destination={current}
          previewState={preview}
          record={record}
          sendingId={sendingId}
          failedId={failedId}
          tasks={viewTasks}
          onSubmit={submitDocument}
          onMarkRead={markDocumentRead}
          onToast={setToast}
          onOverlay={setSectionOverlay}
          onOpenTask={openTaskFromSummary}
          onRetry={() => choosePreview('ready')}
        />
      );
    }

    // ENR-206. Health reads the immunization record out of the same list My
    // Documents renders, and holds the accommodation answer, which reaches no
    // other module — ADR-0001.
    if (current.id === 'health') {
      return (
        <Health
          destination={current}
          previewState={preview}
          requirement={immunization}
          task={byId.health ?? null}
          answer={answer}
          savingAnswer={savingAnswer}
          answerFailed={answerFailed}
          sendingId={sendingId}
          failedId={failedId}
          onAnswer={answerAccommodation}
          onSubmit={submitDocument}
          onToast={setToast}
          onOverlay={setSectionOverlay}
          onRetry={() => choosePreview('ready')}
        />
      );
    }

    // ENR-207. Three of this page's states are its own — a shortlist that arrived
    // from onboarding, and the two worlds either side of the response deadline —
    // and `empty` here is an institution that has published no residence rather
    // than a student with nothing, so this page reads the raw preview value too.
    if (current.id === 'housing') {
      return (
        <HousingPage
          destination={current}
          previewState={preview}
          onToast={setToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // My Campus Life is a group of two destinations and one screen — ENR-189.
    // The route chooses the tab; the required band sits above both.
    if (current.group === 'campus') {
      return (
        <MyCampusLife
          destination={current}
          previewState={preview}
          tab={current.id}
          onToast={setToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // Every other destination states what will appear there and what produces
    // it — ENR-174 AC8. As each section's own card lands (ENR-165, ENR-166,
    // ENR-182, ENR-183, ENR-184, ENR-188) its page takes this slot.
    if (inFinancials) {
      // Everything above the tab row belongs to the group, not to the leaf —
      // `FinancialsPage`. The escalation is the same deadline on all three
      // tabs, so it is passed to all three; when only Overview knew about it,
      // moving to Financial aid made a 13-day deadline disappear.
      const shared = {
        destination: current,
        ledger,
        snapshot,
        year: academicYear,
        urgent: urgentDoc,
        unavailable,
        isEmpty,
        onOpenTask: openTaskFromSummary,
        onContact: contactAid,
        onRetry: () => choosePreview('ready'),
      };

      if (current.id === 'financials-overview') {
        return (
          <FinancialsOverview
            {...shared}
            documents={financialDocs}
            depositDays={byId.deposit?.daysLeft}
            onPay={payHandoff}
          />
        );
      }

      if (current.id === 'financials-aid') {
        return (
          <FinancialsAid
            {...shared}
            blockers={byId}
            onExplainProgress={() => setProgressModal(true)}
          />
        );
      }

      return (
        <FinancialsPayments
          {...shared}
          onPay={payHandoff}
          onChangePlan={changePlan}
        />
      );
    }

    return (
      <PageShell destination={current}>
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
        identity={identity}
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
          identity={identity}
          unread={unread}
          previewState={preview}
          previewStates={
            inFinancials
              ? FINANCIALS_STATES
              : current?.group === 'campus'
                ? CAMPUS_PREVIEW_STATES
                : current?.id === 'my-classrooms'
                  ? PREVIEW_STATES
                  : current?.id === 'profile'
                    ? PROFILE_STATES
                    : current?.id === 'appointments'
                      ? APPOINTMENT_PREVIEW_STATES
                      : current?.id === 'help'
                        ? HELP_PREVIEW_STATES
                        : current?.id === 'my-documents'
                          ? DOCUMENT_PREVIEW_STATES
                          : current?.id === 'housing'
                            ? HOUSING_PREVIEW_STATES
                            : current?.id === 'health'
                              ? HEALTH_PREVIEW_STATES
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
          suspended={smartModal || pointsModal || progressModal}
          tab={drawerTab}
          onTab={setDrawerTab}
          onClose={() => setActiveTask(null)}
          onComplete={completeTask}
          onOpenPoints={() => setPointsModal(true)}
          onToast={setToast}
          fileReady={fileReady}
          onPickFile={() => setFileReady(true)}
        />
      )}

      {(smartModal || pointsModal || progressModal) && (
        <InfoModal
          variant={smartModal ? 'smart' : progressModal ? 'progress' : 'points'}
          onClose={() => {
            setSmartModal(false);
            setPointsModal(false);
            setProgressModal(false);
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

      {/* No route, no navigation entry, every page — ENR-175 AC 1 and AC 2. */}
      <Edward
        page={current}
        record={edwardRecord}
        state={state}
        dialogOpen={dialogOpen}
        onRoute={edwardRoute}
        onContact={edwardContact}
      />
    </div>
  );
}
