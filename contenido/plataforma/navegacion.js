/* ===== Navegación: «⬅» siempre vuelve a la sección o página anterior; el menú marca Práctica en el paso Practicar;
   al terminar una clase, resumen con la clase completa para repasar y botón a la clase siguiente. ===== */
let HIST=[],CURV=null,OBBK=false;
function obHist(v){if(OBBK)OBBK=false;else if(CURV&&CURV!==v){HIST.push(CURV);if(HIST.length>30)HIST.shift()}CURV=v}
function obBack(def){let p=null;while(HIST.length){p=HIST.pop();if(p!==CURV)break;p=null}if(!p)p=def||'home';OBBK=true;go(p)}
function obNav(st,D){if(!D||D.at||D.kidm)return;const t=st===2?'practica':'clases';document.querySelectorAll('nav button').forEach(b=>b.dataset.go===t?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'))}
function obFin(K,D,L){const nv=lecNext(K),ok=nv&&LD[nv];
 const sec=(t,h)=>'<details class="card sub"><summary><span class="grow">'+t+'</span></summary><div style="padding-bottom:12px">'+h+'</div></details>';
 let h='<div class="card" style="border-color:#5fbf7a"><h3>✅ Clase terminada</h3><p class="mute" style="margin:6px 0 12px">'+esc(D.t)+(typeof L.score==='number'&&D.q?' · Prueba: '+L.score+' de '+D.q.length+' a la primera':'')+'</p>'
  +(ok?'<button class="btn" data-lecgo="'+nv+'">▶ Siguiente clase: '+esc(LD[nv].t)+'</button>':'<button class="btn" data-go="'+(D.at?'asig':'clases')+'">'+(D.at?'Volver a la carrera':'Volver a Clases')+'</button>')
  +'<p class="mute" style="font-size:14px;margin-top:12px">Tu docente revisará tu entrega. Si todavía no la enviaste, puedes hacerlo aquí.</p>'+waBtn(D,L,'ghost')+'</div>'
  +'<h3 style="margin-top:20px">📘 Repasa la clase completa</h3><p class="mute" style="font-size:14px;margin-top:4px">Toca cada parte para abrirla.</p>';
 try{h+=sec('👀 Ver',D.ver?D.ver():'<p class="mute" style="margin-top:6px">'+(D.o||'')+'</p>')}catch(e){}
 try{h+=sec('📖 Leer',D.leer?D.leer(K,L):(typeof D.g==='function'?D.g():(D.g||'')))}catch(e){}
 try{if(D.p)h+=sec('🎵 Practicar',D.p())}catch(e){}
 if(D.q&&D.q.length)h+=sec('✅ Prueba',D.q.map((q,i)=>'<p style="margin-top:12px"><b>'+(i+1)+'. '+q[0]+'</b><br>✔ '+q[1][q[2]]+'</p>').join(''));
 if(D.e)h+=sec('📤 Entrega','<p style="margin-top:6px">'+D.e+'</p>'+(L.text?'<p class="mute" style="margin-top:6px">Tu respuesta: '+esc(L.text)+'</p>':''));
 return h}
