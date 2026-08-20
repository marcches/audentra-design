import Icon from '../../Icon.jsx';
import TermTip from './TermTip.jsx';
import { formatMoney } from '../../lib/money.js';

/**
 * Overview owns the full balance strip. The other two pages in the group carry
 * this one line, so the number a student came for is never more than a glance
 * away — and never stated twice in two different ways.
 */
export default function BalanceMini({ ledger, year }) {
  return (
    <div className="balance-mini">
      <span className="panel-label">
        Estimated remaining balance
        <TermTip term="balance" label="estimated remaining balance" />
      </span>
      <strong>
        {formatMoney(ledger.balance)}
        <span className="estimate-chip">Estimate</span>
      </strong>
      <span className="balance-mini-year">{year.label}</span>
      <a className="learn-link" href="#/financials/overview">
        See the full picture <Icon name="arrow" size={14} />
      </a>
    </div>
  );
}
