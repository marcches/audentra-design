import Icon from '../Icon.jsx';

/**
 * A card, and the three zones it is allowed to have.
 *
 * The rules these components hold were already written in
 * `docs/agents/design-workflow.md`, and were already being broken, because a
 * rule in a document is a rule every author has to carry:
 *
 *   - every block of a page's main column is a card; nothing sits loose on the
 *     canvas;
 *   - a card has a head, content and a foot, and they are *visible* — the head
 *     and the foot are the card's own paper one shade down, run out to its
 *     edges and closed with a hairline;
 *   - a list inside a card is `.card-rows`: the rows give up their surface and
 *     live on the card's white, and they run out to the card's own edges so the
 *     first and last take the corner they touch;
 *   - a row must never hard-code the card's padding or radius — the card
 *     publishes `--card-pad` and `--card-radius` for exactly that.
 *
 * A square row meeting a rounded card is the tell that someone built a
 * component without looking at the one holding it (Jam, 2026-08-20). It is not
 * possible to make that mistake through `Card` + `CardRows`, because neither
 * one asks the author for a radius.
 */
export default function Card({ as: Tag = 'section', variant, className, children, ...rest }) {
  const classes = ['section-card', variant, className].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * The band a card opens with. Three kinds and no more, because the product has
 * three kinds of card and they must not look alike:
 *
 *   status   an icon tile that carries a state, then the name and a line under
 *            it. For the card that holds a section's content.
 *   card     a neutral icon tile, then the name and a line. For a card that is
 *            one block among several.
 *   section  an eyebrow above the name, and room for a control at the trailing
 *            edge. For the head that names a region rather than a card.
 *
 * `tone` is the status icon's variant, and it is the one place a card head is
 * allowed colour — which is the rule "spend colour once per card" made into an
 * argument rather than a reminder.
 */
export function CardHead({ kind = 'card', icon, iconSize, tone, eyebrow, title, titleId, note, aside }) {
  if (kind === 'section') {
    return (
      <div className="section-heading">
        <div>
          {eyebrow ? <p className="eyebrow muted">{eyebrow}</p> : null}
          <h2 id={titleId}>{title}</h2>
        </div>
        {aside}
      </div>
    );
  }

  const isStatus = kind === 'status';

  return (
    <div className={isStatus ? 'status-heading' : 'card-heading'}>
      {icon ? (
        <span
          className={isStatus ? ['status-icon', tone].filter(Boolean).join(' ') : 'card-icon'}
          aria-hidden="true"
        >
          <Icon name={icon} size={iconSize ?? (isStatus ? 18 : 19)} />
        </span>
      ) : null}
      <div>
        <h2 id={titleId}>{title}</h2>
        {note ? <p>{note}</p> : null}
      </div>
      {aside}
    </div>
  );
}

/**
 * A list inside a card. The rows live on the card's own white — no surface, no
 * border, no shadow, no radius of their own — and this is the element that
 * bleeds them out to the card's edges so the hairlines span it.
 */
export function CardRows({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={['card-rows', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * The other end of the head: a note or a control that *closes* a card. Same
 * band, same bleed, same hairline. Anything that merely sits at the bottom of a
 * card is content and does not belong here — a foot is for what qualifies the
 * card as a whole.
 */
export function CardFoot({ className, children, ...rest }) {
  return (
    <div className={['card-foot', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
