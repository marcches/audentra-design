import Card, { CardFoot, CardHead } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';
import Field from '../../design-system/primitives/Field.jsx';

/**
 * Step 3, and the whole reason it sits directly before step 4.
 *
 * ENR-152 AC 4 — "an emergency contact is never granted record access by being
 * an emergency contact" — is usually written as a line in a privacy policy. It
 * is placed here instead, in the foot of the card where she has just typed the
 * name, because that is the moment the question actually occurs to her. Saying
 * it one screen later, on a screen about permissions, would be answering a
 * question she has already answered wrong in her head.
 */
export default function EmergencyStep({ draft, onChange }) {
  const first = draft.emergencyName.trim().split(' ')[0];

  return (
    <Card className="asking">
      <CardHead
        kind="status"
        icon="bell"
        tone="ask"
        title="One person Aster can reach"
        note="Aster calls them only if something happens to you. Nothing else uses this."
      />
      <div className="card-body">
        <Field
          label="Their name"
          autoComplete="name"
          value={draft.emergencyName}
          onChange={(value) => onChange({ emergencyName: value })}
        />
        <Field
          label="How they’re related to you"
          value={draft.emergencyRelation}
          onChange={(value) => onChange({ emergencyRelation: value })}
        />
        <Field
          label="Phone number"
          type="tel"
          autoComplete="tel"
          value={draft.emergencyPhone}
          hint="A number that will be answered. It is the only one Aster will try."
          onChange={(value) => onChange({ emergencyPhone: value })}
        />
      </div>

      {/* ENR-152 AC 4, said where the question occurs to her rather than in the
          screen it is about. */}
      <CardFoot className="separating">
        <p>
          <Icon name="shield" size={15} />
          <span>
            {first ? `${first} cannot see anything in your record.` : 'An emergency contact cannot see anything in your record.'}{' '}
            Letting someone <em>see</em> things (your bill, your grades, where you live) is a
            separate decision, and it is the next step.
          </span>
        </p>
      </CardFoot>
    </Card>
  );
}
