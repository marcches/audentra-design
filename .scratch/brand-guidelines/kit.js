// Brand Guidelines v2 — the page recipe for `use_figma` (Figma Plugin API, run inside the
// Figma MCP). Paste the PRELUDE at the top of every call that builds pages, then use the
// helpers. Everything a page needs — canvas, chrome, type, colour — comes from the variables and
// styles created in the foundations pass (see build.md); a raw hex in a page is a bug, exactly
// as it is in the product. Not a module: `use_figma` runs plain scripts, so this file is copied,
// not imported.

// ---------- PRELUDE -------------------------------------------------------------------------
const PAGE_ID = '64:2';                       // Brand Guidelines v2
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
// Typography per ADR 0011: the Book/* styles are Satoshi (headings) + Inter (text, values); the MCP
// runtime cannot load Satoshi, so the heading styles resolve to Inter through the `font/heading`
// variable until it is set in Figma. Load Inter (and Geist only for product samples).
for (const [f, s] of [['Inter','Bold'],['Inter','Semi Bold'],['Inter','Medium'],['Inter','Regular'],['Geist','Regular']]) await figma.loadFontAsync({ family: f, style: s });
const vars = {}; for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) vars[v.name] = v;
const ts = {}; for (const s of await figma.getLocalTextStylesAsync()) ts[s.name] = s;
const ps = {}; for (const s of await figma.getLocalPaintStylesAsync()) ps[s.name] = s;
// The base paint carries the variable's resolved colour, not black: an instance override bound to the
// same variable as its main component rendered black when the base was black (page 27, 2026-08-22).
const resolveColor = (v) => { let val = Object.values(v.valuesByMode)[0]; let guard = 0; while (val && val.type === 'VARIABLE_ALIAS' && guard++ < 8) { const target = Object.values(vars).find(x => x.id === val.id); val = target ? Object.values(target.valuesByMode)[0] : null; } return val && val.r !== undefined ? { r: val.r, g: val.g, b: val.b } : { r: 0, g: 0, b: 0 }; };
const paintOf = name => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: resolveColor(vars[name]) }, 'color', vars[name]);
const fill = (node, name) => { node.fills = [paintOf(name)]; return node; };
const stroke = (node, name, w = 1) => { node.strokes = [paintOf(name)]; node.strokeWeight = w; return node; };
// text(parent, chars, styleName, fillVar, {x, y, w, align}) — w makes it wrap (HEIGHT auto-resize)
const text = (parent, chars, style, fillVar, o = {}) => {
  const t = figma.createText(); t.textStyleId = ts[style].id; t.characters = chars; fill(t, fillVar || 'text/primary');
  // resize FIRST, then HEIGHT: resize() resets a text node to fixed size, and a wrapped text left
  // that way is 10px tall — auto-layout stacks then overlap every line (bug of 2026-08-22, 31 nodes).
  if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; } else { t.textAutoResize = 'WIDTH_AND_HEIGHT'; }
  if (o.align) t.textAlignHorizontal = o.align;
  parent.appendChild(t);
  if (parent.layoutMode && parent.layoutMode !== 'NONE' && o.w) t.layoutSizingHorizontal = 'FILL'; else { t.x = o.x || 0; t.y = o.y || 0; }
  if (o.name) t.name = o.name; if (o.opacity !== undefined) t.opacity = o.opacity; return t;
};
// stack(parent, x, y, w, {dir, h, pad, gap, r, fill, align, name}) — an auto-layout container; children
// with `w` fill its width. Fixed height + align 'MAX' gives a bottom-anchored group (the cover).
// A HORIZONTAL stack hugs its height (counter axis AUTO) and keeps the width it was given; a VERTICAL one
// hugs its height (primary axis AUTO) unless `h` is set. Getting the axes crossed left rows 100px tall and
// clipped their children (2026-08-22, pages 06/07) — clipsContent is off for stacks for the same reason.
const stack = (parent, x, y, w, o = {}) => { const f = figma.createFrame(); f.name = o.name || 'Stack'; f.layoutMode = o.dir || 'VERTICAL'; f.clipsContent = false; f.resize(w, o.h || 100); if (f.layoutMode === 'VERTICAL') { f.primaryAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; f.counterAxisSizingMode = 'FIXED'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; } const p = o.pad === undefined ? 32 : o.pad; f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = p; f.itemSpacing = o.gap === undefined ? 16 : o.gap; f.cornerRadius = o.r === undefined ? 18 : o.r; if (o.fill) fill(f, o.fill); else f.fills = []; if (o.align) f.primaryAxisAlignItems = o.align; parent.appendChild(f); f.x = x; f.y = y; return f; };
// divider(index, number, name, label, title, lead, pages) — a chapter opener on Navy with the chapter's page list at right.
const divider = (index, number, name, label, title, lead, pages) => { const f = makePage(index, number, name, { canvas: 'navy', chapter: label }); text(f, title, 'Book/Display', 'text/on-dark', { x: 120, y: 400, w: 1400, name: 'Title' }); text(f, lead, 'Book/Lead', 'text/on-dark', { x: 120, y: 530, w: 1000, name: 'Lead', opacity: 0.85 }); const list = stack(f, 1200, 400, 600, { pad: 0, gap: 12, r: 0, name: 'In this chapter' }); pages.forEach(p => text(list, p, 'Book/Body', 'text/on-dark', { w: 600, opacity: 0.85 })); return f; };
const rect = (parent, x, y, w, h, fillVar, r = 0) => { const q = figma.createRectangle(); q.resize(w, h); if (fillVar) fill(q, fillVar); else q.fills = []; q.cornerRadius = r; parent.appendChild(q); q.x = x; q.y = y; return q; };
const rule = (parent, x, y, w) => rect(parent, x, y, w, 1, 'line/default');
// glyph(parent, pathD, size, fillVar, x, y) — a Phosphor path on the 256 viewBox (from src/design-system/icon-paths.js)
const glyph = (parent, d, size, fillVar, x, y) => { const g = figma.createNodeFromSvg(`<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`); g.resize(size, size); g.findAll(n => n.type === 'VECTOR').forEach(v => { fill(v, fillVar); v.strokes = []; }); parent.appendChild(g); g.x = x; g.y = y; g.name = 'glyph'; return g; };
const inst = (parent, compId, x, y, scale) => { const c = figma.getNodeById(compId); const i = c.createInstance(); parent.appendChild(i); if (scale) i.rescale(scale); i.x = x; i.y = y; return i; };
// makePage(index, number, name, {chapter, title, lead, canvas:'paper'|'navy'|'gradient'|'deep'})
// index = position in the book from 0 (drives the grid); number = the printed page number.
const makePage = (index, number, name, o = {}) => {
  const f = figma.createFrame(); f.name = name; f.resize(1920, 1080); f.clipsContent = true;
  f.x = (index % 6) * 2080; f.y = Math.floor(index / 6) * 1320; page.appendChild(f);
  const canvas = o.canvas || 'paper';
  if (canvas === 'paper') fill(f, 'canvas/paper'); else if (canvas === 'navy') fill(f, 'canvas/navy');
  else f.fillStyleId = ps[canvas === 'deep' ? 'Brand gradient / Deep' : 'Brand gradient'].id;
  const dark = canvas !== 'paper';
  const ink = dark ? 'text/on-dark' : 'text/primary', sub = dark ? 'text/on-dark' : 'text/secondary';
  if (o.chapter) text(f, o.chapter, 'Book/Label', sub, { x: 120, y: 96, name: 'Chapter' });
  if (number !== null && number !== undefined) { const n = text(f, String(number).padStart(2, '0'), 'Book/Page number', sub, { name: 'Page number' }); n.x = 1800 - n.width; n.y = 96; }
  if (o.title) text(f, o.title, 'Book/H1', ink, { x: 120, y: 160, w: 1400, name: 'Title' });
  if (o.lead) text(f, o.lead, 'Book/Lead', sub, { x: 120, y: 250, w: 1000, name: 'Lead' });
  return f;
};
// ---------- END PRELUDE ---------------------------------------------------------------------

// Conventions the helpers assume (see build.md → "The page grid"):
//   margins 120 / 96 / 120; content from y 360 to 960; tiles radius 18, nested 12; lines 1px line/default;
//   every page frame is `NN Title`, placed by index, and returns its id in the call's return value.
// Kit components (page "Brand Guidelines v2 — Kit"): Kit / Do-Don't (Kind=Do|Don't), Kit / Swatch,
//   Kit / Callout — instance them with inst() and edit their TEXT children by name ("Body", "Name", "Value").
