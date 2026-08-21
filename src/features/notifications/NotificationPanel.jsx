import Icon from '../../design-system/Icon.jsx';
import { offices } from '../help/data.js';
import { groupFeed, isRead, relativeWhen } from './logic.js';

/**
 * What changed since she was last here — ENR-161, the panel half.
 *
 * Two decisions this file exists to hold:
 *
 * **Two groups, not three tabs.** AC 4 gives three categories; they are the
 * data. The panel ranks them into what needs her and what does not, because a
 * reader should not have to sort a feed the product could have sorted. A group
 * with no items renders no heading — never an empty one.
 *
 * **Nothing here invites a reply.** AC 5: while no inbound channel exists, a
 * notification that offered a reply would be a promise the institution cannot
 * keep. There is no reply control anywhere in this component, and the foot
 * names where a reply actually goes.
 */
function Row({ item, read, onOpen }) {
  const office = offices[item.office]?.name ?? item.office;
  const when = relativeWhen(item.when);

  // AC 6. A notification whose item is gone stays in the feed — deleting it
  // would answer "what changed" with silence — but it is text, not a link, and
  // it says why rather than leading somewhere that is not there.
  if (item.gone) {
    return (
      <li className="note-row note-gone">
        {!read && <i className="note-dot" aria-hidden="true" />}
        <span className="note-body">
          <strong>{item.title}</strong>
        </span>
      </li>
    );
  }

  return (
    <li className="note-row">
      <a href={item.route} onClick={() => onOpen(item)}>
        {!read && <i className="note-dot" aria-hidden="true" />}
        <span className="note-body">
          <strong>{item.title}</strong>
          <small>
            {office} · {when}
          </small>
        </span>
        {/* An arrow, not a chevron: a chevron in this repo means expand, and
            this row goes somewhere. */}
        <Icon name="arrow" size={15} />
        {!read && <span className="sr-only">Unread</span>}
      </a>
    </li>
  );
}

export default function NotificationPanel({
  feed,
  readIds,
  state = 'ready',
  onOpen,
  onMarkAll,
  onRetry,
  onClose,
}) {
  const unread = feed ? feed.filter((item) => !isRead(readIds, item.id)).length : 0;

  return (
    <>
      <div className="pop-head">
        <h2>What changed</h2>
        {/* In the header, not behind an overflow menu, and it has no destructive
            neighbour: a student must not be able to throw away a decision she
            has not read. */}
        {state === 'ready' && unread > 0 && (
          <button className="pop-action" onClick={onMarkAll}>
            Mark all read
          </button>
        )}
      </div>

      {state === 'loading' && (
        <ul className="note-list" aria-busy="true">
          {[0, 1, 2].map((row) => (
            <li className="note-row note-skeleton" key={row}>
              <span className="note-body">
                <i />
                <i />
              </span>
            </li>
          ))}
        </ul>
      )}

      {state === 'error' && (
        <div className="pop-state">
          <p>What changed couldn’t be loaded. Nothing you did is lost.</p>
          <button className="secondary-button" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}

      {state === 'ready' && feed.length === 0 && (
        <div className="pop-state">
          <p>Nothing new since you were last here.</p>
        </div>
      )}

      {state === 'ready' &&
        groupFeed(feed).map((group) => (
          <section className="note-group" key={group.id}>
            <h3>{group.label}</h3>
            <ul className="note-list">
              {group.items.map((item) => (
                <Row
                  key={item.id}
                  item={item}
                  read={isRead(readIds, item.id)}
                  onOpen={(chosen) => {
                    onOpen(chosen);
                    onClose();
                  }}
                />
              ))}
            </ul>
          </section>
        ))}

      {/* AC 5, said out loud rather than implied by the absence of a reply box. */}
      <p className="pop-foot">
        Need a person?{' '}
        <a href="#/help" onClick={onClose}>
          Help <Icon name="arrow" size={13} />
        </a>
      </p>
    </>
  );
}
