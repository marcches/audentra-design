import Icon from '../../design-system/Icon.jsx';
import AnchorCard from '../../design-system/primitives/AnchorCard.jsx';
import { CardFoot, CardRows } from '../../design-system/primitives/Card.jsx';
import Notice from '../../design-system/patterns/Notice.jsx';
import { kindIcon } from '../enrollment/logic.js';
import { ladderFor, nextReward } from './logic.js';

/**
 * What a point is worth — ENR-162, the popover half.
 *
 * It opens the way a rail opens: with the figure on ink. `AnchorCard` is the
 * panel's first zone — the label, the balance, the one line under it, and the
 * ladder drawn on the ink plane — and the light rows follow on the card's white.
 * `MomentumCard` in My Enrollment's rail already sits on ink; the popover and
 * the rail card are now the same surface. Before Marco's round of 2026-08-21 it
 * was a figure on white, a track and two uppercase lists, and read as a
 * component from somewhere else.
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
 * Nothing on the chip changed, and inside the panel the only accent is the
 * purple the product already spends on a step's points and on the next step.
 * The topbar sits two chips away from the bell, which spends crimson when
 * something needs her — AC 6 says points must never compete with an
 * outstanding required action, and the colour budget is how that is enforced
 * rather than hoped for.
 */
const LEDGER_SHOWN = 3;

export default function PointsPopover({ balance, awarded, unavailable, onOpenPoints, onClose }) {
  const next = unavailable ? null : nextReward(balance);
  const ladder = unavailable ? null : ladderFor(balance);
  const awards = awarded ?? [];
  const shown = awards.slice(0, LEDGER_SHOWN);
  const rest = Math.max(0, awards.length - LEDGER_SHOWN);

  const line = unavailable
    ? 'Your balance didn’t load this time. Nothing you earned is lost.'
    : awards.length === 0
      ? 'You haven’t earned any points yet. Finishing a step is what earns them.'
      : next
        ? `${next.label} is ${next.away.toLocaleString()} pts away`
        : 'Everything on Aster’s reward list is within reach.';

  return (
    <>
      <AnchorCard
        variant="balance"
        label="Your momentum"
        figure={
          unavailable ? (
            '—'
          ) : (
            <>
              {balance.toLocaleString()} <small>pts</small>
            </>
          )
        }
      >
        {/* A bare outline glyph, never duotone: duotone sits on a gradient as mud. */}
        <span className="balance-mark" aria-hidden="true">
          <Icon name="spark" size={18} />
        </span>
        <p>{line}</p>
        {ladder && (
          <div className="ladder-track" aria-hidden="true">
            <span className="ladder-fill" style={{ width: `${ladder.fill}%` }} />
            {ladder.items.map((item) => (
              <i
                key={item.id}
                className={`ladder-mark${item.reached ? ' reached' : ''}`}
                style={{ left: `${item.at}%` }}
              />
            ))}
          </div>
        )}
      </AnchorCard>

      {ladder && (
        <CardRows>
          <p className="rows-label reaches">What it reaches</p>
          {ladder.items.map((item) => {
            const isNext = next?.id === item.id;
            return (
              <div
                key={item.id}
                className={`ladder-row${item.reached ? ' reached' : isNext ? ' next' : ''}`}
              >
                <i className="ladder-dot" aria-hidden="true" />
                <span className="ladder-name">
                  {item.label}
                  {item.reached && <span className="sr-only"> — reached</span>}
                  {isNext && <span className="sr-only"> — next</span>}
                </span>
                <span className="ladder-cost">{item.cost.toLocaleString()} pts</span>
              </div>
            );
          })}

          {/* AC 2 — every award attributed to the requirement that earned it, in
              the completed step's own anatomy: the kind's tile, the title, the
              date, the points. */}
          {awards.length > 0 && (
            <>
              <p className="rows-label earned-run">
                How you earned it
                <em>
                  {awards.length} {awards.length === 1 ? 'step' : 'steps'}
                </em>
              </p>
              {shown.map((award) => (
                <div className="pop-row award-row" key={award.title}>
                  <span className={`task-type-icon ${award.kind ?? ''}`} aria-hidden="true">
                    <Icon name={kindIcon(award.kind)} size={21} weight="duotone" />
                  </span>
                  <span className="pop-copy">
                    <strong>{award.title}</strong>
                    <small>{award.date}</small>
                  </span>
                  <span className="award-points">
                    <Icon name="spark" size={13} /> +{award.points}
                  </span>
                </div>
              ))}
              {rest > 0 && <p className="pop-more">and {rest} more</p>}
            </>
          )}
        </CardRows>
      )}

      {/* The measure states its own definition where it is displayed — the rule
          ENR-57 AC 4 already sets on the staff side — and it is where AC 4's
          guarantee about earned points is said out loud. */}
      <CardFoot>
        <Notice
          tone="quiet"
          action={{
            label: 'How points work',
            onClick: () => {
              onClose();
              onOpenPoints();
            },
          }}
        >
          Points come from Aster’s published reward list. What you’ve already earned never changes
          when that list does.
        </Notice>
      </CardFoot>
    </>
  );
}
