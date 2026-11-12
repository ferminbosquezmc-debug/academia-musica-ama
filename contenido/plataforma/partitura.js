/* ===== Partitura interactiva (Prioridad 3 de la auditoría) =====
   Partituras dibujadas en SVG que suenan y marcan cada nota: color, nombres o partitura sola (retiro del color),
   digitación, tablatura para guitarra, mano derecha o izquierda en piano, tempo y repetición.
   Notación de cada voz: «E4q3» = nota, figura (w h hd q qd e) y dedo opcional; «rq» = silencio; «Xq» = golpe (ritmo); «|» = barra. */
const SCL={C:0,D:1,E:2,F:3,G:4,A:5,B:6},SCSM={C:0,D:2,E:4,F:5,G:7,A:9,B:11},SCES={C:'Do',D:'Re',E:'Mi',F:'Fa',G:'Sol',A:'La',B:'Si'};
const SCD={w:4,h:2,hd:3,q:1,qd:1.5,e:.5};
/* El himno en cualquier tonalidad: g = grados 1–5 de la posición; f = dedos */
function scHim(n,orig){const f=[3,3,4,5,5,4,3,2,1,1,2,3];const g=[2,2,3,4,4,3,2,1,0,0,1,2];const a=i=>n[g[i]]+'q'+f[i];
 const m12=[0,1,2,3].map(b=>[0,1,2,3].map(j=>a(b*4+j)).join(' ')).slice(0,3).join(' | ');
 const c4=orig?n[2]+'qd3 '+n[1]+'e2 '+n[1]+'h2':n[2]+'q3 '+n[1]+'q2 '+n[1]+'h2',c8=orig?n[1]+'qd2 '+n[0]+'e1 '+n[0]+'h1':n[1]+'q2 '+n[0]+'q1 '+n[0]+'h1';
 return m12+' | '+c4+' | '+m12+' | '+c8}
const SCP=[
 {id:'rit1',car:'gpb',lv:1,t:'Lectura rítmica 1: negras, blancas y silencios',cl:'Clases 5 y 6',ts:[4,4],key:0,bpm:72,v:[{clef:'X',n:'Xq Xq Xq Xq | Xq Xq Xh | Xq rq Xq rq | Xh Xh | Xq Xq Xq rq | Xh rh | Xq Xq Xh | Xw'}],tip:'Aplaude o toca cada golpe y cuenta en voz alta: 1, 2, 3, 4. En los silencios, abre las manos.'},
 {id:'rit2',car:'gpb',lv:1,t:'Lectura rítmica 2: corcheas',cl:'Clase 7',ts:[4,4],key:0,bpm:66,v:[{clef:'X',n:'Xq Xq Xe Xe Xq | Xe Xe Xe Xe Xh | Xq Xe Xe Xq rq | Xe Xe Xq Xh | Xe Xe Xe Xe Xq Xq | Xq Xe Xe Xh'}],tip:'Cuenta «1 y 2 y 3 y 4 y»: cada corchea dura la mitad de una negra.'},
 {id:'him1p',car:'p',lv:1,t:'Himno de la alegría',cl:'Clase 8',au:'Ludwig van Beethoven',ts:[4,4],key:0,bpm:80,v:[{clef:'G',n:scHim(['C4','D4','E4','F4','G4'])},{clef:'F',n:'C3w5 | G3w1 | C3w5 | G3w1 | C3w5 | G3w1 | C3w5 | C3w5'}],tip:'Primero cada mano sola; después juntas y despacio. Respira en cada blanca.'},
 {id:'him1g',car:'g',lv:1,t:'Himno de la alegría',cl:'Clase 8',au:'Ludwig van Beethoven',ts:[4,4],key:0,bpm:76,gtr:1,v:[{clef:'G',n:scHim(['C5','D5','E5','F5','G5']).replace(/q\d|h\d/g,m=>m[0])}],tip:'Notas en la 1.ª y la 2.ª cuerda. Debajo está la tablatura: cuerda·traste (1·3 = 1.ª cuerda, traste 3; 2·0 = 2.ª cuerda al aire).'},
 {id:'him2re',car:'p',lv:2,t:'Himno de la alegría en Re',cl:'Clase 13',au:'Ludwig van Beethoven',ts:[4,4],key:2,bpm:84,v:[{clef:'G',n:scHim(['D4','E4','F#4','G4','A4'])},{clef:'F',n:'D3w5 | A3w1 | D3w5 | A3w1 | D3w5 | A3w1 | D3w5 | D3w5'}],tip:'El FA♯ es la tecla negra a la derecha del FA. La armadura te lo recuerda.'},
 {id:'him2sol',car:'p',lv:2,t:'Himno de la alegría en Sol',cl:'Clase 15',au:'Ludwig van Beethoven',ts:[4,4],key:1,bpm:84,v:[{clef:'G',n:scHim(['G4','A4','B4','C5','D5'])},{clef:'F',n:'G2w5 | D3w1 | G2w5 | D3w1 | G2w5 | D3w1 | G2w5 | G2w5'}],tip:'Misma digitación que en Do: solo cambia la posición de la mano.'},
 {id:'him2o',car:'p',lv:2,t:'Himno de la alegría (ritmo original)',cl:'Clase 18',au:'Ludwig van Beethoven',ts:[4,4],key:0,bpm:84,v:[{clef:'G',n:scHim(['C4','D4','E4','F4','G4'],1)},{clef:'F',n:'C3w5 | G3w1 | C3w5 | G3w1 | C3w5 | G3w1 | C3w5 | C3w5'}],tip:'En los compases 4 y 8: negra con puntillo (ta-a) y corchea (ti).'},
 {id:'est',car:'gp',lv:2,t:'Estrellita',cl:'Lectura',au:'Melodía popular francesa (dominio público)',ts:[4,4],key:0,bpm:84,v:[{clef:'G',n:'C4q1 C4q1 G4q5 G4q5 | A4q5 A4q5 G4h4 | F4q4 F4q4 E4q3 E4q3 | D4q2 D4q2 C4h1 | G4q5 G4q5 F4q4 F4q4 | E4q3 E4q3 D4h2 | G4q5 G4q5 F4q4 F4q4 | E4q3 E4q3 D4h2 | C4q1 C4q1 G4q5 G4q5 | A4q5 A4q5 G4h4 | F4q4 F4q4 E4q3 E4q3 | D4q2 D4q2 C4h1'}],tip:'En el compás 2 la mano se estira: el LA con el dedo 5 y el SOL con el 4.'},
 {id:'estg',car:'g',lv:2,t:'Estrellita',cl:'Lectura',au:'Melodía popular francesa (dominio público)',ts:[4,4],key:0,bpm:80,gtr:1,v:[{clef:'G',n:'C5q C5q G5q G5q | A5q A5q G5h | F5q F5q E5q E5q | D5q D5q C5h | G5q G5q F5q F5q | E5q E5q D5h | G5q G5q F5q F5q | E5q E5q D5h | C5q C5q G5q G5q | A5q A5q G5h | F5q F5q E5q E5q | D5q D5q C5h'}],tip:'El LA está en el traste 5 de la 1.ª cuerda (1·5): estira el dedo 4.'},
 {id:'min',car:'p',lv:3,t:'Minueto en Sol (8 compases)',cl:'Clase 33',au:'Christian Petzold · versión simplificada AMA',ts:[3,4],key:1,bpm:96,v:[{clef:'G',n:'D5q5 G4e1 A4e2 B4e3 C5e4 | D5q5 G4q1 G4q1 | E5q3 C5e1 D5e2 E5e3 F#5e4 | G5q5 G4q1 G4q1 | C5q4 D5e5 C5e4 B4e3 A4e2 | B4q3 C5e4 B4e3 A4e2 G4e1 | F#4q1 G4e2 A4e3 B4e4 G4e2 | A4hd3'}],tip:'Lee sin color ni nombres: analiza primero la tonalidad (Sol mayor, un sostenido) y la forma en dos frases.'}];
const SCN=['Do','Re','Mi','Fa','Sol','La','Si'];
/* Claves y silencios dibujados con trazos (la clave de sol es la misma de las láminas de piano) */
const SCGC='__CLEF__';
function scClef(c,x,y,sp,ink){if(c==='G'){const k=0.006214*sp;return '<path d="'+SCGC+'" fill="'+ink+'" transform="translate('+(x+0.15*sp)+','+(y+4*sp-0.1585*sp)+') scale('+k+','+(-k)+')"/>'}
 if(c==='F'){const cx=x+0.85*sp,cy=y+sp;return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(0.36*sp)+'" fill="'+ink+'"/><path d="M'+(cx-0.1*sp)+' '+(cy-0.25*sp)+' C'+(cx+0.2*sp)+' '+(y-0.25*sp)+' '+(x+2.65*sp)+' '+(y-0.2*sp)+' '+(x+2.6*sp)+' '+(y+1.2*sp)+' C'+(x+2.55*sp)+' '+(y+2.5*sp)+' '+(x+1.5*sp)+' '+(y+3.3*sp)+' '+(x+0.45*sp)+' '+(y+3.8*sp)+'" fill="none" stroke="'+ink+'" stroke-width="'+(0.3*sp)+'" stroke-linecap="round"/><circle cx="'+(x+3.15*sp)+'" cy="'+(y+0.5*sp)+'" r="'+(0.17*sp)+'" fill="'+ink+'"/><circle cx="'+(x+3.15*sp)+'" cy="'+(y+1.5*sp)+'" r="'+(0.17*sp)+'" fill="'+ink+'"/>'}
 return '<rect x="'+(x+0.8*sp)+'" y="'+(y+sp)+'" width="'+(0.45*sp)+'" height="'+(2*sp)+'" fill="'+ink+'"/><rect x="'+(x+1.6*sp)+'" y="'+(y+sp)+'" width="'+(0.45*sp)+'" height="'+(2*sp)+'" fill="'+ink+'"/>'}
function scRest(d,cx,m,sp,ink){if(d==='e')return '<circle cx="'+(cx-0.2*sp)+'" cy="'+(m-0.4*sp)+'" r="'+(0.28*sp)+'" fill="'+ink+'"/><path d="M'+(cx-0.3*sp)+' '+(m-0.2*sp)+' Q'+(cx+0.2*sp)+' '+(m-0.1*sp)+' '+(cx+0.45*sp)+' '+(m-0.7*sp)+' L'+(cx-0.1*sp)+' '+(m+1.1*sp)+'" fill="none" stroke="'+ink+'" stroke-width="'+(0.18*sp)+'" stroke-linecap="round"/>';
 return '<path d="M'+(cx-0.25*sp)+' '+(m-1.5*sp)+' L'+(cx+0.4*sp)+' '+(m-0.7*sp)+' L'+(cx-0.3*sp)+' '+(m+0.05*sp)+' L'+(cx+0.4*sp)+' '+(m+0.8*sp)+' Q'+(cx-0.55*sp)+' '+(m+0.55*sp)+' '+(cx+0.05*sp)+' '+(m+1.45*sp)+'" fill="none" stroke="'+ink+'" stroke-width="'+(0.28*sp)+'" stroke-linejoin="round" stroke-linecap="round"/>'}
function scParse(s){return s.split('|').map(b=>b.trim().split(/\s+/).filter(Boolean).map(tk=>{const m=/^(r|X|[A-G][#b]?\d)(w|hd|h|qd|q|e)(\d)?$/.exec(tk);if(!m)throw new Error('nota '+tk);
 const o={d:m[2],f:m[3]?+m[3]:0};if(m[1]==='r')o.r=1;else if(m[1]==='X')o.x=1;else{const L=m[1][0],ac=m[1].length===3?m[1][1]:'',oc=+m[1].slice(-1);o.L=L;o.ac=ac;o.oc=oc;o.pos=SCL[L]+7*(oc-4);o.midi=12*(oc+1)+SCSM[L]+(ac==='#'?1:ac==='b'?-1:0);o.nm=SCES[L]+(ac==='#'?'♯':ac==='b'?'♭':'')}return o}))}
/* Tablatura de guitarra (escritura una octava arriba del sonido real): cuerda y traste en primera posición */
const SCG=[[1,76],[2,71],[3,67],[4,62],[5,57],[6,52]];
function scTab(m){for(const[s,o]of SCG){const fr=m-o;if(fr>=0&&fr<=5)return s+'·'+fr}return ''}
let SCsel=null,SCcar=null,SClv=null,SCmode='color',SChand='ambas',SCbpm=null,SCon=null,SCloop=false;
const scPc=id=>SCP.find(p=>p.id===id);
function scSvg(P,W){const sp=9,V=P.v.map(x=>({clef:x.clef,bars:scParse(x.n)})),nb=V[0].bars.length,beats=P.ts[0]*(4/P.ts[1]),mps=W<520?2:4,rows=Math.ceil(nb/mps);
 const grand=V.length>1,staffH=4*sp,gap=grand?11*sp:0,sysH=staffH*(grand?2:1)+gap+(P.gtr?7*sp:0)+9*sp,H=rows*sysH+20,x0=12,head=32+(P.key*9)+18;
 const ink='#1d1a16';let s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Partitura de '+esc(P.t)+'" style="display:block;background:#fffaf0;border-radius:12px">';
 const topPos={G:10,F:-2,X:10};
 for(let r=0;r<rows;r++){const y0=20+r*sysH+3*sp,first=r*mps,last=Math.min(nb,first+mps),xs=x0+head+(r===0?16:0),mw=(W-xs-12)/(last-first);
  V.forEach((vc,vi)=>{const ty=y0+vi*(staffH+gap),yp=p=>ty+(topPos[vc.clef]-p)*sp/2;
   if(vc.clef==='X')s+='<line x1="'+x0+'" x2="'+(W-12)+'" y1="'+(ty+2*sp)+'" y2="'+(ty+2*sp)+'" stroke="'+ink+'" stroke-width="1"/>';
   else for(let l=0;l<5;l++)s+='<line x1="'+x0+'" x2="'+(W-12)+'" y1="'+(ty+l*sp)+'" y2="'+(ty+l*sp)+'" stroke="'+ink+'" stroke-width="1"/>';
   s+=scClef(vc.clef,x0,ty,sp,ink);
   if(vc.clef!=='X')for(let k=0;k<P.key;k++){const kp=vc.clef==='G'?[10,7][k]:[-4,-7][k];s+='<text x="'+(x0+30+k*9)+'" y="'+(yp(kp)+4.5)+'" font-size="16" fill="'+ink+'">♯</text>'}
   if(r===0)s+='<text x="'+(x0+head-6)+'" y="'+(vc.clef==='X'?ty+2*sp-2:ty+1.9*sp)+'" font-size="17" font-weight="700" fill="'+ink+'" font-family="serif">'+P.ts[0]+'</text><text x="'+(x0+head-6)+'" y="'+(vc.clef==='X'?ty+2*sp+15:ty+3.9*sp)+'" font-size="17" font-weight="700" fill="'+ink+'" font-family="serif">'+P.ts[1]+'</text>';
   for(let b=first;b<last;b++){const bx=xs+(b-first)*mw,ev=vc.bars[b]||[];let bt=0;
    const xOf=t=>bx+10+(mw-20)*(t/beats);
    s+='<line x1="'+(bx+mw)+'" x2="'+(bx+mw)+'" y1="'+(vc.clef==='X'?ty+sp:ty)+'" y2="'+(vc.clef==='X'?ty+3*sp:ty+staffH)+'" stroke="'+ink+'" stroke-width="'+(b===nb-1?3:1)+'"/>';
    if(vi===0)s+='<text x="'+(bx+2)+'" y="'+(ty-sp*1.6)+'" font-size="9" fill="#8a7f6a">'+(b+1)+'</text>';
    const beamed={},bdir={};ev.forEach((n,i)=>{if(n.d==='e'&&!n.r&&ev[i+1]&&ev[i+1].d==='e'&&!ev[i+1].r&&!beamed[i]){const t0=ev.slice(0,i).reduce((a,x)=>a+SCD[x.d],0);if(Math.abs(t0%1)<1e-6){beamed[i]='a';beamed[i+1]='b';const av=(n.pos+ev[i+1].pos)/2;bdir[i]=bdir[i+1]=!!n.x||av<topPos[vc.clef]-4}}});
    let pend=null;
    ev.forEach((n,i)=>{const x=xOf(bt)+6,id=vi+'-'+b+'-'+i,du=SCD[n.d];bt+=du;
     if(n.r){const my=vc.clef==='X'?ty+2*sp:ty+2*sp;s+='<g data-sn="'+id+'">'+(n.d==='w'?'<rect x="'+(x-5)+'" y="'+(ty+sp)+'" width="10" height="5" fill="'+ink+'"/>':n.d.startsWith('h')?'<rect x="'+(x-5)+'" y="'+(ty+2*sp-5)+'" width="10" height="5" fill="'+ink+'"/>':scRest(n.d,x,my,sp,ink))+'</g>';return}
     const p=n.x?6:n.pos,y=vc.clef==='X'?ty+2*sp:yp(p),hol=n.d==='w'||n.d.startsWith('h');
     const col=SCmode==='color'&&!n.x?(NCOL[SCES[n.L]]||ink):ink;let g='<g class="scn" data-sn="'+id+'" data-m="'+(n.midi||0)+'" style="cursor:pointer">';
     if(vc.clef!=='X'){for(let lp=(topPos[vc.clef]-8)-2;lp>=p;lp-=2)g+='<line x1="'+(x-9)+'" x2="'+(x+9)+'" y1="'+yp(lp)+'" y2="'+yp(lp)+'" stroke="'+ink+'"/>';for(let lp=topPos[vc.clef]+2;lp<=p;lp+=2)g+='<line x1="'+(x-9)+'" x2="'+(x+9)+'" y1="'+yp(lp)+'" y2="'+yp(lp)+'" stroke="'+ink+'"/>'}
     if(n.ac&&!(P.key&&n.ac==='#'&&(n.L==='F'||(P.key>1&&n.L==='C'))))g+='<text x="'+(x-17)+'" y="'+(y+5)+'" font-size="14" fill="'+ink+'">'+(n.ac==='#'?'♯':'♭')+'</text>';
     g+=n.x?'<path d="M'+(x-5)+' '+(y-5)+'L'+(x+5)+' '+(y+5)+'M'+(x+5)+' '+(y-5)+'L'+(x-5)+' '+(y+5)+'" stroke="'+ink+'" stroke-width="2.2" class="sch"/>'
      :'<ellipse class="sch" cx="'+x+'" cy="'+y+'" rx="6.2" ry="4.6" transform="rotate(-20 '+x+' '+y+')" fill="'+(hol?'#fffaf0':col)+'" stroke="'+(hol&&SCmode==='color'?col:ink)+'" stroke-width="'+(hol?2.4:1.2)+'"/>';
     if(n.d.endsWith('d'))g+='<circle cx="'+(x+10)+'" cy="'+(y-(p%2===0&&!n.x?3:0))+'" r="1.8" fill="'+ink+'"/>';
     if(n.d!=='w'){const up=bdir[i]!==undefined?bdir[i]:(n.x||p<topPos[vc.clef]-4),sx=up?x+5.6:x-5.6,ey=up?y-3.6*sp:y+3.6*sp;
      if(beamed[i]==='a')pend={x:sx,ey:ey,up:up};
      g+='<line x1="'+sx+'" x2="'+sx+'" y1="'+y+'" y2="'+ey+'" stroke="'+ink+'" stroke-width="1.3"/>';
      if(beamed[i]==='b'&&pend)g+='<line x1="'+pend.x+'" x2="'+sx+'" y1="'+pend.ey+'" y2="'+ey+'" stroke="'+ink+'" stroke-width="4"/>';
      else if(n.d==='e'&&!beamed[i])g+='<path d="M'+sx+' '+ey+(up?' q8 8 6 18':' q8 -8 6 -18')+'" stroke="'+ink+'" fill="none" stroke-width="1.6"/>'}
     if(n.f&&SCmode!=='sola')g+='<text x="'+x+'" y="'+(vi===0?ty-sp*.5-(p>topPos[vc.clef]?(p-topPos[vc.clef])*sp/2:0):ty+staffH+sp*1.5)+'" text-anchor="middle" font-size="10" font-weight="700" fill="#8a5a00">'+n.f+'</text>';
     if(SCmode!=='sola'&&!n.x)g+='<text x="'+x+'" y="'+(ty+staffH+(vi===0&&!grand?sp*3.4:vi===0?sp*2.6:sp*3.2)+Math.max(0,(topPos[vc.clef]-8-p))*sp/2)+'" text-anchor="middle" font-size="10" fill="#4a4136">'+esc(n.nm)+'</text>';
     if(P.gtr&&!n.x)g+='<text x="'+x+'" y="'+(ty+staffH+sp*6.4)+'" text-anchor="middle" font-size="11" font-weight="700" fill="#2370D6">'+scTab(n.midi)+'</text>';
     s+=g+'</g>'})}
   if(P.gtr&&vi===0)s+='<text x="'+x0+'" y="'+(ty+staffH+sp*6.4)+'" font-size="10" font-weight="700" fill="#2370D6">TAB</text>'});
  if(grand)s+='<line x1="'+x0+'" x2="'+x0+'" y1="'+y0+'" y2="'+(y0+2*staffH+gap)+'" stroke="'+ink+'" stroke-width="1.5"/>'}
 return s+'</svg>'}
/* ---- Reproducción ---- */
function scEvents(P){const V=P.v.map(x=>scParse(x.n)),beats=P.ts[0]*(4/P.ts[1]),E=[];
 V.forEach((bars,vi)=>{if(P.v.length>1&&((SChand==='derecha'&&vi!==0)||(SChand==='izquierda'&&vi!==1)))return;let t=0;
  bars.forEach((ev,b)=>{t=b*beats;ev.forEach((n,i)=>{const d=SCD[n.d];if(!n.r)E.push({t:t,d:d,n:n,id:vi+'-'+b+'-'+i});else E.push({t:t,d:d,id:vi+'-'+b+'-'+i,rest:1});t+=d})})});
 return{E:E.sort((a,b)=>a.t-b.t),len:V[0].length*beats,beats:beats}}
function scSound(e,t,dur){const n=e.n;if(n.x){(cmCar()==='bateria'?PTD.caja:PTD.rim)(t);return}
 const P=scPc(SCsel),m=P.gtr?n.midi-12:n.midi,f=440*Math.pow(2,(m-69)/12),c=AC();
 if(P.gtr){const sr=c.sampleRate,L=Math.floor(sr*Math.min(2.4,dur+.6)),bf=c.createBuffer(1,L,sr),d=bf.getChannelData(0),N=Math.round(sr/f);for(let i=0;i<N;i++)d[i]=Math.random()*2-1;for(let i=N;i<L;i++)d[i]=.498*(d[i-N]+d[i-N+1]);const s=c.createBufferSource(),g=c.createGain();g.gain.value=.45;s.buffer=bf;s.connect(g).connect(ptOut());s.start(t);return}
 ptKey(t,m,dur*.95,.2)}
function scStop(){if(SCon){clearInterval(SCon.iv);SCon.tm.forEach(clearTimeout);SCon=null}document.querySelectorAll('#v-score .scn.on').forEach(e=>e.classList.remove('on'));const b=document.getElementById('sc-go');if(b)b.textContent='▶ Escuchar'}
function scPlay(){if(SCon)return scStop();const P=scPc(SCsel);if(!P)return;const c=AC();if(c.state==='suspended')c.resume();const Z=scEvents(P),spb=60/SCbpm,t0=c.currentTime+.1;
 for(let i=0;i<Z.beats;i++)PTD.click(t0+i*spb,i===0);
 SCon={Z:Z,start:t0+Z.beats*spb,i:0,tm:[],iv:0};const b=document.getElementById('sc-go');if(b)b.textContent='⏹ Detener';
 SCon.iv=setInterval(()=>{const S1=SCon;if(!S1)return;if(!visS('v-score'))return scStop();const now=c.currentTime,sp2=60/SCbpm;
  while(S1.i<S1.Z.E.length&&S1.start+S1.Z.E[S1.i].t*sp2<now+.15){const e=S1.Z.E[S1.i],t=S1.start+e.t*sp2;if(!e.rest)scSound(e,t,e.d*sp2);
   const id=e.id,on=Math.max(0,(t-now)*1000),off=on+e.d*sp2*1000-30;
   S1.tm.push(setTimeout(()=>{const el=document.querySelector('#v-score [data-sn="'+id+'"]');if(el)el.classList.add('on')},on));
   S1.tm.push(setTimeout(()=>{const el=document.querySelector('#v-score [data-sn="'+id+'"]');if(el)el.classList.remove('on')},off));S1.i++}
  if(S1.i>=S1.Z.E.length&&now>S1.start+S1.Z.len*sp2){if(SCloop){S1.start=S1.start+S1.Z.len*sp2;S1.i=0;S1.tm=S1.tm.slice(-30)}else scStop()}},25)}
/* ---- Vista ---- */
function scView(){const v=document.getElementById('v-score');if(!v)return;scStop();
 if(!SCcar){const c=cmCar()||'guitarra';SCcar=c==='piano'?'p':c==='bateria'?'b':'g';SClv=Math.min(3,(S.lvl||0)+1)}
 const L=SCP.filter(p=>p.car.indexOf(SCcar)>=0&&p.lv===SClv);if(!scPc(SCsel)||L.indexOf(scPc(SCsel))<0){SCsel=L.length?L[0].id:null;SCbpm=null}
 const P=scPc(SCsel);if(P&&!SCbpm){SCbpm=P.bpm;if(P.lv===3&&SCcar==='p')SCmode='sola'}
 let h='<style>#v-score .scn.on .sch{fill:#f2a31b!important;stroke:#c9852a!important}#v-score .scn.on text{fill:#c9852a}</style><button class="link" data-go="practica" style="font-size:16px;min-height:44px">⬅ Volver a Práctica</button><h2>Partituras interactivas</h2><p class="mute">La partitura suena y marca cada nota. Toca una nota para escucharla sola.</p>'
  +'<div class="chips" role="group" aria-label="Carrera" style="margin-top:8px">'+[['g','🎸 Guitarra'],['p','🎹 Piano'],['b','🥁 Batería']].map(x=>'<button class="chip" data-scc="'+x[0]+'" aria-pressed="'+(SCcar===x[0])+'">'+x[1]+'</button>').join('')+'</div>'
  +'<div class="chips" role="group" aria-label="Nivel" style="margin-top:6px">'+[1,2,3].map(n=>'<button class="chip" data-scl="'+n+'" aria-pressed="'+(SClv===n)+'">Nivel '+n+'</button>').join('')+'</div>';
 if(P){h+='<div class="card"><h3>'+esc(P.t)+'</h3><p class="mute" style="font-size:14px">'+(P.au?esc(P.au)+' · ':'')+esc(P.cl)+' · '+P.ts[0]+'/'+P.ts[1]+'</p>'
   +'<div class="chips" role="group" aria-label="Ayudas" style="margin-top:10px">'+[['color','🎨 Color'],['nombres','🔤 Nombres'],['sola','🎼 Solo partitura']].map(x=>'<button class="chip" data-scm="'+x[0]+'" aria-pressed="'+(SCmode===x[0])+'">'+x[1]+'</button>').join('')+'</div>'
   +(P.v.length>1?'<div class="chips" role="group" aria-label="Manos" style="margin-top:6px">'+[['ambas','Las dos manos'],['derecha','Mano derecha'],['izquierda','Mano izquierda']].map(x=>'<button class="chip" data-sch="'+x[0]+'" aria-pressed="'+(SChand===x[0])+'">'+x[1]+'</button>').join('')+'</div>':'')
   +'<div id="sc-svg" data-nn style="margin-top:12px"></div>'
   +'<div class="row" style="justify-content:center;gap:10px;margin-top:12px;flex-wrap:wrap"><button class="btn" id="sc-go">▶ Escuchar</button><button class="chip" id="sc-loop" aria-pressed="'+SCloop+'">🔁 Repetir</button></div>'
   +'<label class="fl" style="margin-top:10px">Tempo: <b id="sc-bv">'+SCbpm+'</b> BPM<input type="range" id="sc-bpm" min="40" max="'+(P.bpm+40)+'" value="'+SCbpm+'" style="width:100%"></label>'
   +'<p class="m4key" style="margin-top:10px">'+esc(P.tip)+'</p><p class="mute" style="font-size:13px;margin-top:6px">Antes de empezar suena un compás de click. Baja el tempo hasta tocarla sin errores y súbelo poco a poco.</p></div>'}
 h+='<div class="card"><h3>Partituras del Nivel '+SClv+'</h3>'+(L.length?L.map(x=>'<button class="m4row" data-scs="'+x.id+'" style="display:flex;width:100%;text-align:left;gap:8px;align-items:center;cursor:pointer'+(x.id===SCsel?';border-color:var(--gold)':'')+'"><span class="grow"><b>'+esc(x.t)+'</b><span class="mute" style="font-size:13px;display:block">'+esc(x.cl)+(x.au?' · '+esc(x.au):'')+'</span></span><span aria-hidden="true">'+(x.id===SCsel?'▶':'›')+'</span></button>').join(''):'<p class="mute">Todavía no hay partituras para este nivel.</p>')+'</div>';
 v.innerHTML='<div data-nn>'+h+'</div>';scDraw()}
function scDraw(){const P=scPc(SCsel),el=document.getElementById('sc-svg');if(!P||!el)return;const W=Math.max(300,Math.min(900,Math.round(el.clientWidth||340)));try{el.innerHTML=scSvg(P,W)}catch(e){el.innerHTML='<p class="mute">No se pudo dibujar la partitura.</p>'}}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-score'))return;let b;
 if(b=t.closest('[data-scc]')){SCcar=b.dataset.scc;SCsel=null;return scView()}
 if(b=t.closest('[data-scl]')){SClv=+b.dataset.scl;SCsel=null;return scView()}
 if(b=t.closest('[data-scs]')){if(b.dataset.scs!==SCsel){SCsel=b.dataset.scs;SCbpm=null;scView()}return}
 if(b=t.closest('[data-scm]')){SCmode=b.dataset.scm;return scView()}
 if(b=t.closest('[data-sch]')){SChand=b.dataset.sch;return scView()}
 if(t.closest('#sc-loop')){SCloop=!SCloop;t.closest('#sc-loop').setAttribute('aria-pressed',String(SCloop));return}
 if(t.closest('#sc-go'))return scPlay();
 if(b=t.closest('.scn')){const P=scPc(SCsel),m=+b.dataset.m,c=AC();if(c.state==='suspended')c.resume();if(m)scSound({n:{midi:m}},c.currentTime+.02,.8);else PTD.rim(c.currentTime+.02);b.classList.add('on');setTimeout(()=>b.classList.remove('on'),300)}});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='sc-bpm'){SCbpm=+e.target.value;const b=document.getElementById('sc-bv');if(b)b.textContent=SCbpm}});
window.addEventListener('resize',()=>{if(visS('v-score')&&!SCon)scDraw()});
