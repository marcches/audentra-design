import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import { IconButton } from '../../design-system/primitives/Button.jsx';
import { EDWARD, seededConversations } from './data.js';
import { answerFor, escalationFor, suggestionsFor } from './logic.js';
import { announceHandoff, onEdwardOpen, stashHandoff } from './door.js';
import { GROUPS } from '../../lib/navigation.js';
import { TWO_PANE_QUERY, useIsSheet, useMedia, useOverlay } from '../../lib/overlay.js';
import EdwardComposer from './EdwardComposer.jsx';
import EdwardHistory from './EdwardHistory.jsx';
import EdwardThread from './EdwardThread.jsx';

const STORE = 'aster.edward';

// Stamped per session: a counter alone restarts at 1 on every load, and would
// mint ids that collide with the ones already in storage from the last visit.
const SESSION = Date.now().toString(36);
let counter = 0;
function nextId(prefix) {
  counter += 1;
  return `${prefix}-${SESSION}-${counter}`;
}

function newConversation() {
  return { id: nextId('conversation'), title: null, when: 'Just now', messages: [] };
}

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // A portal that cannot remember a conversation still has to answer.
  }
  return seededConversations;
}

/** `My Financials · Payments`, so the chip names the leaf and not just its group. */
function contextLabel(page) {
  if (!page) return null;
  return page.group ? `${GROUPS[page.group]} · ${page.label}` : page.label;
}

/**
 * Edward — ENR-181.
 *
 * One control, three forms, present on every route and owned by no route. It
 * never navigates, never unmounts the page beneath it and never touches its
 * scroll: that is ENR-175 AC 3 and Scenario 5, and it holds because this is an
 * overlay rather than a destination.
 *
 * On a desktop the window is **non-modal** — no scrim, no focus trap, the page
 * stays live — because the student opened it to ask about something they can
 * still see. Below 620px it is a sheet, and a sheet that covers the page is
 * modal. `useOverlay` carries both cases.
 */
export default function Edward({
  page,
  record,
  state = 'ready',
  dialogOpen = false,
  onRoute,
  onContact,
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('conversation');
  const [conversations, setConversations] = useState(() => [newConversation(), ...readStore()]);
  const [activeId, setActiveId] = useState(() => conversations[0].id);
  const [draft, setDraft] = useState('');
  const [contextOn, setContextOn] = useState(true);
  const [voice, setVoice] = useState('idle');
  const [playing, setPlaying] = useState(null);
  const [lastAsk, setLastAsk] = useState(null);
  // What a door brought in: the chip's label, the office the question is for
  // and the hint the answer can use. Part A §12 — see `door.js`.
  const [doorContext, setDoorContext] = useState(null);
  const [focusPending, setFocusPending] = useState(false);

  const panel = useRef(null);
  const launcher = useRef(null);
  const bottom = useRef(null);
  const wasOpen = useRef(false);
  const timers = useRef([]);

  const isSheet = useIsSheet();
  const twoPane = useMedia(TWO_PANE_QUERY);
  const loading = state === 'loading';
  const context = contextOn ? (doorContext?.label ?? contextLabel(page)) : null;

  const active = conversations.find((item) => item.id === activeId) ?? conversations[0];
  const messages = active?.messages ?? [];
  const suggestions = suggestionsFor(record, page);

  const showHistory = view === 'history';
  const showThread = !showHistory || twoPane;

  function later(run, delay) {
    const id = window.setTimeout(run, delay);
    timers.current.push(id);
    return id;
  }

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // One overlay owns the screen at a time. A drawer or a modal opening puts
  // Edward away rather than stacking on top of it — ENR-175 AC 7.
  useEffect(() => {
    if (dialogOpen) setOpen(false);
  }, [dialogOpen]);

  // The door — Part A §12.2. A screen opens Edward with the question written
  // and *not sent*: a fresh conversation, the chip naming the item, the input
  // focused with the cursor at the end. She sends it, or fixes it first.
  useEffect(
    () =>
      onEdwardOpen(({ question, context: brought }) => {
        startConversation();
        setDoorContext(brought ?? null);
        setContextOn(true);
        setDraft(question ?? '');
        setOpen(true);
        setFocusPending(true);
      }),
    [],
  );

  useEffect(() => {
    if (!open || !focusPending) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const field = document.getElementById('edward-input');
      if (field) {
        field.focus();
        const end = field.value.length;
        field.setSelectionRange(end, end);
      }
      setFocusPending(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, focusPending]);

  // The pill is not in the DOM while the window is open, so the hand-back is
  // ours rather than `useOverlay`'s. Same shape as the nav menu button in App.
  useEffect(() => {
    if (wasOpen.current && !open) launcher.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // An empty conversation is read from the top: the greeting and the
  // suggestions are the content. Only a conversation follows its own tail.
  useEffect(() => {
    if (!open || messages.length === 0) return;
    bottom.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, open, view]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORE,
        JSON.stringify(conversations.filter((item) => item.messages.length > 0)),
      );
    } catch {
      // Same reason as above.
    }
  }, [conversations]);

  function patchActive(patch) {
    setConversations((list) =>
      list.map((item) => (item.id === activeId ? { ...item, ...patch(item) } : item)),
    );
  }

  function ask(text, hint = {}) {
    const question = text.trim();
    if (!question || loading) return;

    // What the door knew travels with the question — the office and the hint —
    // so the answer, and the escalation after it, are about the right thing.
    const carried = doorContext
      ? {
          intent: doorContext.intent,
          taskId: doorContext.taskId,
          clubId: doorContext.clubId,
          office: doorContext.office,
          topic: doorContext.topic,
        }
      : {};
    const fullHint = { ...carried, ...hint };

    const student = {
      id: nextId('student'),
      role: 'student',
      text: question,
      context,
    };
    const thinkingId = nextId('edward');

    patchActive((item) => ({
      title: item.title ?? question,
      when: 'Just now',
      messages: [...item.messages, student, { id: thinkingId, role: 'edward', kind: 'thinking' }],
    }));
    setDraft('');
    setLastAsk({ question, hint: fullHint });

    later(() => {
      const answer = answerFor(question, record, fullHint);
      if (answer.kind === 'error') setDraft(question);
      patchActive((item) => ({
        messages: item.messages.map((message) =>
          message.id === thinkingId
            ? {
                ...answer,
                id: thinkingId,
                role: 'edward',
                office: fullHint.office ?? null,
                topic: fullHint.topic ?? null,
              }
            : message,
        ),
      }));
    }, 700);
  }

  /**
   * "Did that answer it?" — Part A §6.4, asked once after an answer. *Yes*
   * leaves nothing behind; *Not really* appends the escalation: the routes the
   * responsible office actually has, and nothing that does not exist.
   */
  function resolve(messageId, value) {
    const message = messages.find((item) => item.id === messageId);
    if (!message || message.resolved) return;
    const escalation =
      value === 'no'
        ? escalationFor({ intent: message.intent, office: message.office, topic: message.topic })
        : null;
    patchActive((item) => ({
      messages: [
        ...item.messages.map((entry) => (entry.id === messageId ? { ...entry, resolved: value } : entry)),
        ...(escalation ? [{ id: nextId('edward'), role: 'edward', kind: 'escalation', ...escalation }] : []),
      ],
    }));
  }

  /**
   * A route hands the student to the page that does the thing — with what she
   * already told Edward, so she does not start over (§6.4). Edward never sends
   * anything himself: the inquiry, the booking and the callback are the page's.
   */
  function escalate(route, escalation) {
    const lastQuestion = [...messages].reverse().find((item) => item.role === 'student')?.text ?? null;
    stashHandoff({
      kind: route.kind,
      route: route.route,
      topic: route.topic ?? null,
      topicId: route.topicId ?? null,
      office: escalation.office,
      question: lastQuestion,
      context,
    });
    setOpen(false);
    onRoute({ route: route.route });
    // Already on that page: no hash changes, no remount — say so.
    if (window.location.hash === route.route) announceHandoff();
  }

  function retry() {
    if (!lastAsk) return;
    patchActive((item) => ({
      messages: item.messages.filter((message) => message.kind !== 'error'),
    }));
    ask(lastAsk.question, lastAsk.hint);
  }

  function startConversation() {
    const fresh = newConversation();
    setConversations((list) => [fresh, ...list.filter((item) => item.messages.length > 0)]);
    setActiveId(fresh.id);
    setView('conversation');
    setDraft('');
    setContextOn(true);
  }

  function openConversation(id) {
    setActiveId(id);
    if (!twoPane) setView('conversation');
  }

  /** Simulated, and it says so in the composer. ENR-176 AC 8. */
  function toggleMic() {
    if (voice === 'listening') {
      setVoice('idle');
      return;
    }
    setVoice('listening');
    const sample =
      suggestions[suggestions.length - 1]?.items?.[0]?.text ?? 'What should I do next?';
    later(() => {
      setDraft(sample);
      setVoice('idle');
    }, 1500);
  }

  function play(id) {
    if (playing === id) {
      setPlaying(null);
      return;
    }
    setPlaying(id);
    later(() => setPlaying((current) => (current === id ? null : current)), 2600);
  }

  /** Edward changes nothing — it hands the student to the page that does. AC 5. */
  function follow(route) {
    onRoute(route);
    if (isSheet) setOpen(false);
  }

  if (dialogOpen) return null;

  if (!open) {
    return (
      <button
        className="edward-launcher"
        ref={launcher}
        aria-expanded="false"
        onClick={() => setOpen(true)}
      >
        <span className="edward-mark small" aria-hidden="true">
          {EDWARD.mark}
        </span>
        Ask {EDWARD.name}
      </button>
    );
  }

  return (
    <EdwardWindow
      panel={panel}
      isSheet={isSheet}
      twoPane={twoPane}
      showHistory={showHistory}
      showThread={showThread}
      onClose={() => setOpen(false)}
    >
      <header className="edward-head">
        {showHistory && !twoPane && (
          <IconButton
            name="back"
            size={18}
            label="Back to the conversation"
            tip="Back"
            onClick={() => setView('conversation')}
          />
        )}
        <span className="edward-mark small" aria-hidden="true">
          {EDWARD.mark}
        </span>
        <div className="edward-title">
          <strong>{EDWARD.name}</strong>
          <span>{EDWARD.role}</span>
        </div>
        {/* One control per job: where the list replaces the conversation, back
            is the way out, so the toggle stands down rather than doubling it. */}
        {showThread && (
          <IconButton
            className={showHistory ? 'active' : undefined}
            name="clock"
            size={18}
            label="Your conversations"
            aria-pressed={showHistory}
            onClick={() => setView(showHistory ? 'conversation' : 'history')}
          />
        )}
        <IconButton name="pen" size={18} label="New conversation" onClick={startConversation} />
        <IconButton
          name="close"
          size={18}
          label="Close Edward"
          tip="Close"
          onClick={() => setOpen(false)}
        />
      </header>

      <div className="edward-body">
        {showHistory && (
          <EdwardHistory
            conversations={conversations}
            activeId={activeId}
            onOpen={openConversation}
            onNew={startConversation}
          />
        )}

        {showThread && (
          <div className="edward-main">
            <EdwardThread
              messages={messages}
              suggestions={suggestions}
              loading={loading}
              unreachable={!record.reachable}
              playing={playing}
              onAsk={(item) => ask(item.text, { intent: item.intent, taskId: item.taskId })}
              onPlay={play}
              onRoute={follow}
              onContact={onContact}
              onRetry={retry}
              onResolve={resolve}
              onEscalate={escalate}
              bottomRef={bottom}
            />
            <EdwardComposer
              draft={draft}
              onDraft={setDraft}
              onSend={ask}
              context={context}
              onDropContext={() => setContextOn(false)}
              voice={voice}
              onMic={toggleMic}
              disabled={loading}
            />
          </div>
        )}
      </div>
    </EdwardWindow>
  );
}

/**
 * Split out so the dialog element mounts and unmounts as one unit — the overlay
 * hook keys its focus handling to that lifetime.
 */
function EdwardWindow({ panel, isSheet, twoPane, showHistory, showThread, onClose, children }) {
  useOverlay(panel, { onClose, modal: isSheet, returnFocus: false });

  const wide = showHistory && twoPane;

  return (
    <>
      {isSheet && (
        <button className="modal-scrim edward-scrim" aria-label="Close Edward" onClick={onClose} />
      )}
      <aside
        className={`edward-panel${wide ? ' wide' : ''}${showHistory && !showThread ? ' history-only' : ''}`}
        ref={panel}
        role="dialog"
        aria-modal={isSheet ? 'true' : undefined}
        aria-label="Edward, Aster’s AI assistant"
      >
        {children}
      </aside>
    </>
  );
}
