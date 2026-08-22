# Brand guideline references — what the strong systems contain that a thin book lacks

Date: 2026-08-22
Author: research agent (primary sources only). Companion file: `audit.md` (same folder, written by
another agent) uses the same section ids 01–17 so the two can be joined.

## Question

What do the strongest public brand guideline systems contain that a thin, 10-section brand book
(Brand, Voice, Logo, Color, Typography, Imagery, Iconography, Applications, Asset Library, Gallery)
typically lacks — and specifically:

(a) how do companies that ship a software product reconcile brand typeface vs product typeface;
(b) how do vendors whose product lives inside a client institution's brand handle co-branding /
    "powered by" lockups; and
(c) how do brand books treat accessibility, motion and governance?

Context: Audentra is a B2B enrollment platform sold to US universities. Its student portal is
skinned with the university's brand (sample client "Aster University") while Audentra signs it.
The product ships Geist; the brand book says Satoshi. The design system has 141 Figma tokens plus
`tokens.css` with motion tokens (`--dur-fast .22s`, `--dur-base .26s`, one ease curve) and vendored
Phosphor icons with a weight policy.

## Method

- Primary sources only: the brand's own brand site, design-system site, trademark/legal page, the
  design-system's source repository, or an official PDF. No blog summaries, no Scribd uploads, no
  "what font does X use" sites. Where a search result was used only to *find* a primary URL, the
  primary URL is what is cited.
- Fetched with WebFetch for static HTML and PDFs (text extracted with `pdftotext`), and with
  headless Chrome (`--dump-dom`) for JS-rendered or bot-blocked sites (IBM, Mastercard, UMich, JHU,
  NYU, UCLA, Material, Uber).
- Quotes are verbatim and kept short; everything else is paraphrase. "(n/a)" means the page exists
  but does not specify the item.
- Coverage: ~60 primary pages/documents read across 22 brands and 11 universities. Breadth for the
  catalogue; depth for the three questions.

## Sources read (primary)

Software / platform brands

| # | Brand | Page | URL |
|---|---|---|---|
| S1 | Atlassian | Design System — Typography | https://atlassian.design/foundations/typography |
| S2 | Atlassian | Design System — Motion | https://atlassian.design/foundations/motion |
| S3 | Atlassian | Design System — Accessibility | https://atlassian.design/foundations/accessibility |
| S4 | Atlassian | Trademark guidelines | https://www.atlassian.com/legal/trademark |
| S5 | Atlassian | Brand guidelines for Marketplace Partners | https://developer.atlassian.com/platform/marketplace/atlassian-brand-guidelines-for-marketplace-partners/ |
| S6 | Atlassian | atlassian.design home (nav; "Brand kit" → gated DAM) | https://atlassian.design/ |
| S7 | IBM | Design Language — home (nav, governance footer) | https://www.ibm.com/design/language/ |
| S8 | IBM | Design Language — Typeface | https://www.ibm.com/design/language/typography/typeface |
| S9 | IBM | Design Language — Type basics | https://www.ibm.com/design/language/typography/type-basics |
| S10 | IBM | Design Language — Animation overview | https://www.ibm.com/design/language/animation/overview/ |
| S11 | IBM | Design Language — Color | https://www.ibm.com/design/language/color |
| S12 | IBM | Design Language — 8-bar logo (legal, third-party usage) | https://www.ibm.com/design/language/ibm-logos/8-bar |
| S13 | IBM | Design Language — Iconography / Photography / Data viz overviews; Resources | https://www.ibm.com/design/language/iconography/overview · …/photography/overview · …/data-visualization/overview · …/resources |
| S14 | IBM | Plex site | https://www.ibm.com/plex/ |
| S15 | IBM Carbon | Motion (site source, rendered at carbondesignsystem.com/elements/motion/overview) | https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/motion/overview.mdx |
| S16 | IBM Carbon | Typography (site source) | https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/typography/overview.mdx |
| S17 | IBM Carbon | Accessibility — Color (site source) | https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/guidelines/accessibility/color.mdx |
| S18 | IBM Carbon | Color overview; Icons usage (site source) | …/elements/color/overview.mdx · …/elements/icons/usage.mdx |
| S19 | Google Material 3 | Typography — Fonts | https://m3.material.io/styles/typography/fonts |
| S20 | Google Material 3 | Typography — Applying type | https://m3.material.io/styles/typography/applying-type |
| S21 | Google Material 3 | Motion + typeface tokens (source) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss · …/_md-ref-typeface.scss |
| S22 | Microsoft Fluent 2 | Motion | https://fluent2.microsoft.design/motion |
| S23 | Microsoft Fluent 2 | Typography | https://fluent2.microsoft.design/typography |
| S24 | Vercel | Geist — Introduction; Brands; Font | https://vercel.com/geist/introduction · https://vercel.com/geist/brands · https://vercel.com/font |
| S25 | GitHub | Brand Toolkit (home, co-branding, typography, accessibility, logo, color, motion, motion principles, iconography, illustration, product UI, diagrams, getting started, voice & tone) | https://brand.github.com/ and sub-pages listed in-line |
| S26 | GitHub Primer | Typography primitives | https://primer.style/product/primitives/typography/ |
| S27 | Dropbox | Brand Guidelines (home, typography, logo, motion, voice & tone, imagery, iconography, color) | https://brand.dropbox.com/ and sub-pages |
| S28 | Dropbox | Branding / trademark page | https://www.dropbox.com/branding |
| S29 | Figma | Using the Figma brand | https://www.figma.com/using-the-figma-brand/ |
| S30 | Linear | Brand | https://linear.app/brand |
| S31 | Stripe | Brand assets; Marks usage agreement | https://stripe.com/newsroom/brand-assets · https://stripe.com/marks/legal |
| S32 | Shopify | Brand assets | https://www.shopify.com/brand-assets |
| S33 | Shopify | Partner Program — Shopify branding; App Store badge; Partner Marketing Toolkit 2024 (PDF) | https://help.shopify.com/en/partners/partner-program/shopify-branding · https://shopify.dev/docs/apps/launch/marketing/shopify-brand-assets · https://help.shopify.com/cdn/shopifycloud/help-center/pdf/partners/Shopify_Partner_Toolkit_Marketing_and_Brand_Guidelines_2024.pdf |
| S34 | Spotify | Design & branding guidelines for developers | https://developer.spotify.com/documentation/design |
| S35 | Slack | Media kit; Brand center (under construction, nav only) | https://slack.com/media-kit · https://brand.slackhq.com/ |
| S36 | Mailchimp | Brand assets; Content style guide (voice & tone, accessibility, web elements) | https://mailchimp.com/about/brand-assets/ · https://styleguide.mailchimp.com/ |
| S37 | Google | Sign in with Google branding | https://developers.google.com/identity/branding-guidelines |
| S38 | Apple | App Store marketing guidelines; Apple Pay marketing | https://developer.apple.com/app-store/marketing/guidelines/ · https://developer.apple.com/apple-pay/marketing/ |
| S39 | Salesforce | Partner Branding Guidelines (PDF) | https://partners.salesforce.com/s/Partner_Branding_Guidelines.pdf |
| S40 | Workday | Trademark usage guidelines | https://www.workday.com/en-us/legal/workday-trademark-usage-guidelines.html |
| S41 | Intercom | Trademark usage; Platform guidelines | https://www.intercom.com/legal/trademark-usage · https://developers.intercom.com/docs/publish-to-the-app-store/intercom-platform-guidelines |
| S42 | Zendesk | Brand guidelines; Trademark guidelines; Help-center branding | https://www.zendesk.com/company/brand-guidelines/ · https://www.zendesk.com/company/trademark-property/trademarks/ · https://support.zendesk.com/hc/en-us/articles/4408824139546 |
| S43 | Instructure | Partner brand kit page; Partner Program Brand Guide PDF ("The Edtech Collective / Visual Brand Guide 2025") | https://www.instructure.com/about/brand-guide/partner-brand-kit · https://drive.google.com/file/d/1Iol2PwFOTxMm5l5fJqt4n7PdUz263NOb/view |
| S44 | Technolutions | Branding in Slate (KB) | https://knowledge.technolutions.net/docs/student-success-branding-in-slate |
| S45 | Mastercard | Branding requirements | https://www.mastercard.com/brandcenter/us/en/brand-requirements/mastercard.html |
| S46 | Visa | Fundamental Brand Standards, Sept 2025 (PDF) | https://corporate.visa.com/content/dam/VCOM/corporate/about-visa/documents/visa-brand-standards-sept2025.pdf |
| S47 | Uber | Brand portal (nav + asset lists only; documents need sign-in) | https://brand.uber.com/ · https://brand.uber.com/document/398 · https://brand.uber.com/document/467 |

US universities

| # | Institution | Page | URL |
|---|---|---|---|
| U1 | Stanford | Identity Guide home; Stanford logos; Combinations; Typography; Color; Photography; Web design | https://identity.stanford.edu/ · …/visual-identity/stanford-logos/ · …/combinations/ · …/design-elements/typography/ · …/design-elements/color/ · …/design-elements/photography/ · https://identity.stanford.edu/digital/web-design/ |
| U2 | Stanford | Decanter (web design system) | https://decanter.stanford.edu/ |
| U3 | MIT | Brand Guide home; Logo lock-ups; Brand architecture; Typography; Color; Do/Don't | https://brand.mit.edu/ · …/logos-marks/logo-lock-ups · …/brand-architecture · …/typography · …/color · …/applying-brand/do-dont |
| U4 | Harvard | Graphic Identity Guidelines (PDF, Nov 2025) | https://www.harvard.edu/guidelines/wp-content/uploads/sites/10/2025/12/2025_11_24_Harvard_Graphic_Identity_Guidelines-1.pdf |
| U5 | Harvard | Trademark Program policy; Clubs & SIGs trademark policy | https://trademark.harvard.edu/policy-on-use-of-harvard-names-and-insignias · https://officerslounge.clubs.harvard.edu/article.html?aid=107 |
| U6 | U. Michigan | Policies & Permissions | https://brand.umich.edu/trademarks-permissions/permissions/ |
| U7 | UC Berkeley | Brand home; Logos; Typography; Colors; Licensing | https://brand.berkeley.edu/ · …/visual-identity/logos/ · …/visual-identity/typography/ · …/visual-identity/colors/ · …/resources/licensing/ |
| U8 | Penn State | Brand Book home; Mark usage examples; Brand architecture; Design essentials; Extension co-branding; Policy AD07 | https://brand.psu.edu/ · …/visual-identity-standards/mark-usage-examples · …/visual-identity-standards/brand-architecture · …/design-toolkit/design-essentials · https://agsci.psu.edu/brand/extension/co-branding · https://policy.psu.edu/policies/ad07 |
| U9 | Ohio State | BUX (Buckeye UX design system) — Fonts | https://bux.osu.edu/typography/fonts/ |
| U10 | NYU | Using logos and lockups | https://www.nyu.edu/employees/resources-and-services/media-and-communications/nyu-brand-guidelines/designing-in-our-style/nyu-logos-and-university-seal/using-logos-and-lockups.html |
| U11 | UCLA | Brand Guidelines home; Accessibility; Brand Protection; Design System; Typography | https://brand.ucla.edu/ · …/fundamentals/accessibility · …/fundamentals/brand-protection · …/application/web/design-system · …/identity/typography |
| U12 | Johns Hopkins | Co-Branding | https://brand.jhu.edu/visual-identity/cobranding |
| U13 | Arizona State | Partners & affiliates | https://brandguide.asu.edu/brand-elements/logos/partners-affiliates |
| U14 | U. Arizona | Partnerships & co-branding | https://marcom.arizona.edu/brand-guidelines/logos/partnerships-co-branding |

## Failed / dropped (with reason)

- Uber brand guide pages (`brand.uber.com/guide/typography/`, `/guide/motion/`, `/guide/`): 404. The
  portal root renders a nav ("Identity system, End Cards, Creative assets, Fonts, Logos,
  Co-marketing → Merchant co-marketing guidelines / Integration partner co-marketing guidelines,
  Uber Brand Desk, Sign-in") and asset listings, but the guideline documents require sign-in. Used
  only as evidence of structure/governance, not of typeface rules.
- Atlassian brand typography (`atlassian.design/brand/typography` 404; `atlassian.design/guidelines/
  brand/typography` SSL failure; `atlassian.com/brand` 404; `atlassian.design/brand` empty). The
  "Brand kit" link goes to a gated DAM (orangedam.atlassian.com). The product/brand split is still
  documented on the design-system typography page (S1), which is what is cited.
- IBM `design/language/typography/overview` and `/motion/overview`: 404 (moved to `/typography/
  typeface` and `/animation/overview`, which were read). `ibm.com/brand` (IBM Brand Center): IBMid
  login. IBM DL pages 403 to WebFetch; read with headless Chrome.
- Airbnb Cereal: `airbnb.design/cereal` → `airbnb.com/cereal` 404; `introducing-airbnb-cereal` 403.
  No reachable primary source; dropped from the typeface comparison.
- Shopify Polaris typography / font tokens: `polaris.shopify.com/design/typography` and
  `/tokens/font` redirect to the shopify.dev API index; the product-typeface page is gone. Dropped.
- Frontify's own brand portal (`brand.frontify.com`): JS shell, no content. Frontify marketing pages
  about "brand guidelines" are product marketing, not a brand book. Dropped.
- Notion: no official brand-guideline page found (search returns templates). Dropped.
- Ellucian media kit: fetch error (header overflow). Dropped.
- Instructure `canvas-customers` 404; `about/brand-guide/instructure` serves the corporate home.
- Slack Brand Center: "under construction" — nav only (still useful: see 05, 13).
- Salesforce PDF on salesforce.com 403 — the partners.salesforce.com copy was used.
- Mastercard `brand.mastercard.com` 403 — `mastercard.com/brandcenter` read via headless Chrome.
- Harvard `identityguide.hms.harvard.edu/affiliates`: index only (manual lives on Issuu). Dropped.
- UCLA Health co-branded logos → intranet (mednet). Dropped. UCLA main brand site was read.
- Ohio State `brand.osu.edu` pages rendered footer only (both WebFetch and headless). Only BUX read.
- Carbon data-viz `color-palettes.mdx`: 404 in repo. Dropped.
- Stanford `design-elements/iconography/`: SUNetID login ("restricted to authorized members") —
  recorded as a governance pattern. `trademarks.stanford.edu` 403.
- Workday Canvas "Logo and the Dub" 404. `brand.umich.edu/logos/` 403 (permissions page read).
- Dropbox `partner-info` 404 (the nav lists "Partner Info" and "Brand Partner Toolkit" but they are
  not public); `dropbox.com/branding` read instead.
- Zendesk Brandland redirected to "help center closed"; zendesk.com brand/trademark pages served
  via .com.br geo-redirect (Portuguese copy; facts used, quotes translated in paraphrase).
- Material 3 token pages are JS-only; the token values were read from the material-web source.

---

## Catalogue by section

Each entry: what the strongest systems actually put on the page (concrete elements), with 1–3
citations in the form *Brand — what the page shows (source id)*.

### 01 Brand: story, positioning, personality, principles, audiences

- **Philosophy + principles as the front door, then elements.** IBM Design Language opens with
  Philosophy (Point of view, Principles), then Gallery, then elements; the home page states the ethos
  ("Think → Guide / Build Bonds") before any asset (S7).
- **Brand values / attributes page separate from voice.** Slack Brand Center nav: Identity → About
  Slack, Brand values, Slack name (S35). GitHub: Brand identity → Brand attributes, then Voice and
  tone as a sibling (S25). Dropbox: "Framework" page precedes Voice & Tone (S27).
- **"Who this is for" + who can download.** GitHub getting-started names the audience (designers,
  copywriters, DevRel, external collaborators) and the request channel (S25). UCLA: "only UCLA
  faculty and staff … may download assets", agencies granted privileges per project (U11).
- **Brand architecture tiers** (parent / sub-brand / endorsed): MIT (U3 brand-architecture), Penn
  State Tier 1–4 (U8), Slack "Brand architecture … Salesforce, partnership, primary/secondary" (S35).
- Universities add a *Brand Protection* fundamentals page (UCLA U11) and *Protecting Brand* under
  Strategy (Berkeley U7) — positioning and legal sit side by side.

### 02 Voice: tone, language, writing rules, product copy

- **Voice vs tone defined, with attributes and anti-attributes.** Mailchimp: "You have the same voice
  all the time, but your tone changes"; voice = plainspoken, genuine, translators, dry humor (S36).
  Dropbox: four pillars Simple / Helpful / Human / Magic with one-line rules each (S27).
- **UI copy rules as a section, not a paragraph.** Mailchimp "Web elements": titles in title case,
  headings sentence case, "Button copy should always include verbs", no "Click here", form titles vs
  field case, checkbox/radio case (S36).
- **Writing for accessibility as its own page.** Mailchimp: alt text on all images, link text names
  destination, headers "nested and consecutive", no directional language, captions/transcripts (S36).
- **Naming and grammar of the brand name.** Linear: "Linear" one word, capital L, not "Linear app"
  (S30). Mailchimp: "one word, spelled with a big M and a little c" (S36). Workday/Zendesk/Atlassian:
  trademark as adjective + generic noun (S40, S42, S4).
- **Product copy vs marketing copy split acknowledged.** GitHub's voice page points to a separate
  guide covering "web, ads, product" (S25); Slack nav lists Writing → voice and tone, copy
  principles, language, stylization (S35).

### 03 Logo: construction, clear space, min size, lockups, versions × backgrounds, misuse, placement, partner lockups

- **Clear space defined by a unit of the mark itself.** Shopify: X = x-height of wordmark; bag alone
  ½ S (S32). Stanford: x-height of "Stanford" on all sides (U1). NYU: "x" = half the torch box (U10).
  Vercel: safety area = height of the symbol (S24). Mastercard: ¼ the width of one circle (S45).
  Visa: recommended full width of the V, minimum half the V (S46). Spotify: half the icon height (S34).
  Berkeley: the letter "e" as the measuring tool (U7). Apple badges: ¼ badge height; 1/10 in very
  tight mobile layouts (S38).
- **Minimum size stated in both print and digital units.** Shopify 80 px / 28 mm (S32). Spotify logo
  70 px / 20 mm, icon 21 px / 6 mm (S34). MIT lock-ups 50 px / .4375 in, micro 20–50 px (U3). Stanford
  combination wordmark 85 px / .85 in (U1). Berkeley 200 px / 1.75 in; expanded 250 px / 2.5 in (U7).
  NYU torch box 30 px / .25 in (U10). Apple App Store badge 40 px / 10 mm (S38). Mastercard digital
  card images 54 px / 15 mm exact, 36 px / 10 mm generic; icons 20 px, 12 px extreme (S45). (The
  Salesforce partner PDF read here, S39, carries naming/legal-line rules but no px minimum; a 40 px
  figure seen in search snippets was not verified in a primary source and is not used.)
- **Versions × background matrix, with "approved pairings only".** Berkeley lists six approved
  colour pairings (gold on blue, blue on gold, white on blue, blue on white, black on white, white on
  black) (U7). MIT: on a background colour the lock-up "must appear in either black or white" (U3).
  Visa: dark → white, light → Visa Blue (S46). Stripe: three colours, "do not use any other colour"
  (S31). NYU: Violet / white / black only, black "only for black-and-white and grayscale" (U10). IBM
  8-bar: core blues/grays only, and "a minimum of five 'steps' away" between foreground and background
  colours in the palette (S12).
- **Placement rules.** MIT endorsed branding: MIT logo "at the top of all web pages and in the header
  area", never hidden at the bottom (U3 do-dont). NYU: digital "at the top of the screen … Avoid
  placing logos at the bottom" (U10). Penn State: mark "at the top of every webpage (top left in the
  brand bar component)" and app icon + home screen mandatory (U8). Apple: one badge per layout, in a
  subordinate position, "first in the lineup of badges" (S38).
- **Misuse list with illustrated don'ts**: Shopify nine violations (S32); MIT full Do/Don't page
  across logo, lock-ups, sub-brand, endorsed, social, seal, merch (U3); Apple Pay: no recolour, no
  radius change, no translation of "Pay", no animation (S38); GitHub: no shadows/gradients, no busy
  backgrounds (S25).
- **Partner / co-branding lockups as a named sub-section** (detailed in 13): GitHub "Co-branding"
  (S25), Slack "Cobranding" (S35), JHU "Co-Branding" (U12), Instructure "Partnership Lockup" (S43),
  Shopify "Co-branded Logo Template" (S33), Mastercard "Use in co-branding" (S45).

### 04 Color: palette, roles, proportions, combinations/contrast, specs table, gradients, dark surfaces, data viz

- **Specs table in four spaces.** MIT: RGB/HEX + CMYK + PMS coated/uncoated per colour, with "two MIT
  reds for printing spot color" (U3). IBM: 10 families × 10 steps with HEX/RGB/PMS/CMYK (S11).
  Berkeley, Penn State, Stanford: HEX/RGB/CMYK/PMS and ASE swatch files (U7, U8, U1).
- **Roles and proportions stated as numbers.** GitHub: "80% Black or White, 10% Neutral, 5% Green,
  5% Purple" per theme; accents "should primarily show up in illustrations" (S25). IBM: "Each
  experience should be dominated by the grays and the core colors" (S11). Carbon: role tokens
  (background, layer, field, border, text, link, icon, support, focus, skeleton) and four themes named
  after their background (S18).
- **Contrast tables as a section, not a sentence.** Berkeley publishes a 100+ pairings pass table for
  small and large text, defining large as "18px bold or 24px regular" (U7). Carbon: 4.5:1 text,
  3:1 large (≥24 px regular / 19 px semibold), 3:1 UI components (S17). MIT: WCAG 2.1 4.5:1 / 3:1 and
  AAA 7:1 / 4.5:1 (U3). Stanford: "a good rule of thumb is 50% contrast" (weak) plus a link to the
  accessibility policy (U1). Penn State: "web text color combinations and link color guidance" in
  downloadable guidelines (U8).
- **Web-interactive / accessible variants split from print palette.** Stanford "Web interactive
  colors … developed with digital use and accessibility standards in mind" (U1); Berkeley "web color
  palette is accessible online", and a note that print rolled back to legacy PMS 282 / PMS 123 because
  newer Pantone versions were inconsistent (U7); Stanford "The colors on this website are not intended
  to match Pantone color standards" (U1).
- **Gradients and dark surfaces**: IBM Color page has Gradients and Color in UI sections (S11);
  Carbon dark themes Gray 90 / Gray 100 (S18); Penn State Design Toolkit has a Gradients section (U8
  nav). Dropbox lists 20 greys but publishes no values (S27) — a gap, not a pattern.

### 05 Typography: typefaces, rationale, hierarchy scale, pairing, web fallbacks, numerals, product vs marketing, misuse

- **Brand vs product typeface stated in one sentence** (see deep answer a). Atlassian: brand font
  Charlie Sans for marketing, Atlassian Sans/Mono in-app, system fonts for legacy (S1). Microsoft:
  Segoe UI on web/Windows, SF Pro on Apple, Roboto on Android (S23). UCLA: "Karbon for print and
  embedding on images and Helvetica/Arial/Roboto for digital" (U11). Penn State: Proxima Nova/Serifa
  print, Roboto web, Franklin Gothic/Rockwell for PowerPoint (U8).
- **Fallback stacks published as code.** Carbon: `'IBM Plex Sans', 'Helvetica Neue', Arial,
  sans-serif` etc. (S16). Primer: `'Mona Sans VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', …`
  (S26). BUX: `"BuckeyeSans", "HelveticaNeue", "Helvetica", "Arial", sans-serif` (U9). Material:
  Roboto Flex → Roboto → Noto Sans (S19). MIT: Arial for internal docs (U3). Harvard: system fonts
  list (Arial, Georgia, Times) (U4). Berkeley: Arial or Times (U7).
- **Display vs text cut with a size threshold.** MIT: NHG Display above 20 px / 16 pt, NHG Text at or
  below (U3). Carbon: productive (`-01`) vs expressive (`-02`) type sets (S16). Material: five roles ×
  three sizes, expressive faces allowed only for display/headline (S20).
- **Scale as a formula or a token table.** Carbon: `Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2`, base 12 px
  (S16). Atlassian: XXL 32 → XXS 12 headings, body 16/14/12, all in rem (S1). Fluent: 14-style ramp
  (Caption 2 10/14 … Display 68/92) (S23).
- **Leading / tracking rules.** MIT: headlines 85–100%, body 100–125% of size (U3). Stanford: leading
  2–4 pt above size, optical kerning (U1). IBM: flush left is "our standard for all typography" (S9).
- **Licensing and access written down.** MIT: Adobe Fonts tied to the employee's account, risk when
  staff leave (U3). UCLA: no central fund for web licensing; Karbon not the site font "without an
  annual financial impact" (U11). Harvard: desktop vs web licence explained (U4). Atlassian: Charlie
  requires authentication to download (S1).
- **Misuse**: Harvard (no stretch, no outline, no drop shadow, ≤ 2 fonts, "Avoid using Harvard
  crimson for text color") (U4); GitHub (no ligatures in headlines, no manual letterspacing, widths
  reserved for events) (S25).
- Numerals/tabular: only Material mentions monospaced numbers (S19); Atlassian "Metric" sizes exist
  (S1). Mostly absent — a gap even in strong systems.

### 06 Imagery: photography direction, treatment, illustration, texture/pattern, dos/don'ts

- **Photo types named and bounded.** IBM: Reportage "Working world" is "the bulk", editorial,
  cinematic (S13). Dropbox: Photography for "real-world examples", illustration "to soften the impact
  of an error message", product visuals, customer files (S27). Stanford: subjects looking at camera
  in environment, "no need for photo effects or heavy editing" (U1).
- **Illustration styles as a catalogue**: IBM Line / Flat / Isometric / Hybrid UI / People (S7
  nav); GitHub key art, contribution graph, textures, "set in an optimistic daylight" (S25).
- **Rights and releases**: Stanford release form, "When in doubt, use a release", HIPAA note, photo
  DAM behind SUNetID (U1). UCLA Policy 863 on filming (U11).
- **Product UI as imagery**: GitHub product-ui page — stroke matches dither texture, trim sidebars/
  footers, alt text on all images (S25).

### 07 Iconography: set, weights, construction, usage

- **Three tiers by size/purpose.** IBM: UI icons, app icons, pictograms (S13). Dropbox: spot 120 px,
  pictogram 64 px, UI 24 px (S27). GitHub: Octicons (product, default) vs spot icons, "shouldn't be
  used in small sizes" (S25).
- **Sizes, targets, contrast.** Carbon: 16/20/24/32 px artboards, 16/20 paired with 14/16 px Plex,
  44 px touch targets, icons pass 4.5:1, monochrome, match text colour (S18).
- **Construction principles**: IBM "Engineered / Clear / Nimble…" with grid, corner radius (S13).
  Dropbox icons borrow corners from the brand typeface (S27).
- **Source of truth is the product library**: GitHub points to primer.style/octicons; IBM to Figma
  and Carbon libraries plus "Submit a request" (S13 resources). Stanford's iconography page is
  login-only (U1).

### 08 Applications: product UI, email, slides, social, stationery, signage, merch, video

- Strong systems enumerate surfaces as pages: GitHub "Brand in action" → eBooks, Experiential,
  Presentations, Social, Swag, Web (S25); Slack → Events, CMS, Email, Spacesuit (S35); UCLA → Print,
  Web (Design System, CMS, Best practices), Presentations, Email (templates, staff signature), Social,
  Video (U11); Stanford → Digital (web, mobile apps, social, email signatures, templates) and Print
  (U1); Berkeley → email signatures, vehicles, Zoom backgrounds, LinkedIn covers, video assets (U7);
  MIT → templates, branded merchandise with 1-inch rules (U3).
- Each application page carries its own numbers: Zendesk help-center logo 200 × 50 px, max 37 px
  high in Copenhagen theme (S42); Penn State app icon/home screen mandatory marks (U8).

### 09 Asset Library: files, naming, versioning, where to get

- **Download = agreement.** Mastercard: "To complete your download, you must agree" (S45). Apple:
  licence agreement checkbox (S38). Shopify: "Use of our brand assets must be expressly authorized in
  writing" and misuse "results in automatic termination of your license" (S32). Figma: assets at
  static.figma.com "with agreement to follow guidelines" (S29).
- **File naming conventions published.** Visa: `VBM_blu_2025.eps`, `VBM_bluRGB_2025.png`, formats per
  use (EPS print; AI/SVG/PNG digital) (S46).
- **Who gets access**: IBM logo/photography/co-branding assets "(IBM ID required)" (S13); Uber Brand
  Desk + sign-in (S47); UCLA faculty/staff only (U11); Stanford SALLIE DAM (U1); Atlassian DAM (S6).
- **Dated releases / what's new**: IBM "What's new … IBM Plex Sans Chinese SC December 2024", page
  footer "Last updated 13 August 2026" (S7); UCLA design-system changelog 2.1.0 → 2.3.0 with dates
  (U11); Mastercard "Latest updates (Updated December 2023)" (S45); Shopify tier badge must be updated
  "within 48 hours" of a tier change (S33).

### 10 Gallery

- IBM "Gallery" under Philosophy (S7); JHU "Brand Showcase" + "Showcase Submission" (U12 nav);
  Stanford "Showcase"; MIT "Gallery" under Applying the Brand (U3); NYU "Examples in Action" (U10).
  The pattern worth noting: the gallery is *submitted to* (JHU) and is used as evidence in the
  do/don't pages, not as a separate mood board.

### 11 Motion

- **Two registers + a duration table + easing curves.** Carbon: productive vs expressive;
  `duration-fast-01` 70 ms … `duration-slow-02` 700 ms; standard/entrance/exit curves, e.g. productive
  standard `cubic-bezier(0.2, 0, 0.38, 0.9)`, expressive `cubic-bezier(0.4, 0.14, 0.3, 1)` (S15).
  Material: `duration-short1` 50 ms … `duration-extra-long4` 1000 ms; `easing-standard
  cubic-bezier(0.2, 0, 0, 1)`, `easing-emphasized-decelerate cubic-bezier(0.05, 0.7, 0.1, 1)` (S21).
  Atlassian: interactions 50–150 ms, transitions 150–400 ms, named curves "Ease-out bold
  cubic-bezier(0, 0.4, 0, 1)" etc., semantic tokens like `motion.popup.enter` = duration + easing +
  properties (S2). Dropbox: one brand curve `cubic-bezier(0.65, 0, 0.45, 1)`, no durations (S27).
- **Principles pages** (IBM "Effective / Concise / Simple / Engineered" S10; Fluent "Functional /
  Natural / Consistent / Appealing" S22; GitHub "Facilitate / Engage / Impact" + five transition
  patterns S25) and a **logo animation** asset "available upon request" (GitHub S25) / Visa animated
  brand mark with partner co-branding allowed on the confirmation screen (S46).
- **Reduced motion**: Atlassian "when reduced motion is active, motion is off and instant" and
  "Never use motion that flashes, rapidly oscillates, or sweeps large areas" (S2); Fluent "include a
  'no motion' setting" (S22); Carbon "Always provide alternatives for interface state transitions"
  (S15); Atlassian a11y "personal reduced motion settings are respected" (S3).

### 12 Layout and grid

- IBM 2x Grid (own section, video template, mini unit) (S7, S13). GitHub "Layouts" under graphic
  elements (S25). Vercel Geist "Grid" under foundations (S24). IBM type basics: line lengths within
  containers, stacked headlines (S9). Universities: Stanford identity bar + global footer as required
  web elements (U1); Penn State "brand bar component" (U8).

### 13 Co-branding / partner

(Full evidence in deep answer b.) Elements the strong systems include:

- A **named page** ("Co-branding", "Partnership Lockup", "Partners & affiliates", "Use in
  co-branding") with **roles**: lead / equal partner / recognised by a third party (JHU U12),
  contributor vs partner (Penn State Extension U8), standard institutional vs non-institutional (ASU
  U13), merchant vs integration partner (Uber nav S47), strategic partner vs third party (IBM S12).
- **Geometry**: separator line weight, gap unit, size parity, order, alignment (Instructure S43,
  Shopify S33, ASU U13, JHU U12, GitHub S25).
- **Prominence rules**: parity with other marks (Mastercard S45, Visa S46, Apple Pay S38, Google
  sign-in S37); never more prominent than your own brand (Stripe S31, Vercel S24, GitHub S25,
  Salesforce S39).
- **Phrasing**: "for", "works with", "powered by", "compatible with" allowed referentially
  (Atlassian S4/S5, Dropbox S28, Intercom S41, Workday S40); the host brand's name never inside the
  vendor's product name/logo/domain (all of the above).
- **Permission + template**: downloadable .ai/Figma lockup maker (Shopify S33), partner badges on a
  partner portal (Salesforce S39), "Powered by ASU" reserved and approved by the CBO/President (U13),
  Brand Equity Review Board with MOU (Arizona U14).

### 14 Accessibility

- Own top-level page: UCLA Fundamentals → Accessibility ("accessibility isn't optional"; sub-pages
  Color & Type, Images, Audio & Video, Digital Elements; cites Section 504, ADA, UC IT policy) (U11);
  GitHub Foundations → Accessibility (WCAG AA text contrast, no colour-only meaning, tagged PDFs,
  "Do not re-scale text sizes") (S25); Atlassian Foundations → Accessibility (4.5:1 / 3:1, reduced
  motion, colour-alone) (S3); Carbon accessibility guideline with exact ratios and large-text
  definitions (S17); Visa nav has "Visa Accessibility" (S46).
- Embedded in other sections: Berkeley colour pass table (U7); MIT colour WCAG levels (U3); Fluent
  typography contrast rule (S23); Mailchimp writing for accessibility (S36); Stanford web design
  "Accessibility is a requirement … a legal imperative" (U1); Carbon icons 44 px targets (S18).

### 15 Data visualization

- IBM: Data visualization section (Overview, Charts, Design, Infographics, Technical diagrams,
  Infograms), criteria "Understandable, Essential, Impactful, Consistent, Contextual", implementation
  delegated to Carbon (S13). GitHub: Diagrams page — charts "not the place for illustrations,
  gradients or adjacent color", colour only to group data, specs in Figma (S25). Atlassian home shows
  a status chart with semantic colour tokens (`color.text.success` etc.) (S6).

### 16 Governance and legal

- **Trademark line text given verbatim**: Vercel ("…are trademarks or registered trademarks of
  Vercel, Inc.") (S24); Salesforce ("…are trademarks of salesforce.com, inc., and are used here with
  permission.") (S39); Workday ("WORKDAY® and the Workday Logos … are trademarks of Workday, Inc.")
  (S40); Apple ("App Store is a service mark of Apple Inc.") (S38); Zendesk ("____ is a trademark of
  Zendesk, Inc.") (S42); IBM copyright line "© International Business Machines [year]" (S12).
- **Contacts per concern**: Stanford DesignIdentity@ vs trademark_licensing@ (U1); Figma legal@ vs
  press@ (S29); Stripe trademarks@ (S31); MIT mit-brand@ (U3); GitHub #brand-marketing-design /
  Brand Studio (S25); IBM #ibm-brand Slack or inquiry form (S7); UCLA brand@stratcomm + "Report
  improper use of UCLA Marks" link (U11).
- **Approval flows written as steps**: MIT endorsed branding "requires brand review" (U3); Arizona
  Brand Equity Review Board with MOU + use list (U14); Penn State Policy AD07 — VP Strategic
  Communications consults Finance/General Counsel before approving co-branding (U8); Berkeley
  licensee workflow (U7); Shopify tier badge only after official confirmation (S33).
- **Revocation / termination**: Shopify automatic licence termination (S32); Intercom "revoke your
  right … at any time" (S41); Slack "reserves the right to cancel, modify, or change the permission"
  (S35).
- **Versioning and dates**: IBM last-updated footer and What's new (S7); Mastercard dated updates
  (S45); UCLA design-system changelog (U11); Visa "September 2025" edition stamp on every page (S46).
- **Gating**: IBM ID, Uber sign-in, Atlassian DAM, UCLA download rights, Stanford SUNetID —
  guidelines public, assets gated.

### 17 Brand → product bridge

- **Same site, two layers**: IBM "Foundations → IBM Brand Center / IBM Design Language;
  Implementation → Carbon Design System / Carbon for IBM Products / Carbon for IBM.com" in one
  switcher (S7); Carbon states "Carbon's default themes are derived from the IBM Design Language
  color palette" (S18).
- **Brand site links out to the product system**: GitHub brand nav ends with "Primer Marketing UI →
  primer.style/brand" and "Primer Product UI → primer.style" (S25); GitHub typography page links to
  "Typography in Product UI" (S25); Dropbox nav has "Dropbox Design" (S27); UCLA brand site hosts
  "Web → Design System" with link to designsystem.brand.ucla.edu and a roadmap (U11); Stanford
  web-design page points to Decanter, "an open source design system … for use by Stanford University
  teams and vendors" (U1, U2); Ohio State's BUX ships the brand fonts (U9).
- **One token vocabulary surfacing on the brand home**: Atlassian home shows tokens
  (`color.text.accent.red`, `elevation.surface.overlay`) as brand content (S6); Vercel Geist is both
  the brand-assets page and the component docs (S24).
- **Product typography documented on the design-system side, not the brand side**: Atlassian (S1),
  Primer (S26), Carbon (S16), Material (S19, S21).

---

## Deep answer (a): brand typeface vs product typeface

### Who uses one family for both

- **Vercel — Geist.** Geist is "Vercel's design system" providing "the colors, typography,
  materials, layout, and React components behind Vercel's products"; the same site hosts "Logos and
  brand guidelines"; the font page says Geist "truly represents the coding and design spirit within
  Vercel's creative community" and is OFL-licensed (S24). One face, one site, brand assets and product
  tokens together.
- **IBM — Plex.** "IBM Plex® is our corporate typeface … as important as our name or our logo"
  (S8); Carbon's product stack is `'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif` with a
  *productive* (`-01`) and *expressive* (`-02`) type set — the split is in the *scale*, not the
  *face* (S16). The Plex site: "It's global, it's versatile and it's distinctly IBM" (S14).
- **GitHub — Mona Sans.** Brand: "centered on Mona Sans and Mona Sans Mono" (S25). Product: Primer's
  `--fontStack-sansSerif` begins `'Mona Sans VF'` and falls back to `-apple-system, BlinkMacSystemFont,
  'Segoe UI', 'Noto Sans', Helvetica, Arial` (S26). Same family; product admits a system fallback.
- **Microsoft — Segoe** on its own platform, native faces elsewhere: "Segoe is Microsoft's signature
  typeface"; web uses Segoe UI, Windows Segoe UI Variable, macOS/iOS SF Pro, Android Roboto (S23).
- **Google — Material**: the type system has a `brand` and a `plain` typeface token, both defaulting
  to Roboto (S21); "Roboto is the default typeface for Android, and is used in the M3 typescale";
  fallback chain Roboto Flex → Roboto → Noto Sans (S19). The *mechanism* for a split exists even
  where Google itself does not split.
- **Ohio State — Buckeye Sans/Serif** are "available as web fonts and built directly into BUX",
  with a published fallback stack (U9). **Berkeley** chose Inter/Source Serif from Google Fonts "for
  ease of use across our platforms" (U7). **Stanford** Source Sans 3 / Source Serif 4 everywhere (U1).

### Who splits marketing and product, and how the guideline says so

- **Atlassian — Charlie Sans vs Atlassian Sans.** The design-system typography page states it in two
  sentences: brand/marketing uses the custom brand font Charlie Sans (download needs authentication);
  "For all in-app experiences" Atlassian Sans and Atlassian Mono, which "ensures the UI is optimized,
  performs well and is frictionless"; legacy apps use system fonts (S1). The split is documented on
  the *product* side and the brand site is a gated DAM (S6).
- **Dropbox — Sharp Grotesk for brand**: "Our brand's type needs span surfaces, mediums, and
  functions" — a variable headline face with optical weight for light/dark (S27). The product face is
  not on the public brand site (a documented gap; see 05).
- **Slack**: Brand Center typography section lists a "Type stack" and a separate "Product font"
  sub-section, with system fallbacks and localised scripts (S35) — the split is a named sub-heading.
- **UCLA**: "Karbon for print and embedding on images and Helvetica/Arial/Roboto for digital
  applications"; Karbon may not be the primary web font "without an annual financial impact" (U11) —
  licensing is the stated reason for the split.
- **Penn State**: three faces by medium — Proxima Nova/Serifa (print), Roboto family (web), Franklin
  Gothic/Rockwell (PowerPoint) (U8). **MIT**: Neue Haas Grotesk with Arial as the Office alternative,
  and Display vs Text by a 20 px / 16 pt threshold (U3). **Harvard**: Anziano for the signature only,
  Benton Sans for communications, plus a system-font list (U4).
- **Uber**: the portal offers UberMove downloads plus Source Han Sans CJK packs (S47); the rule text
  is behind sign-in, so no primary claim about Move vs product is made here.

### How the good ones document it

1. One sentence that names both faces and the boundary ("brand and marketing" / "in-app"), on the
   page a developer actually opens (Atlassian S1, UCLA U11).
2. The product stack as copy-pasteable CSS with fallbacks (Carbon S16, Primer S26, BUX U9, Material
   S19).
3. A reason: performance/frictionlessness (Atlassian), licensing cost (UCLA, Harvard's licence
   primer, MIT's Adobe-account caveat), platform nativeness (Fluent).
4. A scale that differs by register rather than by face where possible (Carbon productive/
   expressive, Material roles, MIT Display/Text threshold).

**What this implies for Audentra.** The Geist-vs-Satoshi tension is the Atlassian/Dropbox/UCLA
pattern, not a defect — but only if the book says so. Add a "Brand vs product typography" sub-section
that (1) names Satoshi as the brand/marketing face and Geist as the product face, (2) states the
reason (Geist is OFL, ships in the portal, variable, has a mono companion; Satoshi is licensed
display type), (3) publishes the product stack exactly as `tokens.css` has it with fallbacks, (4)
gives one shared scale in rem so a slide and a screen look like the same company, and (5) says where
the boundary falls for emails/PDFs generated by the product (product face). The alternative (Vercel/
IBM single family) would mean dropping Satoshi; either is defensible, silence is not.

---

## Deep answer (b): vendor-inside-institution co-branding

### Lockup geometry the vendors publish

- **Instructure (Canvas) partner lockup** — the closest analogue to Audentra's situation, an ed-tech
  vendor next to institutions and partners: "A 2-point line separates the logos"; Instructure logo "to
  the left or top of the partner's logo"; clear space between logos "equal to the width of the
  Instructure image mark used for both sides of the line"; "Both logos should feel equal in size.
  Partner logos should be aligned to the optical center of the Instructure logotype"; stacked version:
  line length = logo length, gap = image-mark height; "Do not pair the Instructure mark with partner
  logos without the dividing line"; "Always use the full Instructure lockup, never the logo or
  wordmark alone"; no Instructure logos in advertising without explicit approval; contact
  partnerships@instructure.com (S43).
- **Shopify partner lockup**: monochrome Shopify logos only (black or white bag), never the green
  bag or the "Shopify Partners" logo; co-brand only with the "X" unifier; "your partner logo should
  be the same size as the Shopify logo"; vertical and horizontal templates in black and white as .ai
  and Figma files; logo min 80 px / 28 mm; clear space X = x-height (S33, S32).
- **GitHub**: "Each logo should be approximately the same size overall with consideration to both
  width and height while retaining optically centered"; templates are "default", Brand Studio approves
  (S25).
- **Salesforce** (the opposite stance, for platform-on-top vendors): indicate "for Salesforce" "by
  using smaller text in a plain font"; don't use Salesforce logos "alongside, or the same size as,
  your brand"; use partner badges from the Partner Community; legal line verbatim (S39).
- **Mastercard / Visa / Apple Pay / Google** (the parity rulebook): Mastercard branding "at parity
  (in terms of size, frequency, color treatment, and location) with all other acceptance marks",
  "preferably in the first position"; Partner/Mastercard QR composite "at size and color parity"
  (S45). Visa Brand Mark "equal in prominence to other payment network marks"; min clear space half
  the V; partner logo allowed on the animated confirmation screen (S46). Apple Pay: don't "display a
  mark that's smaller than other payment identities" (S38). Google: "displayed at least as prominently
  as other third party sign-in options" and the G must keep its standard colour on white (S37).

### Where the vendor mark may appear inside the client's surface

- **Checkout/footer badge linking home**: Stripe — "Powered by Stripe" badge for checkout pages,
  suggested to link to stripe.com; never more prominent than your own marks; only on "the portion of
  your website or application that directly relates to our services" (S31).
- **Help-center/product chrome**: Zendesk customers change logo (200 × 50 px), five colours and the
  font; the article does not say whether "Powered by Zendesk" is removable (S42 help article); Zendesk
  marks may only be used with a licence and "clear space around our logos" (S42). Intercom: referential
  "powered by" allowed in text; logo never part of your branding (S41).
- **Admissions CRM inside the university's site (Technolutions Slate)**: the branding tool "copies the
  site's images and styles into files that are saved to your Slate instance" so "Slate public pages
  closely resemble" the institution's admissions page; JS menus and search boxes are stripped; the
  branding files are decoupled from the live site (S44). The KB says nothing about a visible Slate
  mark — the vendor disappears behind the institution.
- **Sign-in surfaces**: Google and Apple badges are the precedent for a *vendor-owned control inside
  a host UI*: fixed artwork, fixed padding (12/10/12 px web), one of three approved labels, standard
  colour G on white, never monochrome (S37); App Store badge 40 px min, ¼-height clear space, one per
  layout, subordinate position (S38).
- **Endorsement language**: Atlassian "Acme plugin for Jira" never "Jira plugin for Acme" (S4, S5);
  Workday "for use with Workday® …", non-affiliates must add "[Your Company] is not affiliated with
  Workday, Inc." (S40); Dropbox "works with Dropbox" ok in text, never our logo inside yours (S28);
  Figma "Tom's plugin for Figma design", marks as adjectives (S29).

### What the host (university) brand forbids or requires

- **Stanford**: "Don't place Stanford's logos alongside or as a part of another logo"; clear space
  "particularly important when the Stanford logo is being used alongside other logos"; "Stanford's
  logo and name may not be used to promote third-party organizations"; no permission to vendors,
  donors or sponsors to imply endorsement "without approval" (U1).
- **MIT (endorsed branding)**: align on a horizontal or vertical axis, keep spatial separation, "equal
  prominence to both logos", reduce the MIT logo by half when space is tight, MIT logo at the top of
  web pages and in the header, "Don't hide the MIT logo at the bottom of a website", don't combine
  the MIT logo with a name to make a new identity; brand review required (U3).
- **Johns Hopkins (the most complete)**: three roles — *JHU as lead* (partner logos in black or white
  along the bottom, partner name in text if the logo is blurry); *JHU as equal partner* ("in equal
  proportion to partner logos", full colour allowed, "Do not create a lock-up graphic that combines
  co-branded logos", separate with "a dividing element like a line or X"); *JHU recognized by a third
  party* (written permission; context words "Sponsored by", "Presented by", "Clients include") (U12).
- **ASU**: standard partnership "divided by a simple vertical line", "partner logo is always placed
  to the left, so it is read first"; "Powered by Arizona State University" reserved for enterprise
  partnerships with CBO and President approval; partner use must be in a contract (U13).
- **U. Michigan**: "External companies may identify the university as a client and describe in
  factual terms the product or service provided. But they are not permitted to use the Block M or
  any other university logo without prior permission"; no U-M marks in vendor recruiting; partner
  signage must make clear "U-M is the partnering organization rather than the lead organization",
  e.g. "The official partner of University of Michigan Athletics" set smaller (U6).
- **Harvard**: clubs' authorised marks "may not be used in conjunction with other entities' marks or
  brands, including those of donors or sponsors (no 'co-branding')" (U5); any use implying
  "endorsement, approval or sponsorship" is regulated (U5).
- **Penn State**: AD07 — co-branding approval requires the VP Strategic Communications to consult
  Finance/General Counsel; endorsements of non-University products "generally not permitted";
  Extension: contributors get text credit only, partners' marks "preferably in alphabetical order";
  mark "at the top of every webpage (top left in the brand bar component)" (U8).
- **UCLA**: third-party use (including a research partner's website) "requires permission"; more
  likely granted when the page "clearly states UCLA's role" and shows the logo "appropriately sized
  and with enough clear space to separate it from other logos"; domains with "UCLA" must be
  registered to the Regents (U11).
- **NYU**: one NYU logo per communication; joint initiatives use the all-university logo once plus a
  list of participants; digital logos at the top, never the bottom (U10).
- **Arizona**: logos "do not permit use of University logos to endorse an outside company"; external
  co-branding goes to a Brand Equity Review Board with MOU and a use list (U14).

### Minimums that travel into a lockup

Vendor mark minimums: Shopify 80 px (S32/S33); Spotify icon 21 px (S34); Apple badge 40 px (S38);
Mastercard icon 20 px, 12 px extreme (S45); Zendesk logo variants 90/84/50 px min width (S42).
Host minimums: Stanford 85 px (U1); MIT 50 px, micro 20 px (U3); Berkeley 200 px (U7); NYU torch
30 px (U10). A lockup must satisfy both — in practice the host's (larger) minimum wins.

**What this implies for Audentra.** Audentra is the *vendor* and the university is the *host*, so
the book needs a chapter written in the host's vocabulary (the JHU roles): (1) *University as lead*
(the default skinned portal): Audentra appears only as a small, monochrome "Powered by Audentra" in
the footer and login card, linking home, never competing in the header, never inside the university
logo's clear space, removable per contract (Stripe/Zendesk/Intercom pattern; Slate shows vendors
that disappear entirely). (2) *Equal partner* (joint marketing, conference booths): the Instructure
geometry — 2-pt divider, gap = Audentra symbol width, equal optical size, monochrome allowed, never a
merged mark. Order is whoever writes the rule: Instructure puts itself left/top (S43), ASU puts the
partner left "so it is read first" (U13), JHU does not fix an order (U12) — so state a default
(university first, Audentra second) and say the host's guideline wins when it has one. (3) *Audentra recognised by the
university* (case studies, "Clients include"): text first, logo only with written permission,
"official partner" wording subordinate (UMich). Publish the min sizes (vendor mark ≥ the host's
stated minimum on that surface), the phrasing rules ("Audentra for Aster University", never "Aster
Audentra"), a trademark line, and a contact. And document what the host will do to us: most US
universities forbid their logo next to a vendor's — so the default should assume the portal carries
the university mark alone and Audentra's signature is text-sized.

---

## Deep answer (c): accessibility, motion, governance as sections

### Accessibility, done well

- **A page of its own with a legal frame**: UCLA — "accessibility isn't optional. It's a mandatory
  mindset and practice", cites Section 504, ADA, UC IT Accessibility Policy, then four sub-pages
  (Color & Type, Images, Audio & Video, Digital Elements) (U11). Stanford web design: "Accessibility
  is a requirement. Not only is this a legal imperative…" (U1).
- **Numbers, not adjectives**: Carbon 4.5:1 text, 3:1 large (≥24 px regular / 19 px semibold), 3:1
  UI components, WCAG AA across all themes, colour-blind simulator (S17); Fluent 4.5:1 and 3:1 with
  large text "18.5px bold or 24px regular" (S23); Berkeley's 100-pairing pass table for small/large
  text (U7); MIT AA and AAA ratios (U3); Carbon icons 44 px targets (S18).
- **Rules beyond contrast**: GitHub — no colour-only meaning, "Do not re-scale text sizes", tagged
  PDFs, heading hierarchy, alt text for complex visuals (S25); Mailchimp writing rules (S36);
  Atlassian — one h1, don't skip levels, rem units so type scales with the root (S1, S3); Harvard —
  "Refer to Harvard's Digital Accessibility Services site" in the type rules (U4); Penn State — web
  text colour combinations and link colour guidance (U8).
- **Reduced motion as an accessibility rule** (Atlassian S2/S3, Fluent S22, Carbon S15).

### Motion, done well

- Two registers (productive/expressive — IBM S10, Carbon S15), a **duration token table** (Carbon 6
  steps 70–700 ms; Material 16 steps 50–1000 ms; Atlassian two bands 50–150 / 150–400 ms with examples
  "List item hover: 50ms … Modal entrance: 250ms") and **named easing curves with cubic-bezier**
  (Carbon standard/entrance/exit × productive/expressive; Material standard/emphasized/legacy ×
  accelerate/decelerate; Atlassian four curves; Dropbox one) (S15, S21, S2, S27).
- **Semantic motion tokens** that bundle duration + easing + property (`motion.popup.enter`,
  Atlassian S2) — the bridge between the brand's "feel" and the product's CSS.
- **What not to do**: flashes, oscillation, sweeping large areas (S2); constrain motion "to the
  element in focus" (S22); "Animate only what's vital" (S10).
- **Reduced-motion behaviour stated as the default outcome** ("motion is off and instant", S2).
- Brand-level motion (logo animation, end cards) kept as assets on request (GitHub S25, Uber "End
  Cards" S47, Visa sensory branding S46), separate from UI motion.

### Governance, done well

- **Asset portal with agreement and access tiers** (Mastercard S45, Apple S38, IBM ID S13, Uber S47,
  UCLA U11, Stanford U1, Atlassian DAM S6).
- **Versioning**: dated What's new and last-updated footer (IBM S7), edition stamp on every PDF page
  (Visa S46), changelog per release (UCLA design system U11), "Latest updates" block (Mastercard S45),
  48-hour update obligation for partner badges (Shopify S33).
- **Trademark line verbatim + symbol rules** (Salesforce ® for US-registered, TM otherwise, none
  abroad S39; Apple first-mention symbol S38; Workday S40; Zendesk S42; Vercel S24; IBM copyright S12).
- **Contacts per concern and an approval path** (Stanford two mailboxes U1; Figma legal vs press
  S29; MIT brand review U3; Arizona Review Board + MOU U14; Penn State AD07 chain U8; GitHub Brand
  Studio S25; Berkeley licensee workflow U7).
- **Revocation and termination clauses** (Shopify S32, Intercom S41, Slack S35, Figma S29).
- **Restricted sections inside a public guide** (Stanford iconography login U1; IBM "(IBM ID
  required)" labels S13) — the guide stays one site, access varies per page.

**What this implies for Audentra.** Three new sections, each with numbers: *Accessibility* (AA
ratios with large-text definitions, a pass table for the Audentra palette on light/dark, type minimum
in rem, focus, colour-alone rule, reduced motion; for a product sold to US public universities cite
Section 504/ADA and WCAG 2.1 AA the way UCLA does, and note that the host's accessibility table also
applies to the skinned portal); *Motion* (publish `--dur-fast .22s`/`--dur-base .26s` and the curve
as a table, add a slow/expressive step and an exit curve if the product needs one, name what reduced
motion does — "off and instant" — and list the forbidden patterns); *Governance* (where assets live,
who may download, a dated changelog on the Figma cover and in the repo, the trademark line, the
"Powered by Audentra" licence terms for clients, a contact, and an approval path for any lockup).

---

## Rejected / not applicable

- Uber brand guide content — behind sign-in; only nav and asset lists readable (S47).
- Airbnb Cereal — no primary page reachable (404/403).
- Polaris typography — pages retired; redirects to the API index.
- Frontify's own guidelines — JS shell; their public pages are product marketing.
- Notion — no official brand guideline found.
- Ellucian media kit — fetch error; and by the search snippet only a logo/press kit anyway.
- Slack Brand Center — "under construction"; nav useful, rules not visible.
- Harvard HMS affiliates index — points to an Issuu manual; not read.
- UCLA Health co-branded logos — intranet.
- Ohio State brand.osu.edu — pages did not render in either fetch method; BUX used instead.
- Spotify Design (spotify.design) — editorial, not guidelines; developer design guidelines used.
- Mailchimp "design" — redirects to a brand-assets page; only the content style guide is a guideline.
- Intercom platform guidelines — prohibitions only, no lockup rules.
- Carbon data-viz palette source — 404.
- Workday Canvas — logo page 404; only the legal trademark page is public.
- Stanford trademark licensing site — 403; rules taken from the identity guide pages instead.
- Zendesk Brandland — closed; the zendesk.com brand page and trademark guidelines suffice.

## Patterns worth copying vs avoiding

Copy:

1. **One sentence that names brand face and product face and the boundary**, on the page people
   actually open — Atlassian (S1), UCLA (U11). Audentra's book has Satoshi; the product has Geist;
   say it.
2. **Publish the product font stack and motion values as code**, not as prose — Carbon (S15, S16),
   Primer (S26), Material (S21), BUX (U9).
3. **Co-branding as roles (lead / equal / recognised-by), each with its own geometry** — JHU (U12),
   with Instructure's numbers (2-pt line, gap = symbol width, equal optical size, host first) (S43)
   and Shopify's templates (S33).
4. **Parity rules for marks inside someone else's UI** — Mastercard/Visa/Apple Pay/Google (S45, S46,
   S38, S37): never smaller, never more prominent, fixed artwork, linked home, one per layout.
5. **Referential phrasing table**: allowed ("Audentra for Aster", "powered by", "works with") vs
   forbidden (host name in product name/domain/logo) — Atlassian (S4/S5), Workday (S40), Dropbox
   (S28), Figma (S29).
6. **Contrast pass table for the palette** — Berkeley (U7); and large-text definitions in px — Carbon
   (S17), Fluent (S23).
7. **Reduced motion as a stated outcome** ("off and instant") plus a forbidden-patterns list —
   Atlassian (S2).
8. **Dated changelog + last-updated + trademark line + contacts on the guide itself** — IBM (S7,
   S12), Mastercard (S45), Visa (S46), UCLA (U11).
9. **Min sizes in both px and mm, clear space in a unit of the mark** — Shopify (S32), Spotify (S34),
   MIT (U3), NYU (U10).
10. **Gate assets, not guidance** — IBM "(IBM ID required)" labels (S13), UCLA download rights (U11).

Avoid:

11. **Palette names without values** (Dropbox colour page, S27) and motion principles without a
    single number (Fluent S22, GitHub S25) — the sections exist but cannot be built from.
12. **Merged or "unified" partner marks** — every host and most vendors forbid them (JHU U12, Stanford
    U1, MIT U3, Atlassian S4, Salesforce S39); the divider line is the only sanctioned join.
13. **Assuming the host lets the vendor logo appear at all** — UMich (U6), Harvard (U5), Arizona (U14)
    default to *no*; design the skinned portal so Audentra's signature is text-sized and removable.
14. **Hiding the product font split in the design system only** (Atlassian's brand site is a gated
    DAM, S6) — for a vendor whose clients' web teams will inspect the portal, the brand book itself
    must carry the split.
