/* Láminas técnicas de Batería Nivel 2 (clases 13 a 24) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (bateria/img/B2_*.svg). Colores AMA por extremidad: D rojo, I azul, PD verde, PI morado.
   Uso: node tecnicas_bateria2.js → img_bateria/B2_*.svg */
const fs = require('fs'), path = require('path');
const { C, W, txt, svg, f1, pent, cabeza } = require('./tecnicas_motor.js');
const { EX, golpe, grilla, pasos, clavePerc, L8, HH8 } = require('./tecnicas_bateria1.js');
const OUT = path.join(__dirname, 'img_bateria'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const P = (n, label, bloques, fin) => { const r = pasos(bloques, fin); out(n, r.h, label, r.b); };
const rect = (x, y, w, h, fill, stroke, rx = 16, sw = 2.5) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;
const tit = (y, t) => txt(30, y, t, { a: 'start', size: 30, w: 700, fill: C.GOLD });
const nota = (y, t, gold) => txt(W / 2, y, t, { size: 24, w: 600, fill: gold ? C.GOLD : C.MUTE });
const SN = ['', '', 'I', '', '', '', 'I', ''], X = (i, v, n = 8) => Array.from({ length: n }, (_, j) => i.includes(j) ? v : '');
const xmark = (x, y, r, col) => `<path d="M${f1(x - r)},${f1(y - r)} L${f1(x + r)},${f1(y + r)} M${f1(x - r)},${f1(y + r)} L${f1(x + r)},${f1(y - r)}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;

/* 13 · El signo de medida y las líneas adicionales */
(() => { let b = tit(44, 'El signo de medida'); const M = [['4', '4', '4 negras', 'rock, pop'], ['3', '4', '3 negras', 'vals'], ['2', '4', '2 negras', 'marcha'], ['6', '8', '6 corcheas', 'balada 6/8'], ['12', '8', '12 corcheas', 'tresillos']], cw = 188, s = 22;
  M.forEach(([a, c, d, e], i) => { const x = 20 + i * (cw + 3), top = 92; b += rect(x, 66, cw - 4, 250, C.PANEL, '#4a3f2c') + pent(x + 26, x + cw - 30, top + 6, s);
    b += txt(x + cw / 2 - 2, top + 6 + 2 * s - 3, a, { serif: 1, size: 54, w: 700 }) + txt(x + cw / 2 - 2, top + 6 + 4 * s - 3, c, { serif: 1, size: 54, w: 700 }) + txt(x + cw / 2 - 2, 240, d, { size: 22, w: 700, fill: C.GOLD }) + txt(x + cw / 2 - 2, 276, e, { size: 20, w: 600, fill: C.MUTE }); });
  b += nota(352, 'Arriba: cuántos pulsos tiene el compás') + nota(386, 'Abajo: qué figura vale un pulso (4 = negra, 8 = corchea)');
  b += tit(450, 'Las líneas adicionales'); const s2 = 34, top = 540, bot = top + 4 * s2; b += pent(30, 970, top, s2) + clavePerc(50, top, s2);
  const I = [['hi-hat', 9, 1, 0], ['crash', 10, 1, 1], ['crash|más arriba', 12, 1, 2], ['hi-hat|con el pie', -1, 1, 0], ['nota|debajo', -2, 0, 1]];
  I.forEach(([n, st, x_, led], i) => { const x = 190 + i * 170, y = bot - st * s2 / 2;
    for (let k = 1; k <= led; k++) { const ly = st > 0 ? top - k * s2 : bot + k * s2; b += `<line x1="${x - 34}" y1="${ly}" x2="${x + 34}" y2="${ly}" stroke="${C.GOLD}" stroke-width="4"/>`; }
    b += x_ ? xmark(x, y, s2 * .45, C.IV) : cabeza(x, y, s2, C.IV, false);
    n.split('|').forEach((l, k) => b += txt(x, bot + 110 + k * 30, l, { size: k ? 20 : 23, w: k ? 600 : 700, fill: k ? C.MUTE : led ? C.GOLD : C.IV })); });
  b += nota(bot + 190, 'Las rayitas doradas son las líneas adicionales') + nota(bot + 224, 'Sirven para escribir arriba o abajo del pentagrama');
  out('B2_medida', bot + 254, 'El signo de medida y las líneas adicionales', b); })();

/* 13 · Hi-hat cerrado y abierto · ritmo básico #5 */
(() => { let b = ''; const hh = (cx, abierto, t1, t2, sim) => { const sep = abierto ? 34 : 12, y = 110;
    let s = `<line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + 150}" stroke="${C.MUTE}" stroke-width="6"/>` + rect(cx - 60, y + 150, 120, 20, '#4a3f2c', C.MUTE, 6, 2);
    s += `<ellipse cx="${cx}" cy="${y - sep / 2}" rx="150" ry="20" fill="#c9a227" stroke="${C.IV}" stroke-width="2.5"/><ellipse cx="${cx}" cy="${y + sep / 2}" rx="150" ry="20" fill="#a8861c" stroke="${C.IV}" stroke-width="2.5"/>`;
    s += `<circle cx="${cx + 175}" cy="${y - 50}" r="30" fill="${C.PANEL}" stroke="${C.GOLD}" stroke-width="3"/>` + txt(cx + 175, y - 38, sim, { size: 36, w: 700, fill: C.GOLD });
    return s + txt(cx, y + 230, t1, { size: 32, w: 700 }) + txt(cx, y + 268, t2, { size: 23, w: 600, fill: C.MUTE }); };
  b += hh(250, false, 'Cerrado', 'pie abajo · corto: «chik»', '+') + hh(720, true, 'Abierto', 'pie arriba · largo: «tsss»', 'o');
  b += nota(430, 'Para cerrar, bajo el pie izquierdo (PI) en el pulso siguiente', 1);
  b += tit(500, 'Ritmo básico #5'); const g = grilla(520, L8, [['Hi-hat', HH8.slice(0, 7).concat(['o'])], ['Redoblante', SN], ['Bombo', X([0, 4], 'PD')], ['Pie (PI)', X([0], 'PI')]], { marca: [7] }); b += g.b;
  b += nota(g.h + 40, 'o = hi-hat abierto en la «y» del 4 · el pie lo cierra en el 1');
  out('B2_hihat_abierto', g.h + 70, 'Hi-hat abierto y cerrado y el ritmo básico 5', b); })();

/* 14 · Redobles alternados en tresillos */
P('B2_tresillo', 'Redobles alternados en tresillos', [['Pulsos 1 y 2', ['1', 'o', 'la', '2', 'o', 'la'], [['Redoblante', ['D>', 'I', 'D', 'I>', 'D', 'I']]]], ['Pulsos 3 y 4', ['3', 'o', 'la', '4', 'o', 'la'], [['Redoblante', ['D>', 'I', 'D', 'I>', 'D', 'I']]]]],
  ['D I D · I D I — el acento (aro dorado) cambia de mano', 'Di «tri-o-la» en voz alta: las tres sílabas igual de largas']);

/* 16 · Redobles en semicorcheas */
const SC = ['D>', 'I', 'D', 'I', 'D>', 'I', 'D', 'I'];
P('B2_semicorcheas', 'Redobles en semicorcheas', [['Pulsos 1 y 2', ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a'], [['Redoblante', SC]]], ['Pulsos 3 y 4', ['3', 'e', 'y', 'a', '4', 'e', 'y', 'a'], [['Redoblante', SC]]]],
  ['D I D I — acento (aro dorado) en cada pulso', 'Empieza a 50 BPM: cuando salga parejo tres veces, sube 5 BPM']);

/* 17 · Patrones de rock: solo cambia el bombo */
const RK = (t, bo, m) => [t, L8, [['Hi-hat', HH8], ['Redoblante', SN], ['Bombo', X(bo, 'PD')]], { rh: 62, marca: m }];
P('B2_rock_bombo', 'Patrones de rock: el bombo cambia de lugar', [RK('A · ritmo básico #2', [0, 4]), RK('B · ritmo básico #3', [0, 4, 5], [5]), RK('C · ritmo básico #4', [0, 3, 4, 5], [3, 5]), RK('D · nuevo', [0, 1, 4, 6], [1, 6])],
  ['Hi-hat y redoblante siempre iguales · el marco dorado = el bombo que cambia']);

/* 18 · Desplazamiento: el hi-hat en las «y» */
const Y = X([1, 3, 5, 7], 'D');
P('B2_desplazamiento', 'Desplazamientos del hi-hat al contratiempo', [['A · bombo en cada pulso', L8, [['Hi-hat', Y], ['Bombo', X([0, 2, 4, 6], 'PD')]]], ['B · con el redoblante', L8, [['Hi-hat', Y], ['Redoblante', SN], ['Bombo', X([0, 4], 'PD')]]]],
  ['El pie o el redoblante marcan el pulso · la mano derecha espera su «y»']);

/* 19 · Fills de uno, dos y cuatro tiempos */
(() => { let b = ''; const F = [['Fill de 1 tiempo', [['1', 'ritmo'], ['2', 'ritmo'], ['3', 'ritmo'], ['4 e y a', 'Redoblante']]], ['Fill de 2 tiempos', [['1', 'ritmo'], ['2', 'ritmo'], ['3 e y a', 'Redoblante'], ['4 e y a', 'Tom 1']]], ['Fill de 4 tiempos', [['1 e y a', 'Redoblante'], ['2 e y a', 'Tom 1'], ['3 e y a', 'Tom 2'], ['4 e y a', 'Tom de piso']]]];
  const cw = 196; let y = 20;
  F.forEach(([t, c]) => { b += tit(y + 34, t); y += 52;
    c.forEach(([n, p], i) => { const x = 20 + i * (cw + 6), fill = p !== 'ritmo'; b += rect(x, y, cw, 110, fill ? '#3a2a10' : C.PANEL, fill ? C.GOLD : '#4a3f2c') + txt(x + cw / 2, y + 42, n, { size: 26, w: 700, fill: fill ? C.GOLD : C.MUTE }) + txt(x + cw / 2, y + 86, fill ? p : 'ritmo de rock', { size: p.length > 10 ? 21 : 24, w: 700, fill: fill ? C.IV : C.MUTE }); });
    const x = 20 + 4 * (cw + 6); b += rect(x, y, W - 20 - x, 110, '#4a1e1b', '#E5312B') + txt(x + (W - 20 - x) / 2, y + 42, '1', { size: 26, w: 700, fill: '#ff8a80' }) + txt(x + (W - 20 - x) / 2, y + 74, 'crash', { size: 21, w: 700 }) + txt(x + (W - 20 - x) / 2, y + 98, '+ bombo', { size: 19, w: 600, fill: C.MUTE });
    y += 140; });
  b += nota(y + 14, 'En cada tiempo del fill: 4 semicorcheas con las manos alternadas (D I D I)', 1) + nota(y + 54, 'Bajo de agudo a grave: redoblante → tom 1 → tom 2 → tom de piso');
  out('B2_fills', y + 84, 'Fills de uno, dos y cuatro tiempos', b); })();

/* 20 · Afinación en estrella y toms escalonados */
(() => { let b = ''; const cx = 250, cy = 250, R = 190, ORD = [1, 5, 3, 7, 2, 6, 4, 8], pos = n => { const i = ORD.indexOf(n), a = (-90 + i * 45) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
  b += `<circle cx="${cx}" cy="${cy}" r="${R + 12}" fill="#4a3f2c"/><circle cx="${cx}" cy="${cy}" r="${R - 14}" fill="#efe6d2"/>`;
  let d = ''; for (let n = 1; n <= 8; n++) { const [x, y] = pos(n); d += (n === 1 ? 'M' : 'L') + f1(x) + ',' + f1(y); } b += `<path d="${d}Z" fill="none" stroke="#E5312B" stroke-width="4" stroke-linejoin="round" opacity=".85"/>`;
  for (let n = 1; n <= 8; n++) { const [x, y] = pos(n); b += `<circle cx="${f1(x)}" cy="${f1(y)}" r="30" fill="${C.BG}" stroke="${C.GOLD}" stroke-width="4"/>` + txt(x, y + 12, n, { size: 32, w: 700, fill: C.GOLD }); }
  b += txt(cx, cy + R + 70, 'Tornillo por tornillo, en este orden', { size: 23, w: 700, fill: C.GOLD }) + txt(cx, cy + R + 104, '¼ de vuelta cada vez', { size: 22, w: 600, fill: C.MUTE });
  [['Tom 1', 'más agudo', 585, 150, 52], ['Tom 2', 'medio', 740, 240, 66], ['Tom de piso', 'más grave', 895, 340, 82]].forEach(([n, s, x, y, r], i) => {
    b += `<circle cx="${x}" cy="${y}" r="${r + 8}" fill="#4a3f2c"/><circle cx="${x}" cy="${y}" r="${r}" fill="#efe6d2"/>` + txt(x, y + r + 40, n, { size: 24, w: 700 }) + txt(x, y + r + 70, s, { size: 21, w: 600, fill: [C.GOLD, C.MUTE, '#7cc7ef'][i] }); });
  b += `<path d="M560,${92} L960,${92}" stroke="none"/>` + txt(745, 60, 'De agudo a grave, como una escalera', { size: 23, w: 700, fill: C.GOLD });
  b += nota(600, 'Más tensión = más agudo · menos tensión = más grave') + nota(636, 'La distancia entre toms es a gusto (suele ser una 3.ª o 4.ª, aproximadamente)');
  out('B2_afinacion', 666, 'Afinación en estrella y toms escalonados', b); })();

/* 21 · El puntillo y el shuffle: el largo del bloque es lo que dura */
(() => { let b = '', y = 20; const S = [['Negra con puntillo + corchea · 2 pulsos', ['1', 'y', '2', 'y'], [['D', 3, 'ta - a'], ['I', 1, 'ti']], '1½ + ½ = 2 pulsos'], ['Corchea con puntillo + semicorchea · 1 pulso', ['1', 'e', 'y', 'a'], [['D', 3, 'taa'], ['I', 1, 'ri']], '¾ + ¼ = 1 pulso'], ['Shuffle · tresillo sin la nota del medio', ['tri', 'o', 'la'], [['D', 2, 'tri'], ['D', 1, 'la']], 'largo – corto · en el hi-hat']];
  S.forEach(([t, cols, bl, f]) => { b += tit(y + 32, t); const x0 = 30, cw = 940 / cols.length; y += 50;
    cols.forEach((c, i) => { b += txt(x0 + (i + .5) * cw, y + 30, c, { size: 28, w: 700, fill: i === 0 || /^\d/.test(c) ? C.GOLD : C.MUTE }); if (i) b += `<line x1="${f1(x0 + i * cw)}" y1="${y + 44}" x2="${f1(x0 + i * cw)}" y2="${y + 150}" stroke="#4a3f2c" stroke-width="2" stroke-dasharray="6 6"/>`; });
    let x = x0; bl.forEach(([g, d, s]) => { b += rect(x + 4, y + 50, d * cw - 8, 90, EX[g][0], null, 14) + txt(x + 34, y + 106, g, { a: 'start', size: 28, w: 700, fill: '#fff' }) + txt(x + d * cw / 2 + 16, y + 106, s, { size: 28, w: 700, fill: '#fff' }); x += d * cw; });
    b += txt(W / 2, y + 186, f, { size: 25, w: 700, fill: C.IV }); y += 220; });
  b += nota(y + 10, 'El puntillo suma la mitad del valor de la figura');
  out('B2_puntillo', y + 40, 'El puntillo y el shuffle', b); })();

/* 22 · Estudio del bombo (en semicorcheas) */
const C16 = ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a', '3', 'e', 'y', 'a', '4', 'e', 'y', 'a'], HH16 = X([0, 2, 4, 6, 8, 10, 12, 14], 'D', 16), SN16 = X([4, 12], 'I', 16);
const BO = (t, bo, m) => [t, C16, [['Hi-hat', HH16], ['Redoblante', SN16], ['Bombo', X(bo, 'PD', 16)]], { lw: 160, rh: 58, r: 19, marca: m }];
P('B2_bombo', 'Estudio del bombo', [BO('1 · dos golpes seguidos en corcheas', [0, 2, 8], [2]), BO('2 · bombo en la «y» del 2', [0, 6, 8], [6]), BO('3 · dos golpes en semicorcheas', [0, 1, 8], [1]), BO('4 · bombo en la «a»', [0, 3, 8, 11], [3, 11])],
  ['Hi-hat en corcheas y redoblante en el 2 y el 4 · el marco dorado = el bombo nuevo', 'Antes de tocar, lo digo dos veces con «bum-chi-pa-chi»']);

/* 23 · Redoble cerrado: de semicorcheas a fusas */
(() => { let b = '', y = 20; [['Semicorcheas · dobles golpes · 4 por pulso', ['1', 'e', 'y', 'a'], 'DDII'], ['Fusas · dobles golpes · 8 por pulso', ['1', '', 'e', '', 'y', '', 'a', ''], 'DDIIDDII']].forEach(([t, cols, g]) => {
    b += tit(y + 32, t); y += 50; const cw = 940 / cols.length;
    cols.forEach((c, i) => { const x = 30 + i * cw; b += txt(x + cw / 2, y + 30, c, { size: 28, w: 700, fill: c === '1' ? C.GOLD : C.MUTE }) + rect(x + 4, y + 46, cw - 8, 100, EX[g[i]][0], null, 14) + txt(x + cw / 2, y + 112, g[i], { size: 40, w: 700, fill: '#fff' }); });
    y += 180; });
  b += rect(30, y, 940, 70, C.PANEL, C.GOLD) + txt(W / 2, y + 46, 'más rápido y más junto → «trrrrr»: redoble cerrado', { size: 26, w: 700, fill: C.GOLD });
  b += nota(y + 116, 'El segundo golpe de cada mano sale del rebote de la baqueta') + nota(y + 152, 'Sube el tempo poco a poco; si no sale limpio, baja el tempo');
  out('B2_fusas', y + 182, 'Redoble cerrado en fusas', b); })();

/* 24 · El mapa de la canción */
(() => { let b = ''; const M = [['Intro', '4 comp.', 'hi-hat solo', 'p', 0], ['Estrofa', '8 comp.', 'ritmo suave', 'mp', 1], ['Coro', '8 comp.', 'ritmo con crash', 'f', 2], ['Estrofa', '8 comp.', 'ritmo suave', 'mp', 1], ['Coro', '8 comp.', 'ritmo con crash', 'f', 2], ['Final', '2 comp.', 'crash + bombo', 'ff', 3]];
  const K = [[C.PANEL, '#4a3f2c', C.MUTE], ['#1d3550', '#2F6FD8', '#7cc7ef'], ['#3a2a10', C.GOLD, C.GOLD], ['#4a1e1b', '#E5312B', '#ff8a80']], cw = 300, ch = 230;
  M.forEach(([n, c, r, d, k], i) => { const x = 20 + (i % 3) * (cw + 20), y = 64 + Math.floor(i / 3) * (ch + 60), [f, s, a] = K[k];
    if (i) b += `<path d="M${x - 10},${y - 14} l14,-24 l14,24 Z" fill="${C.GOLD}"/>` + txt(x + 30, y - 16, 'fill', { a: 'start', size: 20, w: 700, fill: C.GOLD });
    b += rect(x, y, cw, ch, f, s) + txt(x + 24, y + 46, (i + 1) + ' · ' + n, { a: 'start', size: 30, w: 700 }) + txt(x + 24, y + 84, c, { a: 'start', size: 23, w: 600, fill: C.MUTE }) + txt(x + 24, y + 124, r, { a: 'start', size: 24, w: 700, fill: a });
    b += txt(x + cw - 30, y + ch - 26, d, { a: 'end', serif: 1, size: 56, w: 700, fill: a }); });
  const y = 64 + 2 * (ch + 60); b += nota(y + 10, '▲ fill = un relleno que anuncia la parte nueva', 1) + nota(y + 50, 'p, mp, f, ff son las dinámicas: de suave a muy fuerte');
  out('B2_mapa', y + 80, 'Mapa de una canción para la batería', b); })();
console.log('ok batería 2:', fs.readdirSync(OUT).filter(f => /^B2_/.test(f)).length, 'láminas');
