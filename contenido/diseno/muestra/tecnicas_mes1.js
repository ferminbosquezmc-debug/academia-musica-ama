/* Láminas técnicas del Mes 1 de guitarra, redibujadas con el estilo nuevo (fondo oscuro, colores AMA, letra grande).
   Notas exactas, iguales a las láminas originales. Uso: node tecnicas_mes1.js → img_tec/*.svg */
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'img_tec'); fs.mkdirSync(OUT, { recursive: true });
const C = { BG: '#0b0907', PANEL: '#15110c', IV: '#fbf7ef', MUTE: '#aca392', GOLD: '#f2b93b', LINE: '#e9e2d3' };
const NOTA = { DO: ['#E5312B', '#fff', 'C'], RE: ['#F57C00', '#1A1A1A', 'D'], MI: ['#FFD21F', '#1A1A1A', 'E'], FA: ['#2E9E4F', '#1A1A1A', 'F'], SOL: ['#2AA7E8', '#1A1A1A', 'G'], LA: ['#283593', '#fff', 'A'], SI: ['#8E3BB8', '#fff', 'B'] };
const F = 'font-family="Jost,Segoe UI,Arial,sans-serif"', S = 'font-family="Cormorant Garamond,Georgia,serif"';
const CLAVE = 'M434 2Q464 -103 464 -170Q464 -223 427.0 -257.0Q390 -291 337 -291Q287 -291 250.0 -261.5Q213 -232 213 -190Q213 -160 233.5 -133.5Q254 -107 283.5 -107.0Q313 -107 331.5 -128.5Q350 -150 350 -178Q350 -240 280 -240Q298 -268 338 -268Q353 -268 368.5 -263.5Q384 -259 401.0 -248.0Q418 -237 428.5 -213.5Q439 -190 439 -157Q439 -136 411 -6Q389 -12 356 -12Q259 -12 189.5 60.0Q120 132 120 232Q120 267 131.5 303.0Q143 339 157.5 366.5Q172 394 200.5 428.5Q229 463 248.5 483.5Q268 504 303 539Q280 621 280 689Q280 779 313.0 839.5Q346 900 379 900Q389 900 401.5 887.0Q414 874 426.0 851.0Q438 828 446.5 790.5Q455 753 455 710Q455 551 342 447L368 329Q384 332 397 332Q458 332 500.0 282.5Q542 233 542 162Q542 44 434 2ZM426 746Q426 801 394 801Q358 801 333.0 748.0Q308 695 308 630Q308 588 321 557Q359 580 392.5 639.5Q426 699 426 746ZM498 128Q498 183 466.0 216.0Q434 249 383 249L428 23Q498 52 498 128ZM407 17 361 247Q334 241 311.5 214.0Q289 187 289 158Q289 143 295.0 128.5Q301 114 309.5 104.0Q318 94 327.0 86.0Q336 78 342.0 74.5Q348 71 348 71L340 66Q307 75 277.5 106.0Q248 137 248 184Q248 231 277.5 270.5Q307 310 343 323L325 430Q168 299 168 177Q168 104 223.0 55.0Q278 6 348 6Q365 6 407 17Z';
const clave = (x, bottom, s) => `<path d="${CLAVE}" fill="${C.IV}" transform="translate(${x},${(bottom - .1586 * s).toFixed(1)}) scale(${(s / 161).toFixed(4)},${(-s / 161).toFixed(4)})"/>`;
const pent = (x1, x2, top, s, w = 3) => [0, 1, 2, 3, 4].map(i => `<line x1="${x1}" y1="${top + i * s}" x2="${x2}" y2="${top + i * s}" stroke="${C.LINE}" stroke-width="${w}"/>`).join('');
/* cabeza de nota: redonda (hueca) o negra (llena), en el color de la nota */
function cabeza(x, y, s, n, hueca) { const [c] = NOTA[n], rx = s * .62, ry = s * .44;
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(-20 ${x} ${y})" fill="${c}" stroke="${C.IV}" stroke-width="2.5"/>` + (hueca ? `<ellipse cx="${x}" cy="${y}" rx="${rx * .55}" ry="${ry * .42}" transform="rotate(-38 ${x} ${y})" fill="${C.BG}"/>` : ''); }
const chip = (x, y, n, w = 96, h = 46) => { const [c, t] = NOTA[n]; return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" stroke="${C.IV}" stroke-width="2"/><text x="${x}" y="${y + h * .26}" text-anchor="middle" ${F} font-size="${h * .6}" font-weight="700" fill="${t}">${n}</text>`; };
const svg = (w, h, label, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><title>${label}</title><rect width="${w}" height="${h}" rx="28" fill="${C.BG}"/>${body}</svg>`;

/* 1) Los 7 grados de la escala de DO y su octava (clase 1) */
(function () {
  const W = 1600, H = 760, s = 40, top = 300, bot = top + 4 * s, xs = i => 410 + i * 160;
  const NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO'], Y = i => bot + s - i * s / 2;   /* DO4 en la línea adicional de abajo */
  let b = `<path d="M${xs(0)},176 Q${(xs(0) + xs(7)) / 2},70 ${xs(7)},176" fill="none" stroke="${C.GOLD}" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"/>`
    + `<rect x="${(xs(0) + xs(7)) / 2 - 300}" y="88" width="600" height="56" rx="28" fill="${C.PANEL}" stroke="${C.GOLD}" stroke-width="3"/><text x="${(xs(0) + xs(7)) / 2}" y="126" text-anchor="middle" ${F} font-size="30" font-weight="700" fill="${C.GOLD}">El 1 y el 8: la misma nota (octava)</text>`;
  b += pent(170, 1560, top, s) + clave(185, bot, s);
  NS.forEach((n, i) => { const x = xs(i), y = Y(i);
    if (i === 0) b += `<line x1="${x - 40}" y1="${bot + s}" x2="${x + 40}" y2="${bot + s}" stroke="${C.LINE}" stroke-width="3"/>`;
    b += cabeza(x, y, s, n, true);
    b += `<circle cx="${x}" cy="204" r="30" fill="${C.GOLD}" stroke="${C.BG}" stroke-width="3"/><text x="${x}" y="216" text-anchor="middle" ${F} font-size="34" font-weight="700" fill="#1b1206">${i + 1}</text>`;
    b += chip(x, 590, n, n.length > 2 ? 110 : 96) + `<text x="${x}" y="668" text-anchor="middle" ${S} font-size="52" font-weight="700" fill="${C.IV}">${NOTA[n][2]}</text>`; });
  b += `<text x="60" y="215" ${F} font-size="26" font-weight="700" fill="${C.GOLD}">Grado</text><text x="60" y="600" ${F} font-size="26" font-weight="700" fill="${C.GOLD}">Nota</text><text x="60" y="664" ${F} font-size="26" font-weight="700" fill="${C.GOLD}">Cifrado</text>`
    + `<text x="${xs(0)}" y="726" text-anchor="middle" ${F} font-size="26" fill="${C.MUTE}">▼ DO grave</text><text x="${xs(7)}" y="726" text-anchor="middle" ${F} font-size="26" fill="${C.MUTE}">DO agudo ▲</text>`;
  fs.writeFileSync(path.join(OUT, 'G1_grados.svg'), svg(W, H, 'Los 7 grados de la escala de DO y su octava en el pentagrama', b));
})();

/* 2) Pentagrama: 5 líneas y 4 espacios (clase 4) */
(function () {
  const W = 1600, H = 840, s = 70, top = 230, bot = top + 4 * s;
  let b = '';
  for (let k = 0; k < 4; k++) b += `<rect x="330" y="${top + k * s + 6}" width="1010" height="${s - 12}" rx="10" fill="${C.GOLD}" opacity="${k % 2 ? .07 : .12}"/>`;
  b += pent(330, 1340, top, s, 4) + clave(318, bot, s);
  for (let i = 0; i < 5; i++) { const y = bot - i * s; b += `<circle cx="270" cy="${y}" r="24" fill="${C.GOLD}"/><text x="270" y="${y + 9}" text-anchor="middle" ${F} font-size="28" font-weight="700" fill="#1b1206">${i + 1}</text>`; }
  ['1.er espacio', '2.º espacio', '3.er espacio', '4.º espacio'].forEach((t, k) => { b += `<text x="1370" y="${bot - k * s - s / 2 + 10}" ${F} font-size="28" font-weight="600" fill="${C.MUTE}">${t}</text>`; });
  b += `<text x="190" y="${top + 2 * s + 10}" text-anchor="end" ${F} font-size="26" font-weight="700" fill="${C.GOLD}">líneas</text>`
    + `<path d="M150,${bot - 10} L150,${top + 30}" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round"/><path d="M136,${top + 50} L150,${top + 24} L164,${top + 50}" fill="none" stroke="${C.GOLD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const xn = 820, yn = bot - s; b += cabeza(xn, yn, s * .85, 'SOL', false) + `<line x1="${xn + 35}" y1="${yn - 6}" x2="${xn + 35}" y2="${yn - 3.4 * s}" stroke="${C.IV}" stroke-width="5"/>` + chip(xn, bot + 80, 'SOL', 110, 50);
  b += `<text x="60" y="80" ${F} font-size="30" fill="${C.MUTE}">Se cuentan de abajo hacia arriba ↑</text>`
    + `<text x="${W / 2}" y="${H - 50}" text-anchor="middle" ${F} font-size="34" font-weight="600" fill="${C.IV}">La clave de sol nace en la <tspan fill="${C.GOLD}">2.ª línea</tspan>: ahí vive la nota <tspan fill="${NOTA.SOL[0]}">SOL</tspan>.</text>`;
  fs.writeFileSync(path.join(OUT, 'N1_pentagrama_basico.svg'), svg(W, H, 'Pentagrama: 5 líneas y 4 espacios', b));
})();

/* 3) MI, FA y SOL en la 1.ª cuerda: pentagrama + tablatura (clase 4). Guitarra: se escribe una octava más arriba. */
(function () {
  const W = 1600, H = 900, s = 40, top = 160, bot = top + 4 * s, x1 = 60, x2 = 1540;
  /* notas escritas: MI5 = 4.º espacio, FA5 = 5.ª línea, SOL5 = espacio de arriba */
  const yN = { MI: top + s / 2, FA: top, SOL: top - s / 2 };
  const notas = [['MI', 0, '—', 400], ['FA', 1, '1', 580], ['SOL', 3, '3', 760], ['FA', 1, '1', 940], ['MI', 0, '—', 1300, true]];
  let b = pent(x1, x2, top, s) + clave(x1 + 6, bot, s) + `<text x="${x1 + 200}" y="${top + 2 * s - 4}" text-anchor="middle" ${S} font-size="${2.3 * s}" font-weight="700" fill="${C.IV}">4</text><text x="${x1 + 200}" y="${bot - 4}" text-anchor="middle" ${S} font-size="${2.3 * s}" font-weight="700" fill="${C.IV}">4</text>`;
  const tTop = 520, ts = 30;
  for (let i = 0; i < 6; i++) b += `<line x1="${x1}" y1="${tTop + i * ts}" x2="${x2}" y2="${tTop + i * ts}" stroke="${C.MUTE}" stroke-width="2.5"/>`;
  b += `<line x1="${x1}" y1="${tTop}" x2="${x1}" y2="${tTop + 5 * ts}" stroke="${C.LINE}" stroke-width="3"/>` + ['T', 'A', 'B'].map((l, i) => `<text x="${x1 + 38}" y="${tTop + 34 + i * 38}" text-anchor="middle" ${F} font-size="32" font-weight="700" fill="${C.IV}">${l}</text>`).join('');
  [1110, x2].forEach((x, k) => { b += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bot}" stroke="${C.LINE}" stroke-width="${k ? 3 : 3}"/><line x1="${x}" y1="${tTop}" x2="${x}" y2="${tTop + 5 * ts}" stroke="${C.LINE}" stroke-width="3"/>`; });
  b += `<rect x="${x2 - 12}" y="${top}" width="10" height="${4 * s}" fill="${C.LINE}"/><rect x="${x2 - 12}" y="${tTop}" width="10" height="${5 * ts}" fill="${C.LINE}"/>`;
  notas.forEach(([n, tr, dedo, x, redonda]) => { const y = yN[n];
    if (n === 'SOL') b += `<line x1="${x - 40}" y1="${top - s}" x2="${x + 40}" y2="${top - s}" stroke="${C.LINE}" stroke-width="0"/>`;
    b += cabeza(x, y, s, n, !!redonda);
    if (!redonda) b += `<line x1="${x - s * .56}" y1="${y + 6}" x2="${x - s * .56}" y2="${y + 3.5 * s}" stroke="${C.IV}" stroke-width="4"/>`;
    b += chip(x, 395, n, n.length > 2 ? 104 : 90, 44);
    b += `<rect x="${x - 22}" y="${tTop - 22}" width="44" height="44" rx="8" fill="${C.BG}"/><text x="${x}" y="${tTop + 13}" text-anchor="middle" ${F} font-size="36" font-weight="700" fill="${C.GOLD}">${tr}</text>`;
    b += `<text x="${x}" y="${tTop + 5 * ts + 70}" text-anchor="middle" ${F} font-size="34" font-weight="700" fill="${dedo === '—' ? C.MUTE : C.IV}">${dedo}</text>`; });
  b += `<text x="${x1}" y="${tTop + 5 * ts + 70}" ${F} font-size="26" font-weight="700" fill="${C.GOLD}">Dedo</text>`
    + `<text x="${x1}" y="${tTop - 30}" ${F} font-size="24" fill="${C.MUTE}">Tablatura: la línea de arriba es la 1.ª cuerda; el número es el traste (0 = al aire)</text>`
    + `<text x="${x1}" y="70" ${F} font-size="30" font-weight="700" fill="${C.IV}">MI, FA y SOL en la 1.ª cuerda</text><text x="${x1 + 470}" y="70" ${F} font-size="26" fill="${C.MUTE}">· MI al aire, FA traste 1, SOL traste 3</text>`;
  fs.writeFileSync(path.join(OUT, 'N1_cuerda1.svg'), svg(W, H, 'MI, FA y SOL en la primera cuerda: pentagrama y tablatura', b));
})();
console.log('ok', fs.readdirSync(OUT).join(', '));
