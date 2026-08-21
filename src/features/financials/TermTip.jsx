import { InfoTip } from '../../design-system/primitives/Tooltip.jsx';
import { financialTerms } from '../enrollment/data.js';

/**
 * "Financial vocabulary is explained where it appears rather than assumed" —
 * ENR-147's guardrail, and ENR-159 AC 5.
 *
 * All that is left here is the dictionary lookup. The bubble, the hover, the
 * tap, the keyboard, the `Esc` and the ARIA are `InfoTip`, in the design
 * system, where the rest of the product can reach them — this file was the only
 * place in the portal that had solved any of it, and it had solved it for
 * eleven money words alone.
 */
export default function TermTip({ term, label }) {
  const entry = financialTerms[term];
  if (!entry) return null;

  return (
    <InfoTip title={entry.title} label={`What ${label ?? entry.title} means`}>
      {entry.body}
    </InfoTip>
  );
}
