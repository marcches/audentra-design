# Asset library

Every approved drawing of an Audentra mark, generated from the three artworks in `docs/brand/`
by `npm run masters` (`scripts/brand/masters.mjs`). Nothing here is drawn by hand: the Color
master is the artwork, and every other master is that artwork with its fills rewritten. If a mark
changes, it changes in `symbol.svg`, `logo.svg` or `logo-full.svg`, and one command reaches all
forty-four files.

## The pattern

```
aud_[asset]_[mode]_[color].[ext]

asset   full · logo · symbol
mode    pos · rev · navy · white
color   4c · 1c
ext     svg · png
```

**No version in an asset's name.** A master is replaced, never numbered.
**No scale in an asset's name either** — the scale is the directory.

## What is here

| | |
| --- | --- |
| `svg/` | the eleven masters. These are the production files. |
| `png/1x`, `png/2x`, `png/3x` | the same eleven, rasterised at the artwork's own proportions, transparent ground |

Eleven and not twelve: the Symbol has no Reverse master, because Reverse exists to save a wordmark
from a dark canvas and the Symbol has no wordmark.

| Master | Symbol | Wordmark and tagline |
| --- | --- | --- |
| `pos` (Color) | four fills | Deep Navy |
| `rev` (Reverse) | four fills | White |
| `white` | White | White |
| `navy` | Deep Navy | Deep Navy |

In the one-color masters the emphasis the Color master carries in color — *what's* in Royal Blue,
*next* in Audentra Teal — is carried in weight. The artwork already does this; the book states it
as a principle.

## What is not here, and why

**Templates** — slides, letterhead, envelope, business card, the email signature snippet. They do
not exist yet. The book does not list a file it cannot hand over; when a template exists, it is
added here and the book's asset page gains a row.

**EPS and PDF.** SVG is the master a modern printer accepts. If a vendor asks for EPS, it is
converted from the SVG for that job and not kept, because a kept conversion is a second drawing.
