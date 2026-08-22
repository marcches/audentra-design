import Icon from '../../design-system/Icon.jsx';
import Button from '../../design-system/primitives/Button.jsx';
import { InfoTip } from '../../design-system/primitives/Tooltip.jsx';
import EdwardAsk from '../../design-system/patterns/EdwardAsk.jsx';
import { EDWARD } from '../edward/data.js';
import { matchLabel, shortDate } from './logic.js';

/** The one sentence *I'm interested* owes her — said where it can be read before acting. */
export const INTEREST_NOTE =
  'This shapes what we show you first. It isn’t an application to join, and it doesn’t change your interests, your progress or your points.';

/**
 * One club in the list — the review of 2026-08-21, C4, C4b, C7, C8.3.
 *
 * The leading slot is the club's **emblem**: the duotone glyph tile, chosen for what the club is,
 * at the size and radius the Housing monogram uses — never a photograph of people, never stock,
 * never generated, and initials only for a club with no emblem published. A club is a thing with an
 * identity, and the card gives it one without giving it anybody's face.
 *
 * The row acts: **I'm interested** is the primary action and says what it is — it shapes what the
 * portal shows her first, it is not an application, and it changes nothing about her interests,
 * her progress or her points (ENR-187 AC 5 extended; the sentence is an `InfoTip` because hover
 * reaches neither a phone nor a keyboard). The contact control names the person and is the
 * Edward door: "How do I get in touch with Dana Whitfield about the Aster Chamber Choir?" written
 * and unsent (Part A §12.3–12.4) — no direct line before him.
 *
 * The match label is suppressed where the club's own category is the interest that matched it.
 *
 * [Reddit](https://mobbin.com/screens/327711b9-2ecd-4e22-88bc-0b5400c6af1e): emblem, name, one
 * line, the action at the edge — taken. [Braintrust](https://mobbin.com/screens/54d07501-2048-4347-a358-075a1d46acde):
 * the emblem as a glyph in a tinted tile — taken.
 */
export default function OrgRow({ org, matched, interested, onOpen, onInterested, onContact }) {
  const label = matchLabel(org, matched);
  const first = org.contact.name.split(' ')[0];

  return (
    <div className="campus-row org-row">
      <span className="org-tile" aria-hidden="true">
        {org.icon ? <Icon name={org.icon} size={24} weight="duotone" /> : org.initials}
      </span>

      <span className="campus-row-copy">
        <span className="campus-row-title">
          <button
            type="button"
            className="row-title-button"
            onClick={(clickEvent) => onOpen(org, clickEvent.currentTarget)}
          >
            {org.name}
          </button>
          <span className="category-chip">{org.category}</span>
          {label && (
            <span className="match-chip">
              <Icon name="spark" size={12} /> Matches {label}
            </span>
          )}
        </span>
        <span className="org-description">{org.description}</span>
        <span className="campus-row-meta">
          <span>
            <Icon name="clock" size={13} /> {org.meets}
          </span>
          <span>
            <Icon name="profile" size={13} /> {org.contact.name}, {org.contact.role}
          </span>
        </span>
        <span className={`org-update ${org.latestUpdate ? '' : 'quiet'}`}>
          {org.latestUpdate ? (
            <>
              <b>{shortDate(org.latestUpdate.date)}</b> {org.latestUpdate.text}
            </>
          ) : (
            'No updates published yet'
          )}
        </span>

        <span className="campus-row-actions">
          <Button
            kind={interested ? 'secondary' : 'primary'}
            icon={interested ? 'check' : 'spark'}
            iconSize={15}
            aria-pressed={interested}
            onClick={() => onInterested(org)}
          >
            {interested ? 'Interested' : 'I’m interested'}
          </Button>
          <InfoTip title="I’m interested">{INTEREST_NOTE}</InfoTip>
          <EdwardAsk label={`Message ${first}`} mark={EDWARD.mark} onClick={() => onContact(org)} />
        </span>
      </span>
    </div>
  );
}
