import Icon from '../../design-system/Icon.jsx';
import { RECORD_CATEGORIES } from './data.js';
import { grantedNames, listSentence } from './logic.js';

/**
 * One authorization, as it reads back to her.
 *
 * ENR-153 AC 6 asks that she can see at any time exactly what each person may
 * discuss. Two ways to draw that, and only one of them survives the tone the
 * card asks for: a row of seven chips with three lit, or **a sentence naming a
 * person and the things that person could talk about**. The chips are the
 * legalistic version — they are a permission matrix — and this is a seventeen
 * year old reading about her mother. So: a sentence.
 *
 * The count beside it (`3 of 7`) is what keeps the sentence honest. A sentence
 * listing three things cannot, on its own, answer "what else could she see?" —
 * the guardrail Profile records as ENR-144's — and the full list is one click
 * away in `Edit`, where every category is shown ticked or not.
 */
export default function GrantCard({ grant, onEdit, onRemove }) {
  const first = grant.person.name.split(' ')[0];
  const names = grantedNames(grant);

  return (
    <article className="grant-row">
      <div className="grant-top">
        <span className="grant-avatar" aria-hidden="true">
          {grant.person.initials}
        </span>
        <div className="grant-who">
          <strong>{grant.person.name}</strong>
          <small>
            {grant.person.relation} · {grant.person.email}
          </small>
        </div>
        <span className="grant-ends">
          <Icon name="clock" size={13} /> Ends {grant.endsOn}
        </span>
      </div>

      <p className="grant-scope">
        {first} can discuss {listSentence(names.map((name) => name.toLowerCase()))}.
        <span className="grant-count">
          {names.length} of {RECORD_CATEGORIES.length}
        </span>
      </p>

      <p className="grant-purpose">
        <Icon name="info" size={13} />
        <span>
          Your reason: <em>{grant.purpose}</em>
        </span>
      </p>

      <div className="grant-controls">
        <button className="text-button" onClick={() => onEdit(grant)}>
          <Icon name="pen" size={14} /> Change what {first} can see
        </button>
        {/* ENR-154 AC 2. No confirm step, because revocation takes effect
            immediately and a confirm is a moment in which it has not. */}
        <button
          className="text-button danger"
          aria-label={`Remove ${grant.person.name}`}
          onClick={() => onRemove(grant)}
        >
          <Icon name="close" size={14} /> Remove
        </button>
      </div>
    </article>
  );
}
