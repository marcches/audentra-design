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
 * argument rather than a reminder. The glyph in the tile is **duotone**: that
 * is the one weight a tinted tile takes, and the head passes it itself so no
 * page has to remember (`Icon.jsx`).
 *
 * ## A status head can be the group's handle — Jam of 2026-08-21
 *
 * Laura asked for *Aster is reviewing* and *Coming up later* to collapse the
 * way *steps completed* did, and the honest finding was that *completed* was
 * a one-off green box with its own toggle while the other two were cards
 * with a static head: three groups of the same kind, two shapes, one of them
 * clickable. So the status head is the one disclosure shape the product has:
 * give it `onToggle` and it renders as a `<button aria-expanded>` with the
 * `count` before the chevron, and the card closes on the head. Give it no
 * `onToggle` and it is the static head it always was — which is also what an
 * empty group gets, because a button that opens nothing is a lie.
 *
 * Every group starts closed (Marco, 2026-08-21); what the student opens is
 * remembered by the page.
 *
 * ## The mark is on the head or on the rows, never both
 *
 * A status head takes an icon tile when the rows under it carry none — the
 * tile is then the card's one mark. When the rows carry their own tile (a task's
 * kind, a step's standing), the head goes **bare**: no tile, no empty column,
 * the name at the card's padding. A clock on the head and a clock on every row
 * is the same glyph said twice, and the rows no longer line up with the rows
 * of the card beside them (Marco, 2026-08-21).
 */
export function CardHead({
  kind = 'card',
  icon,
  iconSize,
  tone,
  eyebrow,
  title,
  titleId,
  note,
  aside,
  count,
  open,
  onToggle,
  controls,
}) {
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
  const collapsible = isStatus && typeof onToggle === 'function';
  const bare = isStatus && !icon;

  const tile = icon ? (
    <span
      className={isStatus ? ['status-icon', tone].filter(Boolean).join(' ') : 'card-icon'}
      aria-hidden="true"
    >
      <Icon name={icon} size={iconSize ?? (isStatus ? 18 : 19)} weight="duotone" />
    </span>
  ) : null;

  const copy = (
    <div>
      <h2 id={titleId}>{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  );

  const trailing =
    count != null || collapsible ? (
      <span className="status-trailing">
        {count != null ? <span className="status-count">{count}</span> : null}
        {collapsible ? (
          <span className={`status-chevron${open ? ' open' : ''}`} aria-hidden="true">
            <Icon name="chevron" size={18} />
          </span>
        ) : null}
      </span>
    ) : (
      aside
    );

  if (collapsible) {
    return (
      <button
        type="button"
        className={`status-heading collapsible${bare ? ' bare' : ''}${open ? ' open' : ''}`}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={controls}
        onClick={onToggle}
      >
        {tile}
        {copy}
        {trailing}
      </button>
    );
  }

  return (
    <div className={isStatus ? `status-heading${bare ? ' bare' : ''}` : 'card-heading'}>
      {tile}
      {copy}
      {trailing}
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
