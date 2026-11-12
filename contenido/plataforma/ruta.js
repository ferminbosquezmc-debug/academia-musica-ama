/* ===== Ruta adaptativa (Prioridad 3 de la auditoría) =====
   «Tu ruta de hoy»: hasta 3 pasos según lo que la plataforma ya sabe del estudiante:
   evaluación con rúbrica, prueba de cada clase, laboratorio de oído, pulso, días sin practicar y la clase siguiente. */
const RUnum=(car,k)=>{for(let l=0;l<3;l++){const i=cmKeys(car,l).indexOf(k);if(i>=0)return i+1+12*l}return 0};
const RUcls=(car,k)=>'Clase '+RUnum(car,k)+': '+((LD[k]||{}).t||'');
function ruArea(car,area){const L=S.lvl||0;for(let l=L;l>=0;l--){const C=(CMP[car]||[])[l]||[];for(const x of C){if(x[0]!==area)continue;
 const ks=x[2].map(n=>cmK(car,l,n)).filter(k=>LD[k]&&S.done[k]);if(ks.length)return{k:ks[ks.length-1],comp:x[1]}}}return null}
function ruQuiz(car){const L=S.lvl||0,out=[];for(let l=Math.max(0,L-1);l<=L;l++)cmKeys(car,l).forEach(k=>{const D=LD[k],s=S.ls&&S.ls[k];
 if(D&&S.done[k]&&s&&typeof s.score==='number'&&Array.isArray(D.q)&&D.q.length&&s.score/D.q.length<.67)out.push(k)});return out.pop()||null}
function ruDias(){const d=new Date();for(let i=0;i<60;i++){if(S.min[dkey(d)])return i;d.setDate(d.getDate()-1)}return 60}
function ruLast(car){const L=S.lvl||0;for(let l=L;l>=0;l--){const ks=cmKeys(car,l).filter(k=>LD[k]&&S.done[k]);if(ks.length)return ks[ks.length-1]}return null}
function ruCalc(){const car=cmCar();if(!car)return [];const P=[],used={};const add=x=>{const id=x.k||(x.lab?'lab:'+x.lab:'pt');if(!used[id]){used[id]=1;P.push(x)}};
 const anyDone=Object.keys(S.done||{}).some(k=>S.done[k]),dias=ruDias(),ev=((EVme&&EVme.items)||[]).filter(e=>e.car===car).pop();
 /* 1. Volver después de una pausa */
 if(anyDone&&dias>=7){const k=ruLast(car);if(k)add({ic:'🔄',t:'Repasa la '+RUcls(car,k),why:'Llevas '+(dias>=60?'más de dos meses':dias+' días')+' sin practicar. Un repaso corto te ayuda a retomar sin frustrarte.',k:k})}
 /* 2. Lo que marcó la última evaluación */
 if(ev){const low=(ev.r||[]).map((v,i)=>[v,i]).filter(x=>x[0]>0&&x[0]<=2).sort((a,b)=>a[0]-b[0]);
  low.forEach(([v,i])=>{const a=ruArea(car,i),why='En tu evaluación del mes '+ev.mes+', «'+RBC[i]+'» quedó en «'+RBN[v]+'».';
   if(i===1)add({ic:'🥁',bpm:60,t:'Evaluador de pulso a 60 BPM',why:why+' Practica el pulso despacio hasta llegar a «Logrado».',lab:'pulso'});
   else if(i===3)add({ic:'🎶',t:'Toca con una pista de acompañamiento',why:why+' Tocar con la banda ayuda a terminar las piezas con seguridad.',pt:1});
   if(a)add({ic:'📖',t:'Refuerza la '+RUcls(car,a.k),why:why+' Esta clase trabaja: '+a.comp.charAt(0).toLowerCase()+a.comp.slice(1)+'.',k:a.k})})}
 /* 3. Pruebas de clase con pocos aciertos */
 const qk=ruQuiz(car);if(qk){const s=S.ls[qk];add({ic:'✏️',t:'Repasa la '+RUcls(car,qk),why:'En su prueba acertaste '+s.score+' de '+LD[qk].q.length+' a la primera. Repásala y pregúntale al Tutor ARPA lo que no quedó claro.',k:qk})}
 /* 4. Laboratorio de oído y pulso */
 const O=S.oido||{};[['int','Intervalos'],['acor','Mayor o menor'],['alto','Alto o bajo']].forEach(([k,n])=>{const o=O[k];if(o&&o.n>=10&&o.ok/o.n<.6)add({ic:'👂',t:'Laboratorio de oído: '+n,why:'Llevas '+Math.round(100*o.ok/o.n)+'% de aciertos. Una ronda en el Nivel 1 cada día afina tu oído.',lab:k})});
 if(O.pulso&&O.pulso.nota<=2)add({ic:'🥁',bpm:Math.max(60,O.pulso.bpm-20),t:'Evaluador de pulso a '+Math.max(60,O.pulso.bpm-20)+' BPM',why:'Tu último resultado de pulso fue «'+RBN[O.pulso.nota]+'»: baja un poco el tempo y busca tocar centrado.',lab:'pulso'});
 /* 5. La clase siguiente */
 const R=P.splice(0,P.length);const nx=rtClase();if(nx)add({ic:'▶️',t:(anyDone?'Sigue con la ':'Empieza por la ')+'Clase '+nx.n+': '+nx.t,why:anyDone?'Es tu próxima clase del Método ARPA.':'Tu primera clase: conoce tu instrumento y la música.',k:nx.k});
 /* 6. Aplicar: tocar con la banda */
 add({ic:'🎶',t:'Toca con una pista de tu nivel',why:'Aplica lo que aprendiste tocando con la banda virtual.',pt:1});
 const N=P.splice(0,P.length);/* como máximo 2 refuerzos y siempre la clase siguiente; la pista completa */
 return R.slice(0,N.length>1?2:3).concat(N).slice(0,3)}
function ruBtn(x){if(x.k)return '<button class="btn m4mini" data-rtk="'+esc(x.k)+'">Abrir</button>';if(x.lab)return '<button class="btn m4mini" data-rtl="'+x.lab+'"'+(x.bpm?' data-rbpm="'+x.bpm+'"':'')+'>Ir</button>';return '<button class="btn m4mini" data-rpt="1">Ir</button>'}
function ruCard(){const P=ruCalc();if(!P.length)return '';
 return '<div class="card"><div class="row" style="flex-wrap:wrap;gap:8px"><h3 class="grow">🧭 Tu ruta de hoy</h3><span class="mute" style="font-size:13px">unos '+(P.length*10)+' minutos</span></div>'
  +'<p class="mute" style="font-size:14px;margin:2px 0 8px">Se arma con tu avance, tus pruebas, tus evaluaciones y tu laboratorio de oído.</p>'
  +P.map((x,i)=>'<div class="m4row" style="display:block"><div class="row" style="gap:10px;align-items:flex-start"><span aria-hidden="true" style="font-size:20px">'+x.ic+'</span><div class="grow"><b>'+(i+1)+'. '+esc(x.t)+'</b><p class="mute" style="font-size:14px;margin-top:2px">'+esc(x.why)+'</p></div>'+ruBtn(x)+'</div></div>').join('')+'</div>'}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rpt]');if(!b)return;const c=cmCar()||'guitarra';PTcar=c==='piano'?'p':c==='bateria'?'b':'g';PTlv=Math.min(3,(S.lvl||0)+1);PTsel=null;go('pistas')});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rbpm]');if(!b)return;const v=+b.dataset.rbpm;LBbpm=[60,80,100,120].reduce((a,x)=>Math.abs(x-v)<Math.abs(a-v)?x:a,60);if(visS('v-lab'))lbView()});
