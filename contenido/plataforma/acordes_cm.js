/* Cifrado con M mayúscula (mayor) y m minúscula (menor) SOLO en la clase de cada carrera donde se empiezan a
   distinguir los tipos de acordes: guitarra N1 c9, piano N2 c20, batería N1 c9, bajo N1 c9, canto N1 c9.
   Uso: node acordes_cm.js IN OUT   (página: los cambios se aplican solo dentro de esas clases)
        node acordes_cm.js --repo   (.md de esas clases) */
const fs = require('fs'), path = require('path');
const NOTA = '\n\n> **Cómo se escriben:** el acorde **mayor** lleva **M** mayúscula (CM = Do mayor) y el **menor**, **m** minúscula (Cm = Do menor).';
const LINEA = ['- **Mayor** suena alegre y brillante. **Menor** (con «m»:', '- **Mayor** (con **M** mayúscula: CM = Do mayor) suena alegre y brillante. **Menor** (con **m** minúscula:'];
const C = {
  guitarra: { md: 'guitarra/nivel-1/clase-9.md', R: [
    ['tocar los acordes de Mi menor (Em) y Mi mayor (E).', 'tocar los acordes de Mi menor (Em) y Mi mayor (EM).'],
    ['| Mi menor (Em) | Mi mayor (E) |', '| Mi menor (Em) | Mi mayor (EM) |'],
    ['![E](guitarra/img/N1_acorde_E.svg)', '![EM](guitarra/img/N1_acorde_E.svg)'],
    ['**E = Em + el dedo 1** en la 3.ª cuerda, traste 1.', '**EM = Em + el dedo 1** en la 3.ª cuerda, traste 1.' + NOTA.replace('(CM = Do mayor)', '(EM = Mi mayor)').replace('(Cm = Do menor)', '(Em = Mi menor)')],
    ['Igual con E.', 'Igual con EM.'],
    ['Em | E | Em | E en redondas', 'Em | EM | Em | EM en redondas'],
    ['Em, E y el cambio entre los dos.', 'Em, EM y el cambio entre los dos.'],
    ['☐ Toco Em y E.', '☐ Toco Em y EM.'],
    ['¿Qué diferencia hay entre Em y E?', '¿Qué diferencia hay entre Em y EM?'],
    ['E lleva además el dedo 1 en la 3.ª cuerda, traste 1', 'EM lleva además el dedo 1 en la 3.ª cuerda, traste 1'],
    ['> E = Em + el dedo 1 en la 3.ª cuerda, traste 1.', '> EM = Em + el dedo 1 en la 3.ª cuerda, traste 1.'],
    ['"E = Em + el dedo 1 en la 3.ª cuerda, traste 1."', '"EM = Em + el dedo 1 en la 3.ª cuerda, traste 1."'] ] },
  piano: { md: 'piano/nivel-2/clase-20.md', R: [
    ['| DO – MI – SOL | C | brillante', '| DO – MI – SOL | CM | brillante'],
    ['C (DO-MI-SOL) → Cm (DO-**MI♭**-SOL).', 'CM (DO-MI-SOL) → Cm (DO-**MI♭**-SOL).'],
    ['| Acorde | C | Dm | Em | F | G | Am | B° |', '| Acorde | CM | Dm | Em | FM | GM | Am | B° |'],
    ['*(Romano en mayúscula = mayor; en minúscula = menor.)*', '*(Romano en mayúscula = mayor; en minúscula = menor.)*' + NOTA],
    ['C → Cm, D → Dm, E → Em, moviendo solo el dedo 3. (D mayor = RE-**FA♯**-LA; E mayor = MI-**SOL♯**-SI).', 'CM → Cm, DM → Dm, EM → Em, moviendo solo el dedo 3. (DM = RE-**FA♯**-LA; EM = MI-**SOL♯**-SI).'],
    ['F = ______ – ______ – ______ · Dm = ______ – ______ – ______ · G = ______', 'FM = ______ – ______ – ______ · Dm = ______ – ______ – ______ · GM = ______'],
    ['¿Cómo se convierte C en Cm?', '¿Cómo se convierte CM en Cm?'],
    ['¿Qué notas tiene el acorde de RE mayor (D)?', '¿Qué notas tiene el acorde de RE mayor (DM)?'] ] },
  bateria: { md: 'bateria/nivel-1/clase-9.md', R: [LINEA] },
  bajo: { md: 'bajo/nivel-1/clase-9.md', R: [LINEA,
    ['encontrar la raíz de los acordes C, D, E, F, G y A en el bajo', 'encontrar la raíz de los acordes CM, DM, EM, FM, GM y AM en el bajo'],
    ['La raíz de C es DO; la de G es SOL.', 'La raíz de CM es DO; la de GM es SOL.'],
    ['C y Cm tienen la misma raíz, DO.', 'CM y Cm tienen la misma raíz, DO.'],
    ['| **C** | DO |', '| **CM** | DO |'], ['| **D** | RE |', '| **DM** | RE |'], ['| **E** / **Em** | MI |', '| **EM** / **Em** | MI |'],
    ['| **F** | FA |', '| **FM** | FA |'], ['| **G** | SOL |', '| **GM** | SOL |'], ['| **A** / **Am** | LA |', '| **AM** / **Am** | LA |'],
    ['(«Am», «G», «F»)', '(«Am», «GM», «FM»)'],
    ['**C – G – Am – F** en blancas', '**CM – GM – Am – FM** en blancas'],
    ['**C – F – G – C** en negras', '**CM – FM – GM – CM** en negras'],
    ['Raíz de G: ______ · Raíz de Am: ______ · Raíz de F:', 'Raíz de GM: ______ · Raíz de Am: ______ · Raíz de FM:'],
    ['C – G – Am – F con raíces', 'CM – GM – Am – FM con raíces'],
    ['Encuentro la raíz de C, D, E, F, G y A.', 'Encuentro la raíz de CM, DM, EM, FM, GM y AM.'],
    ['en el acorde de G?', 'en el acorde de GM?'],
    ['La raíz de G es SOL: cuerda MI, traste 3.', 'La raíz de GM es SOL: cuerda MI, traste 3.'],
    ['¿Dónde está la raíz de F en el bajo?', '¿Dónde está la raíz de FM en el bajo?'] ] },
  canto: { md: 'canto/nivel-1/clase-9.md', R: [LINEA,
    ['- DO mayor (C) = DO – MI – SOL', '- DO mayor (CM) = DO – MI – SOL'],
    ['suena el acorde de C en la pista', 'suena el acorde de CM en la pista'],
    ['Notas del acorde de C:', 'Notas del acorde de CM:'] ] },
};
/* Tramos de la página donde vive cada clase (texto de la clase y, en guitarra, sus preguntas) */
const TRAMOS = {
  guitarra: [['{"n":9,"t":"¿Qué es un acorde?"', '{"n":10,'], ['"9":[["¿Qué es un acorde?"', '"10":[[']],
  piano: [['{"n":20,"raw":"# Piano · Nivel 2 · Clase 20', '{"n":21,']],
  bateria: [['{"n": 9, "raw": "# Batería · Nivel 1 · Clase 9', '{"n": 10,']],
  bajo: [['{"n": 9, "raw": "# Bajo · Nivel 1 · Clase 9', '{"n": 10,']],
  canto: [['{"n": 9, "raw": "# Canto · Nivel 1 · Clase 9', '{"n": 10,']],
};
const A = process.argv.slice(2);
if (A[0] === '--repo') {
  const base = path.join(__dirname, '..');
  for (const c of Object.keys(C)) {
    const p = path.join(base, C[c].md); let t = fs.readFileSync(p, 'utf8'); const CR = t.includes('\r\n'); t = t.replace(/\r\n/g, '\n');
    for (const [a, b] of C[c].R) { if (!t.includes(a)) { if (!a.startsWith('"')) console.log('md sin', c, a.slice(0, 50)); continue } t = t.split(a).join(b) }
    fs.writeFileSync(p, CR ? t.replace(/\n/g, '\r\n') : t);
  }
  console.log('repo ok');
} else {
  const [IN, OUT] = A; let t = fs.readFileSync(IN, 'utf8');
  for (const c of Object.keys(C)) {
    let used = new Set();
    for (const [i0, i1] of TRAMOS[c]) {
      const s = t.indexOf(i0); if (s < 0 || t.indexOf(i0, s + 1) > -1) throw new Error('tramo ' + c + ' ' + i0); const e = t.indexOf(i1, s); if (e < 0) throw new Error('fin ' + c);
      let seg = t.slice(s, e);
      for (const [a, b] of C[c].R) { const aa = a.replace(/"/g, '\\"'), bb = b.replace(/\n/g, '\\n').replace(/"/g, '\\"');
        for (const [x, y] of aa === a ? [[a, b.replace(/\n/g, '\\n')]] : [[a, b.replace(/\n/g, '\\n')], [aa, bb]]) if (seg.includes(x)) { seg = seg.split(x).join(y); used.add(a) } }
      t = t.slice(0, s) + seg + t.slice(e);
    }
    const miss = C[c].R.filter(([a]) => !used.has(a)); console.log(c, 'aplicados', used.size, 'de', C[c].R.length, miss.length ? 'FALTAN: ' + miss.map(x => x[0].slice(0, 40)).join(' | ') : '');
  }
  fs.writeFileSync(OUT, t); console.log('ok');
}
