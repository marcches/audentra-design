import Icon from '../Icon.jsx';

/**
 * The product's four buttons, and the rule for picking one.
 *
 *   primary     the one thing this card is asking for. At most one per card.
 *   secondary   a real action that is not the one being asked for.
 *   text        an action that reads as a sentence — "Remove", "Undo".
 *   link        a route dressed as a link, when the target is a page.
 *
 * `full` makes it span its container, which is what a drawer's action does and
 * a card's rarely should.
 *
 * The trailing icon is a prop rather than a child because it is the same in
 * every instance — an arrow when the button leaves the page, a verb's own icon
 * when it does not — and because a caller that passes it as a child is a caller
 * who can put it on the wrong side.
 */
export default function Button({
  kind = 'secondary',
  icon,
  iconSize,
  leadingIcon,
  full = false,
  className,
  children,
  ...rest
}) {
  const classes = [`${kind}-button`, full && 'full', className].filter(Boolean).join(' ');
  return (
    <button className={classes} {...rest}>
      {leadingIcon ? <Icon name={leadingIcon} size={iconSize ?? 16} /> : null}
      {children}
      {icon ? <Icon name={icon} size={iconSize ?? 17} /> : null}
    </button>
  );
}

/**
 * A control whose whole label is its icon — a close, a collapse, a menu. It
 * takes `label` rather than `aria-label` so it is not possible to render one
 * without a name: a bare icon button with no label is unusable with a screen
 * reader, and this is the repo's one recurring accessibility slip.
 */
export function IconButton({ name, label, size, variant, className, ...rest }) {
  return (
    <button
      className={['icon-button', variant, className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      <Icon name={name} size={size} />
    </button>
  );
}
