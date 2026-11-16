/* ===== Inicio sencillo: nombre → «Ya toco» (convalidar) o «Desde cero» → instrumento =====
   Mientras falte el nombre o la carrera, Inicio muestra solo estos pasos. */
let OBS=null;
const OBC=()=>['guitarra','piano','bateria','bajo','canto'].filter(k=>AVAIL[k]&&INSN[k]);
function obNeed(){return !S.name||!myCarr()}
function obHome(){const v=document.getElementById('v-home');if(!v)return false;const need=obNeed();
 v.classList.toggle('obon',need);
 v.querySelectorAll(':scope>[data-go="asig"],:scope>[data-go="n4"]').forEach(b=>b.style.display='none');
 if(!need){OBS=null;obMas(v);return false}
 if(!S.name)OBS='name';else if(OBS!=='inst')OBS='path';
 let h;
 if(OBS==='name')h='<h1>Bienvenido</h1><p class="mute" style="margin-top:4px">Academia de Música ARPA</p><p style="margin-top:16px;font-size:19px">¿Cómo te llamas?</p><div class="row" style="justify-content:center;margin-top:8px"><input class="name-in" id="ob-nm" placeholder="Tu nombre" aria-label="Tu nombre" autocomplete="given-name"><button class="btn" id="ob-sv">Continuar</button></div>';
 else if(OBS==='path')h='<h1>Hola, '+esc(S.name)+'</h1><p style="margin-top:6px;font-size:19px">¿Cómo quieres empezar?</p><div class="modes ob-m"><button class="mode" data-ob="conv"><span class="em" aria-hidden="true">🎓</span><b>Ya tengo conocimiento de música · Convalidar</b><small>Hago una prueba de unos 10 minutos y empiezo en la clase que me corresponde.</small></button><button class="mode" data-ob="cero"><span class="em" aria-hidden="true">🌱</span><b>Empezar desde cero</b><small>No toco, o prefiero empezar desde la primera clase.</small></button></div><button class="link" data-ob="nm" style="margin-top:12px">Cambiar nombre</button>';
 else h='<h1>¿Qué quieres aprender?</h1><p class="mute" style="margin-top:4px">Elige tu instrumento. Empiezas en la clase 1.</p><div class="ob-g">'+OBC().map(k=>'<button class="crt" data-obi="'+k+'"><span class="em" aria-hidden="true">'+(EMO[k]||'')+'</span><b>'+esc(INSN[k])+'</b></button>').join('')+'</div><button class="link" data-ob="back" style="margin-top:12px">⬅ Volver</button>';
 document.getElementById('greet').innerHTML=h;
 const nm=document.getElementById('ob-nm');
 if(nm){const f=()=>{const x=nm.value.trim();if(x){S.name=x;save();OBS='path';home()}else nm.focus()};document.getElementById('ob-sv').onclick=f;nm.onkeydown=e=>{if(e.key==='Enter')f()}}
 return true}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;let b;
 if(b=t.closest('[data-ob]')){const a=b.dataset.ob;
  if(a==='conv')go('ubic');else if(a==='cero'){OBS='inst';home()}else if(a==='back'){OBS='path';home()}else if(a==='nm'){S.name='';save();OBS='name';home()}
  window.scrollTo(0,0);return}
 if(b=t.closest('[data-obi]')){const k=b.dataset.obi;S.inst=S.inst||{};S.inst[0]=S.inst[1]=S.inst[2]=k;S.lvl=0;if(S.mode===undefined)S.mode='adult';OBS=null;save();toast('Listo: tu carrera es '+INSN[k]);home();window.scrollTo(0,0)}});
/* «Más opciones»: un solo botón al final de Inicio con lo que no hace falta ver todos los días */
let OBMopen=false;
function obMas(v){let d=document.getElementById('ob-mas');
 if(!d){d=document.createElement('details');d.id='ob-mas';d.className='card sub';d.addEventListener('toggle',()=>{OBMopen=d.open})}
 v.appendChild(d);d.open=OBMopen;
 const H=(t)=>'<h4 class="ath4" style="margin-top:18px">'+t+'</h4>';
 const stp=[['1','Elige tu instrumento','Para ver tus clases','clases'],['2','Abre tu siguiente lección','Empieza por el paso «Ver»','next'],['3','Practica con el metrónomo','Mantén el pulso constante','practica']];
 d.innerHTML='<summary><span class="em" aria-hidden="true">➕</span><span class="grow">Más opciones</span></summary>'
  +H('🧭 Cómo empezar')+'<div class="go3">'+stp.map(x=>'<button data-obt="'+x[3]+'"><span class="n">'+x[0]+'</span><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span><span class="ar" aria-hidden="true">›</span></button>').join('')+'</div>'
  +H('🎓 Prueba de ubicación')+'<p class="mute" style="font-size:15px">Si ya tocas o cantas, haz la prueba (unos 10 minutos) y empieza en la clase que te corresponde.</p><button class="btn ghost" data-go="ubic" style="margin-top:10px">'+(S.ubic?'Repetir la prueba de ubicación':'Hacer la prueba de ubicación')+'</button>'
  +H('🙂 Mi modo')+'<div class="modes"><button class="mode" data-obm="kid" aria-pressed="'+kid()+'"><span class="em">🚀</span><b>Explorador</b><small>Para 9 a 14 años · textos cortos, retos y estrellas</small></button><button class="mode" data-obm="adult" aria-pressed="'+!kid()+'"><span class="em">🎓</span><b>Estudiante</b><small>Jóvenes y adultos · más detalle y teoría</small></button></div>'
  +(typeof ruCard==='function'?ruCard():'')
  +H('🏆 Retos de la semana')+(typeof rtMini==='function'?rtMini():'')
  +H('🎚️ Otras carreras de la academia')
  +'<button class="m4home athome" data-go="asig"><span class="em" aria-hidden="true">🎚️</span><span>Audio Técnica · Sonido en Vivo<small>Carrera de técnico de sonido · 3 niveles</small></span></button>'
  +'<button class="m4home" data-go="n4"><span class="em" aria-hidden="true">🕊️</span><span>ARPA | Formación Ministerial<small>Nivel 4 · Diplomado para músicos y líderes</small></span></button>'}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#ob-mas'))return;let b;
 if(b=t.closest('[data-obm]')){S.mode=b.dataset.obm;save();applyMode();toast(kid()?'Modo Explorador':'Modo Estudiante');home();return}
 if(b=t.closest('[data-obt]')){const x=b.dataset.obt;if(x==='next'){const f=document.getElementById('fin');if(f)f.click();else go('clases')}else go(x)}});
/* Vista de estudiante nuevo: franja verde arriba con «Empezar otra vez» y «Salir» */
function obPrevBar(){if(!PREV||!document.body||document.getElementById('prev-bar'))return;const b=document.createElement('div');b.id='prev-bar';
 b.innerHTML='<span>👁 Vista de estudiante nuevo · nada de lo que hagas aquí se guarda</span><span style="display:flex;gap:8px"><button class="btn m4mini" data-prev="on">Empezar otra vez</button><button class="btn m4mini" data-prev="off">Salir</button></span>';document.body.prepend(b)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-prev]');if(!b)return;
 try{sessionStorage.removeItem('arpPrevS');if(b.dataset.prev==='on')sessionStorage.setItem('arpPrev','1');else sessionStorage.removeItem('arpPrev')}catch(x){toast('Este navegador no permite la vista de estudiante nuevo');return}
 location.reload()});
obPrevBar();
/* «Tu ruta de hoy» también se ve en Práctica */
function obRuta(){const v=document.getElementById('v-practica');if(!v||typeof ruCard!=='function')return;let d=document.getElementById('ru-pr');
 if(!d){d=document.createElement('div');d.id='ru-pr';const h2=v.querySelector('h2');if(h2)h2.after(d);else v.prepend(d)}
 d.innerHTML=ruCard()}
