import Icon from '../../design-system/Icon.jsx';
import Card from '../../design-system/primitives/Card.jsx';
import TermTip from './TermTip.jsx';
import { costOfAttendance } from '../enrollment/data.js';
import { formatCredit, formatMoney } from './logic.js';

/**
 * ENR-159 AC 1 requires cost, accepted aid, payments and deposits, possible
 * additional aid and the estimated remaining balance to be shown **together**.
 * ENR-180's information architecture splits My Financials into three pages. Both
 * hold: the five figures live here, on Overview, and each one links to the leaf
 * that details it.
 *
 * A table, not a stack of divs, so a screen reader pairs every label with its
 * amount. [Squarespace](https://mobbin.com/screens/8e645c6b-ec1f-4103-9dfc-ad72587f48b5)
 * for the ruled ledger foot.
 */
/**
 * ENR-207 / ENR-211 AC 8 — these two lines are the only place My Financials and Housing can
 * contradict each other. Residences carry their own rates, so this figure is true of one room type
 * and not of the catalogue; saying which one it assumes is what turns a difference into a
 * comparison. The figures do not move here — they move when Housing Services assigns a room, which
 * is what the balance strip has always said.
 */
const HOUSING_BASIS = {
  housing: 'Assumes a standard double room',
  meals: 'Assumes the full meal plan',
};

export default function CostCard({ ledger, snapshot, year, children }) {
  return (
    <Card aria-labelledby="cost-title">
      <div className="card-heading">
        <span className="card-icon">
          <Icon name="receipt" size={19} />
        </span>
        <div>
          <h2 id="cost-title">Cost &amp; coverage</h2>
          <p>
            {year.label} · {year.entry}
          </p>
        </div>
      </div>

      {children}

      <table className="ledger">
        <caption className="sr-only">
          What the {year.label} costs, what is covering it, and what is left
        </caption>
        <tbody>
          <tr className="ledger-group">
            <th scope="row">
              Cost of attendance
              <TermTip term="coa" label="cost of attendance" />
            </th>
            <td />
            <td className="ledger-amount">{formatMoney(ledger.cost)}</td>
          </tr>
          {costOfAttendance.map((item) => (
            <tr className="ledger-sub" key={item.id}>
              <th scope="row">
                {item.label}
                {HOUSING_BASIS[item.id] && <small>{HOUSING_BASIS[item.id]}</small>}
              </th>
              <td>
                {item.estimate && (
                  <span className="estimate-chip small">
                    Estimate
                    <TermTip term="estimate" label={item.label} />
                  </span>
                )}
                {HOUSING_BASIS[item.id] && (
                  <a className="ledger-link" href="#/housing">
                    Compare residences <Icon name="arrow" size={13} />
                  </a>
                )}
              </td>
              <td className="ledger-amount">{formatMoney(item.amount)}</td>
            </tr>
          ))}

          <tr className="ledger-group">
            <th scope="row">
              Accepted financial aid
              <TermTip term="aid" label="financial aid" />
            </th>
            <td>
              <a className="ledger-link" href="#/financials/aid">
                See every source <Icon name="arrow" size={13} />
              </a>
            </td>
            <td className="ledger-amount credit">{formatCredit(ledger.aidAccepted)}</td>
          </tr>
          {ledger.pending.map((item) => (
            <tr className="ledger-sub pending-row" key={item.id}>
              <th scope="row">
                {item.label}
                {item.term && <TermTip term={item.term} label={item.label} />}
                <small>{item.blockedNote}</small>
              </th>
              <td>
                <span className="aid-status pending">Pending</span>
              </td>
              <td className="ledger-amount pending">Pending</td>
            </tr>
          ))}

          <tr className="ledger-group">
            <th scope="row">Payments and deposits</th>
            <td>
              <a className="ledger-link" href="#/financials/payments">
                See your schedule <Icon name="arrow" size={13} />
              </a>
            </td>
            <td className="ledger-amount credit">
              {ledger.paid > 0 ? formatCredit(ledger.paid) : 'None recorded yet'}
            </td>
          </tr>

          <tr className="ledger-group soft">
            <th scope="row">Possible additional aid</th>
            <td>
              <span className="ledger-hint">Not counted below until it is awarded</span>
            </td>
            <td className="ledger-amount soft">up to {formatMoney(ledger.additionalTotal)}</td>
          </tr>

          <tr className="ledger-total">
            <th scope="row">
              Estimated remaining balance
              <TermTip term="balance" label="estimated remaining balance" />
            </th>
            <td>
              <span className="estimate-chip">Estimate</span>
            </td>
            <td className="ledger-amount">{formatMoney(ledger.balance)}</td>
          </tr>
          <tr className="ledger-sub split">
            <th scope="row">
              Aster bills you directly for
              <TermTip term="direct" label="what Aster bills you directly" />
            </th>
            <td />
            <td className="ledger-amount">{formatMoney(ledger.billedRemaining)}</td>
          </tr>
          <tr className="ledger-sub split">
            <th scope="row">
              You’ll spend the rest elsewhere
              <TermTip term="indirect" label="what you spend elsewhere" />
            </th>
            <td />
            <td className="ledger-amount">{formatMoney(ledger.elsewhere)}</td>
          </tr>
        </tbody>
      </table>

      {snapshot.aid.some((item) => item.status === 'pending') && (
        <p className="ledger-foot">
          <Icon name="clock" size={15} />
          Aid that is still pending is listed above without an amount, and is not subtracted from
          your balance. It has never been counted as zero.
        </p>
      )}
    </Card>
  );
}
