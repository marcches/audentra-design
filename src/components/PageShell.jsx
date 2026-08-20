import Icon from '../Icon.jsx';
import { heroFor } from '../lib/navigation.js';

/**
 * The frame every page inherits — ENR-174 AC7.
 *
 * It used to own only the top and the bottom: a head, then whatever `children`
 * happened to be, then the footer. Everything in between was invented once per
 * section, so the tab row, the escalation strip and the summary panel landed in
 * a different order on every screen — and on My Financials the summary panel,
 * which is built to tuck under the hero, tucked under an alert strip instead and
 * sat on top of it. The Jam of 2026-08-20 called that out, and asked for My
 * Enrollment's construction everywhere.
 *
 * So the shell owns the order now. Five slots, always in this sequence:
 *
 *   hero      the band that says where you are          — always
 *   summary   the section's one figure, and who owns it — tucked under the hero
 *   notice    a caveat true of the whole section        — full width
 *   tabs      which leaf of the group you are reading   — directly above it
 *   body      main column, and the rail beside it
 *
 * `alert` is not a sixth slot: an escalation is a footnote to the figure, not a
 * sibling of it. The balance reads "estimate · this number will go down" and the
 * alert is the reason it is not settled, so it rides on the foot of the summary
 * panel rather than stacking another full-width band into the page.
 *
 * The tab row comes last of the four because everything above it is true of the
 * whole group and everything below it is what the tab switches. That is why the
 * balance sits above the tabs on My Financials — it is the same number on all
 * three leaves — and it is ENR-189's rule for My Campus Life read as layout: a
 * required session is an obligation for the section, so it must not be able to
 * hide behind a tab the student did not open.
 *
 * A page passes slots, not markup order, so it cannot get the order wrong. The
 * tuck between the hero and the summary is a rule about those two elements
 * being adjacent, which is now guaranteed rather than hoped for.
 */
export default function PageShell({
  destination,
  hero,
  tabs,
  summary,
  summaryLabel,
  alert,
  notice,
  rail,
  children,
}) {
  // Copy comes from the destination model; a page overrides only what it has to
  // say dynamically — how many sessions are required, whether a board is empty.
  const { flag, kicker, title, lede, motif } = { ...heroFor(destination), ...hero };

  return (
    <>
      <header className="page-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            {flag && <span>{flag}</span>}
            {flag && kicker ? ' · ' : null}
            {kicker}
          </p>
          <h1>{title}</h1>
          {lede && <p>{lede}</p>}
        </div>

        {motif && (
          <div className="hero-motif" aria-hidden="true">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-core">
              <Icon name={motif} size={30} />
            </div>
            <i className="spark-dot one" />
            <i className="spark-dot two" />
            <i className="spark-dot three" />
          </div>
        )}
      </header>

      {summary && (
        <section className="page-summary" aria-label={summaryLabel}>
          <div className="summary-main">{summary}</div>
          {alert && <div className="summary-alert">{alert}</div>}
        </section>
      )}

      {notice}
      {tabs}

      {rail ? (
        <div className="page-body">
          <div className="page-main">{children}</div>
          <aside className="page-rail">{rail}</aside>
        </div>
      ) : (
        children
      )}

      <footer>
        <span>Aster University sample experience · Designed with Audentra</span>
        <span>
          <a href="#privacy">Privacy</a>
          <a href="#accessibility">Accessibility</a>
          <a href="#/help">Help</a>
        </span>
      </footer>
    </>
  );
}
