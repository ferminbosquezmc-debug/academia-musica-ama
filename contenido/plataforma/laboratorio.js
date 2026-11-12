/* ===== Laboratorio de oído (Prioridad 2 de la auditoría) =====
   Afinador (micrófono si el navegador lo permite; si no, sonidos de referencia), alto o bajo,
   intervalos, acordes mayores y menores, y evaluador de pulso. Los resultados van a S.oido y al seguimiento. */
const LBN=['Do','Do♯','Re','Mi♭','Mi','Fa','Fa♯','Sol','Sol♯','La','Si♭','Si'];
const lbF=m=>440*Math.pow(2,(m-69)/12);
const lbNm=m=>LBN[((m%12)+12)%12];
const LBI=[[1,'Segunda menor',2],[2,'Segunda mayor',0],[3,'Tercera menor',1],[4,'Tercera mayor',0],[5,'Cuarta justa',1],[6,'Tritono',2],[7,'Quinta justa',0],[8,'Sexta menor',2],[9,'Sexta mayor',1],[10,'Séptima menor',2],[11,'Séptima mayor',2],[12,'Octava',0]];
const LBC=[[[0,4,7],'Mayor',0],[[0,3,7],'Menor',0],[[0,3,6],'Disminuido',2],[[0,4,8],'Aumentado',2]];
const LBS={guitarra:[[40,'6ª'],[45,'5ª'],[50,'4ª'],[55,'3ª'],[59,'2ª'],[64,'1ª']],bajo:[[28,'4ª'],[33,'3ª'],[38,'2ª'],[43,'1ª']],cromatico:[[60],[62],[64],[65],[67],[69],[71],[72]]};
const LBT=[['afinar','🎚️ Afinador'],['alto','↕️ Alto o bajo'],['int','📏 Intervalos'],['acor','🎹 Mayor o menor'],['pulso','🥁 Pulso']];
const LBL=['Nivel 1','Nivel 2','Nivel 3'];
let LBt='afinar',LBlv=0,LBq=null,LBr={ok:0,n:0},LBins='guitarra',LBmic=null,LBp=null,LBbpm=80,LBreto=false;
const lbRnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const lbPick=a=>a[Math.floor(Math.random()*a.length)];
function lbNote(m,t0,dur,o){o=o||{};const c=AC(),f=lbF(m),g=c.createGain(),lp=c.createBiquadFilter(),o1=c.createOscillator(),o2=c.createOscillator(),g2=c.createGain(),v=o.vol||.22;
 o1.type=o.saw?'sawtooth':'triangle';o2.type='sine';o1.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=o.saw?.15:.3;
 lp.type='lowpass';lp.frequency.value=Math.min(9000,Math.max(900,f*(o.saw?6:8)));
 o1.connect(lp);o2.connect(g2).connect(lp);lp.connect(g).connect(c.destination);
 g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.015);
 if(o.saw)g.gain.setValueAtTime(v,t0+dur-.25);else g.gain.exponentialRampToValueAtTime(v*.45,t0+.35);
 g.gain.exponentialRampToValueAtTime(.001,t0+dur);o1.start(t0);o2.start(t0);o1.stop(t0+dur+.05);o2.stop(t0+dur+.05)}
function lbClick(t,acc){const c=AC(),o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.value=acc?1500:1000;
 g.gain.setValueAtTime(.14,t);g.gain.exponentialRampToValueAtTime(.001,t+.06);o.connect(g).connect(c.destination);o.start(t);o.stop(t+.07)}
const lbNow=()=>{const c=AC();if(c.state==='suspended')c.resume();return c.currentTime+.08};

/* ---- Vista ---- */
function lbView(){const v=document.getElementById('v-lab');if(!v)return;if(LBt!=='afinar')lbStop();
 let h='<button class="link" data-go="practica" style="font-size:16px;min-height:44px">⬅ Volver a Práctica</button><h2>Laboratorio de oído</h2>'
  +'<div class="chips" role="group" aria-label="Ejercicio" style="margin-top:8px">'+LBT.map(x=>'<button class="chip" data-lt="'+x[0]+'" aria-pressed="'+(LBt===x[0])+'">'+x[1]+'</button>').join('')+'</div>';
 if(LBt==='afinar')h+=lbAfinar();else if(LBt==='pulso')h+=lbPulso();else h+=lbJuego();
 h+=lbResumen();v.innerHTML=h;if(LBt==='afinar'&&LBmic)lbMicUI()}
function lbResumen(){const o=S.oido||{},p=k=>o[k]&&o[k].n?Math.round(100*o[k].ok/o[k].n)+'% ('+o[k].n+')':'—';
 return '<div class="card"><h3>Mi registro</h3><div class="atchips"><span>Alto o bajo: <b>'+p('alto')+'</b></span><span>Intervalos: <b>'+p('int')+'</b></span><span>Mayor o menor: <b>'+p('acor')+'</b></span><span>Pulso: <b>'+(o.pulso?'±'+o.pulso.avg+' ms · '+o.pulso.pct+'% a tiempo':'—')+'</b></span></div><p class="mute" style="font-size:13px;margin-top:6px">Tu docente ve este registro en el seguimiento.</p></div>'}

/* ---- Afinador ---- */
function lbAfinar(){const S2=LBS[LBins];
 return '<div class="card"><h3>Afinador</h3><div class="chips" role="group" aria-label="Instrumento" style="margin-top:8px">'
  +[['guitarra','Guitarra'],['bajo','Bajo'],['cromatico','Piano o voz']].map(x=>'<button class="chip" data-li="'+x[0]+'" aria-pressed="'+(LBins===x[0])+'">'+x[1]+'</button>').join('')+'</div>'
  +'<div id="lb-tun" style="text-align:center;margin-top:14px"><div id="lb-nt" style="font-size:44px;font-weight:700;line-height:1.1">—</div><div id="lb-hz" class="mute" style="font-size:14px;min-height:20px"></div>'
  +'<div style="position:relative;height:26px;margin:12px auto 4px;max-width:340px;border-radius:13px;background:rgba(255,255,255,.08)"><div style="position:absolute;left:calc(50% - 1px);top:0;bottom:0;width:2px;background:var(--gold)"></div><div id="lb-nd" style="position:absolute;top:3px;width:20px;height:20px;border-radius:50%;left:calc(50% - 10px);background:#777;transition:left .12s"></div></div>'
  +'<div class="mute" style="display:flex;justify-content:space-between;max-width:340px;margin:0 auto;font-size:12px"><span>Grave (−50)</span><span>Afinada</span><span>Agudo (+50)</span></div>'
  +'<p id="lb-hint" style="font-size:16px;margin-top:10px;min-height:24px"></p></div>'
  +'<div class="row" style="justify-content:center;margin-top:6px"><button class="btn" id="lb-mic">'+(LBmic?'⏹ Detener el micrófono':'🎙️ Afinar con el micrófono')+'</button></div><p id="lb-mmsg" class="mute" style="font-size:14px;margin-top:8px;text-align:center"></p></div>'
  +'<div class="card"><h3>Sonidos de referencia</h3><p class="mute" style="font-size:14px;margin:4px 0 10px">'+(LBins==='cromatico'?'Toca una nota para escucharla y cántala o tócala igual.':'Toca la cuerda al aire junto con su sonido. Gira la clavija despacio hasta que los dos suenen como uno solo, sin «ondas».')+'</p>'
  +'<div class="row" style="flex-wrap:wrap;gap:8px">'+S2.map(x=>'<button class="btn ghost m4mini" data-lr="'+x[0]+'">'+(x[1]?x[1]+' · ':'')+lbNm(x[0])+(LBins==='cromatico'?'':' ('+(Math.floor(x[0]/12)-1)+')')+'</button>').join('')+'</div>'
  +(LBins==='cromatico'?'<p class="mute" style="font-size:13px;margin-top:8px">La de referencia: 440 Hz.</p>':'')+'</div>'}
async function lbMicStart(){const msg=document.getElementById('lb-mmsg');
 try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('sin');
  const st=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
  const c=AC();if(c.state==='suspended')await c.resume();const src=c.createMediaStreamSource(st),an=c.createAnalyser();an.fftSize=4096;src.connect(an);
  LBmic={st:st,an:an,buf:new Float32Array(an.fftSize),hist:[],last:0};lbView();lbLoop()}
 catch(e){LBmic=null;if(msg)msg.innerHTML='El navegador no dejó usar el micrófono en esta vista. Usa los <b>sonidos de referencia</b> de abajo: afinan igual de bien con un poco de práctica.'}}
function lbStop(){if(LBmic){try{LBmic.st.getTracks().forEach(t=>t.stop())}catch(e){}LBmic=null}}
function lbMicUI(){const m=document.getElementById('lb-mmsg');if(m)m.textContent='Toca una cuerda o una nota cerca del teléfono o la computadora.'}
function lbPitch(b,sr){const n=b.length;let rms=0;for(let i=0;i<n;i++)rms+=b[i]*b[i];rms=Math.sqrt(rms/n);if(rms<.012)return -1;
 const mn=Math.floor(sr/1200),mx=Math.min(Math.floor(sr/36),n>>1),c=new Float32Array(mx+2);
 for(let l=0;l<=mx+1;l++){let s=0;for(let j=0;j<n-l;j++)s+=b[j]*b[j+l];c[l]=s}
 let d=mn;while(d<mx&&c[d]>c[d+1])d++;let bi=-1,bv=-Infinity;for(let l=d;l<=mx;l++)if(c[l]>bv){bv=c[l];bi=l}
 if(bi<1||bv<c[0]*.3)return -1;const x1=c[bi-1],x2=c[bi],x3=c[bi+1],a=(x1+x3-2*x2)/2,bb=(x3-x1)/2;return sr/(a?bi-bb/(2*a):bi)}
function lbLoop(){if(!LBmic)return;if(!visS('v-lab')||LBt!=='afinar'){lbStop();return}
 requestAnimationFrame(lbLoop);const t=performance.now();if(t-LBmic.last<90)return;LBmic.last=t;
 LBmic.an.getFloatTimeDomainData(LBmic.buf);const f=lbPitch(LBmic.buf,AC().sampleRate),nt=document.getElementById('lb-nt'),hz=document.getElementById('lb-hz'),nd=document.getElementById('lb-nd'),hi=document.getElementById('lb-hint');if(!nt)return;
 if(f<0||!isFinite(f)){LBmic.hist=[];return}
 LBmic.hist.push(f);if(LBmic.hist.length>5)LBmic.hist.shift();const fs=LBmic.hist.slice().sort((a,b)=>a-b)[LBmic.hist.length>>1];
 const mf=69+12*Math.log2(fs/440);let tg=Math.round(mf),lab='';
 if(LBins!=='cromatico'){let best=null;LBS[LBins].forEach(x=>{if(best===null||Math.abs(mf-x[0])<Math.abs(mf-best[0]))best=x});tg=best[0];lab='Cuerda '+best[1]+' · '}
 const ce=Math.max(-50,Math.min(50,Math.round((mf-tg)*100))),ok=Math.abs(ce)<=5;
 nt.textContent=lbNm(tg);hz.textContent=lab+fs.toFixed(1)+' Hz · '+(ce>0?'+':'')+ce+' cents';
 nd.style.left='calc('+(50+ce)+'% - 10px)';nd.style.background=ok?'#2E9E4F':Math.abs(ce)<=15?'#f2a31b':'#E5312B';
 hi.textContent=Math.abs(mf-tg)>1.5&&LBins!=='cromatico'?'Esa nota está lejos de la cuerda: revisa cuál estás tocando.':ok?'¡Afinada!':ce<0?'Está grave: sube un poco (aprieta).':'Está aguda: baja un poco (afloja).'}

/* ---- Juegos de oído: alto o bajo, intervalos, mayor o menor ---- */
const LBTXT={alto:['Alto o bajo','Escucha dos notas. ¿La segunda es más aguda, más grave o igual?'],int:['Intervalos','Escucha dos notas seguidas y di qué distancia hay entre ellas.'],acor:['Mayor o menor','Escucha el acorde. Los mayores suenan luminosos; los menores, más oscuros.']};
function lbOps(){if(LBt==='alto')return [['up','Más aguda'],['down','Más grave'],['same','Igual']];
 if(LBt==='int')return LBI.filter(x=>x[2]<=LBlv).map(x=>[x[0],x[1]]);return LBC.filter(x=>x[2]<=LBlv).map(x=>[x[1],x[1]])}
function lbNueva(){const a=lbRnd(55,67);
 if(LBt==='alto'){const d=[[4,7],[2,3],[1,1]][LBlv],r=Math.random();const s=r<.2?0:(r<.6?1:-1)*lbRnd(d[0],d[1]);LBq={a:a,b:a+s,ans:s>0?'up':s<0?'down':'same'}}
 else if(LBt==='int'){const x=lbPick(LBI.filter(y=>y[2]<=LBlv));LBq={a:a,b:a+x[0],ans:x[0]}}
 else{const x=lbPick(LBC.filter(y=>y[2]<=LBlv));LBq={a:a-5,ch:x[0],ans:x[1]}}
 LBq.done=false;lbOir()}
function lbOir(arm){if(!LBq)return;const t=lbNow();
 if(LBq.ch){if(arm)LBq.ch.forEach((s,i)=>lbNote(LBq.a+s,t+i*.45,1));else LBq.ch.forEach(s=>lbNote(LBq.a+s,t,1.8,{vol:.16}))}
 else if(arm){lbNote(LBq.a,t,1.6,{vol:.16});lbNote(LBq.b,t,1.6,{vol:.16})}else{lbNote(LBq.a,t,.9);lbNote(LBq.b,t+.85,1.1)}}
function lbJuego(){const T=LBTXT[LBt],fin=LBr.n>=10;
 let h='<div class="card"><h3>'+T[0]+'</h3><p class="mute" style="font-size:15px;margin:4px 0 10px">'+T[1]+'</p>'
  +'<div class="chips" role="group" aria-label="Dificultad">'+LBL.map((x,i)=>'<button class="chip" data-ll="'+i+'" aria-pressed="'+(LBlv===i)+'">'+x+'</button>').join('')+'</div>'
  +'<p style="font-size:15px;margin-top:10px">Ronda: <b>'+LBr.ok+' / '+LBr.n+'</b> de 10</p>';
 if(fin){const p=LBr.ok*10;h+='<div class="m4key" style="margin-top:10px">'+(p>=80?'¡Excelente oído! Prueba el nivel siguiente.':p>=60?'Vas muy bien. Una ronda más y lo dominas.':'Escucha con calma y repite: el oído se entrena como un músculo.')+'</div><button class="btn" id="lb-ronda" style="margin-top:10px">Ronda nueva</button></div>';return h}
 if(!LBq)return h+'<button class="btn" id="lb-start" style="margin-top:10px">▶ Empezar</button></div>';
 h+='<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:10px"><button class="btn ghost m4mini" id="lb-otra">🔁 Escuchar otra vez</button>'+(LBt!=='alto'?'<button class="btn ghost m4mini" id="lb-arm">'+(LBt==='acor'?'Nota por nota':'Las dos juntas')+'</button>':'')+'</div>'
  +'<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:12px">'+lbOps().map(x=>'<button class="btn m4mini" data-la="'+x[0]+'"'+(LBq.done?' disabled':'')+'>'+x[1]+'</button>').join('')+'</div><div id="lb-fb" style="margin-top:10px">'+(LBq.fb||'')+'</div>'
  +(LBq.done?'<button class="btn" id="lb-sig" style="margin-top:10px">Siguiente ▶</button>':'')+'</div>';return h}
function lbResp(v){if(!LBq||LBq.done)return;const ok=String(v)===String(LBq.ans);LBq.done=true;LBr.n++;if(ok)LBr.ok++;
 S.oido=S.oido||{};const k=S.oido[LBt]=S.oido[LBt]||{ok:0,n:0};k.n++;if(ok)k.ok++;save();
 const nom=LBt==='alto'?{up:'más aguda',down:'más grave',same:'igual'}[LBq.ans]:LBt==='int'?LBI.find(x=>x[0]===LBq.ans)[1]:LBq.ans;
 LBq.fb='<p class="m4st '+(ok?'ok':'wait')+'">'+(ok?'✓ ¡Correcto!':'✗ Era: '+nom)+'</p>'+(ok?'':'<p class="mute" style="font-size:14px;margin-top:6px">Escúchalo otra vez sabiendo la respuesta: así se entrena el oído.</p>');lbView()}

/* ---- Evaluador de pulso ---- */
function lbPulso(){const P=LBp;let h='<div class="card"><h3>Evaluador de pulso</h3><p class="mute" style="font-size:15px;margin:4px 0 10px">Escucha 4 clicks de entrada y luego toca el botón (o la barra espaciadora) en cada pulso durante 4 compases.</p>'
  +'<div class="chips" role="group" aria-label="Tempo">'+[60,80,100,120].map(b=>'<button class="chip" data-lb="'+b+'" aria-pressed="'+(LBbpm===b)+'">'+b+' BPM</button>').join('')+'</div>'
  +'<label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:15px"><input type="checkbox" id="lb-reto"'+(LBreto?' checked':'')+'> Reto: el click se apaga en los 2 últimos compases</label>';
 if(P&&P.run)h+='<button id="lb-tap" class="btn" style="width:100%;min-height:120px;font-size:22px;margin-top:12px">'+(P.cnt?'Escucha la entrada…':'¡Toca en cada pulso!')+'</button>';
 else h+='<button class="btn" id="lb-pgo" style="margin-top:12px">▶ Empezar</button>';
 if(P&&P.res)h+=P.res;return h+'</div>'}
function lbPStart(){const c=AC();if(c.state==='suspended')c.resume();const spb=60/LBbpm,t0=c.currentTime+.15,B=[];
 for(let i=0;i<4;i++)lbClick(t0+i*spb,i===0);
 for(let k=0;k<16;k++){const t=t0+(4+k)*spb;B.push(t);if(!(LBreto&&k>=8))lbClick(t,k%4===0)}
 LBp={run:true,cnt:true,B:B,T:[],spb:spb,res:''};lbView();
 setTimeout(()=>{if(LBp&&LBp.run){LBp.cnt=false;const b=document.getElementById('lb-tap');if(b)b.textContent='¡Toca en cada pulso!'}},Math.max(0,(t0+4*spb-c.currentTime-.1)*1000));
 setTimeout(lbPEnd,(t0+20*spb-c.currentTime+spb*.6)*1000)}
function lbTap(){if(!LBp||!LBp.run)return;const c=AC();LBp.T.push(c.currentTime-(c.outputLatency||c.baseLatency||0));const b=document.getElementById('lb-tap');if(b){b.style.opacity='.6';setTimeout(()=>{b.style.opacity=''},80)}}
function lbPEnd(){if(!LBp||!LBp.run)return;const P=LBp;P.run=false;const w=P.spb/2,E=[];let miss=0;
 P.B.forEach(t=>{let best=null;P.T.forEach(x=>{if(Math.abs(x-t)<w&&(best===null||Math.abs(x-t)<Math.abs(best)))best=x-t});if(best===null)miss++;else E.push(best*1000)});
 const n=E.length,avg=n?Math.round(E.reduce((a,b)=>a+Math.abs(b),0)/n):0,mean=n?Math.round(E.reduce((a,b)=>a+b,0)/n):0,pct=Math.round(100*E.filter(x=>Math.abs(x)<=50).length/P.B.length);
 const nota=pct>=85&&avg<=35?4:pct>=70?3:pct>=45?2:1;
 S.oido=S.oido||{};S.oido.pulso={bpm:LBbpm,avg:avg,pct:pct,nota:nota,reto:LBreto,fecha:new Date().toISOString()};save();
 P.res='<div class="m4row" style="display:block;margin-top:12px"><div class="row" style="flex-wrap:wrap;gap:8px"><b class="grow">Resultado a '+LBbpm+' BPM'+(LBreto?' · reto':'')+'</b><span class="m4st '+(nota>=3?'ok':'wait')+'">'+RBN[nota]+'</span></div>'
  +'<div class="atchips"><span>A tiempo (±50 ms): <b>'+pct+'%</b></span><span>Desvío promedio: <b>'+avg+' ms</b></span><span>Pulsos sin tocar: <b>'+miss+'</b></span></div>'
  +'<p style="font-size:15px;margin-top:8px">'+(n<4?'Casi no se registraron toques. Toca el botón grande en cada click.':Math.abs(mean)<=15?'Tu pulso está centrado: ni te adelantas ni te atrasas.':mean<0?'Tiendes a <b>adelantarte</b>: escucha el click y espéralo.':'Tiendes a <b>atrasarte</b>: anticipa un poco el pulso.')+'</p></div>';lbView()}

/* ---- Eventos ---- */
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-lab'))return;let b;
 if(b=t.closest('[data-lt]')){LBt=b.dataset.lt;LBq=null;LBr={ok:0,n:0};return lbView()}
 if(b=t.closest('[data-li]')){LBins=b.dataset.li;return lbView()}
 if(b=t.closest('[data-lr]')){const m=+b.dataset.lr;return lbNote(m,lbNow(),LBins==='cromatico'?1.6:3,{saw:LBins!=='cromatico',vol:LBins==='bajo'?.3:.2})}
 if(t.closest('#lb-mic')){if(LBmic){lbStop();return lbView()}return lbMicStart()}
 if(b=t.closest('[data-ll]')){LBlv=+b.dataset.ll;LBq=null;LBr={ok:0,n:0};return lbView()}
 if(t.closest('#lb-start')||t.closest('#lb-sig')){lbNueva();return lbView()}
 if(t.closest('#lb-ronda')){LBr={ok:0,n:0};lbNueva();return lbView()}
 if(t.closest('#lb-otra'))return lbOir(false);if(t.closest('#lb-arm'))return lbOir(true);
 if(b=t.closest('[data-la]'))return lbResp(b.dataset.la);
 if(b=t.closest('[data-lb]')){if(LBp&&LBp.run)return;LBbpm=+b.dataset.lb;return lbView()}
 if(t.closest('#lb-pgo'))return lbPStart()});
document.addEventListener('change',e=>{if(e.target&&e.target.id==='lb-reto')LBreto=e.target.checked});
document.addEventListener('keydown',e=>{if(e.key!==' '||!LBp||!LBp.run||!visS('v-lab'))return;e.preventDefault();if(!e.repeat)lbTap()});
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('#lb-tap');if(b){e.preventDefault();lbTap()}});
