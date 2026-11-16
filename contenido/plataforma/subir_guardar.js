/* Guardar lo que el estudiante marca: «¿Qué suena?», casillas ☐ de las clases y la prueba de ubicación a medias.
   Se aplica después de subir_orden_clases.js. Uso: node subir_guardar.js IN OUT */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep("x.value=S.blk[x.dataset.bk]||''});", "x.value=S.blk[x.dataset.bk]||''});memRestore(K,L.step);");
rep('S.qs=S.qs||{best:0,last:0};S.qs.last=ok;', 'S.qs=S.qs||{best:0,last:0};S.qs.shown=true;S.qs.last=ok;');
rep('v.dataset.car=sel;uaList()}', 'v.dataset.car=sel;uaList();ubRest()}');
rep('S.ubic={fecha:', 'delete S.ubq;S.ubic={fecha:');
const js = fs.readFileSync(path.join(__dirname, 'guardar.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
