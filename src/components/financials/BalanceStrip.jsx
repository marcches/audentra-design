import AdvisorBar from '../AdvisorBar.jsx';
import TermTip from './TermTip.jsx';
import { financialAidAdvisor } from '../../data.js';
import { formatMoney } from '../../lib/money.js';

/**
 * The slot My Enrollment gives its progress ring. Here it holds the one figure
 * the section exists to answer, and beside it the person who owns the subject —
 * the same component, the same position, a different advisor.
 *
 * [Vercel](https://mobbin.com/screens/bb359ef6-ecec-4909-ae49-ddd4369d06de):
 * the figure, a chip that names its nature, one line saying what will change it.
 */
export default function BalanceStrip({ ledger, year, unknown, onContact }) {
  return (
    <section className="progress-panel balance-panel" aria-label="Your balance">
      <div className="balance-summary">
        <span className="panel-label">
          Estimated remaining balance
          <TermTip term="balance" label="estimated remaining balance" />
        </span>

        {unknown ? (
          <strong className="balance-figure unknown">Not available yet</strong>
        ) : (
          <strong className="balance-figure">
            {formatMoney(ledger.balance)}
            <span className="estimate-chip">Estimate</span>
          </strong>
        )}

        <p>
          {unknown
            ? 'Aster opens your financial record once your enrollment deposit is paid.'
            : ledger.hasPending
              ? `Before your aid package is final — this number will go down, not up. ${year.label}.`
              : `Your package is final. This can still change if your housing or meal plan does. ${year.label}.`}
        </p>
      </div>

      <AdvisorBar advisor={financialAidAdvisor} onContact={onContact} />
    </section>
  );
}
