/* ===== Mi instrumento virtual (guitarra, bajo, piano y batería) para practicar sin el instrumento en casa =====
   Guitarra y bajo: diapasón de 12 trastes; al tocar suena la cuerda (síntesis Karplus-Strong) y aparece la nota con su color.
   Guitarra: acordes abiertos con rasgueo. Bajo: 4 o 5 cuerdas. Piano: dos octavas (DO3–DO5), acordes y teclado de la computadora.
   Batería: la batería digital de la plataforma. Se abre desde Práctica y desde el paso «Practicar» de cada clase. */
const VIC={guitarra:'🎸',bajo:(typeof EMO!=='undefined'&&EMO.bajo)||'🎸',piano:'🎹',bateria:'🥁'};
let VIsel=null,VIall=false,VIb5=false,VIch=null;
const viCar=()=>{const c=myCarr();return c&&VIC[c]?c:null};
/* Nombres: mayor con M mayúscula (CM), menor con m minúscula (Cm), séptima de dominante con 7 (C7) */
const VIG=[['CM',[-1,3,2,0,1,0]],['DM',[-1,-1,0,2,3,2]],['EM',[0,2,2,1,0,0]],['FM',[1,3,3,2,1,1]],['GM',[3,2,0,0,0,3]],['AM',[-1,0,2,2,2,0]],['Am',[-1,0,2,2,1,0]],['Dm',[-1,-1,0,2,3,1]],['Em',[0,2,2,0,0,0]],['Bm',[-1,2,4,4,3,2]],['C7',[-1,3,2,3,1,0]],['D7',[-1,-1,0,2,1,2]],['E7',[0,2,0,1,0,0]],['G7',[3,2,0,0,0,1]],['A7',[-1,0,2,0,2,0]],['B7',[-1,2,1,2,0,2]]]; /* cuerdas 6→1 */
const VIP=[['CM',0,'M'],['Dm',2,'m'],['Em',4,'m'],['FM',5,'M'],['GM',7,'M'],['Am',9,'m'],['DM',2,'M'],['EM',4,'M'],['AM',9,'M'],['G7',7,'7'],['C7',0,'7'],['D7',2,'7']];
/* ---- Sonido ---- */
const VIBUF={};
function viKS(m,dur,bright){const k=m+'|'+bright;if(VIBUF[k])return VIBUF[k];const c=AC(),sr=c.sampleRate,f=440*Math.pow(2,(m-69)/12),N=Math.max(2,Math.round(sr/f)),len=Math.floor(sr*dur),b=c.createBuffer(1,len,sr),d=b.getChannelData(0),w=new Float32Array(N);
 for(let i=0;i<N;i++)w[i]=Math.random()*2-1;let p=0;const damp=bright?.996:.992;for(let i=0;i<len;i++){const n=(p+1)%N,v=w[p];d[i]=v;w[p]=damp*.5*(v+w[n]);p=n}return VIBUF[k]=b}
function viPluck(m,t0,bass,vol,tone){const c=AC();if(c.state==='suspended')c.resume();const s=c.createBufferSource(),g=c.createGain(),lp=c.createBiquadFilter();s.buffer=viKS(m,bass?2.4:2.8,!bass);lp.type='lowpass';lp.frequency.value=tone||(bass?1400:5200);g.gain.value=(bass?.75:.5)*(vol||1);s.connect(lp).connect(g).connect(c.destination);s.start(t0||c.currentTime)}
function viPiano(m,t0){const c=AC();if(c.state==='suspended')c.resume();const t=t0||c.currentTime,f=440*Math.pow(2,(m-69)/12),g=c.createGain(),dec=Math.max(.9,3.2-(m-48)*.06);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+.006);g.gain.exponentialRampToValueAtTime(.001,t+dec);g.connect(c.destination);
 [1,2,3,4,5].forEach((h,i)=>{const o=c.createOscillator(),a=c.createGain();o.type='sine';o.frequency.value=f*h;a.gain.value=[1,.45,.22,.12,.06][i];o.connect(a).connect(g);o.start(t);o.stop(t+dec+.05)})}
const viName=m=>{const i=((m%12)+12)%12;return [SN[i],CN[i]]};
/* ---- Diapasón (guitarra y bajo) ---- */
function viOpen(car){return car==='guitarra'?[64,59,55,50,45,40]:VIb5?[43,38,33,28,23]:[43,38,33,28]}
function viFB(car){const op=viOpen(car),S6=op.length,F=12,x0=46,fw=58,sy=34,y0=26,W=x0+F*fw+10,H=y0+(S6-1)*sy+40,ys=s=>y0+(s-1)*sy,cx=f=>f?x0+(f-.5)*fw:x0-20;
 let v='<svg class="vi-fb" viewBox="0 0 '+W+' '+H+'" width="'+W+'" role="group" aria-label="Diapasón de '+(car==='guitarra'?'la guitarra':'el bajo')+'"><rect x="'+x0+'" y="'+(y0-12)+'" width="'+(F*fw)+'" height="'+((S6-1)*sy+24)+'" rx="4" fill="#2a1d12"/>';
 [3,5,7,9].forEach(f=>v+='<circle cx="'+cx(f)+'" cy="'+(y0+(S6-1)*sy/2)+'" r="6" fill="#e9dccb" opacity=".5"/>');v+='<circle cx="'+cx(12)+'" cy="'+(y0+(S6-1)*sy/2-sy)+'" r="6" fill="#e9dccb" opacity=".5"/><circle cx="'+cx(12)+'" cy="'+(y0+(S6-1)*sy/2+sy)+'" r="6" fill="#e9dccb" opacity=".5"/>';
 for(let f=0;f<=F;f++)v+='<line x1="'+(x0+f*fw)+'" x2="'+(x0+f*fw)+'" y1="'+(y0-12)+'" y2="'+(y0+(S6-1)*sy+12)+'" stroke="'+(f?'#b9b2a3':'#fbf7ef')+'" stroke-width="'+(f?2:6)+'"/>';
 for(let s=1;s<=S6;s++)v+='<line class="vi-st" data-s="'+s+'" x1="'+(x0-34)+'" x2="'+(x0+F*fw)+'" y1="'+ys(s)+'" y2="'+ys(s)+'" stroke="#d8cfbd" stroke-width="'+(car==='guitarra'?1+(s-1)*.45:2+(s-1)*.6)+'"/><text x="8" y="'+(ys(s)+4)+'" fill="#a79f8e" font-size="12">'+s+'</text>';
 for(let f=1;f<=F;f++)v+='<text x="'+cx(f)+'" y="'+(H-6)+'" fill="#a79f8e" font-size="12" text-anchor="middle">'+f+'</text>';
 for(let s=1;s<=S6;s++)for(let f=0;f<=F;f++)v+='<rect data-vf="'+s+','+f+'" x="'+(f?x0+(f-1)*fw:x0-40)+'" y="'+(ys(s)-sy/2)+'" width="'+(f?fw:40)+'" height="'+sy+'" fill="transparent" style="cursor:pointer"/>';
 if(VIall)for(let s=1;s<=S6;s++)for(let f=0;f<=F;f++){const m=op[s-1]+f,[n]=viName(m),col=nc(n)||'#f2a31b';v+='<g pointer-events="none" opacity=".85"><circle cx="'+cx(f)+'" cy="'+ys(s)+'" r="11" fill="'+col+'"/><text x="'+cx(f)+'" y="'+(ys(s)+3.5)+'" text-anchor="middle" font-size="8.5" font-weight="700" fill="'+ntx(col)+'">'+n+'</text></g>'}
 return v+'<g class="vi-mk"></g></svg>'}
function viMark(svg,list){const g=svg.querySelector('.vi-mk');if(!g)return;const car=VIsel,op=viOpen(car),x0=46,fw=58,sy=34,y0=26,cx=f=>f?x0+(f-.5)*fw:x0-20;
 g.innerHTML=list.map(([s,f,x])=>{const y=y0+(s-1)*sy;if(x)return '<text x="'+(x0-20)+'" y="'+(y+5)+'" text-anchor="middle" font-size="16" font-weight="700" fill="#e0685a">✕</text>';const m=op[s-1]+f,[n,l]=viName(m),col=nc(n)||'#f2a31b',lab=n+' · '+l,w=Math.max(40,lab.length*6.4+12),c=Math.max(w/2+2,cx(f));
  return '<rect x="'+(c-w/2)+'" y="'+(y-10)+'" width="'+w+'" height="20" rx="10" fill="'+col+'" stroke="#fff" stroke-width="1.6"/><text x="'+c+'" y="'+(y+4.5)+'" text-anchor="middle" font-size="12" font-weight="700" fill="'+ntx(col)+'">'+lab+'</text>'}).join('')}
function viChord(name,up){const sh=(VIG.find(x=>x[0]===name)||[])[1];if(!sh)return;VIch=name;const svg=document.querySelector('#v-vinst .vi-fb'),op=viOpen('guitarra');const L=[];
 sh.forEach((f,i)=>{const s=6-i;L.push(f<0?[s,0,1]:[s,f])});if(svg)viMark(svg,L);
 /* Abajo: de la cuerda grave a la aguda, todas, lento y con cuerpo. Arriba: de la aguda a la grave, solo las 3–4 agudas, rápido, suave y brillante */
 const c=AC(),t=c.currentTime+.02,ord=sh.map((f,i)=>[6-i,f]).filter(x=>x[1]>=0);
 if(up)ord.filter(x=>x[0]<=4).reverse().forEach(([s,f],j)=>viPluck(op[s-1]+f,t+j*.016,false,.55-j*.06,7500));
 else ord.forEach(([s,f],j)=>viPluck(op[s-1]+f,t+j*.045,false,1.05+j*.04,3800));
 document.querySelectorAll('#v-vinst [data-vch]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.vch===name)));
 const cap=document.getElementById('vi-cap');if(cap)cap.textContent='Acorde '+name+': '+sh.map((f,i)=>f<0?'✕':f).join(' ')+' (de la 6.ª a la 1.ª cuerda; ✕ = no suena)'}
/* ---- Piano ---- */
const VIK0=48,VIK1=72,VIKEY='awsedftgyhujk';
function viKb(){const W=[],B=[];for(let m=VIK0;m<=VIK1;m++)([1,3,6,8,10].includes(m%12)?B:W).push(m);const kw=44,H=180;let v='<svg class="vi-kb" viewBox="0 0 '+(W.length*kw)+' '+H+'" width="'+(W.length*kw)+'" role="group" aria-label="Teclado del piano">';
 W.forEach((m,i)=>{const[n]=viName(m);v+='<rect data-pk="'+m+'" x="'+(i*kw)+'" y="0" width="'+kw+'" height="'+H+'" fill="#fbf7ef" stroke="#000" rx="4"/><text x="'+(i*kw+kw/2)+'" y="'+(H-12)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#1b1610" pointer-events="none">'+n+(m===60?' ·':'')+'</text>'});
 B.forEach(m=>{const i=W.indexOf(m-1);v+='<rect data-pk="'+m+'" x="'+((i+1)*kw-14)+'" y="0" width="28" height="'+(H*.6)+'" fill="#111" stroke="#000" rx="3"/>'});return v+'</svg>'}
function viKey(m,on){const r=document.querySelector('#v-vinst [data-pk="'+m+'"]');if(!r)return;const blk=[1,3,6,8,10].includes(m%12),[n]=viName(m),col=nc(n)||'#f2a31b';r.setAttribute('fill',on?col:blk?'#111':'#fbf7ef')}
function viPlayKey(m){viPiano(m);viKey(m,1);setTimeout(()=>viKey(m,0),260);const[n,l]=viName(m),cap=document.getElementById('vi-cap');if(cap)cap.textContent=n+' · '+l+(m===60?' (DO central)':'')}
function viPChord(name){const x=VIP.find(y=>y[0]===name);if(!x)return;const r=60+x[1],iv=x[2]==='M'?[0,4,7]:x[2]==='m'?[0,3,7]:[0,4,7,10],ms=iv.map(i=>r+i),c=AC(),t=c.currentTime+.02;
 ms.forEach(m=>{viPiano(m,t);viKey(m,1)});setTimeout(()=>ms.forEach(m=>viKey(m,0)),700);const cap=document.getElementById('vi-cap');if(cap)cap.textContent='Acorde '+name+': '+ms.map(m=>viName(m)[0]).join(' – ')}
/* ---- Vista ---- */
function viView(){const v=document.getElementById('v-vinst');if(!v)return;const mine=viCar();if(!VIsel||(!ADMS&&mine))VIsel=mine||VIsel||'guitarra';const car=VIsel;
 let h='<button class="link" data-vback style="font-size:16px;min-height:44px">⬅ Volver</button><h2>'+VIC[car]+' '+(car==='guitarra'?'Guitarra':car==='bajo'?'Bajo':car==='piano'?'Piano':'Batería')+' virtual</h2>'
  +'<p class="mute">Para practicar aunque no tengas el instrumento en casa. Usa audífonos si puedes.</p>';
 if(ADMS||!mine)h+='<div class="chips" style="flex-wrap:wrap;margin-top:8px">'+Object.keys(VIC).map(k=>'<button class="chip" data-vsel="'+k+'" aria-pressed="'+(k===car)+'">'+VIC[k]+' '+({guitarra:'Guitarra',bajo:'Bajo',piano:'Piano',bateria:'Batería'})[k]+'</button>').join('')+'</div>';
 if(car==='guitarra'||car==='bajo'){
  h+='<div class="card"><p style="font-size:15px">Toca una cuerda en cualquier traste: suena y aparece la nota con su color. La 1.ª cuerda (la más aguda) está arriba.</p>'
   +'<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:8px"><button class="chip" data-vall aria-pressed="'+VIall+'">🎨 Ver todas las notas</button>'+(car==='bajo'?'<button class="chip" data-vb5 aria-pressed="'+VIb5+'">'+(VIb5?'Bajo de 5 cuerdas':'Bajo de 4 cuerdas')+'</button>':'')+'</div>'
   +'<div class="vi-scroll">'+viFB(car)+'</div><p id="vi-cap" class="mute" style="text-align:center;min-height:22px;margin-top:6px" aria-live="polite">Desliza el diapasón hacia los lados para ver los 12 trastes.</p></div>';
  if(car==='guitarra')h+='<div class="card"><h3>Acordes</h3><p class="mute" style="font-size:14px;margin-top:4px">Toca un acorde: se marca dónde van los dedos y suena el rasgueo.</p><div class="vi-ch">'+VIG.map(x=>'<button class="chip" data-vch="'+x[0]+'" aria-pressed="'+(VIch===x[0])+'">'+x[0]+'</button>').join('')+'</div>'
   +'<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;justify-content:center"><button class="btn" data-vstrum="d">⬇ Rasgueo abajo</button><button class="btn ghost" data-vstrum="u">⬆ Rasgueo arriba</button></div></div>'}
 else if(car==='piano'){
  h+='<div class="card"><p style="font-size:15px">Toca las teclas: suenan y se iluminan con su color. El punto marca el DO central. En computadora también puedes usar las teclas A W S E D F T G Y H U J K.</p><div class="vi-scroll">'+viKb()+'</div><p id="vi-cap" class="mute" style="text-align:center;min-height:22px;margin-top:6px" aria-live="polite"></p></div>'
   +'<div class="card"><h3>Acordes</h3><p class="mute" style="font-size:14px;margin-top:4px">Toca un acorde: suenan sus notas juntas y se marcan en el teclado.</p><div class="vi-ch">'+VIP.map(x=>'<button class="chip" data-vpc="'+x[0]+'">'+x[0]+'</button>').join('')+'</div></div>'}
 else h+='<div class="card" id="vi-dr"><p style="font-size:15px">Toca cada parte de la batería. En computadora también funcionan las teclas que aparecen en cada parte.</p>'+DRP.kit()+'</div>';
 v.innerHTML=h;if(car==='bateria')DRP.mount(document.getElementById('vi-dr'));if(car==='guitarra'&&VIch){const svg=v.querySelector('.vi-fb'),sh=VIG.find(x=>x[0]===VIch)[1];viMark(svg,sh.map((f,i)=>f<0?[6-i,0,1]:[6-i,f]))}}
document.addEventListener('pointerdown',e=>{const t=e.target;if(!t.closest||!t.closest('#v-vinst'))return;let b;
 if(b=t.closest('[data-vf]')){const[s,f]=b.dataset.vf.split(',').map(Number),op=viOpen(VIsel),m=op[s-1]+f;viPluck(m,0,VIsel==='bajo');viMark(b.closest('svg'),[[s,f]]);VIch=null;
  document.querySelectorAll('#v-vinst [data-vch]').forEach(x=>x.setAttribute('aria-pressed','false'));const[n,l]=viName(m),cap=document.getElementById('vi-cap');if(cap)cap.textContent='Cuerda '+s+(f?', traste '+f:', al aire')+': '+n+' ('+l+')';return}
 if(b=t.closest('[data-pk]')){e.preventDefault();viPlayKey(+b.dataset.pk)}});
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-vinst'))return;let b;
 if(t.closest('[data-vback]'))return obBack();
 if(b=t.closest('[data-vsel]')){VIsel=b.dataset.vsel;VIch=null;return viView()}
 if(t.closest('[data-vall]')){VIall=!VIall;return viView()}
 if(t.closest('[data-vb5]')){VIb5=!VIb5;return viView()}
 if(b=t.closest('[data-vch]'))return viChord(b.dataset.vch,false);
 if(b=t.closest('[data-vstrum]')){if(!VIch){toast('Primero toca un acorde');return}return viChord(VIch,b.dataset.vstrum==='u')}
 if(b=t.closest('[data-vpc]'))return viPChord(b.dataset.vpc)});
document.addEventListener('keydown',e=>{if(!visS('v-vinst')||VIsel!=='piano'||e.repeat||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA/.test((e.target.tagName||'')))return;const i=VIKEY.indexOf(e.key.toLowerCase());if(i>-1)viPlayKey(60+i)});
/* Accesos: tarjeta en Práctica y botón en el paso «Practicar» de las clases */
function viPr(){const v=document.getElementById('v-practica');if(!v)return;let d=document.getElementById('vi-pr');const car=viCar();
 if(!d){d=document.createElement('div');d.id='vi-pr';const h2=v.querySelector('h2');if(h2)h2.after(d);else v.prepend(d)}
 d.innerHTML=car?'<button class="m4home athome" data-go="vinst"><span class="em" aria-hidden="true">'+VIC[car]+'</span><span>Mi '+({guitarra:'guitarra',bajo:'bajo',piano:'piano',bateria:'batería'})[car]+' virtual<small>Practica aunque no tengas el instrumento en casa</small></span></button>':''}
function viLec(K,st){if(st!==2)return;const m=/^\d-0([a-z]+)-/.exec(K);if(!m||!VIC[m[1]])return;const b=document.getElementById('lec-body');if(!b||b.querySelector('#vi-lec'))return;
 const d=document.createElement('div');d.id='vi-lec';d.innerHTML='<button class="btn ghost" data-go="vinst" style="margin:10px 0 4px">'+VIC[m[1]]+' ¿No tienes tu instrumento a mano? Abre '+({guitarra:'la guitarra',bajo:'el bajo',piano:'el piano',bateria:'la batería'})[m[1]]+' virtual</button>';
 const r4=b.querySelector('#r4-bar');if(r4)r4.after(d);else b.prepend(d)}
