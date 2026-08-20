import Icon from '../Icon.jsx';

export default function Sidebar({ open, taskCount, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="Primary navigation">
      <div className="brand-row">
        <div className="university-mark" aria-hidden="true">
          H
        </div>
        <div>
          <strong>Harvard</strong>
          <span>New Student Portal</span>
        </div>
      </div>

      <nav className="main-nav">
        <a className="nav-item active" href="#checklist" onClick={onNavigate}>
          <span className="nav-icon">
            <Icon name="check" />
          </span>
          Checklist
          <span className="nav-count">{taskCount}</span>
        </a>
        <a className="nav-item" href="#offer" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">
            <Icon name="file" />
          </span>
          My offer
        </a>
        <a className="nav-item" href="#messages" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">
            <Icon name="message" />
          </span>
          Messages
          <span className="unread-dot" aria-label="2 unread messages">
            2
          </span>
        </a>
        <a className="nav-item" href="#campus" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">
            <Icon name="home" />
          </span>
          Explore Harvard
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-item" href="#help" onClick={(e) => e.preventDefault()}>
          <span className="nav-icon">
            <Icon name="help" />
          </span>
          Help center
        </a>
        <div className="profile-chip">
          <div className="avatar">MJ</div>
          <div>
            <strong>Maya Johnson</strong>
            <span>Incoming student</span>
          </div>
          <button className="icon-button compact" aria-label="Open profile menu">
            <Icon name="chevron" size={16} />
          </button>
        </div>
        <p className="powered-by">
          Powered by <strong>Audentra</strong>
        </p>
      </div>
    </aside>
  );
}
