/* Entrega de la clase en una sola pantalla y 3 pasos: 1) haz la tarea, 2) toca cómo te fue (y, si quieres, escribe algo),
   3) «Enviar a mi docente por WhatsApp» (+507 6834-6940): al tocarlo la clase queda terminada y se abre la siguiente.
   Además: «⬅» dentro de las clases vuelve a la clase y al paso donde estabas.
   Se aplica después de subir_guardar.js. Uso: node subir_entrega.js IN OUT */
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep("else b=(D.fin?D.fin():'')+'<div class=\"card\"><h3>Demuestra lo aprendido</h3><p class=\"mute\" style=\"margin-top:6px\">'+D.e+'</p>'+(D.v?'<p class=\"mute\" style=\"margin-top:8px;font-size:14px\">Si se pide video o audio, mándalo a tu docente por el mismo chat de WhatsApp después de enviar tu respuesta.</p>':'')+'<textarea id=\"ta\" aria-label=\"Tu respuesta\" placeholder=\"Escribe tu respuesta aquí\">'+esc(L.text||'')+'</textarea><p class=\"mute\" style=\"font-size:14px\"><span id=\"cnt\">'+(L.text||'').trim().length+'</span> de 40 caracteres como mínimo</p><button class=\"btn\" id=\"send\" style=\"margin-top:10px\"'+((L.text||'').trim().length<40?' disabled':'')+'>Guardar mi respuesta</button></div>'",
  "else b=(D.fin?D.fin():'')+entCard(D,L)");
/* La pantalla antigua «Respuesta guardada» ya no se usa: la entrega se hace en una sola pantalla */
rep("else if(L.status==='review')b=", "else if(L.status==='review'&&0)b=");
/* «⬅» vuelve a la clase anterior que se estaba viendo (por ejemplo, desde «Clase siguiente») */
rep('function lecOpen(k,step){', "function lecOpen(k,step){if(!lecOpen.nb&&visS('v-leccion')&&S.cur&&S.cur!==k){LHIST.push([S.cur,(S.ls[S.cur]||{}).step||0]);if(LHIST.length>20)LHIST.shift()}lecOpen.nb=0;");
rep(' if((L.step||0)>0){L.step--;', ' if(!clsLock(K)&&(L.step||0)>0){L.step--;');
rep(" obBack($('#lec-back').dataset.go||'clases')}", " if(LHIST.length){const p=LHIST.pop();lecOpen.nb=1;lecOpen(p[0],p[1]);return}obBack($('#lec-back').dataset.go||'clases')}");
const FN = `/* ===== Entrega de la clase (una pantalla, 3 pasos) ===== */
let LHIST=[];
const ENTOP=[['todo','✅ Lo logré todo'],['casi','🙂 Logré casi todo'],['costo','😕 Me costó, necesito ayuda']];
function entItems(D){let e=String(D.e||''),items;const m=e.match(/^\\s*<b>Tu tarea:<\\/b>\\s*([\\s\\S]*?)(?:<br><br>[\\s\\S]*)?$/);
 items=m?m[1].split(/\\s+·\\s+/).filter(x=>x.trim()):[e.replace(/<br>[\\s\\S]*$/,'')];
 return items.map(x=>{const qs=/¿Qué suena\\?/.test(x);x=x.replace(/\\s*Mi resultado:\\s*<input[^>]*>/g,'').replace(/<input[^>]*>/g,'…');
  return x+(qs&&S.qs?' <span class="tag">Tu mejor resultado: '+(S.qs.best||0)+' de 5</span>':'')})}
function entText(D,L){const o=ENTOP.find(x=>x[0]===L.op);return (o?o[1].replace(/^\\S+\\s/,''):'')+(L.extra?'. '+L.extra:'')}
function entCard(D,L){const H=(i,x)=>'<h4 class="m4h4" style="display:flex;gap:10px;align-items:center"><span class="m4n" style="background:var(--gold);color:#000">'+i+'</span>'+x+'</h4>';L.text=entText(D,L);
 return '<div class="card" id="ent"><h3>📤 Entrega de la clase</h3><p class="mute" style="margin-top:4px">Tres pasos cortos. Al terminar, se abre la clase siguiente.</p>'
  +H(1,'Haz la tarea')+'<ul class="m4ul">'+entItems(D).map(x=>'<li>'+x+'</li>').join('')+'</ul>'
  +(D.v?'<p class="mute" style="margin-top:8px;font-size:15px">🎥 Si la tarea es tocar o cantar, graba un audio o video corto con tu teléfono y mándalo en el chat de WhatsApp del paso 3.</p>':'')
  +H(2,'Toca cómo te fue')+'<div class="go3" style="margin-top:6px">'+ENTOP.map(o=>'<button class="opt" data-entop="'+o[0]+'" aria-pressed="'+(L.op===o[0])+'" style="margin-top:0">'+o[1]+'</button>').join('')+'</div>'
  +'<label class="fl" for="ent-x">Si quieres, cuéntale algo a tu docente (opcional)</label><input class="fi" id="ent-x" maxlength="200" placeholder="Ejemplo: me costó recordar la letra del SI" value="'+esc(L.extra||'')+'">'
  +H(3,'Envíala a tu docente')+'<p class="mute" style="font-size:15px">Tu entrega llega a tu docente en la plataforma. También se abre WhatsApp con el mensaje ya escrito para la academia (+507 6834-6940): <b>dentro de WhatsApp toca «Enviar»</b>. La clase queda terminada.</p>'
  +(L.op?'<a class="btn" id="ent-go" data-entsend href="'+waHref(D,L)+'" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none;margin-top:10px;background:#25d366;color:#000">📲 Enviar a mi docente por WhatsApp</a><p style="margin-top:12px"><button class="link" data-entsend data-nowa="1" style="font-size:14px">¿No tienes WhatsApp aquí? Termina la clase sin enviar</button></p>':'<p class="atwarn" style="margin-top:10px">Primero toca en el paso 2 cómo te fue.</p>')+'</div>'}
function entFin(){const K=S.cur,D=LD[K],L=S.ls[K]=S.ls[K]||{};L.text=entText(D,L);L.status='ok';L.fe=new Date().toISOString();S.done[K]=true;save();setTimeout(()=>{lec();window.scrollTo(0,0);arpiCheer(2,'Entregaste la clase. ¡Ya se abrió la siguiente!')},400)}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#ent'))return;let b;const K=S.cur,L=S.ls[K]=S.ls[K]||{};
 if(b=t.closest('[data-entop]')){L.op=b.dataset.entop;save();lec();const g=document.getElementById('ent');if(g)g.scrollIntoView({block:'center'});return}
 if(b=t.closest('[data-entsend]')){entFin()}});
document.addEventListener('input',e=>{if(e.target.id!=='ent-x')return;const K=S.cur,D=LD[K],L=S.ls[K]=S.ls[K]||{};L.extra=e.target.value.trim().slice(0,200);L.text=entText(D,L);clearTimeout(entFin.t);entFin.t=setTimeout(save,400);const a=document.getElementById('ent-go');if(a)a.href=waHref(D,L)});
function perfil(){`;
rep('function perfil(){', FN);
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
