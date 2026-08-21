import { useEffect, useRef, useState } from 'react';
import Tooltip from '../design-system/primitives/Tooltip.jsx';

/**
 * The two things the topbar can open — ENR-167, second pass.
 *
 * One component rather than two copies, for the reason the rest of this repo
 * gives: the bell and the points chip are the same interaction, and written
 * twice they would drift apart on `Esc`, on focus return and on the scrim.
 *
 * Not built on `lib/overlay.js`. That primitive is for a dialog that covers the
 * page and traps the keyboard; these are anchored menus that dismiss on an
 * outside click, exactly like `PreviewStateMenu` two chips along, and they use
 * the same `--z-popover-scrim` / `--z-popover` pair so the three can never
 * appear on top of one another.
 */
export default function TopbarPopover({
  className,
  ariaLabel,
  panelLabel,
  panelClass,
  badge,
  children,
  onOpen,
  trigger,
  tip,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open]);

  return (
    <div className="topbar-pop">
      {/* The hint stands down while the panel is open: the panel has already
          answered the question the hint was going to answer. */}
      <Tooltip tip={open ? null : tip}>
        <button
          className={className}
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => {
            if (!open) onOpen?.();
            setOpen((value) => !value);
          }}
        >
          {trigger}
          {badge}
        </button>
      </Tooltip>

      {open && (
        <>
          <button className="pop-scrim" aria-label={`Close ${panelLabel}`} onClick={close} />
          <div className={`pop-panel ${panelClass ?? ''}`} role="dialog" aria-label={panelLabel}>
            {children(close)}
          </div>
        </>
      )}
    </div>
  );
}
