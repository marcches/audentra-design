import Icon from '../../design-system/Icon.jsx';
import Card from '../../design-system/primitives/Card.jsx';
import StateCard from '../../design-system/patterns/StateCard.jsx';
import TermTip from './TermTip.jsx';
import { formatCredit, formatMoney } from './logic.js';

const KIND = {
  grant: 'Grant · never repaid',
  loan: 'Loan · you repay it after you leave Aster',
  work: 'Work-study · earned by working',
};

const STATUS = {
  accepted: 'Accepted',
  pending: 'Pending',
  offered: 'Offered',
};

/**
 * ENR-159 AC 4: aid broken down by funding source. Each row also says whether it
 * is repaid, because "grant" and "loan" are the two words in this vocabulary a
 * family most often reads as the same thing.
 *
 * A pending award keeps a row of its own with no amount and the reason it is
 * held, after [Whop](https://mobbin.com/screens/665c549f-5a6a-4fd1-bb81-0f5ce819f23f).
 * It is never rendered as a zero.
 */
export default function AidSources({ snapshot, ledger }) {
  return (
    <Card aria-labelledby="aid-title">
      <div className="card-heading">
        <span className="card-icon">
          <Icon name="award" size={19} />
        </span>
        <div>
          <h2 id="aid-title">
            Aid by source
            <TermTip term="aid" label="financial aid" />
          </h2>
          <p>Who is paying, how much, and whether you pay it back.</p>
        </div>
      </div>

      {snapshot.aid.length === 0 ? (
        <StateCard variant="empty" icon="award" title="No aid on your record yet">
          Your package appears here once the Financial Aid Office releases it.
        </StateCard>
      ) : (
        <ul className="aid-list">
          {snapshot.aid.map((item) => {
            return (
              <li className={`aid-row ${item.status}`} key={item.id}>
                <div className="aid-row-main">
                  <strong>
                    {item.label}
                    {item.term && <TermTip term={item.term} label={item.label} />}
                  </strong>
                  {item.gloss && <span className="aid-gloss">{item.gloss}</span>}
                  <span className="aid-source">{item.source}</span>
                  <span className="aid-kind">{KIND[item.kind] ?? ''}</span>
                </div>

                {/* A pending source says so once, on the line below, with its reason
                    (UX writing 5.7) — not as a chip, an amount and a note at once. */}
                {item.status !== 'pending' && (
                  <span className={`aid-status ${item.status}`}>{STATUS[item.status]}</span>
                )}

                {item.amount !== null && (
                  <span className={`aid-amount ${item.status}`}>{formatCredit(item.amount)}</span>
                )}

                {/* The row states the dependency; the action lives in the band
                    under the balance, once (F2 as B3.1 corrected it, 2026-08-21). */}
                {item.status === 'pending' && (
                  <p className="aid-blocked">
                    <Icon name="clock" size={14} />
                    Pending · {item.blockedNote}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="aid-total">
        <span>Accepted so far</span>
        <strong>{formatMoney(ledger.aidAccepted)}</strong>
      </div>
    </Card>
  );
}
