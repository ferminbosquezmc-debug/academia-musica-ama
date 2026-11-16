/* ===== Arpi anima al estudiante: porras y confeti cuando aprueba, cara triste y ánimo cuando falla ===== */
const ARPI_OK=['¡Bravo!','¡Excelente!','¡Así se hace!','¡Qué bien lo hiciste!'],ARPI_MED=['¡Bien!','¡Vas muy bien!'],ARPI_NO=['¡Ánimo!','No pasa nada.','¡Tú puedes!'];
function arpiCheer(l,msg){let o=document.getElementById('arpi-ov');if(o)o.remove();const P=l===2?ARPI_OK:l===1?ARPI_MED:ARPI_NO;
 o=document.createElement('div');o.id='arpi-ov';o.setAttribute('role','status');
 o.innerHTML='<div class="jg-arpi '+(l?'hop':'shake')+'">'+arpiSvg(l===2?'wow':l===1?'':'sad')+'</div><p class="jg-bub"><b>'+P[Math.floor(Math.random()*P.length)]+'</b> '+msg+'</p><button class="link" data-arpix aria-label="Cerrar" style="align-self:flex-start;min-height:36px;padding:4px 6px">✕</button>';
 document.body.append(o);if(l===2)party();clearTimeout(arpiCheer.t);arpiCheer.t=setTimeout(()=>{const x=document.getElementById('arpi-ov');if(x)x.remove()},l===0?6000:4500)}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-arpix]')){const o=document.getElementById('arpi-ov');if(o)o.remove()}});
/* ===== Seguimiento: resultados de los juegos y prácticas que marcó el estudiante, para que el docente las verifique ===== */
function segJuegos(p){let h='';if(p.gd&&p.gd.fin)h+='<span>🔢 Grados: <b>'+p.gd.fin.ok+'/'+p.gd.fin.tot+'</b>'+(p.gd.hist&&p.gd.hist.length>1?' ('+p.gd.hist.length+' rondas)':'')+'</span>';
 if(p.qs&&p.qs.best!=null)h+='<span>🎧 ¿Qué suena?: <b>'+p.qs.best+'/5</b></span>';return h}
function segPend(p){const V=(EVALS[p._id]&&EVALS[p._id].ver)||{};return (p.chk||[]).filter(c=>!V[c.k]).length}
function segChkBtn(p){const n=(p.chk||[]).length;if(!n)return '';const pe=segPend(p);return '<button class="btn ghost m4mini" data-sv="'+esc(p._id)+'">✅ Prácticas marcadas'+(pe?' · <b>'+pe+' por verificar</b>':' · todas verificadas')+'</button>'}
function segChkView(id){const p=PROGS.find(x=>x._id===id);if(!p)return;SEGsel=id;const v=document.getElementById('v-seg'),V=(EVALS[id]&&EVALS[id].ver)||{},G={};
 (p.chk||[]).forEach(c=>{const K=c.k.split('|')[0];(G[K]=G[K]||[]).push(c)});
 let h='<button class="link" id="se-back" style="font-size:16px;min-height:44px">⬅ Volver al seguimiento</button><h2>Prácticas marcadas</h2><p class="mute">'+esc(p.nombre||'Estudiante sin nombre')+' · Pídele que te muestre cada práctica (en clase o por video) y verifícala aquí. El estudiante ve «✔ verificado por tu docente».</p>'
  +(p.gd&&p.gd.fin?'<div class="card"><h3>🔢 Juego de los grados</h3><p style="margin-top:6px">Última ronda: <b>'+p.gd.fin.ok+' de '+p.gd.fin.tot+'</b> · '+esc(fdS(p.gd.fin.fecha))+'</p>'+(p.gd.hist&&p.gd.hist.length?'<p class="mute" style="font-size:14px">Rondas: '+p.gd.hist.map(x=>x.ok+'/'+x.tot).join(' · ')+'</p>':'')+'</div>':'');
 const ks=Object.keys(G);
 h+=ks.length?ks.map(K=>'<div class="card"><h3>'+esc(LD[K]?LD[K].t:K)+'</h3>'+G[K].map(c=>'<div class="m4row"><span>'+(V[c.k]?'✔ ':'☐ ')+esc(c.t||'Práctica')+'<small class="mute" style="display:block">Marcada el '+esc(fdS(c.f))+'</small></span><button class="btn m4mini'+(V[c.k]?' ghost':'')+'" data-svk="'+esc(c.k)+'">'+(V[c.k]?'Quitar verificación':'Verificar')+'</button></div>').join('')+'</div>').join(''):'<div class="card"><p class="mute">Todavía no ha marcado prácticas.</p></div>';
 v.innerHTML=h;window.scrollTo(0,0)}
async function segChkTog(k){const id=SEGsel;if(!id||!DBS)return;try{const r=DBS.doc('eval/'+id),g=await r.get(),d=g.exists?(g.data()||{}):{};d.ver=d.ver||{};if(d.ver[k])delete d.ver[k];else d.ver[k]=new Date().toISOString();await r.set(d);EVALS[id]=d;segChkView(id);toast('Guardado')}catch(e){toast('No se pudo guardar la verificación')}}
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;let b;if(b=t.closest('[data-sv]'))return segChkView(b.dataset.sv);if(b=t.closest('[data-svk]'))return segChkTog(b.dataset.svk)});
