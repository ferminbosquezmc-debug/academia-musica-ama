/* ===== Pistas de acompañamiento (Prioridad 2 de la auditoría) =====
   Una banda virtual (batería, bajo y acordes) sintetizada en el navegador, con las progresiones de cada nivel.
   Cada parte se puede apagar; en batería la pista empieza sin batería («la batería eres tú»). */
const PTST={/* pasos por compás, pasos por pulso, compás, batería, bajo [paso, intervalo, duración], acordes */
 balada:{n:8,b:2,m:'4/4',nm:'Balada',dr:{hihat:[0,1,2,3,4,5,6,7],bombo:[0,5],caja:[2,6]},bj:[[0,0,3],[3,0,1],[4,7,4]],ac:{arp:[0,1,2,1,3,1,2,1]}},
 pop:{n:8,b:2,m:'4/4',nm:'Pop',dr:{hihat:[0,1,2,3,4,5,6,7],bombo:[0,3,4],caja:[2,6]},bj:[[0,0,1],[1,0,1],[2,0,1],[3,0,1],[4,0,1],[5,0,1],[6,7,1],[7,0,1]],ac:{hit:[[0,2],[2,1],[3,1],[5,1],[6,2]]}},
 vals:{n:6,b:2,m:'3/4',nm:'Vals',dr:{bombo:[0],hihat:[2,4]},bj:[[0,0,2],[4,7,2]],ac:{hit:[[2,1],[4,1]]}},
 b68:{n:6,b:3,m:'6/8',nm:'Balada en 6/8',dr:{hihat:[0,1,2,3,4,5],bombo:[0],caja:[3]},bj:[[0,0,3],[3,7,3]],ac:{arp:[0,1,2,3,2,1]}},
 shuffle:{n:12,b:3,m:'4/4 con tresillos',nm:'Shuffle',dr:{hihat:[0,2,3,5,6,8,9,11],caja:[3,9],bombo:[0,6]},bj:[[0,0,2],[2,0,1],[3,4,2],[5,4,1],[6,7,2],[8,7,1],[9,9,2],[11,9,1]],ac:{hit:[[2,1],[5,1],[8,1],[11,1]]}},
 cumbia:{n:8,b:2,m:'4/4',nm:'Cumbia',dr:{hhopen:[1,3,5,7],rim:[2,6],bombo:[0,4]},bj:[[0,0,2],[3,7,1],[4,7,2],[7,0,1]],ac:{hit:[[1,1],[3,1],[5,1],[7,1]]}}};
/* [id, carreras (g guitarra · p piano · b batería), nivel, título, clase, estilo, tempo, acordes por compás, consejo] */
const PTR=[
 ['g1a','g',1,'La menor y Re','Clase 11','pop',70,['Am','Am','D','D'],'Cambia de acorde justo en el «1» de cada compás. Si te cuesta, baja el tempo.'],
 ['g1b','g',1,'Mis primeras canciones','Clase 12','balada',72,['D','A','Am','D'],'Rasguea una vez por pulso y mira el acorde que viene.'],
 ['g1c','g',1,'Vals en La menor','Clase 10','vals',90,['Am','Am','E7','E7','Am','Am','E7','Am'],'Bajo en el 1 y dos rasgueos suaves en el 2 y el 3.'],
 ['p1a','p',1,'Do, Fa y Sol','Clase 11','balada',70,['C','F','G','C'],'Mano izquierda: el acorde entero en el 1. Mano derecha: la melodía o el mismo acorde.'],
 ['p1b','p',1,'Mis primeras canciones','Clase 12','vals',84,['C','C','G','G','G','G','C','C'],'Bajo en el 1 y el acorde en el 2 y el 3: «pum, pa, pa».'],
 ['x2a','gp',2,'I, IV y V en Sol','Grados y progresiones','pop',90,['G','C','D','G'],'Di en voz alta el grado de cada acorde: I, IV, V, I.'],
 ['x2b','gp',2,'La progresión de las alabanzas','Acompañar una canción','pop',92,['Am','F','C','G'],'Es la progresión vi–IV–I–V de muchísimas canciones. Pruébala con tu rasgueo favorito.'],
 ['g2c','g',2,'Arpegios en 6/8','Arpegios','b68',60,['Em','C','G','D'],'Un arpegio por compás: bajo, cuerda 3, cuerda 2, cuerda 1, cuerda 2, cuerda 3.'],
 ['p2a','p',2,'Acordes principales en Do','Clase 22','pop',84,['C','F','G','C','F','C','G','C'],'Usa inversiones para mover poco la mano: Do, Fa en 2.ª inversión, Sol en 1.ª.'],
 ['p2b','p',2,'Arpegios en La menor','Clase 18','b68',60,['Am','Dm','E','Am'],'Arpegio con la mano derecha y la fundamental con la izquierda.'],
 ['g3a','g',3,'Blues en La','Blues de 12 compases','shuffle',90,['A7','A7','A7','A7','D7','D7','A7','A7','E7','D7','A7','E7'],'Primero la forma con acordes; después improvisa con la pentatónica de La.'],
 ['g3b','g',3,'Improvisa en La menor','Solos e improvisación','pop',84,['Am','G','F','G'],'Toda la pentatónica de La menor suena bien encima. Empieza con pocas notas.'],
 ['p3a','p',3,'Acordes de séptima','Clase 28','balada',72,['Cmaj7','Am7','Dm7','G7'],'Busca la nota que cambia menos de un acorde al siguiente.'],
 ['p3b','p',3,'Mayor y menor','Clase 25','pop',88,['C','Am','F','G'],'Escucha cómo el La menor oscurece el color antes de volver a la luz.'],
 ['p3c','p',3,'Cambio de tonalidad','Clase 31','balada',76,['C','F','G','C','D','G','A','D'],'A la mitad la canción sube un tono: de Do a Re.'],
 ['p3d','p',3,'Improvisa con la pentatónica','Clase 32','shuffle',84,['C7','C7','F7','C7','G7','F7','C7','G7'],'Mano izquierda en los acordes; derecha con la pentatónica de Do.'],
 ['b1a','b',1,'Ritmo básico #1 con la banda','Clase 5','pop',70,['C','G','Am','F'],'Toca el ritmo básico #1: hi-hat en negras, redoblante en 2 y 4, bombo en 1 y 3.'],
 ['b1b','b',1,'Vals con la banda','Clase 6','vals',100,['G','G','D','D','D','D','G','G'],'Bombo en el 1 y hi-hat en el 2 y el 3.'],
 ['b1c','b',1,'Rock con la banda','Clase 8','pop',80,['A','D','E','D'],'Ritmo básico #2: hi-hat en corcheas. Marca el cambio de compás con el crash.'],
 ['b1d','b',1,'Balada lenta','Clase 10','balada',65,['C','Am','F','G'],'Toca suave y deja respirar el bombo.'],
 ['b2a','b',2,'Balada en 6/8 con la banda','Clase 15','b68',60,['G','Em','C','D'],'Hi-hat en las 6 corcheas, bombo en el 1 y redoblante en el 4.'],
 ['b2b','b',2,'Shuffle con la banda','Clase 21','shuffle',90,['A7','A7','A7','A7','D7','D7','A7','A7','E7','D7','A7','E7'],'Siente el tresillo: «larga-corta». Un relleno en el compás 12.'],
 ['b3a','b',3,'Cumbia con la banda','Clase 26','cumbia',95,['C','G','G','C'],'Hi-hat abierto a contratiempo y aro en el 2 y el 4.'],
 ['b3b','b',3,'Funk con la banda','Clase 30','pop',100,['Em7','A7','Em7','A7'],'Hi-hat en semicorcheas y notas fantasma en el redoblante.']];
const PTCR={g:'guitarra',p:'piano',b:'bateria'};
const PTQ={'':[0,4,7],m:[0,3,7],'7':[0,4,7,10],m7:[0,3,7,10],maj7:[0,4,7,11]};
const PTPC={C:0,D:2,E:4,F:5,G:7,A:9,B:11},PTES={C:'Do',D:'Re',E:'Mi',F:'Fa',G:'Sol',A:'La',B:'Si'};
function ptCh(s){const m=/^([A-G])([#b]?)(maj7|m7|m|7)?$/.exec(s)||['','C','',''],pc=(PTPC[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)+12)%12;
 return{pc:pc,q:PTQ[m[3]||''],es:PTES[m[1]]+(m[2]==='#'?'♯':m[2]==='b'?'♭':'')+(m[3]==='m'?' m':m[3]==='m7'?' m7':m[3]==='maj7'?' maj7':m[3]==='7'?' 7':''),us:s}}
let PTsel=null,PTcar=null,PTlv=null,PTbpm=null,PTon=null,PTpart={dr:true,bj:true,ac:true,ck:false},PTout=null;
const ptTr=id=>PTR.find(r=>r[0]===id);
function ptOut(){const c=AC();if(!PTout){PTout=c.createGain();PTout.gain.value=.75;const k=c.createDynamicsCompressor();PTout.connect(k).connect(c.destination);
 const L=c.sampleRate,b=c.createBuffer(1,L,L),d=b.getChannelData(0);for(let i=0;i<L;i++)d[i]=Math.random()*2-1;PTout.nz=b}return PTout}
/* ---- Sonidos ---- */
function ptEnv(t,p,dec){const c=AC(),g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(p,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+dec);g.connect(ptOut());return g}
function ptNz(t,dec,p,type,f){const c=AC(),s=c.createBufferSource(),b=c.createBiquadFilter();s.buffer=ptOut().nz;b.type=type;b.frequency.value=f;s.connect(b).connect(ptEnv(t,p,dec));s.start(t);s.stop(t+dec+.05)}
function ptTn(t,f0,f1,dec,p,type){const c=AC(),o=c.createOscillator();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dec*.6);o.connect(ptEnv(t,p,dec));o.start(t);o.stop(t+dec+.05)}
const PTD={bombo:t=>{ptTn(t,150,48,.4,.9);ptNz(t,.02,.2,'lowpass',2500)},caja:t=>{ptTn(t,190,160,.1,.35,'triangle');ptNz(t,.18,.45,'highpass',1300)},
 rim:t=>{ptTn(t,1700,1500,.05,.25,'triangle');ptNz(t,.04,.2,'bandpass',2200)},hihat:t=>ptNz(t,.05,.16,'highpass',8000),hhopen:t=>ptNz(t,.3,.14,'highpass',7000),
 click:(t,a)=>ptTn(t,a?1600:1100,a?1600:1100,.05,.3,'square')};
function ptBass(t,m,dur){const c=AC(),o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o.frequency.value=440*Math.pow(2,(m-69)/12);f.type='lowpass';f.frequency.value=520;
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.42,t+.01);g.gain.exponentialRampToValueAtTime(.18,t+.12);g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.15,dur));o.connect(f).connect(g).connect(ptOut());o.start(t);o.stop(t+dur+.05)}
function ptKey(t,m,dur,v){const c=AC(),o=c.createOscillator(),g=c.createGain();o.type='triangle';o.frequency.value=440*Math.pow(2,(m-69)/12);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(v*.5,t+.2);g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.2,dur));o.connect(g).connect(ptOut());o.start(t);o.stop(t+dur+.05)}
const ptVoz=ch=>{let r=52+((ch.pc-4+12)%12);return ch.q.map(i=>r+i).concat([r+12])};/* acorde entre Mi3 y Re♯4 */
const ptRoot=ch=>33+((ch.pc-9+12)%12);/* bajo entre La1 y Sol♯2 */
/* ---- Reproductor ---- */
function ptStop(){if(PTon){clearInterval(PTon.timer);PTon.tm.forEach(clearTimeout);PTon=null}document.querySelectorAll('.pt-bar.on').forEach(b=>b.classList.remove('on'));const b=document.getElementById('pt-go');if(b)b.textContent='▶ Tocar con la banda'}
function ptPlay(){if(PTon){ptStop();return}const r=ptTr(PTsel);if(!r)return;const c=AC();if(c.state==='suspended')c.resume();
 PTon={r:r,st:PTST[r[5]],step:-PTST[r[5]].n,next:c.currentTime+.1,timer:0,tm:[]};PTon.timer=setInterval(ptSched,25);ptSched();
 const b=document.getElementById('pt-go');if(b)b.textContent='⏹ Detener'}
function ptSched(){const P=PTon;if(!P)return;if(!visS('v-pistas')){ptStop();return}const c=AC(),T=P.st,sd=60/PTbpm/T.b,ch=P.r[7].map(ptCh);
 while(P.next<c.currentTime+.12){const t=P.next,s=P.step;
  if(s<0){const k=s+T.n;if(k%T.b===0)PTD.click(t,k===0)}
  else{const bar=Math.floor(s/T.n)%ch.length,k=s%T.n,C=ch[bar];
   if(k===0){const d=Math.max(0,(t-c.currentTime)*1000);P.tm.push(setTimeout(()=>{document.querySelectorAll('.pt-bar').forEach((e,i)=>e.classList.toggle('on',i===bar));const lb=document.getElementById('pt-now');if(lb)lb.textContent=C.es},d))}
   if(PTpart.ck&&k%T.b===0)PTD.click(t,k===0);
   if(PTpart.dr)Object.keys(T.dr).forEach(p=>{if(T.dr[p].indexOf(k)>=0)PTD[p](t)});
   if(PTpart.bj)T.bj.forEach(x=>{if(x[0]===k)ptBass(t,ptRoot(C)+x[1],x[2]*sd*.9)});
   if(PTpart.ac){const V=ptVoz(C);if(T.ac.arp){const i=T.ac.arp[k];if(i!==undefined)ptKey(t,V[Math.min(i,V.length-1)],sd*2.2,.13)}
    else T.ac.hit.forEach(x=>{if(x[0]===k)V.slice(0,-1).forEach((m,j)=>ptKey(t+j*.012,m,x[1]*sd*.95,.09))})}}
  P.step++;P.next+=sd}
 if(P.tm.length>40)P.tm=P.tm.slice(-20)}
/* ---- Vista ---- */
function ptView(){const v=document.getElementById('v-pistas');if(!v)return;ptStop();
 if(!PTcar){const c=cmCar()||'guitarra';PTcar=c==='piano'?'p':c==='bateria'?'b':'g';PTlv=Math.min(3,(S.lvl||0)+1)}
 const L=PTR.filter(r=>r[1].indexOf(PTcar)>=0&&r[2]===PTlv);if(!ptTr(PTsel)||L.indexOf(ptTr(PTsel))<0){PTsel=L.length?L[0][0]:null;PTbpm=null}
 const r=ptTr(PTsel);if(r&&!PTbpm){PTbpm=r[6];PTpart.dr=PTcar!=='b'}
 let h='<style>.pt-bar.on{background:var(--gold);color:#0a0908}.pt-bar.on .mute{color:#3a2a10}</style><button class="link" data-go="practica" style="font-size:16px;min-height:44px">⬅ Volver a Práctica</button><h2>Pistas de acompañamiento</h2><p class="mute">Toca con una banda virtual: batería, bajo y acordes, con las progresiones de tu nivel.</p>'
  +'<div class="chips" role="group" aria-label="Carrera" style="margin-top:8px">'+[['g','🎸 Guitarra'],['p','🎹 Piano'],['b','🥁 Batería']].map(x=>'<button class="chip" data-pc="'+x[0]+'" aria-pressed="'+(PTcar===x[0])+'">'+x[1]+'</button>').join('')+'</div>'
  +'<div class="chips" role="group" aria-label="Nivel" style="margin-top:6px">'+[1,2,3].map(n=>'<button class="chip" data-pn="'+n+'" aria-pressed="'+(PTlv===n)+'">Nivel '+n+'</button>').join('')+'</div>';
 if(r){const T=PTST[r[5]],ch=r[7].map(ptCh);
  h+='<div class="card" style="border-color:var(--gold)"><h3>'+esc(r[3])+'</h3><p class="mute" style="font-size:14px">'+esc(T.nm)+' · '+esc(T.m)+' · '+esc(r[4])+'</p>'
   +'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:12px">'+ch.map((x,i)=>'<div class="pt-bar" style="border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 4px;text-align:center"><span class="mute" style="font-size:11px;display:block">'+(i+1)+'</span><b style="font-size:17px">'+esc(x.es)+'</b><span class="mute" style="font-size:12px;display:block">'+esc(x.us)+'</span></div>').join('')+'</div>'
   +'<p style="text-align:center;margin-top:10px;font-size:15px">Ahora: <b id="pt-now">—</b></p>'
   +'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn" id="pt-go">▶ Tocar con la banda</button></div>'
   +'<label class="fl" style="margin-top:12px">Tempo: <b id="pt-bv">'+PTbpm+'</b> BPM<input type="range" id="pt-bpm" min="'+Math.max(40,r[6]-30)+'" max="'+(r[6]+30)+'" value="'+PTbpm+'" style="width:100%"></label>'
   +'<div class="chips" role="group" aria-label="Partes" style="margin-top:8px">'+[['dr','🥁 Batería'],['bj','🎸 Bajo'],['ac','🎹 Acordes'],['ck','🔔 Click']].map(x=>'<button class="chip" data-pp="'+x[0]+'" aria-pressed="'+!!PTpart[x[0]]+'">'+x[1]+'</button>').join('')+'</div>'
   +'<p class="m4key" style="margin-top:12px">'+esc(r[8])+(PTcar==='b'?' La batería de la pista empieza apagada: la batería eres tú.':'')+'</p>'
   +'<p class="mute" style="font-size:13px;margin-top:8px">Antes de empezar suena un compás de click para contar la entrada. La pista se repite hasta que la detengas.</p></div>'}
 h+='<div class="card"><h3>Pistas del Nivel '+PTlv+'</h3>'+(L.length?L.map(x=>'<button class="m4row" data-ps="'+x[0]+'" style="display:flex;width:100%;text-align:left;gap:8px;align-items:center;cursor:pointer'+(x[0]===PTsel?';border-color:var(--gold)':'')+'"><span class="grow"><b>'+esc(x[3])+'</b><span class="mute" style="font-size:13px;display:block">'+esc(PTST[x[5]].nm)+' · '+x[6]+' BPM · '+esc(x[4])+'</span></span><span aria-hidden="true">'+(x[0]===PTsel?'▶':'›')+'</span></button>').join(''):'<p class="mute">Todavía no hay pistas para este nivel.</p>')+'</div>';
 v.innerHTML='<div data-nn>'+h+'</div>'}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-pistas'))return;let b;
 if(b=t.closest('[data-pc]')){PTcar=b.dataset.pc;PTsel=null;return ptView()}
 if(b=t.closest('[data-pn]')){PTlv=+b.dataset.pn;PTsel=null;return ptView()}
 if(b=t.closest('[data-ps]')){if(b.dataset.ps!==PTsel){PTsel=b.dataset.ps;PTbpm=null;ptView()}return}
 if(b=t.closest('[data-pp]')){const k=b.dataset.pp;PTpart[k]=!PTpart[k];b.setAttribute('aria-pressed',String(PTpart[k]));return}
 if(t.closest('#pt-go'))return ptPlay()});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='pt-bpm'){PTbpm=+e.target.value;const b=document.getElementById('pt-bv');if(b)b.textContent=PTbpm}});
