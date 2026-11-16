/* Instrumento virtual por carrera (guitarra, bajo, piano, batería). Se aplica después de sin_profesor.js.
   Uso: node subir_instrumento.js IN OUT */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep('<section class="view" id="v-opi" hidden></section>', '<section class="view" id="v-opi" hidden></section>\n<section class="view" id="v-vinst" hidden></section>');
rep("if(v==='opi')opView();", "if(v==='opi')opView();if(v==='vinst')viView();if(v==='practica')viPr();");
rep("memRestore(K,L.step);", "memRestore(K,L.step);viLec(K,L.step);");
rep('.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}', '.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}\n.vi-scroll{overflow-x:auto;margin-top:12px;padding-bottom:6px;-webkit-overflow-scrolling:touch}.vi-fb,.vi-kb{display:block;max-width:none;touch-action:manipulation;user-select:none;-webkit-user-select:none}.vi-ch{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px;margin-top:10px}.vi-ch .chip{text-align:center;font-weight:600}');
const js = fs.readFileSync(path.join(__dirname, 'instrumento.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
