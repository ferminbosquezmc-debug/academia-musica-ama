/* La escala tiene 7 grados; se le añade la octava (8), que es el mismo sonido del grado 1 pero más agudo.
   Uso: node siete_grados.js IN OUT      (página publicada sin envoltorio)
        node siete_grados.js --repo      (.md y .svg de contenido/) */
const fs = require('fs'), path = require('path');
const R = [
  ['La escala tiene **8 grados**: son los **números del 1 al 8** que indican', 'La escala tiene **7 grados**: son los **números del 1 al 7** que indican'],
  ['La escala tiene **8 grados**: los **números del 1 al 8** que indican', 'La escala tiene **7 grados**: los **números del 1 al 7** que indican'],
  ['SI el 7 y **el 8 es otra vez DO**.', 'y SI el 7. Al final se añade la **octava (8)**, que es **otra vez DO**: el mismo sonido del 1, pero más agudo.'],
  ['**El grado 1 y el grado 8 son la misma nota a diferente altura:**', '**El grado 1 y la octava (8) son la misma nota a diferente altura:**'],
  ['Por eso hay 7 nombres de notas pero 8 grados: la escala empieza y termina en la misma nota', 'Por eso hay 7 grados, uno por cada nombre de nota, y la octava repite el primero: la escala empieza y termina en la misma nota'],
  ['Sé qué son los 8 grados y que el 1 y el 8 son la misma nota', 'Sé que la escala tiene 7 grados y que la octava (8) es la misma nota que el 1'],
  ['el grado 8 es otra vez DO', 'la octava (8) es otra vez DO'],
  ['¿Qué relación hay entre el grado 1 y el grado 8?', '¿Qué relación hay entre el grado 1 y la octava (8)?'],
  ['La escala tiene 8 grados; el 1 y el 8 son DO, separados por una octava', 'La escala tiene 7 grados y se cierra con la octava (8): el 1 y el 8 son DO, separados por una octava'],
  ['Los 8 grados de la escala de DO', 'Los 7 grados de la escala de DO y su octava'],
  ['Siete nombres de notas, ocho grados: la escala empieza y termina en DO', 'Siete grados, uno por nota, y la octava: la escala empieza y termina en DO'],
  ['El grado 1 es DO grave; el grado 8 es DO agudo', 'El grado 1 es DO grave; la octava (8) es DO agudo'],
  ['![Los 8 grados en el pentagrama]', '![Los 7 grados y la octava en el pentagrama]'],
  ['![Los 8 grados en el teclado]', '![Los 7 grados y la octava en el teclado]'],
  ['La mano tiene cinco dedos y la escala tiene ocho notas.', 'La mano tiene cinco dedos y la escala tiene siete notas más la octava.'],
  ['| Grado | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |', '| Grado | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 (octava) |'],
  ['los 8 grados (el 1 y el 8 son la misma nota, grave y aguda)', 'los 7 grados y la octava (el 1 y el 8 son la misma nota, grave y aguda)'],
  ['8 grados (1 = 8 en otra octava)', '7 grados + la octava (1 = 8 en otra octava)'],
  ['en el Nivel 1 son 8 grados con sus números del 1 al 8; el 8 repite el 1 una octava más aguda', 'en el Nivel 1 son 7 grados (del 1 al 7) y se añade la octava (8), que repite el 1 una octava más aguda'],
  ['7 notas, cifrado, 8 grados, elementos', '7 notas, cifrado, 7 grados y la octava, elementos'],
  ['Notas, cifrado, 8 grados, elementos de la música', 'Notas, cifrado, 7 grados y la octava, elementos de la música'],
];
function fix(t) { const n = {}; for (const [a, b] of R) { const c = t.split(a).length - 1; if (c) { n[a.slice(0, 40)] = c; t = t.split(a).join(b); } } return [t, n]; }
const A = process.argv.slice(2);
if (A[0] === '--repo') {
  const base = path.join(__dirname, '..');
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? (['plataforma', 'node_modules'].includes(e.name) ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]);
  for (const f of walk(base).filter(f => /\.(md|svg)$/.test(f))) {
    let t = fs.readFileSync(f, 'utf8'); const CR = t.includes('\r\n'); t = t.replace(/\r\n/g, '\n');
    const [u, n] = fix(t); if (u !== t) { fs.writeFileSync(f, CR ? u.replace(/\n/g, '\r\n') : u); console.log(path.relative(base, f), JSON.stringify(n)); }
  }
} else {
  const [IN, OUT] = A; const [u, n] = fix(fs.readFileSync(IN, 'utf8'));
  console.log(JSON.stringify(n, null, 1)); if (!Object.keys(n).length) throw new Error('sin cambios'); fs.writeFileSync(OUT, u); console.log('ok');
}
