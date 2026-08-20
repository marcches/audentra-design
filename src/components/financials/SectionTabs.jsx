import Icon from '../../Icon.jsx';
import { groupLeaves } from '../../lib/navigation.js';

/**
 * My Financials is a group of three pages in ENR-180's information architecture.
 * Until the sidebar groups are the only way in, the section carries its own tab
 * row so a student can move between the three without going back to the nav.
 *
 * Labels and routes come from `navigation.js`, so a page cannot be called one
 * thing here and another in the sidebar.
 */
export default function SectionTabs({ activeId }) {
  const leaves = groupLeaves('financials');

  return (
    <nav className="section-tabs" aria-label="My Financials sections">
      {leaves.map((leaf) => {
        const active = leaf.id === activeId;
        return (
          <a
            key={leaf.id}
            className={`section-tab${active ? ' active' : ''}`}
            href={leaf.route}
            aria-current={active ? 'page' : undefined}
          >
            <Icon name={leaf.icon} size={16} />
            {leaf.label}
          </a>
        );
      })}
    </nav>
  );
}
