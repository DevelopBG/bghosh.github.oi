(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b0f17');
  }
  applyTheme(root.getAttribute('data-theme'));
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  navLinks.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* ---------- Nav border + back-to-top on scroll ---------- */
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('to-top');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------- Scroll-spy ---------- */
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        var active = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute('href'));
    if (sec) spy.observe(sec);
  });

  /* ---------- Reveal on scroll + stat count-up ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion || !target) return;
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });

  /* ---------- Typed tagline ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var text = typed.getAttribute('data-text');
    if (reduceMotion) {
      typed.textContent = text;
    } else {
      var i = 0;
      (function type() {
        typed.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(type, 45 + Math.random() * 45);
      })();
    }
  }

  /* ---------- Hero canvas: drifting nodes with links ---------- */
  var canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var nodes = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), raf = null, visible = true;

    function accent() {
      return getComputedStyle(root).getPropertyValue('--accent').trim() || '#22d3ee';
    }
    function hexToRgb(hex) {
      var m = hex.replace('#', '');
      if (m.length === 3) m = m.split('').map(function (c) { return c + c; }).join('');
      var n = parseInt(m, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(90, (w * h) / 16000));
      nodes = [];
      for (var k = 0; k < count; k++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
      }
    }

    function draw() {
      var rgb = hexToRgb(accent());
      var col = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',';
      ctx.clearRect(0, 0, w, h);
      var maxD = 130;
      for (var a = 0; a < nodes.length; a++) {
        var p = nodes[a];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (var b = a + 1; b < nodes.length; b++) {
          var q = nodes[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = col + (0.16 * (1 - d / maxD)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = col + '0.55)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
    }

    resize(); draw();
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); if (reduceMotion) draw(); }, 150);
    });
    themeBtn.addEventListener('click', function () { if (reduceMotion) draw(); });

    // Pause animation when hero is off-screen
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !reduceMotion) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    }).observe(canvas);
  }

  /* ---------- Project modals ---------- */
  var lastTrigger = null;
  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dlg = document.getElementById(btn.getAttribute('data-modal'));
      if (!dlg) return;
      lastTrigger = btn;
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
      dlg.querySelector('.modal-body').scrollTop = 0;
    });
  });
  document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    function close() { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }
    dlg.querySelector('.modal-close').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); }); // backdrop
    dlg.addEventListener('close', function () {
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    });
  });

  /* ---------- Lightbox for figures ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.modal-body img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      // Lightbox must sit above the modal's top layer
      var dlg = img.closest('dialog');
      if (dlg) dlg.appendChild(lightbox);
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.appendChild(lightbox);
  }
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    }
  }, true);

  /* ---------- Publication filters ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var pubs = document.querySelectorAll('.pub');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      pubs.forEach(function (p) {
        p.classList.toggle('hidden', f !== 'all' && p.getAttribute('data-cat') !== f);
      });
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
