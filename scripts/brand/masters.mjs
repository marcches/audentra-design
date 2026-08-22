/**
 * The brand's asset library, generated from the three drawn masters in `docs/brand/`.
 *
 * There is one drawing of each mark and it is the Color master; every other master is that
 * drawing with its fills rewritten. Generating them means the library can never drift from the
 * artwork — a change to `symbol.svg` reaches all eleven files with `npm run masters`.
 *
 * Names follow the pattern the book publishes: aud_[asset]_[mode]_[color].[ext]
 *   asset  full · logo · symbol      mode  pos · rev · navy · white      color  4c · 1c
 * The scale lives in the directory, never in the name: a master is replaced, never numbered.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, sep as SEP } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = join(root, 'docs', 'brand', 'assets');

// Every hex the drawings carry. Purple, Blue, Teal and Teal 700 draw the Symbol; Navy draws the
// wordmark and the tagline, which is why Reverse only has to touch that one.
const PURPLE = '#6a38ff', BLUE = '#1e5bff', TEAL = '#02cdc7', TEAL700 = '#04b2a9';
const NAVY = '#0a1f44', WHITE = '#ffffff';
const ALL = [PURPLE, BLUE, TEAL, TEAL700, NAVY];

const recolor = (svg, mode) => {
  if (mode === 'pos') return svg;
  const to = mode === 'navy' ? NAVY : WHITE;
  const from = mode === 'rev' ? [NAVY] : ALL;   // Reverse saves the Symbol and reverses the word
  let s = svg;
  for (const hex of from) s = s.split(hex).join(to).split(hex.toUpperCase()).join(to);
  return s;
};

const SOURCES = { full: 'logo-full.svg', logo: 'logo.svg', symbol: 'symbol.svg' };
// The Symbol has no wordmark, so it has no Reverse master — Reverse exists to save a wordmark.
const MASTERS = [
  ['full', 'pos', '4c'], ['full', 'rev', '4c'], ['full', 'white', '1c'], ['full', 'navy', '1c'],
  ['logo', 'pos', '4c'], ['logo', 'rev', '4c'], ['logo', 'white', '1c'], ['logo', 'navy', '1c'],
  ['symbol', 'pos', '4c'], ['symbol', 'white', '1c'], ['symbol', 'navy', '1c'],
];

const viewBox = (svg) => svg.match(/viewBox="0 0 ([0-9.]+) ([0-9.]+)"/).slice(1).map(Number);

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'svg'), { recursive: true });
for (const s of ['1x', '2x', '3x']) mkdirSync(join(out, 'png', s), { recursive: true });

const made = [];
for (const [asset, mode, color] of MASTERS) {
  const src = readFileSync(join(root, 'docs', 'brand', SOURCES[asset]), 'utf8');
  const name = `aud_${asset}_${mode}_${color}`;
  const svg = recolor(src, mode);
  writeFileSync(join(out, 'svg', `${name}.svg`), svg);
  made.push({ name, svg, box: viewBox(src) });
}
console.log(`${made.length} SVG masters in docs/brand/assets/svg`);

// Raster: headless Chrome, transparent ground, the master's own proportions at 1x, 2x and 3x.
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const tmp = join(out, 'tmp-render');
mkdirSync(tmp, { recursive: true });
const page = join(tmp, 'page.html');
const pageUrl = 'file:///' + page.split(SEP).join('/');
let pngs = 0;
for (const { name, svg, box } of made) {
  for (const [scale, label] of [[1, '1x'], [2, '2x'], [3, '3x']]) {
    const w = Math.round(box[0] * scale), h = Math.round(box[1] * scale);
    const body = svg.replace(/<\?xml[^>]*\?>/, '');
    writeFileSync(page, `<!doctype html><meta charset=utf-8><style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style>${body}`);
    execFileSync(CHROME, [
      '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--default-background-color=00000000', `--window-size=${w},${h}`,
      `--screenshot=${join(out, 'png', label, `${name}.png`)}`, pageUrl,
    ], { stdio: 'pipe' });
    pngs++;
  }
}
rmSync(tmp, { recursive: true, force: true });
console.log(`${pngs} PNG exports in docs/brand/assets/png/{1x,2x,3x}`);
