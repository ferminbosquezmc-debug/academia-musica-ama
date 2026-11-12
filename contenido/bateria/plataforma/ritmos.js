/* ===== AMA · Batería: sonidos, ritmos de práctica, reproductor y batería digital =====
   Se usa igual en la plataforma y en la página del plan.
   · DRP.player('b1,marcha')  → reproductor de uno o varios ritmos ('todos' = los 17 por nivel)
   · DRP.kit()                → batería digital de 8 piezas
   · DRP.mount(raíz)          → dibuja los reproductores que haya dentro de la raíz
   · DRP.stop()               → detiene lo que esté sonando */
const DRP=(()=>{
let ac=null,M=null,NZ=null;
function ctx(){if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();M=ac.createGain();M.gain.value=.8;const c=ac.createDynamicsCompressor();M.connect(c).connect(ac.destination);
  NZ=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);const d=NZ.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
 if(ac.state==='suspended')ac.resume();return ac}
function env(t,p,dec){const g=ac.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(p,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+dec);g.connect(M);return g}
function noise(t,dec,p,type,f,q){const s=ac.createBufferSource();s.buffer=NZ;const b=ac.createBiquadFilter();b.type=type;b.frequency.value=f;if(q)b.Q.value=q;s.connect(b).connect(env(t,p,dec));s.start(t);s.stop(t+dec+.05)}
function tone(t,f0,f1,dec,p,type){const o=ac.createOscillator();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dec*.6);o.connect(env(t,p,dec));o.start(t);o.stop(t+dec+.05)}
function metal(t,dec,p,hp,mult){const out=env(t,p,dec),h=ac.createBiquadFilter();h.type='highpass';h.frequency.value=hp;const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=hp*1.3;b.Q.value=.6;h.connect(b).connect(out);
  [205.3,304.4,369.6,522.7,540,800].forEach(f=>{const o=ac.createOscillator();o.type='square';o.frequency.value=f*mult;o.connect(h);o.start(t);o.stop(t+dec+.05)})}
const SND={
 bombo:t=>{tone(t,150,48,.45,1);noise(t,.02,.25,'lowpass',2500)},
 caja:t=>{tone(t,190,160,.12,.5,'triangle');noise(t,.22,.7,'highpass',1200)},
 ghost:t=>{tone(t,190,160,.08,.1,'triangle');noise(t,.12,.12,'highpass',1500)},
 rim:t=>{tone(t,1700,1500,.05,.35,'triangle');noise(t,.04,.3,'bandpass',2200,2)},
 hihat:t=>{metal(t,.07,.35,7000,1.2)},
 hhopen:t=>{metal(t,.45,.3,6500,1.2)},
 hhpie:t=>{metal(t,.05,.22,6000,1.1)},
 ride:t=>{metal(t,1.2,.17,5200,1.6);tone(t,2600,2550,.5,.04)},
 crash:t=>{metal(t,1.9,.22,4000,1.35);noise(t,1.6,.28,'highpass',5000)},
 tom1:t=>{tone(t,240,170,.4,.8);noise(t,.04,.12,'bandpass',900,1)},
 tom2:t=>{tone(t,185,128,.5,.8);noise(t,.04,.12,'bandpass',700,1)},
 piso:t=>{tone(t,120,82,.7,.9);noise(t,.05,.12,'bandpass',500,1)}};
function hit(p,t){ctx();SND[p](t===undefined?ac.currentTime:t)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* pieza: nombre, extremidad, color, grupo (b bombo · r redoblante · p platillo · f pie) */
const PZ={hihat:['Hi-hat','D','#E5312B','p'],hhopen:['Hi-hat abierto','D','#E5312B','p'],ride:['Ride','D','#E5312B','p'],caja:['Redoblante','I','#2370D6','r'],ghost:['Redoblante suave','I','#2370D6','r'],rim:['Aro (cross-stick)','I','#2370D6','r'],bombo:['Bombo','PD','#2E9E4F','b'],hhpie:['Hi-hat con el pie','PI','#8E3BB8','f']};
const CNT={2:['1','2'],3:['1','2','3'],4:['1','2','3','4'],6:['1','2','3','4','5','6'],8:['1','y','2','y','3','y','4','y'],12:['1','·','·','2','·','·','3','·','·','4','·','·'],16:['1','e','y','a','2','e','y','a','3','e','y','a','4','e','y','a']};
const BEAT={2:1,3:1,4:1,6:3,8:2,12:3,16:4};
/* [id, nivel, nombre, compás, pasos por compás, clase, adicional, filas, compases, tempo] */
const RY=[
 ['b1',1,'Ritmo básico #1','4/4 · negras',4,'Clase 5',0,{hihat:[0,1,2,3],caja:[1,3],bombo:[0,2]},1,80],
 ['marcha',1,'Marcha','2/4',2,'Clase 6',1,{caja:[1],bombo:[0]},2,100],
 ['vals',1,'Vals','3/4',3,'Clase 6',1,{hihat:[1,2],bombo:[0]},2,100],
 ['b2',1,'Ritmo básico #2','4/4 · rock en corcheas',8,'Clase 8',0,{hihat:[0,1,2,3,4,5,6,7],caja:[2,6],bombo:[0,4]},1,80],
 ['b3',1,'Ritmo básico #3','4/4',8,'Clase 9',0,{hihat:[0,1,2,3,4,5,6,7],caja:[2,6],bombo:[0,4,5]},1,80],
 ['balada',1,'Balada','4/4 lenta',4,'Clase 10',1,{hihat:[0,1,2,3],caja:[2],bombo:[0]},1,65],
 ['b4',1,'Ritmo básico #4','4/4',8,'Clase 11',0,{hihat:[0,1,2,3,4,5,6,7],caja:[2,6],bombo:[0,3,4,5]},1,80],
 ['b5',2,'Ritmo básico #5','4/4 · hi-hat abierto',8,'Clase 13',0,{hihat:[0,1,2,3,4,5,6],hhopen:[7],caja:[2,6],bombo:[0,4]},1,85],
 ['disco',2,'Disco / pop','4/4',8,'Clase 13',1,{hihat:[0,2,4,6],hhopen:[1,3,5,7],caja:[2,6],bombo:[0,2,4,6]},1,110],
 ['b6',2,'Ritmo básico #6','12/8 · hi-hat en tresillos',12,'Clase 15',0,{hihat:[0,1,2,3,4,5,6,7,8,9,10,11],caja:[3,9],bombo:[0,6]},1,60],
 ['b68',2,'Balada en 6/8','6/8',6,'Clase 15',1,{hihat:[0,1,2,3,4,5],caja:[3],bombo:[0]},2,60],
 ['b7',2,'Ritmo básico #7','4/4 · hi-hat en semicorcheas',16,'Clase 17',0,{hihat:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],caja:[4,12],bombo:[0,8]},1,70],
 ['shuffle',2,'Shuffle','4/4 con tresillos',12,'Clase 21',1,{hihat:[0,2,3,5,6,8,9,11],caja:[3,9],bombo:[0,6]},1,90],
 ['cumbia',3,'Cumbia','4/4 · corcheas',8,'Clase 26',1,{hhopen:[1,3,5,7],rim:[2,6],bombo:[0,4]},1,95],
 ['bossa',3,'Bossa nova','4/4 · 2 compases',8,'Clase 26',1,{hihat:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],rim:[0,3,6,10,13],bombo:[0,3,4,7]},2,120],
 ['reggae',3,'Reggae (one drop)','4/4',8,'Clase 29',1,{hihat:[0,1,2,3,4,5,6,7],rim:[4],bombo:[4]},1,75],
 ['funk',3,'Funk','4/4 · semicorcheas',16,'Clase 30',1,{hihat:[0,2,4,6,8,10,12,14],caja:[4,12],ghost:[7,9,14],bombo:[0,3,10]},1,90]];
const byId=id=>RY.find(r=>r[0]===id);
/* filas efectivas: cada pieza con sus golpes en todo el patrón; con «ride» el hi-hat pasa al ride */
function lines(r,ride){const n=r[4],cols=n*(r[8]||1),out={};
  Object.keys(r[7]).forEach(p=>{const a=r[7][p],abs=Math.max(...a)>=n,k=ride&&(p==='hihat'||p==='hhopen')?'ride':p;
    out[k]=out[k]||new Array(cols).fill(0);for(let c=0;c<cols;c++)if(abs?a.includes(c):a.includes(c%n))out[k][c]=1});
  const order=['ride','hihat','hhopen','caja','ghost','rim','bombo','hhpie'];return order.filter(k=>out[k]).map(k=>[k,out[k]])}
const audible=(p,mode)=>mode==='all'||PZ[p][3]===mode;
const st={on:false,el:null,step:0,next:0,timer:null};
function stop(){st.on=false;clearInterval(st.timer);if(st.el){st.el.querySelectorAll('.drp-c.on').forEach(c=>c.classList.remove('on'));const b=st.el.querySelector('.drp-go');if(b){b.textContent='▶ Escuchar';b.setAttribute('aria-pressed','false')}}st.el=null}
function sched(){const el=st.el;if(!el||!el.isConnected)return stop();const r=byId(el.dataset.cur),n=r[4],cols=n*(r[8]||1),L=lines(r,el.dataset.pl==='1'),mode=el.dataset.mix,dur=60/+el.querySelector('.drp-bpm').value/BEAT[n];
  while(st.next<ac.currentTime+.12){const s=st.step%cols,t=st.next;
    L.forEach(([p,a])=>{if(a[s]&&audible(p,mode))SND[p](t)});
    const d=Math.max(0,(t-ac.currentTime)*1000);setTimeout(()=>{if(st.el!==el)return;el.querySelectorAll('.drp-c').forEach(c=>c.classList.toggle('on',+c.dataset.k===s))},d);
    st.step++;st.next+=dur}}
function play(el){if(st.on&&st.el===el)return stop();stop();ctx();st.on=true;st.el=el;st.step=0;st.next=ac.currentTime+.08;st.timer=setInterval(sched,25);sched();const b=el.querySelector('.drp-go');b.textContent='⏹ Detener';b.setAttribute('aria-pressed','true')}
function draw(el){const r=byId(el.dataset.cur);if(!r)return;const n=r[4],bars=r[8]||1,cols=n*bars,ride=el.dataset.pl==='1',mode=el.dataset.mix,L=lines(r,ride);
  el.querySelector('.drp-info').innerHTML='<b>'+esc(r[2])+'</b> <span>· '+esc(r[3])+' · '+esc(r[5])+(r[6]?' · ritmo de práctica adicional':' · ritmo básico')+'</span>';
  const g=el.querySelector('.drp-g');g.style.gridTemplateColumns='118px repeat('+cols+',minmax(26px,1fr))';g.style.minWidth=(118+cols*30)+'px';
  let h='<div></div>';for(let b=0;b<bars;b++)CNT[n].forEach((c,i)=>{h+='<div class="drp-h'+(i%BEAT[n]===0?' b':'')+'">'+c+'</div>'});
  L.forEach(([p,a])=>{const z=PZ[p],dim=audible(p,mode)?'':' off';h+='<div class="drp-l'+dim+'">'+z[0]+'</div>';
    for(let k=0;k<cols;k++)h+='<div class="drp-c'+(k%BEAT[n]===0?' beat':'')+dim+'" data-k="'+k+'">'+(a[k]?'<i class="'+(p==='ghost'?'gh':'')+'" style="background:'+z[2]+'">'+z[1]+'</i>':'')+'</div>'});
  g.innerHTML=h;
  el.querySelectorAll('[data-r]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.r===r[0])));
  el.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  el.querySelectorAll('[data-ride]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ride===el.dataset.pl)));
  const pl=el.querySelector('[data-mode="p"]');if(pl)pl.textContent=ride?'Solo ride':'Solo hi-hat';
  const bp=el.querySelector('.drp-bpm');if(!el.dataset.bpmset){bp.value=r[9];el.querySelector('.drp-bv').textContent=r[9]}}
function player(ids){const all=ids==='todos',list=all?RY.map(r=>r[0]):String(ids).split(',').map(s=>s.trim()).filter(byId);if(!list.length)return '';
  let sel='';
  if(all)sel='<div class="drp-sel">'+[1,2,3].map(lv=>'<div class="drp-lv"><b>Nivel '+lv+'</b>'+RY.filter(r=>r[1]===lv).map(r=>'<button data-r="'+r[0]+'" class="'+(r[6]?'ad':'')+'">'+esc(r[2])+'</button>').join('')+'</div>').join('')+'</div>';
  else if(list.length>1)sel='<div class="drp-sel"><div class="drp-lv">'+list.map(id=>'<button data-r="'+id+'" class="'+(byId(id)[6]?'ad':'')+'">'+esc(byId(id)[2])+'</button>').join('')+'</div></div>';
  return '<div class="drp" data-cur="'+list[0]+'" data-mix="all" data-pl="0">'+sel
   +'<div class="drp-info"></div><div class="drp-gw"><div class="drp-g"></div></div>'
   +'<div class="drp-ctl"><button class="drp-go" aria-pressed="false">▶ Escuchar</button><label>Tempo <input type="range" class="drp-bpm" min="50" max="160" step="5" value="80" aria-label="Tempo en BPM"> <b class="drp-bv">80</b> BPM</label></div>'
   +'<div class="drp-mix" role="group" aria-label="Qué escuchar"><span>Escuchar:</span><button data-mode="all">Todo</button><button data-mode="b">Solo bombo</button><button data-mode="r">Solo redoblante</button><button data-mode="p">Solo hi-hat</button></div>'
   +'<div class="drp-mix" role="group" aria-label="Platillo"><span>Platillo:</span><button data-ride="0">Hi-hat</button><button data-ride="1">Ride</button></div>'
   +'<p class="drp-cap">Rojo = mano derecha · azul = mano izquierda · verde = pie derecho · morado = pie izquierdo. Con «Solo» escuchas una parte; las demás quedan en gris para que las cuentes.</p></div>'}
function mount(root){(root||document).querySelectorAll('.drp').forEach(draw)}
/* ---- Batería digital ---- */
const KIT=[['crash','Crash','C'],['ride','Ride','Y'],['hihat','Hi-hat','H'],['tom1','Tom 1','1'],['tom2','Tom 2','2'],['bombo','Bombo','B · espacio'],['caja','Redoblante','R'],['piso','Tom de piso','3']];
function kit(){const SH='#3a3f4d',HD='#ece8dd',MT='#c9a227',MD='#8a6a0a',ST='#9aa0a6';
  const g=(p,lbl,inner)=>'<g class="drk-pz" data-kp="'+p+'" tabindex="0" role="button" aria-label="'+lbl+'">'+inner+'</g>';
  const svg='<svg class="drk-svg" viewBox="0 0 900 470" role="group" aria-label="Batería digital">'
   +'<g stroke="'+ST+'" stroke-width="3"><line x1="150" y1="120" x2="150" y2="440"/><line x1="750" y1="120" x2="750" y2="440"/><line x1="90" y1="250" x2="90" y2="440"/><line x1="270" y1="350" x2="270" y2="440"/></g>'
   +g('crash','Platillo crash, tecla C','<ellipse cx="150" cy="110" rx="105" ry="30" fill="'+MT+'" stroke="'+MD+'" stroke-width="2"/><text x="150" y="62" text-anchor="middle" class="drk-t">Crash</text>')
   +g('ride','Platillo ride, tecla Y','<ellipse cx="750" cy="110" rx="120" ry="34" fill="'+MT+'" stroke="'+MD+'" stroke-width="2"/><ellipse cx="750" cy="108" rx="18" ry="7" fill="'+MD+'"/><text x="750" y="58" text-anchor="middle" class="drk-t">Ride</text>')
   +g('hihat','Hi-hat, tecla H','<ellipse cx="90" cy="252" rx="70" ry="17" fill="'+MT+'" stroke="'+MD+'" stroke-width="2"/><ellipse cx="90" cy="242" rx="70" ry="17" fill="'+MT+'" stroke="'+MD+'" stroke-width="2"/><text x="90" y="212" text-anchor="middle" class="drk-t">Hi-hat</text>')
   +g('tom1','Tom 1, tecla 1','<rect x="335" y="150" width="104" height="60" rx="8" fill="'+SH+'"/><ellipse cx="387" cy="150" rx="52" ry="18" fill="'+HD+'" stroke="'+SH+'" stroke-width="3"/><text x="387" y="122" text-anchor="middle" class="drk-t">Tom 1</text>')
   +g('tom2','Tom 2, tecla 2','<rect x="455" y="148" width="116" height="66" rx="8" fill="'+SH+'"/><ellipse cx="513" cy="148" rx="58" ry="20" fill="'+HD+'" stroke="'+SH+'" stroke-width="3"/><text x="513" y="118" text-anchor="middle" class="drk-t">Tom 2</text>')
   +g('bombo','Bombo, tecla B o barra espaciadora','<circle cx="450" cy="330" r="118" fill="'+SH+'"/><circle cx="450" cy="330" r="102" fill="'+HD+'"/><text x="450" y="325" text-anchor="middle" style="font:700 30px sans-serif;fill:#a8740a">AMA</text><text x="450" y="355" text-anchor="middle" style="font:600 15px sans-serif;fill:#2b2f3a">Bombo</text>')
   +g('caja','Redoblante, tecla R','<rect x="205" y="300" width="130" height="52" rx="8" fill="'+SH+'"/><ellipse cx="270" cy="300" rx="65" ry="22" fill="'+HD+'" stroke="'+SH+'" stroke-width="3"/><line x1="205" y1="326" x2="335" y2="326" stroke="'+MT+'" stroke-width="3"/><text x="270" y="268" text-anchor="middle" class="drk-t">Redoblante</text>')
   +g('piso','Tom de piso, tecla 3','<rect x="600" y="290" width="150" height="130" rx="10" fill="'+SH+'"/><ellipse cx="675" cy="290" rx="75" ry="24" fill="'+HD+'" stroke="'+SH+'" stroke-width="3"/><text x="675" y="256" text-anchor="middle" class="drk-t">Tom de piso</text>')
   +'</svg>';
  return '<div class="drk">'+svg+'<div class="drk-pads">'+KIT.map(k=>'<button data-kp="'+k[0]+'">'+k[1]+'<small>'+k[2]+'</small></button>').join('')+'</div><p class="drp-cap">Toca cada pieza con el dedo, el mouse o las letras del teclado. El redoblante también se llama caja o tarola.</p></div>'}
function flash(p){document.querySelectorAll('[data-kp="'+p+'"]').forEach(e=>{e.classList.add('hit');setTimeout(()=>e.classList.remove('hit'),120)})}
/* ---- eventos (delegados: sirven para lo que se dibuje después) ---- */
document.addEventListener('pointerdown',e=>{const k=e.target.closest&&e.target.closest('[data-kp]');if(!k)return;e.preventDefault();hit(k.dataset.kp);flash(k.dataset.kp)});
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;const el=t.closest('.drp');if(!el)return;let b;
  if(b=t.closest('.drp-go'))return play(el);
  if(b=t.closest('[data-r]')){if(st.el===el)stop();el.dataset.cur=b.dataset.r;delete el.dataset.bpmset;return draw(el)}
  if(b=t.closest('[data-mode]')){el.dataset.mix=b.dataset.mode;return draw(el)}
  if(b=t.closest('[data-ride]')){el.dataset.pl=b.dataset.ride;return draw(el)}});
document.addEventListener('input',e=>{const t=e.target;if(!t.classList||!t.classList.contains('drp-bpm'))return;const el=t.closest('.drp');el.dataset.bpmset='1';el.querySelector('.drp-bv').textContent=t.value});
const KEYS={b:'bombo',' ':'bombo',r:'caja',h:'hihat','1':'tom1','2':'tom2','3':'piso',y:'ride',c:'crash'};
document.addEventListener('keydown',e=>{const t=e.target;
  if(t&&t.closest&&t.closest('[data-kp]')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();hit(t.closest('[data-kp]').dataset.kp);flash(t.closest('[data-kp]').dataset.kp);return}
  if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;if(t&&(/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName)||t.isContentEditable))return;
  const vis=[...document.querySelectorAll('.drk')].some(k=>k.offsetParent!==null);if(!vis)return;const p=KEYS[e.key.toLowerCase()];if(p){e.preventDefault();hit(p);flash(p)}});
return {player,kit,mount,stop,hit,RY};
})();
