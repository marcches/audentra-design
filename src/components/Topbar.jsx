import Icon from '../Icon.jsx';
import PreviewStateMenu from './PreviewStateMenu.jsx';
import { FRAME_STATES } from '../lib/preview-state.js';

export default function Topbar({
  onOpenNav,
  menuRef,
  unread,
  previewState,
  previewStates = FRAME_STATES,
  onPreviewState,
}) {
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
        <a
          className="notification-button"
          href="#/messages"
          aria-label={unread ? `Messages, ${unread} unread` : 'Messages'}
        >
          {unread ? <span aria-hidden="true">{unread}</span> : null}
          <Icon name="message" size={19} />
        </a>
        <a className="mobile-avatar" href="#/profile" aria-label="Profile">
          MJ
        </a>
      </div>
    </header>
  );
}
