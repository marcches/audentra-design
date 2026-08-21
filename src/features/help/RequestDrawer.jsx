import Icon from '../../design-system/Icon.jsx';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import { officeOf, stateOf } from './logic.js';
import { longDate, shortDate } from '../campus/logic.js';

/**
 * One request, opened: the state, the path it has taken, and the box that keeps
 * it moving.
 *
 * [OKX](https://mobbin.com/screens/2c298595-0718-43a0-8a4b-ba875c358adf) is the
 * thread with its facts beside it, minus the ticket id — a reference number a
 * student cannot use anywhere is noise.
 * [Fiverr](https://mobbin.com/screens/54186860-2b86-4cc3-9ae3-0e2a6e1b3cb4) is
 * the state drawn as a path with a finished part, which is how *received →
 * answered* reads without naming anybody.
 *
 * An Aster reply is signed by the **office**. There is no name, no avatar and
 * no role on it, and the events say *received by*, never *assigned to*. That is
 * ENR-177 AC 3, and the thread has no field that could break it.
 */
export default function RequestDrawer({ request, replyText, onReply, onSend, onClose }) {

  const office = officeOf(request);
  const state = stateOf(request);
  const answered = request.state === 'answered';
  const canSend = replyText.trim().length > 0;

  return (
    <Drawer
      variant="request"
      label={[office.name, `Opened ${longDate(request.opened)}`]}
      titleId="request-drawer-title"
      closeLabel="Close request"
      onClose={onClose}
    >
      <div className="drawer-icon">
        <Icon name="message" size={25} />
      </div>
      <h2 id="request-drawer-title">{request.subject}</h2>

      <div className="request-state" role="status">
        <span className={`request-chip ${state.tone}`}>{state.label}</span>
        <p>{state.line(office.name)}</p>
      </div>

      {request.reopened && (
        <p className="reopened-note">
          <Icon name="refresh" size={15} /> You reopened this, so it is back with{' '}
          {office.name}.
        </p>
      )}

      <ol className="request-thread">
        {request.thread.map((entry) =>
          entry.kind === 'event' ? (
            <li className="thread-event" key={entry.id}>
              <span className="thread-dot" aria-hidden="true" />
              <p>
                {entry.text} <span>{shortDate(entry.when)}</span>
              </p>
            </li>
          ) : (
            <li className={`thread-message ${entry.from}`} key={entry.id}>
              <span className="thread-dot" aria-hidden="true" />
              <div>
                <p className="thread-from">
                  {entry.from === 'student' ? 'You asked' : `${office.name} replied`}
                  <span>{shortDate(entry.when)}</span>
                </p>
                {entry.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          ),
        )}
      </ol>

      <div className="reply-panel">
        <label className="panel-label" htmlFor="request-reply">
          {answered ? 'Not settled? Reply here' : 'Add to this request'}
        </label>
        <textarea
          id="request-reply"
          className="ask-textarea"
          rows={4}
          value={replyText}
          placeholder={
            answered
              ? 'Say what is still open and this request goes back to the same office.'
              : 'Anything that would help — a date, a document number, what changed.'
          }
          onChange={(event) => onReply(event.target.value)}
        />
        <button className="primary-button full" disabled={!canSend} onClick={onSend}>
          <Icon name="send" size={16} />{' '}
          {answered ? 'Send reply and reopen' : 'Send to ' + office.name}
        </button>
        {answered && (
          <small className="prototype-note">
            Replying reopens this request and puts it back with {office.name}. Nothing you have
            already been told is removed.
          </small>
        )}
      </div>

      <p className="published-note">
        Aster replies here, in the portal — never only by email. A reply is signed by the office
        because a request belongs to the office, not to one person’s day.
      </p>
    </Drawer>
  );
}
