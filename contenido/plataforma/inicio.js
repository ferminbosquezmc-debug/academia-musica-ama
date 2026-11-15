/* ===== Inicio sencillo: nombre → «Ya toco» (convalidar) o «Desde cero» → instrumento =====
   Mientras falte el nombre o la carrera, Inicio muestra solo estos pasos. */
let OBS=null;
const OBC=()=>['guitarra','piano','bateria','bajo','canto'].filter(k=>AVAIL[k]&&INSN[k]);
function obNeed(){return !S.name||!myCarr()}
function obHome(){const v=document.getElementById('v-home');if(!v)return false;const need=obNeed();
 v.classList.toggle('obon',need);
 v.querySelectorAll(':scope>[data-go="asig"],:scope>[data-go="n4"]').forEach(b=>b.style.display=ADMS?'':'none');
 if(!need){OBS=null;return false}
 if(!S.name)OBS='name';else if(OBS!=='inst')OBS='path';
 let h;
 if(OBS==='name')h='<h1>Bienvenido</h1><p class="mute" style="margin-top:4px">Academia de Música ARPA</p><p style="margin-top:16px;font-size:19px">¿Cómo te llamas?</p><div class="row" style="justify-content:center;margin-top:8px"><input class="name-in" id="ob-nm" placeholder="Tu nombre" aria-label="Tu nombre" autocomplete="given-name"><button class="btn" id="ob-sv">Continuar</button></div>';
 else if(OBS==='path')h='<h1>Hola, '+esc(S.name)+'</h1><p style="margin-top:6px;font-size:19px">¿Cómo quieres empezar?</p><div class="modes ob-m"><button class="mode" data-ob="conv"><span class="em" aria-hidden="true">🎓</span><b>Ya toco o canto</b><small>Quiero convalidar: hago una prueba de unos 10 minutos y empiezo en la clase que me corresponde.</small></button><button class="mode" data-ob="cero"><span class="em" aria-hidden="true">🌱</span><b>Empezar desde cero</b><small>No toco, o prefiero empezar desde la primera clase.</small></button></div><button class="link" data-ob="nm" style="margin-top:12px">Cambiar nombre</button>';
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
/* «Tu ruta de hoy» pasa de Inicio a Práctica */
function obRuta(){const v=document.getElementById('v-practica');if(!v||typeof ruCard!=='function')return;let d=document.getElementById('ru-pr');
 if(!d){d=document.createElement('div');d.id='ru-pr';const h2=v.querySelector('h2');if(h2)h2.after(d);else v.prepend(d)}
 d.innerHTML=ruCard()}
