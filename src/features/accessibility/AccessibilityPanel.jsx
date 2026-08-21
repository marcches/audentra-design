import Drawer from '../../design-system/primitives/Drawer.jsx';
import Icon from '../../design-system/Icon.jsx';
import AccommodationCard from './AccommodationCard.jsx';
import { accommodationQuestion } from './data.js';
import { offices } from '../help/data.js';

/**
 * Accessibility — the accommodation question, as a panel.
 *
 * Built inside Health by ENR-206, given a section of its own by ADR-0003, given
 * a page under Health by the Jam of 2026-08-21, and given this by Marco the same
 * afternoon: a section with no row in the sidebar does not open a page, it opens
 * the side panel, because that is the one way this portal opens what lives
 * inside a page. ADR-0003's substance is untouched — the question is still not a
 * card inside Health's record, still has no badge, and still cannot be counted.
 * What changed is the surface it opens on, not what it is.
 *
 * The panel is the question and nothing else. Two things stayed behind with the
 * page:
 *
 *   - the **rail**. `Usually replies in 2 days` and `Who is on the other side`
 *     both named Accessibility Services, which the panel's own header names,
 *     and the card already says what they do with the answer and what they
 *     never see.
 *   - the **eyebrow inside the card**. It said the office's name a second time.
 *     It is the drawer's label now, where a drawer says who owns what is in it.
 *
 * The answer lives in `App`, so it survives closing this (ENR-208 AC 5) and so
 * that the one rule about it — it reaches no other module (ADR-0001) — is a
 * property of where the state is rather than of a component's memory.
 */
export default function AccessibilityPanel({
  answer,
  saving = false,
  failed = false,
  unavailable = false,
  onAnswer = () => {},
  onRetry = () => {},
  onClose = () => {},
}) {
  const office = offices[accommodationQuestion.office];

  return (
    <Drawer
      variant="question"
      /* Not a state. `Optional` is a property of the question and stays true
         whatever she answers — the one word this section is allowed to put in
         the slot where every other drawer puts a standing (ENR-208 AC 3). */
      label={[office.name, 'Optional']}
      titleId="accommodation-title"
      closeLabel="Close Accessibility"
      onClose={onClose}
    >
      <div className="drawer-icon question">
        <Icon weight="duotone" name="accessibility" size={25} />
      </div>

      <AccommodationCard
        answer={answer}
        saving={saving}
        failed={failed}
        unavailable={unavailable}
        onAnswer={onAnswer}
        onRetry={onRetry}
      />
    </Drawer>
  );
}

/** Named for the toast App raises when an answer lands. */
export function answerToast(answer, office) {
  return answer === 'yes'
    ? { title: `${office} has your name.`, body: 'Nothing about your health was sent with it.' }
    : {
        title: 'Saved as your current answer.',
        body: 'Nothing’s pending, and you can change it any time.',
      };
}
