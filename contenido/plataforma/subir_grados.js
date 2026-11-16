/* Clase 1 de cada carrera: «Pronuncio las notas» y el Juego de los grados dentro de la plataforma (sin profesor).
   Uso: node subir_grados.js IN OUT   (IN = página publicada sin envoltorio)
   También: node subir_grados.js --md   (cambia los .md de contenido/<carrera>/nivel-1/clase-1.md) */
const fs = require('fs'), path = require('path');
const A = process.argv.slice(2);
const T1 = ['- ☐ Canto DO-RE-MI-FA-SOL-LA-SI-DO, subiendo y bajando.', '- ☐ Pronuncio las notas DO-RE-MI-FA-SOL-LA-SI-DO, subiendo y bajando.'];
const T2 = ['- ☐ **Juego de los grados:** mi profesor dice un número y yo digo la nota y la letra («5» → «SOL, G»).',
  '- ☐ **Juego de los grados:** la plataforma me muestra un número; yo digo la nota y su letra («5» → «SOL, G») y la toco para comprobar.'];
const T3 = ['- ☐ **Juego de los grados:** mi profesor dice un número y yo canto esa nota de la escala.',
  '- ☐ **Juego de los grados:** la plataforma me muestra un número y yo canto esa nota de la escala. Después la toco para escucharla y comprobar.'];
if (A[0] === '--md') {
  const base = path.join(__dirname, '..');
  for (const c of ['guitarra', 'piano', 'bateria', 'bajo', 'canto']) {
    const f = path.join(base, c, 'nivel-1', 'clase-1.md'); let t = fs.readFileSync(f, 'utf8'); const CR = t.includes('\r\n'); t = t.replace(/\r\n/g, '\n');
    const n0 = t.length;
    if (c !== 'canto') { if (!t.includes(T1[0] + '\n')) throw new Error(c + ': T1'); t = t.replace(T1[0] + '\n', T1[1] + '\n'); }
    const T = c === 'canto' ? T3 : T2; if (!t.includes(T[0] + '\n')) throw new Error(c + ': grados');
    t = t.replace(T[0] + '\n', T[1] + '\n\n[[grados]]\n\n');
    fs.writeFileSync(f, CR ? t.replace(/\n/g, '\r\n') : t); console.log('md', c, t.length - n0);
  }
  process.exit(0);
}
const [IN, OUT] = A;
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b, n = 1) { const c = cnt(a); if (c !== n) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.split(a).join(b); }
const N = '\\n'; /* en la página, los .md viven como cadenas JS con \n escrito */
rep(T1[0] + N, T1[1] + N, 4);
rep(T2[0] + N, T2[1] + N + N + '[[grados]]' + N + N, 4);
rep(T3[0] + N, T3[1] + N + N + '[[grados]]' + N + N, 1);
rep("  if(s==='[[que-suena]]'){h+=qsCard();i++;continue}", "  if(s==='[[que-suena]]'){h+=qsCard();i++;continue}\n  if(s==='[[grados]]'){h+=gdCard();i++;continue}");
const js = fs.readFileSync(path.join(__dirname, 'grados.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
