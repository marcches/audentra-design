import Card, { CardFoot, CardHead } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';
import { ORIENTATION_SESSIONS, planOptions } from './data.js';

/**
 * Step 8, and the only locked one.
 *
 * The lock is not a demonstration device. Residents start on the morning they
 * move in and commuters do not, so the sessions Aster can offer genuinely
 * depend on the answer to step 5 — which is what makes the printed reason
 * (`Opens once your housing plan is recorded`) a fact rather than a
 * placeholder. ENR-151 AC 3 asks a locked step to state why; a step that lies
 * about why would satisfy the letter of it and none of the point.
 *
 * The flow ends by *giving* her something — a date, a place and a time — rather
 * than asking for one more thing. Eight screens of being asked should not close
 * on a ninth ask.
 */
export default function OrientationStep({ draft, onChange }) {
  const plan = draft.plan ?? 'undecided';
  const planLabel = planOptions.find((option) => option.id === plan)?.label ?? 'your plan';
  const offered = ORIENTATION_SESSIONS.filter((session) => session.forPlans.includes(plan));

  return (
    <Card className="asking">
      <CardHead
        kind="section"
        eyebrow="The last one"
        title="Which orientation will you come to?"
        aside={
          <span className="head-note">
            <Icon name="home" size={13} /> {planLabel}
          </span>
        }
      />
      <div className="card-body">
        <p className="body-copy">
          These are the sessions for {planLabel.toLowerCase()}. Aster holds your seat the moment you
          choose, and you can change it up to a week before.
        </p>

        <div className="choice-panel" role="radiogroup" aria-label="Orientation session">
          {offered.map((session) => (
            <label key={session.id} className={draft.session === session.id ? 'chosen' : ''}>
              <input
                type="radio"
                name="orientation"
                value={session.id}
                checked={draft.session === session.id}
                onChange={() => onChange({ session: session.id })}
              />
              <span>
                <strong>{session.label} · {session.when}</strong>
                <small>
                  {session.where} · {session.hint}
                </small>
              </span>
              <span className="radio-mark">
                <Icon name="check" size={14} />
              </span>
            </label>
          ))}
        </div>
      </div>
      <CardFoot>
        <p>
          <Icon name="calendar" size={14} /> Whichever you pick lands in Appointments, with the room
          and the person running it.
        </p>
      </CardFoot>
    </Card>
  );
}
