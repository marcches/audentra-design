// Brand Identity Guidelines v3.1 — the page recipe for `use_figma`, revised 2026-08-22 after Marco's
// review of v3 ("too much text, one cadence, artifacts too small"). Paste the PRELUDE at the top of
// every call. Same foundations as v3 (variables, Book/* styles, paint styles); same page architecture
// (title 160, rule 296, band 340→960, 12-col grid, lead in column 1). What changed is the grammar:
//   • one artifact per page, at scale — it owns at least half the band
//   • a word budget: lead = one sentence; then one short paragraph OR ≤3 one-line rules; captions one line
//   • no callout except once per chapter; no ADR numbers or file paths in page copy
//   • eight constructions, each chapter uses ≥3: hero · canvas · grid · misuse · ladder · swatch wall · table · split
// ---------- PRELUDE -------------------------------------------------------------------------
const PAGE_ID = '128:1246';
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
for (const [f, s] of [['Inter','Bold'],['Inter','Semi Bold'],['Inter','Medium'],['Inter','Regular']]) await figma.loadFontAsync({ family: f, style: s });
const vars = {}; for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) vars[v.name] = v;
const tvars = {}; for (const v of await figma.variables.getLocalVariablesAsync('STRING')) tvars[v.name] = v;
const ts = {}; for (const s of await figma.getLocalTextStylesAsync()) ts[s.name] = s;
const ps = {}; for (const s of await figma.getLocalPaintStylesAsync()) ps[s.name] = s;
const rc = (v) => { let val = Object.values(v.valuesByMode)[0]; let g = 0; while (val && val.type === 'VARIABLE_ALIAS' && g++ < 8) { const t = Object.values(vars).find(x => x.id === val.id); val = t ? Object.values(t.valuesByMode)[0] : null; } return val && val.r !== undefined ? { r: val.r, g: val.g, b: val.b } : { r: 0, g: 0, b: 0 }; };
const paintOf = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rc(vars[n]) }, 'color', vars[n]);
const fill = (n, c) => { n.fills = [paintOf(c)]; return n; };
const text = (P, ch, st, fv, o = {}) => { const t = figma.createText(); t.textStyleId = ts[st].id; t.characters = ch; fill(t, fv || 'text/primary');
  if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; } else { t.textAutoResize = 'WIDTH_AND_HEIGHT'; }
  P.appendChild(t); if (P.layoutMode && P.layoutMode !== 'NONE' && o.w) t.layoutSizingHorizontal = 'FILL'; else { t.x = o.x || 0; t.y = o.y || 0; }
  if (o.align) t.textAlignHorizontal = o.align; if (o.name) t.name = o.name; if (o.opacity !== undefined) t.opacity = o.opacity; return t; };
const spec = (P, ch, size, style, fv, varName, o = {}) => { const t = figma.createText(); t.fontName = { family: o.family || 'Inter', style }; t.fontSize = size; t.lineHeight = { unit: 'PERCENT', value: o.lh || 115 }; if (o.track !== undefined) t.letterSpacing = { unit: 'PERCENT', value: o.track }; t.characters = ch; fill(t, fv || 'text/primary'); if (o.w) { t.resize(o.w, 10); t.textAutoResize = 'HEIGHT'; } else { t.textAutoResize = 'WIDTH_AND_HEIGHT'; } if (o.align) t.textAlignHorizontal = o.align; P.appendChild(t); if (!(P.layoutMode && P.layoutMode !== 'NONE')) { t.x = o.x || 0; t.y = o.y || 0; } else if (o.w) t.layoutSizingHorizontal = 'FILL'; if (varName && tvars[varName]) t.setBoundVariable('fontFamily', tvars[varName]); if (o.opacity !== undefined) t.opacity = o.opacity; if (o.name) t.name = o.name; return t; };
const H = (P, ch, size, fv, o = {}) => spec(P, ch, size, 'Bold', fv, 'font/heading', Object.assign({ lh: 104, track: -2 }, o)); // a Satoshi-bound headline at any size
const stack = (P, x, y, w, o = {}) => { const f = figma.createFrame(); f.name = o.name || 'Stack'; f.layoutMode = o.dir || 'VERTICAL'; f.clipsContent = false; f.resize(w, o.h || 100); if (f.layoutMode === 'VERTICAL') { f.primaryAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; f.counterAxisSizingMode = 'FIXED'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = o.h ? 'FIXED' : 'AUTO'; } f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = o.pad === undefined ? 0 : o.pad; if (o.padY !== undefined) f.paddingTop = f.paddingBottom = o.padY; if (o.padX !== undefined) f.paddingLeft = f.paddingRight = o.padX; f.itemSpacing = o.gap === undefined ? 16 : o.gap; f.cornerRadius = o.r === undefined ? 0 : o.r; if (o.fill) fill(f, o.fill); else f.fills = []; if (o.align) f.counterAxisAlignItems = o.align; if (o.justify) f.primaryAxisAlignItems = o.justify; P.appendChild(f); f.x = x; f.y = y; return f; };
const box = (P, x, y, w, h, fv, r) => { const f = figma.createFrame(); f.name = 'Box'; f.resize(w, h); f.clipsContent = true; f.cornerRadius = r === undefined ? 14 : r; if (fv) fill(f, fv); else f.fills = []; P.appendChild(f); f.x = x; f.y = y; return f; };
const grad = (P, x, y, w, h, deep, r) => { const f = box(P, x, y, w, h, null, r); f.fillStyleId = ps[deep ? 'Brand gradient / Deep' : 'Brand gradient'].id; return f; };
const rect = (P, x, y, w, h, fv, r = 0) => { const q = figma.createRectangle(); q.resize(w, h); if (fv) fill(q, fv); else q.fills = []; q.cornerRadius = r; P.appendChild(q); q.x = x; q.y = y; return q; };
const rule = (P, x, y, w, fv) => rect(P, x, y, w, 1, fv || 'line/default');
const inst = (P, id, x, y, scale) => { const c = figma.getNodeById(id); const i = c.createInstance(); P.appendChild(i); if (scale) i.rescale(scale); i.x = x; i.y = y; return i; };
const instW = (P, id, x, y, w) => { const c = figma.getNodeById(id); const i = c.createInstance(); P.appendChild(i); i.rescale(w / i.width); i.x = x; i.y = y; return i; };
const photo = (P, x, y, w, h, hash, r) => { const f = box(P, x, y, w, h, null, r); f.fills = [{ type: 'IMAGE', imageHash: hash, scaleMode: 'FILL' }]; return f; };
const dimH = (P, x, y, w, label, fv) => { const c = fv || 'text/secondary'; rect(P, x, y, w, 1, c); rect(P, x, y - 6, 1, 13, c); rect(P, x + w - 1, y - 6, 1, 13, c); const t = text(P, label, 'Book/Value small', c, {}); t.x = x + w / 2 - t.width / 2; t.y = y - t.height - 10; return t; };
const dimV = (P, x, y, h, label, fv) => { const c = fv || 'text/secondary'; rect(P, x, y, 1, h, c); rect(P, x - 6, y, 13, 1, c); rect(P, x - 6, y + h - 1, 13, 1, c); const t = text(P, label, 'Book/Value small', c, {}); t.x = x + 12; t.y = y + h / 2 - t.height / 2; return t; };
// clearBand(frame): keep chapter label, page number, title and the rule; remove everything else.
const clearBand = (f) => { for (const c of [...f.children]) { const keep = ['Chapter','Page number','Title'].includes(c.name) || (c.height === 1 && Math.round(c.y) === 296); if (!keep) c.remove(); } return f; };
const getPage = async (id) => { const f = await figma.getNodeByIdAsync(id); return clearBand(f); };
// lead(f, sentence, {body | rules}) — the page's words, column 1. One sentence in Book/Lead; then at most
// one short paragraph (Book/Body) or up to three one-line rules ([strong, line]). Returns the y it ended at.
const lead = (f, sentence, o = {}) => { const w = o.w || 544, x = o.x || 120; let y = o.y || 340; const dark = !!o.dark;
  const l = text(f, sentence, 'Book/Lead', dark ? 'text/on-dark' : 'text/secondary', { x, y, w, name: 'Lead' }); y += l.height + 28;
  if (o.body) { const b = text(f, o.body, 'Book/Body', dark ? 'text/on-dark' : 'text/primary', { x, y, w, name: 'Body' }); if (dark) b.opacity = 0.86; y += b.height + 28; }
  if (o.rules) { for (const [s, ln] of o.rules) { const a = text(f, s, 'Book/Body strong', dark ? 'text/on-dark' : 'text/primary', { x, y, w }); y += a.height + 4; const b = text(f, ln, 'Book/Body', dark ? 'text/on-dark' : 'text/secondary', { x, y, w }); y += b.height + 22; } }
  return y; };
const label = (P, ch, x, y, fv, o = {}) => text(P, ch.toUpperCase(), 'Book/Label', fv || 'text/secondary', Object.assign({ x, y }, o));
const cap = (P, ch, x, y, w, fv) => text(P, ch, 'Book/Caption', fv || 'text/secondary', { x, y, w });
// plate(P, x, y, w, rows, {dark, kw}) — a label plate: rows of [key, value] in Value small, key secondary.
const plate = (P, x, y, w, rows, o = {}) => { const s = stack(P, x, y, w, { gap: 6, name: 'Plate' }); for (const [k, v] of rows) { const r = stack(s, 0, 0, w, { dir: 'HORIZONTAL', gap: 12 }); text(r, k.toUpperCase(), 'Book/Value small', o.dark ? 'text/on-dark' : 'text/secondary', { w: o.kw || 96 }); text(r, v, 'Book/Value small', o.dark ? 'text/on-dark' : 'text/primary', { w: w - (o.kw || 96) - 12 }); } return s; };
// swatch(P, x, y, w, h, varName, {name, rows, r, dark, stroke, big, kw}) — a colour block with a plate under it.
const swatch = (P, x, y, w, h, fv, o = {}) => { const b = box(P, x, y, w, h, fv, o.r === undefined ? 14 : o.r); if (o.stroke) { b.strokes = [paintOf('line/default')]; b.strokeWeight = 1; b.strokeAlign = 'INSIDE'; } let yy = y + h + 18; if (o.name) { const n = text(P, o.name, o.big ? 'Book/H3' : 'Book/Body strong', o.dark ? 'text/on-dark' : 'text/primary', { x, y: yy, w }); yy += n.height + 10; } if (o.rows) plate(P, x, yy, w, o.rows, { dark: o.dark, kw: o.kw }); return b; };
const misuseTile = (P, x, y, w, h, caption, draw) => { const tile = stack(P, x, y, w, { gap: 12, name: 'Misuse' }); const demo = box(tile, 0, 0, w, h, 'surface/tile', 10); demo.layoutSizingVertical = 'FIXED'; if (draw) draw(demo); demo.strokes = [paintOf('text/secondary')]; demo.strokeWeight = 1; demo.strokeAlign = 'INSIDE'; const d = figma.createLine(); demo.appendChild(d); d.resize(Math.sqrt(w * w + h * h), 0); d.strokes = [paintOf('text/secondary')]; d.strokeWeight = 2; d.name = 'diagonal'; d.rotation = -Math.atan2(h, w) * 180 / Math.PI; d.x = 0; d.y = 0; text(tile, caption, 'Book/Caption', 'text/primary', { w }); return tile; };
// The grid: w(n) = 118n + 24(n−1); x(n) = 120 + 142(n−1). Field beside a 544 lead: x 688, w 1112 → 2×544 (688/1256) or 4×260 (688/972/1256/1540).
const X = { lead: 120, field: 688, c2: [688, 1256], c4: [688, 972, 1256, 1540], full3: [120, 688, 1256], full4: [120, 546, 972, 1398] };
// ---------- END PRELUDE ---------------------------------------------------------------------
// Logo components (Assets page): Primary (Full) Color|Reverse|White|Navy = 21:56 / 22:2 / 21:111 / 21:166 ·
// Logo Color|Reverse|White|Navy = 20:16 / 22:56 / 20:31 / 20:46 · Symbol Color|White|Navy = 20:53 / 20:60 / 20:67.
// Generated artwork: icon grid 155:659, weights 155:3465, sizes 155:3479, gallery 163:944 / 163:1258.
