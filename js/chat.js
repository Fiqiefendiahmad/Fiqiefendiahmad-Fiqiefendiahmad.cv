/* chat.js — FIQI floating chat button + panel for the CV site.
 * Backend contract (Cloudflare Worker fiqi-chat):
 *   GET  {url}/api/welcome-message -> { message }
 *   POST {url}/api/chat { message, history: [{role, content}] } -> { response }
 * Backend URL comes from window.__FIQI_CHAT_URL (set in site.js).
 * Empty URL = offline mode: greeting + WhatsApp fallback, no failed requests.
 */
(function () {
  'use strict';

  var WORKER_URL = (window.__FIQI_CHAT_URL || '').replace(/\/$/, '');
  var WA_URL = 'https://wa.me/6285156462398?text=' + encodeURIComponent('Hi Fiqi, I saw your CV and want to chat.');
  var MAX_HISTORY = 10;

  var css = [
    '#fiqi-fab{position:fixed;right:20px;bottom:20px;z-index:9999;width:56px;height:56px;border-radius:50%;',
    'border:0;cursor:pointer;background:#111827;color:#f9fafb;display:flex;align-items:center;justify-content:center;',
    'box-shadow:0 4px 16px rgba(0,0,0,.35);font:600 13px/1 system-ui,sans-serif}',
    '#fiqi-fab:hover{background:#1f2937}',
    '#fiqi-fab svg{width:26px;height:26px}',
    '#fiqi-panel{position:fixed;right:20px;bottom:88px;z-index:9999;width:min(360px,calc(100vw - 40px));height:480px;max-height:70vh;',
    'display:none;flex-direction:column;background:#111827;color:#e5e7eb;border:1px solid #374151;border-radius:14px;overflow:hidden;',
    'box-shadow:0 12px 40px rgba(0,0,0,.45);font:14px/1.5 system-ui,sans-serif}',
    '#fiqi-panel.open{display:flex}',
    '#fiqi-head{background:#0b1220;padding:12px 14px;border-bottom:1px solid #374151}',
    '#fiqi-head b{display:block;font-size:14px;color:#f9fafb}',
    '#fiqi-head span{font-size:12px;color:#9ca3af}',
    '#fiqi-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}',
    '.fiqi-msg{max-width:85%;padding:8px 11px;border-radius:10px;white-space:pre-wrap;word-break:break-word}',
    '.fiqi-bot{background:#1f2937;align-self:flex-start;border-bottom-left-radius:2px}',
    '.fiqi-user{background:#2563eb;color:#fff;align-self:flex-end;border-bottom-right-radius:2px}',
    '.fiqi-msg a{color:#93c5fd}',
    '#fiqi-form{display:flex;gap:8px;padding:10px;border-top:1px solid #374151}',
    '#fiqi-input{flex:1;background:#0b1220;border:1px solid #374151;border-radius:8px;color:#e5e7eb;padding:8px 10px;font-size:14px}',
    '#fiqi-input:focus{outline:none;border-color:#2563eb}',
    '#fiqi-send{background:#2563eb;border:0;border-radius:8px;color:#fff;padding:8px 14px;cursor:pointer;font-size:14px}',
    '#fiqi-send:disabled{opacity:.5;cursor:default}',
    '.fiqi-typing{color:#9ca3af;font-style:italic}'
  ].join('\n');

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var fab = el('button');
  fab.id = 'fiqi-fab';
  fab.setAttribute('aria-label', 'Chat with FIQI');
  fab.title = 'Chat with FIQI';
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
    + ' stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  document.body.appendChild(fab);

  var panel = el('div');
  panel.id = 'fiqi-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'FIQI chat');
  panel.innerHTML = '<div id="fiqi-head"><b>FIQI</b><span>Ask about Fiqi — experience, projects, skills</span></div>'
    + '<div id="fiqi-msgs"></div>'
    + '<form id="fiqi-form"><input id="fiqi-input" type="text" placeholder="Type a message…" autocomplete="off" maxlength="500">'
    + '<button id="fiqi-send" type="submit">Send</button></form>';
  document.body.appendChild(panel);

  var msgs = panel.querySelector('#fiqi-msgs');
  var form = panel.querySelector('#fiqi-form');
  var input = panel.querySelector('#fiqi-input');
  var sendBtn = panel.querySelector('#fiqi-send');
  var history = [];
  var opened = false;
  var greeted = false;

  function addMsg(text, who) {
    var m = el('div', 'fiqi-msg fiqi-' + who, linkify(text));
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
    return m;
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    if (!WORKER_URL) {
      addMsg('Hi! Live chat is coming online soon. Meanwhile, reach Fiqi directly:', 'bot');
      var m = el('div', 'fiqi-msg fiqi-bot');
      var a = document.createElement('a');
      a.href = WA_URL;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Chat on WhatsApp';
      m.appendChild(a);
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
      return;
    }
    var t = addMsg('Connecting…', 'bot');
    t.classList.add('fiqi-typing');
    fetch(WORKER_URL + '/api/welcome-message').then(function (r) {
      if (!r.ok) throw new Error('bad status');
      return r.json();
    }).then(function (d) {
      t.classList.remove('fiqi-typing');
      t.innerHTML = linkify(d.message || 'Hi! Ask me anything about Fiqi.');
    }).catch(function () {
      t.classList.remove('fiqi-typing');
      t.innerHTML = 'Hi! Ask me anything about Fiqi. (Live answers may be slow right now.)';
    });
  }

  fab.addEventListener('click', function () {
    opened = !opened;
    panel.classList.toggle('open', opened);
    if (opened) {
      try { window.postMessage('fiqi-chat-open', '*'); } catch (e) { /* noop */ }
      greet();
      setTimeout(function () { input.focus(); }, 50);
    }
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    if (!WORKER_URL) {
      addMsg(text, 'user');
      addMsg('Live chat is not online yet — please use WhatsApp (link above) and Fiqi will reply there.', 'bot');
      input.value = '';
      return;
    }
    addMsg(text, 'user');
    input.value = '';
    history.push({ role: 'user', content: text });
    if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
    sendBtn.disabled = true;
    var t = addMsg('Typing…', 'bot');
    t.classList.add('fiqi-typing');
    fetch(WORKER_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history.slice(0, -1) })
    }).then(function (r) {
      if (!r.ok) throw new Error('status ' + r.status);
      return r.json();
    }).then(function (d) {
      var reply = d.response || 'Sorry, I could not answer that.';
      t.classList.remove('fiqi-typing');
      t.innerHTML = linkify(reply);
      history.push({ role: 'assistant', content: reply });
      if (history.length > MAX_HISTORY) history = history.slice(history.length - MAX_HISTORY);
      msgs.scrollTop = msgs.scrollHeight;
    }).catch(function () {
      t.classList.remove('fiqi-typing');
      t.textContent = 'Something went wrong. Try again, or reach Fiqi on WhatsApp: ' + WA_URL;
      history.pop();
    }).then(function () {
      sendBtn.disabled = false;
      input.focus();
    });
  });
})();
