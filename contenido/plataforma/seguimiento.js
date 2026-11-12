/* ===== Seguimiento (Prioridad 1 de la auditoría) =====
   · Progreso en la nube: prog/<id>, lo escribe cada estudiante (acceso de Colaborador) y lo lee la dirección.
   · Evaluación mensual con rúbrica: eval/<id>, la escribe la dirección y cada estudiante lee la suya.
   · Prueba de ubicación: recomienda nivel y clase de inicio; las clases anteriores quedan convalidadas.
   · Panel del docente: lista de estudiantes con avance, última actividad y evaluaciones. */
let DBS=null,UIDS=null,ADMS=false,SEGst='espera',SEGt=null,PROGS=[],EVALS={},SEGsub=false,EVme=null,SEGsel=null,SEGfil='todos';
const visS=id=>{const e=document.getElementById(id);return !!e&&!e.hidden};
const RBC=['Técnica y postura','Pulso y ritmo','Lectura y teoría','Interpretación y musicalidad'];
const RBN=['','En inicio','En proceso','Logrado','Destacado'];
const CARN={guitarra:'Guitarra',piano:'Piano',bateria:'Batería',bajo:'Bajo',canto:'Canto',produccion:'Producción musical'};
const segTot=c=>Object.keys(LD).filter(k=>k.indexOf('-0'+c+'-')>0).length;
function segSum(){const done=Object.keys(S.done||{}).filter(k=>S.done[k]),car={};
 done.forEach(k=>{const m=k.match(/^\d-0([a-z]+)-/);if(m)car[m[1]]=(car[m[1]]||0)+1});
 let min=0;Object.keys(S.min||{}).forEach(d=>{min+=+S.min[d]||0});
 return{nombre:S.name||'',inst:S.inst||{},lvl:S.lvl||0,done:done.slice(0,3000),car:car,at:done.filter(k=>LD[k]&&LD[k].at).length,min:min,cur:S.cur||'',ubic:S.ubic||null,cert:S.cert||null,oido:S.oido||null,retos:(S.retos||[]).length,anal:(S.anal||[]).slice(-5),act:new Date().toISOString(),v:1}}
window.SEGsync=function(){if(!DBS||!UIDS)return;clearTimeout(SEGt);
 SEGt=setTimeout(async()=>{try{await DBS.doc('prog/'+UIDS).set(segSum());SEGst='nube'}catch(e){SEGst='local'}segBadge()},2500)};
(async()=>{try{if(!window.claude||!window.claude.use){SEGst='local';return}
 const[d,u]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);DBS=d||null;
 if(u){UIDS=await u.id();ADMS=!!(await u.canEdit())}
 if(!DBS||!UIDS){SEGst='local';segBadge();return}
 try{const g=await DBS.doc('prog/'+UIDS).get();
  if(g.exists){const p=g.data()||{};let ch=false;
   (p.done||[]).forEach(k=>{if(!S.done[k]){S.done[k]=true;ch=true}});
   if(!S.ubic&&p.ubic){S.ubic=p.ubic;ch=true}if(!S.cert&&p.cert){S.cert=p.cert;ch=true}if(!S.name&&p.nombre){S.name=p.nombre;ch=true}
   if(p.inst&&!Object.keys(S.inst||{}).length){S.inst=p.inst;ch=true}
   if(ch){try{localStorage.setItem('arp',JSON.stringify(S))}catch(e){}}}
 }catch(e){}
 SEGsync();
 DBS.doc('eval/'+UIDS).onSnapshot(s=>{EVme=s.exists?s.data():null;if(visS('v-perfil'))segPerfil()},()=>{});
 if(visS('v-home'))segHome();if(visS('v-clases'))clases()}catch(e){SEGst='local'}segBadge()})();

/* ---- Estado del guardado, en Perfil ---- */
function segBadge(){const b=document.getElementById('seg-badge');if(!b)return;
 b.innerHTML=SEGst==='nube'?'<span class="m4st ok">Guardado en tu cuenta</span><p class="mute" style="font-size:14px;margin-top:8px">Tu avance se guarda en la plataforma: lo verás en cualquier dispositivo y tu docente puede acompañarte.</p>'
  :SEGst==='espera'?'<span class="m4st wait">Conectando…</span>'
  :'<span class="m4st wait">Solo en este dispositivo</span><p class="mute" style="font-size:14px;margin-top:8px">Para guardar tu avance en tu cuenta, abre la plataforma con tu cuenta de claude.ai y pide a la academia acceso de Colaborador. Mientras tanto, tu avance sigue guardado en este teléfono o computadora.</p>'}

/* ---- Inicio: prueba de ubicación y acceso del docente ---- */
function segHome(){let h=document.getElementById('seg-home');
 if(!h){h=document.createElement('div');h.id='seg-home';const hero=document.querySelector('#v-home .hero');if(!hero)return;hero.after(h)}
 const anyDone=Object.keys(S.done||{}).some(k=>S.done[k]);let x='';
 if(!S.ubic&&!anyDone&&!kid())x+='<div class="card" style="border-color:var(--gold)"><h3>¿Ya tocas o cantas?</h3><p class="mute" style="font-size:15px;margin:4px 0 12px">Haz la prueba de ubicación (unos 10 minutos) y empieza en la clase que te corresponde, sin repetir lo que ya sabes.</p><button class="btn" data-go="ubic">Hacer la prueba de ubicación</button></div>';
 x+=ruCard()+rtMini();if(ADMS)x+='<button class="m4home athome" data-go="seg"><span class="em" aria-hidden="true">📋</span><span>Seguimiento de estudiantes<small>Avance, actividad y evaluaciones con rúbrica</small></span></button>'
  +'<button class="m4home athome" data-go="guia"><span class="em" aria-hidden="true">📘</span><span>Guía del docente<small>Método ARPA, rúbrica, seguimiento y certificados</small></span></button>';
 h.innerHTML=x}

/* ---- Perfil: dónde se guarda, ubicación y mis evaluaciones ---- */
function segPerfil(){const v=document.getElementById('v-perfil');if(!v)return;let c=document.getElementById('pf-seg');
 if(!c){c=document.createElement('div');c.id='pf-seg';const h2=v.querySelector('h2');if(!h2)return;h2.after(c)}
 let h='<div class="card"><div class="row"><h3 class="grow">Mi avance</h3></div><div id="seg-badge" style="margin-top:8px"></div>';
 if(S.ubic)h+='<p style="margin-top:10px;font-size:15px">Prueba de ubicación: <b>'+esc(CARN[S.ubic.car]||S.ubic.car)+' · Nivel '+S.ubic.nivel+' · Clase '+S.ubic.clase+'</b> <span class="mute">('+esc(fdS(S.ubic.fecha))+')</span></p>';
 h+='<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:12px"><button class="btn ghost m4mini" data-go="ubic">'+(S.ubic?'Repetir la prueba de ubicación':'Hacer la prueba de ubicación')+'</button>'+(ADMS?'<button class="btn m4mini" data-go="seg">📋 Seguimiento de estudiantes</button>':'')+'</div></div>';
 const it=(EVme&&EVme.items)||[];
 h+='<div class="card"><h3>Mis evaluaciones</h3>'+(it.length?it.slice().reverse().map(evCard).join(''):'<p class="mute" style="font-size:15px;margin-top:6px">Aquí aparecerán las evaluaciones mensuales que registre tu docente, con la rúbrica de cada criterio.</p>')+'</div>';
 h+=pfCard()+cmPerfil();c.innerHTML=h;segBadge()}
function segOido(o){if(!o)return '';let ok=0,n=0;['alto','int','acor'].forEach(k=>{if(o[k]){ok+=o[k].ok;n+=o[k].n}});
 return (n?'<span>👂 Oído: <b>'+Math.round(100*ok/n)+'%</b> ('+n+')</span>':'')+(o.pulso?'<span>🥁 Pulso: <b>'+o.pulso.pct+'%</b> a tiempo a '+o.pulso.bpm+' BPM</span>':'')}
const fdS=s=>{const d=new Date(s);return isNaN(d)?'':d.toLocaleDateString('es-PA',{day:'numeric',month:'long',year:'numeric'})};
const evAvg=e=>{const n=(e.r||[]).filter(x=>x>0);return n.length?n.reduce((a,b)=>a+b,0)/n.length:0};
function evCard(e){const a=evAvg(e);
 return '<div class="m4row" style="display:block"><div class="row" style="flex-wrap:wrap;gap:8px"><b class="grow">Mes '+esc(e.mes)+' · '+esc(CARN[e.car]||e.car||'')+'</b><span class="m4st '+(a>=3?'ok':'wait')+'">'+(a>=3?'Aprobado':'En proceso')+' · '+a.toFixed(1)+' / 4</span></div>'
 +'<div class="atchips">'+RBC.map((c,i)=>'<span>'+c+': <b>'+(RBN[(e.r||[])[i]]||'—')+'</b></span>').join('')+'</div>'
 +(e.com?'<p style="font-size:14px;margin-top:6px">«'+esc(e.com)+'»</p>':'')+'<p class="mute" style="font-size:13px;margin-top:4px">'+esc(fdS(e.fecha))+'</p></div>'}

/* ---- Prueba de ubicación ---- */
const UQ=[
 [0,'¿Cuántos tiempos dura una blanca?',['1','2','4'],1],
 [0,'¿Qué letra corresponde a SOL en el cifrado?',['F','G','A'],1],
 [0,'¿Cuántos tiempos tiene un compás de 3/4?',['2','3','4'],1],
 [0,'¿Cuántas corcheas caben en una negra?',['1','2','4'],1],
 [1,'¿Qué hace un sostenido (♯)?',['Sube la nota un semitono','Baja la nota un semitono','Alarga la nota'],0],
 [1,'¿Cuál es la fórmula de la escala mayor?',['T T S T T T S','T S T T S T T','T T T S T T S'],0],
 [1,'Un tresillo de corcheas ocupa el lugar de…',['Una corchea','Dos corcheas (un tiempo)','Una blanca'],1],
 [1,'¿Qué notas forman el acorde de La menor (Am)?',['LA – DO♯ – MI','LA – DO – MI','LA – RE – MI'],1],
 [2,'¿Cuál es la relativa menor de Do mayor?',['Mi menor','La menor','Re menor'],1],
 [2,'¿Qué notas forman el acorde G7?',['SOL – SI – RE – FA','SOL – SI – RE – FA♯','SOL – SI♭ – RE – FA'],0],
 [2,'¿Qué es una síncopa?',['Un acento en un tiempo débil o fuera del pulso','Un silencio de redonda','Tocar más rápido'],0],
 [2,'¿Cuántas notas tiene la escala pentatónica?',['5','6','7'],0]];
const UA={
 guitarra:['Conozco las partes de la guitarra, me siento bien y toco MI, FA y SOL en la 1.ª cuerda leyendo el pentagrama.','Leo y toco negras, blancas, silencios y corcheas en las cuerdas 1.ª y 2.ª (por ejemplo, el «Himno de la alegría»).','Toco Em, E, Am, A y D cambiando a tiempo con rasgueo.','Toco acordes con cejilla (F, Bm).','Uso rasgueos de varios estilos (balada, pop, merengue).','Toco arpegios con p-i-m-a.','Toco escalas en el mástil (pentatónica).','Improviso un solo corto sobre una progresión.','Acompaño un servicio completo leyendo el cifrado.'],
 piano:['Me siento bien, numero mis dedos y toco las 7 notas desde el DO central diciendo su nombre.','Leo negras, blancas, silencios y corcheas en clave de sol con la mano derecha (el «Himno de la alegría»).','Toco C, F y G y la escala de Do con la mano derecha.','Leo en clave de fa y toco las escalas de Sol, Re y La.','Toco arpegios y acompañamientos (vals, bajo alterno).','Uso el pedal y acompaño con I–IV–V y los acordes menores.','Toco escalas con las dos manos juntas y leo con armadura.','Acompaño en varios estilos y transporto una canción.','Toco una pieza como el «Minueto en Sol» e improviso con la pentatónica.'],
 bateria:['Conozco las partes de la batería, tomo bien las baquetas y leo negras en el redoblante y el bombo.','Toco el ritmo de rock en corcheas (hi-hat, redoblante y bombo) con metrónomo.','Hago rellenos por los toms y vuelvo al ritmo con el crash.','Toco ritmos con tresillos y semicorcheas (shuffle, 12/8).','Toco desplazamientos de hi-hat y fills de 4 tiempos.','Toco redoble cerrado y estilos (disco, balada en 6/8).','Toco ghost notes y ritmos latinos (cumbia, bossa nova).','Toco reggae y funk con independencia.','Hago un solo de 8 compases y leo una partitura completa.']};
const UCAP={bateria:3};/* meses con clases publicadas: batería solo tiene el Nivel 1 */
function ubicView(){const v=document.getElementById('v-ubic');const opts=Object.keys(UA).filter(k=>AVAIL[k]);const sel=S.inst[0]&&UA[S.inst[0]]?S.inst[0]:opts[0];
 v.innerHTML='<button class="link" data-go="home" style="font-size:16px;min-height:44px">⬅ Volver a Inicio</button><h2>Prueba de ubicación</h2><p class="mute">Unos 10 minutos. Responde con sinceridad: el resultado te dice en qué clase empezar. Tu docente lo confirma en tu primera clase.</p>'
 +'<div class="card"><h3>1 · Tu carrera</h3><div class="chips" role="group" aria-label="Carrera" style="flex-wrap:wrap">'+opts.map(k=>'<button class="chip" data-uc="'+k+'" aria-pressed="'+(k===sel)+'">'+(EMO[k]||'')+' '+CARN[k]+'</button>').join('')+'</div></div>'
 +'<div class="card"><h3>2 · Teoría musical</h3><p class="mute" style="font-size:14px;margin-top:4px">12 preguntas, de lo más básico a lo más avanzado. Si no sabes, elige «No lo sé».</p>'
 +UQ.map((q,i)=>'<fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-weight:600">'+(i+1)+'. '+esc(q[1])+'</legend><div class="atchips">'+q[2].concat(['No lo sé']).map((o,j)=>'<label style="display:flex;gap:6px;align-items:center;border:1px solid var(--line);border-radius:99px;padding:6px 12px;min-height:40px;cursor:pointer"><input type="radio" name="uq'+i+'" value="'+j+'" style="accent-color:var(--gold)"> '+esc(o)+'</label>').join('')+'</div></fieldset>').join('')+'</div>'
 +'<div class="card"><h3>3 · ¿Qué ya puedes tocar?</h3><p class="mute" style="font-size:14px;margin-top:4px">Marca solo lo que puedes hacer hoy sin ayuda. Van en orden: si una no la puedes, no hace falta seguir.</p><div id="ua-list"></div></div>'
 +'<button class="btn" id="ub-go" style="margin-top:16px">Ver mi resultado</button><div id="ub-res"></div>';
 v.dataset.car=sel;uaList()}
function uaList(){const v=document.getElementById('v-ubic'),c=v.dataset.car;
 document.getElementById('ua-list').innerHTML=UA[c].map((t,i)=>'<label class="chk"><input type="checkbox" data-ua="'+i+'"><span><b>Mes '+(i+1)+':</b> '+esc(t)+'</span></label>').join('');
 v.querySelectorAll('[data-uc]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.uc===c)))}
function ubicCalc(){const v=document.getElementById('v-ubic'),car=v.dataset.car,th=[0,0,0];
 UQ.forEach((q,i)=>{const r=v.querySelector('input[name="uq'+i+'"]:checked');if(r&&+r.value===q[3])th[q[0]]++});
 let m=0;for(const c of v.querySelectorAll('[data-ua]')){if(c.checked)m++;else break}
 const cap=th[0]<3?0:th[1]<3?3:th[2]<3?6:9;let months=Math.min(m,cap,8,UCAP[car]!==undefined?UCAP[car]:9);
 const mes=months+1,nivel=Math.floor((mes-1)/3)+1,clase=(mes-1)*4+1;return{car,th,m,cap,mes,nivel,clase}}
function ubicShow(){const r=ubicCalc(),el=document.getElementById('ub-res');
 const why=[];if(r.cap<Math.min(r.m,8))why.push('La teoría del Nivel '+(r.cap/3+1)+' necesita repaso, así que empiezas ahí aunque ya toques más.');
 if(UCAP[r.car]!==undefined&&r.m>UCAP[r.car])why.push('Batería tiene publicado por ahora el Nivel 1; cuando abra el Nivel 2 podrás seguir.');
 el.innerHTML='<div class="card" style="border-color:var(--gold);margin-top:16px"><p class="mute">Tu resultado</p><h3 style="font-size:28px;margin-top:4px">'+esc(CARN[r.car])+' · Nivel '+r.nivel+' · Clase '+r.clase+'</h3><p style="margin-top:6px">Mes '+r.mes+' de 9.</p>'
 +'<div class="atchips"><span>Teoría Nivel 1: <b>'+r.th[0]+'/4</b></span><span>Nivel 2: <b>'+r.th[1]+'/4</b></span><span>Nivel 3: <b>'+r.th[2]+'/4</b></span><span>Ya tocas: <b>'+r.m+' de 9 meses</b></span></div>'
 +(why.length?'<p style="font-size:15px;margin-top:10px">'+why.map(esc).join(' ')+'</p>':'')
 +(r.clase>1?'<p class="mute" style="font-size:14px;margin-top:10px">Si empiezas ahí, las clases anteriores quedan marcadas como convalidadas. Puedes abrirlas cuando quieras para repasar.</p>':'')
 +'<div class="row" style="flex-wrap:wrap;gap:8px;margin-top:14px">'+(r.clase>1?'<button class="btn" id="ub-ok">Empezar en la clase '+r.clase+'</button><button class="btn ghost" id="ub-one">Prefiero empezar desde la clase 1</button>':'<button class="btn" id="ub-ok">Empezar en la clase 1</button>')+'</div></div>';
 el.scrollIntoView({behavior:'smooth',block:'start'});ubicCalc.last=r}
function ubicApply(desde1){const r=ubicCalc.last;if(!r)return;S.inst=S.inst||{};S.inst[0]=S.inst[1]=S.inst[2]=r.car;S.conv=S.conv||{};
 const L=desde1?0:r.nivel-1,dentro=desde1?0:(r.mes-1)%3;
 for(let l=0;l<=L;l++){const x=subj(l,0);if(!x)continue;/* en Guitarra I se cuentan las 12 clases, no las prácticas anteriores */
  const ks=x[1].map((_,i)=>lk(l,0,i)).filter(k=>LD[k]&&!/^0-0guitarra-\d+$/.test(k));
  const n=ks.length,hasta=l<L?n:Math.round(n*dentro/3);for(let i=0;i<hasta;i++){S.done[ks[i]]=true;S.conv[ks[i]]=true}}
 S.ubic={fecha:new Date().toISOString(),car:r.car,nivel:desde1?1:r.nivel,clase:desde1?1:r.clase,mes:desde1?1:r.mes,teo:r.th,toca:r.m};
 S.lvl=L;save();toast(desde1?'Empiezas en la clase 1':'Listo: empiezas en la clase '+r.clase);go('clases')}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-ubic'))return;let b;
 if(b=t.closest('[data-uc]')){document.getElementById('v-ubic').dataset.car=b.dataset.uc;uaList();document.getElementById('ub-res').innerHTML='';return}
 if(t.closest('#ub-go'))return ubicShow();if(t.closest('#ub-ok'))return ubicApply(false);if(t.closest('#ub-one'))return ubicApply(true)});

/* ---- Panel del docente ---- */
function segView(){const v=document.getElementById('v-seg'),back='<button class="link" data-go="home" style="font-size:16px;min-height:44px">⬅ Volver a Inicio</button>';
 if(!ADMS||!DBS){v.innerHTML=back+'<h2>Seguimiento de estudiantes</h2><div class="card"><p>'+(DBS?'Solo la dirección y el equipo docente con acceso de Editor ven el seguimiento.':'El seguimiento necesita la base de datos de la plataforma. Ábrela con la cuenta de la academia.')+'</p></div>';return}
 if(!SEGsub){SEGsub=true;pfSubAll();
  DBS.collection('prog').onSnapshot(s=>{PROGS=s.docs.map(d=>Object.assign({_id:d.id},d.data()));if(visS('v-seg')&&!SEGsel)segView()},()=>toast('No se pudo leer el avance de los estudiantes'));
  DBS.collection('eval').onSnapshot(s=>{EVALS={};s.docs.forEach(d=>{EVALS[d.id]=d.data()});if(visS('v-seg')&&!SEGsel)segView()},()=>{})}
 const now=Date.now(),dias=p=>Math.floor((now-new Date(p.act).getTime())/864e5);
 const L=PROGS.slice().sort((a,b)=>String(b.act).localeCompare(String(a.act)));
 const act=L.filter(p=>dias(p)<=7).length,ina=L.length-act;
 const vis=SEGfil==='inactivos'?L.filter(p=>dias(p)>7):L;
 let h=back+'<h2>Seguimiento de estudiantes</h2><p class="mute">Avance guardado en la nube por cada estudiante. Lo ven la dirección y el equipo docente.</p><button class="btn ghost m4mini" data-go="guia" style="margin-top:4px">📘 Guía del docente</button>'
 +'<div class="m4facts"><div><b>'+L.length+'</b><span>Estudiantes con avance en la nube</span></div><div><b>'+act+'</b><span>Activos en los últimos 7 días</span></div><div><b>'+ina+'</b><span>Sin actividad hace más de 7 días</span></div></div>'
 +'<div class="chips" role="group" aria-label="Filtro" style="margin-top:12px"><button class="chip" data-sf="todos" aria-pressed="'+(SEGfil==='todos')+'">Todos</button><button class="chip" data-sf="inactivos" aria-pressed="'+(SEGfil==='inactivos')+'">Solo inactivos</button></div>'
 +'<div class="card"><h3>Comprobar un certificado</h3><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px"><input class="fi" id="cm-q" placeholder="ARPA-G1-XXXXXXX" autocomplete="off" style="flex:1;min-width:180px"><button class="btn m4mini" id="cm-go">Comprobar</button></div><div id="cm-res"></div></div>';
 if(!vis.length)h+='<div class="card"><p class="mute">'+(L.length?'No hay estudiantes inactivos.':'Todavía no hay avances en la nube. Aparecen aquí cuando un estudiante con acceso de Colaborador abre la plataforma con su cuenta.')+'</p></div>';
 h+=vis.map(p=>{const dd=dias(p),cars=Object.keys(p.car||{}),ev=(EVALS[p._id]&&EVALS[p._id].items)||[];
  return '<div class="card m4card"><div class="row" style="flex-wrap:wrap;gap:8px"><h3 class="grow">'+esc(p.nombre||'Estudiante sin nombre')+'</h3><span class="m4st '+(dd<=7?'ok':'')+'">'+(dd<=0?'Activo hoy':dd<=7?'Activo hace '+dd+' d':'Sin actividad hace '+dd+' d')+'</span></div>'
  +'<div class="atchips">'+(cars.length?cars.map(c=>'<span>'+(EMO[c]||'')+' '+esc(CARN[c]||c)+': <b>'+p.car[c]+'/'+segTot(c)+'</b> clases</span>').join(''):'<span>Sin clases terminadas</span>')+(p.at?'<span>🎚️ Audio técnica: <b>'+p.at+'</b></span>':'')+'<span>⏱️ '+(p.min||0)+' min de práctica</span>'+segOido(p.oido)+(p.anal&&p.anal.length?'<span>🎙️ Análisis: <b>'+esc(p.anal[p.anal.length-1].t)+'</b> · notas '+p.anal[p.anal.length-1].np+'%'+(p.anal[p.anal.length-1].pct!=null?' · pulso '+p.anal[p.anal.length-1].pct+'%':'')+'</span>':'')+(p.retos?'<span>🏆 Retos: <b>'+p.retos+'</b> semana'+(p.retos>1?'s':'')+'</span>':'')+'</div>'
  +(p.ubic?'<p class="mute" style="font-size:14px;margin-top:8px">Ubicación: '+esc(CARN[p.ubic.car]||p.ubic.car)+' · Nivel '+p.ubic.nivel+' · Clase '+p.ubic.clase+'</p>':'')
  +(ev.length?'<p style="font-size:14px;margin-top:6px">Última evaluación: mes '+esc(ev[ev.length-1].mes)+' · '+evAvg(ev[ev.length-1]).toFixed(1)+' / 4 ('+ev.length+' en total)</p>':'')
  +(p.cert&&Object.keys(p.cert).length?'<p style="font-size:14px;margin-top:6px">🎓 Certificados: '+Object.values(p.cert).map(x=>esc(CARN[x.car]||x.car)+' · Nivel '+x.nivel+' (<b>'+esc(x.code)+'</b>)').join(', ')+'</p>':'')
  +'<div class="row" style="margin-top:10px;flex-wrap:wrap;gap:8px"><button class="btn m4mini" data-se="'+esc(p._id)+'">📝 Evaluar con la rúbrica</button>'+pfBtn(p._id)+'</div></div>'}).join('');
 v.innerHTML=h}
function segForm(id){const p=PROGS.find(x=>x._id===id);if(!p)return;SEGsel=id;const v=document.getElementById('v-seg'),cars=Object.keys(p.car||{}).concat(Object.values(p.inst||{})).filter((c,i,a)=>c&&CARN[c]&&a.indexOf(c)===i),ev=(EVALS[id]&&EVALS[id].items)||[];
 v.innerHTML='<button class="link" id="se-back" style="font-size:16px;min-height:44px">⬅ Volver al seguimiento</button><h2>Evaluación mensual</h2><p class="mute">'+esc(p.nombre||'Estudiante sin nombre')+'</p>'
 +'<div class="card"><label class="fl">Mes<select class="fi" id="se-mes">'+[1,2,3,4,5,6,7,8,9].map(m=>'<option value="'+m+'">Mes '+m+' · Nivel '+Math.ceil(m/3)+(m%3===0?' · evaluación final':'')+'</option>').join('')+'</select></label>'
 +'<label class="fl">Carrera<select class="fi" id="se-car">'+(cars.length?cars:Object.keys(CARN)).map(c=>'<option value="'+c+'">'+CARN[c]+'</option>').join('')+'</select></label>'
 +RBC.map((c,i)=>'<label class="fl">'+c+'<select class="fi" id="se-r'+i+'">'+[1,2,3,4].map(n=>'<option value="'+n+'"'+(n===3?' selected':'')+'>'+n+' · '+RBN[n]+'</option>').join('')+'</select></label>').join('')
 +'<label class="fl">Comentario para el estudiante<textarea class="fi" id="se-com" rows="3" placeholder="Qué logró y qué debe practicar"></textarea></label>'
 +'<p class="mute" style="font-size:13px;margin-top:8px">Aprueba con un promedio de 3 (Logrado) o más. La evaluación de los meses 3, 6 y 9 es la final del nivel: si la aprueba y terminó las clases, el estudiante puede descargar su certificado.</p><button class="btn" id="se-save" style="margin-top:12px">Guardar evaluación</button></div>'
 +'<div class="card"><h3>Evaluaciones anteriores</h3>'+(ev.length?ev.slice().reverse().map(evCard).join(''):'<p class="mute">Todavía no tiene evaluaciones.</p>')+'</div>'}
async function segSave(){const id=SEGsel;if(!id||!DBS)return;const b=document.getElementById('se-save');b.disabled=true;
 const it={mes:+document.getElementById('se-mes').value,car:document.getElementById('se-car').value,r:RBC.map((_,i)=>+document.getElementById('se-r'+i).value),com:document.getElementById('se-com').value.trim().slice(0,600),fecha:new Date().toISOString()};
 try{const r=DBS.doc('eval/'+id),g=await r.get(),items=((g.exists&&g.data().items)||[]).concat([it]);await r.set({items:items});toast('Evaluación guardada');SEGsel=null;segView()}
 catch(e){b.disabled=false;toast('No se pudo guardar la evaluación')}}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-seg'))return;let b;
 if(b=t.closest('[data-sf]')){SEGfil=b.dataset.sf;return segView()}
 if(b=t.closest('[data-se]'))return segForm(b.dataset.se);
 if(t.closest('#se-back')){SEGsel=null;return segView()}if(t.closest('#se-save'))return segSave()});

/* ---- Materias complementarias sin clases: un solo aviso por nivel ---- */
function segEmpty(L){if(!L.length)return '';
 return '<details class="card sub"><summary><span class="grow">Materias complementarias</span><span class="tag">Se suman por etapas</span></summary><p class="mute" style="font-size:14px;margin:2px 0 8px">La teoría y la lectura de este nivel ya están dentro de las clases de tu instrumento. Estas materias se irán abriendo por etapas:</p><ul style="padding-left:20px;margin:2px 0 12px">'+L.map(t=>'<li style="font-size:15px;margin-top:4px">'+esc(t)+'</li>').join('')+'</ul></details>'}
