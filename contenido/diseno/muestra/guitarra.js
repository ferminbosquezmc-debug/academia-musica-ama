/* Genera la lámina nueva «Partes de la guitarra» (SVG vertical, fondo oscuro, interactiva) */
module.exports = function guitarra() {
  const L = 640, NUT = 158, fy = n => NUT + L * (1 - Math.pow(2, -n / 12));
  const fbTop = [166, 234], fbBot = [160, 240], fbEnd = 528;
  const xAt = (y, a, b) => a + (b - a) * (y - NUT) / (fbEnd - NUT);
  let frets = '';
  for (let n = 1; n <= 19; n++) { const y = fy(n); if (y > fbEnd - 4) break; const x1 = xAt(y, fbTop[0], fbBot[0]), x2 = xAt(y, fbTop[1], fbBot[1]);
    frets += `<line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="url(#gFret)" stroke-width="2.6" stroke-linecap="round"/>`; }
  const SAD = NUT + L; let strings = '';
  for (let i = 0; i < 6; i++) { const xn = 172.5 + i * 11, xs = 167 + i * 13.2, w = [2.4, 2.1, 1.8, 1.6, 1.35, 1.15][i], wound = i < 3;
    strings += `<line x1="${xn}" y1="${NUT + 2}" x2="${xs}" y2="${SAD}" stroke="${wound ? 'url(#gWound)' : '#f3ede1'}" stroke-width="${w}" ${wound ? '' : 'stroke-opacity=".92"'}/>`;
    strings += `<line x1="${xn}" y1="${NUT + 2}" x2="${200 + (xn - 200) * .55}" y2="96" stroke="${wound ? '#cfc6b3' : '#f3ede1'}" stroke-width="${w * .8}" stroke-opacity=".85"/>`; }
  const body = 'M200.0,462 C255.0,462 323.2,470 327.6,530 C332.0,575 290.2,592 292.4,625 C294.6,660 360.6,690 360.6,770 C360.6,845 288.0,882 200.0,882 C112.0,882 39.4,845 39.4,770 C39.4,690 105.4,660 107.6,625 C109.8,592 68.0,575 72.4,530 C76.8,470 145.0,462 200.0,462 Z';
  const head = 'M161,152 L150,40 Q150,22 168,20 L232,20 Q250,22 250,40 L239,152 Z';
  let pegs = '';
  [[62, 'l'], [92, 'l'], [122, 'l'], [62, 'r'], [92, 'r'], [122, 'r']].forEach(([y, s]) => { const x = s === 'l' ? 150 : 250, d = s === 'l' ? -1 : 1;
    pegs += `<rect x="${s === 'l' ? x - 22 : x}" y="${y - 3}" width="22" height="6" rx="2" fill="url(#gGold)"/><ellipse cx="${x + d * 34}" cy="${y}" rx="13" ry="9" fill="url(#gPearl)" stroke="#8a6a1c" stroke-width="1.2"/>`; });
  let rosette = '';
  const C7 = ['#E5312B', '#F57C00', '#FFD21F', '#2E9E4F', '#2AA7E8', '#283593', '#8E3BB8'];
  for (let i = 0; i < 56; i++) { const a = i / 56 * Math.PI * 2, r = 53; rosette += `<rect x="${(200 + r * Math.cos(a) - 2.2).toFixed(1)}" y="${(575 + r * Math.sin(a) - 4).toFixed(1)}" width="4.4" height="8" rx="1" fill="${C7[i % 7]}" opacity=".85" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(1)} ${(200 + r * Math.cos(a)).toFixed(1)} ${(575 + r * Math.sin(a)).toFixed(1)})"/>`; }
  const M = (n, x, y) => `<g class="mk" data-p="${n}" tabindex="0" role="button" aria-label="Parte ${n}"><circle cx="${x}" cy="${y}" r="15" fill="#f2b93b" stroke="#1b1206" stroke-width="2.5"/><text x="${x}" y="${y + 5.2}" text-anchor="middle" font-family="Jost,system-ui,sans-serif" font-size="15" font-weight="700" fill="#1b1206">${n}</text></g>`;
  const H = (n, inner) => `<g class="hl" data-h="${n}">${inner}</g>`;
  return `<svg class="gtr" viewBox="0 0 400 920" role="group" aria-label="Partes de la guitarra clásica">
<defs>
 <linearGradient id="gTop" x1="0" x2="1"><stop offset="0" stop-color="#d49a52"/><stop offset=".45" stop-color="#f0c57c"/><stop offset=".55" stop-color="#f3cc86"/><stop offset="1" stop-color="#c98a43"/></linearGradient>
 <radialGradient id="gEdge" cx=".5" cy=".55" r=".62"><stop offset=".62" stop-color="#3b1d08" stop-opacity="0"/><stop offset="1" stop-color="#3b1d08" stop-opacity=".55"/></radialGradient>
 <linearGradient id="gShine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <linearGradient id="gNeck" x1="0" x2="1"><stop offset="0" stop-color="#5a2f17"/><stop offset=".5" stop-color="#8b4e27"/><stop offset="1" stop-color="#5a2f17"/></linearGradient>
 <linearGradient id="gBoard" x1="0" x2="1"><stop offset="0" stop-color="#1c120c"/><stop offset=".5" stop-color="#3a2618"/><stop offset="1" stop-color="#1c120c"/></linearGradient>
 <linearGradient id="gHead" x1="0" x2="1"><stop offset="0" stop-color="#4a2613"/><stop offset=".5" stop-color="#7d4421"/><stop offset="1" stop-color="#4a2613"/></linearGradient>
 <linearGradient id="gFret" x1="0" x2="1"><stop offset="0" stop-color="#8d8f93"/><stop offset=".5" stop-color="#f4f5f7"/><stop offset="1" stop-color="#8d8f93"/></linearGradient>
 <linearGradient id="gWound" x1="0" x2="1"><stop offset="0" stop-color="#9c8f74"/><stop offset=".5" stop-color="#e8dcc0"/><stop offset="1" stop-color="#9c8f74"/></linearGradient>
 <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#b8861f"/></linearGradient>
 <radialGradient id="gPearl" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#e6dcc8"/><stop offset="1" stop-color="#b9ab90"/></radialGradient>
 <radialGradient id="gHole" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#0d0805"/><stop offset=".8" stop-color="#1a0f08"/><stop offset="1" stop-color="#3a2210"/></radialGradient>
 <linearGradient id="gBridge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2c1a"/><stop offset="1" stop-color="#22140c"/></linearGradient>
 <pattern id="grain" width="7" height="60" patternUnits="userSpaceOnUse"><line x1="2" y1="0" x2="2.6" y2="60" stroke="#7a4a1e" stroke-opacity=".16" stroke-width="1"/><line x1="5.4" y1="0" x2="5" y2="60" stroke="#7a4a1e" stroke-opacity=".08" stroke-width=".8"/></pattern>
 <radialGradient id="gShadow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
 <clipPath id="cBody"><path d="${body}"/></clipPath>
 <filter id="fGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<ellipse cx="208" cy="890" rx="160" ry="16" fill="url(#gShadow)"/>
<path d="${head}" fill="url(#gHead)" stroke="#2a150a" stroke-width="2"/>
<rect x="173" y="44" width="15" height="92" rx="7" fill="#140b06"/><rect x="212" y="44" width="15" height="92" rx="7" fill="#140b06"/>
<g>${[62, 92, 122].map(y => `<rect x="170" y="${y - 4.5}" width="60" height="9" rx="4.5" fill="url(#gPearl)" opacity=".95"/>`).join('')}</g>
${pegs}
<rect x="161" y="150" width="78" height="380" fill="url(#gNeck)"/>
<path d="${body}" fill="url(#gTop)"/>
<path d="${body}" fill="url(#grain)"/>
<path d="${body}" fill="url(#gEdge)"/>
<path d="${body}" fill="url(#gShine)" clip-path="url(#cBody)"/>
<path d="${body}" fill="none" stroke="#2a1608" stroke-width="5"/>
<path d="${body}" fill="none" stroke="#f6e7c4" stroke-width="1.4" transform="translate(200 672) scale(.975) translate(-200 -672)" opacity=".8"/>
<circle cx="200" cy="575" r="60" fill="none" stroke="#3a2210" stroke-width="2"/>${rosette}<circle cx="200" cy="575" r="47" fill="none" stroke="#3a2210" stroke-width="2"/>
<circle cx="200" cy="575" r="42" fill="url(#gHole)"/>
<path d="M${fbTop[0]},${NUT} L${fbTop[1]},${NUT} L${fbBot[1]},${fbEnd} Q200,${fbEnd + 8} ${fbBot[0]},${fbEnd} Z" fill="url(#gBoard)"/>
${frets}
<rect x="164" y="${NUT - 8}" width="72" height="9" rx="2.5" fill="#f4ecd8" stroke="#a89c80" stroke-width="1"/>
<rect x="138" y="782" width="124" height="32" rx="6" fill="url(#gBridge)" stroke="#120a05" stroke-width="1.5"/>
<rect x="160" y="${SAD - 3}" width="80" height="5" rx="2" fill="#f4ecd8"/>
<rect x="150" y="802" width="100" height="8" rx="3" fill="#120a05" opacity=".55"/>
${strings}
<g class="hls">
${H(1, `<path d="${head}" fill="none"/>`)}
${H(2, [62, 92, 122].map(y => `<ellipse cx="116" cy="${y}" rx="15" ry="11" fill="none"/><ellipse cx="284" cy="${y}" rx="15" ry="11" fill="none"/>`).join(''))}
${H(3, `<rect x="162" y="${NUT - 10}" width="76" height="13" rx="3" fill="none"/>`)}
${H(4, `<rect x="158" y="150" width="84" height="315" rx="4" fill="none"/>`)}
${H(5, `<path d="M${fbTop[0]},${NUT} L${fbTop[1]},${NUT} L${fbBot[1]},${fbEnd} Q200,${fbEnd + 8} ${fbBot[0]},${fbEnd} Z" fill="none"/>`)}
${H(6, [1, 2, 3, 4, 5].map(n => `<line x1="${xAt(fy(n), fbTop[0], fbBot[0]) - 4}" y1="${fy(n)}" x2="${xAt(fy(n), fbTop[1], fbBot[1]) + 4}" y2="${fy(n)}"/>`).join(''))}
${H(7, `<circle cx="200" cy="575" r="44" fill="none"/>`)}
${H(8, `<path d="M172,${NUT + 4} L167,${SAD} M228,${NUT + 4} L233,${SAD}" fill="none"/>`)}
${H(9, `<path d="${body}" fill="none"/>`)}
${H(10, `<rect x="136" y="780" width="128" height="36" rx="7" fill="none"/>`)}
</g>
<g stroke="#f2b93b" stroke-width="2" stroke-dasharray="3 3" opacity=".8"><line x1="155" y1="330" x2="162" y2="330"/><line x1="243" y1="232" x2="236" y2="232"/><line x1="243" y1="152" x2="236" y2="152"/><line x1="268" y1="798" x2="262" y2="798"/></g>${M(1, 200, 32)}${M(2, 302, 92)}${M(3, 258, 152)}${M(4, 140, 330)}${M(5, 200, 300)}${M(6, 258, 232)}${M(7, 200, 575)}${M(8, 236, 690)}${M(9, 322, 740)}${M(10, 282, 798)}
</svg>`;
};
