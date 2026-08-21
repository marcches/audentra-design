/* The board's behaviour: render the vendored icons, switch the direction in
   place, go full screen and back, keep the choice in the URL. Nothing here
   knows what a direction looks like. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var WEIGHTS = ['regular', 'bold', 'fill', 'duotone'];
  var ICONS = window.PHOSPHOR || {};

  // <i data-icon="phone" class="…"> → <svg class="ic …"> carrying every weight;
  // the stylesheet decides which one shows.
  function renderIcon(el) {
    var name = el.getAttribute('data-icon');
    var def = ICONS[name];
    if (!def) { console.warn('icon missing from js/icons.js:', name); return; }
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 256 256');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', ('ic ' + (el.getAttribute('class') || '')).trim());
    WEIGHTS.forEach(function (w) {
      if (!def[w]) return;
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'w-' + w);
      def[w].forEach(function (d, i) {
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', d);
        p.setAttribute('fill', 'currentColor');
        if (w === 'duotone' && i === 0) p.setAttribute('opacity', '.2');
        g.appendChild(p);
      });
      svg.appendChild(g);
    });
    el.parentNode.replaceChild(svg, el);
  }
  Array.prototype.slice.call(document.querySelectorAll('i[data-icon]')).forEach(renderIcon);

  // ── state ────────────────────────────────────────────────────────────────
  var DIRS = ['a', 'b', 'c'];
  var NAMES = { a: 'A · Faithful to the reference', b: 'B · The student’s family', c: 'C · Editorial' };
  var SCREENS = ['task', 'brew'];   // `brew` is reachable only by URL (?s=brew); the board shows the task.

  var state = { d: 'a', s: 'task' };
  (function readUrl() {
    var p = new URLSearchParams(location.search);
    if (DIRS.indexOf(p.get('d')) >= 0) state.d = p.get('d');
    if (SCREENS.indexOf(p.get('s')) >= 0) state.s = p.get('s');
    state.full = p.get('full') === '1';
  })();

  var screens = {};
  SCREENS.forEach(function (s) { screens[s] = document.querySelector('.frame > .screen[data-screen="' + s + '"]'); });
  var dirButtons = Array.prototype.slice.call(document.querySelectorAll('.switcher [data-dir]'));
  var fullButton = document.querySelector('.switcher [data-action="full"]');

  function writeUrl() {
    var p = new URLSearchParams();
    p.set('d', state.d);
    if (state.s !== 'task') p.set('s', state.s);
    if (isFull()) p.set('full', '1');
    try { history.replaceState(null, '', location.pathname + '?' + p.toString()); } catch (e) { /* file:// in some browsers */ }
  }

  function apply() {
    SCREENS.forEach(function (s) {
      var el = screens[s];
      if (!el) return;
      el.setAttribute('data-direction', state.d);
      if (s === state.s) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
    });
    dirButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-dir') === state.d)); });
    document.title = NAMES[state.d] + ' — Staff portal';
    writeUrl();
  }

  // ── full screen ──────────────────────────────────────────────────────────
  // Two layers: the board drops its stage and the screen becomes the window
  // (always), and the browser goes full screen too when it lets us (a user
  // gesture on file:// is enough in Chrome and Edge). Esc leaves both.
  function setFull(on) {
    document.body.classList.toggle('is-full', on);
    fullButton.setAttribute('aria-pressed', String(on));
    fullButton.setAttribute('aria-label', on ? 'Leave full screen' : 'Full screen');
    writeUrl();
    if (on) {
      window.scrollTo(0, 0);
      var el = document.documentElement;
      var req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req && !document.fullscreenElement) { try { req.call(el).catch(function () {}); } catch (e) { /* denied */ } }
    } else if (document.fullscreenElement) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) { try { exit.call(document).catch(function () {}); } catch (e) { /* ignore */ } }
    }
  }
  function isFull() { return document.body.classList.contains('is-full'); }
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && isFull()) setFull(false);
  });

  dirButtons.forEach(function (b) { b.addEventListener('click', function () { state.d = b.getAttribute('data-dir'); apply(); }); });
  fullButton.addEventListener('click', function () { setFull(!isFull()); });

  document.addEventListener('keydown', function (e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === '1' || k === '2' || k === '3') { state.d = DIRS[Number(k) - 1]; apply(); }
    else if (k === 'f' || k === 'F') { setFull(!isFull()); }
    else if (k === 'Escape' && isFull() && !document.fullscreenElement) { setFull(false); }
    else return;
    e.preventDefault();
  });

  apply();
  if (state.full) setFull(true);   // the stage is dropped; the browser's own full screen needs a gesture
})();
