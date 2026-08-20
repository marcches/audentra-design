import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import { previewStateLabel } from '../lib/preview-state.js';

/**
 * A design-preview control, not student functionality. It exists because the
 * card asks for loading, empty, error, partial and success to be *delivered* —
 * and a state nobody can reach is a state nobody can review in a Jam.
 */
export default function PreviewStateMenu({ state, states, onChange }) {
  const [open, setOpen] = useState(false);
  // The pill names the option this control is offering. Reading the global
  // vocabulary instead would let a page-specific label ride on another page.
  const label = states.find(([id]) => id === state)?.[1] ?? previewStateLabel(state);
  const trigger = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="preview-state">
      <button
        className={`concept-pill ${state !== 'ready' ? 'switched' : ''}`}
        ref={trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="pill-word">Concept preview</span>
        {state !== 'ready' && <span className="pill-state">{label}</span>}
        <Icon name="chevron" size={13} />
      </button>

      {open && (
        <>
          <button
            className="preview-scrim"
            aria-label="Close preview states"
            onClick={() => setOpen(false)}
          />
          <div className="preview-menu" role="menu" aria-label="Preview state">
            <p className="preview-menu-label">Preview state</p>
            {states.map(([id, label, description]) => (
              <button
                key={id}
                role="menuitemradio"
                aria-checked={id === state}
                className={id === state ? 'selected' : ''}
                onClick={() => {
                  onChange(id);
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                {id === state && <Icon name="check" size={15} />}
              </button>
            ))}
            <p className="preview-menu-foot">
              A design preview. The student never sees this control.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
