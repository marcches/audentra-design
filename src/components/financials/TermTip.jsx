import { useId, useRef, useState } from 'react';
import Icon from '../../Icon.jsx';
import { financialTerms } from '../../data.js';

/**
 * "Financial vocabulary is explained where it appears rather than assumed" —
 * ENR-147's guardrail, and ENR-159 AC 5.
 *
 * The reporter chose a hover tooltip. Hover does not exist on touch, and the
 * card asks for mobile first, so the same bubble also opens on keyboard focus
 * and on tap. It overlays rather than pushing, so no figure moves while a
 * student is reading it.
 */
export default function TermTip({ term, label }) {
  const entry = financialTerms[term];
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pointer = useRef('mouse');

  if (!entry) return null;
  const open = hovered || pinned;

  return (
    <span className="term-tip">
      <button
        type="button"
        className="term-tip-button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        aria-label={`What ${label ?? entry.title} means`}
        onPointerDown={(event) => {
          pointer.current = event.pointerType || 'mouse';
        }}
        onPointerEnter={(event) => {
          if ((event.pointerType || 'mouse') === 'mouse') setHovered(true);
        }}
        onPointerLeave={(event) => {
          if ((event.pointerType || 'mouse') === 'mouse') setHovered(false);
        }}
        onFocus={() => setPinned(true)}
        onBlur={() => setPinned(false)}
        onClick={(event) => {
          event.preventDefault();
          // A tap opens and stays open; only a tap outside or Esc closes it.
          // On a mouse the bubble is already up, so the click must not toggle.
          if (pointer.current !== 'mouse') setPinned(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            setPinned(false);
            setHovered(false);
          }
        }}
      >
        <Icon name="info" size={14} />
      </button>

      {open && (
        <span className="term-tip-bubble" id={id} role="tooltip">
          <strong>{entry.title}</strong>
          {entry.body}
        </span>
      )}
    </span>
  );
}
