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
    tokens: ['on-ink', 'on-ink-muted'],
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
  ['space-12', 'the widest gap the product uses'],
];

const RADIUS = [
  ['radius-xs', 'a bar, a tiny marker'],
  ['radius-chip', 'a chip, a small tile'],
  ['radius-tile', 'an icon tile, a control'],
  ['radius-row', 'a row, or a block nested inside a card'],
  ['radius-card', 'a card on the canvas'],
  ['radius-panel', 'a drawer, a modal, a window'],
  ['radius-pill', 'a pill'],
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

function Swatches({ group }) {
  const values = useTokens(group.tokens);
  return (
    <div className="sg-block">
      <h3>{group.title}</h3>
      <p className="sg-note">{group.note}</p>
      <ul className="sg-swatches">
        {group.tokens.map((token) => (
          <li key={token}>
            <span
              className="sg-chip-colour"
              style={{ background: `var(--${token})` }}
              aria-hidden="true"
            />
            <code>--{token}</code>
            <small>{values[token] || '—'}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Styleguide() {
  const [drawer, setDrawer] = useState(false);
  const spaceValues = useTokens(SPACE.map(([t]) => t));
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
        </Section>

        <Section
          id="sg-space"
          title="Space"
          rule="Twelve steps. The audit found every whole pixel from 1 to 20 in use as a gap — a flat distribution over twenty values, which is the absence of a scale rather than a scale with exceptions."
        >
          <ul className="sg-scale">
            {SPACE.map(([token, note]) => (
              <li key={token}>
                <code>--{token}</code>
                <small>{spaceValues[token] || '—'}</small>
                <span className="sg-bar" style={{ width: `var(--${token})` }} aria-hidden="true" />
                <p>{note}</p>
              </li>
            ))}
          </ul>
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
          rule="Sizes carry a role, not a number. Pick by what the text is. The greeting must never be larger than the figure it introduces."
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
