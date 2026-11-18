/* Dibujos de la muestra: tres tipos de guitarra, postura en 7 pasos y manos (mismo estilo que la lámina nueva) */
const L = 640, NUT = 158, fy = n => NUT + L * (1 - Math.pow(2, -n / 12));
const BODY = {
  clasica: 'M200,462 C255,462 323,470 328,530 C332,575 290,592 292,625 C295,660 361,690 361,770 C361,845 288,882 200,882 C112,882 39,845 39,770 C39,690 105,660 108,625 C110,592 68,575 72,530 C77,470 145,462 200,462 Z',
  acustica: 'M200,452 C272,452 326,458 330,532 C333,594 304,612 306,640 C308,672 360,700 360,792 C360,862 296,884 200,884 C104,884 40,862 40,792 C40,700 92,672 94,640 C96,612 67,594 70,532 C74,458 128,452 200,452 Z',
  electrica: 'M146.2,520 C135.0,470 85.8,440 65.6,470 C47.7,500 83.5,548 74.6,600 C65.6,650 34.2,690 49.9,770 C67.8,850 150.7,886 229.1,880 C316.5,872 368.0,826 361.3,758 C354.6,694 314.2,664 327.7,616 C341.1,570 370.2,520 352.3,486 C334.4,452 287.4,470 269.4,500 C256.0,522 161.9,540 146.2,520 Z' };
function defs(p) {
  return `<defs>
 <linearGradient id="${p}tp" x1="0" x2="1"><stop offset="0" stop-color="#d49a52"/><stop offset=".5" stop-color="#f3cc86"/><stop offset="1" stop-color="#c98a43"/></linearGradient>
 <linearGradient id="${p}tpa" x1="0" x2="1"><stop offset="0" stop-color="#e2b779"/><stop offset=".5" stop-color="#f8dfa9"/><stop offset="1" stop-color="#ddb06d"/></linearGradient>
 <radialGradient id="${p}burst" cx=".5" cy=".6" r=".62"><stop offset=".55" stop-color="#3b1606" stop-opacity="0"/><stop offset=".85" stop-color="#3b1606" stop-opacity=".55"/><stop offset="1" stop-color="#1e0a03" stop-opacity=".9"/></radialGradient>
 <radialGradient id="${p}edge" cx=".5" cy=".55" r=".62"><stop offset=".62" stop-color="#3b1d08" stop-opacity="0"/><stop offset="1" stop-color="#3b1d08" stop-opacity=".5"/></radialGradient>
 <linearGradient id="${p}red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5463b"/><stop offset=".55" stop-color="#b81d17"/><stop offset="1" stop-color="#6e0d0a"/></linearGradient>
 <linearGradient id="${p}shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <linearGradient id="${p}neck" x1="0" x2="1"><stop offset="0" stop-color="#5a2f17"/><stop offset=".5" stop-color="#8b4e27"/><stop offset="1" stop-color="#5a2f17"/></linearGradient>
 <linearGradient id="${p}maple" x1="0" x2="1"><stop offset="0" stop-color="#d8a865"/><stop offset=".5" stop-color="#f2d29a"/><stop offset="1" stop-color="#d8a865"/></linearGradient>
 <linearGradient id="${p}board" x1="0" x2="1"><stop offset="0" stop-color="#1c120c"/><stop offset=".5" stop-color="#3a2618"/><stop offset="1" stop-color="#1c120c"/></linearGradient>
 <linearGradient id="${p}fret" x1="0" x2="1"><stop offset="0" stop-color="#8d8f93"/><stop offset=".5" stop-color="#f4f5f7"/><stop offset="1" stop-color="#8d8f93"/></linearGradient>
 <linearGradient id="${p}chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#b9bec6"/><stop offset="1" stop-color="#6d737c"/></linearGradient>
 <linearGradient id="${p}gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#b8861f"/></linearGradient>
 <radialGradient id="${p}pearl" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#b9ab90"/></radialGradient>
 <radialGradient id="${p}hole" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#0d0805"/><stop offset="1" stop-color="#3a2210"/></radialGradient>
 <pattern id="${p}grain" width="7" height="60" patternUnits="userSpaceOnUse"><line x1="2" y1="0" x2="2.6" y2="60" stroke="#7a4a1e" stroke-opacity=".16" stroke-width="1"/></pattern>
 <radialGradient id="${p}sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>`;
}
function frets(p, x0a, x0b, x1a, x1b, end, stroke) { let s = ''; const xa = (y, a, b) => a + (b - a) * (y - NUT) / (end - NUT);
  for (let n = 1; n < 22; n++) { const y = fy(n); if (y > end - 3) break; s += `<line x1="${xa(y, x0a, x1a).toFixed(1)}" y1="${y.toFixed(1)}" x2="${xa(y, x0b, x1b).toFixed(1)}" y2="${y.toFixed(1)}" stroke="url(#${p}fret)" stroke-width="2.6"/>`; } return s; }
function dots(end, col) { return [3, 5, 7, 9].map(n => (fy(n - 1) + fy(n)) / 2).concat([]).filter(y => y < end).map(y => `<circle cx="200" cy="${y.toFixed(1)}" r="5" fill="${col}"/>`).join('') + ((fy(11) + fy(12)) / 2 < end ? `<circle cx="190" cy="${((fy(11) + fy(12)) / 2).toFixed(1)}" r="5" fill="${col}"/><circle cx="210" cy="${((fy(11) + fy(12)) / 2).toFixed(1)}" r="5" fill="${col}"/>` : ''); }
function strings(sad, steel, xs0, xs1) { let s = ''; for (let i = 0; i < 6; i++) { const xn = 172.5 + i * 11, xs = xs0 + i * (xs1 - xs0) / 5, w = steel ? [1.9, 1.7, 1.5, 1.2, 1, .8][i] : [2.4, 2.1, 1.8, 1.6, 1.35, 1.15][i], c = steel ? '#e6e8ec' : i < 3 ? '#e8dcc0' : '#f3ede1';
  s += `<line x1="${xn}" y1="${NUT + 2}" x2="${xs.toFixed(1)}" y2="${sad}" stroke="${c}" stroke-width="${w}"/>`; } return s; }
function tipo(t) {
  const p = 't' + t[0], b = BODY[t];
  let s = `<svg viewBox="20 0 360 920" class="tipo" role="img" aria-label="Guitarra ${t}">${defs(p)}<ellipse cx="205" cy="896" rx="160" ry="15" fill="url(#${p}sh)"/>`;
  if (t === 'clasica') {
    s += `<path d="M161,152 L150,40 Q150,22 168,20 L232,20 Q250,22 250,40 L239,152 Z" fill="url(#${p}neck)" stroke="#2a150a" stroke-width="2"/><rect x="173" y="44" width="15" height="92" rx="7" fill="#140b06"/><rect x="212" y="44" width="15" height="92" rx="7" fill="#140b06"/>`
      + [62, 92, 122].map(y => `<rect x="170" y="${y - 4.5}" width="60" height="9" rx="4.5" fill="url(#${p}pearl)"/><rect x="128" y="${y - 3}" width="22" height="6" fill="url(#${p}gold)"/><ellipse cx="116" cy="${y}" rx="13" ry="9" fill="url(#${p}pearl)"/><rect x="250" y="${y - 3}" width="22" height="6" fill="url(#${p}gold)"/><ellipse cx="284" cy="${y}" rx="13" ry="9" fill="url(#${p}pearl)"/>`).join('')
      + `<rect x="161" y="150" width="78" height="380" fill="url(#${p}neck)"/><path d="${b}" fill="url(#${p}tp)"/><path d="${b}" fill="url(#${p}grain)"/><path d="${b}" fill="url(#${p}edge)"/><path d="${b}" fill="url(#${p}shine)"/><path d="${b}" fill="none" stroke="#2a1608" stroke-width="5"/>`
      + `<circle cx="200" cy="575" r="58" fill="none" stroke="#3a2210" stroke-width="8" stroke-dasharray="4 3" opacity=".7"/><circle cx="200" cy="575" r="42" fill="url(#${p}hole)"/>`
      + `<path d="M166,${NUT} L234,${NUT} L240,528 Q200,536 160,528 Z" fill="url(#${p}board)"/>${frets(p, 166, 234, 160, 240, 528)}<rect x="164" y="${NUT - 8}" width="72" height="9" rx="2.5" fill="#f4ecd8"/>`
      + `<rect x="138" y="782" width="124" height="32" rx="6" fill="#2c1a0f"/><rect x="160" y="795" width="80" height="5" rx="2" fill="#f4ecd8"/>${strings(798, false, 167, 233)}`;
  } else if (t === 'acustica') {
    s += `<path d="M160,152 L148,34 Q160,14 200,12 Q240,14 252,34 L240,152 Z" fill="#1c120c" stroke="#000" stroke-width="2"/>` + [44, 80, 116].map(y => `<rect x="134" y="${y - 3}" width="16" height="6" fill="url(#${p}chrome)"/><path d="M118,${y - 10} h16 v20 h-16 q-8,-10 0,-20 Z" fill="url(#${p}chrome)"/><rect x="250" y="${y - 3}" width="16" height="6" fill="url(#${p}chrome)"/><path d="M282,${y - 10} h-16 v20 h16 q8,-10 0,-20 Z" fill="url(#${p}chrome)"/>`).join('')
      + `<rect x="161" y="150" width="78" height="320" fill="url(#${p}neck)"/><path d="${b}" fill="url(#${p}tpa)"/><path d="${b}" fill="url(#${p}grain)"/><path d="${b}" fill="url(#${p}burst)"/><path d="${b}" fill="url(#${p}shine)"/><path d="${b}" fill="none" stroke="#f2e6cc" stroke-width="5"/><path d="${b}" fill="none" stroke="#1a0c04" stroke-width="2"/>`
      + `<path d="M240,560 C300,560 318,610 300,650 C285,682 240,676 232,640 Z" fill="#160c08" opacity=".92"/><circle cx="200" cy="560" r="54" fill="none" stroke="#2a160a" stroke-width="5"/><circle cx="200" cy="560" r="40" fill="url(#${p}hole)"/>`
      + `<path d="M166,${NUT} L234,${NUT} L242,500 L158,500 Z" fill="url(#${p}board)"/>${dots(500, '#efe7d6')}${frets(p, 166, 234, 158, 242, 500)}<rect x="164" y="${NUT - 8}" width="72" height="9" rx="2.5" fill="#f4ecd8"/>`
      + `<path d="M132,778 Q200,766 268,778 L268,808 Q200,816 132,808 Z" fill="#1a0f08"/><rect x="164" y="782" width="72" height="4" rx="2" fill="#f4ecd8"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${172 + i * 11.2}" cy="797" r="3.4" fill="#f4ecd8"/>`).join('')}${strings(784, true, 172, 228)}`;
  } else {
    s += `<path d="M168,150 L162,60 Q160,30 182,18 Q210,6 236,24 Q262,40 254,64 Q246,84 226,90 L226,150 Z" fill="url(#${p}maple)" stroke="#8a6232" stroke-width="2"/>` + [36, 52, 68, 84, 100, 116].map((y, i) => `<circle cx="${244 - i * 2}" cy="${y + 4}" r="5" fill="url(#${p}chrome)"/><path d="M${250 - i * 2},${y} h18 q6,4 0,8 h-18 Z" fill="url(#${p}chrome)"/>`).join('')
      + `<rect x="163" y="150" width="74" height="380" fill="url(#${p}maple)"/><path d="${b}" fill="url(#${p}red)"/><path d="${b}" fill="url(#${p}shine)"/><path d="${b}" fill="none" stroke="#3a0705" stroke-width="3"/>`
      + `<path d="M150,540 C130,560 120,600 128,640 C134,690 120,720 132,760 C150,800 210,812 256,800 C300,788 318,760 308,720 C300,690 302,650 296,610 C292,575 270,548 250,540 Z" fill="#f3f0ea" stroke="#c9c4ba" stroke-width="2"/>`
      + `<path d="M166,${NUT} L234,${NUT} L236,560 L164,560 Z" fill="url(#${p}maple)"/>${dots(560, '#2a1a0c')}${frets(p, 166, 234, 164, 236, 560)}<rect x="164" y="${NUT - 7}" width="72" height="8" rx="2" fill="#f4ecd8"/>`
      + [600, 660, 714].map((y, i) => `<rect x="168" y="${y - 10 + (i === 2 ? 4 : 0)}" width="64" height="20" rx="10" fill="#f8f6f0" stroke="#bdb6aa" stroke-width="1.5" transform="rotate(${i === 2 ? -8 : 0} 200 ${y})"/>` + [0, 1, 2, 3, 4, 5].map(k => `<circle cx="${178 + k * 8.8}" cy="${y}" r="2.2" fill="#8a8f96" transform="rotate(${i === 2 ? -8 : 0} 200 ${y})"/>`).join('')).join('')
      + `<rect x="160" y="756" width="80" height="22" rx="3" fill="url(#${p}chrome)"/>` + [[268, 720], [282, 752], [288, 786]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#f3f0ea" stroke="#b6afa3" stroke-width="2"/>`).join('') + `<rect x="250" y="680" width="22" height="6" rx="3" fill="#f3f0ea" transform="rotate(-30 261 683)"/>`
      + strings(767, true, 172, 228)
      + `<path d="M306,836 C330,880 372,870 370,834" fill="none" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/>`;
  }
  return s + '</svg>';
}
/* Postura: estudiante sentado, vista de frente, con 7 marcas */
function postura(guitarra) {
  const T = 'translate(262 452) rotate(58) scale(.42) translate(-200 -700)';
  const g = guitarra.replace(/^<svg[^>]*>/, '').replace(/<defs>[\s\S]*?<\/defs>/, '').replace(/<g class="hls">[\s\S]*$/, '');
  const M = (n, x, y) => `<g class="pm" data-s="${n}" tabindex="0" role="button" aria-label="Paso ${n}"><circle cx="${x}" cy="${y}" r="16" fill="#f2b93b" stroke="#1b1206" stroke-width="2.5"/><text x="${x}" y="${y + 5.5}" text-anchor="middle" font-family="Jost,sans-serif" font-size="16" font-weight="700" fill="#1b1206">${n}</text></g>`;
  const skin = '#e6b48a', skinD = '#b9845a';
  return `<svg viewBox="80 40 470 600" class="post" role="group" aria-label="Postura con la guitarra en 7 pasos">
<defs><linearGradient id="pShirt" x1="0" x2="1"><stop offset="0" stop-color="#1f2a7a"/><stop offset=".5" stop-color="#2f3ea0"/><stop offset="1" stop-color="#1f2a7a"/></linearGradient>
<linearGradient id="pPants" x1="0" x2="1"><stop offset="0" stop-color="#2b2f3a"/><stop offset=".5" stop-color="#454b59"/><stop offset="1" stop-color="#2b2f3a"/></linearGradient>
<linearGradient id="pWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b5a2e"/><stop offset="1" stop-color="#5a3518"/></linearGradient>
<radialGradient id="pSkin" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f3caa2"/><stop offset="1" stop-color="${skin}"/></radialGradient></defs>
<ellipse cx="295" cy="616" rx="170" ry="14" fill="#000" opacity=".45"/>
<rect x="190" y="160" width="190" height="240" rx="14" fill="url(#pWood)" opacity=".9"/><rect x="204" y="176" width="162" height="10" rx="5" fill="#a77544" opacity=".6"/>
<rect x="186" y="418" width="14" height="194" rx="5" fill="#4a2c14"/><rect x="370" y="418" width="14" height="194" rx="5" fill="#4a2c14"/>
<path d="M172,398 L398,398 L392,422 L178,422 Z" fill="url(#pWood)"/><rect x="172" y="396" width="226" height="6" rx="3" fill="#b07a45"/>
<rect x="250" y="452" width="36" height="150" rx="16" fill="url(#pPants)"/><rect x="302" y="452" width="36" height="150" rx="16" fill="url(#pPants)"/>
<ellipse cx="266" cy="606" rx="30" ry="11" fill="#141414"/><ellipse cx="322" cy="606" rx="30" ry="11" fill="#141414"/>
<rect x="244" y="392" width="48" height="68" rx="22" fill="url(#pPants)"/><rect x="296" y="392" width="48" height="68" rx="22" fill="url(#pPants)"/>
<path d="M236,210 Q240,186 280,182 L304,182 Q342,186 348,210 L340,332 Q338,392 332,402 L252,402 Q246,392 244,332 Z" fill="url(#pShirt)"/>
<path d="M276,182 L292,206 L308,182" fill="none" stroke="#e9e6f5" stroke-width="3" opacity=".8"/>
<rect x="281" y="152" width="22" height="34" rx="9" fill="${skinD}"/>
<ellipse cx="292" cy="122" rx="36" ry="42" fill="url(#pSkin)"/>
<path d="M256,118 Q254,76 292,74 Q332,74 330,118 Q322,96 292,96 Q266,96 256,118 Z" fill="#2a1a12"/>
<circle cx="279" cy="124" r="3" fill="#2a1a12"/><circle cx="305" cy="124" r="3" fill="#2a1a12"/><path d="M282,144 Q292,151 302,144" fill="none" stroke="#9a5a3a" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="256" cy="124" rx="6" ry="10" fill="${skin}"/><ellipse cx="328" cy="124" rx="6" ry="10" fill="${skin}"/>
<path d="M344,212 Q392,240 402,300" fill="none" stroke="url(#pShirt)" stroke-width="30" stroke-linecap="round"/>
<g transform="${T}">${g}</g>
<path d="M402,300 Q412,330 420,350" fill="none" stroke="${skin}" stroke-width="22" stroke-linecap="round"/>
<ellipse cx="424" cy="352" rx="15" ry="20" fill="url(#pSkin)" stroke="${skinD}" stroke-width="1.5" transform="rotate(30 424 352)"/>
${[0, 1, 2, 3].map(i => `<ellipse cx="${416 + i * 9}" cy="${338 + i * 4}" rx="5" ry="9" fill="${skin}" stroke="${skinD}" stroke-width="1.2" transform="rotate(32 ${416 + i * 9} ${338 + i * 4})"/>`).join('')}
<path d="M238,214 Q206,262 212,322" fill="none" stroke="url(#pShirt)" stroke-width="30" stroke-linecap="round"/>
<path d="M212,322 Q248,372 290,404" fill="none" stroke="${skin}" stroke-width="22" stroke-linecap="round"/>
<ellipse cx="298" cy="410" rx="17" ry="13" fill="url(#pSkin)" stroke="${skinD}" stroke-width="1.5"/>
<line x1="80" y1="618" x2="550" y2="618" stroke="#3a3122" stroke-width="2"/>
${M(1, 362, 604)}${M(2, 168, 410)}${M(3, 226, 470)}${M(4, 292, 250)}${M(5, 500, 250)}${M(6, 190, 300)}${M(7, 458, 366)}
</svg>`;
}
/* Mano más natural (vista del dorso, dedos hacia arriba) */
function mano(izq) {
  const sk = '#e9bf96', skD = '#a87652';
  const F = [[78, 152, 86, 26, -10], [107, 146, 100, 27, -3], [136, 148, 94, 26, 4], [163, 156, 72, 22, 11]];
  const finger = ([x, y, l, w, a], i) => { const h = w / 2;
    const d = `M${x - h},${y} L${x - h * .86},${y - l + h} Q${x - h * .8},${y - l - h * .3} ${x},${y - l - h * .35} Q${x + h * .8},${y - l - h * .3} ${x + h * .86},${y - l + h} L${x + h},${y} Z`;
    return `<g transform="rotate(${a} ${x} ${y})"><path d="${d}" fill="url(#mSk${izq ? 'i' : 'd'})" stroke="${skD}" stroke-width="2"/><ellipse cx="${x}" cy="${y - l + h * .55}" rx="${h * .55}" ry="${h * .7}" fill="#f6dcc4" stroke="#d6ab86" stroke-width="1"/><path d="M${x - h * .6},${y - l * .36} q${h * .6},-4 ${h * 1.2},0 M${x - h * .55},${y - l * .66} q${h * .55},-3 ${h * 1.1},0" fill="none" stroke="${skD}" stroke-width="1.3" opacity=".6"/></g>`; };
  const tip = ([x, y, l, w, a]) => { const r = a * Math.PI / 180, d = l - w * .2; return [x + Math.sin(r) * d, y - Math.cos(r) * d]; };
  const lab = izq ? ['1', '2', '3', '4'] : ['i', 'm', 'a', ''], col = ['#2AA7E8', '#2E9E4F', '#F57C00', '#8E3BB8'];
  let s = `<svg viewBox="0 20 280 296" class="mano" role="img" aria-label="Mano ${izq ? 'izquierda' : 'derecha'}"><defs><radialGradient id="mSk${izq ? 'i' : 'd'}" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="#f6d2ae"/><stop offset="1" stop-color="${sk}"/></radialGradient></defs><g transform="${izq ? '' : 'translate(280 0) scale(-1 1)'}">`;
  s += `<path d="M70,300 L72,262 Q54,232 58,182 Q60,150 74,144 L176,148 Q192,170 192,210 Q194,238 182,262 L184,300 Z" fill="url(#mSk${izq ? 'i' : 'd'})" stroke="${skD}" stroke-width="2"/>`;
  s += F.map(finger).join('');
  s += `<g transform="rotate(40 186 250)"><path d="M171,252 L173,186 Q174,166 188,164 Q202,166 203,186 L205,252 Z" fill="url(#mSk${izq ? 'i' : 'd'})" stroke="${skD}" stroke-width="2"/><ellipse cx="188" cy="178" rx="8" ry="10" fill="#f6dcc4" stroke="#d6ab86" stroke-width="1"/></g>`;
  s += `<path d="M90,196 q12,-6 24,0 M120,192 q12,-6 24,0 M148,196 q10,-5 20,0" fill="none" stroke="${skD}" stroke-width="1.4" opacity=".5"/></g>`;
  F.forEach((f, i) => { if (!lab[i]) return; let [x, y] = tip(f); if (!izq) x = 280 - x; s += `<circle cx="${x.toFixed(1)}" cy="${(y + 14).toFixed(1)}" r="14" fill="${col[i]}" stroke="#1b1206" stroke-width="2"/><text x="${x.toFixed(1)}" y="${(y + 19.5).toFixed(1)}" text-anchor="middle" font-family="Jost,sans-serif" font-weight="700" font-size="16" fill="${i === 0 || i === 3 ? '#111' : '#111'}">${lab[i]}</text>`; });
  const tx = izq ? 246 : 34, ty = 196; s += `<circle cx="${tx}" cy="${ty}" r="14" fill="${izq ? '#6b6457' : '#E5312B'}" stroke="#1b1206" stroke-width="2"/><text x="${tx}" y="${ty + 5.5}" text-anchor="middle" font-family="Jost,sans-serif" font-weight="700" font-size="${izq ? 11 : 16}" fill="#fff">${izq ? 'atrás' : 'p'}</text>`;
  return s + '</svg>';
}
module.exports = { tipo, postura, mano };
