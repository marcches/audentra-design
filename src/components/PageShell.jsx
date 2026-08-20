/**
 * The frame every page inherits — ENR-174 AC7. A section either passes its own
 * `hero` (My Enrollment keeps the celebration the Jam approved in ENR-164) or
 * gets the standard head: the group it belongs to, its name, one line of what
 * it holds.
 */
export default function PageShell({ hero, eyebrow, title, lede, children }) {
  return (
    <>
      {hero ?? (
        <header className="page-head">
          <p className="eyebrow muted">{eyebrow ?? 'Aster'}</p>
          <h1>{title}</h1>
          {lede && <p className="page-lede">{lede}</p>}
        </header>
      )}

      {children}

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
