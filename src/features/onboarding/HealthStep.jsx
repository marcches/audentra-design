import Card, { CardFoot, CardHead } from '../../design-system/primitives/Card.jsx';
import Icon from '../../design-system/Icon.jsx';

/**
 * Step 6, optional. One question, and `CONTEXT.md` settles every word of it.
 *
 * The **accommodation answer** has two values — *yes* and *not right now* — and
 * a third condition that is not a value: *never answered*. Not right now is a
 * complete answer: it is recorded, it blocks nothing, and it is never shown as
 * outstanding. Skipping the step is the third condition, not the second value,
 * and those must not collapse into each other — Health draws exactly this line
 * on its own screen, and it would be meaningless there if onboarding blurred it
 * here.
 *
 * The answer carries no diagnosis, no condition name and no documentation,
 * because none is ever collected. The immunization record is a *document*, it
 * lives in My Documents, and it is mentioned here only so she is not surprised
 * by it later.
 */
const ANSWERS = [
  {
    id: 'yes',
    label: 'Yes, I’d like to talk',
    hint: 'Accessibility Services gets your name. Nothing about your health is sent with it.',
  },
  {
    id: 'no',
    label: 'Not right now',
    hint: 'Recorded as your answer. It blocks nothing, and you can change it whenever you like.',
  },
];

export default function HealthStep({ draft, onChange }) {
  const chosen = ANSWERS.find((option) => option.id === draft.answer) ?? null;

  return (
    <>
      <Card className="asking">
        <CardHead
          kind="section"
          eyebrow="One question"
          title="Would you like to talk to Accessibility Services?"
        />
        <div className="card-body">
          <p className="body-copy">
            They arrange things like extra time, a note-taker, an accessible room or a quiet exam
            space. You do not have to name a condition, and Aster does not ask for paperwork to
            answer this.
          </p>

          <div className="choice-panel" role="radiogroup" aria-label="Accessibility Services">
            {ANSWERS.map((option) => (
              <label key={option.id} className={draft.answer === option.id ? 'chosen' : ''}>
                <input
                  type="radio"
                  name="accommodation"
                  value={option.id}
                  checked={draft.answer === option.id}
                  onChange={() => onChange({ answer: option.id })}
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
              <Icon name="check" size={16} />
              <span>
                {chosen.id === 'no'
                  ? 'That’s a complete answer. Nothing about it stays open on your checklist.'
                  : 'Recorded. Accessibility Services has your name.'}
              </span>
            </p>
          )}
        </div>
        <CardFoot>
          <p>
            <Icon name="file" size={14} />
            <span>
              Separately, Aster needs your <strong>immunization record</strong> before term starts.
              That’s a document, not a question. It’s asked for in My Documents, and nothing is
              uploaded here.
            </span>
          </p>
        </CardFoot>
      </Card>
    </>
  );
}
