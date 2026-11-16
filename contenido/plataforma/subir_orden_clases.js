/* Clases en orden: solo se abre la clase siguiente cuando se termina la anterior (la clase 1 siempre abierta;
   las convalidadas cuentan como terminadas). La tarjeta de la carrera elegida queda fija, sin poder tocarla.
   Se aplica después de subir_navegacion.js. Uso: node subir_orden_clases.js IN OUT */
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
/* Bloqueo de clases (el modo revisión de la dirección, 5 toques al logo, lo abre todo) */
rep("function lecPrev(K){", "function clsLock(k){if(typeof atRev==='function'&&atRev())return false;const D=LD[k];if(!D||D.at||D.kidm||!/^\\d-0/.test(k))return false;const p=lecPrev(k);return !!p&&!S.done[p]}\n"
  + "/* Qué le falta a una clase para quedar terminada (y abrir la siguiente) */\n"
  + "function clsPend(k){const D=LD[k],L=S.ls[k]||{},Q=D&&D.q||[],out=[];if(!D||S.done[k])return out;\n"
  + " out.push(['Terminar la prueba de la lección',!Q.length||solved(L,Q),3]);out.push(['En la entrega, tocar cómo te fue',!!L.op||L.status==='review'||L.status==='ok',4]);out.push(['Tocar «Enviar a mi docente por WhatsApp»',L.status==='ok',4]);return out}\n"
  + "function clsPendHTML(k){const P=clsPend(k),nx=P.find(x=>!x[1]);return '<ul style=\"list-style:none;padding:0;margin:8px 0 12px\">'+P.map(x=>'<li style=\"margin-top:6px;font-size:16px\">'+(x[1]?'✅ ':'⬜ ')+x[0]+'</li>').join('')+'</ul>'+(nx?'<button class=\"btn\" data-lecst=\"'+k+'|'+nx[2]+'\">▶ '+(nx[2]===3?'Ir a la prueba':'Ir a la entrega')+'</button>':'')}\n"
  + "function clsPendCorta(k){const P=clsPend(k);if(!P.length)return '';const L=S.ls[k]||{};if(!(typeof L.score==='number'||L.status))return '';const nx=P.find(x=>!x[1]);return nx?(nx[2]===3?'⏳ Falta: la prueba':'⏳ Falta: la entrega'):''}\n"
  + "document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lecst]');if(!b)return;const[k,st]=b.dataset.lecst.split('|');if(!visS('v-leccion'))go('leccion');lecOpen(k,+st)});\n"
  + "function lecPrev(K){");
/* Lista de clases: candado en las que aún no se abren */
rep("'<button class=\"lesson\" data-k=\"'+a[0]+'\" aria-pressed=\"'+!!S.done[a[0]]+'\">", "'<button class=\"lesson'+(clsLock(a[0])?' lk':'')+'\" data-k=\"'+a[0]+'\" aria-pressed=\"'+!!S.done[a[0]]+'\">");
rep("({review:'💾 Guardada',ok:'✅ Aprobada'}[(S.ls[a[0]]||{}).status]||'▶ Abrir')", "(clsLock(a[0])?'🔒 Bloqueada':clsPendCorta(a[0])||({review:'💾 Guardada',ok:'✅ Aprobada'}[(S.ls[a[0]]||{}).status]||'▶ Abrir'))");
rep('.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}', '.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}\n.lesson.lk{opacity:.5}.lesson.lk .tag{color:var(--mute)}.crt.fix{cursor:default}');
/* Al abrir una clase bloqueada: aviso y botón a la clase que toca */
rep(" if(LD[S.cur]&&LD[S.cur].at&&atLocked(S.cur)){",
  " if(clsLock(S.cur)){const p=lecPrev(S.cur);$('#lec-t').textContent=LD[S.cur].t;$('#lec-s').textContent=LD[S.cur].s||'';$('#steps').innerHTML='';$('#lec-body').innerHTML='<div class=\"card\"><h3>🔒 Clase bloqueada</h3><p class=\"mute\" style=\"margin:6px 0 4px\">Se abre cuando termines la clase anterior: <b>'+esc(LD[p].t)+'</b>. Te falta:</p>'+clsPendHTML(p)+'</div>';return}\n if(LD[S.cur]&&LD[S.cur].at&&atLocked(S.cur)){");
/* Tarjeta de la carrera elegida: fija (sin data-i, no se puede tocar) */
rep("if(mc&&!CRCHG)return '<button class=\"crt on\" data-i=\"'+mc+'\" aria-pressed=\"true\"><span class=\"em\" aria-hidden=\"true\">'+(EMO[mc]||'')+'</span><b>'+esc(INSN[mc])+'</b><small>✓ Tu carrera</small></button>'",
  "if(mc&&!CRCHG)return '<div class=\"crt on fix\"><span class=\"em\" aria-hidden=\"true\">'+(EMO[mc]||'')+'</span><b>'+esc(INSN[mc])+'</b><small>✓ Tu carrera</small></div>'");
rep("$('#inst-t').textContent=kid()?'¿Qué quieres aprender? 🎶':'¿Qué instrumento o carrera estás estudiando?';",
  "$('#inst-t').textContent=myCarr()&&!CRCHG?'Tu carrera':kid()?'¿Qué quieres aprender? 🎶':'¿Qué instrumento o carrera estás estudiando?';");
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
