import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { offices } from './data.js';
import { shortDate } from '../campus/logic.js';

/**
 * Where a question becomes a request — ENR-177 AC 1, AC 6 and AC 7.
 *
 * The construction is
 * [Teachable's](https://mobbin.com/screens/61fc4948-d5b8-4021-bd31-b2b98303d6c2):
 * the topic first, then where it goes, then whatever Aster has already
 * published about it, and only then the box to write in. Naming the office
 * before a single character is typed is what makes AC 7 a promise rather than a
 * footnote — and it is the same fact in the button label, so the last thing
 * read before sending is where it is going.
 *
 * Success and failure share no grammar at all. Success replaces the form with a
 * receipt that says what happens next; failure leaves the form exactly as it
 * was, with every word still in it, because a send that never arrived must not
 * resemble one that landed.
 */
export default function AskCard({
  topic,
  subject,
  message,
  sending,
  failed,
  receipt,
  guideOpen,
  guide,
  onTopic,
  onSubject,
  onMessage,
  onToggleGuide,
  onSend,
  onSeeRequest,
  onAskAnother,
  topics,
  formRef,
}) {
  const office = topic ? offices[topic.office] : null;
  const ready = Boolean(topic && subject.trim() && message.trim());

  if (receipt) {
    const receiptOffice = offices[receipt.office];
    return (
      <section className="section-card ask-card" aria-labelledby="ask-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow muted">Sent</p>
            <h2 id="ask-heading">Ask an office</h2>
          </div>
        </div>

        <div className="ask-receipt" role="status">
          <span className="receipt-tick" aria-hidden="true">
            <Icon name="check" size={24} />
          </span>
          <h3>{receiptOffice.name} has your question.</h3>
          <p className="receipt-subject">“{receipt.subject}”</p>

          <p className="panel-label">What happens next</p>
          <ol className="receipt-next">
            <li>
              <strong>{receiptOffice.name} reads it</strong>
              {receiptOffice.hours}.
            </li>
            <li>
              <strong>A reply usually takes {receiptOffice.reply}</strong>
              If this one is going to take longer, the request will say so.
            </li>
            <li>
              <strong>The answer appears on this page</strong>
              Nothing is needed from you until it does.
            </li>
          </ol>

          <div className="receipt-actions">
            <button className="primary-button" onClick={onSeeRequest}>
              See the request <Icon name="arrow" size={16} />
            </button>
            <button className="secondary-button" onClick={onAskAnother}>
              Ask something else
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-card ask-card" aria-labelledby="ask-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">When a step needs a decision</p>
          <h2 id="ask-heading">Ask an office</h2>
        </div>
      </div>

      <form
        className="ask-form"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          if (ready && !sending) onSend();
        }}
      >
        <fieldset className="ask-step">
          <legend>What is it about?</legend>
          <div className="filter-chips">
            {topics.map((item) => (
              <button
                key={item.id}
                type="button"
                className={topic?.id === item.id ? 'selected' : ''}
                aria-pressed={topic?.id === item.id}
                onClick={() => onTopic(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        {office && (
          <div className="ask-route">
            <span className="route-icon" aria-hidden="true">
              <Icon name="shield" size={18} />
            </span>
            <div>
              <span className="panel-label">This goes to</span>
              <strong>{office.name}</strong>
              <p>{office.decides}</p>
              <p className="route-meta">
                <span>
                  <Icon name="clock" size={13} /> {office.hours}
                </span>
                <span>
                  <Icon name="message" size={13} /> Usually answers in {office.reply}
                </span>
              </p>
            </div>
          </div>
        )}

        {guide && (
          <div className="ask-guide">
            <button
              type="button"
              className="guide-toggle"
              aria-expanded={guideOpen}
              aria-controls="ask-guide-body"
              onClick={onToggleGuide}
            >
              <span className="status-icon guide" aria-hidden="true">
                <Icon name="book" size={17} />
              </span>
              <span>
                <span className="panel-label">Aster has already answered this</span>
                <strong>{guide.topic}</strong>
              </span>
              <span className={`guide-chevron ${guideOpen ? 'open' : ''}`} aria-hidden="true">
                <Icon name="chevron" size={18} />
              </span>
            </button>

            {guideOpen && (
              <div className="guide-body" id="ask-guide-body">
                {guide.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="guide-source">
                  Published by {offices[guide.office].name} · updated {shortDate(guide.updated)}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="ask-step">
          <label htmlFor="ask-subject">What do you need?</label>
          <input
            id="ask-subject"
            className="ask-input"
            type="text"
            value={subject}
            maxLength={90}
            placeholder="One line — the thing you want decided or explained"
            onChange={(event) => onSubject(event.target.value)}
          />
        </div>

        <div className="ask-step">
          <label htmlFor="ask-message">Tell them the rest</label>
          <textarea
            id="ask-message"
            className="ask-textarea"
            rows={5}
            value={message}
            placeholder="What you have already tried, what is blocking you, and any date that matters."
            onChange={(event) => onMessage(event.target.value)}
          />
        </div>

        {failed && (
          <StateCard variant="error" icon="alert" title="Nothing was sent">
            Your question did not reach {office ? office.name : 'Aster'}. Nothing was saved and
            nobody has seen it — every word is still above, exactly as you wrote it. Sending again is
            safe; there is no half-sent copy of this anywhere.
          </StateCard>
        )}

        <div className="ask-send">
          <Button
            kind="primary"
            type="submit"
            leadingIcon="send"
            iconSize={16}
            disabled={!ready}
            pending={sending}
            aria-describedby="ask-channel-note"
          >
            {failed ? 'Try sending again' : `Send to ${office ? office.name : 'an office'}`}
          </Button>
          <p className="ask-channel-note" id="ask-channel-note">
            Aster answers here, in the portal. Emails from Aster only tell you that something has
            landed — there is no address on them that reaches a person.
          </p>
        </div>
      </form>
    </section>
  );
}
