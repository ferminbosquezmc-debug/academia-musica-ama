/* Imágenes de ChatGPT con números interactivos encima (la imagen no lleva texto; los números y nombres los pone la plataforma) */
const MK = (cls, n, x, y, r) => `<g class="${cls}" data-${cls === 'mk' ? 'p' : 's'}="${n}" tabindex="0" role="button" aria-label="${cls === 'mk' ? 'Parte' : 'Paso'} ${n}"><circle cx="${x}" cy="${y}" r="${r}" fill="#f2b93b" stroke="#1b1206" stroke-width="${r / 6}"/><text x="${x}" y="${y + r * .36}" text-anchor="middle" font-family="Jost,sans-serif" font-size="${r * 1.05}" font-weight="700" fill="#1b1206">${n}</text></g>`;
const LINE = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f2b93b" stroke-width="5" stroke-dasharray="10 8" opacity=".85"/>`;
function partes(id) {
  const W = 1086, H = 1448, R = 30;
  const hl = [[1, '<rect x="470" y="12" width="150" height="255" rx="30"/>'], [2, '<rect x="440" y="80" width="40" height="160" rx="14"/><rect x="608" y="80" width="40" height="160" rx="14"/>'], [3, '<rect x="488" y="262" width="114" height="24" rx="6"/>'],
    [4, '<rect x="482" y="278" width="126" height="420" rx="10"/>'], [5, '<rect x="494" y="280" width="102" height="545" rx="6"/>'], [6, '<rect x="488" y="330" width="114" height="230" rx="6"/>'], [7, '<circle cx="545" cy="905" r="80"/>'],
    [8, '<rect x="512" y="270" width="66" height="900" rx="12"/>'], [9, '<path d="M545,684 C450,684 345,700 340,790 C336,860 372,900 362,950 C350,1010 262,1060 262,1200 C262,1330 380,1398 545,1398 C710,1398 828,1330 828,1200 C828,1060 740,1010 728,950 C718,900 754,860 750,790 C745,700 640,684 545,684 Z"/>'], [10, '<rect x="400" y="1138" width="288" height="48" rx="8"/>']];
  const mk = [[1, 545, 48], [2, 700, 160], [3, 680, 274], [4, 420, 520], [5, 545, 470], [6, 680, 420], [7, 545, 905], [8, 640, 1060], [9, 740, 1290], [10, 760, 1162]];
  return `<svg class="gtr foto" ${id ? `id="${id}"` : ''} viewBox="0 0 ${W} ${H}" role="group" aria-label="Partes de la guitarra clásica"><defs><filter id="fGlow2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<image href="img/G02_partes_guitarra.jpg" x="0" y="0" width="${W}" height="${H}"/>
<g>${LINE(602, 274, 650, 274)}${LINE(482, 520, 450, 520)}${LINE(602, 420, 650, 420)}${LINE(688, 1162, 730, 1162)}${LINE(648, 160, 670, 160)}</g>
<g class="hls" style="--w:7px">${hl.map(([n, s]) => `<g class="hl" data-h="${n}" style="stroke-width:8px;filter:url(#fGlow2)">${s}</g>`).join('')}</g>
${mk.map(([n, x, y]) => MK('mk', n, x, y, R)).join('')}</svg>`;
}
function postura() {
  const W = 1122, H = 1402, R = 32;
  const mk = [[1, 560, 1300], [2, 560, 905], [3, 300, 820], [4, 560, 420], [5, 1000, 180], [6, 300, 520], [7, 960, 360]];
  return `<svg class="post foto" viewBox="0 0 ${W} ${H}" role="group" aria-label="Postura con la guitarra en 7 pasos"><image href="img/G03_postura.jpg" x="0" y="0" width="${W}" height="${H}"/>${mk.map(([n, x, y]) => MK('pm', n, x, y, R)).join('')}</svg>`;
}
function mano(izq) {
  const lab = izq ? [['1', 880, 200, '#2AA7E8'], ['2', 637, 105, '#2E9E4F'], ['3', 430, 190, '#F57C00'], ['4', 252, 360, '#8E3BB8'], ['atrás', 1135, 660, '#6b6457']] : [['i', 420, 195, '#2AA7E8'], ['m', 640, 110, '#2E9E4F'], ['a', 855, 195, '#F57C00'], ['p', 210, 610, '#E5312B']];
  return `<svg class="mano foto" viewBox="0 0 1254 1254" role="img" aria-label="Mano ${izq ? 'izquierda' : 'derecha'}"><image href="img/G0${izq ? '4_mano_izquierda' : '5_mano_derecha'}.jpg" x="0" y="0" width="1254" height="1254"/>${lab.map(([t, x, y, c]) => `<circle cx="${x}" cy="${y}" r="${t.length > 1 ? 52 : 46}" fill="${c}" stroke="#1b1206" stroke-width="6"/><text x="${x}" y="${y + (t.length > 1 ? 12 : 18)}" text-anchor="middle" font-family="Jost,sans-serif" font-weight="700" font-size="${t.length > 1 ? 32 : 54}" fill="${c === '#2AA7E8' || c === '#2E9E4F' || c === '#F57C00' ? '#111' : '#fff'}">${t}</text>`).join('')}</svg>`;
}
module.exports = { partes, postura, mano };
