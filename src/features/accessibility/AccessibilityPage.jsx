import PageShell from '../../design-system/patterns/PageShell.jsx';
import AccommodationCard from './AccommodationCard.jsx';
import AccessibilityRail from './AccessibilityRail.jsx';

/**
 * Accessibility — the accommodation question on a route of its own.
 *
 * Built for ENR-206 from ENR-208 as the second card inside Health; moved here by
 * the UX writing pass of 2026-08-21 (ADR-0003). The page is one question and
 * nothing else, on purpose: no summary panel, because the answer is never a
 * figure and *not right now* must never look like a standing (ENR-208 AC 3,
 * ADR-0001); no tabs; no badge on its sidebar row. A page that is one card is a
 * page, not an empty state — Instagram's sensitive-content control and
 * Glassdoor's optional demographics page are the references in `references.md`.
 *
 * The answer itself lives in `App`, so that it survives a route change
 * (ENR-208 AC 5) and so that the one rule about it — it reaches no other module
 * — is a property of where the state is rather than of a component's memory.
 *
 * `loading` and `error` are the frame's and never reach this component.
 */

/** The states this section offers in the preview menu. Ids are shared with Health. */
export const ACCESSIBILITY_PREVIEW_STATES = [
  ['ready', 'Not right now', '“Not right now” answered at onboarding.'],
  ['empty', 'Nothing answered yet', 'The question skipped at onboarding, still open.'],
  ['health-settled', 'Asked to talk', 'A yes already with Accessibility Services.'],
  ['send-fails', 'Sending fails', 'The next answer you send doesn’t reach Aster.'],
  ['partial', 'Partial data', 'The answer couldn’t be read.'],
  ['loading', 'Loading', 'Before your answer arrives.'],
  ['error', 'Error', 'The section couldn’t be loaded at all.'],
];

export default function AccessibilityPage({
  destination,
  previewState = 'ready',
  answer,
  savingAnswer = false,
  answerFailed = null,
  onAnswer = () => {},
  onRetry = () => {},
}) {
  const unavailable = previewState === 'partial';

  return (
    <PageShell destination={destination} rail={<AccessibilityRail unavailable={unavailable} />}>
      <AccommodationCard
        answer={answer}
        saving={savingAnswer}
        failed={Boolean(answerFailed)}
        unavailable={unavailable}
        onAnswer={onAnswer}
        onRetry={() => (unavailable ? onRetry() : onAnswer(answerFailed))}
      />
    </PageShell>
  );
}

/** Named for the toast the page raises when an answer lands. */
export function answerToast(answer, office) {
  return answer === 'yes'
    ? { title: `${office} has your name.`, body: 'Nothing about your health was sent with it.' }
    : {
        title: 'Saved as your current answer.',
        body: 'Nothing’s pending, and you can change it any time.',
      };
}
