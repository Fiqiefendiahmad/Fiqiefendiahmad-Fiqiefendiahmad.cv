/* site.js — shared CV site integrations: Umami analytics + FIQI chat widget.
 * Setup: set UMAMI_WEBSITE_ID (from https://cv.sadeyan.my.id/stats dashboard → Add website)
 * and CHAT_WORKER_URL (after `npm run deploy` in /home/ubuntu/projects/live-chat-widget).
 * Leave CHAT_WORKER_URL empty to run analytics-only until the worker is deployed.
 */
(function () {
  'use strict';

  var UMAMI_SRC = 'https://cv.sadeyan.my.id/stats/umami.js';
  var UMAMI_WEBSITE_ID = '9f374505-8bf0-412f-95ef-e747a827ed1d';
  var CHAT_WORKER_URL = 'https://chat.sadeyan.my.id'; // fiqi-chat worker (live)

  function loadScript(src, attrs, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) s.setAttribute(k, attrs[k]);
      }
    }
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  }

  // 1. Umami (cookieless, privacy-friendly). Skip when ID not configured yet.
  if (UMAMI_WEBSITE_ID) {
    loadScript(UMAMI_SRC, { 'data-website-id': UMAMI_WEBSITE_ID }, bindEvents);
  }

  // 2. FIQI floating chat (js/chat.js). Loads on every page; talks to the
  // worker when CHAT_WORKER_URL is set, WhatsApp fallback until then.
  window.__FIQI_CHAT_URL = CHAT_WORKER_URL;
  try {
    var base = document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/site\.js(\?.*)?$/, '')
      : 'js/';
    loadScript(base + 'chat.js');
  } catch (e) { /* chat must never break the page */ }

  // 3. (legacy) Full widget.js from the worker — superseded by js/chat.js,
  // kept off. Enable only if the worker-served widget is preferred.
  if (false && CHAT_WORKER_URL) {
    var chat = document.createElement('script');
    chat.src = CHAT_WORKER_URL.replace(/\/$/, '') + '/widget.js';
    chat.setAttribute('data-color', 'dark');
    document.body.appendChild(chat);
  }

  // 3. Custom events (only active once Umami loads).
  function track(name) {
    try {
      if (window.umami && typeof window.umami.track === 'function') window.umami.track(name);
    } catch (e) { /* analytics must never break the page */ }
  }

  function bindEvents() {
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      if (!a || !a.getAttribute) return;
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (!href) return;
      if (href.indexOf('cv') !== -1 && (href.endsWith('.pdf') || a.classList.contains('nav__cta'))) {
        track('cv-download');
      } else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        track('whatsapp-click');
      } else if (href.indexOf('mailto:') === 0) {
        track('email-click');
      } else if (href.indexOf('case-study/') !== -1) {
        track('project-view');
      } else if (href.indexOf('contact') !== -1) {
        track('contact-view');
      }
    });
    // Chat opens are tracked inside the widget iframe context when available.
    window.addEventListener('message', function (ev) {
      if (ev && ev.data === 'fiqi-chat-open') track('chat-open');
    });
  }

  // If Umami was already present (cached), bind immediately.
  if (window.umami) bindEvents();
})();
