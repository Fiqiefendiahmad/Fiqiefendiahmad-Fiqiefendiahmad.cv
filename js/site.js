/* site.js — shared CV site integrations: Google Analytics 4 + FIQI chat widget.
 */
(function () {
  'use strict';

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

  // 1. FIQI floating chat (js/chat.js).
  window.__FIQI_CHAT_URL = CHAT_WORKER_URL;
  try {
    var base = document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/site\.js(\?.*)?$/, '')
      : 'js/';
    loadScript(base + 'chat.js');
  } catch (e) { /* chat must never break the page */ }

  // 2. Custom events (routes to Google Analytics 4)
  function track(name) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name);
      }
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

  bindEvents();
})();
