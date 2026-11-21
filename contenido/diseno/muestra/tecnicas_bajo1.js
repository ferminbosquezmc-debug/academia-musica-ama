/* Láminas técnicas de Bajo Nivel 1 (clases 1 a 12) con el estilo nuevo y formato para teléfono (1000 px).
   Mismos nombres que en la plataforma (bajo/img/J1_*.svg). Uso: node tecnicas_bajo1.js → img_bajo/J1_*.svg
   Bajo de 5 cuerdas: 1.ª SOL arriba … 5.ª SI abajo (igual que el diapasón de guitarra). J1_partes (dibujo) queda hasta tener foto. */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, chip, txt, svg, f1, pent, cabeza, silNegra } = require('./tecnicas_motor.js');
const { gran, claveFa, parse } = require('./tecnicas_gran.js');
const OUT = path.join(__dirname, 'img_bajo'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const GOLDTX = '#1b1206', DED = { 1: '#E5312B', 2: '#F57C00', 3: '#2E9E4F', 4: '#2F6FD8' }, IM = { i: '#E5312B', m: '#2F6FD8' };
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || GOLDTX}" stroke-width="3"/>` + txt(x, y + r * .36, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || GOLDTX });
const tit = (y, t, o = {}) => txt(o.x || 30, y, t, { a: o.a || 'start', size: o.size || 36, w: 700, fill: o.fill || C.GOLD });
const nota = (y, t, o = {}) => txt(o.x || W / 2, y, t, { a: o.a || 'middle', size: o.size || 25, w: 600, fill: o.fill || C.MUTE });
const caja = (x, y, w, h, o = {}) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${o.r || 16}" fill="${o.fill || C.PANEL}" stroke="${o.stroke || '#2c241a'}" stroke-width="2"/>`;
const CUERDA = { 1: 'SOL', 2: 'RE', 3: 'LA', 4: 'MI', 5: 'SI' };

/* Diapasón del bajo: notas = [[cuerda 1-5, traste, nombre, dedo, texto debajo]] · solo = cuerdas visibles */
function mastil({ y0 = 60, trastes = 4, desde = 1, notas = [], marcas = [], x0 = 200, fw = 190, sg = 76, solo = [1, 2, 3, 4, 5], resalta, apagadas = [] }) {
  let b = ''; const n = solo.length, cy = c => y0 + solo.indexOf(c) * sg, nx = t => t === 0 ? x0 - 62 : x0 + (t - desde + .5) * fw, alto = (n - 1) * sg;
  b += `<rect x="${x0}" y="${y0 - 30}" width="${trastes * fw + 8}" height="${alto + 60}" rx="8" fill="#2a1d12" opacity=".8"/>` + (desde === 1 ? `<rect x="${x0 - 14}" y="${y0 - 34}" width="16" height="${alto + 68}" rx="4" fill="#f4ecd8"/>` : `<line x1="${x0}" y1="${y0 - 30}" x2="${x0}" y2="${y0 + alto + 30}" stroke="#a7a9ad" stroke-width="6"/>`);
  for (let k = 1; k <= trastes; k++) { const f = desde + k - 1, xm = x0 + (k - .5) * fw;
    b += `<line x1="${x0 + k * fw}" y1="${y0 - 30}" x2="${x0 + k * fw}" y2="${y0 + alto + 30}" stroke="#a7a9ad" stroke-width="6"/>` + txt(xm, y0 + alto + 76, f, { size: 30, w: 700, fill: C.MUTE });
    if (n > 2 && [3, 5, 7, 9].includes(f)) b += `<circle cx="${xm}" cy="${y0 + alto / 2}" r="9" fill="#5a4a33"/>`;
    if (n > 2 && f === 12) [-1, 1].forEach(d => { b += `<circle cx="${xm}" cy="${y0 + alto / 2 + d * sg}" r="9" fill="#5a4a33"/>`; }); }
  b += txt(x0 - 62, y0 + alto + 76, desde === 1 ? 'aire' : 'traste', { size: 26, w: 600, fill: C.MUTE });
  marcas.forEach(([c, t, lab, col, nm, tx]) => { notas.push([c, t, null, null, null, lab, col, nm, tx]); });
  solo.forEach(c => { const y = cy(c), off = apagadas.includes(c);
    b += `<line x1="${x0}" y1="${y}" x2="${x0 + trastes * fw + 8}" y2="${y}" stroke="${off ? '#6b6153' : c === resalta ? C.GOLD : '#d8c9a6'}" stroke-width="${3 + c * 1.5}"/>`;
    b += txt(26, y + 10, c + '.ª', { a: 'start', size: 28, w: 700, fill: off ? '#6b6153' : C.IV });
    if (!notas.some(([cc, t]) => cc === c && t === 0)) b += `<g opacity="${off ? .35 : .6}">${chip(x0 - 62, y, CUERDA[c], 70, 34)}</g>`; });
  notas.forEach(([c, t, nm, dedo, ab, lab, col, nb, tx]) => { const x = nx(t), y = cy(c);
    if (lab !== undefined) { b += `<circle cx="${f1(x)}" cy="${y}" r="30" fill="${col}" stroke="${C.IV}" stroke-width="3"/>` + txt(x, y + 10, lab, { size: String(lab).length > 1 ? 24 : 30, w: 700, fill: tx || '#fff' }) + (nb ? txt(x + 33, y - 24, nb, { a: 'start', size: 22, w: 700, fill: C.MUTE }) : ''); return; }
    b += chip(x, y, nm, 84, 44);
    if (dedo) b += circ(x - 48, y - 30, 18, dedo, { size: 20 });
    if (ab) b += txt(x, y + 50, ab, { size: 22, w: 700, fill: C.MUTE }); });
  return { b, h: y0 + alto + 100, cy, nx };
}

/* Pentagrama en clave de fa con notas sueltas: ps = ['LA2', …] (blancas si o.d === 'h') */
function pentaFa(y0, ps, o = {}) {
  const s = o.s || 30, xL = o.xL || 40, xR = o.xR || W - 40, top = y0 + (o.arriba || 2) * s, bot = top + 4 * s;
  let b = pent(xL, xR, top, s) + claveFa(xL + 22, top, s);
  const x0 = xL + 170, paso = (xR - x0 - 40) / ps.length, ys = [];
  const yMax = Math.max(bot, ...ps.map(p => bot - (parse(p).di - 18) * s / 2)), yC = o.yChip || Math.max(bot + 1.9 * s, yMax + 1.6 * s) + 10;
  ps.forEach((p, k) => { const q = parse(p), st = q.di - 18, x = x0 + (k + .5) * paso, y = bot - st * s / 2; ys.push([x, y]);
    for (let l = -2; l >= st; l -= 2) b += `<line x1="${f1(x - s)}" y1="${f1(bot - l * s / 2)}" x2="${f1(x + s)}" y2="${f1(bot - l * s / 2)}" stroke="${C.LINE}" stroke-width="3"/>`;
    for (let l = 10; l <= st; l += 2) b += `<line x1="${f1(x - s)}" y1="${f1(bot - l * s / 2)}" x2="${f1(x + s)}" y2="${f1(bot - l * s / 2)}" stroke="${C.LINE}" stroke-width="3"/>`;
    b += cabeza(x, y, s, NOTA[q.n][0], o.d === 'h');
    const dn = st >= 4, sx = dn ? x - s * .58 : x + s * .58; b += `<line x1="${f1(sx)}" y1="${f1(y)}" x2="${f1(sx)}" y2="${f1(dn ? y + 3.4 * s : y - 3.4 * s)}" stroke="${C.IV}" stroke-width="4"/>`;
    if (o.chips !== false) b += chip(x, yC, q.n, 84, 42); });
  return { b, top, bot, ys, h: yC + 40 };
}

/* 1 · El bajo en la banda */
(() => { let b = txt(W / 2, 70, 'El bajo: el puente de la banda', { serif: 1, size: 50, w: 700 });
  const K = [['Batería', 'el ritmo y el pulso', '#E5312B', '#fff'], ['Bajo', 'notas graves con ritmo', C.GOLD, GOLDTX], ['Piano y guitarra', 'los acordes (armonía)', '#2AA7E8', '#1A1A1A']];
  K.forEach(([t, d, c, tx], i) => { const y = 120 + i * 200; b += `<rect x="150" y="${y}" width="700" height="140" rx="22" fill="${c}"/>` + txt(W / 2, y + 66, t, { size: 46, w: 700, fill: tx }) + txt(W / 2, y + 112, d, { size: 28, w: 600, fill: tx });
    if (i < 2) b += txt(W / 2, y + 186, '⇅', { size: 54, w: 700, fill: C.MUTE }); });
  b += nota(760, 'El bajo toca con el bombo (ritmo)', { size: 28, fill: C.IV }) + nota(800, 'y sobre la nota principal del acorde (armonía).', { size: 28, fill: C.IV });
  b += nota(856, 'Si el bajo se detiene, la banda «pierde el piso».', { size: 26, fill: C.GOLD });
  out('J1_banda', 890, 'El bajo en la banda', b); })();

/* 1 · Las cinco cuerdas */
(() => { let b = txt(W / 2, 62, 'Las cuerdas de mi bajo', { serif: 1, size: 48, w: 700 });
  const m = mastil({ y0: 150, trastes: 4, fw: 150, notas: [1, 2, 3, 4, 5].map(c => [c, 0, CUERDA[c]]) });
  b += m.b + txt(W - 30, m.cy(1) + 10, 'la más aguda', { a: 'end', size: 26, w: 700, fill: C.GOLD }) + txt(W - 30, m.cy(5) + 10, 'la más grave', { a: 'end', size: 26, w: 700, fill: C.GOLD });
  let y = m.h + 30; b += caja(30, y, W - 60, 160) + txt(W / 2, y + 56, 'De la 5.ª a la 1.ª:', { size: 28, w: 600, fill: C.MUTE });
  ['SI', 'MI', 'LA', 'RE', 'SOL'].forEach((nm, i) => { b += chip(220 + i * 140, y + 110, nm, 100, 50); });
  y += 190;
  b += nota(y + 10, 'Bajo de 4 cuerdas: igual, pero sin la cuerda SI.', { size: 26, fill: C.GOLD });
  out('J1_cuerdas', y + 40, 'Las cinco cuerdas del bajo: SOL, RE, LA, MI, SI', b); })();

/* 2 · Los dedos */
(() => { let b = tit(56, 'Mano izquierda: un dedo por traste');
  const m = mastil({ y0: 130, trastes: 4, solo: [1, 2, 3, 4, 5], resalta: 4 });
  b += m.b; [1, 2, 3, 4].forEach(f => { b += `<circle cx="${m.nx(f)}" cy="${m.cy(4)}" r="34" fill="${DED[f]}" stroke="${C.IV}" stroke-width="3"/>` + txt(m.nx(f), m.cy(4) + 13, f, { size: 36, w: 700, fill: '#fff' }); });
  let y = m.h + 20; [['1', 'índice'], ['2', 'medio'], ['3', 'anular'], ['4', 'meñique']].forEach(([n, d], k) => { const x = 60 + k * 235;
    b += `<circle cx="${x + 24}" cy="${y + 20}" r="22" fill="${DED[n]}"/>` + txt(x + 24, y + 29, n, { size: 26, w: 700, fill: '#fff' }) + txt(x + 56, y + 30, d, { a: 'start', size: 28, w: 600 }); });
  b += nota(y + 90, 'El pulgar va detrás del mástil, a la altura del dedo 2.');
  y += 170; b += tit(y, 'Mano derecha: i y m, siempre alternando');
  for (let k = 0; k < 8; k++) { const l = k % 2 ? 'm' : 'i', x = 90 + k * 117; b += `<circle cx="${x}" cy="${y + 90}" r="44" fill="${IM[l]}" stroke="${C.IV}" stroke-width="3"/>` + txt(x, y + 106, l, { size: 44, w: 700, fill: '#fff' }); }
  b += nota(y + 186, 'i = índice · m = medio · el pulgar descansa en la pastilla o en la cuerda SI');
  out('J1_dedos', y + 220, 'Los dedos de cada mano en el bajo', b); })();

/* 3 · Apagar las cuerdas que no suenan */
(() => { let b = txt(W / 2, 64, 'Solo suena la cuerda que toco', { serif: 1, size: 48, w: 700 });
  const m = mastil({ y0: 150, trastes: 4, notas: [[3, 0, 'LA']], resalta: 3, apagadas: [1, 2, 4, 5] });
  b += m.b; [1, 2, 4, 5].forEach(c => { b += txt(m.nx(4), m.cy(c) - 12, 'apagada', { size: 22, w: 600, fill: '#8a7f6e' }); });
  const yw = m.cy(3); b += `<path d="M${m.nx(1.6)} ${yw - 26} q 30 -30 60 0 q 30 30 60 0 q 30 -30 60 0 q 30 30 60 0" fill="none" stroke="${C.GOLD}" stroke-width="5"/>` + txt(m.nx(4), yw - 22, 'suena', { size: 28, w: 700, fill: C.GOLD });
  let y = m.h + 20; [['Mano izquierda', 'los dedos tocan suave las cuerdas agudas'], ['Pulgar derecho', 'descansa sobre las cuerdas graves']].forEach(([t, d], i) => {
    b += caja(30, y + i * 120, W - 60, 100) + txt(60, y + i * 120 + 44, t, { a: 'start', size: 28, w: 700, fill: C.GOLD }) + txt(60, y + i * 120 + 80, d, { a: 'start', size: 26, w: 600 }); });
  out('J1_apagar', y + 250, 'Apagar las cuerdas que no suenan', b); })();

/* 4 · La clave de fa */
(() => { const s = 36, xL = 40, xR = W - 40, top = 130, bot = top + 4 * s; let b = txt(W / 2, 62, 'La clave de fa', { serif: 1, size: 48, w: 700 }) + pent(xL, xR, top, s) + claveFa(xL + 26, top, s);
  b += `<line x1="${xL + 140}" y1="${top + s}" x2="${xR}" y2="${top + s}" stroke="${C.GOLD}" stroke-width="6"/>` ;
  ['SOL', 'SI', 'RE', 'FA', 'LA'].forEach((nm, i) => { b += chip(xL + 300 + i * 120, bot - i * s, nm, 74, 30); });
  b += nota(bot + 60, 'La 4.ª línea (dorada) es FA, entre los dos puntos de la clave.', { fill: C.GOLD }) + nota(bot + 98, 'Líneas de abajo hacia arriba: SOL · SI · RE · FA · LA');
  let y = bot + 170; b += tit(y, 'Cuerda MI (4.ª): MI · FA · SOL');
  const p = pentaFa(y + 10, ['MI2', 'FA2', 'SOL2'], { arriba: 1 });
  b += p.b; y = p.h + 10;
  const m = mastil({ y0: y + 50, trastes: 4, solo: [4], notas: [[4, 0, 'MI'], [4, 1, 'FA', 1], [4, 3, 'SOL', 3]], resalta: 4 });
  b += m.b; y = m.h + 20;
  b += nota(y + 10, 'El bajo suena una octava más grave de lo que se escribe:', { size: 24, fill: C.GOLD }) + nota(y + 42, 'así sus notas caben en el pentagrama.', { size: 24, fill: C.GOLD });
  out('J1_clavefa', y + 70, 'La clave de fa y las notas MI, FA y SOL en la cuerda MI', b); })();

/* 5 · El bajo y el bombo */
(() => { let b = ''; const BOMBO = '#2E9E4F';
  const bloque = (y, titulo, golpes, bajo, largo) => { let r = tit(y, titulo, { size: 32 }); const x0 = 190, cw = 190;
    for (let k = 0; k < 4; k++) r += caja(x0 + k * cw + 5, y + 26, cw - 10, 250, { r: 12 }) + txt(x0 + (k + .5) * cw, y + 70, k + 1, { size: 34, w: 700 });
    r += txt(170, y + 150, 'Bombo', { a: 'end', size: 28, w: 700 }) + txt(170, y + 240, 'Bajo', { a: 'end', size: 28, w: 700 });
    golpes.forEach(k => { r += `<circle cx="${x0 + (k + .5) * cw}" cy="${y + 140}" r="30" fill="${BOMBO}" stroke="${C.IV}" stroke-width="3"/>`; });
    golpes.forEach(k => { const x = x0 + (k + .5) * cw; if (largo) r += `<rect x="${x}" y="${y + 226}" width="${cw}" height="20" rx="10" fill="${NOTA[bajo][0]}" opacity=".7"/>`; r += chip(x, y + 236, bajo, 84, 44); });
    return r; };
  b += bloque(50, 'Negras: una nota en cada pulso', [0, 1, 2, 3], 'MI', false);
  b += bloque(400, 'Blancas: el bajo dura 2 pulsos (en el 1 y el 3)', [0, 2], 'LA', true);
  b += nota(720, 'Mismo pulso, mismo lugar: así la banda suena firme.', { size: 26, fill: C.GOLD });
  out('J1_bombo', 750, 'El bajo toca con el bombo', b); })();

/* 6 · Cuerda LA y los silencios · 7 · Cuerda RE y las corcheas */
const cuerdaLam = (nombre, cuerda, ps, notas, texto, extra, label) => {
  let b = tit(56, `Cuerda ${CUERDA[cuerda]} (${cuerda}.ª): ` + notas.map(n => n[2]).join(' · '));
  const p = pentaFa(80, ps, { arriba: 1, s: 30 }); b += p.b + nota(p.h + 14, texto); let y = p.h + 50;
  const m = mastil({ y0: y + 30, trastes: 4, solo: [cuerda], notas, resalta: cuerda }); b += m.b; y = m.h + 50;
  const e = extra(y); out(nombre, e.h, label, b + e.b); };
const silencio = (x, y) => caja(x - 50, y - 50, 100, 100, { r: 14 }) + silNegra(x, y, 66);
cuerdaLam('J1_cuerdaLA', 3, ['LA2', 'SI2', 'DO3'], [[3, 0, 'LA'], [3, 2, 'SI', 2], [3, 3, 'DO', 3]], 'LA: 1.er espacio · SI: 2.ª línea · DO: 2.º espacio', y => {
  let b = tit(y, 'El silencio: apago la cuerda con la mano', { size: 32 });
  [['3/4 · vals', ['LA', 0, 0]], ['4/4', ['DO', 0, 'SI', 0]]].forEach(([t, ev], r) => { const yy = y + 70 + r * 140; b += txt(30, yy + 60, t, { a: 'start', size: 28, w: 700, fill: C.MUTE });
    ev.forEach((n, k) => { const x = 270 + k * 175; b += n ? chip(x, yy + 50, n, 100, 50) : silencio(x, yy + 50); }); });
  b += nota(y + 380, 'En el silencio, el dedo se afloja (sin soltar la cuerda) y la nota se apaga.');
  return { b, h: y + 410 }; }, 'Las notas LA, SI y DO en la cuerda LA y el silencio');
cuerdaLam('J1_cuerdaRE', 2, ['RE3', 'MI3', 'FA3'], [[2, 0, 'RE'], [2, 2, 'MI', 2], [2, 3, 'FA', 3]], 'RE: 3.ª línea · MI: 3.er espacio · FA: 4.ª línea', y => {
  let b = tit(y, 'Corcheas: dos notas en cada pulso', { size: 32 });
  for (let k = 0; k < 8; k++) { const x = 80 + k * 120, l = k % 2 ? 'm' : 'i'; b += txt(x, y + 70, k % 2 ? 'y' : k / 2 + 1, { size: 32, w: 700, fill: k % 2 ? C.MUTE : C.IV });
    b += `<circle cx="${x}" cy="${y + 130}" r="40" fill="${IM[l]}" stroke="${C.IV}" stroke-width="3"/>` + txt(x, y + 145, l, { size: 40, w: 700, fill: '#fff' }); }
  b += nota(y + 220, 'Digo «ti-ti» en cada pulso · el pie marca solo 1, 2, 3, 4');
  return { b, h: y + 250 }; }, 'Las notas RE, MI y FA en la cuerda RE y las corcheas');

/* 8 · Himno de la alegría */
(() => { const MEL = [['MI', 'MI', 'FA', 'SOL'], ['SOL', 'FA', 'MI', 'RE'], ['DO', 'DO', 'RE', 'MI'], ['MI', 'RE', 'RE:h'], ['MI', 'MI', 'FA', 'SOL'], ['SOL', 'FA', 'MI', 'RE'], ['DO', 'DO', 'RE', 'MI'], ['RE', 'DO', 'DO:h']];
  const medidas = MEL.map(m => ({ s: m.map(x => { const [n, d] = x.split(':'); return { p: n + '3', d: d || 'q' }; }) }));
  let b = txt(W / 2, 54, '«Himno de la alegría» · Beethoven', { serif: 1, size: 44, w: 700 });
  const g = gran({ medidas, porLinea: 2, s: 28, soloFa: true, y0: 70 }); b += g.b; let y = g.h + 10;
  b += tit(y, 'Dónde toco cada nota', { size: 32 });
  const MAP = [['DO', 'cuerda LA · traste 3'], ['RE', 'cuerda RE al aire'], ['MI', 'cuerda RE · traste 2'], ['FA', 'cuerda RE · traste 3'], ['SOL', 'cuerda SOL al aire']];
  MAP.forEach(([n, d], k) => { const yy = y + 30 + k * 76; b += caja(30, yy, W - 60, 64, { r: 12 }) + chip(110, yy + 32, n, 96, 44) + txt(190, yy + 42, d, { a: 'start', size: 28, w: 600 }); });
  y += 30 + 5 * 76 + 30; b += nota(y, 'Nueva: SOL es la 1.ª cuerda al aire · la blanca dura 2 pulsos', { fill: C.GOLD });
  out('J1_himno', y + 30, 'Himno de la alegría en el bajo', b); })();

/* 9 · La raíz del acorde */
(() => { let b = txt(W / 2, 56, 'La raíz: la nota que nombra al acorde', { serif: 1, size: 42, w: 700 });
  const R = [[3, 3, 'DO', 'C'], [2, 0, 'RE', 'D'], [4, 0, 'MI', 'E'], [4, 1, 'FA', 'F'], [4, 3, 'SOL', 'G'], [3, 0, 'LA', 'A']];
  const m = mastil({ y0: 130, trastes: 4, notas: R.map(([c, t, n]) => [c, t, n]) }); b += m.b;
  R.forEach(([c, t, n, l]) => { b += circ(m.nx(t) - 48, m.cy(c) - 30, 19, l, { size: 24 }); });
  let y = m.h + 30; b += tit(y, 'Cifrado → nota del bajo', { size: 32 });
  [['C', 'DO'], ['G', 'SOL'], ['Am', 'LA'], ['F', 'FA'], ['Em', 'MI'], ['D', 'RE']].forEach(([c, n], k) => { const x = 60 + (k % 3) * 310, yy = y + 70 + Math.floor(k / 3) * 80;
    b += txt(x + 70, yy + 12, c, { a: 'end', serif: 1, size: 40, w: 700 }) + txt(x + 110, yy + 10, '→', { size: 32, w: 700, fill: C.MUTE }) + chip(x + 200, yy, n, 90, 44); });
  y += 250; b += caja(30, y, W - 60, 130) + txt(W / 2, y + 52, 'C y Cm tienen la misma raíz: DO.', { size: 28, w: 700 }) + txt(W / 2, y + 96, 'Con barra (C/E), el bajo toca la nota después de la barra: MI.', { size: 24, w: 600, fill: C.GOLD });
  out('J1_raiz', y + 160, 'La raíz de los acordes en el bajo', b); })();

/* 10 · Tonos y semitonos en la cuerda SI */
(() => { let b = txt(W / 2, 56, 'Un traste = un semitono', { serif: 1, size: 44, w: 700 }) + txt(W / 2, 100, 'dos trastes = un tono', { size: 30, w: 600, fill: C.MUTE });
  const fw = 150, m = mastil({ y0: 260, trastes: 5, fw, x0: 200, solo: [5], resalta: 5, notas: [[5, 0, 'SI'], [5, 1, 'DO'], [5, 2, 'DO♯'], [5, 3, 'RE'], [5, 4, 'RE♯'], [5, 5, 'MI']] });
  b += m.b; [[0, 1, 'semitono', C.GOLD], [1, 3, 'tono', C.IV], [3, 5, 'tono', C.IV]].forEach(([a, c, t, col]) => { const xa = m.nx(a), xb = m.nx(c);
    b += `<path d="M${xa} 222 Q${(xa + xb) / 2} 150 ${xb} 222" fill="none" stroke="${col}" stroke-width="4"/>` + txt((xa + xb) / 2, 168, t, { size: 26, w: 700, fill: col }); });
  let y = m.h + 30; b += nota(y, 'MI–FA y SI–DO son semitonos naturales (no hay nota entre ellas).', { size: 24, fill: C.GOLD });
  y += 50; b += tit(y, 'En el pentagrama: con líneas adicionales', { size: 32 });
  const p = pentaFa(y + 10, ['SI1', 'DO2', 'RE2'], { arriba: 1, s: 28 }); b += p.b; y = p.h + 20;
  b += nota(y, 'SI cuelga de la 2.ª línea adicional · DO va sobre ella · RE, entre las dos');
  b += nota(y + 44, 'Bajo de 4 cuerdas: tócalas una octava arriba (DO: cuerda LA, traste 3).', { fill: C.GOLD, size: 24 });
  out('J1_semitono', y + 74, 'Tonos y semitonos en el bajo y la cuerda SI', b); })();

/* 11 · La escala de Do */
(() => { let b = txt(W / 2, 54, 'La escala de Do · una octava', { serif: 1, size: 44, w: 700 });
  const ESC = [['DO2', 5, 1, 1], ['RE2', 5, 3, 3], ['MI2', 4, 0], ['FA2', 4, 1, 1], ['SOL2', 4, 3, 3], ['LA2', 3, 0], ['SI2', 3, 2, 2], ['DO3', 3, 3, 3]];
  const p = pentaFa(60, ESC.map(e => e[0]), { arriba: 2, s: 26, xL: 20, xR: W - 20 }); b += p.b; let y = p.h + 20;
  const xs = p.ys.map(v => v[0]); ['T', 'T', 'S', 'T', 'T', 'T', 'S'].forEach((d, k) => { const x = (xs[k] + xs[k + 1]) / 2;
    b += `<circle cx="${x}" cy="${y}" r="24" fill="${d === 'S' ? C.GOLD : 'none'}" stroke="${d === 'S' ? GOLDTX : C.IV}" stroke-width="3"/>` + txt(x, y + 9, d, { size: 26, w: 700, fill: d === 'S' ? GOLDTX : C.IV }); });
  b += nota(y + 60, 'T = tono (2 trastes) · S = semitono (1 traste)'); y += 100;
  const m = mastil({ y0: y + 40, trastes: 3, fw: 230, notas: ESC.map(([q, c, t, d]) => [c, t, parse(q).n, d]) }); b += m.b; y = m.h + 24;
  b += nota(y + 4, 'Bajo de 5 cuerdas: empieza en la cuerda SI, traste 1.', { size: 24, fill: C.IV }) + nota(y + 40, 'Bajo de 4 cuerdas: empieza en DO de la cuerda LA (traste 3).', { size: 24, fill: C.GOLD });
  out('J1_escala', y + 70, 'La escala de Do en el bajo de cinco cuerdas', b); })();

/* 12 · Las raíces de «Cuando los santos marchan» */
(() => { let b = txt(W / 2, 54, '«Cuando los santos marchan»', { serif: 1, size: 44, w: 700 }) + txt(W / 2, 96, 'Leo el cifrado y toco la raíz: un compás por acorde', { size: 26, w: 600, fill: C.MUTE });
  const SANTOS = ['C', 'C', 'C', 'C', 'C', 'C', 'G', 'G', 'C', 'C', 'F', 'F', 'C', 'G', 'C', 'C'], RN = { C: 'DO', G: 'SOL', F: 'FA' };
  SANTOS.forEach((c, k) => { const r = Math.floor(k / 4), col = k % 4, x = 30 + col * 238, y = 130 + r * 170;
    b += caja(x, y, 226, 150, { r: 14 }) + txt(x + 22, y + 50, c, { a: 'start', serif: 1, size: 44, w: 700, fill: C.GOLD }) + chip(x + 150, y + 38, RN[c], 96, 44);
    for (let j = 0; j < 4; j++) b += `<circle cx="${x + 46 + j * 45}" cy="${y + 112}" r="12" fill="${NOTA[RN[c]][0]}"/>`; });
  let y = 130 + 4 * 170 + 20; b += nota(y, 'Cada punto es un pulso (4 negras por compás).');
  y += 40; b += tit(y + 10, 'Dónde toco cada raíz', { size: 30 });
  [['DO', 'cuerda LA · traste 3 (o cuerda SI · traste 1)'], ['FA', 'cuerda MI · traste 1'], ['SOL', 'cuerda MI · traste 3']].forEach(([n, d], k) => { const yy = y + 40 + k * 70;
    b += chip(80, yy + 30, n, 96, 44) + txt(150, yy + 40, d, { a: 'start', size: 27, w: 600 }); });
  out('J1_santos', y + 260, 'Raíces de «Cuando los santos marchan»', b); })();
module.exports = { mastil, pentaFa, circ, tit, nota, caja, CUERDA, IM, DED, GOLDTX };
if (require.main === module) console.log('ok', fs.readdirSync(OUT).filter(f => f.startsWith('J1_')).length, 'láminas J1');
