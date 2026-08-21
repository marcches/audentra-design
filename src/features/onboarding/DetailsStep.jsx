import Card, { CardHead } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';
import Field from '../../design-system/primitives/Field.jsx';
import StatedField from '../../design-system/primitives/StatedField.jsx';
import { PRONOUNS } from './data.js';

/**
 * Step 1. Two cards, and the split is the point: one card only *states*, the
 * other *asks*. A single card holding both would make her read six rows to find
 * the two she can do anything about — and "spend colour once per card, on the
 * row that is asking" has nowhere to land when every row looks alike.
 *
 * The Registrar's fields carry no control, only the name of who changes them.
 * That is `features/profile`'s rule, and it is the same record.
 */
export default function DetailsStep({ draft, onChange }) {
  return (
    <>
      <Card className="stating">
        <CardHead
          kind="card"
          icon="file"
          title="What Aster has"
          note="From your application. The Registrar keeps this half."
        />
        <div className="card-body">
          <div className="stated-grid">
            <StatedField label="Legal name" value={draft.legalName} office="The Registrar" />
            <StatedField label="Date of birth" value={draft.birthDate} office="The Registrar" />
            <StatedField label="Student number" value={draft.studentId} office="The Registrar" />
          </div>
        </div>
      </Card>

      <Card className="asking">
        <CardHead
          kind="status"
          icon="profile"
          tone="ask"
          title="Yours to set"
          note="This is the name the portal, your instructors and your card will use."
        />
        <div className="card-body">
          <Field
            label="Preferred name"
            value={draft.preferredName}
            autoComplete="given-name"
            hint="Leave it blank to be called Amelia."
            onChange={(value) => onChange({ preferredName: value })}
          />

          <p className="field-label spaced" id="pronouns-label">
            Pronouns
          </p>
          <div className="choice-panel tight" role="radiogroup" aria-labelledby="pronouns-label">
            {PRONOUNS.map((option) => (
              <label key={option.id} className={draft.pronouns === option.id ? 'chosen' : ''}>
                <input
                  type="radio"
                  name="pronouns"
                  value={option.id}
                  checked={draft.pronouns === option.id}
                  onChange={() => onChange({ pronouns: option.id })}
                />
                <span>
                  <strong>{option.label}</strong>
                </span>
                <span className="radio-mark">
                  <Icon name="check" size={14} />
                </span>
              </label>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
