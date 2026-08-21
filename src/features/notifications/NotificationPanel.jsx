import { Fragment } from 'react';
import Icon from '../../design-system/Icon.jsx';
import { CardFoot, CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import { offices } from '../help/data.js';
import { groupFeed, isRead, needsAction, relativeWhen } from './logic.js';

/**
 * What changed since she was last here — ENR-161, the panel half.
 *
 * Built out of the card's three zones, because the panel that holds it is a
 * `Card` (`Popover`): a status head, two runs of rows, a foot. Before Marco's
 * round of 2026-08-21 it was a grey strip, two uppercase `h3`s and rows of
 * text, and read as a component from somewhere else.
 *
 * Three decisions this file holds:
 *
 * **Two runs, not three tabs.** AC 4 gives three categories; they are the
 * data. The panel ranks them into what needs her and what does not, labels
 * each run once (`.rows-label`, the shape My Profile already uses), and lets
 * the boundary carry the distinction. A run with no items renders no label —
 * never an empty one. The needs-you label is crimson, the same colour the
 * bell's badge spends for the same reason, so the chip and the panel agree.
 *
 * **Each row carries what the thing is.** A 40px tile with a duotone glyph —
 * the content's shape, the same tile a step wears on My Enrollment — and it is
 * tinted once: crimson on the row that needs her, neutral on news. The unread
 * mark is weight and an ink dot in the trailing cell; it never carries the
 * category as well, which is why the tinted-row pattern was rejected.
 *
 * **Nothing here invites a reply.** AC 5: while no inbound channel exists, a
 * notification that offered a reply would be a promise the institution cannot
 * keep. There is no reply control anywhere in this component, and the foot
 * names where a reply actually goes.
 */
function Row({ item, read, onOpen }) {
  const office = offices[item.office]?.name ?? item.office;
  const when = relativeWhen(item.when);
  const needs = needsAction(item);

  const tile = (
    <span className={`task-type-icon${needs ? ' needs-you' : ''}`} aria-hidden="true">
      <Icon name={item.icon ?? 'file'} size={21} weight="duotone" />
    </span>
  );

  // AC 6. A notification whose item is gone stays in the feed — deleting it
  // would answer "what changed" with silence — but it is text, not a door, and
  // it says why rather than leading somewhere that is not there.
  if (item.gone) {
    return (
      <div className="pop-row note-row gone">
        {tile}
        <span className="pop-copy">
          <strong>{item.title}</strong>
          <small>
            {office} · {when}
          </small>
        </span>
      </div>
    );
  }

  return (
    <a
      className={`pop-row note-row${read ? '' : ' unread'}`}
      href={item.route}
      onClick={() => onOpen(item)}
    >
      {tile}
      <span className="pop-copy">
        <strong>{item.title}</strong>
        <small>
          {office} · {when}
        </small>
      </span>
      <span className="pop-trail">
        {!read && <i className="pop-dot" aria-hidden="true" />}
        {!read && <span className="sr-only">Unread</span>}
        {/* An arrow, not a chevron: a chevron in this repo means expand, and
            this row goes somewhere. */}
        <Icon name="arrow" size={15} />
      </span>
    </a>
  );
}

/** The one line under the head: what the count is, said once. */
function standing(state, feed, readIds) {
  if (state === 'loading') return 'Checking what changed…';
  if (state === 'error') return 'Couldn’t be loaded just now';
  const unread = feed.filter((item) => !isRead(readIds, item.id));
  if (unread.length === 0) return 'Nothing unread';
  const needs = unread.filter(needsAction).length;
  const count = `${unread.length} unread`;
  if (needs === 0) return count;
  return `${count} · ${needs} ${needs === 1 ? 'needs' : 'need'} you`;
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
      <CardHead
        kind="status"
        icon="bell"
        title="What changed"
        note={standing(state, feed ?? [], readIds)}
        // In the head, not behind an overflow menu, and it has no destructive
        // neighbour: a student must not be able to throw away a decision she
        // has not read.
        aside={
          state === 'ready' && unread > 0 ? (
            <button className="link-button" onClick={onMarkAll}>
              Mark all read
            </button>
          ) : null
        }
      />

      {state === 'loading' && (
        <CardRows aria-busy="true" aria-label="Loading what changed">
          {[0, 1, 2].map((row) => (
            <div className="pop-row skeleton" key={row}>
              <span className="skeleton-line tile" />
              <span className="pop-skeleton-copy">
                <i className="skeleton-line" />
                <i className="skeleton-line short" />
              </span>
            </div>
          ))}
        </CardRows>
      )}

      {state === 'error' && (
        <StateCard
          variant="error"
          size="compact"
          className="pop-state"
          title="What changed couldn’t be loaded"
          action={{ label: 'Try again', onClick: onRetry }}
        >
          Nothing you did is lost.
        </StateCard>
      )}

      {state === 'ready' && feed.length === 0 && (
        <StateCard variant="empty" size="compact" icon="bell" className="pop-state" title="Nothing new">
          Nothing has changed since you were last here.
        </StateCard>
      )}

      {state === 'ready' && feed.length > 0 && (
        <CardRows>
          {groupFeed(feed).map((group) => (
            <Fragment key={group.id}>
              <p className={`rows-label ${group.id}`}>{group.label}</p>
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
            </Fragment>
          ))}
        </CardRows>
      )}

      {/* AC 5, said out loud rather than implied by the absence of a reply box. */}
      <CardFoot>
        <Notice tone="quiet" action={{ label: 'Help', href: '#/help', onClick: onClose }}>
          Need a person? Nothing here takes a reply.
        </Notice>
      </CardFoot>
    </>
  );
}
