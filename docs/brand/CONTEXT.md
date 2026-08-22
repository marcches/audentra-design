# Audentra — brand

The language of Audentra's own identity: the marks, the palette, the gradient, the typeface, and
how the brand behaves beside a client institution's. It is separate from the product's glossary
([`/CONTEXT.md`](../../CONTEXT.md)) because the two never share a reader — a student never sees
this vocabulary, and the portal never needs it. Started 2026-08-22 while grilling the Brand
Guidelines v2, rebuilt the same day for v3 (`.scratch/brand-guidelines/`). American English throughout,
like the book (ADR 0006). A glossary and nothing else: the rules live in the
brand book (Figma, *Audentra Brand Guidelines*), the hard-to-reverse decisions in `docs/adr/`.

## Language

### The marks

**Symbol**:
Audentra's mark alone — the "A", drawn in four flat fills (Purple, Blue, Teal, Teal 700). Never
redrawn, never duplicated, never recolored outside its masters. It alone serves square formats —
there is no stacked form of the Logo.
_Avoid_: icon, logomark, favicon (a favicon is a *use* of the Symbol, not its name), stacked logo,
vertical lockup.

**Logo**:
The Symbol beside the wordmark. The default form of the brand.
_Avoid_: horizontal logo, lockup (a lockup is two brands — see below).

**Primary logo**:
The Logo with the tagline beneath it.
_Avoid_: full logo, logo-full (the file name, not the thing).

**Wordmark**:
The word AUDENTRA as drawn inside the Logo, in Navy. It is not a master of its own.

**Master**:
One of the four official drawings of a mark: *Color*, *Reverse* (the color Symbol with a white
wordmark, for dark canvases), *White* (one color), *Navy* (one color). Reverse and White are two
masters, not one.
_Avoid_: variant, version.

**Clear space**:
The exclusion zone around a mark — x, where x is the Symbol's height.

**Attribution**:
How Audentra appears inside a surface a client owns: "Powered by Audentra" — the Symbol in one
color beside the name, set in the surface's own type, small, in the foot. It signs; it never pairs.
_Avoid_: footer logo, co-brand, credit line.

**One color on an object**:
On anything decorated — a garment, a mug, a lanyard — the Symbol's four fills do not survive. Thread
has no gradient and screen print takes flat inks, so on an object the mark is one color: the White
master or the Navy master. Embroidery is not printing.
_Avoid_: mono logo, simplified mark (nothing is simplified — a different master is used).

**Lockup**:
Audentra's mark beside another organisation's mark, as equals. Exists only outside the product —
joint material, a client logo wall — never inside a surface the client owns.
_Avoid_: partnership logo, dual logo.

### Color

**Purple**:
`#6A38FF`. The lead brand color — the one that names the brand and leads every brand surface.
_Avoid_: violet, indigo, brand purple (there is only one purple in the brand).

**Blue** and **Teal**:
`#1E5BFF` and `#02CDC7`. The two supporting brand colors. Together with Purple they are **the
three** — never equals outside the gradient.
_Avoid_: royal blue, aqua, cyan, mint.

**Navy** and **White**:
`#0A1F44` and white. The two canvases — the surfaces everything else sits on. Navy is also the ink.
_Avoid_: deep navy, dark mode (a product mechanism, not a canvas).

**Brand gradient**:
The three in one sweep, Purple → Blue → Teal, in one construction. It is a *surface* — a canvas
for white type and the White master — never a fill of type, of the Symbol or of an icon.
_Avoid_: the gradient, gradient variants, gradient logo.

**Brand moment**:
A surface where the brand speaks at full strength — a cover, a divider, a hero, an end card, a
social tile. The places the Brand gradient and full-strength color are for. Everything else is
canvas, ink and a little Purple.

**Primary colors**:
Audentra Purple, Royal Blue, Audentra Teal, Deep Navy — the four the brand is made of, each with one
meaning. Purple is intelligence, imagination, possibility, and it leads. Royal Blue is clarity,
energy, confident action. Audentra Teal is progress, connection, resolution. Deep Navy is trust,
institutional credibility, depth.
_Avoid_: brand colors, the palette (there are four palettes), functional colors.

**Secondary colors**:
The 700 / 500 / 300 / 100 ramps of Purple, Blue and Teal. 700 grounds, 500 is the core, 300 softens,
100 is a field. They support the Primary colors; they never replace one.
_Avoid_: tints (a tint is one step, not the set), shades, accents.

**Alert palette**:
The six colors that carry a state — Success, Warning, Error, Information, Backlog, In progress. Two
of them are Primary colors doing a second job: Information is Royal Blue, In progress is Audentra
Teal. A state color is never used for emphasis or decoration.
_Avoid_: functional palette, semantic colors, status colors.

**Reproduction hierarchy**:
How a brand color is rendered outside a screen: the hex is the color, the named spot ink is how it
prints correctly, and the process build is an approximation the book names as one. Audentra Purple
and Royal Blue are outside the CMYK gamut and print duller; on a piece where the purple carries the
brand, it is a spot ink or it is not there (ADR 0015).
_Avoid_: print colors, CMYK values (the numbers are not the decision).

**One-color master**:
A master drawn in a single color — White or Navy. Where the Color master carries emphasis in color,
a one-color master carries it in weight: on the closer, "what's" and "next" are separated by weight
rather than by Royal Blue and Audentra Teal.

**Product accent**:
Purple tuned for screens inside the product (today a slightly softer purple). The brand's Purple
seen through the UI, not a second brand color.
_Avoid_: product purple, UI purple, accent color (the product's own word for the token, fine there,
not here).

### Type and voice

**Satoshi**:
The brand's headline face: Display, H1, H2, H3, in Bold, on every brand surface. Never running
text, never inside the product (ADR 0011).
_Avoid_: display font, brand font (it is one of two).

**Inter**:
The brand's text face: lead, body, captions, labels, values, in Regular, Medium, and Semi Bold.
Values and code are Inter with their own formatting; the brand has no monospace face.
_Avoid_: body font, a mono face for code.

**Geist**:
The product's typeface, sans and mono, by the product's own decision. It appears in the portal and
the staff tools and nowhere the brand speaks for itself; the book maps the split (ADR 0011).
_Avoid_: the brand font.

**Voice**:
"Close, not cool" — how Audentra and every surface it builds sound. Defined in the UX writing spec
and kept in the brand book's Voice chapter; it is the depth benchmark for every other chapter.

### Beside a client

**Host brand**:
The client institution's identity on a surface it owns — its student portal, its emails, its login.
The host leads; Audentra signs (ADR 0009).
_Avoid_: client brand, tenant brand, skin (skin is the product's mechanism for wearing a host brand,
not the brand itself).

**Client brand office**:
The people at a client institution who own the host brand. The brand book's second reader, after
whoever builds Audentra's own surfaces.
