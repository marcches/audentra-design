import { useState } from 'react';
import Drawer from '../../design-system/primitives/Drawer.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import Icon from '../../design-system/Icon.jsx';
import Field from '../../design-system/primitives/Field.jsx';
import { DEFAULT_END, RECORD_CATEGORIES } from './data.js';
import { grantProblem } from './logic.js';

const EXAMPLE = 'Help me with billing and financial aid while I am away.';

function initialsOf(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '··';
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

/**
 * Adding or narrowing one authorization — ENR-153, and ENR-154 AC 4 ("changing
 * a permission does not require redoing the whole step", which is why this is a
 * drawer over the list rather than a wizard branch).
 *
 * `<Drawer>` owns the scrim, `aria-modal`, the focus trap, `Esc` and the focus
 * return, so none of that is written here and none of it can be forgotten.
 *
 * Three things are decisions rather than form layout:
 *
 * **Every category is listed, ticked or not.** A list of the three she granted
 * cannot answer "what else could she see?" — Profile records this as ENR-144's
 * guardrail and it is inherited here, at the moment of consent rather than only
 * at the moment of review. Taken from
 * [Whop](https://mobbin.com/screens/94196777-bfa5-4a69-97a6-b5795d6d797e),
 * where the unticked rows stay in the list.
 *
 * **Checkboxes, all clear, never switches and never default-on.** Default-on
 * inverts ENR-152 AC 1 outright, and a switch reads as a preference being
 * adjusted rather than a permission being granted —
 * [Hootsuite](https://mobbin.com/screens/b5b6823e-e792-4c5d-aec9-24922a89b57c)
 * ships eleven switches, all on, and that is the exact shape of what this
 * screen must not be.
 *
 * **A refusal states what is missing rather than greying the button.** A
 * disabled save says *you cannot*; a save that comes back with a reason says
 * *here is what is left* — ENR-153 Scenario 2 asks for the reason, and a grey
 * button carries none.
 */
export default function PersonDrawer({ grant, onSave, onClose }) {
  const [draft, setDraft] = useState(() => ({
    name: grant?.person.name ?? '',
    relation: grant?.person.relation ?? '',
    email: grant?.person.email ?? '',
    purpose: grant?.purpose ?? '',
    granted: grant?.granted ? [...grant.granted] : [],
    endsOn: grant?.endsOn ?? DEFAULT_END.label,
  }));
  const [problem, setProblem] = useState(null);

  const set = (patch) => setDraft((value) => ({ ...value, ...patch }));

  function toggle(id) {
    set({
      granted: draft.granted.includes(id)
        ? draft.granted.filter((item) => item !== id)
        : [...draft.granted, id],
    });
    if (problem?.field === 'categories') setProblem(null);
  }

  function submit() {
    const found = grantProblem(draft);
    setProblem(found);
    if (found) {
      // The field says what is wrong; the submit's job is to take her to it.
      // Focus is what makes the message reachable — it is wired to the input
      // through `aria-describedby`, so landing there reads it out.
      requestAnimationFrame(() => {
        const target = document.querySelector(
          found.field === 'categories'
            ? '.person-drawer .permission-set input'
            : '.person-drawer .field.invalid input',
        );
        target?.focus();
        target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      return;
    }
    onSave({
      id: grant?.id ?? `grant-${draft.name.trim().toLowerCase().replace(/\s+/g, '-')}`,
      person: {
        name: draft.name.trim(),
        initials: initialsOf(draft.name),
        relation: draft.relation.trim() || 'Not given',
        email: draft.email.trim(),
      },
      purpose: draft.purpose.trim() || 'Not given.',
      granted: draft.granted,
      endsOn: draft.endsOn,
    });
  }

  return (
    <Drawer
      variant="person"
      label={[grant ? 'Change a permission' : 'Authorize someone', 'Step 4 of 8']}
      titleId="person-drawer-title"
      onClose={onClose}
      foot={
        <div className="person-foot">
          {/* Only for the problem with nowhere else to go. The three text
              fields now carry their own message under themselves, and printing
              the same sentence twice on one screen taught a student to read
              neither. */}
          {problem?.field === 'categories' && (
            <p className="drawer-problem" role="alert">
              <Icon name="alert" size={15} />
              <span>{problem.reason}</span>
            </p>
          )}
          <Button kind="primary" full icon="check" onClick={submit}>
            {grant ? 'Save this change' : 'Authorize this person'}
          </Button>
        </div>
      }
    >
      <h2 id="person-drawer-title" className="drawer-title">
        {grant ? `What ${grant.person.name.split(' ')[0]} can discuss` : 'Who are you authorizing?'}
      </h2>

      <Field
        label="Their name"
        autoComplete="name"
        value={draft.name}
        error={problem?.field === 'name' ? problem.reason : null}
        onChange={(value) => set({ name: value })}
      />

      {/* Free text, not a closed set. ENR-153 AC 2 closes exactly one list —
          the record categories — and a three-option picker would tell a student
          that "Mother" is not one of the available relationships. */}
      <Field
        label="How they’re related to you"
        value={draft.relation}
        hint="Mother, guardian, sister, whatever you would call them."
        onChange={(value) => set({ relation: value })}
      />

      <Field
        label="Their email"
        type="email"
        autoComplete="email"
        value={draft.email}
        hint="Aster uses this to tell them what they have been given, and nothing else."
        error={problem?.field === 'email' ? problem.reason : null}
        onChange={(value) => set({ email: value })}
      />

      <fieldset
        className={problem?.field === 'categories' ? 'permission-set invalid' : 'permission-set'}
      >
        <legend>
          What they can discuss
          <small>
            {draft.granted.length} of {RECORD_CATEGORIES.length} chosen
          </small>
        </legend>
        <div className="permission-grid">
          {RECORD_CATEGORIES.map((category) => {
            const on = draft.granted.includes(category.id);
            return (
              <label key={category.id} className={on ? 'granted' : ''}>
                <input type="checkbox" checked={on} onChange={() => toggle(category.id)} />
                <span className="permission-copy">
                  <strong>{category.name}</strong>
                  <small>{category.sees}</small>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field
        label="Why you’re doing this"
        value={draft.purpose}
        hint={`In your own words. For example: “${EXAMPLE}”`}
        onChange={(value) => set({ purpose: value })}
      />

      {/* ENR-153 AC 7. An end date is required, and the offered default is the
          end of the academic year — the same date `initialGrants` carries, so
          onboarding and Profile tell one story. */}
      <p className="field-label spaced" id="ends-label">
        When it ends
      </p>
      <div className="choice-panel tight" role="radiogroup" aria-labelledby="ends-label">
        {[DEFAULT_END, { value: 'term', label: 'Dec 31, 2026', note: 'End of this term' }].map(
          (option) => (
            <label key={option.label} className={draft.endsOn === option.label ? 'chosen' : ''}>
              <input
                type="radio"
                name="ends"
                checked={draft.endsOn === option.label}
                onChange={() => set({ endsOn: option.label })}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{option.note}</small>
              </span>
              <span className="radio-mark">
                <Icon name="check" size={14} />
              </span>
            </label>
          ),
        )}
      </div>

      <p className="drawer-note">
        <Icon name="shield" size={14} />
        <span>
          You can narrow this or end it at any moment, from here or from your profile. Aster never
          tells them what you do in the portal.
        </span>
      </p>
    </Drawer>
  );
}
