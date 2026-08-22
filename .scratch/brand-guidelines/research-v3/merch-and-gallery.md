# Merchandise and gallery references — what Chapter 12 can legitimately put on the page

Date: 2026-08-22
Author: research agent (primary sources only). Companion files: `../references.md` (structure of
strong brand systems, sections 01–17), `../audit.md`, `../build.md` (the Figma build log — page
geometry quoted below comes from it).

## Question

We are adding **Chapter 12 — Gallery**, two content pages:

1. **Merchandise** — apparel (hoodie, half-zip, polo, t-shirt), drinkware (mug, insulated tumbler),
   office (notebook, pen, laptop sticker).
2. **Environmental and events** — retractable banner, lanyard, event badge, table throw, trade-show
   backdrop, plus Zoom and Teams virtual backgrounds.

Decisions already taken, which this research may enrich but not contradict:

- The brand gradient is a **screen surface only**. Nothing the brand commissions in physical form
  carries it. Physical merch uses a flat field (Navy or Purple) or the raw material.
- **Embroidery is not print.** The Symbol has four fills (Purple, Blue, Teal, Teal 700); that does
  not survive in thread. On fabric the mark is **one colour** — the White master or the Navy master.
- We deliberately do **not** publish an embroidery minimum size (out of scope).
- No logo/lockup misuse re-teaching. This chapter **shows** applications.

Research questions: **A** what a merch/gallery chapter contains in strong published systems;
**B** decoration-method rules a brand book legitimately states; **C** apparel placement conventions
with published inch sizes; **D** event and environmental specs with real numbers; **E** Zoom and
Teams virtual-background specs from the owners; **F** how a gallery page is composed.

## Method

- Primary sources only: the brand owner's own book/portal/PDF, the decorator or manufacturer's own
  technical spec page, the platform owner's own support/docs page. Where a search only *found* a
  URL, the owning URL is what is cited. Blog and listicle numbers are marked **unverified** and are
  not used for the "exact numbers" table.
- Vendor sources are tagged by what they actually are — **[supplier]** publishes its own blank or
  product spec, **[decorator]** runs the machine, **[equipment]** makes the machine, **[body]** is
  the trade association. A supplier's spec sheet outranks a decorator's blog, and both outrank a
  retailer's guide. Where a vendor's own page was only reachable through a text-rendering proxy
  because the site 403s automated clients, the content is still the vendor's own and off its own
  canonical URL — every such case is named in *Failed / dropped*.
- Fetched with WebFetch for static HTML; PDFs downloaded with `curl` and extracted with
  `pdftotext` (`-layout`, `-raw` and `-table` where a page fought back); bot-blocked pages retried
  with headless Chrome `--dump-dom` (IBM). Verbatim quotes are short; everything else is paraphrase.
- Page geometry for the recommendations comes from `../build.md`: every book frame is **1920×1080**,
  margins 120 left/right, 96 top, 120 bottom, chapter label at (120, 96), title at y 160, **content
  area y 360→960** — i.e. a usable band of **1680 × 600**. Kit components available: `Kit / Do-Don't`,
  `Kit / Swatch`, `Kit / Callout`.

## Sources read (primary)

### Brand owners — their own books and portals

| # | Owner | Document / page | URL |
|---|---|---|---|
| B1 | Apple | **Branded Merchandise Identity Guidelines, January 2017** (PDF, 11 pp) | https://apple.merchandisecollection.com/support/AppleBrandedMerchIDGuide.pdf |
| B2 | NASA | **Graphics Standards Manual, NHB 1430-2, January 1976** (PDF) — §6 Signage, §7 Vehicles, §9.1 Vinylcals & Decals, §9.2 Uniform Patches | https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf |
| B3 | NASA | Brand Center — Merchandise Approvals | https://www.nasa.gov/nasa-brand-center/merchandise-approvals/ |
| B4 | MIT | Brand Guide — Branded Merchandise | https://brand.mit.edu/applying-brand/branded-merchandise |
| B5 | University at Buffalo | Trademarks & Licensing — **Embroidery Guidelines** | https://www.buffalo.edu/brand/TrademarksLicensing/resources/embroidery-guidelines.html |
| B6 | U. Tennessee | Brand Standards — Designing Promotional Items | https://brand.utk.edu/promos-licensing/designing-merchandise/ |
| B7 | Arizona State | Apparel and merchandise standards and guidelines | https://brandguide.asu.edu/execution-guidelines/apparel-merchandise |
| B8 | Arizona State | Exterior marketing and communication signage | https://brandguide.asu.edu/execution-guidelines/signage/exterior |
| B9 | Cal Poly | Merchandise Guidelines | https://ucm.calpoly.edu/merchandise-and-trademark-licensing/merchandise-guidelines |
| B10 | U. Florida | Brand Center — University Logo (embroidery + one-colour rules) | https://brandcenter.ufl.edu/the-university-logo/ |
| B11 | U. Florida | Brand Center — Light Pole Banners | https://brandcenter.ufl.edu/banners-on-light-poles/ |
| B12 | St. John's University | **Merchandise Brand Guidelines, October 2024** (PDF, 17 pp) | https://www.stjohns.edu/sites/default/files/2024-10/M1-14448%20Merchandise%20Brand%20Guidelines.pdf |
| B13 | Harvard | Graphic Identity Guidelines (PDF, Nov 2025) — *merchandise*, pp. 47–48 of 49 | https://www.harvard.edu/guidelines/wp-content/uploads/sites/10/2025/12/2025_11_24_Harvard_Graphic_Identity_Guidelines-1.pdf |
| B14 | GitHub | Brand Toolkit — Brand in action; Swag; Experiential | https://brand.github.com/brand-in-action · …/swag · …/experiential |
| B15 | IBM | **IBM Event Design** — Overview, Booths (Approach, Models, Finishes, Copy placement), Graphics, Signage & wayfinding, Resources | https://www.ibm.com/design/event/ · …/booths/models/small/ · …/booths/copy-placement/ · …/booths/finishes/ · …/graphics/ · …/architecture/signage-wayfinding/ |
| B16 | Penn State | Visual Identity Standards — Mark Usage Examples | https://brand.psu.edu/visual-identity-standards/mark-usage-examples |
| B17 | Stanford | Identity Guide — Swag; Wordmarks | https://identity.stanford.edu/print/swag/ · https://identity.stanford.edu/visual-identity/stanford-logos/wordmarks/ |
| B18 | UW–Madison | Applying the Brand — Stationery & Promotional Items | https://brand.wisc.edu/applying-the-brand/stationery-promotional-items/ |
| B19 | UC Berkeley | Downloads — Zoom backgrounds | https://brand.berkeley.edu/downloads/zoom-backgrounds/ |

### Manufacturers and decorators — their own technical specs

Tagged by what the source actually is: **[supplier]** publishes its own blank/product spec,
**[decorator]** runs the machine, **[equipment]** makes the machine, **[body]** is the trade body.

| # | Vendor | Page | URL |
|---|---|---|---|
| V1 | Sticker Mule **[decorator]** | Artwork requirements for stickers and labels | https://www.stickermule.com/support/faq/artwork/what-are-your-artwork-requirements-for-stickers-and-labels |
| V2 | MiiR **[supplier]** | B2B FAQs — art files, decoration lead times, MOQ | https://b2b.miir.com/pages/faqs |
| V3 | **SanMar** **[supplier]** | **Per-style Decoration Spec Sheets** — `sanmar.com/p/{id}/decorationSpecSheet`: PC61 tee `/p/1634`, ST658 polo `/p/5000`, STF200 hoodie `/p/22991`, TTCM3914 hoodie `/p/49786`, F247 ¼-zip `/p/4718`, CP80 structured cap `/p/818`, C914 unstructured cap `/p/6608`, C402 trucker `/p/73184` | https://www.sanmar.com/p/1634/decorationSpecSheet (and siblings above) |
| V4 | SanMar **[supplier]** | Decoration placement diagrams (location codes, no inches); Embroidering hats and caps | https://www.education.sanmar.com/decoration-education/decoration-placement/ · https://www.education.sanmar.com/decoration-education/decorator-relations/embroidering-hats-and-caps/ |
| V5 | **Stahls'** **[decorator/materials]** | Design placement tips; How to heat print hoodies; HTV vs DTF; How to layer HTV; DTF artwork tips; Choosing the right transfer; Printable HTV | https://www.stahls.com/design-placement-tips · https://blog.stahls.com/how-to-heat-print-hoodies/ · https://blog.stahls.com/htv-vs-dtf-whats-the-difference/ · https://blog.stahls.com/how-to-layer-htv/ · https://blog.stahls.com/artwork-tips-for-dtf-transfers/ · https://blog.stahls.com/choosing-the-right-transfer/ · https://www.stahls.com/printable-heat-transfer-vinyl |
| V6 | Transfer Express (Stahls'-owned) **[decorator]** | Heat transfer placement and position guide; Screen-print artwork detail guidelines | https://blog.transferexpress.com/heat-transfer-placement-and-position-guide/ · https://blog.transferexpress.com/tips-for-screen-printing-custom-artwork-tip-4-detail-guidelines/ |
| V7 | **Printful** **[decorator]** | Preparing a design for embroidery; unlimited-colour (Coloreel) embroidery; inside labels; enlarged hat-front area; transparency in DTG; white underbase; t-shirt design placement guide | https://help.printful.com/hc/en-us/articles/28727397325340 · …/5254851511324 · …/5582030932764 · …/10345468617756 · https://www.printful.com/transparency-in-dtg-files · https://help.printful.com/hc/en-us/articles/360014007360 · https://www.printful.com/blog/t-shirt-design-placement-guide |
| V8 | **Custom Ink** **[decorator]** | Embroidery design tips; Screen printing; Screen vs digital vs sublimation buyer's guide; How to customize pens | https://www.customink.com/help_center/embroidery-design-tips · https://www.customink.com/ink/decoration/screen-printing · https://www.customink.com/blog/screen-printing-vs-digital-printing-vs-sublimation-a-buyers-guide/ · https://www.customink.com/blog/how-to-customize-pens-for-business/ |
| V9 | Melco **[equipment]** | Embroidery design guidelines | https://melco.zendesk.com/hc/en-us/articles/10706046938381-Embroidery-Design-Guidelines |
| V10 | Vistaprint **[decorator]** | Printing technologies (method matrix); T-shirt design placement guide; Retractable banners | https://www.vistaprint.com/promotional-products/printing-technologies · https://www.vistaprint.com/hub/t-shirt-design-placement-guide · https://www.vistaprint.com/signs-posters/retractable-banners |
| V11 | RushOrderTees **[decorator]** | Logo placement guide | https://www.rushordertees.com/blog/logo-placement-guide/ |
| V12 | Corporate Casuals **[decorator]** | Ultimate guide to embroidery | https://blog.corporatecasuals.com/embroidery/corporate-casuals-ultimate-guide-to-embroidery/ |
| V13 | **JournalBooks** **[supplier]** | Imprinting — foil stamping & more (deboss spec) | https://www.journalbooks.com/products/boost-a-book/imprinting/foil-stamping-more/product/693 |
| V14 | 4imprint **[supplier]** | Product pages publishing per-item imprint areas (Executive Metal Pen `/8804-L/`, Parker IM `/146783-L/`, Charger Vacuum Tumbler 40 oz `/166752-L/`, Moleskine Pro Planner `/157846-107-D/`) | https://www.4imprint.com/product/8804-L/Executive-Metal-Pen-Laser-Engraved (and siblings) |
| V15 | ASI **[body]** | Glossary — pad printing; decoration-method knowledgebase | https://asicentral.com/glossary/what-is-pad-printing/ · https://kb.asicentral.com/en-us/knowledgebase/article/KA-02350 |
| V16 | Pens.com **[decorator]** | Emboss vs deboss | https://www.pens.com/blog/emboss-vs-deboss-what-is-the-difference/ |
| V17 | Queensboro **[decorator]** ⚠️ | About embroidery — stitch ceiling, minimum lettering. **403 to every client tried**; text recovered only via search-engine extraction of the URL. Treat as second-hand. | https://www.queensboro.com/about-embroidery-apparel |
| V18 | ScreenPrinting.com (Ryonet) **[secondary]** | Placement layouts; CMYK vs spot vs simulated process. A retailer's blog, not a spec page — used for definitions, never for a number we publish. | https://www.screenprinting.com/blogs/news/t-shirt-design-placement-guide-your-easy-reference-for-industry-standard-layouts · https://www.screenprinting.com/blogs/news/cmyk-vs-spot-vs-simulated-process-whats |

### Event and environmental vendors — their own artwork specs and templates

| # | Vendor | Page / document | URL |
|---|---|---|---|
| E1 | **Orbus** (US display manufacturer) | **Graphics guidelines PDF** — the bleed rule for fabric / rigid / banner stands, Pantone caveat, rich black | https://s3cdn.orbus.com/media/forms/graphics-guidelines-orbus-canada.pdf |
| E2 | Orbus | Graphic art guidelines (retail); Formulate S1 10ft and 20ft backwalls; Essential 800 banner; Thunder outdoor; Breeze 2 tabletop; print capabilities (G7) | https://www.orbusdisplays.com/products/graphic-art-guidelines · …/formulate-s1-10-straight-fabric-backwall · …/formulate-20-straight-fabric-backwall · …/formulate-essential-800-fabric-banner-display · …/thunder-outdoor-retractable-banner-stand · …/breeze-2-retractable-tabletop-banner-stand · https://s3cdn.orbus.com/media/display-graphics/print_capabilities.pdf |
| E3 | **Signs.com** | Retractable banners (ordered size vs viewable area); Step-and-repeat design; Ideal logo sizes; Table covers | https://www.signs.com/retractable-banners/ · https://www.signs.com/blog/designing-a-step-and-repeat-banner-signage-101/ · https://www.signs.com/step-and-repeat-design-ideal-logo-sizes-for-maximum-impact/ · https://www.signs.com/table-covers/ |
| E4 | **Testrite Visual** (US stand manufacturer) | Graphic templates index; Mercury 33×84 template PDF (file vs finished size, 100 DPI, 1″ bleed) | https://www.testrite.com/customers/graphic-templates/ · https://www.testrite.com/pdf/graphic-templates/Mercury%20Banner%20Stand%20-%20RY9,%20RY10%20-%2033x84%20-%20Graphic%20Template.pdf |
| E5 | Smartpress | Retractable banner stand graphics guidelines; Step-and-repeat product page (logo minimum) | https://smartpress.com/support/product-resources/retractable-banner-stand-graphics-guidelines · https://smartpress.com/offering/step-and-repeat-banners |
| E6 | 4over | Standard retractable banner stands | https://4over.com/standard-retractable-banner-stands |
| E7 | Vistaprint | Retractable banner design hub; Table covers | https://www.vistaprint.com/hub/retractable-banner-design · https://www.vistaprint.com/signs-posters/table-covers |
| E8 | Vispronet | Retractable banners (sizes, file specs) | https://www.vispronet.com/retractable-banners |
| E9 | GotPrint | Retractable banner stand templates | https://www.gotprint.com/resources/templates/retractable-banner-stands.html |
| E10 | PrintPlace | Guide to step-and-repeat banner sizes (with subject capacity and floor space) | https://www.printplace.com/blog/guide-to-step-and-repeat-banner-sizes/ |
| E11 | UPrinting | Step-and-repeat banners | https://www.uprinting.com/step-and-repeat-banners.html |
| E12 | Tectonics (large-format printer) | Guide to large-format print files — the 10 % scale rule, 75 dpi banners, 2″ bleed | https://tectonics.com/guide-to-large-format-print-files/ |
| E13 | Crestline | Custom trade-show table covers — table dimensions, imprint band | https://crestline.com/c/custom-trade-show-table-covers-everything-you-need-to-know |
| E14 | Premier Table Linens | Printed table throw — printable area per height | https://premiertablelinens.com/default/print-table-throw.html |
| E15 | Classic Exhibits | Custom tablecloths for trade shows — throw types, logo placement | https://classicexhibits.com/tradeshow-blog/2025/09/11/custom-tablecloths-for-trade-shows/ |
| E16 | **Avon Security Products** | 5/8″ lanyard artwork template PDF (imprint area, crimp dead zone) | https://www.avonsecurityproducts.com/edit/files/custom_lanyards/templates_lanyards.pdf |
| E17 | Stellar Lanyards | 1″ lanyard template PDF (bleed, safe height) | https://www.stellarlanyards.com/files/resources/lanyard-1in.pdf |
| E18 | DEM Printing | Lanyard imprint template PDF ("LANYARDS CANNOT BLEED") | https://www.demprinting.com/files/subscribers/af3e4b82-54bf-4740-a821-83d59b081a8c/WebFiles/TemplatesPDF/Templates_Lanyards.pdf |
| E19 | Lanyard Factory Direct | Screen print vs dye-sublimation vs woven — capability table | https://lanyardfactorydirect.com/printing-techniques-explained-screen-print-vs-dye-sublimation-vs-woven-lanyards/ |
| E20 | 4imprint / Imprint.com / iLanyard | Published lanyard widths and standard length | https://www.4imprint.com/taggroup/93/lanyard-width · https://imprint.com/custom-lanyards · https://www.ilanyardmfg.com/lanyard-style-and-size/ |
| E21 | **ISO/IEC 7810:2019** | *Identification cards — Physical characteristics*: ID-1/ID-2/ID-3/ID-000 nominal sizes and tolerances (public preview PDF; catalogue entry paywalled) | https://cdn.standards.iteh.ai/samples/70483/16f04de1cda3494f9e12567b7d1aa541/ISO-IEC-7810-2019.pdf · https://www.iso.org/standard/31432.html |
| E22 | NIST | FIPS 201-3 — PIV cards comply with ISO/IEC 7810 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.201-3.pdf |
| E23 | **eXpress badging** | ID badge design guidelines — bleed, slot punch, RFID, colour caveat | https://expressbadging.com/id-badge-design-guidelines-2/ |
| E24 | Duracard | CR80 design template PDF — dimensions / live area / bleed area | https://www.duracard.com/wp-content/uploads/sites/2/2023/09/Duracard-Design-Template-CR80-Card-Barcode.pdf |
| E25 | InstantCard | Card layout and artwork — bleed, dpi, slot-punch allowance | https://instantcard.net/card-layout-and-artwork/ |
| E26 | pc/nametag | Free name-tag templates (insert size list); 4¼″ × 6″ standard event badge | https://www.pcnametag.com/free-name-tag-templates/ · https://www.pcnametag.com/4-1-4-x-6-standard-event-badge-yneb20r46.html |
| E27 | Avery | Template 5392 — 3″ × 4″ insert, 6 per sheet | https://www.avery.com/templates/5392 |
| E28 | BannerBuzz | 8×8 step-and-repeat product spec (material, grommets) | https://www.bannerbuzz.com/8x8-step-and-repeat-banners/p |

### Platform owners

| # | Owner | Page | URL |
|---|---|---|---|
| P1 | Zoom | Changing your virtual background image (KB0060387) | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060387 |
| P2 | Zoom | **Image and video specifications for Zoom Events hosts** (KB0068572) | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068572 |
| P3 | Zoom | Virtual background system requirements (KB0060007) | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007 |
| P4 | Zoom | Changing settings in the Zoom Workplace desktop and mobile app (KB0073244) — "Mirror my video" | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0073244 |
| P5 | Microsoft | Learn — **IT Admins: Manage and create custom meeting backgrounds for Teams meetings** (ms.date 2025-04-30) | https://learn.microsoft.com/en-us/microsoftteams/custom-meeting-backgrounds |
| P6 | Microsoft | Support — Change your background in Microsoft Teams meetings (end-user path) | https://support.microsoft.com/en-us/teams/meetings/change-your-background-in-microsoft-teams-meetings |
| P7 | Microsoft | Learn — Teams Rooms on Windows custom backgrounds | https://learn.microsoft.com/en-us/microsoftteams/rooms/custom-backgrounds |
| P8 | Microsoft | Learn — Custom backgrounds on Teams panels | https://learn.microsoft.com/en-us/microsoftteams/devices/custom-background-panels |

## Failed / dropped (with reason)

- **Johns Hopkins — Merchandise Design Guidelines** (`brand.jhu.edu/applying-the-brand/merchandise/
  merchandise-design-guidelines/`): 403 to WebFetch and a Cloudflare "Sorry, you have been blocked"
  interstitial to headless Chrome. Search snippets say it carries an *embroidery style sheet* to
  align vendors and an embroidery minimum size — that is exactly the page we would want, and it
  could not be read. Not cited.
- **GitHub — 2026 Brand Guidelines PDF** (https://brand.github.com/GitHub-BrandGuidelines-2026.pdf):
  downloads fine (37 MB, **89 pages** counted from the page objects), but has **no text layer** —
  every page is outlined or raster, and no PDF rasteriser is installed here (`pdftoppm` absent).
  Page count is usable; content is not. The HTML Brand Toolkit was read instead (B14).
- **Slack — Brand Guidelines September 2020 PDF** (`slack.com/intl/en-ca/marketing/img/media-kit/
  slack_brand_guidelines_september2020.pdf`): the URL returns a 45 KB non-PDF (xref unreadable).
  Slack's own brand centre is still "under construction". Dropped — a pity, because Slack's mark is
  the closest public analogue to a four-fill symbol needing a one-colour reduction.
- **IBM Design Language — Gallery** (`ibm.com/design/language/gallery/`): 403 to WebFetch; headless
  Chrome renders a JS image grid with no extractable captions. Only the nav is usable — and the nav
  is itself a finding (see F). IBM **Event** Design pages did render and are cited (B15).
- **MiiR** product/decoration pages (`b2b.miir.com/`, `miir.com/pages/custom`): the marketing pages
  do not carry the decoration spec; only the FAQ (V2) does. Their per-product imprint areas sit
  behind a B2B account.
- **Visa Fundamental Brand Standards, Sept 2025** (PDF, read in full): grep finds **no**
  merchandise, apparel, embroidery, banner, lanyard, badge or virtual-background section. A
  fundamental-standards document at that level does not go near merch. Recorded as evidence of
  scope, not cited for numbers.
- **Stanford Swag** (B17): the page exists and names nothing — no sizes, no methods, no item list;
  it forwards to Trademark Licensing and a logo art sheet. Cited only as an *avoid* pattern.
- **UW–Madison Stationery & Promotional Items** (B18): enumerates the items (display kits, pull-up
  banners, yard signs, posters, name badges, table tents, note cards, lapel pins, engraved wall
  signs) but publishes exactly one dimension in the whole page (letterhead 8.5″ × 11″). Cited as an
  *avoid* pattern and as an item-enumeration source.
- **Lands' End Business** — `business.landsend.com/lebowebcontent/images/hybris/logo_embroidery_guide.pdf`
  ("LOGO PLACEMENT GUIDE") and `/articles/logo-placement-on-work-uniforms-guide/`: **403** to
  WebFetch *and* to curl with a full browser user-agent; the domain blocks non-browser clients. This
  was the single most promising decorator asset and it is unread.
- **Queensboro** — `queensboro.com/about-embroidery-apparel` and `/LOGO_TYPE_FAQ`: **403** to every
  client tried. Their numbers (11,000-stitch ceiling, "just under 1/4 inch" minimum lettering,
  4″ × 4″ standard box) were recovered only via search-engine extraction of those exact URLs and are
  flagged ⚠️ second-hand everywhere they appear.
- **Stahls' PDF guides** — `assets.stahls.com/.../Heat_Printing_Placement_Tips.pdf` (127 KB) and
  `.../Stahls-HTV-Reference-Guide.pdf` (4.2 MB): both download but are **image-only PDFs** with no
  text layer, and no rasteriser is installed here. Their per-garment tables are presumably richer
  than the HTML page that was used instead.
- **Real Thread** — `realthread.com/blog/what-is-simulated-process`: **429** on three attempts; curl
  returns an empty body (JS-rendered SPA). The best candidate for a first-party *screen printer* on
  simulated process; the definition was taken from a retailer's reference (V18) and is marked
  secondary.
- **Custom Ink maximum print areas** — `customink.com/help_center/maximum-print-area-for-designing`
  loads but publishes **no inches**; the real maxima live inside their Design Lab app.
- **SanMar placement PDFs** (t-shirt, caps, polos, sweatshirts, outerwear): image-only; decoded and
  read visually — they turn out to be **location-code diagrams with no inch numbers at all**.
  Recorded so nobody re-chases them. The numbers are in the per-style spec sheets (V3), not here.
- **alphabroder decoration**: not applicable any more — alphabroder **exited apparel decoration in
  2025** after the S&S Activewear acquisition (last embroidery order 2025-01-15, last screen-print
  order 2025-03-07); S&S is wholesale-only and publishes no decoration specs.
- **Madeira USA, Hirsch, ColDesi, Wilcom**: no reachable first-party page with the requested
  numbers. Wilcom's satin-stitch maximum width (~10–12 mm) and Madeira's badge-digitising densities
  surfaced only in search summaries — unverified, not used. Melco (V9) covers the same ground
  first-party and is cited instead.
- **4imprint Learning Centre** — `info.4imprint.com/4ideas-friday/refreshing-promotional-imprints/`:
  **301 → `4imprint.com/blog`**, article body gone. The "laser removes the top coat and reveals the
  product material underneath" wording survives only in snippets; Vistaprint's live *"Material color
  determines engraving color"* is the citable equivalent.
- **Moleskine for Business / Denik / Field Notes**: no accessible first-party deboss spec sheet.
  Moleskine Large (3.0″ × 6.25″) and X-Large (4″ × 5″) deboss areas appear only on promo resellers —
  unverified. JournalBooks (V13) and 4imprint's Moleskine product page (V14) are used instead.
- **Signs.com, UPrinting, PrintPlace, pc/nametag, InstantCard, eXpress badging**: all **403** to
  direct fetch. Their content was recovered through a text-rendering proxy — the numbers cited are
  the vendors' own, off their own canonical URLs, but they were not read by a direct request.
- **GotPrint**: connection refused from this environment (`ECONNREFUSED`). The template *listing* was
  recovered via proxy; the template ZIPs were not, so GotPrint's per-size bleed and safe-zone numbers
  are missing.
- **Orbus template PDFs** (`GT_FMLT-WS20-30mm.pdf`, `GT_FMLT-ESS_Straight_Banner_800.pdf`): download
  fine but carry **no text layer** (all type outlined). The 2″-per-side figure quoted for the
  Essential 800 was **measured from the template's page box**, not read from vendor text — flagged
  where it appears. `www.orbus.com/media/graphic-templates/GT_*.pdf` returns a 1.7 KB JPEG
  placeholder; the real templates live on `cdn.shopify.com`. `www.orbus.com` HTML is a JS-only shell;
  `orbusdisplays.com` renders server-side and was used instead.
- **pc/nametag insert templates** (`/amfile/file/download/file/400/` and `/404/`): 403 even via
  proxy, so their per-insert bleed and safe-area numbers are missing. Imprint area and slot options
  came from the product page.
- **Stellar Lanyards** templates for 3/8, 1/2, 5/8, 3/4 and 2 in: return HTTP 200 but serve an HTML
  404. Only `lanyard-1in.pdf` is genuinely published at a guessable URL.
- **Smartpress step-and-repeat / table-cover graphics guidelines**: 404 — they publish a guidelines
  page for retractable banner stands only. Their step-and-repeat logo minimum came from the product
  page.
- **iso.org/standard/31432.html**: 403 (and paywalled). The ID-1 dimensions and tolerances were taken
  from the publicly posted iTeh preview PDF of ISO/IEC 7810:2019, which reproduces the standard's own
  terms, definitions and tolerance table.
- **48HourPrint step-and-repeat, Billy's Badges 4×6, IdentiSys slot-punch glossary,
  cardprinting.com event badges**: 403 or 404; not recovered. Slot dimensions came from eXpress
  badging instead.
- **APG Exhibits, Lush Banners, ExpoMarketing graphics guidelines, ConferenceBadge**: fetch 200 but
  contain no technical specification — navigation and marketing only.
- **Not vendor-published at all** (chased and not found, so recorded as folklore rather than filled
  from a blog): a step-and-repeat **bottom-row height** or head-height dead zone; a "the subject must
  be flanked by whole logos" rule; a number for how much of a backwall's centre a table or a crowd
  blocks; a minimum type size per lanyard width; a retractable banner's "lower 20–24 inches are
  blocked by tables and people". Each of these is repeated widely and owned by nobody.
- **Web search budget exhausted** at 200/200 calls for the session. Everything after that point was
  gathered by direct WebFetch/curl against URLs already in hand. Some vendor spec pages that would
  have been reachable by search were not chased; they are named as open work under D.

---

# 1. What the sources say

## A. What a merchandise / "brand in the wild" / gallery chapter actually contains

**The chapter exists, and it is short.** Across everything readable, a merchandise section is
between 1 and 17 pages, and the *good* ones are 2–11.

| Source | Extent | What is on the pages | Does it carry rules? |
|---|---|---|---|
| Apple (B1) | A **separate 11-page document**, not a chapter: Overview 3 · Using the Apple Logo on Merchandise 4 · Do's and Don'ts 5 · Shirts and Jackets: Basics 6 · Using a Product Lockup 7 · **Examples 8** · Events 9 · Ordering 10 · For More Information 11 | one page of colour/method rules, one page of do/don't prose, one page of garment rules, **one page of captioned garment diagrams**, then procurement | Yes — almost entirely rules; a single page of pictures |
| St. John's (B12) | **17 pages, all merchandise** | logos allowed on merch · merchandise colours · **a colour-variation matrix repeated per school: which logo colourway is legal on red / blue-or-black / white / gray merchandise** (pp. 4–13) · typefaces · other permitted graphics in a second imprint area · file types · a 12-item rules list · licensing | Yes — the whole document is a substrate × colourway decision table |
| MIT (B4) | 1 page | logo width caps per garment type, seal caps, clear space, prohibited treatments, approval | Yes — numbers only, no photography |
| Harvard (B13) | **1 page** (pp. 47–48 of a 49-page manual) | contact the Trademark Program before ordering; wordmark may combine with initiatives but not be altered | Procedure only — no design rules at all |
| GitHub (B14) | 1 web page under "Brand in action" | **photographs of real products**; apparel, stickers, collectibles | Barely — one sentence: *"Clothes and materials should feel high quality, not mass manufactured."* |
| Penn State (B16) | 1 page, "Mark Usage Examples" | a photo per application — classroom, campus, websites, social avatars, app icons/splash/home, **merchandise: insulated mug, a merchandise montage, a hooded sweatshirt with the seal** | Yes, one rule per application, e.g. *"Trademark designations are required on all Penn State-owned marks … used on merchandise or promotional product."* |
| NASA 1976 (B2) | §9.1 Vinylcals & Decals, §9.2 Uniform Patches — 2 pages | **captioned figure grid**: b) Shirt/blouse, d) Laboratory coat, e) Blazer/sport jacket, f) Emergency/security shirt (side view), g) Hardhat/helmet — each with a placement dimension | Yes — sizes, placements and a clear-space rule in the caption block |
| Stanford (B17), UW–Madison (B18) | 1 page each | item names, licensing contact | No usable rules |

Recurring structure, in the order it appears:

1. **Which marks may go on a physical thing at all**, and in which colourways — Apple (B1: white,
   black or gray PANTONE 429), St. John's (B12: the four-way substrate matrix), UF (B10: solid
   orange, solid blue, reversed white, solid black).
2. **How the mark is put on** — the method list. Apple (B1) is the cleanest published example:
   *"The Apple logo can be blind debossed or embossed on merchandise items. It can be screen
   printed on items, and it can be embroidered on shirts or bags. The logo can be etched or
   engraved."*
3. **Size and clear space, per garment class** — MIT (B4), ASU (B7), NASA (B2).
4. **A short do/don't list** — Apple (B1), St. John's (B12: a 12-line list ending in content
   prohibitions), ASU (B7).
5. **Examples**, small: one page of diagrams (B1) or a montage (B16).
6. **Ordering / who approves** — every single source.

**Are items captioned with material, placement or decoration method?** Yes in the two best sources,
and it is the caption that does the work: NASA (B2) captions by *garment* and states the placement
in the body ("approximately 1½″ (3.8 cm) directly above the breast pocket"); Apple (B1) captions its
Examples page by *surface and placement* — "Front, T-shirt", "Back, T-shirt", "One sleeve",
"Alternative location for Apple logo or type", "Front, polo shirt", "Back, polo shirt". Nobody
captions with the vendor's SKU, and nobody publishes a price.

**Is a gallery purely visual?** Only at GitHub (B14), whose framing sentence is *"Examples of our
brand elements put to practice in the real world."* Everywhere else the gallery is either evidence
attached to a rule (Penn State B16) or a diagram that *is* the rule (Apple B1, NASA B2). See also
`../references.md` §10, which found the same thing from a different angle: the gallery is submitted
to (JHU) and used as evidence in do/don't pages, not as a mood board.

**One structural finding worth stealing.** At IBM's scale the events material is not a chapter at
all — it is a **sibling design system**. The IBM Design Language nav lists, under Implementation:
Carbon Design System, Carbon for IBM Products, Carbon for IBM.com, **IBM Event Design**, **IBM
Workplace Design** (B15 nav). Event Design then has Booths (Approach, Models, Finishes, Copy
placement), Graphics, Videos, Activations, Resources. A two-page gallery in our book is the right
size for Audentra; the lesson is only that pages 1 and 2 should read as *entry points with rules*,
not as the whole story.

## B. Decoration-method rules a brand book legitimately states

### B.1 The method list itself

Apple (B1) is the only readable brand book that enumerates methods as a sentence and binds each to
a product class: **blind deboss or emboss**, **screen print**, **embroidery** ("on shirts or bags"),
**etch or engrave**, plus *"It can be rendered in metallic silver as an alternative to gray. The
Apple logo cannot be produced in gold."* That last clause is the model for a one-line prohibition
that is about *material*, not about colour theory.

MiiR, a first-party drinkware manufacturer (V2 and its own product copy), states the method →
artwork relationship for hard goods: **laser etch** "uses a laser to carve away a product's powder
coat finish … High-contrast, single-color artwork is ideal for this decoration method"; **screen
print** is Pantone-matched with a **four-colour limit**; **digital CMYK** is the one that takes
"intricate artwork … one color, multicolor, or a full wrap". Their production reality is visible in
the lead times: **12–15 business days for laser etch or single-colour, 16–19 for multi-colour**,
after art approval; minimum **24 pieces (1 case) per design**; vector art only, "All text must be
outlined, and colors should be clearly specified using Pantone (PMS) Coated values when available."
(https://b2b.miir.com/pages/faqs)

Sticker Mule publishes the print-side numbers for a laptop sticker (V1): vector or **≥300 PPI**
raster; bleed **.0625″ (1/16″) surrounding the cutline**; **standard border .1″ (1/10″), minimum
border .0625″**; cut line drawn as a **.05–1 pt magenta stroke**; **minimum font size 6 pt**;
**minimum line thickness 1 pt**; **CMYK recommended**.
(https://www.stickermule.com/support/faq/artwork/what-are-your-artwork-requirements-for-stickers-and-labels)

**Vistaprint publishes the cleanest one-screen method matrix** of any vendor (V10,
https://www.vistaprint.com/promotional-products/printing-technologies) — and three of its rows say
the same thing in the same words:

| Method | Vistaprint's own line |
|---|---|
| Screen printing | *"Design is printed in 1 color"* · *"Not recommended for photos, fine details or multiple-colored logos"* |
| Pad printing | *"Design is printed in 1 color"* · *"Not for photos, fine details or multiple colors"* |
| Laser engraving | ***"Material color determines engraving color"*** · *"Not for photos, small fonts or fine details"* |
| Embroidery | *"Up to 14 colors in single design"* · ***"Not for photos, fine details or gradients"*** |
| Heat transfer | *"Unlimited colors"* · *"Not for large solid designs or small floating details"* · *"Firm, plastic-like feel"* |
| Direct-to-garment | *"Works with any design. Not for uniforms as colors may fade after repeated washes."* |

### B.2 Why a multi-colour or gradient mark does not survive thread — the vendors, verbatim

This is the section the chapter's embroidery rule rests on. Four independent first-party sources say
it, and two of them name gradients explicitly:

- **Custom Ink (V8)**: *"**Neon and metallic colors, gradients, and halftones cannot be accomplished
  via embroidery.**"* Their "won't embroider well" list: distressed or textured graphics,
  photographic images, images with extreme detail.
  (https://www.customink.com/help_center/embroidery-design-tips)
- **Printful (V7)**: *"**Gradients, color blends, and subtle shading cannot be replicated with thread
  in standard embroidery — use solid, flat colors instead.**"* And the mechanism: *"Thin lines can
  disappear or look uneven once stitched, and intricate details tend to merge together during the
  stitching process."* / *"The thread expands slightly when stitched, which is why even gaps that
  look wide enough in your file may close up once embroidered."*
  (https://help.printful.com/hc/en-us/articles/28727397325340)
- **Vistaprint (V10)**: embroidery is *"Not for photos, fine details or gradients"*.
- **Melco**, the machine maker (V9): *"**Too many tiny colors can lead to several thread knots at the
  back, blurred lines, fabric stretching, and even needle breaking.**"* Over-detailed designs *"will
  appear cloudy"*; small areas of negative space *"will be automatically filled in as part of the
  digitization process"*.
  (https://melco.zendesk.com/hc/en-us/articles/10706046938381-Embroidery-Design-Guidelines)
- **Corporate Casuals (V12)**: *"Even the finest embroidery thread can't reproduce the same detail as
  ink print."* / *"**Fine details are the enemy of good embroidery.**"*

**The physical minimums that make it true** — three vendors, one number:

| Limit | Value | Source |
|---|---|---|
| Minimum legible text height in thread | **0.25″** (≈ 36 pt) | Custom Ink (V8) |
| — same, independently | **0.25″ (6.35 mm)**; letters below **0.1″** *"may be removed entirely during digitization"* | Printful (V7) |
| — same, independently | *"a block font that is 1/4 inch tall"* | Corporate Casuals (V12) |
| — same, independently | *"just under 1/4 inch. Letters smaller than that **close up when stitched out**"* | Queensboro (V17 ⚠️ second-hand) |
| Minimum stroke for a satin stitch | **0.05″ (3 pt)**; thinner is *"converted to a single 'run stitch', or removed"* | Custom Ink (V8) |
| — same, independently | **0.05″ (1.27 mm)**; 3-D puff needs 0.2″–0.5″ | Printful (V7) |
| Minimum negative space between elements | **0.25″ (6.35 mm)** flat | Printful (V7) |
| Smallest single stitch = smallest possible detail | **2 mm (≈ 0.07″)** | Melco (V9) |
| Practical thread-colour ceiling | **6** per design, from a 15-colour palette | Printful (V7) |
| — same question, different answer | recommend **≤ 6**, absolute maximum **9** | Corporate Casuals (V12) |
| — same question, different answer | **up to 14** | Vistaprint (V10) |
| Stitch-count ceiling (the real size limit) | **11,000 stitches** max; assume **6,000** for a standard logo | Queensboro (V17 ⚠️), Corporate Casuals (V12) |

**The one exception, so we are not caught out.** Printful's Coloreel "unlimited color" embroidery
*does* produce gradients — thread is dyed CMYK inline. It carries its own published constraints:
elements *"at least 0.79″ (2 cm) wide"*, each colour blend needs *"at least 150–200 full stitches"*,
no neon or metallic, and hidden thread *"up to 11.8″ or 300 mm per section"* *"may cause puckering
on thinner fabrics"* (https://help.printful.com/hc/en-us/articles/5254851511324). It exists at one
vendor, at one price, on one machine. Our rule stands; we should just not write *"embroidery cannot
do gradients"* as a law of physics when it is a law of every practical supplier.

### B.3 What brand books say about a multi-colour mark degrading in thread

No brand book found says "gradients cannot be embroidered" in those words. What the good ones do
instead — and this is the publishable pattern — is state the **failure mode and the escape hatch**:

- **University at Buffalo (B5)** — the most operational embroidery page found. It fixes thread by
  **manufacturer and colour number** (Madeira Blue #1829 / Gray #1741; Isacord Nordic Blue #3600 /
  Cobblestone #0108; Robison-Anton, Coats, Marathon, Alice, Airplane all listed), states one-colour
  vs two-colour policy (*"One-color stitching uses blue thread. Two-color stitching requires blue
  for names and gray for titles. Dark clothing permits white thread."*), and closes with the
  failure clause: *"If embroidery doesn't fit an imprint area or isn't legible, you may have to
  change the logo, choose another product or select a different fabric."*
- **MIT (B4)** — the closest published analogue to our four-fill Symbol. The complex mark (the
  seal) **"must be reproduced in one color only. The available colors are MIT red, black, and
  white,"** and the manufacturing note is stated as physics, not taste: the seal *"does not
  reproduce well when scaled down to less than 2.5″ in diameter."*
- **ASU (B7)** — states the constraint as a machine limit: *"Due to current embroidery technology
  limitations, the current minimum reproduction height requirement is 5 mm (or ~.2 inches)."*
- **UF (B10)** — *"For apparel embroidery, the smallest logo text in the logo should be no smaller
  than 3 points."* This is the one published *type-in-thread* number found anywhere.
- **Cal Poly (B9)** — publishes the escape hatch as a permitted redraw: *"For instances where the
  embroidery area is smaller than the minimum logo size, the shield and wordmark may be split with
  approved layouts."*

### B.4 What each other method can and cannot do, from the vendor that runs it

**Screen print.** Custom Ink (V8, https://www.customink.com/ink/decoration/screen-printing) publishes
the cost mechanism, not just the advice: *"**Keep colors to 1–6 for the best value.** Each ink color
requires its own screen setup."* / *"A design with three colors requires three separate screens"* /
*"Each layer is cured between passes … This prevents colors from bleeding into each other."* Line
weight: *"aim for a **minimum stroke weight of 1 pt at print size and a minimum text size of 6 pt**"*.
On gradients: *"**Skip photographic gradients.** … Screen printing can simulate gradients using
halftone dot patterns, but for photo-realistic or full-color artwork, digital printing is the right
method."*

Transfer Express (V6) publishes the hardest screen numbers found anywhere
(https://blog.transferexpress.com/tips-for-screen-printing-custom-artwork-tip-4-detail-guidelines/):
recommended **line thickness .012″** (Hot Split, Goof Proof, Elasti Prints), **0.25″ for
Reflective**, and — the one nobody thinks about — a **show-thru (gap) thickness of .04″**, .10″ for
puff, with the warning *"Any portion of artwork that is less than the recommended thickness is not
guaranteed to be printed"* and *"This applies to any non-printing area including the open spaces
within text."*

*Spot vs simulated process*, as defined by a printer's own reference (V18, secondary — used for the
definition only): spot colour is solid shapes at 100% tint or halftones at reduced tint, and *"does
not reproduce every kind of print; for example, it doesn't work for photographic designs"*;
simulated process reproduces almost any image *"by overlapping and blending colors … through using
halftones and spot colors"* over a white base, so it prints on any garment colour, but *"is not
ideal for reproducing fine text or sharp, vector-like edges"*; CMYK is limited to white or
light garments.

**Heat transfer vinyl vs DTF.** Stahls' (V5) draws the line exactly where our gradient rule needs it
(https://blog.stahls.com/htv-vs-dtf-whats-the-difference/): HTV is for *"Numbers, names, and simple
designs"* and *"excels in creating simple vector cut designs"*; DTF is for *"Photographic and complex
full-color artwork; **Designs with gradients or color blends**; Highly detailed designs"*. Layering
HTV to fake multi-colour has a published failure mode: *"**Not all heat transfer vinyl can be
layered** … you might experience peeling or cracking after the garment is washed"*, and the
sanctioned workaround is a *"knockout design"* that *"places different colors next to each other
rather than stacking them"* (https://blog.stahls.com/how-to-layer-htv/). DTF has its own two
warnings: a large solid design *"can lead to a heavy, stiff print"*, and *"**Avoid Faded Edges** …
The small size of the ink droplets makes it difficult for the adhesive to fully bond with the
garment"* — i.e. a gradient that fades to nothing at the edge physically will not stick
(https://blog.stahls.com/artwork-tips-for-dtf-transfers/).

**Direct-to-garment.** Printful (V7) states the dark-garment problem twice. On transparency:
*"In DTG printing, all inks are concentrated pigments rather than diluted … all DTG printers will
try to make up for the missing information by spreading the ink. The prints will end up with a lot
of gaps with a visible white base. **This is most evident on dark fabrics.**"*
(https://www.printful.com/transparency-in-dtg-files). On underbase: *"When printing directly onto
dark or colored fabrics, inks are partially transparent. Without a white layer underneath, colors
can appear muted, washed out, or inaccurate"*
(https://help.printful.com/hc/en-us/articles/360014007360). Custom Ink's counterpoint is why a Navy
hoodie should be screen printed rather than DTG'd: plastisol *"is fully opaque, so it reads clearly
on black, navy, or any dark-colored shirt **without the white underbase trade-offs that affect
digital printing**"* (V8 buyer's guide). DTG is also cotton-limited; DTF takes *"nearly any fabric
including poly, nylon, denim, bags, hats"*.

**Laser etch / engraving.** The rule we want is published by two sources: Vistaprint (V10) —
*"**Material color determines engraving color**"* — and Custom Ink on pens (V8), which describes the
result as *"monochrome (exposed material tone)"*, *"Permanent. Won't chip, fade, or peel"*, and
notes that *"solid fills print as textured impressions"*. MiiR (V2) adds the drinkware mechanism:
the laser *"carves away a product's powder coat finish"*, and *"high-contrast, single-color artwork
is ideal"*. Real areas: Charger Vacuum Tumbler 40 oz — imprint **3″ H × 1.5″ W**; Executive Metal
Pen — **0.25″ H × 1.25″ W**, and 4imprint states the outcome flatly: *"Imprint will appear gold on
all colors"* (V14).

**Pad print.** ASI (V15, https://asicentral.com/glossary/what-is-pad-printing/): *"Each ink color in
a design requires a separate pass"*, and *"**Most pad printing is limited to one to four colors** for
efficiency and cost control"*; it exists because *"items like pens and golf balls are difficult to
screen print consistently"*. Real areas on a BIC Clic Stic, from Custom Ink (V8): barrel
**2⅛″ W × ¾″ H**, clip **≈1⅛″ W × 5/32″ H**. Across the 4imprint pen pages the band is roughly
**1.25″–2.1″ wide × 0.185″–0.75″ high**.

**Deboss / emboss on a notebook.** JournalBooks (V13) publishes both the ceiling and the "blind"
definition (https://www.journalbooks.com/products/boost-a-book/imprinting/foil-stamping-more/product/693):
*"**DEBOSS | up to 20 sq″**"*; *"This technique (**often referred to as Blind Deboss**) makes an
impression by pressing your design into the cover material **without applying foil**"*; *"Many of our
cover materials have different hardnesses, thicknesses and finishes, which can respond differently
to Blind Deboss. **Call us before you order.**"*; and the pricing fact that matters to us —
*"**Blind Deboss is the same price as One Color Imprint.**"* Their artwork warning is the deboss
equivalent of the embroidery one: *"Avoid small type, reversed out type, and fine, close lines as
they tend to fill in."* A concrete area: 4imprint's Moleskine Pro Hard Cover Project Planner
(10″ × 7½″) takes a **5″ H × 4″ W** debossed imprint on the front (V14).

Pens.com (V16) explains why a brand almost always ends up with deboss rather than emboss:
*"Blind embossing/debossing refers to embossing/debossing **without using ink or metallic foil**"*;
*"if you're imprinting your logo … most likely it will be debossed (pressed into the product) rather
than embossed. **Embossing requires two 'dies'** … more labor-intensive (and expensive)"*; and the
counter-note, *"Embossing tends to be better than debossing for paper products as it supports finer
design details. **Peaks are easier to see than troughs!**"*

### B.5 One-colour reduction rules brands actually publish

Five real examples, all phrased as *colour × substrate*, never as "use the mono version":

| Brand | Published one-colour rule |
|---|---|
| Apple (B1) | *"On most merchandise items, the Apple logo should be used in white, black, or gray PANTONE 429 (or equivalent gray)."* Metallic silver allowed as an alternative to gray; **gold forbidden**; *"Whenever a color logo is requested, your order must be approved by Apple Marketing Communications."* Also: *"On garments and occasionally on other merchandise, the logo can be shown tone-on-tone or in a color that complements or matches the contrast stitch colors used on the item."* |
| MIT (B4) | Seal: **one colour only** — MIT red, black, or white. |
| U. Tennessee (B6) | *"One-color logos and shortcuts may only be reproduced in Tennessee Orange or white on merchandise as follows:"* — Tennessee Orange imprint on a white, gray, silver or clear background; white imprint on an orange background. And, importantly, a *sourcing* instruction: when limited to one-colour imprinting, **choose the product colour to suit the ink**. |
| UF (B10) | *"Solid orange, solid blue, reversed white, or solid black logos are acceptable one-color process printing options."* |
| U. Buffalo (B5) | One-colour stitching = blue thread; **white thread on dark clothing**; a two-colour exception exists only for clinical apparel. |

### B.6 …and what the decorator does when you do not publish one

No vendor publishes a *procedure* for reducing a multi-colour mark. What several publish is the
**commitment that they will do it, with or without asking** — which is precisely the risk a brand
book exists to remove:

- **Custom Ink (V8)**: *"**Our artists will adjust any text that is too small to properly embroider.
  This may involve simplifying, removing, or sizing up.**"* And on colour: *"for pantone matches we
  will choose the closest stock thread color available."*
- **Printful (V7)**: *"When you upload a design with a color that isn't available, **the Design Maker
  automatically selects the closest match**"* — from a fixed 15-colour palette. Elements that miss
  the minimums *"will be adjusted during digitization — small details may be enlarged, converted to
  run-stitch, or removed"*. And: *"If a gap is too narrow, filling it with a thread color usually
  produces a better result than leaving it empty."*
- **RushOrderTees (V11)**: *"Our Art Department can advise you on this, and **simplify your logo if
  needed. Usually with no additional fee.**"* Their placement corollary is a good sentence for our
  page: *"Save the simplified, single-color prints for the Left Chest and Sleeves"*, while the full
  back *"is the place to put your most colorful and elaborate design."*
- **Queensboro (V17 ⚠️)**: will *"reduce the logo size without losing too much detail"* at no cost.
- **Melco (V9)** frames it as a design method rather than a repair: *"Working in black and white will
  free you from thinking of too many things"*; *"reduce the number of threads and colors to ensure
  the best output."*

The conclusion for Chapter 12, and it is stronger than any minimum-size number we chose not to
publish: **if we do not ship a one-colour master, the decorator will invent one.** Five vendors say
so in their own words.

### B.7 The gradient question, answered as far as the sources go

- Apple (B1), on garments: *"Do not use a shirt with a pattern or **color gradient**."* That is a
  rule about the blank, not the mark, but it is the only explicit anti-gradient clause on physical
  merchandise found in a first-party brand document.
- **Counter-evidence worth knowing before we write ours.** IBM's Event Design "Finishes" page
  (B15, https://www.ibm.com/design/event/booths/finishes/) lists **"layered gradients"** and
  **"Gradients"** among the approved *materials* of a physical booth, alongside light woods,
  translucent mesh fabric and perforated mesh. So a mature system that treats gradient as a brand
  asset does let it exist physically — **as a printed fabric or lighting surface in an environment,
  never as a decoration method on an object.** Our rule survives contact with this, but the wording
  should be about *decoration of an object*, not about "physical" as a blanket category. See open
  question Q1.
- St. John's (B12) never uses the word gradient; it solves the same problem by publishing the
  **legal colourways per merchandise colour**, which is a stronger instrument than a prohibition.

### B.8 Rules about what else may share the garment

- **Apple (B1)**: *"Use only one Apple logo on an item. Avoid cobranding. The Apple logo should be
  the only visible logo on merchandise."* And placement: *"If a line of type with your group or
  event name is included, place the type away from the Apple logo, such as on the opposite side of
  the item."*
- **NASA (B3)**: the manufacturer's own logo *"will not be placed near the NASA Insignia, or in
  such location(s) as detracts from the NASA Insignia decoration on the front of the shirt"* — it
  goes *"on the collar tag, a hem tag, on the sleeve, or other location as typical."* That is a
  published nape/neck-label convention arrived at from the co-branding side.
- **Penn State (B16)**: *"Trademark designations are required on all Penn State-owned marks …
  used on merchandise or promotional product."* (® on merch, not on screen.)
- **ASU (B7)**: merchandise *"may not be created in distressed, camouflage or other nontraditional
  styles"*; colour *"generally restricted to the primary and secondary colors in the ASU color
  palette."*

## C. Placement conventions for apparel decoration

**Read C.4 first if you read nothing else.** The published left-chest numbers split into two
families that look like a contradiction and are not — they are two different datums. Naming the
datum is the single most valuable thing our page can do.

### C.1 What brand owners publish about placement

| Placement | Published rule | Source |
|---|---|---|
| Left chest, collared shirt | *"Logo centered on left chest panel."* | U. Buffalo (B5) |
| Right chest, lab coat | Logo centred on the **right** chest panel; personalisation baseline aligns with the top of the pocket on the left panel | U. Buffalo (B5) |
| Chest, embroidered lockup | Chest placement uses the alternate (stacked) logo with the unit name below; or logo on one side and unit name on the opposite side or the sleeve | Cal Poly (B9) |
| Chest, patch | *"applied on the right front side of the garment approximately 1½″ (3.8 cm) directly above the breast pocket or in a comparable position on garments without pockets"* | NASA 1976 (B2 §9.2) |
| Blazer / sport jacket | *"the top edge of the patch aligns with the left breast pocket"* | NASA 1976 (B2 §9.2) |
| Full back | 7″-wide mark **centred on the back** of a white lab coat | NASA 1976 (B2 §9.2) |
| Both shoulders | Emergency/security configuration is worn on both shoulders, on shirts and outer jackets, with a smaller black patch positioned below the red one | NASA 1976 (B2 §9.2) |
| Headwear | 5″-wide (12.7 cm) decal **centred on the front** of a white hardhat or helmet | NASA 1976 (B2 §9.2) |
| Cap / backpack front | *"Logo centered on front panel."* | U. Buffalo (B5) |
| Opposite-side type | Group or event name goes on the **opposite side** from the logo — logo front, name back | Apple (B1) |
| Nape / neck & hem label | Where a *second* party's mark is allowed to live: collar tag, hem tag, or sleeve | NASA Brand Center (B3) |
| Sleeve | Named as an accepted alternative location for the logo or the type | Apple (B1, Examples p. 8); Cal Poly (B9) |

### C.2 Published width caps for a chest mark on adult apparel

| Rule | Number | Source |
|---|---|---|
| Widest embroidery before it runs onto the side seam | **4.25″** | ASU (B7) |
| Minimum embroidery width for that mark | **3.5″** | ASU (B7) |
| Logo on a **zippered sweatshirt** | no larger than **10″ wide** | MIT (B4) |
| Logo on **all other garments** | no larger than **8″ wide** | MIT (B4) |
| Complex mark (seal) on apparel | no wider than **5.5″**, based on a size medium | MIT (B4) |
| Clear space around the mark on merchandise | **1″ minimum**, more if needed | MIT (B4) |
| Screen-printed mark height when it is the only element on a garment | **33 mm** | Apple (B1, p. 6) — see caveat below |
| Clear space, small items | equal to the height of the body of the logo; *"Small items such as pens or key chains … the clear space guidelines do not apply."* | Apple (B1, p. 4) |

Caveat on the 33 mm: Apple's page-6 size list sits partly under a clear-space diagram in the PDF,
and only two fragments survive text extraction — *"… a garment, screen print the logo at 33 mm."*
and *"… and are accompanied by an embroidered group name, such as 'Security.'"* The 33 mm is real
and is a **height**; the second bullet's number is not recoverable without rasterising the page.

### C.3 The supplier's published maximum area, per garment — SanMar

SanMar is the largest US blank supplier and publishes a **decoration spec sheet per style** at
`sanmar.com/p/{id}/decorationSpecSheet`. This is the only source found that gives an exact maximum
area *per location, per garment*. All numbers **H x W**, in inches:

| Location | Tee (PC61, `/p/1634`) | Polo (ST658, `/p/5000`) | Hoodie (STF200, `/p/22991`) | 1/4-zip (F247, `/p/4718`) |
|---|---|---|---|---|
| Full chest | **18 x 12** | — | **12 x 12** | **none published** |
| Left chest | **4 x 4** | **4 x 4** | **4 x 4** | **4 x 4** |
| Right chest | 4 x 4 | — | — | 4 x 4 |
| Back | **20 x 14** | 20 x 14 | **14 x 14** | 20 x 14 |
| Upper back | 4 x 12 | 4 x 12 | 4 x 14 | 8 x 16 |
| Back bottom | 6 x 14 | — | — | — |
| Shoulder (L/R) | **4 x 4** | **2 x 2** | 4 x 4 | — |
| Full sleeve | — | — | **4 x 12** | **3 x 22** (right) |
| Wrist | — | — | 4 x 4 | **2 x 2** |
| Pouch pocket | — | — | **5 x 8** | — |
| Hood side | — | — | 5 x 5 | — |
| Collar back | — | **1 x 4** | — | **2 x 6** (centre) |

Three facts in that table matter more than the numbers:

1. **A hoodie's back area (14 x 14) is smaller than a tee's (20 x 14)**, and its full chest is
   12 x 12 against the tee's 18 x 12. A single "full back: 12 x 16" rule in a brand book would
   contradict the supplier's own maximum for several garments.
2. **The 1/4-zip publishes no full-chest location at all** — only left and right chest, either side
   of the placket. SanMar's outerwear placement diagram says the same for full-zip jackets: LC and
   RC, no full front
   (http://education.sanmar.com/wp-content/uploads/2017/01/outerwear_decorationplacement.pdf).
3. **The hoodie's kangaroo pouch is a named decoration location (5 x 8)**, not an obstacle. A brand
   can decide to use it or forbid it, but it should not pretend it is not there.

SanMar's own caveat, which we should echo rather than out-claim: *"decoration area is dependent on
garment size, decoration method and the equipment being used"* — consult your decorator.
(https://www.sanmar.com/p/1634/decorationSpecSheet and siblings; location-code diagrams, no inches,
at https://www.education.sanmar.com/decoration-education/decoration-placement/)

### C.4 Left chest — the position numbers, and the datum problem

| Vendor | Down from… | Across from… |
|---|---|---|
| Stahls' — t-shirts & polos (V5) | *"**7.5" to 9" from the shoulder's left seam**"* | *"**4" to 6" from the center**"* |
| Stahls' — **jackets** (V5) | *"**6" to 8" from the seam of the left shoulder**"* | *"**3.5" to 4" from center's edge**"* |
| Stahls' — sweatshirts (V5) | top of design *"**3" to 3.5" from the bottom of neck's edging**"* | — |
| Stahls' UK (V5) | *"14–20 cm down from the shoulders left seam"* (≈5.5–7.9 in) | *"10–15 cm over from the centre"* (≈3.9–5.9 in) |
| Vistaprint (V10) | *"measure from the shoulder/collar point down **about 7 to 9 inches**"* | between the centre and the left side seam |
| Printful (V7) | *"about **3 inches below the neckline**"* | *"**2 inches from the armpit**"* |
| RushOrderTees (V11) | *"around **3" down from the collar**"* | — |
| Stahls' — hoodies (V5) | *"roughly **4-5"**"* down from where the shoulder seam meets the collar | across from where the sleeve seam meets the side seam |

**Why 7.5–9 in and 3 in are not in conflict.** Stahls' and Vistaprint measure **down the shoulder
seam from the shoulder/collar point**; Printful, RushOrderTees and the trade blogs measure
**straight down from the collar edge** to the top or centre of the graphic. Same logo, same place on
the body, two landmarks. Note also that Stahls' US and Stahls' UK disagree with *each other*
(7.5–9 in vs ≈5.5–7.9 in), so even one vendor is not internally consistent across markets.
**A brand guideline that gives a number without naming the landmark will be built two different ways
by two different decorators.**

**Published size for a left-chest mark** — note the ceiling disagreement:

| Source | Number |
|---|---|
| SanMar (V3) — the supplier's maximum | **4 x 4 in** on tee, polo, hoodie and 1/4-zip alike |
| Corporate Casuals (V12) | *"a logo size of **4 inches wide by 3 inches tall**"* is the standard for embroidered jackets and shirts |
| RushOrderTees (V11) | *"typically **3" to 4" wide**"* |
| Vistaprint (V10) | *"should be **3 to 4 inches wide**"* |
| Stahls' UK (V5) | *"the standard size for an adult left chest design is **9 cm x 9 cm**"* (≈3.5 in) |
| Printful (V7) | *"Keep the size **between 2.5" x 2.5" and 5" x 5"**"* — larger than SanMar's published maximum |
| Queensboro (V17 ⚠️) | *"a standard size logo will fit in a **4-inch by 4-inch square box**"* |

**The band everybody agrees on is 3–4 in wide, inside a 4 x 4 in box** — and ASU's brand-book
numbers (B7: 3.5 in minimum, 4.25 in maximum) sit inside it. That agreement between a brand book and
six decorators is worth using.

### C.5 Full back and upper back

- Supplier maxima (V3): tee **20 H x 14 W**; hoodie **14 H x 14 W**; upper back 4 x 12–14.
- RushOrderTees (V11): *"the standard print size of **12" wide by 14" high** is plenty big enough,
  but we can go up to **14.5" wide by 16.5" high**"*.
- Printful (V7): full back *"**10" x 12" to 12" x 16"** (depending on product)"*; full front standard
  **12 x 16**, upgraded **15 x 18**.
- Vistaprint (V10): *"Most adult shirts look balanced with a back print around **10 to 12 inches
  wide**"*.

**Top edge relative to the collar** — with a correction worth carrying:

- Tee, full back: **3–4 in down from the collar line** (Vistaprint V10 for the upper back).
- **Hoodie, full back: 5–6 in below the collar seam**, because the hood covers the top of the back.
  Stahls' (V5): *"For many hoodies, the perfect placement so the transfer will still be visible below
  the hood is about **5" to 6" below the collar seam**"*; Transfer Express (V6) independently:
  *"Instead of 3", start the design at about **5 – 6" down**"*.
- Jackets, back: Stahls' (V5) *"**6" to 9" from the seam of the collar to the design's center**"*.
- ⚠️ The familiar *"2–3 inches below the collar"* figure is a **front** rule, not a back rule —
  Vistaprint (V10): *"place the top of the design **2 to 3 inches below the collar**"*; Transfer
  Express (V6), full front: *"**1.5 – 3 inches down from the collar**, depending on the shirt size"*.
  No first-party source publishes 2–3 in for a full back.

### C.6 Sleeve

- Supplier maxima (V3): tee shoulder **4 x 4**; polo shoulder **2 x 2**; hoodie full sleeve
  **4 H x 12 W**, wrist 4 x 4; 1/4-zip full sleeve **3 H x 22 W**, wrist **2 x 2**.
- Printful (V7): sleeve standard maximum **4" x 3.5"**; wrap-around ≈**20" x 12"**.
- RushOrderTees (V11): standard **3" wide**, up to **4.5"**, down to **1"**.
- Vistaprint (V10): short sleeve **2–3 in wide**; long sleeve *"narrow, usually 2 to 3 inches wide,
  and leave space near the cuff and shoulder seams so the print does not distort"*.
- Position: **≈1 in above the hem/cuff** (RushOrderTees V11); *"1-2 fingers up from the cuff"*
  (Transfer Express V6). "Sleeve" and "shoulder" are two different locations, not two opinions —
  SanMar lists them separately.

### C.7 Nape, neck label and inside collar

Two locations that get confused, with different numbers.

**Inside (tagless) label**, printed on the inside below the collar:
- Printful (V7): *"Inside labels are printed on the inside of the garment, usually just below the
  collar. The **maximum print area is 3" x 3"**"* — with per-product variants of 2 x 2 and
  2.5 x 2.5, and logo space capped at **3" x 1.13"** so it does not collide with the automated care
  instructions. Crucially, inside labels *can only be added to garments that come with a tear-away
  label* (https://help.printful.com/hc/en-us/articles/5582030932764).
- Stahls' (V5) notes it needs special tooling — a *"Tag Along™ Platen, a smaller size platen, or a
  Heat Press Pad"*.

**Outside back-collar / nape:**
- SanMar (V3): polo **collar back 1 H x 4 W**; 1/4-zip **collar back centre 2 H x 6 W**.
- RushOrderTees (V11): *"typically **2" to 3" wide** … Placement is **about 1" from the edge of the
  collar**"*.
- Vistaprint (V10): *"usually placed **about 1 inch below the rear neckline**. Keep it compact,
  around **2 to 3 inches wide**"*.

This is also the location NASA's brand centre reserves for a *second* party's mark — collar tag, hem
tag or sleeve (B3). If Audentra's mark ever appears on a garment it did not commission, that is
where it goes.

### C.8 Cap front — the published areas, and the seam

Brand books say "centered on the front panel" (Buffalo B5) and stop. The supplier publishes the area:

| Cap (SanMar, V3) | Front panel | Back | Side (L/R) |
|---|---|---|---|
| CP80 Port Authority six-panel twill, **structured** (`/p/818`) | **1.75 H x 5 W** | 1 x 3 | 1.75 x 2.75 |
| C914 six-panel twill, **unstructured** (`/p/6608`) | **1.5 H x 5 W** | 1 x 3 | 1.5 x 2.75 |
| C402 snapback trucker (`/p/73184`) | **1.75 H x 5 W** | 1.75 x 2.75 | 1.5 x 2.75 |

That structured/unstructured pair is the cleanest published evidence that **structure buys 0.25 in
of height and nothing in width**. Printful (V7) publishes per-model areas and a recent enlargement:
high-profile caps went *"from 5.5" x 2" (13.97 x 5.08 cm) to **6.3" x 2.56"** (16 x 6.5 cm)"* (Otto
125-978, Yupoong 6007/6006/6089M), low-profile to **5.9" x 2"** (Flexfit 6511, Richardson 112)
(https://help.printful.com/hc/en-us/articles/10345468617756). SanMar puts bucket hats at *"no larger
than 2.5 inches tall by 4 inches wide"* (V4).

**The seam.** Printful (V7) is the only source with a number: *"**Don't place designs over hat
seams: Center seams are typically 0.4"–0.6" (10–15 mm) wide** and may misalign your design"*
(https://help.printful.com/hc/en-us/articles/5254851511324). SanMar (V4) says only that the centre
seam *"can make for a tricky surface to embroider"* and that buckram stiffness varies wildly.
⚠️ **No first-party page publishes a numeric sweatband limit.** The widely repeated "keep the design
under 2.25 in tall" and "half an inch above where the seam meets the bill" appear only in trade
blogs — unverified. What *is* verifiable is that every SanMar structured-cap front area is
**1.5–1.75 in high**, i.e. the suppliers' own maxima already sit below the folklore figure.

### C.9 Polo vs hoodie vs half-zip — yes, a different rule is published

Three vendors publish a garment-specific difference, in three different ways:

1. **Stahls' (V5) publishes a different left-chest measurement per garment class on one page** —
   polos and tees 7.5–9 in / 4–6 in, **jackets 6–8 in / 3.5–4 in**, sweatshirts "3 to 3.5 in from the
   bottom of neck's edging", athletic jersey "2 to 3 in". Same vendor, same page, different
   garments. (https://www.stahls.com/design-placement-tips)
2. **SanMar (V3) publishes structurally different location sets** — the hoodie gains a pouch-pocket
   location and loses back area; the 1/4-zip has no full-chest location at all (see C.3).
3. **Stahls' (V5) publishes zip/pocket handling rules**
   (https://blog.stahls.com/how-to-heat-print-hoodies/): *"Hoodies can be tricky to heat press due to
   **pockets, seams, zippers, and buttons** they may have that will affect the pressure"*; heat press
   pads are used *"when decorating near pockets, seams, or zippers"*; and *"For zip-up hoodies or
   button-ups, the Flexible Application Pad can be used to cover the zippers or buttons and protect
   them from the heat of the press."* Their rule of thumb is a good candidate for a caption:
   *"**When in doubt, it's better to position the transfer closer towards the middle of the garment
   rather than the sides.** After all, no one wants their logo in their armpit!"*

⚠️ The often-quoted numeric hoodie rules — "the kangaroo pocket's top edge sits 13–14 in below the
collar seam on a size M", "centre the embroidery 1–1.25 in above the pocket" — appear only in trade
blogs. Unverified; the citable substitute is SanMar's published pouch-pocket area, 5 x 8 in.

On the brand-owner side, the only rule that distinguishes garment types is MIT's (B4) 10″ / 8″ split, which
exists precisely because a **zippered** front changes the available field. Buffalo (B5) treats
"collared shirts" as its own row. Apple (B1) shows polo front/back separately from t-shirt
front/back on its Examples page, without a different rule — the *diagram* carries the difference.
The practical rules that decorators enforce — clear the placket, clear the zip, clear the kangaroo
pocket, never cross a seam — are vendor territory.

## D. Event and environmental specs

### D.1 What a brand book itself publishes

| Item | Published spec | Source |
|---|---|---|
| Booth, small | **10′ × 10′**, H **8 ft** (2.4 m); programme: 1 demo, 1 screen, 1 desk (two options, A and B) | IBM Event Design (B15) |
| Booth, small–medium | **10′ × 20′**, H **12 ft** (3.6 m); three options: 2 demos / 4 demos / 1 demo + table, each with 1 screen and 1 desk | IBM Event Design (B15) |
| Event asset kit — the surface list | **Standing banners · Lightboxes · Freestanding walls · Easel and tabletop signs** | IBM Event Design (B15, Graphics) |
| Environmental grid | The layout grid scales between a **"Standing Banner (mini unit)"** and **"IBM Letterhead (baseline unit)"**; columns/rows in **1, 2, 4, 8 or 16** divisions; spacing in multiples of the base unit **1×, 2×, 3×, 4×, 6×, 8×, 10×, 12×** | IBM Event Design (B15, Signage & wayfinding / 2x Grid) |
| Logo on a booth tower | *"The size and placement of the IBM 8-bar logo on the front of the tower is fixed and may be fabricated using different materials and processes."* | IBM Event Design (B15, Copy placement) |
| Light-pole banner | Finished **24″ × 72″** including a **4″ sewn pole pocket top and bottom**; **design area 21″ × 64″** after hemming; opaque, non-shrinking, water/tear/fade-resistant vinyl or flame-retardant canvas; double-sewn seams with metal tie-down grommets | UF (B11) |
| Framed campus banner | **8′-0″ h × 4′-0″ w**, printed on **both sides** of the frame; commercial sponsor recognition limited to **20% of the message** | ASU (B8) |
| Decal / vinyl sizes (historic, but a model) | Vinylcals in **eight sizes: 1¼″, 2⅜″, 3⅛″, 5″, 7⅞″, 12⅝″, 20″, 30″** (width of the white field); decals in **four sizes: 2″, 3″, 5″, 7⅞″** (width of the logotype tip to tip on its baseline); **minimum clearance on all sides of three vertical stroke-widths of the logo** | NASA 1976 (B2 §9.1) |

Two things to copy from this set. First, **UF's finished-vs-design distinction** — 24″ × 72″
finished, 21″ × 64″ live, with the 4″ pocket named as the reason. That is exactly the shape of the
retractable-banner problem, where the cassette eats the bottom. Second, **NASA's fixed size ladder**
— eight sizes, not "scale to taste".

### D.2 Retractable banners — there is no single US standard, there are two size families

Mixing them is the most common artwork error in this whole category.

| Family | Sizes | Vendors publishing it |
|---|---|---|
| **US "80-inch"** | **33 x 80**, 47 x 80, 24 x 80–81 | 4over (E6), Vistaprint (E7), Signs.com at 81 in (E3) |
| **US "92-inch" premium** | **36 x 92**, 48 x 92, 60 x 92 | Signs.com (E3) |
| **Metric-derived** | 33.5 x 78.7 (= 85 x 200 cm), 24/31/39/47/59 x 79 | GotPrint (E9), Vispronet (E8) |
| **Wholesale hardware** | 24/33/36/48/60 wide x **84** or **96** | Testrite (E4), Smartpress (E5) |

Verdicts on the sizes the brief asked about:

- **33″ × 80″ — confirmed, and it is the true US default.** 4over sells exactly `33" x 80"` and
  `47" x 80"` (https://4over.com/standard-retractable-banner-stands). Vistaprint: *"The all-purpose
  champ is 33×80: tall enough to rise above product tables, narrow enough for one-hand carry and
  common among printers (cheaper)"* (https://www.vistaprint.com/hub/retractable-banner-design).
- **33″ × 79″ — refuted as a US standard.** 79″ / 78.7″ is the metric 85 × 200 cm stand. GotPrint
  lists `33.5" x 78.7"`; Vispronet lists widths 24/31/39/47/59″ at a **79″** height. If a spec says
  79, the hardware is metric.
- **36″ × 92″ — confirmed, premium tier.** Signs.com: *"Premium retractable banners are offered in
  36"x92", 48"x92", and 60"x92" sizes."*
- **24″ × 80″ — confirmed in substance, published as 24″ × 81″.** Signs.com: *"Standard retractable
  banners come in two different sizes: 24"x81" and 33"x81"."*

**Ordered size is not visible size.** Signs.com publishes the clearest breakdown of where the height
goes (https://www.signs.com/retractable-banners/): *"The viewable area is slightly smaller in height
due to some of your banner remaining in your base and the metal bar at the top of the display."* /
*"the four inches of non-viewable area is made up of **one inch for the top bar and 3 inches of
material that will stay within the aluminum base**."*

| Ordered | Viewable |
|---|---|
| 24 x 81 | **24 x 77** |
| 33 x 81 | **33 x 77** |
| 36 x 92 | **36 x 88** |
| 48 x 92 | **48 x 88** |
| 60 x 92 | **60 x 88** |

Their design tool marks it: *"a dotted blue line at the top and a dotted blue line and the message
**'NON-VISIBLE AREA'** at the bottom."*

**The cassette allowance is 3″ to 6″, depending who prints it.** The authoritative statement is
Orbus's own graphics-guidelines PDF (E1,
https://s3cdn.orbus.com/media/forms/graphics-guidelines-orbus-canada.pdf):

> *"As a general rule, **FABRIC requires 2 INCHES on all sides, RIGID substrates 1/4 INCH on all
> sides and BANNER stands 6 INCHES on the bottom with 0.5" on the top.** This is to ensure that no
> elements are lost during finishing or installation."*

Smartpress (E5) publishes the same 6″: *"0.5″ of your artwork will be covered on the top"* and
*"6″ of your artwork will be covered on the bottom"* (tabletop models: 0.25″ / 2″). Their worked
48″ example gives **file 47.25 × 85 in, viewable 47.25 × 75.5 in** — note that 85 − 0.5 − 6 = 78.5,
not 75.5; both numbers are on their page, so treat **75.5″ as the safe viewable figure and 6″ as the
bottom rule**. Testrite's Mercury template (E4) states it as file vs finished: *"**File Dimensions:
35" x 86" (Includes Bleeds)** @ 100 DPI recommended"* / *"**Finished Size: 33" x 84"**"* / *"1" Bleed
on each of 4 sides"*. 4over (E6): *"make your artwork exactly **34" x 81" to be cut down to
33" x 80"**"*.

**Bleed / resolution / colour, side by side:**

| Vendor | Bleed | Resolution | Colour & format |
|---|---|---|---|
| Testrite (E4) | 1″ all four sides | **100 DPI at final size** | CMYK, fonts outlined |
| 4over (E6) | 0.5″ all sides | 300 DPI | CMYK; PDF preferred |
| Smartpress (E5) | ≥0.25″ each side | not stated | not stated |
| Vispronet (E8) | "include bleed line" | 300 DPI minimum | CMYK; Pantone where possible; vector preferred; fonts outlined |
| Vistaprint (E7) | 0.125–0.25″ | 150 dpi (300 if small text) | *"Use CMYK, not RGB"*; flattened PDF or hi-res TIFF |
| Signs.com (E3) | vendor adds 4″ of height | ≈200 dpi; vector preferred | — |
| Orbus (E2) | see E1 rule | **100–120 ppi minimum** | *"All files must be CMYK."* |

**The spread is 100 → 300 dpi and it is not a disagreement about quality** — it is a disagreement
about whether "dpi" is quoted at full size. For an 80″-tall banner the honest floor is 100–150 dpi at
full size; 300 dpi at 33 × 80″ is a ~990-megapixel file no printer needs.

**Eye level.** Vistaprint (E7) is the only vendor publishing placement numbers on its own page:
*"Position your logo or main brand mark **about five to 10 inches from the top edge**, drop a bold
hero headline with supporting imagery in the middle and **reserve the lower third for a clear
call-to-action**"*; type *"Headline range: **180–300 pt for banners 80–92 inches tall**"*, subhead
and body 90–120 pt; and the test, *"Stand 10 feet back from your computer screen."*
⚠️ The widely repeated *"the lower 20–24 inches are blocked by tables, chairs or people"* rule could
not be traced to any vendor artwork spec — **folklore, not spec**. The defensible version is the
vendor-stated 3–6″ cassette allowance plus the fact that a US banquet table is 29–30″ high (D.4).

### D.3 Trade-show backdrop and step-and-repeat

**Step-and-repeat standard sizes** — three vendors, three overlapping sets, all 8 ft tall:

- PrintPlace (E10): *"available in four standard sizes, namely, **8' x 5', 8' × 8', 8' × 10', and
  8' × 12'**"*; *"All standard sizes are **8 feet tall** to ensure excellent composition in full-body
  shots."*
- Signs.com (E3): *"we offer three banner sizes: **8' x 8' (our most popular size), 9' x 8', and
  10' x 8'**"*.
- UPrinting (E11): stands take up to 8 × 8 ft, *"with an extension pole … as large as **10' x 8'**"*.

PrintPlace also publishes the capacity and the floor-space requirement, which is the sort of number a
brand book can actually use: 8 × 5 → 2–3 subjects; **8 × 8 → 4–5**; 8 × 10 → 7–8; 8 × 12 → up to 10;
and *"an **8' x 8' branded backdrop requires about 12' x 10' of actual floor space** for people to
pose comfortably."*

**Tension-fabric backwalls — and a warning.** Orbus Formulate (E2), the dominant US wholesale
platform: 10 ft straight is **116.69″ W × 92″ H × 17.71″ D** assembled, add **½″ bleed all round**;
20 ft straight is **235″ W × 92″ H**, add **2″ bleed all round**; the 8 ft Essential 800 banner has a
**visible graphic of 31.5″ W × 92″ H** in a 33″ × 93″ assembly. ⚠️ **A "10 ft" backwall is not 120″
wide and is not 8 ft tall** — it is 116.69″ × 92″. Design to the template, never to the nominal foot
figure.

**Frame loss** on a tension-fabric wall is absorbed by the bleed, not by a separate safe area:
Orbus's rule is *"FABRIC requires **2 INCHES on all sides**"* (E1), and the Essential 800 template's
page box is 35.5″ × 95.63″ for a 31.5″ × 92″ visible graphic — exactly 2″ per side.

**Logo tile size and spacing for a step-and-repeat** — the published numbers:

| Source | Tile size | Spacing |
|---|---|---|
| Smartpress (E5) | *"For vertical logos … **minimum size of 8-10"H**. For horizontal logos … **8-10"W**"*; *"images be at **100 % scale at 100 PPI**"* | — |
| Signs.com design article (E3) | *"For square logos, the preferred size is usually **5" to 7"** and **8" to 12" with longer logos**"* | *"leave **about the same amount of space in between the logos**"*; *"**checkerboard pattern** … evenly spaced and lined up in **four or five sets, alternating**"* |
| Signs.com logo-size article (E3) | 8 × 8 ft banner → **8–10″ wide**; 10 × 10 ft or larger → **10–12″ wide**; standard range 6–12″ wide × ~4″ tall | *"leave about **one logo's width of space between each repetition**"*, checkers-style alternating rows |

Signs.com also publishes a literal artboard setup, which is the closest thing to a published
step-and-repeat safe area: for a **96″ × 96″** banner, *"Artboard **90″ × 90″**"* with *"Bleed:
**.25″** Top, Bottom, Left, and Right"* and a final artboard of 96.5″ × 96.5″ — i.e. **a 3″ inset
from each edge**, plus ¼″ bleed. (⚠️ their walkthrough says "Color Mode: RGB", which contradicts
every other vendor here; do not copy that.)

⚠️ **The rules everybody "knows" about step-and-repeat are not vendor-published.** No first-party
spec page states a bottom-row height, a head-height dead zone, or a "the subject must be flanked by
whole logos" rule. PrintPlace states the effect without a number (*"use wider banners for more
intricate or longer logos to ensure they **remain visible around the subjects**"*), and UPrinting
publishes the consequence (*"**Step and repeat banners do not extend all the way to the floor.**"*).
What we can defensibly write: an 8–12″ tile, gap equal to one tile width, checkerboard, four or five
columns across a 96″ field, 3″ outer margin — and say plainly that head height is design judgement.

**Large-format resolution, the scale convention.** Tectonics (E12,
https://tectonics.com/guide-to-large-format-print-files/): work at **100 % scale up to 150″** and
*"75 dpi for most types of banners"*; over 150″, work at **10 % scale** — *"move the decimal one spot
to the left in your file dimensions, and one spot to the right in your dpi"* → **750 dpi at 10 %
scale**; *"All art files should have **2" of bleed on all sides**."* That is the "10:1" convention,
cited to the printer that owns it.

### D.4 Table throws

**The tables themselves — confirmed.** Crestline (E13): six-foot covers fit *"**72" long by 29" high
by 30" wide**"*, eight-foot *"**96" long by 29" high by 30" wide**"*. Premier Table Linens (E14)
publishes the same 72 × 30 × 29 plus counter (36″) and demo (42″) heights. Signs.com (E3) rounds to
30″ high. **29″ is the true banquet-table height; 30″ is the safe design assumption.**

**Throw sizes and construction**, from Signs.com (E3, https://www.signs.com/table-covers/):

- 4-sided (standard): **6 ft = 126.5″ × 84″**, **8 ft = 150.5″ × 84″**. *"Standard table covers are
  4-sided and are the preferred cover for use in open areas."*
- 3-sided (open-back / backless): **6 ft = 126.5″ × 60″**, **8 ft = 150.5″ × 60″** — *"covering for
  the top, front and sides … leaving the back open for easy access beneath the table."*
- *"The table cover **is not designed to stretch**"* — stretch/fitted is a separate product. Both
  sizes are *"one piece of fabric"*, so no seam crosses the front panel.

Classic Exhibits (E15) names the four types a brand book should distinguish: **fitted** (tailored,
"clean, boxy, and structured"), **stretch-fit** (spandex, hugs the table and legs), **runner**, and
**convertible** (6 ft ↔ 8 ft via Velcro tabs).

**Imprint area on the front panel — two published models:**

1. **Full dye-sublimation:** the whole front drop. Premier Table Linens (E14): 6 ft →
   *"printable area = **72 inches wide by 29 inches tall**"*; 8 ft → **96″ × 29″**; counter height →
   72″ × 42″; convertible → *"imprint area measures **30"H x 72"L**"*.
2. **Banded / thermal imprint:** Crestline (E13) publishes a front imprint range of
   *"**50" x 17" to 90" x 23"**"* across 6-ft and 8-ft covers. Vistaprint (E7) publishes the same
   band: *"Limited Printing: Custom = 24" to 60" x **17"**"* versus *"All-Over Printing: … x 84""*.

**Drop and placement.** The front drop equals the table height, **29″**. Classic Exhibits (E15) is
the clearest vendor statement on placement: *"**Prioritize Your Logo:** Make your logo the focal
point. It should be **large enough to be easily legible from at least 10 feet away**. The standard
and most effective placement is **centered on the front panel of the throw**."* Premier Table Linens'
default is *"maximize your graphic size and center it on the product."*
⚠️ No vendor publishes a rule about a seated person hiding the mark. The defensible construction is
that the banded imprint is **17–23″ of a 29″ drop**, which by itself keeps the mark in the upper
two-thirds of the panel and out of the chair zone.

### D.5 Lanyards

**Widths — confirmed, with a correction.** 4imprint (E20) publishes six: **3/16″, 1/2″, 5/8″, 3/4″,
7/8″, 1″**. Imprint.com (E20): *"The width of lanyards commonly ranges from 5/8 inch to 1 inch …
**The standard lanyard width is 3/4 inch.**"* and *"The standard lanyard length is **36 inches**."*
iLanyard (E20) gives the other common answer: standard length 36″, standard widths **3/8″ and 5/8″**.
So: 3/8, 1/2, 5/8, 3/4 and 1 inch are all real; **5/8″ and 3/4″ are the two vendors call standard**
(5/8 for event/ID programmes, 3/4 for branded promo); 1″ is the largest common flat width; 4imprint's
narrow offering is 3/16″, not 3/8″.

**Imprint area — the cleanest published set.** Avon Security Products' own 5/8″ template (E16):
*"**Lanyard size (Laid Flat) 5/8" X 35.5"**"* · *"**Imprint area 1/2" X 32"**"* · *"**1.5"
Unprintable**"* at each end for the placement crimp. So on a 35.5″ strap you get **32″ of printable
run and 1/2″ of printable height**.

Stellar Lanyards' 1″ template (E17): *"Final Lanyard size **25 mm x 878 mm**"* · *"Background with
bleeding **31 mm x 890 mm**"* · *"**Safe area for Graphics (Logo and text imprint) 20 mm**"* — i.e.
2.5 mm lost top and bottom to the sew line.

**And a genuine contradiction that is really a method difference.** DEM Printing's template (E18)
says, in capitals, *"**LANYARDS CANNOT BLEED**"* with an imprint template *"Up to 18.5" wide x .5"
tall"*. Stellar specifies 3 mm bleed per side. Both are right: **screen print sits on the webbing and
cannot reach the edge; dye-sublimation dyes the webbing through and must bleed.**

**What each method can and cannot do** — Lanyard Factory Direct (E19) publishes a capability table:

| | Screen print | Dye-sublimation | Woven (jacquard) |
|---|---|---|---|
| Best for | *"Simple logos (1–3 spot colors)"* | *"Full-color, gradients, detailed art"* | *"Premium texture + long-term wear"* |
| Detail | strong for bold shapes | *"Best for fine detail"* | *"very small text may soften"* |
| Cannot do | *"Complex artwork (gradients, shadows, photo designs) is not ideal"* | needs polyester; *"Color matching can vary based on **webbing base color**, heat settings, and file profiles"* | *"**Not suitable for photo-like artwork or gradients**"* |
| Typical MOQ / lead time | ~50–200+ / 7–15 days | ~50–200+ / 10–18 days | ~200–500+ / 15–25 days |

Brand-book translation, fully vendor-supported: **a gradient on a lanyard is dye-sublimation only.**
A screen-printed lanyard is spot colour, no bleed, 1–3 inks. A woven lanyard is yarn colours and will
soften the smallest type. No vendor publishes a minimum type size per width; the nearest is Lanyard
Factory Direct's advice to request a woven *"resolution check … to confirm readability at the chosen
lanyard width"* and Stellar's 20 mm safe height on a 25 mm strap.

### D.6 Event badges and credentials

**The card standard, cited to the document that owns it.** ISO/IEC 7810:2019 (E21) defines **ID-1**
as *"nominally **85,60 mm (3.370 in) wide by 53,98 mm (2.125 in) high by 0,76 mm (0.030 in)
thick**"* (ID-2 105 × 74 mm; ID-3 125 × 88 mm; ID-000 25 × 15 mm), with an unused-card tolerance of
85.72/85.47 mm wide, 54.03/53.92 mm high and a **corner radius of 3.48/2.88 mm**. US federal
credentials inherit it: FIPS 201-3 requires the PIV card to *"comply with physical characteristics as
described in ISO/IEC 7810"* (E22).

⚠️ **Correction worth carrying into the book: ISO's own inch figure is 3.370″, not 3.375″.** The card
industry's working nominal is **CR80 = 3.375″ × 2.125″**, 0.005″ wider. Both are correct in their own
domain — cite ISO for the standard, CR80 for the print spec.

**Which size is used for what:**

| Size | Use | Source |
|---|---|---|
| **CR80 3.375″ × 2.125″** | access control, employee ID, printed PVC credentials, RFID | eXpress badging (E23): *"The finished standard CR80 badge size is 3.375″ × 2.125″"*; anything else is *"considered custom"* |
| **4″ × 3″ / 3″ × 4″** | the workhorse conference badge insert | pc/nametag insert stock (E26); Avery template 5392, *"3" x 4"", 6 per sheet"* (E27) |
| **4¼″ × 6″** | large conference / multi-day badge | pc/nametag (E26): item 4¼ × 6, imprint area 4¼ × 6, *"Bleed Available: Yes"* |
| **3.5″ × 2.25″** | small name-tag insert | pc/nametag (E26) |

pc/nametag's full published insert list: 4.25 × 6, 4.25 × 3.67, 4.25 × 3, 4 × 8, 4 × 5.125, 4 × 3,
4 × 2.5, 3.75 × 2.75, 3.625 × 5.5, 3.625 × 5.25, 3.5 × 2.25. Note **4″ × 6″ is real in the trade but
pc/nametag's is 4¼″ × 6″** — check before building a template.

**Bleed and safe area.** Duracard's CR80 template (E24) is the most explicit:
*"**DIMENSIONS: 3.375" x 2.125"** / **LIVE AREA: 3.125" x 1.875"** / **BLEED AREA: 3.625" x 2.375"** /
COLOR MODE: CMYK / RESOLUTION: 300 dpi"* — a clean **0.125″ bleed and 0.125″ safe margin on all four
sides** — with the instruction *"**LIVE AREA** Keep important text and logos in the Live Area"*.
eXpress badging (E23) requires **0.05″ bleed** minimum (file 3.475 × 2.225″, 2085 × 1335 px at
600 dpi), prefers **0.125″**, prefers **600 dpi**, and warns that direct-to-card printers *"do not
print completely over the edges of a card … a thin white border may appear"*. Save artwork with
**square corners**; the card is trimmed round. InstantCard (E25): file 3⅜ × 2⅛″ with no bleed or
3½ × 2¼″ with ⅛″ bleed; **1013 × 638 px at 300 dpi**; 600 dpi preferable.

**The slot punch — the rule the brief was after, and it is published.** InstantCard (E25):
*"If you plan to have a slot punch on your employee ID badge, please **allow 3/8″ from the edge to
the bottom of the slot punch** on your card layout."* eXpress badging (E23) publishes the slot
itself: *"A typical slot opening is approximately **0.55″ to 0.625″ wide and 0.15″ high**"*, and the
design instruction: *"Add a **nonprinting slot placeholder** to both the front and back designs"* /
*"**Keep names, logos, photographs, barcodes, QR codes, and other important elements outside the slot
and its surrounding safety area**"* / *"Allow additional space around the slot so the attachment does
not cover important information."* So **the top 3/8″ of a CR80 is dead**, and that is a citable
number, not folklore.

**The RFID caveat, which matters on a campus.** eXpress badging (E23): *"**Punching through an RFID
antenna will permanently damage the card**"*; *"**Some RFID cards are not designed to be
slot-punched**"*; *"Never assume that an RFID card can be punched in the same location as a standard
PVC card."*

### D.7 Colour: CMYK, Pantone, and the caveat every vendor publishes

Six vendors say the same thing in their own words, and it is exactly the sentence a brand book with a
gradient needs to hear:

- **Orbus (E1)**: *"**We print in CMYK, so we cannot match PANTONES precisely.** We will do our best
  to come as close as possible. **Other pantone series such as uncoated, fluorescent and metallic
  colours cannot be matched.**"* Plus the practical rules: specify the **solid coated** Pantone,
  apply it as a swatch in the file, use **40/40/40/100** for the darkest black, avoid transparencies,
  embed links, outline all text, and *"DO NOT include anything you do not wish to print… crop marks,
  registration lines, guides or slugs."* Orbus also publishes that it prints *"with accurate color to
  the **G7® specification**"* (E2 print capabilities).
- **Orbus retail (E2)**: *"All files must be CMYK."*; and for cut vinyl, *"All artwork must be
  **vector, no gradients**, and assigned PMS values for color matching."*
- **Tectonics (E12)**: *"**RGB colors are typically used for web or anything being viewed on a
  screen. These are _not_ printing colors**"*; some Pantones *"may fall outside the process color
  gamut"*; rich black for large solids **50C 50M 50Y 100K**.
- **eXpress badging (E23)**, for dye-sub cards: *"**exact matching to RGB, CMYK, or Pantone Matching
  System (PMS) color values cannot be guaranteed**"*.
- **Lanyard Factory Direct (E19)**: dye-sub colour *"can vary based on webbing base color"*.
- **Vistaprint (E7)** and **Vispronet (E8)**: CMYK, not RGB; Pantone where possible.

### D.8 Virtual-event surfaces, from Zoom's own spec table

Zoom publishes a full asset spec table for Zoom Events (P2). The rows that matter to us:

| Asset | Spec |
|---|---|
| Virtual Background | **1920 × 1080 px**, JPG/JPEG/PNG, **max 15 MB** |
| In-session Wallpaper | 1920 × 1080 px, JPG/JPEG/PNG, max 15 MB |
| Webinar Wallpaper | 1920 × 1080 px, JPG/JPEG/PNG, max 15 MB |
| Production Studio Wallpaper | 1920 × 1080 px, JPG/JPEG/PNG, max 10 MB |
| Main Event Image / Session Image / Lobby Image | 1920 × 1080 px, JPG/JPEG/PNG, max 15 MB |
| Event Listing Logo | 300 × 56 px, JPG/JPEG, max 2 MB |
| Company Logo | **56 px height recommended**, JPG/JPEG/PNG, max 15 MB |
| Booth Banner Image | **4000 × 710 px** recommended, max 20 MB |
| Booth Resources Background | **3590 × 1334 px** recommended, max 20 MB |
| Exhibitor / Booth logo image | 320 × 238 px, max 15 MB |
| Speaker photo | 160 × 160 px |

(https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068572)

## E. Virtual background specs from the owners

### Zoom

From **Changing your virtual background image** (P1,
https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060387), verbatim:

- Format: *"24-bit PNG or JPG/JPEG image format"*.
- Size ceiling: *"Maximum image size is 15MB"*.
- Aspect ratio: *"We recommend cropping the image to match the aspect ratio of your camera before
  uploading it."*
- Recommended resolutions: *"if your camera is set to 16:9, an image of 1280x720 pixels or
  1920x1080 pixels, both being the same 16:9 ratio, would work well."*
- Floor: *"If you're not sure about your camera aspect ratio, use a background image with a minimum
  resolution of 1280x720 pixels."*
- Video backgrounds: *"A MP4 or MOV video file"*, *"Minimum resolution of 480x360 pixels (360p) and
  a maximum resolution of 1920x1080 pixels (1080p)"*.

Zoom's own Events spec table (P2) resolves the ambiguity in one number: **Virtual Background —
1920 × 1080 px, JPG/JPEG/PNG, max 15 MB.** That is the number to publish.

The system-requirements article (P3) is about CPU/GPU/OS only and carries **no** image specs — worth
knowing so we cite the right page.

**Mirroring.** Zoom's settings article (P4) describes "Mirror my video" as flipping your video
preview horizontally and says it *only affects how you see your own video* — other participants see
it un-mirrored. (The article geo-served in Swedish: *"…påverkar bara hur du själv ser din video."*)
Consequence for us: a wordmark on a Zoom background reads **backwards to the wearer** and correctly
to everyone else. That is a caption sentence, not a defect.

### Microsoft Teams

The authoritative spec is the admin page, **IT Admins: Manage and create custom meeting backgrounds
for Teams meetings** (P5,
https://learn.microsoft.com/en-us/microsoftteams/custom-meeting-backgrounds, `ms.date`
2025-04-30). Verbatim, images must be:

- *"PNG and JPEG image formats"*;
- *"Images with a minimum dimension of 360 px X 360 px"*;
- *"Images with a maximum dimension of 3840 px X 2160 px"*;
- *"A maximum of 50 custom background images"*;
- *"For frosted glass backgrounds: a transparent png image."*

Two facts with product consequences: this org-wide upload requires **Teams Premium** for the end
users who will see the images (*"Only end users with a Teams Premium license have these images in
their background settings panel to use during meetings"*), and the **frosted-glass** effect is
produced by uploading a **transparent PNG** — *"The frosted glass effect turns the transparent areas
of your image into a blurred background, while the graphic remains as part of the background."*
That is a genuine, first-party affordance for shipping a mark-only background.

The end-user path (P6, https://support.microsoft.com/en-us/teams/meetings/change-your-background-in-microsoft-teams-meetings)
publishes only formats: *".JPG, .PNG, or .BMP"* — **no dimensions at all**. So any pixel number we
put next to "Teams" must come from the admin page.

Neighbouring Microsoft surfaces, for completeness, because someone will ask: Teams **Rooms on
Windows** front-of-room minimum **1920 × 1080**, touch console minimum **1280 × 800** (P7); Teams
**panels** minimum **1280 × 720** and the file must be **between 100 KB and 2 MB** (P8). Different
products, different numbers — do not blend them into the meeting-background row.

### What other brands actually ship

UC Berkeley (B19) publishes 13 branded Zoom backgrounds — 8 photographic, 5 graphic (seal
supergraphic and a "Let There Be Light" ribbon, each in three colourways) — each with the logo in
the **top-left corner**, and states **no** dimensions, **no** usage rules and **no** install
instructions. That is the norm and it is thin. Publishing the numbers is a differentiator.

## F. How brand books lay out a gallery page

Five composition patterns are observable in the readable sources:

1. **Captioned diagram grid** — Apple's Examples page (B1 p. 8): flat garment silhouettes, one per
   cell, captioned by surface and placement ("Front, T-shirt" / "Back, T-shirt" / "One sleeve" /
   "Front, polo shirt" / "Back, polo shirt"), plus one annotation cell explaining the alternative
   location. NASA (B2 §9.2) does the same with lettered figures (b, d, e, f, g) and puts the
   dimensions in the running text beside them. **This is the pattern that carries rules.**
2. **Substrate × colourway matrix** — St. John's (B12 pp. 4–13): the same logo shown vertical and
   horizontal, repeated per merchandise colour (red / blue or black / white / gray), each block
   headed with the legal combination ("FULL-COLOR LOGO OR WHITE LOGO ON RED MERCHANDISE"). Ten
   pages of it. Ruthless, ugly, unambiguous.
3. **Application photo + one rule** — Penn State (B16): a real photograph of the item, and beside
   it exactly one sentence of rule. Reads as a gallery, behaves as a standards page.
4. **Full-bleed photography, principles only** — GitHub (B14 Swag and Experiential): photographs of
   real products and real booths; the "rules" are six aphorisms (*"Always include one premium,
   non-printed element (wood, metal, mesh, etc.)"*, *"Design reusable elements that scale across
   different booth sizes and events"*). Beautiful; unbuildable.
5. **Model catalogue** — IBM Event Design (B15): per booth size, an isometric axon, a plan, and a
   spec block (L / W / H + programme). The gallery *is* a parts list.

**Which reads best at 1920 × 1080 landscape.** The book's usable band is 1680 × 600 (`../build.md`),
which is a **2.8 : 1 letterbox**. That kills patterns 2 and 4 outright: a matrix wants portrait
depth, and a full-bleed photograph at 2.8 : 1 becomes a strip. It favours a **single row of 4–6
tiles with the caption under the tile** (patterns 1 and 3 merged): at 6 tiles the cell is
248 × 600 minus gutters — portrait, which suits a hoodie, a tumbler, a banner and a lanyard; at 4
tiles the cell is 390 wide, which suits a mug, a notebook and a badge. Pattern 5's spec block works
as the caption. The one thing not to do at this ratio is stack two rows of three — 600 px of height
split two ways leaves ~250 px per tile including caption, and a garment silhouette stops reading.

---

# 2. What I recommend for Audentra's two pages

## Page 1 — Merchandise

**Shape: one row of six portrait tiles on a flat field, caption under each tile, one Callout.**

- **Six tiles, three groups, group label above the row** — Apparel (hoodie, half-zip, polo, t-shirt
  reduced to *four* silhouettes is too many for one row; show **hoodie, half-zip, polo** and let the
  t-shirt live inside the apparel caption as "and t-shirt"), Drinkware (mug, tumbler), Office
  (notebook, pen, sticker — show the **notebook** and put pen and sticker in the caption, or run
  eight tiles at 190 px and accept it). My recommendation: **six tiles — hoodie, half-zip, polo,
  tumbler, notebook, sticker** — and name the mug, t-shirt and pen in the group captions, because a
  mug and a tumbler at 248 px wide read as the same object and one of them is wasted.
- **Caption format, three lines, fixed:** *item · substrate · decoration + colour of the mark*.
  e.g. `Hoodie — Navy fleece · Embroidery, White master, left chest`. This is Apple's caption grammar
  (B1) plus NASA's placement clause (B2), and it is the smallest thing that makes the page a
  standards page rather than a mood board.
- **Say the two rules once, in a Callout, not as a banner.** (a) *On anything decorated, the mark
  is one colour — the White master or the Navy master.* Precedent for the wording: MIT's seal rule
  (B4) and UTK's colour-on-substrate pairing (B6). (b) *The gradient does not go on an object.*
  Precedent: Apple's "no pattern or color gradient" on garments (B1).
- **Publish the colour × substrate pairing as a strip, not a matrix.** St. John's ten-page matrix
  (B12) is right in substance and impossible at 2.8 : 1. Compress to one line under the Callout:
  White master on Navy, Purple and photographic goods; Navy master on white, cloud and raw material.
- **Do not publish an embroidery minimum size** (already decided). Publish instead the *escape
  hatch*, which is what Cal Poly (B9) and Buffalo (B5) do and which costs us no commitment: *if the
  mark cannot be stitched legibly in the available area, change the placement or the product — do
  not redraw the mark.*
- **If we give a placement number, name the landmark.** The published left-chest figures are 7.5–9″
  (measured down the shoulder seam from the shoulder/collar point) and ~3″ (measured down from the
  collar edge) — the same spot, two datums (C.4). A caption that says "left chest" is safe; a caption
  that says "left chest, 3″ wide, 7.5″ down the shoulder seam" is buildable. A caption that says
  "3″ down" without saying from *what* will be wrong half the time.
- **Ship the one-colour master, or the decorator will invent one.** Five vendors publish that they
  simplify, recolour or delete elements automatically (B.6). This is the strongest available argument
  for the rule we already decided, and it belongs on the page as a sentence, not as a footnote.
- **Do not show a mock price, an SKU or a vendor name.** No source does.
- **One line of governance at the foot**, because every single source has one: who approves a run
  and where the master files are. Apple (B1), MIT (B4), Harvard (B13), Penn State (B16), Stanford
  (B17), UW–Madison (B18) — six for six.

## Page 2 — Environmental and events

**Shape: a left block of physical surfaces and a right block of the two virtual backgrounds, or —
better at 2.8 : 1 — one row of five physical tiles with a spec line under each, and the Zoom/Teams
numbers as a two-row table in the last third.**

- **Five physical tiles:** retractable banner (portrait, tall — it anchors the row), trade-show
  backdrop, table throw, lanyard, event badge. This ordering runs tall → wide → wide → thin → small,
  which reads as a descending scale and gives the row a reason to be in that order.
- **Caption format: item · finished size · live/safe area.** This is UF's light-pole banner grammar
  (B11: 24″ × 72″ finished, 21″ × 64″ design area, and the 4″ pocket named as the reason) applied to
  each surface. It is the single most useful thing a brand book can say about a physical surface,
  and almost nobody says it.
- **The banner's caption is the whole lesson of section D.** Ordered 33″ × 80″; **visible ≈33″ × 77″**;
  **nothing load-bearing in the bottom 6″ or the top 0.5″**; **mark 5–10″ from the top edge**. Those
  four numbers come from Signs.com, Orbus, Smartpress and Vistaprint respectively (D.2) and they are
  the difference between a banner that works at three vendors and one that works at one.
- **Say the eye-level rule once.** IBM (B15) states it as hierarchy — *"Focus on impactful headlines
  that attract attendees from across the exhibit floor"* — and fixes the logo's size and position on
  the booth tower rather than leaving it to the fabricator. Our equivalent: the mark lives in the top
  10 inches; the lower third is the call to action; nothing load-bearing enters the bottom band the
  cassette and the crowd swallow.
- **Never ship one PDF to two vendors.** A 33 × 80 from 4over, a 33 × 81 from Signs.com and a 33 × 84
  from Testrite are three different artboards with three different bleeds (0.5″, vendor-added 4″, and
  1″). Publish **the visible/live area of each format** and tell the producer to fit it to the chosen
  vendor's template. This is the single most useful sentence the environmental page can carry.
- **The backdrop tile should carry the correction, not the nominal.** A "10 ft" tension-fabric
  backwall is **116.69″ × 92″**, not 120″ × 96″ (Orbus, D.3). If we print "10 ft" without the real
  number we have shipped the error ourselves.
- **The badge tile carries the one rule people get wrong**, and it now has a number: the slot punch
  takes **the top 3/8″** (InstantCard), and the slot opening is **0.55–0.625″ × 0.15″** (eXpress
  badging). Nothing that must be read goes there. Add the RFID clause if we ever put the mark on a
  campus access card: *"Punching through an RFID antenna will permanently damage the card."*
- **The lanyard tile is where the gradient rule gets tested and holds.** Screen print on a lanyard
  **cannot bleed** and takes 1–3 spot colours; woven cannot do gradients at all; only
  dye-sublimation can — and even then the colour shifts with the webbing's base colour (D.5). A
  one-colour White or Navy master on a flat strap is the only version that survives all three.
- **If we publish one Pantone caveat anywhere in the book, put it here**, in Orbus's words:
  *"We print in CMYK, so we cannot match PANTONES precisely … uncoated, fluorescent and metallic
  colours cannot be matched."* Six vendors say a version of it (D.7).
- **Virtual backgrounds as a numbers block, not a picture.** Two rows — Zoom and Teams — with the
  owner's numbers verbatim (below). Berkeley (B19) ships 13 backgrounds and publishes zero numbers;
  we should do the reverse and publish the numbers with two thumbnails.
- **Name the mirroring fact in the Zoom caption** (P4): the wordmark reads reversed to the wearer,
  correctly to everyone else. It stops a support ticket.
- **The gradient's one legitimate physical home, if we want it.** IBM (B15 Finishes) treats
  "layered gradients" as a booth *material*. If we ever want gradient printed fabric on a backdrop,
  this is the precedent — but it must be written as *the environment may carry a gradient surface;
  a decorated object may not*, or the rule loses its edge. See Q1.

---

# 3. Exact numbers we can put on the page

Every number below is from a first-party source, with the URL. Nothing here is inferred.

## Virtual backgrounds

| Platform | Spec | Source |
|---|---|---|
| **Zoom — virtual background** | **1920 × 1080 px**, JPG/JPEG/PNG, **max 15 MB** | Zoom Events asset specs, https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068572 |
| Zoom — alternate / floor | 24-bit PNG or JPG/JPEG; 1280 × 720 or 1920 × 1080 at 16:9; minimum 1280 × 720 if camera ratio unknown; max 15 MB | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060387 |
| Zoom — video background | MP4 or MOV, min 480 × 360 (360p), max 1920 × 1080 (1080p) | same |
| **Teams — org custom meeting background** | **PNG or JPEG**; **min 360 × 360 px**; **max 3840 × 2160 px**; **max 50 images**; transparent PNG for the frosted-glass effect; requires **Teams Premium** for end users | https://learn.microsoft.com/en-us/microsoftteams/custom-meeting-backgrounds |
| Teams — end-user upload | .JPG, .PNG or .BMP; no dimensions published | https://support.microsoft.com/en-us/teams/meetings/change-your-background-in-microsoft-teams-meetings |
| *(adjacent, do not blend)* Teams Rooms on Windows | front-of-room min 1920 × 1080; console min 1280 × 800 | https://learn.microsoft.com/en-us/microsoftteams/rooms/custom-backgrounds |
| *(adjacent)* Teams panels | min 1280 × 720; file between 100 KB and 2 MB | https://learn.microsoft.com/en-us/microsoftteams/devices/custom-background-panels |

**Practical single line for the page:** *Ship one 1920 × 1080 PNG. It is Zoom's stated size and it
sits inside Teams' 360 × 360 – 3840 × 2160 window. Keep it under 15 MB (Zoom) and under 2 MB if it
will also be used on a Teams panel.*

## Apparel

| Number | Value | Source |
|---|---|---|
| Widest a chest mark can be embroidered before it runs onto the side | 4.25″ | https://brandguide.asu.edu/execution-guidelines/apparel-merchandise |
| Minimum width for that same mark | 3.5″ | same |
| Max logo width, zippered sweatshirt | 10″ | https://brand.mit.edu/applying-brand/branded-merchandise |
| Max logo width, all other garments | 8″ | same |
| Max width for a complex/detailed mark on apparel (size M) | 5.5″ | same |
| Below this, a complex mark stops reproducing | 2.5″ diameter | same |
| Clear space around the mark on merchandise | 1″ minimum | same |
| Screen-printed mark height when it is the only element on a garment | 33 mm | Apple Branded Merchandise Identity Guidelines, Jan 2017, p. 6 |
| Smallest type inside an embroidered logo | 3 pt | https://brandcenter.ufl.edu/the-university-logo/ |
| Minimum embroidered reproduction height (machine limit, as ASU states it) | 5 mm ≈ 0.2″ | https://brandguide.asu.edu/execution-guidelines/apparel-merchandise |
| Patch above the breast pocket | 1½″ (3.8 cm) directly above | NASA Graphics Standards Manual 1976, §9.2 |
| Mark centred on the back of a coat | 7″ wide | same |
| Mark centred on headwear front | 5″ wide (12.7 cm) | same |

*(We are not publishing an embroidery minimum, by decision — the 5 mm and 3 pt rows are here as
background for whoever sets the artwork, not as page copy.)*

### …and from the supplier and the decorators

| Number | Value | Source |
|---|---|---|
| Left-chest maximum area, any of tee / polo / hoodie / 1/4-zip | **4 x 4 in** | SanMar spec sheets, https://www.sanmar.com/p/1634/decorationSpecSheet |
| Left-chest logo, the band six decorators agree on | **3–4 in wide** | Vistaprint, RushOrderTees, Corporate Casuals, Stahls' UK, Queensboro (V10, V11, V12, V5, V17) |
| Left-chest position — shoulder-seam datum | **7.5–9 in** down the shoulder seam, **4–6 in** from centre (jackets: 6–8 in / 3.5–4 in) | https://www.stahls.com/design-placement-tips |
| Left-chest position — collar-edge datum | **≈3 in** below the neckline; **2 in** from the armpit | https://www.printful.com/blog/t-shirt-design-placement-guide |
| Full back, maximum | tee **20 x 14 in**; hoodie **14 x 14 in** | SanMar (V3) |
| Full back, typical print | **12 x 14 in**, up to **14.5 x 16.5 in** | https://www.rushordertees.com/blog/logo-placement-guide/ |
| Full back, top edge below collar | tee **3–4 in**; **hoodie 5–6 in** (the hood covers the rest) | https://blog.stahls.com/how-to-heat-print-hoodies/ ; https://blog.transferexpress.com/heat-transfer-placement-and-position-guide/ |
| Sleeve, maximum | hoodie **4 H x 12 W in**; 1/4-zip **3 H x 22 W in**; polo shoulder **2 x 2 in** | SanMar (V3) |
| Sleeve, position | ≈**1 in** above the cuff/hem | https://www.rushordertees.com/blog/logo-placement-guide/ |
| Inside neck label, maximum print area | **3 x 3 in** (logo space capped at 3 x 1.13 in) | https://help.printful.com/hc/en-us/articles/5582030932764 |
| Outside back-collar | polo **1 H x 4 W in**; 1/4-zip **2 H x 6 W in**; ≈1 in below the neckline | SanMar (V3); Vistaprint (V10) |
| Cap front, structured 6-panel | **1.75 H x 5 W in** (unstructured **1.5 H x 5 W**) | https://www.sanmar.com/p/818/decorationSpecSheet · https://www.sanmar.com/p/6608/decorationSpecSheet |
| Cap centre seam to avoid | **0.4–0.6 in (10–15 mm) wide** | https://help.printful.com/hc/en-us/articles/5254851511324 |
| Hoodie pouch pocket, as a decoration location | **5 H x 8 W in** | https://www.sanmar.com/p/22991/decorationSpecSheet |
| 1/4-zip full-chest location | **does not exist** in the supplier's own spec | https://www.sanmar.com/p/4718/decorationSpecSheet |

### Embroidery — the physical floor (for the artwork, not for the page)

| Number | Value | Source |
|---|---|---|
| Minimum legible text height | **0.25 in** (≈36 pt) — three vendors independently | Custom Ink, Printful, Corporate Casuals (V8, V7, V12) |
| Text that will be deleted in digitising | below **0.1 in** | https://help.printful.com/hc/en-us/articles/28727397325340 |
| Minimum satin-stitch stroke | **0.05 in (3 pt / 1.27 mm)** — two vendors independently | Custom Ink (V8), Printful (V7) |
| Minimum negative space between elements | **0.25 in** | Printful (V7) |
| Smallest possible stitch = smallest possible detail | **2 mm (≈0.07 in)** | https://melco.zendesk.com/hc/en-us/articles/10706046938381-Embroidery-Design-Guidelines |
| Practical thread-colour ceiling | **6** (Printful) / **6, absolute max 9** (Corporate Casuals) / **14** (Vistaprint) | V7, V12, V10 |
| Stitch-count ceiling | **11,000** max; **6,000** assumed for a standard logo | Queensboro (V17 ⚠️), Corporate Casuals (V12) |

### Screen print and transfers

| Number | Value | Source |
|---|---|---|
| Screen print, colours for best value | **1–6** (one screen per colour) | https://www.customink.com/ink/decoration/screen-printing |
| Screen print, minimum stroke / text at print size | **1 pt / 6 pt** | same |
| Screen-printed transfer, minimum line thickness | **.012 in** (Reflective: 0.25 in) | https://blog.transferexpress.com/tips-for-screen-printing-custom-artwork-tip-4-detail-guidelines/ |
| Screen-printed transfer, minimum **gap** (show-thru) | **.04 in** (.10 in for puff) — *"including the open spaces within text"* | same |
| Minimum order for screen print | **24+ pieces** | https://www.customink.com/blog/screen-printing-vs-digital-printing-vs-sublimation-a-buyers-guide/ |
| DTG standard print placement | **15 x 18 in** | Printful (V7) |

## Hard goods

| Number | Value | Source |
|---|---|---|
| Laptop sticker — bleed around the cutline | .0625″ (1/16″) | https://www.stickermule.com/support/faq/artwork/what-are-your-artwork-requirements-for-stickers-and-labels |
| Laptop sticker — border, standard / minimum | .1″ / .0625″ | same |
| Laptop sticker — minimum type / minimum line | 6 pt / 1 pt | same |
| Laptop sticker — raster resolution | ≥ 300 PPI, CMYK | same |
| Drinkware — screen-print colour limit | 4 colours, Pantone-matched | MiiR, https://b2b.miir.com/pages/faqs and product decoration copy |
| Drinkware — laser etch | carves away the powder coat; high-contrast **single-colour** artwork | same |
| Drinkware — minimum order | 24 pieces (1 case) per design | https://b2b.miir.com/pages/faqs |
| Drinkware — lead time, 1-colour/etch vs multi-colour | 12–15 vs 16–19 business days after art approval | same |
| Tumbler (40 oz) — laser engraving area, a real example | **3 in H x 1.5 in W** | https://www.4imprint.com/product/166752-L/Charger-Vacuum-Tumbler-40-oz-Laser-Engraved |
| Pen — pad-print area, barrel / clip (BIC Clic Stic) | **2 1/8 in W x 3/4 in H** / **≈1 1/8 in W x 5/32 in H** | https://www.customink.com/blog/how-to-customize-pens-for-business/ |
| Pen — laser engraving area, a real example | **0.25 in H x 1.25 in W**; *"Imprint will appear gold on all colors"* | https://www.4imprint.com/product/8804-L/Executive-Metal-Pen-Laser-Engraved |
| Pad print — colour ceiling | **1 to 4 colours**, each a separate pass | https://asicentral.com/glossary/what-is-pad-printing/ |
| Notebook — blind deboss maximum area | **up to 20 sq in**; priced the same as a one-colour imprint | https://www.journalbooks.com/products/boost-a-book/imprinting/foil-stamping-more/product/693 |
| Notebook — a real deboss area (Moleskine Pro, 10 x 7.5 in) | **5 in H x 4 in W** on the front | https://www.4imprint.com/product/157846-107-D/Moleskine-Pro-Hard-Cover-Project-Planner-10-x-7-12-Debossed |

## Environmental

| Number | Value | Source |
|---|---|---|
| Booth, small | 10′ × 10′, H 8 ft (2.4 m) | https://www.ibm.com/design/event/booths/models/small/ |
| Booth, small–medium | 10′ × 20′, H 12 ft (3.6 m) | same |
| Pole banner — finished vs design area | 24″ × 72″ finished (incl. 4″ pockets) → **21″ × 64″** design area | https://brandcenter.ufl.edu/banners-on-light-poles/ |
| Framed campus banner | 8′-0″ h × 4′-0″ w, printed both sides | https://brandguide.asu.edu/execution-guidelines/signage/exterior |
| Sponsor/partner recognition ceiling on a banner | 20% of the message | same |
| Fixed size ladder for a decal family | 1¼″, 2⅜″, 3⅛″, 5″, 7⅞″, 12⅝″, 20″, 30″ | NASA Graphics Standards Manual 1976, §9.1 |
| Clear space on a decal | three vertical stroke-widths of the logo, all sides | same |
| Zoom Events booth banner | 4000 × 710 px, max 20 MB | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068572 |

### …and from the vendors

**Retractable banner**

| Number | Value | Source |
|---|---|---|
| The US default size | **33 x 80 in** (also 47 x 80, 24 x 80–81) | https://4over.com/standard-retractable-banner-stands ; https://www.vistaprint.com/hub/retractable-banner-design |
| Premium tier | **36 x 92**, 48 x 92, 60 x 92 in | https://www.signs.com/retractable-banners/ |
| "79 in" is metric hardware, not a US standard | 85 x 200 cm = **33.5 x 78.7 in** | https://www.gotprint.com/resources/templates/retractable-banner-stands.html |
| Ordered vs **viewable** height | 24/33 x 81 → **77 in** visible; 36/48/60 x 92 → **88 in** visible | https://www.signs.com/retractable-banners/ |
| Where the 4 in goes | **1 in top bar + 3 in inside the base** | same |
| The safe allowance across all vendors | **6 in bottom, 0.5 in top** | https://s3cdn.orbus.com/media/forms/graphics-guidelines-orbus-canada.pdf ; https://smartpress.com/support/product-resources/retractable-banner-stand-graphics-guidelines |
| Bleed | 1 in all sides (Testrite) · 0.5 in (4over) · 0.125–0.25 in (Vistaprint) | E4, E6, E7 |
| Resolution at full size | **100 DPI** (Testrite) · 100–120 ppi (Orbus) · 150 (Vistaprint) · 200 (Signs.com) · 300 (4over, Vispronet) | E4, E2, E7, E3, E6, E8 |
| Where the mark goes | **5–10 in from the top edge**; lower third is the call to action | https://www.vistaprint.com/hub/retractable-banner-design |
| Headline type size, 80–92 in banner | **180–300 pt** (subhead/body 90–120 pt) | same |

**Backdrop / step-and-repeat**

| Number | Value | Source |
|---|---|---|
| Step-and-repeat standard sizes | 8 x 5, **8 x 8**, 8 x 10, 8 x 12 ft — all **8 ft tall** | https://www.printplace.com/blog/guide-to-step-and-repeat-banner-sizes/ |
| Subjects per size | 8 x 5 → 2–3; **8 x 8 → 4–5**; 8 x 10 → 7–8; 8 x 12 → up to 10 | same |
| Floor space an 8 x 8 needs | **12 x 10 ft** | same |
| Logo tile size | **8–10 in** on an 8 x 8; **10–12 in** on a 10 x 10 or larger; minimum 8–10 in either dimension | https://www.signs.com/step-and-repeat-design-ideal-logo-sizes-for-maximum-impact/ ; https://smartpress.com/offering/step-and-repeat-banners |
| Tile spacing | **one logo width**, checkerboard, four or five columns | https://www.signs.com/blog/designing-a-step-and-repeat-banner-signage-101/ |
| Safe inset on a 96 x 96 in field | **3 in** per edge (artboard 90 x 90) + 0.25 in bleed | same |
| 10 ft tension-fabric backwall, real size | **116.69 W x 92 H x 17.71 D in** — *not* 120 x 96 | https://www.orbusdisplays.com/products/formulate-s1-10-straight-fabric-backwall |
| 20 ft backwall | **235 W x 92 H in**, 2 in bleed all round | https://www.orbusdisplays.com/formulate-20-straight-fabric-backwall |
| Fabric bleed rule | **2 in on all sides** | https://s3cdn.orbus.com/media/forms/graphics-guidelines-orbus-canada.pdf |
| Large-format scale convention | 100 % up to 150 in at **75 dpi**; over 150 in work at **10 % scale at 750 dpi**; 2 in bleed | https://tectonics.com/guide-to-large-format-print-files/ |

**Table throw**

| Number | Value | Source |
|---|---|---|
| US trade-show tables | 6 ft = **72 x 30 x 29 in**; 8 ft = **96 x 30 x 29 in** | https://crestline.com/c/custom-trade-show-table-covers-everything-you-need-to-know ; https://premiertablelinens.com/default/print-table-throw.html |
| 4-sided throw, cut size | 6 ft **126.5 x 84 in**; 8 ft **150.5 x 84 in** | https://www.signs.com/table-covers/ |
| 3-sided (open-back) throw | 6 ft **126.5 x 60 in**; 8 ft **150.5 x 60 in** | same |
| Front panel, full dye-sub imprint | 6 ft **72 x 29 in**; 8 ft **96 x 29 in** | https://premiertablelinens.com/default/print-table-throw.html |
| Front panel, banded imprint | **50 x 17 in to 90 x 23 in** | https://crestline.com/c/custom-trade-show-table-covers-everything-you-need-to-know |
| Drop | **29 in** (front drop = table height) | same |
| Logo placement and legibility | **centred on the front panel**, legible from **10 ft** | https://classicexhibits.com/tradeshow-blog/2025/09/11/custom-tablecloths-for-trade-shows/ |

**Lanyard**

| Number | Value | Source |
|---|---|---|
| Widths published | 3/16, **1/2, 5/8, 3/4**, 7/8, 1 in — 5/8 and 3/4 called standard | https://www.4imprint.com/taggroup/93/lanyard-width ; https://imprint.com/custom-lanyards ; https://www.ilanyardmfg.com/lanyard-style-and-size/ |
| Standard length | **36 in** flat (real cut 35.5 in) | Imprint.com; Avon template |
| 5/8 in strap, imprint area | **1/2 in x 32 in**, with **1.5 in dead at each end** for the crimp | https://www.avonsecurityproducts.com/edit/files/custom_lanyards/templates_lanyards.pdf |
| 1 in strap, safe height | **20 mm** inside a 25 mm strap; file 31 x 890 mm (3 mm bleed per side) | https://www.stellarlanyards.com/files/resources/lanyard-1in.pdf |
| Screen print | **cannot bleed**; 1–3 spot colours; imprint up to 18.5 x 0.5 in | https://www.demprinting.com/files/subscribers/af3e4b82-54bf-4740-a821-83d59b081a8c/WebFiles/TemplatesPDF/Templates_Lanyards.pdf ; https://lanyardfactorydirect.com/printing-techniques-explained-screen-print-vs-dye-sublimation-vs-woven-lanyards/ |
| Dye-sublimation | the only method that carries a gradient; polyester only | same |
| Woven | *"Not suitable for photo-like artwork or gradients"*; small text softens | same |

**Event badge**

| Number | Value | Source |
|---|---|---|
| ISO/IEC 7810 ID-1 | **85.60 x 53.98 x 0.76 mm (3.370 x 2.125 x 0.030 in)**; corner radius 2.88–3.48 mm | https://cdn.standards.iteh.ai/samples/70483/16f04de1cda3494f9e12567b7d1aa541/ISO-IEC-7810-2019.pdf |
| CR80, the print-trade nominal | **3.375 x 2.125 in** (0.005 in wider than ISO) | https://expressbadging.com/id-badge-design-guidelines-2/ |
| CR80 live area / bleed area | **3.125 x 1.875 in** live; **3.625 x 2.375 in** bleed — 0.125 in each way | https://www.duracard.com/wp-content/uploads/sites/2/2023/09/Duracard-Design-Template-CR80-Card-Barcode.pdf |
| CR80 file at 300 / 600 dpi | **1013 x 638 px** (300 dpi) · **2085 x 1335 px** (600 dpi, incl. 0.05 in bleed) | https://instantcard.net/card-layout-and-artwork/ ; https://expressbadging.com/id-badge-design-guidelines-2/ |
| Conference badge inserts | **4 x 3 in** and **4.25 x 6 in** (Avery 5392 = 3 x 4 in, 6-up) | https://www.pcnametag.com/free-name-tag-templates/ ; https://www.avery.com/templates/5392 |
| **Slot punch dead zone** | **3/8 in (0.375 in) from the edge to the bottom of the slot** | https://instantcard.net/card-layout-and-artwork/ |
| Slot opening itself | **0.55–0.625 in wide x 0.15 in high** | https://expressbadging.com/id-badge-design-guidelines-2/ |

---

# 4. Open questions only a human can answer

**Q1 — Does "the gradient never goes on anything physical" survive an environment?**
IBM (B15 Finishes) treats layered gradients as a legitimate *material* in a physical booth. Our rule
as written would forbid a gradient-printed tension-fabric backdrop. Two defensible positions: (a)
keep the blanket rule, simplest to enforce, and the backdrop is a flat Navy field; (b) narrow it to
*decoration of an object* — a gradient may exist as a printed surface in an environment (backdrop,
step-and-repeat field), never as a mark's fill or a decoration on merchandise. This changes the
copy on both pages and should be decided before the pages are drawn.

**Q2 — Four apparel items, six tiles, one row.** The brief names hoodie, half-zip, polo and t-shirt.
At 1680 × 600 a six-tile row is the honest maximum. Which two of the nine items become caption text
rather than a tile? My proposal is t-shirt, mug and pen; a human should confirm, because "which
product photographs we own" may decide it instead.

**Q3 — Do we publish a placement inch, and from which landmark?** Two decisions, not one.
*(a)* Number or name? "Left chest" is safe and vendor-independent; "left chest, 3–4″ wide inside a
4 × 4″ box" is buildable and lands inside every published figure — SanMar's 4 × 4 maximum, ASU's
3.5–4.25 band, and the 3–4″ that six decorators agree on (C.4). *(b)* If we publish a vertical
number we must pick a datum: **7.5–9″ down the shoulder seam** (Stahls', Vistaprint) or **≈3″ down
from the collar edge** (Printful, RushOrderTees). They describe the same spot. Picking one, and
saying so, is the whole value. Marco's call — it is a commitment to a fabrication tolerance.

**Q3b — Do we write one "full back" number at all?** SanMar's own maxima are garment-specific: a tee
takes 20 × 14″, a hoodie only 14 × 14″, and a quarter-zip has no full-chest location. Any single
universal back figure in our book contradicts the supplier's published maximum for some garment we
show. Safer: publish the *proportion and the top edge* ("top edge 3–4″ below the collar on a tee,
5–6″ on a hoodie so the hood does not cover it") and let the area come from the blank.

**Q4 — Do we claim ® on merchandise?** Penn State (B16) requires trademark designations on marks
used on merchandise. Whether Audentra's marks are registered, and in which classes, is a legal fact
I cannot verify from outside. If they are, the merchandise page is where ® has to appear, and that
changes the artwork masters.

**Q5 — Teams Premium.** The org-wide Teams background upload is a **Teams Premium** feature (P5). If
our customers' IT departments are not on Premium, the Teams row on our page describes something
their staff cannot use, and the honest instruction becomes "attach the PNG and let people upload it
themselves" (which needs no licence and has no published dimensions). Someone should decide which
story the page tells.

**Q6 — Do we name a vendor?** Apple names Staples Promotional Products (B1); Harvard, Penn State,
Stanford, UF, UTK, UW–Madison all name a licensing programme or a licensed-vendor list. A gallery
chapter that names no supplier is unusual. Whether Audentra has one, and whether it belongs in the
book or in the asset library chapter, is a business decision.

**Q7 — The half-zip and the hoodie share a problem we have not decided.** A zip and a kangaroo
pocket both eat the chest field, which is why MIT publishes a separate 10″ cap for zippered
garments. Do we show the half-zip mark on the left chest (clears the zip) or centre-chest above the
pocket? The sources do not decide it; a physical sample does. (SanMar's own answer for a quarter-zip
is that there *is* no full-chest location — only LC and RC either side of the placket.)

**Q8 — Which banner size do we standardise on, and therefore which vendor family?** 33″ × 80″ is the
US default (4over, Vistaprint) but Signs.com sells 33″ × 81″ and Testrite 33″ × 84″, and each has a
different bleed. Publishing "33 × 80" quietly picks a supplier tier. Publishing "visible area 33″ ×
77″, mark in the top 10″, nothing below 6″ from the bottom edge" picks none — and works at all of
them. I recommend the second, but it is a procurement decision as much as a design one.

**Q9 — Do we ever do a step-and-repeat at all?** It is on the brief, and the honest finding is that
the two rules everyone believes about it — bottom-row height and "whole logos flanking the subject" —
are published by nobody (D.3). If we show one, the caption can carry only the citable parts: 8 × 8 ft,
8–10″ tiles, one tile-width gap, checkerboard, 3″ margin, 12 × 10 ft of floor. Whether we are willing
to put a photo-op wall in an enrollment platform's brand book at all is a positioning question.

**Q10 — Which Pantone pair do we publish for physical production?** Six vendors warn that CMYK cannot
match Pantone precisely and that uncoated, fluorescent and metallic series cannot be matched at all
(D.7). Our palette is defined in hex. Somebody has to decide the **solid coated** Pantone equivalents
for Navy and Purple — and the equivalent thread numbers if we want Buffalo-style specificity (B5
names Madeira, Isacord, Robison-Anton, Coats and Marathon numbers by hand). Neither is derivable from
a hex value; both need a physical proof.

---

## Patterns worth copying vs avoiding

Copy:

0. **Name the datum with every placement number.** The single most transferable finding in the whole
   apparel pass (C.4): 7.5–9″ and 3″ are the same placement measured from two different landmarks.
   Every decorator publishes a number; almost none publish which landmark it is measured from, and
   that is where a brand guideline earns its keep.
1. **The three-part caption — item · substrate · decoration + placement.** Apple's Examples page
   (B1) and NASA §9.2 (B2) both do it; it is what turns pictures into standards.
2. **Finished size vs live area, with the reason named.** UF's 24″ × 72″ / 21″ × 64″ / "4″ pocket"
   (B11) is the single most transferable idea in this whole file.
3. **State the failure mode and the escape hatch instead of a minimum size.** Buffalo (B5): change
   the logo, the product or the fabric. Cal Poly (B9): split the lockup, with approved layouts.
   This lets us keep "no published embroidery minimum" and still be useful.
4. **One-colour rules written as colour × substrate**, not as "use the mono file" — UTK (B6), UF
   (B10), Apple (B1).
5. **A fixed size ladder** rather than "scale as needed" — NASA's eight vinylcal sizes (B2).
6. **Say the machine limit as physics.** ASU's *"Due to current embroidery technology limitations…"*
   (B7) and MIT's *"does not reproduce well when scaled down to less than 2.5″"* (B4) read as facts,
   not preferences, and are therefore obeyed.
7. **One governance line per application page** — six of six sources have one.
8. **Publish the platform numbers.** Berkeley ships 13 Zoom backgrounds and publishes none (B19);
   the numbers are free and nobody else has them on the page.
9. **Publish the *visible* area, not the ordered size, for every environmental format** — and say
   the producer must fit it to the chosen vendor's template. "Standard size" is a fiction in this
   category: 33 × 80 (4over), 33 × 81 (Signs.com) and 33 × 84 (Testrite) are three artboards with
   three bleeds (D.2).
10. **Name the dead zones.** Retractable banner: bottom 6″, top 0.5″. CR80 badge: top 3/8″ under the
    slot. Lanyard: 1.5″ at each end for the crimp. All three are vendor-published, all three are
    invisible in a mockup, and all three are where a mark goes to die.

Avoid:

11. **The pure photo gallery with aphorisms.** GitHub (B14) is the best-looking and least usable
   merch page in the set: *"Clothes and materials should feel high quality, not mass manufactured"*
   is not a rule anyone can follow or check.
12. **The procedural punt.** Harvard's merchandise "chapter" (B13) is one page that says *contact
    the Trademark Program*; Stanford's Swag page (B17) says *contact Trademark Licensing*;
    UW–Madison (B18) lists nine item types and one dimension. All three exist to avoid saying
    anything.
13. **The substrate matrix at book scale.** St. John's (B12) is correct and unreadable — ten near-
    identical pages. Compress it to one line; it is a decision table, not a spread.
14. **Blending Microsoft's four different background products.** Meeting backgrounds, Rooms on
    Windows, Rooms on Android and panels each publish different minimums; quoting the wrong one is
    the easiest error on this page.
15. **A full-bleed photograph at 2.8 : 1.** The book's content band is 1680 × 600; a photograph
    stretched across it stops being an object and becomes a texture.
16. **A "banner" of rules above the gallery.** Per `CLAUDE.md` and `../references.md`, the sentence
    docks into the thing it is about — here, a `Kit / Callout` inside the content band and a caption
    under each tile, never a strip across the top.
