/* Área do Admin (OdontoFlow) — protótipo navegável com dados fictícios */
(function () {
  'use strict';
  var O = window.OF, esc = O.esc, I = O.icon, brl = O.brl;
  var app = document.getElementById('app');

  /* ================= dados de demonstração ================= */
  var DENTS = [
    { id: 'hb', nome: 'Dra. Hemanuelly Brito', curto: 'Dra. Hemanuelly', esp: 'Clínica geral', cad: 'Cadeira 1', com: .35 },
    { id: 'rm', nome: 'Dr. Rafael Moura', curto: 'Dr. Rafael', esp: 'Ortodontia', cad: 'Cadeira 2', com: .40 },
    { id: 'ca', nome: 'Dra. Camila Arruda', curto: 'Dra. Camila', esp: 'Implantes e prótese', cad: 'Cadeira 3', com: .40 },
    { id: 'tp', nome: 'Dr. Thiago Peixoto', curto: 'Dr. Thiago', esp: 'Endodontia e odontopediatria', cad: 'Cadeira 4', com: .38 }
  ];
  var dent = function (id) { return DENTS.filter(function (d) { return d.id === id; })[0]; };
  var PACS = [
    { id: 1, nome: 'Mariana Costa Lima', idade: 34, tel: '(81) 98812-4412', conv: 'Particular', origem: 'Instagram', ult: -21, alertas: ['Alergia: dipirona'], saldo: 0, retorno: 160 },
    { id: 2, nome: 'João Pedro Albuquerque', idade: 9, tel: '(81) 99731-0045', conv: 'OdontoPrev', origem: 'Indicação', ult: -40, alertas: ['Menor: resp. Fernanda Albuquerque'], saldo: 0, retorno: 140 },
    { id: 3, nome: 'Severino Ramos da Silva', idade: 67, tel: '(81) 98420-7731', conv: 'Particular', origem: 'Google', ult: -6, alertas: ['Anticoagulante: varfarina', 'Diabetes tipo 2'], saldo: 1450, retorno: 30 },
    { id: 4, nome: 'Ana Beatriz Souza', idade: 28, tel: '(81) 99104-2210', conv: 'Amil Dental', origem: 'Site', ult: -200, alertas: [], saldo: 0, retorno: -20 },
    { id: 5, nome: 'Luciana Freitas Moura', idade: 41, tel: '(81) 98877-3301', conv: 'Particular', origem: 'Indicação', ult: -14, alertas: ['Gestante (22 semanas)'], saldo: 380, retorno: 60 },
    { id: 6, nome: 'Rafael Tenório Cavalcanti', idade: 52, tel: '(81) 99245-9018', conv: 'Bradesco Dental', origem: 'Google', ult: -3, alertas: ['Hipertenso'], saldo: 0, retorno: 90 },
    { id: 7, nome: 'Camila Ventura Rocha', idade: 23, tel: '(81) 98190-5527', conv: 'Particular', origem: 'Instagram', ult: -95, alertas: [], saldo: 0, retorno: 85 },
    { id: 8, nome: 'Paulo Henrique Nogueira', idade: 45, tel: '(81) 99653-1180', conv: 'SulAmérica Odonto', origem: 'Site', ult: -260, alertas: ['Fumante'], saldo: 920, retorno: -80 },
    { id: 9, nome: 'Beatriz Lins Carneiro', idade: 31, tel: '(81) 98034-6672', conv: 'Particular', origem: 'Indicação', ult: -9, alertas: [], saldo: 0, retorno: 170 },
    { id: 10, nome: 'Gabriel Moura Pessoa', idade: 16, tel: '(81) 99412-3398', conv: 'Unimed Odonto', origem: 'Indicação', ult: -30, alertas: ['Menor: resp. Cláudia Pessoa'], saldo: 0, retorno: 0 },
    { id: 11, nome: 'Helena Duarte Vasconcelos', idade: 59, tel: '(81) 98566-2040', conv: 'Particular', origem: 'Google', ult: -190, alertas: ['Alergia: látex'], saldo: 0, retorno: -10 },
    { id: 12, nome: 'Thiago Arcoverde Melo', idade: 38, tel: '(81) 99880-7764', conv: 'Particular', origem: 'Instagram', ult: -2, alertas: [], saldo: 2600, retorno: 120 }
  ];
  var pac = function (id) { return PACS.filter(function (p) { return p.id === +id; })[0]; };

  var HOURS = ['08:00', '08:40', '09:20', '10:00', '10:40', '11:20', '12:00', '14:00', '14:40', '15:20', '16:00', '16:40', '17:20', '18:00'];
  var AG = [
    { d: 'hb', h: '08:00', p: 6, proc: 'Restauração 25 (resina)', st: 'done' },
    { d: 'hb', h: '08:40', p: 9, proc: 'Limpeza e profilaxia', st: 'done' },
    { d: 'hb', h: '09:20', p: 3, proc: 'Avaliação · retorno', st: 'done' },
    { d: 'hb', h: '10:00', p: 5, proc: 'Restauração 14 (resina)', st: 'att' },
    { d: 'hb', h: '10:40', p: 1, proc: 'Restauração 36 (resina)', st: 'chk' },
    { d: 'hb', h: '11:20', p: 7, proc: 'Clareamento · sessão 1', st: 'pend', risk: 72, why: 'Faltou 2 das últimas 5 consultas · não respondeu ao lembrete de ontem · marcou há 41 dias' },
    { d: 'hb', h: '12:00', block: 'Almoço' },
    { d: 'hb', h: '14:00', p: 11, proc: 'Avaliação · nova paciente', st: 'conf' },
    { d: 'hb', h: '15:20', p: 4, proc: 'Limpeza e profilaxia', st: 'pend', risk: 58, why: 'Último atendimento há 200 dias · confirmou só 1 de 3 lembretes' },
    { d: 'hb', h: '16:40', p: 12, proc: 'Ajuste de prótese', st: 'conf' },
    { d: 'rm', h: '08:00', p: 10, proc: 'Manutenção aparelho fixo', st: 'done' },
    { d: 'rm', h: '08:40', p: 2, proc: 'Avaliação ortodôntica', st: 'miss' },
    { d: 'rm', h: '10:00', p: 9, proc: 'Documentação ortodôntica', st: 'att' },
    { d: 'rm', h: '11:20', p: 2, proc: 'Retorno ortodôntico (reagendado)', st: 'conf' },
    { d: 'rm', h: '12:00', block: 'Almoço' },
    { d: 'rm', h: '14:40', p: 10, proc: 'Manutenção aparelho fixo', st: 'conf' },
    { d: 'rm', h: '16:00', p: 8, proc: 'Avaliação ortodôntica', st: 'pend', risk: 81, why: 'Faltou 3 vezes no último ano · saldo em aberto de R$ 920 · sem confirmação' },
    { d: 'ca', h: '08:40', p: 3, proc: 'Cirurgia de implante 46', st: 'done' },
    { d: 'ca', h: '10:40', p: 6, proc: 'Moldagem para coroa', st: 'conf' },
    { d: 'ca', h: '12:00', block: 'Almoço' },
    { d: 'ca', h: '14:00', block: 'Bloqueio · curso' },
    { d: 'ca', h: '14:40', block: 'Bloqueio · curso' },
    { d: 'ca', h: '16:00', p: 12, proc: 'Prova de prótese', st: 'conf' },
    { d: 'tp', h: '08:00', p: 2, proc: 'Selante · odontopediatria', st: 'done' },
    { d: 'tp', h: '09:20', p: 5, proc: 'Canal 14 · sessão 2', st: 'done' },
    { d: 'tp', h: '10:40', p: 4, proc: 'Canal 26 · sessão 1', st: 'conf' },
    { d: 'tp', h: '12:00', block: 'Almoço' },
    { d: 'tp', h: '14:00', p: 10, proc: 'Urgência · dor', st: 'conf' },
    { d: 'tp', h: '17:20', p: 11, proc: 'Canal 36 · sessão 1', st: 'pend', risk: 34, why: 'Histórico bom · lembrete enviado hoje às 08:00, ainda sem resposta' }
  ];
  var ST = { done: ['Atendido', 'st-done', 'b-neutral'], att: ['Em atendimento', 'st-att', 'b-ai'], chk: ['Chegou (check-in)', 'st-chk', 'b-info'], conf: ['Confirmado', 'st-conf', 'b-ok'], pend: ['A confirmar', 'st-pend', 'b-warn'], miss: ['Faltou', 'st-miss', 'b-bad'] };

  var ORC = [
    { id: 1, p: 1, d: 'hb', t: 'Resina 36/46 + clareamento', v: 2480, col: 'apres', dias: 2 },
    { id: 2, p: 8, d: 'rm', t: 'Alinhadores (18 meses)', v: 9800, col: 'neg', dias: 9, ai: 'Paulo abriu o orçamento 4 vezes e perguntou sobre parcelas. Sugestão: oferecer 18x no boleto e uma consulta de simulação 3D.' },
    { id: 3, p: 11, d: 'ca', t: 'Implante 36 + coroa', v: 4200, col: 'neg', dias: 12, ai: 'Parado há 12 dias. Pacientes com perfil parecido aprovam mais quando recebem um vídeo explicando o procedimento.' },
    { id: 4, p: 4, d: 'tp', t: 'Canal 26 + restauração', v: 1350, col: 'apr', dias: 0 },
    { id: 5, p: 12, d: 'ca', t: 'Prótese protocolo superior', v: 18500, col: 'apr', dias: 0 },
    { id: 6, p: 7, d: 'hb', t: 'Facetas em resina (6 dentes)', v: 3600, col: 'apres', dias: 5 },
    { id: 7, p: 5, d: 'hb', t: 'Restaurações 14 e 15', v: 760, col: 'apr', dias: 0 },
    { id: 8, p: 9, d: 'rm', t: 'Aparelho autoligado', v: 5400, col: 'perd', dias: 30, motivo: 'Preço' },
    { id: 9, p: 6, d: 'ca', t: 'Coroa cerâmica 25', v: 1900, col: 'apres', dias: 1 }
  ];
  var COLS = [['apres', 'Apresentado'], ['neg', 'Em negociação'], ['apr', 'Aprovado'], ['perd', 'Perdido']];

  var REC = [
    { p: 3, desc: 'Implante 46 · parcela 2/6', venc: -4, v: 725, st: 'atraso', forma: 'Boleto' },
    { p: 8, desc: 'Avaliação + limpeza', venc: -18, v: 920, st: 'atraso', forma: 'Pix' },
    { p: 12, desc: 'Prótese protocolo · entrada', venc: 0, v: 2600, st: 'aberto', forma: 'Cartão 10x' },
    { p: 5, desc: 'Restaurações 14/15', venc: 2, v: 380, st: 'aberto', forma: 'Pix' },
    { p: 6, desc: 'Restauração 25', venc: 0, v: 340, st: 'pago', forma: 'Pix' },
    { p: 9, desc: 'Limpeza e profilaxia', venc: 0, v: 220, st: 'pago', forma: 'Cartão débito' },
    { p: 10, desc: 'Manutenção ortodôntica', venc: 0, v: 0, st: 'conv', forma: 'Unimed Odonto (guia TISS)' },
    { p: 3, desc: 'Implante 46 · parcela 3/6', venc: 26, v: 725, st: 'aberto', forma: 'Boleto' }
  ];
  var PAG = [
    { desc: 'Laboratório Dental Prime · 2 coroas', venc: 3, v: 980, cat: 'Laboratório' },
    { desc: 'Aluguel sala Boa Viagem', venc: 5, v: 6800, cat: 'Fixo' },
    { desc: 'Dental Cremer · materiais', venc: 8, v: 2140, cat: 'Materiais' },
    { desc: 'Folha de pagamento', venc: 7, v: 14200, cat: 'Pessoal' }
  ];

  var WA = [
    { id: 1, p: 7, last: 'Pode ser às 15h20 então?', min: 2, need: false, ai: true, tag: 'Remarcação', msgs: [
      ['in', 'Oi, tenho clareamento hoje 11h20 mas não vou conseguir sair do trabalho'], ['out', 'Oi, Camila! Sem problema. Posso remarcar para hoje às 15h20 ou amanhã às 08h40 com a Dra. Hemanuelly. Qual prefere?', 'Assistente IA'], ['in', 'Pode ser às 15h20 então?']], sug: 'Prontinho, Camila! Sua sessão de clareamento foi remarcada para hoje às 15h20 com a Dra. Hemanuelly. Lembre de evitar café e alimentos com corante nas 48h seguintes. 😊' },
    { id: 2, p: 3, last: 'Tá sangrando um pouco ainda onde fez o implante', min: 6, need: true, ai: false, tag: 'Clínico · urgente', msgs: [
      ['in', 'Bom dia. Tá sangrando um pouco ainda onde fez o implante'], ['out', 'Bom dia, Severino. Como é uma questão clínica, já avisei a Dra. Camila e a equipe vai te responder em instantes.', 'Assistente IA']], sug: 'Seu Severino, aqui é a Dra. Camila. Um pequeno sangramento nas primeiras 48h é esperado, ainda mais com a varfarina. Morda uma gaze limpa por 30 minutos sem trocar. Se não parar, me ligue no (81) 3000-0000 que te encaixo hoje.' },
    { id: 3, p: 4, last: 'Quanto fica a limpeza no Amil?', min: 18, need: false, ai: true, tag: 'Convênio', msgs: [
      ['in', 'Quanto fica a limpeza no Amil?'], ['out', 'Oi, Ana! Pelo Amil Dental a limpeza tem cobertura total no seu plano. Quer que eu confirme seu horário de hoje às 15h20?', 'Assistente IA']], sug: '' },
    { id: 4, p: 8, last: 'Vocês parcelam o alinhador em quantas vezes?', min: 44, need: true, ai: false, tag: 'Orçamento', msgs: [
      ['in', 'Vocês parcelam o alinhador em quantas vezes?']], sug: 'Oi, Paulo! O tratamento com alinhadores pode ser parcelado em até 18x no boleto ou 12x sem juros no cartão. Que tal agendar uma simulação 3D gratuita para ver o resultado antes de decidir?' },
    { id: 5, p: 9, last: '✔ Confirmado', min: 95, need: false, ai: true, tag: 'Confirmação', msgs: [
      ['out', 'Oi, Beatriz! Lembrete: documentação ortodôntica amanhã às 10h com o Dr. Rafael. Responda 1 para confirmar ou 2 para remarcar.', 'Automação'], ['in', '1'], ['out', '✔ Confirmado! Até amanhã.', 'Automação']], sug: '' }
  ];

  var AUD = [
    ['10:12', 'Dra. Hemanuelly Brito', 'Abriu prontuário', 'Luciana Freitas Moura'],
    ['10:05', 'Recepção · Juliana', 'Check-in', 'Mariana Costa Lima'],
    ['09:58', 'Dra. Hemanuelly Brito', 'Assinou evolução', 'Severino Ramos da Silva'],
    ['09:41', 'Dr. Thiago Peixoto', 'Abriu prontuário', 'Luciana Freitas Moura'],
    ['09:10', 'Gestor · Fernando', 'Exportou relatório financeiro', '—'],
    ['08:02', 'Sistema', 'Backup diário concluído', '—']
  ];

  /* estado (persistido no navegador para a demonstração) */
  var S = O.store.get('of_adm', null) || { logged: false, role: 'gestor', odo: {}, evo: {}, orc: null, waAuto: true };
  if (!S.orc) S.orc = ORC.map(function (o) { return { id: o.id, col: o.col }; });
  var save = function () { O.store.set('of_adm', S); };
  var ROLES = {
    gestor: { nome: 'Fernando Augusto', cargo: 'Gestor', nav: ['painel', 'agenda', 'pacientes', 'orcamentos', 'financeiro', 'whatsapp', 'config'], clin: true },
    dentista: { nome: 'Dra. Hemanuelly Brito', cargo: 'Dentista', nav: ['painel', 'agenda', 'pacientes', 'orcamentos'], clin: true, own: 'hb' },
    recepcao: { nome: 'Juliana Melo', cargo: 'Recepção', nav: ['painel', 'agenda', 'pacientes', 'orcamentos', 'financeiro', 'whatsapp'], clin: false }
  };
  var R = function () { return ROLES[S.role]; };

  /* ================= login ================= */
  var renderLogin = function () {
    app.innerHTML = '<main class="alogin" id="main"><form class="card" id="lf">' +
      '<div class="row between"><span class="row" style="gap:10px;font-weight:700;font-size:18px">' + I('tooth', 26) + 'OdontoFlow</span><span class="proto">Protótipo</span></div>' +
      '<div class="stack" style="gap:4px"><h1 style="font-size:24px">Acesso da equipe</h1><p class="muted">Maré Odontologia · Boa Viagem</p></div>' +
      '<label class="field">E-mail<input class="input" type="email" value="equipe@mareodonto.exemplo" autocomplete="username"></label>' +
      '<label class="field">Senha<input class="input" type="password" value="demonstracao" autocomplete="current-password"></label>' +
      '<label class="field">Código de verificação (2FA)<input class="input" inputmode="numeric" value="604 218" aria-describedby="h2fa"></label><p class="small muted" id="h2fa" style="margin-top:-12px">Do aplicativo autenticador. Obrigatório para acessar prontuários.</p>' +
      '<fieldset style="border:0;padding:0;margin:0" class="stack"><legend class="field" style="margin-bottom:8px">Entrar como (demonstração)</legend><div class="seg" id="rs">' +
      [['gestor', 'Gestor'], ['dentista', 'Dentista'], ['recepcao', 'Recepção']].map(function (r) { return '<button type="button" data-r="' + r[0] + '" aria-pressed="' + (S.role === r[0]) + '">' + r[1] + '</button>'; }).join('') + '</div></fieldset>' +
      '<button class="btn btn-p" id="lgo">Entrar</button><p class="small muted row" style="gap:8px">' + I('lock', 16) + 'Todo acesso a prontuário fica registrado no log de auditoria.</p></form></main>';
    app.querySelectorAll('[data-r]').forEach(function (b) { b.addEventListener('click', function () { S.role = b.dataset.r; save(); renderLogin(); }); });
    document.getElementById('lf').addEventListener('submit', function (e) {
      e.preventDefault(); var b = document.getElementById('lgo'); b.disabled = true; b.innerHTML = '<span class="spin"></span>Entrando…';
      setTimeout(function () { S.logged = true; save(); location.hash = '#painel'; render(); }, 600);
    });
  };

  /* ================= moldura ================= */
  var NAV = { painel: ['Painel', 'chart'], agenda: ['Agenda', 'cal'], pacientes: ['Pacientes', 'users'], orcamentos: ['Orçamentos', 'funnel'], financeiro: ['Financeiro', 'money'], whatsapp: ['WhatsApp', 'whats'], config: ['Configurações', 'gear'] };
  var frame = function (route, inner) {
    var r = R(), waNeed = WA.filter(function (w) { return w.need; }).length;
    return '<div class="ash" id="ash"><aside class="aside" aria-label="Menu"><a class="brand" href="#painel">' + I('tooth', 24) + 'OdontoFlow</a><div class="clinic">Maré Odontologia · Boa Viagem</div><nav class="stack" style="gap:2px">' +
      r.nav.map(function (k) { return '<a href="#' + k + '"' + (route.split('/')[0] === k ? ' aria-current="page"' : '') + '>' + I(NAV[k][1]) + NAV[k][0] + (k === 'whatsapp' && waNeed ? '<span class="count">' + waNeed + '</span>' : '') + '</a>'; }).join('') +
      '</nav><div class="sep">Atalhos</div><nav class="stack" style="gap:2px"><a href="../" target="_blank" rel="noopener">' + I('home') + 'Site da clínica</a><a href="../paciente/" target="_blank" rel="noopener">' + I('user') + 'Área do paciente</a></nav>' +
      '<div class="foot">' + I('shield', 14) + ' LGPD · dados isolados por clínica · backup diário às 08:00</div></aside>' +
      '<div><header class="atop"><button class="icon-btn menu-btn" data-act="menu" aria-label="Abrir menu">' + I('menu', 18) + '</button>' +
      '<div class="search" role="search"><label for="gs" style="position:absolute;left:-999px">Buscar</label>' + I('search', 18) + '<input class="input" id="gs" placeholder="Buscar paciente, telefone ou CPF" autocomplete="off"><kbd>/</kbd><div class="sres" id="sres" hidden></div></div>' +
      '<div class="row" style="gap:8px;margin-left:auto"><button class="btn btn-p btn-sm" data-act="newappt">' + I('plus', 16) + '<span class="hide-sm">Agendar</span></button>' +
      '<button class="icon-btn" data-act="theme" aria-label="Alternar tema">' + I(O.theme() === 'dark' ? 'sun' : 'moon', 18) + '</button>' +
      '<label style="position:absolute;left:-999px" for="rolesel">Perfil</label><select class="select" id="rolesel" style="width:auto;min-height:40px" title="Trocar perfil (demonstração)">' +
      Object.keys(ROLES).map(function (k) { return '<option value="' + k + '"' + (S.role === k ? ' selected' : '') + '>' + ROLES[k].cargo + ' · ' + ROLES[k].nome.split(' ')[0] + (ROLES[k].nome.indexOf('Dra.') === 0 ? ' ' + ROLES[k].nome.split(' ')[1] : '') + '</option>'; }).join('') + '</select>' +
      '<button class="icon-btn" data-act="logout" aria-label="Sair">' + I('out', 18) + '</button></div></header>' +
      '<main class="amain" id="main">' + inner + '</main></div></div>';
  };
  var ph = function (t, sub, right) { return '<div class="ph1"><div class="stack" style="gap:4px">' + (sub ? '<p class="muted">' + sub + '</p>' : '') + '<h1>' + t + '</h1></div>' + (right || '') + '</div>'; };
  var spark = function (vals, color) {
    var mx = Math.max.apply(null, vals), mn = Math.min.apply(null, vals), w = 120, h = 36;
    var pts = vals.map(function (v, i) { return (i / (vals.length - 1) * w).toFixed(1) + ',' + (h - 4 - (v - mn) / (mx - mn || 1) * (h - 8)).toFixed(1); }).join(' ');
    return '<svg class="spark" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="' + (color || 'var(--accent)') + '" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>';
  };
  var aiBox = function (title, body, actions) {
    return '<div class="ai-box"><div class="ai-h">' + I('spark', 16) + esc(title) + '<span class="badge b-ai" style="margin-left:auto">IA</span></div><div style="font-size:14px">' + body + '</div>' + (actions ? '<div class="row wrap" style="gap:8px;margin-top:10px">' + actions + '</div>' : '') + '</div>';
  };

  /* ================= páginas ================= */
  var pages = {};

  pages.painel = function () {
    var r = R(), own = r.own;
    var hoje = AG.filter(function (a) { return !a.block && (!own || a.d === own); });
    var risk = hoje.filter(function (a) { return a.risk >= 50; });
    var reat = PACS.filter(function (p) { return p.ult < -180; });
    var parado = ORC.filter(function (o) { var c = S.orc.filter(function (x) { return x.id === o.id; })[0]; return c.col === 'neg' && o.dias >= 7; });
    var k = own
      ? [['Consultas hoje', hoje.length, '+2 vs. quinta passada', 'up', [6, 7, 6, 8, 7, 9, hoje.length]], ['Produção no mês', brl(28640), '+12% vs. setembro', 'up', [18, 20, 22, 21, 25, 27, 28.6]], ['Comissão prevista', brl(28640 * .35), '35% da produção', '', [7, 7.5, 8, 8.2, 9, 9.6, 10]], ['Orçamentos aprovados', '64%', '+6 p.p. no trimestre', 'up', [52, 55, 58, 57, 60, 62, 64]]]
      : [['Faturamento no mês', brl(87420), '+9% vs. setembro', 'up', [61, 66, 70, 68, 74, 80, 87]], ['Consultas hoje', hoje.length, hoje.filter(function (a) { return a.st === 'done'; }).length + ' atendidas até agora', '', [21, 24, 22, 25, 23, 26, hoje.length]], ['Taxa de faltas (30 dias)', '7,8%', '−3,1 p.p. após lembretes com IA', 'up', [12, 11.5, 10.9, 10, 9.2, 8.4, 7.8]], ['Conversão de orçamentos', '58%', 'ticket médio ' + brl(2860), 'up', [49, 51, 50, 54, 55, 57, 58]]];
    var weeks = [[18.2, 20], [21.4, 20], [24.9, 22], [22.9, 22]];
    var origem = [['Indicação', 34], ['Google', 27], ['Instagram', 22], ['Site (agenda online)', 17]];
    var hr = new Date().getHours(), greet = hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite';
    return ph((own ? greet + ', Dra. Hemanuelly' : greet + ', ' + r.nome.split(' ')[0]), O.longDate(O.today()).replace(/^./, function (c) { return c.toUpperCase(); }) + (own ? ' · sua visão' : ' · visão da clínica'), '<span class="proto">Dados fictícios</span>') +
      '<div class="grid g4" style="margin-bottom:16px">' + k.map(function (x) { return '<section class="card kpi"><span class="small muted">' + x[0] + '</span><span class="v tnum">' + x[1] + '</span><span class="d ' + x[3] + '">' + x[2] + '</span>' + spark(x[4]) + '</section>'; }).join('') + '</div>' +
      '<div class="grid" style="grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px" id="pgrid">' +
      '<section class="card"><div class="card-h"><h3>Agenda de hoje</h3><a class="small" href="#agenda">Abrir agenda</a></div><div class="stack" style="gap:6px">' +
      hoje.slice().sort(function (a, b) { return a.h < b.h ? -1 : 1; }).slice(0, 9).map(function (a) {
        var p = pac(a.p), s = ST[a.st];
        return '<button class="row between" data-appt="' + a.d + '|' + a.h + '" style="padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--surface);cursor:pointer;font:inherit;color:inherit;text-align:left"><span class="row" style="gap:12px;min-width:0"><strong class="tnum" style="width:46px">' + a.h + '</strong><span style="min-width:0"><strong style="display:block;font-size:14px">' + esc(p.nome) + '</strong><span class="small muted">' + esc(a.proc) + (own ? '' : ' · ' + dent(a.d).curto) + '</span></span></span><span class="row" style="gap:6px">' + (a.risk >= 50 ? '<span class="badge b-bad">' + a.risk + '% risco</span>' : '') + '<span class="badge ' + s[2] + '">' + s[0] + '</span></span></button>';
      }).join('') + '</div></section>' +
      '<div class="stack" style="gap:16px">' +
      aiBox('O que merece atenção hoje',
        '<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:8px">' +
        '<li><strong>' + risk.length + ' pacientes com alto risco de falta</strong> hoje. Um lembrete com pedido de confirmação reduz faltas.</li>' +
        (own ? '' : '<li><strong>' + reat.length + ' pacientes sem retorno há mais de 6 meses.</strong> Campanha de retorno semestral pronta para enviar.</li>') +
        '<li><strong>' + parado.length + ' orçamentos parados</strong> há mais de 7 dias, somando ' + brl(parado.reduce(function (s, o) { return s + o.v; }, 0)) + '.</li>' +
        '<li>Paciente das 10:00 (Luciana) está <strong>gestante</strong>: evite anestésico com vasoconstritor sem avaliação.</li></ul>',
        '<button class="btn btn-ai btn-sm" data-act="remind">' + I('send', 14) + 'Enviar lembretes</button>' + (own ? '' : '<button class="btn btn-o btn-sm" data-act="recall">Revisar campanha</button>') + '<a class="btn btn-o btn-sm" href="#orcamentos">Ver orçamentos</a>') +
      '<p class="small muted" style="margin-top:-8px">Sugestões da IA. Nada é enviado sem a sua confirmação.</p>' +
      (own ? '' : '<section class="card"><div class="card-h"><h3>Faturamento por semana</h3><span class="small muted">mil R$ · meta em cinza</span></div><div class="bars">' + weeks.map(function (w, i) { var mx = 26; return '<div class="b"><div class="row" style="gap:4px;align-items:flex-end;height:100%;width:100%;justify-content:center"><i class="goal" style="height:' + (w[1] / mx * 100) + '%;max-width:18px"></i><i style="height:' + (w[0] / mx * 100) + '%;max-width:26px" title="' + brl(w[0] * 1000) + '"></i></div><span>Sem ' + (i + 1) + '</span></div>'; }).join('') + '</div></section>' +
        '<section class="card"><div class="card-h"><h3>Origem dos pacientes novos</h3><span class="small muted">últimos 90 dias</span></div><div class="stack" style="gap:10px">' + origem.map(function (o) { return '<div class="stack" style="gap:4px"><div class="row between small"><span>' + o[0] + '</span><strong class="tnum">' + o[1] + '%</strong></div><div class="bar"><i style="width:' + o[1] + '%"></i></div></div>'; }).join('') + '</div></section>') +
      '</div></div>';
  };

  /* agenda */
  var agDay = 0;
  pages.agenda = function () {
    var r = R(), cols = r.own ? DENTS.filter(function (d) { return d.id === r.own; }) : DENTS;
    var day = O.addDays(O.today(), agDay), isToday = agDay === 0;
    var grid = 'grid-template-columns:64px repeat(' + cols.length + ',minmax(190px,1fr))';
    var cell = function (d, h) {
      var a = isToday ? AG.filter(function (x) { return x.d === d.id && x.h === h; })[0] : null;
      if (!isToday && (h === '12:00')) a = { block: 'Almoço' };
      if (a && a.block) return '<div class="slot"><div class="appt st-block"><strong>' + esc(a.block) + '</strong></div></div>';
      if (a) {
        var p = pac(a.p), s = ST[a.st];
        return '<div class="slot"><button class="appt ' + s[1] + '" data-appt="' + a.d + '|' + a.h + '" aria-label="' + esc(p.nome + ', ' + a.proc + ', ' + s[0]) + '"><strong>' + esc(p.nome.split(' ').slice(0, 2).join(' ')) + '</strong>' + esc(a.proc) + (p.alertas.length ? ' · <span style="color:var(--bad)">' + I('alert', 11) + '</span>' : '') + (a.risk >= 50 ? '<span class="risk">' + a.risk + '%</span>' : '') + '</button></div>';
      }
      return '<div class="slot free" data-free="' + d.id + '|' + h + '" role="button" tabindex="0" aria-label="Agendar ' + d.curto + ' às ' + h + '"></div>';
    };
    return ph('Agenda', O.longDate(day).replace(/^./, function (c) { return c.toUpperCase(); }),
      '<div class="row wrap"><div class="row" style="gap:6px"><button class="icon-btn" data-day="-1" aria-label="Dia anterior">' + I('left', 18) + '</button><button class="btn btn-o btn-sm" data-day="0">Hoje</button><button class="icon-btn" data-day="1" aria-label="Próximo dia">' + I('right', 18) + '</button></div><div class="seg"><button aria-pressed="true">Dia</button><button data-act="soon">Semana</button><button data-act="soon">Mês</button></div><button class="btn btn-p" data-act="newappt">' + I('plus', 16) + 'Novo agendamento</button></div>') +
      '<div class="row between wrap" style="margin-bottom:12px"><div class="legend">' + Object.keys(ST).map(function (k) { return '<span><i class="dot ' + ST[k][1] + '" style="border-left:0;border:2px solid"></i>' + ST[k][0] + '</span>'; }).join('') + '<span><span class="risk" style="position:static">72%</span>Risco de falta (IA)</span></div>' +
      (isToday ? '<span class="small muted">Lista de espera: <strong>3 pacientes</strong> · encaixe sugerido às 11:20 se houver falta</span>' : '') + '</div>' +
      '<div class="agenda" style="' + grid + '"><div class="hcell" style="left:0;z-index:4;position:sticky"></div>' +
      cols.map(function (d) { return '<div class="hcell"><span class="av">' + O.initials(d.nome) + '</span><span style="min-width:0"><span style="display:block">' + d.curto + '</span><span class="small muted" style="font-weight:500">' + d.cad + ' · ' + d.esp + '</span></span></div>'; }).join('') +
      HOURS.map(function (h, i) { return '<div class="tcell" style="position:sticky;left:0' + (isToday && i === 3 ? ';position:sticky' : '') + '">' + h + '</div>' + cols.map(function (d) { return cell(d, h); }).join(''); }).join('') +
      '</div>';
  };

  var openAppt = function (key) {
    var k = key.split('|'), a = AG.filter(function (x) { return x.d === k[0] && x.h === k[1]; })[0]; if (!a) return;
    var p = pac(a.p), s = ST[a.st], d = dent(a.d);
    drawer('<div class="row between"><span class="badge ' + s[2] + '">' + s[0] + '</span><button class="icon-btn" data-close aria-label="Fechar">' + I('x', 18) + '</button></div>' +
      '<div class="row" style="gap:12px"><span class="av lg">' + O.initials(p.nome) + '</span><div><h2 style="font-size:20px">' + esc(p.nome) + '</h2><p class="small muted">' + p.idade + ' anos · ' + p.conv + ' · ' + p.tel + '</p></div></div>' +
      (p.alertas.length ? '<div class="row wrap" style="gap:6px">' + p.alertas.map(function (x) { return '<span class="alert-chip">' + I('alert', 12) + esc(x) + '</span>'; }).join('') + '</div>' : '') +
      '<div class="card" style="box-shadow:none"><div class="stack" style="gap:6px;font-size:14px"><div class="row between"><span class="muted">Horário</span><strong>' + a.h + ' · 40 min</strong></div><div class="row between"><span class="muted">Procedimento</span><strong>' + esc(a.proc) + '</strong></div><div class="row between"><span class="muted">Profissional</span><strong>' + d.curto + ' · ' + d.cad + '</strong></div></div></div>' +
      (a.risk >= 30 ? aiBox('Risco de falta: ' + a.risk + '%', esc(a.why), '<button class="btn btn-ai btn-sm" data-act="remind1">Enviar lembrete com confirmação</button><button class="btn btn-o btn-sm" data-act="wait">Avisar lista de espera</button>') : '') +
      '<div class="stack" style="gap:8px"><span class="field">Mudar status</span><div class="row wrap" style="gap:6px">' +
      ['conf', 'chk', 'att', 'done', 'miss'].map(function (x) { return '<button class="chip" data-st="' + x + '" aria-pressed="' + (a.st === x) + '">' + ST[x][0] + '</button>'; }).join('') + '</div></div>' +
      '<div class="row wrap" style="margin-top:auto">' + (R().clin ? '<a class="btn btn-p" href="#pacientes/' + p.id + '">Abrir prontuário</a>' : '<a class="btn btn-p" href="#pacientes/' + p.id + '">Abrir cadastro</a>') + '<button class="btn btn-o" data-act="wa1">' + I('whats', 16) + 'WhatsApp</button></div>',
      function (el, close) {
        el.querySelectorAll('[data-st]').forEach(function (b) { b.addEventListener('click', function () { a.st = b.dataset.st; if (a.st !== 'pend') a.risk = 0; close(); O.toast('Status alterado para "' + ST[a.st][0] + '".'); render(); }); });
        el.querySelectorAll('a').forEach(function (x) { x.addEventListener('click', close); });
      });
  };

  /* novo agendamento rápido (meta: < 30 s) */
  var newAppt = function (pre) {
    pre = pre || {};
    modal('<div class="row between" style="margin-bottom:14px"><h2 style="font-size:20px">Novo agendamento</h2><span class="small muted" id="timer">0 s</span></div>' +
      '<form class="stack" id="na" style="gap:14px"><label class="field">Paciente<input class="input" id="nap" list="pl" placeholder="Digite o nome ou telefone" autocomplete="off"><datalist id="pl">' + PACS.map(function (p) { return '<option value="' + esc(p.nome) + '">'; }).join('') + '</datalist></label>' +
      '<div class="grid g2" style="gap:12px"><label class="field">Profissional<select class="select" id="nad">' + DENTS.map(function (d) { return '<option value="' + d.id + '"' + (pre.d === d.id ? ' selected' : '') + '>' + d.curto + '</option>'; }).join('') + '</select></label>' +
      '<label class="field">Horário<select class="select" id="nah">' + HOURS.filter(function (h) { return h !== '12:00'; }).map(function (h) { return '<option' + (pre.h === h ? ' selected' : '') + '>' + h + '</option>'; }).join('') + '</select></label></div>' +
      '<label class="field">Procedimento<select class="select" id="napr"><option>Avaliação</option><option>Limpeza e profilaxia</option><option>Restauração em resina</option><option>Canal</option><option>Urgência</option><option>Retorno</option></select></label>' +
      '<label class="check"><input type="checkbox" checked><span>Enviar confirmação automática no WhatsApp</span></label>' +
      '<div class="row wrap" style="justify-content:flex-end"><button type="button" class="btn btn-g" data-close>Cancelar</button><button class="btn btn-p">Agendar</button></div></form>',
      function (el, close) {
        var t0 = Date.now(), tm = el.querySelector('#timer'), iv = setInterval(function () { tm.textContent = Math.round((Date.now() - t0) / 1000) + ' s'; }, 500);
        el.addEventListener('remove', function () { clearInterval(iv); });
        el.querySelector('#na').addEventListener('submit', function (e) {
          e.preventDefault(); clearInterval(iv);
          var nome = el.querySelector('#nap').value.trim(), p = PACS.filter(function (x) { return x.nome === nome; })[0];
          if (!p) { el.querySelector('#nap').focus(); O.toast('Escolha um paciente da lista (ou cadastre um novo).'); return; }
          var d = el.querySelector('#nad').value, h = el.querySelector('#nah').value;
          if (AG.some(function (x) { return x.d === d && x.h === h; })) { O.toast('Esse horário já está ocupado. Escolha outro.'); return; }
          AG.push({ d: d, h: h, p: p.id, proc: el.querySelector('#napr').value, st: 'pend' });
          close(); O.toast('Agendado em ' + Math.round((Date.now() - t0) / 1000) + ' s · confirmação enviada no WhatsApp.'); agDay = 0;
          if (location.hash === '#agenda') render(); else location.hash = '#agenda';
        });
      });
  };

  /* pacientes */
  var pfilter = '';
  pages.pacientes = function (sub) {
    if (sub) return ficha(pac(sub));
    var list = PACS.filter(function (p) { return !pfilter || (p.nome + p.tel).toLowerCase().indexOf(pfilter.toLowerCase()) >= 0; });
    return ph('Pacientes', PACS.length + ' cadastrados · ' + PACS.filter(function (p) { return p.retorno < 0; }).length + ' com retorno vencido', '<button class="btn btn-p" data-act="soon">' + I('plus', 16) + 'Novo paciente</button>') +
      '<div class="row wrap" style="margin-bottom:14px"><input class="input" id="pf" placeholder="Filtrar por nome ou telefone" value="' + esc(pfilter) + '" style="max-width:340px"><div class="seg"><button aria-pressed="true">Todos</button><button data-act="soon">Retorno vencido</button><button data-act="soon">Com saldo</button></div></div>' +
      '<div class="table-wrap"><table><thead><tr><th>Paciente</th><th>Telefone</th><th>Convênio</th><th>Último atendimento</th><th>Retorno</th><th>Saldo</th></tr></thead><tbody>' +
      list.map(function (p) {
        return '<tr style="cursor:pointer" data-go="#pacientes/' + p.id + '"><td><a href="#pacientes/' + p.id + '" class="row" style="gap:10px;text-decoration:none;color:var(--text)"><span class="av">' + O.initials(p.nome) + '</span><span><strong style="display:block">' + esc(p.nome) + '</strong><span class="small muted">' + p.idade + ' anos' + (p.alertas.length ? ' · <span style="color:var(--bad)">' + p.alertas.length + ' alerta' + (p.alertas.length > 1 ? 's' : '') + '</span>' : '') + '</span></span></a></td><td class="tnum">' + p.tel + '</td><td>' + p.conv + '</td><td class="tnum">' + O.dmy(O.addDays(O.today(), p.ult)) + '</td><td>' + (p.retorno < 0 ? '<span class="badge b-warn">Vencido há ' + (-p.retorno) + ' d</span>' : '<span class="small muted">em ' + p.retorno + ' d</span>') + '</td><td class="tnum">' + (p.saldo ? '<span style="color:var(--bad);font-weight:600">' + brl(p.saldo) + '</span>' : '—') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  };

  var ptab = 'resumo';
  var ficha = function (p) {
    if (!p) return ph('Paciente não encontrado', '');
    var clin = R().clin;
    var tabs = clin ? [['resumo', 'Resumo'], ['odonto', 'Odontograma'], ['evolucao', 'Evolução clínica'], ['anamnese', 'Anamnese'], ['imagens', 'Imagens'], ['fin', 'Financeiro']] : [['resumo', 'Cadastro'], ['fin', 'Financeiro']];
    if (!tabs.some(function (t) { return t[0] === ptab; })) ptab = 'resumo';
    return '<a href="#pacientes" class="small row" style="gap:4px;margin-bottom:12px;text-decoration:none">' + I('left', 16) + 'Pacientes</a>' +
      '<section class="card"><div class="row between wrap" style="gap:16px"><div class="row" style="gap:14px"><span class="av lg">' + O.initials(p.nome) + '</span><div><h1 style="font-size:24px">' + esc(p.nome) + '</h1><p class="muted small">' + p.idade + ' anos · ' + p.conv + ' · ' + p.tel + ' · paciente desde 2023 · origem: ' + p.origem + '</p></div></div>' +
      '<div class="row wrap" style="gap:8px"><button class="btn btn-o btn-sm" data-act="wa1">' + I('whats', 16) + 'WhatsApp</button><button class="btn btn-p btn-sm" data-act="newappt">' + I('cal', 16) + 'Agendar</button></div></div>' +
      (p.alertas.length ? '<div class="row wrap" style="gap:6px;margin-top:14px">' + p.alertas.map(function (x) { return '<span class="alert-chip">' + I('alert', 12) + esc(x) + '</span>'; }).join('') + '</div>' : '') + '</section>' +
      '<div class="ptabs" role="tablist">' + tabs.map(function (t) { return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (ptab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      (!clin ? '<p class="small muted" style="margin:-8px 0 14px">' + I('lock', 14) + ' Perfil Recepção: dados clínicos (prontuário, odontograma, anamnese) ficam ocultos.</p>' : '') +
      '<div role="tabpanel">' + TABP[ptab](p) + '</div>';
  };
  var TABP = {};
  TABP.resumo = function (p) {
    var clin = R().clin;
    return '<div class="grid" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px" id="rgrid">' +
      '<div class="stack" style="gap:16px">' +
      (clin ? aiBox('Resumo do paciente', '<p>' + esc(p.nome.split(' ')[0]) + ', ' + p.idade + ' anos. ' + (p.alertas.length ? '<strong>Atenção: ' + esc(p.alertas.join('; ')) + '.</strong> ' : '') + 'Último atendimento em ' + O.dmy(O.addDays(O.today(), p.ult)) + '. Plano em andamento: restaurações em resina nos dentes 36 e 46 (1 de 4 etapas concluída). Higiene regular; sangramento gengival leve relatado na última anamnese.</p>', '<button class="btn btn-o btn-sm" data-tab="evolucao">Ver evolução</button>') + '<p class="small muted" style="margin-top:-8px">Gerado a partir do prontuário. Confira antes de usar; não é diagnóstico.</p>' : '') +
      '<section class="card"><div class="card-h"><h3>Próximas consultas</h3></div><div class="stack" style="gap:8px">' +
      AG.filter(function (a) { return a.p === p.id; }).map(function (a) { return '<div class="row between" style="font-size:14px"><span><strong>Hoje ' + a.h + '</strong> · ' + esc(a.proc) + '</span><span class="badge ' + ST[a.st][2] + '">' + ST[a.st][0] + '</span></div>'; }).join('') +
      '<div class="row between small muted"><span>Retorno semestral</span><span>' + O.dmy(O.addDays(O.today(), Math.max(p.retorno, 0) + 30)) + '</span></div></div></section></div>' +
      '<section class="card"><div class="card-h"><h3>Cadastro</h3><button class="btn btn-g btn-sm" data-act="soon">Editar</button></div><dl style="margin:0;display:grid;grid-template-columns:auto 1fr;gap:8px 16px;font-size:14px">' +
      [['CPF', '***.482.317-**'], ['Nascimento', '14/03/' + (2026 - p.idade)], ['Telefone', p.tel], ['Convênio', p.conv], ['Origem', p.origem], ['Responsável', p.idade < 18 ? (p.alertas[0] || '').replace('Menor: resp. ', '') : '—'], ['Consentimento LGPD', '<span class="badge b-ok">Assinado</span>']].map(function (r) { return '<dt class="muted">' + r[0] + '</dt><dd style="margin:0;font-weight:500">' + r[1] + '</dd>'; }).join('') + '</dl></section></div>';
  };

  /* odontograma por face — FDI, permanente e decídua */
  var odoMode = 'perm', odoTool = 'carie';
  var TOOLS = [['carie', 'Cárie', '#E5484D'], ['rest', 'Restauração', '#2F80ED'], ['plan', 'A tratar (plano)', '#F2A33A'], ['ausente', 'Ausente', '#8A9BA0'], ['implante', 'Implante', '#7C5CDB'], ['coroa', 'Coroa', '#B8862B'], ['canal', 'Canal tratado', '#1C9C8A'], ['limpar', 'Limpar', 'transparent']];
  var toolColor = function (k) { return (TOOLS.filter(function (t) { return t[0] === k; })[0] || [])[2]; };
  TABP.odonto = function (p) {
    var key = 'p' + p.id;
    if (!S.odo[key]) S.odo[key] = p.id === 1 ? { 36: { f: { O: 'plan' } }, 46: { f: { O: 'plan' } }, 16: { f: { O: 'rest', M: 'rest' } }, 18: { w: 'ausente' }, 26: { w: 'canal', f: { O: 'rest' } } } : { 46: { w: 'implante' }, 14: { f: { O: 'carie' } }, 38: { w: 'ausente' } };
    var data = S.odo[key];
    var rows = odoMode === 'perm' ? [[18, 17, 16, 15, 14, 13, 12, 11], [21, 22, 23, 24, 25, 26, 27, 28], [48, 47, 46, 45, 44, 43, 42, 41], [31, 32, 33, 34, 35, 36, 37, 38]] : [[55, 54, 53, 52, 51], [61, 62, 63, 64, 65], [85, 84, 83, 82, 81], [71, 72, 73, 74, 75]];
    var tooth = function (n) {
      var t = data[n] || {}, f = t.f || {}, w = t.w;
      var fill = function (face) { return f[face] ? ' style="fill:' + toolColor(f[face]) + '"' : ''; };
      var up = Math.floor(n / 10) % 4 === 1 || Math.floor(n / 10) % 4 === 2 || Math.floor(n / 10) === 5 || Math.floor(n / 10) === 6;
      var right = [1, 4, 5, 8].indexOf(Math.floor(n / 10)) >= 0; /* lado direito do paciente → M fica à direita na tela */
      var faces = { top: up ? 'V' : 'L', bottom: up ? 'L' : 'V', left: right ? 'D' : 'M', right: right ? 'M' : 'D' };
      var lbl = 'Dente ' + n + (w ? ', ' + (TOOLS.filter(function (x) { return x[0] === w; })[0] || [0, w])[1] : '');
      return '<div class="tooth' + (w === 'ausente' ? ' missing' : '') + '">' + (up ? '<span class="num">' + n + '</span>' : '') +
        '<svg viewBox="0 0 40 40" role="group" aria-label="' + lbl + '">' +
        '<polygon class="f" data-t="' + n + '" data-f="' + faces.top + '" points="0,0 40,0 28,12 12,12"' + fill(faces.top) + '><title>' + n + ' ' + faces.top + '</title></polygon>' +
        '<polygon class="f" data-t="' + n + '" data-f="' + faces.right + '" points="40,0 40,40 28,28 28,12"' + fill(faces.right) + '><title>' + n + ' ' + faces.right + '</title></polygon>' +
        '<polygon class="f" data-t="' + n + '" data-f="' + faces.bottom + '" points="40,40 0,40 12,28 28,28"' + fill(faces.bottom) + '><title>' + n + ' ' + faces.bottom + '</title></polygon>' +
        '<polygon class="f" data-t="' + n + '" data-f="' + faces.left + '" points="0,40 0,0 12,12 12,28"' + fill(faces.left) + '><title>' + n + ' ' + faces.left + '</title></polygon>' +
        '<rect class="f" data-t="' + n + '" data-f="O" x="12" y="12" width="16" height="16"' + fill('O') + '><title>' + n + ' O/I</title></rect>' +
        (w && w !== 'ausente' ? '<circle cx="20" cy="20" r="17" fill="none" stroke="' + toolColor(w) + '" stroke-width="3" pointer-events="none"/>' : '') +
        (w === 'ausente' ? '<path d="M4 4L36 36M36 4L4 36" stroke="var(--bad)" stroke-width="2.5" pointer-events="none"/>' : '') +
        '</svg>' + (!up ? '<span class="num">' + n + '</span>' : '') + '</div>';
    };
    var arch = function (a, b) { return '<div class="arch">' + a.map(tooth).join('') + '<span class="gap"></span>' + b.map(tooth).join('') + '</div>'; };
    var marks = Object.keys(data).reduce(function (acc, n) { var t = data[n]; if (t.w) acc.push(n + ': ' + (TOOLS.filter(function (x) { return x[0] === t.w; })[0] || [0, t.w])[1]); Object.keys(t.f || {}).forEach(function (f) { acc.push(n + ' ' + f + ': ' + (TOOLS.filter(function (x) { return x[0] === t.f[f]; })[0] || [0, ''])[1]); }); return acc; }, []);
    return '<section class="card stack" style="gap:16px"><div class="row between wrap"><div class="seg"><button data-odo="perm" aria-pressed="' + (odoMode === 'perm') + '">Permanente</button><button data-odo="dec" aria-pressed="' + (odoMode === 'dec') + '">Decídua</button></div>' +
      '<span class="small muted">Escolha a marcação e clique na face do dente (V, L, M, D, O/I). Clique no centro com "Ausente", "Implante", "Coroa" ou "Canal" para marcar o dente todo.</span></div>' +
      '<div class="tools" role="toolbar" aria-label="Marcações">' + TOOLS.map(function (t) { return '<button data-tool="' + t[0] + '" aria-pressed="' + (odoTool === t[0]) + '"><span class="sw" style="background:' + t[2] + '"></span>' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div class="odo">' + arch(rows[0], rows[1]) + '<div style="height:10px"></div>' + arch(rows[2], rows[3]) + '</div>' +
      '<div class="row between wrap"><p class="small muted">' + (marks.length ? 'Marcações: ' + esc(marks.join(' · ')) : 'Nenhuma marcação.') + '</p><button class="btn btn-p btn-sm" data-act="plan">Gerar plano de tratamento</button></div></section>';
  };

  /* evolução clínica: assinada, imutável, com ditado por voz + organização por IA */
  TABP.evolucao = function (p) {
    var key = 'p' + p.id;
    if (!S.evo[key]) S.evo[key] = [
      { d: O.dmy(O.addDays(O.today(), p.ult)), by: 'Dra. Hemanuelly Brito', t: 'S: Paciente relata sensibilidade ao frio na região posterior inferior esquerda.\nO: Cárie em esmalte/dentina na face oclusal do 36 e 46, vistas na radiografia. Gengiva com sangramento leve à sondagem.\nA: Cáries ativas 36 e 46. Gengivite leve.\nP: Profilaxia realizada. Orientação de higiene. Agendar restaurações em resina 36 e 46.', h: 'a3f9…e21c' }
    ];
    return '<div class="grid" style="grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px" id="egrid">' +
      '<section class="card stack" style="gap:12px"><div class="card-h" style="margin:0"><h3>Nova evolução · ' + O.dmy(O.today()) + '</h3><span id="recst"></span></div>' +
      '<textarea class="textarea" id="evt" style="min-height:200px" placeholder="Digite ou dite a evolução do atendimento…"></textarea>' +
      '<div class="row wrap" style="gap:8px"><button class="btn btn-o btn-sm" id="dict">' + I('mic', 16) + 'Ditar</button><button class="btn btn-ai btn-sm" id="org">' + I('spark', 16) + 'Organizar com IA (SOAP)</button><button class="btn btn-g btn-sm" data-act="soon">Modelos</button></div>' +
      '<label class="check"><input type="checkbox" id="evok"><span>Revisei o texto. Ele descreve o atendimento realizado.</span></label>' +
      '<div class="row wrap" style="justify-content:space-between"><span class="small muted">Depois de assinada, a evolução não pode ser editada (só complementada).</span><button class="btn btn-p" id="evsign" disabled>' + I('lock', 16) + 'Assinar evolução</button></div>' +
      '<p class="ai-note">O ditado e a organização por IA são rascunhos. A responsabilidade e a assinatura são do profissional.</p></section>' +
      '<section class="card"><div class="card-h"><h3>Histórico</h3><span class="small muted">' + S.evo[key].length + ' registro' + (S.evo[key].length > 1 ? 's' : '') + '</span></div><div class="evo">' +
      S.evo[key].slice().reverse().map(function (e) { return '<div class="it"><div class="row between wrap"><strong>' + e.d + ' · ' + esc(e.by) + '</strong><span class="badge b-ok">' + I('lock', 12) + 'Assinada</span></div><p style="white-space:pre-line;font-size:14px;margin-top:6px">' + esc(e.t) + '</p><p class="hash" style="margin-top:6px">Assinatura digital · hash ' + e.h + '</p></div>'; }).join('') +
      '</div></section></div>';
  };
  TABP.anamnese = function (p) {
    var q = [['Alergias', p.alertas.filter(function (a) { return /Alergia/.test(a); }).join(', ').replace('Alergia: ', '') || 'Nega'], ['Anticoagulante / AAS', /Anticoag/.test(p.alertas.join()) ? 'Sim · varfarina 5 mg' : 'Não'], ['Diabetes', /Diabetes/.test(p.alertas.join()) ? 'Sim · tipo 2, controlada' : 'Não'], ['Pressão alta / cardiopatia', /Hipertenso/.test(p.alertas.join()) ? 'Sim · losartana 50 mg' : 'Não'], ['Gestação / amamentação', /Gestante/.test(p.alertas.join()) ? 'Sim · 22 semanas' : 'Não'], ['Fumante', /Fumante/.test(p.alertas.join()) ? 'Sim · 10 cigarros/dia' : 'Não'], ['Sangramento gengival', 'Às vezes, ao escovar']];
    return '<section class="card"><div class="card-h"><h3>Anamnese</h3><span class="badge b-info">Preenchida pelo paciente no portal · ' + O.dmy(O.addDays(O.today(), -2)) + '</span></div><div class="table-wrap" style="box-shadow:none"><table><tbody>' +
      q.map(function (r) { var alert = !/^(Não|Nega)/.test(r[1]) && r[0] !== 'Sangramento gengival'; return '<tr><td class="muted" style="width:40%">' + r[0] + '</td><td><strong' + (alert ? ' style="color:var(--bad)"' : '') + '>' + esc(r[1]) + '</strong>' + (alert ? ' <span class="alert-chip" style="margin-left:6px">alerta</span>' : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="small muted" style="margin-top:10px">Respostas com alerta aparecem no topo do prontuário e na agenda.</p></section>';
  };
  TABP.imagens = function () {
    var im = [['Panorâmica', -21], ['Periapical 36', -21], ['Periapical 46', -21], ['Foto intraoral frontal', -21], ['Panorâmica', -400]];
    return '<div class="row between wrap" style="margin-bottom:12px"><span class="small muted">Arraste para comparar imagens de datas diferentes.</span><button class="btn btn-o btn-sm" data-act="soon">' + I('plus', 16) + 'Enviar imagem</button></div><div class="grid g4">' +
      im.map(function (x) { return '<figure class="card" style="margin:0;padding:10px"><div class="ph" style="aspect-ratio:4/3;background:linear-gradient(135deg,#1d2b30,#3a4a50);border:0;color:#9fb3b8;border-radius:10px;display:flex;align-items:center;justify-content:center">' + I('tooth', 34) + '</div><figcaption class="small" style="margin-top:8px"><strong>' + x[0] + '</strong><br><span class="muted">' + O.dmy(O.addDays(O.today(), x[1])) + '</span></figcaption></figure>'; }).join('') + '</div>' +
      '<div style="margin-top:16px">' + aiBox('Análise assistida de radiografia (em breve)', 'Na versão final, a IA destaca na imagem possíveis cáries, perda óssea e restaurações com problema, como uma segunda opinião. O diagnóstico continua sendo do dentista.', '') + '</div>';
  };
  TABP.fin = function (p) {
    var mine = REC.filter(function (r) { return r.p === p.id; });
    return '<div class="table-wrap"><table><thead><tr><th>Descrição</th><th>Vencimento</th><th>Forma</th><th>Valor</th><th>Situação</th></tr></thead><tbody>' +
      (mine.length ? mine.map(recRow).join('') : '<tr><td colspan="5" class="muted">Sem lançamentos.</td></tr>') + '</tbody></table></div>';
  };

  /* orçamentos: funil com arrastar e soltar */
  pages.orcamentos = function () {
    var r = R(), list = ORC.filter(function (o) { return !r.own || o.d === r.own; });
    var colOf = function (o) { return S.orc.filter(function (x) { return x.id === o.id; })[0].col; };
    var tot = function (c) { return list.filter(function (o) { return colOf(o) === c; }).reduce(function (s, o) { return s + o.v; }, 0); };
    var apr = tot('apr'), all = list.reduce(function (s, o) { return s + o.v; }, 0);
    return ph('Orçamentos', 'Arraste os cartões entre as etapas', '<div class="row wrap"><span class="badge b-ok">Aprovados: ' + brl(apr) + '</span><span class="badge b-neutral">Conversão: ' + Math.round(apr / all * 100) + '%</span></div>') +
      '<div class="kanban">' + COLS.map(function (c) {
        var cards = list.filter(function (o) { return colOf(o) === c[0]; });
        return '<section class="col" data-col="' + c[0] + '" aria-label="' + c[1] + '"><h3><span>' + c[1] + ' <span class="muted">(' + cards.length + ')</span></span><span class="small tnum muted">' + brl(tot(c[0])) + '</span></h3>' +
          cards.map(function (o) {
            var p = pac(o.p);
            return '<article class="kcard" draggable="true" data-orc="' + o.id + '" tabindex="0" aria-label="' + esc(p.nome + ', ' + o.t + ', ' + brl(o.v)) + '"><div class="row between"><strong style="font-size:14px">' + esc(p.nome) + '</strong>' + (c[0] === 'neg' && o.dias >= 7 ? '<span class="badge b-warn">' + o.dias + ' d parado</span>' : '') + '</div><span class="small muted">' + esc(o.t) + ' · ' + dent(o.d).curto + '</span><strong class="tnum">' + brl(o.v) + '</strong>' +
              (o.ai && c[0] !== 'apr' && c[0] !== 'perd' ? '<div class="ai-box" style="padding:10px 12px"><div class="ai-h" style="font-size:12px;margin-bottom:4px">' + I('spark', 14) + 'Sugestão</div><p class="small">' + esc(o.ai) + '</p><button class="btn btn-ai btn-sm" style="margin-top:8px" data-fu="' + o.id + '">Revisar mensagem</button></div>' : '') +
              (o.motivo && c[0] === 'perd' ? '<span class="small muted">Motivo: ' + o.motivo + '</span>' : '') +
              '<div class="row" style="gap:6px" aria-label="Mover"><button class="btn btn-g btn-sm" data-mv="' + o.id + '|-1" aria-label="Voltar etapa">' + I('left', 14) + '</button><button class="btn btn-g btn-sm" data-mv="' + o.id + '|1" aria-label="Avançar etapa">' + I('right', 14) + '</button></div></article>';
          }).join('') + '</section>';
      }).join('') + '</div>';
  };

  /* financeiro */
  var recRow = function (r) {
    var p = pac(r.p), d = O.addDays(O.today(), r.venc);
    var st = { pago: '<span class="badge b-ok">Recebido</span>', aberto: '<span class="badge b-info">A receber</span>', atraso: '<span class="badge b-bad">Em atraso · ' + (-r.venc) + ' d</span>', conv: '<span class="badge b-neutral">Convênio</span>' }[r.st];
    return '<tr><td><strong>' + esc(p.nome) + '</strong><br><span class="small muted">' + esc(r.desc) + '</span></td><td class="tnum">' + O.dmy(d) + '</td><td>' + esc(r.forma) + '</td><td class="tnum">' + (r.v ? brl(r.v) : '—') + '</td><td>' + st + '</td></tr>';
  };
  pages.financeiro = function () {
    var r = R(), rec = REC.filter(function (x) { return x.st === 'pago'; }).reduce(function (s, x) { return s + x.v; }, 0);
    var aRec = REC.filter(function (x) { return x.st === 'aberto' || x.st === 'atraso'; }).reduce(function (s, x) { return s + x.v; }, 0);
    var atr = REC.filter(function (x) { return x.st === 'atraso'; }).reduce(function (s, x) { return s + x.v; }, 0);
    var aPag = PAG.reduce(function (s, x) { return s + x.v; }, 0);
    var gestor = S.role === 'gestor';
    var flow = [[-6, 9.8, 4.1], [-5, 12.4, 2.2], [-4, 8.6, 6.8], [-3, 14.1, 3.0], [-2, 10.2, 1.9], [-1, 11.7, 14.2], [0, 6.2, 2.1]];
    return ph('Financeiro', 'Outubro de 2026', '<div class="row wrap"><button class="btn btn-o btn-sm" data-act="soon">' + I('download', 16) + 'Exportar</button><button class="btn btn-p btn-sm" data-act="soon">' + I('plus', 16) + 'Lançamento</button></div>') +
      '<div class="grid g4" style="margin-bottom:16px">' +
      [['Recebido hoje', brl(rec), 'Pix e cartão conciliados', ''], ['A receber (30 d)', brl(aRec), REC.filter(function (x) { return x.st !== 'pago' && x.st !== 'conv'; }).length + ' lançamentos', ''], ['Inadimplência', brl(atr), '2 pacientes · régua de cobrança ativa', 'down'], [gestor ? 'A pagar (10 d)' : 'Formas de pagamento', gestor ? brl(aPag) : 'Pix · cartão · boleto', gestor ? PAG.length + ' contas' : 'link de pagamento no WhatsApp', '']].map(function (k) { return '<section class="card kpi"><span class="small muted">' + k[0] + '</span><span class="v tnum" style="font-size:22px">' + k[1] + '</span><span class="d ' + k[3] + '">' + k[2] + '</span></section>'; }).join('') + '</div>' +
      '<div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:16px" id="fgrid"><section class="stack" style="gap:10px"><div class="row between"><h3 style="font-size:16px">Contas a receber</h3><button class="btn btn-ai btn-sm" data-act="cobrar">' + I('spark', 14) + 'Cobrança gentil para atrasados</button></div><div class="table-wrap"><table><thead><tr><th>Paciente</th><th>Vencimento</th><th>Forma</th><th>Valor</th><th>Situação</th></tr></thead><tbody>' + REC.map(recRow).join('') + '</tbody></table></div></section>' +
      '<div class="stack" style="gap:16px">' +
      (gestor ? '<section class="card"><div class="card-h"><h3>Fluxo de caixa · 7 dias</h3><span class="small muted">mil R$</span></div><div class="bars" style="height:150px">' + flow.map(function (f) { var mx = 15; return '<div class="b"><div class="row" style="gap:3px;align-items:flex-end;height:100%;width:100%;justify-content:center"><i style="height:' + (f[1] / mx * 100) + '%;max-width:14px" title="Entradas ' + brl(f[1] * 1000) + '"></i><i style="height:' + (f[2] / mx * 100) + '%;max-width:14px;background:var(--bad)" title="Saídas ' + brl(f[2] * 1000) + '"></i></div><span>' + O.WDS[O.addDays(O.today(), f[0]).getDay()] + '</span></div>'; }).join('') + '</div><div class="legend" style="margin-top:8px"><span><i class="dot" style="background:var(--accent)"></i>Entradas</span><span><i class="dot" style="background:var(--bad)"></i>Saídas</span></div></section>' +
        '<section class="card"><div class="card-h"><h3>Comissões do mês</h3></div><div class="stack" style="gap:8px">' + DENTS.map(function (d, i) { var prod = [28640, 22100, 31800, 18900][i]; return '<div class="row between small"><span>' + d.curto + ' · ' + Math.round(d.com * 100) + '%</span><strong class="tnum">' + brl(prod * d.com) + '</strong></div>'; }).join('') + '</div></section>' +
        '<section class="card"><div class="card-h"><h3>DRE simplificado</h3><span class="small muted">outubro</span></div><div class="stack small" style="gap:6px">' + [['Receita bruta', 87420], ['(−) Impostos (Simples)', -5245], ['(−) Comissões', -36472], ['(−) Laboratório e materiais', -9810], ['(−) Despesas fixas', -24300], ['= Resultado', 11593]].map(function (x, i) { return '<div class="row between"' + (i === 5 ? ' style="border-top:1px solid var(--line);padding-top:6px;font-weight:700"' : '') + '><span>' + x[0] + '</span><span class="tnum">' + brl(x[1]) + '</span></div>'; }).join('') + '</div></section>'
        : '<section class="card"><div class="card-h"><h3>NFS-e</h3><span class="badge b-info">Fase 2</span></div><p class="small muted">Emissão automática de nota fiscal de serviço a cada recebimento.</p></section>') +
      '</div></div>';
  };

  /* WhatsApp: assistente com IA + transferência para a equipe */
  var waSel = 1;
  pages.whatsapp = function () {
    var c = WA.filter(function (w) { return w.id === waSel; })[0], p = pac(c.p);
    return ph('WhatsApp', 'Assistente com IA atende 24h e passa para a equipe quando precisa',
      '<label class="row" style="gap:10px;font-weight:600;font-size:14px;cursor:pointer"><input type="checkbox" id="waauto"' + (S.waAuto ? ' checked' : '') + ' style="width:20px;height:20px;accent-color:var(--ai)">Assistente automático ' + (S.waAuto ? '<span class="badge b-ai">ligado</span>' : '<span class="badge b-neutral">desligado</span>') + '</label>') +
      '<div class="wa"><div class="wa-list" role="list">' + WA.map(function (w) {
        var pp = pac(w.p);
        return '<button role="listitem" data-wa="' + w.id + '" aria-current="' + (w.id === waSel) + '"><span class="av">' + O.initials(pp.nome) + '</span><span style="min-width:0;flex:1"><span class="row between"><strong style="font-size:14px">' + esc(pp.nome.split(' ').slice(0, 2).join(' ')) + '</strong><span class="small muted">' + (w.min < 60 ? w.min + ' min' : Math.round(w.min / 60) + ' h') + '</span></span><span class="small muted" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(w.last) + '</span><span class="row" style="gap:6px;margin-top:4px">' + (w.need ? '<span class="badge b-warn">Precisa da equipe</span>' : '<span class="badge b-ai">IA resolveu</span>') + '<span class="badge b-neutral">' + w.tag + '</span></span></span></button>';
      }).join('') + '</div>' +
      '<div class="wa-conv"><div class="row between" style="padding:12px 16px;border-bottom:1px solid var(--line)"><div class="row" style="gap:10px"><span class="av">' + O.initials(p.nome) + '</span><div><strong>' + esc(p.nome) + '</strong><p class="small muted">' + p.tel + '</p></div></div><a class="btn btn-o btn-sm" href="#pacientes/' + p.id + '">Ficha</a></div>' +
      '<div class="wa-msgs" id="wam">' + c.msgs.map(function (m) { return '<div class="wm ' + m[0] + '">' + (m[2] ? '<span class="by">' + m[2] + '</span>' : '') + esc(m[1]) + '</div>'; }).join('') + '</div>' +
      (c.sug ? '<div style="padding:12px 16px;border-top:1px solid var(--line)">' + aiBox('Resposta sugerida', '<textarea class="textarea" id="wasug" style="min-height:90px;background:var(--surface)">' + esc(c.sug) + '</textarea>', '<button class="btn btn-ai btn-sm" data-act="wasend">' + I('send', 14) + 'Enviar</button><button class="btn btn-g btn-sm" data-act="wadis">Descartar</button>') + '</div>' : '') +
      '<form class="row" id="waf" style="padding:12px 16px;border-top:1px solid var(--line);gap:8px"><label for="wat" style="position:absolute;left:-999px">Mensagem</label><input class="input" id="wat" placeholder="Escrever como equipe…" autocomplete="off"><button class="btn btn-p" aria-label="Enviar">' + I('send', 18) + '</button></form></div>' +
      '<aside class="wa-side"><h3 style="font-size:15px">Contexto do paciente</h3>' +
      (p.alertas.length ? '<div class="row wrap" style="gap:6px">' + p.alertas.map(function (x) { return '<span class="alert-chip">' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
      '<div class="stack small" style="gap:6px"><div class="row between"><span class="muted">Convênio</span><strong>' + p.conv + '</strong></div><div class="row between"><span class="muted">Saldo</span><strong>' + (p.saldo ? brl(p.saldo) : '—') + '</strong></div><div class="row between"><span class="muted">Hoje</span><strong>' + (AG.filter(function (a) { return a.p === p.id; }).map(function (a) { return a.h; }).join(', ') || '—') + '</strong></div></div>' +
      '<div class="card" style="box-shadow:none;padding:14px"><strong style="font-size:13px">O assistente pode</strong><ul class="small muted" style="margin:6px 0 0;padding-left:18px"><li>Confirmar, remarcar e cancelar</li><li>Responder sobre convênios, preços e pagamento</li><li>Enviar 2ª via de Pix e documentos</li></ul><strong style="font-size:13px;display:block;margin-top:10px">Sempre passa para a equipe</strong><ul class="small muted" style="margin:6px 0 0;padding-left:18px"><li>Dor, sangramento, inchaço, urgência</li><li>Dúvidas clínicas e diagnóstico</li><li>Reclamações</li></ul></div></aside></div>';
  };

  /* configurações */
  pages.config = function () {
    var perms = [['Agenda de todos os dentistas', 1, 0, 1], ['Prontuário, odontograma e evolução', 1, 1, 0], ['Anamnese e alertas de saúde', 1, 1, 0], ['Orçamentos', 1, 1, 1], ['Recebimentos', 1, 0, 1], ['Fluxo de caixa, DRE e comissões', 1, 0, 0], ['WhatsApp da clínica', 1, 0, 1], ['Usuários e configurações', 1, 0, 0]];
    var yes = '<span style="color:var(--ok)">' + I('check', 18) + '</span>', no = '<span class="muted">—</span>';
    return ph('Configurações', 'Equipe, permissões e segurança') +
      '<div class="grid" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px" id="cgrid"><div class="stack" style="gap:16px">' +
      '<section class="card"><div class="card-h"><h3>Permissões por perfil</h3><button class="btn btn-g btn-sm" data-act="soon">Editar</button></div><div class="table-wrap" style="box-shadow:none"><table class="perm"><thead><tr><th>Recurso</th><th>Gestor</th><th>Dentista</th><th>Recepção</th></tr></thead><tbody>' +
      perms.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + (r[1] ? yes : no) + '</td><td>' + (r[2] ? yes : no) + '</td><td>' + (r[3] ? yes : no) + '</td></tr>'; }).join('') + '</tbody></table></div><p class="small muted" style="margin-top:8px">Dentista vê só a própria agenda e as próprias comissões.</p></section>' +
      '<section class="card"><div class="card-h"><h3>Log de auditoria · hoje</h3><button class="btn btn-g btn-sm" data-act="soon">' + I('download', 16) + 'Exportar</button></div><div class="table-wrap" style="box-shadow:none"><table><thead><tr><th>Hora</th><th>Usuário</th><th>Ação</th><th>Paciente</th></tr></thead><tbody>' +
      AUD.map(function (a) { return '<tr><td class="tnum">' + a[0] + '</td><td>' + esc(a[1]) + '</td><td>' + esc(a[2]) + '</td><td>' + esc(a[3]) + '</td></tr>'; }).join('') + '</tbody></table></div></section></div>' +
      '<div class="stack" style="gap:16px"><section class="card"><div class="card-h"><h3>Equipe</h3><button class="btn btn-o btn-sm" data-act="soon">' + I('plus', 16) + 'Convidar</button></div><div class="stack" style="gap:10px">' +
      [['Fernando Augusto', 'Gestor'], ['Dra. Hemanuelly Brito', 'Dentista · CRO-PE [nº]'], ['Dr. Rafael Moura', 'Dentista · CRO-PE 13.907'], ['Dra. Camila Arruda', 'Dentista · CRO-PE 15.236'], ['Dr. Thiago Peixoto', 'Dentista · CRO-PE 16.051'], ['Juliana Melo', 'Recepção']].map(function (u) { return '<div class="row between"><span class="row" style="gap:10px"><span class="av">' + O.initials(u[0]) + '</span><span><strong style="font-size:14px;display:block">' + u[0] + '</strong><span class="small muted">' + u[1] + '</span></span></span><span class="badge b-ok">2FA</span></div>'; }).join('') + '</div></section>' +
      '<section class="card stack" style="gap:10px"><h3 style="font-size:16px">Segurança e LGPD</h3>' +
      [['Autenticação em dois fatores', 'Obrigatória para todos'], ['Backup', 'Diário às 08:00 · último concluído hoje'], ['Retenção do prontuário', '20 anos (CFO)'], ['Encarregado de dados (DPO)', 'dpo@mareodonto.exemplo'], ['Isolamento de dados', 'Por clínica (Row Level Security)']].map(function (x) { return '<div class="row between small"><span class="muted">' + x[0] + '</span><strong style="text-align:right">' + x[1] + '</strong></div>'; }).join('') + '</section>' +
      '<section class="card stack" style="gap:10px"><h3 style="font-size:16px">Inteligência artificial</h3>' +
      [['Previsão de faltas', true], ['Ditado e organização da evolução', true], ['Assistente do WhatsApp', true], ['Resumo do paciente', true]].map(function (x) { return '<label class="row between small" style="cursor:pointer"><span>' + x[0] + '</span><input type="checkbox"' + (x[1] ? ' checked' : '') + ' style="width:20px;height:20px;accent-color:var(--ai)"></label>'; }).join('') +
      '<p class="small muted">Toda saída de IA exige confirmação humana. Nenhum dado de paciente é usado para treinar modelos.</p></section></div></div>';
  };

  /* ================= componentes ================= */
  var modal = function (html, onMount) {
    var bg = document.createElement('div'); bg.className = 'modal-bg';
    bg.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(bg);
    var prev = document.activeElement;
    var close = function () { bg.dispatchEvent(new Event('remove')); bg.remove(); document.removeEventListener('keydown', k); if (prev && prev.focus) prev.focus(); };
    var k = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', k);
    bg.addEventListener('click', function (e) { if (e.target === bg || e.target.closest('[data-close]')) close(); });
    var f = bg.querySelector('input,select,button'); if (f) f.focus();
    if (onMount) onMount(bg, close);
  };
  var drawer = function (html, onMount) {
    var bg = document.createElement('div'); bg.className = 'drawer-bg';
    var d = document.createElement('aside'); d.className = 'drawer'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.innerHTML = html;
    document.body.appendChild(bg); document.body.appendChild(d);
    var close = function () { bg.remove(); d.remove(); document.removeEventListener('keydown', k); };
    var k = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', k);
    bg.addEventListener('click', close);
    d.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    d.querySelectorAll('[data-act]').forEach(function (b) { b.addEventListener('click', function () { act(b.dataset.act, b); }); });
    var f = d.querySelector('button'); if (f) f.focus();
    if (onMount) onMount(d, close);
  };

  /* ================= ações ================= */
  var act = function (a, b) {
    if (a === 'theme') { O.theme(O.theme() === 'dark' ? 'light' : 'dark'); render(); }
    else if (a === 'logout') { S.logged = false; save(); location.hash = ''; render(); }
    else if (a === 'menu') document.getElementById('ash').classList.toggle('open');
    else if (a === 'newappt') newAppt();
    else if (a === 'soon') O.toast('Disponível na versão completa.');
    else if (a === 'remind') O.toast('Lembretes com pedido de confirmação enviados para 3 pacientes.');
    else if (a === 'remind1') O.toast('Lembrete enviado no WhatsApp com botões Confirmar / Remarcar.');
    else if (a === 'wait') O.toast('3 pacientes da lista de espera avisados sobre o possível encaixe.');
    else if (a === 'wa1') { location.hash = '#whatsapp'; }
    else if (a === 'recall') modal('<h2 style="font-size:20px;margin-bottom:6px">Campanha de retorno semestral</h2><p class="muted" style="margin-bottom:14px">' + PACS.filter(function (p) { return p.ult < -180; }).length + ' pacientes sem consulta há mais de 6 meses.</p>' + aiBox('Mensagem sugerida', '<textarea class="textarea" style="background:var(--surface)">Oi, {primeiro_nome}! Já faz um tempinho desde sua última visita à Maré Odontologia. Que tal agendar sua limpeza e revisão? É só responder esta mensagem ou tocar no link: mareodonto.exemplo/agendar</textarea>', '') + '<div class="row wrap" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-g" data-close>Cancelar</button><button class="btn btn-p" data-close id="rc">Enviar para ' + PACS.filter(function (p) { return p.ult < -180; }).length + ' pacientes</button></div>', function (el) { el.querySelector('#rc').addEventListener('click', function () { O.toast('Campanha agendada para hoje às 18:00.'); }); });
    else if (a === 'cobrar') modal('<h2 style="font-size:20px;margin-bottom:12px">Cobrança de parcelas em atraso</h2>' + aiBox('Mensagem sugerida (tom gentil)', '<textarea class="textarea" style="background:var(--surface)">Oi, {primeiro_nome}, tudo bem? Notamos que a parcela de {valor} venceu em {data}. Se já pagou, desconsidere. Para facilitar, segue o Pix: {link_pix}. Qualquer dúvida, estamos por aqui.</textarea>', '') + '<p class="small muted" style="margin-top:10px">Vai para Severino Ramos e Paulo Henrique, com link de Pix individual.</p><div class="row wrap" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-g" data-close>Cancelar</button><button class="btn btn-p" data-close id="cb">Enviar no WhatsApp</button></div>', function (el) { el.querySelector('#cb').addEventListener('click', function () { O.toast('Mensagens de cobrança enviadas.'); }); });
    else if (a === 'plan') O.toast('Plano de tratamento gerado a partir do odontograma · enviado ao portal do paciente para aprovação.');
    else if (a === 'wasend') { var c = WA.filter(function (w) { return w.id === waSel; })[0]; c.msgs.push(['out', document.getElementById('wasug').value, R().nome.split(' ')[0] + ' (equipe)']); c.sug = ''; c.need = false; c.last = 'Você: ' + c.msgs[c.msgs.length - 1][1].slice(0, 40); render(); O.toast('Mensagem enviada.'); }
    else if (a === 'wadis') { WA.filter(function (w) { return w.id === waSel; })[0].sug = ''; render(); }
  };

  var bind = function (route) {
    app.querySelectorAll('[data-act]').forEach(function (b) { b.addEventListener('click', function () { act(b.dataset.act, b); }); });
    var rs = document.getElementById('rolesel');
    if (rs) rs.addEventListener('change', function () { S.role = rs.value; save(); var base = location.hash.slice(1).split('/')[0]; if (R().nav.indexOf(base) < 0) location.hash = '#painel'; render(); O.toast('Perfil: ' + R().cargo); });
    /* busca global */
    var gs = document.getElementById('gs'), sr = document.getElementById('sres');
    if (gs) {
      gs.addEventListener('input', function () {
        var q = gs.value.trim().toLowerCase(); if (!q) { sr.hidden = true; return; }
        var hits = PACS.filter(function (p) { return (p.nome + ' ' + p.tel).toLowerCase().indexOf(q) >= 0; }).slice(0, 6);
        sr.innerHTML = hits.length ? hits.map(function (p) { return '<a href="#pacientes/' + p.id + '"><span class="av">' + O.initials(p.nome) + '</span><span><strong>' + esc(p.nome) + '</strong><br><span class="small muted">' + p.tel + ' · ' + p.conv + '</span></span></a>'; }).join('') : '<p class="small muted" style="padding:10px">Nenhum paciente encontrado.</p>';
        sr.hidden = false;
      });
      gs.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var f = sr.querySelector('a'); if (f) location.hash = f.getAttribute('href'); } if (e.key === 'Escape') { sr.hidden = true; gs.blur(); } });
      sr.addEventListener('click', function () { sr.hidden = true; gs.value = ''; });
    }
    app.querySelectorAll('[data-appt]').forEach(function (b) { b.addEventListener('click', function () { openAppt(b.dataset.appt); }); });
    app.querySelectorAll('[data-free]').forEach(function (b) { var go = function () { var k = b.dataset.free.split('|'); newAppt({ d: k[0], h: k[1] }); }; b.addEventListener('click', go); b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
    app.querySelectorAll('[data-day]').forEach(function (b) { b.addEventListener('click', function () { var v = +b.dataset.day; agDay = v === 0 ? 0 : agDay + v; render(); }); });
    var pf = document.getElementById('pf');
    if (pf) pf.addEventListener('input', function () { pfilter = pf.value; var pos = pf.selectionStart; render(); var n = document.getElementById('pf'); n.focus(); n.setSelectionRange(pos, pos); });
    app.querySelectorAll('tr[data-go]').forEach(function (tr) { tr.addEventListener('click', function (e) { if (!e.target.closest('a')) location.hash = tr.dataset.go; }); });
    app.querySelectorAll('[data-tab]').forEach(function (b) { b.addEventListener('click', function () { ptab = b.dataset.tab; render(); }); });
    app.querySelectorAll('[data-odo]').forEach(function (b) { b.addEventListener('click', function () { odoMode = b.dataset.odo; render(); }); });
    app.querySelectorAll('[data-tool]').forEach(function (b) { b.addEventListener('click', function () { odoTool = b.dataset.tool; render(); }); });
    app.querySelectorAll('.tooth .f').forEach(function (f) {
      f.addEventListener('click', function () {
        var pid = route.split('/')[1], data = S.odo['p' + pid], n = f.dataset.t, face = f.dataset.f;
        data[n] = data[n] || {}; data[n].f = data[n].f || {};
        var whole = ['ausente', 'implante', 'coroa', 'canal'].indexOf(odoTool) >= 0;
        if (odoTool === 'limpar') { delete data[n]; }
        else if (whole && face === 'O') { data[n].w = data[n].w === odoTool ? undefined : odoTool; }
        else if (whole) { data[n].w = odoTool; }
        else { data[n].f[face] = data[n].f[face] === odoTool ? undefined : odoTool; }
        save(); render();
      });
    });
    /* evolução */
    var evt = document.getElementById('evt');
    if (evt) {
      var pid = route.split('/')[1], ok = document.getElementById('evok'), sign = document.getElementById('evsign');
      var chk = function () { sign.disabled = !(ok.checked && evt.value.trim().length > 10); };
      evt.addEventListener('input', chk); ok.addEventListener('change', chk);
      var dictating = null;
      document.getElementById('dict').addEventListener('click', function () {
        var btn = this, st = document.getElementById('recst');
        if (dictating) { clearInterval(dictating); dictating = null; st.innerHTML = ''; btn.innerHTML = I('mic', 16) + 'Ditar'; return; }
        var txt = 'paciente compareceu para restauração do trinta e seis relatou que a sensibilidade melhorou anestesia infiltrativa com lidocaína sem vasoconstritor por causa da gestação isolamento relativo remoção do tecido cariado restauração em resina cor A2 em camadas ajuste oclusal e polimento orientado a evitar mastigar do lado esquerdo por duas horas próximo passo restauração do quarenta e seis ';
        var i = 0; st.innerHTML = '<span class="rec"><i></i>Gravando…</span>'; btn.innerHTML = I('x', 16) + 'Parar';
        dictating = setInterval(function () {
          var nx = txt.indexOf(' ', i + 1); if (nx < 0) { clearInterval(dictating); dictating = null; st.innerHTML = '<span class="badge b-ai">Transcrito</span>'; btn.innerHTML = I('mic', 16) + 'Ditar'; chk(); return; }
          evt.value += txt.slice(i, nx); i = nx; evt.scrollTop = evt.scrollHeight;
        }, 70);
      });
      document.getElementById('org').addEventListener('click', function () {
        var b = this; if (!evt.value.trim()) { O.toast('Dite ou escreva a evolução primeiro.'); return; }
        b.disabled = true; b.innerHTML = '<span class="spin"></span>Organizando…';
        setTimeout(function () {
          evt.value = 'S: Paciente refere melhora da sensibilidade no 36.\nO: Cárie oclusal no 36.\nA: Cárie ativa 36.\nP: Anestesia infiltrativa com lidocaína sem vasoconstritor (paciente gestante). Isolamento relativo, remoção do tecido cariado, restauração em resina composta cor A2 em incrementos, ajuste oclusal e polimento. Orientada a não mastigar do lado esquerdo por 2 h. Próxima etapa: restauração do 46.';
          b.disabled = false; b.innerHTML = I('spark', 16) + 'Organizar com IA (SOAP)'; document.getElementById('recst').innerHTML = '<span class="badge b-ai">Rascunho da IA · revise</span>'; chk();
        }, 900);
      });
      sign.addEventListener('click', function () {
        var hx = Math.random().toString(16).slice(2, 6) + '…' + Math.random().toString(16).slice(2, 6);
        S.evo['p' + pid].push({ d: O.dmy(O.today()), by: R().own ? R().nome : 'Dra. Hemanuelly Brito', t: evt.value.trim(), h: hx }); save();
        O.toast('Evolução assinada e registrada no log de auditoria.'); render();
      });
    }
    /* funil */
    var move = function (id, col) { var o = S.orc.filter(function (x) { return x.id === +id; })[0]; o.col = col; save(); render(); };
    app.querySelectorAll('[data-mv]').forEach(function (b) { b.addEventListener('click', function () { var k = b.dataset.mv.split('|'), o = S.orc.filter(function (x) { return x.id === +k[0]; })[0], i = COLS.map(function (c) { return c[0]; }).indexOf(o.col) + (+k[1]); if (i >= 0 && i < COLS.length) { move(k[0], COLS[i][0]); O.toast('Movido para "' + COLS[i][1] + '".'); } }); });
    app.querySelectorAll('.kcard').forEach(function (c) {
      c.addEventListener('dragstart', function (e) { c.classList.add('drag'); e.dataTransfer.setData('text/plain', c.dataset.orc); });
      c.addEventListener('dragend', function () { c.classList.remove('drag'); });
    });
    app.querySelectorAll('.col').forEach(function (col) {
      col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('over'); });
      col.addEventListener('dragleave', function () { col.classList.remove('over'); });
      col.addEventListener('drop', function (e) { e.preventDefault(); col.classList.remove('over'); move(e.dataTransfer.getData('text/plain'), col.dataset.col); });
    });
    app.querySelectorAll('[data-fu]').forEach(function (b) { b.addEventListener('click', function () { var o = ORC.filter(function (x) { return x.id === +b.dataset.fu; })[0], p = pac(o.p); modal('<h2 style="font-size:20px;margin-bottom:12px">Follow-up · ' + esc(p.nome) + '</h2>' + aiBox('Mensagem sugerida', '<textarea class="textarea" style="background:var(--surface)">Oi, ' + esc(p.nome.split(' ')[0]) + '! Aqui é da Maré Odontologia. Ficou alguma dúvida sobre o orçamento de ' + esc(o.t.toLowerCase()) + '? Podemos parcelar em até 18x no boleto, e a ' + dent(o.d).curto + ' pode te explicar cada etapa numa conversa rápida, sem custo.</textarea>', '') + '<div class="row wrap" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-g" data-close>Cancelar</button><button class="btn btn-p" data-close id="fus">Enviar no WhatsApp</button></div>', function (el) { el.querySelector('#fus').addEventListener('click', function () { O.toast('Mensagem enviada para ' + p.nome.split(' ')[0] + '.'); }); }); }); });
    /* whatsapp */
    app.querySelectorAll('[data-wa]').forEach(function (b) { b.addEventListener('click', function () { waSel = +b.dataset.wa; render(); }); });
    var wam = document.getElementById('wam'); if (wam) wam.scrollTop = wam.scrollHeight;
    var waf = document.getElementById('waf');
    if (waf) waf.addEventListener('submit', function (e) { e.preventDefault(); var t = document.getElementById('wat').value.trim(); if (!t) return; var c = WA.filter(function (w) { return w.id === waSel; })[0]; c.msgs.push(['out', t, R().nome.split(' ')[0] + ' (equipe)']); c.need = false; c.last = 'Você: ' + t.slice(0, 40); render(); });
    var wau = document.getElementById('waauto'); if (wau) wau.addEventListener('change', function () { S.waAuto = wau.checked; save(); render(); O.toast(S.waAuto ? 'Assistente automático ligado.' : 'Assistente desligado: todas as mensagens vão para a equipe.'); });
    /* ajustes de layout responsivo */
    ['pgrid', 'rgrid', 'egrid', 'fgrid', 'cgrid'].forEach(function (id) { var g = document.getElementById(id); if (g && innerWidth < 1100) g.style.gridTemplateColumns = 'minmax(0,1fr)'; });
    app.querySelectorAll('.aside nav a').forEach(function (a) { a.addEventListener('click', function () { var s = document.getElementById('ash'); if (s) s.classList.remove('open'); }); });
  };

  /* ================= roteamento ================= */
  var render = function () {
    if (!S.logged) { renderLogin(); return; }
    var route = (location.hash || '#painel').slice(1), parts = route.split('/');
    if (!pages[parts[0]] || R().nav.indexOf(parts[0]) < 0) { route = 'painel'; parts = ['painel']; }
    var html;
    try { html = pages[parts[0]](parts[1]); } catch (err) { console.error(err); html = ph('Algo deu errado', '') + '<p class="muted">Recarregue a página.</p>'; }
    app.innerHTML = frame(route, html);
    document.title = NAV[parts[0]][0] + ' — OdontoFlow';
    bind(route);
  };
  window.addEventListener('hashchange', function () { var p = location.hash.slice(1).split('/'); if (p[0] === 'pacientes' && p[1]) { /* mantém aba */ } else ptab = 'resumo'; render(); window.scrollTo(0, 0); });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { var g = document.getElementById('gs'); if (g) { e.preventDefault(); g.focus(); } } });
  render();
})();
