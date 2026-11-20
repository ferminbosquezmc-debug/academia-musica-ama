/* Sube el rediseño de Guitarra Nivel 1 a la plataforma.  Uso: node subir_diseno_n1.js IN OUT
   - Cambia los textos de las clases 2 y 11 (fotos con números, tipos de guitarra, foto del rasgueo) en GNC1 y en los .md del repo.
   - Agrega los marcadores [[partes-foto]] … al lector de Markdown y la clase .gnew a las láminas nuevas.
   - Inserta diseno_n1.js (diapositivas + fotos) con los textos de cada lámina (IMGTX) tomados de la muestra.
   - Prepara en guitarra_img/ los archivos para publicar como guitarra/img/… (láminas, fotos y fotos envueltas en SVG). */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2), R = path.join(__dirname, '..'), MU = path.join(R, 'diseno', 'muestra'), NV = path.join(R, 'guitarra', 'nivel-1');
let t = fs.readFileSync(IN, 'utf8');
const rep = (a, b, n = 1) => { const k = t.split(a).length - 1; if (k !== n) throw new Error('Esperaba ' + n + ' y hay ' + k + ': ' + a.slice(0, 90)); t = t.split(a).join(b); };

/* 1) Textos de las clases */
const md = n => fs.readFileSync(path.join(__dirname, 'orig', 'clase-' + n + '.md'), 'utf8').replace(/\r\n/g, '\n');
const corta = (s, a, b) => { const i = s.indexOf(a), j = s.indexOf(b, i); if (i < 0 || j < 0) throw new Error('No encuentro ' + a); return s.slice(i, j + b.length); };
const c2 = md(2), c11 = md(11);
const CAMBIOS = [
  [corta(c2, '![Partes de la guitarra](guitarra/img/N1_partes_guitarra.svg)', '| Eléctrica | acero + amplificador | necesita corriente |'), '[[partes-foto]]\n\n### 📖 Tres tipos de guitarra\n[[tipos-foto]]'],
  [corta(c2, '![Postura correcta con la guitarra](guitarra/img/G1_postura.svg)', 'y los dedos arqueados.'), '[[postura-foto]]'],
  [corta(c2, '![Numeración de los dedos](guitarra/img/N1_dedos.svg)', 'con **letras**: **p** pulgar · **i** índice · **m** medio · **a** anular. |'), '[[manos-foto]]'],
  ['| Re mayor (D) | Rasgueos |', '![El rasgueo](guitarra/img/G13_rasgueo.svg)\n\n| Re mayor (D) | Rasgueos |'],
  ['![Arpegio con los dedos p, i, m y a](guitarra/img/G2_arpegio.svg)', '![La mano en el arpegio](guitarra/img/G14_arpegio.svg)\n\n![Arpegio con los dedos p, i, m y a](guitarra/img/G2_arpegio.svg)'],
  ['![La cejilla: F y Bm](guitarra/img/G2_cejilla.svg)', '![La cejilla: F y Bm](guitarra/img/G2_cejilla.svg)\n\n![Cinco formas de tocar FA](guitarra/img/G_formas_fa.svg)']];
const esc = s => JSON.stringify(s).slice(1, -1);
for (const [a, b] of CAMBIOS) { if (t.includes(esc(b))) continue; rep(esc(a), esc(b)); }
if (process.argv.includes('--repo')) { let a2 = c2, a11 = c11; for (const [a, b] of CAMBIOS.slice(0, 3)) a2 = a2.replace(a, b); a11 = a11.replace(CAMBIOS[3][0], CAMBIOS[3][1]); /* orig/ = clases tal como estaban antes del rediseño */
  fs.writeFileSync(path.join(NV, 'clase-2.md'), a2); fs.writeFileSync(path.join(NV, 'clase-11.md'), a11);
  const f18 = path.join(R, 'guitarra', 'nivel-2', 'clase-18.md'), m18 = fs.readFileSync(f18, 'utf8'); if (!m18.includes('G14_arpegio')) fs.writeFileSync(f18, m18.replace(CAMBIOS[4][0], CAMBIOS[4][1]));
  const f21 = path.join(R, 'guitarra', 'nivel-2', 'clase-21.md'), m21 = fs.readFileSync(f21, 'utf8'); if (!m21.includes('G_formas_fa')) fs.writeFileSync(f21, m21.replace(CAMBIOS[5][0], CAMBIOS[5][1])); }

/* 2) Lector de Markdown y clase de las láminas nuevas */
rep(`'<img class="gimg" src="'+src+'"`, `'<img class="gimg'+(typeof DZNEW!=='undefined'&&DZNEW.has(src)?' gnew':'')+'" src="'+src+'"`, 2);
rep("  if(s==='[[que-suena]]'){h+=qsCard();i++;continue}", "  if(s==='[[que-suena]]'){h+=qsCard();i++;continue}\n  if(m=s.match(/^\\[\\[(partes|postura|manos|tipos)-foto\\]\\]$/)){h+=typeof dzFoto==='function'?dzFoto(m[1]):'';i++;continue}");

/* 3) Textos debajo de cada lámina, tomados de la muestra */
const TX = {}, th = fs.readFileSync(path.join(MU, 'tecnicas.html'), 'utf8');
for (const f of th.split('<figure>').slice(1)) { const imgs = [...f.matchAll(/img_(tec|piano)\/(\w+)\.svg/g)].map(m => (m[1] === 'piano' ? 'piano/img/' : 'guitarra/img/') + m[2]), b = (f.match(/<b>([^<]+)<\/b>/) || [])[1], d = (f.match(/<\/b><span>(.*?)<\/span><\/figcaption>/) || [])[1];
  imgs.forEach((n, i) => TX[n + '.svg'] = i ? [] : [b, d.replace(/<[^>]+>/g, '').replace(/ «Qué es un acorde».*$/, '')]); }
Object.assign(TX, { 'guitarra/img/N1_que_es_acorde.svg': ['Qué es un acorde', 'Un acorde = varias notas que suenan al mismo tiempo. En Em: dedo 2 en la 5.ª cuerda y dedo 3 en la 4.ª, los dos en el traste 2.'],
  'guitarra/img/N1_cualidades_sonido.svg': ['Las cuatro cualidades del sonido', 'Altura (agudo o grave), duración (largo o corto), intensidad (fuerte o suave) y timbre (quién suena).'],
  'guitarra/img/N1_cuerdas.svg': ['Las seis cuerdas', 'De la 6.ª, la más gruesa y grave, a la 1.ª, la más delgada y aguda: MI – LA – RE – SOL – SI – MI.'],
  'guitarra/img/G14_arpegio.svg': ['El arpegio', 'El pulgar en la cuerda grave y los dedos i, m y a en las agudas, uno por cuerda.'],
  'guitarra/img/G_formas_fa.svg': ['Cinco formas de tocar FA', 'Las cinco suenan FA – LA – DO en distintos lugares del mástil. Empieza por la 3 (pequeño) y la 2; la 1 es la cejilla completa. El número dorado de la izquierda es el traste donde empieza.'],
  'guitarra/img/G13_rasgueo.svg': ['El rasgueo', 'La mano rasguea sobre la boca moviendo la muñeca: ↓ hacia el suelo, ↑ hacia el techo.'] });
const NUEVAS = Object.keys(TX);
let mod = fs.readFileSync(path.join(__dirname, 'diseno_n1.js'), 'utf8').replace('/*DZNEW*/', JSON.stringify(NUEVAS)).replace('/*DZTX*/', JSON.stringify(TX));
rep('function perfil(){', mod + '\nfunction perfil(){');
fs.writeFileSync(OUT, t);

/* 4) Archivos para publicar en guitarra/img/ */
const PUB = path.join(R, 'plataforma', 'guitarra_img'); fs.mkdirSync(PUB, { recursive: true });
for (const f of fs.readdirSync(path.join(MU, 'img_tec'))) fs.copyFileSync(path.join(MU, 'img_tec', f), path.join(PUB, f));
const PPI = path.join(R, 'plataforma', 'piano_img'); fs.mkdirSync(PPI, { recursive: true }); for (const f of fs.readdirSync(path.join(MU, 'img_piano'))) fs.copyFileSync(path.join(MU, 'img_piano', f), path.join(PPI, f));
fs.copyFileSync(path.join(MU, 'img_ia', 'G12_acorde_lamina.svg'), path.join(PUB, 'N1_que_es_acorde.svg'));
const envolver = (jpg, out, w, h, label) => { const b = fs.readFileSync(path.join(MU, 'img_ia', jpg)).toString('base64');
  fs.writeFileSync(path.join(PUB, out), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><title>${label}</title><image width="${w}" height="${h}" href="data:image/jpeg;base64,${b}" xlink:href="data:image/jpeg;base64,${b}"/></svg>`); };
const tam = f => { const b = fs.readFileSync(path.join(MU, 'img_ia', f)); let i = 2; while (i < b.length) { const m = b[i + 1], L = b.readUInt16BE(i + 2); if (m >= 0xC0 && m <= 0xC2) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + L; } };
[['G07_cualidades.jpg', 'N1_cualidades_sonido.svg', 'Cualidades del sonido'], ['G08_seis_cuerdas.jpg', 'N1_cuerdas.svg', 'Las seis cuerdas de la guitarra'], ['G13_rasgueo.jpg', 'G13_rasgueo.svg', 'Mano rasgueando las cuerdas'], ['G14_arpegio.jpg', 'G14_arpegio.svg', 'Mano derecha tocando un arpegio']].forEach(([j, o, l]) => { const [w, h] = tam(j); envolver(j, o, w, h, l); });
for (const j of ['G02_partes_guitarra', 'G03_postura', 'G04_mano_izquierda', 'G05_mano_derecha', 'G09_clasica', 'G10_acustica', 'G11_electrica']) fs.copyFileSync(path.join(MU, 'img_ia', j + '.jpg'), path.join(PUB, j + '.jpg'));
console.log('ok', OUT, (t.length / 1024).toFixed(0) + ' KB ·', fs.readdirSync(PUB).length, 'archivos en guitarra_img ·', NUEVAS.length, 'láminas con texto');
