import Icon from '../../Icon.jsx';
import { PEOPLE } from '../../lib/edward.js';

/** A paragraph that holds newlines is a list. Nothing else in an answer is. */
function Body({ body }) {
  return body.map((paragraph, index) =>
    paragraph.includes('\n') ? (
      <ul className="edward-list" key={index}>
        {paragraph.split('\n').map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    ) : (
      <p key={index}>{paragraph}</p>
    ),
  );
}

/**
 * ENR-176 AC 3. The dead end is a person, never a shrug — and the block is the
 * one the portal already uses for an advisor, so Edward hands you over to
 * someone the rest of the product has already introduced.
 */
function PersonCard({ who, onContact }) {
  const person = PEOPLE[who] ?? PEOPLE.enrollment;
  return (
    <div className="edward-person">
      <span className="advisor-avatar" aria-hidden="true">
        {person.initials}
      </span>
      <div>
        <strong>{person.name}</strong>
        <span>
          {person.office} · {person.hours.window}, {person.hours.days}
        </span>
      </div>
      <button className="secondary-button" onClick={() => onContact(person)}>
        <Icon name="mail" size={15} /> Message
      </button>
    </div>
  );
}

export default function EdwardMessage({ message, playing, onPlay, onRoute, onContact, onRetry }) {
  if (message.role === 'student') {
    return (
      <article className="edward-turn student">
        <p className="edward-bubble">{message.text}</p>
        {message.context && (
          <p className="edward-asked-from">
            <Icon name="pin" size={12} /> asked from {message.context}
          </p>
        )}
      </article>
    );
  }

  if (message.kind === 'thinking') {
    return (
      <article className="edward-turn edward">
        <p className="edward-thinking">
          <span className="edward-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          Reading your record…
        </p>
      </article>
    );
  }

  if (message.kind === 'error') {
    return (
      <article className="edward-turn edward">
        <div className="edward-answer error" role="alert">
          <p>
            <Icon name="alert" size={16} /> I couldn’t reach anything just now. Your question is
            still in the box below.
          </p>
          <button className="secondary-button" onClick={onRetry}>
            <Icon name="refresh" size={15} /> Try again
          </button>
        </div>
      </article>
    );
  }

  const isPlaying = playing === message.id;

  return (
    <article className="edward-turn edward">
      <div className={`edward-answer${message.kind === 'none' ? ' none' : ''}`}>
        <Body body={message.body} />

        {message.source && (
          <p className="edward-source">
            <Icon name={message.source.basis === 'record' ? 'shield' : 'book'} size={13} />
            {message.source.basis === 'record'
              ? `Based on your record · ${message.source.label}`
              : `Based on ${message.source.label}`}
          </p>
        )}

        {message.person && <PersonCard who={message.person} onContact={onContact} />}

        <div className="edward-answer-actions">
          {message.route && (
            <button className="edward-route" onClick={() => onRoute(message.route)}>
              {message.route.label} <Icon name="arrow" size={15} />
            </button>
          )}
          <button
            className={`edward-play${isPlaying ? ' playing' : ''}`}
            aria-label={isPlaying ? 'Stop playing this answer' : 'Play this answer'}
            onClick={() => onPlay(message.id)}
          >
            {isPlaying ? (
              <>
                <span className="edward-wave" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                Playing…
              </>
            ) : (
              <>
                <Icon name="sound" size={14} /> Play answer
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
