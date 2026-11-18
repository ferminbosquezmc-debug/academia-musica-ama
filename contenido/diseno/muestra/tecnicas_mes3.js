/* Láminas técnicas de guitarra Nivel 1 · Mes 3 (clases 9 a 12), estilo nuevo y formato para teléfono.
   Uso: node tecnicas_mes3.js → img_tec/*.svg   («Qué es un acorde» ya la cubre la lámina G-12) */
const fs = require('fs'), path = require('path');
const { C, NOTA, F, W, chip, txt, svg, partitura, f1, acorde } = require('./tecnicas_motor.js');
const OUT = path.join(__dirname, 'img_tec');
const out = (n, h, label, b, w = W) => fs.writeFileSync(path.join(OUT, n + '.svg'), w === W ? svg(h, label, b) : `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${Math.ceil(h)}" viewBox="0 0 ${w} ${Math.ceil(h)}" role="img" aria-label="${label}"><title>${label}</title><rect width="${w}" height="${Math.ceil(h)}" rx="26" fill="${C.BG}"/>${b}</svg>`);
const q = p => ({ p, d: 'q' });

const SOLO = [['N1_acorde_Em', 'Em', 'Mi menor', [0, 2, 2, 0, 0, 0], [0, 2, 3, 0, 0, 0], ['MI', 'SI', 'MI', 'SOL', 'SI', 'MI']],
  ['N1_acorde_E', 'EM', 'Mi mayor', [0, 2, 2, 1, 0, 0], [0, 2, 3, 1, 0, 0]],
  ['N1_acorde_Am', 'Am', 'La menor', ['x', 0, 2, 2, 1, 0], [0, 0, 2, 3, 1, 0], [0, 'LA', 'MI', 'LA', 'DO', 'MI']],
  ['N1_acorde_A', 'A', 'La mayor', ['x', 0, 2, 2, 2, 0], [0, 0, 1, 2, 3, 0]],
  ['N1_acorde_D', 'D', 'Re mayor', ['x', 'x', 0, 2, 3, 2], [0, 0, 0, 1, 3, 2]]];
const CH = Math.max(...SOLO.map(s => acorde(0, 0, 460, s[1], s[2], s[3], s[4], s[5] || ['', '', '', '', '', '']).h)); /* todos del mismo alto */
SOLO.forEach(([n, nom, sub, tr, de, ch]) => { const r = acorde(0, 0, 460, nom, sub, tr, de, ch || ['', '', '', '', '', '']); out(n, CH + 10, 'Acorde ' + sub + ' (' + nom + ')', r.b, 460); });

/* Clase 12 · los 5 acordes del Nivel 1 en una sola lámina (3 + 2) */
(() => { let b = ''; const cw = 470, items = [['Em', 'Mi menor', [0, 2, 2, 0, 0, 0], [0, 2, 3, 0, 0, 0]], ['E', 'Mi mayor', [0, 2, 2, 1, 0, 0], [0, 2, 3, 1, 0, 0]], ['Am', 'La menor', ['x', 0, 2, 2, 1, 0], [0, 0, 2, 3, 1, 0]], ['A', 'La mayor', ['x', 0, 2, 2, 2, 0], [0, 0, 1, 2, 3, 0]], ['D', 'Re mayor', ['x', 'x', 0, 2, 3, 2], [0, 0, 0, 1, 3, 2]]];
  let hh = 0; items.forEach(([nom, sub, tr, de], i) => { const fila = Math.floor(i / 2), col = i % 2, x = i === 4 ? (W - cw) / 2 : 20 + col * (cw + 20), y = 10 + fila * (acorde(0, 0, cw, 'E', '', [0, 0, 0, 0, 0, 0], []).h + 40), r = acorde(x, y, cw, nom, sub, tr, de); b += r.b; hh = Math.max(hh, y + r.h); });
  b += txt(W / 2, hh + 40, '○ al aire  ·  ✕ no se toca  ·  número = dedo', { size: 30, w: 600, fill: C.MUTE });
  out('N1_acordes', hh + 70, 'Los 5 acordes del Nivel 1: Em, E, Am, A y D', b); })();

/* Clase 10 · tonos y semitonos */
(() => { let b = ''; const x0 = 230, fw = 145, y = 230;
  b += `<rect x="${x0}" y="${y - 55}" width="${5 * fw + 8}" height="110" rx="6" fill="#2a1d12"/><rect x="${x0 - 12}" y="${y - 60}" width="14" height="120" rx="3" fill="#f4ecd8"/>`;
  for (let f = 1; f <= 5; f++) b += `<line x1="${x0 + f * fw}" y1="${y - 55}" x2="${x0 + f * fw}" y2="${y + 55}" stroke="#a7a9ad" stroke-width="6"/>` + txt(x0 + f * fw - fw / 2, y + 100, f, { size: 30, w: 700, fill: C.MUTE });
  b += txt(30, y + 100, 'traste', { a: 'start', size: 26, w: 600, fill: C.MUTE });
  b += `<line x1="${x0}" y1="${y}" x2="${x0 + 5 * fw + 8}" y2="${y}" stroke="#eee7da" stroke-width="4"/>` + txt(24, y + 11, '1.ª', { a: 'start', size: 32, w: 700 });
  const pos = [['MI', x0 - 82], ['FA', x0 + fw / 2], ['SOL', x0 + 2.5 * fw], ['LA', x0 + 4.5 * fw]];
  pos.forEach(([n, x]) => b += chip(x, y, n, 96, 52));
  [[0, 1, 'semitono'], [1, 2, 'tono'], [2, 3, 'tono']].forEach(([a, c, t]) => { const xa = pos[a][1], xc = pos[c][1], xm = (xa + xc) / 2;
    b += `<path d="M${xa},${y - 36} Q${xm},${y - 150} ${xc},${y - 36}" fill="none" stroke="${C.GOLD}" stroke-width="5"/>` + txt(xm, y - 112, t, { size: 30, w: 700, fill: t === 'semitono' ? C.GOLD : C.IV }); });
  const y2 = y + 220; b += txt(30, y2, 'La escala de DO', { a: 'start', size: 36, w: 700, fill: C.GOLD });
  const NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO'], TS = ['T', 'T', 'S', 'T', 'T', 'T', 'S'], xs = i => 70 + i * 123;
  NS.forEach((n, i) => b += chip(xs(i), y2 + 80, n, 96, 52));
  TS.forEach((t, i) => { const x = (xs(i) + xs(i + 1)) / 2; b += `<circle cx="${x}" cy="${y2 + 170}" r="32" fill="${t === 'S' ? C.GOLD : 'none'}" stroke="${t === 'S' ? C.GOLD : C.IV}" stroke-width="4"/>` + txt(x, y2 + 182, t, { size: 34, w: 700, fill: t === 'S' ? '#1b1206' : C.IV }); });
  b += txt(W / 2, y2 + 268, 'T = tono (2 trastes)  ·  S = semitono (1 traste)', { size: 30, w: 600, fill: C.MUTE });
  out('N1_semitonos', y2 + 300, 'Tonos y semitonos', b); })();

/* Clase 11 · rasgueos */
(() => { let b = ''; const flecha = (x, y1, y2, abajo, col, gr) => { const ya = abajo ? y2 : y1, yb = abajo ? y1 : y2, d = abajo ? 1 : -1;
    return `<line x1="${x}" y1="${yb}" x2="${x}" y2="${ya - d * 34}" stroke="${col}" stroke-width="${gr}" stroke-linecap="round"/><path d="M${x - 26},${ya - d * 40} L${x},${ya} L${x + 26},${ya - d * 40} Z" fill="${col}"/>`; };
  b += txt(30, 60, 'Rasgueo 1 · negras', { a: 'start', size: 36, w: 700, fill: C.GOLD });
  [1, 2, 3, 4].forEach((n, i) => { const x = 160 + i * 230; b += flecha(x, 100, 250, true, C.IV, 14) + txt(x, 310, n, { size: 46, w: 700 }); });
  b += `<line x1="30" y1="360" x2="${W - 30}" y2="360" stroke="${C.TAB}" stroke-width="1.5" stroke-dasharray="6 8"/>` + txt(30, 420, 'Rasgueo 2 · corcheas', { a: 'start', size: 36, w: 700, fill: C.GOLD });
  ['1', 'y', '2', 'y', '3', 'y', '4', 'y'].forEach((n, i) => { const x = 80 + i * 120, ab = i % 2 === 0; b += flecha(x, 460, 600, ab, ab ? C.IV : C.GOLD, ab ? 14 : 10) + txt(x, 662, n, { size: 42, w: 700, fill: ab ? C.IV : C.GOLD }); });
  b += txt(W / 2, 730, '↓ abajo (más fuerte)  ·  ↑ arriba (más suave)', { size: 30, w: 600, fill: C.MUTE });
  out('N1_rasgueo', 760, 'Rasgueos básicos: negras y corcheas', b); })();

/* Clase 11 · cómo leer la tablatura */
(() => { let b = ''; const y0 = 60, sg = 58, xL = 200, xR = W - 40, CU = [['MI', 1], ['SI', 2], ['SOL', 3], ['RE', 4], ['LA', 5], ['MI', 6]];
  CU.forEach(([n, c], i) => { const y = y0 + i * sg; b += `<line x1="${xL}" y1="${y}" x2="${xR}" y2="${y}" stroke="${C.LINE}" stroke-width="${2 + i * .6}"/>` + txt(48, y + 11, c + '.ª', { size: 30, w: 700 }) + chip(130, y, n, 84, 40); });
  [[0, '0', 400, 'al aire', '1.ª cuerda'], [1, '1', 620, 'traste 1', '2.ª cuerda'], [4, '3', 840, 'traste 3', '5.ª cuerda']].forEach(([i, t, x, a, c]) => { const y = y0 + i * sg;
    b += `<rect x="${x - 26}" y="${y - 26}" width="52" height="52" rx="10" fill="${C.BG}"/>` + txt(x, y + 16, t, { size: 46, w: 700, fill: C.GOLD });
    b += txt(x, y0 + 5 * sg + 70, t + ' = ' + a, { size: 30, w: 700 }) + txt(x, y0 + 5 * sg + 110, 'en la ' + c, { size: 26, w: 500, fill: C.MUTE }); });
  out('N1_tablatura', y0 + 5 * sg + 140, 'Cómo leer la tablatura', b); })();

/* Clase 11 · escala de DO mayor subiendo y bajando */
(() => { const r = partitura({ mm: [[q('DO4'), q('RE4'), q('MI4'), q('FA4')], [q('SOL4'), q('LA4'), q('SI4'), q('DO5')], [q('DO5'), q('SI4'), q('LA4'), q('SOL4')], [q('FA4'), q('MI4'), q('RE4'), q('DO4')]] }); out('N1_escala_do', r.h, 'Escala de DO mayor, subiendo y bajando, con tablatura', r.b); })();
console.log('ok mes 3');
