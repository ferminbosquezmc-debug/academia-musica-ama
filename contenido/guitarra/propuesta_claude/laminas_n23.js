/* Guitarra · láminas de los Niveles 2 y 3 (mismo estilo que el Nivel 1).
   Uso: node laminas_n23.js  →  escribe los SVG en ../img/ */
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'img');
const F1 = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif", F2 = "Inter, 'Segoe UI', Arial, sans-serif";
const INK = '#1A1A1A', GRAY = '#5F6368', FRET = '#8C8279', STR = '#4E453D', GOLD = '#C9852A';
const NC = { DO: '#E5312B', RE: '#F57C00', MI: '#FFD21F', FA: '#2E9E4F', SOL: '#2AA7E8', LA: '#283593', SI: '#8E3BB8' };
const TXT = c => (c === NC.MI || c === NC.SOL ? INK : '#FFFFFF');
const NM = ['DO', 'DO♯', 'RE', 'RE♯', 'MI', 'FA', 'FA♯', 'SOL', 'SOL♯', 'LA', 'LA♯', 'SI'];
const NMB = ['DO', 'RE♭', 'RE', 'MI♭', 'MI', 'FA', 'SOL♭', 'SOL', 'LA♭', 'LA', 'SI♭', 'SI'];
const OPEN = [64, 59, 55, 50, 45, 40]; /* cuerdas 1..6 (MIDI, altura real) */
const col = n => NC[n.replace(/[♯♭]/, '')] || '#BBBBBB';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const T = (x, y, s, sz = 30, w = 500, fill = INK, anc = 'middle', fam = F1) => `<text x="${x}" y="${y}" font-family="${fam}" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="${anc}">${esc(s)}</text>`;
const svg = (w, h, title, body) => `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">\n<title>${esc(title)}</title>\n<rect width="${w}" height="${h}" fill="#FFFFFF"/>${body}\n</svg>\n`;
const save = (name, s) => { fs.writeFileSync(path.join(OUT, name + '.svg'), s); console.log('✓', name); };
const badge = (x, y, n, w = 84) => { const c = col(n); return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="44" rx="22" fill="${c}" stroke="${INK}" stroke-width="2.5"/>` + T(x, y + 30, n, 21, 700, TXT(c)); };
const head = (W, t, s) => T(40, 70, t, 46, 700, INK, 'start') + (s ? T(40, 118, s, 28, 500, GRAY, 'start', F2) : '');

/* ---- Diagrama de acorde (vertical, cuerda 6 a la izquierda) ----
   f: trastes de la 6.ª a la 1.ª (-1 = no se toca, 0 = al aire); d: dedos; o.barre = {fret, from, to} (cuerdas 6..1); o.base = traste inicial */
function chord(x0, y0, name, sub, f, d, o = {}) {
  const w = o.w || 470, nf = o.frets || 4, gx = w / 5, gy = o.gy || 100, base = o.base || 1, top = y0 + 210;
  let s = T(x0 + w / 2, y0 + 64, name, 60, 700) + (sub ? T(x0 + w / 2, y0 + 108, sub, 28, 500, GRAY, 'middle', F2) : '');
  if (base === 1) s += `<rect x="${x0 - 6}" y="${top - 16}" width="${w + 12}" height="18" fill="${INK}"/>`;
  else s += T(x0 - 22, top + gy / 2 + 12, base + 'ª', 32, 700, INK, 'end');
  for (let k = 1; k <= nf; k++) s += `<line x1="${x0}" y1="${top + k * gy}" x2="${x0 + w}" y2="${top + k * gy}" stroke="${FRET}" stroke-width="5"/>`;
  for (let i = 0; i < 6; i++) { const x = x0 + i * gx; s += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + nf * gy}" stroke="${STR}" stroke-width="${6.5 - i * 0.9}"/>` + T(x, top + nf * gy + 44, String(6 - i), 26, 600, GRAY); }
  if (o.barre) { const b = o.barre, xa = x0 + (6 - b.from) * gx, xb = x0 + (6 - b.to) * gx, y = top + (b.fret - base + 0.5) * gy; s += `<rect x="${xa - 30}" y="${y - 28}" width="${xb - xa + 60}" height="56" rx="28" fill="${INK}"/>` + T((xa + xb) / 2, y + 12, '1', 34, 700, '#FFFFFF'); }
  f.forEach((fr, i) => { const x = x0 + i * gx;
    if (fr < 0) s += T(x, top - 30, '✕', 40, 700);
    else if (fr === 0) s += `<circle cx="${x}" cy="${top - 44}" r="17" fill="none" stroke="${INK}" stroke-width="5"/>`;
    else if (!(o.barre && o.barre.fret === fr && d[i] === 1)) { const y = top + (fr - base + 0.5) * gy; s += `<circle cx="${x}" cy="${y}" r="${o.r || 32}" fill="${INK}"/>` + (d[i] ? T(x, y + 13, String(d[i]), 36, 700, '#FFFFFF') : ''); }
    if (fr >= 0 && !o.nonames) { const n = (o.flat ? NMB : NM)[(OPEN[5 - i] + fr) % 12]; s += badge(x, top + nf * gy + 70, n.replace('♯', '♯'), 80); } });
  return s;
}
function chordFile(name, title, sub, f, d, o = {}) { const W = 640, H = o.nonames ? 820 : 920; save(name, svg(W, H, title, chord(85, 20, title.split(' · ')[0], sub, f, d, Object.assign({ w: 470 }, o)))); }
function chordSheet(name, title, sub, list, o = {}) {
  const cols = o.cols || 3, cw = 760, ch = 860, W = cols * cw + 40, H = 150 + Math.ceil(list.length / cols) * ch;
  let s = head(W, title, sub);
  list.forEach((c, k) => { const x = 40 + (k % cols) * cw + 140, y = 150 + Math.floor(k / cols) * ch; s += chord(x, y, c[0], c[1], c[2], c[3], Object.assign({ w: 470, gy: 90 }, c[4] || {})); });
  save(name, svg(W, H, title, s));
}
/* ---- Mástil horizontal (1.ª cuerda arriba) ---- marks: [cuerda 1..6, traste, etiqueta?] */
function neck(name, title, sub, marks, o = {}) {
  const nf = o.frets || 5, f0 = o.from || 0, W = 2400, x0 = 260, x1 = W - 80, fw = (x1 - x0) / (nf - (f0 ? 0 : 0)), top = 230, gy = 92, H = top + 5 * gy + (o.foot ? 260 : 170);
  let s = head(W, title, sub);
  const fx = k => x0 + (k - f0) * fw; /* línea del traste k */
  if (f0 === 0) s += `<rect x="${x0 - 14}" y="${top - 8}" width="16" height="${5 * gy + 16}" fill="${INK}"/>`;
  for (let k = f0 + (f0 === 0 ? 1 : 0); k <= f0 + nf; k++) s += `<line x1="${fx(k)}" y1="${top}" x2="${fx(k)}" y2="${top + 5 * gy}" stroke="${FRET}" stroke-width="6"/>`;
  for (let k = f0 + 1; k <= f0 + nf; k++) { s += T((fx(k - 1) + fx(k)) / 2, top + 5 * gy + 64, String(k), 30, 600, GRAY); if ([3, 5, 7, 9, 15].includes(k)) s += `<circle cx="${(fx(k - 1) + fx(k)) / 2}" cy="${top + 2.5 * gy}" r="11" fill="#E6DFD3"/>`; if (k === 12) { s += `<circle cx="${(fx(11) + fx(12)) / 2}" cy="${top + 1.5 * gy}" r="11" fill="#E6DFD3"/><circle cx="${(fx(11) + fx(12)) / 2}" cy="${top + 3.5 * gy}" r="11" fill="#E6DFD3"/>`; } }
  for (let i = 0; i < 6; i++) { const y = top + i * gy; s += `<line x1="${x0 - 14}" y1="${y}" x2="${x1}" y2="${y}" stroke="${STR}" stroke-width="${2 + i * 0.9}"/>` + T(x0 - 190, y + 11, (i + 1) + 'ª', 30, 700, GRAY, 'end') + T(x0 - 110, y + 11, NM[OPEN[i] % 12], 26, 600, GRAY, 'end'); }
  marks.forEach(m => { const [st, fr, lab, extra] = m, y = top + (st - 1) * gy, x = fr === 0 ? x0 - 50 : (fx(fr - 1) + fx(fr)) / 2, n = lab || (o.flat ? NMB : NM)[(OPEN[st - 1] + fr) % 12], c = (extra && extra.c) || col(n), r = (extra && extra.root) ? 40 : 36;
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${extra && extra.root ? INK : '#FFFFFF'}" stroke-width="${extra && extra.root ? 6 : 3}"/>` + T(x, y + 10, n, n.length > 3 ? 20 : 24, 700, TXT(c)); });
  if (o.foot) s += T(W / 2, H - 70, o.foot, 32, 500, GRAY, 'middle', F2);
  save(name, svg(W, H, title, s));
}
/* ---- Rasgueos ---- p: cadenas tipo 'D U - U'; mayúscula = acento */
function strum(name, title, sub, rows) {
  const W = 2400, rh = 330, H = 160 + rows.length * rh;
  let s = head(W, title, sub);
  rows.forEach((r, k) => { const y = 170 + k * rh, n = r.p.length, step = (W - 520) / n;
    s += T(40, y + 40, r.t, 34, 700, INK, 'start') + (r.s ? T(40, y + 80, r.s, 24, 500, GRAY, 'start', F2) : '');
    r.p.forEach((c, i) => { const x = 440 + i * step + step / 2, acc = c === 'D' || c === 'U', dn = c.toLowerCase() === 'd', up = c.toLowerCase() === 'u', yy = y + 60;
      if (dn || up) { const sw = acc ? 16 : 11, cl = acc ? INK : GRAY; s += dn ? `<line x1="${x}" y1="${yy}" x2="${x}" y2="${yy + 120}" stroke="${cl}" stroke-width="${sw}" stroke-linecap="round"/><path d="M${x - 30},${yy + 106} L${x},${yy + 160} L${x + 30},${yy + 106} Z" fill="${cl}"/>` : `<line x1="${x}" y1="${yy + 160}" x2="${x}" y2="${yy + 40}" stroke="${cl}" stroke-width="${sw}" stroke-linecap="round"/><path d="M${x - 30},${yy + 54} L${x},${yy} L${x + 30},${yy + 54} Z" fill="${cl}"/>`; if (acc) s += T(x, yy - 14, '>', 40, 700, GOLD); }
      else s += `<circle cx="${x}" cy="${yy + 80}" r="8" fill="#C8C1B4"/>`;
      s += T(x, y + 280, r.c[i], 40, 700, (r.c[i] === 'y' || r.c[i] === 'e' || r.c[i] === 'a' || r.c[i] === '·') ? GRAY : INK); }); });
  save(name, svg(W, H, title, s));
}
/* ---- Panel de texto con cajas ---- */
function boxes(name, title, sub, items, o = {}) {
  const cols = o.cols || 3, W = 2400, bw = (W - 80 - (cols - 1) * 30) / cols, bh = o.bh || 300, H = 170 + Math.ceil(items.length / cols) * (bh + 30) + 20;
  let s = head(W, title, sub);
  items.forEach((it, k) => { const x = 40 + (k % cols) * (bw + 30), y = 160 + Math.floor(k / cols) * (bh + 30), c = it.c || '#F4EFE3';
    s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="24" fill="${c}" stroke="${INK}" stroke-width="3"/>` + T(x + bw / 2, y + 70, it.t, it.ts || 44, 700, it.tc || INK);
    (it.l || []).forEach((ln, j) => { s += T(x + bw / 2, y + 130 + j * 46, ln, 30, 500, it.tc || INK, 'middle', F2); }); });
  save(name, svg(W, H, title, s));
}

/* ======================= NIVEL 2 ======================= */
/* 13 · semitonos en la 1.ª cuerda */
neck('G2_trastes_semitonos', 'Cada traste es un semitono', 'La 1.ª cuerda del MI al aire al MI del traste 12: las 12 notas', Array.from({ length: 13 }, (_, k) => [1, k]), { frets: 12, foot: 'Traste 12 = la misma nota una octava más aguda · las notas con ♯ también se llaman con ♭: FA♯ = SOL♭' });
neck('G2_alteraciones_mastil', 'Sostenidos y bemoles en las cuerdas 1, 2 y 3', '♯ sube un traste · ♭ baja un traste · ♮ vuelve a la nota natural', [[1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]], { frets: 4 });
/* 14 · notas graves */
neck('G2_notas_graves', 'Las notas graves: cuerdas 3, 4, 5 y 6', 'Primera posición · el pulgar (p) toca los bajos', [[3, 0], [3, 2], [4, 0], [4, 2], [4, 3], [5, 0], [5, 2], [5, 3], [6, 0], [6, 1], [6, 3]], { frets: 4, foot: 'Se leen en el pentagrama por debajo de la clave de sol, con líneas adicionales' });
/* 15 · escala de Do */
neck('G2_escala_do', 'La escala de Do mayor en primera posición', 'DO – RE – MI – FA – SOL – LA – SI – DO · T – T – S – T – T – T – S', [[5, 3, 'DO', { root: 1 }], [4, 0], [4, 2], [4, 3], [3, 0], [3, 2], [2, 0], [2, 1, 'DO', { root: 1 }]], { frets: 4, foot: 'Dedo 1 en el traste 1 · dedo 2 en el 2 · dedo 3 en el 3: un dedo por traste' });
/* 16 · G y C */
chordFile('G2_acorde_G', 'G · Sol mayor', 'Sol mayor', [3, 2, 0, 0, 0, 3], [2, 1, 0, 0, 0, 3]);
chordFile('G2_acorde_C', 'C · Do mayor', 'Do mayor', [-1, 3, 2, 0, 1, 0], [0, 3, 2, 0, 1, 0]);
/* 17 · rasgueos */
strum('G2_rasgueos', 'Patrones de rasgueo con acento', '> = acento (más fuerte) · flecha gris = más suave · · = la mano pasa sin tocar', [
  { t: 'Balada', s: '4/4 · ↓ ↓ ↑ ↑ ↓ ↑', p: ['D', '-', 'd', 'u', '-', 'u', 'd', 'u'], c: ['1', 'y', '2', 'y', '3', 'y', '4', 'y'] },
  { t: 'Pop', s: '4/4 · acento en 2 y 4', p: ['d', 'u', 'D', 'u', 'd', 'u', 'D', 'u'], c: ['1', 'y', '2', 'y', '3', 'y', '4', 'y'] },
  { t: 'Vals', s: '3/4 · bajo y dos rasgueos', p: ['D', '-', 'd', '-', 'd', '-'], c: ['1', 'y', '2', 'y', '3', 'y'] }]);
/* 18 · arpegio */
boxes('G2_arpegio_pima', 'El arpegio p – i – m – a', 'Cada dedo de la mano derecha tiene su cuerda', [
  { t: 'p · pulgar', l: ['El bajo del acorde', 'cuerdas 6, 5 o 4'], c: '#F9D9D7' }, { t: 'i · índice', l: ['3.ª cuerda'], c: '#DCEFE0' }, { t: 'm · medio', l: ['2.ª cuerda'], c: '#DCEBF7' },
  { t: 'a · anular', l: ['1.ª cuerda'], c: '#FBF1D3' }, { t: 'En 4/4', l: ['p – i – m – a – m – i', '(corcheas)'] }, { t: 'En 3/4', l: ['p – i – m – a – m – i', 'un acorde por compás'] }], { cols: 3, bh: 260 });
/* 19 · escala de Sol */
neck('G2_escala_sol', 'La escala de Sol mayor', 'SOL – LA – SI – DO – RE – MI – FA♯ – SOL · la fórmula pide FA♯', [[6, 3, 'SOL', { root: 1 }], [5, 0], [5, 2], [5, 3], [4, 0], [4, 2], [4, 4, 'FA♯'], [3, 0, 'SOL', { root: 1 }], [3, 2], [2, 0], [2, 1], [2, 3], [1, 0], [1, 2, 'FA♯'], [1, 3, 'SOL', { root: 1 }]], { frets: 4, foot: 'Dos octavas: del SOL de la 6.ª cuerda al SOL de la 1.ª' });
/* 20 · los acordes de Do */
chordSheet('G2_acordes_do', 'Los seis acordes de la tonalidad de Do', 'I – ii – iii – IV – V – vi (el vii°, SI disminuido, lo conocerás después)', [
  ['C', 'I · Do mayor', [-1, 3, 2, 0, 1, 0], [0, 3, 2, 0, 1, 0]], ['Dm', 'ii · Re menor', [-1, -1, 0, 2, 3, 1], [0, 0, 0, 2, 3, 1]], ['Em', 'iii · Mi menor', [0, 2, 2, 0, 0, 0], [0, 2, 3, 0, 0, 0]],
  ['F', 'IV · Fa (fácil)', [-1, -1, 3, 2, 1, 1], [0, 0, 3, 2, 1, 1], { barre: { fret: 1, from: 2, to: 1 } }], ['G', 'V · Sol mayor', [3, 2, 0, 0, 0, 3], [2, 1, 0, 0, 0, 3]], ['Am', 'vi · La menor', [-1, 0, 2, 2, 1, 0], [0, 0, 2, 3, 1, 0]]], { cols: 3 });
/* 21 · cejilla */
chordFile('G2_acorde_F_cejilla', 'F · Fa con cejilla', 'Forma de Mi en el traste 1', [1, 3, 3, 2, 1, 1], [1, 3, 4, 2, 1, 1], { barre: { fret: 1, from: 6, to: 1 } });
boxes('G2_cejilla_tecnica', 'Cómo hacer la cejilla sin dolor', 'Pocas veces y bien: la fuerza viene del brazo, no de apretar', [
  { t: '1 · El índice', l: ['recto, sobre el canto', 'cerca del traste'] }, { t: '2 · El pulgar', l: ['detrás del mástil,', 'a la altura del dedo 2'] }, { t: '3 · El brazo', l: ['tira un poco hacia atrás', 'como si colgara'] },
  { t: '4 · Prueba', l: ['cuerda por cuerda:', '¿suena cada una?'] }, { t: '5 · Descansa', l: ['10 segundos con cejilla,', '10 segundos sin ella'] }, { t: 'Si duele', l: ['para, sacude la mano', 'y vuelve a empezar'], c: '#F9D9D7' }], { cols: 3, bh: 260 });
/* 22 · séptimas */
chordSheet('G2_septimas', 'Acordes de séptima abiertos', 'El acorde V7 quiere volver al I: G7 → C · D7 → G · A7 → D · E7 → A · B7 → E', [
  ['E7', 'Mi séptima', [0, 2, 0, 1, 0, 0], [0, 2, 0, 1, 0, 0]], ['A7', 'La séptima', [-1, 0, 2, 0, 2, 0], [0, 0, 2, 0, 3, 0]], ['D7', 'Re séptima', [-1, -1, 0, 2, 1, 2], [0, 0, 0, 2, 1, 3]],
  ['G7', 'Sol séptima', [3, 2, 0, 0, 0, 1], [3, 2, 0, 0, 0, 1]], ['B7', 'Si séptima', [-1, 2, 1, 2, 0, 2], [0, 2, 1, 3, 0, 4]], ['C7', 'Do séptima', [-1, 3, 2, 3, 1, 0], [0, 3, 2, 4, 1, 0]]], { cols: 3 });
/* 23 · semicorcheas */
strum('G2_semicorcheas', 'Semicorcheas y síncopa en el rasgueo', 'La mano sube y baja sin parar: 4 movimientos por tiempo', [
  { t: 'Semicorcheas', s: '1 e y a · 2 e y a', p: ['D', 'u', 'd', 'u', 'D', 'u', 'd', 'u'], c: ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a'] },
  { t: 'Síncopa', s: 'el acento cae entre los tiempos', p: ['d', '-', 'd', 'U', '-', 'U', 'd', 'u'], c: ['1', 'y', '2', 'y', '3', 'y', '4', 'y'] }]);
/* 24 · forma de la canción */
boxes('G2_forma_cancion', 'El mapa de una canción', 'Antes de tocar con la banda, conoce el camino', [
  { t: 'Intro', l: ['4 compases', 'solo acordes'], c: '#DCEBF7' }, { t: 'Estrofa', l: ['la historia', 'toca suave'], c: '#DCEFE0' }, { t: 'Coro', l: ['la parte que todos cantan', 'toca más fuerte'], c: '#FBF1D3' },
  { t: 'Puente', l: ['algo distinto', '(no siempre aparece)'] }, { t: 'Final', l: ['el último acorde', 'deja que suene'], c: '#F9D9D7' }, { t: 'Señales', l: ['mira al director:', 'mano arriba = coro'] }], { cols: 3, bh: 260 });

/* ======================= NIVEL 3 ======================= */
/* 25 · escalas menores */
neck('G3_la_menor', 'La escala de La menor natural', 'LA – SI – DO – RE – MI – FA – SOL – LA · relativa de Do mayor (mismas notas)', [[5, 0, 'LA', { root: 1 }], [5, 2], [5, 3], [4, 0], [4, 2], [4, 3], [3, 0], [3, 2, 'LA', { root: 1 }], [2, 0], [2, 1], [2, 3], [1, 0]], { frets: 4, foot: 'Empieza y termina en LA: por eso suena menor aunque use las notas de Do' });
neck('G3_mi_menor', 'La escala de Mi menor natural', 'MI – FA♯ – SOL – LA – SI – DO – RE – MI · relativa de Sol mayor (un sostenido: FA♯)', [[6, 0, 'MI', { root: 1 }], [6, 2, 'FA♯'], [6, 3], [5, 0], [5, 2], [5, 3], [4, 0], [4, 2, 'MI', { root: 1 }], [4, 4, 'FA♯'], [3, 0], [3, 2], [2, 0], [2, 1], [2, 3], [1, 0, 'MI', { root: 1 }]], { frets: 4 });
/* 26 · intervalos y acordes de poder */
neck('G3_intervalos', 'Los intervalos en el mástil', 'Desde un SOL en la 6.ª cuerda (traste 3)', [[6, 3, 'SOL', { root: 1 }], [6, 5, '2ªM'], [5, 1, '3ªm', { c: '#8E3BB8' }], [5, 2, '3ªM', { c: '#2E9E4F' }], [5, 3, '4ªJ', { c: '#F57C00' }], [5, 5, '5ªJ', { c: '#E5312B' }], [4, 5, '8ª', { root: 1, c: '#2AA7E8' }]], { frets: 6, foot: 'La 5ª justa siempre está en la cuerda de al lado, dos trastes más arriba' });
chordSheet('G3_acordes_poder', 'Acordes de poder (fundamental + 5ª)', 'No son mayores ni menores: suenan firmes con distorsión o en ritmo rock', [
  ['E5', 'Mi quinta', [0, 2, 2, -1, -1, -1], [0, 1, 2, 0, 0, 0]], ['A5', 'La quinta', [-1, 0, 2, 2, -1, -1], [0, 0, 1, 2, 0, 0]], ['G5', 'Sol quinta', [3, 5, 5, -1, -1, -1], [1, 3, 4, 0, 0, 0], { base: 3 }]], { cols: 3 });
/* 27 · ligados */
boxes('G3_ligados', 'Ligados: dos notas con un solo golpe', 'La mano derecha toca la primera nota; la izquierda hace la segunda', [
  { t: 'Ascendente (H)', l: ['toco la nota de abajo y', '«martillo» el dedo encima', 'hammer-on'], c: '#DCEFE0' }, { t: 'Descendente (P)', l: ['con los dos dedos puestos,', 'tiro del dedo de arriba', 'pull-off'], c: '#DCEBF7' },
  { t: 'Staccato', l: ['nota corta:', 'apago la cuerda con', 'la palma o aflojando'], c: '#FBF1D3' }], { cols: 3, bh: 300 });
/* 28 · séptimas móviles */
chordSheet('G3_moviles', 'Acordes móviles: forma de Mi', 'La misma forma sube por el mástil; la nota del dedo 1 en la 6.ª cuerda da el nombre', [
  ['G', 'mayor · traste 3', [3, 5, 5, 4, 3, 3], [1, 3, 4, 2, 1, 1], { base: 3, barre: { fret: 3, from: 6, to: 1 } }], ['Gm', 'menor · traste 3', [3, 5, 5, 3, 3, 3], [1, 3, 4, 1, 1, 1], { flat: 1, base: 3, barre: { fret: 3, from: 6, to: 1 } }], ['G7', 'séptima · traste 3', [3, 5, 3, 4, 3, 3], [1, 3, 1, 2, 1, 1], { base: 3, barre: { fret: 3, from: 6, to: 1 } }]], { cols: 3 });
/* 29 · cejilla forma de La */
chordSheet('G3_forma_la', 'Cejilla con forma de La', 'La nota del dedo 1 en la 5.ª cuerda da el nombre del acorde', [
  ['Bm', 'Si menor · traste 2', [-1, 2, 4, 4, 3, 2], [0, 1, 3, 4, 2, 1], { base: 2, barre: { fret: 2, from: 5, to: 1 } }], ['C', 'Do mayor · traste 3', [-1, 3, 5, 5, 5, 3], [0, 1, 2, 3, 4, 1], { base: 3, barre: { fret: 3, from: 5, to: 1 } }], ['D', 'Re mayor · traste 5', [-1, 5, 7, 7, 7, 5], [0, 1, 2, 3, 4, 1], { base: 5, barre: { fret: 5, from: 5, to: 1 } }]], { cols: 3 });
/* 30 · estilos */
strum('G3_estilos', 'Estilos de acompañamiento', 'El mismo acorde, cuatro maneras de tocarlo', [
  { t: 'Balada', s: '4/4 lenta', p: ['D', '-', 'd', 'u', '-', 'u', 'd', 'u'], c: ['1', 'y', '2', 'y', '3', 'y', '4', 'y'] },
  { t: 'Merengue', s: '2/4 rápido · rasgueo apagado', p: ['D', 'u', 'd', 'U', 'D', 'u', 'd', 'U'], c: ['1', 'y', '2', 'y', '1', 'y', '2', 'y'] },
  { t: 'Tresillo (shuffle)', s: '«larga – corta»', p: ['D', '-', 'u', 'D', '-', 'u'], c: ['1', '·', 'a', '2', '·', 'a'] }]);
/* 31 · escala móvil y capotraste */
neck('G3_escala_movil', 'La escala mayor móvil (caja con raíz en la 6.ª cuerda)', 'Sol mayor en el traste 3 · mueve toda la caja y tendrás otra tonalidad', [[6, 3, 'SOL', { root: 1 }], [6, 5, 'LA'], [5, 2, 'SI'], [5, 3, 'DO'], [5, 5, 'RE'], [4, 2, 'MI'], [4, 4, 'FA♯'], [4, 5, 'SOL', { root: 1 }], [3, 2, 'LA'], [3, 4, 'SI'], [3, 5, 'DO'], [2, 3, 'RE'], [2, 5, 'MI'], [1, 2, 'FA♯'], [1, 3, 'SOL', { root: 1 }]], { from: 1, frets: 5, foot: 'En el traste 5 la misma caja es La mayor · en el 8, Do mayor' });
boxes('G3_capotraste', 'El capotraste: transportar sin cambiar los acordes', 'Las formas que ya sabes, en otra tonalidad', [
  { t: 'Capo en 2', l: ['forma G → suena A', 'forma C → suena D'] }, { t: 'Capo en 3', l: ['forma G → suena B♭', 'forma Em → suena Gm'] }, { t: 'Capo en 5', l: ['forma C → suena F', 'forma G → suena C'] },
  { t: 'La regla', l: ['cada traste sube', 'medio tono'], c: '#FBF1D3' }, { t: 'Para el cantante', l: ['busca su tono', 'y mueve el capo'], c: '#DCEFE0' }, { t: 'Cuidado', l: ['ponlo justo detrás', 'del traste, recto'], c: '#F9D9D7' }], { cols: 3, bh: 260 });
/* 32 · pentatónica y blues */
neck('G3_pentatonica', 'Pentatónica de La menor · caja 1', 'LA – DO – RE – MI – SOL · dedo 1 en el traste 5', [[6, 5, 'LA', { root: 1 }], [6, 8, 'DO'], [5, 5, 'RE'], [5, 7, 'MI'], [4, 5, 'SOL'], [4, 7, 'LA', { root: 1 }], [3, 5, 'DO'], [3, 7, 'RE'], [2, 5, 'MI'], [2, 8, 'SOL'], [1, 5, 'LA', { root: 1 }], [1, 8, 'DO']], { from: 4, frets: 5, foot: 'Cinco notas que siempre suenan bien sobre Am – F – G – Am' });
boxes('G3_blues', 'El blues de 12 compases en La', 'Cada caja es un compás · se repite de principio a fin', [
  { t: 'A7', l: ['1'] }, { t: 'A7', l: ['2'] }, { t: 'A7', l: ['3'] }, { t: 'A7', l: ['4'] }, { t: 'D7', l: ['5'], c: '#DCEFE0' }, { t: 'D7', l: ['6'], c: '#DCEFE0' },
  { t: 'A7', l: ['7'] }, { t: 'A7', l: ['8'] }, { t: 'E7', l: ['9'], c: '#FBF1D3' }, { t: 'D7', l: ['10'], c: '#DCEFE0' }, { t: 'A7', l: ['11'] }, { t: 'E7', l: ['12 · vuelta'], c: '#FBF1D3' }], { cols: 4, bh: 190 });
/* 33 · minueto en TAB */
(function () { const W = 2400, H = 820, notes = [['RE', 2, 3], ['SOL', 3, 0], ['LA', 3, 2], ['SI', 2, 0], ['DO', 2, 1], ['RE', 2, 3], ['SOL', 3, 0], ['SOL', 3, 0], ['MI', 1, 0], ['DO', 2, 1], ['RE', 2, 3], ['MI', 1, 0], ['FA♯', 1, 2], ['SOL', 1, 3], ['SOL', 3, 0], ['SOL', 3, 0]];
  let s = head(W, '«Minueto en Sol» en la guitarra · compases 1 a 4', 'Christian Petzold · tablatura en primera posición (el número es el traste)'); const x0 = 160, top = 300, gy = 60, st = (W - x0 - 80) / notes.length;
  for (let i = 0; i < 6; i++) s += `<line x1="${x0 - 40}" y1="${top + i * gy}" x2="${W - 60}" y2="${top + i * gy}" stroke="${STR}" stroke-width="3"/>` + T(x0 - 70, top + i * gy + 10, (i + 1) + 'ª', 26, 700, GRAY, 'end');
  [5, 8, 13].forEach(b => s += `<line x1="${x0 + b * st - 10}" y1="${top}" x2="${x0 + b * st - 10}" y2="${top + 5 * gy}" stroke="${INK}" stroke-width="4"/>`);
  notes.forEach((n, k) => { const x = x0 + k * st + st / 2 - 20, y = top + (n[1] - 1) * gy; s += `<rect x="${x - 24}" y="${y - 26}" width="48" height="52" fill="#FFFFFF"/>` + T(x, y + 12, String(n[2]), 38, 700) + badge(x, top + 5 * gy + 50, n[0], 80); });
  s += T(W / 2, H - 50, 'Compás de 3/4 · los compases 5 a 8 están en la partitura interactiva (Práctica → Partituras)', 28, 500, GRAY, 'middle', F2);
  save('G3_minueto_tab', svg(W, H, 'Minueto en Sol en tablatura', s)); })();
/* 34 · la guitarra en el grupo */
boxes('G3_tocamos_juntos', 'La guitarra en el grupo', 'Cada uno en su lugar: así el grupo suena claro', [
  { t: 'Guitarra 1 · ritmo', l: ['acordes con rasgueo', 'sostiene el pulso'], c: '#DCEBF7' }, { t: 'Guitarra 2 · arpegio', l: ['arpegios o notas', 'en otra zona del mástil'], c: '#DCEFE0' }, { t: 'Con un cantante', l: ['toca más suave', 'en las estrofas'], c: '#FBF1D3' },
  { t: 'Con la batería', l: ['el acento de la guitarra', 'con el redoblante'] }, { t: 'Con el bajo', l: ['el bajo toca la raíz:', 'no la dupliques abajo'] }, { t: 'Con el teclado', l: ['uno arpegia,', 'el otro sostiene'] }], { cols: 3, bh: 260 });
/* 36 · resumen */
chordSheet('G3_resumen', 'Mis acordes del Nivel 3', 'Del primer acorde de la clase 9 a la cejilla móvil', [
  ['G', 'abierto', [3, 2, 0, 0, 0, 3], [2, 1, 0, 0, 0, 3]], ['C', 'abierto', [-1, 3, 2, 0, 1, 0], [0, 3, 2, 0, 1, 0]], ['F', 'cejilla forma de Mi', [1, 3, 3, 2, 1, 1], [1, 3, 4, 2, 1, 1], { barre: { fret: 1, from: 6, to: 1 } }],
  ['Bm', 'cejilla forma de La', [-1, 2, 4, 4, 3, 2], [0, 1, 3, 4, 2, 1], { base: 2, barre: { fret: 2, from: 5, to: 1 } }], ['E7', 'séptima', [0, 2, 0, 1, 0, 0], [0, 2, 0, 1, 0, 0]], ['A5', 'de poder', [-1, 0, 2, 2, -1, -1], [0, 0, 1, 2, 0, 0]]], { cols: 3 });
