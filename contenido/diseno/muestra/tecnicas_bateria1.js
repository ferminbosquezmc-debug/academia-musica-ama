/* Láminas técnicas de Batería Nivel 1 con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (bateria/img/B1_*.svg). Colores AMA por extremidad: D rojo, I azul, PD verde, PI morado.
   Quedan igual (dibujos, a la espera de fotos): B1_partes, B1_postura, B1_agarre, B1_extremidades, B1_sonidos, B1_recorrido, B1_toms_altura, B1_alturas, B1_bombo_tecnica.
   Uso: node tecnicas_bateria1.js → img_bateria/B1_*.svg */
const fs = require('fs'), path = require('path');
const { C, W, txt, svg, f1, pent, cabeza, silNegra } = require('./tecnicas_motor.js');
const OUT = path.join(__dirname, 'img_bateria'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const EX = { D: ['#E5312B', '#fff'], I: ['#2F6FD8', '#fff'], PD: ['#2E9E4F', '#fff'], PI: ['#8E3BB8', '#fff'] };
const golpe = (x, y, g, r = 26) => { const ac = />$/.test(g), lab = g === 'o' ? 'o' : null; g = g === 'o' ? 'D' : g.replace('>', ''); return (ac ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + 7)}" fill="none" stroke="${C.GOLD}" stroke-width="5"/>` : '') + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${EX[g][0]}" stroke="${C.IV}" stroke-width="2.5"/>` + txt(x, y + r * .36, lab || g, { size: f1(g.length > 1 ? r * .78 : r * .95), w: 700, fill: EX[g][1] }); };
const L8 = ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], L4 = ['1', '2', '3', '4'];

/* Tabla de ritmo: filas [[instrumento, [golpes por columna]]], columnas = etiquetas de conteo */
function grilla(y0, cols, filas, o = {}) { let b = ''; const lw = o.lw || 200, x0 = 20 + lw, cw = (W - 30 - x0) / cols.length, rh = o.rh || 74, r = o.r || Math.min(26, cw * .32);
  cols.forEach((c, i) => { const x = x0 + (i + .5) * cw, num = /\d/.test(c);
    b += `<rect x="${f1(x0 + i * cw + 3)}" y="${y0}" width="${f1(cw - 6)}" height="${50 + filas.length * rh}" rx="12" fill="${num ? '#1c160f' : '#120f0b'}"/>` + txt(x, y0 + 36, c, { size: 28, w: 700, fill: num ? C.GOLD : C.MUTE }); });
  if (o.marca) o.marca.forEach(i => b += `<rect x="${f1(x0 + i * cw + 3)}" y="${y0}" width="${f1(cw - 6)}" height="${50 + filas.length * rh}" rx="12" fill="none" stroke="${C.GOLD}" stroke-width="4"/>`);
  filas.forEach(([n, g], j) => { const y = y0 + 50 + (j + .5) * rh; b += `<line x1="${x0}" y1="${f1(y)}" x2="${W - 30}" y2="${f1(y)}" stroke="#2b2417" stroke-width="2"/>` + txt(30, y + 9, n, { a: 'start', size: 26, w: 700 });
    g.forEach((v, i) => { if (v) b += golpe(x0 + (i + .5) * cw, y, v, r); }); });
  return { b, h: y0 + 50 + filas.length * rh };
}
const pasos = (bloques, fin) => { let b = '', y = 20; bloques.forEach(([t, cols, filas, o]) => { if (t) { b += txt(30, y + 34, t, { a: 'start', size: 30, w: 700, fill: C.GOLD }); y += 50; } const g = grilla(y, cols, filas, o); b += g.b; y = g.h + 30; }); if (fin) { fin.forEach((f, i) => b += txt(W / 2, y + 20 + i * 40, f, { size: 25, w: 600, fill: i ? C.MUTE : C.GOLD })); y += fin.length * 40 + 10; } return { b, h: y + 10 }; };
const P = (n, label, bloques, fin) => { const r = pasos(bloques, fin); out(n, r.h, label, r.b); };

/* Ritmos en tabla */
P('B1_marcha', 'La marcha en 2/4', [['', ['1', '2', '1', '2'], [['Redoblante', ['', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '']]]]], ['UN-dos: bombo en el 1, redoblante en el 2']);
P('B1_vals', 'El vals en 3/4', [['', ['1', '2', '3', '1', '2', '3'], [['Hi-hat', ['', 'D', 'D', '', 'D', 'D']], ['Bombo', ['PD', '', '', 'PD', '', '']]]]], ['UN-dos-tres: bombo en el 1, hi-hat en el 2 y el 3']);
P('B1_balada', 'La balada', [['', L4, [['Hi-hat', ['D', 'D', 'D', 'D']], ['Redoblante', ['', '', 'I', '']], ['Bombo', ['PD', '', '', '']]]]], ['Lenta y suave (60–70 BPM)', 'hi-hat en negras · bombo en el 1 · redoblante en el 3']);
P('B1_ritmo1', 'Ritmo básico 1: todo en negras', [['', L4, [['Hi-hat', ['D', 'D', 'D', 'D']], ['Redoblante', ['', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '']]]]], ['Hi-hat en los 4 · bombo en 1 y 3 · redoblante en 2 y 4']);
const HH8 = Array(8).fill('D');
P('B1_ritmo3', 'Ritmo básico 3', [['', L8, [['Hi-hat', HH8], ['Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['Bombo', ['PD', '', '', '', 'PD', 'PD', '', '']]], { marca: [5] }]], ['El #2 con un cambio: el bombo agrega la «y» del 3']);
P('B1_ritmo4', 'Ritmo básico 4', [['', L8, [['Hi-hat', HH8], ['Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['Bombo', ['PD', '', '', 'PD', 'PD', 'PD', '', '']]], { marca: [3] }]], ['El #3 con un cambio: el bombo agrega la «y» del 2']);
P('B1_coordinacion1', 'Coordinación I en negras', [['Paso A · una después de otra', L4, [['Hi-hat', ['D', '', 'D', '']], ['Bombo', ['', 'PD', '', 'PD']]]], ['Paso B · juntas', L4, [['Hi-hat', ['D', '', 'D', '']], ['Redoblante', ['', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '']]]], ['Paso C · tres extremidades', L4, [['Hi-hat', ['D', 'D', 'D', 'D']], ['Redoblante', ['', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '']]]]]);
P('B1_coordinacion2', 'Coordinación II en corcheas', [['Paso A · bombo en cada número', L8, [['Hi-hat', HH8], ['Bombo', ['PD', '', 'PD', '', 'PD', '', 'PD', '']]]], ['Paso B · redoblante en cada «y»', L8, [['Hi-hat', HH8], ['Redoblante', ['', 'I', '', 'I', '', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '', 'PD', '', 'PD', '']]]], ['Paso C · ride y pie izquierdo', L8, [['Ride', HH8], ['Hi-hat (pie)', ['', '', 'PI', '', '', '', 'PI', '']], ['Bombo', ['PD', '', '', '', 'PD', '', '', '']]]]], ['La mano derecha sigue en corcheas; las otras entran una por una']);

/* Rudimentos: bloques de golpes */
function rudimento(n, label, g, fin) { let b = ''; const cw = 116, x0 = (W - 8 * cw) / 2;
  L8.forEach((c, i) => { const x = x0 + i * cw; b += txt(x + cw / 2, 60, c, { size: 30, w: 700, fill: /\d/.test(c) ? C.GOLD : C.MUTE }) + `<rect x="${x + 4}" y="80" width="${cw - 8}" height="100" rx="14" fill="${EX[g[i]][0]}"/>` + txt(x + cw / 2, 146, g[i], { size: 44, w: 700, fill: '#fff' }); });
  b += txt(W / 2, 236, fin, { size: 26, w: 600, fill: C.MUTE }); out(n, 270, label, b); }
rudimento('B1_golpe_sencillo', 'Rudimento 1: el golpe sencillo', ['D', 'I', 'D', 'I', 'D', 'I', 'D', 'I'], 'Las manos se alternan, una y una, igual de fuertes');
rudimento('B1_doble_golpe', 'Rudimento 2: el doble golpe', ['D', 'D', 'I', 'I', 'D', 'D', 'I', 'I'], 'Dos golpes con cada mano: el segundo sale del rebote');

/* Las figuras en el redoblante: bloques largos = lo que dura */
(() => { let b = ''; const x0 = 230, cw = (W - 30 - x0) / 4, F = [['Redonda', [['D', 4, 'taa-aa-aa-aa']]], ['Blanca', [['D', 2, 'taa-aa'], ['I', 2, 'taa-aa']]], ['Negra', [['D', 1, 'ta'], ['I', 1, 'ta'], ['D', 1, 'ta'], ['I', 1, 'ta']]], ['Bombo en negras', [['PD', 1, 'ta'], ['PD', 1, 'ta'], ['PD', 1, 'ta'], ['PD', 1, 'ta']]]];
  L4.forEach((c, i) => b += txt(x0 + (i + .5) * cw, 50, c, { size: 30, w: 700, fill: C.GOLD }));
  F.forEach(([n, bl], j) => { const y = 80 + j * 120; b += txt(30, y + 60, n, { a: 'start', size: n.length > 10 ? 22 : 28, w: 700 }); let x = x0;
    bl.forEach(([g, d, s]) => { b += `<rect x="${f1(x + 4)}" y="${y + 14}" width="${f1(d * cw - 8)}" height="76" rx="14" fill="${EX[g][0]}"/>` + txt(x + 28, y + 62, g, { a: 'start', size: 26, w: 700, fill: '#fff' }) + txt(x + d * cw / 2 + (d > 1 ? 20 : 14), y + 62, s, { size: 24, w: 700, fill: '#fff' }); x += d * cw; }); });
  b += txt(W / 2, 600, 'El largo del bloque es lo que dura el golpe · las manos se alternan', { size: 24, w: 600, fill: C.MUTE });
  out('B1_figuras_caja', 630, 'Las figuras en el redoblante', b); })();

/* Partitura de batería */
const POS = { crash: 10, hihat: 9, ride: 8, tom1: 7, tom2: 6, caja: 5, piso: 3, bombo: 1, hhpie: -1 }, XH = { crash: 1, hihat: 1, ride: 1, hhpie: 1 };
const clavePerc = (x, top, s) => `<rect x="${x}" y="${top + s}" width="10" height="${2 * s}" fill="${C.IV}"/><rect x="${x + 18}" y="${top + s}" width="10" height="${2 * s}" fill="${C.IV}"/>`;
function percusion({ y0 = 20, ev, s = 34, filas = [], compas = ['4', '4'], barras = [] }) {
  let b = ''; const top = y0 + 3 * s, bot = top + 4 * s, xL = 30, xR = W - 30, x0 = 190, n = ev.length, cw = (xR - 20 - x0) / n;
  b += pent(xL, xR, top, s) + clavePerc(xL + 20, top, s) + txt(xL + 110, top + 2 * s - 3, compas[0], { serif: 1, size: f1(2.4 * s), w: 700 }) + txt(xL + 110, bot - 3, compas[1], { serif: 1, size: f1(2.4 * s), w: 700 });
  const tops = [];
  ev.forEach((e, i) => { const x = x0 + (i + .5) * cw; if (!e.n || !e.n.length) { tops.push(null); if (e.r) b += e.r === 'q' ? silNegra(x, top + 2 * s, 3 * s) : `<rect x="${f1(x - s * .6)}" y="${f1(top + 1.5 * s)}" width="${f1(s * 1.2)}" height="${f1(s * .5)}" fill="${C.IV}"/>`; }
    else { let hiY = 1e9; e.n.forEach(([ins, g]) => { const st = POS[ins], y = bot - st * s / 2; hiY = Math.min(hiY, y); if (st >= 10) b += `<line x1="${x - s}" y1="${top - s}" x2="${x + s}" y2="${top - s}" stroke="${C.LINE}" stroke-width="3"/>`;
        b += XH[ins] ? `<path d="M${f1(x - s * .45)},${f1(y - s * .45)} L${f1(x + s * .45)},${f1(y + s * .45)} M${f1(x - s * .45)},${f1(y + s * .45)} L${f1(x + s * .45)},${f1(y - s * .45)}" stroke="${EX[g][0]}" stroke-width="7" stroke-linecap="round"/>` : cabeza(x, y, s, EX[g][0], e.h); });
      const loY = Math.max(...e.n.map(([ins]) => bot - POS[ins] * s / 2)), sx = x + s * .58, ty = Math.min(hiY - 3 * s, top - .5 * s);
      if (!e.w) b += `<line x1="${f1(sx)}" y1="${f1(loY)}" x2="${f1(sx)}" y2="${f1(ty)}" stroke="${C.IV}" stroke-width="4"/>`; tops.push(e.e ? [sx, ty] : null); }
    filas.forEach(([k], j) => { if (e[k]) b += txt(x, bot + 70 + j * 44, e[k], { size: k === 'g' ? 26 : 28, w: 700, fill: k === 'c' ? C.MUTE : k === 's' ? C.GOLD : C.IV }); }); });
  for (let j = 0; j < tops.length - 1; j++) if (tops[j] && tops[j + 1]) { const yy = Math.min(tops[j][1], tops[j + 1][1]); b += `<rect x="${f1(tops[j][0] - 2)}" y="${f1(yy)}" width="${f1(tops[j + 1][0] - tops[j][0] + 4)}" height="12" fill="${C.IV}"/>`; j++; }
  barras.forEach(i => { const x = x0 + i * cw; b += `<line x1="${f1(x)}" y1="${top}" x2="${f1(x)}" y2="${bot}" stroke="${C.LINE}" stroke-width="3"/>`; });
  b += `<line x1="${xR - 14}" y1="${top}" x2="${xR - 14}" y2="${bot}" stroke="${C.LINE}" stroke-width="3"/><rect x="${xR - 8}" y="${top}" width="9" height="${4 * s}" fill="${C.LINE}"/>`;
  return { b, h: bot + 50 + filas.length * 44 };
}
/* 4 · La partitura de batería: dónde va cada instrumento */
(() => { const I = [['crash', 'Crash'], ['hihat', 'Hi-hat'], ['ride', 'Ride'], ['tom1', 'Tom 1'], ['tom2', 'Tom 2'], ['caja', 'Redoblante'], ['piso', 'Tom de piso'], ['bombo', 'Bombo'], ['hhpie', 'Hi-hat (pie)']];
  const s = 36, top = 130, bot = top + 4 * s; let b = pent(30, 970, top, s) + clavePerc(50, top, s); const cw = 840 / 9;
  I.forEach(([k, n], i) => { const x = 130 + (i + .5) * cw, st = POS[k], y = bot - st * s / 2, col = XH[k] ? C.GOLD : C.IV;
    if (st >= 10) b += `<line x1="${x - 32}" y1="${top - s}" x2="${x + 32}" y2="${top - s}" stroke="${C.LINE}" stroke-width="3"/>`; if (st <= -2) b += `<line x1="${x - 32}" y1="${bot + s}" x2="${x + 32}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`;
    b += XH[k] ? `<path d="M${x - 15},${y - 15} L${x + 15},${y + 15} M${x - 15},${y + 15} L${x + 15},${y - 15}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>` : cabeza(x, y, s, C.IV, false);
    const tl = (i % 2 ? bot + 110 : bot + 70); b += `<line x1="${x}" y1="${bot + 30}" x2="${x}" y2="${tl - 26}" stroke="#4a3f2c" stroke-width="2"/>` + txt(x, tl, n, { size: n.length > 7 ? 19 : 22, w: 700, fill: col }); });
  b += txt(W / 2, bot + 170, '✕ = platillo · cabeza redonda = tambor', { size: 26, w: 700, fill: C.GOLD }) + txt(W / 2, bot + 210, 'Más arriba = más agudo · más abajo = más grave', { size: 24, w: 600, fill: C.MUTE });
  out('B1_partitura', bot + 240, 'La partitura de batería', b); })();
/* 4 · Mi primera lectura: negras */
(() => { const B = { n: [['bombo', 'PD']], g: 'PD' }, Rr = { n: [['caja', 'I']], g: 'I' }; const ev = [B, Rr, B, Rr, B, B, Rr, Rr].map((e, i) => Object.assign({}, e, { c: L4[i % 4] }));
  const r = percusion({ ev, filas: [['g', ''], ['c', '']], barras: [4] }); out('B1_lectura_negras', r.h + 50, 'Mi primera lectura en negras', r.b + txt(W / 2, r.h + 20, 'Redoblante con la mano izquierda (I) · bombo con el pie derecho (PD)', { size: 23, w: 600, fill: C.MUTE })); })();
/* 6 · Lectura con silencios */
(() => { const R = { n: [['caja', 'I']], s: 'ta' }; const ev = [Object.assign({ c: '1' }, R), { r: 'q', s: 'sh', c: '2' }, Object.assign({ c: '3' }, R), { r: 'q', s: 'sh', c: '4' }, { n: [['caja', 'I']], h: 1, s: 'taa-aa', c: '1 2' }, {}, { r: 'h', s: 'sh-sh', c: '3 4' }, {}];
  const r = percusion({ ev, filas: [['s', ''], ['c', '']], barras: [4] }); out('B1_silencios', r.h + 50, 'Lectura con silencios', r.b + txt(W / 2, r.h + 20, 'En el silencio digo «sh» y sigo contando', { size: 24, w: 600, fill: C.MUTE })); })();
/* 7 · Corcheas en el hi-hat */
(() => { const ev = L8.map(c => ({ n: [['hihat', 'D']], e: 1, g: 'D', c }));
  const r = percusion({ ev, filas: [['g', ''], ['c', '']] }); out('B1_corcheas', r.h + 50, 'Corcheas en el hi-hat', r.b + txt(W / 2, r.h + 20, 'El pie izquierdo (PI) mantiene el hi-hat cerrado', { size: 24, w: 600, fill: C.MUTE })); })();
/* 8 · El rock en corcheas: por capas y en partitura */
(() => { let b = txt(30, 50, 'Lo armo por capas', { a: 'start', size: 30, w: 700, fill: C.GOLD });
  const g = grilla(70, L8, [['1 · Hi-hat', HH8], ['2 · Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['3 · Bombo', ['PD', '', '', '', 'PD', '', '', '']]], { lw: 220 }); b += g.b;
  const ev = L8.map((c, i) => ({ n: [['hihat', 'D']].concat(i === 0 || i === 4 ? [['bombo', 'PD']] : i === 2 || i === 6 ? [['caja', 'I']] : []), e: 1, c, s: ['bum', 'chi', 'pa', 'chi', 'bum', 'chi', 'pa', 'chi'][i] }));
  const r = percusion({ ev, y0: g.h + 70, filas: [['s', ''], ['c', '']] }); b += r.b;
  out('B1_rock', r.h + 10, 'Ritmo básico 2: el rock en corcheas', b); })();

/* 11 · Mi primer relleno */
(() => { let b = ''; ['Ritmo #2', 'Ritmo #2', 'Ritmo #2', 'relleno'].forEach((t, i) => { const x = 20 + i * 242; b += `<rect x="${x}" y="20" width="230" height="100" rx="16" fill="${i === 3 ? '#3a2a10' : C.PANEL}" stroke="${i === 3 ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>` + txt(x + 115, 58, 'Compás ' + (i + 1), { size: 22, w: 600, fill: C.MUTE }) + txt(x + 115, 96, t, { size: 26, w: 700, fill: i === 3 ? C.GOLD : C.IV }); });
  b += txt(30, 180, 'El compás 4, de cerca', { a: 'start', size: 30, w: 700, fill: C.GOLD });
  const g = grilla(200, L8.concat(['1']), [['Crash', ['', '', '', '', '', '', '', '', 'D']], ['Hi-hat', ['D', 'D', 'D', 'D', '', '', '', '', '']], ['Redoblante', ['', '', 'I', '', 'D', 'I', '', '', '']], ['Tom 1', ['', '', '', '', '', '', 'D', 'I', '']], ['Bombo', ['PD', '', '', '', '', '', '', '', 'PD']]], { marca: [4, 5, 6, 7], lw: 170, rh: 70 }); b += g.b;
  b += txt(W / 2, g.h + 40, 'Relleno de 2 tiempos · crash con bombo en el 1', { size: 25, w: 600, fill: C.GOLD });
  out('B1_relleno', g.h + 70, 'Mi primer relleno', b); })();

/* 8 · Himno de la alegría con la batería (8 compases) */
(() => { let b = ''; [['Frase 1 · pregunta', ['crash + bombo · ritmo #2', 'ritmo #2', 'ritmo #2', 'ritmo #2']], ['Frase 2 · respuesta', ['crash + bombo · ritmo #2', 'ritmo #2', 'ritmo #2', 'golpe final en el 3: crash + bombo']]].forEach(([t, c], f) => { const y = 20 + f * 330; b += txt(30, y + 34, t, { a: 'start', size: 30, w: 700, fill: C.GOLD });
    c.forEach((x, i) => { const cx = 20 + (i % 2) * 490, cy = y + 56 + Math.floor(i / 2) * 130, esp = /crash/.test(x), fin = /final/.test(x);
      b += `<rect x="${cx}" y="${cy}" width="470" height="114" rx="16" fill="${fin ? '#4a1e1b' : esp ? '#3a2a10' : C.PANEL}" stroke="${fin ? '#E5312B' : esp ? C.GOLD : '#4a3f2c'}" stroke-width="2.5"/>` + txt(cx + 24, cy + 44, 'Compás ' + (f * 4 + i + 1), { a: 'start', size: 22, w: 600, fill: C.MUTE }) + txt(cx + 24, cy + 86, x, { a: 'start', size: x.length > 26 ? 21 : 26, w: 700 }); }); });
  b += txt(W / 2, 690, 'Ritmo básico #2 a 70 BPM · crash al empezar cada frase', { size: 24, w: 600, fill: C.MUTE });
  out('B1_himno', 720, 'Himno de la alegría con la batería', b); })();

/* 12 · El mapa de la canción «Estrellita» */
(() => { let b = ''; const F = [[['C', 'crash'], ['F C'], ['F C'], ['G C', 'relleno']], [['C F', 'crash'], ['C G'], ['C F'], ['C G', 'relleno']], [['C', 'crash'], ['F C'], ['F C'], ['G C', 'golpe final']]];
  F.forEach((fr, f) => { const y = 20 + f * 200; b += txt(30, y + 30, 'Frase ' + (f + 1), { a: 'start', size: 28, w: 700, fill: C.GOLD });
    fr.forEach(([a, nota], i) => { const x = 20 + i * 242, esp = !!nota, fin = nota === 'golpe final';
      b += `<rect x="${x}" y="${y + 46}" width="230" height="134" rx="16" fill="${fin ? '#4a1e1b' : nota === 'crash' ? '#3a2a10' : nota ? '#1d3550' : C.PANEL}" stroke="${fin ? '#E5312B' : nota === 'crash' ? C.GOLD : nota ? '#2F6FD8' : '#4a3f2c'}" stroke-width="2.5"/>` + txt(x + 20, y + 76, f * 4 + i + 1, { a: 'start', size: 20, w: 600, fill: C.MUTE }) + txt(x + 115, y + 130, a, { serif: 1, size: 44, w: 700 }) + (nota ? txt(x + 115, y + 166, nota, { size: 22, w: 700, fill: fin ? '#ff8a80' : nota === 'crash' ? C.GOLD : '#7cc7ef' }) : ''); }); });
  b += txt(W / 2, 650, '3 frases de 4 compases · crash al empezar · relleno al terminar', { size: 24, w: 600, fill: C.MUTE });
  out('B1_mapa_cancion', 680, 'El mapa de la canción Estrellita', b); })();

/* 12 · Mis ritmos del Nivel 1 */
(() => { const R = [['Ritmo básico #1', L4, [['Hi-hat', ['D', 'D', 'D', 'D']], ['Redoblante', ['', 'I', '', 'I']], ['Bombo', ['PD', '', 'PD', '']]]], ['Ritmo básico #2', L8, [['Hi-hat', HH8], ['Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['Bombo', ['PD', '', '', '', 'PD', '', '', '']]]],
    ['Ritmo básico #3', L8, [['Hi-hat', HH8], ['Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['Bombo', ['PD', '', '', '', 'PD', 'PD', '', '']]]], ['Ritmo básico #4', L8, [['Hi-hat', HH8], ['Redoblante', ['', '', 'I', '', '', '', 'I', '']], ['Bombo', ['PD', '', '', 'PD', 'PD', 'PD', '', '']]]],
    ['Marcha · 2/4', ['1', '2'], [['Redoblante', ['', 'I']], ['Bombo', ['PD', '']]]], ['Vals · 3/4', ['1', '2', '3'], [['Hi-hat', ['', 'D', 'D']], ['Bombo', ['PD', '', '']]]], ['Balada · 4/4 lenta', L4, [['Hi-hat', ['D', 'D', 'D', 'D']], ['Redoblante', ['', '', 'I', '']], ['Bombo', ['PD', '', '', '']]]],
    ['Golpes alternos', L4, [['Manos', ['D', 'I', 'D', 'I']]]], ['Redoble abierto', L4, [['Manos', ['D', 'D', 'I', 'I']]]]].map(([t, c, f]) => [t, c, f, { rh: 60 }]);
  P('B1_resumen', 'Mis ritmos del Nivel 1', R); })();
module.exports = { EX, golpe, grilla, pasos, percusion, clavePerc, POS, XH, L8, L4, HH8 };
if (require.main === module) console.log('ok batería 1:', fs.readdirSync(OUT).length, 'láminas');
