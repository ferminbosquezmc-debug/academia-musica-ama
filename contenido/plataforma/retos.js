/* ===== Recompensas por carrera y retos semanales (Prioridad 2 de la auditoría) =====
   · La racha abre premios de la carrera del estudiante: acordes para guitarra y piano, ritmos para batería.
   · Cada lunes hay 3 retos: la clase de la semana, los minutos de práctica y un reto musical que rota. */
const JG_RWS={
 guitarra:[[3,'Acorde de Sol','Tu primer acorde completo',['Sol','Si','Re']],[7,'Ritmo de merengue','Rasgueo básico en 2 tiempos',['Do','Mi','Sol']],[14,'Acorde de Re','Para tocar más alabanzas',['Re','Fa','La']],[21,'Ritmo de balada','Patrón de 4 tiempos para adoración',['La','Do','Mi']],[30,'Insignia Arpa Dorada','Las 7 cuerdas encendidas',NORD]],
 piano:[[3,'Acorde de Do mayor','Do, Mi y Sol con los dedos 1, 3 y 5',['Do','Mi','Sol']],[7,'Acorde de Fa mayor','Fa, La y Do: el cuarto grado de Do',['Fa','La','Do']],[14,'Acorde de Sol mayor','Sol, Si y Re: el quinto grado de Do',['Sol','Si','Re']],[21,'Acorde de La menor','Tu primer acorde menor: La, Do y Mi',['La','Do','Mi']],[30,'Insignia Arpa Dorada','Las 7 cuerdas encendidas',NORD]],
 bateria:[[3,'Ritmo de marcha','2/4 con bombo y redoblante',['Do','Sol'],'marcha'],[7,'Ritmo de vals','3/4: bombo y dos golpes de hi-hat',['Do','Mi','Sol'],'vals'],[14,'Ritmo disco','Bombo en cada pulso y hi-hat abierto',['Re','Fa','La'],'disco'],[21,'Shuffle','El balanceo de los tresillos',['La','Do','Mi'],'shuffle'],[30,'Insignia Arpa Dorada','Y de regalo: la cumbia',NORD,'cumbia']]};
const jgRW=()=>JG_RWS[cmCar()]||JG_RWS.guitarra;
function jgRacha(){const e=$('#jg-racha');if(!e)return;rtRender();const R=jgRW(),car=cmCar()||'guitarra',n=streak(),nx=R.find(r=>r[0]>n),pv=[...R].reverse().find(r=>r[0]<=n),lo=pv?pv[0]:0,today=!!S.min[dkey(new Date())];
 e.innerHTML='<h3>🔥 Tu racha de práctica</h3><div class="jg-big"><span class="n">'+n+'</span><span>'+(n===1?'día seguido':'días seguidos')+'</span></div>'
 +'<p class="mute" style="font-size:14px">'+(today?'Hoy ya practicaste. ¡Vuelve mañana para no apagarla!':'Practica hoy con el cronómetro o con un juego para sumar el día.')+'</p>'
 +'<div class="row" style="justify-content:space-between;margin-top:12px;gap:8px"><b>Próxima recompensa de '+esc(CARN[car])+'</b><small class="mute">'+(nx?n+' / '+nx[0]+' días':'¡Todas abiertas!')+'</small></div>'
 +'<div class="bar"><b style="width:'+(nx?Math.round((n-lo)/(nx[0]-lo)*100):100)+'%"></b></div>'
 +'<div class="jg-rw">'+R.map((r,i)=>{const op=n>=r[0],many=r[3].length>3;
  const ic=op?r[3].map((x,j)=>'<circle cx="'+(many?6+j*4.7:10+j*10)+'" cy="'+(many?(j%2?24:16):20)+'" r="'+(many?3.4:4.5)+'" fill="'+NCOL[x]+'"/>').join(''):'<rect x="13" y="18" width="14" height="12" rx="2" fill="#a79f8e"/><path d="M15 18v-4a5 5 0 0 1 10 0v4" stroke="#a79f8e" stroke-width="2.5" fill="none"/>';
  return '<div class="jg-r'+(op?' op':'')+'"><span class="ic"><svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">'+ic+'</svg></span><span class="tx"><b>'+r[1]+'</b><small>'+r[2]+'</small></span>'
   +(op&&(r[4]||r[3].length<=3)?'<button class="btn ghost m4mini" data-rw="'+i+'" aria-label="Escuchar '+esc(r[1])+'">▶</button>':'<span class="st">'+(op?'Abierta':r[0]+' días')+'</span>')+'</div>'}).join('')+'</div><div id="jg-rwp"></div>'}
function rwPlay(i){const r=jgRW()[i];if(!r||streak()<r[0])return;
 if(r[4]&&typeof DRP!=='undefined'){const p=$('#jg-rwp');p.innerHTML='<div style="margin-top:12px">'+DRP.player(r[4])+'</div>';DRP.mount(p);p.scrollIntoView({block:'nearest',behavior:'smooth'});return}
 const tb=cmCar()==='guitarra'?'guitarra':'piano',fs=r[3].map(x=>(JG_N.find(n=>n.name===x)||{}).f).filter(Boolean);
 fs.forEach((f,j)=>setTimeout(()=>jgPlay(f,tb,.6),j*320));setTimeout(()=>fs.forEach(f=>jgPlay(f,tb,1.4)),fs.length*320+200)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rw]');if(b)rwPlay(+b.dataset.rw)});

/* ---- Retos de la semana ---- */
const rtWk=d=>{const x=d?new Date(d):new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const rtKey=d=>dkey(rtWk(d));
const RTJ=[['int','📏 Intervalos','Responde 10 intervalos en el laboratorio de oído con 7 aciertos o más.','int'],['pulso','🥁 Pulso','Llega a «Logrado» o más en el evaluador de pulso.','pulso'],['alto','↕️ Alto o bajo','Responde 10 en «Alto o bajo» con 7 aciertos o más.','alto'],['port','🎬 Portafolio','Entrega en tu portafolio una grabación de la clase de la semana.',''],['acor','🎹 Mayor o menor','Reconoce 10 acordes con 7 aciertos o más.','acor']];
function rtClase(){const c=cmCar()||'guitarra';for(let l=(S.lvl||0);l<3;l++){const ks=cmKeys(c,l).filter(k=>LD[k]),k=ks.find(x=>!S.done[x]);if(k)return{k:k,n:ks.indexOf(k)+1+12*l,t:LD[k].t}}return null}
function rtState(){const wk=rtKey();if(S.reto&&S.reto.wk===wk)return S.reto;
 const base={};['alto','int','acor'].forEach(k=>{const o=(S.oido||{})[k]||{ok:0,n:0};base[k]=[o.ok,o.n]});const cl=rtClase();
 let j=Math.floor(rtWk().getTime()/6048e5)%RTJ.length;if(RTJ[j][0]==='port'&&!(DBS&&UIDS))j=(j+1)%RTJ.length;
 S.reto={wk:wk,base:base,k:cl?cl.k:null,n:cl?cl.n:0,t:cl?cl.t:'',j:RTJ[j][0]};save();return S.reto}
function rtMin(){const d=rtWk();let m=0;for(let i=0;i<7;i++){m+=+S.min[dkey(d)]||0;d.setDate(d.getDate()+1)}return m}
function rtDias(){const d=rtWk();let n=0;for(let i=0;i<7;i++){if(S.min[dkey(d)])n++;d.setDate(d.getDate()+1)}return n}
function rtList(){const R=rtState(),wk=R.wk,goal=kid()?30:[45,60,90][S.lvl||0],m=rtMin(),J=RTJ.find(x=>x[0]===R.j)||RTJ[0];
 const a=R.k?{t:'📖 Clase '+R.n+': '+R.t,d:'Termina la clase de esta semana en la plataforma.',ok:!!S.done[R.k],p:S.done[R.k]?'Terminada':'Pendiente',go:'<button class="btn ghost m4mini" data-rtk="'+esc(R.k)+'">Abrir la clase</button>'}
  :{t:'📖 Repaso',d:'Practica al menos 3 días distintos esta semana.',ok:rtDias()>=3,p:rtDias()+' / 3 días',go:''};
 const b={t:'⏱️ '+goal+' minutos de práctica',d:'Suma minutos con el cronómetro, los juegos o el laboratorio.',ok:m>=goal,p:Math.min(m,goal)+' / '+goal+' min',go:''};
 let ok=false,p='';
 if(['alto','int','acor'].indexOf(J[0])>=0){const o=(S.oido||{})[J[0]]||{ok:0,n:0},bs=R.base[J[0]]||[0,0],n=o.n-bs[1],k=o.ok-bs[0];ok=n>=10&&k>=7;p=k+' aciertos de '+n}
 else if(J[0]==='pulso'){const q=S.oido&&S.oido.pulso;ok=!!(q&&rtKey(q.fecha)===wk&&q.nota>=3);p=q&&rtKey(q.fecha)===wk?'Último: '+RBN[q.nota]:'Sin intentos esta semana'}
 else{ok=pfIt().some(x=>rtKey(x.fecha)===wk);p=ok?'Entregado':'Sin entrega esta semana'}
 const c={t:J[1],d:J[2],ok:ok,p:p,go:J[3]?'<button class="btn ghost m4mini" data-rtl="'+J[3]+'">Ir al laboratorio</button>':'<button class="btn ghost m4mini" data-go="port">Ir al portafolio</button>'};
 return [a,b,c]}
function rtCheck(L){const wk=rtKey();S.retos=S.retos||[];if(L.every(x=>x.ok)&&S.retos.indexOf(wk)<0){S.retos.push(wk);save();if(typeof jgChime==='function'){jgChime();jgSay('¡Cumpliste los <b>retos de la semana</b>! Ya van '+S.retos.length+'.','wow')}}}
function rtRender(){const e=$('#jg-reto');if(!e)return;const L=rtList(),d=rtWk(),f=new Date(d);f.setDate(f.getDate()+6);rtCheck(L);const hechos=L.filter(x=>x.ok).length,tot=(S.retos||[]).length;
 const fd=x=>x.toLocaleDateString('es-PA',{day:'numeric',month:'long'});
 e.innerHTML='<div class="row" style="flex-wrap:wrap;gap:8px"><h3 class="grow">🏆 Retos de la semana</h3><span class="m4st '+(hechos===3?'ok':'wait')+'">'+hechos+' / 3</span></div>'
  +'<p class="mute" style="font-size:14px;margin:2px 0 8px">Del lunes '+fd(d)+' al domingo '+fd(f)+'. Se renuevan cada lunes.</p>'
  +L.map(x=>'<div class="m4row" style="display:block"><div class="row" style="gap:8px;align-items:flex-start"><span aria-hidden="true" style="font-size:18px">'+(x.ok?'✅':'⬜')+'</span><div class="grow"><b>'+esc(x.t)+'</b><p class="mute" style="font-size:14px;margin-top:2px">'+esc(x.d)+'</p><p style="font-size:13px;margin-top:4px">'+esc(x.p)+'</p></div></div>'+(x.ok||!x.go?'':'<div style="margin-top:6px">'+x.go+'</div>')+'</div>').join('')
  +'<p style="font-size:14px;margin-top:10px">'+(hechos===3?'🎉 ¡Semana cumplida! ':'')+'Semanas con todos los retos cumplidos: <b>'+tot+'</b></p>'}
function rtMini(){const L=rtList();rtCheck(L);const h=L.filter(x=>x.ok).length;
 return '<button class="m4home athome" data-go="practica"><span class="em" aria-hidden="true">🏆</span><span>Retos de la semana · '+h+' / 3<small>'+esc(h===3?'¡Semana cumplida!':(L.find(x=>!x.ok)||{}).t||'')+'</small></span></button>'}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;let b;
 if(b=t.closest('[data-rtk]')){if(LD[b.dataset.rtk]){S.cur=b.dataset.rtk;go('leccion')}return}
 if(b=t.closest('[data-rtl]')){LBt=b.dataset.rtl;LBq=null;LBr={ok:0,n:0};go('lab')}});
