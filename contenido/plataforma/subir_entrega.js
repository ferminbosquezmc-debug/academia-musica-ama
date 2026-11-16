/* «Demuestra lo aprendido» en 3 pasos claros: haz la tarea, escribe cómo te fue, guárdala y envíala.
   Se aplica después de subir_guardar.js. Uso: node subir_entrega.js IN OUT */
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep("else b=(D.fin?D.fin():'')+'<div class=\"card\"><h3>Demuestra lo aprendido</h3><p class=\"mute\" style=\"margin-top:6px\">'+D.e+'</p>'+(D.v?'<p class=\"mute\" style=\"margin-top:8px;font-size:14px\">Si se pide video o audio, mándalo a tu docente por el mismo chat de WhatsApp después de enviar tu respuesta.</p>':'')+'<textarea id=\"ta\" aria-label=\"Tu respuesta\" placeholder=\"Escribe tu respuesta aquí\">'+esc(L.text||'')+'</textarea><p class=\"mute\" style=\"font-size:14px\"><span id=\"cnt\">'+(L.text||'').trim().length+'</span> de 40 caracteres como mínimo</p><button class=\"btn\" id=\"send\" style=\"margin-top:10px\"'+((L.text||'').trim().length<40?' disabled':'')+'>Guardar mi respuesta</button></div>'",
  "else b=(D.fin?D.fin():'')+entCard(D,L)");
const FN = `/* Entrega de la clase en 3 pasos (la tarea sale de D.e: «<b>Tu tarea:</b> A · B<br><br>Cuéntale…») */
function entCard(D,L){let e=String(D.e||''),items;const m=e.match(/^\\s*<b>Tu tarea:<\\/b>\\s*([\\s\\S]*?)(?:<br><br>[\\s\\S]*)?$/);
 if(m)items=m[1].split(/\\s+·\\s+/).filter(x=>x.trim());else items=[e];
 const n=(L.text||'').trim().length,H=(i,x)=>'<h4 class="m4h4" style="display:flex;gap:10px;align-items:center"><span class="m4n" style="background:var(--gold);color:#000">'+i+'</span>'+x+'</h4>';
 return '<div class="card"><h3>📤 Entrega de la clase</h3><p class="mute" style="margin-top:4px">Son 3 pasos. Tu docente la revisa y te responde por WhatsApp.</p>'
  +H(1,'Haz la tarea')+'<ul class="m4ul">'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>'
  +(D.v?'<p class="mute" style="margin-top:8px;font-size:15px">🎥 Si la tarea es tocar o cantar, graba un audio o video corto con tu teléfono. Lo mandarás en el paso 3.</p>':'')
  +H(2,'Escribe cómo te fue')+'<p class="mute" style="font-size:15px">Cuenta qué lograste y qué te costó. Mínimo 40 letras.</p>'
  +'<textarea id="ta" aria-label="Cómo te fue" placeholder="Ejemplo: Ya me sé las 7 notas con su cifrado. Me costó recordar que SI es B.">'+esc(L.text||'')+'</textarea><p class="mute" style="font-size:14px">Llevas <span id="cnt">'+n+'</span> de 40 letras</p>'
  +H(3,'Guárdala y envíala')+'<p class="mute" style="font-size:15px">Toca el botón. En la pantalla siguiente se abre WhatsApp con tu respuesta escrita'+(D.v?'; ahí mismo adjunta tu audio o video':'')+'.</p>'
  +'<button class="btn" id="send" style="margin-top:10px"'+(n<40?' disabled':'')+'>Guardar mi respuesta</button></div>'}
function perfil(){`;
rep('function perfil(){', FN);
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
