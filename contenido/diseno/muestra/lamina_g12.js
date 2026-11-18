/* Lámina G-12 «Qué es un acorde»: la foto de ChatGPT (acorde en general) + el diagrama exacto de Mi menor (Em).
   Uso: node lamina_g12.js  → img_ia/G12_acorde_lamina.svg (la foto va dentro, así el archivo funciona solo) */
const fs = require('fs'), path = require('path');
const D = __dirname, foto = fs.readFileSync(path.join(D, 'img_ia', 'G12_acorde.jpg')).toString('base64');
const W = 1600, H = 900, PX = 960;               /* foto a la izquierda (0–960), panel a la derecha */
const NC = { Mi: '#FFD21F', Si: '#8E3BB8', Sol: '#2AA7E8' }, TX = { Mi: '#1A1A1A', Si: '#fff', Sol: '#1A1A1A' };
/* Em: cuerdas 6→1 = 0 2 2 0 0 0 · dedo 2 en la 5.ª, dedo 3 en la 4.ª */
const traste = [0, 2, 2, 0, 0, 0], dedo = [null, 2, 3, null, null, null], suena = ['Mi', 'Si', 'Mi', 'Sol', 'Si', 'Mi'], cuerda = ['MI', 'LA', 'RE', 'SOL', 'SI', 'MI'];
const gx = 1080, gw = 400, gy = 300, fh = 92, NF = 4, sx = i => gx + i * gw / 5, fy = f => gy + f * fh;
const F = 'font-family="Jost,Segoe UI,Arial,sans-serif"', T = 'font-family="Cormorant Garamond,Georgia,serif"';
let d = '';
d += `<rect x="${gx - 6}" y="${gy - 14}" width="${gw + 12}" height="14" rx="3" fill="#f4ecd8"/>`;                       /* cejuela */
for (let f = 1; f <= NF; f++) d += `<line x1="${gx}" y1="${fy(f)}" x2="${gx + gw}" y2="${fy(f)}" stroke="#8d8f93" stroke-width="4"/>`;
for (let f = 0; f < NF; f++) d += `<text x="${gx - 34}" y="${fy(f) + fh / 2 + 9}" text-anchor="middle" ${F} font-size="24" fill="#aca392">${f + 1}</text>`;
for (let i = 0; i < 6; i++) d += `<line x1="${sx(i)}" y1="${gy}" x2="${sx(i)}" y2="${fy(NF)}" stroke="${i < 3 ? '#d8c9a6' : '#eee7da'}" stroke-width="${[6, 5, 4.4, 3.4, 2.8, 2.2][i]}"/>`;
for (let i = 0; i < 6; i++) {
  const x = sx(i);
  if (traste[i] === 0) d += `<circle cx="${x}" cy="${gy - 46}" r="17" fill="none" stroke="#fbf7ef" stroke-width="5"/>`;
  else { const y = fy(traste[i] - 1) + fh / 2; d += `<circle cx="${x}" cy="${y}" r="32" fill="#f2b93b" stroke="#1b1206" stroke-width="4"/><text x="${x}" y="${y + 12}" text-anchor="middle" ${F} font-size="34" font-weight="700" fill="#1b1206">${dedo[i]}</text>`; }
  const n = suena[i]; d += `<rect x="${x - 30}" y="${fy(NF) + 26}" width="60" height="38" rx="19" fill="${NC[n]}"/><text x="${x}" y="${fy(NF) + 53}" text-anchor="middle" ${F} font-size="21" font-weight="700" fill="${TX[n]}">${n}</text>`;
  d += `<text x="${x}" y="${fy(NF) + 98}" text-anchor="middle" ${F} font-size="17" fill="#aca392">${6 - i}.ª</text>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Qué es un acorde: el acorde de Mi menor (Em)">
<title>Qué es un acorde · Mi menor (Em)</title>
<defs><linearGradient id="fade" x1="0" x2="1"><stop offset=".78" stop-color="#0b0907" stop-opacity="0"/><stop offset="1" stop-color="#0b0907"/></linearGradient>
<clipPath id="cf"><rect width="${PX}" height="${H}"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="#0b0907"/>
<image clip-path="url(#cf)" x="${PX / 2 - 675}" y="0" width="1350" height="900" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${foto}" xlink:href="data:image/jpeg;base64,${foto}"/>
<rect width="${PX}" height="${H}" fill="url(#fade)"/>
<text x="48" y="${H - 54}" ${T} font-size="46" font-weight="600" fill="#fbf7ef">Un acorde = varias notas a la vez</text>
<text x="48" y="${H - 20}" ${F} font-size="22" fill="#e9dcc8">Las cuerdas suenan juntas y forman un solo sonido.</text>
<text x="${gx + gw / 2}" y="92" text-anchor="middle" ${F} font-size="20" font-weight="600" letter-spacing="5" fill="#f2a31b">ASÍ SE TOCA</text>
<text x="${gx + gw / 2}" y="158" text-anchor="middle" ${T} font-size="64" font-weight="700" fill="#fbf7ef">Em · Mi menor</text>
<text x="${gx + gw / 2}" y="204" text-anchor="middle" ${F} font-size="21" fill="#aca392">Dedo 2 y dedo 3, los dos en el traste 2</text>
${d}
<text x="${gx + gw / 2}" y="${H - 22}" text-anchor="middle" ${F} font-size="18" fill="#aca392">○ cuerda al aire · número = dedo de la mano izquierda</text>
</svg>`;
fs.writeFileSync(path.join(D, 'img_ia', 'G12_acorde_lamina.svg'), svg); console.log('ok', (svg.length / 1024).toFixed(0), 'KB');
