import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Icon from './design-system/Icon.jsx';
import Sidebar from './app/Sidebar.jsx';
import Topbar from './app/Topbar.jsx';
import TaskDrawer from './features/enrollment/TaskDrawer.jsx';
import InfoModal from './design-system/patterns/InfoModal.jsx';
import EnrollmentPage from './features/enrollment/EnrollmentPage.jsx';
import CampusPage, { CAMPUS_PREVIEW_STATES } from './features/campus/CampusPage.jsx';
import { campusEvents, requiredEventCount } from './features/campus/data.js';
import PageShell from './design-system/patterns/PageShell.jsx';
import PageSkeleton from './design-system/patterns/PageSkeleton.jsx';
import ToastStack from './design-system/patterns/Toast.jsx';
import Styleguide from './design-system/styleguide/Styleguide.jsx';
import { useToasts } from './lib/toast.js';
import OnboardingPage from './features/onboarding/OnboardingPage.jsx';
import PageError from './design-system/patterns/PageError.jsx';
import SectionPlaceholder from './design-system/patterns/SectionPlaceholder.jsx';
import OverviewPage from './features/financials/OverviewPage.jsx';
import AidPage from './features/financials/AidPage.jsx';
import PaymentsPage from './features/financials/PaymentsPage.jsx';
import ClassroomsPage from './features/classrooms/ClassroomsPage.jsx';
import ProfilePage from './features/profile/ProfilePage.jsx';
import AppointmentsPage, { APPOINTMENT_PREVIEW_STATES } from './features/appointments/AppointmentsPage.jsx';
import HelpPage, { HELP_PREVIEW_STATES } from './features/help/HelpPage.jsx';
import HousingPage, { HOUSING_PREVIEW_STATES } from './features/housing/HousingPage.jsx';
import HealthPage, { HEALTH_PREVIEW_STATES } from './features/health/HealthPage.jsx';
import { answerToast } from './features/accessibility/AccessibilityPanel.jsx';
import { documentsFor } from './features/documents/data.js';
import { answerFor } from './features/accessibility/data.js';
import { offices } from './features/help/data.js';
import {
  addSubmission,
  applyReadDecisions,
  checkingOne,
  decisionKey,
  finishChecking,
  markDecisionRead,
  officeOf,
} from './features/documents/logic.js';
import { notifications as notificationFeed } from './features/notifications/data.js';
import { markAllRead, markRead, readIds as storedReadIds, unreadCount } from './features/notifications/logic.js';
import { balanceFrom, nextReward, rewardsEnabled, withinReach } from './features/rewards/logic.js';
import { configFor, gateItems, gateState, gatingTaskIds } from './features/registration/logic.js';
import Edward from './features/edward/Edward.jsx';
import { buildRecord } from './features/edward/logic.js';
import { identityFor } from './features/profile/logic.js';
import { sortTasks } from './features/enrollment/logic.js';
import { buildLedger } from './features/financials/logic.js';
import {
  DEFAULT_ROUTE,
  STYLEGUIDE_ROUTE,
  destinationByRoute,
  isOnboardingHash,
  isRouteHash,
  onboardingStepFrom,
} from './lib/navigation.js';
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
} from './features/enrollment/data.js';

/** The machine's part of the wait. Long enough to be seen, short enough not to be a wait. */
const CHECK_MS = 4200;
const SEND_MS = 700;

/**
 * ENR-161 AC 3. A record is built with the decisions she has already opened
 * already marked read, so a reload does not hand her back an unread mark she
 * cleared yesterday. Applied wherever a record is built — including on a
 * preview change, which is a different student but the same browser.
 */
function withReads(record, ids = storedReadIds()) {
  return { ...record, requirements: applyReadDecisions(record.requirements, ids) };
}

const GROUPS_STORE = 'aster.enrollment.groups';
const GROUPS_DEFAULT = { reviewing: false, later: false, completed: false };

/** The remembered disclosure state of My Enrollment's groups; unreadable storage falls back to the defaults. */
function readGroups() {
  try {
    const raw = window.localStorage.getItem(GROUPS_STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? { ...GROUPS_DEFAULT, ...parsed } : GROUPS_DEFAULT;
  } catch {
    return GROUPS_DEFAULT;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completed, setCompleted] = useState(initialCompleted);
  const [reviewing, setReviewing] = useState(initialReviewing);
  const [activeTask, setActiveTask] = useState(null);
  const [drawerTab, setDrawerTab] = useState('action');
  const [sort, setSort] = useState('smart');
  // Which of My Enrollment's three not-open groups are open. All three start
  // closed — every accordion in the product does (Marco, 2026-08-21): the head
  // already says what is inside and how much, and an open group is a group the
  // student chose to read. Her choice is remembered the way the sidebar
  // remembers its groups.
  const [groups, setGroups] = useState(readGroups);
  const [smartModal, setSmartModal] = useState(false);
  const [pointsModal, setPointsModal] = useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const { toasts, push: pushToast, dismiss: dismissToast } = useToasts();
  const [hash, setHash] = useState(() => window.location.hash || DEFAULT_ROUTE);
  useEffect(() => {
    try {
      window.localStorage.setItem(GROUPS_STORE, JSON.stringify(groups));
    } catch {
      // A portal that cannot remember a preference still has to work.
    }
  }, [groups]);
  const [preview, setPreview] = useState(readPreviewState);
  // A section that owns its own drawer reports it, so the rule "one overlay owns
  // the screen at a time" survives an overlay App does not hold — ENR-181.
  const [sectionOverlay, setSectionOverlay] = useState(false);

  // ENR-161 AC 3 — the read state persists. One store for the notification
  // panel and for the unread mark on a document decision, because they are the
  // same event and two read states for one event is a discrepancy she cannot
  // resolve.
  const [readIds, setReadIds] = useState(storedReadIds);

  // ENR-206. One record, read by My Documents and by Health; one answer, which
  // never leaves Accessibility (ADR-0001, ADR-0003). Both are here because both
  // have to survive a route change — see `submitDocument` and `answerAccommodation` below.
  const [record, setRecord] = useState(() => withReads(documentsFor(readPreviewState())));
  const [sendingId, setSendingId] = useState(null);
  const [failedId, setFailedId] = useState(null);
  const [answer, setAnswer] = useState(() => answerFor(readPreviewState()));
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

  // ENR-162. The balance is added up from the award ledger and never from the
  // configuration — AC 4 as structure rather than as discipline: a change to
  // what a requirement is worth cannot reach a point already earned, because
  // nothing on this path reads what a requirement is worth.
  const earnedPoints = balanceFrom(viewCompleted);
  const availableToday = viewTasks.reduce((total, task) => total + task.points, 0);
  const progress = Math.round((viewCompleted.length / TOTAL_STEPS) * 100);

  // AC 5. The institution's switch, and a preview of it that needs no code
  // change to look at. Everything points renders is behind this one boolean, so
  // turning it off cannot leave an orphaned control anywhere.
  const rewardsOn = rewardsEnabled() && preview !== 'rewards-off';
  const upcoming = rewardsOn && !unavailable ? nextReward(earnedPoints) : null;

  // ENR-161. The feed the panel and the bell both read.
  const feed = isEmpty ? [] : notificationFeed;
  const unread = unavailable ? null : unreadCount(feed, readIds);

  // ENR-214. Which requirements hold class registration is configuration, so
  // the preview that gates nothing is the real code path with an empty list
  // rather than a branch that skips it — AC 7 tested by the state itself.
  const gate = useMemo(() => {
    const config = configFor(preview);
    const items = isEmpty
      ? []
      : gateItems({ requirements: record.requirements, events: campusEvents, config });
    return { items, state: gateState(items), taskIds: gatingTaskIds(items) };
  }, [record, preview, isEmpty]);

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

  // A sidebar badge counts only what needs action from the student (UX writing
  // 6.6). My Documents has no row since the Jam of 2026-08-21; what needs her
  // there is counted on its entry card on Profile and on the page, and a
  // decision she has not opened reaches her through the bell — ENR-158 AC 5.
  const badges = unavailable
    ? {}
    : { openSteps: viewTasks.length, required: requiredEventCount(preview) };

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

  // Arriving on a page: start at the top — before the browser paints it, and in
  // one step. A layout effect runs after the new page is in the DOM and before
  // it is on screen, so the student never sees it at the old page's scroll
  // offset; `instant` overrides the page's `scroll-behavior: smooth`, which
  // otherwise slides the new page up from wherever the last one was left. The
  // ref, not a mounted flag, keeps StrictMode's double run from scrolling on
  // first load.
  const scrolledFor = useRef(hash);
  useLayoutEffect(() => {
    if (scrolledFor.current === hash) return;
    scrolledFor.current = hash;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [hash]);

  // Arriving on a page: close what was open, focus the page.
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

    // preventScroll: focus is for the screen reader, not for the scroll
    // position — without it the browser tucks the page head under the topbar.
    main.current?.focus({ preventScroll: true });
  }, [hash]);

  // Closing the drawer hands focus back to the control that opened it.
  useEffect(() => {
    if (navWasOpen.current && !navOpen) menuButton.current?.focus();
    navWasOpen.current = navOpen;
  }, [navOpen]);

  // A preview state is a different student, so the record and the answer are
  // re-read rather than carried across.
  useEffect(() => {
    setRecord(withReads(documentsFor(preview)));
    setAnswer(answerFor(preview));
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
      pushToast({
        tone: 'success',
        title: `Sent to ${officeOf(requirement).name}.`,
        body: 'You can close this page. The check keeps going.',
      });
    }, SEND_MS);
  }

  /**
   * ENR-161 AC 3 and ENR-158 AC 5. One event, one read state: opening a decision
   * on My Documents writes the same store the notification panel reads, so the
   * two can never disagree and neither forgets on a reload.
   */
  function markDocumentRead(id) {
    setFailedId(null);
    setReadIds((ids) => markRead(ids, decisionKey(id)));
    setRecord((current) => ({
      ...current,
      requirements: markDecisionRead(current.requirements, id),
    }));
  }

  function openNotification(item) {
    setReadIds((ids) => markRead(ids, item.id));
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
      pushToast({ tone: 'success', ...answerToast(value, offices.accessibility.name) });
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
      pushToast({
        tone: 'success',
        title: 'Record submitted.',
        body: 'Your points are reserved while Aster reviews it.',
      });
    } else {
      setCompleted((currentCompleted) => [
        { title: task.title, date: 'Just now', points: task.points },
        ...currentCompleted,
      ]);
      pushToast({ tone: 'success', title: `Nice work — ${task.points} Momentum points added.` });
    }

    setActiveTask(null);
  }

  function contactAid(channel) {
    pushToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${
        financialAidAdvisor.name
      } would open here. Nothing is sent yet.`,
    );
  }

  function payHandoff() {
    pushToast('Aster’s secure payment page would open here. Nothing is sent yet.');
  }

  function changePlan() {
    pushToast('Payment plans are changed in Aster’s billing portal. Nothing is changed here.');
  }

  function contactAdvisor(channel) {
    pushToast(
      `${channel === 'email' ? 'An email' : 'A message'} to ${
        enrollmentAdvisor.name
      } would open here. Nothing is sent yet.`,
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
    pushToast(`A message to ${person.name} would open here. Nothing is sent yet.`);
  }

  function renderPage() {
    // The design system, rendered — `#/styleguide`. It is deliberately not a
    // destination: it does not belong in a student's navigation and it has no
    // preview states, because it is the reference the product is built from
    // rather than a part of the product. It renders inside the real shell so
    // every specimen is sitting in the frame it will actually live in.
    if (hash === STYLEGUIDE_ROUTE) return <Styleguide onToast={pushToast} />;

    if (state === 'loading') return <PageSkeleton label={current?.label} />;

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
          identity={identity}
          groups={groups}
          sort={sort}
          progress={progress}
          totalSteps={TOTAL_STEPS}
          earnedPoints={earnedPoints}
          availableToday={availableToday}
          nextReward={upcoming}
          rewardsOn={rewardsOn}
          gate={gate}
          unavailable={unavailable}
          onSort={setSort}
          onOpenSmart={() => setSmartModal(true)}
          onOpenTask={openTask}
          onOpenPoints={() => setPointsModal(true)}
          onToggleGroup={(id) => setGroups((current) => ({ ...current, [id]: !current[id] }))}
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
        <ClassroomsPage
          destination={current}
          state={preview}
          onToast={pushToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // ENR-184. `empty` means a record opened today rather than a section with
    // nothing in it, so this page reads the raw preview value too.
    //
    // The record goes with it. My Documents is a panel on this page since
    // 2026-08-21, so everything the panel needs to send a file — the record,
    // the clock, the read marks — is handed down from here, where it has lived
    // since ENR-206, rather than being held by whichever screen is showing it.
    if (current.id === 'profile') {
      return (
        <ProfilePage
          destination={current}
          state={preview}
          record={record}
          tasks={viewTasks}
          sendingId={sendingId}
          failedId={failedId}
          onSubmit={submitDocument}
          onMarkRead={markDocumentRead}
          onToast={pushToast}
          onOpenTask={openTaskFromSummary}
          onOverlay={setSectionOverlay}
          onRetry={() => choosePreview('ready')}
        />
      );
    }

    // ENR-183. Two of this page's states are its own — a student with nothing
    // booked and a set of teams that published nothing are different emptinesses
    // — so it also reads the raw preview value.
    if (current.id === 'appointments') {
      return (
        <AppointmentsPage
          destination={current}
          previewState={preview}
          onToast={pushToast}
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
          onToast={pushToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // ENR-206. Health reads the immunization record out of the same list My
    // Documents renders — never a copy of it.
    if (current.id === 'health') {
      return (
        <HealthPage
          destination={current}
          previewState={preview}
          requirement={immunization}
          task={byId.health ?? null}
          sendingId={sendingId}
          failedId={failedId}
          answer={answer}
          savingAnswer={savingAnswer}
          answerFailed={answerFailed}
          onAnswer={answerAccommodation}
          onSubmit={submitDocument}
          onToast={pushToast}
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
          onToast={pushToast}
          onOverlay={setSectionOverlay}
        />
      );
    }

    // My Campus Life is a group of two destinations and one screen — ENR-189.
    // The route chooses the tab; the required band sits above both.
    if (current.group === 'campus') {
      return (
        <CampusPage
          destination={current}
          previewState={preview}
          tab={current.id}
          onToast={pushToast}
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
          <OverviewPage
            {...shared}
            documents={financialDocs}
            depositDays={byId.deposit?.daysLeft}
            onPay={payHandoff}
          />
        );
      }

      if (current.id === 'financials-aid') {
        return (
          <AidPage
            {...shared}
            blockers={byId}
            onExplainProgress={() => setProgressModal(true)}
          />
        );
      }

      return (
        <PaymentsPage
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

  /**
   * ENR-163. Onboarding is not a section of the portal — it is what a newly
   * admitted student walks through once, before the portal exists for her. So
   * it replaces the chrome rather than rendering inside it, which the
   * styleguide does not: a sidebar is a list of ways out of a flow that ENR-151
   * AC 1 requires to refuse them. What `App` owns here is the route and nothing
   * else; the state is the page's, the way Housing's and Help's already are.
   */
  if (isOnboardingHash(hash)) {
    return (
      <OnboardingPage
        requestedStep={onboardingStepFrom(hash)}
        previewState={preview}
        onPreviewState={choosePreview}
        onRoute={(route) => {
          window.location.hash = route;
        }}
      />
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
          points={
            rewardsOn
              ? {
                  balance: earnedPoints,
                  awarded: viewCompleted,
                  withinReach: unavailable ? 0 : withinReach(earnedPoints),
                  unavailable,
                  onOpenPoints: () => setPointsModal(true),
                }
              : null
          }
          notifications={{
            feed,
            readIds,
            unread,
            state: state === 'error' ? 'error' : state === 'loading' ? 'loading' : 'ready',
            onOpen: openNotification,
            onMarkAll: () => setReadIds((ids) => markAllRead(ids, feed)),
            onRetry: () => choosePreview('ready'),
          }}
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
          rewardsOn={rewardsOn}
          onOpenPoints={() => setPointsModal(true)}
          onToast={pushToast}
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

      <ToastStack toasts={toasts} onDismiss={dismissToast} />

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
