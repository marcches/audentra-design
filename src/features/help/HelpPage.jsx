import { useEffect, useRef, useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import PageShell from '../../design-system/patterns/PageShell.jsx';
import AskCard from './AskCard.jsx';
import GuideList from './GuideList.jsx';
import HelpRail from './HelpRail.jsx';
import RequestDrawer from './RequestDrawer.jsx';
import RequestList from './RequestList.jsx';
import RequestStanding from './RequestStanding.jsx';
import { PORTAL_TODAY } from '../enrollment/data.js';
import { guideById, helpGuides, helpTopics, requestsFor, topicById } from './data.js';
import {
  appendReply,
  markRead,
  newRequest,
  officeOf,
  openRequests,
  sortRequests,
  unreadCount,
  waitingOnYou,
} from './logic.js';
import { shortDate } from '../campus/logic.js';

/**
 * Help — ENR-182, behaviour from ENR-177.
 *
 * The card calls this "an existing page missing its second half": sending ends
 * in silence. The second half is not a confirmation toast. It is that a
 * question, once sent, becomes an object with a state the student can come back
 * to — which is why receipt and the request list are built here as one thing.
 *
 * The page is arranged around the difference between this screen and the
 * assistant. Edward answers from what Aster published and from her own record,
 * instantly, and changes nothing. Help is where a **decision** is asked for,
 * from an office that can make one. Guides are on the page because most
 * questions do not need a decision; the ask block is under them because some do.
 *
 * `loading` and `error` are the frame's states and never reach this component —
 * App renders `PageSkeleton` and `PageError` before dispatching.
 */

/** The states this section adds to the frame's. */
export const HELP_PREVIEW_STATES = [
  ['ready', 'Ready', 'Two requests: one answered and unread, one in progress.'],
  ['needs-you', 'A request needs you', 'An office asked a question back and is waiting on you.'],
  ['send-fails', 'Sending fails', 'The next thing you send does not reach Aster.'],
  ['empty', 'Nothing asked yet', 'The guides, and no request ever raised.'],
  ['loading', 'Loading', 'Before the page has your requests.'],
  ['partial', 'Partial data', 'The guides loaded; your request list did not.'],
  ['error', 'Error', 'Nothing on this page could be loaded.'],
];

/** Long enough to be a moment the student sees, short enough not to be a wait. */
const SEND_MS = 700;

export default function HelpPage({
  destination,
  previewState = 'ready',
  onToast = () => {},
  onOverlay = () => {},
}) {
  const [requests, setRequests] = useState(() => requestsFor(previewState));
  const [topicId, setTopicId] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [askGuideOpen, setAskGuideOpen] = useState(false);
  const [openGuides, setOpenGuides] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const askCard = useRef(null);
  const timer = useRef(null);

  const unavailable = previewState === 'partial';

  // The preview control is a state switch, not a navigation: choosing one puts
  // the page back where that state starts, drafts and all.
  useEffect(() => {
    setRequests(requestsFor(previewState));
    setReceipt(null);
    setFailed(false);
    setOpenId(null);
    setReplyText('');
  }, [previewState]);

  // "One overlay owns the screen at a time" needs App to hear about an overlay
  // it does not itself hold, so Edward can stand down for it — ENR-181.
  useEffect(() => {
    onOverlay(Boolean(openId));
  }, [onOverlay, openId]);

  useEffect(() => () => onOverlay(false), [onOverlay]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const topic = topicId ? topicById(topicId) : null;
  const guide = topic?.guide ? guideById(topic.guide) : null;

  const visible = unavailable ? [] : sortRequests(requests);
  const open = openRequests(visible);
  const waiting = unavailable ? null : waitingOnYou(visible);
  const unread = unreadCount(visible);
  const openRequest = visible.find((item) => item.id === openId) ?? null;

  const hero = { lede: heroLede({ unavailable, open: open.length, waiting }) };

  function focusAsk() {
    askCard.current?.scrollIntoView({ block: 'center' });
    askCard.current?.querySelector('button, input')?.focus();
  }

  function chooseTopic(next) {
    setTopicId(next.id);
    setAskGuideOpen(false);
    setFailed(false);
  }

  function send() {
    setSending(true);
    setFailed(false);

    timer.current = window.setTimeout(() => {
      setSending(false);

      // Nothing arrived, so nothing is created. A "not sent" record in a list of
      // what Aster has would be a lie about where the words are — they are still
      // in the form, which is exactly what the failure says.
      //
      // And no toast: the portal's toast is a green tick, which is the receipt
      // grammar. Announcing a failure with it is the exact resemblance this card
      // says must not happen. The panel that replaces the send is `role="alert"`,
      // so the failure is announced where it can also be acted on.
      if (previewState === 'send-fails') {
        setFailed(true);
        return;
      }

      const created = newRequest({ topic, subject: subject.trim(), message, today: PORTAL_TODAY });
      setRequests((current) => [created, ...current]);
      setReceipt(created);
      setSubject('');
      setMessage('');
      setAskGuideOpen(false);
      onToast({
        tone: 'success',
        title: `${officeOf(created).name} has your question.`,
        body: 'The answer lands on this page.',
      });
    }, SEND_MS);
  }

  function askAnother() {
    setReceipt(null);
    setTopicId(null);
    setFailed(false);
    focusAsk();
  }

  // Focus goes back to whatever opened the drawer — the row, the alert's button,
  // or the receipt's — and `useOverlay` is the one thing that knows how, so this
  // does not keep its own copy of the opener (ENR-181).
  function openDetail(request) {
    setReplyText('');
    setOpenId(request.id);
    if (request.unread) setRequests((current) => markRead(current, request.id));
  }

  function closeDetail() {
    setOpenId(null);
    setReplyText('');
  }

  function sendReply() {
    const reopening = openRequest.state === 'answered';
    setRequests((current) =>
      current.map((item) =>
        item.id === openRequest.id ? appendReply(item, replyText, PORTAL_TODAY) : item,
      ),
    );
    setReplyText('');
    onToast(
      reopening
        ? `Reopened. This is back with ${officeOf(openRequest).name}.`
        : `${officeOf(openRequest).name} has your reply.`,
    );
  }

  const requestList = (
    <RequestList
      requests={visible}
      today={PORTAL_TODAY}
      unavailable={unavailable}
      onOpen={openDetail}
      onRetry={() => onToast('Retrying would reload your requests from Aster.')}
    />
  );

  const askBlock = (
    <div ref={askCard}>
      <AskCard
        topics={helpTopics}
        topic={topic}
        subject={subject}
        message={message}
        sending={sending}
        failed={failed}
        receipt={receipt}
        guide={guide}
        guideOpen={askGuideOpen}
        onTopic={chooseTopic}
        onSubject={setSubject}
        onMessage={setMessage}
        onToggleGuide={() => setAskGuideOpen((value) => !value)}
        onSend={send}
        onSeeRequest={() => openDetail(receipt)}
        onAskAnother={askAnother}
      />
    </div>
  );

  // The page opens on what exists. Coming back to a request is what AC 2 is
  // about, so the list leads when there is one; with nothing raised, a large
  // empty state at the top of the page would stand in front of the action that
  // is the only thing to do here.
  const leadWithList = visible.length > 0 || unavailable;

  return (
    <PageShell
      destination={destination}
      hero={hero}
      summaryLabel="Your requests"
      summary={
        <RequestStanding
          open={open.length}
          unavailable={unavailable}
          line={standingLine({ unavailable, requests: visible, open: open.length, unread, waiting })}
          onAsk={focusAsk}
        />
      }
      notice={
        waiting ? (
          <Notice
            tone="soon"
            icon="alert"
            title={`${officeOf(waiting).name} asked you something`}
            action={{ label: 'Open it', onClick: () => openDetail(waiting) }}
          >
            {waiting.subject} · nothing is late while this is open, but it stops moving until you
            reply.
          </Notice>
        ) : null
      }
      rail={<HelpRail onToast={onToast} />}
    >
      {leadWithList ? (
        <>
          {requestList}
          {askBlock}
        </>
      ) : (
        <>
          {askBlock}
          {requestList}
        </>
      )}

      <GuideList
        guides={helpGuides}
        open={openGuides}
        onToggle={(id) =>
          setOpenGuides((current) =>
            current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
          )
        }
      />

      {openRequest && (
        <RequestDrawer
          request={openRequest}
          replyText={replyText}
          onReply={setReplyText}
          onSend={sendReply}
          onClose={closeDetail}
        />
      )}
    </PageShell>
  );
}

/**
 * The band's only dynamic line. Everything else about the hero is written once,
 * in `navigation.js`, so the section cannot grow a title that drifts from the
 * name the sidebar gives it.
 */
function heroLede({ unavailable, open, waiting }) {
  if (unavailable) {
    return 'Aster’s own guides, and a way to put a named office on a step that is blocked. Your request list could not be loaded just now.';
  }
  if (waiting) {
    return 'One of your requests is waiting on you. Below it: Aster’s own guides, and a way to put a named office on a step that is blocked.';
  }
  if (open === 0) {
    return 'Aster’s own guides, and a way to put a named office on a step that is blocked.';
  }
  return `${open === 1 ? 'One question is' : `${open} questions are`} with Aster, and every answer lands on this page. Below are Aster’s guides, and a way to reach the office that owns a step.`;
}

/** The sentence under the figure: what the number means today. */
function standingLine({ unavailable, requests, open, unread, waiting }) {
  if (unavailable) {
    return 'Nothing you have already sent is affected. This is the list that failed to load, not your requests.';
  }
  if (requests.length === 0) {
    return 'Nothing is with Aster right now. Raise one when a step is blocked and you need a person on it.';
  }
  if (waiting) {
    return open > 1
      ? 'One of them is waiting on you; the rest are with Aster.'
      : 'Your open request is waiting on you. It stops moving until you reply.';
  }
  if (unread > 0) {
    const answered = requests.find((item) => item.unread);
    return `An answer arrived on ${shortDate(answered.updated)} and you have not read it yet.`;
  }
  if (open === 0) {
    return 'Everything you have asked has been answered. Reply to any of them if it is not settled.';
  }
  return 'Every answer lands on this page, and stays here.';
}
