/* Gran pentagrama (clave de sol arriba, clave de fa abajo) para el piano, alineado por tiempos.
   medidas = [{ s: [eventos clave de sol], f: [eventos clave de fa], c: 'C' (cifrado opcional) }]
   evento = { p: 'DO4' | ps: ['DO3','MI3','SOL3'], d: 'w'|'h'|'q'|'e'|'h.'|'q.'|'qr'|'hr'|'wr', f, iz, sil, cnt, lig } */
const { C, NOTA, W, txt, f1, pent, clave, cabeza, silNegra } = require('./tecnicas_motor.js');
const IDX = { DO: 0, RE: 1, MI: 2, FA: 3, SOL: 4, LA: 5, SI: 6 }, BASE = { s: 30, f: 18 };
const parse = p => { const m = /^(DO|RE|MI|FA|SOL|LA|SI)([♯♭♮]?)(\d)$/.exec(p); if (!m) throw new Error('nota ' + p); return { n: m[1], acc: m[2], di: +m[3] * 7 + IDX[m[1]] }; };
const DUR = { w: 4, h: 2, q: 1, e: .5, 'h.': 3, 'q.': 1.5, wr: 4, hr: 2, qr: 1 };
const pill = (x, y, lab, n, w = 80, h = 40) => { const [c, t] = NOTA[n]; w = lab.length > 3 ? w + 18 : lab.length > 2 ? w + 8 : w; return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" stroke="${C.IV}" stroke-width="2"/>` + txt(x, y + h * .25, lab, { size: f1(h * .58), w: 700, fill: t }); };
function claveFa(x, top, s) { const k = s / 42, X = v => f1(x + v * k), Y = v => f1(top + s + v * k);
  return `<circle cx="${X(0)}" cy="${Y(0)}" r="${f1(15 * k)}" fill="${C.IV}"/><path d="M${X(-4.2)} ${Y(-10.5)} C${X(8.4)} ${Y(-52.5)} ${X(75.6)} ${Y(-50.4)} ${X(73.5)} ${Y(8.4)} C${X(71.4)} ${Y(63)} ${X(27.3)} ${Y(96.6)} ${X(-16.8)} ${Y(117.6)}" fill="none" stroke="${C.IV}" stroke-width="${f1(12.6 * k)}" stroke-linecap="round"/><circle cx="${X(96.6)}" cy="${Y(-21)}" r="${f1(7.2 * k)}" fill="${C.IV}"/><circle cx="${X(96.6)}" cy="${Y(21)}" r="${f1(7.2 * k)}" fill="${C.IV}"/>`; }

function gran({ medidas, compas = ['4', '4'], porLinea = 2, s = 30, filasS = [], filasF = [], chipsS = true, chipsF = false, sinColor = false, cifra = false, y0 = 20, sinCompas = false, soloFa = false, arm = [] }) {
  let b = '', y = y0; const beats = +compas[0] * 4 / +compas[1], lineas = [], dos = medidas.some(m => m.f);
  for (let i = 0; i < medidas.length; i += porLinea) lineas.push(medidas.slice(i, i + porLinea));
  const filaTx = (filas, e, x, yy) => filas.map(([k], j) => e[k] === undefined || e[k] === '' ? '' : k === 'iz' ? pill(x, yy(j) - 8, e[k], e[k].replace(/[♯♭]/, ''), 70, 34) : txt(x, yy(j), e[k], { size: k === 'f' ? 28 : 24, w: 700, fill: k === 'f' ? C.IV : k === 'sil' ? C.GOLD : C.MUTE })).join('');
  lineas.forEach((ln, li) => {
    const xL = 40, xR = W - 30, head = (li === 0 && !sinCompas ? 200 : 120) + arm.length * 34, mw = (xR - xL - head) / porLinea;
    const topS = y + (cifra ? 3.6 : 3) * s, botS = topS + 4 * s, chipS = botS + 2 * s + 6, rS = j => chipS + (chipsS ? 50 : 22) + j * 46;
    const finS = filasS.length ? rS(filasS.length - 1) + 14 : chipsS ? chipS + 24 : botS + 1.4 * s;
    const topF = dos ? finS + 2.6 * s : 0, botF = topF + 4 * s, chipF = botF + 2 * s + 6, rF = j => chipF + (chipsF ? 50 : 22) + j * 46;
    const finF = dos ? (filasF.length ? rF(filasF.length - 1) + 14 : chipsF ? chipF + 24 : botF + 1.6 * s) : finS;
    const staffs = [['s', topS, botS]].concat(dos ? [['f', topF, botF]] : []), CL = cl => cl === 's' && soloFa ? 'f' : cl;
    staffs.forEach(([cl, top, bot]) => { b += pent(xL, xR, top, s) + (CL(cl) === 's' ? clave(xL + 6, bot, s) : claveFa(xL + 22, top, s));
      arm.forEach((a, j) => { const stp = (CL(cl) === 's' ? { FA: 8, DO: 5, SOL: 9 } : { FA: 6, DO: 3, SOL: 7 })[a]; b += txt(xL + 128 + j * 30, bot - stp * s / 2 + s * .45, '♯', { serif: 1, size: f1(s * 1.7), w: 700, fill: C.GOLD }); });
      if (li === 0 && !sinCompas) b += txt(xL + 150 + arm.length * 34, top + 2 * s - 3, compas[0], { serif: 1, size: f1(2.4 * s), w: 700 }) + txt(xL + 150, bot - 3, compas[1], { serif: 1, size: f1(2.4 * s), w: 700 }); });
    if (dos) b += `<line x1="${xL}" y1="${topS}" x2="${xL}" y2="${botF}" stroke="${C.LINE}" stroke-width="4"/><path d="M${xL - 10},${topS} Q${xL - 26},${topS} ${xL - 24},${(topS + botF) / 2 - 30} Q${xL - 22},${(topS + botF) / 2} ${xL - 34},${(topS + botF) / 2} Q${xL - 22},${(topS + botF) / 2} ${xL - 24},${(topS + botF) / 2 + 30} Q${xL - 26},${botF} ${xL - 10},${botF}" fill="none" stroke="${C.LINE}" stroke-width="4"/>`;
    ln.forEach((m, mi) => { const x0 = xL + head + mi * mw, x1 = x0 + mw, ult = li === lineas.length - 1 && mi === ln.length - 1, xt = t => x0 + 40 + t / beats * (mw - 70);
      if (cifra && m.c) b += txt(x0 + 40, topS - 1.3 * s, m.c, { serif: 1, size: 36, w: 700, fill: C.GOLD });
      staffs.forEach(([cl, top, bot]) => { const ev = m[cl] || [], tops = []; let t = 0, prevX = null; const WG = d => .55 + .45 * DUR[d], totW = Math.max(ev.reduce((a, z) => a + WG(z.d), 0), beats * .9 + .55), cum = []; ev.reduce((a, z, i) => (cum[i] = a, a + WG(z.d)), 0);
        ev.forEach((e, k) => { const x = x0 + 40 + cum[k] / totW * (mw - 70); const dur = DUR[e.d]; t = (e.t !== undefined ? e.t : t) + dur;
          const rows = cl === 's' ? filasS : filasF, ry = cl === 's' ? rS : rF; b += filaTx(rows, e, x, ry);
          if (e.d.endsWith('r')) { tops.push(null); b += e.d === 'qr' ? silNegra(x, top + 2 * s, 3 * s) : e.d === 'hr' ? `<rect x="${f1(x - s * .6)}" y="${f1(top + 1.5 * s)}" width="${f1(s * 1.2)}" height="${f1(s * .5)}" fill="${C.IV}"/>` : `<rect x="${f1(x - s * .6)}" y="${f1(top + s)}" width="${f1(s * 1.2)}" height="${f1(s * .5)}" fill="${C.IV}"/>`; return; }
          const ps = (e.ps || [e.p]).map(parse).map(p => (!p.acc && arm.includes(p.n) ? Object.assign(p, { lab: '♯' }) : p)), st = ps.map(p => p.di - BASE[CL(cl)]), ys = st.map(v => bot - v * s / 2), hueca = /^[wh]/.test(e.d);
          const lo = Math.min(...st), hi = Math.max(...st); for (let l = -2; l >= lo; l -= 2) b += `<line x1="${f1(x - s)}" y1="${f1(bot - l * s / 2)}" x2="${f1(x + s)}" y2="${f1(bot - l * s / 2)}" stroke="${C.LINE}" stroke-width="3"/>`;
          for (let l = 10; l <= hi; l += 2) b += `<line x1="${f1(x - s)}" y1="${f1(bot - l * s / 2)}" x2="${f1(x + s)}" y2="${f1(bot - l * s / 2)}" stroke="${C.LINE}" stroke-width="3"/>`;
          const orden = st.map((v, i) => i).sort((a, c) => st[a] - st[c]); let prevSt = null, shift = 0;
          orden.forEach(i => { const p = ps[i]; shift = prevSt !== null && st[i] - prevSt === 1 && !shift ? s * 1.15 : 0; prevSt = st[i]; const hx = x + shift;
            b += cabeza(hx, ys[i], s, sinColor ? C.IV : NOTA[p.n][0], hueca);
            if (p.acc) b += txt(hx - s * 1.25, ys[i] + s * .45, p.acc, { serif: 1, size: f1(s * 1.6), w: 700, fill: C.GOLD });
            if (e.d.endsWith('.')) { const dy = st[i] % 2 === 0 ? -s / 2 : 0; b += `<circle cx="${f1(hx + s * 1.05)}" cy="${f1(ys[i] + dy)}" r="${f1(s * .16)}" fill="${C.IV}"/>`; } });
          if (!/^w/.test(e.d)) { const dn = st.reduce((a, v) => a + v, 0) / st.length >= 4, sx = dn ? x - s * .58 : x + s * .58, yA = dn ? Math.min(...ys) : Math.max(...ys), yB = dn ? Math.max(...ys) + 3.4 * s : Math.min(...ys) - 3.4 * s;
            b += `<line x1="${f1(sx)}" y1="${f1(yA)}" x2="${f1(sx)}" y2="${f1(yB)}" stroke="${C.IV}" stroke-width="4"/>`; tops.push(e.d === 'e' ? [sx, yB, dn] : null); } else tops.push(null);
          if (e.lig && ev[k + 1]) { const xn = x0 + 40 + cum[k + 1] / totW * (mw - 70), yy = Math.max(...ys) + s * .7; b += `<path d="M${f1(x + s * .5)},${f1(yy)} Q${f1((x + xn) / 2)},${f1(yy + s * 1.1)} ${f1(xn - s * .5)},${f1(yy)}" fill="none" stroke="${C.GOLD}" stroke-width="4"/>`; }
          const tight = (mw - 70) / beats < 95, pw = tight ? 62 : 80, ph = tight ? 34 : 40;
          if (e.stac) { const dn0 = st.reduce((a, v) => a + v, 0) / st.length >= 4; b += `<circle cx="${f1(x)}" cy="${f1(dn0 ? Math.min(...ys) - s * .9 : Math.max(...ys) + s * .9)}" r="${f1(s * .17)}" fill="${C.GOLD}"/>`; }
          if (e.frase) { const kk = Math.min(ev.length - 1, k + e.frase - 1), xe = x0 + 40 + cum[kk] / totW * (mw - 70), yy = Math.max(...ys, bot) + s * .9; b += `<path d="M${f1(x)},${f1(yy)} Q${f1((x + xe) / 2)},${f1(yy + s * 1.6)} ${f1(xe)},${f1(yy)}" fill="none" stroke="${C.GOLD}" stroke-width="4"/>`; }
          if (cl === 's' && chipsS && !e.ps) b += sinColor ? `<rect x="${f1(x - pw / 2 + 4)}" y="${f1(chipS - 22)}" width="${pw - 8}" height="44" rx="10" fill="none" stroke="${C.LINE}" stroke-width="2.5"/>` : pill(x, chipS, ps[0].n + (ps[0].acc || ps[0].lab || ''), ps[0].n, pw, ph);
          if (cl === 'f' && chipsF && !e.ps) b += pill(x, chipF, ps[0].n + ps[0].acc, ps[0].n); });
        const usados = new Set(); for (let j = 0; j < tops.length - 1; j++) if (tops[j] && tops[j + 1]) { usados.add(j); usados.add(j + 1); const [ax, ay, dn] = tops[j], [bx, by] = tops[j + 1], yy = dn ? Math.max(ay, by) : Math.min(ay, by); b += `<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(ax)}" y2="${f1(yy)}" stroke="${C.IV}" stroke-width="4"/><line x1="${f1(bx)}" y1="${f1(by)}" x2="${f1(bx)}" y2="${f1(yy)}" stroke="${C.IV}" stroke-width="4"/><rect x="${f1(ax - 2)}" y="${f1(dn ? yy - 12 : yy)}" width="${f1(bx - ax + 4)}" height="12" fill="${C.IV}"/>`; j++; }
        tops.forEach((tp, j) => { if (tp && !usados.has(j)) { const [ax, ay, dn] = tp, d = dn ? -1 : 1; b += `<path d="M${f1(ax)},${f1(ay)} C${f1(ax + 8)},${f1(ay + d * 26)} ${f1(ax + 34)},${f1(ay + d * 30)} ${f1(ax + 24)},${f1(ay + d * 62)}" fill="none" stroke="${C.IV}" stroke-width="6" stroke-linecap="round"/>`; } }); });
      const yb1 = topS, yb2 = dos ? botF : botS;
      b += ult ? `<line x1="${x1 - 14}" y1="${yb1}" x2="${x1 - 14}" y2="${yb2}" stroke="${C.LINE}" stroke-width="3"/><rect x="${x1 - 8}" y="${yb1}" width="9" height="${yb2 - yb1}" fill="${C.LINE}"/>` : `<line x1="${x1}" y1="${yb1}" x2="${x1}" y2="${yb2}" stroke="${C.LINE}" stroke-width="3"/>`;
      if (dos && !ult) { b += `<rect x="${x1 - 2}" y="${botS + 1}" width="4" height="${topF - botS - 2}" fill="${C.BG}"/>`; } });
    if (li === 0) { filasS.forEach(([k, lab], j) => { if (lab) b += txt(xL + 2, rS(j), lab, { a: 'start', size: 20, w: 700, fill: C.GOLD }); }); filasF.forEach(([k, lab], j) => { if (lab) b += txt(xL + 2, rF(j), lab, { a: 'start', size: 20, w: 700, fill: C.GOLD }); }); }
    y = finF + 34;
  });
  return { b, h: y };
}
module.exports = { gran, claveFa, pill, parse };
