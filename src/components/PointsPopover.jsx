import Icon from '../Icon.jsx';
import { ladderFor, nextReward } from '../lib/rewards.js';

/**
 * What a point is worth — ENR-162, the popover half.
 *
 * The catalogue **is** the institution-defined value AC 1 asks for. Aster does
 * not convert points into money, so no exchange rate is stated and none is
 * invented; the ladder says what the balance reaches, which is the same
 * question answered in the institution's own terms.
 *
 * There is no Claim, no Redeem and no control on a catalogue row. ENR-148 puts
 * reward redemption mechanics out of scope, and `design-workflow.md` §1 is
 * explicit that out of scope is not built smaller. A row here is information.
 *
 * No accent colour anywhere in this file, deliberately. The topbar sits two
 * chips away from the bell, which spends crimson when something needs her —
 * AC 6 says points must never compete with an outstanding required action, and
 * the colour budget is how that is enforced rather than hoped for.
 */
const LEDGER_SHOWN = 3;

export default function PointsPopover({ balance, awarded, unavailable, onOpenPoints, onClose }) {
  const next = unavailable ? null : nextReward(balance);
  const ladder = unavailable ? null : ladderFor(balance);
  const shown = (awarded ?? []).slice(0, LEDGER_SHOWN);
  const rest = Math.max(0, (awarded ?? []).length - LEDGER_SHOWN);

  return (
    <>
      <div className="pop-head">
        <h2>Your momentum</h2>
      </div>

      {unavailable ? (
        <div className="pop-state">
          <p>Your balance didn’t load this time. Nothing you earned is lost.</p>
        </div>
      ) : (
        <>
          <p className="points-balance">
            <strong>{balance.toLocaleString()}</strong> pts
          </p>

          {awarded.length === 0 ? (
            <p className="points-lede">
              You haven’t earned any points yet. Finishing a step is what earns them.
            </p>
          ) : next ? (
            <p className="points-lede">
              {next.label} is {next.away.toLocaleString()} pts away
            </p>
          ) : (
            <p className="points-lede">Everything on Aster’s reward list is within reach.</p>
          )}

          <div className="points-ladder">
            <div className="ladder-track">
              <span className="ladder-fill" style={{ width: `${ladder.fill}%` }} />
              {ladder.items.map((item) => (
                <i
                  key={item.id}
                  className={`ladder-mark ${item.reached ? 'reached' : ''}`}
                  style={{ left: `${item.at}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <ul className="ladder-list">
              {ladder.items.map((item) => (
                <li key={item.id} className={item.reached ? 'reached' : ''}>
                  <span>{item.label}</span>
                  <span className="ladder-cost">{item.cost.toLocaleString()} pts</span>
                </li>
              ))}
            </ul>
          </div>

          {awarded.length > 0 && (
            <section className="points-awards">
              <h3>How you earned it</h3>
              <ul>
                {shown.map((award) => (
                  <li key={award.title}>
                    <span>{award.title}</span>
                    <span className="award-when">{award.date}</span>
                    <span className="award-points">{award.points} pts</span>
                  </li>
                ))}
              </ul>
              {rest > 0 && <p className="award-more">and {rest} more</p>}
            </section>
          )}
        </>
      )}

      {/* The measure states its own definition where it is displayed — the rule
          ENR-57 AC 4 already sets on the staff side — and it is where AC 4's
          guarantee about earned points is said out loud. */}
      <p className="pop-foot">
        Points come from Aster’s published reward list. What you’ve already earned never changes when
        that list does.{' '}
        <button
          className="link-button"
          onClick={() => {
            onClose();
            onOpenPoints();
          }}
        >
          How points work <Icon name="arrow" size={13} />
        </button>
      </p>
    </>
  );
}
