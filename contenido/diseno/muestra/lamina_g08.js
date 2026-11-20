/* Lámina G-08 «Las seis cuerdas»: la foto de ChatGPT girada para que el diapasón quede como en las demás láminas
   (cejuela arriba, cuerdas de arriba abajo, 6.ª a la izquierda y 1.ª a la derecha) + número y nota de cada cuerda.
   Uso: node lamina_g08.js  → img_ia/G08_cuerdas_lamina.svg (la foto va dentro, así el archivo funciona solo) */
const fs = require('fs'), path = require('path');
const D = __dirname, foto = fs.readFileSync(path.join(D, 'img_ia', 'G08_seis_cuerdas.jpg')).toString('base64');
const FW = 1672, FH = 941;                        /* foto original: cuerdas horizontales, cejuela a la izquierda */
const W = 1000, TOP = 120, S = 1.2, OX = -122;    /* girada 90° a la derecha y ampliada */
const CROP = 1010, PH = Math.round(CROP * S), BOT = 250, H = TOP + PH + BOT;
/* altura de cada cuerda en la foto original (6.ª abajo … 1.ª arriba) → columna en la lámina */
const yFoto = [627, 543, 460, 378, 298, 218], X = yFoto.map(y => Math.round(OX + (FH - y) * S));
const NOTA = { MI: ['#FFD21F', '#1A1A1A'], LA: ['#283593', '#fff'], RE: ['#F57C00', '#1A1A1A'], SOL: ['#2AA7E8', '#1A1A1A'], SI: ['#8E3BB8', '#fff'] };
const nombres = ['MI', 'LA', 'RE', 'SOL', 'SI', 'MI'];
const F = 'font-family="Jost,Segoe UI,Arial,sans-serif"', T = 'font-family="Cormorant Garamond,Georgia,serif"';
let d = '';
const yB = TOP + PH;
X.forEach((x, i) => {
  d += `<text x="${x}" y="${yB + 62}" text-anchor="middle" ${F} font-size="38" fill="#b3aa98">${6 - i}</text>`;
  const [bg, fg] = NOTA[nombres[i]];
  d += `<rect x="${x - 43}" y="${yB + 90}" width="86" height="52" rx="26" fill="${bg}" stroke="#fbf7ef" stroke-width="3"/><text x="${x}" y="${yB + 127}" text-anchor="middle" ${F} font-size="${nombres[i].length > 2 ? 26 : 32}" font-weight="700" fill="${fg}">${nombres[i]}</text>`;
});
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Las seis cuerdas de la guitarra: 6 MI, 5 LA, 4 RE, 3 SOL, 2 SI, 1 MI">
<title>Las seis cuerdas de la guitarra</title>
<defs><clipPath id="cf"><rect y="${TOP}" width="${W}" height="${PH}"/></clipPath>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".8" stop-color="#0b0907" stop-opacity="0"/><stop offset="1" stop-color="#0b0907"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="#0b0907"/>
<text x="${W / 2}" y="78" text-anchor="middle" ${T} font-size="60" font-weight="700" fill="#fbf7ef">Las seis cuerdas</text>
<g clip-path="url(#cf)"><image transform="translate(${OX},${TOP}) scale(${S}) translate(${FH},0) rotate(90)" width="${FW}" height="${FH}" href="data:image/jpeg;base64,${foto}" xlink:href="data:image/jpeg;base64,${foto}"/></g>
<rect y="${TOP}" width="${W}" height="${PH}" fill="url(#fade)"/>
${d}
<text x="${X[0] - 40}" y="${yB + 200}" ${F} font-size="24" fill="#b3aa98">← gruesa y grave</text>
<text x="${X[5] + 40}" y="${yB + 200}" text-anchor="end" ${F} font-size="24" fill="#b3aa98">delgada y aguda →</text>
</svg>`;
fs.writeFileSync(path.join(D, 'img_ia', 'G08_cuerdas_lamina.svg'), svg); console.log('ok', W + 'x' + H, (svg.length / 1024).toFixed(0), 'KB');
