import Icon from '../../design-system/Icon.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import { BOUNDARY_NOTE, EDWARD, GREETING } from './data.js';
import EdwardMessage from './EdwardMessage.jsx';

function Skeleton() {
  return (
    <div className="edward-skeleton" aria-hidden="true">
      <span className="skeleton-line title" />
      <span className="skeleton-line" />
      <span className="skeleton-line short" />
      <span className="skeleton-row" />
      <span className="skeleton-row" />
      <span className="skeleton-row" />
    </div>
  );
}

/**
 * Suggestions are full-width rows that wrap rather than chips that truncate —
 * the card says their number and length vary and the layout has to absorb that.
 * Reference: Asana. Groups come from `suggestionsFor`, so an empty group is not
 * rendered rather than rendered empty.
 */
function Suggestions({ groups, onAsk }) {
  return (
    <div className="edward-suggestions">
      {groups.map((group) => (
        <section key={group.id}>
          <p className="panel-label">{group.label}</p>
          {group.items.map((item) => (
            <button key={item.id} className="edward-suggestion" onClick={() => onAsk(item)}>
              <span>{item.text}</span>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </section>
      ))}
    </div>
  );
}

export default function EdwardThread({
  messages,
  suggestions,
  loading,
  unreachable,
  playing,
  onAsk,
  onPlay,
  onRoute,
  onContact,
  onRetry,
  onResolve,
  onEscalate,
  bottomRef,
}) {
  if (loading) return <Skeleton />;

  // The check is asked once, on the latest answer only — an older turn stops
  // asking the moment a newer one exists (Part A §6.4: "asked once and easy to
  // dismiss").
  const lastId = messages[messages.length - 1]?.id ?? null;

  return (
    <div className="edward-thread" role="log" aria-live="polite" aria-label="Conversation with Edward">
      {messages.length === 0 && (
        <div className="edward-greeting">
          <span className="edward-mark" aria-hidden="true">
            {EDWARD.mark}
          </span>
          <h3>{GREETING.title}</h3>
          <p>{GREETING.body}</p>
          <p className="edward-boundary">
            <Icon name="shield" size={13} /> {BOUNDARY_NOTE}
          </p>
        </div>
      )}

      {unreachable && messages.length === 0 && (
        <Notice tone="quiet" icon="info">
          Your record is not loading right now, so I can only answer from what Aster has published.
        </Notice>
      )}

      {messages.map((message) => (
        <EdwardMessage
          key={message.id}
          message={message}
          playing={playing}
          onPlay={onPlay}
          onRoute={onRoute}
          onContact={onContact}
          onRetry={onRetry}
          onResolve={onResolve}
          onEscalate={onEscalate}
          isLast={message.id === lastId}
        />
      ))}

      {messages.length === 0 && <Suggestions groups={suggestions} onAsk={onAsk} />}

      <div ref={bottomRef} />
    </div>
  );
}
