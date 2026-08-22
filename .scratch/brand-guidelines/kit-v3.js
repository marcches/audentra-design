// Brand Identity Guidelines v3 — the page recipe for `use_figma`. Paste the PRELUDE at the top of
// every call that builds pages. Everything a page needs comes from the variables, text styles and
// paint styles created in the v2 foundations pass and reused unchanged (see build-v3.md); a raw hex
// in a page is a bug, exactly as it is in the product. Not a module: `use_figma` runs plain
// scripts, so this file is copied, not imported.

// ---------- PRELUDE -------------------------------------------------------------------------
const PAGE_ID = '128:1246';                   // Brand Guidelines v3
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
// The MCP runtime loads Google Fonts only, so Satoshi is unavailable and every heading resolves to
// Inter through the `font/heading` variable until someone sets it in Figma. Load what will render.
for (const [f, s] of [['Inter','Bold'],['Inter','Semi Bold'],['Inter','Medium'],['Inter','Regular']]) await figma.loadFontAsync({ family: f, style: s });
const vars = {}; for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) vars[v.name] = v;
const tvars = {}; for (const v of await figma.variables.getLocalVariablesAsync('STRING')) tvars[v.name] = v;
const ts = {}; for (const s of await figma.getLocalTextStylesAsync()) ts[s.name] = s;
const ps = {}; for (const s of await figma.getLocalPaintStylesAsync()) ps[s.name] = s;
// The base paint carries the variable's resolved colour, not black: an instance override bound to
// the same variable as its main component rendered black when the base was black (v2, page 27).
const rc = (v) => { let val = Object.values(v.valuesByMode)[0]; let g = 0; while (val && val.type === 'VARIABLE_ALIAS' && g++ < 8) { const t = Object.values(vars).find(x => x.id === val.id); val = t ? Object.values(t.valuesByMode)[0] : null; } return val && val.r !== undefined ? { r: val.r, g: val.g, b: val.b } : { r: 0, g: 0, b: 0 }; };
const paintOf = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rc(vars[n]) }, 'color', vars[n]);
const fill = (n, c) => { n.fills = [paintOf(c)]; return n; };
// text(parent, chars, styleName, fillVar, {x, y, w, name, opacity}) — w makes it wrap
const text = (P, ch, st, fv, o = {}) => { const t = figma.createText(); t.textStyleId = ts[st].id; t.characters = ch; fill(t, fv || 'text/primary');
  // resize FIRST, then HEIGHT: resize() resets a text node to fixed size, and a wrapped text left
  // that way is 10 px tall — auto-layout stacks then overlap every line (v2, 31 nodes).
  if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; } else { t.textAutoResize = 'WIDTH_AND_HEIGHT'; }
  P.appendChild(t); if (P.layoutMode && P.layoutMode !== 'NONE' && o.w) t.layoutSizingHorizontal = 'FILL'; else { t.x = o.x || 0; t.y = o.y || 0; }
  if (o.name) t.name = o.name; if (o.opacity !== undefined) t.opacity = o.opacity; return t; };
// spec(parent, chars, size, style, fillVar, fontVarName, opts) — a specimen at an explicit size,
// with its family bound so the Satoshi flip reaches it even though it carries no text style.
const spec = (P, ch, size, style, fv, varName, o = {}) => { const t = figma.createText(); t.fontName = { family: o.family || 'Inter', style }; t.fontSize = size; t.lineHeight = { unit: 'PERCENT', value: o.lh || 115 }; if (o.track) t.letterSpacing = { unit: 'PERCENT', value: o.track }; t.characters = ch; fill(t, fv || 'text/primary'); if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; } else { t.textAutoResize = 'WIDTH_AND_HEIGHT'; } if (o.align) t.textAlignHorizontal = o.align; P.appendChild(t); if (!(P.layoutMode && P.layoutMode !== 'NONE')) { t.x = o.x || 0; t.y = o.y || 0; } if (varName && tvars[varName]) t.setBoundVariable('fontFamily', tvars[varName]); return t; };
// stack(parent, x, y, w, {dir, h, pad, padY, gap, r, fill, name}) — an auto-layout container.
// A HORIZONTAL stack hugs its height and keeps the width it was given; a VERTICAL one hugs its
// height unless `h` is set. Getting the axes crossed left rows 100 px tall and clipped their
// children (v2, pages 06/07) — clipsContent is off for stacks for the same reason.
const stack = (P, x, y, w, o = {}) => { const f = figma.createFrame(); f.name = o.name || 'Stack'; f.layoutMode = o.dir || 'VERTICAL'; f.clipsContent = false; f.resize(w, o.h || 100); if (f.layoutMode === 'VERTICAL') { f.primaryAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; f.counterAxisSizingMode = 'FIXED'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; } f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = o.pad === undefined ? 0 : o.pad; if (o.padY !== undefined) f.paddingTop = f.paddingBottom = o.padY; f.itemSpacing = o.gap === undefined ? 16 : o.gap; f.cornerRadius = o.r === undefined ? 0 : o.r; if (o.fill) fill(f, o.fill); else f.fills = []; P.appendChild(f); f.x = x; f.y = y; return f; };
const box = (P, x, y, w, h, fv, r) => { const f = figma.createFrame(); f.name = 'Box'; f.resize(w, h); f.clipsContent = true; f.cornerRadius = r === undefined ? 12 : r; if (fv) fill(f, fv); else f.fills = []; P.appendChild(f); f.x = x; f.y = y; return f; };
const grad = (P, x, y, w, h, deep, r) => { const f = box(P, x, y, w, h, null, r); f.fillStyleId = ps[deep ? 'Brand gradient / Deep' : 'Brand gradient'].id; return f; };
const rect = (P, x, y, w, h, fv, r = 0) => { const q = figma.createRectangle(); q.resize(w, h); if (fv) fill(q, fv); else q.fills = []; q.cornerRadius = r; P.appendChild(q); q.x = x; q.y = y; return q; };
const rule = (P, x, y, w) => rect(P, x, y, w, 1, 'line/default');
const inst = (P, id, x, y, scale) => { const c = figma.getNodeById(id); const i = c.createInstance(); P.appendChild(i); if (scale) i.rescale(scale); i.x = x; i.y = y; return i; };
// dimension marks: a line with two ticks and a label. Two per diagram, three on a lockup.
const dimH = (P, x, y, w, label) => { rect(P, x, y, w, 1, 'text/secondary'); rect(P, x, y - 6, 1, 13, 'text/secondary'); rect(P, x + w - 1, y - 6, 1, 13, 'text/secondary'); const t = text(P, label, 'Book/Value small', 'text/secondary', {}); t.x = x + w / 2 - t.width / 2; t.y = y - t.height - 10; return t; };
const dimV = (P, x, y, h, label) => { rect(P, x, y, 1, h, 'text/secondary'); rect(P, x - 6, y, 13, 1, 'text/secondary'); rect(P, x - 6, y + h - 1, 13, 1, 'text/secondary'); const t = text(P, label, 'Book/Value small', 'text/secondary', {}); t.x = x + 12; t.y = y + h / 2 - t.height / 2; return t; };
// makePage(n, name, {chapter, title, sub, canvas}) — n is the printed page number AND the position.
const makePage = (n, name, o = {}) => {
  const i = n - 1;
  const f = figma.createFrame(); f.name = name; f.resize(1920, 1080); f.clipsContent = true;
  f.x = (i % 6) * 2080; f.y = Math.floor(i / 6) * 1320; page.appendChild(f);
  const c = o.canvas || 'paper';
  if (c === 'paper') fill(f, 'canvas/paper'); else if (c === 'navy') fill(f, 'canvas/navy');
  else f.fillStyleId = ps[c === 'deep' ? 'Brand gradient / Deep' : 'Brand gradient'].id;
  const dark = c !== 'paper';
  const ink = dark ? 'text/on-dark' : 'text/primary', sub = dark ? 'text/on-dark' : 'text/secondary';
  if (o.chapter) text(f, o.chapter, 'Book/Label', sub, { x: 120, y: 96, name: 'Chapter', opacity: dark ? 0.72 : 1 });
  const num = text(f, String(n).padStart(2, '0'), 'Book/Page number', sub, { name: 'Page number', opacity: dark ? 0.72 : 1 });
  num.x = 1800 - num.width; num.y = 96;
  if (o.title) text(f, o.title, 'Book/H1', ink, { x: 120, y: 160, w: 1396, name: 'Title' });
  if (o.sub) text(f, o.sub, 'Book/Body', sub, { x: 120, y: 236, w: 1112, name: 'Lead' });   // template D only
  if (!dark) rule(f, 120, 296, 1680);
  return f;
};
// divider(n, chapterNumber, title, supportLine, pages) — the chapter opener, one shape, twelve times.
const divider = (n, ch, title, line, pages) => {
  const f = makePage(n, `${String(n).padStart(2, '0')} Section ${ch} ${title}`, { canvas: 'navy', chapter: `CHAPTER ${ch}` });
  text(f, ch, 'Book/Display', 'text/on-dark', { x: 120, y: 560, name: 'Number', opacity: 0.32 });
  text(f, title, 'Book/Display', 'text/on-dark', { x: 120, y: 684, w: 1000, name: 'Title' });
  text(f, line, 'Book/Lead', 'text/on-dark', { x: 120, y: 846, w: 900, name: 'Lead', opacity: 0.82 });
  const l = stack(f, 1256, 560, 544, { gap: 14, name: 'In this chapter' });
  text(l, 'IN THIS CHAPTER', 'Book/Label', 'text/on-dark', { w: 544, opacity: 0.6 });
  for (const p of pages) text(l, p, 'Book/Body', 'text/on-dark', { w: 544, opacity: 0.9 });
  return f;
};
// misuseTile(page, x, y, w, h, caption, draw) — template D's tile: a specimen, a hairline diagonal
// corner to corner at 2 px, a 1 px outline, and a caption that begins "Don't". Never a wide band:
// the reader has to be able to see the violation (research-v3/layout-and-templates.md §a.5).
const misuseTile = (P, x, y, w, h, caption, draw) => {
  const tile = stack(P, x, y, w, { gap: 12, name: 'Misuse' });
  const demo = box(tile, 0, 0, w, h, 'surface/tile', 10); demo.layoutSizingVertical = 'FIXED';
  if (draw) draw(demo);
  demo.strokes = [paintOf('text/secondary')]; demo.strokeWeight = 1; demo.strokeAlign = 'INSIDE';
  const d = figma.createLine(); demo.appendChild(d); d.resize(Math.sqrt(w * w + h * h), 0);
  d.strokes = [paintOf('text/secondary')]; d.strokeWeight = 2; d.name = 'diagonal';
  d.rotation = -Math.atan2(h, w) * 180 / Math.PI; d.x = 0; d.y = 0;
  text(tile, caption, 'Book/Caption', 'text/primary', { w });
  return tile;
};
// ---------- END PRELUDE ---------------------------------------------------------------------

// The grid, in one formula: w(n) = 118n + 24(n−1), x(n) = 120 + 142(n−1).
const COLS = { 1: [[120, 1680]], 2: [[120, 828], [972, 828]], 3: [[120, 544], [688, 544], [1256, 544]],
               4: [[120, 402], [546, 402], [972, 402], [1398, 402]] };
const SUB8 = { 2: [[688, 544], [1256, 544]], 4: [[688, 260], [972, 260], [1256, 260], [1540, 260]] };  // inside the field beside a 544 lead

// Conventions the helpers assume (see build-v3.md → "The page architecture"):
//   margins 120 / 96 / 120; title y 160; rule y 296; content band y 340 → 960.
//   The lead is column 1. Tiles radius 14, nested 10; lines 1 px line/default.
//   Table values are Book/Caption once a table passes four rows — Book/Body at 20 px overflows.
//   text/tertiary (Slate) is never text on a paper canvas: 2.5:1 on white fails AA.
//   Every frame is `NN Title`, placed by its own page number.
// Logo components (Assets page): Primary (Full) Color|Reverse|White|Navy = 21:56 / 22:2 / 21:111 /
//   21:166 · Logo Color|Reverse|White|Navy = 20:16 / 22:56 / 20:31 / 20:46 · Symbol Color|White|Navy
//   = 20:53 / 20:60 / 20:67. Generated artwork: icon grid 155:659, icon weights 155:3465, icon
//   sizes 155:3479, gallery silhouettes 163:944 (merch) and 163:1258 (environmental).
