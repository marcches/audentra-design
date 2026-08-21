import { useEffect, useRef, useState } from 'react';
import Icon from '../design-system/Icon.jsx';
import { IconButton } from '../design-system/primitives/Button.jsx';
import { NAV, PROFILE_ID, UTILITY_ID, destinationById } from '../lib/navigation.js';
import { FOCUSABLE } from '../lib/overlay.js';

const GROUP_STORE = 'aster.nav.groups';

/** Groups open by default. Anything unreadable in storage falls back to open. */
function readCollapsed() {
  try {
    const raw = window.localStorage.getItem(GROUP_STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function NavBadge({ count, noun }) {
  if (count == null || count <= 0) return null;
  return (
    <span className="nav-count">
      <span aria-hidden="true">{count}</span>
      <span className="sr-only">
        {count} {noun}
      </span>
    </span>
  );
}

function NavRow({ id, activeId, badges, leaf, onNavigate }) {
  const item = destinationById(id);
  if (!item) return null;
  const active = item.id === activeId;

  return (
    <li>
      <a
        className={`nav-item${leaf ? ' nav-leaf' : ''}${active ? ' active' : ''}`}
        href={item.route}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
      >
        <span className="nav-icon">
          <Icon name={item.icon} />
        </span>
        {item.label}
        {item.badge === 'openSteps' && <NavBadge count={badges.openSteps} noun="steps still open" />}
        {item.badge === 'decisions' && (
          <NavBadge
            count={badges.decisions}
            noun={badges.decisions === 1 ? 'decision you have not opened' : 'decisions you have not opened'}
          />
        )}
        {item.badge === 'required' && (
          <NavBadge
            count={badges.required}
            noun={badges.required === 1 ? 'required event' : 'required events'}
          />
        )}
      </a>
    </li>
  );
}

function NavSkeleton() {
  return (
    <div className="nav-skeleton" aria-hidden="true">
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((key, index) => (
        <span key={key} className={index === 2 || index === 5 ? 'skeleton-line label' : 'skeleton-line'} />
      ))}
    </div>
  );
}

export default function Sidebar({
  open,
  activeId,
  identity,
  badges = {},
  state = 'ready',
  onNavigate,
  onClose,
  onRetry,
}) {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const panel = useRef(null);
  const help = destinationById(UTILITY_ID);
  const profile = destinationById(PROFILE_ID);

  // A collapsed group never hides where the student is.
  useEffect(() => {
    const holder = NAV.find(
      (entry) => entry.kind === 'group' && entry.items.includes(activeId),
    );
    if (!holder) return;
    setCollapsed((current) => (current[holder.id] ? { ...current, [holder.id]: false } : current));
  }, [activeId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(GROUP_STORE, JSON.stringify(collapsed));
    } catch {
      // A portal that cannot remember a preference still has to navigate.
    }
  }, [collapsed]);

  // Below 820px the sidebar is a dialog: focus is trapped until it closes.
  useEffect(() => {
    if (!open) return undefined;
    const node = panel.current;
    if (!node) return undefined;

    // The one overlay that never unmounts, so it keeps its own effect — but it
    // reads the shared selector rather than a fourth copy of one. ENR-181.
    const focusable = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );

    focusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function toggleGroup(id) {
    setCollapsed((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <aside
      className={`sidebar ${open ? 'sidebar-open' : ''}`}
      ref={panel}
      role={open ? 'dialog' : undefined}
      aria-modal={open ? 'true' : undefined}
      aria-label="Primary navigation"
    >
      <div className="brand-row">
        <div className="university-mark" aria-hidden="true">
          A
        </div>
        <div className="brand-name">
          <strong>Aster</strong>
          <span>New Student Portal</span>
        </div>
        <IconButton
          className="nav-close"
          name="close"
          size={18}
          label="Close navigation"
          tip="Close"
          onClick={onClose}
        />
      </div>

      {state === 'loading' && <NavSkeleton />}

      {state === 'error' && (
        <div className="nav-error" role="status">
          <span>
            <Icon name="alert" size={17} />
          </span>
          <p>We couldn’t load your sections.</p>
          <button onClick={onRetry}>
            <Icon name="refresh" size={15} /> Try again
          </button>
        </div>
      )}

      {state !== 'loading' && state !== 'error' && (
        <nav className="main-nav" aria-label="Primary">
          <ul className="nav-list">
            {NAV.map((entry) => {
              if (entry.kind === 'link') {
                return (
                  <NavRow
                    key={entry.id}
                    id={entry.id}
                    activeId={activeId}
                    badges={badges}
                    onNavigate={onNavigate}
                  />
                );
              }

              const isOpen = !collapsed[entry.id];
              const holdsActive = entry.items.includes(activeId);

              return (
                <li className="nav-group" key={entry.id}>
                  <button
                    className={`nav-group-toggle${holdsActive && !isOpen ? ' holds-active' : ''}`}
                    id={`nav-group-${entry.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`nav-group-list-${entry.id}`}
                    onClick={() => toggleGroup(entry.id)}
                  >
                    {entry.label}
                    <span className={`group-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">
                      <Icon name="chevron" size={15} />
                    </span>
                  </button>
                  <ul
                    className="nav-sublist"
                    id={`nav-group-list-${entry.id}`}
                    aria-labelledby={`nav-group-${entry.id}`}
                    hidden={!isOpen}
                  >
                    {entry.items.map((id) => (
                      <NavRow
                        key={id}
                        id={id}
                        activeId={activeId}
                        badges={badges}
                        leaf
                        onNavigate={onNavigate}
                      />
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {state === 'partial' && (
            <p className="nav-note">
              <Icon name="info" size={13} /> Some counts are unavailable. The sections still open.
            </p>
          )}
        </nav>
      )}

      <div className="sidebar-bottom">
        <a
          className={`nav-item${activeId === help.id ? ' active' : ''}`}
          href={help.route}
          aria-current={activeId === help.id ? 'page' : undefined}
          onClick={onNavigate}
        >
          <span className="nav-icon">
            <Icon name={help.icon} />
          </span>
          {help.label}
        </a>
        <a
          className={`profile-chip${activeId === profile.id ? ' active' : ''}`}
          href={profile.route}
          aria-current={activeId === profile.id ? 'page' : undefined}
          onClick={onNavigate}
        >
          <span className="avatar" aria-hidden="true">
            {identity.initials}
          </span>
          <span className="profile-name">
            {/* The preferred name, from the record — ENR-179 AC 3. Typed here,
                it was one of two copies and the profile could not govern it. */}
            <strong>{identity.displayName}</strong>
            <span>{identity.standing}</span>
          </span>
          <span className="chip-chevron" aria-hidden="true">
            <Icon name="chevron" size={16} />
          </span>
        </a>
        <p className="powered-by">
          Powered by <strong>Audentra</strong>
        </p>
      </div>
    </aside>
  );
}
