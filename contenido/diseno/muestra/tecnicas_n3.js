/* Láminas técnicas de Guitarra Nivel 3 (clases 25 a 36) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (guitarra/img/G3_*.svg). Uso: node tecnicas_n3.js → img_tec/G3_*.svg */
const fs = require('fs'), path = require('path');
const { C, NOTA, F, W, chip, txt, svg, f1, acorde, clave, pent } = require('./tecnicas_motor.js');
const OUT = path.join(__dirname, 'img_tec');
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const DK = '#1b1206';
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || DK}" stroke-width="3"/>` + txt(x, y + r * .38, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || DK });
const card = (x, y, w, h, on) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${on ? '#3a2a10' : C.PANEL}" stroke="${on ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>`;

/* Diapasón: notas = [[cuerda, traste, nombre, arriba(grado), abajo(dedo), tónica]] · desde = primer traste dibujado */
function diapason({ y0 = 60, desde = 1, trastes = 4, notas, x0 = 200, fw = 190, sg = 82 }) {
  let b = ''; const xR = x0 + trastes * fw, cy = c => y0 + (c - 1) * sg, nx = t => t === 0 ? x0 - 62 : x0 + (t - desde + .5) * fw;
  b += `<rect x="${x0}" y="${y0 - 28}" width="${trastes * fw + 8}" height="${5 * sg + 56}" rx="8" fill="#2a1d12" opacity=".8"/>`;
  b += desde === 1 ? `<rect x="${x0 - 14}" y="${y0 - 32}" width="16" height="${5 * sg + 64}" rx="4" fill="#f4ecd8"/>` : `<line x1="${x0}" y1="${y0 - 28}" x2="${x0}" y2="${y0 + 5 * sg + 28}" stroke="#a7a9ad" stroke-width="6"/>`;
  for (let f = 1; f <= trastes; f++) b += `<line x1="${x0 + f * fw}" y1="${y0 - 28}" x2="${x0 + f * fw}" y2="${y0 + 5 * sg + 28}" stroke="#a7a9ad" stroke-width="6"/>` + txt(x0 + (f - .5) * fw, y0 + 5 * sg + 74, desde + f - 1, { size: 30, w: 700, fill: C.MUTE });
  if (desde === 1) b += txt(x0 - 62, y0 + 5 * sg + 74, 'aire', { size: 26, w: 600, fill: C.MUTE }); else b += txt(x0 - 20, y0 + 5 * sg + 74, 'traste', { a: 'end', size: 24, w: 600, fill: C.MUTE });
  for (let c = 1; c <= 6; c++) b += `<line x1="${desde === 1 ? x0 : x0 - 30}" y1="${cy(c)}" x2="${xR + 8}" y2="${cy(c)}" stroke="${c < 4 ? '#eee7da' : '#d8c9a6'}" stroke-width="${2 + c * .9}"/>` + txt(28, cy(c) + 11, c + '.ª', { a: 'start', size: 28, w: 700 });
  notas.forEach(([c, t, n, ar, ab, ton]) => { const x = nx(t), y = cy(c);
    if (ton) b += `<rect x="${f1(x - 54)}" y="${y - 32}" width="108" height="64" rx="32" fill="none" stroke="${C.GOLD}" stroke-width="5"/>`;
    b += chip(x, y, n, 84, 44);
    if (ar) b += circ(x - 46, y - 30, 19, ar, { size: String(ar).length > 2 ? 14 : 22 });
    if (ab) b += txt(x + 8, y + 50, ab, { a: 'start', size: 24, w: 700, fill: C.MUTE }); });
  return { b, h: y0 + 5 * sg + 100 };
}

/* 25 · La armadura (2 × 2) */
(() => { let b = ''; const K = [['Do mayor', 'La menor', 'sin alteraciones', []], ['Sol mayor', 'Mi menor', '1 sostenido', [['♯', 8]]], ['Re mayor', 'Si menor', '2 sostenidos', [['♯', 8], ['♯', 5]]], ['Fa mayor', 'Re menor', '1 bemol', [['♭', 4]]]];
  K.forEach(([may, men, alt, acc], i) => { const x = 20 + (i % 2) * 490, y = 20 + Math.floor(i / 2) * 400, s = 30, top = y + 80, bot = top + 4 * s;
    b += card(x, y, 470, 380) + pent(x + 30, x + 440, top, s) + clave(x + 36, bot, s);
    acc.forEach(([g, st], j) => b += txt(x + 150 + j * 44, bot - st * s / 2 + (g === '♭' ? 8 : 22), g, { serif: 1, size: 70, w: 700, fill: C.GOLD }));
    b += txt(x + 235, y + 290, may, { size: 36, w: 700 }) + txt(x + 235, y + 328, men, { size: 28, w: 600, fill: C.MUTE }) + txt(x + 235, y + 364, alt, { size: 24, w: 700, fill: C.GOLD }); });
  out('G3_armaduras', 840, 'La armadura: sostenidos y bemoles al inicio del pentagrama', b); })();

/* 25 · Dos escalas menores */
(() => { let b = txt(30, 50, 'LA menor · sin alteraciones', { a: 'start', size: 34, w: 700, fill: C.GOLD });
  const a = diapason({ y0: 110, notas: [[5, 0, 'LA', 'I', 0, 1], [5, 2, 'SI', 'II', 'd2'], [5, 3, 'DO', 'III', 'd3'], [4, 0, 'RE', 'IV'], [4, 2, 'MI', 'V', 'd2'], [4, 3, 'FA', 'VI', 'd3'], [3, 0, 'SOL', 'VII'], [3, 2, 'LA', 'VIII', 'd2', 1]] });
  b += a.b + txt(30, a.h + 50, 'MI menor · un FA♯', { a: 'start', size: 34, w: 700, fill: C.GOLD });
  const e = diapason({ y0: a.h + 110, notas: [[6, 0, 'MI', 'I', 0, 1], [6, 2, 'FA♯', 'II', 'd2'], [6, 3, 'SOL', 'III', 'd3'], [5, 0, 'LA', 'IV'], [5, 2, 'SI', 'V', 'd2'], [5, 3, 'DO', 'VI', 'd3'], [4, 0, 'RE', 'VII'], [4, 2, 'MI', 'VIII', 'd2', 1]] });
  out('G3_escalas_menores', e.h, 'Escalas de La menor y Mi menor en primera posición', b + e.b); })();

/* Tarjetas de acordes en 2 columnas (con traste inicial opcional) */
function acordes(n, label, A, pie) { let b = '', hh = 0; const cw = 470, rowH = acorde(0, 0, cw, 'E', '', [0, 0, 0, 0, 0, 0], [], A.some(a => a[4]) ? ['MI', '', '', '', '', ''] : null).h + 40;
  A.forEach(([nom, sub, tr, de, ch, ceja, base], i) => { const solo = i === A.length - 1 && A.length % 2, x = solo ? (W - cw) / 2 : 20 + (i % 2) * (cw + 20), y = 10 + Math.floor(i / 2) * rowH, r = acorde(x, y, cw, nom, sub, tr, de, ch, ceja, base); b += r.b; hh = Math.max(hh, y + r.h); });
  if (pie) pie.forEach((p, j) => b += txt(W / 2, hh + 44 + j * 40, p, { size: 28, w: 600, fill: j ? C.GOLD : C.MUTE }));
  out(n, hh + 30 + (pie ? pie.length * 40 : 0), label, b); }

/* 26 · Acordes de quinta */
acordes('G3_quintas', 'Acordes de quinta (power chords): E5, A5, G5 y C5', [
  ['E5', '6.ª al aire', [0, 2, 2, 'x', 'x', 'x'], [0, '5', '8', 0, 0, 0], ['MI', 'SI', 'MI', '', '', '']],
  ['A5', '5.ª al aire', ['x', 0, 2, 2, 'x', 'x'], [0, 0, '5', '8', 0, 0], ['', 'LA', 'MI', 'LA', '', '']],
  ['G5', 'móvil · traste 3', [1, 3, 3, 'x', 'x', 'x'], ['1', '5', '8', 0, 0, 0], ['SOL', 'RE', 'SOL', '', '', ''], null, 3],
  ['C5', 'móvil · traste 3', ['x', 1, 3, 3, 'x', 'x'], [0, '1', '5', '8', 0, 0], ['', 'DO', 'SOL', 'DO', '', ''], null, 3]],
  ['1 = nota base · 5 = quinta · 8 = octava', 'Quinta justa = 7 semitonos · octava = 12']);

/* 28 · Séptimas móviles con cejilla */
acordes('G3_septimas_cejilla', 'Séptimas móviles con cejilla: A7 y B7', [
  ['A7', 'forma de Mi7 · traste 5', [1, 3, 1, 2, 1, 1], [1, 3, 1, 2, 1, 1], ['LA', 'MI', 'SOL', 'DO♯', 'MI', 'LA'], [1, 0, 5], 5],
  ['B7', 'forma de La7 · traste 2', ['x', 1, 3, 1, 3, 1], [0, 1, 3, 1, 4, 1], ['', 'SI', 'FA♯', 'LA', 'RE♯', 'FA♯'], [1, 1, 5], 2]],
  ['El número dorado de la izquierda es el traste donde empieza', 'Forma de Mi7 en el traste 3 = G7 · forma de La7 en el 3 = C7']);

/* 27 · Los ligados (martillo y tirón) */
(() => { let b = ''; const tab = (y, tit, notas, letra) => { let s = txt(30, y, tit, { a: 'start', size: 32, w: 700, fill: C.GOLD });
    for (let c = 0; c < 6; c++) s += `<line x1="130" y1="${y + 110 + c * 30}" x2="${W - 40}" y2="${y + 110 + c * 30}" stroke="${C.TAB}" stroke-width="2.5"/>` + txt(100, y + 119 + c * 30, (c + 1) + '.ª', { a: 'end', size: 22, w: 600, fill: C.MUTE });
    notas.forEach(([a, z], i) => { const x1 = 260 + i * 380, x2 = x1 + 190, yl = y + 110;
      s += `<path d="M${x1},${yl - 26} Q${(x1 + x2) / 2},${yl - 86} ${x2},${yl - 26}" fill="none" stroke="${C.GOLD}" stroke-width="5"/>` + txt((x1 + x2) / 2, yl - 66, letra, { size: 32, w: 700, fill: C.GOLD });
      [[x1, a], [x2, z]].forEach(([x, n]) => s += `<rect x="${x - 26}" y="${yl - 24}" width="52" height="48" rx="8" fill="${C.BG}"/>` + txt(x, yl + 14, n, { size: 42, w: 700 })); });
    return s; };
  b += tab(60, 'Martillo (H): toco 0 y «martillo» el traste', [['0', '2'], ['0', '3']], 'H');
  b += tab(400, 'Tirón (P): toco el traste y tiro del dedo', [['2', '0'], ['3', '0']], 'P');
  b += txt(W / 2, 770, 'Un solo ataque de la mano derecha · dos notas', { size: 30, w: 600, fill: C.MUTE });
  out('G3_ligados', 810, 'Ligados: martillo y tirón', b); })();

/* 28 · Un acorde, tres posiciones (inversiones) */
(() => { let b = ''; const x0 = 160, fw = 78, y0 = 80, sg = 90, cy = c => y0 + (c - 1) * sg, nx = t => t === 0 ? x0 - 50 : x0 + (t - .5) * fw;
  b += `<rect x="${x0}" y="${y0 - 26}" width="${10 * fw + 8}" height="${2 * sg + 52}" rx="8" fill="#2a1d12" opacity=".8"/><rect x="${x0 - 12}" y="${y0 - 30}" width="14" height="${2 * sg + 60}" rx="4" fill="#f4ecd8"/>`;
  for (let f = 1; f <= 10; f++) b += `<line x1="${x0 + f * fw}" y1="${y0 - 26}" x2="${x0 + f * fw}" y2="${y0 + 2 * sg + 26}" stroke="#a7a9ad" stroke-width="5"/>` + txt(x0 + (f - .5) * fw, y0 + 2 * sg + 64, f, { size: 24, w: 700, fill: C.MUTE });
  for (let c = 1; c <= 3; c++) b += `<line x1="${x0}" y1="${cy(c)}" x2="${x0 + 10 * fw + 8}" y2="${cy(c)}" stroke="#eee7da" stroke-width="${2 + c}"/>` + txt(12, cy(c) + 10, c + '.ª', { a: 'start', size: 26, w: 700 });
  const G = [['C/G', '2.ª inversión', '5', [[3, 0, 'SOL'], [2, 1, 'DO'], [1, 0, 'MI']]], ['C', 'fundamental', '1', [[3, 5, 'DO'], [2, 5, 'MI'], [1, 3, 'SOL']]], ['C/E', '1.ª inversión', '3', [[3, 9, 'MI'], [2, 8, 'SOL'], [1, 8, 'DO']]]];
  G.forEach(([n, t, g, N], i) => { N.forEach(([c, f, nm]) => b += chip(nx(f), cy(c), nm, 66, 38)); const x = 170 + i * 330, y = y0 + 2 * sg + 110;
    b += card(x - 150, y, 300, 150, i === 1) + circ(x - 100, y + 52, 24, g, { size: 26 }) + txt(x + 10, y + 64, n, { serif: 1, size: 46, w: 700 }) + txt(x, y + 120, t, { size: 26, w: 600, fill: C.MUTE }); });
  b += txt(W / 2, y0 + 2 * sg + 310, 'El número dorado dice qué nota del acorde queda abajo', { size: 26, w: 600, fill: C.MUTE });
  out('G3_triadas', y0 + 2 * sg + 340, 'Un acorde, tres posiciones: las inversiones de C', b); })();

/* 29 · La familia de los acordes */
(() => { let b = ''; const Fm = [['T', 'Tónica', 'reposo', 'I · vi · iii', 'C · Am · Em', '#2E9E4F'], ['S', 'Subdominante', 'alejamiento', 'IV · ii', 'F · Dm', '#2AA7E8'], ['D', 'Dominante', 'tensión', 'V · V7 · vii°', 'G · G7 · B°', '#E5312B']];
  Fm.forEach(([l, n, t, gr, en, col], i) => { const x = 20 + i * 325; b += card(x, 20, 310, 330) + circ(x + 155, 90, 44, l, { fill: col, tx: l === 'D' ? '#fff' : '#111', size: 46 }) + txt(x + 155, 180, n, { size: 30, w: 700 }) + txt(x + 155, 214, t, { size: 26, w: 600, fill: C.GOLD }) + txt(x + 155, 268, gr, { serif: 1, size: 32, w: 700 }) + txt(x + 155, 312, 'en Do: ' + en, { size: 22, w: 600, fill: C.MUTE }); });
  b += txt(30, 410, 'Cadencias', { a: 'start', size: 34, w: 700, fill: C.GOLD });
  [['Auténtica', 'V → I', 'G7 → C', 'final fuerte, como un punto'], ['Plagal', 'IV → I', 'F → C', 'final suave, «amén»'], ['Semicadencia', '… → V', 'C → G', 'en suspenso, como una coma'], ['Rota', 'V → vi', 'G7 → Am', 'sorpresa: no llega a casa']].forEach(([n, g, e, d], i) => { const x = 20 + (i % 2) * 490, y = 440 + Math.floor(i / 2) * 230;
    b += card(x, y, 470, 210) + txt(x + 235, y + 50, n, { size: 30, w: 700, fill: C.GOLD }) + txt(x + 235, y + 106, g, { serif: 1, size: 40, w: 700 }) + txt(x + 235, y + 148, e, { size: 28, w: 700 }) + txt(x + 235, y + 186, d, { size: 22, w: 600, fill: C.MUTE }); });
  out('G3_funciones', 920, 'La familia de los acordes: funciones y cadencias', b); })();

/* 30 · Estilos de acompañamiento */
(() => { let b = '', y = 20; const fl = (x, yc, ab, col) => { const y1 = yc - 42, y2 = yc + 42, ya = ab ? y2 : y1, yb = ab ? y1 : y2, d = ab ? 1 : -1; return `<line x1="${x}" y1="${yb}" x2="${x}" y2="${ya - d * 26}" stroke="${col}" stroke-width="10" stroke-linecap="round"/><path d="M${x - 19},${ya - d * 31} L${x},${ya} L${x + 19},${ya - d * 31} Z" fill="${col}"/>`; };
  const col = { p: '#E5312B', i: '#2AA7E8', m: '#2E9E4F', a: '#F57C00' }, L8 = ['1', 'y', '2', 'y', '3', 'y', '4', 'y'];
  const E = [['Balada', '4/4 · arpegio tranquilo', L8, ['p', 'i', 'm', 'a', 'p', 'i', 'm', 'a']], ['Pop', '4/4 · síncopa', L8, ['D', '', 'D', 'U', '', 'U', 'D', 'U']], ['Vals', '3/4 · bajo y dos rasgueos', ['1', '2', '3'], ['p', 'D', 'D']], ['Caribeño', '4/4 · golpes apagados en las «y»', L8, ['p', 'x', '', 'x', 'p', 'x', '', 'x']], ['Shuffle', '4/4 · tresillo: largo-corto', ['1', '', 'a', '2', '', 'a', '3', '', 'a', '4', '', 'a'], ['D', '', 'D', 'D', '', 'D', 'D', '', 'D', 'D', '', 'D']]];
  E.forEach(([t, s, lab, pat]) => { b += txt(30, y + 40, t, { a: 'start', size: 34, w: 700, fill: C.GOLD }) + txt(W - 30, y + 40, s, { a: 'end', size: 24, w: 600, fill: C.MUTE });
    const n = pat.length, cw = Math.min(150, 940 / n), yc = y + 130;
    pat.forEach((p, i) => { const x = 30 + cw / 2 + i * cw, num = /\d/.test(lab[i]); b += `<rect x="${f1(x - cw / 2 + 3)}" y="${yc - 58}" width="${f1(cw - 6)}" height="160" rx="12" fill="${num ? C.PANEL : '#100d09'}"/>`;
      if (p === 'D') b += fl(x, yc, true, C.IV); else if (p === 'U') b += fl(x, yc, false, C.MUTE); else if (p === 'x') b += txt(x, yc + 18, '✕', { size: 46, w: 700, fill: C.MUTE }); else if (p) b += circ(x, yc, 30, p, { fill: col[p], tx: p === 'p' ? '#fff' : '#111', size: 32 });
      b += txt(x, yc + 88, lab[i], { size: 30, w: 700, fill: num ? C.IV : C.MUTE }); });
    y += 270; });
  b += txt(W / 2, y + 20, '↓ ↑ rasgueo · p bajo con el pulgar · ✕ golpe apagado', { size: 26, w: 600, fill: C.MUTE });
  out('G3_estilos', y + 50, 'Estilos de acompañamiento', b); })();

/* 31 · Escala mayor móvil (SOL, traste 2 a 6) */
(() => { const r = diapason({ desde: 2, trastes: 5, x0: 140, fw: 166, notas: [[6, 3, 'SOL', 0, 'd2', 1], [6, 5, 'LA', 0, 'd4'], [5, 2, 'SI', 0, 'd1'], [5, 3, 'DO', 0, 'd2'], [5, 5, 'RE', 0, 'd4'], [4, 2, 'MI', 0, 'd1'], [4, 4, 'FA♯', 0, 'd3'], [4, 5, 'SOL', 0, 'd4', 1], [3, 2, 'LA', 0, 'd1'], [3, 4, 'SI', 0, 'd3'], [3, 5, 'DO', 0, 'd4'], [2, 3, 'RE', 0, 'd2'], [2, 5, 'MI', 0, 'd4'], [1, 2, 'FA♯', 0, 'd1'], [1, 3, 'SOL', 0, 'd2', 1]] });
  out('G3_escala_movil', r.h + 10, 'Escala mayor móvil en SOL, dos octavas', r.b); })();

/* 32 · Pentatónica de LA menor, caja 1 (trastes 5 a 8) */
(() => { const r = diapason({ desde: 5, trastes: 4, notas: [[6, 5, 'LA', 0, 'd1', 1], [6, 8, 'DO', 0, 'd4'], [5, 5, 'RE', 0, 'd1'], [5, 7, 'MI', 0, 'd3'], [4, 5, 'SOL', 0, 'd1'], [4, 7, 'LA', 0, 'd3', 1], [3, 5, 'DO', 0, 'd1'], [3, 7, 'RE', 0, 'd3'], [2, 5, 'MI', 0, 'd1'], [2, 8, 'SOL', 0, 'd4'], [1, 5, 'LA', 0, 'd1', 1], [1, 8, 'DO', 0, 'd4']] });
  out('G3_pentatonica', r.h + 10, 'Pentatónica de La menor, caja 1', r.b); })();

/* 33 · Estudio en Do (composición AMA): tablatura p-i-m en 3/4 */
(() => { let b = ''; const M = [['C', [[5, 3], [3, 0], [2, 1]]], ['C', [[5, 3], [3, 0], [1, 0]]], ['G7', [[6, 3], [3, 0], [1, 1]]], ['C', [[5, 3], [3, 0], [1, 0]]], ['F', [[4, 3], [3, 2], [2, 1]]], ['C', [[5, 3], [3, 0], [2, 1]]], ['G7', [[6, 3], [3, 0], [2, 0]]], ['C', [[5, 3], [3, 0], [2, 1]]]];
  const dedos = ['p', 'i', 'm'], col = { p: '#E5312B', i: '#2AA7E8', m: '#2E9E4F' };
  for (let fila = 0; fila < 4; fila++) { const y = 30 + fila * 360, ts = 30, tTop = y + 90, mw = 470;
    if (fila % 2 === 0) b += txt(30, y + 34, fila ? 'Frase B · compases 5–8 · mf → p' : 'Frase A · compases 1–4 · p', { a: 'start', size: 30, w: 700, fill: C.GOLD });
    for (let c = 0; c < 6; c++) b += `<line x1="30" y1="${tTop + c * ts}" x2="${W - 30}" y2="${tTop + c * ts}" stroke="${C.TAB}" stroke-width="2"/>`;
    for (let j = 0; j < 2; j++) { const mi = fila * 2 + j, [ac, N] = M[mi], x0 = 40 + j * mw;
      b += txt(x0 + mw / 2, tTop - 16, (mi + 1) + ' · ' + ac, { size: 28, w: 700 }) + `<line x1="${x0 + mw - 10}" y1="${tTop}" x2="${x0 + mw - 10}" y2="${tTop + 5 * ts}" stroke="${C.LINE}" stroke-width="${mi === 7 ? 6 : 3}"/>`;
      N.forEach(([cu, tr], k) => { const x = x0 + 80 + k * 150, yy = tTop + (cu - 1) * ts; b += `<rect x="${x - 20}" y="${yy - 18}" width="40" height="36" rx="7" fill="${C.BG}"/>` + txt(x, yy + 12, tr, { size: 32, w: 700, fill: C.GOLD }) + circ(x, tTop + 5 * ts + 46, 22, dedos[k], { fill: col[dedos[k]], tx: dedos[k] === 'p' ? '#fff' : '#111', size: 26 }); }); }
    if (fila % 2 === 1) b += txt(W - 30, tTop + 5 * ts + 100, 'V7 → I · cadencia auténtica', { a: 'end', size: 24, w: 600, fill: C.MUTE }); }
  out('G3_estudio', 30 + 4 * 360 + 10, 'Estudio en Do (composición AMA, al estilo de Sor)', b); })();

/* 35 · Mi semana de ensayo (7 días) */
(() => { let b = ''; const D = [['Divido', 'cada obra en secciones de 4 compases'], ['Memorizo', 'sección por sección, lento'], ['Uno', 'las secciones de dos en dos'], ['Grabo', 'todo el programa y me escucho'], ['Corrijo', 'solo las partes difíciles'], ['Ensayo general', 'de pie: saludo, afino y toco todo'], ['Descanso', 'repaso suave y duermo bien']];
  const wrap = (s, n) => { const w = s.split(' '), L = ['']; w.forEach(p => { if ((L[L.length - 1] + ' ' + p).trim().length > n) L.push(p); else L[L.length - 1] = (L[L.length - 1] + ' ' + p).trim(); }); return L; };
  D.forEach(([t, d], i) => { const fila = i < 4 ? 0 : 1, col = fila ? i - 4 : i, cw = 232, x = fila ? 20 + (W - 40 - 3 * cw - 2 * 12) / 2 + col * (cw + 12) : 20 + col * (cw + 12), y = 20 + fila * 290;
    b += card(x, y, cw, 270, i === 6) + circ(x + cw / 2, y + 56, 34, i + 1, { size: 36 }) + txt(x + cw / 2, y + 136, t, { size: t.length > 10 ? 25 : 30, w: 700 });
    wrap(d, 17).forEach((l, j) => b += txt(x + cw / 2, y + 180 + j * 30, l, { size: 22, w: 500, fill: C.MUTE })); });
  out('G3_ensayo', 610, 'Mi semana de ensayo: siete días', b); })();

/* 36 · Mi presentación final (4 partes) */
(() => { let b = ''; const P = [['Escala', 'mayor móvil o pentatónica', '#2AA7E8'], ['Obra', 'Estudio en Do (al estilo de Sor)', '#2E9E4F'], ['Canción', 'acompaño a un cantante o en dúo', '#F57C00'], ['Improvisación', 'blues en La o Am – F – G – Am', '#8E3BB8']];
  P.forEach(([t, d, c], i) => { const x = 20 + (i % 2) * 490, y = 20 + Math.floor(i / 2) * 270; b += card(x, y, 470, 250) + circ(x + 235, y + 70, 44, i + 1, { fill: c, tx: i === 0 || i === 2 ? '#111' : '#fff', size: 46 }) + txt(x + 235, y + 160, t, { size: 38, w: 700 }) + txt(x + 235, y + 210, d, { size: 24, w: 500, fill: C.MUTE }); });
  b += txt(W / 2, 600, 'Entro, saludo, afino, toco, agradezco y salgo', { size: 28, w: 600, fill: C.GOLD });
  out('G3_concierto', 640, 'Mi presentación final en cuatro partes', b); })();
console.log('ok nivel 3');
