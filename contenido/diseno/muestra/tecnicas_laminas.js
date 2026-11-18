/* Láminas técnicas de guitarra Nivel 1 (Mes 1 y Mes 2) redibujadas exactas con el estilo nuevo, formato angosto para teléfono.
   Uso: node tecnicas_laminas.js → img_tec/*.svg */
const fs = require('fs'), path = require('path');
const M = require('./tecnicas_motor.js'), { C, NOTA, F, W, clave, pent, cabeza, chip, txt, svg, partitura, ritmo, silNegra, silCorchea, f1 } = M;
const OUT = path.join(__dirname, 'img_tec'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const q = p => ({ p, d: 'q' }), h = p => ({ p, d: 'h' }), w = p => ({ p, d: 'w' });

/* ---------- MES 1 ---------- */
/* Clase 1 · 7 grados + la octava */
(() => { const s = 34, top = 190, bot = top + 4 * s, xs = i => 205 + i * 106, NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO'];
  let b = `<path d="M${xs(0)},110 Q${(xs(0) + xs(7)) / 2},20 ${xs(7)},110" fill="none" stroke="${C.GOLD}" stroke-width="4" stroke-dasharray="12 9" stroke-linecap="round"/>`
    + `<rect x="${(xs(0) + xs(7)) / 2 - 190}" y="28" width="380" height="46" rx="23" fill="${C.PANEL}" stroke="${C.GOLD}" stroke-width="3"/>` + txt((xs(0) + xs(7)) / 2, 61, 'El 1 y el 8: octava', { size: 28, w: 700, fill: C.GOLD });
  b += pent(30, 970, top, s) + clave(38, bot, s);
  NS.forEach((n, i) => { const x = xs(i), y = bot + s - i * s / 2;
    if (!i) b += `<line x1="${x - 34}" y1="${bot + s}" x2="${x + 34}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`;
    b += cabeza(x, y, s, NOTA[n][0], true) + `<circle cx="${x}" cy="134" r="26" fill="${C.GOLD}"/>` + txt(x, 145, i + 1, { size: 30, w: 700, fill: '#1b1206' });
    b += chip(x, bot + 92, n, 80, 42) + txt(x, bot + 168, NOTA[n][2], { serif: 1, size: 50, w: 700 }); });
  b += txt(xs(0), bot + 222, '▼ grave', { size: 26, w: 500, fill: C.MUTE }) + txt(xs(7) - 24, bot + 222, 'agudo ▲', { size: 26, w: 500, fill: C.MUTE });
  out('G1_grados', bot + 250, 'Los 7 grados de la escala de DO y su octava', b); })();

/* Clase 4 · Pentagrama */
(() => { const s = 64, top = 160, bot = top + 4 * s; let b = '';
  for (let k = 0; k < 4; k++) b += `<rect x="150" y="${top + k * s + 6}" width="610" height="${s - 12}" rx="9" fill="${C.GOLD}" opacity="${k % 2 ? .07 : .13}"/>`;
  b += pent(150, 760, top, s, 4) + clave(150, bot, s);
  for (let i = 0; i < 5; i++) { const y = bot - i * s; b += `<circle cx="104" cy="${y}" r="24" fill="${C.GOLD}"/>` + txt(104, y + 10, i + 1, { size: 28, w: 700, fill: '#1b1206' }); }
  ['1.er espacio', '2.º espacio', '3.er espacio', '4.º espacio'].forEach((t, k) => b += txt(780, bot - k * s - s / 2 + 10, t, { a: 'start', size: 28, w: 600, fill: C.MUTE }));
  b += `<path d="M44,${bot - 6} L44,${top + 24}" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round"/><path d="M31,${top + 44} L44,${top + 18} L57,${top + 44}" fill="none" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const xn = 560, yn = bot - s; b += cabeza(xn, yn, s * .8, NOTA.SOL[0], false) + `<line x1="${xn + 30}" y1="${yn - 6}" x2="${xn + 30}" y2="${yn - 3.3 * s}" stroke="${C.IV}" stroke-width="5"/>` + chip(xn, bot + 74, 'SOL', 96, 48);
  b += txt(W / 2, bot + 160, 'La clave de sol nace en la <tspan fill="' + C.GOLD + '">2.ª línea</tspan>:', { size: 34 }) + txt(W / 2, bot + 206, 'ahí vive la nota <tspan fill="' + NOTA.SOL[0] + '">SOL</tspan>.', { size: 34 });
  out('N1_pentagrama_basico', bot + 240, 'Pentagrama: 5 líneas y 4 espacios', b); })();

/* Clase 4 · MI, FA y SOL en la 1.ª cuerda */
(() => { const r = partitura({ mm: [[q('MI5'), q('FA5'), q('SOL5'), q('FA5')], [w('MI5')]] }); out('N1_cuerda1', r.h, 'MI, FA y SOL en la primera cuerda: pentagrama y tablatura', r.b); })();

/* ---------- MES 2 ---------- */
/* Clase 5 · ritmo en negras */
(() => { const r = ritmo({ mm: [['q', 'q', 'q', 'q'], ['q', 'q', 'q', 'q']], sil: Array(8).fill('ta') }); out('N1_ritmo_negras', r.h, 'Ritmo en negras: ta ta ta ta', r.b); })();

/* Clase 5 · figuras y silencios */
(() => { const RH = 178, T0 = 70; let b = '';
  [['FIGURA', 92], ['NOMBRE', 290], ['SILENCIO', 500], ['TIEMPOS', 782]].forEach(([t, x]) => b += txt(x, 48, t, { size: 22, w: 700, fill: C.GOLD, ls: 3 }));
  const filas = [['Redonda', 'taa-aa-aa-aa', 4, 'w'], ['Blanca', 'taa-aa', 2, 'h'], ['Negra', 'ta', 1, 'q'], ['Corchea', 'ti', .5, 'e']];
  filas.forEach(([nom, sil, t, d], i) => { const y0 = T0 + i * RH, cy = y0 + RH / 2;
    if (i % 2 === 0) b += `<rect x="16" y="${y0 + 6}" width="${W - 32}" height="${RH - 12}" rx="18" fill="${C.PANEL}"/>`;
    const nx = 92, ny = d === 'w' ? cy + 4 : cy + 34; b += cabeza(nx, ny, 34, C.IV, d === 'w' || d === 'h');
    if (d !== 'w') b += `<line x1="${nx + 20}" y1="${ny}" x2="${nx + 20}" y2="${ny - 112}" stroke="${C.IV}" stroke-width="5"/>`;
    if (d === 'e') b += `<path d="M${nx + 20},${ny - 112} C${nx + 28},${ny - 74} ${nx + 66},${ny - 64} ${nx + 54},${ny - 22}" fill="none" stroke="${C.IV}" stroke-width="7" stroke-linecap="round"/>`;
    b += txt(290, cy - 4, nom, { size: 44, w: 700 }) + txt(290, cy + 44, sil, { size: sil.length > 6 ? 28 : 34, w: 700, fill: C.GOLD });
    for (let k = 0; k < 5; k++) b += `<line x1="430" y1="${cy - 44 + k * 22}" x2="570" y2="${cy - 44 + k * 22}" stroke="${C.TAB}" stroke-width="2"/>`;
    if (d === 'w') b += `<rect x="482" y="${cy - 22}" width="36" height="14" fill="${C.IV}"/>`;
    else if (d === 'h') b += `<rect x="482" y="${cy - 14}" width="36" height="14" fill="${C.IV}"/>`;
    else if (d === 'q') b += silNegra(500, cy, 82); else b += silCorchea(500, cy + 4, 52);
    for (let k = 0; k < 4; k++) { const x = 622 + k * 82; b += `<rect x="${x}" y="${cy - 52}" width="70" height="70" rx="10" fill="none" stroke="${C.LINE}" stroke-width="3"/>`;
      const lleno = Math.min(1, Math.max(0, t - k)); if (lleno) b += `<rect x="${x + 5}" y="${cy - 47}" width="${f1(60 * lleno)}" height="60" rx="7" fill="${C.GOLD}"/>`; }
    b += txt(782, cy + 56, t === .5 ? '½ tiempo' : t + (t === 1 ? ' tiempo' : ' tiempos'), { size: 28, w: 600, fill: C.MUTE }); });
  const yF = T0 + 4 * RH + 56; b += txt(W / 2, yF, '1 redonda = 2 blancas = 4 negras = 8 corcheas', { size: 34, w: 700 });
  out('N1_figuras', yF + 36, 'Figuras musicales y silencios', b); })();

/* Clase 5 · ritmo con figuras */
(() => { const r = ritmo({ mm: [['w'], ['h', 'h'], ['q', 'q', 'h'], ['q', 'q', 'q', 'q']], sil: ['taa-aa-aa-aa', 'taa-aa', 'taa-aa', 'ta', 'ta', 'taa-aa', 'ta', 'ta', 'ta', 'ta'] }); out('N1_ritmo_figuras', r.h, 'Ritmo con redondas, blancas y negras', r.b); })();

/* Clase 5 · araña 1-2-3-4 */
(() => { const x0 = 130, fw = 190, y0 = 50, sg = 62; let b = `<rect x="${x0}" y="${y0 - 22}" width="${4 * fw + 10}" height="${5 * sg + 44}" rx="8" fill="#2a1d12"/><rect x="${x0 - 14}" y="${y0 - 26}" width="16" height="${5 * sg + 52}" rx="4" fill="#f4ecd8"/>`;
  for (let f = 1; f <= 4; f++) b += `<line x1="${x0 + f * fw}" y1="${y0 - 22}" x2="${x0 + f * fw}" y2="${y0 + 5 * sg + 22}" stroke="#a7a9ad" stroke-width="6"/>` + txt(x0 + f * fw - fw / 2, y0 + 5 * sg + 70, 'traste ' + f, { size: 28, w: 600, fill: C.MUTE });
  for (let i = 0; i < 6; i++) { const y = y0 + i * sg; b += `<line x1="${x0}" y1="${y}" x2="${x0 + 4 * fw + 10}" y2="${y}" stroke="${i < 3 ? '#eee7da' : '#d8c9a6'}" stroke-width="${2.5 + i * 1.1}"/>` + txt(x0 - 30, y + 11, (i + 1) + '.ª', { a: 'end', size: 30, w: 700 }); }
  for (let f = 1; f <= 4; f++) { const x = x0 + f * fw - fw / 2, y = y0 + 5 * sg; b += `<circle cx="${x}" cy="${y}" r="30" fill="${C.GOLD}" stroke="#1b1206" stroke-width="3"/>` + txt(x, y + 12, f, { size: 34, w: 700, fill: '#1b1206' }); }
  b += `<path d="M${x0 + 4 * fw + 50},${y0 + 5 * sg} L${x0 + 4 * fw + 50},${y0 + 10}" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round"/><path d="M${x0 + 4 * fw + 37},${y0 + 32} L${x0 + 4 * fw + 50},${y0 + 6} L${x0 + 4 * fw + 63},${y0 + 32}" fill="none" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  out('N1_arana', y0 + 5 * sg + 100, 'Ejercicio de digitación 1-2-3-4: un dedo por traste', b); })();

/* Clase 6 · ritmo con silencios */
(() => { const r = ritmo({ mm: [['q', 'qr', 'q', 'qr'], ['h', 'hr'], ['q', 'q', 'hr']], sil: ['ta', 'sh', 'ta', 'sh', 'taa-aa', 'sh', 'ta', 'ta', 'sh'] }); out('N1_ritmo_silencios', r.h, 'Ritmo con silencios', r.b); })();

/* Clase 6 · compases 2/4, 3/4 y 4/4 */
(() => { let b = '', y = 10; [[['2', '4'], '2/4 · marcha', 'UN-dos', [['q', 'q'], ['h']], ['ta', 'ta', 'taa-aa']], [['3', '4'], '3/4 · vals', 'UN-dos-tres', [['q', 'q', 'q'], ['h', 'q']], ['ta', 'ta', 'ta', 'taa-aa', 'ta']], [['4', '4'], '4/4 · el más usado', 'UN-dos-tres-cuatro', [['q', 'q', 'q', 'q'], ['w']], ['ta', 'ta', 'ta', 'ta', 'taa-aa-aa-aa']]].forEach(([cs, t1, t2, mm, sil], i) => {
    if (i) b += `<line x1="30" y1="${y}" x2="${W - 30}" y2="${y}" stroke="${C.TAB}" stroke-width="1.5" stroke-dasharray="6 8"/>`;
    b += txt(30, y + 50, t1, { a: 'start', size: 36, w: 700, fill: C.GOLD }) + txt(W - 30, y + 50, t2, { a: 'end', size: 30, w: 600, fill: C.MUTE });
    const r = ritmo({ mm, sil, compasTxt: cs, y0: y + 50 }); b += r.b; y = r.h + 6; });
  out('N1_compases', y, 'Compases de 2/4, 3/4 y 4/4', b); })();

/* Clase 6 · SI, DO y RE en la 2.ª cuerda */
(() => { const r = partitura({ mm: [[q('SI4'), q('DO5'), q('RE5'), q('DO5')], [w('SI4')]] }); out('N1_cuerda2', r.h, 'SI, DO y RE en la segunda cuerda: pentagrama y tablatura', r.b); })();

/* Clase 7 · ritmo con corcheas */
(() => { const r = ritmo({ mm: [['e', 'e', 'e', 'e', 'q', 'q'], ['e', 'e', 'q', 'h']], sil: ['ti', 'ti', 'ti', 'ti', 'ta', 'ta', 'ti', 'ti', 'ta', 'taa-aa'] }); out('N1_ritmo_corcheas', r.h, 'Ritmo con corcheas: ti ti ta', r.b); })();

/* Clase 7 · lectura en la 1.ª y la 2.ª cuerda */
(() => { const r = partitura({ mm: [[q('MI5'), q('RE5'), q('DO5'), q('SI4')], [q('DO5'), q('RE5'), h('MI5')], [q('SOL5'), q('FA5'), q('MI5'), q('RE5')], [w('DO5')]] }); out('N1_cuerdas_1y2', r.h, 'Lectura en la primera y la segunda cuerda', r.b); })();

/* Clase 8 · Himno de la alegría */
(() => { const A = [q('MI5'), q('MI5'), q('FA5'), q('SOL5')], B = [q('SOL5'), q('FA5'), q('MI5'), q('RE5')], Cc = [q('DO5'), q('DO5'), q('RE5'), q('MI5')];
  const r = partitura({ mm: [A, B, Cc, [q('MI5'), q('RE5'), h('RE5')], A, B, Cc, [q('RE5'), q('DO5'), h('DO5')]] }); out('N1_oda_alegria', r.h, 'Himno de la alegría en la primera y la segunda cuerda', r.b); })();

console.log('ok', fs.readdirSync(OUT).map(f => f + ' ' + (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + 'K').join(', '));
