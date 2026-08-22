import { useState } from 'react';
import Icon from '../../design-system/Icon.jsx';
import { CHECKLIST_CATEGORIES } from '../enrollment/data.js';
import { channelOptions } from './data.js';
import { channelFor } from './logic.js';

/**
 * One default, per-category overrides — C1.6 of the review of 2026-08-21, decided 2026-08-22.
 *
 * The onboarding keeps asking one value and it is the default (the *Preferred channel* row above
 * this). Behind a closed disclosure, one row per checklist category with the default pre-selected
 * and the three channels to choose from — rows, not a grid: a matrix of eighteen checkboxes is
 * how a preference page stops being read. A row set back to the default follows the default
 * again, so changing the default later moves every row she never touched.
 *
 * [Deel](https://mobbin.com/screens/f31abe66-b620-4f8b-89ae-9d7395320dc7): one row per category,
 * the channels chosen inside it — taken; the matrices (Navan, Assembly, Air) rejected.
 */
export default function ChannelOverrides({ defaultId, overrides, onChange }) {
  const [open, setOpen] = useState(false);
  const defaultLabel = channelOptions.find(([id]) => id === defaultId)?.[1] ?? defaultId;
  const differing = CHECKLIST_CATEGORIES.filter(
    (category) => overrides[category] && overrides[category] !== defaultId,
  ).length;

  return (
    <div className="channel-overrides">
      <button
        type="button"
        className="channel-overrides-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`channel-overrides-chevron ${open ? 'open' : ''}`} aria-hidden="true">
          <Icon name="chevron" size={14} />
        </span>
        <span className="channel-overrides-copy">
          <strong>Set a different channel for one kind of message</strong>
          <small>
            {differing > 0
              ? `${differing} of ${CHECKLIST_CATEGORIES.length} kinds differ from ${defaultLabel}`
              : `All ${CHECKLIST_CATEGORIES.length} kinds use ${defaultLabel}, your default`}
          </small>
        </span>
      </button>

      {open && (
        <div className="channel-rows" role="group" aria-label="Channel by kind of message">
          {CHECKLIST_CATEGORIES.map((category) => {
            const current = channelFor(category, overrides, defaultId);
            const isDefault = !overrides[category] || overrides[category] === defaultId;
            return (
              <div className="channel-row" key={category}>
                <span className="channel-row-label">
                  {category}
                  {isDefault ? <small>Default</small> : null}
                </span>
                <div className="sort-group" role="radiogroup" aria-label={`Channel for ${category}`}>
                  {channelOptions.map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={current === id}
                      className={current === id ? 'selected' : ''}
                      onClick={() => onChange(category, id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <p className="channel-rows-note">
            <Icon name="info" size={13} /> The default is what you chose when you set up your
            account. A kind set back to it follows the default again.
          </p>
        </div>
      )}
    </div>
  );
}
