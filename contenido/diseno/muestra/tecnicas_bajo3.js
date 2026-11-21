/* Láminas técnicas de Bajo Nivel 3 (clases 25 a 36), estilo nuevo, 1000 px. Mismos nombres que en la plataforma (bajo/img/J3_*.svg).
   Uso: node tecnicas_bajo3.js → img_bajo/J3_*.svg · usa tecnicas_bajo1.js (mastil) y tecnicas_bajo2.js (caja4, colores de grado) */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, chip, txt, svg, f1, pent } = require('./tecnicas_motor.js');
const { claveFa } = require('./tecnicas_gran.js');
const { mastil, tit, nota, caja, GOLDTX } = require('./tecnicas_bajo1.js');
const { caja4, cab, bola, leyenda, G, M, CHROM } = require('./tecnicas_bajo2.js');
const OUT = path.join(__dirname, 'img_bajo');
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const circ = (x, y, r, t, fill, tx = '#fff', size) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${fill}" stroke="${C.IV}" stroke-width="3"/>` + txt(x, y + r * .36, t, { size: size || f1(r * .95), w: 700, fill: tx });
const MUTEC = '#8a7f6e', TC = { T: '#E5312B', P: '#2F6FD8', x: MUTEC };

/* 25 · El bajo es doble */
(() => { let b = cab('El bajo es doble', 'Cuerda MI: en el traste 12 todo empieza otra vez');
  [[0, 'Primera vuelta · trastes 0 a 11', '#2F6FD8'], [12, 'Segunda vuelta · trastes 12 a 23', '#E5312B']].forEach(([d, t, col], r) => { const y = 150 + r * 200, x0 = 30, cw = 78;
    b += txt(x0, y, t, { a: 'start', size: 28, w: 700, fill: col }) + `<rect x="${x0}" y="${y + 24}" width="${12 * cw}" height="70" rx="10" fill="#2a1d12"/>` + `<line x1="${x0}" y1="${y + 59}" x2="${x0 + 12 * cw}" y2="${y + 59}" stroke="#d8c9a6" stroke-width="6"/>`;
    for (let k = 0; k < 12; k++) { const fr = d + k, n = CHROM[(4 + fr) % 12], x = x0 + (k + .5) * cw;
      if (k) b += `<line x1="${x0 + k * cw}" y1="${y + 24}" x2="${x0 + k * cw}" y2="${y + 94}" stroke="#a7a9ad" stroke-width="${fr === 12 ? 8 : 4}"/>`;
      b += n.includes('♯') ? `<circle cx="${x}" cy="${y + 59}" r="8" fill="${C.IV}" opacity=".55"/>` : chip(x, y + 59, n, 66, 36, 1);
      b += txt(x, y + 128, fr, { size: 22, w: 700, fill: fr === 12 || fr === 0 ? col : C.MUTE }); } });
  b += nota(570, 'MI en el traste 0 y MI en el traste 12: la misma nota, una octava más aguda.', { fill: C.GOLD, size: 24 });
  b += tit(640, 'Patrón 2 de SOL mayor · trastes 4 a 7', { size: 30 }) + nota(676, 'raíz en la cuerda RE con el dedo 2 · el punto rojo marca cada SOL', { a: 'start', x: 30, size: 22 });
  const c = caja4(720, 4, 'nota'); b += c.b;
  out('J3_doble', c.h + 20, 'El bajo es doble: desde el traste 12 las notas se repiten', b); })();

/* 26 · Intervalos */
(() => { let b = cab('Intervalos desde DO', 'Raíz en la cuerda LA, traste 3 · las formas sirven desde cualquier raíz');
  const COL = l => l === '1' ? G.R : l.includes('M') ? G[5] : G[8];
  const INT = [[3, 3, '1', 'DO'], [3, 5, '2M', 'RE'], [2, 2, '3M', 'MI'], [2, 3, '4J', 'FA'], [2, 5, '5J', 'SOL'], [1, 2, '6M', 'LA'], [1, 4, '7M', 'SI'], [1, 5, '8J', 'DO']];
  const m = mastil({ y0: 170, desde: 2, trastes: 4, marcas: INT.map(([c, t, l, n]) => [c, t, l, COL(l), n]) }); b += m.b;
  let y = m.h + 30; b += txt(30, y, 'M = mayor', { a: 'start', size: 28, w: 700, fill: G[5] }) + txt(260, y, '2.ª, 3.ª, 6.ª, 7.ª', { a: 'start', size: 24, w: 600, fill: C.MUTE });
  b += txt(530, y, 'J = justo', { a: 'start', size: 28, w: 700, fill: G[8] }) + txt(740, y, '4.ª, 5.ª, 8.ª', { a: 'start', size: 24, w: 600, fill: C.MUTE });
  y += 40; [['2M', '2 trastes, misma cuerda'], ['3M', 'cuerda siguiente, 1 traste atrás'], ['4J', 'cuerda siguiente, mismo traste'], ['5J', 'cuerda siguiente, 2 trastes adelante'],
    ['6M', 'dos cuerdas arriba, 1 traste atrás'], ['7M', 'dos cuerdas arriba, 1 traste adelante'], ['8J', 'dos cuerdas arriba, 2 trastes adelante']].forEach(([a, d], k) => { const yy = y + k * 72;
    b += caja(30, yy, W - 60, 60, { r: 12 }) + txt(90, yy + 41, a, { size: 30, w: 700, fill: COL(a) }) + txt(160, yy + 40, d, { a: 'start', size: 26, w: 600 }); });
  out('J3_intervalos', y + 7 * 72 + 20, 'Intervalos mayores y justos en el mástil', b); })();

/* 27 · Ligados y patrón 3 */
(() => { let b = cab('Ligados', 'Dos notas con una sola pulsación'); let y = 140;
  [['Hammer-on (H)', 'pulso la 1.ª y «martillo» la 2.ª con otro dedo', 5, 7, 'H'], ['Pull-off (P)', 'pulso la 1.ª y jalo el dedo para que suene la 2.ª', 7, 5, 'P'], ['Slide (S)', 'pulso y deslizo el mismo dedo al otro traste', 5, 7, 'S']].forEach(([t, d, a, c, s], k) => {
    const yy = y + k * 170; b += caja(30, yy, W - 60, 150) + txt(60, yy + 46, t, { a: 'start', size: 30, w: 700, fill: C.GOLD }) + txt(60, yy + 84, d, { a: 'start', size: 22, w: 600, fill: C.MUTE });
    const tx = 640, ty = yy + 30; for (let i = 0; i < 4; i++) b += `<line x1="${tx}" y1="${ty + i * 30}" x2="${tx + 300}" y2="${ty + i * 30}" stroke="${C.TAB}" stroke-width="2"/>`;
    const xa = tx + 80, xb = tx + 220, yl = ty + 60; [[xa, a], [xb, c]].forEach(([x, n]) => { b += `<rect x="${x - 20}" y="${yl - 18}" width="40" height="36" fill="${C.PANEL}"/>` + txt(x, yl + 11, n, { size: 32, w: 700 }); });
    b += s === 'S' ? `<line x1="${xa + 26}" y1="${yl + 12}" x2="${xb - 26}" y2="${yl - 12}" stroke="${C.GOLD}" stroke-width="4"/>` : `<path d="M${xa} ${yl - 24} Q${(xa + xb) / 2} ${yl - 70} ${xb} ${yl - 24}" fill="none" stroke="${C.GOLD}" stroke-width="4"/>` + txt((xa + xb) / 2, yl - 50, s, { size: 26, w: 700, fill: C.GOLD });
    b += txt(60, yy + 126, 'En la tablatura: ' + (s === 'S' ? 'una línea' : 'una curva con ' + s), { a: 'start', size: 22, w: 600 }); });
  y += 3 * 170 + 30; b += tit(y, 'Patrón 3 de SOL mayor · trastes 7 a 10', { size: 30 }) + nota(y + 36, 'raíz en la cuerda SI (dedo 2) o en la cuerda LA (dedo 4)', { a: 'start', x: 30, size: 22 });
  const c = caja4(y + 80, 7, 'nota'); b += c.b;
  out('J3_ligados', c.h + 20, 'Ligados en el bajo y patrón 3 de la escala mayor', b); })();

/* 28 · Octavas */
(() => { let b = cab('El truco de las octavas', 'Dos cuerdas y dos trastes');
  const m = mastil({ y0: 170, desde: 2, trastes: 6, fw: 128, marcas: [M(4, 3, 1, 'SOL'), M(2, 5, 8, 'SOL'), M(3, 5, 1, 'RE'), M(1, 7, 8, 'RE'), [5, 3, '8↓', G['♭3'], 'RE']] }); b += m.b;
  let y = m.h + 10; b += leyenda(y, [[1, 'nota'], [8, 'octava arriba'], ['♭3', 'octava abajo']]).replace(/>♭3</, '>8↓<');
  b += nota(y + 50, 'Arriba: dos cuerdas más agudas, dos trastes adelante.', { size: 24, fill: C.IV }) + nota(y + 84, 'Abajo: dos cuerdas más graves, dos trastes atrás.', { size: 24, fill: C.IV });
  y += 150; b += tit(y, 'Escala mayor en una sola cuerda (cuerda LA)', { size: 30 });
  const E = [['DO', 3], ['RE', 5], ['MI', 7], ['FA', 8], ['SOL', 10], ['LA', 12], ['SI', 14], ['DO', 15]], P = ['T', 'T', 'S', 'T', 'T', 'T', 'S'];
  E.forEach(([n, t], k) => { const r = Math.floor(k / 4), x = 110 + (k % 4) * 240, yy = y + 70 + r * 140;
    b += chip(x, yy, n, 100, 50) + txt(x, yy + 56, 'traste ' + t, { size: 22, w: 600, fill: C.MUTE });
    if (k < 7 && k % 4 < 3) b += circ(x + 120, yy, 22, P[k], P[k] === 'S' ? C.GOLD : 'none', P[k] === 'S' ? GOLDTX : C.IV, 24); });
  b += circ(W - 40, y + 70, 22, P[3], 'none', C.IV, 24);
  y += 70 + 280; b += nota(y, 'Si empiezo en otro traste, construyo otra escala mayor.', { fill: C.GOLD, size: 24 });
  out('J3_octavas', y + 30, 'Octavas en el bajo', b); })();

/* 29 · Slap */
(() => { let b = cab('Slap: pulgar y pop'); let y = 110;
  [['T', 'Pulgar', 'golpeo con el hueso del pulgar al final del mástil y reboto'], ['P', 'Pop', 'el índice engancha la cuerda RE o SOL, la jala y la suelta'], ['x', 'Nota muerta', 'la mano izquierda apoya sin pisar: suena un golpe sin nota']].forEach(([l, t, d], k) => {
    const yy = y + k * 120; b += caja(30, yy, W - 60, 104) + circ(90, yy + 52, 34, l, TC[l]) + txt(150, yy + 44, t, { a: 'start', size: 30, w: 700, fill: C.GOLD }) + txt(150, yy + 80, d, { a: 'start', size: 22, w: 600 }); });
  y += 380; b += tit(y, 'Octavas en MI: T en la raíz, P en la octava', { size: 30 });
  const cnt = ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a'], pat = ['T', '', 'P', '', 'T', 'T', 'P', ''];
  cnt.forEach((c, k) => { const x = 75 + k * 121; b += txt(x, y + 60, c, { size: 28, w: 700, fill: k % 4 ? C.MUTE : C.IV }) + (pat[k] ? circ(x, y + 120, 40, pat[k], TC[pat[k]]) : `<circle cx="${x}" cy="${y + 120}" r="8" fill="${MUTEC}"/>`); });
  b += nota(y + 200, 'T: cuerda MI al aire · P: cuerda RE, traste 2 (MI una octava arriba)', { fill: C.IV, size: 24 });
  b += nota(y + 240, 'Empieza lento (60 BPM): el slap se aprende con precisión, no con fuerza.', { fill: C.GOLD, size: 24 });
  out('J3_slap', y + 270, 'Técnica de slap: pulgar y pop', b); })();

/* 30 · Funk con slap */
(() => { let b = cab('Groove de funk con slap (en MI)', 'Semicorcheas: «1 e y a» en cada pulso');
  const pat = ['T', '', 'x', 'P', '', 'T', 'x', 'P', 'T', '', 'x', 'P', 'T', 'T', 'x', 'P'], cnt = ['', 'e', 'y', 'a'];
  for (let p = 0; p < 4; p++) { const x0 = 30 + (p % 2) * 480, y0 = 140 + Math.floor(p / 2) * 210; b += caja(x0, y0, 460, 190);
    for (let k = 0; k < 4; k++) { const x = x0 + 62 + k * 112, g = pat[p * 4 + k]; b += txt(x, y0 + 46, k ? cnt[k] : p + 1, { size: 28, w: 700, fill: k ? C.MUTE : C.IV });
      b += g ? circ(x, y0 + 120, 42, g, TC[g]) : `<circle cx="${x}" cy="${y0 + 120}" r="8" fill="${MUTEC}"/>`; } }
  let y = 140 + 420 + 20; b += leyenda(y, [['R', 'T = pulgar'], [5, 'P = pop'], ['♭5', 'x = muerta']]).replace(/>R</, '>T<').replace(/>5</, '>P<').replace(/>♭5</, '>x<');
  b += nota(y + 56, 'T = MI al aire · P = MI en la cuerda RE, traste 2', { fill: C.IV, size: 24 }) + nota(y + 92, 'El pulgar cae con el bombo.', { fill: C.GOLD, size: 24 });
  out('J3_funk', y + 120, 'Groove de funk con slap', b); })();

/* 31 · Transformar intervalos y transportar */
(() => { let b = cab('Transformo intervalos', 'Un traste cambia todo'); let y = 130;
  b += nota(y, 'Mayor – 1 traste = menor · justo + 1 = aumentado · justo – 1 = disminuido', { size: 24, fill: C.GOLD });
  [['3M → 3m', 'MI → MI♭', 'un traste atrás'], ['6M → 6m', 'LA → LA♭', 'un traste atrás'], ['7M → 7m', 'SI → SI♭', 'un traste atrás'], ['5J → 5dim', 'SOL → SOL♭', 'un traste atrás'], ['4J → 4aum', 'FA → FA♯', 'un traste adelante']].forEach(([a, n, d], k) => {
    const yy = y + 30 + k * 86; b += caja(30, yy, W - 60, 72, { r: 12 }) + txt(60, yy + 47, a, { a: 'start', size: 30, w: 700 }) + txt(500, yy + 47, n, { size: 28, w: 700, fill: G[5] === '#2F6FD8' ? '#6fa0ff' : G[5] }) + txt(W - 60, yy + 46, d, { a: 'end', size: 24, w: 600, fill: C.MUTE }); });
  y += 30 + 5 * 86 + 40; b += tit(y, 'Transportar: muevo toda la forma', { size: 30 }) + nota(y + 36, 'La misma línea suena en otra tonalidad', { a: 'start', x: 30, size: 22 });
  [['en DO', 'DO', 3], ['en RE', 'RE', 5], ['en MI', 'MI', 7]].forEach(([t, n, tr], k) => { const x = 30 + k * 318, yy = y + 70;
    b += caja(x, yy, 302, 150) + txt(x + 151, yy + 48, 'misma línea ' + t, { size: 26, w: 700 }) + chip(x + 151, yy + 92, n, 90, 42) + txt(x + 151, yy + 136, 'cuerda LA · traste ' + tr, { size: 20, w: 600, fill: C.MUTE }); });
  out('J3_transforma', y + 240, 'Transformar intervalos en el mástil', b); })();

/* 32 · Patrón 5 y pentatónica menor */
(() => { let b = cab('Patrón 5 y la pentatónica', 'La pentatónica menor: 1 – ♭3 – 4 – 5 – ♭7');
  b += tit(150, 'Patrón 5 de SOL mayor · trastes 12 a 15', { size: 30 }) + nota(186, 'raíz en la cuerda SOL (dedo 1) o en la cuerda MI (dedo 4)', { a: 'start', x: 30, size: 22 });
  const a = caja4(230, 12, 'nota'); b += a.b; let y = a.h + 30;
  b += tit(y, 'LA menor pentatónica · trastes 5 a 8', { size: 30 }) + nota(y + 36, 'LA – DO – RE – MI – SOL · ideal para rellenos', { a: 'start', x: 30, size: 22 });
  const PEN = [[1, 5, 'DO'], [1, 7, 'RE'], [2, 5, 'SOL'], [2, 7, 'LA'], [3, 5, 'RE'], [3, 7, 'MI'], [4, 5, 'LA'], [4, 8, 'DO'], [5, 5, 'MI'], [5, 8, 'SOL']];
  const m = mastil({ y0: y + 110, desde: 5, trastes: 4, notas: PEN.map(p => p.slice()) }); b += m.b;
  PEN.forEach(([c, t, n]) => { if (n === 'LA') b += `<circle cx="${f1(m.nx(t) + 40)}" cy="${m.cy(c) - 22}" r="10" fill="${G.R}" stroke="${C.IV}" stroke-width="2"/>`; });
  b += nota(m.h + 10, 'El punto rojo marca la raíz: LA.', { size: 24, fill: C.GOLD });
  out('J3_penta', m.h + 40, 'Patrón 5 de la escala mayor y pentatónica menor', b); })();

/* 33 · Chart de bajo (sin colores, como en la banda) */
(() => { let b = cab('Leo un chart completo', 'Secciones, cifrado, repeticiones, casillas y saltos'); const s = 22, xL = 30, xR = W - 30, x0 = xL + 100, bw = (xR - x0) / 4;
  const fila = (y, lab, ch, o = {}) => { let r = txt(xL, y, lab, { a: 'start', size: 28, w: 700, fill: C.GOLD }); const top = y + 70;
    r += pent(xL, xR, top, s, 2.5) + claveFa(xL + 14, top, s);
    ch.forEach((c, m) => { const bx = x0 + m * bw, fin = m === 3 && (o.fine || o.dc);
      r += txt(bx + 18, top - 14, c, { a: 'start', serif: 1, size: 34, w: 700 });
      for (let q = 0; q < 4; q++) { const xx = bx + 34 + q * (bw - 50) / 4; r += `<line x1="${f1(xx - 9)}" y1="${top + 3 * s}" x2="${f1(xx + 9)}" y2="${top + s}" stroke="${C.IV}" stroke-width="7"/>`; }
      r += fin ? `<line x1="${bx + bw - 12}" y1="${top}" x2="${bx + bw - 12}" y2="${top + 4 * s}" stroke="${C.IV}" stroke-width="3"/><rect x="${bx + bw - 7}" y="${top}" width="7" height="${4 * s}" fill="${C.IV}"/>` : `<line x1="${bx + bw}" y1="${top}" x2="${bx + bw}" y2="${top + 4 * s}" stroke="${C.IV}" stroke-width="3"/>`; });
    if (o.rep) { r += `<rect x="${x0 + 2}" y="${top}" width="7" height="${4 * s}" fill="${C.IV}"/><circle cx="${x0 + 22}" cy="${top + 1.5 * s}" r="4.5" fill="${C.IV}"/><circle cx="${x0 + 22}" cy="${top + 2.5 * s}" r="4.5" fill="${C.IV}"/>`;
      const xr = x0 + 3 * bw; r += `<rect x="${xr - 9}" y="${top}" width="7" height="${4 * s}" fill="${C.IV}"/><circle cx="${xr - 22}" cy="${top + 1.5 * s}" r="4.5" fill="${C.IV}"/><circle cx="${xr - 22}" cy="${top + 2.5 * s}" r="4.5" fill="${C.IV}"/>`; }
    if (o.casillas) [[x0 + 2 * bw, x0 + 3 * bw - 16, '1.'], [x0 + 3 * bw + 4, xR, '2.']].forEach(([a, c, t]) => { r += `<path d="M${a} ${top - 44} V${top - 62} H${c}" fill="none" stroke="${C.IV}" stroke-width="3"/>` + txt(c - 8, top - 40, t, { a: 'end', size: 22, w: 700 }); });
    if (o.fine || o.dc) r += txt(xR, top + 4 * s + 40, o.fine ? 'Fine' : 'D.C. al Fine', { a: 'end', serif: 1, size: 30, w: 700 });
    return r; };
  b += fila(140, 'Intro', ['C', 'G', 'Am', 'F']) + fila(370, 'Estrofa (2 veces)', ['C', 'F', 'G', 'C'], { rep: 1, casillas: 1, fine: 1 }) + fila(610, 'Coro', ['F', 'G', 'C', 'C'], { dc: 1 });
  let y = 860; [['Barras inclinadas', 'toco raíces o mi línea, siguiendo el cifrado'], ['‖:  :‖', 'repito lo que está entre los dos signos'], ['1. y 2.', 'la 1.ª vez toco la casilla 1; la 2.ª vez, la 2'], ['D.C. al Fine', 'vuelvo al principio y termino donde dice Fine']].forEach(([a, d], k) => {
    b += txt(30, y + k * 46, a, { a: 'start', size: 24, w: 700 }) + txt(290, y + k * 46, d, { a: 'start', size: 22, w: 600, fill: C.MUTE }); });
  out('J3_chart', y + 4 * 46, 'Un chart de bajo en clave de fa', b); })();

/* 34 · Los 5 patrones en el mástil */
(() => { let b = cab('Los 5 patrones cubren el mástil', 'SOL mayor · cada patrón es una caja de 4 trastes'); const x0 = 30, fw = 58.5, y0 = 150;
  b += `<rect x="${x0}" y="${y0}" width="${16 * fw}" height="330" rx="10" fill="#2a1d12"/>`;
  for (let f = 1; f <= 16; f++) b += `<line x1="${x0 + f * fw}" y1="${y0}" x2="${x0 + f * fw}" y2="${y0 + 330}" stroke="#a7a9ad" stroke-width="3"/>` + txt(x0 + (f - .5) * fw, y0 + 366, f, { size: 22, w: 700, fill: C.MUTE });
  [[1, 2, '#E5312B'], [2, 4, '#F57C00'], [3, 7, '#2E9E4F'], [4, 9, '#2F6FD8'], [5, 12, '#8E3BB8']].forEach(([p, d, col], k) => { const y = y0 + 16 + (k % 2) * 154;
    b += `<rect x="${f1(x0 + (d - 1) * fw + 4)}" y="${y}" width="${f1(4 * fw - 8)}" height="140" rx="14" fill="${col}" opacity=".92"/>` + txt(x0 + (d + 1) * fw, y + 64, 'Patrón ' + p, { size: 28, w: 700, fill: '#fff' }) + txt(x0 + (d + 1) * fw, y + 104, `${d}–${d + 3}`, { size: 24, w: 600, fill: '#fff' }); });
  let y = y0 + 420; b += nota(y, 'Después del 5 vuelve el 1 (trastes 14 a 17).', { fill: C.IV, size: 26 });
  b += nota(y + 44, 'Para otra tonalidad, toda la cadena se mueve junta.', { fill: C.GOLD, size: 26 });
  out('J3_patrones', y + 80, 'Los cinco patrones de la escala mayor en el mástil', b); })();

/* 35 · Mi equipo */
(() => { let b = cab('Mi equipo: el camino del sonido', 'Del bajo a la sala · reviso cada paso antes del ensayo'); let y = 140;
  [['Bajo', 'volumen arriba, tono a gusto'], ['Cable', 'sin nudos, bien conectado'], ['Afinador', 'afino antes de empezar'], ['Amplificador', 'volumen moderado, graves sin exceso'], ['Caja directa', 'envía la señal a la consola']].forEach(([t, d], k) => {
    const yy = y + k * 130; b += `<rect x="120" y="${yy}" width="760" height="96" rx="18" fill="${k === 0 ? C.GOLD : C.PANEL}" stroke="#2c241a" stroke-width="2"/>` + txt(W / 2, yy + 42, t, { size: 32, w: 700, fill: k === 0 ? GOLDTX : C.IV }) + txt(W / 2, yy + 78, d, { size: 22, w: 600, fill: k === 0 ? GOLDTX : C.MUTE });
    if (k < 4) b += txt(W / 2, yy + 124, '↓', { size: 30, w: 700, fill: C.MUTE }); });
  y += 5 * 130 + 10; b += nota(y, 'Encender: primero el bajo y los cables, al final el amplificador.', { fill: C.IV, size: 24 }) + nota(y + 36, 'Apagar: primero el amplificador.', { fill: C.IV, size: 24 });
  b += nota(y + 80, 'Cuida tu oído: tapones para músicos y volumen moderado.', { fill: C.GOLD, size: 24 });
  out('J3_equipo', y + 110, 'El camino del sonido del bajo', b); })();

/* 36 · Presentación final */
(() => { let b = cab('¡Presentación final! · Bajo', 'El programa de mi concierto · Nivel 3');
  [['1', 'Escalas', 'los 5 patrones y la pentatónica', '#2AA7E8', '#1A1A1A'], ['2', 'Tres estilos', 'balada, rock, cumbia o reggae', '#2E9E4F', '#fff'], ['3', 'Canción con banda', 'leo el chart y sigo las señales', '#F57C00', '#1A1A1A'], ['4', 'Groove de slap', 'mi groove de funk con slap', '#E5312B', '#fff']].forEach(([n, t, d, col, tx], k) => {
    const x = 30 + (k % 2) * 480, y = 140 + Math.floor(k / 2) * 300; b += `<rect x="${x}" y="${y}" width="460" height="280" rx="22" fill="${col}"/>` + `<circle cx="${x + 230}" cy="${y + 70}" r="42" fill="#fff"/>` + txt(x + 230, y + 88, n, { size: 46, w: 700, fill: '#1A1A1A' });
    b += txt(x + 230, y + 170, t, { size: 34, w: 700, fill: tx }) + txt(x + 230, y + 220, d, { size: 22, w: 600, fill: tx }); });
  b += nota(770, 'Antes: afino, reviso cables y amplificador.', { fill: C.IV, size: 24 }) + nota(806, 'Después: saludo, agradezco y guardo mi equipo.', { fill: C.IV, size: 24 });
  out('J3_final', 840, 'Programa de la presentación final de bajo', b); })();
console.log('ok', fs.readdirSync(OUT).filter(f => f.startsWith('J3_')).length, 'láminas J3');
