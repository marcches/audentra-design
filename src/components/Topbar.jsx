import Icon from '../Icon.jsx';

export default function Topbar({ onOpenNav }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={onOpenNav}>
        <Icon name="menu" />
      </button>
      <div className="topbar-title">
        <span className="mobile-school">Harvard</span>
        <span className="concept-pill">Concept preview</span>
      </div>
      <div className="topbar-actions">
        <button className="help-button">
          <Icon name="help" size={17} /> Need help?
        </button>
        <button className="notification-button" aria-label="Notifications">
          <span>2</span>
          <Icon name="message" size={19} />
        </button>
        <div className="mobile-avatar">MJ</div>
      </div>
    </header>
  );
}
