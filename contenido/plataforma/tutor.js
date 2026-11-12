/* ===== Tutor ARPA (Prioridad 3 de la auditoría) =====
   Conversación dentro de cada clase, con el contenido de esa clase y el Método ARPA.
   Usa la capacidad «sample» ya declarada. Reemplaza la ayuda de un solo uso («Explícamelo de otra forma»). */
const TUS=['Explícamelo de otra forma','Dame un ejercicio de 5 minutos','¿Cómo sé si lo estoy haciendo bien?','Hazme una pregunta de repaso'];
const TUhtml=h=>{const d=document.createElement('div');d.innerHTML=h||'';d.querySelectorAll('script,style,svg,button,audio,video').forEach(x=>x.remove());return d.textContent.replace(/\s+/g,' ').trim()};
function tuCtx(K){const D=LD[K]||{};let c='';
 const part=f=>{try{return TUhtml(typeof f==='function'?f():f)}catch(e){return ''}};
 c=[D.g,D.leer,D.p,D.fin].map(part).filter(Boolean).join(' ');
 const pq=Array.isArray(D.q)?D.q.map(x=>Array.isArray(x)?x[0]:'').filter(Boolean):[];
 return 'Eres el Tutor ARPA de la Academia de Música ARPA (AMA), una academia cristiana que forma músicos desde cero. Acompañas a un estudiante dentro de una clase de la plataforma.\n\n'
  +'Trabajas con el Método ARPA: Atender (escuchar y mirar antes de explicar), Razonar (entender el porqué), Practicar (un solo paso nuevo, lento, con metrónomo y una meta de tempo) y Aplicar (tocarlo en música real).\n\n'
  +'Clase: '+(D.s||'')+' · '+(D.t||'')+'\nObjetivo: '+TUhtml(D.o||'')+'\nContenido de la clase: '+c.slice(0,6000)+'\n'
  +(pq.length?'Preguntas de la prueba de esta clase (NO las respondas; puedes dar una pista para pensar): '+pq.join(' | ')+'\n':'')
  +'\nReglas:\n- Responde en español, en texto plano sin asteriscos ni almohadillas. Puedes usar saltos de línea y pasos numerados (1. 2. 3.).\n- Máximo 120 palabras.\n'
  +'- Usa solo los datos musicales del contenido de la clase y no contradigas la clase. Si preguntan algo musical que no está en esta clase, di en una frase que se verá en otra clase o que lo consulte con su docente.\n'
  +'- Si piden algo que no es de música, redirige con amabilidad a la clase.\n'
  +'- Si piden un ejercicio, da uno de 5 minutos con pasos y una meta de tempo, sacado del contenido.\n'
  +'- Si piden una pregunta de repaso, haz UNA sola pregunta distinta a las de la prueba y espera la respuesta; luego corrígela con amabilidad.\n'
  +'- Si el estudiante menciona dolor o molestia física, que pare, descanse y lo hable con su docente.\n'
  +'- Anima sin exagerar. Si la duda sigue, sugiere preguntarle a su docente.'
  +(kid()?'\n- El estudiante es un niño: usa frases muy cortas, palabras sencillas y un ejemplo de juego.':'')}
function helpCard(K){if(!SMP)return '';const H=HELP[K]||{m:[]};
 return '<div class="card" id="tutor"><h3>🤖 Tutor ARPA</h3><p class="mute" style="font-size:14px;margin:4px 0 8px">Pregúntale sobre esta clase. Responde con lo que está en la clase; para lo demás, tu docente.</p>'
  +'<div id="tu-log" aria-live="polite">'+tuLog(K)+'</div>'
  +'<div class="chips" role="group" aria-label="Preguntas rápidas" style="margin-top:8px">'+TUS.map((s,i)=>'<button class="chip" data-tus="'+i+'"'+(H.busy?' disabled':'')+'>'+s+'</button>').join('')+'</div>'
  +'<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap"><input class="fi" id="tu-q" maxlength="300" placeholder="Escribe tu pregunta" style="flex:1;min-width:180px"><button class="btn" id="tu-send"'+(H.busy?' disabled':'')+'>Enviar</button></div>'
  +'<div class="row" style="gap:12px;margin-top:6px"><button class="link" id="tu-stop"'+(H.busy?'':' hidden')+'>Detener</button><button class="link" id="tu-clear"'+((H.m||[]).length&&!H.busy?'':' hidden')+'>Empezar de nuevo</button></div></div>'}
function tuLog(K){const H=HELP[K]||{m:[]};return (H.m||[]).map(x=>'<div style="display:flex;justify-content:'+(x.r==='u'?'flex-end':'flex-start')+';margin-top:8px"><div style="max-width:88%;padding:8px 12px;border-radius:14px;white-space:pre-wrap;font-size:15px;'
  +(x.r==='u'?'background:var(--gold);color:#0a0908':'background:rgba(255,255,255,.07)')+'">'+esc(x.t||(H.busy?'Pensando…':''))+'</div></div>').join('')}
function paintHelp(K){if(S.cur!==K)return;const c=document.getElementById('tutor');if(!c)return;const H=HELP[K]||{};
 document.getElementById('tu-log').innerHTML=tuLog(K);c.querySelectorAll('[data-tus],#tu-send').forEach(b=>b.disabled=!!H.busy);
 document.getElementById('tu-stop').hidden=!H.busy;document.getElementById('tu-clear').hidden=!!H.busy||!(H.m||[]).length}
async function tuAsk(K,q){q=String(q||'').trim().slice(0,300);if(!SMP||!q)return;const H=HELP[K]=HELP[K]&&HELP[K].m?HELP[K]:{m:[]};if(H.busy)return;
 H.m.push({r:'u',t:q});const a={r:'a',t:''};H.m.push(a);H.busy=true;paintHelp(K);
 const m=H.m.slice(0,-1);let rest=m.slice(1);while(rest.length>8)rest=rest.slice(2);
 const input=[{role:'user',content:tuCtx(K)+'\n\n---\nEstudiante: '+m[0].t}].concat(rest.map(x=>({role:x.r==='u'?'user':'assistant',content:x.t})));
 hctl=new AbortController();
 try{await SMP(input,{cache:false,signal:hctl.signal,onText:({text})=>{a.t=text.replace(/[*#]+/g,'');paintHelp(K)}})}
 catch(e){const c=e&&e.code;if(c==='cancelled'){if(!a.t)a.t='(Detenido)'}else if(c==='not_granted'||c==='sampling_disabled')a.t='Para usar el tutor, permite que la página use Claude cuando te lo pregunte.';
  else if(c==='rate_limited')a.t='Llegaste al límite de uso por ahora. Inténtalo más tarde.';else if(c==='session_expired')a.t='Vuelve a iniciar sesión en Claude para usar el tutor.';else a.t=(e&&e.text)||'No se pudo obtener la respuesta. Inténtalo otra vez.'}
 H.busy=false;paintHelp(K)}
function explain(K){tuAsk(K,TUS[0])}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#tutor'))return;const K=S.cur;let b;
 if(b=t.closest('[data-tus]'))return tuAsk(K,TUS[+b.dataset.tus]);
 if(t.closest('#tu-send')){const i=document.getElementById('tu-q');const q=i.value;i.value='';return tuAsk(K,q)}
 if(t.closest('#tu-stop')){if(hctl)hctl.abort();return}
 if(t.closest('#tu-clear')){HELP[K]={m:[]};return paintHelp(K)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.id==='tu-q'){e.preventDefault();const q=e.target.value;e.target.value='';tuAsk(S.cur,q)}});
