/* ===== Juego de los grados (clase 1 de cada carrera): la plataforma muestra un número del 1 al 8 y el estudiante
   elige la nota (nombre y cifrado). Al responder suena la nota correcta. Se usa con [[grados]] en los .md. ===== */
const GDL=[['DO','C'],['RE','D'],['MI','E'],['FA','F'],['SOL','G'],['LA','A'],['SI','B'],['DO agudo','C']]; /* 7 grados + la octava (8) */
const GDM=[60,62,64,65,67,69,71,72];
function gdCard(){const n=1+Math.floor(Math.random()*8);
 return '<div class="card gd" data-nn data-n="'+n+'" data-ok="0" data-tot="0"><h3>🔢 Juego de los grados</h3><p class="mute" style="font-size:14px;margin:4px 0 8px">Mira el número, di en voz alta la nota y su letra, y después tócala aquí. Al responder suena la nota correcta.</p>'
  +'<div style="text-align:center"><span class="gd-n" style="display:inline-grid;place-items:center;width:96px;height:96px;border-radius:50%;background:var(--gold);color:#000;font:700 52px/1 Jost,sans-serif">'+n+'</span></div>'
  +'<div class="gd-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px;margin-top:14px">'+GDL.map((x,i)=>'<button class="chip" data-gdi="'+i+'" style="text-align:center;padding:8px 4px"><b>'+x[0]+'</b> · '+x[1]+'</button>').join('')+'</div>'
  +'<p class="gd-r" style="min-height:26px;margin-top:10px;font-size:17px;text-align:center"></p>'
  +'<div class="row" style="gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px"><button class="btn ghost" data-gdx="oir">🔊 Escuchar la nota</button><button class="btn ghost" data-gdx="esc">🎵 Escala subiendo y bajando</button></div>'
  +'<p class="gd-s mute" style="text-align:center;margin-top:8px;font-size:15px">Aciertos: 0 de 0</p></div>'}
function gdPlay(ms,beat){const b=beat||.5;let t=lbNow();ms.forEach(m=>{lbNote(m,t,b*.95,{vol:.24});t+=b})}
function gdNew(c){let n;do{n=1+Math.floor(Math.random()*8)}while(n===+c.dataset.n);c.dataset.n=n;c.querySelector('.gd-n').textContent=n;
 c.querySelector('.gd-r').textContent='';c.querySelectorAll('[data-gdi]').forEach(b=>{b.disabled=false;b.removeAttribute('aria-pressed')})}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;const c=t.closest('.gd');if(!c)return;let b;
 if(b=t.closest('[data-gdi]')){if(c.dataset.wait)return;const n=+c.dataset.n,i=+b.dataset.gdi,good=i===n-1,x=GDL[n-1];
  c.dataset.tot=+c.dataset.tot+1;if(good)c.dataset.ok=+c.dataset.ok+1;gdPlay([GDM[n-1]],.8);
  b.setAttribute('aria-pressed','true');
  c.querySelector('.gd-r').innerHTML=good?'✅ ¡Muy bien! <b>'+n+'</b> → <b>'+x[0]+', '+x[1]+'</b>':'❌ El <b>'+n+'</b> es <b>'+x[0]+', '+x[1]+'</b>. Escúchala y sigue.';
  c.querySelector('.gd-s').textContent='Aciertos: '+c.dataset.ok+' de '+c.dataset.tot+(+c.dataset.ok>=8?' · ¡Lo lograste! 🎉':'');
  c.dataset.wait='1';c.querySelectorAll('[data-gdi]').forEach(x=>x.disabled=true);setTimeout(()=>{delete c.dataset.wait;gdNew(c)},good?1300:2600);return}
 if(b=t.closest('[data-gdx]')){if(b.dataset.gdx==='oir')gdPlay([GDM[+c.dataset.n-1]],.8);else gdPlay(GDM.concat(GDM.slice(0,7).reverse()),.45)}});
