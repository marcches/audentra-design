import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';

/**
 * The bar that closes every step: `Back`, then `Skip for now`, then the save.
 *
 * Two things about it are decisions rather than layout.
 *
 * **The skip is absent on a required step, never disabled** — ENR-150 AC 4 asks
 * that no skip be *offered*, and a greyed-out skip is an offer, withdrawn in
 * front of her. And on an optional step it sits at a real size and a real
 * contrast: [Plane](https://mobbin.com/screens/1840d42e-191e-4505-b58e-11b4b0e0acf4)
 * puts a bare `Skip` under the primary at half the contrast of everything else
 * and it reads as an apology for existing. If a step is genuinely optional, its
 * skip is a real answer and looks like one.
 *
 * **The words are `Skip for now`**, from
 * [PayPal](https://mobbin.com/screens/55b36882-b86f-43b9-a3c1-cc61d7a81cd0) —
 * not `Skip`, not `No thanks`. "For now" is the whole difference between a step
 * set aside and a step declined, and ENR-150 AC 3 is that difference.
 *
 * The band is [Uxcel's](https://mobbin.com/screens/48c6305c-7d64-4c09-bd60-801739292799):
 * skip at one end, save at the other. Distance is what stops a skip being a
 * mis-click; a shared band is what stops it being hidden.
 */
export default function StepActions({
  step,
  first,
  saving,
  blocked,
  saveLabel = 'Save and continue',
  onBack,
  onSkip,
  onSave,
}) {
  return (
    <div className="step-actions">
      {!first && (
        <button className="text-button step-back" onClick={onBack}>
          <Icon name="back" size={15} /> Back
        </button>
      )}

      <div className="step-forward">
        {!step.required && (
          <button className="text-button step-skip" onClick={onSkip} disabled={saving}>
            Skip for now
          </button>
        )}
        <Button kind="primary" icon="arrow" onClick={onSave} disabled={saving || blocked}>
          {saving ? 'Saving…' : saveLabel}
        </Button>
      </div>
    </div>
  );
}
