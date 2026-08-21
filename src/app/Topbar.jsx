import Icon from '../design-system/Icon.jsx';
import PreviewStateMenu from './PreviewStateMenu.jsx';
import TopbarPopover from './TopbarPopover.jsx';
import NotificationPanel from '../features/notifications/NotificationPanel.jsx';
import PointsPopover from '../features/rewards/PointsPopover.jsx';
import { FRAME_STATES } from '../lib/preview-state.js';

/**
 * The corner ENR-167's design brief is about: *navigation, notifications,
 * points and the route to a person compete for the same corner.*
 *
 * The order is the ranking, and it is the whole answer to the brief's two
 * demands. Left to right: the quiet thing, the interruption, then you. Reversing
 * the first two would put the reward nearest the eye, which is where ENR-162
 * AC 6 — points never compete with an outstanding required action — starts to
 * break.
 *
 * **The interruption may spend colour; the reward may not.** The bell's dot is
 * crimson only when something in the feed needs her and ink when it is only
 * news, which is *findable without being anxious* as a rule rather than as an
 * intention. The points chip carries no accent at all.
 *
 * This component computes nothing. It is handed a view model, so a figure it
 * shows cannot drift from the figure the pages show.
 */
export default function Topbar({
  onOpenNav,
  menuRef,
  identity,
  points,
  notifications,
  previewState,
  previewStates = FRAME_STATES,
  onPreviewState,
}) {
  const unread = notifications?.unread ?? null;

  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu"
        ref={menuRef}
        aria-label="Open navigation"
        onClick={onOpenNav}
      >
        <Icon name="menu" />
      </button>
      <div className="topbar-title">
        <span className="mobile-school">Aster</span>
      </div>
      <div className="topbar-actions">
        <PreviewStateMenu
          state={previewState}
          states={previewStates}
          onChange={onPreviewState}
        />

        {/* ENR-162 AC 5: an institution with rewards off gets no chip, no
            popover and no gap where they were. */}
        {points && (
          <TopbarPopover
            className="topbar-chip points-chip"
            ariaLabel={
              points.unavailable
                ? 'Your momentum, balance unavailable'
                : `Your momentum, ${points.balance.toLocaleString()} points`
            }
            panelLabel="Your momentum"
            panelClass="points-pop"
            trigger={
              <>
                <Icon name="spark" size={17} />
                <span className="chip-figure">
                  {points.unavailable ? '—' : points.balance.toLocaleString()}
                </span>
                <span className="chip-unit">pts</span>
                {/* AC 1's second half. Below 820px it is dropped and the value
                    lives one tap away in the popover — the divergence is
                    recorded in the spec rather than smoothed over. */}
                {!points.unavailable && points.withinReach > 0 && (
                  <span className="chip-reach">
                    · {points.withinReach} {points.withinReach === 1 ? 'reward' : 'rewards'}
                  </span>
                )}
              </>
            }
          >
            {(close) => (
              <PointsPopover
                balance={points.balance}
                awarded={points.awarded}
                unavailable={points.unavailable}
                onOpenPoints={points.onOpenPoints}
                onClose={close}
              />
            )}
          </TopbarPopover>
        )}

        <TopbarPopover
          className="topbar-chip bell-chip"
          ariaLabel={
            unread?.total ? `What changed, ${unread.total} unread` : 'What changed'
          }
          panelLabel="What changed"
          panelClass="note-pop"
          trigger={<Icon name="bell" size={19} />}
          badge={
            // Counts unavailable render no dot at all — never a `0` that reads
            // as final. The rule ENR-180 set for the nav badges, kept here.
            unread && unread.total > 0 ? (
              <span className={`bell-count ${unread.needsAction ? 'needs-you' : ''}`}>
                <span aria-hidden="true">{unread.total}</span>
              </span>
            ) : null
          }
        >
          {(close) => (
            <NotificationPanel
              feed={notifications.feed}
              readIds={notifications.readIds}
              state={notifications.state}
              onOpen={notifications.onOpen}
              onMarkAll={notifications.onMarkAll}
              onRetry={notifications.onRetry}
              onClose={close}
            />
          )}
        </TopbarPopover>

        <a className="mobile-avatar" href="#/profile" aria-label="Profile">
          {identity.initials}
        </a>
      </div>
    </header>
  );
}
