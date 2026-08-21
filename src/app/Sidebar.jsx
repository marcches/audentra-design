import { useEffect, useRef, useState } from 'react';
import Icon from '../design-system/Icon.jsx';
import AsterMark from '../design-system/marks/AsterMark.jsx';
import AudentraMark from '../design-system/marks/AudentraMark.jsx';
import { IconButton } from '../design-system/primitives/Button.jsx';
import NavItem, { NavGroup, NavSkeleton, ProfileChip } from '../design-system/primitives/NavItem.jsx';
import StateCard from '../design-system/patterns/StateCard.jsx';
import { NAV, PROFILE_ID, UTILITY_ID, destinationById } from '../lib/navigation.js';
import { FOCUSABLE } from '../lib/overlay.js';

const GROUP_STORE = 'aster.nav.open';

/**
 * Groups closed by default — every accordion in the product is (Marco,
 * 2026-08-21) — and the one holding the page you are on is opened for you, so
 * a closed group never hides where the student is. What she opens after that
 * is remembered. Anything unreadable in storage falls back to closed.
 */
function readOpen() {
  try {
    const raw = window.localStorage.getItem(GROUP_STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/** A row's count, and what it says to a screen reader — the number alone is a number. */
function countFor(item, badges) {
  if (item.badge === 'openSteps') {
    const n = badges.openSteps;
    return { count: n, label: n === 1 ? '1 step still open' : `${n} steps still open` };
  }
  if (item.badge === 'required') {
    const n = badges.required;
    return { count: n, label: n === 1 ? '1 required event' : `${n} required events` };
  }
  return {};
}

/**
 * One destination, as a row. The shape is `NavItem` (design-system); this
 * only reads the destination model and hands it a route, a glyph and a label.
 */
function NavRow({ id, activeId, badges, onNavigate }) {
  const item = destinationById(id);
  if (!item) return null;
  const { count, label } = countFor(item, badges);
  return (
    <li>
      <NavItem
        href={item.route}
        icon={item.icon}
        active={item.id === activeId}
        count={count}
        countLabel={label}
        onClick={onNavigate}
      >
        {item.label}
      </NavItem>
    </li>
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
  const [openGroups, setOpenGroups] = useState(readOpen);
  const panel = useRef(null);
  const help = destinationById(UTILITY_ID);
  const profile = destinationById(PROFILE_ID);

  // A closed group never hides where the student is.
  useEffect(() => {
    const holder = NAV.find(
      (entry) => entry.kind === 'group' && entry.items.includes(activeId),
    );
    if (!holder) return;
    setOpenGroups((current) => (current[holder.id] ? current : { ...current, [holder.id]: true }));
  }, [activeId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(GROUP_STORE, JSON.stringify(openGroups));
    } catch {
      // A portal that cannot remember a preference still has to navigate.
    }
  }, [openGroups]);

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
    setOpenGroups((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <aside
      className={`sidebar ${open ? 'sidebar-open' : ''}`}
      ref={panel}
      role={open ? 'dialog' : undefined}
      aria-modal={open ? 'true' : undefined}
      aria-label="Primary navigation"
    >
      {/* The brand row is the topbar's height; the mark is the `md` disc, the
          same size the profile chip ends the column with. */}
      <div className="brand-row">
        <span className="brand-mark" aria-hidden="true">
          <AsterMark size={40} tile />
        </span>
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
        <StateCard
          variant="error"
          size="compact"
          className="nav-error"
          title="Your sections couldn’t be loaded."
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          Nothing you’ve done is lost.
        </StateCard>
      )}

      {state !== 'loading' && state !== 'error' && (
        <nav className="main-nav" aria-label="Primary">
          <ul className="nav-list">
            {NAV.map((entry) =>
              entry.kind === 'link' ? (
                <NavRow
                  key={entry.id}
                  id={entry.id}
                  activeId={activeId}
                  badges={badges}
                  onNavigate={onNavigate}
                />
              ) : (
                <NavGroup
                  key={entry.id}
                  id={entry.id}
                  label={entry.label}
                  open={Boolean(openGroups[entry.id])}
                  holdsActive={entry.items.includes(activeId)}
                  onToggle={() => toggleGroup(entry.id)}
                >
                  {entry.items.map((id) => (
                    <NavRow
                      key={id}
                      id={id}
                      activeId={activeId}
                      badges={badges}
                      onNavigate={onNavigate}
                    />
                  ))}
                </NavGroup>
              ),
            )}
          </ul>

          {state === 'partial' && (
            <p className="nav-note">
              <Icon name="info" size={14} /> Some counts are unavailable. The sections still open.
            </p>
          )}
        </nav>
      )}

      {/* The foot: Help is a row like any other; the chip is the way in to the
          profile; the vendor's line closes the column. */}
      <div className="sidebar-bottom">
        <NavItem
          href={help.route}
          icon={help.icon}
          active={activeId === help.id}
          onClick={onNavigate}
        >
          {help.label}
        </NavItem>
        <ProfileChip
          href={profile.route}
          person={identity}
          name={identity.displayName}
          standing={identity.standing}
          active={activeId === profile.id}
          onClick={onNavigate}
        />
        <p className="powered-by">
          Powered by <AudentraMark height={13} /> <strong>Audentra</strong>
        </p>
      </div>
    </aside>
  );
}
