/* ===== Lo que el estudiante marca queda guardado al volver: «¿Qué suena?», las casillas ☐ de las clases
   y las respuestas de la prueba de ubicación (aunque salga a mitad).
   Las casillas guardan su texto (S.chk[clave] = {t, f}) para que el docente las verifique en Seguimiento. ===== */
function memRestore(K,st){const root=document.getElementById('lec-body');if(!root)return;S.chk=S.chk||{};const V=(EVme&&EVme.ver)||{};
 root.querySelectorAll('.gbx').forEach((x,i)=>{const k=K+'|'+st+'|'+i,on=!!S.chk[k];x.dataset.ck=k;x.removeAttribute('aria-hidden');x.setAttribute('role','checkbox');x.setAttribute('tabindex','0');x.setAttribute('aria-checked',String(on));x.setAttribute('aria-label','Marcar como hecho');x.style.cursor='pointer';x.textContent=on?'✅':'☐';
  if(V[k]&&on)x.insertAdjacentHTML('afterend','<span class="tag" style="margin:0 6px;color:#5fbf7a;border-color:#5fbf7a">✔ verificado por tu docente</span>')});
 qsRestore(root)}
function qsRestore(root){const sel=S.qs&&S.qs.sel;if(!sel||!root.querySelector('[data-qsr]'))return;
 root.querySelectorAll('[data-qsr]').forEach(x=>{x.checked=!!sel[x.dataset.qsr+x.dataset.qsk]});if(S.qs.shown){qsRev.q=1;qsRev();qsRev.q=0}}
function gbxTxt(x){const li=x.closest('li,p,label,div');let s=li?li.textContent:'';return s.replace(/[☐✅]/g,'').replace(/✔ verificado por tu docente/g,'').replace(/\s+/g,' ').trim().slice(0,160)}
function gbxTog(x){S.chk=S.chk||{};const on=!S.chk[x.dataset.ck];if(on)S.chk[x.dataset.ck]={t:gbxTxt(x),f:new Date().toISOString()};else delete S.chk[x.dataset.ck];x.textContent=on?'✅':'☐';x.setAttribute('aria-checked',String(on));save()}
const chkSum=()=>Object.keys(S.chk||{}).map(k=>{const v=S.chk[k];return{k:k,t:(v&&v.t)||'',f:(v&&v.f)||''}}).slice(-300);
document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('.gbx[data-ck]');if(x)gbxTog(x)});
document.addEventListener('keydown',e=>{const x=e.target.closest&&e.target.closest('.gbx[data-ck]');if(x&&(e.key==='Enter'||e.key===' ')){e.preventDefault();gbxTog(x)}});
document.addEventListener('change',e=>{const x=e.target;if(!x.dataset)return;
 if(x.dataset.qsr!==undefined){S.qs=S.qs||{best:0,last:0};S.qs.sel=S.qs.sel||{};const k=x.dataset.qsr+x.dataset.qsk;if(x.checked)S.qs.sel[k]=1;else delete S.qs.sel[k];save();return}
 const v=document.getElementById('v-ubic');if(v&&v.contains(x)){S.ubq=S.ubq||{q:{},ua:{}};
  if(x.name&&/^uq\d+$/.test(x.name))S.ubq.q[x.name]=x.value;else if(x.dataset.ua!==undefined){S.ubq.car=v.dataset.car;S.ubq.ua={};v.querySelectorAll('[data-ua]').forEach(c=>{if(c.checked)S.ubq.ua[c.dataset.ua]=1})}save()}});
function ubRest(){const v=document.getElementById('v-ubic'),U=S.ubq;if(!v||!U)return;
 Object.keys(U.q||{}).forEach(n=>{const r=v.querySelector('input[name="'+n+'"][value="'+U.q[n]+'"]');if(r)r.checked=true});
 if(U.car===v.dataset.car)v.querySelectorAll('[data-ua]').forEach(c=>{c.checked=!!(U.ua||{})[c.dataset.ua]})}
