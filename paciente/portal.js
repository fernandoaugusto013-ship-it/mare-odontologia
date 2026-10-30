/* Área do Paciente — protótipo navegável (dados fictícios, nada é enviado) */
(function () {
  'use strict';
  var O = window.OF, esc = O.esc, I = O.icon;
  var app = document.getElementById('app');

  /* ---------------- dados de demonstração ---------------- */
  var nextDay = O.workday(3);
  var S = O.store.get('of_pac', null) || {
    logged: false,
    confirmed: false,
    appt: { date: O.dmy(nextDay), iso: nextDay.toISOString(), hour: '09:20', who: 'Dra. Hemanuelly Brito', what: 'Restauração em resina — dente 36', room: 'Consultório 2' },
    planApproved: false,
    planOption: 'A',
    planInstall: 6,
    paid: [],
    signed: [],
    anamnese: null,
    chat: []
  };
  var save = function () { O.store.set('of_pac', S); };
  var pac = { nome: 'Mariana Costa Lima', primeiro: 'Mariana', cpf: '***.482.317-**', tel: '(81) 9 8••• ••12', nasc: '14/03/1992', convenio: 'Particular' };

  var plan = {
    A: { nome: 'Opção A · Resina + clareamento de consultório', total: 2480, itens: [
      { p: 'Limpeza e profilaxia', d: 'Todos', v: 220, st: 'done', when: 'Feito em ' + O.dmy(O.addDays(O.today(), -21)) },
      { p: 'Restauração em resina', d: '36', v: 380, st: 'now', when: 'Agendado' },
      { p: 'Restauração em resina', d: '46', v: 380, st: 'todo', when: 'A agendar' },
      { p: 'Clareamento de consultório (2 sessões)', d: 'Arcadas', v: 1500, st: 'todo', when: 'A agendar' }
    ] },
    B: { nome: 'Opção B · Resina + clareamento caseiro supervisionado', total: 1780, itens: [
      { p: 'Limpeza e profilaxia', d: 'Todos', v: 220, st: 'done', when: 'Feito em ' + O.dmy(O.addDays(O.today(), -21)) },
      { p: 'Restauração em resina', d: '36', v: 380, st: 'now', when: 'Agendado' },
      { p: 'Restauração em resina', d: '46', v: 380, st: 'todo', when: 'A agendar' },
      { p: 'Clareamento caseiro com moldeira (kit + 3 retornos)', d: 'Arcadas', v: 800, st: 'todo', when: 'A agendar' }
    ] }
  };
  var bills = function () {
    var base = [
      { id: 'p1', desc: 'Limpeza e profilaxia', venc: O.dmy(O.addDays(O.today(), -21)), v: 220, st: 'pago' },
      { id: 'p2', desc: 'Avaliação clínica', venc: O.dmy(O.addDays(O.today(), -21)), v: 0, st: 'cortesia' }
    ];
    if (S.planApproved) {
      var opt = plan[S.planOption], rest = opt.total - 220, n = S.planInstall, parc = Math.round(rest / n * 100) / 100;
      for (var i = 1; i <= Math.min(n, 3); i++) {
        base.push({ id: 'c' + i, desc: 'Plano de tratamento · parcela ' + i + '/' + n, venc: O.dmy(O.addDays(O.today(), 5 + (i - 1) * 30)), v: parc, st: i === 1 ? 'aberto' : 'futuro' });
      }
    }
    base.forEach(function (b) { if (S.paid.indexOf(b.id) >= 0) b.st = 'pago'; });
    return base;
  };
  var docs = [
    { id: 'd1', t: 'Termo de consentimento — restauração', tipo: 'Termo', data: O.dmy(O.addDays(O.today(), -2)), sign: true },
    { id: 'd2', t: 'Receita — analgésico pós-procedimento', tipo: 'Receita', data: O.dmy(O.addDays(O.today(), -21)), sign: false, by: 'Dra. Hemanuelly Brito · assinatura digital ICP-Brasil' },
    { id: 'd3', t: 'Atestado de comparecimento', tipo: 'Atestado', data: O.dmy(O.addDays(O.today(), -21)), sign: false, by: 'Dra. Hemanuelly Brito · assinatura digital ICP-Brasil' },
    { id: 'd4', t: 'Radiografia panorâmica', tipo: 'Imagem', data: O.dmy(O.addDays(O.today(), -21)), sign: false, by: 'Arquivo de imagem (JPG)' },
    { id: 'd5', t: 'Orientações pós-clareamento', tipo: 'Orientação', data: O.dmy(O.addDays(O.today(), -21)), sign: false, by: 'Material da clínica (PDF)' }
  ];
  var pendSign = function () { return docs.filter(function (d) { return d.sign && S.signed.indexOf(d.id) < 0; }).length; };
  var pendPay = function () { return bills().filter(function (b) { return b.st === 'aberto'; }).length; };

  /* ---------------- login ---------------- */
  var renderLogin = function (step) {
    step = step || 1;
    app.innerHTML =
      '<main class="login" id="main">' +
      '<section class="login-art" aria-hidden="true"><div class="stack" style="max-width:420px"><span class="proto" style="align-self:flex-start;background:rgba(255,255,255,.15);color:#FFFFFF">Protótipo</span>' +
      '<h2 style="font-size:30px">Seu tratamento, na palma da mão.</h2><p style="color:rgba(255,255,255,.85)">Consultas, plano de tratamento, pagamentos e documentos num só lugar.</p></div></section>' +
      '<section class="login-form"><div class="login-box">' +
      '<a class="brand" href="../" style="padding:0">' + I('tooth', 28) + 'Maré Odontologia</a>' +
      (step === 1
        ? '<div class="stack"><h1 style="font-size:26px">Área do Paciente</h1><p class="muted">Entre com seu CPF. Enviamos um código de 6 dígitos para o WhatsApp cadastrado.</p></div>' +
          '<form id="f1" class="stack"><label class="field">CPF<input class="input" id="cpf" inputmode="numeric" autocomplete="off" placeholder="000.000.000-00" value="123.482.317-09"></label>' +
          '<button class="btn btn-p" type="submit">Receber código no WhatsApp</button></form>' +
          '<p class="small muted">Demonstração: o CPF já vem preenchido e qualquer código de 6 dígitos funciona.</p>'
        : '<div class="stack"><h1 style="font-size:26px">Digite o código</h1><p class="muted">Enviamos para o WhatsApp terminado em ••12.</p></div>' +
          '<form id="f2" class="stack"><div class="otp" role="group" aria-label="Código de 6 dígitos">' +
          [0, 1, 2, 3, 4, 5].map(function (i) { return '<input inputmode="numeric" maxlength="1" aria-label="Dígito ' + (i + 1) + '" value="' + '482917'[i] + '">'; }).join('') +
          '</div><label class="check"><input type="checkbox" id="keep" checked><span>Manter conectado neste aparelho</span></label>' +
          '<button class="btn btn-p" type="submit" id="go">Entrar</button><button class="btn btn-g" type="button" id="back">Usar outro CPF</button></form>') +
      '<p class="small muted row" style="gap:8px">' + I('shield', 16) + 'Seus dados de saúde são protegidos conforme a LGPD.</p>' +
      '</div></section></main>';
    if (step === 1) {
      document.getElementById('f1').addEventListener('submit', function (e) { e.preventDefault(); renderLogin(2); });
    } else {
      var ins = app.querySelectorAll('.otp input');
      ins.forEach(function (inp, i) {
        inp.addEventListener('input', function () { inp.value = inp.value.replace(/\D/g, '').slice(0, 1); if (inp.value && ins[i + 1]) ins[i + 1].focus(); });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); });
      });
      document.getElementById('back').addEventListener('click', function () { renderLogin(1); });
      document.getElementById('f2').addEventListener('submit', function (e) {
        e.preventDefault();
        var b = document.getElementById('go');
        b.disabled = true; b.innerHTML = '<span class="spin"></span>Entrando…';
        setTimeout(function () { S.logged = true; save(); location.hash = '#inicio'; render(); }, 700);
      });
    }
  };

  /* ---------------- moldura ---------------- */
  var NAV = [
    ['inicio', 'Início', 'home'], ['agendar', 'Consultas', 'cal'], ['tratamento', 'Tratamento', 'tooth'],
    ['pagamentos', 'Pagamentos', 'card'], ['documentos', 'Documentos', 'doc'], ['anamnese', 'Ficha de saúde', 'clip'], ['assistente', 'Assistente', 'chat']
  ];
  var TABS = ['inicio', 'agendar', 'tratamento', 'pagamentos', 'assistente'];
  var badge = function (k) {
    var n = k === 'documentos' ? pendSign() : k === 'pagamentos' ? pendPay() : k === 'anamnese' ? (S.anamnese ? 0 : 1) : 0;
    return n ? '<span class="count">' + n + '</span>' : '';
  };
  var frame = function (route, inner) {
    return '<div class="shell">' +
      '<aside class="side" aria-label="Menu"><a class="brand" href="#inicio">' + I('tooth', 26) + 'Maré Odontologia</a><nav class="nav stack" style="gap:2px">' +
      NAV.map(function (n) { return '<a href="#' + n[0] + '"' + (route === n[0] ? ' aria-current="page"' : '') + '>' + I(n[2]) + n[1] + badge(n[0]) + '</a>'; }).join('') +
      '</nav><div class="side-foot"><div class="row card" style="padding:12px;box-shadow:none"><span class="av">' + O.initials(pac.nome) + '</span><div style="min-width:0"><strong style="font-size:14px;display:block">' + pac.nome + '</strong><span class="small muted">' + pac.convenio + '</span></div></div>' +
      '<button class="btn btn-g" data-act="theme" style="justify-content:flex-start">' + I(O.theme() === 'dark' ? 'sun' : 'moon') + (O.theme() === 'dark' ? 'Modo claro' : 'Modo escuro') + '</button>' +
      '<button class="btn btn-g" data-act="logout" style="justify-content:flex-start">' + I('out') + 'Sair</button></div></aside>' +
      '<div><header class="top"><a class="brand" href="#inicio" style="padding:0;font-size:16px">' + I('tooth', 24) + 'Maré</a><div class="row" style="gap:8px">' +
      '<button class="icon-btn" data-act="theme" aria-label="Alternar tema">' + I(O.theme() === 'dark' ? 'sun' : 'moon', 18) + '</button>' +
      '<a class="icon-btn" href="#documentos" aria-label="Documentos">' + I('doc', 18) + '</a><button class="icon-btn" data-act="logout" aria-label="Sair">' + I('out', 18) + '</button></div></header>' +
      '<main class="main" id="main">' + inner + '</main></div>' +
      '<nav class="tabbar" aria-label="Navegação">' + TABS.map(function (k) { var n = NAV.filter(function (x) { return x[0] === k; })[0]; return '<a href="#' + k + '"' + (route === k ? ' aria-current="page"' : '') + '>' + I(n[2], 22) + n[1] + '</a>'; }).join('') + '</nav>' +
      '</div>';
  };
  var head = function (title, sub, right) {
    return '<div class="page-h"><div class="stack" style="gap:4px">' + (sub ? '<p class="muted">' + sub + '</p>' : '') + '<h1>' + title + '</h1></div>' + (right || '') + '</div>';
  };

  /* ---------------- páginas ---------------- */
  var pages = {};

  pages.inicio = function () {
    var a = S.appt, d = new Date(a.iso);
    var h = new Date().getHours(), greet = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    var pend = [];
    if (!S.planApproved) pend.push(['tratamento', 'Plano de tratamento aguardando sua aprovação', 'tooth', 'b-warn', 'Revisar']);
    if (pendSign()) pend.push(['documentos', 'Termo de consentimento para assinar', 'doc', 'b-warn', 'Assinar']);
    if (!S.anamnese) pend.push(['anamnese', 'Atualize sua ficha de saúde antes da consulta', 'clip', 'b-info', 'Preencher']);
    if (pendPay()) pend.push(['pagamentos', 'Parcela em aberto — pague com Pix', 'card', 'b-info', 'Pagar']);
    return head(greet + ', ' + pac.primeiro, O.longDate(O.today())) +
      '<div class="grid" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:20px" id="homegrid">' +
      '<div class="stack" style="gap:20px">' +
      '<section class="next" aria-label="Próxima consulta"><div class="row between wrap"><span class="small" style="text-transform:uppercase;letter-spacing:.1em;color:var(--mint);font-weight:700">Próxima consulta</span>' +
      (S.confirmed ? '<span class="badge" style="background:rgba(111,220,205,.2);color:#9FF0E4">' + I('check', 14) + 'Confirmada</span>' : '<span class="badge" style="background:rgba(255,200,120,.2);color:#FFD9A0">Aguardando confirmação</span>') + '</div>' +
      '<div><div class="when">' + O.longDate(d).replace(/^./, function (c) { return c.toUpperCase(); }) + ' · ' + a.hour + '</div><p style="color:rgba(255,255,255,.85);margin-top:4px">' + esc(a.what) + '</p></div>' +
      '<div class="row wrap" style="gap:18px;font-size:14px;color:rgba(255,255,255,.85)"><span class="row" style="gap:6px">' + I('user', 16) + esc(a.who) + '</span><span class="row" style="gap:6px">' + I('home', 16) + a.room + ' · Boa Viagem</span></div>' +
      '<div class="row wrap">' + (S.confirmed ? '' : '<button class="btn btn-p" data-act="confirm">' + I('check', 18) + 'Confirmar presença</button>') +
      '<a class="btn btn-o" href="#agendar">Remarcar</a><button class="btn btn-o" data-act="cal">Adicionar à agenda</button></div></section>' +
      '<section class="card"><div class="card-h"><h3>Pendências</h3><span class="badge b-neutral">' + pend.length + '</span></div>' +
      (pend.length ? '<div class="stack" style="gap:8px">' + pend.map(function (p) {
        return '<a href="#' + p[0] + '" class="row between" style="padding:12px;border:1px solid var(--line);border-radius:12px;text-decoration:none;color:var(--text)"><span class="row" style="gap:12px"><span class="av" style="border-radius:10px">' + I(p[2], 18) + '</span><span style="font-weight:600;font-size:15px">' + p[1] + '</span></span><span class="badge ' + p[3] + '">' + p[4] + '</span></a>';
      }).join('') + '</div>' : '<p class="muted">Tudo em dia. ' + I('check', 16) + '</p>') + '</section></div>' +
      '<div class="stack" style="gap:20px">' +
      '<section class="card"><div class="card-h"><h3>Seu tratamento</h3><a class="small" href="#tratamento">Ver plano</a></div>' + progress() + '</section>' +
      '<section class="quick" aria-label="Atalhos" style="grid-template-columns:repeat(2,minmax(0,1fr))">' +
      [['agendar', 'Agendar consulta', 'cal'], ['pagamentos', 'Pagar com Pix', 'pix'], ['documentos', 'Receitas e atestados', 'doc'], ['assistente', 'Tirar uma dúvida', 'chat']].map(function (q) {
        return '<a href="#' + q[0] + '"><span>' + I(q[2]) + '</span><span>' + q[1] + '</span></a>';
      }).join('') + '</section>' +
      '<section class="card" style="background:var(--soft);border-color:transparent;box-shadow:none"><div class="row" style="gap:12px;align-items:flex-start"><span class="av" style="background:var(--surface)">' + I('spark', 18) + '</span><div class="stack" style="gap:4px"><strong>Lembrete de cuidado</strong><p class="small muted">Depois da restauração, evite mastigar do lado tratado por 2 horas, até a anestesia passar.</p></div></div></section>' +
      '</div></div>';
  };
  var progress = function () {
    var it = plan[S.planOption].itens, done = it.filter(function (x) { return x.st === 'done'; }).length;
    var pct = Math.round(done / it.length * 100);
    return '<div class="stack" style="gap:10px"><div class="row between"><span class="small muted">' + done + ' de ' + it.length + ' etapas concluídas</span><strong class="tnum">' + pct + '%</strong></div><div class="bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do tratamento"><i style="width:' + pct + '%"></i></div>' +
      '<p class="small">' + (S.planApproved ? '<span class="badge b-ok">Plano aprovado</span>' : '<span class="badge b-warn">Aguardando sua aprovação</span>') + '</p></div>';
  };

  /* agendar / remarcar */
  var bk = { esp: 'Retorno / continuidade do tratamento', who: 'Dra. Hemanuelly Brito', day: 0, hour: null };
  pages.agendar = function () {
    var days = []; for (var i = 1; days.length < 10; i++) { var d = O.addDays(O.today(), i); if (d.getDay() !== 0) days.push(d); }
    var sat = days[bk.day].getDay() === 6;
    var hours = sat ? ['08:00', '08:40', '09:20', '10:00', '10:40', '11:20'] : ['08:00', '08:40', '09:20', '10:00', '11:20', '14:00', '14:40', '15:20', '16:40', '17:20', '18:00'];
    var a = S.appt;
    return head('Consultas', 'Agende, remarque ou cancele') +
      '<section class="card" style="margin-bottom:20px"><div class="row between wrap"><div class="row" style="gap:14px"><span class="av lg" style="border-radius:14px">' + I('cal', 24) + '</span><div><strong style="font-size:17px">' + O.longDate(new Date(a.iso)).replace(/^./, function (c) { return c.toUpperCase(); }) + ' · ' + a.hour + '</strong><p class="small muted">' + esc(a.what) + ' · ' + esc(a.who) + '</p></div></div>' +
      (S.confirmed ? '<span class="badge b-ok">' + I('check', 14) + 'Confirmada</span>' : '<button class="btn btn-p btn-sm" data-act="confirm">Confirmar presença</button>') + '</div></section>' +
      '<section class="card stack" style="gap:22px"><div><h3 style="font-size:18px">Remarcar ou agendar nova consulta</h3><p class="small muted">Os horários vêm direto da agenda da clínica.</p></div>' +
      '<div class="stack"><span class="field">Motivo</span><div class="row wrap" style="gap:8px">' +
      ['Retorno / continuidade do tratamento', 'Limpeza', 'Avaliação nova', 'Dor ou urgência'].map(function (x) { return '<button class="chip" data-bk="esp" data-v="' + x + '" aria-pressed="' + (bk.esp === x) + '">' + x + '</button>'; }).join('') + '</div></div>' +
      '<div class="stack"><span class="field">Profissional</span><div class="row wrap" style="gap:8px">' +
      ['Dra. Hemanuelly Brito', 'Primeiro horário livre'].map(function (x) { return '<button class="chip" data-bk="who" data-v="' + x + '" aria-pressed="' + (bk.who === x) + '">' + x + '</button>'; }).join('') + '</div></div>' +
      '<div class="stack"><span class="field">Dia</span><div class="row wrap" style="gap:8px">' +
      days.map(function (d, i) { return '<button class="chip" style="min-height:58px;min-width:68px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.2" data-bk="day" data-v="' + i + '" aria-pressed="' + (bk.day === i) + '" aria-label="' + O.longDate(d) + '"><span class="small">' + O.WDS[d.getDay()] + '</span><strong>' + O.dm(d) + '</strong></button>'; }).join('') + '</div></div>' +
      '<div class="stack"><span class="field">Horário</span><div class="row wrap" style="gap:8px">' +
      hours.map(function (h, i) { var off = (i + bk.day) % 3 === 0; return '<button class="chip" data-bk="hour" data-v="' + h + '" aria-pressed="' + (bk.hour === h) + '"' + (off ? ' disabled' : '') + '>' + h + '</button>'; }).join('') + '</div><p class="small muted">Horários riscados já estão ocupados.</p></div>' +
      '<div class="row wrap"><button class="btn btn-p" data-act="rebook"' + (bk.hour ? '' : ' disabled') + '>' + (bk.hour ? 'Remarcar para ' + O.dm(days[bk.day]) + ' às ' + bk.hour : 'Escolha um horário') + '</button>' +
      '<button class="btn btn-g" data-act="cancel" style="color:var(--bad)">Cancelar consulta</button></div></section>';
  };

  /* plano de tratamento */
  pages.tratamento = function () {
    var opt = plan[S.planOption];
    return head('Plano de tratamento', 'Dra. Hemanuelly Brito · criado em ' + O.dmy(O.addDays(O.today(), -21)), S.planApproved ? '<span class="badge b-ok">' + I('check', 14) + 'Aprovado</span>' : '<span class="badge b-warn">Aguardando aprovação</span>') +
      '<div class="grid" style="grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:20px" id="plangrid">' +
      '<section class="card"><div class="card-h"><h3>' + esc(opt.nome) + '</h3></div><ol class="steps">' +
      opt.itens.map(function (x, i) {
        return '<li class="' + x.st + '"><span class="n">' + (x.st === 'done' ? I('check', 16) : i + 1) + '</span><div class="stack" style="gap:4px"><strong>' + x.p + '</strong><span class="row wrap" style="gap:8px"><span class="mini-tooth">' + I('tooth', 12) + 'Dente ' + x.d + '</span><span class="small muted">' + x.when + '</span></span></div><strong class="tnum">' + O.brl(x.v) + '</strong></li>';
      }).join('') + '</ol><div class="row between" style="border-top:2px solid var(--line);padding-top:14px;margin-top:4px"><strong>Total</strong><strong class="tnum" style="font-size:20px">' + O.brl(opt.total) + '</strong></div></section>' +
      '<div class="stack" style="gap:20px">' +
      (S.planApproved
        ? '<section class="card stack"><h3>Condições aprovadas</h3><p class="muted">' + S.planInstall + 'x de ' + O.brl((opt.total - 220) / S.planInstall) + ' no cartão ou boleto, além da limpeza já paga.</p><p class="small muted">Aprovado com assinatura eletrônica em ' + O.dmy(O.today()) + '.</p><a class="btn btn-o" href="#pagamentos">Ver pagamentos</a></section>'
        : '<section class="card stack" style="gap:14px"><h3>Escolha a opção</h3>' +
          ['A', 'B'].map(function (k) { var o = plan[k]; return '<button class="opt" data-plan="' + k + '" aria-pressed="' + (S.planOption === k) + '"><strong>' + o.nome + '</strong><span class="tnum" style="font-size:18px;font-weight:700">' + O.brl(o.total) + '</span><span class="small muted">' + (k === 'A' ? 'Resultado mais rápido, em 2 sessões na clínica.' : 'Feito em casa com moldeira, com acompanhamento.') + '</span></button>'; }).join('') +
          '<label class="field">Parcelamento<select class="select" id="inst">' + [1, 3, 6, 10].map(function (n) { return '<option value="' + n + '"' + (S.planInstall === n ? ' selected' : '') + '>' + (n === 1 ? 'À vista no Pix · ' + O.brl((opt.total - 220) * 0.95) + ' (5% off)' : n + 'x de ' + O.brl((opt.total - 220) / n) + ' sem juros') + '</option>'; }).join('') + '</select></label>' +
          '<button class="btn btn-p" data-act="approve">Aprovar e assinar</button><p class="small muted">Dúvidas sobre o plano? <a href="#assistente">Pergunte ao assistente</a> ou fale com a recepção.</p></section>') +
      '<section class="card stack" style="gap:8px"><h3>Por que este tratamento?</h3><p class="small muted">Os dentes 36 e 46 têm cáries pequenas, vistas na radiografia de ' + O.dmy(O.addDays(O.today(), -21)) + '. Tratar agora evita que avancem e precisem de canal. O clareamento é estético e opcional.</p></section>' +
      '</div></div>';
  };

  /* pagamentos */
  pages.pagamentos = function () {
    var b = bills(), open = b.filter(function (x) { return x.st === 'aberto'; })[0];
    var stB = { pago: '<span class="badge b-ok">Pago</span>', aberto: '<span class="badge b-warn">Em aberto</span>', futuro: '<span class="badge b-neutral">A vencer</span>', cortesia: '<span class="badge b-info">Cortesia</span>' };
    return head('Pagamentos', 'Pix, cartão ou boleto') +
      (open ? '<section class="card" style="margin-bottom:20px"><div class="card-h"><h3>Pagar com Pix</h3><span class="badge b-warn">Vence ' + open.venc + '</span></div><div class="pix">' + qr() +
        '<div class="stack"><p class="muted">' + esc(open.desc) + '</p><strong class="tnum" style="font-size:30px;letter-spacing:-.02em">' + O.brl(open.v) + '</strong>' +
        '<div class="code" id="pixcode">00020126580014BR.GOV.BCB.PIX0136mare-odonto-demo-0000-0000-000000000000520400005303986540' + open.v.toFixed(2) + '5802BR5916MARE ODONTOLOGIA6006RECIFE62070503***6304DEMO</div>' +
        '<div class="row wrap"><button class="btn btn-p" data-act="copypix">' + I('copy', 18) + 'Copiar código Pix</button><button class="btn btn-o" data-act="paid" data-id="' + open.id + '">Simular pagamento</button></div>' +
        '<p class="small muted">A baixa é automática: assim que o banco confirmar, a parcela aparece como paga e você recebe o recibo no WhatsApp.</p></div></div></section>' : '') +
      '<div class="table-wrap"><table><thead><tr><th>Descrição</th><th>Vencimento</th><th>Valor</th><th>Situação</th><th></th></tr></thead><tbody>' +
      b.map(function (x) { return '<tr><td>' + esc(x.desc) + '</td><td class="tnum">' + x.venc + '</td><td class="tnum">' + O.brl(x.v) + '</td><td>' + stB[x.st] + '</td><td>' + (x.st === 'pago' ? '<button class="btn btn-g btn-sm" data-act="dl">' + I('download', 16) + 'Recibo</button>' : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div>' + (S.planApproved ? '' : '<p class="small muted" style="margin-top:12px">As parcelas do plano aparecem aqui depois que você aprovar o tratamento.</p>');
  };
  var qr = function () {
    var cells = '', seed = 7;
    for (var y = 0; y < 25; y++) for (var x = 0; x < 25; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      var fin = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17);
      if (!fin && seed / 233280 > .52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
    var f = function (x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="7" fill="none" stroke="#0B3C47" stroke-width="1" transform="translate(.5 .5)" /><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>'; };
    return '<svg class="qr" viewBox="0 0 25 25" role="img" aria-label="QR Code Pix (demonstração)" shape-rendering="crispEdges"><g fill="#0B3C47">' + cells + f(0, 0) + f(18, 0) + f(0, 18) + '</g></svg>';
  };

  /* documentos */
  pages.documentos = function () {
    return head('Documentos', 'Receitas, atestados, termos e exames') +
      '<div class="stack">' + docs.map(function (d) {
        var need = d.sign && S.signed.indexOf(d.id) < 0;
        return '<section class="card row between wrap" style="padding:16px 18px"><div class="row" style="gap:14px;min-width:0"><span class="av" style="border-radius:12px">' + I(d.tipo === 'Imagem' ? 'tooth' : 'doc', 18) + '</span><div style="min-width:0"><strong>' + esc(d.t) + '</strong><p class="small muted">' + d.tipo + ' · ' + d.data + (d.by ? ' · ' + d.by : '') + '</p></div></div>' +
          (need ? '<button class="btn btn-p btn-sm" data-act="sign" data-id="' + d.id + '">Ler e assinar</button>' : '<div class="row" style="gap:8px">' + (d.sign ? '<span class="badge b-ok">' + I('check', 14) + 'Assinado</span>' : '') + '<button class="btn btn-o btn-sm" data-act="dl">' + I('download', 16) + 'Baixar</button></div>') + '</section>';
      }).join('') + '</div>' +
      '<p class="small muted" style="margin-top:16px">Receitas e atestados têm assinatura digital ICP-Brasil e podem ser validados no site do ITI.</p>';
  };

  /* anamnese */
  var QA = [
    ['alergia', 'Tem alergia a algum medicamento, anestésico ou látex?', true],
    ['anticoag', 'Usa anticoagulante ou AAS (aspirina) regularmente?'],
    ['diabetes', 'Tem diabetes?'],
    ['pressao', 'Tem pressão alta ou problema cardíaco?'],
    ['gestante', 'Está grávida ou amamentando?'],
    ['fumante', 'Fuma ou usa cigarro eletrônico?'],
    ['sangra', 'Sua gengiva sangra ao escovar?']
  ];
  pages.anamnese = function () {
    var a = S.anamnese || { alergia: 'sim', alergiaQual: 'Dipirona' };
    return head('Ficha de saúde', S.anamnese ? 'Atualizada em ' + S.anamnese._data : 'Leva cerca de 2 minutos') +
      '<form class="card stack" id="anam" style="gap:18px;max-width:760px">' +
      '<p class="muted">Essas informações ficam no seu prontuário e ajudam a Dra. a planejar um atendimento seguro. Se nada mudou, basta revisar e confirmar.</p>' +
      QA.map(function (q) {
        var v = a[q[0]] || 'nao';
        return '<fieldset style="border:0;padding:0;margin:0" class="stack"><legend style="font-weight:600;margin-bottom:8px">' + q[1] + '</legend><div class="seg" role="radiogroup">' +
          ['nao', 'sim', 'nsei'].map(function (o) { return '<button type="button" role="radio" aria-checked="' + (v === o) + '" aria-pressed="' + (v === o) + '" data-q="' + q[0] + '" data-v="' + o + '">' + { nao: 'Não', sim: 'Sim', nsei: 'Não sei' }[o] + '</button>'; }).join('') + '</div>' +
          (q[2] ? '<input class="input" style="margin-top:8px;max-width:420px" id="alergiaQual" placeholder="Qual?" value="' + esc(a.alergiaQual || '') + '"' + (v === 'sim' ? '' : ' hidden') + '>' : '') + '</fieldset>';
      }).join('') +
      '<label class="field">Medicamentos de uso contínuo<input class="input" id="meds" placeholder="Ex.: losartana 50 mg" value="' + esc(a.meds || '') + '"></label>' +
      '<label class="check"><input type="checkbox" id="anamOk" required><span>Declaro que as informações são verdadeiras e autorizo seu uso no meu atendimento (LGPD).</span></label>' +
      '<div class="row wrap"><button class="btn btn-p" type="submit">' + (S.anamnese ? 'Atualizar ficha' : 'Enviar ficha') + '</button></div></form>';
  };

  /* assistente com IA */
  var BOT = {
    hello: 'Oi, ' + pac.primeiro + '! Sou o assistente virtual da Maré Odontologia. Posso ajudar com consultas, pagamentos, documentos e dúvidas gerais sobre os cuidados.\n\nNão faço diagnóstico: questões clínicas eu encaminho para a Dra. Hemanuelly.',
    rules: [
      [/remarc|mudar.*hor|trocar.*dia|cancel/i, 'Posso remarcar sim. Os próximos horários livres com a Dra. Hemanuelly são:\n• ' + O.dm(O.workday(2)) + ' às 10:00\n• ' + O.dm(O.workday(4)) + ' às 14:40\n• ' + O.dm(O.workday(5)) + ' às 08:40\n\nToque em "Consultas" para escolher, ou me diga qual prefere.', [['Abrir Consultas', '#agendar']]],
      [/pix|pagar|boleto|parcela|segunda via/i, 'Você pode pagar com Pix na hora em "Pagamentos": é só copiar o código. A baixa é automática e o recibo chega no WhatsApp.', [['Ir para Pagamentos', '#pagamentos']]],
      [/receita|atestado|document/i, 'Seus documentos ficam em "Documentos". Receitas e atestados têm assinatura digital e podem ser baixados em PDF.', [['Abrir Documentos', '#documentos']]],
      [/dor|incha|sangr|febre|urg/i, 'Sinto muito que esteja com desconforto. Como isso pode precisar de avaliação, vou avisar a equipe agora. Se a dor for forte, houver inchaço no rosto ou febre, ligue para (81) 3000-0000 ou procure um pronto-atendimento.', [['Falar com a recepção', 'handoff']]],
      [/caf[eé]|clarea|comer|beber/i, 'Durante o clareamento, a orientação geral é evitar por 48 horas alimentos com corante forte (café, vinho tinto, açaí, molho de tomate). Siga sempre a orientação da Dra. Hemanuelly para o seu caso.', []],
      [/anest|quanto tempo|dur/i, 'A restauração do dente 36 está prevista para cerca de 40 minutos. A anestesia costuma passar em 2 a 3 horas; até lá, evite mastigar do lado tratado.', []],
      [/conv[eê]nio|plano de sa/i, 'Seu cadastro está como particular. Se tiver convênio odontológico, envie a foto da carteirinha aqui que a recepção confere a cobertura.', [['Falar com a recepção', 'handoff']]]
    ],
    fallback: 'Não tenho certeza sobre isso. Quer que eu passe sua mensagem para a recepção? Respondemos em horário comercial.'
  };
  pages.assistente = function () {
    if (!S.chat.length) S.chat.push({ f: 'bot', t: BOT.hello });
    return head('Assistente', 'Respostas na hora, 24h') +
      '<section class="card chat" aria-label="Conversa com o assistente"><div class="row between" style="padding-bottom:10px;border-bottom:1px solid var(--line);margin-bottom:8px"><div class="row" style="gap:10px"><span class="av" style="background:var(--ai-bg);color:var(--ai)">' + I('bot', 18) + '</span><div><strong>Assistente Maré</strong><p class="small muted">Inteligência artificial · supervisionado pela equipe</p></div></div><span class="badge b-ai">IA</span></div>' +
      '<div class="msgs" id="msgs" aria-live="polite">' + S.chat.map(msgHTML).join('') + '</div>' +
      '<div class="sugs">' + ['Quero remarcar', 'Posso tomar café depois do clareamento?', 'Segunda via do Pix', 'Estou com dor'].map(function (s) { return '<button class="chip" data-say="' + s + '">' + s + '</button>'; }).join('') + '</div>' +
      '<form class="composer" id="composer"><label class="sr" for="say" style="position:absolute;left:-999px">Mensagem</label><input class="input" id="say" autocomplete="off" placeholder="Escreva sua mensagem"><button class="btn btn-p" aria-label="Enviar">' + I('send', 18) + '</button></form>' +
      '<p class="small muted" style="margin-top:8px">O assistente não faz diagnóstico nem substitui a consulta. Conversas ficam registradas no seu prontuário.</p></section>';
  };
  var msgHTML = function (m) {
    var acts = (m.a || []).map(function (a) { return a[1] === 'handoff' ? '<button class="btn btn-o btn-sm" data-act="handoff" style="margin-top:8px">' + a[0] + '</button>' : '<a class="btn btn-o btn-sm" href="' + a[1] + '" style="margin-top:8px">' + a[0] + '</a>'; }).join(' ');
    return '<div class="msg ' + m.f + '">' + esc(m.t) + (acts ? '<div>' + acts + '</div>' : '') + '</div>';
  };
  var say = function (txt) {
    txt = String(txt || '').trim(); if (!txt) return;
    S.chat.push({ f: 'me', t: txt }); save(); render();
    var box = document.getElementById('msgs');
    box.insertAdjacentHTML('beforeend', '<div class="msg bot" id="typing"><span class="typing" aria-label="Digitando"><i></i><i></i><i></i></span></div>');
    box.scrollTop = box.scrollHeight;
    setTimeout(function () {
      var r = BOT.rules.filter(function (x) { return x[0].test(txt); })[0];
      S.chat.push(r ? { f: 'bot', t: r[1], a: r[2] } : { f: 'bot', t: BOT.fallback, a: [['Falar com a recepção', 'handoff']] });
      save(); render();
    }, 900);
  };

  /* ---------------- roteamento e eventos ---------------- */
  var render = function () {
    if (!S.logged) { renderLogin(1); return; }
    var r = (location.hash || '#inicio').slice(1);
    if (!pages[r]) r = 'inicio';
    app.innerHTML = frame(r, pages[r]());
    document.title = (NAV.filter(function (n) { return n[0] === r; })[0] || ['', 'Início'])[1] + ' — Área do Paciente';
    var m = document.getElementById('msgs'); if (m) m.scrollTop = m.scrollHeight;
    var g = document.getElementById('homegrid') || document.getElementById('plangrid');
    if (g && innerWidth < 900) g.style.gridTemplateColumns = 'minmax(0,1fr)';
    bind();
  };
  var modal = function (html, onMount) {
    var bg = document.createElement('div'); bg.className = 'modal-bg';
    bg.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(bg);
    var close = function () { bg.remove(); };
    bg.addEventListener('click', function (e) { if (e.target === bg || e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', k); } });
    var f = bg.querySelector('button,input,select'); if (f) f.focus();
    if (onMount) onMount(bg, close);
  };
  var bind = function () {
    app.querySelectorAll('[data-bk]').forEach(function (b) {
      b.addEventListener('click', function () { var k = b.dataset.bk, v = b.dataset.v; bk[k] = k === 'day' ? +v : v; if (k === 'day' || k === 'who') bk.hour = k === 'day' ? null : bk.hour; render(); });
    });
    app.querySelectorAll('[data-plan]').forEach(function (b) { b.addEventListener('click', function () { S.planOption = b.dataset.plan; save(); render(); }); });
    var inst = document.getElementById('inst'); if (inst) inst.addEventListener('change', function () { S.planInstall = +inst.value; save(); });
    app.querySelectorAll('[data-say]').forEach(function (b) { b.addEventListener('click', function () { say(b.dataset.say); }); });
    var comp = document.getElementById('composer');
    if (comp) comp.addEventListener('submit', function (e) { e.preventDefault(); say(document.getElementById('say').value); });
    var an = document.getElementById('anam');
    if (an) {
      an.querySelectorAll('[data-q]').forEach(function (b) {
        b.addEventListener('click', function () {
          an.querySelectorAll('[data-q="' + b.dataset.q + '"]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); x.setAttribute('aria-checked', x === b); });
          if (b.dataset.q === 'alergia') document.getElementById('alergiaQual').hidden = b.dataset.v !== 'sim';
        });
      });
      an.addEventListener('submit', function (e) {
        e.preventDefault();
        var out = { _data: O.dmy(O.today()) };
        an.querySelectorAll('[aria-pressed="true"][data-q]').forEach(function (x) { out[x.dataset.q] = x.dataset.v; });
        out.alergiaQual = document.getElementById('alergiaQual').value; out.meds = document.getElementById('meds').value;
        S.anamnese = out; save(); O.toast('Ficha enviada. A Dra. Hemanuelly verá os alertas antes da consulta.'); location.hash = '#inicio';
      });
    }
    app.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.act;
        if (a === 'theme') { O.theme(O.theme() === 'dark' ? 'light' : 'dark'); render(); }
        else if (a === 'logout') { S.logged = false; save(); location.hash = ''; render(); }
        else if (a === 'confirm') { S.confirmed = true; save(); O.toast('Presença confirmada. Até ' + O.dm(new Date(S.appt.iso)) + '!'); render(); }
        else if (a === 'cal') O.toast('Convite de agenda gerado (demonstração).');
        else if (a === 'rebook') {
          var days = []; for (var i = 1; days.length < 10; i++) { var d = O.addDays(O.today(), i); if (d.getDay() !== 0) days.push(d); }
          var nd = days[bk.day]; S.appt.iso = nd.toISOString(); S.appt.date = O.dmy(nd); S.appt.hour = bk.hour; S.appt.who = bk.who === 'Primeiro horário livre' ? 'Dra. Hemanuelly Brito' : bk.who; S.confirmed = true; bk.hour = null; save();
          O.toast('Consulta remarcada para ' + O.dm(nd) + ' às ' + S.appt.hour + '.'); location.hash = '#inicio';
        }
        else if (a === 'cancel') modal('<h2 style="font-size:20px;margin-bottom:8px">Cancelar consulta?</h2><p class="muted">Se possível, prefira remarcar. Cancelamentos com menos de 24 h podem ter taxa, conforme o contrato.</p><div class="row wrap" style="margin-top:20px;justify-content:flex-end"><button class="btn btn-g" data-close>Voltar</button><button class="btn btn-p" data-close id="okc" style="background:var(--bad)">Cancelar consulta</button></div>', function (bg) { bg.querySelector('#okc').addEventListener('click', function () { O.toast('Consulta cancelada (demonstração).'); }); });
        else if (a === 'approve') {
          var opt = plan[S.planOption];
          modal('<h2 style="font-size:20px;margin-bottom:6px">Aprovar plano de tratamento</h2><p class="muted" style="margin-bottom:14px">' + esc(opt.nome) + ' · ' + O.brl(opt.total) + '</p>' +
            '<div class="stack"><label class="check"><input type="checkbox" id="c1"><span>Li o plano, entendi os procedimentos, riscos e alternativas, e tirei minhas dúvidas.</span></label>' +
            '<label class="field">Digite seu nome completo para assinar<input class="input" id="sig" placeholder="' + pac.nome + '"></label>' +
            '<p class="small muted">Assinatura eletrônica com registro de data, hora, IP e aparelho.</p></div>' +
            '<div class="row wrap" style="margin-top:20px;justify-content:flex-end"><button class="btn btn-g" data-close>Voltar</button><button class="btn btn-p" id="oka" disabled>Assinar e aprovar</button></div>',
            function (bg, close) {
              var c1 = bg.querySelector('#c1'), sig = bg.querySelector('#sig'), ok = bg.querySelector('#oka');
              var chk = function () { ok.disabled = !(c1.checked && sig.value.trim().split(/\s+/).length >= 2); };
              c1.addEventListener('change', chk); sig.addEventListener('input', chk);
              ok.addEventListener('click', function () { S.planApproved = true; save(); close(); O.toast('Plano aprovado. A recepção vai agendar as próximas etapas.'); render(); });
            });
        }
        else if (a === 'copypix') { try { navigator.clipboard.writeText(document.getElementById('pixcode').textContent); } catch (e) {} O.toast('Código Pix copiado. Cole no app do seu banco.'); }
        else if (a === 'paid') { S.paid.push(b.dataset.id); save(); O.toast('Pagamento confirmado. Recibo enviado no WhatsApp.'); render(); }
        else if (a === 'dl') O.toast('Download disponível na versão final.');
        else if (a === 'sign') {
          modal('<h2 style="font-size:20px;margin-bottom:8px">Termo de consentimento — restauração</h2><div class="card" style="box-shadow:none;max-height:220px;overflow:auto;font-size:14px;line-height:1.6">Eu, ' + pac.nome + ', autorizo a realização de restauração em resina composta no dente 36, conforme explicado pela Dra. Hemanuelly Brito. Fui informada sobre o procedimento, a anestesia local, a possível sensibilidade nos primeiros dias e as alternativas de tratamento. Sei que posso retirar este consentimento antes do procedimento.<br><br><em class="muted">Texto de demonstração.</em></div>' +
            '<label class="check" style="margin-top:14px"><input type="checkbox" id="cs"><span>Li e concordo com o termo.</span></label>' +
            '<div class="row wrap" style="margin-top:20px;justify-content:flex-end"><button class="btn btn-g" data-close>Voltar</button><button class="btn btn-p" id="oks" disabled>Assinar</button></div>',
            function (bg, close) {
              var cs = bg.querySelector('#cs'), ok = bg.querySelector('#oks');
              cs.addEventListener('change', function () { ok.disabled = !cs.checked; });
              ok.addEventListener('click', function () { S.signed.push(b.dataset.id); save(); close(); O.toast('Termo assinado.'); render(); });
            });
        }
        else if (a === 'handoff') { S.chat.push({ f: 'sys', t: 'Conversa transferida para a recepção · resposta em até 15 min no horário comercial' }); save(); render(); }
      });
    });
  };
  window.addEventListener('hashchange', render);
  render();
})();
