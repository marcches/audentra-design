# Audentra brand book — print color specification and contrast verification

Research for the four color pages (Primary / Neutral / Secondary-tints / Alert).
Prepared 2026-08-22.

**Status of this document.** Everything under "What I computed" was produced on this machine with
a real ICC transform and the licensed Pantone Lab data, and the method is reproducible from the
code in the appendix. Everything under "What a human must confirm" is a proposal, not a
measurement. No number in this document is invented.

---

## 0. The short version

> **Follow-up round (second pass).** Sections 2.4, 4.5, 5, 8, 9 and 10 were completed in a second
> pass after the source research landed. Two things found in that pass **corrected** the first
> draft: no surveyed brand book names an ICC profile next to its CMYK (so §2.3's recommendation is
> reframed as a deliberate improvement rather than convention), and WCAG's luminance threshold is
> **0.04045**, not the 0.03928 used in the first computation — re-verified in §7, and it changes
> nothing. The unverifiable SWOP 300% TAC claim was removed from §3.3.

| Question | Answer |
| --- | --- |
| Which CMYK profile should the book name? | **U.S. Web Coated (SWOP) v2**, source **sRGB IEC61966-2.1**, **relative colorimetric + black point compensation**. Print the profile name on the page. |
| Naive formula or ICC? | **ICC.** The naive formula is off by a mean of **ΔE00 5.15**, and by **ΔE00 25** on the teal and the green. It must not be published. |
| Can the four primaries be printed in CMYK? | **The teal and the navy yes; the purple and the blue no.** `#6A38FF` is ΔE00 **13.8** out of gamut. This is the single most important finding for the book. |
| Are the contrast numbers right? | **All 19 claimed ratios verify exactly.** The one gap (Purple 300 on Deep Navy) is **5.33:1**. |
| Is "19 px semibold" right? | **No — wrong on both counts.** W3C says 18pt (**24px**) or 14pt **bold** (**18.5px**). "Semibold" is not "bold". |

---

## 1. What I computed

### 1.1 The tools, and why they are trustworthy

| Input | What it is | Where it came from |
| --- | --- | --- |
| `sRGB Color Space Profile.icm` | `sRGB IEC61966-2.1`, the HP/Microsoft reference profile | `C:\Windows\System32\spool\drivers\color\` |
| `USWebCoatedSWOP.icc` | `U.S. Web Coated (SWOP) v2`, "Copyright 2000 Adobe Systems, Inc." | Adobe install, `Common Files\Adobe\Color\Profiles\Recommended\` |
| `CoatedGRACoL2006.icc` | `Coated GRACoL 2006 (ISO 12647-2:2004)` | same |
| `PANTONE+ Solid Coated.acb` | Adobe color book, **1365 colors, native Lab**, "Copyright Pantone LLC, 2010" | Adobe Photoshop 2020 `Presets\Color Books\` |
| `PANTONE+ Color Bridge Coated.acb` | Pantone's own CMYK build per ink, 1323 colors | same |
| littleCMS 2.18 via Pillow 12.2.0 `ImageCms` | the color engine that performs the transform | — |

**These are real ICC transforms, not a formula.** Three sanity checks confirmed the engine and the
channel direction before any brand color was converted:

| Check | Result | Meaning |
| --- | --- | --- |
| `rgb(255,255,255)` → SWOP | `0/0/0/0` | no ink on white — direction is correct, not inverted |
| `rgb(255,0,0)` → SWOP | `0/100/100/0` | matches Photoshop exactly |
| `rgb(0,0,0)` → SWOP | `72/68/67/88` | a proper GCR/UCR rich black, not a naive `0/0/0/100` |

The Color Bridge decode was validated the same way: `PANTONE Process Cyan CP` decodes to
`100/0/0/0`, `Process Magenta CP` to `0/100/0/0`, `Process Yellow CP` to `0/0/100/0`.

The WCAG implementation was validated against five published reference values:
black-on-white **21.00**, `#767676`-on-white **4.54** (the canonical "just passes AA" grey),
`#777777`-on-white **4.48** (the canonical "just fails"), `#949494`-on-white **3.03**,
identical colors **1.00**. All five match.

### 1.2 Two robustness checks I ran on my own numbers

**Does the choice of sRGB profile matter?** No. I converted all 22 distinct colors through both
the Windows `sRGB IEC61966-2.1` profile and littleCMS's built-in sRGB. **0 of 22 differed.** The
CMYK values are not an artefact of which sRGB profile I picked.

**Which rendering intent actually reproduces the color best?** I measured it rather than asserting
it — each intent was run forward to CMYK and back to sRGB, and the round-trip ΔE2000 recorded:

| Intent | Mean round-trip ΔE00 | Deep Navy `#0A1F44` | Ink `#101828` |
| --- | --- | --- | --- |
| **Relative colorimetric + BPC** | **3.50** | **1.08** | **1.90** |
| Relative colorimetric, no BPC | 5.93 | 12.27 | 10.00 |
| Perceptual | 3.61 | 1.16 | 0.52 |
| Saturation | 3.66 | 1.29 | 0.52 |

Relative colorimetric **with black point compensation** wins overall, and for the dark colors it
is not close — without BPC the navy and the ink are clipped into mush (ΔE 12.3 and 10.0). This is
the empirical basis for the recommendation in §2, not a preference.

---

## 2. Question 1 — the defensible CMYK method

*(sources for this section are collected in §2.4)*

### 2.1 The four decisions a brand book has to make

A hex value has no single CMYK equivalent. CMYK is a **device** space: the same four ink
percentages produce different color on different presses, papers and inks, so a conversion is only
defined once you name a destination. A brand book that prints bare CMYK numbers without naming the
condition is publishing an incomplete specification. The four decisions:

1. **Source profile** — `sRGB IEC61966-2.1`. The brand's authority is a hex value, and a hex value
   is only meaningful as sRGB.
2. **Destination profile** — `U.S. Web Coated (SWOP) v2` (see §2.2).
3. **Rendering intent** — relative colorimetric with black point compensation (measured in §1.2).
4. **Whether to print the profile name** — yes (see §2.3).

### 2.2 Which destination profile — SWOP v2 or GRACoL

The honest position is that this is a **convention** choice, not a correctness one:

- **U.S. Web Coated (SWOP) v2** is Adobe's default CMYK working space in the North America Prepress
  color settings, which means it is what the overwhelming majority of US brand books were built
  in, and what a US printer expects to be handed. Its weakness is that it is old — the profile
  header on this machine reads "Copyright 2000 Adobe Systems, Inc." — and it characterizes *web*
  offset, not the sheetfed presses most brand collateral is actually printed on.
- **GRACoL 2006 Coated (ISO 12647-2:2004)** characterizes US commercial **sheetfed** printing and is
  the more technically appropriate target for a brand book's own collateral. GRACoL 2013 / CRPC6 is
  its modern successor.

I computed both. **The difference is small for most of the palette and large only where the color
is already out of gamut** — see the full data table in §12. Deep Navy is the one place they diverge
meaningfully in build (`99/89/42/48` SWOP vs `100/96/45/44` GRACoL).

**Recommendation: publish the SWOP v2 numbers**, because the book's job is to be handed to a
printer and understood without negotiation, and SWOP v2 is the lingua franca. Name it explicitly so
that a printer working to GRACoL knows to re-separate rather than assume.

### 2.3 Publish the profile alongside the numbers — but know that this is not the convention

**Recommendation: yes, print it. But I want to be straight about what that means, because the
survey in §5 contradicts the assumption behind the question.**

**Not one of the 16 published brand books surveyed names an ICC profile next to its CMYK numbers.**
Not SWOP, not GRACoL, not FOGRA. What the good ones name instead is **substrate and press type, in
prose**:

- **UNC Greensboro** goes furthest of any book found — four separate CMYK builds per color:
  > there are different CMYK color builds for offset and digital printing, as well as for coated
  > and uncoated paper. Offset printing means conventional printing with a printing press that uses
  > plates. Digital printing means a printing press that does not use plates…
- **Penn State**: *"Note: The Pantone Matching System® (PMS) spot color numbers listed below are for
  printing on 'coated' (C) paper."*
- **Stanford** annotates the value itself: `CMYK 0, 100, 65, 34 (coated paper)`.
- **Arizona State** sidesteps the question entirely by publishing **L\*a\*b** — device-independent
  values, separately for coated and uncoated, plus ink-mixing instructions.

So naming the profile would put Audentra **ahead of all sixteen**, not in line with them. I still
recommend it, on the ICC-sourced argument in §2.4: a CMYK quadruple does not identify a color
unless the condition it was separated for is named, so a book that omits it is publishing an
incomplete specification. But this is a defensible improvement, **not** an established convention,
and it should be adopted knowingly.

A line such as this belongs on the color pages (or once, on the first of them):

> CMYK values are converted from sRGB IEC61966-2.1 to U.S. Web Coated (SWOP) v2, relative
> colorimetric with black point compensation, for coated stock. For any other press condition,
> re-separate from the hex or Lab value rather than reusing these numbers.

Note the pattern worth stealing from the survey regardless: **say "coated"**. Every strong book does,
and it costs one word.

### 2.4 Sources

**That CMYK is device-dependent, so a hex has no unique CMYK — ICC specification, primary source.**
ICC.1:2022 Table A.1 classifies the color encodings, and this is the cleanest statement available:

> | Base space | Description |
> | --- | --- |
> | nCIEXYZ | Base CIE device-independent colour space |
> | RGB | Base device-dependent colour space |
> | CMYK | Base device-dependent colour space |
>
> The CIE colour spaces are defined in CIE 15. Derivatives of the nCIEXYZ space are defined as
> connection spaces (PCSXYZ and PCSLAB) in order to provide the unambiguous colour specification
> required […]

<https://archive.color.org/specification/ICC.1-2022-05.pdf> — the ICC spec classifies **both RGB and
CMYK as device-dependent**, and only CIE spaces as unambiguous. That a hex triplet cannot determine
a CMYK quadruple follows directly.

**Adobe, on the same point** (via the Internet Archive; `helpx.adobe.com` was unreachable from this
machine on repeated attempts):

> All CMYK working spaces are device-dependent, meaning that they are based on actual ink and paper
> combinations. The CMYK working spaces Adobe supplies are based on standard commercial print
> conditions.

<https://helpx.adobe.com/photoshop/using/color-settings.html> (archived:
<https://web.archive.org/web/20260117235748/https://helpx.adobe.com/photoshop/using/color-settings.html>)

**That Adobe's North America presets use U.S. Web Coated (SWOP) v2 — verified from Adobe's own
shipped files, not from documentation.** Adobe's published help no longer documents the presets, so
I read the color-settings files installed on this machine
(`C:\Program Files (x86)\Common Files\Adobe\Color\Settings\`) and extracted the embedded profile
names:

| Adobe preset file | CMYK working space | RGB working space |
| --- | --- | --- |
| `North America Prepress.csf` | **U.S. Web Coated (SWOP) v2** | Adobe RGB (1998) |
| `North America General Purpose.csf` | **U.S. Web Coated (SWOP) v2** | sRGB IEC61966-2.1 |
| `North America Web Internet.csf` | **U.S. Web Coated (SWOP) v2** | sRGB IEC61966-2.1 |
| `Europe Prepress 3.csf` | Coated FOGRA39 (ISO 12647-2:2004) | Adobe RGB (1998) |

`North America Prepress.csf` also carries the description string *"Preparation of content for common
printing conditions in North America. CMYK values are preserved. Profile warnings are enabled."*

**This table also contains the honest argument against SWOP v2.** Adobe revised the European preset
to a *third* generation on a 2004 ISO profile, while all three North America presets still point at
a profile whose header reads "Copyright 2000 Adobe Systems, Inc." SWOP v2 is entrenched by default,
not by having been kept current.

**Rendering intents — ICC.1:2022 clause 6.2**, <https://archive.color.org/specification/ICC.1-2022-05.pdf>:

> **6.2.2 Media-relative colorimetric intents** — Transformations for the Media-relative
> colorimetric intent shall re-scale the in-gamut, chromatically adapted tristimulus values such
> that the white point of the actual medium is mapped to the PCS white point […]

> **6.2.4 Perceptual intent** — In perceptual transforms the PCS values represent hypothetical
> measurements of a colour reproduction on the reference reflective medium. […] The exact colour
> rendering of the perceptual intent is vendor specific.

> **6.2.5 Saturation intent** — The exact colour rendering of the saturation intent is vendor
> specific and involves compromises such as trading off preservation of hue in order to preserve
> the vividness of pure colours.

**Black point compensation — Adobe** (archived page above):

> **Use Black Point Compensation** Ensures that the shadow detail in the image is preserved by
> simulating the full dynamic range of the output device. Select this option if you plan to use
> black point compensation when printing (which is recommended in most situations).

**SWOP's characterization data is CGATS TR001 — ICC.1:2022 Annex D.6.3:**

> This example shows how the standard data for SWOP, as published in CGATS TR001, could be used
> when building a data to PCS transform for the media-relative colorimetric intent.

**GRACoL / CRPC6.** GRACoL is now custodied by PRINTING United Alliance, not Idealliance —
`idealliance.org/gracol/` 302-redirects to
<https://www.printing.org/library/standards/specifications-for-print-production>, which describes
GRACoL as *"General Requirements for Applications in Commercial Offset Lithography"* and maps
*"ISO15339-CRPC6 – Typical PremCoated – Large gamut (typically commercial) printing"*. The profile
registry entry for `GRACoL2013_CRPC6` (<https://registry.color.org/profile-registry/GRACoL2013_CRPC6>)
records **TAC 320%, medium+ GCR, max black 100%**, characterizing *"ISO DIS 15339-2, CGATS.21-2"*.

**Note on citing intents.** The ICC specification *defines* the four intents but issues no
recommendation about which to use for solid brand colors, and Adobe's black-point-compensation
line above is about shadow detail in images. **My recommendation of relative colorimetric + BPC
rests on the measurement in §1.2, not on a citation** — that is the honest framing, and the
measurement is the stronger evidence anyway.

---

## 3. Question 2 — the CMYK values

### 3.1 Which set the book should print, and why

**Print the ICC (SWOP v2) column. Do not print the naive column.**

I tested what would actually happen if the book published naive-formula numbers: each naive build
was sent through the SWOP profile back to sRGB and compared to the intended brand color.

| Color | ICC build | lands at ΔE00 | Naive build | lands at ΔE00 |
| --- | --- | --- | --- | --- |
| Audentra Teal `#02CDC7` | `67/0/30/0` | **4.41** | `99/0/3/20` | **25.01** |
| Success `#12B76A` | `76/0/81/0` | **0.89** | `90/0/42/28` | **23.73** |
| Teal 700 `#04B2A9` | `75/4/41/0` | **0.78** | `98/0/5/30` | **23.26** |
| Teal 300 `#67E1DD` | `49/0/20/0` | **6.07** | `54/0/2/12` | **16.78** |
| Ink `#101828` | `86/78/55/71` | **1.55** | `60/40/0/84` | **5.91** |
| Error `#D92D20` | `9/96/100/1` | **1.45** | `0/79/85/15` | **5.97** |

**Mean penalty across the palette for using the naive formula: ΔE00 5.15.** ΔE00 above roughly 5 is
"a different color" to an ordinary observer. The naive formula fails hardest exactly where the
brand lives — the teal family and the green — because it has no model of ink, paper or black
generation and simply cannot know that cyan ink is not `#00FFFF`.

The naive formula is given in §12 for completeness and for nobody's use.

### 3.2 The four color pages — values to typeset

CMYK is **sRGB IEC61966-2.1 → U.S. Web Coated (SWOP) v2, relative colorimetric + BPC**.
Pantone is **Solid Coated**, and is a **proposal to be confirmed against a physical swatch** (§4).

#### Primary

| Name | HEX | RGB | CMYK | PANTONE |
| --- | --- | --- | --- | --- |
| Audentra Purple | `#6A38FF` | 106 56 255 | 72 75 0 0 | 266 C *(poor, ΔE 9.2 — see §4.2)* |
| Royal Blue | `#1E5BFF` | 30 91 255 | 81 66 0 0 | 2726 C *(ΔE 5.5)* |
| Audentra Teal | `#02CDC7` | 2 205 199 | 67 0 30 0 | 3252 C *(ΔE 0.7)* |
| Deep Navy | `#0A1F44` | 10 31 68 | 99 89 42 48 | 2768 C *(ΔE 1.6)* |

#### Neutral

| Name | HEX | RGB | CMYK | PANTONE |
| --- | --- | --- | --- | --- |
| White | `#FFFFFF` | 255 255 255 | 0 0 0 0 | — (paper) |
| Cloud | `#F2F4F7` | 242 244 247 | 3 2 1 0 | — (tint, see note) |
| Mist | `#EAECF0` | 234 236 240 | 6 5 3 0 | — (tint, see note) |
| Slate | `#98A2B3` | 152 162 179 | 42 31 21 0 | 7543 C *(ΔE 3.5)* |
| Graphite | `#667085` | 102 112 133 | 64 52 35 9 | 431 C *(poor, ΔE 6.8)* |
| Ink | `#101828` | 16 24 40 | 86 78 55 71 | 532 C *(ΔE 3.8)* |
| Deep Navy | `#0A1F44` | 10 31 68 | 99 89 42 48 | 2768 C *(ΔE 1.6)* |

*Cloud and Mist are near-white and no solid ink matches them (best is 656 C at ΔE 4.7 / 3.3). They
should be specified as a screen tint of Ink or Deep Navy, or as CMYK-only. Do not assign them a
solid Pantone.*

#### Secondary / tints

| Name | HEX | RGB | CMYK | PANTONE |
| --- | --- | --- | --- | --- |
| Purple 700 | `#502ABF` | 80 42 191 | 80 85 0 0 | 267 C *(poor, ΔE 6.9)* |
| Purple 500 | `#6A38FF` | 106 56 255 | 72 75 0 0 | 266 C *(poor, ΔE 9.2)* |
| Purple 300 | `#9E7EFF` | 158 126 255 | 48 53 0 0 | — |
| Purple 100 | `#D2C3FF` | 210 195 255 | 16 23 0 0 | — |
| Blue 700 | `#1744BF` | 23 68 191 | 90 79 0 0 | 2728 C *(ΔE 3.5)* |
| Blue 500 | `#1E5BFF` | 30 91 255 | 81 66 0 0 | 2726 C *(ΔE 5.5)* |
| Blue 300 | `#6D94FF` | 109 148 255 | 56 40 0 0 | — |
| Blue 100 | `#BCCEFF` | 188 206 255 | 22 15 0 0 | — |
| Teal 700 | `#04B2A9` | 4 178 169 | 75 4 41 0 | 326 C *(ΔE 3.8)* |
| Teal 500 | `#02CDC7` | 2 205 199 | 67 0 30 0 | 3252 C *(ΔE 0.7)* |
| Teal 300 | `#67E1DD` | 103 225 221 | 49 0 20 0 | — *(3252 C at ~85%)* |
| Teal 100 | `#B3F0EE` | 179 240 238 | 26 0 10 0 | — *(3252 C at ~57%)* |

**On the 300 and 100 steps.** By convention a tint step is specified as a **screen percentage of the
parent ink**, not as an ink of its own. I modeled that (Murray–Davies, no dot gain) and the result
splits:

| Step | Parent | Tint | ΔE00 | Verdict |
| --- | --- | --- | --- | --- |
| Teal 300 | 3252 C | ~85% | 2.36 | works |
| Teal 100 | 3252 C | ~57% | 2.45 | works |
| Purple 300 | 266 C | ~84% | 8.86 | fails |
| Purple 100 | 266 C | ~55% | 6.31 | fails |
| Blue 300 | 2726 C | ~83% | 8.55 | fails |
| Blue 100 | 2726 C | ~53% | 6.67 | fails |

The purple and blue tints fail because **the parent ink is already a poor match at solid** — the
error is inherited, not introduced. Recommendation: **give the 300 and 100 steps no Pantone at
all** and mark the ramp CMYK/digital-only. The tint percentages above ignore dot gain and are a
starting point for a printed tint chart, not a specification.

#### Alert

| Name | HEX | RGB | CMYK | PANTONE |
| --- | --- | --- | --- | --- |
| Success | `#12B76A` | 18 183 106 | 76 0 81 0 | 7480 C *(weak, ΔE 5.3 — see §4.3)* |
| Warning | `#F79009` | 247 144 9 | 0 52 100 0 | 144 C *(ΔE 1.4)* |
| Error | `#D92D20` | 217 45 32 | 9 96 100 1 | 485 C *(ΔE 1.5)* |
| Information | `#1E5BFF` | 30 91 255 | 81 66 0 0 | 2726 C *(ΔE 5.5)* |
| Backlog | `#98A2B3` | 152 162 179 | 42 31 21 0 | 7543 C *(ΔE 3.5)* |
| In progress | `#02CDC7` | 2 205 199 | 67 0 30 0 | 3252 C *(ΔE 0.7)* |

### 3.3 The finding that matters most: half the palette is out of CMYK gamut

Round-trip ΔE2000 (sRGB → SWOP CMYK → sRGB) measures how far the printed result must land from the
screen color **even when everything is done correctly**. It is not an error; it is the gamut.

| Color | HEX | ΔE00 under SWOP | What print actually gives you |
| --- | --- | --- | --- |
| **Audentra Purple / Purple 500** | `#6A38FF` | **13.83** | `rgb(97,88,166)` — a dull grey-violet |
| Purple 300 | `#9E7EFF` | 11.60 | `rgb(140,125,186)` |
| **Royal Blue / Blue 500 / Information** | `#1E5BFF` | **9.77** | `rgb(69,99,174)` |
| Purple 700 | `#502ABF` | 8.93 | `rgb(85,71,157)` |
| Purple 100 | `#D2C3FF` | 8.43 | `rgb(208,194,223)` |
| Blue 300 | `#6D94FF` | 7.25 | `rgb(118,141,199)` |
| Teal 300 | `#67E1DD` | 6.22 | `rgb(122,205,208)` |
| Blue 700 | `#1744BF` | 5.56 | `rgb(52,80,163)` |
| Blue 100 | `#BCCEFF` | 5.55 | `rgb(193,204,232)` |
| Teal 100 | `#B3F0EE` | 5.14 | `rgb(186,227,229)` |
| Audentra Teal | `#02CDC7` | 4.27 | `rgb(59,191,190)` |
| Ink | `#101828` | 1.90 | fine |
| Error / Warning / Deep Navy / Success / greys | — | ≤ 1.5 | fine |

**The core brand purple cannot be printed in process color.** ΔE00 13.8 is not a near miss; it is
a different color. The book should say so plainly and route the purple to a spot ink wherever the
budget allows. The blue is nearly as bad at 9.8.

Total area coverage: the heaviest builds are **Ink at 290%** and **Deep Navy at 278%**; everything
else is well below. These are the two to raise with the printer, since heavy four-color blacks are
where TAC limits and drying problems bite. **I could not verify SWOP's specified TAC ceiling from a
primary source** — the commonly quoted figure is 300%, but I found no citation for it and am not
publishing it as fact (see §8). For comparison, the one figure I could source is
`GRACoL2013_CRPC6`, registered at **TAC 320%**
(<https://registry.color.org/profile-registry/GRACoL2013_CRPC6>). Confirm the ceiling with the
printer rather than relying on this document.

---

## 4. Question 3 — Pantone matching

### 4.1 Method, and why it is stronger than the usual guess

Most published "hex → Pantone" matches compare a hex to somebody's hex approximation of a Pantone
chip. I did better than that: this machine has Adobe's licensed **`PANTONE+ Solid Coated.acb`**,
which stores Pantone's own **Lab** values for all 1365 inks — the measured colorimetry, not a
screen approximation.

The method:

1. Brand hex → linear sRGB → XYZ (D65) → **Bradford chromatic adaptation to D50** → Lab(D50).
   The adaptation matters: Pantone's Lab is D50, sRGB is D65, and comparing them without adapting
   is an apples-to-oranges error that would corrupt every match.
2. **ΔE2000** against all 1365 Solid Coated inks (full implementation in the appendix).
3. Rank, and report the top candidates rather than a single answer.

**I cross-validated the Lab data against an independent public dataset** (an unofficial 2024 v5
Solid Coated set, 3219 entries). Across 1327 shared inks: median ΔE **1.22**, mean **1.62** — which
is 8-bit quantisation noise, i.e. the two sources agree. But the agreement is **not uniform**, and
the disagreement is systematic:

| Band | Count | Share |
| --- | --- | --- |
| ΔE < 1 | 467 | 35.2% |
| 1–2 | 654 | 49.3% |
| 2–5 | 137 | 10.3% |
| **> 5 (revised between editions)** | **69** | **5.2%** |

The >5 group is concentrated almost entirely in the **cyan / green / teal family** — 7460 C, 307 C,
3135 C, 641 C, Process Blue C, 313 C, Green C, 314 C. **This is exactly where the Audentra palette
lives**, so it is a live caveat, not a footnote — see §4.3.

### 4.2 The proposals

Quality bands: ΔE00 < 2 excellent · 2–3.5 acceptable · 3.5–5 visible shift · > 5 not a match.

| Color | HEX | Proposal | ΔE00 | Second choice | ΔE00 | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Audentra Teal / In progress | `#02CDC7` | **PANTONE 3252 C** | **0.74** | 3255 C | 2.86 | excellent |
| Warning | `#F79009` | **PANTONE 144 C** | **1.44** | 715 C | 3.62 | excellent |
| Error | `#D92D20` | **PANTONE 485 C** | **1.51** | 7626 C | 2.60 | excellent |
| Deep Navy | `#0A1F44` | **PANTONE 2768 C** | **1.62** | **282 C** | **1.71** | excellent — see note |
| Blue 700 | `#1744BF` | **PANTONE 2728 C** | 3.50 | 7687 C | 5.91 | visible shift |
| Slate / Backlog | `#98A2B3` | **PANTONE 7543 C** | 3.50 | 535 C | 4.94 | visible shift |
| Teal 700 | `#04B2A9` | **PANTONE 326 C** | 3.76 | 7465 C | 4.95 | visible shift — see §4.3 |
| Ink | `#101828` | **PANTONE 532 C** | 3.83 | 7547 C | 4.28 | visible shift |
| Success | `#12B76A` | **PANTONE 7480 C** | 5.25 | 7481 C | 5.64 | weak — see §4.3 |
| Royal Blue / Blue 500 / Information | `#1E5BFF` | **PANTONE 2726 C** | 5.53 | 7455 C | 7.57 | weak |
| Purple 700 | `#502ABF` | **PANTONE 267 C** | 6.85 | 2736 C | 7.80 | **no real match** |
| Graphite | `#667085` | **PANTONE 431 C** | 6.82 | 7667 C | 6.97 | **no real match** |
| Audentra Purple / Purple 500 | `#6A38FF` | **PANTONE 266 C** | 9.21 | 2725 C | 10.20 | **no real match** |

**Deep Navy — a genuine judgement call.** 2768 C (ΔE 1.62) and 282 C (ΔE 1.71) are within noise of
each other, and the two reference datasets disagree about which wins (the 2024 set prefers 282 C at
ΔE 1.28). **282 C is the more widely stocked and better-known ink**; I would put 282 C on the page
and let the swatch book decide. Both are excellent matches.

**The purple has no Pantone match in Solid Coated.** ΔE 9.2 is a different color. `#6A38FF` sits
outside what any single solid ink reaches. The book has three honest options: (a) accept 266 C and
say so, (b) commission a custom mix, (c) declare the purple screen-only and use a different
brand-approved color for print. This is a decision for a person, not a converter.

### 4.3 Where my own numbers are weakest — read this before deciding

Three proposals sit in the cyan/green region where my two reference datasets disagree, so the ΔE I
report carries extra uncertainty:

| Ink | ΔE from 2010 Pantone data | ΔE from 2024 data | Spread |
| --- | --- | --- | --- |
| PANTONE 7480 C (Success) | 5.25 | **1.99** | **3.3** |
| PANTONE 326 C (Teal 700) | 3.76 | **0.77** | **3.0** |
| PANTONE 3252 C (Teal) | 0.74 | 1.27 | 0.5 |

Success and Teal 700 may be **considerably better matches than my headline number suggests** — or
not. I cannot resolve it from data alone, because I do not know which edition's measurements
correspond to the ink a printer will actually buy in 2026. **These two in particular must be
checked against a current physical guide.** The teal (3252 C) is stable across both sets and is
safe.

Note also that the 2024 dataset proposes inks that did not exist in the 2010 book and that I
therefore could not verify are in the current Solid Coated Formula Guide: 2097 C for the purple
(ΔE 8.04, still poor), 2098 C for Purple 700 (ΔE 3.34 — **materially better than 267 C**), 6218 C
for Slate (ΔE 1.82), 4129 C for Graphite (ΔE 2.19 — **much better than 431 C**). If those inks are
in the current guide they are worth checking; I could not confirm their membership.

### 4.4 Pantone's own CMYK builds, as a cross-check

From `PANTONE+ Color Bridge Coated`, Pantone's four-color simulation of each proposed ink:

| Ink | Pantone Color Bridge CMYK | My SWOP build for the brand hex |
| --- | --- | --- |
| 144 C | 0/51/100/0 | 0/52/100/0 — **agrees** |
| 485 C | 0/95/100/0 | 9/96/100/1 — close |
| 2726 C | 81/70/0/0 | 81/66/0/0 — close |
| 2728 C | 90/68/0/0 | 90/79/0/0 | 
| 266 C | 76/90/0/0 | 72/75/0/0 |
| 267 C | 82/97/0/0 | 80/85/0/0 |
| 3252 C | 49/0/23/0 | 67/0/30/0 |
| 326 C | 81/0/39/0 | 75/4/41/0 |
| 7480 C | 75/0/71/0 | 76/0/81/0 |
| 2768 C | 100/90/13/71 | 99/89/42/48 |
| 282 C | 100/90/13/68 | — |
| 7543 C | 24/9/8/22 | 42/31/21/0 |
| 431 C | 45/25/16/59 | 64/52/35/9 |
| 532 C | 88/76/30/82 | 86/78/55/71 |

These two columns answer **different questions** and should not be reconciled: the Bridge column is
"the best CMYK simulation of the *ink*", mine is "the best CMYK reproduction of the *hex*". Since
Audentra's authority is the hex, **the book should print my column**. The Bridge column is what to
use if and only if a piece is being matched to the spot ink.

### 4.5 The caveat the book must carry

**Every Pantone number in §4.2 is a proposal derived from screen colorimetry. Not one has been
compared to a physical swatch or a press proof.** ΔE2000 against Pantone's published Lab is the
best evidence obtainable without ink on paper, and it is genuinely good evidence — but it cannot
account for the actual ink batch, the paper, the press, the coating, or the light the book is read
under. A ΔE of 0.74 means "this is worth putting in front of a swatch book first", not "this is
the ink".

#### How real brand books word this

**Pantone's own site** — the canonical formulation, and the one to follow most closely.
<https://www.pantone.com/color-finder/185-c>

> Before using, understand that the colors shown on this site are computer simulations of the
> PANTONE Colors and may not match PANTONE-identified color standards. Always consult PANTONE
> Publications to visually evaluate any result before utilization.

**Stanford** — <https://identity.stanford.edu/design-elements/color/>

> For print and promotional items, Stanford vendors must match approved Pantone colors listed
> above. The colors on this website are not intended to match Pantone color standards. For accurate
> color standards to match, refer to the current editions of Pantone color publications.

**UC Berkeley** — the best-written of the genre, because it names the *specific* mismatch instead of
hand-waving. <https://identity.berkeley.edu/visual-identity/color-palette/>

> CMYK (cyan, magenta, yellow, black) are the base inks to build the colors specified. They can get
> very close to PMS inks, but don't always match. … Note that these CMYK builds will not match the
> Pantone® Color Bridge breakdowns for the equivalent PMS number. Always use the color values
> listed.

> HEX colors are RGB (red, green, blue) values to build the infinite colors you see on screen. …
> While everyone's screens vary, we have made every effort to be as consistent as possible. Note
> that the HEX colors will not match converted RGB builds, so use the HEX number.

Berkeley's move is worth copying exactly: it tells the reader **which number wins** rather than
merely warning that they differ. That is the difference between a caveat and a rule.

#### The footnote, in Audentra's voice

> **On the Pantone values.** These are proposals, matched by measurement against Pantone's published
> color data. No one has held them against a printed swatch yet. Before you run a job, confirm the
> ink against a current Pantone Formula Guide and sign a press proof. If the swatch disagrees with
> this page, the swatch is right.

Short, concrete, and it does the one thing Berkeley does: it says who wins.

A second sentence for the CMYK numbers, if the page has room:

> **On the CMYK values.** Converted from the hex to U.S. Web Coated (SWOP) v2 on coated stock. On
> any other press or paper, re-separate from the hex — don't reuse these numbers.

---

## 5. Question 4 — swatch page conventions

Sixteen published brand books were fetched and read. The findings below are from the pages
themselves, not from summaries of them.

### 5.1 What order the values go in

There are two conventions, and the split is by **audience and era**, not by country:

**Print-first — `PANTONE → CMYK → RGB → HEX`.** The majority, and the older convention.

| Book | Order as published | URL |
| --- | --- | --- |
| Penn State | PMS-C → CMYK → RGB → HEX # | [COLOR v1 PDF](https://bpb-us-e1.wpmucdn.com/sites.psu.edu/dist/7/59340/files/2018/03/COLORv1_Guide-2apje6h.pdf) |
| Stanford | PMS → CMYK → RGB → HEX | <https://identity.stanford.edu/design-elements/color/primary-colors/> |
| USC | PMS → CMYK → RGB → HEX | <https://identity.usc.edu/identity/color/> |
| UCLA | PANTONE (C) → PANTONE (U) → CMYK → RGB → HEX | <https://brand.ucla.edu/identity/colors> |
| UC Berkeley | PANTONE → CMYK → HEX (no RGB triplet at all) | <https://identity.berkeley.edu/visual-identity/color-palette/> |
| UNC Greensboro | PMS C → PMS U → RGB → HEX → offset CMYK → digital CMYK | <https://uc.uncg.edu/brand-guide/university-colors/> |
| Iowa | PMS → CMYK → HEX → RGB → Madeira thread | <https://brand.uiowa.edu/color> |

**Digital-first — `RGB / HEX → CMYK → PANTONE`,** with Pantone last. The newer convention.

| Book | Order as published | URL |
| --- | --- | --- |
| MIT | Web block (RGB → HEX) then Print block (CMYK → PMS) | <https://brand.mit.edu/color> |
| Ribbon Communications | RGB → HEX → CMYK → Pantone | [Brand Guidelines v6.0 PDF](https://learn.rbbn.com/hubfs/Logos-rbbn-brand/Ribbon-Branding-Guidelines.pdf) |
| University of Arizona | CMYK → RGB → HEX → PANTONE | <https://marcom.arizona.edu/brand-guidelines/colors> |
| Arizona State | CMYK → RGB → HTML — **no Pantone on the primaries at all** | <https://brandguide.asu.edu/brand-elements/design/color> |

**Recommendation for Audentra: digital-first.** Audentra is a SaaS product whose color authority
*is* the hex value and whose overwhelming daily use is on screen. `HEX → RGB → CMYK → PANTONE`
puts the values in descending order of how often a reader needs them and matches where MIT, Ribbon
and Arizona have landed. It also reads honestly given §3.3: the hex is the specification, and the
CMYK and Pantone are derived approximations of it.

### 5.2 Inside or outside the swatch

**Outside. Unanimously — 16 of 16.** Not one book prints a hex or CMYK string over the color.

The variation is only in *where* outside: directly beneath the chip (most), in a labeled row-matrix
under a strip of chips (Penn State), or in a table column beside it (MIT, where the swatch is the
rightmost column). UT Dallas's markup is the clearest proof — the chip is a bare `div` with a
background color and no text node at all, and the values sit in a sibling paragraph.

### 5.3 What the good ones do about label contrast

**This is the interesting finding: none of the sixteen states a label-contrast rule, because none
of them needs one.** By putting every value outside the chip on the page background, the contrast
problem is designed away rather than solved. That is the convention, and it is a better answer than
any rule about when to flip label color.

The single exception found is **UCLA**, which prints two words inside its tertiary chips — the chip
is split in half, the left rendered as the CMYK simulation and labeled `CMYK`, the right as RGB and
labeled `RGB`. Even there only the two words go inside; all five numeric values stay in the list
below.

Several books (ASU, Berkeley, UCLA, UNCG) do carry contrast rules, but for **brand text on brand
color generally**, not for the swatch page's own labels.

**Recommendation for Audentra: keep every value outside the chip.** It removes the contrast problem
at the root, and §7.1 shows the palette would otherwise force awkward decisions — white labels are
unreadable on the teal (1.99:1), the warning (2.35:1) and the success green (2.62:1), all of which
fail even the 3:1 non-text threshold. If a label must go inside a chip anywhere in the book, it
should be `#101828` Ink, never white, and never on those three.

One more rule worth stealing, from **Penn State** — it is aimed squarely at a PDF brand book:

> Do not use software tools (i.e., an eyedropper or color picker) to sample the displayed colors in
> this PDF. Only use the provided ASE files or manually enter the exact values listed in this
> document.

---

## 6. Question 5 — WCAG "large text", and the "19 px semibold" correction

### 6.1 The normative definition

WCAG 2.1, definition of **large scale (text)** — verbatim:

> with at least 18 point or 14 point bold or font size that would yield equivalent size for Chinese,
> Japanese and Korean (CJK) fonts

Two of its notes bear directly on the correction:

> **Note 3**: The actual size of the character that a user sees is dependent both on the
> author-defined size and the user's display or user agent settings. For many mainstream body text
> fonts, 14 and 18 point is roughly equivalent to 1.2 and 1.5 em or to 120% or 150% of the default
> size for body text (assuming that the body font is 100%), but authors would need to check this for
> the particular fonts in use.

> **Note 1**: Fonts with extraordinarily thin strokes or unusual features and characteristics that
> reduce the familiarity of their letter forms are harder to read, especially at lower contrast
> levels.

Source: <https://www.w3.org/TR/WCAG21/#dfn-large-scale>

### 6.2 W3C's own px equivalence

From *Understanding Success Criterion 1.4.3: Contrast (Minimum)* — verbatim:

> The ratio between sizes in points and CSS pixels is 1pt = 1.333px, therefore 14pt and 18pt are
> equivalent to approximately 18.5px and 24px.

Source: <https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html>

### 6.3 The thresholds

| Criterion | Requirement |
| --- | --- |
| SC 1.4.3 Contrast (Minimum), normal text | **4.5:1** |
| SC 1.4.3 Contrast (Minimum), large text | **3:1** |
| SC 1.4.11 Non-text Contrast | **3:1** |

### 6.4 The correction

**"19 px semibold" is wrong on two independent counts.**

1. **The number.** The bold threshold is 14pt = **18.5px**, not 19px. Writing 19px is not a
   conservative rounding — it is a *different* threshold, and a 18.5px–19px bold text would be
   incorrectly excluded.
2. **The weight — this is the more serious error.** WCAG says **bold**. Semibold (600) is not bold
   (700). WCAG's definition recognises no intermediate weight, so **semibold text does not qualify
   as large scale at 14pt/18.5px** and must meet the full **4.5:1**, not 3:1. A page that grants
   semibold the 3:1 allowance is under-specifying contrast and would fail an audit.

**Suggested replacement wording:**

> Large text is 18pt (24px) at any weight, or 14pt (18.5px) bold. Large text needs 3:1; everything
> else needs 4.5:1. Semibold is not bold — semibold text is held to 4.5:1 at every size.

---

## 7. Question 6 — contrast ratio verification

Computed per WCAG 2.1 sRGB relative luminance, implementation validated in §1.1.

**A threshold correction, and why it changes nothing here.** WCAG 2.1 no longer uses the 0.03928
linearisation threshold that most implementations (including my first run) carry — it was changed
to **0.04045** in May 2021, and the spec carries an explicit note about it:

> **Note 2**: Before May 2021 the value of 0.04045 in the definition was different (0.03928). It was
> taken from an older version of the specification and has been updated. It has no practical effect
> on the calculations in the context of these guidelines.

<https://www.w3.org/TR/WCAG21/#dfn-relative-luminance>

I re-ran all 20 pairs under both thresholds: **0 of 20 differ, and not by luck.** The two cut points
land at 8-bit channel values 10.016 and 10.315, so **no integer 0–255 falls between them** — every
8-bit color takes the same branch either way. The numbers below are correct under both the old and
current definitions. Anything published citing 0.03928 as *current* WCAG is nonetheless out of date.

The formula itself, verbatim from the same source:

> L = 0.2126 * R + 0.7152 * G + 0.0722 * B … if RsRGB <= 0.04045 then R = RsRGB/12.92 else
> R = ((RsRGB+0.055)/1.055) ^ 2.4

and the ratio, from <https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio>:

> (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter of the colors, and
> L2 is the relative luminance of the darker of the colors.

One more rule from the Understanding document that matters when a value sits on a boundary:

> The computed values should not be rounded (e.g., 4.499:1 would not meet the 4.5:1 threshold).

That applies directly to `#667085` on `#F2F4F7` below, which computes 4.51 and passes — but would
not survive any change to either color.

| Foreground | Background | Computed | Claimed | Status |
| --- | --- | --- | --- | --- |
| `#FFFFFF` | `#12B76A` | **2.62** | 2.62 | ✅ |
| `#FFFFFF` | `#F79009` | **2.35** | 2.35 | ✅ |
| `#FFFFFF` | `#02CDC7` | **1.99** | 1.99 | ✅ |
| `#FFFFFF` | `#D92D20` | **4.83** | 4.83 | ✅ |
| `#FFFFFF` | `#1E5BFF` | **5.26** | 5.26 | ✅ |
| `#101828` | `#98A2B3` | **6.89** | 6.89 | ✅ |
| `#101828` | `#FFFFFF` | **17.75** | 17.75 | ✅ |
| `#0A1F44` | `#FFFFFF` | **16.25** | 16.25 | ✅ |
| `#1E5BFF` | `#FFFFFF` | **5.26** | 5.26 | ✅ |
| `#6A38FF` | `#FFFFFF` | **5.80** | 5.80 | ✅ |
| `#02CDC7` | `#FFFFFF` | **1.99** | 1.99 | ✅ |
| `#101828` | `#F2F4F7` | **16.11** | 16.11 | ✅ |
| `#6A38FF` | `#F2F4F7` | **5.26** | 5.26 | ✅ |
| `#667085` | `#F2F4F7` | **4.51** | 4.51 | ✅ |
| `#0A1F44` | `#B3F0EE` | **12.86** | 12.86 | ✅ |
| `#502ABF` | `#D2C3FF` | **5.36** | 5.36 | ✅ |
| `#0A1F44` | `#D2C3FF` | **10.05** | 10.05 | ✅ |
| `#98A2B3` | `#0A1F44` | **6.31** | 6.31 | ✅ |
| `#9E7EFF` | `#0A1F44` | **5.33** | *(unknown)* | **filled in** |
| `#02CDC7` | `#0A1F44` | **8.17** | 8.17 | ✅ |

**All 19 claimed ratios verify to 2 decimals. No corrections needed.** The gap is Purple 300 on
Deep Navy = **5.33:1**.

### 7.1 What these ratios mean for usage rules

Worth stating on the page, since several are near a boundary:

| Pair | Ratio | Passes |
| --- | --- | --- |
| `#FFFFFF` on `#02CDC7` | 1.99 | **nothing** — fails even non-text 3:1 |
| `#FFFFFF` on `#F79009` | 2.35 | **nothing** — fails 3:1 |
| `#FFFFFF` on `#12B76A` | 2.62 | **nothing** — fails 3:1 |
| `#FFFFFF` on `#D92D20` | 4.83 | AA normal text |
| `#667085` on `#F2F4F7` | 4.51 | AA normal text, by 0.01 |
| `#FFFFFF` on `#1E5BFF` | 5.26 | AA normal text |
| `#9E7EFF` on `#0A1F44` | 5.33 | AA normal text |

**White on teal, white on warning and white on success all fail every WCAG threshold, including the
3:1 for non-text.** If the book shows white text on those three swatches it is publishing a
combination the product must not use. Ink `#101828` on teal is the safe pairing. And
`#667085` on `#F2F4F7` passes by **0.01** — it should not be described as comfortably accessible.

---

## 8. What I could not verify

Listed plainly, because a brand book is a document people act on.

### 8.1 Print behavior — nothing here has touched paper

**No ink was put on paper for any of this.** Every print number in this document is a *prediction*
from an ICC profile. A profile is a good model of a press; it is not a press. Specifically:

- **No press proof, no swatch book, no densitometer.** The gamut findings in §3.3, the Pantone
  proposals in §4.2 and the tint percentages in §3.2 are all screen-derived.
- **Dot gain is not modeled** in the tint percentages. On press a 57% screen prints heavier than
  57%, so the real tint numbers will be lower than the ones I give.
- **Paper is idealized.** The tint model assumes a perfect white; real coated stock is not.

### 8.2 Claims I deliberately did not make

- **SWOP's TAC ceiling.** Commonly quoted as 300%; I found no primary source and have not published
  it as fact (§3.3).
- **That "U.S. Web Coated (SWOP) v2" is built on CGATS TR001.** The ICC spec ties *SWOP* to TR001
  (§2.4), but does not name Adobe's v2 profile. The inference is reasonable; the citation is not
  direct.
- **That GRACoL 2013 / CRPC6 formally supersedes GRACoL 2006.** Both are referenced by PRINTING
  United Alliance, but I found **no explicit supersession statement**. "GRACoL 2013 (CRPC6) is the
  current dataset" is safe; "supersedes" is not.
- **That SWOP v2 is officially "legacy".** Only secondary material. What I *can* show is the
  evidence in §2.4: Adobe revised Europe to a third-generation preset on a 2004 ISO profile and left
  all three North America presets on a profile stamped 2000. That is an observation from primary
  files, not a claim about Adobe's intent.
- **What US brand books and printers "most commonly" name.** I surveyed 16 books; none named an ICC
  profile at all (§5.3). Beyond that I have no survey data, and neither does anyone else I could
  find. Do not let this document imply otherwise.
- **That relative colorimetric + BPC is the *recommended* intent for brand colors.** No standards
  body says this. My recommendation rests on my own measurement (§1.2), which is stated as such.

### 8.3 Data-quality limits on the Pantone work

- **My Pantone Lab data is the 2010 PANTONE PLUS edition** (1365 inks), because that is what the
  licensed Adobe book on this machine contains. Pantone has since revised values and added inks.
- **The two reference datasets disagree by more than ΔE 5 on 69 inks (5.2%)**, concentrated in the
  cyan/green family where this palette lives. **Success and Teal 700 are directly affected** — see
  §4.3. I cannot resolve which edition matches the ink a printer buys in 2026.
- **I could not confirm that the newer inks exist in the current Solid Coated Formula Guide** —
  2097 C, 2098 C, 6218 C, 4129 C are proposed by the 2024 dataset but absent from the 2010 book.
  2098 C and 4129 C look materially better than my primary proposals and are worth checking.

### 8.4 Sources that would not load

- **`helpx.adobe.com` was unreachable** from this machine across many attempts. The Adobe quote in
  §2.4 came via the Internet Archive; the preset defaults were recovered from the `.csf` files on
  disk instead, which is a better source anyway.
- **Adobe's published help no longer documents the color-settings presets at all** — searching the
  archived pages for "North America", "Prepress" and "SWOP" returns zero hits.
- Brand books that refused to load: Johns Hopkins (403), University of Michigan (403), University of
  Akron (403), Cornell (404), Yale (DNS), IBM Design Language (JS-rendered), Mozilla (redirect stub).
  The survey is 16 books, not a random sample, and skews toward US universities because those
  publish openly.
- **`pantone.com/about/legal-and-privacy` returned 404.** The trademark rules quoted in §8.5 came
  from a 2010 PDF hosted by Pantone's Brazil distributor, not from pantone.com.

### 8.5 Pantone licensing — what I can and cannot say

**Printing PMS numbers in your own brand guidelines is normal and unremarkable — 15 of the 16 books
surveyed do it.** Pantone's Marking and Usage Rules are about *marking*, not prohibition: the word
PANTONE must precede the number, at equal or greater point size; a `®` after first prominent use;
and an attribution line. What is actually policed is reproducing the color *as a standard*, which
is why brand books cite the number and tell the printer to match a physical chip rather than
claiming the printed rectangle **is** PANTONE 3252.

**Caveat: the document I have is dated 2010 and came from a distributor's site, not pantone.com.**
Treat this as orientation, not legal advice.

The 2022 Adobe removal does not affect whether you may print the numbers — it affects whether your
readers can pick the swatch in Illustrator. USC's live page is the clearest trace of it reaching
brand books: *"PMS colors are now no longer available through Adobe Apps. Please contact us for a
workaround."* (<https://identity.usc.edu/identity/color/>). ASU went further and retired Pantone for
its two primaries entirely (<https://brandguide.asu.edu/brand-elements/design/color>).

---

## 9. What a human must confirm

Ordered. Items 1–3 need a Pantone Formula Guide on a desk; items 4–6 need a printer.

### Before the book is typeset

**1. Take a current Pantone Formula Guide (Solid Coated) to daylight and check these nine inks.**
Hold the chip against the on-screen color. Check in this order — the first four are decisions, the
rest are confirmations:

| # | Color | Proposed | Why it needs a human |
| --- | --- | --- | --- |
| 1 | Deep Navy `#0A1F44` | **2768 C** vs **282 C** | Genuine tie (ΔE 1.62 vs 1.71); my two datasets disagree. **282 C is more widely stocked** — pick one and commit. |
| 2 | Success `#12B76A` | **7480 C** | My datasets differ by ΔE 3.3 on this ink. May be much better than the 5.25 headline. |
| 3 | Teal 700 `#04B2A9` | **326 C** | Same problem — ΔE 3.76 or 0.77 depending on edition. |
| 4 | Audentra Purple `#6A38FF` | **266 C** (ΔE 9.2) | **Not a match.** A decision, not a confirmation — see §10. |
| 5 | Audentra Teal `#02CDC7` | **3252 C** | ΔE 0.74, stable across both datasets. Expect this to be right. |
| 6 | Warning `#F79009` | **144 C** | ΔE 1.44. Expect right. |
| 7 | Error `#D92D20` | **485 C** | ΔE 1.51. Expect right. |
| 8 | Royal Blue `#1E5BFF` | **2726 C** | ΔE 5.53 — the best available, but visibly bluer/duller. Confirm it is acceptable. |
| 9 | Graphite `#667085` / Slate `#98A2B3` | **431 C** / **7543 C** | 431 C is ΔE 6.8 — poor. Check **4129 C** and **6218 C** if the guide has them. |

**2. Check whether 2098 C and 4129 C are in the current guide.** If they are, compare them against
Purple 700 and Graphite — the 2024 data says they beat my proposals by ΔE 3.5 and 4.6.

**3. Decide the print rule for the purple and the blue** (§10). This is a brand decision about
budget and fidelity, and no amount of measurement settles it.

### Before anything is printed at volume

**4. Pull a press proof on the actual stock**, and check specifically:
   - Deep Navy and Ink — the two heavy builds (TAC 278% and 290%). Confirm the TAC ceiling with the
     printer; I could not source SWOP's.
   - The teal, and the Teal 300/100 tints, where the tint percentages in §3.2 ignore dot gain and
     will need adjusting downward.

**5. Confirm which press condition the printer actually runs.** If they work to GRACoL rather than
SWOP, re-separate from the hex — do not reuse the numbers in §3.2. The GRACoL builds are in §12 if
needed.

**6. Get the uncoated values if the book will be printed uncoated,** or if merch runs on uncoated
stock. Everything here is coated (C). Five of the sixteen books surveyed publish both C and U;
that is a real gap in this document.

### Standing

**7. Re-check the Pantone proposals against a guide bought in the last two years.** My Lab data is
the 2010 edition (§8.3).

---

---

## 10. When the brand color cannot be printed in process

`#6A38FF` is ΔE00 **13.8** out of gamut and `#1E5BFF` is **9.8** (§3.3). The book cannot show a
CMYK swatch of either and call it the brand color, because it isn't one. It needs a rule that a
commercial printer and a merch vendor can both follow. Below is real published wording for exactly
this situation, then a rule built out of it.

### 10.1 What real brand books do

**UCLA — the closest match to Audentra's situation, and the best single model.** It admits the
shift, explains the cause, and gives a costed remedy in three sentences.
<https://brand.ucla.edu/identity/colors>

> Please note that in order to maintain maximum vibrancy of these colors, they will appear slightly
> different between screen and print. Due to printing limitations, the CMYK values are slightly
> duller than ideal. If your budget allows, select one tertiary color from the palette to include in
> your project and print it as a spot to bring the vibrancy fully to life in print.

**USC — the spot chip as the authority, stated as an obligation on the printer.**
<https://identity.usc.edu/identity/color/>

> If you are trying to match our brand colors PMS 201C and PMS 123C on uncoated paper you will note
> that we always match to the coated (C) version of the Pantone color. That means that all printers
> MUST match to the coated Pantone chip of that color. … When the designer goes to the printer, they
> should take the Pantone COATED chips with them to match to the coated color.

**MIT — spot ink named per substrate, with the decision handed to the printer.**
<https://brand.mit.edu/color>

> For optimal results, we have two MIT reds for printing spot color: PMS 202 C for coated paper and
> PMS 7427 U for uncoated paper. Work with your printer to ensure you're using the proper version.

**UC Berkeley — resolves the conflict by naming which number wins.**
<https://identity.berkeley.edu/visual-identity/color-palette/>

> CMYK … can get very close to PMS inks, but don't always match. … Note that these CMYK builds will
> not match the Pantone® Color Bridge breakdowns for the equivalent PMS number. Always use the color
> values listed.

**NASA, 1976 — the substrate-agnostic formulation, and still the cleanest.** Where no numbering
system reaches, the standard is a *visual match to a physical reference*.
[NASA Graphics Standards Manual NHB 1430-2](https://www.nasa.gov/sites/default/files/atoms/files/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf)

> Color Standards — The swatches shown below are to be used in achieving a visual match for NASA red
> and NASA warm gray in any medium of reproduction.

> NASA Red. This swatch is to be used in achieving a visual match in any medium of reproduction
> including inks, paints, dyes or other pigments when NASA Red is specified.

**Iowa — merch handled by naming a thread number**, not by hoping. Its swatch page carries a
**Madeira thread** number alongside PMS/CMYK/HEX/RGB. <https://brand.uiowa.edu/color>

**Arizona State — the radical option, for comparison.** ASU retired Pantone for both primaries and
publishes device-independent **L\*a\*b** values plus ink-mixing instructions and its own printed
swatch book. <https://brandguide.asu.edu/brand-elements/design/color>

> Only use yellow, rubine, Pantone process blue and neutral black when mixing ink to match these
> color chips.

### 10.2 The rule for Audentra

Adapted from UCLA's structure, USC's obligation on the printer, and NASA's substrate-agnostic
fallback. Ordered, so anyone can find their row and stop reading.

> **Reproducing Audentra Purple and Royal Blue**
>
> Audentra Purple `#6A38FF` and Royal Blue `#1E5BFF` are screen colors. Four-color process printing
> cannot reach them — in CMYK the purple loses most of its intensity and prints as a muted violet.
> This is a limitation of process ink, not a mistake in the file. Reproduce them in this order of
> preference:
>
> 1. **On screen — use the hex.** `#6A38FF` and `#1E5BFF` are the specification. Everything else on
>    this page is derived from them.
> 2. **In print, when a spot ink is possible — use the Pantone.** Match to the physical chip, not to
>    anything shown here. If the chip and this page disagree, the chip wins.
> 3. **In print, four-color only — use the CMYK build as given.** Expect it to look less intense
>    than the screen color. Do not try to "correct" it by adding ink; a heavier build prints muddy,
>    not brighter. If intensity matters to the piece, buy the spot ink instead.
> 4. **On any other material — match visually to the Pantone chip in daylight**, and send a sample
>    for approval before the full run. This covers apparel, embroidery, vinyl, signage, powder coat
>    and anything else where neither CMYK nor the exact ink applies.
>
> When budget allows one spot ink on a piece, spend it on the purple. It is the color that loses
> most in process.

### 10.3 Two notes on the above

**The teal does not need this rule.** `#02CDC7` is only ΔE 4.27 out of gamut and matches
PANTONE 3252 C at ΔE 0.74 — the best match in the whole palette. It reproduces well by every route,
and the book should not imply otherwise.

**Consider publishing Lab as a fifth value for the two problem colors.** ASU's approach solves
exactly Audentra's problem: a device-independent value a printer can target on any press, no
profile assumed. The values are already computed in §12 — Audentra Purple is
**L\*42.93 a\*68.06 b\*-90.03** (D65) and Royal Blue **L\*45.60 a\*42.96 b\*-85.77**. This is
optional and unconventional, but it is the only number on the page that stays true regardless of
press.

---

## 11. Appendix — reproducible code

Python 3.14, Pillow 12.2.0 (littleCMS 2.18). Profile paths are as installed on the authoring
machine; substitute your own.

### 11.1 The ICC conversion (this produced every CMYK number in §3.2)

```python
from PIL import Image, ImageCms

SWOP = r"...\Adobe\Color\Profiles\Recommended\USWebCoatedSWOP.icc"
SRGB = r"C:\Windows\System32\spool\drivers\color\sRGB Color Space Profile.icm"

src = ImageCms.getOpenProfile(SRGB)
dst = ImageCms.getOpenProfile(SWOP)

transform = ImageCms.buildTransform(
    src, dst, "RGB", "CMYK",
    renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC,
    flags=ImageCms.Flags.BLACKPOINTCOMPENSATION,
)

def hex_to_cmyk(hx):
    hx = hx.lstrip("#")
    rgb = tuple(int(hx[i:i+2], 16) for i in (0, 2, 4))
    out = ImageCms.applyTransform(Image.new("RGB", (1, 1), rgb), transform)
    return tuple(round(v / 255 * 100) for v in out.getpixel((0, 0)))

# sanity checks that must pass before trusting any output:
#   hex_to_cmyk("#FFFFFF") == (0, 0, 0, 0)
#   hex_to_cmyk("#FF0000") == (0, 100, 100, 0)
print(hex_to_cmyk("#6A38FF"))   # -> (72, 75, 0, 0)
```

### 11.2 The naive formula (shown so it can be recognized and rejected)

```python
def naive(rgb):
    r, g, b = [v / 255 for v in rgb]
    k = 1 - max(r, g, b)
    if k >= 1:
        return (0, 0, 0, 100)
    c = (1 - r - k) / (1 - k)
    m = (1 - g - k) / (1 - k)
    y = (1 - b - k) / (1 - k)
    return tuple(round(v * 100) for v in (c, m, y, k))
```

### 11.3 WCAG 2.1 contrast (produced every number in §7)

```python
def relative_luminance(rgb):
    def ch(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = [ch(v) for v in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(hex1, hex2):
    def px(h):
        h = h.lstrip("#")
        return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
    l1, l2 = relative_luminance(px(hex1)), relative_luminance(px(hex2))
    if l2 > l1:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)

# validated against: black/white 21.00, #767676/white 4.54,
#                    #777777/white 4.48, #949494/white 3.03
```

### 11.4 Pantone: parsing the Adobe color book and matching

```python
import struct, re

def parse_acb(path):
    """Adobe Color Book:
       '8BCB' | version u16 | id u16 | title,prefix,suffix,desc (u32 len + UTF-16BE)
       | count u16 | pageSize u16 | pageSelector u16 | colorSpace u16
       | per color: name str | code 6 bytes | components
       colorSpace 7 = Lab, 3 bytes: L = v*100/255, a = v-128, b = v-128"""
    d = open(path, "rb").read()
    assert d[:4] == b"8BCB"
    o = 8
    def rstr(o):
        (n,) = struct.unpack_from(">I", d, o)
        return d[o+4:o+4+n*2].decode("utf-16-be"), o + 4 + n*2
    title, o = rstr(o); prefix, o = rstr(o); suffix, o = rstr(o); desc, o = rstr(o)
    count, _, _, cspace = struct.unpack_from(">HHHH", d, o); o += 8
    clean = lambda s: re.sub(r"\s+", " ", "".join(re.split(r"\$\$\$/[^=]*=", s))).strip()
    out = []
    for _ in range(count):
        name, o = rstr(o)
        o += 6                                  # 6-byte code
        c = d[o:o+3]; o += 3                    # Lab
        out.append((clean(prefix + name + suffix),
                    (c[0] * 100 / 255, c[1] - 128.0, c[2] - 128.0)))
    return out
```

Brand hex → Lab(D50), which is what makes the comparison valid — Pantone's Lab is D50, sRGB is
D65, so the Bradford adaptation is mandatory, not optional:

```python
M_SRGB  = ((0.4124564, 0.3575761, 0.1804375),
           (0.2126729, 0.7151522, 0.0721750),
           (0.0193339, 0.1191920, 0.9503041))
M_ADAPT = (( 1.0478112,  0.0228866, -0.0501270),   # Bradford D65 -> D50
           ( 0.0295424,  0.9904844, -0.0170491),
           (-0.0092345,  0.0150436,  0.7521316))
WP_D50  = (0.96422, 1.00000, 0.82521)

def hex_to_lab_d50(hx):
    hx = hx.lstrip("#")
    lin = lambda v: (v/255)/12.92 if v/255 <= 0.04045 else (((v/255)+0.055)/1.055)**2.4
    rgb = [lin(int(hx[i:i+2], 16)) for i in (0, 2, 4)]
    mv  = lambda M, v: [sum(M[i][j]*v[j] for j in range(3)) for i in range(3)]
    xyz = mv(M_ADAPT, mv(M_SRGB, rgb))
    f = lambda t: t**(1/3) if t > (6/29)**3 else t/(3*(6/29)**2) + 4/29
    fx, fy, fz = [f(xyz[i]/WP_D50[i]) for i in range(3)]
    return (116*fy - 16, 500*(fx - fy), 200*(fy - fz))
```

ΔE2000 (CIE 2000 color difference, kL = kC = kH = 1):

```python
import math

def de2000(lab1, lab2):
    L1, a1, b1 = lab1; L2, a2, b2 = lab2
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2)
    Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb**7 / (Cb**7 + 25**7))) if Cb > 0 else 0.0
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    hp = lambda a, b: 0.0 if (a == 0 and b == 0) else math.degrees(math.atan2(b, a)) % 360
    h1p, h2p = hp(a1p, b1), hp(a2p, b2)
    dLp, dCp = L2 - L1, C2p - C1p
    if C1p * C2p == 0:
        dhp = 0.0
    else:
        d = h2p - h1p
        dhp = d if abs(d) <= 180 else (d - 360 if d > 180 else d + 360)
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dhp) / 2)
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0:
        hbp = h1p + h2p
    else:
        s = h1p + h2p
        hbp = s/2 if abs(h1p - h2p) <= 180 else ((s + 360)/2 if s < 360 else (s - 360)/2)
    T = (1 - 0.17*math.cos(math.radians(hbp - 30)) + 0.24*math.cos(math.radians(2*hbp))
         + 0.32*math.cos(math.radians(3*hbp + 6)) - 0.20*math.cos(math.radians(4*hbp - 63)))
    Sl = 1 + (0.015 * (Lbp - 50)**2) / math.sqrt(20 + (Lbp - 50)**2)
    Sc = 1 + 0.045 * Cbp
    Sh = 1 + 0.015 * Cbp * T
    Rt = (-math.sin(math.radians(2 * (30 * math.exp(-(((hbp - 275)/25)**2)))))
          * (2 * math.sqrt(Cbp**7 / (Cbp**7 + 25**7)) if Cbp > 0 else 0.0))
    return math.sqrt((dLp/Sl)**2 + (dCp/Sc)**2 + (dHp/Sh)**2 + Rt*(dCp/Sc)*(dHp/Sh))
```

Putting it together:

```python
book = parse_acb(r"...\Presets\Color Books\PANTONE+ Solid Coated.acb")
target = hex_to_lab_d50("#02CDC7")
for d, name in sorted((de2000(target, lab), n) for n, lab in book)[:3]:
    print(f"{name:24} dE00 {d:5.2f}")
# PANTONE 3252 C           dE00  0.74
# PANTONE 3255 C           dE00  2.86
# PANTONE 325 C            dE00  4.73
```

### 11.5 Working files

The scripts as actually run are in the session scratchpad:
`colorcalc.py` (CMYK + contrast), `pantone.py` (ACB parse + match), `crosscheck.py` (dataset
agreement), `finalmatch.py` (dual-reference robustness), `bridge.py` (Color Bridge CMYK),
`tints.py` (tint percentages), `bpc.py` (intent comparison), `naivecost.py` (naive-formula
penalty), `srgbcheck.py` (sRGB profile sensitivity).

---

## 12. Appendix — full computed data

Every color, every variant, so the choices in §3 can be audited or redone against a different
press condition. `Lab` is D65/sRGB. `dE00` is the sRGB -> CMYK -> sRGB round trip under SWOP v2 —
how far print must land from screen even when everything is done right. `TAC` is total area
coverage (the four percentages summed).

| Name | HEX | RGB | Lab (D65) | **CMYK SWOP v2** | CMYK GRACoL 2006 | naive (do not use) | dE00 | TAC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Audentra Purple | `#6A38FF` | 106 56 255 | 42.93 68.06 -90.03 | **72 75 0 0** | 78 75 0 0 | 58 78 0 0 | 13.83 | 147% |
| Royal Blue | `#1E5BFF` | 30 91 255 | 45.6 42.96 -85.77 | **81 66 0 0** | 84 63 0 0 | 88 64 0 0 | 9.77 | 147% |
| Audentra Teal | `#02CDC7` | 2 205 199 | 74.7 -42.51 -9.0 | **67 0 30 0** | 67 0 29 0 | 99 0 3 20 | 4.27 | 97% |
| Deep Navy | `#0A1F44` | 10 31 68 | 12.36 7.43 -25.75 | **99 89 42 48** | 100 96 45 44 | 85 54 0 73 | 1.08 | 278% |
| White | `#FFFFFF` | 255 255 255 | 100.0 -0.0 0.0 | **0 0 0 0** | 0 0 0 0 | 0 0 0 0 | 0.00 | 0% |
| Cloud | `#F2F4F7` | 242 244 247 | 96.12 -0.13 -1.67 | **3 2 1 0** | 5 3 2 0 | 2 1 0 3 | 0.75 | 6% |
| Mist | `#EAECF0` | 234 236 240 | 93.35 0.05 -2.17 | **6 5 3 0** | 8 5 4 0 | 3 2 0 6 | 0.81 | 14% |
| Slate | `#98A2B3` | 152 162 179 | 66.34 0.02 -9.98 | **42 31 21 0** | 44 30 20 2 | 15 9 0 30 | 0.47 | 94% |
| Graphite | `#667085` | 102 112 133 | 47.11 1.17 -12.79 | **64 52 35 9** | 63 49 32 13 | 23 16 0 48 | 0.47 | 160% |
| Ink | `#101828` | 16 24 40 | 8.28 2.04 -12.08 | **86 78 55 71** | 98 89 55 71 | 60 40 0 84 | 1.90 | 290% |
| Purple 700 | `#502ABF` | 80 42 191 | 32.08 53.86 -71.34 | **80 85 0 0** | 83 83 0 0 | 58 78 0 25 | 8.93 | 165% |
| Purple 300 | `#9E7EFF` | 158 126 255 | 61.14 40.95 -60.22 | **48 53 0 0** | 53 53 0 0 | 38 51 0 0 | 11.60 | 101% |
| Purple 100 | `#D2C3FF` | 210 195 255 | 81.81 16.96 -27.55 | **16 23 0 0** | 19 24 0 0 | 18 24 0 0 | 8.43 | 39% |
| Blue 700 | `#1744BF` | 23 68 191 | 34.14 33.45 -68.07 | **90 79 0 0** | 90 74 0 0 | 88 64 0 25 | 5.56 | 169% |
| Blue 300 | `#6D94FF` | 109 148 255 | 63.05 17.44 -57.37 | **56 40 0 0** | 60 40 0 0 | 57 42 0 0 | 7.25 | 96% |
| Blue 100 | `#BCCEFF` | 188 206 255 | 82.94 4.48 -25.97 | **22 15 0 0** | 26 15 0 0 | 26 19 0 0 | 5.55 | 37% |
| Teal 700 | `#04B2A9` | 4 178 169 | 65.54 -39.29 -6.17 | **75 4 41 0** | 74 2 39 0 | 98 0 5 30 | 0.42 | 120% |
| Teal 300 | `#67E1DD` | 103 225 221 | 82.89 -34.92 -8.42 | **49 0 20 0** | 52 0 20 0 | 54 0 2 12 | 6.22 | 69% |
| Teal 100 | `#B3F0EE` | 179 240 238 | 90.81 -19.49 -5.26 | **26 0 10 0** | 29 0 11 0 | 25 0 1 6 | 5.14 | 36% |
| Success | `#12B76A` | 18 183 106 | 65.77 -56.16 28.54 | **76 0 81 0** | 74 0 75 0 | 90 0 42 28 | 0.97 | 157% |
| Warning | `#F79009` | 247 144 9 | 69.29 31.61 73.65 | **0 52 100 0** | 0 52 96 0 | 0 42 96 3 | 1.29 | 152% |
| Error | `#D92D20` | 217 45 32 | 47.93 64.19 49.63 | **9 96 100 1** | 7 94 96 1 | 0 79 85 15 | 1.47 | 206% |

Duplicated hexes are listed once: Deep Navy appears on both the Primary and Neutral pages;
Purple 500 / Blue 500 / Teal 500 repeat the three primaries; Information = Royal Blue,
Backlog = Slate, In progress = Audentra Teal.

### 12.1 Intent sensitivity under SWOP v2

Where the four intents disagree, for the colors where the choice actually matters:

| Color | HEX | rel + BPC (published) | rel, no BPC | perceptual |
| --- | --- | --- | --- | --- |
| Deep Navy | `#0A1F44` | **99 89 42 48** | 89 77 50 74 | 100 90 43 47 |
| Ink | `#101828` | **86 78 55 71** | 80 71 60 84 | 86 77 55 71 |
| Graphite | `#667085` | **64 52 35 9** | 67 55 35 11 | 64 52 35 9 |
| Audentra Purple | `#6A38FF` | **72 75 0 0** | 75 77 0 0 | 74 76 0 0 |
| Royal Blue | `#1E5BFF` | **81 66 0 0** | 84 68 0 0 | 83 68 0 0 |
| Audentra Teal | `#02CDC7` | **67 0 30 0** | 69 0 31 0 | 68 0 33 0 |
| Error | `#D92D20` | **9 96 100 1** | 8 100 100 2 | 13 95 100 3 |
| Success | `#12B76A` | **76 0 81 0** | 80 0 85 0 | 77 4 81 0 |

The dark colors are the whole argument for black point compensation: without it Deep Navy
separates to `89/77/50/74` and lands ΔE00 **12.27** away, against **1.08** with it.
