/* Láminas técnicas de Piano Nivel 1 (clases 1 a 12) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (piano/img/P1_*.svg). Uso: node tecnicas_piano1.js → img_piano/P1_*.svg
   No se redibujan P1_partes_piano, P1_postura ni P1_dedos (dibujos ilustrativos: quedan igual hasta tener fotos). */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, chip, txt, svg, f1, partitura, pent, clave, cabeza } = require('./tecnicas_motor.js');
const OUT = path.join(__dirname, 'img_piano'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const DK = '#1b1206', NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || DK}" stroke-width="3"/>` + txt(x, y + r * .38, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || DK });
const card = (x, y, w, h, on) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${on ? '#3a2a10' : C.PANEL}" stroke="${on ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>`;

/* Teclado: n teclas blancas desde DO (índice 0). col = {índice: nombre de nota para pintarla}; nombres = mostrar el nombre en cada tecla pintada;
   dedos = {índice: número arriba}; gris = {índice: texto en tecla gris}; devuelve también kx(i) (centro de la tecla blanca i) */
function teclado({ x, y, n, kw, h = kw * 3.6, col = {}, dedos = {}, gris = {}, nombres = true, todos = false, fz }) {
  let b = ''; const kx = i => x + (i + .5) * kw, bw = kw * .58, bh = h * .6;
  b += `<rect x="${f1(x - 6)}" y="${f1(y - 6)}" width="${f1(n * kw + 12)}" height="${f1(h + 12)}" rx="10" fill="#2a1d12"/>`;
  for (let i = 0; i < n; i++) { const nm = col[i], g = gris[i] !== undefined;
    b += `<rect x="${f1(x + i * kw + 1.5)}" y="${f1(y)}" width="${f1(kw - 3)}" height="${f1(h)}" rx="6" fill="${nm ? NOTA[nm][0] : g ? '#6b6457' : '#f4efe6'}"/>`;
    const lab = nm && nombres ? nm : g ? gris[i] : todos ? NS[i % 7] : '';
    if (lab) b += txt(kx(i), y + h - 16, lab, { size: f1(fz || Math.min(26, kw * .36)), w: 700, fill: nm ? NOTA[nm][1] : g ? '#fff' : '#3a3226' }); }
  for (let i = 0; i < n - 1; i++) if ([0, 1, 3, 4, 5].includes(i % 7)) b += `<rect x="${f1(x + (i + 1) * kw - bw / 2)}" y="${f1(y)}" width="${f1(bw)}" height="${f1(bh)}" rx="4" fill="#0f0d0b" stroke="#000" stroke-width="2"/>`;
  Object.entries(dedos).forEach(([i, d]) => b += circ(kx(+i), y - 34, 22, d, { size: 24 }));
  return { b, kx, h };
}
const q = (p, o = {}) => Object.assign({ p, d: 'q' }, o), h = (p, o = {}) => Object.assign({ p, d: 'h' }, o), w = (p, o = {}) => Object.assign({ p, d: 'w' }, o), e = (p, o = {}) => Object.assign({ p, d: 'e' }, o);
const P4 = { DO: 'DO4', RE: 'RE4', MI: 'MI4', FA: 'FA4', SOL: 'SOL4', LA: 'LA4', SI: 'SI4' };

/* 1 · Las teclas blancas */
(() => { const k = teclado({ x: 40, y: 40, n: 8, kw: 115, h: 380, col: Object.fromEntries([...NS, 'DO'].map((n, i) => [i, n])) }); let b = k.b;
  'CDEFGABC'.split('').forEach((c, i) => b += txt(k.kx(i), 480, c, { serif: 1, size: 46, w: 700 }));
  b += txt(k.kx(0), 528, '▲ DO central', { size: 24, w: 600, fill: C.GOLD }) + txt(W / 2, 590, 'Después de SI vuelve DO: se repite en todo el teclado', { size: 26, w: 600, fill: C.MUTE });
  out('P1_teclas_blancas', 620, 'Las teclas blancas: las 7 notas con su color', b); })();

/* 1 · Los grados en el teclado */
(() => { const k = teclado({ x: 40, y: 150, n: 8, kw: 115, h: 360, col: Object.fromEntries([...NS, 'DO'].map((n, i) => [i, n])) }); let b = '';
  b += `<path d="M${k.kx(0)},110 Q${W / 2},10 ${k.kx(7)},110" fill="none" stroke="${C.GOLD}" stroke-width="4" stroke-dasharray="12 9"/>` + `<rect x="${W / 2 - 170}" y="24" width="340" height="44" rx="22" fill="${C.PANEL}" stroke="${C.GOLD}" stroke-width="3"/>` + txt(W / 2, 56, 'El 1 y el 8: octava', { size: 26, w: 700, fill: C.GOLD });
  b += k.b; for (let i = 0; i < 8; i++) b += circ(k.kx(i), 118, 24, i + 1, { size: 28 }) + txt(k.kx(i), 570, 'CDEFGABC'[i], { serif: 1, size: 46, w: 700 });
  b += txt(k.kx(0), 616, '▼ grave', { size: 24, w: 500, fill: C.MUTE }) + txt(k.kx(7) - 10, 616, 'agudo ▲', { size: 24, w: 500, fill: C.MUTE });
  out('P1_grados', 650, 'Los 7 grados de la escala de DO y su octava en el teclado', b); })();

/* 3 · Grupos de 2 y 3 teclas negras (3 octavas) */
(() => { const n = 21, kw = 44, col = {}; for (let i = 0; i < n; i++) if (i % 7 === 0) col[i] = 'DO'; else if (i % 7 === 3) col[i] = 'FA';
  const k = teclado({ x: 38, y: 110, n, kw, h: 300, col, fz: 15 }); let b = k.b;
  for (let o = 0; o < 3; o++) { const g2 = 38 + (o * 7 + 1) * kw, g3 = 38 + (o * 7 + 4.5) * kw; b += `<path d="M${g2 - 30},92 L${g2 - 30},80 L${g2 + 30},80 L${g2 + 30},92" fill="none" stroke="${C.GOLD}" stroke-width="3"/>` + circ(g2, 56, 18, '2', { size: 22 }) + `<path d="M${g3 - 52},92 L${g3 - 52},80 L${g3 + 52},80 L${g3 + 52},92" fill="none" stroke="${C.IV}" stroke-width="3"/>` + circ(g3, 56, 18, '3', { size: 22, fill: C.IV }); }
  b += circ(56, 480, 18, '2', { size: 22 }) + txt(86, 490, 'Grupo de 2 negras: DO justo a su izquierda', { a: 'start', size: 28, w: 600 });
  b += circ(56, 540, 18, '3', { size: 22, fill: C.IV }) + txt(86, 550, 'Grupo de 3 negras: FA justo a su izquierda', { a: 'start', size: 28, w: 600 });
  out('P1_grupos_negras', 590, 'Las teclas negras van en grupos de 2 y de 3', b); })();

/* 3 · La octava (DO3 a DO6) */
(() => { const n = 22, kw = 42, col = {}; for (let i = 0; i < n; i++) if (i % 7 === 0) col[i] = 'DO';
  const k = teclado({ x: 38, y: 110, n, kw, h: 290, col, fz: 14 }); let b = k.b;
  for (let o = 0; o < 3; o++) { const a = k.kx(o * 7), z = k.kx(o * 7 + 7); b += `<path d="M${a},92 L${a},78 L${z},78 L${z},92" fill="none" stroke="${C.GOLD}" stroke-width="3"/>` + txt((a + z) / 2, 64, '1 octava', { size: 24, w: 700, fill: C.GOLD }); }
  ['DO3', 'DO4', 'DO5', 'DO6'].forEach((t, o) => b += txt(k.kx(o * 7), 450, t, { size: 26, w: 700 }));
  b += txt(k.kx(7), 484, '▲ DO central', { size: 22, w: 600, fill: C.GOLD }) + txt(W / 2, 548, '← grave · izquierda      derecha · agudo →', { size: 26, w: 600, fill: C.MUTE });
  out('P1_octavas', 580, 'La octava: el mismo nombre, más agudo', b); })();

/* 3 · Las cuatro cualidades del sonido en el piano (2 × 2) */
(() => { let b = ''; const cw = 470, ch = 380, P = (i) => [20 + (i % 2) * (cw + 20), 20 + Math.floor(i / 2) * (ch + 20)];
  const tit = (i, t, s) => { const [x, y] = P(i); return card(x, y, cw, ch) + txt(x + cw / 2, y + 50, t, { size: 30, w: 700, fill: C.GOLD }) + txt(x + cw / 2, y + 86, s, { size: 24, w: 500, fill: C.MUTE }); };
  b += tit(0, 'ALTURA', '¿Agudo o grave?'); { const [x, y] = P(0); const k = teclado({ x: x + 45, y: y + 120, n: 14, kw: 27, h: 110, nombres: false }); b += k.b + txt(x + 60, y + 278, '← grave', { a: 'start', size: 24, w: 600 }) + txt(x + cw - 60, y + 278, 'agudo →', { a: 'end', size: 24, w: 600 }) + txt(x + cw / 2, y + 330, 'Derecha = agudo · izquierda = grave', { size: 22, w: 500, fill: C.MUTE }); }
  b += tit(1, 'DURACIÓN', '¿Largo o corto?'); { const [x, y] = P(1); b += txt(x + 40, y + 160, 'Largo', { a: 'start', size: 26, w: 700 }) + `<rect x="${x + 150}" y="${y + 138}" width="280" height="30" rx="15" fill="${C.GOLD}"/>` + txt(x + cw / 2, y + 210, 'dejo la tecla abajo', { size: 22, w: 500, fill: C.MUTE });
    b += txt(x + 40, y + 280, 'Corto', { a: 'start', size: 26, w: 700 }); for (let j = 0; j < 4; j++) b += `<circle cx="${x + 175 + j * 70}" cy="${y + 272}" r="15" fill="${C.GOLD}"/>`; b += txt(x + cw / 2, y + 330, 'la suelto rápido', { size: 22, w: 500, fill: C.MUTE }); }
  b += tit(2, 'INTENSIDAD', '¿Fuerte o suave?'); { const [x, y] = P(2); b += `<path d="M${x + 150},${y + 115} L${x + 150},${y + 200} M${x + 115},${y + 170} L${x + 150},${y + 215} L${x + 185},${y + 170}" stroke="${C.IV}" stroke-width="22" fill="none" stroke-linejoin="round"/><path d="M${x + 320},${y + 160} L${x + 320},${y + 215} M${x + 300},${y + 200} L${x + 320},${y + 228} L${x + 340},${y + 200}" stroke="${C.MUTE}" stroke-width="9" fill="none"/>`;
    b += txt(x + 150, y + 300, 'f', { serif: 1, size: 60, w: 700 }) + txt(x + 320, y + 300, 'p', { serif: 1, size: 60, w: 700, fill: C.MUTE }) + txt(x + cw / 2, y + 340, 'Más peso del brazo = fuerte', { size: 22, w: 500, fill: C.MUTE }); }
  b += tit(3, 'TIMBRE', '¿Quién suena?'); { const [x, y] = P(3); ['Piano', 'Voz', 'Guitarra'].forEach((t, j) => b += `<rect x="${x + 70}" y="${y + 120 + j * 64}" width="330" height="50" rx="25" fill="none" stroke="${C.LINE}" stroke-width="2"/>` + txt(x + 100, y + 154 + j * 64, t, { a: 'start', size: 26, w: 600 }) + chip(x + 350, y + 145 + j * 64, 'DO', 70, 36));
    b += txt(x + cw / 2, y + 340, 'la misma nota con distinto «color»', { size: 22, w: 500, fill: C.MUTE }); }
  out('P1_cualidades_piano', 820, 'Las cuatro cualidades del sonido en el piano', b); })();

/* 4 · El DO central en el pentagrama */
(() => { const s = 40, top = 90, bot = top + 4 * s; let b = pent(30, 970, top, s) + clave(36, bot, s);
  const N = [['DO', -2, '1', 'línea adicional'], ['RE', -1, '2', 'debajo de la 1.ª'], ['MI', 0, '3', '1.ª línea'], ['FA', 1, '4', '1.er espacio'], ['SOL', 2, '5', '2.ª línea']];
  N.forEach(([n, st, d, t], i) => { const x = 250 + i * 170, y = bot - st * s / 2; if (st === -2) b += `<line x1="${x - 40}" y1="${bot + s}" x2="${x + 40}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`;
    b += cabeza(x, y, s, NOTA[n][0], true) + chip(x, bot + 110, n, 84, 42) + txt(x, bot + 175, d, { size: 32, w: 700 }) + txt(x, bot + 215, t, { size: 21, w: 600, fill: C.MUTE }); });
  b += txt(30, bot + 175, 'dedo', { a: 'start', size: 22, w: 700, fill: C.GOLD }) + txt(W / 2, bot + 280, 'La clave de sol nace en la 2.ª línea: ahí vive SOL', { size: 26, w: 600, fill: C.GOLD });
  out('P1_pentagrama_do_central', bot + 310, 'El DO central en el pentagrama', b); })();

/* 4 · Posición de DO con las dos manos */
(() => { const col = {}, dd = {}; [0, 1, 2, 3, 4].forEach(i => { col[i] = NS[i]; col[i + 7] = NS[i]; dd[i] = 5 - i; dd[i + 7] = i + 1; });
  const k = teclado({ x: 31, y: 120, n: 14, kw: 67, h: 300, col, dedos: dd, fz: 20 }); let b = k.b;
  b += txt(k.kx(2), 52, 'Mano izquierda', { size: 28, w: 700, fill: C.GOLD }) + txt(k.kx(9), 52, 'Mano derecha', { size: 28, w: 700, fill: C.GOLD });
  b += txt(k.kx(7), 470, '▲ DO central', { size: 24, w: 600, fill: C.GOLD }) + txt(W / 2, 530, 'Derecha: los números suben con las notas', { size: 26, w: 600, fill: C.MUTE }) + txt(W / 2, 568, 'Izquierda: los números bajan', { size: 26, w: 600, fill: C.MUTE });
  out('P1_posicion_do', 600, 'Posición de DO: un dedo para cada tecla', b); })();

/* Partituras de piano: filas de dedos, mano izquierda, sílabas y conteo */
const FD = [['f', 'dedo']];
const n4 = (ns, ds, o = {}) => ns.map((n, i) => Object.assign({ p: P4[n] || n, d: 'q', f: String(ds[i]) }, o));
/* 4 · DO, RE y MI */
(() => { const r = partitura({ mm: [n4(['DO', 'RE', 'MI', 'RE'], [1, 2, 3, 2]), n4(['DO', 'RE', 'MI', 'MI'], [1, 2, 3, 3]), n4(['RE', 'DO', 'RE', 'DO'], [2, 1, 2, 1])], tab: false, filas: FD }); out('P1_do_re_mi', r.h, 'DO, RE y MI con la mano derecha', r.b); })();
/* 5 · Cinco dedos (las dos manos) */
(() => { const m = (ns, a, z) => ns.map((n, i) => ({ p: P4[n], d: 'q', f: String(a[i]), g: String(z[i]) }));
  const r = partitura({ mm: [m(['DO', 'RE', 'MI', 'FA'], [1, 2, 3, 4], [5, 4, 3, 2]), m(['SOL', 'FA', 'MI', 'RE'], [5, 4, 3, 2], [1, 2, 3, 4]), [{ p: 'DO4', d: 'w', f: '1', g: '5' }]], tab: false, filas: [['f', 'mano der.'], ['g', 'mano izq.']] });
  out('P1_cinco_dedos', r.h, 'Ejercicio de cinco dedos con las dos manos', r.b); })();
/* 6 · Lectura con silencios */
(() => { const m = (ns, ds) => ns.map((n, i) => ({ p: P4[n], d: 'q', f: String(ds[i]), sil: 'ta' })).concat([{ d: 'qr', sil: 'sh' }]);
  const r = partitura({ mm: [m(['DO', 'MI', 'SOL'], [1, 3, 5]), m(['SOL', 'FA', 'MI'], [5, 4, 3]), m(['RE', 'RE', 'MI'], [2, 2, 3]), [{ p: 'DO4', d: 'h', f: '1', sil: 'taa-aa' }, { d: 'hr', sil: 'sh' }]], tab: false, filas: [['f', 'dedo'], ['sil', '']] });
  out('P1_lectura_silencios', r.h, 'Lectura con silencios', r.b); })();
/* 6 · Vals en 3/4 */
(() => { const m = (ns, ds) => ns.map((n, i) => ({ p: P4[n], d: 'q', f: String(ds[i]), iz: i ? '' : 'DO' }));
  const r = partitura({ mm: [m(['DO', 'MI', 'MI'], [1, 3, 3]), m(['RE', 'FA', 'FA'], [2, 4, 4]), m(['MI', 'SOL', 'SOL'], [3, 5, 5]), [{ p: 'DO4', d: 'h', f: '1', iz: 'DO' }]], compasTxt: ['3', '4'], tab: false, filas: [['f', 'mano der.'], ['iz', 'mano izq.']] });
  out('P1_vals', r.h, 'Vals en 3/4: la mano izquierda toca DO en el tiempo 1', r.b); })();
/* 7 · Corcheas */
(() => { const r = partitura({ mm: [[e('DO4', { f: '1', sil: 'ti', cnt: '1' }), e('RE4', { f: '2', sil: 'ti', cnt: 'y' }), e('MI4', { f: '3', sil: 'ti', cnt: '2' }), e('FA4', { f: '4', sil: 'ti', cnt: 'y' }), q('SOL4', { f: '5', sil: 'ta', cnt: '3' }), q('SOL4', { f: '5', sil: 'ta', cnt: '4' })],
  [e('FA4', { f: '4', sil: 'ti', cnt: '1' }), e('MI4', { f: '3', sil: 'ti', cnt: 'y' }), e('RE4', { f: '2', sil: 'ti', cnt: '2' }), e('MI4', { f: '3', sil: 'ti', cnt: 'y' }), h('DO4', { f: '1', sil: 'taa-aa', cnt: '3' })]], porLinea: 1, tab: false, filas: [['f', 'dedo'], ['sil', ''], ['cnt', '']] });
  out('P1_corcheas', r.h, 'Corcheas: ti-ti', r.b); })();
/* 8 · Himno de la alegría (dos frases) */
(() => { const m = (ns, ds, iz, ult) => ns.map((n, i) => ({ p: P4[n], d: ult && i === 2 ? 'h' : 'q', f: String(ds[i]), iz: i ? '' : iz }));
  const A = m(['MI', 'MI', 'FA', 'SOL'], [3, 3, 4, 5], 'DO'), B = m(['SOL', 'FA', 'MI', 'RE'], [5, 4, 3, 2], 'SOL'), Cc = m(['DO', 'DO', 'RE', 'MI'], [1, 1, 2, 3], 'DO');
  const r = partitura({ mm: [A, B, Cc, m(['MI', 'RE', 'RE'], [3, 2, 2], 'SOL', 1), A, B, Cc, m(['RE', 'DO', 'DO'], [2, 1, 1], 'DO', 1)], tab: false, filas: [['f', 'dedo'], ['iz', 'mano izq.']] });
  out('P1_himno_alegria', r.h, 'Himno de la alegría con las dos manos', r.b); })();

/* 8 · Himno con los dedos */
(() => { const col = { 1: 'DO', 2: 'RE', 3: 'MI', 4: 'FA', 5: 'SOL' }, k = teclado({ x: 40, y: 90, n: 8, kw: 115, h: 280, col, dedos: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 } }); let b = k.b;
  const DN = { 1: 'DO', 2: 'RE', 3: 'MI', 4: 'FA', 5: 'SOL' }, fr = [[3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 3, 2, 2], [3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 2, 1, 1]];
  fr.forEach((F, r) => { const y = 470 + r * 160; b += txt(30, y - 50, 'Frase ' + (r + 1), { a: 'start', size: 28, w: 700, fill: C.GOLD }) + txt(W - 30, y - 50, r ? 'respuesta: termina en DO' : 'pregunta: termina en RE', { a: 'end', size: 24, w: 600, fill: C.MUTE });
    F.forEach((d, i) => { const x = 50 + i * 60 + Math.floor(i / 4) * 16, c = NOTA[DN[d]]; b += circ(x, y, 25, d, { fill: c[0], tx: c[1], size: 28 }); }); });
  out('P1_himno_dedos', 760, 'Himno de la alegría en la posición de DO', b); })();

/* 9 · Construyo una tríada */
(() => { const k = teclado({ x: 50, y: 110, n: 5, kw: 132, h: 380, col: { 0: 'DO', 2: 'MI', 4: 'SOL' }, gris: { 1: 'salto', 3: 'salto' }, dedos: { 0: 1, 2: 3, 4: 5 } }); let b = k.b;
  b += `<path d="M${k.kx(0)},530 Q${k.kx(1)},590 ${k.kx(2)},530 Q${k.kx(3)},590 ${k.kx(4)},530" fill="none" stroke="${C.GOLD}" stroke-width="4"/>`;
  [0, 2, 4].forEach((i, j) => b += circ(k.kx(i), 530, 22, [1, 3, 5][j], { size: 24 }));
  b += txt(860, 260, '1 + 3 + 5', { size: 36, w: 700 }) + txt(860, 330, '= C', { serif: 1, size: 70, w: 700, fill: C.GOLD }) + txt(860, 375, 'DO mayor', { size: 24, w: 600, fill: C.MUTE });
  out('P1_construir_triada', 620, 'Construyo una tríada: tocar una, saltar una', b); })();

/* 9 · El acorde de DO mayor */
(() => { const k = teclado({ x: 40, y: 100, n: 5, kw: 110, h: 320, col: { 0: 'DO', 2: 'MI', 4: 'SOL' }, dedos: { 0: 1, 2: 3, 4: 5 } }); let b = k.b;
  ['sí', 'no', 'sí', 'no', 'sí'].forEach((t, i) => b += txt(k.kx(i), 470, t, { size: 28, w: 700, fill: t === 'sí' ? C.GOLD : C.MUTE }));
  const s = 34, top = 120, bot = top + 4 * s; b += pent(640, 960, top, s) + clave(646, bot, s);
  [['DO', -2], ['MI', 0], ['SOL', 2]].forEach(([n, st]) => { const y = bot - st * s / 2; if (st === -2) b += `<line x1="${800 - 36}" y1="${bot + s}" x2="${800 + 36}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`; b += cabeza(800, y, s, NOTA[n][0], true) + chip(905, y, n, 70, 30); });
  b += txt(W / 2, 540, 'Mano derecha: 1 – 3 – 5 · mano izquierda: 5 – 3 – 1', { size: 26, w: 600 }) + txt(W / 2, 584, 'DO, la nota de abajo, es la fundamental: le da el nombre', { size: 24, w: 600, fill: C.MUTE });
  out('P1_acorde_C', 620, 'Acorde de DO mayor (C)', b); })();

/* 10 · Tono y semitono */
(() => { const k = teclado({ x: 40, y: 150, n: 8, kw: 115, h: 330, col: {}, todos: true, fz: 24 }); let b = '';
  [[4, 'MI'], [5, 'FA']].forEach(() => {}); b += `<rect x="${40 + 2 * 115}" y="350" width="230" height="130" rx="8" fill="${C.GOLD}" opacity=".25"/><rect x="${40 + 6 * 115}" y="350" width="230" height="130" rx="8" fill="${C.GOLD}" opacity=".25"/>`;
  b = k.b + b; 'TTSTTTS'.split('').forEach((t, i) => { const a = k.kx(i), z = k.kx(i + 1), S = t === 'S'; b += `<path d="M${a},132 Q${(a + z) / 2},86 ${z},132" fill="none" stroke="${S ? C.GOLD : C.LINE}" stroke-width="4"/>` + circ((a + z) / 2, 70, 24, t, { fill: S ? C.GOLD : C.PANEL, stroke: S ? DK : C.LINE, tx: S ? DK : C.IV, size: 28 }); });
  b += txt(W / 2, 540, 'S = semitono: la tecla vecina, sin ninguna en medio', { size: 25, w: 600 }) + txt(W / 2, 580, 'T = tono: dos semitonos (hay una negra en medio)', { size: 25, w: 600, fill: C.MUTE });
  out('P1_tono_semitono', 610, 'Tono y semitono en el teclado', b); })();

/* 10 y 12 · Tríadas C, F y G */
(() => { let b = ''; [['C · DO mayor', 'DO – MI – SOL', { 0: 'DO', 2: 'MI', 4: 'SOL' }], ['F · FA mayor', 'FA – LA – DO', { 3: 'FA', 5: 'LA', 7: 'DO' }], ['G · SOL mayor', 'SOL – SI – RE', { 4: 'SOL', 6: 'SI', 8: 'RE' }]].forEach(([t, nn, col], j) => { const y = 20 + j * 290, ks = Object.keys(col).map(Number), dd = { [ks[0]]: 1, [ks[1]]: 3, [ks[2]]: 5 };
    b += card(20, y, W - 40, 270) + txt(50, y + 52, t, { a: 'start', serif: 1, size: 40, w: 700, fill: C.GOLD }) + txt(W - 50, y + 52, nn, { a: 'end', size: 26, w: 700 });
    b += teclado({ x: 50, y: y + 110, n: 10, kw: 90, h: 140, col, dedos: dd, fz: 20 }).b; });
  b += txt(W / 2, 910, 'Mano derecha · dedos 1 – 3 – 5 · tecla sí, tecla no', { size: 26, w: 600, fill: C.MUTE });
  out('P1_triadas_CFG', 940, 'Tríadas mayores con notas naturales: C, F y G', b); })();

/* 11 · Escala de DO mayor con la mano derecha */
(() => { const k = teclado({ x: 40, y: 80, n: 8, kw: 115, h: 280, col: Object.fromEntries([...NS, 'DO'].map((n, i) => [i, n])), dedos: { 0: 1, 1: 2, 2: 3, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5 } }); let b = k.b;
  b += `<path d="M${k.kx(2)},385 Q${(k.kx(2) + k.kx(3)) / 2},430 ${k.kx(3)},385" fill="none" stroke="${C.GOLD}" stroke-width="5"/>` + txt((k.kx(2) + k.kx(3)) / 2, 466, 'paso del pulgar', { size: 26, w: 700, fill: C.GOLD });
  const up = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO5'], fu = [1, 2, 3, 1, 2, 3, 4, 5], fd = [5, 4, 3, 2, 1, 3, 2, 1], dn = ['DO5', 'SI', 'LA', 'SOL', 'FA', 'MI', 'RE', 'DO'];
  const mk = (ns, fs) => ns.map((n, i) => ({ p: n === 'DO5' ? 'DO5' : P4[n], d: 'q', f: String(fs[i]) }));
  const r = partitura({ mm: [mk(up.slice(0, 4), fu.slice(0, 4)), mk(up.slice(4), fu.slice(4)), mk(dn.slice(0, 4), fd.slice(0, 4)), mk(dn.slice(4), fd.slice(4))], tab: false, filas: FD });
  b += `<g transform="translate(0,480)">${r.b}</g>`;
  out('P1_escala_do_md', 480 + r.h, 'Escala de Do mayor con la mano derecha', b); })();

/* 11 · Mi primer acompañamiento C – F – G – C */
(() => { let b = ''; const PN = [['C', 'DO mayor', 0, 5, [7, 9, 11], 'DO', 'DO – MI – SOL'], ['F', 'FA mayor', 3, 2, [10, 12, 14], 'FA', 'FA – LA – DO'], ['G', 'SOL mayor', 4, 1, [11, 13, 15], 'SOL', 'SOL – SI – RE'], ['C', 'DO mayor', 0, 5, [7, 9, 11], 'DO', 'DO – MI – SOL']];
  PN.forEach(([a, nm, iz, di, der, bajo, acorde], j) => { const y = 20 + j * 330, col = { [iz]: NS[iz % 7] }, dd = { [iz]: di }; der.forEach((i, t) => { col[i] = NS[i % 7]; dd[i] = [1, 3, 5][t]; });
    b += card(20, y, W - 40, 310) + circ(50, y + 40, 20, j + 1, { size: 22 }) + txt(84, y + 54, a, { a: 'start', serif: 1, size: 44, w: 700, fill: C.GOLD }) + txt(140, y + 52, nm + ' · 4 tiempos', { a: 'start', size: 26, w: 600 });
    b += teclado({ x: 52, y: y + 135, n: 16, kw: 56, h: 120, col, dedos: dd, fz: 15 }).b + txt(50, y + 288, 'Izq.: ' + bajo + ' (dedo ' + di + ')', { a: 'start', size: 24, w: 600, fill: C.MUTE }) + txt(W - 50, y + 288, 'Der.: ' + acorde, { a: 'end', size: 24, w: 600, fill: C.MUTE }); });
  const y0 = 1360; b += txt(30, y0, 'Patrones de acompañamiento', { a: 'start', size: 32, w: 700, fill: C.GOLD });
  [['1 · Bloque (4/4)', [['las dos manos juntas: 1 golpe, 4 tiempos', 4, 0]]], ['2 · Bajo y acorde (4/4)', [['1-2 · izq.: DO (blanca)', 2, 1], ['3-4 · der.: acorde (blanca)', 2, 0]]], ['3 · Vals (3/4)', [['1 · izq.: DO', 1, 1], ['2 · der.: acorde', 1, 0], ['3 · der.: acorde', 1, 0]]]].forEach(([t, cel], j) => { const y = y0 + 40 + j * 130, tot = cel.reduce((s, c) => s + c[1], 0); let x = 30;
    b += txt(30, y + 30, t, { a: 'start', size: 26, w: 700 }); cel.forEach(([tx, n, iz]) => { const wd = (W - 60) * n / tot; b += `<rect x="${f1(x + 3)}" y="${y + 46}" width="${f1(wd - 6)}" height="60" rx="12" fill="${iz ? '#4a1e1b' : '#3a2a10'}" stroke="${iz ? '#E5312B' : C.GOLD}" stroke-width="2"/>` + txt(x + wd / 2, y + 85, tx, { size: n === 1 ? 20 : 22, w: 600 }); x += wd; }); });
  out('P1_acompanamiento', y0 + 440, 'Mi primer acompañamiento: C – F – G – C', b); })();

/* 12 · Cómo se lee un cifrado */
(() => { let b = ''; const M = [[['C', 4]], [['F', 2], ['C', 2]], [['F', 2], ['C', 2]], [['G', 2], ['C', 2]]], CC = { C: 'DO', F: 'FA', G: 'SOL' };
  M.forEach((m, i) => { const fila = Math.floor(i / 2), x0 = 30 + (i % 2) * 470, y = 30 + fila * 250, bw = 450 / 4; let x = x0;
    m.forEach(([a, n]) => { const c = NOTA[CC[a]]; b += `<rect x="${f1(x + 4)}" y="${y}" width="${f1(n * bw - 8)}" height="80" rx="14" fill="${c[0]}"/>` + txt(x + n * bw / 2, y + 56, a, { serif: 1, size: 48, w: 700, fill: c[1] }); x += n * bw; });
    for (let t = 0; t < 4; t++) b += circ(x0 + (t + .5) * bw, y + 130, 20, t + 1, { size: 22 });
    b += `<line x1="${x0 + 450 + 6}" y1="${y - 6}" x2="${x0 + 450 + 6}" y2="${y + 156}" stroke="${C.LINE}" stroke-width="3"/>`;
    if (i < 2) b += txt(x0 + 225, y + 200, i ? 'F 2 + C 2' : 'C: 4 tiempos', { size: 24, w: 600, fill: C.MUTE }); });
  b += txt(W / 2, 560, 'Miro el cifrado un compás antes de tocarlo', { size: 26, w: 600, fill: C.GOLD });
  out('P1_leer_cifrado', 590, 'Cómo se lee un cifrado en 4/4', b); })();
console.log('ok piano 1:', fs.readdirSync(OUT).length, 'láminas');
