import Icon from '../../design-system/Icon.jsx';
import { additionalAid } from '../enrollment/data.js';
import { formatMoney } from './logic.js';

/**
 * The slot `.skipped-card` holds on My Enrollment: the light card under the hard
 * number, offering something rather than asking for it. Awarding aid is out of
 * scope — this points at what exists, it does not grant it.
 */
export default function AidOpportunityCard({ total }) {
  return (
    <div className="aid-opportunity-card">
      <div className="aid-opportunity-top">
        <span className="points-icon">
          <Icon name="gift" size={18} />
        </span>
        <span className="resume-badge">Still open to you</span>
      </div>
      <h3>{additionalAid.length} more ways to lower this</h3>
      <p>
        Nothing here is awarded yet, so none of it is subtracted from your balance. Together they
        could reduce it by up to {formatMoney(total)}.
      </p>
      <ul className="aid-opportunity-list">
        {additionalAid.map((item) => (
          <li key={item.id}>
            <strong>
              {item.label} — {item.prefix ? `${item.prefix} ` : ''}
              {formatMoney(item.amount)}
            </strong>
            <span>{item.note}</span>
          </li>
        ))}
      </ul>
      <a className="learn-link" href="#/financials/aid">
        See what I could add <Icon name="arrow" size={14} />
      </a>
    </div>
  );
}
