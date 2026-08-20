import Icon from '../../Icon.jsx';
import StateCard from '../StateCard.jsx';
import TermTip from './TermTip.jsx';
import { paymentPlan } from '../../data.js';
import { formatMoney } from '../../lib/money.js';

const MARK = {
  received: { icon: 'check', word: 'Received' },
  due: { icon: 'clock', word: 'Due next' },
  scheduled: { icon: null, word: 'Scheduled' },
};

/**
 * One list with the mark carrying status, after
 * [Wise](https://mobbin.com/screens/f059eb98-6f0a-4fe0-a29a-3ce877141006) —
 * rather than the five-column table
 * [HoneyBook](https://mobbin.com/screens/33ae38b9-039f-49fb-b142-117c47f7119a)
 * uses, which cannot survive 360px.
 *
 * Every row here is the same object the ledger totals, so the schedule and the
 * summary cannot disagree — ENR-159 AC 7.
 */
export default function ScheduleList({ schedule, ledger, unavailable, onChangePlan, onRetry }) {
  return (
    <section className="schedule-card" aria-labelledby="schedule-title">
      <div className="card-heading">
        <span className="card-icon">
          <Icon name="calendar" size={19} />
        </span>
        <div>
          <h2 id="schedule-title">Payment schedule</h2>
          <p>What Aster bills you, split across the year.</p>
        </div>
      </div>

      {unavailable ? (
        <StateCard
          variant="error"
          icon="alert"
          title="Your schedule didn’t load"
          action={{ label: 'Try again', icon: 'refresh', onClick: onRetry }}
        >
          The rest of this page is up to date. No payment has been missed because of this.
        </StateCard>
      ) : schedule.length === 0 ? (
        <StateCard variant="empty" icon="calendar" title="No payments scheduled yet">
          Aster builds your schedule once your charges are posted for the term.
        </StateCard>
      ) : (
        <>
          <div className="plan-row">
            <div>
              <strong>
                You’re on the {paymentPlan.name}
                <TermTip term="plan" label={paymentPlan.name} />
              </strong>
              <span>{paymentPlan.detail}</span>
            </div>
            <button className="secondary-button" onClick={onChangePlan}>
              Change plan
            </button>
          </div>

          <ul className="installment-list">
            {schedule.map((row) => {
              const mark = MARK[row.status] ?? MARK.scheduled;
              return (
                <li className={`installment-row ${row.status}`} key={row.id}>
                  <span className="installment-mark" aria-hidden="true">
                    {mark.icon && <Icon name={mark.icon} size={13} />}
                  </span>
                  <span className="installment-date">{row.date}</span>
                  <span className="installment-label">{row.label}</span>
                  <span className="installment-status">{mark.word}</span>
                  <span className="installment-amount">{formatMoney(row.amount)}</span>
                </li>
              );
            })}
          </ul>

          <p className="ledger-foot">
            <Icon name="info" size={15} />
            {formatMoney(ledger.scheduleTotal)} in total — what Aster bills you, minus the aid you
            have accepted. Installments are an estimate and are recalculated if your aid changes.
          </p>
        </>
      )}
    </section>
  );
}
