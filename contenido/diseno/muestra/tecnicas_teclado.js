/* Teclado del piano con colores AMA (compartido por las láminas de piano N2 y N3) */
const { C, NOTA, txt, f1 } = require('./tecnicas_motor.js');
const DK = '#1b1206', NS = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];
const circ = (x, y, r, t, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${o.fill || C.GOLD}" stroke="${o.stroke || DK}" stroke-width="3"/>` + txt(x, y + r * .38, t, { size: f1(o.size || r * 1.05), w: 700, fill: o.tx || DK });
function teclado({ x, y, n, kw, h = kw * 3.4, ini = 0, col = {}, neg = {}, negCol = {}, dedos = {}, dedosN = {}, abajo = {}, abajoN = {}, nombres = true, todos = false, fz }) {
  let b = ''; const kx = i => x + (i + .5) * kw, bw = kw * .6, bh = h * .6, F = fz || Math.min(24, kw * .34);
  b += `<rect x="${f1(x - 6)}" y="${f1(y - 6)}" width="${f1(n * kw + 12)}" height="${f1(h + 12)}" rx="10" fill="#2a1d12"/>`;
  for (let i = 0; i < n; i++) { const nm = col[i]; b += `<rect x="${f1(x + i * kw + 1.5)}" y="${f1(y)}" width="${f1(kw - 3)}" height="${f1(h)}" rx="6" fill="${nm ? NOTA[nm][0] : '#f4efe6'}"/>`;
    const lab = nm && nombres ? nm : todos ? NS[(i + ini) % 7] : ''; if (lab) b += txt(kx(i), y + h - 14, lab, { size: f1(F), w: 700, fill: nm ? NOTA[nm][1] : '#3a3226' }); }
  for (let i = 0; i < n - 1; i++) if ([0, 1, 3, 4, 5].includes((i + ini) % 7)) { const xb = x + (i + 1) * kw, c = negCol[i];
    b += `<rect x="${f1(xb - bw / 2)}" y="${f1(y)}" width="${f1(bw)}" height="${f1(bh)}" rx="4" fill="${c ? NOTA[c][0] : '#0f0d0b'}" stroke="${c ? C.IV : '#000'}" stroke-width="2"/>`;
    if (neg[i]) neg[i].split('/').forEach((t, j, a) => b += txt(xb, y + bh - 14 - (a.length - 1 - j) * (F + 4), t, { size: f1(F * .82), w: 700, fill: c ? NOTA[c][1] : C.IV })); }
  Object.entries(dedos).forEach(([i, d]) => b += circ(kx(+i), y - 32, 21, d, { size: 23 }));
  Object.entries(dedosN).forEach(([i, d]) => b += circ(x + (+i + 1) * kw, y - 32, 21, d, { size: 23 }));
  Object.entries(abajo).forEach(([i, d]) => b += circ(kx(+i), y + h + 34, 21, d, { size: 23, fill: C.IV }));
  Object.entries(abajoN).forEach(([i, d]) => b += circ(x + (+i + 1) * kw, y + h + 34, 21, d, { size: 23, fill: C.IV }));
  return { b, kx, kn: i => x + (i + 1) * kw };
}
module.exports = { teclado, circ };
