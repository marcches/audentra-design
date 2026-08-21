import Card, { CardFoot, CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import GrantCard from './GrantCard.jsx';

/**
 * Step 4 — the hardest screen in the card, and the one whose reading order is
 * three acceptance criteria rather than a layout preference.
 *
 *   1. the default, stated before any choice is offered       ENR-152 AC 2
 *   2. that nobody is a complete answer, said *before* the
 *      control rather than as a consolation after it          ENR-152 AC 3
 *   3. that the emergency contact is not record access, and
 *      concrete because she typed the name one screen ago     ENR-152 AC 4
 *   4. the list itself
 *
 * The placement of (2) is [Docusign's](https://mobbin.com/screens/c0248abe-0324-4739-83e6-cbc310da9912),
 * and this product already cites that screen in `PlanPanel` for the same
 * reason: read before the choice, a reassurance changes how the choice feels;
 * read after it, it is a consolation prize.
 *
 * **Tone.** The card asks for neither legalistic nor breezy. Every sentence
 * here names a person and a thing that person could discuss. There is no "we
 * take your privacy seriously", no "data processing", no "Make sure you trust
 * X" — the tone every OAuth consent screen in `references.md` uses, and the one
 * thing all of them were rejected for.
 */
export default function PermissionsStep({ draft, grants, onAdd, onEdit, onRemove }) {
  const emergency = draft.emergencyName.trim();
  const first = emergency.split(' ')[0];

  return (
    <>
      <Card className="stating">
        <CardHead
          kind="status"
          icon="shield"
          tone="calm"
          title="Right now, nobody can see any of it"
          note="Not your family, not anyone."
        />
        <div className="card-body">
          <p className="body-copy">
            Your record is yours. Aster discusses your grades, your bill, your aid and where you live
            with you — and with nobody else, unless you say so here.
          </p>
          {/* ENR-152 AC 3, before the control. */}
          <p className="body-copy strong">
            You can leave it exactly like that. Going on without adding anyone is a complete answer,
            and you can change your mind any time from your profile.
          </p>
        </div>

        {/* ENR-152 AC 4, concrete because it uses the name from step 3. */}
        {emergency && (
          <CardFoot className="separating">
            <p>
              <Icon name="alert" size={15} />
              <span>
                You gave <strong>{emergency}</strong> as your emergency contact. That lets Aster call{' '}
                {first} if something happens to you. It does not let {first} see anything below.
              </span>
            </p>
          </CardFoot>
        )}
      </Card>

      <Card className="asking">
        <CardHead
          kind="status"
          icon="users"
          tone="ask"
          title="Who can talk to Aster about you"
          note={
            grants.length
              ? 'Each person sees only what you ticked for them.'
              : 'Nobody yet — and that is a finished answer.'
          }
          aside={
            grants.length ? (
              <Button kind="secondary" leadingIcon="profile" onClick={() => onAdd()}>
                Add someone
              </Button>
            ) : null
          }
        />

        {grants.length ? (
          <CardRows>
            {grants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} onEdit={onEdit} onRemove={onRemove} />
            ))}
          </CardRows>
        ) : (
          <div className="card-body">
            <p className="nobody-yet">
              <Icon name="lock" size={17} />
              <span>
                <strong>Nobody is authorized.</strong>
                <small>
                  If someone helps you with money, housing or paperwork, you can let them discuss
                  exactly those parts — and nothing else.
                </small>
              </span>
            </p>
            <Button kind="primary" leadingIcon="profile" onClick={() => onAdd()}>
              Add someone
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}
