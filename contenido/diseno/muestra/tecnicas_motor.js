/* Motor de láminas técnicas con el estilo nuevo AMA, en formato angosto (1000 px de ancho) para que se vean completas en el teléfono.
   Las explicaciones largas van como texto debajo de la imagen (en la página), no dentro del dibujo. */
const C = { BG: '#0b0907', PANEL: '#15110c', IV: '#fbf7ef', MUTE: '#b3aa98', GOLD: '#f2b93b', LINE: '#e9e2d3', TAB: '#8d8577' };
const NOTA = { DO: ['#E5312B', '#fff', 'C'], RE: ['#F57C00', '#1A1A1A', 'D'], MI: ['#FFD21F', '#1A1A1A', 'E'], FA: ['#2E9E4F', '#1A1A1A', 'F'], SOL: ['#2AA7E8', '#1A1A1A', 'G'], LA: ['#283593', '#fff', 'A'], SI: ['#8E3BB8', '#fff', 'B'] };
const F = 'font-family="Jost,Segoe UI,Arial,sans-serif"', S = 'font-family="Cormorant Garamond,Georgia,serif"';
const W = 1000;
const CLAVE = 'M434 2Q464 -103 464 -170Q464 -223 427.0 -257.0Q390 -291 337 -291Q287 -291 250.0 -261.5Q213 -232 213 -190Q213 -160 233.5 -133.5Q254 -107 283.5 -107.0Q313 -107 331.5 -128.5Q350 -150 350 -178Q350 -240 280 -240Q298 -268 338 -268Q353 -268 368.5 -263.5Q384 -259 401.0 -248.0Q418 -237 428.5 -213.5Q439 -190 439 -157Q439 -136 411 -6Q389 -12 356 -12Q259 -12 189.5 60.0Q120 132 120 232Q120 267 131.5 303.0Q143 339 157.5 366.5Q172 394 200.5 428.5Q229 463 248.5 483.5Q268 504 303 539Q280 621 280 689Q280 779 313.0 839.5Q346 900 379 900Q389 900 401.5 887.0Q414 874 426.0 851.0Q438 828 446.5 790.5Q455 753 455 710Q455 551 342 447L368 329Q384 332 397 332Q458 332 500.0 282.5Q542 233 542 162Q542 44 434 2ZM426 746Q426 801 394 801Q358 801 333.0 748.0Q308 695 308 630Q308 588 321 557Q359 580 392.5 639.5Q426 699 426 746ZM498 128Q498 183 466.0 216.0Q434 249 383 249L428 23Q498 52 498 128ZM407 17 361 247Q334 241 311.5 214.0Q289 187 289 158Q289 143 295.0 128.5Q301 114 309.5 104.0Q318 94 327.0 86.0Q336 78 342.0 74.5Q348 71 348 71L340 66Q307 75 277.5 106.0Q248 137 248 184Q248 231 277.5 270.5Q307 310 343 323L325 430Q168 299 168 177Q168 104 223.0 55.0Q278 6 348 6Q365 6 407 17Z';
const SNEG = 'M55 208Q55 242 77.5 260.0Q100 278 130 278Q150 278 178 267L65 415Q145 487 145 544Q145 589 91 658H136L264 502Q181 404 181 356Q181 310 259 217L243 194Q203 217 176 217Q140 217 140.0 173.0Q140 129 179 84L165 62Q55 144 55 208Z';
const SCOR = 'M136 443Q152 443 175.0 466.5Q198 490 213 511H234L138 166H101L173 426Q126 402 97.0 402.0Q68 402 43.5 422.5Q19 443 19 473Q19 495 35.0 513.5Q51 532 79 532Q106 532 122.0 513.5Q138 495 138 473Q138 458 131 445Q135 443 136 443Z';
const f1 = n => +n.toFixed(1);
const clave = (x, bot, s) => `<path d="${CLAVE}" fill="${C.IV}" transform="translate(${x},${f1(bot - .1586 * s)}) scale(${(s / 161).toFixed(4)},${(-s / 161).toFixed(4)})"/>`;
const glifo = (d, cx, cy, h, gx, gy, gh, fill = C.IV) => { const k = h / gh; return `<path d="${d}" fill="${fill}" transform="translate(${f1(cx - gx * k)},${f1(cy + gy * k)}) scale(${k.toFixed(4)},${(-k).toFixed(4)})"/>`; };
const silNegra = (cx, cy, h) => glifo(SNEG, cx, cy, h, 160, 360, 596);
const silCorchea = (cx, cy, h) => glifo(SCOR, cx, cy, h, 126, 349, 366);
const pent = (x1, x2, top, s, w = 3) => [0, 1, 2, 3, 4].map(i => `<line x1="${x1}" y1="${top + i * s}" x2="${x2}" y2="${top + i * s}" stroke="${C.LINE}" stroke-width="${w}"/>`).join('');
function cabeza(x, y, s, color, hueca) { const rx = s * .64, ry = s * .45;
  return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" transform="rotate(-20 ${f1(x)} ${f1(y)})" fill="${color}" stroke="${C.IV}" stroke-width="2.5"/>` + (hueca ? `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx * .55)}" ry="${f1(ry * .42)}" transform="rotate(-38 ${f1(x)} ${f1(y)})" fill="${C.BG}"/>` : ''); }
const chip = (x, y, n, w = 84, h = 42) => { const [c, t] = NOTA[n]; w = n.length > 2 ? w + 10 : w; return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" stroke="${C.IV}" stroke-width="2"/><text x="${f1(x)}" y="${f1(y + h * .25)}" text-anchor="middle" ${F} font-size="${f1(h * .62)}" font-weight="700" fill="${t}">${n}</text>`; };
const txt = (x, y, t, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${o.a || 'middle'}" ${o.serif ? S : F} font-size="${o.size || 30}" font-weight="${o.w || 600}" fill="${o.fill || C.IV}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${t}</text>`;
const svg = (h, label, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Math.ceil(h)}" viewBox="0 0 ${W} ${Math.ceil(h)}" role="img" aria-label="${label}"><title>${label}</title><rect width="${W}" height="${Math.ceil(h)}" rx="26" fill="${C.BG}"/>${body}</svg>`;
const compas = (x, yTop, yBot, s, num, den) => txt(x, yTop + 2 * s - 3, num, { serif: 1, size: f1(2.4 * s), w: 700 }) + txt(x, yBot - 3, den, { serif: 1, size: f1(2.4 * s), w: 700 });

/* altura escrita (guitarra) → paso desde la 1.ª línea (MI4 = 0) y cuerda/traste */
const PASO = { DO4: -2, RE4: -1, MI4: 0, FA4: 1, SOL4: 2, LA4: 3, SI4: 4, DO5: 5, RE5: 6, MI5: 7, FA5: 8, SOL5: 9 };
const CUERDA = { MI5: [1, 0], FA5: [1, 1], SOL5: [1, 3], SI4: [2, 0], DO5: [2, 1], RE5: [2, 3], LA4: [3, 2], SOL4: [3, 0], FA4: [4, 3], MI4: [4, 2], RE4: [4, 0], DO4: [5, 3] };
const nombre = p => p.replace(/\d/, '');
const PESO = { w: 2.1, h: 1.45, q: 1, e: .78, hr: 1.45, qr: 1, wr: 2.1 };

/* Ancho de cada compás según lo que lleva adentro */
function anchos(ln, x0, avail, porLinea) { const wm = ln.map(ev => ev.reduce((a, e) => a + PESO[e.d || e], 0) + .7); let tot = wm.reduce((a, b) => a + b, 0); if (ln.length < porLinea) tot *= porLinea / ln.length; let x = x0; return wm.map(v => { const r = [x, x + v / tot * avail]; x = r[1]; return r; }); }
/* Reparte los eventos de un compás: devuelve la x de cada uno */
function repartir(ev, x0, x1) { const tot = ev.reduce((a, e) => a + PESO[e.d], 0), u = (x1 - x0 - 30) / tot; let x = x0 + 34; return ev.map(e => { const r = x; x += PESO[e.d] * u; return r; }); }

/* Pentagrama con notas, nombres, tablatura y dedos. mm = [[{p:'MI5',d:'q'},...], ...] ; porLinea compases por renglón */
function partitura({ mm, porLinea = 2, compasTxt = ['4', '4'], s = 32, tab = true, dedos = true, chips = true }) {
  let b = '', y = 20; const lineas = []; for (let i = 0; i < mm.length; i += porLinea) lineas.push(mm.slice(i, i + porLinea));
  lineas.forEach((ln, li) => {
    const top = y + 3 * s, bot = top + 4 * s, xL = 30, xR = W - 30, head = li === 0 ? 215 : 120;
    b += pent(xL, xR, top, s) + clave(xL + 6, bot, s) + (li === 0 ? compas(xL + 172, top, bot, s, compasTxt[0], compasTxt[1]) : '');
    const AW = anchos(ln, xL + head, xR - xL - head, porLinea), chipY = bot + 2.1 * s + 6, tTop = chipY + 52, ts = 22, dY = tTop + 5 * ts + 46;
    if (tab) { for (let i = 0; i < 6; i++) b += `<line x1="${xL}" y1="${tTop + i * ts}" x2="${xR}" y2="${tTop + i * ts}" stroke="${C.TAB}" stroke-width="2"/>`;
      b += ['T', 'A', 'B'].map((l, i) => txt(xL + 22, tTop + 26 + i * 34, l, { size: 28, w: 700 })).join(''); }
    ln.forEach((ev, mi) => {
      const [x0, x1] = AW[mi], xs = repartir(ev, x0, x1), gap = Math.min(...AW.map(([a, c], j) => { const z = repartir(ln[j], a, c); return Math.min(...z.slice(1).map((v, k) => v - z[k]), 999); })), cw = Math.max(54, Math.min(84, gap - 22)), ult = li === lineas.length - 1 && mi === ln.length - 1;
      ev.forEach((e, k) => { const x = xs[k] + 6;
        if (e.d.endsWith('r')) { b += e.d === 'qr' ? silNegra(x, top + 2 * s, 3 * s) : e.d === 'hr' ? `<rect x="${x - s * .6}" y="${top + 2 * s - s * .5}" width="${s * 1.2}" height="${s * .5}" fill="${C.IV}"/>` : `<rect x="${x - s * .6}" y="${top + s}" width="${s * 1.2}" height="${s * .5}" fill="${C.IV}"/>`; return; }
        const st = PASO[e.p], yN = bot - st * s / 2, n = nombre(e.p);
        if (st <= -2) b += `<line x1="${x - s}" y1="${bot + s}" x2="${x + s}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`;
        if (st >= 10) b += `<line x1="${x - s}" y1="${top - s}" x2="${x + s}" y2="${top - s}" stroke="${C.LINE}" stroke-width="3"/>`;
        b += cabeza(x, yN, s, NOTA[n][0], e.d === 'w' || e.d === 'h');
        if (e.d !== 'w') { const dn = st >= 4, sx = dn ? x - s * .58 : x + s * .58; b += `<line x1="${f1(sx)}" y1="${f1(yN)}" x2="${f1(sx)}" y2="${f1(dn ? yN + 3.4 * s : yN - 3.4 * s)}" stroke="${C.IV}" stroke-width="4"/>`; }
        if (chips) b += chip(x, chipY, n, cw, cw < 70 ? 36 : 42);
        if (tab) { const [cu, tr] = CUERDA[e.p], ty = tTop + (cu - 1) * ts; b += `<rect x="${x - 18}" y="${ty - 17}" width="36" height="34" rx="7" fill="${C.BG}"/>` + txt(x, ty + 11, tr, { size: 32, w: 700, fill: C.GOLD }); if (dedos) b += txt(x, dY, tr ? tr : '·', { size: 32, w: 700, fill: tr ? C.IV : C.MUTE }); }
      });
      if (ult) b += `<line x1="${x1 - 16}" y1="${top}" x2="${x1 - 16}" y2="${bot}" stroke="${C.LINE}" stroke-width="3"/><rect x="${x1 - 10}" y="${top}" width="10" height="${4 * s}" fill="${C.LINE}"/>` + (tab ? `<line x1="${x1 - 16}" y1="${tTop}" x2="${x1 - 16}" y2="${tTop + 5 * ts}" stroke="${C.LINE}" stroke-width="3"/><rect x="${x1 - 10}" y="${tTop}" width="10" height="${5 * ts}" fill="${C.LINE}"/>` : '');
      else b += `<line x1="${x1}" y1="${top}" x2="${x1}" y2="${bot}" stroke="${C.LINE}" stroke-width="3"/>` + (tab ? `<line x1="${x1}" y1="${tTop}" x2="${x1}" y2="${tTop + 5 * ts}" stroke="${C.LINE}" stroke-width="3"/>` : '');
    });
    if (tab && dedos && li === 0) b += txt(xL, dY, 'dedo', { a: 'start', size: 26, w: 700, fill: C.GOLD });
    y = (tab ? (dedos ? dY + 30 : tTop + 5 * ts + 30) : chips ? chipY + 40 : bot + 2 * s) + 30;
  });
  return { b, h: y };
}

/* Ritmo en una sola línea: cabezas marfil, sílabas debajo. mm = [['q','q','qr','e','e',...], ...] ; sil = sílabas en orden */
function ritmo({ mm, sil, porLinea = 2, compasTxt = ['4', '4'], y0 = 20 }) {
  let b = '', y = y0; const lineas = []; for (let i = 0; i < mm.length; i += porLinea) lineas.push(mm.slice(i, i + porLinea)); let k = 0;
  lineas.forEach((ln, li) => {
    const s = 30, L = y + 150, xL = 30, xR = W - 30, head = li === 0 ? 110 : 30, AW = anchos(ln, xL + head, xR - xL - head, porLinea);
    b += `<line x1="${xL}" y1="${L}" x2="${AW[AW.length - 1][1]}" y2="${L}" stroke="${C.LINE}" stroke-width="3"/>`;
    if (li === 0) b += txt(xL + 50, L - 6, compasTxt[0], { serif: 1, size: 68, w: 700 }) + txt(xL + 50, L + 56, compasTxt[1], { serif: 1, size: 68, w: 700 });
    ln.forEach((ev, mi) => {
      const [x0, x1] = AW[mi], xs = repartir(ev.map(d => ({ d })), x0, x1), ult = li === lineas.length - 1 && mi === ln.length - 1, tops = [];
      ev.forEach((d, j) => { const x = xs[j] + 6, sl = sil[k++];
        if (d === 'qr') b += silNegra(x, L, 3 * s);
        else if (d === 'hr') b += `<rect x="${x - 20}" y="${L - 16}" width="40" height="16" fill="${C.IV}"/>`;
        else { b += cabeza(x, L, s, C.IV, d === 'w' || d === 'h'); if (d !== 'w') { b += `<line x1="${f1(x + s * .58)}" y1="${L}" x2="${f1(x + s * .58)}" y2="${L - 110}" stroke="${C.IV}" stroke-width="4"/>`; tops.push([d, x + s * .58]); } else tops.push(['w']); }
        if (d.endsWith('r')) tops.push(['r']);
        b += txt(x, L + 92, sl, { size: sl.length > 6 ? 26 : 32, w: 700, fill: d.endsWith('r') ? C.MUTE : C.GOLD }); });
      for (let j = 0; j < tops.length - 1; j++) if (tops[j][0] === 'e' && tops[j + 1][0] === 'e') { b += `<rect x="${f1(tops[j][1] - 2)}" y="${L - 112}" width="${f1(tops[j + 1][1] - tops[j][1] + 4)}" height="14" fill="${C.IV}"/>`; j++; }
      b += ult ? `<line x1="${x1 - 16}" y1="${L - 46}" x2="${x1 - 16}" y2="${L + 46}" stroke="${C.LINE}" stroke-width="3"/><rect x="${x1 - 10}" y="${L - 46}" width="10" height="92" fill="${C.LINE}"/>` : `<line x1="${x1}" y1="${L - 46}" x2="${x1}" y2="${L + 46}" stroke="${C.LINE}" stroke-width="3"/>`;
    });
    y = L + 130;
  });
  return { b, h: y + 10 };
}
module.exports = { C, NOTA, F, S, W, clave, pent, cabeza, chip, txt, svg, compas, partitura, ritmo, silNegra, silCorchea, f1 };
