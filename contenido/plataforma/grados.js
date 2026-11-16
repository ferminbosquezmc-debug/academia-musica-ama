/* ===== Juego de los grados (clase 1 de cada carrera): la plataforma muestra un número del 1 al 8 y el estudiante
   elige la nota (nombre y cifrado). Rondas de 10 respuestas: al terminar, la ronda se cierra y el resultado queda
   registrado (S.gd), visible para el estudiante y, en Seguimiento, para el docente. Se usa con [[grados]] en los .md. ===== */
const GDL=[['DO','C'],['RE','D'],['MI','E'],['FA','F'],['SOL','G'],['LA','A'],['SI','B'],['DO agudo','C']]; /* 7 grados + la octava (8) */
const GDM=[60,62,64,65,67,69,71,72],GDR=10;
const gdSt=()=>{S.gd=S.gd||{};S.gd.r=S.gd.r||{ok:0,tot:0};S.gd.hist=S.gd.hist||[];return S.gd};
function gdCard(){const G=gdSt(),H='<h3>🔢 Juego de los grados</h3>';
 if(G.fin){const f=G.fin;return '<div class="card gd" data-nn>'+H+'<div class="arpi-h">'+arpiSvg(f.ok>=8?'wow':f.ok>=6?'':'sad')+'<p class="jg-bub"><b>🔒 Ronda terminada: '+f.ok+' de '+f.tot+'.</b> '+(f.ok>=8?'¡Excelente trabajo!':f.ok>=6?'¡Bien! Con un poco más de práctica lo dominas.':'Repasa la tabla de grados y vuelve a intentarlo.')+'</p></div>'
  +'<p class="mute" style="font-size:14px;margin-top:10px">Tu resultado quedó guardado y tu docente lo ve en tu seguimiento.</p>'
  +(G.hist.length?'<p style="font-size:15px;margin-top:8px">Tus rondas: '+G.hist.slice(-5).map(h=>'<b>'+h.ok+'/'+h.tot+'</b>').join(' · ')+'</p>':'')
  +'<button class="btn ghost" data-gdx="otra" style="margin-top:12px">🔁 Jugar otra ronda</button></div>'}
 const n=G.r.n||1+Math.floor(Math.random()*8);G.r.n=n;
 return '<div class="card gd" data-nn data-n="'+n+'">'+H+'<p class="mute" style="font-size:14px;margin:4px 0 8px">Mira el número, di en voz alta la nota y su letra, y después tócala aquí. Al responder suena la nota correcta. Son '+GDR+' números por ronda.</p>'
  +'<div style="text-align:center"><span class="gd-n" style="display:inline-grid;place-items:center;width:96px;height:96px;border-radius:50%;background:var(--gold);color:#000;font:700 52px/1 Jost,sans-serif">'+n+'</span></div>'
  +'<div class="gd-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px;margin-top:14px">'+GDL.map((x,i)=>'<button class="chip" data-gdi="'+i+'" style="text-align:center;padding:8px 4px"><b>'+x[0]+'</b> · '+x[1]+'</button>').join('')+'</div>'
  +'<p class="gd-r" style="min-height:26px;margin-top:10px;font-size:17px;text-align:center"></p>'
  +'<div class="row" style="gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px"><button class="btn ghost" data-gdx="oir">🔊 Escuchar la nota</button><button class="btn ghost" data-gdx="esc">🎵 Escala subiendo y bajando</button></div>'
  +'<p class="gd-s mute" style="text-align:center;margin-top:8px;font-size:15px">'+gdTxt()+'</p></div>'}
const gdTxt=()=>{const r=gdSt().r;return 'Número '+Math.min(r.tot+1,GDR)+' de '+GDR+' · Aciertos: '+r.ok};
function gdPlay(ms,beat){const b=beat||.5;let t=lbNow();ms.forEach(m=>{lbNote(m,t,b*.95,{vol:.24});t+=b})}
function gdNew(c){const G=gdSt();let n;do{n=1+Math.floor(Math.random()*8)}while(n===+c.dataset.n);G.r.n=n;c.dataset.n=n;c.querySelector('.gd-n').textContent=n;
 c.querySelector('.gd-r').textContent='';c.querySelector('.gd-s').textContent=gdTxt();c.querySelectorAll('[data-gdi]').forEach(b=>{b.disabled=false;b.removeAttribute('aria-pressed')})}
function gdEnd(c){const G=gdSt(),f={ok:G.r.ok,tot:G.r.tot,fecha:new Date().toISOString()};G.fin=f;G.hist.push(f);if(G.hist.length>10)G.hist.shift();G.r={ok:0,tot:0};save();
 c.outerHTML=gdCard();arpiCheer(f.ok>=8?2:f.ok>=6?1:0,f.ok>=8?'Acertaste '+f.ok+' de '+f.tot+' en el Juego de los grados.':f.ok>=6?f.ok+' de '+f.tot+'. ¡Vas muy bien!':f.ok+' de '+f.tot+'. Repasa la tabla y juega otra ronda.')}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;const c=t.closest('.gd');if(!c)return;let b;
 if(b=t.closest('[data-gdi]')){if(c.dataset.wait)return;const G=gdSt(),n=+c.dataset.n,i=+b.dataset.gdi,good=i===n-1,x=GDL[n-1];
  G.r.tot++;if(good)G.r.ok++;delete G.r.n;save();gdPlay([GDM[n-1]],.8);b.setAttribute('aria-pressed','true');
  c.querySelector('.gd-r').innerHTML=good?'✅ ¡Muy bien! <b>'+n+'</b> → <b>'+x[0]+', '+x[1]+'</b>':'❌ El <b>'+n+'</b> es <b>'+x[0]+', '+x[1]+'</b>. Escúchala y sigue.';
  c.querySelector('.gd-s').textContent='Número '+G.r.tot+' de '+GDR+' · Aciertos: '+G.r.ok;
  c.dataset.wait='1';c.querySelectorAll('[data-gdi]').forEach(x=>x.disabled=true);setTimeout(()=>{delete c.dataset.wait;if(G.r.tot>=GDR)gdEnd(c);else gdNew(c)},good?1300:2600);return}
 if(b=t.closest('[data-gdx]')){const a=b.dataset.gdx;if(a==='otra'){const G=gdSt();G.fin=null;G.r={ok:0,tot:0};save();c.outerHTML=gdCard()}else if(a==='oir')gdPlay([GDM[+c.dataset.n-1]],.8);else gdPlay(GDM.concat(GDM.slice(0,7).reverse()),.45)}});
