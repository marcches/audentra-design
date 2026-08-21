import Icon from '../../design-system/Icon.jsx';
import { shortDate } from './logic.js';

export default function OrgRow({ org, matched, onOpen }) {
  return (
    <button
      className="campus-row org-row"
      onClick={(clickEvent) => onOpen(org, clickEvent.currentTarget)}
    >
      <span className="org-tile" aria-hidden="true">
        {org.icon ? <Icon name={org.icon} size={24} weight="duotone" /> : org.initials}
      </span>

      <span className="campus-row-copy">
        <span className="campus-row-title">
          {org.name}
          <span className="category-chip">{org.category}</span>
          {matched && (
            <span className="match-chip">
              <Icon name="spark" size={12} /> Matches {matched}
            </span>
          )}
        </span>
        <span className="org-description">{org.description}</span>
        <span className="campus-row-meta">
          <span>
            <Icon name="clock" size={13} /> {org.meets}
          </span>
          <span>
            <Icon name="profile" size={13} /> {org.contact.name}
          </span>
        </span>
        <span className={`org-update ${org.latestUpdate ? '' : 'quiet'}`}>
          {org.latestUpdate ? (
            <>
              <b>{shortDate(org.latestUpdate.date)}</b> {org.latestUpdate.text}
            </>
          ) : (
            'No updates published yet'
          )}
        </span>
      </span>
    </button>
  );
}
