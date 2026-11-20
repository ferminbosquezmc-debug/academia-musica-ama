/* Láminas técnicas de Batería Nivel 3 (clases 25 a 36) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (bateria/img/B3_*.svg). «D>» = acento (aro dorado), «(I)» = nota fantasma.
   Uso: node tecnicas_bateria3.js → img_bateria/B3_*.svg */
const fs = require('fs'), path = require('path');
const { C, W, txt, svg, f1 } = require('./tecnicas_motor.js');
const { EX, golpe, grilla, pasos, L8, HH8 } = require('./tecnicas_bateria1.js');
const OUT = path.join(__dirname, 'img_bateria'); fs.mkdirSync(OUT, { recursive: true });
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const P = (n, label, bloques, fin) => { const r = pasos(bloques, fin); out(n, r.h, label, r.b); };
const rect = (x, y, w, h, fill, stroke, rx = 16, sw = 2.5) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;
const tit = (y, t) => txt(30, y, t, { a: 'start', size: 30, w: 700, fill: C.GOLD });
const nota = (y, t, gold) => txt(W / 2, y, t, { size: 24, w: 600, fill: gold ? C.GOLD : C.MUTE });
const X = (i, v, n = 8) => Array.from({ length: n }, (_, j) => i.includes(j) ? v : ''), SN = X([2, 6], 'I');
const C16 = ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a', '3', 'e', 'y', 'a', '4', 'e', 'y', 'a'], HH16 = X([0, 2, 4, 6, 8, 10, 12, 14], 'D', 16);
const O16 = { lw: 160, rh: 60, r: 19 }, Q = (a, b) => a.split(' ').concat(b ? b.split(' ') : []);
/* tarjetas en rejilla: [[titulo, sub, texto, color]] */
const tarjetas = (y0, items, cols, h, o = {}) => { let b = ''; const gap = 16, cw = (W - 40 - gap * (cols - 1)) / cols;
  items.forEach(([a, s, d, col], i) => { const x = 20 + (i % cols) * (cw + gap), y = y0 + Math.floor(i / cols) * (h + gap);
    b += rect(x, y, cw, h, o.fill ? col : C.PANEL, col, 18, 3) + (s ? txt(x + 24, y + 42, s, { a: 'start', size: 22, w: 700, fill: o.fill ? '#fff' : col }) : '') + txt(x + 24, y + (s ? 90 : 52), a, { a: 'start', size: o.big || 34, w: 700, fill: '#fff' });
    (d || '').split('|').forEach((l, k) => b += txt(x + 24, y + (s ? 132 : 94) + k * 32, l, { a: 'start', size: 22, w: 600, fill: o.fill ? '#fff' : C.MUTE })); });
  return { b, h: y0 + Math.ceil(items.length / cols) * (h + gap) }; };

/* 25 · El paradiddle y el ostinato */
const PD = ['D>', 'I', 'D', 'D', 'I>', 'D', 'I', 'I'];
P('B3_paradiddle', 'El paradiddle y el ostinato', [['Paradiddle · pulsos 1 y 2', Q('1 e y a 2 e y a'), [['Redoblante', PD]]], ['Pulsos 3 y 4 · se repite', Q('3 e y a 4 e y a'), [['Redoblante', PD]]],
  ['Ostinato · la mano izquierda lee', L8, [['Ride', HH8], ['Redoblante', X([1, 3, 4, 7], 'I')], ['Bombo', X([0, 4], 'PD')], ['Hi-hat (pie)', X([2, 6], 'PI')]], { rh: 64 }]],
  ['D I D D · I D I I — acento en el primero de cada grupo', 'Ride, bombo y pie no cambian; solo cambia la I']);

/* 26 · La clave 3-2 y 2-3 */
const CL = { rh: 70 };
P('B3_clave', 'La clave 3-2 y 2-3', [['Clave 3-2 · compás 1: 3 golpes', L8, [['Aro', X([0, 3, 6], 'I')]], CL], ['Clave 3-2 · compás 2: 2 golpes', L8, [['Aro', X([2, 4], 'I')]], CL],
  ['Clave 2-3 · compás 1: 2 golpes', L8, [['Aro', X([2, 4], 'I')]], CL], ['Clave 2-3 · compás 2: 3 golpes', L8, [['Aro', X([0, 3, 6], 'I')]], CL]],
  ['Toda la banda en la misma dirección de la clave', 'Antes de empezar, pregunta al director: ¿3-2 o 2-3?']);

/* 27 · Notas fantasma, flam y drag */
(() => { let b = tit(44, 'Notas fantasma en el redoblante'); const g = grilla(64, C16, [['Redoblante', X([4, 12], 'I>', 16).map((v, i) => [7, 9, 14].includes(i) ? '(I)' : v)]], { lw: 160, rh: 80, r: 22 }); b += g.b;
  b += nota(g.h + 36, 'Aro dorado = fuerte · círculo punteado = fantasma, apenas se oye') + nota(g.h + 70, 'Baqueta del fantasma a 1–2 cm del parche (aproximado)');
  const y = g.h + 120; b += tit(y + 30, 'Flam y drag');
  const adorno = (x, cy, k) => `<circle cx="${x}" cy="${cy}" r="20" fill="${C.BG}" stroke="${EX[k][0]}" stroke-width="4"/>` + txt(x, cy + 8, k, { size: 20, w: 700, fill: EX[k][0] });
  [['Flam', 1, 'una nota de adorno pegada'], ['Drag', 2, 'dos notas de adorno pegadas']].forEach(([n, k, d], i) => { const x = 20 + i * 490, cy = y + 160;
    b += rect(x, y + 56, 470, 250, C.PANEL, '#4a3f2c', 18) + txt(x + 24, y + 100, n, { a: 'start', size: 34, w: 700 });
    for (let j = 0; j < k; j++) b += adorno(x + 150 + j * 52 - (k - 1) * 26, cy + 20, 'I');
    b += golpe(x + 300, cy + 20, 'D>', 46) + txt(x + 235, y + 270, d, { size: 22, w: 600, fill: C.MUTE }); });
  b += nota(y + 350, 'Adorno: baqueta baja (I) · principal: baqueta alta (D), casi juntas');
  out('B3_ghost', y + 380, 'Notas fantasma, flam y drag', b); })();

/* 28 · Redoble de cinco golpes y fill en tresillos */
P('B3_cinco', 'Redoble de cinco golpes y fill en tresillos', [['Redoble de 5 · empieza la D', Q('1 e y a 2 e y a'), [['Redoblante', ['D', 'D', 'I', 'I', 'D>', '', '', '']]]], ['Luego empieza la I', Q('3 e y a 4 e y a'), [['Redoblante', ['I', 'I', 'D', 'D', 'I>', '', '', '']]]],
  ['Fill de 2 tiempos en tresillos', ['3', 'o', 'la', '4', 'o', 'la', '1'], [['Redoblante', ['D', 'I', 'D', '', '', '', '']], ['Tom 1', X([3], 'I', 7)], ['Tom 2', X([4], 'D', 7)], ['Tom de piso', X([5], 'I', 7)], ['Crash', X([6], 'D', 7)], ['Bombo', X([6], 'PD', 7)]], { rh: 58, marca: [6] }]],
  ['Dos dobles golpes y un acento: D D I I D', 'El fill baja por los toms y cierra con crash + bombo en el 1']);

/* 29 · Reggae, ska y dembow */
P('B3_reggae', 'Reggae, ska y dembow', [['Reggae · one drop', L8, [['Hi-hat', HH8], ['Aro', X([4], 'I')], ['Bombo', X([4], 'PD')]], { rh: 62, marca: [4] }], ['Ska', L8, [['Hi-hat', X([1, 3, 5, 7], 'D')], ['Redoblante', SN], ['Bombo', X([0, 4], 'PD')]], { rh: 62 }],
  ['Dembow · 3 + 3 + 2', C16, [['Redoblante', X([3, 6, 11, 14], 'I', 16)], ['Bombo', X([0, 4, 8, 12], 'PD', 16)]], O16]],
  ['One drop: el 1 queda vacío; bombo y aro caen juntos en el 3', 'Ska: hi-hat solo en las «y» · dembow: bombo en los 4 pulsos']);

/* 30 · El funk */
P('B3_funk', 'El funk', [['El funk', C16, [['Hi-hat', HH16], ['Redoblante', X([4, 12], 'I>', 16).map((v, i) => [7, 9, 14].includes(i) ? '(I)' : v)], ['Bombo', X([0, 3, 10], 'PD', 16)]], Object.assign({ marca: [3, 10] }, O16)]],
  ['Redoblante fuerte en 2 y 4 · punteado = notas fantasma', 'Bombo en el 1, la «a» del 1 y la «y» del 3: no cae en el 3']);

/* 31 · Mitad de tiempo, normal y doble tiempo */
const TP = (t, sn, bo) => [t, L8, [['Hi-hat', HH8], ['Redoblante', X(sn, 'I')], ['Bombo', X(bo, 'PD')]], { rh: 62 }];
P('B3_tiempos', 'Mitad de tiempo, tiempo normal y doble tiempo', [TP('Mitad de tiempo · se siente lento', [4], [0]), TP('Normal · el rock de siempre', [2, 6], [0, 4]), TP('Doble tiempo · se siente rápido', [1, 3, 5, 7], [0, 2, 4, 6])],
  ['El mismo tempo del metrónomo, tres sensaciones distintas', 'Solo cambian el redoblante y el bombo']);

/* 32 · Plan de un solo de ocho compases */
(() => { let b = tit(44, 'Mi solo · 8 compases');
  const t = tarjetas(66, [['Idea', 'compases 1–2', 'un ritmo corto en|el redoblante', '#2AA7E8'], ['Repetición', 'compases 3–4', 'la misma idea,|cambiando el final', '#2E9E4F'], ['Subida', 'compases 5–6', 'más fuerte,|por los toms', '#F57C00'], ['Final', 'compases 7–8', 'redoble de 5 golpes|+ crash y bombo', '#E5312B']], 2, 200, { fill: 1 }); b += t.b;
  let y = t.h + 30; b += tit(y + 30, '«Cuatro y cuatro»'); y += 56; const cw = (W - 40 - 3 * 12) / 4;
  for (let i = 0; i < 8; i++) { const x = 20 + (i % 4) * (cw + 12), yy = y + Math.floor(i / 4) * 112, yo = i >= 4;
    b += rect(x, yy, cw, 100, yo ? '#3a2a10' : C.PANEL, yo ? C.GOLD : '#4a3f2c') + txt(x + cw / 2, yy + 42, i + 1, { size: 30, w: 700, fill: yo ? C.GOLD : C.MUTE }) + txt(x + cw / 2, yy + 80, yo ? 'yo' : 'profesor', { size: 23, w: 700, fill: yo ? C.IV : C.MUTE }); }
  y += 270; b += nota(y, 'El profesor toca 4 compases y yo respondo con 4; la banda sigue el pulso') + nota(y + 38, 'Consejo: deja silencios y vuelve siempre al 1 con fuerza', 1);
  out('B3_solo', y + 70, 'Plan de un solo de ocho compases', b); })();

/* 33 · Un chart de batería (sin colores, como lo leen los músicos) */
(() => { let b = ''; const IV = C.IV, bw = (W - 60) / 4, sl = '/ / / /';
  const fila = (y, sec, num, cel, extra = {}) => { let s = txt(30, y - 14, sec, { a: 'start', size: 28, w: 700, fill: IV }) + (num ? rect(30 + sec.length * 17 + 20, y - 44, 40, 40, 'none', IV, 4, 2.5) + txt(30 + sec.length * 17 + 40, y - 14, num, { size: 26, w: 700, fill: IV }) : '') + (extra.tempo ? txt(W - 30, y - 14, extra.tempo, { a: 'end', size: 26, w: 700, fill: IV }) : '');
    s += `<line x1="30" y1="${y}" x2="${W - 30}" y2="${y}" stroke="${IV}" stroke-width="2"/><line x1="30" y1="${y + 100}" x2="${W - 30}" y2="${y + 100}" stroke="${IV}" stroke-width="2"/>`;
    cel.forEach((c, i) => { const x = 30 + i * bw; s += `<line x1="${f1(x + bw)}" y1="${y}" x2="${f1(x + bw)}" y2="${y + 100}" stroke="${IV}" stroke-width="${i === 3 && extra.fin ? 6 : 2.5}"/>`;
      if (c.c) s += `<line x1="${f1(x + 6)}" y1="${y - 4}" x2="${f1(x + 6)}" y2="${y - 34}" stroke="${IV}" stroke-width="2.5"/><line x1="${f1(x + 6)}" y1="${y - 34}" x2="${f1(x + bw - 14)}" y2="${y - 34}" stroke="${IV}" stroke-width="2.5"/>` + txt(x + 18, y - 10, c.c, { a: 'start', size: 22, w: 700, fill: IV });
      if (c.ri) s += `<rect x="${f1(x + 6)}" y="${y}" width="5" height="100" fill="${IV}"/><circle cx="${f1(x + 22)}" cy="${y + 38}" r="5" fill="${IV}"/><circle cx="${f1(x + 22)}" cy="${y + 62}" r="5" fill="${IV}"/>`;
      if (c.rf) s += `<rect x="${f1(x + bw - 9)}" y="${y}" width="5" height="100" fill="${IV}"/><circle cx="${f1(x + bw - 24)}" cy="${y + 38}" r="5" fill="${IV}"/><circle cx="${f1(x + bw - 24)}" cy="${y + 62}" r="5" fill="${IV}"/>`;
      s += txt(x + bw / 2, y + 64, c.t, { size: c.t === '%' ? 40 : 28, w: 700, fill: IV, serif: c.t === '%' ? 1 : 0 });
      if (c.d) s += txt(x + bw / 2, y + 134, c.d, { size: 22, w: 700, fill: IV }); });
    return s; };
  b += fila(70, 'Intro', '', [{ t: sl }, { t: '%' }, { t: '%' }, { t: '%' }], { tempo: '♩ = 90' });
  b += fila(250, 'Estrofa', '1', [{ t: sl, ri: 1 }, { t: '%' }, { t: '%', c: '1.', rf: 1 }, { t: 'fill', c: '2.' }]);
  b += fila(430, 'Coro', '2', [{ t: 'crash', d: '' }, { t: '%' }, { t: '%', d: 'Fine' }, { t: 'fill', d: 'D.C. al Fine' }], { fin: 1 });
  b += txt(30, 640, 'Cómo se lee', { a: 'start', size: 30, w: 700, fill: C.GOLD });
  const L = [['%', 'repite el compás anterior'], [sl, 'sigue el ritmo, a tu manera'], ['||: :||', 'repite la parte encerrada'], ['1.  2.', 'casillas: 1.ª vez y 2.ª vez'], ['D.C.', 'vuelve al principio'], ['Fine', 'aquí termina la canción']];
  L.forEach(([s, d], i) => { const y = 690 + i * 52; b += txt(140, y, s, { size: 28, w: 700, fill: C.GOLD, serif: s === '%' ? 1 : 0 }) + txt(250, y, d, { a: 'start', size: 24, w: 600, fill: C.IV }); });
  b += nota(1030, 'Recorro el chart con el dedo antes de tocar: digo cada sección y cada salto');
  out('B3_chart', 1060, 'Un chart de batería completo', b); })();

/* 34 · Tocar con la banda */
(() => { let b = tit(44, 'Bombo y bajo: juntos'); const g = grilla(64, L8, [['Bajo', []], ['Bombo', X([0, 3, 4], 'PD')], ['Click', []]], { rh: 70 }); b += g.b; const x0 = 220, cw = (W - 30 - x0) / 8;
  [0, 3, 4].forEach(i => b += `<circle cx="${f1(x0 + (i + .5) * cw)}" cy="${64 + 50 + 35}" r="24" fill="#E07A2E" stroke="${C.IV}" stroke-width="2.5"/>` + txt(x0 + (i + .5) * cw, 64 + 50 + 35 + 10, '♪', { size: 28, w: 700, fill: '#fff' }));
  [0, 2, 4, 6].forEach(i => b += `<circle cx="${f1(x0 + (i + .5) * cw)}" cy="${64 + 50 + 175}" r="10" fill="${C.GOLD}"/>`);
  b += nota(g.h + 36, 'Cuando el bajo y el bombo coinciden, la banda suena «pegada»') + nota(g.h + 70, 'El click marca el pulso: si me separo, vuelvo poco a poco');
  const y = g.h + 120; b += tit(y + 30, 'Señales del director');
  const S = [['✊', 'Corte', 'puño cerrado:|todos paran juntos'], ['🔁', 'Repetir', 'dedo que gira:|otra vuelta'], ['⬇', 'Más suave', 'palma hacia abajo'], ['⬆', 'Más fuerte', 'palma hacia arriba'], ['☝', 'Al inicio', 'señala arriba: vuelve|al principio']];
  const gap = 14, w3 = (W - 40 - 2 * gap) / 3; S.forEach(([e, n, d], i) => { const x = 20 + (i % 3) * (w3 + gap), yy = y + 56 + Math.floor(i / 3) * 214;
    b += rect(x, yy, w3, 200, C.PANEL, '#4a3f2c', 18) + txt(x + w3 / 2, yy + 66, e, { size: 48, w: 400 }) + txt(x + w3 / 2, yy + 116, n, { size: 28, w: 700, fill: C.GOLD });
    d.split('|').forEach((l, k) => b += txt(x + w3 / 2, yy + 152 + k * 28, l, { size: 20, w: 600, fill: C.MUTE })); });
  b += nota(y + 56 + 2 * 214 + 20, 'Las señales pueden cambiar en cada banda: lo importante es acordarlas antes');
  out('B3_banda', y + 56 + 2 * 214 + 50, 'Tocar con la banda', b); })();

/* 35 · Montaje del kit y lista del ensayo general */
(() => { let b = tit(44, 'Monto el kit en este orden'); const K = [['Banco', 1, 500, 500, 44, 0], ['Bombo', 2, 500, 330, 78, 0], ['Hi-hat', 3, 270, 330, 52, 1], ['Redoblante', 4, 365, 420, 50, 0], ['Tom 1', 5, 430, 190, 42, 0], ['Tom 2', 5, 570, 190, 46, 0], ['Tom de piso', 6, 680, 410, 62, 0], ['Crash', 7, 250, 165, 58, 1], ['Ride', 7, 770, 210, 64, 1]];
  K.forEach(([n, k, x, y, r, pl]) => { b += `<circle cx="${x}" cy="${y}" r="${r}" fill="${pl ? '#a8861c' : '#efe6d2'}" stroke="${pl ? C.GOLD : '#4a3f2c'}" stroke-width="5"/>` + (n === 'Banco' ? '' : '') +
    `<circle cx="${x + r * .72}" cy="${y - r * .72}" r="20" fill="${C.BG}" stroke="${C.GOLD}" stroke-width="3"/>` + txt(x + r * .72, y - r * .72 + 8, k, { size: 22, w: 700, fill: C.GOLD }) + txt(x, y + 8, n, { size: n.length > 7 ? 17 : 20, w: 700, fill: C.BG }); });
  b += txt(900, 520, 'vista desde arriba', { a: 'end', size: 20, w: 600, fill: C.MUTE });
  const t = tarjetas(570, [['Montaje', '', 'banco a la altura de las rodillas|pedales cómodos, todo a mano', C.GOLD], ['Memoria', '', 'repaso por secciones y|sé qué viene después', '#2AA7E8'], ['Nervios', '', 'respiro 4 tiempos y suelto 4|cuento antes de empezar', '#2E9E4F'], ['Oído', '', 'tapones para músicos y|volumen moderado', '#E5312B']], 2, 170, { big: 30 }); b += t.b;
  out('B3_ensayo', t.h + 10, 'Montaje del kit y lista del ensayo general', b); })();

/* 36 · Programa de la presentación final */
(() => { let b = tit(44, 'El programa de mi concierto');
  const t = tarjetas(66, [['Rudimentos', '1', 'paradiddle, redoble de 5|y flam, de lento a rápido', '#2AA7E8'], ['Tres estilos', '2', 'funk, reggae, ska, dembow,|cumbia o bossa nova', '#2E9E4F'], ['Canción con banda', '3', 'leo el chart y sigo las|señales del director', '#F57C00'], ['Mi solo', '4', 'idea, repetición, subida|y final con crash y bombo', '#E5312B']], 2, 200, { big: 30 }); b += t.b;
  b += nota(t.h + 26, 'Antes: afino, monto el kit y respiro', 1) + nota(t.h + 62, 'Después: saludo, agradezco y recojo mi equipo');
  out('B3_final', t.h + 92, 'Programa de la presentación final', b); })();
console.log('ok batería 3:', fs.readdirSync(OUT).filter(f => /^B3_/.test(f)).length, 'láminas');
