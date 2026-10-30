/* Maré Odontologia — interações do site (JavaScript puro, sem dependências) */
(function () {
  'use strict';

  var mq = function (q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var $ = function (id) { return document.getElementById(id); };
  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} },
    lget: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    lset: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Tela de carregamento (1x por sessão, até 1,5 s) ---------- */
  var hero = document.querySelector('.hero');
  var splash = $('splash');
  if (splash && store.get('of_splash_seen') !== '1') {
    store.set('of_splash_seen', '1');
    splash.hidden = false;
    hero && hero.classList.add('late');
    var t1 = setTimeout(function () { splash.classList.add('out'); }, reduce ? 650 : 1000);
    var t2 = setTimeout(function () { splash.hidden = true; }, reduce ? 700 : 1500);
    $('skipSplash').addEventListener('click', function () {
      clearTimeout(t1); clearTimeout(t2);
      splash.classList.add('out');
      setTimeout(function () { splash.hidden = true; }, 450);
    });
  }

  /* ---------- Menu: transparente no topo, sólido ao rolar ---------- */
  var hdr = $('hdr');
  var onScroll = function () { hdr.classList.toggle('solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Banner: vídeo em câmera lenta, em loop, sem depender do mouse ---------- */
  var vid = $('heroVid'), vToggle = $('vidToggle');
  if (vid) {
    vid.muted = true;
    var RATE = 0.75;
    var play = function () { vid.playbackRate = RATE; var p = vid.play(); if (p && p.catch) p.catch(function () {}); };
    var setPaused = function (paused) {
      if (!vToggle) return;
      vToggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      vToggle.setAttribute('aria-label', paused ? 'Retomar vídeo do banner' : 'Pausar vídeo do banner');
    };
    vid.addEventListener('loadedmetadata', function () { vid.playbackRate = RATE; });
    vid.addEventListener('play', function () { vid.playbackRate = RATE; setPaused(false); });
    vid.addEventListener('pause', function () { setPaused(true); });
    if (reduce) {
      vid.removeAttribute('autoplay'); vid.pause(); setPaused(true);
    } else {
      play();
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          if (vToggle && vToggle.getAttribute('aria-pressed') === 'true' && vid.dataset.user === '1') return;
          if (en[0].isIntersecting) play(); else vid.pause();
        }).observe(vid);
      }
    }
    if (vToggle) vToggle.addEventListener('click', function () {
      if (vid.paused) { vid.dataset.user = '0'; play(); } else { vid.dataset.user = '1'; vid.pause(); }
    });
  }

  /* ---------- Antes e depois ---------- */
  var ba = $('ba'), baRange = $('baRange');
  if (ba && baRange) {
    var setBa = function () {
      var v = parseFloat(baRange.value);
      $('baAfter').style.clipPath = 'inset(0 0 0 ' + v + '%)';
      $('baLine').style.left = v + '%';
      baRange.setAttribute('aria-valuetext', 'Mostrando ' + Math.round(100 - v) + '% do depois');
      ba.classList.add('touched');
    };
    baRange.addEventListener('input', setBa);
    baRange.addEventListener('change', setBa);
  }

  /* ---------- Perguntas frequentes ---------- */
  var faqBtns = document.querySelectorAll('.faq-q');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      faqBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        $(b.getAttribute('aria-controls')).hidden = true;
        b.querySelector('.faq-ic').textContent = '+';
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        $(btn.getAttribute('aria-controls')).hidden = false;
        btn.querySelector('.faq-ic').textContent = '−';
      }
    });
  });

  /* ---------- Aviso de cookies (LGPD) ---------- */
  var cookie = $('cookie');
  if (cookie && !store.lget('of_cookie')) {
    cookie.hidden = false;
    cookie.querySelectorAll('[data-cookie]').forEach(function (b) {
      b.addEventListener('click', function () { store.lset('of_cookie', b.getAttribute('data-cookie')); cookie.hidden = true; });
    });
  }

  /* ---------- Agendamento online (demonstração: não envia dados) ---------- */
  var ESPS = ['Avaliação / limpeza', 'Ortodontia', 'Implantes', 'Canal (endodontia)', 'Odontopediatria', 'Dor ou urgência'];
  var DENTS = [
    { id: 'any', label: 'Primeiro horário livre' },
    { id: 'hemanuelly', label: 'Dra. Hemanuelly Brito' },
    { id: 'rafael', label: 'Dr. Rafael Moura' },
    { id: 'camila', label: 'Dra. Camila Arruda' },
    { id: 'thiago', label: 'Dr. Thiago Peixoto' }
  ];
  var st = { esp: null, dent: 'any', day: 0, hour: null, sending: false };
  var days = (function () {
    var wd = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    var full = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    var out = [], d = new Date(); d.setHours(12, 0, 0, 0);
    while (out.length < 6) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) continue;
      var dd = String(d.getDate()).padStart(2, '0'), mm = String(d.getMonth() + 1).padStart(2, '0');
      out.push({ wd: wd[d.getDay()], dm: dd + '/' + mm, full: full[d.getDay()] + ', ' + dd + '/' + mm + '/' + d.getFullYear(), sat: d.getDay() === 6 });
    }
    return out;
  })();

  var chip = function (label, on, opts) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (opts && opts.cls ? ' ' + opts.cls : '') + (on ? ' on' : '');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (opts && opts.html) b.innerHTML = opts.html; else b.textContent = label;
    if (opts && opts.aria) b.setAttribute('aria-label', opts.aria);
    if (opts && opts.off) b.disabled = true;
    if (opts && opts.pick) b.addEventListener('click', opts.pick);
    return b;
  };
  var fill = function (el, nodes) { el.textContent = ''; nodes.forEach(function (n) { el.appendChild(n); }); };
  var inNome = $('inNome'), inTel = $('inTel'), inConsent = $('inConsent'), submit = $('bkSubmit');

  var ready = function () {
    return !!(st.esp && st.hour && inNome.value.trim().length >= 3 && inTel.value.replace(/\D/g, '').length >= 10 && inConsent.checked);
  };
  var dentLabel = function () { return (DENTS.find(function (d) { return d.id === st.dent; }) || DENTS[0]).label; };

  var render = function () {
    if (!$('optEsp')) return;
    fill($('optEsp'), ESPS.map(function (l) { return chip(l, st.esp === l, { pick: function () { st.esp = l; render(); } }); }));
    fill($('optDent'), DENTS.map(function (d) { return chip(d.label, st.dent === d.id, { pick: function () { st.dent = d.id; st.hour = null; render(); } }); }));
    fill($('optDay'), days.map(function (d, i) {
      return chip('', st.day === i, {
        cls: 'day', aria: d.full,
        html: '<span style="font-size:13px;font-weight:500">' + d.wd + '</span><span style="font-size:17px;font-weight:700">' + d.dm + '</span>',
        pick: function () { st.day = i; st.hour = null; render(); }
      });
    }));
    var hours = days[st.day].sat ? ['08:00', '08:40', '09:20', '10:00', '10:40', '11:20'] : ['08:00', '08:40', '09:20', '10:00', '11:20', '14:00', '14:40', '15:20', '16:40', '17:20', '18:00'];
    var seed = (st.day * 3 + DENTS.findIndex(function (x) { return x.id === st.dent; })) % 4;
    fill($('optHour'), hours.map(function (h, i) {
      var off = (i + seed) % 4 === 0;
      return chip(h, st.hour === h, { off: off, pick: function () { if (!off) { st.hour = h; render(); } } });
    }));
    var rows = [['Motivo', st.esp || '—'], ['Profissional', dentLabel()], ['Dia', days[st.day].full], ['Horário', st.hour || '—']];
    fill($('bkSummary'), rows.map(function (r) {
      var row = document.createElement('div'); row.className = 'row';
      var k = document.createElement('span'); k.textContent = r[0];
      var v = document.createElement('strong'); v.textContent = r[1];
      row.appendChild(k); row.appendChild(v); return row;
    }));
    submit.disabled = !ready() || st.sending;
  };

  if ($('bkFormEl')) {
    [inNome, inTel, inConsent].forEach(function (el) { el.addEventListener('input', render); el.addEventListener('change', render); });
    $('bkFormEl').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!ready() || st.sending) return;
      st.sending = true;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      submit.innerHTML = '<span class="spin" aria-hidden="true"></span><span>Reservando…</span>';
      setTimeout(function () {
        var n = String(Math.floor(100 + Math.random() * 899));
        $('bkResumo').textContent = st.esp + ' · ' + days[st.day].full + ' às ' + st.hour + ' · ' + dentLabel();
        $('bkProto').textContent = 'OF-' + days[st.day].dm.replace('/', '') + '-0' + n;
        $('bkTel').textContent = inTel.value;
        $('bkForm').hidden = true;
        $('bkDone').hidden = false;
        st.sending = false;
        submit.removeAttribute('aria-busy');
        submit.innerHTML = '<span>Confirmar agendamento</span>';
      }, 1100);
    });
    $('bkReset').addEventListener('click', function () {
      st.esp = null; st.hour = null;
      inNome.value = ''; inTel.value = ''; inConsent.checked = false;
      $('bkDone').hidden = true;
      $('bkForm').hidden = false;
      render();
    });
    render();
  }
})();
