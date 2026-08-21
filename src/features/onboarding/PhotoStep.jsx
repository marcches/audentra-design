import Card, { CardFoot, CardHead } from '../../design-system/primitives/Card.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import { PHOTO_RULES, PHOTO_USE } from './data.js';

/**
 * Step 7, optional, and placed second-to-last because it is the most skippable
 * thing in the flow — a student who is running out of patience should meet this
 * one, not the emergency contact.
 *
 * The upload is simulated, the way every upload in this prototype is: nothing
 * is read, nothing is sent. What is real is the sentence about what the photo
 * is for, which is placed *before* the picker rather than under it.
 */
export default function PhotoStep({ draft, onChange }) {
  const chosen = Boolean(draft.photo);

  return (
    <Card className="asking">
      <CardHead
        kind="status"
        icon="card"
        tone="ask"
        title="The photo on your campus card"
        note={PHOTO_USE}
      />
      <div className="card-body">
        <div className={chosen ? 'photo-zone has-file' : 'photo-zone'}>
          <span className="photo-mark" aria-hidden="true">
            <Icon name={chosen ? 'check' : 'upload'} size={22} />
          </span>
          {chosen ? (
            <>
              <p>
                <strong>{draft.photo}</strong>
                <small>Ready to send with this step.</small>
              </p>
              <Button kind="text" onClick={() => onChange({ photo: null })}>
                Choose a different one
              </Button>
            </>
          ) : (
            <>
              <p>
                <strong>Choose a photo</strong>
                <small>JPG or PNG · up to 10 MB</small>
              </p>
              <Button
                kind="secondary"
                leadingIcon="upload"
                onClick={() => onChange({ photo: 'maya_card_photo.jpg' })}
              >
                Choose a photo
              </Button>
              <small className="photo-prototype">
                Prototype: this button stands in for your file picker.
              </small>
            </>
          )}
        </div>

        <ul className="photo-rules">
          {PHOTO_RULES.map((rule) => (
            <li key={rule}>
              <Icon name="check" size={14} /> {rule}
            </li>
          ))}
        </ul>
      </div>
      <CardFoot>
        <p>
          <Icon name="clock" size={14} /> Skipping this costs you nothing but a queue: cards without a
          photo are made at the desk during move-in week.
        </p>
      </CardFoot>
    </Card>
  );
}
