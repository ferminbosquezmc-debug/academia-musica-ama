/* Láminas técnicas de Piano Nivel 2 (clases 13 a 24) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (piano/img/P2_*.svg). Uso: node tecnicas_piano2.js → img_piano/P2_*.svg */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, chip, txt, svg, f1, pent, clave, cabeza } = require('./tecnicas_motor.js');
const { gran, claveFa, pill } = require('./tecnicas_gran.js');
const OUT = path.join(__dirname, 'img_piano'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const DK = '#1b1206', NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || DK}" stroke-width="3"/>` + txt(x, y + r * .38, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || DK });
const card = (x, y, w, h, on) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${on ? '#3a2a10' : C.PANEL}" stroke="${on ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>`;

/* Teclado con inicio en cualquier nota (ini = índice de la primera blanca: 0 = DO, 4 = SOL…).
   col = {blanca: nota}; neg = {blanca de la izquierda: etiqueta} pinta la negra que le sigue; dedos/dedosN encima; abajo = números debajo */
function teclado({ x, y, n, kw, h = kw * 3.4, ini = 0, col = {}, neg = {}, negCol = {}, dedos = {}, dedosN = {}, abajo = {}, abajoN = {}, nombres = true, todos = false, fz }) {
  let b = ''; const kx = i => x + (i + .5) * kw, bw = kw * .6, bh = h * .6, F = fz || Math.min(24, kw * .34);
  b += `<rect x="${f1(x - 6)}" y="${f1(y - 6)}" width="${f1(n * kw + 12)}" height="${f1(h + 12)}" rx="10" fill="#2a1d12"/>`;
  for (let i = 0; i < n; i++) { const nm = col[i]; b += `<rect x="${f1(x + i * kw + 1.5)}" y="${f1(y)}" width="${f1(kw - 3)}" height="${f1(h)}" rx="6" fill="${nm ? NOTA[nm][0] : '#f4efe6'}"/>`;
    const lab = nm && nombres ? nm : todos ? NS[(i + ini) % 7] : ''; if (lab) b += txt(kx(i), y + h - 14, lab, { size: f1(F), w: 700, fill: nm ? NOTA[nm][1] : '#3a3226' }); }
  for (let i = 0; i < n - 1; i++) if ([0, 1, 3, 4, 5].includes((i + ini) % 7)) { const xb = x + (i + 1) * kw, c = negCol[i];
    b += `<rect x="${f1(xb - bw / 2)}" y="${f1(y)}" width="${f1(bw)}" height="${f1(bh)}" rx="4" fill="${c ? NOTA[c][0] : '#0f0d0b'}" stroke="${c ? C.IV : '#000'}" stroke-width="2"/>`;
    if (neg[i]) neg[i].split('/').forEach((t, j, a) => b += txt(xb, y + bh - 14 - (a.length - 1 - j) * (F + 4), t, { size: f1(F * .82), w: 700, fill: c ? NOTA[c][1] : C.IV })); }
  Object.entries(dedos).forEach(([i, d]) => b += circ(kx(+i), y - 32, 21, d, { size: 23 }));
  Object.entries(dedosN).forEach(([i, d]) => b += circ(x + (+i + 1) * kw, y - 32, 21, d, { size: 23 }));
  Object.entries(abajo).forEach(([i, d]) => b += circ(kx(+i), y + h + 34, 21, d, { size: 23, fill: C.IV }));
  Object.entries(abajoN).forEach(([i, d]) => b += circ(x + (+i + 1) * kw, y + h + 34, 21, d, { size: 23, fill: C.IV }));
  return { b, kx, kn: i => x + (i + 1) * kw };
}
const q = (p, o = {}) => Object.assign({ p, d: 'q' }, o), h = (p, o = {}) => Object.assign({ p, d: 'h' }, o), w = (p, o = {}) => Object.assign({ p, d: 'w' }, o), e = (p, o = {}) => Object.assign({ p, d: 'e' }, o);
const ch = (ps, d, o = {}) => Object.assign({ ps, d }, o);
const conDedos = (evs, ds) => evs.map((x, i) => Object.assign(x, { f: String(ds[i]) }));

/* 13 · Las teclas negras tienen dos nombres */
(() => { const k = teclado({ x: 40, y: 60, n: 8, kw: 115, h: 400, neg: { 0: 'DO♯/RE♭', 1: 'RE♯/MI♭', 3: 'FA♯/SOL♭', 4: 'SOL♯/LA♭', 5: 'LA♯/SI♭' }, todos: true, fz: 24 }); let b = k.b;
  b += txt(W / 2, 530, '♯ sube a la tecla vecina de la derecha', { size: 26, w: 600 }) + txt(W / 2, 570, '♭ baja a la de la izquierda', { size: 26, w: 600 }) + txt(W / 2, 620, 'MI–FA y SI–DO no tienen negra en medio', { size: 24, w: 600, fill: C.MUTE });
  out('P2_teclas_negras', 650, 'Las teclas negras tienen dos nombres', b); })();

/* 13 · Sostenido, bemol y becuadro */
(() => { const r = gran({ medidas: [{ s: [h('FA4', { sil: 'FA' }), h('FA♯4', { sil: 'FA♯' })] }, { s: [h('SI4', { sil: 'SI' }), h('SI♭4', { sil: 'SI♭' })] }, { s: [h('FA♯4', { sil: 'FA♯' }), h('FA♮4', { sil: 'FA' })] }], porLinea: 3, chipsS: false, filasS: [['sil', '']], sinCompas: true });
  let b = r.b; [['♯ sube un semitono', 'FA → FA♯'], ['♭ baja un semitono', 'SI → SI♭'], ['♮ anula', 'FA♯ → FA']].forEach(([a, z], i) => { const y = r.h + 20 + i * 70; b += txt(60, y, a, { a: 'start', size: 28, w: 700, fill: C.GOLD }) + txt(W - 60, y, z, { a: 'end', size: 28, w: 700 }); });
  out('P2_alteraciones', r.h + 220, 'Sostenido, bemol y becuadro', b); })();

/* 14 · Los intervalos desde DO */
(() => { const I = [['RE4', '2.ª', 2], ['MI4', '3.ª', 4], ['FA4', '4.ª', 5], ['SOL4', '5.ª', 7], ['LA4', '6.ª', 9], ['SI4', '7.ª', 11], ['DO5', '8.ª', 12]];
  const r = gran({ medidas: I.map(([p, n, sm]) => ({ s: [ch(['DO4', p], 'w', { f: n, sil: 'DO – ' + p.replace(/\d/, ''), cnt: sm + ' semit.' })] })), porLinea: 4, chipsS: false, filasS: [['f', ''], ['sil', ''], ['cnt', '']], sinCompas: true });
  out('P2_intervalos', r.h, 'Los intervalos desde DO', r.b); })();

/* 14 · La clave de fa */
(() => { const L = ['SOL2', 'SI2', 'RE3', 'FA3', 'LA3'], E = ['LA2', 'DO3', 'MI3', 'SOL3'], s = 40, top = 150, bot = top + 4 * s; let b = pent(40, 960, top, s) + claveFa(70, top, s);
  b += txt(250, 70, 'Líneas', { a: 'start', size: 28, w: 700, fill: C.GOLD }) + txt(640, 70, 'Espacios', { a: 'start', size: 28, w: 700, fill: C.IV });
  const IDX = { DO: 0, RE: 1, MI: 2, FA: 3, SOL: 4, LA: 5, SI: 6 }, st = p => +p.slice(-1) * 7 + IDX[p.slice(0, -1)] - 18;
  [...L.map(p => [p, 0]), ...E.map(p => [p, 1])].forEach(([p, esp], i) => { const x = 250 + i * 80 + (esp ? 30 : 0), y = bot - st(p) * s / 2, n = p.slice(0, -1); b += cabeza(x, y, s, NOTA[n][0], true) + pill(x, bot + 70, n, n, 70, 36); });
  b += `<path d="M${40},${top + s} L${18},${top + s}" stroke="${C.GOLD}" stroke-width="4"/>` + txt(W / 2, bot + 150, 'Sus dos puntos rodean la 4.ª línea: ahí vive FA', { size: 26, w: 600, fill: C.GOLD }) + txt(W / 2, bot + 192, 'Es la clave de la mano izquierda', { size: 26, w: 600, fill: C.MUTE });
  out('P2_clave_fa', bot + 220, 'La clave de fa', b); })();

/* 14 · El gran pentagrama */
(() => { const r = gran({ medidas: [{ s: conDedos([q('DO4'), q('RE4'), q('MI4'), q('FA4')], [1, 2, 3, 4]), f: conDedos([q('DO3'), q('RE3'), q('MI3'), q('FA3')], [5, 4, 3, 2]) }, { s: [h('SOL4', { f: '5' }), { d: 'hr' }], f: [h('SOL3', { f: '1' }), { d: 'hr' }] }, { s: [w('DO4')], f: [w('DO4')] }], porLinea: 2, filasS: [['f', 'dedo']], filasF: [['f', 'dedo']], chipsF: true, sinCompas: true });
  let b = r.b + txt(W / 2, r.h + 10, 'DO central: la misma tecla en las dos claves', { size: 26, w: 600, fill: C.GOLD }) + txt(W / 2, r.h + 50, 'Arriba la mano derecha · abajo la mano izquierda', { size: 24, w: 600, fill: C.MUTE });
  out('P2_gran_pentagrama', r.h + 80, 'El gran pentagrama', b); })();

/* 14 · Himno de la alegría a dos claves */
(() => { const m = (ns, ds, bajo, df, ult) => ({ s: ns.map((n, i) => ({ p: n + '4', d: ult && i === 2 ? 'h' : 'q', f: String(ds[i]) })), f: [w(bajo, { f: String(df) })] });
  const A = (b1) => m(['MI', 'MI', 'FA', 'SOL'], [3, 3, 4, 5], b1, 5), B = m(['SOL', 'FA', 'MI', 'RE'], [5, 4, 3, 2], 'SOL3', 1), Cc = m(['DO', 'DO', 'RE', 'MI'], [1, 1, 2, 3], 'DO3', 5);
  const r = gran({ medidas: [A('DO3'), B, Cc, m(['MI', 'RE', 'RE'], [3, 2, 2], 'SOL3', 1, 1), A('DO3'), B, Cc, m(['RE', 'DO', 'DO'], [2, 1, 1], 'DO3', 5, 1)], filasS: [['f', 'dedo']], filasF: [['f', 'dedo']], chipsF: true });
  out('P2_himno_dos_claves', r.h, 'Himno de la alegría a dos claves', r.b); })();

/* 15 · La fórmula de la escala mayor (Sol mayor) */
(() => { const k = teclado({ x: 40, y: 160, n: 8, kw: 115, h: 330, ini: 4, col: { 0: 'SOL', 1: 'LA', 2: 'SI', 3: 'DO', 4: 'RE', 5: 'MI', 7: 'SOL' }, negCol: { 6: 'FA' }, neg: { 6: 'FA♯' }, fz: 22 }); let b = k.b;
  const P = [k.kx(0), k.kx(1), k.kx(2), k.kx(3), k.kx(4), k.kx(5), k.kn(6), k.kx(7)];
  'TTSTTTS'.split('').forEach((t, i) => { const a = P[i], z = P[i + 1], S = t === 'S'; b += `<path d="M${a},142 Q${(a + z) / 2},96 ${z},142" fill="none" stroke="${S ? C.GOLD : C.LINE}" stroke-width="4"/>` + circ((a + z) / 2, 76, 22, t, { fill: S ? C.GOLD : C.PANEL, stroke: S ? DK : C.LINE, tx: S ? DK : C.IV, size: 26 }); });
  b += txt(W / 2, 560, 'Sol mayor: la fórmula pide FA♯ (tecla negra)', { size: 26, w: 600, fill: C.GOLD }) + txt(W / 2, 600, 'T = tono (dos semitonos) · S = semitono', { size: 24, w: 600, fill: C.MUTE });
  out('P2_escala_mayor', 630, 'La fórmula de la escala mayor: T-T-S-T-T-T-S', b); })();

/* 15 · Las posiciones de cinco dedos (2 × 2) */
(() => { let b = ''; const P = [['Posición de DO', 0, { 0: 'DO', 1: 'RE', 2: 'MI', 3: 'FA', 4: 'SOL' }, {}, {}, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }, {}], ['Posición de SOL', 4, { 0: 'SOL', 1: 'LA', 2: 'SI', 3: 'DO', 4: 'RE' }, {}, {}, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }, {}], ['Posición de RE', 1, { 0: 'RE', 1: 'MI', 3: 'SOL', 4: 'LA' }, { 2: 'FA' }, { 2: 'FA♯' }, { 0: 1, 1: 2, 3: 4, 4: 5 }, { 2: 3 }], ['Posición de LA', 5, { 0: 'LA', 1: 'SI', 3: 'RE', 4: 'MI' }, { 2: 'DO' }, { 2: 'DO♯' }, { 0: 1, 1: 2, 3: 4, 4: 5 }, { 2: 3 }]];
  P.forEach(([t, ini, col, negCol, neg, dd, dn], i) => { const x = 20 + (i % 2) * 490, y = 20 + Math.floor(i / 2) * 400; b += card(x, y, 470, 380) + txt(x + 24, y + 48, t, { a: 'start', size: 28, w: 700, fill: C.GOLD });
    b += teclado({ x: x + 25, y: y + 130, n: 7, kw: 60, h: 220, ini, col, negCol, neg, dedos: dd, dedosN: dn, fz: 16 }).b; });
  out('P2_posiciones_cinco', 820, 'Las posiciones de cinco dedos: DO, SOL, RE y LA', b); })();

/* 16 · Acordes vecinos · mano izquierda */
(() => { let b = ''; [['C', 'DO – MI – SOL', 'dedos 5-3-1', { 0: 'DO', 2: 'MI', 4: 'SOL' }, { 0: 5, 2: 3, 4: 1 }], ['F/C', 'DO – FA – LA', 'dedos 5-2-1', { 0: 'DO', 3: 'FA', 5: 'LA' }, { 0: 5, 3: 2, 5: 1 }], ['G/B', 'SI – RE – SOL', 'dedos 5-3-1', { 0: 'SI', 2: 'RE', 5: 'SOL' }, { 0: 5, 2: 3, 5: 1 }]].forEach(([n, nn, dd, col, de], j) => { const y = 20 + j * 290, ini = j === 2 ? 6 : 0;
    b += card(20, y, W - 40, 270) + txt(50, y + 52, n, { a: 'start', serif: 1, size: 44, w: 700, fill: C.GOLD }) + txt(W - 50, y + 44, nn, { a: 'end', size: 26, w: 700 }) + txt(W - 50, y + 76, dd, { a: 'end', size: 22, w: 600, fill: C.MUTE });
    b += teclado({ x: 50, y: y + 120, n: 8, kw: 110, h: 130, ini, col, dedos: de, fz: 20 }).b; });
  b += txt(W / 2, 910, 'Del acorde de DO solo se mueven dos dedos', { size: 26, w: 600, fill: C.MUTE });
  out('P2_acordes_vecinos_mi', 940, 'Acordes vecinos con la mano izquierda: C, F/C y G/B', b); })();

/* 16 · Paso a paso (C – F – G – C) */
(() => { const C3 = ['DO3', 'MI3', 'SOL3'], F3 = ['DO3', 'FA3', 'LA3'], G3 = ['SI2', 'RE3', 'SOL3'];
  const r = gran({ medidas: [{ c: 'C', s: conDedos([q('SOL4'), q('MI4'), q('DO4'), q('MI4')], [5, 3, 1, 3]), f: [ch(C3, 'w')] }, { c: 'F', s: conDedos([q('FA4'), q('FA4'), h('FA4')], [4, 4, 4]), f: [ch(F3, 'w')] }, { c: 'G', s: conDedos([q('RE4'), q('RE4'), h('SOL4')], [2, 2, 5]), f: [ch(G3, 'w')] }, { c: 'C', s: conDedos([h('MI4'), h('DO4')], [3, 1]), f: [ch(C3, 'w')] },
    { c: 'C', s: conDedos([q('SOL4'), q('MI4'), q('DO4'), q('MI4')], [5, 3, 1, 3]), f: [ch(C3, 'w')] }, { c: 'F', s: conDedos([q('FA4'), q('FA4'), h('DO4')], [4, 4, 1]), f: [ch(F3, 'w')] }, { c: 'G', s: conDedos([h('SOL4'), h('RE4')], [5, 2]), f: [ch(G3, 'w')] }, { c: 'C', s: conDedos([w('DO4')], [1]), f: [ch(C3, 'w')] }], filasS: [['f', 'dedo']], cifra: true });
  out('P2_paso_a_paso', r.h, 'Paso a paso: melodía con acordes C, F y G', r.b); })();

/* 17 · Tres patrones para la mano izquierda */
(() => { let b = '', y = 20; const P = [['1 · Bajo alterno (4/4)', ['4', '4'], [{ f: conDedos([q('DO3'), q('SOL3'), q('DO3'), q('SOL3')], [5, 1, 5, 1]) }, { f: conDedos([q('DO3'), q('SOL3'), q('DO3'), q('SOL3')], [5, 1, 5, 1]) }]],
  ['2 · Acorde quebrado (4/4)', ['4', '4'], [0, 1].map(() => ({ f: conDedos([e('DO3'), e('SOL3'), e('MI3'), e('SOL3'), e('DO3'), e('SOL3'), e('MI3'), e('SOL3')], [5, 1, 3, 1, 5, 1, 3, 1]) }))],
  ['3 · Vals (3/4)', ['3', '4'], [0, 1].map(() => ({ f: [q('DO3', { f: '5' }), ch(['MI3', 'SOL3'], 'q', { f: '3·1' }), ch(['MI3', 'SOL3'], 'q', { f: '3·1' })] }))]];
  P.forEach(([t, cs, mm]) => { b += txt(30, y + 34, t, { a: 'start', size: 30, w: 700, fill: C.GOLD }); const r = gran({ medidas: mm.map(m => ({ s: m.f })), compas: cs, y0: y + 10, filasS: [['f', '']], chipsS: false, soloFa: true });
    b += r.b; y = r.h + 10; });
  out('P2_patrones_mi', y, 'Tres patrones para la mano izquierda', b); })();

/* 18 · Puntillo y ligadura */
(() => { let b = txt(30, 50, 'El puntillo (3/4)', { a: 'start', size: 30, w: 700, fill: C.GOLD });
  const a = gran({ medidas: [{ s: [{ p: 'SOL4', d: 'h.', sil: 'taa-aa-aa' }] }, { s: [{ p: 'SOL4', d: 'q.', sil: 'ta-a' }, e('SOL4', { sil: 'ti' }), q('SOL4', { sil: 'ta' })] }], compas: ['3', '4'], chipsS: false, filasS: [['sil', '']], y0: 40 }); b += a.b;
  b += txt(30, a.h + 30, 'La ligadura (4/4)', { a: 'start', size: 30, w: 700, fill: C.GOLD });
  const l = gran({ medidas: [{ s: [h('SOL4', { sil: 'taa-aa', lig: 1 }), q('SOL4', { sil: '(-aa)' }), { d: 'qr', sil: 'sh' }] }, { s: [{ d: 'qr', sil: 'sh' }, h('SOL4', { sil: 'taa-aa' }), { d: 'qr', sil: 'sh' }] }], chipsS: false, filasS: [['sil', '']], y0: a.h + 20 }); b += l.b;
  [['Blanca con puntillo', 'taa-aa-aa = 3 tiempos'], ['Negra con puntillo', 'ta-a = 1½ tiempos'], ['Blanca ligada a negra', '2 + 1 = 3 tiempos']].forEach(([x1, x2], i) => { const y = l.h + 20 + i * 54; b += txt(40, y, x1, { a: 'start', size: 26, w: 700 }) + txt(W - 40, y, x2, { a: 'end', size: 26, w: 700, fill: C.GOLD }); });
  out('P2_puntillo_ligadura', l.h + 190, 'El puntillo y la ligadura de prolongación', b); })();

/* 18 · Arpegio de DO a dos manos */
(() => { const k = teclado({ x: 31, y: 120, n: 14, kw: 67, h: 300, col: { 0: 'DO', 2: 'MI', 4: 'SOL', 7: 'DO', 9: 'MI', 11: 'SOL' }, dedos: { 0: 5, 2: 3, 4: 1, 7: 1, 9: 3, 11: 5 }, fz: 18 }); let b = k.b;
  b += txt(k.kx(2), 50, 'Mano izquierda · 5-3-1', { size: 26, w: 700, fill: C.GOLD }) + txt(k.kx(9), 50, 'Mano derecha · 1-3-5', { size: 26, w: 700, fill: C.GOLD });
  [0, 2, 4, 7, 9, 11].forEach((i, j, a) => { b += circ(k.kx(i), 480, 22, j + 1, { fill: C.IV, size: 24 }); if (j < 5) b += `<line x1="${k.kx(i) + 26}" y1="480" x2="${k.kx(a[j + 1]) - 26}" y2="480" stroke="${C.GOLD}" stroke-width="4"/>`; });
  b += txt(W / 2, 560, 'Sube 1 → 6 y vuelve 6 → 1 sin cortar el sonido', { size: 26, w: 600, fill: C.MUTE });
  out('P2_arpegio_dos_manos', 590, 'Arpegio de DO a dos manos', b); })();

/* 18 · Noche de paz (3/4) */
(() => { const Cc = ['DO3', 'MI3', 'SOL3'], Gg = ['SI2', 'RE3', 'SOL3'], A = { c: 'C', s: conDedos([{ p: 'SOL4', d: 'q.' }, e('LA4'), q('SOL4')], [3, 4, 3]), f: [ch(Cc, 'h.')] }, B = { s: conDedos([{ p: 'MI4', d: 'h.' }], [1]), f: [ch(Cc, 'h.')] };
  const r = gran({ medidas: [A, B, Object.assign({}, A, { c: '' }), B, { c: 'G', s: conDedos([h('RE5'), q('RE5')], [5, 5]), f: [ch(Gg, 'h.')] }, { s: conDedos([{ p: 'SI4', d: 'h.' }], [3]), f: [ch(Gg, 'h.')] }, { c: 'C', s: conDedos([h('DO5'), q('DO5')], [4, 4]), f: [ch(Cc, 'h.')] }, { s: conDedos([{ p: 'SOL4', d: 'h.' }], [1]), f: [ch(Cc, 'h.')] }], compas: ['3', '4'], filasS: [['f', 'dedo']], cifra: true });
  out('P2_noche_de_paz', r.h, 'Noche de paz en 3/4 a dos manos', r.b); })();

/* 19 · Escalas de Do y Sol mayor con cada mano */
(() => { let b = ''; [['Do mayor', 0, { 0: 'DO', 1: 'RE', 2: 'MI', 3: 'FA', 4: 'SOL', 5: 'LA', 6: 'SI', 7: 'DO' }, {}, {}, { 0: 1, 1: 2, 2: 3, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5 }, {}, { 0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 3, 6: 2, 7: 1 }, {}],
    ['Sol mayor', 4, { 0: 'SOL', 1: 'LA', 2: 'SI', 3: 'DO', 4: 'RE', 5: 'MI', 7: 'SOL' }, { 6: 'FA' }, { 6: 'FA♯' }, { 0: 1, 1: 2, 2: 3, 3: 1, 4: 2, 5: 3, 7: 5 }, { 6: 4 }, { 0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 3, 7: 1 }, { 6: 2 }]].forEach(([t, ini, col, negCol, neg, dd, dn, ab, abN], j) => { const y = 20 + j * 520;
    b += card(20, y, W - 40, 500) + txt(50, y + 50, t, { a: 'start', serif: 1, size: 40, w: 700, fill: C.GOLD }) + txt(W - 50, y + 50, 'arriba: derecha · abajo: izquierda', { a: 'end', size: 20, w: 600, fill: C.MUTE });
    b += teclado({ x: 50, y: y + 140, n: 8, kw: 112, h: 260, ini, col, negCol, neg, dedos: dd, dedosN: dn, abajo: ab, abajoN: abN, fz: 20 }).b; });
  out('P2_escalas_do_sol', 1060, 'Escalas de Do y Sol mayor con cada mano', b); })();

/* 19 · Lectura sin color · posición de SOL */
(() => { const S = ['SOL4', 'LA4', 'SI4', 'DO5', 'RE5'], n = i => S[i], m = (ps, ds, d) => ps.map((p, i) => ({ p: n(p), d: d ? d[i] : 'q', f: String(ds[i]) }));
  const r = gran({ medidas: [{ s: m([0, 1, 2, 3], [1, 2, 3, 4]) }, { s: m([4, 2], [5, 3], ['h', 'h']) }, { s: m([3, 2, 1, 0], [4, 3, 2, 1]) }, { s: m([1], [2], ['w']) }, { s: m([2, 3, 4, 2], [3, 4, 5, 3]) }, { s: m([3, 1], [4, 2], ['h', 'h']) }, { s: m([2, 1, 0, 1], [3, 2, 1, 2]) }, { s: m([0], [1], ['w']) }], sinColor: true, filasS: [['f', 'dedo']] });
  out('P2_lectura_sin_color', r.h, 'Lectura sin color en la posición de SOL', r.b); })();

/* 20 · Tríadas sobre los grados de Do mayor */
(() => { const T = [['I', 'C', 'mayor', ['DO4', 'MI4', 'SOL4']], ['ii', 'Dm', 'menor', ['RE4', 'FA4', 'LA4']], ['iii', 'Em', 'menor', ['MI4', 'SOL4', 'SI4']], ['IV', 'F', 'mayor', ['FA4', 'LA4', 'DO5']], ['V', 'G', 'mayor', ['SOL4', 'SI4', 'RE5']], ['vi', 'Am', 'menor', ['LA4', 'DO5', 'MI5']], ['vii°', 'B°', 'dism.', ['SI4', 'RE5', 'FA5']]];
  const r = gran({ medidas: T.map(([g, a, t, ps]) => ({ s: [ch(ps, 'w', { f: g, sil: a, cnt: t })] })), porLinea: 4, chipsS: false, filasS: [['f', ''], ['sil', ''], ['cnt', '']], sinCompas: true });
  let b = r.b + txt(W / 2, r.h + 10, 'Mayúscula = mayor · minúscula = menor · ° = disminuido', { size: 24, w: 600, fill: C.MUTE });
  out('P2_triadas_grados', r.h + 40, 'Tríadas sobre los grados de Do mayor', b); })();

/* 20 · Lectura sorpresa · sin color */
(() => { const m = (ns, ds, b3) => ({ s: ns.map((p, i) => ({ p, d: ds[i] })), f: [w(b3)] });
  const r = gran({ medidas: [m(['MI4', 'RE4', 'DO4', 'RE4'], 'qqqq', 'DO3'), m(['MI4', 'MI4', 'MI4'], 'qqh', 'DO3'), m(['RE4', 'RE4', 'MI4', 'RE4'], 'qqqq', 'SOL3'), m(['DO4'], 'w', 'DO3')].map(x => (x.s.forEach(y => y.d = y.d), x)), sinColor: true });
  out('P2_lectura_sorpresa', r.h, 'Lectura sorpresa sin color', r.b); })();

/* 21 · El pedal sincopado */
(() => { let b = ''; const x0 = 150, cw = 205; b += txt(30, 120, 'Manos', { a: 'start', size: 26, w: 700, fill: C.GOLD }) + txt(30, 290, 'Pedal', { a: 'start', size: 26, w: 700, fill: C.GOLD });
  ['C', 'F', 'C', 'G'].forEach((a, i) => { const x = x0 + i * cw; b += `<rect x="${x + 3}" y="80" width="${cw - 6}" height="70" rx="12" fill="#3a2a10" stroke="${C.GOLD}" stroke-width="2"/>` + txt(x + 24, 128, a, { a: 'start', serif: 1, size: 40, w: 700 }); if (i) b += txt(x, 60, 'toco', { size: 22, w: 700, fill: C.GOLD }) + `<line x1="${x}" y1="70" x2="${x}" y2="300" stroke="${C.MUTE}" stroke-width="2" stroke-dasharray="6 6"/>`; });
  let d = `M${x0},230 L${x0},300`; for (let i = 1; i < 4; i++) { const x = x0 + i * cw; d += ` L${x},300 L${x + 18},250 L${x + 36},300`; } d += ` L${x0 + 4 * cw},300 L${x0 + 4 * cw},230`;
  b += `<path d="${d}" fill="none" stroke="${C.IV}" stroke-width="5" stroke-linejoin="round"/>` + txt(x0 + 10, 340, 'bajo', { a: 'start', size: 22, w: 600, fill: C.MUTE }); for (let i = 1; i < 4; i++) b += txt(x0 + i * cw + 18, 340, 'levanto y bajo', { size: 20, w: 600, fill: C.MUTE });
  b += txt(W / 2, 420, 'El pedal se cambia justo después de tocar el acorde nuevo', { size: 25, w: 600 }) + txt(W / 2, 460, 'Talón en el suelo · la punta del pie sube y baja', { size: 24, w: 600, fill: C.MUTE });
  out('P2_pedal', 490, 'El pedal sincopado: toco, levanto y bajo', b); })();

/* 21 · Los acordes menores de Do mayor */
(() => { let b = ''; [['Dm', 'ii · RE menor', 1, { 0: 'RE', 2: 'FA', 4: 'LA' }], ['Em', 'iii · MI menor', 2, { 0: 'MI', 2: 'SOL', 4: 'SI' }], ['Am', 'vi · LA menor', 5, { 0: 'LA', 2: 'DO', 4: 'MI' }]].forEach(([a, t, ini, col], j) => { const y = 20 + j * 290;
    b += card(20, y, W - 40, 270) + txt(50, y + 54, a, { a: 'start', serif: 1, size: 44, w: 700, fill: C.GOLD }) + txt(W - 50, y + 50, t, { a: 'end', size: 26, w: 700 });
    b += teclado({ x: 50, y: y + 120, n: 8, kw: 110, h: 130, ini, col, dedos: { 0: 1, 2: 3, 4: 5 }, fz: 20 }).b; });
  b += txt(W / 2, 910, 'Tocar una, saltar una · suena más oscuro que el mayor', { size: 26, w: 600, fill: C.MUTE });
  out('P2_acordes_menores', 940, 'Los acordes menores de Do mayor: Dm, Em y Am', b); })();

/* 22 · Acordes vecinos · mano derecha */
(() => { let b = ''; [['C', 'DO – MI – SOL', 0, { 0: 'DO', 2: 'MI', 4: 'SOL' }, { 0: 1, 2: 3, 4: 5 }], ['G/B', 'SI – RE – SOL', 6, { 0: 'SI', 1: 'RE' && 'DO' && undefined }, {}], ['Am/C', 'DO – MI – LA', 0, { 0: 'DO', 2: 'MI', 5: 'LA' }, { 0: 1, 2: 2, 5: 5 }], ['F/C', 'DO – FA – LA', 0, { 0: 'DO', 3: 'FA', 5: 'LA' }, { 0: 1, 3: 3, 5: 5 }]].forEach(([n, nn, ini, col, de], j) => {
    if (n === 'G/B') { col = { 0: 'SI', 2: 'RE', 5: 'SOL' }; de = { 0: 1, 2: 2, 5: 5 }; } const x = 20 + (j % 2) * 490, y = 20 + Math.floor(j / 2) * 330;
    b += card(x, y, 470, 310) + txt(x + 24, y + 52, n, { a: 'start', serif: 1, size: 40, w: 700, fill: C.GOLD }) + txt(x + 446, y + 48, nn, { a: 'end', size: 22, w: 700 });
    b += teclado({ x: x + 25, y: y + 125, n: 7, kw: 60, h: 160, ini, col, dedos: de, fz: 16 }).b; });
  b += txt(W / 2, 700, 'C – G – Am – F casi sin mover la mano', { size: 26, w: 600, fill: C.MUTE });
  out('P2_acordes_vecinos_md', 730, 'Acordes vecinos con la mano derecha', b); })();

/* 22 · Cascabeles */
(() => { const m = (c, ns, ds, df) => ({ c, s: ns.map((p, i) => ({ p: p + '4', d: ds[i], f: String(df[i]) })) });
  const r = gran({ medidas: [m('C', ['MI', 'MI', 'MI'], ['q', 'q', 'h'], [3, 3, 3]), m('C', ['MI', 'MI', 'MI'], ['q', 'q', 'h'], [3, 3, 3]), m('C', ['MI', 'SOL', 'DO', 'RE'], ['q', 'q', 'q.', 'e'], [3, 5, 1, 2]), m('C', ['MI'], ['w'], [3]),
    m('F', ['FA', 'FA', 'FA', 'FA'], ['q', 'q', 'q.', 'e'], [4, 4, 4, 4]), m('C', ['FA', 'MI', 'MI', 'MI', 'MI'], ['q', 'q', 'q', 'e', 'e'], [4, 3, 3, 3, 3]), m('G', ['MI', 'RE', 'RE', 'MI'], ['q', 'q', 'q', 'q'], [3, 2, 2, 3]), m('G', ['RE', 'SOL'], ['h', 'h'], [2, 5]),
    m('C', ['MI', 'MI', 'MI'], ['q', 'q', 'h'], [3, 3, 3]), m('C', ['MI', 'MI', 'MI'], ['q', 'q', 'h'], [3, 3, 3]), m('C', ['MI', 'SOL', 'DO', 'RE'], ['q', 'q', 'q.', 'e'], [3, 5, 1, 2]), m('C', ['MI'], ['w'], [3]),
    m('F', ['FA', 'FA', 'FA', 'FA'], ['q', 'q', 'q', 'q'], [4, 4, 4, 4]), m('C', ['FA', 'MI', 'MI', 'MI', 'MI'], ['q', 'q', 'q', 'e', 'e'], [4, 3, 3, 3, 3]), m('G', ['SOL', 'SOL', 'FA', 'RE'], ['q', 'q', 'q', 'q'], [5, 5, 4, 2]), m('C', ['DO'], ['w'], [1])], filasS: [['f', 'dedo']], cifra: true });
  out('P2_cascabeles', r.h, 'Cascabeles (versión AMA simplificada)', r.b); })();

/* 23 · Dinámicas y forma */
(() => { let b = txt(30, 50, 'Dinámicas', { a: 'start', size: 32, w: 700, fill: C.GOLD });
  [['p', 'piano · suave', 40], ['mf', 'mezzoforte · medio fuerte', 80], ['f', 'forte · fuerte', 120]].forEach(([s, t, hb], i) => { const x = 170 + i * 330; b += `<rect x="${x - 45}" y="${210 - hb}" width="90" height="${hb}" rx="8" fill="${C.GOLD}" opacity="${.4 + i * .3}"/>` + txt(x, 280, s, { serif: 1, size: 60, w: 700 }) + txt(x, 318, t, { size: 21, w: 600, fill: C.MUTE }); });
  b += `<path d="M60,400 L440,372 M60,400 L440,428" stroke="${C.IV}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M560,372 L940,400 M560,428 L940,400" stroke="${C.IV}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  b += txt(250, 474, 'crescendo · cada vez más fuerte', { size: 22, w: 600 }) + txt(750, 474, 'diminuendo · cada vez más suave', { size: 22, w: 600 });
  b += txt(30, 550, 'Forma', { a: 'start', size: 32, w: 700, fill: C.GOLD });
  [['A', 'Paso a paso', 'p'], ['B', 'Idea nueva', 'f (cresc.)'], ['A', 'Vuelve el comienzo', 'mf → dim.']].forEach(([l, t, d], i) => { const x = 20 + i * 325; b += card(x, 580, 310, 190, l === 'B') + txt(x + 155, 660, l, { serif: 1, size: 64, w: 700, fill: l === 'B' ? C.GOLD : C.IV }) + txt(x + 155, 705, t, { size: 24, w: 700 }) + txt(x + 155, 744, d, { serif: 1, size: 26, w: 600, fill: C.MUTE }); });
  out('P2_dinamicas_forma', 800, 'Dinámicas y forma', b); })();

/* 24 · Mis acordes del Nivel 2 (10 acordes) */
(() => { let b = ''; const A = [['C', 'DO mayor', 0, { 0: 'DO', 2: 'MI', 4: 'SOL' }, {}, {}], ['D', 'RE mayor', 1, { 0: 'RE', 4: 'LA' }, { 2: 'FA' }, { 2: 'FA♯' }], ['E', 'MI mayor', 2, { 0: 'MI', 4: 'SI' }, { 2: 'SOL' }, { 2: 'SOL♯' }], ['F', 'FA mayor', 3, { 0: 'FA', 2: 'LA', 4: 'DO' }, {}, {}], ['G', 'SOL mayor', 4, { 0: 'SOL', 2: 'SI', 4: 'RE' }, {}, {}],
    ['A', 'LA mayor', 5, { 0: 'LA', 4: 'MI' }, { 2: 'DO' }, { 2: 'DO♯' }], ['Cm', 'DO menor', 0, { 0: 'DO', 4: 'SOL' }, { 1: 'MI' }, { 1: 'MI♭' }], ['Dm', 'RE menor', 1, { 0: 'RE', 2: 'FA', 4: 'LA' }, {}, {}], ['Em', 'MI menor', 2, { 0: 'MI', 2: 'SOL', 4: 'SI' }, {}, {}], ['Am', 'LA menor', 5, { 0: 'LA', 2: 'DO', 4: 'MI' }, {}, {}]];
  A.forEach(([a, t, ini, col, negCol, neg], j) => { const x = 20 + (j % 2) * 490, y = 20 + Math.floor(j / 2) * 250; b += card(x, y, 470, 232, a.length < 2) + txt(x + 24, y + 48, a, { a: 'start', serif: 1, size: 38, w: 700, fill: C.GOLD }) + txt(x + 446, y + 44, t, { a: 'end', size: 22, w: 700 });
    b += teclado({ x: x + 25, y: y + 76, n: 7, kw: 60, h: 136, ini, col, negCol, neg, fz: 15 }).b; });
  b += txt(W / 2, 1290, 'Mayor: 4 + 3 semitonos · menor: 3 + 4', { size: 26, w: 600, fill: C.MUTE });
  out('P2_acordes_nivel2', 1320, 'Mis acordes del Nivel 2', b); })();
console.log('ok piano 2:', fs.readdirSync(OUT).filter(f => f.startsWith('P2')).length, 'láminas');
