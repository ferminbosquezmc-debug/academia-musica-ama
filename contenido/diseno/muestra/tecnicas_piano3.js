/* Láminas técnicas de Piano Nivel 3 (clases 25 a 36) con el estilo nuevo y formato para teléfono.
   Mismos nombres que en la plataforma (piano/img/P3_*.svg). Uso: node tecnicas_piano3.js → img_piano/P3_*.svg */
const fs = require('fs'), path = require('path');
const { C, NOTA, W, txt, svg, f1 } = require('./tecnicas_motor.js');
const { gran } = require('./tecnicas_gran.js'), { teclado, circ } = require('./tecnicas_teclado.js');
const OUT = path.join(__dirname, 'img_piano');
const out = (n, h, label, b) => fs.writeFileSync(path.join(OUT, n + '.svg'), svg(h, label, b));
const DK = '#1b1206';
const card = (x, y, w, h, on, col) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${on ? '#3a2a10' : C.PANEL}" stroke="${col || (on ? C.GOLD : '#4a3f2c')}" stroke-width="2.5"/>`;
const q = (p, o = {}) => Object.assign({ p, d: 'q' }, o), h = (p, o = {}) => Object.assign({ p, d: 'h' }, o), w = (p, o = {}) => Object.assign({ p, d: 'w' }, o), e = (p, o = {}) => Object.assign({ p, d: 'e' }, o), hd = (p, o = {}) => Object.assign({ p, d: 'h.' }, o);
const ch = (ps, d, o = {}) => Object.assign({ ps, d }, o);
const dd = (evs, ds) => evs.map((x, i) => Object.assign(x, { f: String(ds[i]) }));
const wrap = (s, n) => { const w = s.split(' '), L = ['']; w.forEach(p => { if ((L[L.length - 1] + ' ' + p).trim().length > n) L.push(p); else L[L.length - 1] = (L[L.length - 1] + ' ' + p).trim(); }); return L; };

/* 25 · Mayor y menor: las relativas */
(() => { let b = ''; [['Do mayor', 'T T S T T T S', 0, 'TTSTTTS'], ['La menor', 'T S T T S T T', 5, 'TSTTSTT']].forEach(([t, f, ini, ts], j) => { const y = 20 + j * 400;
    b += card(20, y, W - 40, 380) + txt(50, y + 52, t, { a: 'start', serif: 1, size: 40, w: 700, fill: C.GOLD }) + txt(W - 50, y + 50, f, { a: 'end', size: 26, w: 700 });
    const col = {}; for (let i = 0; i < 8; i++) col[i] = null; const k = teclado({ x: 50, y: y + 170, n: 8, kw: 112, h: 180, ini, todos: true, fz: 20 }); b += k.b;
    b += `<rect x="51.5" y="${y + 278}" width="109" height="72" rx="6" fill="${C.GOLD}" opacity=".5"/><rect x="${50 + 7 * 112 + 1.5}" y="${y + 278}" width="109" height="72" rx="6" fill="${C.GOLD}" opacity=".5"/>`;
    ts.split('').forEach((c, i) => { const a = k.kx(i), z = k.kx(i + 1), S = c === 'S'; b += `<path d="M${a},${y + 156} Q${(a + z) / 2},${y + 118} ${z},${y + 156}" fill="none" stroke="${S ? C.GOLD : C.LINE}" stroke-width="4"/>` + circ((a + z) / 2, y + 104, 19, c, { fill: S ? C.GOLD : C.PANEL, stroke: S ? DK : C.LINE, tx: S ? DK : C.IV, size: 22 }); }); });
  b += txt(W / 2, 850, 'Las mismas teclas blancas, distinta nota «casa»', { size: 26, w: 600, fill: C.MUTE });
  out('P3_mayor_menor', 880, 'Mayor y menor: las relativas', b); })();

/* 25 · Canción de la luna (3/4) */
(() => { const Am = ['LA2', 'DO3', 'MI3'], Dm = ['LA2', 'RE3', 'FA3'], Em = ['SOL2', 'SI2', 'MI3'];
  const r = gran({ medidas: [{ c: 'Am', s: dd([q('LA4'), q('DO5'), q('MI5')], [1, 3, 5]), f: [ch(Am, 'h.')] }, { c: 'Dm/A', s: dd([hd('RE5')], [4]), f: [ch(Dm, 'h.')] }, { c: 'Am', s: dd([q('DO5'), q('SI4'), q('LA4')], [3, 2, 1]), f: [ch(Am, 'h.')] }, { c: 'Em/G', s: dd([hd('SI4')], [2]), f: [ch(Em, 'h.')] },
    { c: 'Am', s: dd([q('LA4'), q('DO5'), q('MI5')], [1, 3, 5]), f: [ch(Am, 'h.')] }, { c: 'Dm/A', s: dd([h('RE5'), q('DO5')], [4, 3]), f: [ch(Dm, 'h.')] }, { c: 'Em/G', s: dd([q('MI5'), q('RE5'), q('SI4')], [5, 4, 2]), f: [ch(Em, 'h.')] }, { c: 'Am', s: dd([hd('LA4')], [1]), f: [ch(Am, 'h.')] }], compas: ['3', '4'], filasS: [['f', 'dedo']], cifra: true });
  out('P3_cancion_luna', r.h, 'Canción de la luna en La menor', r.b); })();

/* 26 · Intervalos clasificados */
(() => { const I = [['RE♭4', '2.ª menor', 1], ['RE4', '2.ª mayor', 2], ['MI♭4', '3.ª menor', 3], ['MI4', '3.ª mayor', 4], ['FA4', '4.ª justa', 5], ['SOL4', '5.ª justa', 7], ['LA♭4', '6.ª menor', 8], ['LA4', '6.ª mayor', 9], ['SI♭4', '7.ª menor', 10], ['SI4', '7.ª mayor', 11], ['DO5', '8.ª justa', 12]];
  const r = gran({ medidas: I.map(([p, n, sm]) => ({ s: [ch(['DO4', p], 'w', { f: n, sil: 'DO – ' + p.replace(/\d/, ''), cnt: sm + ' semit.' })] })), porLinea: 4, chipsS: false, filasS: [['f', ''], ['sil', ''], ['cnt', '']], sinCompas: true });
  out('P3_intervalos', r.h + 20, 'Intervalos clasificados', r.b + txt(W / 2, r.h, 'El número se cuenta con las notas · la especie, con los semitonos', { size: 22, w: 600, fill: C.MUTE })); })();

/* 26 · Escala de Do con las dos manos juntas */
(() => { const up = ['DO4', 'RE4', 'MI4', 'FA4', 'SOL4', 'LA4', 'SI4', 'DO5'], dn = ['DO3', 'SI2', 'LA2', 'SOL2', 'FA2', 'MI2', 'RE2', 'DO2'], par = ['DO3', 'RE3', 'MI3', 'FA3', 'SOL3', 'LA3', 'SI3', 'DO4'];
  const md = [1, 2, 3, 1, 2, 3, 4, 5], mi1 = [1, 2, 3, 1, 2, 3, 4, 5], mi2 = [5, 4, 3, 2, 1, 3, 2, 1], m = (ps, ds, a) => ps.slice(a, a + 4).map((p, i) => q(p, { f: String(ds[a + i]) }));
  let b = txt(30, 40, 'Movimiento contrario: los mismos dedos a la vez', { a: 'start', size: 26, w: 700, fill: C.GOLD });
  const a = gran({ medidas: [{ s: m(up, md, 0), f: m(dn, mi1, 0) }, { s: m(up, md, 4), f: m(dn, mi1, 4) }], filasS: [['f', 'MD']], filasF: [['f', 'MI']], chipsS: false, y0: 40 }); b += a.b;
  b += txt(30, a.h + 20, 'Paralelo: los pulgares pasan en distinto momento', { a: 'start', size: 26, w: 700, fill: C.GOLD });
  const p = gran({ medidas: [{ s: m(up, md, 0), f: m(par, mi2, 0) }, { s: m(up, md, 4), f: m(par, mi2, 4) }], filasS: [['f', 'MD']], filasF: [['f', 'MI']], chipsS: false, y0: a.h + 20 }); b += p.b;
  out('P3_manos_juntas', p.h, 'Escala de Do con las dos manos juntas', b); })();

/* 27 · Legato, staccato y frase */
(() => { const r = gran({ medidas: [{ s: [q('MI4', { frase: 2, sil: 'PA' }), q('RE4', { sil: 'ra' }), q('MI4', { frase: 2, sil: 'PA' }), q('RE4', { sil: 'ra' })] }, { s: [q('FA4', { frase: 3 }), q('MI4'), h('RE4')] }, { s: [q('DO4', { stac: 1 }), q('MI4', { stac: 1 }), q('SOL4', { stac: 1 }), q('MI4', { stac: 1 })] }, { s: [q('RE4', { frase: 4 }), q('MI4'), q('FA4'), q('RE4')] }, { s: [w('DO4')] }], chipsS: false, filasS: [['sil', '']] });
  let b = r.b; [['Caída y elevación', '«PA-ra»: peso y se levanta'], ['Staccato (punto)', 'corta, con rebote'], ['Legato (curva)', 'notas unidas'], ['Frase', 'pregunta (1–2) y respuesta (3–5)']].forEach(([a, z], i) => { const y = r.h + 10 + i * 52; b += txt(40, y, a, { a: 'start', size: 26, w: 700, fill: C.GOLD }) + txt(W - 40, y, z, { a: 'end', size: 26, w: 600 }); });
  out('P3_articulacion', r.h + 220, 'Legato, staccato y frase', b); })();

/* 28 · Inversiones y séptima de dominante */
(() => { let b = ''; const a = gran({ medidas: [['C', ['DO4', 'MI4', 'SOL4'], 'fundamental'], ['C/E', ['MI4', 'SOL4', 'DO5'], '1.ª inversión'], ['C/G', ['SOL4', 'DO5', 'MI5'], '2.ª inversión'], ['G7', ['SOL4', 'SI4', 'RE5', 'FA5'], 'SOL-SI-RE-FA']].map(([n, ps, t]) => ({ s: [ch(ps, 'w', { f: n, sil: t })] })), porLinea: 2, chipsS: false, filasS: [['f', ''], ['sil', '']], sinCompas: true }); b += a.b;
  b += txt(30, a.h + 10, 'G7 pide volver a C', { a: 'start', size: 28, w: 700, fill: C.GOLD });
  const g = gran({ medidas: [{ s: [ch(['DO4', 'MI4', 'SOL4'], 'w', { f: 'C', sil: '1-3-5' })] }, { s: [ch(['SI3', 'FA4', 'SOL4'], 'w', { f: 'G7/B', sil: '1-4-5' })] }, { s: [ch(['DO4', 'MI4', 'SOL4'], 'w', { f: 'C', sil: '1-3-5' })] }], porLinea: 3, chipsS: false, filasS: [['f', ''], ['sil', 'dedos']], sinCompas: true, y0: a.h + 20 }); b += g.b;
  b += txt(W / 2, g.h + 10, 'SI sube a DO (la sensible) · FA baja a MI', { size: 26, w: 600, fill: C.GOLD });
  out('P3_inversiones_g7', g.h + 40, 'Inversiones y séptima de dominante', b); })();

/* 29 · La familia de acordes I – IV – V7 – I */
(() => { let b = ''; const H = ['I · Tónica', 'IV · Subdom.', 'V7 · Dominante', 'I · Tónica'], CO = ['#2E9E4F', '#2AA7E8', '#E5312B', '#2E9E4F'];
  const T = [['Do mayor', [['C', 'DO-MI-SOL'], ['F/C', 'DO-FA-LA'], ['G7/B', 'SI-FA-SOL'], ['C', 'DO-MI-SOL']]], ['Sol mayor', [['G', 'SOL-SI-RE'], ['C/G', 'SOL-DO-MI'], ['D7/F♯', 'FA♯-DO-RE'], ['G', 'SOL-SI-RE']]], ['Fa mayor', [['F', 'FA-LA-DO'], ['B♭/F', 'FA-SI♭-RE'], ['C7/E', 'MI-SI♭-DO'], ['F', 'FA-LA-DO']]]];
  const cw = 232; H.forEach((t, i) => b += txt(30 + cw / 2 + i * (cw + 4), 44, t, { size: 21, w: 700, fill: CO[i] }));
  T.forEach(([t, A], j) => { const y = 70 + j * 250; b += txt(30, y + 30, t, { a: 'start', size: 28, w: 700, fill: C.GOLD });
    A.forEach(([a, n], i) => { const x = 30 + i * (cw + 4); b += `<rect x="${x}" y="${y + 50}" width="${cw - 4}" height="170" rx="16" fill="${C.PANEL}" stroke="${CO[i]}" stroke-width="3"/>` + txt(x + cw / 2 - 2, y + 140, a, { serif: 1, size: a.length > 3 ? 38 : 48, w: 700 }) + txt(x + cw / 2 - 2, y + 192, n, { size: 21, w: 600, fill: C.MUTE }); }); });
  b += txt(W / 2, 850, 'Derecha: acordes vecinos · izquierda: el bajo de cada grado', { size: 24, w: 600, fill: C.MUTE });
  out('P3_funciones', 880, 'La familia de acordes: I – IV – V7 – I', b); })();

/* 30 · Estilos de acompañamiento (tabla por corcheas) */
(() => { let b = ''; const L = ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], x0 = 250, cw = 90;
  L.forEach((l, i) => b += txt(x0 + cw / 2 + i * cw, 50, l, { size: 30, w: 700, fill: /\d/.test(l) ? C.IV : C.MUTE }));
  const R = [['Balada', 'derecha', ['DO', 'MI', 'SOL', 'MI', 'DO', 'MI', 'SOL', 'MI']], ['Balada', 'izquierda', 'bajo (redonda)'], ['Pop', 'derecha', ['●', '', '', '●', '', '', '●', '']], ['Pop', 'izquierda', ['B', '', 'B', '', 'B', '', 'B', '']], ['Caribeño', 'derecha', ['', '●', '', '●', '', '●', '', '●']], ['Caribeño', 'izquierda', ['B', '', '', '', 'B', '', '', '']]];
  R.forEach(([s, m, c], j) => { const y = 80 + j * 92 + Math.floor(j / 2) * 24; if (j % 2 === 0) b += txt(30, y + 34, s, { a: 'start', size: 28, w: 700, fill: C.GOLD });
    b += txt(30, y + 66, 'mano ' + m, { a: 'start', size: 20, w: 600, fill: C.MUTE });
    if (typeof c === 'string') b += `<rect x="${x0 + 3}" y="${y + 10}" width="${8 * cw - 6}" height="70" rx="12" fill="#1d3550" stroke="#2AA7E8" stroke-width="2"/>` + txt(x0 + 4 * cw, y + 54, c, { size: 26, w: 700 });
    else c.forEach((v, i) => { const x = x0 + i * cw; b += `<rect x="${x + 3}" y="${y + 10}" width="${cw - 6}" height="70" rx="12" fill="${v ? (v === 'B' ? '#1d3550' : '#3a2a10') : '#100d09'}" stroke="${v ? (v === 'B' ? '#2AA7E8' : C.GOLD) : '#2b2417'}" stroke-width="2"/>`;
      if (v) b += v.length > 1 && v !== '●' ? `<rect x="${x + 12}" y="${y + 28}" width="${cw - 24}" height="34" rx="17" fill="${NOTA[v][0]}"/>` + txt(x + cw / 2, y + 52, v, { size: 18, w: 700, fill: NOTA[v][1] }) : txt(x + cw / 2, y + 58, v, { size: v === 'B' ? 30 : 34, w: 700, fill: v === 'B' ? '#7cc7ef' : C.GOLD }); }); });
  b += txt(W / 2, 700, '● = acorde · B = bajo · Pop = 3 + 3 + 2', { size: 24, w: 600, fill: C.MUTE }) + txt(W / 2, 740, 'Caribeño = acordes a contratiempo (en las «y»)', { size: 24, w: 600, fill: C.MUTE }) + txt(W / 2, 790, 'Vals (3/4): bajo en el 1 · acorde en el 2 y el 3', { size: 26, w: 700, fill: C.GOLD });
  out('P3_estilos', 820, 'Estilos de acompañamiento', b); })();

/* 31 · Transportar: la misma forma, otra casa */
(() => { let b = ''; [['Posición de DO', 0, { 0: 'DO', 1: 'RE', 2: 'MI', 3: 'FA', 4: 'SOL' }, {}, {}, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }, {}, 'MI MI FA SOL | SOL FA MI RE…'], ['Posición de SOL', 4, { 0: 'SOL', 1: 'LA', 2: 'SI', 3: 'DO', 4: 'RE' }, {}, {}, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }, {}, 'SI SI DO RE | RE DO SI LA…'], ['Posición de FA', 3, { 0: 'FA', 1: 'SOL', 2: 'LA', 4: 'DO' }, { 2: 'SI' }, { 2: 'SI♭' }, { 0: 1, 1: 2, 2: 3, 4: 5 }, {}, 'LA LA SI♭ DO | DO SI♭ LA SOL…']].forEach(([t, ini, col, negCol, neg, de, dn, mel], j) => { const y = 20 + j * 330;
    if (j === 2) dn = { 2: 4 }; b += card(20, y, W - 40, 310) + txt(50, y + 48, t, { a: 'start', size: 28, w: 700, fill: C.GOLD }) + txt(W - 50, y + 48, mel, { a: 'end', size: 22, w: 600, fill: C.MUTE });
    b += teclado({ x: 50, y: y + 125, n: 8, kw: 112, h: 160, ini, col, negCol, neg, dedos: de, dedosN: dn, fz: 20 }).b; });
  b += txt(W / 2, 1030, 'Dedos 1 – 2 – 3 – 4 – 5 en las tres: solo cambian las teclas', { size: 25, w: 600, fill: C.MUTE });
  out('P3_transporte', 1060, 'Transportar el Himno de la alegría a otras posiciones', b); })();

/* 32 · La pentatónica de La menor */
(() => { const k = teclado({ x: 40, y: 110, n: 8, kw: 115, h: 330, ini: 5, col: {}, dedos: { 0: 1, 2: 2, 3: 3, 4: 4, 6: 5 }, todos: true, fz: 22 }); let b = k.b;
  [0, 2, 3, 4, 6].forEach(i => b += `<rect x="${40 + i * 115 + 1.5}" y="${110 + 330 * .6}" width="112" height="${330 * .4}" rx="6" fill="${C.GOLD}" opacity=".55"/>`); [1, 5].forEach(i => b += `<rect x="${40 + i * 115 + 1.5}" y="${110 + 330 * .6}" width="112" height="${330 * .4}" rx="6" fill="#6b6457" opacity=".6"/>`);
  b += txt(W / 2, 500, 'Dorado = pentatónica · gris = las que se quitan (SI y FA)', { size: 24, w: 600 }) + txt(W / 2, 556, 'Para improvisar: Am – F – G – Am', { size: 28, w: 700, fill: C.GOLD }) + txt(W / 2, 600, 'Empieza y termina en LA · deja silencios', { size: 24, w: 600, fill: C.MUTE });
  out('P3_pentatonica', 630, 'La pentatónica de La menor', b); })();

/* 33 · Minueto en Sol (Petzold) */
(() => { const r = gran({ medidas: [{ s: dd([q('RE5'), e('SOL4'), e('LA4'), e('SI4'), e('DO5')], [5, 1, 2, 3, 4]), f: [hd('SOL3')] }, { s: dd([q('RE5'), q('SOL4'), q('SOL4')], [5, 1, 1]), f: [hd('SI2')] }, { s: dd([q('MI5'), e('DO5'), e('RE5'), e('MI5'), e('FA5')], [3, 1, 2, 3, 4]), f: [hd('DO3')] }, { s: dd([q('SOL5'), q('SOL4'), q('SOL4')], [5, 1, 1]), f: [hd('SI2')] },
    { s: dd([q('DO5'), e('RE5'), e('DO5'), e('SI4'), e('LA4')], [4, 5, 4, 3, 2]), f: [hd('LA2')] }, { s: dd([q('SI4'), e('DO5'), e('SI4'), e('LA4'), e('SOL4')], [3, 4, 3, 2, 1]), f: [hd('SOL2')] }, { s: dd([q('FA4'), e('SOL4'), e('LA4'), e('SI4'), e('SOL4')], [1, 2, 3, 4, 2]), f: [hd('RE3')] }, { s: dd([hd('LA4')], [3]), f: [hd('RE3')] }], compas: ['3', '4'], arm: ['FA'], filasS: [['f', 'dedo']] });
  out('P3_minueto', r.h + 30, 'Minueto en Sol de Christian Petzold, versión AMA', r.b + txt(W / 2, r.h, 'Sol mayor · 3/4 · Moderato · un sostenido: FA♯', { size: 22, w: 600, fill: C.MUTE })); })();

/* 34 · Tocamos juntos */
(() => { const k = teclado({ x: 40, y: 40, n: 28, kw: 32.8, h: 200, nombres: false }); let b = k.b;
  b += `<rect x="40" y="260" width="${14 * 32.8 - 4}" height="60" rx="12" fill="#1d3550" stroke="#2AA7E8" stroke-width="2"/><rect x="${40 + 14 * 32.8 + 4}" y="260" width="${14 * 32.8 - 4}" height="60" rx="12" fill="#3a2a10" stroke="${C.GOLD}" stroke-width="2"/>`;
  b += txt(40 + 7 * 32.8, 286, 'Secondo', { size: 24, w: 700 }) + txt(40 + 7 * 32.8, 312, 'acordes y bajo', { size: 18, w: 500, fill: C.MUTE }) + txt(40 + 21 * 32.8, 286, 'Primo', { size: 24, w: 700, fill: C.GOLD }) + txt(40 + 21 * 32.8, 312, 'melodía una octava arriba', { size: 18, w: 500, fill: C.MUTE });
  b += txt(30, 400, 'En la banda: cada uno en su lugar', { a: 'start', size: 28, w: 700, fill: C.GOLD }) + `<line x1="40" y1="440" x2="960" y2="440" stroke="${C.MUTE}" stroke-width="2"/>` + txt(40, 470, 'grave', { a: 'start', size: 22, w: 600, fill: C.MUTE }) + txt(960, 470, 'agudo', { a: 'end', size: 22, w: 600, fill: C.MUTE });
  [['Bajo eléctrico', 40, 300, '#4a1e1b', '#E5312B'], ['Piano: acordes en el registro medio', 300, 450, '#3a2a10', C.GOLD], ['Voz o melodía', 640, 320, '#1d3a26', '#2E9E4F']].forEach(([t, x, wd, f, s], i) => b += `<rect x="${x}" y="${500 + i * 80}" width="${wd}" height="60" rx="14" fill="${f}" stroke="${s}" stroke-width="2"/>` + txt(x + wd / 2, 538 + i * 80, t, { size: 22, w: 700 }));
  out('P3_tocamos_juntos', 760, 'Tocamos juntos: cuatro manos y la banda', b); })();

/* 35 · Memorizo con inteligencia */
(() => { let b = ''; [['A', '1–4'], ['B', '5–8'], ['A', '9–12']].forEach(([l, c], i) => { const x = 20 + i * 325; b += card(x, 20, 310, 160, l === 'B') + txt(x + 40, 60, '⚑', { size: 30, w: 700, fill: C.GOLD }) + txt(x + 155, 110, l, { serif: 1, size: 56, w: 700, fill: l === 'B' ? C.GOLD : C.IV }) + txt(x + 155, 154, 'compases ' + c, { size: 22, w: 600, fill: C.MUTE }); });
  b += txt(W / 2, 220, '⚑ = punto de rescate: si me pierdo, sigo desde ahí', { size: 24, w: 600, fill: C.GOLD });
  [['✋', 'Los dedos', 'lo que toco'], ['👁', 'Los ojos', 'cómo se ve el teclado'], ['👂', 'El oído', 'cómo suena']].forEach(([e2, t, d], i) => { const x = 20 + i * 325; b += card(x, 260, 310, 150) + txt(x + 155, 320, e2, { size: 44, w: 400 }) + txt(x + 155, 362, t, { size: 26, w: 700 }) + txt(x + 155, 394, d, { size: 20, w: 500, fill: C.MUTE }); });
  b += txt(30, 470, 'Respiración 4-4-4 antes de sentarme', { a: 'start', size: 28, w: 700, fill: C.GOLD });
  [['Inhalo', '#1d3550', '#2AA7E8'], ['Sostengo', '#3a2a10', C.GOLD], ['Suelto', '#1d3a26', '#2E9E4F']].forEach(([t, f, s], i) => { const x = 20 + i * 325; b += `<rect x="${x}" y="500" width="300" height="110" rx="55" fill="${f}" stroke="${s}" stroke-width="3"/>` + txt(x + 150, 548, t, { size: 30, w: 700 }) + txt(x + 150, 588, '1 2 3 4', { size: 24, w: 600, fill: C.MUTE }); if (i < 2) b += txt(x + 312, 566, '→', { size: 30, w: 700, fill: C.MUTE }); });
  wrap('Si me equivoco, sigo: el público nota cuando nos detenemos, casi nunca el error.', 48).forEach((l, i) => b += txt(W / 2, 680 + i * 36, l, { size: 25, w: 600, fill: C.MUTE }));
  out('P3_memorizar', 760, 'Memorizo con inteligencia', b); })();

/* 36 · Lo que aprendí en los tres niveles */
(() => { let b = ''; const K = [['Escalas mayores', ['Do · sin alteraciones', 'Sol · FA♯', 'Re · FA♯ DO♯', 'La · FA♯ DO♯ SOL♯', 'Fa · SI♭']], ['Escalas menores', ['La menor · sin alteraciones', 'Mi menor · FA♯', 'Pentatónica de La menor', 'Escala cromática']], ['Acordes', ['Mayores: C D E F G A', 'Menores: Am Dm Em Cm', 'Disminuido: B°', 'Séptimas: G7 D7 C7']], ['Armonía', ['Inversiones: C · C/E · C/G', 'I – IV – V7 – I', 'I – V – vi – IV', 'Cadencia V7 → I']], ['Técnica', ['Manos juntas: contrario y paralelo', 'Legato y staccato', 'Pedal sincopado', 'Caída y elevación']], ['Música', ['Lectura en dos claves', 'Estilos: balada, pop, vals, caribeño', 'Transporte y armonización', 'Improvisación']]];
  K.forEach(([t, L], i) => { const x = 20 + (i % 2) * 490, y = 20 + Math.floor(i / 2) * 330; b += card(x, y, 470, 310) + txt(x + 26, y + 50, t, { a: 'start', size: 30, w: 700, fill: C.GOLD });
    L.forEach((l, j) => b += txt(x + 26, y + 100 + j * 48, '• ' + l, { a: 'start', size: l.length > 28 ? 20 : 23, w: 600 })); });
  out('P3_resumen', 1010, 'Lo que aprendí en los tres niveles de piano', b); })();
console.log('ok piano 3:', fs.readdirSync(OUT).filter(f => f.startsWith('P3')).length, 'láminas');
