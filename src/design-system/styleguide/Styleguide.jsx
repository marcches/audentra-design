import { useEffect, useState } from 'react';
import Icon from '../Icon.jsx';
import Card, { CardFoot, CardHead, CardRows } from '../primitives/Card.jsx';
import AnchorCard from '../primitives/AnchorCard.jsx';
import Button, { IconButton } from '../primitives/Button.jsx';
import Drawer from '../primitives/Drawer.jsx';
import StateCard from '../patterns/StateCard.jsx';
import SummaryFigure from '../patterns/SummaryFigure.jsx';
import AdvisorBar from '../patterns/AdvisorBar.jsx';

/**
 * The design system, rendered.
 *
 * A written design system is a design system nobody reads. This repo already
 * had one — `docs/agents/design-workflow.md`, thorough, correct, and broken 436
 * times in colour alone — because a document cannot be checked against and a
 * page can. Every token, primitive and pattern is on this page, in its states,
 * at `#/styleguide`.
 *
 * The rule that makes it work: **if it is not on this page, it does not exist.**
 * A shape a section invents for itself is a shape nobody else can find, which
 * is how the product ended up with eight rails that each wrote their own anchor
 * card. Adding a primitive means adding it here in the same commit.
 *
 * The colour values are read from the live cascade rather than typed here, so a
 * swatch cannot go stale against `tokens.css`. If a swatch is wrong, the token
 * is wrong.
 */

const COLOUR_GROUPS = [
  {
    title: 'Text',
    note: 'Four weights of voice. The answer, the second fact, the label above it, and the thing that is barely a word.',
    tokens: ['ink', 'ink-2', 'muted', 'faint'],
  },
  {
    title: 'Surfaces',
    note: 'Three planes and no more — canvas, card, ink. `card-zone` is not a fourth: it is the card’s own paper one shade down, and it is what makes a head and a foot visible.',
    tokens: ['canvas', 'surface', 'card-zone', 'surface-sunk', 'surface-ink'],
  },
  {
    title: 'On the ink plane',
    note: 'What an anchor card is allowed to use. Eight rails each worked these out again before they had names.',
    tokens: ['on-ink', 'on-ink-muted', 'on-ink-line'],
    over: 'ink',
  },
  {
    title: 'Lines',
    note: '`line` divides two surfaces, `line-soft` two rows on one surface, `line-strong` closes a card’s head or foot.',
    tokens: ['line', 'line-soft', 'line-strong'],
  },
  {
    title: 'Purple — the one accent',
    note: 'The band is the only saturated surface in the product. Everything else is paper.',
    tokens: [
      'purple',
      'purple-dark',
      'purple-hover',
      'purple-ink',
      'purple-deep',
      'purple-line',
      'purple-tint',
      'purple-soft',
      'purple-wash',
    ],
  },
  {
    title: 'Green — covered, satisfied, done',
    note: 'One meaning, and it never identifies a section.',
    tokens: ['green', 'green-ink', 'green-line', 'green-tint', 'green-soft', 'green-wash'],
  },
  {
    title: 'Amber — someone still has to act',
    note: 'An estimate is deliberately neither amber nor green: nobody has to act on it and nothing has settled.',
    tokens: ['amber', 'amber-ink', 'amber-line', 'amber-tint', 'amber-soft', 'amber-wash'],
  },
  {
    title: 'Crimson — a deadline is close, or a panel failed',
    note: 'Never for “important”. A thing being important is said with position, not with red.',
    tokens: ['crimson', 'crimson-ink', 'crimson-line', 'crimson-soft'],
  },
  {
    title: 'Teal — off-system, and awaiting a decision',
    note: 'One icon tile uses this and nothing else does. It is on this page so it can be decided on rather than quietly spread. Nothing new may use it.',
    tokens: ['teal', 'teal-line', 'teal-soft'],
  },
  {
    title: 'Translucent — the two glass surfaces and the scrim',
    note: 'The only tokens with alpha, so each swatch sits half on paper and half on ink: an alpha you cannot judge against both is an alpha nobody can judge. `--glass` was being retyped as a raw #ffffffeb for as long as it had no swatch here.',
    tokens: ['glass', 'scrim'],
    alpha: true,
  },
];

const SPACE = [
  ['space-1', 'inside a chip; a label to the value under it'],
  ['space-2', 'an icon to its own word'],
  ['space-3', 'two facts sharing one line'],
  ['space-4', 'elements in a row'],
  ['space-5', 'a row’s own padding'],
  ['space-6', 'blocks inside a card'],
  ['space-7', 'a roomier block, where the content asks something'],
  ['space-8', 'card to card'],
  ['space-9', 'a card’s own padding'],
  ['space-10', 'a page region to the next'],
  ['space-11', 'the top and the bottom of a page'],
  ['space-12', 'a page’s own top and bottom on a wide screen'],
  ['space-13', 'the widest step: the padding on a page’s outer frame'],
];

const RADIUS = [
  ['radius-xs', 'a bar, a tiny marker'],
  ['radius-chip', 'a chip, a small tile'],
  ['radius-tile', 'an icon tile, a control'],
  ['radius-row', 'a row, or a block nested inside a card'],
  ['radius-card', 'a card on the canvas'],
  ['radius-panel', 'a drawer, a modal, a window'],
  ['radius-pill', 'a pill'],
  ['radius-round', 'a circle: an avatar, an orbit ring, a dot'],
];

const WEIGHT = [
  ['fw-regular', 'running copy, and everything not asking to be read first'],
  ['fw-medium', 'a link, and the label on a control'],
  ['fw-semi', 'a text button, a count beside a heading'],
  ['fw-bold', 'the answer in a row, a figure, the page’s h1'],
  ['fw-heavy', 'exists because 9px uppercase needs more than bold to hold its colour — not a sixth heading level'],
];

const TRACKING = [
  ['ls-hero', 'the h1, and only the h1'],
  ['ls-tight', 'a figure, and the heading that names a page section'],
  ['ls-snug', 'a card’s heading, and the answer in a row'],
  ['ls-caps', 'every uppercase label — uppercase always opens up'],
  ['ls-wide', 'the mono eyebrow on the hero band, and nothing else'],
];

const LEADING = [
  ['lh-tight', 'figures, and the h1'],
  ['lh-heading', 'a heading that runs to two lines'],
  ['lh-body', 'everything you actually read'],
];

const FAMILY = [
  ['font-geist-sans', 'the product'],
  ['font-geist-mono', 'a token name, a figure that must not shift, the hero eyebrow'],
];

const CONSTANT = [
  ['hero-gap', 'what every section gets under the hero band'],
  ['hero-tuck', 'the extra the summary panel eats into the band, and only when it follows it directly'],
  ['band-outdent', 'how far the band reaches past the shared column on each side'],
  ['panel-pad', 'the summary panel’s own padding'],
  ['safe-bottom', 'the corner Edward owns. No page may put a primary action inside it'],
  ['toast-bottom', 'where a toast sits'],
];

const DEPTH = [
  ['shadow-soft', 'a panel that floats over the page rather than sitting on it'],
  ['shadow-card', 'a card raised off the canvas — the one every card uses'],
  ['shadow-float', 'a window: the info modal, and Edward'],
];

const MOTION = [
  ['dur-fast', 'a control answering a pointer'],
  ['dur-base', 'a panel arriving or leaving'],
  ['ease', 'the one curve, and everything that moves uses it'],
];

const LAYER = [
  ['z-topbar', 'the bar at the top of the page'],
  ['z-nav-scrim', 'what dims the page under the nav drawer'],
  ['z-sidebar', 'the nav itself'],
  ['z-tooltip', 'a term’s bubble'],
  ['z-popover-scrim', 'what closes a popover when you click past it'],
  ['z-popover', 'the topbar’s popovers'],
  ['z-edward', 'the assistant: over the page, under anything modal'],
  ['z-scrim', 'what dims the page under a drawer'],
  ['z-panel', 'the drawer itself'],
  ['z-modal', 'a modal, which owns the screen'],
  ['z-toast', 'the one thing allowed over a modal'],
];

const TYPE = [
  ['fs-hero', 'the page’s one h1'],
  ['fs-figure', 'a rail’s headline number'],
  ['fs-display', 'a panel figure, and the heading that names a page section'],
  ['fs-h2', 'the heading that names a card'],
  ['fs-h3', 'the title of a row or a task'],
  ['fs-h4', 'a strong lead-in inside a row'],
  ['fs-body', 'running copy in a drawer or a panel'],
  ['fs-copy', 'running copy in a card'],
  ['fs-meta', 'the line under a heading, and the label on a control'],
  ['fs-small', 'facts, timestamps, states'],
  ['fs-micro', 'the smallest thing that is still a word'],
];

const ADVISOR = {
  initials: 'TO',
  label: 'Your enrollment advisor',
  name: 'Tomás Okafor',
  office: 'Admissions Office',
};

/** Read a token off the live cascade, so a swatch cannot go stale. */
function useTokens(names) {
  const [values, setValues] = useState({});
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const next = {};
    for (const name of names) next[name] = style.getPropertyValue(`--${name}`).trim();
    setValues(next);
  }, [names.join(',')]);
  return values;
}

function Section({ id, title, children, rule }) {
  return (
    <section className="sg-section" aria-labelledby={id}>
      <div className="sg-section-head">
        <h2 id={id}>{title}</h2>
        {rule ? <p>{rule}</p> : null}
      </div>
      {children}
    </section>
  );
}

const bar = (token) => (
  <span className="sg-bar" style={{ width: `var(--${token})` }} aria-hidden="true" />
);

function Block({ title, note, children }) {
  return (
    <div className="sg-block">
      <h3>{title}</h3>
      {note ? <p className="sg-note">{note}</p> : null}
      {children}
    </div>
  );
}

/**
 * A token, its live value, a specimen, and what it is for.
 *
 * Space was the only scale that had this, so it was the only scale anyone
 * could read. Weight, tracking, leading, the frame constants, depth, motion
 * and the layers are the same four things and now say them the same way.
 */
function ScaleList({ rows, specimen, className }) {
  const values = useTokens(rows.map(([token]) => token));
  return (
    <ul className={['sg-scale', className].filter(Boolean).join(' ')}>
      {rows.map(([token, note]) => (
        <li key={token}>
          <code>--{token}</code>
          <small>{values[token] || '—'}</small>
          {specimen ? specimen(token) : null}
          <p>{note}</p>
        </li>
      ))}
    </ul>
  );
}

function Swatches({ group }) {
  const values = useTokens(group.tokens);
  const classes = ['sg-swatches', group.over === 'ink' && 'over-ink', group.alpha && 'alpha']
    .filter(Boolean)
    .join(' ');
  return (
    <Block title={group.title} note={group.note}>
      <ul className={classes}>
        {group.tokens.map((token) => (
          <li key={token}>
            <span className="sg-chip-frame" aria-hidden="true">
              <span className="sg-chip-colour" style={{ background: `var(--${token})` }} />
            </span>
            <code>--{token}</code>
            <small>{values[token] || '—'}</small>
          </li>
        ))}
      </ul>
    </Block>
  );
}

export default function Styleguide() {
  const [drawer, setDrawer] = useState(false);
  const radiusValues = useTokens(RADIUS.map(([t]) => t));
  const typeValues = useTokens(TYPE.map(([t]) => t));

  return (
    <>
      <header className="page-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>Audentra</span> · The design system, rendered
          </p>
          <h1>Everything the product is allowed to be made of.</h1>
          <p>
            If a shape is not on this page it does not exist. A section that invents one is a
            section nobody else can copy from — which is how this product ended up with eight rails
            that each wrote their own anchor card, and 436 hand-typed colours.
          </p>
        </div>
      </header>

      <div className="sg-page">
        <Section
          id="sg-colour"
          title="Colour"
          rule="A raw hex in a rule is a bug. If the colour you need is not here, the token is missing — add it to tokens.css, do not inline it."
        >
          {COLOUR_GROUPS.map((group) => (
            <Swatches key={group.title} group={group} />
          ))}

          <Block
            title="The one gradient"
            note="The primary action’s surface. Name this; never the two stops. It was written out three times — the primary button, the student’s bubble and the send control — which is how a “same” button ends up not being one."
          >
            <div className="sg-gradient" aria-hidden="true" />
            <p className="sg-gradient-name">
              <code>--grad-purple</code>
            </p>
          </Block>
        </Section>

        <Section
          id="sg-space"
          title="Space"
          rule="Thirteen steps. The audit found every whole pixel from 1 to 20 in use as a gap — a flat distribution over twenty values, which is the absence of a scale rather than a scale with exceptions."
        >
          <ScaleList rows={SPACE} specimen={bar} />

          <Block
            title="Layout constants — not steps on the scale"
            note="Facts about the page frame rather than a step you may pick from. A section that needs a gap reaches for a step above; nothing new should reach for one of these."
          >
            <ScaleList rows={CONSTANT} specimen={bar} className="wide" />
          </Block>
        </Section>

        <Section
          id="sg-radius"
          title="Radius"
          rule="The ladder is the point: the bigger the thing, the rounder it is, so a row inside a card can never come out rounder than the card holding it."
        >
          <ul className="sg-radii">
            {RADIUS.map(([token, note]) => (
              <li key={token}>
                <span className="sg-radius-box" style={{ borderRadius: `var(--${token})` }} aria-hidden="true" />
                <code>--{token}</code>
                <small>{radiusValues[token] || '—'}</small>
                <p>{note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="sg-type"
          title="Type"
          rule="Sizes carry a role, not a number. Pick by what the text is. The greeting must never be larger than the figure it introduces. Weight, tracking and leading are chosen the same way — and there is no sixth of any of them."
        >
          <ul className="sg-type">
            {TYPE.map(([token, note]) => (
              <li key={token}>
                <p style={{ fontSize: `var(--${token})` }}>The year, and what still needs you</p>
                <code>--{token}</code>
                <small>{typeValues[token] || '—'}</small>
                <p className="sg-note">{note}</p>
              </li>
            ))}
          </ul>

          <Block title="Weight" note="Five. The fifth exists because 9px uppercase needs more than bold to hold its colour.">
            <ScaleList
              rows={WEIGHT}
              className="wide"
              specimen={(token) => (
                <span className="sg-weight-demo" style={{ fontWeight: `var(--${token})` }}>
                  The answer
                </span>
              )}
            />
          </Block>

          <Block title="Tracking" note="It follows size: the bigger the type the tighter it sets, and uppercase always opens up.">
            <ScaleList
              rows={TRACKING}
              className="wide"
              specimen={(token) => (
                <span className="sg-tracking-demo" style={{ letterSpacing: `var(--${token})` }}>
                  The year ahead
                </span>
              )}
            />
          </Block>

          <Block title="Leading" note="Three: figures, headings, and everything you read.">
            <ScaleList
              rows={LEADING}
              className="wide"
              specimen={(token) => (
                <span className="sg-leading-demo" style={{ lineHeight: `var(--${token})` }}>
                  Two lines, so that the leading is something you can actually see
                </span>
              )}
            />
          </Block>

          <Block title="Families" note="Two, and no external font request. The mono is for what must not shift under you.">
            <ScaleList
              rows={FAMILY}
              className="wide"
              specimen={(token) => (
                <span className="sg-family-demo" style={{ fontFamily: `var(--${token})` }}>
                  The year, and what still needs you
                </span>
              )}
            />
          </Block>
        </Section>

        <Section
          id="sg-depth"
          title="Depth"
          rule="Three planes, so three shadows. A raw shadow in a rule is a decision about the whole product taken locally — the same bug as a raw hex, and harder to see."
        >
          <ScaleList
            rows={DEPTH}
            className="sg-depth wide"
            specimen={(token) => (
              <span className="sg-depth-tile" style={{ boxShadow: `var(--${token})` }} aria-hidden="true" />
            )}
          />
        </Section>

        <Section
          id="sg-motion"
          title="Motion"
          rule="Two durations and one curve. Hover a row to watch it: fast is a control answering a pointer, base is a panel arriving. A third duration is one nobody decided on."
        >
          <ScaleList
            rows={MOTION}
            className="sg-motion wide"
            specimen={(token) => (
              <span
                className="sg-motion-demo"
                style={
                  token === 'ease'
                    ? { transitionTimingFunction: `var(--ease)` }
                    : { transitionDuration: `var(--${token})` }
                }
                aria-hidden="true"
              />
            )}
          />
        </Section>

        <Section
          id="sg-layers"
          title="Layers"
          rule="The product’s stacking order, named. A raw z-index in a rule is the same bug as a raw hex, and the only way to sit between two of these is to add a name to the list."
        >
          <ScaleList rows={LAYER} className="sg-layers wide" />
        </Section>

        <Section
          id="sg-card"
          title="The card, and its three zones"
          rule="Every block of a page’s main column is a card; nothing sits loose on the canvas. A card opens with one of three heads, and the head and the foot are visible bands of the card’s own paper — not a fourth plane."
        >
          <div className="sg-grid">
            <Card>
              <CardHead
                kind="status"
                icon="file"
                tone="docs"
                title="A status head"
                note="For the card that holds a section’s content. The icon tile is the one place a card head spends colour."
              />
              <CardRows>
                <div className="sg-row">
                  <span>What a row looks like</span>
                  <strong>The answer</strong>
                </div>
                <div className="sg-row">
                  <span>One anchor per row</span>
                  <strong>and it is the value</strong>
                </div>
                <div className="sg-row">
                  <span>The label is small and muted</span>
                  <strong>above it</strong>
                </div>
              </CardRows>
              <CardFoot>
                A foot is for what qualifies the card as a whole. Anything that merely comes last is
                content.
              </CardFoot>
            </Card>

            <Card>
              <CardHead
                kind="card"
                icon="calendar"
                title="A card head"
                note="For a card that is one block among several. Neutral tile, no state."
              />
              <CardRows>
                <div className="sg-row">
                  <span>Rows give up their own surface</span>
                  <strong>and live on the card’s white</strong>
                </div>
                <div className="sg-row">
                  <span>They run out to the card’s edges</span>
                  <strong>so the hairlines span it</strong>
                </div>
              </CardRows>
            </Card>

            <Card>
              <CardHead
                kind="section"
                eyebrow="What’s happening"
                title="A section head"
                aside={<span className="result-count">3 results</span>}
              />
              <CardRows>
                <div className="sg-row">
                  <span>An eyebrow above the name</span>
                  <strong>and room for a control</strong>
                </div>
              </CardRows>
            </Card>
          </div>
        </Section>

        <Section
          id="sg-anchor"
          title="The anchor card"
          rule="Every rail opens with one: the section’s key secondary figure, on ink. Label, then figure, then what qualifies it — that order is no longer the author’s to get wrong."
        >
          <div className="sg-rail-demo">
            <AnchorCard variant="reply" label="Typical reply" figure="2 business days">
              <p>
                What goes under the figure is the section’s own. What goes above it is not up for
                debate.
              </p>
            </AnchorCard>
            <AnchorCard variant="waiting" label="With Aster right now" figure={3}>
              <p>A figure can be a number, a phrase, or a node with a `small` inside it.</p>
            </AnchorCard>
          </div>
        </Section>

        <Section
          id="sg-summary"
          title="The summary panel"
          rule="Two cells and only two — the figure, and the person who owns the subject — the same height by construction. Anything that qualifies the figure goes to the panel’s foot, never a fourth line in the cell."
        >
          <section className="page-summary" aria-label="Summary panel example">
            <div className="summary-main">
              <SummaryFigure label="Your enrollment progress" figure="5 of 14 steps complete">
                You’re right on track. Your next task takes about 4 minutes.
              </SummaryFigure>
              <AdvisorBar advisor={ADVISOR} onContact={() => {}} />
            </div>
          </section>
        </Section>

        <Section
          id="sg-buttons"
          title="Buttons"
          rule="At most one primary per card, and it is the thing the card is asking for. An icon-only control takes a label, so it cannot ship without a name."
        >
          <div className="sg-controls">
            <Button kind="primary" icon="arrow">
              Primary
            </Button>
            <Button kind="secondary" leadingIcon="refresh">
              Secondary
            </Button>
            <Button kind="text">Text</Button>
            <Button kind="link">Link</Button>
            <IconButton name="close" label="Close" />
            <IconButton name="chevron" label="Collapse" />
          </div>
          <div className="sg-controls block">
            <Button kind="primary" full icon="arrow">
              Full — what a drawer’s action does, and a card’s rarely should
            </Button>
          </div>
        </Section>

        <Section
          id="sg-states"
          title="States"
          rule="Every section answers four questions: what if it is loading, empty, unavailable, or broken. A screen without all four is a screen that has only been designed for the happy path."
        >
          <div className="sg-grid">
            <StateCard variant="empty" icon="file" title="Nothing here yet">
              An empty state says what will appear here and what produces it — never just “no
              results”.
            </StateCard>
            <StateCard
              variant="error"
              icon="alert"
              title="This didn’t load"
              action={{ label: 'Try again', icon: 'refresh', onClick: () => {} }}
            >
              An error says what is unaffected, so the student knows what they have not lost.
            </StateCard>
            <StateCard variant="partial" icon="clock" title="Not available just now">
              Unavailable is not empty. The difference is whether there is nothing, or whether we
              cannot see it.
            </StateCard>
          </div>
        </Section>

        <Section
          id="sg-overlay"
          title="Overlays"
          rule="One overlay owns the screen at a time. Focus moves in on open and back to whatever opened it on close; Esc closes one layer, not the stack. None of that is the author’s to remember — it comes with the primitive."
        >
          <div className="sg-controls">
            <Button kind="secondary" onClick={() => setDrawer(true)}>
              Open a drawer
            </Button>
          </div>
          {drawer && (
            <Drawer
              label={['The design system', 'Every drawer in the product']}
              titleId="sg-drawer-title"
              closeLabel="Close the example drawer"
              onClose={() => setDrawer(false)}
            >
              <div className="drawer-icon">
                <Icon name="book" size={25} />
              </div>
              <h2 id="sg-drawer-title">This is the frame, and only the frame</h2>
              <p className="drawer-description">
                The scrim, the dialog, the ARIA wiring, the two label facts, the close, the content
                wrapper and a foot that does not scroll. Eight drawers used to write this out by
                hand. Try Esc, and try Tab — the keyboard cannot leave this panel.
              </p>
              <div className="drawer-actions">
                <Button kind="primary" full icon="arrow" onClick={() => setDrawer(false)}>
                  What a drawer’s action looks like
                </Button>
                <p className="drawer-foot">
                  And what a foot note under it looks like. Both are content, placed by the section.
                </p>
              </div>
            </Drawer>
          )}
        </Section>

        <Section
          id="sg-rules"
          title="The rules that are not in a component"
          rule="These cannot be enforced by code, so they are written where they will be seen."
        >
          <ul className="sg-rules">
            <li>
              <strong>Three planes, never four.</strong> The canvas, a card on it, the ink anchor. A
              list inside a card sits on that card’s own white. A box inside a box is what made the
              portal read as stacked rather than built.
            </li>
            <li>
              <strong>Never mark a rounded element by painting one of its edges.</strong> A 3px
              accent down the left of a card is a rule bar wearing a card’s corners, and the
              cheapest possible way to say “this one matters”. Say it in the element’s own ink.
            </li>
            <li>
              <strong>Mark the exception, never the rule.</strong> A tag on eight rows out of twelve
              is texture, not information. Label the run once and let the boundary carry it.
            </li>
            <li>
              <strong>Spend colour once per card, on the row that is asking.</strong> If every row
              is washed, the card is decorated again.
            </li>
            <li>
              <strong>One anchor per row, and it is the answer.</strong> The eye should run down the
              column of values and never have to read a label.
            </li>
            <li>
              <strong>Green means exactly one thing</strong> — covered, satisfied, done — and never
              identifies a section.
            </li>
            <li>
              <strong>Accessibility and responsive behaviour are part of done.</strong> Landmarks,
              labels, Esc, focus return, and the narrow width — not a follow-up card.
            </li>
          </ul>
        </Section>
      </div>
    </>
  );
}
