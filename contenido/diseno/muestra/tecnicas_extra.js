/* Láminas extra pedidas por el director. Uso: node tecnicas_extra.js → img_tec/*.svg */
const fs = require('fs'), path = require('path');
const { C, W, txt, svg, acorde } = require('./tecnicas_motor.js');
const out = (n, h, label, b) => fs.writeFileSync(path.join(__dirname, 'img_tec', n + '.svg'), svg(h, label, b));

/* Cinco formas de tocar FA (F mayor). tr: 6.ª → 1.ª, relativos al traste inicial (base) */
(() => { const F = [
    ['1', 'cejilla completa', [1, 3, 3, 2, 1, 1], [1, 3, 4, 2, 1, 1], ['FA', 'DO', 'FA', 'LA', 'DO', 'FA'], [1, 0, 5], 1],
    ['2', 'sin la 6.ª ni la 1.ª', ['x', 3, 3, 2, 1, 'x'], [0, 3, 4, 2, 1, 0], ['', 'DO', 'FA', 'LA', 'DO', ''], null, 1],
    ['3', 'pequeño · mini cejilla', ['x', 'x', 3, 2, 1, 1], [0, 0, 3, 2, 1, 1], ['', '', 'FA', 'LA', 'DO', 'FA'], [1, 4, 5], 1],
    ['4', 'tres cuerdas · traste 5', ['x', 'x', 'x', 1, 2, 1], [0, 0, 0, 2, 3, 1], ['', '', '', 'DO', 'FA', 'LA'], null, 5],
    ['5', 'arriba · traste 8', ['x', 'x', 3, 3, 3, 1], [0, 0, 3, 3, 3, 1], ['', '', 'DO', 'FA', 'LA', 'DO'], null, 8]];
  let b = '', hh = 0; const cw = 470, rowH = acorde(0, 0, cw, 'F', '', [0, 0, 0, 0, 0, 0], [], ['MI', '', '', '', '', '']).h + 40;
  F.forEach(([n, sub, tr, de, ch, ceja, base], i) => { const solo = i === 4, x = solo ? (W - cw) / 2 : 20 + (i % 2) * (cw + 20), y = 10 + Math.floor(i / 2) * rowH;
    const r = acorde(x, y, cw, 'F', 'Forma ' + n + ' · ' + sub, tr, de, ch, ceja, base); b += r.b; hh = Math.max(hh, y + r.h); });
  b += txt(W / 2, hh + 44, 'Las cinco suenan FA – LA – DO: cambia el lugar del mástil', { size: 28, w: 600, fill: C.GOLD });
  b += txt(W / 2, hh + 84, 'El número dorado de la izquierda es el traste donde empieza', { size: 24, w: 600, fill: C.MUTE });
  out('G_formas_fa', hh + 116, 'Cinco formas de tocar el acorde de FA en la guitarra', b); })();
console.log('ok extra');
