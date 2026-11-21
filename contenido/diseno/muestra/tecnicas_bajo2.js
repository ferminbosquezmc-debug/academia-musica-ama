/* Láminas técnicas de Bajo Nivel 2 (clases 13 a 24), estilo nuevo, 1000 px. Mismos nombres que en la plataforma (bajo/img/J2_*.svg).
   Uso: node tecnicas_bajo2.js → img_bajo/J2_*.svg · usa el diapasón y el pentagrama de tecnicas_bajo1.js */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, chip, txt, svg, f1, pent } = require('./tecnicas_motor.js');
const { mastil, pentaFa, tit, nota, caja, GOLDTX } = require('./tecnicas_bajo1.js');
const OUT = path.join(__dirname, 'img_bajo');
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const G = { R: '#E5312B', 1: '#E5312B', 3: '#F57C00', 5: '#2F6FD8', 8: '#2E9E4F', '♭3': '#8E3BB8', '♭7': '#8E3BB8', '♭5': '#6b6153' };
const M = (c, t, g, nm) => [c, t, g, G[g], nm];
const cab = (t, sub) => txt(W / 2, 58, t, { serif: 1, size: 44, w: 700 }) + (sub ? txt(W / 2, 100, sub, { size: 26, w: 600, fill: C.MUTE }) : '');
const bola = (x, y, g, r = 32) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${G[g]}" stroke="${C.IV}" stroke-width="3"/>` + txt(x, y + r * .34, g, { size: f1(r * .9), w: 700, fill: '#fff' });
const leyenda = (y, items) => items.map(([g, t], k) => { const d = (W - 40) / items.length; return bola(50 + k * d, y, g, 24) + txt(84 + k * d, y + 9, t, { a: 'start', size: 26, w: 600 }); }).join('');
const OPEN = { 1: 7, 2: 2, 3: 9, 4: 4, 5: 11 }, CHROM = ['DO', 'DO♯', 'RE', 'RE♯', 'MI', 'FA', 'FA♯', 'SOL', 'SOL♯', 'LA', 'LA♯', 'SI'], MAJ = [0, 2, 4, 5, 7, 9, 11];

/* 13 · Las cuerdas en el pentagrama + signos de medida */
(() => { let b = cab('Las cuerdas en el pentagrama', 'Las 5 cuerdas al aire, en clave de fa');
  const p = pentaFa(110, ['SI1', 'MI2', 'LA2', 'RE3', 'SOL3'], { arriba: 2, s: 28, d: 'h' }); b += p.b;
  ['5.ª', '4.ª', '3.ª', '2.ª', '1.ª'].forEach((c, k) => { b += txt(p.ys[k][0], p.h + 6, c, { size: 24, w: 700, fill: C.MUTE }); });
  let y = p.h + 50; b += nota(y, 'Las cuerdas graves usan líneas adicionales debajo del pentagrama.');
  y += 60; b += tit(y, 'El signo de medida', { size: 32 }) + nota(y + 40, 'Arriba: cuántos pulsos · abajo: qué figura vale un pulso', { a: 'start', x: 30 });
  [['4', '4', '4 negras'], ['3', '4', '3 negras · vals'], ['6', '8', '6 corcheas'], ['12', '8', '12 corcheas']].forEach(([a, d, t], k) => {
    const x = 30 + (k % 2) * 480, yy = y + 70 + Math.floor(k / 2) * 190, s = 18; b += caja(x, yy, 460, 170);
    b += pent(x + 30, x + 200, yy + 45, s, 2) + txt(x + 115, yy + 45 + 2 * s - 2, a, { serif: 1, size: 44, w: 700 }) + txt(x + 115, yy + 45 + 4 * s - 2, d, { serif: 1, size: 44, w: 700 });
    b += txt(x + 330, yy + 95, t, { size: 26, w: 600 }); });
  out('J2_cuerdas', y + 70 + 380 + 20, 'Las cuerdas del bajo en el pentagrama y el signo de medida', b); })();

/* 14 · Raíz y quinta */
(() => { let b = cab('Raíz y quinta', 'Una forma que sirve en todo el mástil');
  const m = mastil({ y0: 170, trastes: 6, fw: 125, marcas: [M(3, 3, 'R', 'DO'), M(2, 5, '5', 'SOL'), M(4, 3, '5', 'SOL')] }); b += m.b;
  let y = m.h + 10; b += leyenda(y, [['R', 'raíz (DO)'], ['5', 'quinta (SOL)']]) + txt(W - 30, y + 9, 'Acorde de C', { a: 'end', size: 28, w: 700, fill: C.GOLD });
  y += 60; b += nota(y, 'Quinta arriba: una cuerda más aguda y dos trastes más.', { fill: C.IV }) + nota(y + 36, 'Quinta abajo: una cuerda más grave, en el mismo traste.', { fill: C.IV });
  y += 100; b += tit(y, 'Patrones de acompañamiento (4/4)', { size: 32 });
  [['blancas', ['R', '–', '5', '–']], ['negras', ['R', '5', 'R', '5']], ['negras', ['R', 'R', '5', '5']]].forEach(([t, p], r) => { const yy = y + 50 + r * 110;
    b += caja(30, yy, W - 60, 94) + txt(60, yy + 56, t, { a: 'start', size: 26, w: 600, fill: C.MUTE });
    p.forEach((g, j) => { const x = 330 + j * 165; b += g === '–' ? `<rect x="${x - 70}" y="${yy + 41}" width="120" height="12" rx="6" fill="${G[p[j - 1]]}"/>` : bola(x, yy + 47, g, 34); }); });
  out('J2_quinta', y + 50 + 330 + 10, 'Raíz y quinta en el bajo', b); })();

/* 15 · Raíz, quinta y octava en tresillos */
(() => { let b = cab('Raíz – quinta – octava', 'En tresillos: perfecto para el 12/8 y el 6/8');
  const m = mastil({ y0: 170, trastes: 5, fw: 150, marcas: [M(4, 1, 'R', 'FA'), M(3, 3, '5', 'DO'), M(2, 3, '8', 'FA')] }); b += m.b;
  let y = m.h + 10; b += leyenda(y, [['R', 'raíz'], ['5', 'quinta'], ['8', 'octava']]); y += 50;
  b += nota(y, 'Acorde de F · la octava: dos cuerdas más agudas y dos trastes más', { size: 24 });
  [['12/8 · cuatro pulsos de tres', ['1', 'o', 'la', '2', 'o', 'la', '3', 'o', 'la', '4', 'o', 'la'], ['R', '5', '8'].concat(['R', '5', '8'], ['R', '5', '8'], ['R', '5', '8'])],
   ['6/8 · dos pulsos de tres', ['1', 'o', 'la', '2', 'o', 'la'], ['R', '5', '8', '8', '5', 'R']]].forEach(([t, cnt, pat], r) => { const yy = y + 50 + r * 190, cw = cnt.length === 12 ? 78 : 150, x0 = (W - cw * cnt.length) / 2;
    b += tit(yy + 10, t, { size: 28 });
    cnt.forEach((c, k) => { const x = x0 + (k + .5) * cw; b += txt(x, yy + 60, c, { size: 26, w: 700, fill: k % 3 ? C.MUTE : C.IV }) + bola(x, yy + 112, pat[k], cw > 100 ? 36 : 30); }); });
  out('J2_tresillo', y + 50 + 380, 'Raíz, quinta y octava en tresillos', b); })();

/* 16 · La escala mayor móvil */
(() => { let b = cab('La escala mayor: forma móvil', 'Empiezo con el dedo 2 · tres cuerdas · un dedo por traste');
  const forma = (y, st0, nombres, titulo) => { const strs = [st0 - 2, st0 - 1, st0], pos = [[st0, 3, 2], [st0, 5, 4], [st0 - 1, 2, 1], [st0 - 1, 3, 2], [st0 - 1, 5, 4], [st0 - 2, 2, 1], [st0 - 2, 4, 3], [st0 - 2, 5, 4]];
    const m = mastil({ y0: y + 60, desde: 2, trastes: 4, solo: strs, notas: pos.map(([c, t, d], k) => [c, t, nombres[k], d]) });
    return { b: tit(y, titulo, { size: 30 }) + m.b, h: m.h }; };
  const a = forma(140, 4, ['SOL', 'LA', 'SI', 'DO', 'RE', 'MI', 'FA♯', 'SOL'], 'SOL mayor · desde la cuerda MI'); b += a.b;
  const c = forma(a.h + 40, 3, ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO'], 'DO mayor · desde la cuerda LA'); b += c.b;
  let y = c.h + 20; b += nota(y, 'La forma no cambia: solo cambio la cuerda o el traste de inicio.', { fill: C.IV });
  b += nota(y + 40, 'T–T–S–T–T–T–S · ♯ = un traste más agudo · ♭ = un traste más grave', { fill: C.GOLD });
  out('J2_escala', y + 70, 'La escala mayor de una octava, forma móvil', b); })();

/* Caja de 4 trastes con la escala mayor (raíz SOL) */
const caja4 = (y, desde, modo) => { const notas = [], marcas = [];
  for (let c = 1; c <= 5; c++) for (let t = desde; t < desde + 4; t++) { const pc = (OPEN[c] + t) % 12, d = (pc - 7 + 12) % 12; if (!MAJ.includes(d)) continue; const g = MAJ.indexOf(d) + 1;
    if (modo === 'grado') marcas.push([c, t, g, g === 1 ? G.R : C.IV, null, g === 1 ? '#fff' : GOLDTX]); else notas.push([c, t, CHROM[pc]]); }
  const m = mastil({ y0: y + 40, desde, trastes: 4, notas, marcas }); let b = m.b;
  for (let k = 0; k < 4; k++) b += txt(m.nx(desde + k), y, 'dedo ' + (k + 1), { size: 22, w: 700, fill: C.GOLD });
  if (modo !== 'grado') notas.forEach(([c, t, n]) => { if (n === 'SOL') b += `<circle cx="${f1(m.nx(t) + 40)}" cy="${m.cy(c) - 22}" r="10" fill="${G.R}" stroke="${C.IV}" stroke-width="2"/>`; });
  return { b, h: m.h }; };

/* 17 · Grados y digitación */
(() => { let b = cab('Los grados de la escala mayor', 'SOL mayor · la raíz (1) con el dedo 2');
  b += tit(150, 'Grados · 1 = raíz', { size: 30 }); const a = caja4(190, 2, 'grado'); b += a.b;
  b += tit(a.h + 40, 'Las mismas notas', { size: 30 }); const c = caja4(a.h + 80, 2, 'nota'); b += c.b;
  let y = c.h + 20; b += caja(30, y, W - 60, 150) + txt(W / 2, y + 50, 'Los grados no cambian con la tonalidad:', { size: 26, w: 700 }) + txt(W / 2, y + 86, 'el 1 es la raíz, el 5 la quinta, el 8 la octava.', { size: 26, w: 600 });
  b += txt(W / 2, y + 124, 'Un dedo por traste: dedo 1 en el primero de la caja.', { size: 24, w: 600, fill: C.GOLD });
  out('J2_grados', y + 180, 'Grados y digitación de la escala mayor', b); })();

/* 18 · 19 · Arpegios mayor y menor */
const arpegio = (nombre, titulo, sub, A, B, ley, label) => { let b = cab(titulo, sub), y = 150;
  [A, B].forEach(([t, desde, marcas]) => { b += tit(y, t, { size: 30 }); const m = mastil({ y0: y + 70, desde, trastes: 4, marcas }); b += m.b; y = m.h + 30; });
  b += leyenda(y, ley); out(nombre, y + 50, label, b); };
arpegio('J2_arpmayor', 'El arpegio mayor', '1 – 3 – 5 – 8 · la forma se mueve a cualquier raíz',
  ['C mayor · raíz en la cuerda LA (dedo 2)', 2, [M(3, 3, 1, 'DO'), M(2, 2, 3, 'MI'), M(2, 5, 5, 'SOL'), M(1, 5, 8, 'DO')]],
  ['G mayor · raíz en la cuerda MI (dedo 2)', 2, [M(4, 3, 1, 'SOL'), M(3, 2, 3, 'SI'), M(3, 5, 5, 'RE'), M(2, 5, 8, 'SOL')]],
  [[1, 'raíz'], [3, 'tercera'], [5, 'quinta'], [8, 'octava']], 'El arpegio mayor en el bajo');
arpegio('J2_arpmenor', 'El arpegio menor', '1 – ♭3 – 5 – 8 · la tercera baja un traste',
  ['Am · raíz en la cuerda MI, traste 5 (dedo 1)', 5, [M(4, 5, 1, 'LA'), M(4, 8, '♭3', 'DO'), M(3, 7, 5, 'MI'), M(2, 7, 8, 'LA')]],
  ['Dm · raíz en la cuerda LA, traste 5 (dedo 1)', 5, [M(3, 5, 1, 'RE'), M(3, 8, '♭3', 'FA'), M(2, 7, 5, 'LA'), M(1, 7, 8, 'RE')]],
  [[1, 'raíz'], ['♭3', '3.ª menor'], [5, 'quinta'], [8, 'octava']], 'El arpegio menor en el bajo');

/* 20 · Patrones 1 y 4 */
(() => { let b = cab('Patrones 1 y 4 (SOL mayor)', 'Cajas de 4 trastes · el punto rojo marca cada SOL');
  b += tit(150, 'Patrón 1 · trastes 2 a 5', { size: 30 }); const a = caja4(190, 2, 'nota'); b += a.b;
  b += tit(a.h + 40, 'Patrón 4 · trastes 9 a 12', { size: 30 }); const c = caja4(a.h + 80, 9, 'nota'); b += c.b;
  let y = c.h + 20; b += nota(y, 'Para otra tonalidad muevo la caja: la raíz queda bajo el mismo dedo.', { fill: C.IV, size: 24 });
  b += nota(y + 38, 'Bajo de 4 cuerdas: igual, sin la fila de la cuerda SI.', { fill: C.GOLD, size: 24 });
  out('J2_patrones14', y + 70, 'Patrones 1 y 4 de la escala mayor', b); })();

/* 21 · Tríadas */
(() => { let b = cab('Tres clases de tríadas', 'Raíz en la cuerda LA'); let y = 140;
  [['Mayor · C', '1 – 3 – 5', [M(3, 3, 1, 'DO'), M(2, 2, 3, 'MI'), M(2, 5, 5, 'SOL')]], ['Menor · Cm', '1 – ♭3 – 5', [M(3, 3, 1, 'DO'), M(3, 6, '♭3', 'MI♭'), M(2, 5, 5, 'SOL')]],
   ['Disminuida · B°', '1 – ♭3 – ♭5', [M(3, 2, 1, 'SI'), M(3, 5, '♭3', 'RE'), M(2, 3, '♭5', 'FA')]]].forEach(([t, f, marcas]) => {
    b += tit(y, t, { size: 30 }) + txt(W - 30, y, f, { a: 'end', size: 28, w: 700, fill: C.MUTE }); const m = mastil({ y0: y + 60, desde: 2, trastes: 5, fw: 150, solo: [2, 3], marcas }); b += m.b; y = m.h + 30; });
  b += tit(y, 'Las tríadas de DO mayor', { size: 30 });
  const TR = [['I', 'C', 'mayor'], ['ii', 'Dm', 'menor'], ['iii', 'Em', 'menor'], ['IV', 'F', 'mayor'], ['V', 'G', 'mayor'], ['vi', 'Am', 'menor'], ['vii°', 'B°', 'dism.']];
  TR.forEach(([g, c, t], k) => { const r = Math.floor(k / 4), x = 30 + (k % 4) * 238 + (r ? 119 : 0), yy = y + 30 + r * 170, col = t === 'mayor' ? G.R : t === 'menor' ? G[5] : '#8a7f6e';
    b += caja(x, yy, 226, 150) + txt(x + 113, yy + 44, g, { size: 32, w: 700, fill: col }) + txt(x + 113, yy + 96, c, { serif: 1, size: 44, w: 700 }) + txt(x + 113, yy + 134, t, { size: 22, w: 600, fill: C.MUTE }); });
  y += 30 + 340 + 10; b += nota(y, 'mayor – menor – menor – mayor – mayor – menor – disminuida', { fill: C.GOLD, size: 24 });
  out('J2_triadas', y + 30, 'Las tríadas mayor, menor y disminuida en el bajo', b); })();

/* 22 · El mapa del mástil (dos tramos de 6 trastes) */
(() => { let b = cab('El mapa de mi mástil', 'Notas naturales en color · los puntos son ♯ o ♭'); let y = 150;
  [[1, 'Trastes 0 a 6'], [7, 'Trastes 7 a 12']].forEach(([desde, t]) => { const notas = [], extra = [];
    for (let c = 1; c <= 5; c++) for (let k = 0; k < 6; k++) { const tr = desde + k, n = CHROM[(OPEN[c] + tr) % 12]; if (n.includes('♯')) extra.push([c, tr]); else notas.push([c, tr, n]); }
    b += tit(y, t, { size: 30 }); const m = mastil({ y0: y + 60, desde, trastes: 6, fw: 128, notas: notas.map(([c, tr, n]) => [c, tr, n]) });
    b += m.b.replace(/width="84" height="44"/g, 'width="84" height="44"'); extra.forEach(([c, tr]) => { b += `<circle cx="${f1(m.nx(tr))}" cy="${m.cy(c)}" r="9" fill="${C.IV}" opacity=".55"/>`; }); y = m.h + 40; });
  b += nota(y, 'En el traste 12 (punto doble) se repiten las notas de las cuerdas al aire,', { size: 24, fill: C.GOLD }) + nota(y + 34, 'una octava más agudas.', { size: 24, fill: C.GOLD });
  out('J2_mastil', y + 64, 'Las notas naturales en las cinco cuerdas', b); })();

/* 23 · Séptima dominante y blues */
(() => { let b = cab('Séptima dominante', 'G7 = arpegio mayor + ♭7');
  const m = mastil({ y0: 170, desde: 2, trastes: 4, marcas: [M(4, 3, 1, 'SOL'), M(3, 2, 3, 'SI'), M(3, 5, 5, 'RE'), M(2, 3, '♭7', 'FA')] }); b += m.b;
  let y = m.h + 10; b += leyenda(y, [[1, 'raíz'], [3, 'tercera'], ['♭7', 'séptima menor']]);
  b += nota(y + 50, 'La ♭7 está dos cuerdas más aguda, en el mismo traste de la raíz.', { size: 24 });
  y += 110; b += tit(y, 'Blues de 12 compases en LA', { size: 30 });
  const BL = ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7'], RT = { A7: 'LA', D7: 'RE', E7: 'MI' };
  BL.forEach((c, k) => { const x = 30 + (k % 4) * 238, yy = y + 30 + Math.floor(k / 4) * 130; b += caja(x, yy, 226, 112) + txt(x + 22, yy + 70, c, { a: 'start', serif: 1, size: 40, w: 700, fill: C.GOLD }) + chip(x + 160, yy + 56, RT[c], 90, 44); });
  y += 30 + 390 + 10; b += nota(y, 'Las raíces van al aire: LA (3.ª), RE (2.ª) y MI (4.ª).', { size: 24 });
  out('J2_septima', y + 30, 'Arpegio de séptima dominante y blues de 12 compases', b); })();
module.exports = { caja4, cab, bola, leyenda, G, M, CHROM, OPEN };
if (require.main === module) console.log('ok', fs.readdirSync(OUT).filter(f => f.startsWith('J2_')).length, 'láminas J2');
