/* ===== Análisis de la ejecución a partir de una grabación (Prioridad 3 de la auditoría) =====
   claude.ai no da micrófono a la página: el estudiante graba con su teléfono y elige el archivo.
   Se decodifica en el navegador (nada sale del teléfono hasta que decida entregarlo), se detectan las notas
   (inicio de cada sonido + altura), se alinean con la partitura y se mide notas, pulso y afinación.
   También: enlace al afinador con micrófono de la página pública. */
const ANURL='https://ferminbosquezmc-debug.github.io/academia-musica-ama/afinador.html';
let ANres={},ANfile=null,ANbusy=false;
/* --- Afinador: enlace a la versión con micrófono --- */
const _lbAfinar=lbAfinar;
lbAfinar=function(){return _lbAfinar().replace('<p id="lb-mmsg"','<p style="text-align:center;margin-top:10px;font-size:15px"><a href="'+ANURL+'?i='+LBins+'" target="_blank" rel="noopener" style="color:var(--gold)">🎙️ Abrir el afinador con micrófono ↗</a></p><p id="lb-mmsg"')};
/* --- Detección de notas --- */
function anFrames(x,sr){/* YIN simplificado sobre la señal a ~12 kHz */
 const N=1024,H=256,minL=Math.floor(sr/1100),maxL=Math.floor(sr/65),W=N-maxL,F=[];
 for(let s=0;s+N<x.length;s+=H){let e=0;for(let i=0;i<N;i++)e+=x[s+i]*x[s+i];e=Math.sqrt(e/N);
  const d=new Float32Array(maxL+2);for(let t=1;t<=maxL+1;t++){let a=0;for(let j=0;j<W;j++){const v=x[s+j]-x[s+j+t];a+=v*v}d[t]=a}
  let run=0,tau=-1;const cm=new Float32Array(maxL+2);cm[0]=1;for(let t=1;t<=maxL+1;t++){run+=d[t];cm[t]=run?d[t]*t/run:1}
  for(let t=minL;t<=maxL;t++){if(cm[t]<.15){while(t+1<=maxL&&cm[t+1]<cm[t])t++;tau=t;break}}
  let m=null;if(tau>0){const a=cm[tau-1],b=cm[tau],c=cm[tau+1],dn=a+c-2*b,tt=dn?tau+(a-c)/(2*dn):tau;m=69+12*Math.log2(sr/tt/440)}
  F.push({t:(s+N/2)/sr,e:e,m:m})}return F}
function anNotes(F,perc){if(!F.length)return [];const mx=Math.max(...F.map(f=>f.e))||1,thr=mx*.06,O=[];
 const fl=F.map((f,i)=>Math.max(0,f.e-(i?F[i-1].e:0)));
 for(let i=2;i<F.length-2;i++){const loc=fl.slice(Math.max(0,i-8),i+9),avg=loc.reduce((a,b)=>a+b,0)/loc.length;
  if(fl[i]>=Math.max(...fl.slice(i-2,i+3))&&fl[i]>mx*.05&&fl[i]>1.6*avg&&F[i].e>thr&&(!O.length||F[i].t-F[O[O.length-1]].t>.09))O.push(i)}
 /* cambios de altura sin golpe nuevo (legato) */
 if(!perc){const add=[];let prev=null;F.forEach((f,i)=>{const r=f.m!==null&&f.e>thr?Math.round(f.m):null;if(r!==null&&prev!==null&&r!==prev){const near=O.some(o=>Math.abs(F[o].t-f.t)<.08);if(!near&&F.slice(i,i+4).every(g=>g.m!==null&&Math.round(g.m)===r))add.push(i)}if(r!==null)prev=r});
  add.forEach(i=>{if(!O.some(o=>Math.abs(F[o].t-F[i].t)<.09))O.push(i)});O.sort((a,b)=>a-b)}
 return O.map((o,k)=>{const end=k+1<O.length?O[k+1]:F.length,seg=F.slice(o+2,Math.max(o+3,o+2+Math.floor((end-o)*.6))).filter(f=>f.m!==null&&f.e>thr*.5).map(f=>f.m).sort((a,b)=>a-b);
  return{t:F[o].t,m:seg.length?seg[seg.length>>1]:null}})}
/* --- Alineación con la partitura (Needleman–Wunsch) --- */
function anAlign(E,D,perc){const n=E.length,m=D.length,S=[],B=[],sc=(e,d)=>perc?2:d.m===null?-1:Math.round(d.m)===e.mid?2:((Math.round(d.m)-e.mid)%12+12)%12===0?1:-1;
 for(let i=0;i<=n;i++){S.push(new Float32Array(m+1));B.push(new Uint8Array(m+1))}
 for(let i=1;i<=n;i++){S[i][0]=-i;B[i][0]=1}for(let j=1;j<=m;j++){S[0][j]=-j*.5;B[0][j]=2}
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){const a=S[i-1][j-1]+sc(E[i-1],D[j-1]),b=S[i-1][j]-1,c=S[i][j-1]-.5;if(a>=b&&a>=c){S[i][j]=a;B[i][j]=0}else if(b>=c){S[i][j]=b;B[i][j]=1}else{S[i][j]=c;B[i][j]=2}}
 const P=[];let i=n,j=m;while(i>0||j>0){const k=B[i][j];if(i>0&&j>0&&k===0){P.push([i-1,j-1]);i--;j--}else if(i>0&&(j===0||k===1)){P.push([i-1,-1]);i--}else{P.push([-1,j-1]);j--}}
 return P.reverse()}
/* Ritmos: todos los golpes «suenan igual», así que se emparejan por tiempo (ajuste lineal y vecino más cercano, dos pasadas) */
function anAlignT(E,D,bpm){if(E.length<2||D.length<2)return E.map((_,i)=>[i,-1]);let a=0,b=60/(bpm||80),best=-1,M=[];
 /* arranque: tempo de la partitura (o el de los extremos) y el desfase que más golpes explica */
 [60/(bpm||80),(D[D.length-1].t-D[0].t)/((E[E.length-1].beat-E[0].beat)||1)].forEach(bb=>{for(let j=0;j<Math.min(4,D.length);j++)for(let k=0;k<Math.min(4,E.length);k++){const aa=D[j].t-E[k].beat*bb;
  const n=E.filter(e=>D.some(d=>Math.abs(d.t-(aa+bb*e.beat))<.2*bb)).length;if(n>best){best=n;a=aa;b=bb}}});
 for(let it=0;it<3;it++){const used={};M=E.map((e,i)=>{const tp=a+b*e.beat;let bj=-1,bd=.45*b;D.forEach((d,j)=>{const dd=Math.abs(d.t-tp);if(!used[j]&&dd<bd){bd=dd;bj=j}});if(bj>=0)used[bj]=1;return[i,bj]});
  const f=anFit(M.filter(x=>x[1]>=0).map(([i,j])=>[E[i].beat,D[j].t]));if(f&&f.b>0){a=f.a;b=f.b}}
 const P=M.slice(),usedD={};M.forEach(([i,j])=>{if(j>=0)usedD[j]=1});D.forEach((_,j)=>{if(!usedD[j])P.push([-1,j])});return P}
function anFit(pts){const n=pts.length;if(n<3)return null;let sx=0,sy=0,sxx=0,sxy=0;pts.forEach(([x,y])=>{sx+=x;sy+=y;sxx+=x*x;sxy+=x*y});const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;return{a:a,b:b}}
async function anRun(file){const P=scPc(SCsel);if(!P||ANbusy)return;ANbusy=true;const msg=t=>{const e=document.getElementById('an-msg');if(e)e.textContent=t};
 try{msg('Leyendo la grabación…');const c=AC();const buf=await c.decodeAudioData(await file.arrayBuffer());
  if(buf.duration>120)throw{code:'largo'};
  const ch=buf.getChannelData(0),ch2=buf.numberOfChannels>1?buf.getChannelData(1):null,D=Math.max(1,Math.round(buf.sampleRate/12000)),sr=buf.sampleRate/D,L=Math.floor(ch.length/D),x=new Float32Array(L);
  for(let i=0;i<L;i++){let a=0;for(let k=0;k<D;k++){const j=i*D+k;a+=ch[j]+(ch2?ch2[j]:0)}x[i]=a/D/(ch2?2:1)}
  msg('Escuchando las notas…');await new Promise(r=>setTimeout(r,30));
  const perc=P.v[0].n.indexOf('X')>=0,F=anFrames(x,sr),det=anNotes(F,perc);
  const Z=scEvents(Object.assign({},P,{v:[P.v[0]]}));const E=Z.E.filter(e=>!e.rest).map(e=>({id:e.id,beat:e.t,mid:e.n.x?0:(P.gtr?e.n.midi-12:e.n.midi)}));
  if(det.length<3)throw{code:'vacio'};
  const A=perc?anAlignT(E,det,SCbpm||P.bpm):anAlign(E,det,perc),st={};let ok=0,oct=0,bad=0,miss=0,extra=0;const tim=[],cents=[];
  A.forEach(([ei,dj])=>{if(ei<0){extra++;return}const e=E[ei];if(dj<0){miss++;st[e.id]='miss';return}const d=det[dj];
   const r=perc?'ok':d.m===null?'bad':Math.round(d.m)===e.mid?'ok':((Math.round(d.m)-e.mid)%12+12)%12===0?'oct':'bad';
   if(r==='ok')ok++;else if(r==='oct')oct++;else bad++;st[e.id]=r==='bad'?'bad':'ok';tim.push([e.beat,d.t]);if(!perc&&r!=='bad'&&d.m!==null)cents.push((d.m-Math.round(d.m))*100)});
  const fit=anFit(tim);let tempo=null,avg=null,pct=null,tend='';
  if(fit&&fit.b>0){tempo=Math.round(60/fit.b);const res=tim.map(([b,t])=>(t-(fit.a+fit.b*b))*1000);avg=Math.round(res.reduce((a,v)=>a+Math.abs(v),0)/res.length);pct=Math.round(100*res.filter(v=>Math.abs(v)<=70).length/res.length);
   const h=Math.floor(tim.length/2),f1=anFit(tim.slice(0,h)),f2=anFit(tim.slice(h));if(f1&&f2&&f1.b>0&&f2.b>0){const r=f1.b/f2.b;tend=r>1.08?'acelera':r<.92?'frena':''}}
  const tot=E.length,np=Math.round(100*(ok+oct)/tot),nN=np>=95?4:np>=80?3:np>=60?2:1,pN=pct===null?0:pct>=85&&avg<=45?4:pct>=70?3:pct>=45?2:1;
  const afin=cents.length?Math.round(cents.reduce((a,v)=>a+Math.abs(v),0)/cents.length):null;
  ANres[P.id]={st:st,ok:ok,oct:oct,bad:bad,miss:miss,extra:extra,tot:tot,np:np,nN:nN,tempo:tempo,avg:avg,pct:pct,pN:pN,tend:tend,afin:afin,perc:perc,fecha:new Date().toISOString()};
  S.anal=(S.anal||[]).concat([{id:P.id,t:P.t,np:np,pct:pct,tempo:tempo,fecha:ANres[P.id].fecha}]).slice(-10);save();msg('')}
 catch(e){const c=e&&e.code;msg(c==='largo'?'La grabación dura más de 2 minutos. Graba solo la pieza.':c==='vacio'?'No se escucharon notas claras. Graba más cerca del instrumento y en un lugar sin ruido.':'No se pudo leer el archivo. Prueba con otro formato (M4A, MP3, MP4 o WAV).')}
 ANbusy=false;anCardPaint();anPaint()}
/* --- Vista: tarjeta en la partitura y colores sobre las notas --- */
function anPaint(){const P=scPc(SCsel),R=P&&ANres[P.id];if(!R)return;const col={ok:'#2E9E4F',bad:'#E5312B',miss:'#b9b0a0'};
 Object.keys(R.st).forEach(id=>{const g=document.querySelector('#v-score [data-sn="'+id+'"] .sch');if(!g)return;const c=col[R.st[id]];if(g.tagName==='path')g.setAttribute('stroke',c);else{g.setAttribute('fill',R.st[id]==='miss'?'#fffaf0':c);g.setAttribute('stroke',c);if(R.st[id]==='miss')g.setAttribute('stroke-dasharray','2 2')}})}
function anCardPaint(){const el=document.getElementById('an-card');if(!el)return;const P=scPc(SCsel),R=P&&ANres[P.id];
 let h='<h3>🎙️ Analiza tu ejecución</h3><p class="mute" style="font-size:14px;margin:4px 0 10px">Graba con tu teléfono mientras tocas '+(R&&R.perc?'el ritmo':'esta partitura')+' y elige el archivo. La plataforma marca qué notas salieron bien y cómo estuvo tu pulso. La grabación no sale de tu teléfono a menos que la entregues.</p>'
  +'<label class="btn m4mini" style="display:inline-flex;align-items:center;cursor:pointer">📂 Elegir la grabación<input type="file" id="an-file" accept="audio/*,video/*,.m4a,.mp3,.wav,.mp4,.mov,.ogg,.webm" style="position:absolute;opacity:0;width:1px;height:1px"></label>'
  +'<p id="an-msg" class="mute" aria-live="polite" style="font-size:14px;margin-top:8px">'+(ANbusy?'Analizando…':'')+'</p>';
 if(R){const lv=n=>'<span class="m4st '+(n>=3?'ok':'wait')+'">'+RBN[n]+'</span>';
  h+='<div class="m4row" style="display:block;margin-top:10px"><div class="row" style="flex-wrap:wrap;gap:8px"><b class="grow">'+(R.perc?'Golpes':'Notas')+' correctas: '+R.np+'%</b>'+lv(R.nN)+'</div>'
   +'<div class="atchips"><span>✅ Bien: <b>'+(R.ok+R.oct)+'</b></span>'+(R.perc?'':'<span>❌ Otra nota: <b>'+R.bad+'</b></span>')+'<span>⬜ Faltaron: <b>'+R.miss+'</b></span><span>➕ De más: <b>'+R.extra+'</b></span></div>'
   +(R.oct?'<p class="mute" style="font-size:13px;margin-top:4px">'+R.oct+' nota'+(R.oct>1?'s':'')+' a otra octava: cuentan como bien.</p>':'')+'</div>'
   +(R.pct!==null?'<div class="m4row" style="display:block"><div class="row" style="flex-wrap:wrap;gap:8px"><b class="grow">Pulso: '+R.pct+'% a tiempo</b>'+lv(R.pN)+'</div><div class="atchips"><span>Tempo: <b>'+R.tempo+' BPM</b></span><span>Desvío promedio: <b>'+R.avg+' ms</b></span>'+(R.tend?'<span>Tendencia: <b>'+(R.tend==='acelera'?'aceleras al final':'frenas al final')+'</b></span>':'')+'</div></div>':'')
   +(R.afin!==null&&scPc(SCsel).gtr?'<div class="m4row" style="display:block"><b>Afinación: ±'+R.afin+' cents en promedio</b><p class="mute" style="font-size:13px;margin-top:2px">'+(R.afin<=15?'Tu guitarra está bien afinada.':'Revisa la afinación con el afinador antes de tocar.')+'</p></div>':'')
   +'<p style="font-size:14px;margin-top:8px">En la partitura: <b style="color:#2E9E4F">verde</b> bien, <b style="color:#E5312B">rojo</b> otra nota, gris punteado: faltó. '+(R.nN<3?'Toca más lento las partes en rojo.':R.pN&&R.pN<3?'Las notas están; ahora trabaja el pulso con el metrónomo.':'¡Muy bien! Sube un poco el tempo.')+'</p>'
   +'<p class="mute" style="font-size:12px;margin-top:6px">Es una ayuda automática y puede equivocarse con ruido o eco; tu docente tiene la última palabra.</p>'
   +(PFA&&DBS&&UIDS&&ANfile?'<button class="btn ghost m4mini" id="an-port" style="margin-top:10px">📤 Entregar esta grabación en mi portafolio</button>':'')}
 el.innerHTML=h}
const _scView=scView;scView=function(){_scView();const svg=document.getElementById('sc-svg');if(!svg)return;const card=svg.closest('.card');if(!card)return;const d=document.createElement('div');d.className='card';d.id='an-card';card.after(d);anCardPaint();anPaint()};
const _scDraw=scDraw;scDraw=function(){_scDraw();anPaint()};
async function anPort(){const P=scPc(SCsel),R=P&&ANres[P.id];if(!ANfile||!R||!PFA||!DBS||!UIDS)return;const b=document.getElementById('an-port');if(b)b.disabled=true;const msg=t=>{const e=document.getElementById('an-msg');if(e)e.textContent=t};
 try{msg('Preparando el archivo…');const p=await pfPrep(ANfile);if(p.b.size>20*1024*1024){msg('El archivo pesa más de 20 MB: súbelo a YouTube o Drive y entrégalo con un enlace desde tu portafolio.');if(b)b.disabled=false;return}
  msg('Subiendo…');const r=await PFA.upload(p.b,{type:p.type});const car=cmCar()||'guitarra',it={id:'p'+Date.now().toString(36),car:car,mes:Math.min(9,(S.lvl||0)*3+1),tit:P.t,tipo:p.k,asset:r.id,ct:r.contentType,size:r.sizeBytes,
   nota:'Análisis automático: '+(R.perc?'golpes':'notas')+' '+R.np+'%'+(R.pct!==null?', pulso '+R.pct+'% a tiempo a '+R.tempo+' BPM':''),fecha:new Date().toISOString()};
  const ref=DBS.doc('port/'+UIDS),d=await ref.get(),items=((d.exists&&d.data().items)||[]).concat([it]);await ref.set({items:items});PFme={items:items};msg('');toast('¡Entregado en tu portafolio!')}
 catch(e){msg('No se pudo entregar. Inténtalo desde tu portafolio.');if(b)b.disabled=false}}
document.addEventListener('change',e=>{if(e.target&&e.target.id==='an-file'){const f=e.target.files&&e.target.files[0];if(f){ANfile=f;anRun(f)}}});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#an-port'))anPort()});
