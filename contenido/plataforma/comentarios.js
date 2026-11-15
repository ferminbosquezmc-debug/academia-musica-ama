/* ===== Comentarios del piloto (estrategia de pruebas con estudiantes) =====
   · Botón 💬 en todas las pantallas: tipo (falla, no entendí, idea, me gustó), texto, imagen opcional.
     La plataforma anota sola la pantalla, la carrera, el nivel y la clase.
   · Mini-encuesta semanal (viernes a domingo) en Inicio: facilidad 1–5, lo mejor y lo que frustró.
   · Base de datos: opi/<id> (lo escribe el estudiante) y opir/<id> (respuesta y estado, lo escribe la dirección).
   · Panel «Comentarios del piloto» para la dirección: filtros, estados y respuesta al estudiante. */
const OPT=[['falla','🐞','Algo falla'],['confuso','😕','No entendí'],['idea','💡','Tengo una idea'],['gusto','❤️','Me gustó']];
const OPE=[['nuevo','Nuevo'],['revision','En revisión'],['resuelto','Resuelto'],['descartado','No se hará']];
let OPme=null,OPres=null,OPall={},OPrAll={},OPsub=false,OPtipo='falla',OPfil={car:'',tipo:'',est:''},OPbusy=false;
(function(){const w=()=>{if(DBS&&UIDS){DBS.doc('opi/'+UIDS).onSnapshot(s=>{OPme=s.exists?s.data():null;opRefresh()},()=>{});
  DBS.doc('opir/'+UIDS).onSnapshot(s=>{OPres=s.exists?s.data():null;opRefresh()},()=>{})}
 else if(SEGst==='espera')setTimeout(w,700)};setTimeout(w,300)})();
function opRefresh(){if(visS('v-perfil'))segPerfil();if(visS('v-home')&&typeof segHome==='function')segHome()}
const opIt=()=>(OPme&&OPme.items)||[];
function opCtx(){const v=document.querySelector('section.view:not([hidden])'),vid=v?v.id.replace(/^v-/,''):'',car=(typeof cmCar==='function'&&cmCar())||'';const o={vista:vid,car:car,nivel:(S.lvl||0)+1,ancho:innerWidth};
 if(vid==='leccion'&&S.cur&&LD[S.cur]){o.clase=LD[S.cur].u+' · '+LD[S.cur].t;o.paso=((S.ls&&S.ls[S.cur]&&S.ls[S.cur].step)||0)+1;o.k=S.cur}return o}
const OPV={home:'Inicio',clases:'Clases',leccion:'Clase',practica:'Práctica',biblioteca:'Biblioteca',perfil:'Perfil',lab:'Laboratorio de oído',pistas:'Pistas',score:'Partituras',port:'Portafolio',ubic:'Prueba de ubicación',seg:'Seguimiento',guia:'Guía del docente',n4:'Nivel 4',ninos:'Zona Exploradores',cabina:'Cabina',asig:'Audio Técnica'};
const opDonde=c=>[OPV[c.vista]||c.vista,c.car?CARN[c.car]||c.car:'',c.clase?c.clase+(c.paso?' (paso '+c.paso+')':''):''].filter(Boolean).join(' · ');
/* ---- Botón y hoja para escribir ---- */
(function(){const b=document.createElement('button');b.id='opi-fab';b.type='button';b.setAttribute('aria-label','Enviar un comentario sobre la plataforma');b.textContent='💬';
 b.style.cssText='position:fixed;right:14px;bottom:146px;width:52px;height:52px;border-radius:50%;background:var(--card,#13110d);color:var(--gold,#f2a31b);border:2px solid var(--gold,#f2a31b);font:400 24px/1 Jost,sans-serif;z-index:25;box-shadow:0 4px 16px rgba(0,0,0,.5)';
 document.body.appendChild(b);const s=document.createElement('div');s.id='opi';s.hidden=true;s.setAttribute('role','dialog');s.setAttribute('aria-modal','true');s.setAttribute('aria-label','Enviar un comentario');
 s.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:50;display:flex;align-items:flex-end;justify-content:center';document.body.appendChild(s)})();
function opOpen(tipo){const s=document.getElementById('opi');if(tipo)OPtipo=tipo;const c=opCtx();s.dataset.ctx=JSON.stringify(c);
 const ok=DBS&&UIDS;let h='<div class="sheet" style="background:var(--card);border:1px solid var(--gold);border-radius:20px 20px 0 0;max-width:720px;width:100%;max-height:90vh;overflow:auto;padding:20px 18px 28px">'
  +'<div class="row" style="gap:8px"><h3 class="grow">💬 Tu comentario</h3><button class="link" id="opi-x" aria-label="Cerrar">Cerrar ✕</button></div>'
  +'<p class="mute" style="font-size:14px;margin-top:4px">Nos ayudas a mejorar la academia. Se anota solo dónde estás: <b>'+esc(opDonde(c))+'</b>.</p>';
 if(!ok)h+='<p class="m4key" style="margin-top:12px">Para enviar comentarios abre la plataforma con tu cuenta de claude.ai (acceso de Colaborador). Mientras tanto, cuéntaselo a tu docente.</p>';
 else h+='<div class="chips" role="group" aria-label="Tipo de comentario" style="margin-top:10px;flex-wrap:wrap">'+OPT.map(x=>'<button class="chip" data-opt="'+x[0]+'" aria-pressed="'+(OPtipo===x[0])+'">'+x[1]+' '+x[2]+'</button>').join('')+'</div>'
  +'<label class="fl">'+({falla:'¿Qué pasó? ¿Qué esperabas que pasara?',confuso:'¿Qué parte no entendiste?',idea:'¿Qué te gustaría que tuviera o que cambiara?',gusto:'¿Qué te gustó?'}[OPtipo])+'<textarea class="fi" id="opi-t" rows="4" maxlength="1500" style="min-height:110px"></textarea></label>'
  +(PFA?'<label class="fl">Imagen o captura de pantalla (opcional)<input class="fi" type="file" id="opi-img" accept="image/png,image/jpeg,image/webp,image/gif"></label>':'')
  +'<button class="btn" id="opi-send" style="margin-top:14px;width:100%"'+(OPbusy?' disabled':'')+'>Enviar comentario</button><p id="opi-msg" class="mute" style="font-size:14px;margin-top:8px" aria-live="polite"></p>';
 s.innerHTML=h+'</div>';s.hidden=false;const tx=document.getElementById('opi-t');if(tx)tx.focus()}
function opClose(){const s=document.getElementById('opi');if(s)s.hidden=true}
async function opSave(item){const ref=DBS.doc('opi/'+UIDS),d=await ref.get(),items=((d.exists&&d.data().items)||[]).concat([item]).slice(-300);await ref.set({items:items});OPme={items:items}}
async function opSend(){if(OPbusy||!DBS||!UIDS)return;const tx=document.getElementById('opi-t'),t=(tx.value||'').trim(),msg=m=>{const e=document.getElementById('opi-msg');if(e)e.textContent=m};
 if(t.length<3){msg('Escribe tu comentario.');return}OPbusy=true;document.getElementById('opi-send').disabled=true;
 const it={id:'o'+Date.now().toString(36),tipo:OPtipo,txt:t.slice(0,1500),ctx:JSON.parse(document.getElementById('opi').dataset.ctx||'{}'),nombre:S.name||'',fecha:new Date().toISOString()};
 const f=document.getElementById('opi-img')&&document.getElementById('opi-img').files[0];
 try{if(f&&PFA){if(f.size>8*1024*1024){msg('La imagen pesa más de 8 MB. Envía el comentario sin ella o con una más pequeña.');OPbusy=false;document.getElementById('opi-send').disabled=false;return}
   msg('Subiendo la imagen…');const r=await PFA.upload(f,{type:/^image\/(png|jpeg|webp|gif)$/.test(f.type)?f.type:'image/png'});it.img=r.id}
  msg('Enviando…');await opSave(it);opClose();toast('¡Gracias! Tu comentario llegó a la academia.')}
 catch(e){msg('No se pudo enviar. Revisa tu conexión y tu acceso de Colaborador, e inténtalo otra vez.');document.getElementById('opi-send').disabled=false}
 OPbusy=false}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;let b;
 if(t.closest('#opi-fab'))return opOpen();
 if(!t.closest('#opi'))return;if(t.id==='opi'||t.closest('#opi-x'))return opClose();
 if(b=t.closest('[data-opt]')){const tx=document.getElementById('opi-t'),keep=tx?tx.value:'';opOpen(b.dataset.opt);const n=document.getElementById('opi-t');if(n)n.value=keep;return}
 if(t.closest('#opi-send'))return opSend()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('opi').hidden)opClose()});
/* ---- Mini-encuesta semanal (Inicio, de viernes a domingo) ---- */
const opWk=()=>typeof rtKey==='function'?rtKey():dkey(new Date());
function opSurveyCard(){if(!DBS||!UIDS)return '';const d=new Date().getDay();if(d!==5&&d!==6&&d!==0)return '';const wk=opWk();if(opIt().some(x=>x.tipo==='encuesta'&&x.wk===wk))return '';
 return '<div class="card" id="opi-enc" style="border-color:var(--gold)"><h3>📝 Tu semana en la academia</h3><p class="mute" style="font-size:14px;margin:4px 0 8px">Tres preguntas rápidas para mejorar la plataforma.</p>'
  +'<p style="font-size:15px">¿Qué tan fácil fue usarla esta semana?</p><div class="chips" role="group" aria-label="Facilidad" style="flex-wrap:wrap">'+[1,2,3,4,5].map(n=>'<button class="chip" data-opn="'+n+'" aria-pressed="false">'+n+(n===1?' · muy difícil':n===5?' · muy fácil':'')+'</button>').join('')+'</div>'
  +'<label class="fl">¿Qué te gustó más?<textarea class="fi" id="opi-e1" rows="2" maxlength="600"></textarea></label><label class="fl">¿Qué te frustró o te costó?<textarea class="fi" id="opi-e2" rows="2" maxlength="600"></textarea></label>'
  +'<button class="btn" id="opi-esend" style="margin-top:12px">Enviar</button></div>'}
document.addEventListener('click',async e=>{const t=e.target;if(!t.closest||!t.closest('#opi-enc'))return;let b;
 if(b=t.closest('[data-opn]')){t.closest('#opi-enc').querySelectorAll('[data-opn]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));return}
 if(t.closest('#opi-esend')){const c=t.closest('#opi-enc'),sel=c.querySelector('[data-opn][aria-pressed="true"]');if(!sel){toast('Elige un número del 1 al 5.');return}
  const it={id:'e'+Date.now().toString(36),tipo:'encuesta',wk:opWk(),facil:+sel.dataset.opn,mejor:document.getElementById('opi-e1').value.trim().slice(0,600),frustro:document.getElementById('opi-e2').value.trim().slice(0,600),ctx:{car:(typeof cmCar==='function'&&cmCar())||'',nivel:(S.lvl||0)+1},nombre:S.name||'',fecha:new Date().toISOString()};
  t.closest('#opi-esend').disabled=true;try{await opSave(it);toast('¡Gracias por contarnos tu semana!');c.remove()}catch(err){toast('No se pudo enviar la encuesta.');t.closest('#opi-esend').disabled=false}}});
/* ---- Perfil: mis comentarios y sus respuestas ---- */
const opTipo=k=>(OPT.find(x=>x[0]===k)||['','📝','Encuesta semanal']);
function opCard(){const it=opIt().filter(x=>x.tipo!=='encuesta');const r=OPres||{};
 return '<div class="card"><div class="row" style="gap:8px;flex-wrap:wrap"><h3 class="grow">💬 Mis comentarios</h3><button class="btn m4mini" id="opi-new">Escribir uno</button></div>'
  +(it.length?it.slice(-8).reverse().map(x=>{const a=r[x.id]||{},ty=opTipo(x.tipo),est=OPE.find(z=>z[0]===(a.est||'nuevo'))[1];
   return '<div class="m4row" style="display:block"><div class="row" style="gap:8px;flex-wrap:wrap"><b class="grow">'+ty[1]+' '+ty[2]+'</b><span class="m4st '+(a.est==='resuelto'?'ok':'wait')+'">'+est+'</span></div>'
    +'<p style="font-size:14px;margin-top:4px">«'+esc(x.txt.length>160?x.txt.slice(0,160)+'…':x.txt)+'»</p>'+(a.resp?'<p class="m4key" style="margin-top:6px">'+esc(a.resp)+'</p>':'')
    +'<p class="mute" style="font-size:12px;margin-top:4px">'+esc(fdS(x.fecha))+' · '+esc(opDonde(x.ctx||{}))+'</p></div>'}).join('')
  :'<p class="mute" style="font-size:15px;margin-top:6px">Toca el botón 💬 en cualquier pantalla para contarnos un error, una duda o una idea.</p>')+'</div>'}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#opi-new'))opOpen()});
/* ---- Panel de la dirección ---- */
function opSubAll(){if(OPsub||!DBS)return;OPsub=true;
 DBS.collection('opi').onSnapshot(s=>{OPall={};s.docs.forEach(d=>{OPall[d.id]=d.data()});if(visS('v-opi'))opView()},()=>toast('No se pudieron leer los comentarios'));
 DBS.collection('opir').onSnapshot(s=>{OPrAll={};s.docs.forEach(d=>{OPrAll[d.id]=d.data()});if(visS('v-opi'))opView()},()=>{})}
function opView(){const v=document.getElementById('v-opi');if(!v)return;const back='<button class="link" data-go="home" style="font-size:16px;min-height:44px">⬅ Volver a Inicio</button><h2>Comentarios del piloto</h2>';
 if(!ADMS||!DBS){v.innerHTML=back+'<div class="card"><p>Solo la dirección y el equipo docente con acceso de Editor ven los comentarios.</p></div>';return}
 opSubAll();const L=[];Object.keys(OPall).forEach(u=>((OPall[u]||{}).items||[]).forEach(x=>L.push(Object.assign({uid:u},x))));L.sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha)));
 const st=x=>((OPrAll[x.uid]||{})[x.id]||{}).est||'nuevo',C=L.filter(x=>x.tipo!=='encuesta'),E=L.filter(x=>x.tipo==='encuesta');
 const vis=C.filter(x=>(!OPfil.car||(x.ctx||{}).car===OPfil.car)&&(!OPfil.tipo||x.tipo===OPfil.tipo)&&(!OPfil.est||st(x)===OPfil.est));
 const avg=E.length?(E.reduce((a,x)=>a+(+x.facil||0),0)/E.length).toFixed(1):'—';
 let h=back+'<p class="mute">Lo que escriben los estudiantes del piloto con el botón 💬 y en la encuesta semanal.</p>'
  +'<div class="m4facts">'+OPT.map(x=>'<div><b>'+C.filter(y=>y.tipo===x[0]).length+'</b><span>'+x[1]+' '+x[2]+'</span></div>').join('')+'<div><b>'+C.filter(x=>st(x)==='nuevo').length+'</b><span>Sin revisar</span></div><div><b>'+avg+' / 5</b><span>Facilidad promedio ('+E.length+' encuestas)</span></div></div>'
  +'<div class="card"><label class="fl" style="margin-top:0">Carrera<select class="fi" data-opf="car"><option value="">Todas</option>'+Object.keys(CARN).map(k=>'<option value="'+k+'"'+(OPfil.car===k?' selected':'')+'>'+CARN[k]+'</option>').join('')+'</select></label>'
  +'<label class="fl">Tipo<select class="fi" data-opf="tipo"><option value="">Todos</option>'+OPT.map(x=>'<option value="'+x[0]+'"'+(OPfil.tipo===x[0]?' selected':'')+'>'+x[1]+' '+x[2]+'</option>').join('')+'</select></label>'
  +'<label class="fl">Estado<select class="fi" data-opf="est"><option value="">Todos</option>'+OPE.map(x=>'<option value="'+x[0]+'"'+(OPfil.est===x[0]?' selected':'')+'>'+x[1]+'</option>').join('')+'</select></label></div>';
 h+=vis.length?vis.map(x=>{const a=(OPrAll[x.uid]||{})[x.id]||{},ty=opTipo(x.tipo),id=esc(x.uid)+':'+esc(x.id);
  return '<div class="card"><div class="row" style="gap:8px;flex-wrap:wrap"><b class="grow">'+ty[1]+' '+ty[2]+' · '+esc(x.nombre||'Estudiante sin nombre')+'</b><span class="m4st '+(st(x)==='resuelto'?'ok':'wait')+'">'+OPE.find(z=>z[0]===st(x))[1]+'</span></div>'
   +'<p class="mute" style="font-size:13px;margin-top:2px">'+esc(fdS(x.fecha))+' · '+esc(opDonde(x.ctx||{}))+(x.ctx&&x.ctx.nivel?' · Nivel '+x.ctx.nivel:'')+(x.ctx&&x.ctx.ancho?' · pantalla de '+x.ctx.ancho+' px':'')+'</p>'
   +'<p style="margin-top:8px;white-space:pre-wrap">'+esc(x.txt)+'</p>'
   +(x.img&&/^[0-9a-f]{32}$/.test(x.img)?'<a href="/_blob/'+x.img+'" target="_blank" rel="noopener"><img src="/_blob/'+x.img+'" alt="Imagen adjunta" style="max-width:100%;max-height:260px;border-radius:10px;margin-top:8px;background:#fff"></a>':'')
   +(x.ctx&&x.ctx.k&&LD[x.ctx.k]?'<div style="margin-top:8px"><button class="btn ghost m4mini" data-opk="'+esc(x.ctx.k)+'">Abrir esa clase</button></div>':'')
   +'<label class="fl">Estado<select class="fi" id="ope-'+id+'">'+OPE.map(z=>'<option value="'+z[0]+'"'+(st(x)===z[0]?' selected':'')+'>'+z[1]+'</option>').join('')+'</select></label>'
   +'<label class="fl">Respuesta para el estudiante (opcional)<textarea class="fi" id="opr-'+id+'" rows="2" maxlength="600" placeholder="Por ejemplo: «Lo corregimos, ¡gracias por avisar!»">'+esc(a.resp||'')+'</textarea></label>'
   +'<button class="btn m4mini" data-ops="'+id+'" style="margin-top:8px">Guardar</button></div>'}).join(''):'<div class="card"><p class="mute">'+(C.length?'No hay comentarios con esos filtros.':'Todavía no hay comentarios. Aparecen aquí cuando un estudiante con acceso de Colaborador usa el botón 💬.')+'</p></div>';
 if(E.length)h+='<div class="card"><h3>📝 Encuestas semanales</h3>'+E.slice(0,30).map(x=>'<div class="m4row" style="display:block"><div class="row" style="gap:8px;flex-wrap:wrap"><b class="grow">'+esc(x.nombre||'Estudiante')+' · '+esc((x.ctx&&CARN[x.ctx.car])||'')+'</b><span class="m4st '+(x.facil>=4?'ok':'wait')+'">Facilidad '+x.facil+' / 5</span></div>'
  +(x.mejor?'<p style="font-size:14px;margin-top:4px">❤️ '+esc(x.mejor)+'</p>':'')+(x.frustro?'<p style="font-size:14px;margin-top:4px">😕 '+esc(x.frustro)+'</p>':'')+'<p class="mute" style="font-size:12px;margin-top:4px">'+esc(fdS(x.fecha))+'</p></div>').join('')+'</div>';
 v.innerHTML=h}
async function opResp(key){const [uid,id]=key.split(':');const est=document.getElementById('ope-'+key).value,resp=document.getElementById('opr-'+key).value.trim().slice(0,600);
 try{const ref=DBS.doc('opir/'+uid),d=await ref.get(),o=(d.exists&&d.data())||{};o[id]={est:est,resp:resp,fecha:new Date().toISOString()};await ref.set(o);OPrAll[uid]=o;toast('Guardado');opView()}catch(e){toast('No se pudo guardar')}}
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('[data-opf]');if(s){OPfil[s.dataset.opf]=s.value;opView()}});
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-opi'))return;let b;
 if(b=t.closest('[data-ops]'))return opResp(b.dataset.ops);
 if(b=t.closest('[data-opk]')){S.cur=b.dataset.opk;go('leccion')}});
