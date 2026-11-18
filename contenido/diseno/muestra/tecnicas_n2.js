/* Láminas técnicas de Guitarra Nivel 2 (clases 13 a 24) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (guitarra/img/G2_*.svg). Uso: node tecnicas_n2.js → img_tec/G2_*.svg */
const fs = require('fs'), path = require('path');
const { C, NOTA, F, W, chip, txt, svg, partitura, f1, acorde } = require('./tecnicas_motor.js');
const OUT = path.join(__dirname, 'img_tec');
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const q = p => ({ p, d: 'q' }), h = p => ({ p, d: 'h' });
const GOLDTX = '#1b1206';
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || GOLDTX}" stroke-width="3"/>` + txt(x, y + r * .38, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || GOLDTX });

/* Diapasón con notas: notas = [[cuerda(1-6), traste, nombre, arriba, abajo]] */
function diapason({ y0 = 40, trastes = 4, notas, banda, x0 = 200, fw = 190, sg = 82 }) {
  let b = ''; const xR = x0 + trastes * fw, cy = c => y0 + (c - 1) * sg, nx = t => t === 0 ? x0 - 62 : x0 + (t - .5) * fw;
  if (banda) b += `<rect x="${x0}" y="${cy(banda[0]) - sg / 2 + 4}" width="${trastes * fw + 8}" height="${(banda[1] - banda[0] + 1) * sg - 8}" rx="10" fill="${C.GOLD}" opacity=".10"/>`;
  b += `<rect x="${x0}" y="${y0 - 28}" width="${trastes * fw + 8}" height="${5 * sg + 56}" rx="8" fill="#2a1d12" opacity=".8"/><rect x="${x0 - 14}" y="${y0 - 32}" width="16" height="${5 * sg + 64}" rx="4" fill="#f4ecd8"/>`;
  for (let f = 1; f <= trastes; f++) b += `<line x1="${x0 + f * fw}" y1="${y0 - 28}" x2="${x0 + f * fw}" y2="${y0 + 5 * sg + 28}" stroke="#a7a9ad" stroke-width="6"/>` + txt(x0 + (f - .5) * fw, y0 + 5 * sg + 74, f, { size: 30, w: 700, fill: C.MUTE });
  b += txt(x0 - 62, y0 + 5 * sg + 74, 'aire', { size: 26, w: 600, fill: C.MUTE });
  [3, 5].forEach(f => { if (f <= trastes) b += `<circle cx="${x0 + (f - .5) * fw}" cy="${y0 + 2.5 * sg}" r="9" fill="#5a4a33"/>`; });
  for (let c = 1; c <= 6; c++) b += `<line x1="${x0}" y1="${cy(c)}" x2="${xR + 8}" y2="${cy(c)}" stroke="${c < 4 ? '#eee7da' : '#d8c9a6'}" stroke-width="${2 + c * .9}"/>` + txt(28, cy(c) + 11, c + '.ª', { a: 'start', size: 28, w: 700 });
  notas.forEach(([c, t, n, ar, ab]) => { const x = nx(t), y = cy(c); b += chip(x, y, n, 84, 44);
    if (ar) b += circ(x - 46, y - 30, 19, ar, { size: String(ar).length > 2 ? 14 : 22 });
    if (ab) b += txt(x + 8, y + 50, ab, { a: 'start', size: 24, w: 700, fill: C.MUTE }); });
  return { b, h: y0 + 5 * sg + 100 };
}

/* 13 · Escala cromática en la 1.ª cuerda, en dos renglones */
(() => { let b = txt(30, 56, 'Un traste = un semitono', { a: 'start', size: 38, w: 700, fill: C.GOLD });
  const N = [['MI', 0], ['FA', 1], ['FA♯', 2, 'SOL♭'], ['SOL', 3], ['SOL♯', 4, 'LA♭'], ['LA', 5], ['LA♯', 6, 'SI♭'], ['SI', 7], ['DO', 8], ['DO♯', 9, 'RE♭'], ['RE', 10], ['RE♯', 11, 'MI♭'], ['MI', 12]];
  [N.slice(0, 7), N.slice(7)].forEach((fila, r) => { const y = 190 + r * 230, x0 = 70, cw = 132;
    b += `<rect x="${x0 - 50}" y="${y - 34}" width="${fila.length * cw + 30}" height="68" rx="10" fill="#2a1d12"/><line x1="${x0 - 50}" y1="${y}" x2="${x0 - 20 + fila.length * cw}" y2="${y}" stroke="#eee7da" stroke-width="3"/>`;
    fila.forEach(([n, t, alt], i) => { const x = x0 + i * cw + 20; if (i) b += `<line x1="${x - cw / 2}" y1="${y - 34}" x2="${x - cw / 2}" y2="${y + 34}" stroke="#a7a9ad" stroke-width="5"/>`;
      b += chip(x, y, n, 84, 46) + txt(x, y + 72, t === 0 ? 'aire' : t, { size: 28, w: 700, fill: C.MUTE }) + (alt ? txt(x, y - 50, alt, { size: 24, w: 600, fill: C.MUTE }) : ''); }); });
  b += txt(W / 2, 640, 'En el traste 12 vuelve MI, una octava más aguda.', { size: 30, w: 600, fill: C.GOLD });
  out('G2_cromatica', 680, 'La escala cromática en la primera cuerda', b); })();

/* 14 · Notas de la primera posición (bordones) */
(() => { const r = diapason({ banda: [4, 6], notas: [[1, 0, 'MI'], [1, 1, 'FA'], [1, 3, 'SOL'], [2, 0, 'SI'], [2, 1, 'DO'], [2, 3, 'RE'], [3, 0, 'SOL'], [3, 2, 'LA'], [4, 0, 'RE'], [4, 2, 'MI'], [4, 3, 'FA'], [5, 0, 'LA'], [5, 2, 'SI'], [5, 3, 'DO'], [6, 0, 'MI'], [6, 1, 'FA'], [6, 3, 'SOL']] });
  const b = r.b + txt(200 + 3.5 * 190 + 4, 40 + 3.5 * 82 + 10, 'bordones', { size: 30, w: 700, fill: C.GOLD });
  out('G2_primera_posicion', r.h, 'Las notas de la primera posición', b); })();

/* 15 · Escala de SOL mayor (grados y dedos) */
(() => { const r = diapason({ notas: [[6, 3, 'SOL', 1, 'd2'], [5, 0, 'LA', 2], [5, 2, 'SI', 3, 'd1'], [5, 3, 'DO', 4, 'd2'], [4, 0, 'RE', 5], [4, 2, 'MI', 6, 'd1'], [4, 4, 'FA♯', 7, 'd4'], [3, 0, 'SOL', 8]] });
  out('G2_escala_sol', r.h, 'Escala de Sol mayor en primera posición', r.b); })();

/* 19 · Escala de DO mayor (grados en romanos) */
(() => { const r = diapason({ notas: [[5, 3, 'DO', 'I', 'd3'], [4, 0, 'RE', 'II'], [4, 2, 'MI', 'III', 'd2'], [4, 3, 'FA', 'IV', 'd3'], [3, 0, 'SOL', 'V'], [3, 2, 'LA', 'VI', 'd2'], [2, 0, 'SI', 'VII'], [2, 1, 'DO', 'VIII', 'd1']] });
  out('G2_escala_do', r.h, 'Escala de Do mayor en primera posición con los grados', r.b); })();

/* Varias tarjetas de acordes en 2 columnas */
function acordes(n, label, A, pie) { let b = '', hh = 0; const cw = 470, rowH = acorde(0, 0, cw, 'E', '', [0, 0, 0, 0, 0, 0], [], A.some(a => a[4]) ? ['MI', '', '', '', '', ''] : null).h + 40;
  A.forEach(([nom, sub, tr, de, ch, ceja], i) => { const solo = i === A.length - 1 && A.length % 2, x = solo ? (W - cw) / 2 : 20 + (i % 2) * (cw + 20), y = 10 + Math.floor(i / 2) * rowH, r = acorde(x, y, cw, nom, sub, tr, de, ch, ceja); b += r.b; hh = Math.max(hh, y + r.h); });
  if (pie) b += txt(W / 2, hh + 44, pie, { size: 28, w: 600, fill: C.MUTE });
  out(n, hh + (pie ? 76 : 20), label, b); }

/* 16 · Mis cinco acordes */
acordes('G2_acordes_mes4', 'Mis cinco acordes: G, C, D, Em y Am', [
  ['G', 'Sol mayor', [3, 2, 0, 0, 0, 3], [2, 1, 0, 0, 0, 3], ['SOL', 'SI', 'RE', 'SOL', 'SI', 'SOL']],
  ['C', 'Do mayor', ['x', 3, 2, 0, 1, 0], [0, 3, 2, 0, 1, 0], ['', 'DO', 'MI', 'SOL', 'DO', 'MI']],
  ['D', 'Re mayor', ['x', 'x', 0, 2, 3, 2], [0, 0, 0, 1, 3, 2], ['', '', 'RE', 'LA', 'RE', 'FA♯']],
  ['Em', 'Mi menor', [0, 2, 2, 0, 0, 0], [0, 2, 3, 0, 0, 0], ['MI', 'SI', 'MI', 'SOL', 'SI', 'MI']],
  ['Am', 'La menor', ['x', 0, 2, 2, 1, 0], [0, 0, 2, 3, 1, 0], ['', 'LA', 'MI', 'LA', 'DO', 'MI']]], '○ al aire  ·  ✕ no se toca  ·  número = dedo');

/* 21 · La cejilla */
acordes('G2_cejilla', 'La cejilla: F y Bm', [
  ['F', 'Fa mayor · cejilla traste 1', [1, 3, 3, 2, 1, 1], [1, 3, 4, 2, 1, 1], ['FA', 'DO', 'FA', 'LA', 'DO', 'FA'], [1, 0, 5]],
  ['Bm', 'Si menor · cejilla traste 2', ['x', 2, 4, 4, 3, 2], [0, 1, 3, 4, 2, 1], ['', 'SI', 'FA♯', 'SI', 'RE', 'FA♯'], [2, 1, 5]]], 'La barra dorada = el dedo 1 pisa todas esas cuerdas');

/* 22 · Acordes de séptima */
acordes('G2_septimas', 'Acordes de séptima: G7, D7, E7 y A7', [
  ['G7', 'Sol séptima', [3, 2, 0, 0, 0, 1], [3, 2, 0, 0, 0, 1], ['SOL', 'SI', 'RE', 'SOL', 'SI', 'FA']],
  ['D7', 'Re séptima', ['x', 'x', 0, 2, 1, 2], [0, 0, 0, 2, 1, 3], ['', '', 'RE', 'LA', 'DO', 'FA♯']],
  ['E7', 'Mi séptima', [0, 2, 0, 1, 0, 0], [0, 2, 0, 1, 0, 0], ['MI', 'SI', 'RE', 'SOL♯', 'SI', 'MI']],
  ['A7', 'La séptima', ['x', 0, 2, 0, 2, 0], [0, 0, 2, 0, 3, 0], ['', 'LA', 'MI', 'SOL', 'DO♯', 'MI']]], 'G7 → C · D7 → G · A7 → D · E7 → A');

/* 20 · Acordes de la tonalidad de DO */
(() => { let b = ''; const G = [['I', 'C', 'mayor'], ['ii', 'Dm', 'menor'], ['iii', 'Em', 'menor'], ['IV', 'F', 'mayor'], ['V', 'G', 'mayor'], ['vi', 'Am', 'menor'], ['vii°', 'B°', 'dism.']], cw = 136;
  G.forEach(([g, a, t], i) => { const x = 24 + cw / 2 + i * cw, may = t === 'mayor'; b += `<rect x="${x - cw / 2 + 5}" y="20" width="${cw - 10}" height="200" rx="16" fill="${may ? '#3a2a10' : C.PANEL}" stroke="${may ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>`;
    b += txt(x, 72, g, { serif: 1, size: 40, w: 700, fill: may ? C.GOLD : C.IV }) + txt(x, 140, a, { serif: 1, size: 50, w: 700 }) + txt(x, 190, t, { size: 24, w: 600, fill: C.MUTE }); });
  const cwa = 470, y = 250; [['Dm', 'Re menor', ['x', 'x', 0, 2, 3, 1], [0, 0, 0, 2, 3, 1], ['', '', 'RE', 'LA', 'RE', 'FA']], ['F', 'Fa mayor (pequeño)', ['x', 'x', 3, 2, 1, 1], [0, 0, 3, 2, 1, 1], ['', '', 'FA', 'LA', 'DO', 'FA'], [1, 4, 5]]].forEach(([nom, sub, tr, de, ch, ceja], i) => { const r = acorde(20 + i * (cwa + 20), y, cwa, nom, sub, tr, de, ch, ceja); b += r.b; if (!i) b.h = r.h; });
  const hh = y + acorde(0, 0, cwa, 'E', '', [0, 0, 0, 0, 0, 0], [], ['MI', '', '', '', '', '']).h;
  b += txt(W / 2, hh + 40, 'Mayor = dorado  ·  en F el dedo 1 pisa la 1.ª y la 2.ª', { size: 28, w: 600, fill: C.MUTE });
  out('G2_acordes_tonalidad', hh + 70, 'Los acordes de la tonalidad de DO', b); })();

/* 17 · Patrones de rasgueo */
(() => { let b = '', y = 30; const fl = (x, yc, abajo, col, gr) => { const y1 = yc - 50, y2 = yc + 50, ya = abajo ? y2 : y1, yb = abajo ? y1 : y2, d = abajo ? 1 : -1;
    return `<line x1="${x}" y1="${yb}" x2="${x}" y2="${ya - d * 30}" stroke="${col}" stroke-width="${gr}" stroke-linecap="round"/><path d="M${x - 22},${ya - d * 36} L${x},${ya} L${x + 22},${ya - d * 36} Z" fill="${col}"/>`; };
  const P = [['1 · Básico', '4/4', 'A....... ', ['D', '', 'D', '', 'D', '', 'D', '']], ['2 · Abajo y arriba', '4/4', '', ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U']], ['3 · Balada y pop', '4/4', '', ['D', '', 'D', 'U', '', 'U', 'D', 'U']], ['4 · Vals', '3/4', '', ['p', 'D', 'D']]];
  P.forEach(([tit, cs, , pat], k) => { b += txt(30, y + 40, tit, { a: 'start', size: 34, w: 700, fill: C.GOLD }) + txt(W - 30, y + 40, cs, { a: 'end', size: 30, w: 700, fill: C.MUTE });
    const n = pat.length, cw = n === 3 ? 150 : 115, x0 = n === 3 ? 30 : 30, yc = y + 140, lab = n === 3 ? ['1', '2', '3'] : ['1', 'y', '2', 'y', '3', 'y', '4', 'y'];
    pat.forEach((p, i) => { const x = x0 + cw / 2 + i * cw, num = lab[i] !== 'y'; b += `<rect x="${x - cw / 2 + 4}" y="${yc - 70}" width="${cw - 8}" height="190" rx="14" fill="${num ? C.PANEL : '#100d09'}"/>`;
      if (p === 'D') b += fl(x, yc, true, i === 0 ? C.GOLD : C.IV, i === 0 ? 14 : 11); else if (p === 'U') b += fl(x, yc, false, C.MUTE, 9); else if (p === 'p') b += circ(x, yc, 36, 'p', { size: 38 });
      b += txt(x, yc + 104, lab[i], { size: 34, w: 700, fill: num ? C.IV : C.MUTE }); });
    y += 290; });
  b += txt(W / 2, y + 20, 'Dorado = acento  ·  la mano sigue moviéndose aunque no toque', { size: 28, w: 600, fill: C.MUTE });
  out('G2_rasgueos', y + 50, 'Patrones de rasgueo', b); })();

/* 18 · El arpegio p-i-m-a */
(() => { let b = ''; const x0 = 120, xR = 560, sg = 62, y0 = 50, col = { p: '#E5312B', i: '#2AA7E8', m: '#2E9E4F', a: '#F57C00' };
  for (let c = 1; c <= 6; c++) { const y = y0 + (c - 1) * sg; b += `<line x1="${x0}" y1="${y}" x2="${xR}" y2="${y}" stroke="${c < 4 ? '#eee7da' : '#d8c9a6'}" stroke-width="${2 + c * .9}"/>` + txt(40, y + 11, c + '.ª', { a: 'start', size: 28, w: 700 }); }
  [['a', 1], ['m', 2], ['i', 3]].forEach(([d, c]) => b += circ(380, y0 + (c - 1) * sg, 28, d, { fill: col[d], tx: '#111', size: 32 }));
  b += `<rect x="340" y="${y0 + 3 * sg - 26}" width="80" height="${2 * sg + 52}" rx="40" fill="none" stroke="${col.p}" stroke-width="4" stroke-dasharray="8 6"/>` + circ(380, y0 + 4 * sg, 28, 'p', { fill: col.p, tx: '#fff', size: 32 });
  b += txt(600, y0 + .7 * sg, 'un dedo para', { a: 'start', size: 28, w: 600, fill: C.MUTE }) + txt(600, y0 + .7 * sg + 36, 'cada cuerda aguda', { a: 'start', size: 28, w: 600, fill: C.MUTE }) + txt(600, y0 + 3.7 * sg, 'el pulgar toca el bajo', { a: 'start', size: 28, w: 600, fill: C.MUTE }) + txt(600, y0 + 3.7 * sg + 36, '(6.ª, 5.ª o 4.ª)', { a: 'start', size: 28, w: 600, fill: C.MUTE });
  const y1 = y0 + 5 * sg + 70; b += txt(30, y1, 'Patrón en 3/4 · seis corcheas', { a: 'start', size: 34, w: 700, fill: C.GOLD });
  [['p', 'bajo', '1'], ['i', '3.ª', 'y'], ['m', '2.ª', '2'], ['a', '1.ª', 'y'], ['m', '2.ª', '3'], ['i', '3.ª', 'y']].forEach(([d, c, t], k) => { const x = 95 + k * 160, y = y1 + 110;
    b += txt(x, y - 50, t, { size: 32, w: 700, fill: t === 'y' ? C.MUTE : C.IV }) + circ(x, y, 40, d, { fill: col[d], tx: d === 'p' ? '#fff' : '#111', size: 42 }) + txt(x, y + 80, c, { size: 28, w: 600, fill: C.MUTE }); });
  out('G2_arpegio', y1 + 220, 'El arpegio p, i, m, a', b); })();

/* 19 · Lectura sin color: «Primer paseo» (composición AMA) */
(() => { const r = partitura({ mm: [[q('DO4'), q('RE4'), q('MI4'), q('DO4')], [q('MI4'), q('FA4'), h('SOL4')], [q('SOL4'), q('LA4'), q('SOL4'), q('FA4')], [q('MI4'), q('RE4'), h('DO4')]], tab: false, sinColor: true });
  out('G2_lectura_sin_color', r.h, 'Lectura sin color: Primer paseo', r.b); })();

/* 23 · Toco con expresión: dinámicas y forma */
(() => { let b = txt(30, 54, 'Dinámicas', { a: 'start', size: 34, w: 700, fill: C.GOLD }); const D = [['pp', 'muy suave'], ['p', 'suave'], ['mp', 'medio suave'], ['mf', 'medio fuerte'], ['f', 'fuerte'], ['ff', 'muy fuerte']], cw = 157;
  D.forEach(([s, t], i) => { const x = 28 + cw / 2 + i * cw, hb = 24 + i * 22; b += `<rect x="${x - 40}" y="${230 - hb}" width="80" height="${hb}" rx="8" fill="${C.GOLD}" opacity="${.35 + i * .13}"/>`;
    b += txt(x, 300, s, { serif: 1, size: 54, w: 700 }) + txt(x, 340, t, { size: 22, w: 600, fill: C.MUTE }); });
  b += `<path d="M60,420 L440,390 M60,420 L440,450" stroke="${C.IV}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M560,390 L940,420 M560,450 L940,420" stroke="${C.IV}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  b += txt(250, 500, 'crescendo', { size: 30, w: 700 }) + txt(250, 534, 'cada vez más fuerte', { size: 24, w: 500, fill: C.MUTE }) + txt(750, 500, 'decrescendo', { size: 30, w: 700 }) + txt(750, 534, 'cada vez más suave', { size: 24, w: 500, fill: C.MUTE });
  b += txt(30, 620, 'Forma', { a: 'start', size: 34, w: 700, fill: C.GOLD });
  [['A', 'estrofa'], ['B', 'coro'], ['A', 'estrofa']].forEach(([l, t], i) => { const x = 180 + i * 320; b += `<rect x="${x - 130}" y="650" width="260" height="150" rx="18" fill="${l === 'B' ? '#3a2a10' : C.PANEL}" stroke="${l === 'B' ? C.GOLD : '#4a3f2c'}" stroke-width="3"/>` + txt(x, 735, l, { serif: 1, size: 70, w: 700, fill: l === 'B' ? C.GOLD : C.IV }) + txt(x, 780, t, { size: 26, w: 600, fill: C.MUTE }); });
  out('G2_dinamicas_forma', 830, 'Toco con expresión: dinámicas y forma', b); })();

/* 24 · Tocamos en banda */
(() => { let b = ''; const I = [['🎤', 'Voz', 'la melodía y la letra'], ['🎸', 'Guitarra', 'acordes y ritmo'], ['🎹', 'Teclado', 'acordes largos de fondo'], ['🎸', 'Bajo', 'las notas graves'], ['🥁', 'Batería', 'el pulso y la energía']];
  I.forEach(([e, n, t], i) => { const fila = i < 3 ? 0 : 1, x = fila ? 180 + (i - 3) * 320 + 160 : 20 + i * 320 + 160, y = 20 + fila * 270, gui = n === 'Guitarra';
    b += `<rect x="${x - 150}" y="${y}" width="300" height="250" rx="20" fill="${gui ? '#3a2a10' : C.PANEL}" stroke="${gui ? C.GOLD : '#4a3f2c'}" stroke-width="3"/>` + txt(x, y + 92, e, { size: 70, w: 400 }) + txt(x, y + 160, n, { size: 38, w: 700, fill: gui ? C.GOLD : C.IV }) + txt(x, y + 206, t, { size: 24, w: 500, fill: C.MUTE }); });
  out('G2_banda', 580, 'Tocamos en banda: la tarea de cada instrumento', b); })();
console.log('ok nivel 2');
