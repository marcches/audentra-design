import Card, { CardFoot, CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';
import { planOptions, residences, responseDeadline } from './data.js';
import { shortlistLine } from './logic.js';

/**
 * Step 5. The card is explicit about what was wrong with this screen: *"The
 * housing step currently opens with abstract framing that the product decision
 * rejected, and the concrete plan question should lead."*
 *
 * So it leads. `Where will you live?` and the four plans, above everything,
 * with exactly one sentence before them — the one ENR-210 AC 2 requires, which
 * is that none of the four is a skip. Nothing about housing philosophy, nothing
 * about "your living situation", no paragraph she has to get through to reach
 * the question she came to answer.
 *
 * The plans, their hints and their consequences are `features/housing/data.js`'s
 * strings, quoted. Housing renders the same four sentences on `#/housing`, and
 * a student who answers here and opens Housing tomorrow must find her own
 * answer, in her own words — not a paraphrase of it.
 */
export default function HousingStep({ draft, onChange }) {
  const chosen = planOptions.find((option) => option.id === draft.plan) ?? null;
  const onCampus = draft.plan === 'on-campus';

  function toggleResidence(id) {
    const list = draft.shortlist;
    if (list.includes(id)) {
      onChange({ shortlist: list.filter((item) => item !== id) });
      return;
    }
    if (list.length >= 3) return;
    onChange({ shortlist: [...list, id] });
  }

  return (
    <>
      <Card className="asking">
        {/* The head does not repeat the question the page already asks. It
            carries the half of ENR-210 AC 2 that has to be read *before* the
            options, and the body carries the other half. */}
        <CardHead kind="section" icon="home" tone="accent" eyebrow="Your answer" title="All four are complete answers" />
        <div className="card-body">
          <p className="body-copy">
            None of these is a skip, and none of them is the wrong one. You can change your answer
            until {responseDeadline.full}.
          </p>

          <div className="choice-panel" role="radiogroup" aria-label="Where you will live">
            {planOptions.map((option) => (
              <label key={option.id} className={draft.plan === option.id ? 'chosen' : ''}>
                <input
                  type="radio"
                  name="housing-plan"
                  value={option.id}
                  checked={draft.plan === option.id}
                  onChange={() => onChange({ plan: option.id })}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.hint}</small>
                </span>
                <span className="radio-mark">
                  <Icon name="check" size={14} />
                </span>
              </label>
            ))}
          </div>

          {chosen && (
            <p className="choice-consequence" aria-live="polite">
              <Icon name={chosen.complete ? 'check' : 'clock'} size={16} />
              <span>{chosen.consequence}</span>
            </p>
          )}
        </div>
      </Card>

      {onCampus && (
        <Card>
          <CardHead
            kind="card"
            icon="home"
            title="Rank up to three"
            note="A preference states what you would like. Housing Services assigns the room."
          />
          <CardRows>
            {residences.map((residence) => {
              const rank = draft.shortlist.indexOf(residence.id);
              const full = draft.shortlist.length >= 3 && rank === -1;
              const cheapest = residence.rooms.reduce((low, room) =>
                room.rate < low.rate ? room : low,
              );
              return (
                <button
                  key={residence.id}
                  className={`residence-pick${rank > -1 ? ' picked' : ''}`}
                  aria-pressed={rank > -1}
                  disabled={full}
                  onClick={() => toggleResidence(residence.id)}
                >
                  <span className={rank > -1 ? 'pick-rank set' : 'pick-rank'} aria-hidden="true">
                    {rank > -1 ? rank + 1 : ''}
                  </span>
                  <span className="pick-copy">
                    <strong>{residence.name}</strong>
                    <small>
                      {residence.area} · {residence.walk} min walk · from $
                      {cheapest.rate.toLocaleString('en-US')}
                    </small>
                  </span>
                  {/* Full is stated, not implied. A row that has simply gone
                      grey says "you cannot"; this says what to do instead. */}
                  <span className="pick-action">
                    {rank > -1 ? 'Remove' : full ? 'Unrank one first' : 'Rank it'}
                  </span>
                </button>
              );
            })}
          </CardRows>
          <CardFoot>
            <p>
              <Icon name="info" size={14} />
              <span>
                {shortlistLine(draft.shortlist)} Room types, rates and meal plans are all in Housing,
                and you can change this until {responseDeadline.label}.
              </span>
            </p>
          </CardFoot>
        </Card>
      )}
    </>
  );
}
