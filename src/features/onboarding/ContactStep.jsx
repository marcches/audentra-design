import Card, { CardFoot, CardHead } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';
import Field from '../../design-system/primitives/Field.jsx';
import { channelOptions } from './data.js';

/**
 * Step 2. The channel options are profile's, quoted rather than re-typed —
 * ENR-179 AC 4 is that a channel is not a label on a record but a decision
 * about what Aster *does*, so each option says what Aster will do. Re-typing
 * them here would be the first sentence of the drift.
 *
 * The consequence lives on the option, before it is chosen, not in a footnote
 * after it: `Needs a verified number` is the kind of thing a student needs
 * while she is deciding, not once she has decided.
 */
export default function ContactStep({ draft, onChange }) {
  return (
    <>
      <Card className="asking">
        <CardHead
          kind="status"
          icon="mail"
          tone="ask"
          title="Where to find you"
          note="Aster writes to your personal address until your Aster one is issued."
        />
        <div className="card-body">
          <Field
            label="Personal email"
            type="email"
            autoComplete="email"
            value={draft.email}
            onChange={(value) => onChange({ email: value })}
          />
          <Field
            label="Mobile number"
            type="tel"
            autoComplete="tel"
            value={draft.mobile}
            hint="Used for anything time-critical, and never for anything else."
            onChange={(value) => onChange({ mobile: value })}
          />
          <Field
            label="Mailing address"
            autoComplete="street-address"
            value={draft.address}
            hint="Where Aster posts anything that has to arrive on paper."
            onChange={(value) => onChange({ address: value })}
          />
        </div>
      </Card>

      <Card>
        <CardHead
          kind="section"
          eyebrow="Your choice"
          title="Where should Aster write first?"
        />
        <div className="card-body">
          <div className="choice-panel" role="radiogroup" aria-label="Where Aster writes first">
            {channelOptions.map(([id, label, does]) => (
              <label key={id} className={draft.channel === id ? 'chosen' : ''}>
                <input
                  type="radio"
                  name="channel"
                  value={id}
                  checked={draft.channel === id}
                  onChange={() => onChange({ channel: id })}
                />
                <span>
                  <strong>{label}</strong>
                  <small>{does}</small>
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
            <Icon name="info" size={14} /> Whatever you pick, anything with a deadline is also written
            down in the portal. Nothing important lives in one place only.
          </p>
        </CardFoot>
      </Card>
    </>
  );
}
