import Icon from '../Icon.jsx';
import PreviewStateMenu from './PreviewStateMenu.jsx';
import { FRAME_STATES } from '../lib/preview-state.js';

export default function Topbar({
  onOpenNav,
  menuRef,
  identity,
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
        <a className="mobile-avatar" href="#/profile" aria-label="Profile">
          {identity.initials}
        </a>
      </div>
    </header>
  );
}
