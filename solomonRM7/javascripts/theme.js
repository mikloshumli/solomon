/* Solomon v1.0.1 – Redmine 7 theme · GPL-2.0-or-later */
/* Theme script: color picker (gear + aside), pills, badges and login animations. */
(function () {
  // Language: from the Redmine <html lang=".."> attribute (hu = Hungarian, anything else = English)
  var HU = String(document.documentElement.lang || '').toLowerCase().indexOf('hu') === 0;
  var TXT = HU
    ? { picker: 'Téma színe', settings: 'Téma beállítások', close: 'Bezárás', signing: 'Bejelentkezés\u2026' }
    : { picker: 'Theme color', settings: 'Theme settings', close: 'Close', signing: 'Signing in\u2026' };

  // [id, Hungarian name, English name, color 1, color 2]
  var THEMES = [
    ['lila', 'Lila', 'Purple', '#667eea', '#764ba2'],
    ['narancs', 'Narancs', 'Orange', '#f7861f', '#d6381e'],
    ['piros', 'Piros', 'Red', '#ee4b52', '#a5113a'],
    ['kek', 'Kék', 'Blue', '#3b82f6', '#1e40af'],
    ['turkiz', 'Türkiz', 'Teal', '#14b8a6', '#0e6f68'],
    ['zold', 'Zöld', 'Green', '#22a85a', '#14633a'],
    ['rozsaszin', 'Rózsaszín', 'Pink', '#ec4899', '#a3145c'],
    ['indigo', 'Indigó', 'Indigo', '#5a4fe0', '#2a2478'],
    ['arany', 'Arany', 'Gold', '#e09b0a', '#a8500a'],
    ['grafit', 'Grafit', 'Graphite', '#64748b', '#1e293b']
  ];
  var KEY = 'om-theme';
  function getSaved() { try { return localStorage.getItem(KEY) || 'lila'; } catch (e) { return 'lila'; } }
  function apply(name) {
    var ok = THEMES.some(function (t) { return t[0] === name; });
    if (!ok) name = 'lila';
    if (name === 'lila') document.documentElement.removeAttribute('data-om-theme');
    else document.documentElement.setAttribute('data-om-theme', name);
    return name;
  }
  // right away, so the default color does not flash
  var current = apply(getSaved());

  var GEAR = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

  // Gear icon on the right + slide-in aside with the colors
  function mountPicker() {
    if (document.getElementById('om-aside')) return;

    var overlay = document.createElement('div');
    overlay.className = 'om-overlay';

    var gear = document.createElement('button');
    gear.type = 'button';
    gear.className = 'om-gear';
    gear.title = TXT.settings;
    gear.setAttribute('aria-label', TXT.settings);
    gear.setAttribute('aria-expanded', 'false');
    gear.innerHTML = GEAR;

    var aside = document.createElement('aside');
    aside.id = 'om-aside';
    aside.className = 'om-aside';
    aside.setAttribute('aria-label', TXT.settings);
    aside.setAttribute('aria-hidden', 'true');

    var head = document.createElement('div');
    head.className = 'om-aside-head';
    var h = document.createElement('h3');
    h.textContent = TXT.picker;
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'om-aside-close';
    close.setAttribute('aria-label', TXT.close);
    close.textContent = '\u00D7';
    head.appendChild(h);
    head.appendChild(close);

    var grid = document.createElement('div');
    grid.className = 'om-swatches';
    THEMES.forEach(function (th) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'om-swatch';
      b.setAttribute('data-theme', th[0]);
      b.setAttribute('aria-pressed', th[0] === current ? 'true' : 'false');
      b.style.setProperty('--sw1', th[3]);
      b.style.setProperty('--sw2', th[4]);
      var dot = document.createElement('span');
      dot.className = 'om-dot';
      var name = document.createElement('span');
      name.className = 'om-swname';
      name.textContent = HU ? th[1] : th[2];
      b.appendChild(dot);
      b.appendChild(name);
      b.addEventListener('click', function () {
        current = apply(th[0]);
        try { localStorage.setItem(KEY, current); } catch (e) {}
        var all = grid.querySelectorAll('.om-swatch');
        for (var i = 0; i < all.length; i++) {
          all[i].setAttribute('aria-pressed', all[i].getAttribute('data-theme') === current ? 'true' : 'false');
        }
      });
      grid.appendChild(b);
    });

    aside.appendChild(head);
    aside.appendChild(grid);

    function setOpen(open) {
      aside.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      gear.classList.toggle('open', open);
      gear.setAttribute('aria-expanded', open ? 'true' : 'false');
      aside.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    gear.addEventListener('click', function () { setOpen(!aside.classList.contains('open')); });
    close.addEventListener('click', function () { setOpen(false); });
    overlay.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    document.body.appendChild(overlay);
    document.body.appendChild(aside);
    document.body.appendChild(gear);
  }

  function statusClass(t) {
    t = t.toLowerCase();
    // Hungarian and English (Redmine default) status names
    if (t.indexOf('számláz') > -1 || t.indexOf('billed') > -1) return 'om-billed';
    if (t.indexOf('kész') > -1 || t.indexOf('lezárt') > -1 || t.indexOf('resolved') > -1 || t.indexOf('closed') > -1 || t.indexOf('done') > -1) return 'om-done';
    if (t.indexOf('folyamat') > -1 || t.indexOf('progress') > -1) return 'om-progress';
    if (t.indexOf('kiosztva') > -1 || t.indexOf('várakoz') > -1 || t.indexOf('új') === 0 ||
        t.indexOf('new') === 0 || t.indexOf('feedback') > -1 || t.indexOf('pending') > -1 ||
        t.indexOf('waiting') > -1 || t.indexOf('assigned') > -1) return 'om-waiting';
    return '';
  }
  function priorityClass(t, tr) {
    t = t.toLowerCase();
    // Hungarian and English (Redmine default) priority names
    if (t.indexOf('azonnal') > -1 || t.indexOf('immediate') > -1) return 'om-highest';
    if (t.indexOf('sürgős') > -1 || t.indexOf('urgent') > -1 || t.indexOf('magas') > -1 || t.indexOf('high') > -1) return 'om-high';
    if (t.indexOf('alacsony') > -1 || t.indexOf('low') > -1) return 'om-low';
    if (t.indexOf('normál') > -1 || t.indexOf('normal') > -1) return 'om-normal';
    var c = tr ? tr.className : '';
    if (/priority-highest/.test(c)) return 'om-highest';
    if (/priority-high/.test(c)) return 'om-high';
    if (/priority-low/.test(c)) return 'om-low';
    return 'om-normal';
  }
  function wrap(td, cls) {
    if (td.children.length || !cls && !td.textContent.trim()) return;
    var t = td.textContent.trim();
    if (!t) return;
    var s = document.createElement('span');
    s.className = 'om-pill ' + cls;
    s.textContent = t;
    td.textContent = '';
    td.appendChild(s);
  }
  // "(9)" at the end of block titles -> badge
  function counts() {
    var hs = document.querySelectorAll('div.mypage-box h3, #content h3');
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i], n = h.lastChild;
      while (n && n.nodeType === 3 && !n.nodeValue.trim()) n = n.previousSibling;
      if (!n || n.nodeType !== 3) continue;
      var m = /^\s*\((\d+)\)\s*$/.exec(n.nodeValue);
      if (!m) continue;
      var s = document.createElement('span');
      s.className = 'om-count';
      s.textContent = m[1];
      h.replaceChild(s, n);
    }
  }
  function run() {
    counts();
    var cells = document.querySelectorAll(
      'table.list td.status, table.list td.priority, ' +
      'div.issue div.status.attribute .value, div.issue div.priority.attribute .value');
    for (var i = 0; i < cells.length; i++) {
      var el = cells[i];
      if (el.querySelector('.om-pill')) continue;
      var isStatus = el.classList.contains('status') || (el.parentNode && el.parentNode.classList.contains('status'));
      if (isStatus) wrap(el, 'om-status ' + statusClass(el.textContent));
      else wrap(el, priorityClass(el.textContent, el.parentNode));
    }
  }

  var pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; run(); });
  }
  // Login page: the card tilts slightly with the mouse (3D)
  function loginTilt() {
    var card = document.getElementById('login-form');
    if (!card || !document.body.classList.contains('action-login')) return;
    if (!window.matchMedia) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    window.addEventListener('mousemove', function (e) {
      var x = e.clientX / window.innerWidth - 0.5;
      var y = e.clientY / window.innerHeight - 0.5;
      card.style.transform = 'perspective(800px) translate3d(' + (x * 24) + 'px,' + (y * 24) + 'px,0) rotateY(' + (x * 18) + 'deg) rotateX(' + (-y * 18) + 'deg)';
    });
    document.addEventListener('mouseleave', function () { card.style.transform = ''; });
  }

  // Login button: "signing in" label and pulse while submitting
  function loginSubmitState() {
    var card = document.getElementById('login-form');
    if (!card || !document.body.classList.contains('action-login')) return;
    var form = card.querySelector('form');
    var btn = card.querySelector('input[type="submit"]');
    if (!form || !btn) return;
    form.addEventListener('submit', function () {
      btn.classList.add('om-loading');
      btn.value = TXT.signing;
    });
  }

  function init() {
    mountPicker();
    loginTilt();
    loginSubmitState();
    run();
    if (window.MutationObserver) {
      new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
