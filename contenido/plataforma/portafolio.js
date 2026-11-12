/* ===== Portafolio con entrega de audio o video (Prioridad 2 de la auditoría) =====
   · El estudiante sube un audio o video (capacidad «assets», hasta 20 MB) o pega un enlace.
   · Sus entregas: port/<id> (las escribe el estudiante). Revisión del docente: portc/<id> (la escribe la dirección).
   · Los archivos solo se usan como <audio>/<video>; nunca como código. */
let PFA=null,PFme=null,PFfb=null,PFall={},PFfbAll={},PFsel=null,PFbusy=false,PFtipo='archivo',PFdel=null;
(async()=>{try{if(window.claude&&window.claude.use)PFA=await window.claude.use('assets')}catch(e){PFA=null}
 const w=()=>{if(DBS&&UIDS){DBS.doc('port/'+UIDS).onSnapshot(s=>{PFme=s.exists?s.data():null;pfRefresh()},()=>{});
   DBS.doc('portc/'+UIDS).onSnapshot(s=>{PFfb=s.exists?s.data():null;pfRefresh()},()=>{})}
  else if(SEGst==='espera')setTimeout(w,600)};w()})();
function pfRefresh(){if(visS('v-port')&&!PFbusy){const l=document.getElementById('pf-list');if(l)l.innerHTML=pfList();else pfView()}if(visS('v-perfil'))segPerfil()}
function pfList(){const it=pfIt();return it.length?it.slice().reverse().map(x=>pfEntry(x,PFfb&&PFfb[x.id],true)).join(''):'<p class="mute" style="font-size:15px;margin-top:6px">Todavía no has entregado nada.</p>'}
const pfIt=()=>(PFme&&PFme.items)||[];
const pfMes=m=>'Mes '+m+' · Nivel '+Math.ceil(m/3);
const pfOk=u=>/^https:\/\/[^\s"'<>]+$/.test(u||'');
function pfMedia(x){if(x.tipo==='enlace')return pfOk(x.link)?'<p style="margin-top:8px"><a href="'+esc(x.link)+'" target="_blank" rel="noopener noreferrer" style="color:var(--gold)">🔗 Abrir la grabación</a></p>':'';
 if(!x.asset||!/^[0-9a-f]{32}$/.test(x.asset))return '';const src='/_blob/'+x.asset;
 return (x.tipo==='video'?'<video controls playsinline preload="metadata" src="'+src+'" style="width:100%;max-height:360px;border-radius:10px;background:#000;margin-top:8px"></video>'
  :'<audio controls preload="metadata" src="'+src+'" style="width:100%;margin-top:8px"></audio>')
  +'<p class="mute" style="font-size:12px;margin-top:4px">Si no se reproduce, abre la plataforma con la cuenta de la academia.</p>'}
function pfFb(f){if(!f)return '<p class="mute" style="font-size:14px;margin-top:6px">⏳ Pendiente de revisión del docente.</p>';
 return '<div class="m4key" style="margin-top:8px">'+(f.n?'<b>'+RBN[f.n]+'</b>':'')+(f.com?(f.n?' · ':'')+'«'+esc(f.com)+'»':'')+'<span class="mute" style="font-size:12px;display:block;margin-top:4px">Revisado el '+esc(fdS(f.fecha))+'</span></div>'}
function pfEntry(x,fb,mine){return '<div class="m4row" style="display:block"><div class="row" style="flex-wrap:wrap;gap:8px"><b class="grow">'+esc(x.tit||'Entrega')+'</b><span class="m4st '+(fb?'ok':'wait')+'">'+(fb?'Revisado':'Por revisar')+'</span></div>'
 +'<p class="mute" style="font-size:13px;margin-top:2px">'+(x.tipo==='video'?'🎬 Video':x.tipo==='audio'?'🎧 Audio':'🔗 Enlace')+' · '+esc(CARN[x.car]||x.car||'')+' · '+esc(pfMes(x.mes))+' · '+esc(fdS(x.fecha))+'</p>'
 +pfMedia(x)+(x.nota?'<p style="font-size:14px;margin-top:6px">'+(mine?'Tu nota':'Nota del estudiante')+': «'+esc(x.nota)+'»</p>':'')+pfFb(fb)
 +(mine?'<button class="link" data-pdel="'+esc(x.id)+'" style="font-size:14px;margin-top:6px;color:#ff8a7a">'+(PFdel===x.id?'¿Seguro? Toca otra vez para borrar':'Borrar esta entrega')+'</button>':'')+'</div>'}

/* ---- Perfil: tarjeta ---- */
function pfCard(){const it=pfIt(),rv=it.filter(x=>PFfb&&PFfb[x.id]).length;
 return '<div class="card"><h3>🎬 Mi portafolio</h3><p class="mute" style="font-size:14px;margin:4px 0 10px">Entrega a tu docente el audio o video de lo que practicaste. Tu docente lo escucha y te responde aquí.</p>'
  +(it.length?'<p style="font-size:15px">'+it.length+' entrega'+(it.length>1?'s':'')+' · '+rv+' revisada'+(rv!==1?'s':'')+'</p>':'')
  +'<button class="btn m4mini" data-go="port" style="margin-top:8px">Abrir mi portafolio</button></div>'}

/* ---- Vista del estudiante ---- */
function pfView(){const v=document.getElementById('v-port');if(!v)return;const back='<button class="link" data-go="perfil" style="font-size:16px;min-height:44px">⬅ Volver a mi perfil</button><h2>Mi portafolio</h2>';
 if(!DBS||!UIDS){v.innerHTML=back+'<div class="card"><p>El portafolio necesita tu cuenta. Abre la plataforma con tu cuenta de claude.ai y pide a la academia acceso de Colaborador.</p></div>';return}
 if(!PFA&&PFtipo==='archivo')PFtipo='enlace';const car=cmCar()||'guitarra',it=pfIt();
 let h=back+'<p class="mute">Graba lo que practicaste y entrégalo aquí. Tu docente lo revisa y te deja un comentario.</p><div class="card"><h3>Nueva entrega</h3>'
  +'<label class="fl">Carrera<select class="fi" id="pf-car">'+Object.keys(CARN).filter(k=>AVAIL[k]||k===car).map(k=>'<option value="'+k+'"'+(k===car?' selected':'')+'>'+CARN[k]+'</option>').join('')+'</select></label>'
  +'<label class="fl">Mes<select class="fi" id="pf-mes">'+[1,2,3,4,5,6,7,8,9].map(m=>'<option value="'+m+'"'+(m===Math.min(9,(S.lvl||0)*3+1)?' selected':'')+'>'+pfMes(m)+'</option>').join('')+'</select></label>'
  +'<label class="fl">Qué tocaste<input class="fi" id="pf-tit" maxlength="120" placeholder="Ej.: Clase 8 · Mi primera melodía"></label>'
  +'<div class="chips" role="group" aria-label="Tipo de entrega" style="margin-top:10px"><button class="chip" data-pt="archivo" aria-pressed="'+(PFtipo==='archivo')+'">📎 Subir audio o video</button><button class="chip" data-pt="enlace" aria-pressed="'+(PFtipo==='enlace')+'">🔗 Pegar un enlace</button></div>';
 if(PFtipo==='archivo')h+=PFA?'<label class="fl">Archivo<input class="fi" type="file" id="pf-file" accept="audio/*,video/*,.m4a,.mp3,.mp4,.mov,.webm,.wav,.ogg,.aac"></label><p class="mute" style="font-size:13px;margin-top:4px">Hasta 20 MB: un video de unos 30 a 60 segundos en calidad normal, o varios minutos de audio. Si tu video pesa más, súbelo a YouTube o Drive y pega el enlace.</p>'
   :'<p class="m4key" style="margin-top:10px">Tu acceso todavía no permite subir archivos. Sube la grabación a YouTube (oculto) o a Drive y pega el enlace.</p>';
 else h+='<label class="fl">Enlace<input class="fi" id="pf-link" inputmode="url" placeholder="https://…"></label><p class="mute" style="font-size:13px;margin-top:4px">YouTube (como «oculto»), Google Drive u otro enlace que tu docente pueda abrir.</p>';
 h+='<label class="fl">Nota para tu docente (opcional)<textarea class="fi" id="pf-nota" rows="2" maxlength="400" placeholder="Qué te costó, qué quieres que revise"></textarea></label>'
  +'<button class="btn" id="pf-send" style="margin-top:12px"'+(PFbusy?' disabled':'')+'>Entregar</button><p id="pf-prog" class="mute" style="font-size:14px;margin-top:8px" aria-live="polite"></p></div>'
  +'<div class="card"><h3>Mis entregas</h3><div id="pf-list">'+pfList()+'</div></div>';
 v.innerHTML=h}
const pfMsg=t=>{const p=document.getElementById('pf-prog');if(p)p.textContent=t};
/* Tipos que acepta el almacén: video/mp4 y video/webm. El audio .m4a ya es MP4; otros audios se convierten. */
async function pfPrep(f){const n=(f.name||'').toLowerCase(),t=(f.type||'').toLowerCase();
 if(t==='video/mp4'||t==='video/webm')return{b:f,type:t,k:'video'};
 if(t==='video/quicktime'||/\.mov$/.test(n))return{b:f,type:'video/mp4',k:'video'};
 if(/^audio\/(mp4|x-m4a|m4a)$/.test(t)||/\.m4a$/.test(n))return{b:f,type:'video/mp4',k:'audio'};
 if(t==='audio/webm'||/\.weba$/.test(n))return{b:f,type:'video/webm',k:'audio'};
 if(/^audio\//.test(t)||/\.(mp3|wav|ogg|oga|opus|aac|flac)$/.test(n))return await pfTrans(f);
 throw{code:'formato'}}
async function pfTrans(f){const c=AC();if(c.state==='suspended')await c.resume();let buf;
 try{buf=await c.decodeAudioData(await f.arrayBuffer())}catch(e){throw{code:'formato'}}
 if(buf.duration>300)throw{code:'largo'};
 const mt=window.MediaRecorder&&['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(m=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m));if(!mt)throw{code:'formato'};
 const d=c.createMediaStreamDestination(),s=c.createBufferSource();s.buffer=buf;s.connect(d);const r=new MediaRecorder(d.stream,{mimeType:mt,audioBitsPerSecond:96000}),ch=[];
 r.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};const stop=new Promise(ok=>{r.onstop=ok}),end=new Promise(ok=>{s.onended=ok});
 const T=Math.ceil(buf.duration),t0=c.currentTime,iv=setInterval(()=>pfMsg('Preparando el audio… '+Math.min(T,Math.round(c.currentTime-t0))+' de '+T+' s. No cierres la página.'),1000);
 r.start(1000);s.start();await end;r.stop();await stop;clearInterval(iv);
 const type=mt.indexOf('mp4')>=0?'video/mp4':'video/webm';return{b:new Blob(ch,{type:type}),type:type,k:'audio'}}
async function pfSend(){if(PFbusy||!DBS||!UIDS)return;const g=id=>document.getElementById(id),tit=g('pf-tit').value.trim(),nota=g('pf-nota').value.trim();
 if(!tit){toast('Escribe qué tocaste.');return}
 const it={id:'p'+Date.now().toString(36),car:g('pf-car').value,mes:+g('pf-mes').value,tit:tit.slice(0,120),nota:nota.slice(0,400),fecha:new Date().toISOString()};
 if(PFtipo==='enlace'){const l=g('pf-link').value.trim();if(!pfOk(l)){toast('Pega un enlace completo que empiece con https://');return}it.tipo='enlace';it.link=l.slice(0,500)}
 else{const f=g('pf-file').files&&g('pf-file').files[0];if(!f){toast('Elige el archivo de tu grabación.');return}
  PFbusy=true;g('pf-send').disabled=true;let p;
  try{pfMsg('Preparando el archivo…');p=await pfPrep(f)}
  catch(e){PFbusy=false;g('pf-send').disabled=false;pfMsg('');toast(e&&e.code==='largo'?'El audio dura más de 5 minutos. Corta la parte que quieres que tu docente escuche.':'Ese formato no se puede subir. Usa un video MP4 o un audio M4A o MP3, o pega un enlace.');return}
  if(p.b.size>20*1024*1024){PFbusy=false;g('pf-send').disabled=false;pfMsg('');toast('El archivo pesa más de 20 MB. Graba un fragmento más corto o súbelo a YouTube o Drive y pega el enlace.');return}
  pfMsg('Subiendo… ('+(p.b.size/1048576).toFixed(1)+' MB)');
  try{const r=await PFA.upload(p.b,{type:p.type});it.tipo=p.k;it.asset=r.id;it.ct=r.contentType;it.size=r.sizeBytes}
  catch(e){PFbusy=false;g('pf-send').disabled=false;pfMsg('');const c=e&&e.code;
   toast(c==='too_large'?'El archivo pesa más de 20 MB.':c==='unsupported_type'?'Ese formato no se puede subir. Prueba con MP4 o M4A, o pega un enlace.':c==='quota_or_state'?'El espacio de la academia está lleno. Avísale a tu docente y entrega por enlace.':c==='rate_limited'?'Demasiados intentos seguidos. Espera un momento.':'No se pudo subir el archivo. Inténtalo de nuevo o pega un enlace.');return}}
 PFbusy=true;try{const ref=DBS.doc('port/'+UIDS),d=await ref.get(),items=((d.exists&&d.data().items)||[]).concat([it]);await ref.set({items:items});PFme={items:items};toast('¡Entregado! Tu docente lo verá en el seguimiento.')}
 catch(e){toast('No se pudo guardar la entrega. Revisa tu acceso de Colaborador.')}
 PFbusy=false;pfView()}
async function pfBorrar(id){if(PFdel!==id){PFdel=id;return pfView()}PFdel=null;const x=pfIt().find(y=>y.id===id);if(!x)return;
 try{const ref=DBS.doc('port/'+UIDS),d=await ref.get(),items=((d.exists&&d.data().items)||[]).filter(y=>y.id!==id);await ref.set({items:items});PFme={items:items};
  if(x.asset&&PFA){try{await PFA.delete(x.asset)}catch(e){}}toast('Entrega borrada')}catch(e){toast('No se pudo borrar la entrega')}pfView()}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-port'))return;let b;
 if(b=t.closest('[data-pt]')){PFtipo=b.dataset.pt;return pfView()}
 if(t.closest('#pf-send'))return pfSend();if(b=t.closest('[data-pdel]'))return pfBorrar(b.dataset.pdel)});

/* ---- Seguimiento: portafolio de cada estudiante ---- */
function pfSubAll(){DBS.collection('port').onSnapshot(s=>{PFall={};s.docs.forEach(d=>{PFall[d.id]=d.data()});pfSegRefresh()},()=>{});
 DBS.collection('portc').onSnapshot(s=>{PFfbAll={};s.docs.forEach(d=>{PFfbAll[d.id]=d.data()});pfSegRefresh()},()=>{})}
function pfSegRefresh(){if(!visS('v-seg'))return;if(PFsel)pfSeg(PFsel);else if(!SEGsel)segView()}
function pfBtn(id){const it=(PFall[id]&&PFall[id].items)||[];if(!it.length)return '';const fb=PFfbAll[id]||{},pend=it.filter(x=>!fb[x.id]).length;
 return '<button class="btn ghost m4mini" data-pv="'+esc(id)+'">🎬 Portafolio · '+it.length+(pend?' ('+pend+' por revisar)':'')+'</button>'}
function pfSeg(id){const p=PROGS.find(x=>x._id===id)||{nombre:''};PFsel=id;SEGsel=id;const it=(PFall[id]&&PFall[id].items)||[],fb=PFfbAll[id]||{},v=document.getElementById('v-seg');
 v.innerHTML='<button class="link" id="pf-back" style="font-size:16px;min-height:44px">⬅ Volver al seguimiento</button><h2>Portafolio</h2><p class="mute">'+esc(p.nombre||'Estudiante sin nombre')+'</p>'
  +(it.length?it.slice().reverse().map(x=>'<div class="card">'+pfEntry(x,fb[x.id],false)
   +'<label class="fl">Resultado<select class="fi" id="pfn-'+esc(x.id)+'"><option value="0">Sin nota</option>'+[1,2,3,4].map(n=>'<option value="'+n+'"'+((fb[x.id]&&fb[x.id].n)===n?' selected':'')+'>'+n+' · '+RBN[n]+'</option>').join('')+'</select></label>'
   +'<label class="fl">Comentario<textarea class="fi" id="pfc-'+esc(x.id)+'" rows="2" maxlength="600" placeholder="Un logro, una corrección y la meta siguiente">'+esc((fb[x.id]&&fb[x.id].com)||'')+'</textarea></label>'
   +'<button class="btn m4mini" data-pfb="'+esc(x.id)+'" style="margin-top:8px">'+(fb[x.id]?'Actualizar la revisión':'Guardar la revisión')+'</button></div>').join('')
  :'<div class="card"><p class="mute">Todavía no hay entregas.</p></div>')}
async function pfSave(item){const id=PFsel;if(!id||!DBS)return;const n=+document.getElementById('pfn-'+item).value,com=document.getElementById('pfc-'+item).value.trim().slice(0,600);
 if(!n&&!com){toast('Escribe un comentario o elige un resultado.');return}
 try{const ref=DBS.doc('portc/'+id),d=await ref.get(),o=(d.exists&&d.data())||{};o[item]={n:n,com:com,fecha:new Date().toISOString()};await ref.set(o);PFfbAll[id]=o;toast('Revisión guardada');pfSeg(id)}
 catch(e){toast('No se pudo guardar la revisión')}}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest||!t.closest('#v-seg'))return;let b;
 if(b=t.closest('[data-pv]'))return pfSeg(b.dataset.pv);
 if(t.closest('#pf-back')){PFsel=null;SEGsel=null;return segView()}
 if(b=t.closest('[data-pfb]'))return pfSave(b.dataset.pfb)});
