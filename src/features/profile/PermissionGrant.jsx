import Icon from '../../design-system/Icon.jsx';
import Avatar from '../../design-system/primitives/Avatar.jsx';
import { RECORD_CATEGORIES } from './data.js';
import { sharedNames } from './logic.js';

/**
 * One authorization the student granted during onboarding — ENR-179 AC 8, in
 * ENR-144's vocabulary.
 *
 * Onboarding captured it; this screen is where it is read, narrowed and ended.
 * Two of ENR-144's guardrails are structural here rather than editorial:
 *
 *   · every one of the seven categories is listed, granted or not, so a student
 *     sees what is *not* shared as plainly as what is — a list of three ticked
 *     categories cannot answer "what else could she see?";
 *   · nothing stands between the student and narrowing consent: a checkbox
 *     takes effect on change. Ending it altogether asks once, naming the
 *     person and what they will stop seeing (the review of 2026-08-21, C1.5) —
 *     the page holds that confirmation, this card only asks for it.
 */
export default function PermissionGrant({ grant, onToggle, onRevoke }) {
  const firstName = grant.person.name.split(' ')[0];

  return (
    <article className="permission-grant">
      <header className="grant-head">
        <Avatar person={grant.person} size="md" className="grant-avatar" />
        <div className="grant-who">
          <strong>{grant.person.name}</strong>
          <p>
            {grant.person.relation} · {grant.person.email} · authorized {grant.grantedOn}
          </p>
        </div>
        <span className="grant-window">
          <Icon name="clock" size={13} /> Ends {grant.endsOn}
        </span>
      </header>

      <p className="grant-purpose">
        <Icon name="info" size={14} />
        <span>
          You gave this for one reason: <em>{grant.purpose}</em>
        </span>
      </p>

      {/* Every category is listed, granted or not: a list of the three ticked
          ones cannot answer "what else could she see?" — ENR-144. */}
      <fieldset className="permission-set">
        {/* A count works when what it counts follows — the legend states what is
            shared, by name, and the seven boxes under it show what is not (C1.5). */}
        <legend>
          <strong>What {firstName} can see</strong> · {grant.granted.length} of{' '}
          {RECORD_CATEGORIES.length}: {sharedNames(grant)}
        </legend>
        <div className="permission-grid">
          {RECORD_CATEGORIES.map((category) => {
            const shared = grant.granted.includes(category.id);
            return (
              <label key={category.id} className={shared ? 'granted' : ''}>
                <input
                  type="checkbox"
                  checked={shared}
                  onChange={() => onToggle(grant, category)}
                />
                <span className="permission-copy">
                  <strong>{category.name}</strong>
                  <small>{category.sees}</small>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grant-foot">
        <p>
          <Icon name="shield" size={14} />
          Uncheck a category and Aster stops sharing it right away. Aster never tells {firstName}
          what you do in the portal.
        </p>
        <button
          className="revoke-button"
          aria-label={`Revoke all access for ${grant.person.name}`}
          onClick={() => onRevoke(grant)}
        >
          <Icon name="close" size={14} /> Revoke all access
        </button>
      </div>
    </article>
  );
}
