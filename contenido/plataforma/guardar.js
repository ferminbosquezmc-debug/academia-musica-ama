/* ===== Lo que el estudiante marca queda guardado al volver: «¿Qué suena?», las casillas ☐ de las clases
   y las respuestas de la prueba de ubicación (aunque salga a mitad). ===== */
function memRestore(K,st){const root=document.getElementById('lec-body');if(!root)return;S.chk=S.chk||{};
 root.querySelectorAll('.gbx').forEach((x,i)=>{const k=K+'|'+st+'|'+i,on=!!S.chk[k];x.dataset.ck=k;x.removeAttribute('aria-hidden');x.setAttribute('role','checkbox');x.setAttribute('tabindex','0');x.setAttribute('aria-checked',String(on));x.setAttribute('aria-label','Marcar como hecho');x.style.cursor='pointer';x.textContent=on?'✅':'☐'});
 qsRestore(root)}
function qsRestore(root){const sel=S.qs&&S.qs.sel;if(!sel||!root.querySelector('[data-qsr]'))return;
 root.querySelectorAll('[data-qsr]').forEach(x=>{x.checked=!!sel[x.dataset.qsr+x.dataset.qsk]});if(S.qs.shown)qsRev()}
function gbxTog(x){S.chk=S.chk||{};const on=!S.chk[x.dataset.ck];if(on)S.chk[x.dataset.ck]=1;else delete S.chk[x.dataset.ck];x.textContent=on?'✅':'☐';x.setAttribute('aria-checked',String(on));save()}
document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('.gbx[data-ck]');if(x)gbxTog(x)});
document.addEventListener('keydown',e=>{const x=e.target.closest&&e.target.closest('.gbx[data-ck]');if(x&&(e.key==='Enter'||e.key===' ')){e.preventDefault();gbxTog(x)}});
document.addEventListener('change',e=>{const x=e.target;if(!x.dataset)return;
 if(x.dataset.qsr!==undefined){S.qs=S.qs||{best:0,last:0};S.qs.sel=S.qs.sel||{};const k=x.dataset.qsr+x.dataset.qsk;if(x.checked)S.qs.sel[k]=1;else delete S.qs.sel[k];save();return}
 const v=document.getElementById('v-ubic');if(v&&v.contains(x)){S.ubq=S.ubq||{q:{},ua:{}};
  if(x.name&&/^uq\d+$/.test(x.name))S.ubq.q[x.name]=x.value;else if(x.dataset.ua!==undefined){S.ubq.car=v.dataset.car;S.ubq.ua={};v.querySelectorAll('[data-ua]').forEach(c=>{if(c.checked)S.ubq.ua[c.dataset.ua]=1})}save()}});
function ubRest(){const v=document.getElementById('v-ubic'),U=S.ubq;if(!v||!U)return;
 Object.keys(U.q||{}).forEach(n=>{const r=v.querySelector('input[name="'+n+'"][value="'+U.q[n]+'"]');if(r)r.checked=true});
 if(U.car===v.dataset.car)v.querySelectorAll('[data-ua]').forEach(c=>{c.checked=!!(U.ua||{})[c.dataset.ua]})}
