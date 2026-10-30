/* OdontoFlow — utilitários compartilhados (sem dependências) */
window.OF = (function () {
  'use strict';
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var brl = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var WD = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  var WDS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  var MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var today = function () { var d = new Date(); d.setHours(12, 0, 0, 0); return d; };
  var addDays = function (d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; };
  /* próximo dia útil (seg–sáb) a partir de d, avançando n dias úteis */
  var workday = function (n) {
    var d = today(), k = 0;
    if (n === 0 && d.getDay() !== 0) return d;
    while (k < n || d.getDay() === 0) { d = addDays(d, 1); if (d.getDay() !== 0) k++; }
    return d;
  };
  var dmy = function (d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
  var dm = function (d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1); };
  var longDate = function (d) { return WD[d.getDay()] + ', ' + d.getDate() + ' de ' + MES[d.getMonth()]; };
  var toast = function (msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2800);
  };
  var initials = function (name) {
    var p = String(name).replace(/^(Dra?\.)\s+/, '').split(/\s+/);
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var theme = function (t) {
    if (t) { document.documentElement.setAttribute('data-theme', t); store.set('of_theme', t); }
    return document.documentElement.getAttribute('data-theme') || 'light';
  };
  (function () {
    var t = store.get('of_theme', null);
    if (!t) { try { t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { t = 'light'; } }
    document.documentElement.setAttribute('data-theme', t);
  })();
  /* ícones em traço (lucide-like), desenhados à mão */
  var P = {
    home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
    tooth: 'M12 5c-2-2-6-2.4-7.6 0-1.8 2.6-1.4 6.2-.2 8.8.8 2 1.4 5 1.8 7.4.3 1.8 2.2 2 2.6.2.6-2.6 1.2-4.8 3.4-4.8s2.8 2.2 3.4 4.8c.4 1.8 2.3 1.6 2.6-.2.4-2.4 1-5.4 1.8-7.4 1.2-2.6 1.6-6.2-.2-8.8C18 2.6 14 3 12 5z',
    card: 'M3 6h18v12H3zM3 10h18M7 15h4',
    doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
    clip: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4',
    chat: 'M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-4.8A8 8 0 1 1 21 12z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.4-4 4.4-6 8-6s6.6 2 8 6',
    users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c1-3.6 3.6-5.5 7-5.5s6 1.9 7 5.5M16 3.5a4 4 0 0 1 0 7.5M18 15.5c2 .6 3.4 2.4 4 5',
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
    money: 'M3 7h18v10H3zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 10v4M18 10v4',
    funnel: 'M3 4h18l-7 9v6l-4 2v-8z',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
    spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
    mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    x: 'M6 6l12 12M18 6L6 18',
    plus: 'M12 5v14M5 12h14',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3',
    bell: 'M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0',
    out: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h11',
    moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    alert: 'M12 3l10 18H2zM12 10v4M12 17.5v.5',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z',
    pix: 'M12 2l4.2 4.2a2.5 2.5 0 0 1 3.6 0L22 8.4 12 18.4 2 8.4l2.2-2.2a2.5 2.5 0 0 1 3.6 0zM7 15.5L12 22l5-6.5',
    copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
    download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    menu: 'M4 7h16M4 12h16M4 17h16',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    left: 'M15 6l-6 6 6 6',
    right: 'M9 6l6 6-6 6',
    lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    whats: 'M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z',
    bot: 'M5 9h14v10H5zM12 5v4M9 13v1M15 13v1M9 16.5h6M3 13v3M21 13v3',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    trend: 'M3 17l6-6 4 4 8-8M15 7h6v6'
  };
  var icon = function (name, size, extra) {
    return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '><path d="' + P[name] + '"></path></svg>';
  };
  return { esc: esc, brl: brl, pad: pad, today: today, addDays: addDays, workday: workday, dmy: dmy, dm: dm, longDate: longDate, WD: WD, WDS: WDS, MES: MES, toast: toast, initials: initials, store: store, theme: theme, icon: icon };
})();
