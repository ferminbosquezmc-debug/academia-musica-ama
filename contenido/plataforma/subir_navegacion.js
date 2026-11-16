/* «⬅» a la sección o página anterior, Práctica marcada en el paso Practicar y resumen de clase terminada.
   Se aplica después de siete_grados.js. Uso: node subir_navegacion.js IN OUT */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep("v=S.esp==='at'?'asig':'n4';", "v=S.esp==='at'?'asig':'n4';obHist(v);");
rep("if(bf)bf.hidden=v!=='leccion'", "if(bf)bf.hidden=v==='home'");
rep("$('#back-fab').onclick=lecBack;", "$('#back-fab').onclick=()=>{const v=document.querySelector('.view:not([hidden])');if(v&&v.id==='v-leccion')lecBack();else obBack()};");
rep(" const p=lecPrev(K);if(p){lecOpen(p,4);toast('Clase anterior: '+LD[p].u+' · '+LD[p].t);return}\n go($('#lec-back').dataset.go||'clases')}", " obBack($('#lec-back').dataset.go||'clases')}");
rep("const nx=i=>'<button class=\"btn\" data-st=", "obNav(L.step,D);const nx=i=>'<button class=\"btn\" data-st=");
rep("else if(L.status==='ok')b=(D.fin?D.fin():'')+'<div class=\"card\"><h3>Lección terminada</h3><p class=\"mute\" style=\"margin:6px 0 12px\">Tu docente revisará tu entrega y te responderá por WhatsApp. Si todavía no la enviaste, puedes hacerlo aquí.</p><button class=\"btn\" data-go=\"'+(D.at?'asig':'clases')+'\">'+(D.at?'Volver a la carrera':'Volver a Clases')+'</button><br>'+waBtn(D,L,'ghost')+'</div>';",
  "else if(L.status==='ok')b=(D.fin?D.fin():'')+obFin(K,D,L);");
const js = fs.readFileSync(path.join(__dirname, 'navegacion.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
