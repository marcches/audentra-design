/**
 * Aster University's mark — an aster.
 *
 * The sample institution is named for a flower, and until the Jam of
 * 2026-08-21 its mark was the letter A in a purple square, the same tile a
 * monogram gets. A mark that is a letter is a placeholder that says so; this
 * one is drawn, and it is ours — eight petals on a disc, set in the product's
 * own purple. It is deliberately not a glyph from the icon set: a school's
 * mark that is also the icon for "flower" somewhere else in the product is a
 * mark that can be confused with a button.
 *
 * `tile` draws it white on the purple tile (the brand row, the favicon, the
 * destination tile for Aster's own payment portal). Without it, the mark is
 * drawn in `currentColor` for use on paper or on ink.
 */
const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AsterMark({ size = 24, tile = false, className, title }) {
  const petals = PETALS.map((angle) => (
    <ellipse
      key={angle}
      cx="12"
      cy="5.9"
      rx="1.95"
      ry="4.1"
      transform={`rotate(${angle} 12 12)`}
    />
  ));

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      {tile ? (
        <>
          <rect width="24" height="24" rx="6.5" fill="var(--purple)" />
          <g fill="var(--on-ink)" fillOpacity=".92">{petals}</g>
          <circle cx="12" cy="12" r="2.7" fill="var(--purple)" />
          <circle cx="12" cy="12" r="2.7" fill="var(--on-ink)" fillOpacity=".55" />
        </>
      ) : (
        <>
          <g fill="currentColor" fillOpacity=".85">{petals}</g>
          <circle cx="12" cy="12" r="2.7" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
