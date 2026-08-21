import Card, { CardHead, CardRows } from '../../design-system/primitives/Card.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import { STEPS } from './data.js';
import { savedCount, skippedCount } from './logic.js';

/** Where a skipped step is finished, so the offer to come back is a route and not a promise. */
const WHERE = {
  health: { label: 'Health', route: '#/health' },
  photo: { label: 'My Documents', route: '#/my-documents' },
  housing: { label: 'Housing', route: '#/housing' },
  permissions: { label: 'your profile', route: '#/profile' },
};

/**
 * The end of the flow, and deliberately not a celebration over an unfinished
 * list.
 *
 * Two counts, not one: six saved and two skipped. A single "8 of 8" would be
 * the exact thing ENR-150 AC 2 and AC 6 forbid — it would make skipped mean
 * complete, at the one moment she is most likely to believe it.
 *
 * Every skipped step is named with the place it can still be finished, so
 * ENR-150 AC 3 ("reachable and completable later, from onboarding and from the
 * portal") is a link rather than a claim. And the button still says the flow is
 * over, because it is: what is left is not onboarding any more.
 */
export default function FinishCard({ record, onOpen }) {
  const saved = savedCount(record);
  const skipped = skippedCount(record);
  const skippedSteps = STEPS.filter((step) => record.skipped.includes(step.id));

  return (
    <>
      <Card className="finish-card">
        <CardHead
          kind="status"
          icon="check"
          tone="done"
          title="That’s onboarding done."
          note={
            skipped
              ? `${saved} steps saved and ${skipped} set aside. Nothing is waiting on you today.`
              : `All ${saved} steps saved. Nothing is waiting on you today.`
          }
        />
        <div className="card-body">
          <p className="body-copy">
            Aster has what it needs to open your record. From here, everything lives in the portal:
            your checklist, your documents, your money and your room, each in the section that owns
            it.
          </p>
          <Button kind="primary" icon="arrow" onClick={() => onOpen('#/my-enrollment')}>
            Go to My Enrollment
          </Button>
        </div>
      </Card>

      {skippedSteps.length > 0 && (
        <Card>
          <CardHead
            kind="card"
            icon="half"
            title="What you set aside"
            note="Still open, still yours, and none of it is late."
          />
          <CardRows>
            {skippedSteps.map((step) => {
              const where = WHERE[step.id];
              return (
                <div key={step.id} className="set-aside">
                  <span className="set-aside-copy">
                    <strong>{step.name}</strong>
                    <small>{step.question}</small>
                  </span>
                  {where ? (
                    <a className="text-button" href={where.route}>
                      Finish it in {where.label} <Icon name="arrow" size={14} />
                    </a>
                  ) : null}
                </div>
              );
            })}
          </CardRows>
        </Card>
      )}
    </>
  );
}
