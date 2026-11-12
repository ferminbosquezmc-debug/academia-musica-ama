/* ===== Marco de competencias y certificados (Prioridad 2 de la auditoría) =====
   · Cada carrera y nivel tiene 5 competencias. Cada una se liga a un criterio de la rúbrica y a las clases que la desarrollan.
   · Certificado de nivel: todas las clases del nivel terminadas + evaluación final del nivel (mes 3, 6 o 9) aprobada por el docente.
   · El certificado lleva un código que la dirección comprueba en «Seguimiento de estudiantes». */
const CMA=['Técnica','Pulso y ritmo','Lectura y teoría','Interpretación'];/* mismo orden que la rúbrica */
const CMN=['Fundamentos','Desarrollo','Dominio y liderazgo'];
const CMP={
piano:[
 [[0,'Se sienta con buena postura, numera los dedos y apoya bien las manos en el teclado',[1,2,3]],
  [2,'Ubica las notas en el teclado y las lee en clave de sol',[4,8]],
  [1,'Mantiene un pulso estable con redondas, blancas, negras, corcheas y silencios',[5,6,7]],
  [0,'Forma los acordes de Do, Fa y Sol mayor',[9,10]],
  [3,'Toca una melodía con un acompañamiento sencillo con las dos manos',[11,12]]],
 [[2,'Lee en clave de sol y de fa y nombra las teclas negras',[1,2,8]],
  [2,'Construye la escala mayor y toca Do y Sol mayor con la digitación correcta',[3,7]],
  [1,'Acompaña una canción con patrones rítmicos y arpegios',[4,5,6]],
  [0,'Usa el pedal de resonancia y los acordes principales I, IV y V',[9,10]],
  [3,'Toca canciones completas con dinámica y expresión',[11,12]]],
 [[2,'Distingue mayor y menor y forma acordes de séptima',[1,4]],
  [0,'Coordina las dos manos con legato, staccato y fraseo',[2,3]],
  [2,'Analiza la familia de acordes y cambia de tonalidad',[5,7,9]],
  [3,'Acompaña en varios estilos e improvisa sobre la pentatónica',[6,8]],
  [3,'Toca en conjunto y presenta un recital completo',[10,11,12]]]],
guitarra:[
 [[0,'Sostiene la guitarra con buena postura y conoce sus partes y su sonido',[1,2,3]],
  [2,'Lee las notas en el pentagrama y toca su primera melodía',[4,8]],
  [1,'Mantiene el pulso con negras, silencios y corcheas',[5,6,7]],
  [0,'Forma y cambia los acordes de La menor, La mayor y Re mayor',[9,10,11]],
  [3,'Acompaña canciones con un rasgueo básico',[11,12]]],
 [[0,'Toca la cejilla móvil y los acordes de séptima con cambios limpios',[1,2,3]],
  [2,'Toca las escalas mayor, menor natural y la pentatónica de La menor',[4,5]],
  [1,'Rasguea patrones con semicorcheas, síncopa, ligadura y puntillo',[6,7]],
  [0,'Toca arpegios con la mano derecha',[8]],
  [3,'Usa grados y progresiones para tocar con una banda',[9,10,11]]],
 [[0,'Toca acordes de poder, tríadas y séptimas móviles',[1,5]],
  [2,'Recorre la escala mayor por el mástil con sus cajas',[2,3]],
  [2,'Reconoce los intervalos por su distancia y su calidad',[4]],
  [1,'Toca con tresillos y sobre la forma del blues de 12 compases',[6,7]],
  [3,'Presenta el taller final de nivel',[8]]]],
bateria:[
 [[0,'Se sienta frente al kit con buena postura y toma bien las baquetas',[1,2,3]],
  [2,'Lee la escritura de la batería y las figuras hasta la corchea',[4,6,7]],
  [1,'Cuenta los compases y mantiene el pulso',[5]],
  [0,'Coordina manos y pie en su primer ritmo y en el redoble abierto',[8,9,10]],
  [3,'Recorre los toms y toca canciones con ritmo y rellenos sencillos',[11,12]]],
 [[0,'Domina el grip, el hi-hat abierto y los redobles en tresillos y semicorcheas',[1,2,4]],
  [1,'Toca los ritmos básicos #6 y #7, la balada en 6/8 y el shuffle',[3,5,9]],
  [3,'Toca rellenos de 1, 2 y 4 tiempos y desplazamientos',[6,7]],
  [2,'Lee con tresillo, ligadura y puntillo; afina la batería',[8,9,10]],
  [3,'Toca tres canciones completas con ritmo, rellenos y dinámica',[11,12]]],
 [[0,'Toca con independencia y domina paradiddle, flam, drag y notas fantasma',[1,3]],
  [1,'Toca ritmos latinos, reggae y funk, a mitad y a doble tiempo',[2,5,6,7]],
  [3,'Toca rellenos avanzados y un solo de 8 compases',[4,8]],
  [2,'Lee una partitura de batería completa',[9]],
  [3,'Toca con banda y click y presenta el concierto final',[10,11,12]]]]};
const CMF={guitarra:'G',piano:'P',bateria:'B'};
/* Clave de la clase n (1–12) de un nivel; en Guitarra I las 12 clases nuevas */
const cmK=(c,l,n)=>c==='guitarra'&&l===0?'0-0guitarra-c'+n:l+'-0'+c+'-'+(n-1);
const cmKeys=(c,l)=>c==='guitarra'&&l===0?[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>cmK(c,l,n)):Object.keys(LD).filter(k=>k.indexOf(l+'-0'+c+'-')===0);
const cmLvl=(c,l)=>{const ks=cmKeys(c,l).filter(k=>LD[k]),d=ks.filter(k=>S.done[k]).length;return{t:ks.length,d:d,ok:ks.length>0&&d===ks.length}};
const cmCmp=(c,l,x)=>{const ks=x[2].map(n=>cmK(c,l,n)).filter(k=>LD[k]);return ks.length>0&&ks.every(k=>S.done[k])};
const cmFin=(ev,c,l)=>((ev&&ev.items)||[]).filter(e=>e.car===c&&+e.mes===3*(l+1)&&evAvg(e)>=3).pop()||null;
function cmCode(uid,c,l){let h=2166136261;const s=String(uid)+'|'+c+'|'+l;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}
 return 'ARPA-'+CMF[c]+(l+1)+'-'+h.toString(36).toUpperCase().padStart(7,'0').slice(-7)}
const cmCar=()=>{const c=(S.ubic&&S.ubic.car)||getInst(S.lvl||0)||getInst(0);return CMP[c]?c:null};

/* ---- Perfil: mis competencias y certificados ---- */
function cmPerfil(){const c=cmCar();if(!c)return '';const fin=EVme;let h='<div class="card" id="pf-cmp"><h3>Mis competencias · '+esc(CARN[c])+'</h3><p class="mute" style="font-size:14px;margin:4px 0 6px">Lo que sabrás hacer al terminar cada nivel. Una competencia se marca al terminar las clases que la trabajan; tu docente la confirma en la evaluación final del nivel.</p>';
 for(let l=0;l<3;l++){const L=cmLvl(c,l),f=cmFin(fin,c,l),cd=S.cert&&S.cert[c+l];
  h+='<details class="m4row" style="display:block"'+(l===(S.lvl||0)?' open':'')+'><summary class="row" style="flex-wrap:wrap;gap:8px;cursor:pointer"><b class="grow">Nivel '+(l+1)+' · '+CMN[l]+'</b><span class="m4st '+(L.ok&&f?'ok':'wait')+'">'+(!L.t?'Se abre por etapas':L.ok&&f?'Certificado disponible':L.d+' / '+L.t+' clases')+'</span></summary>'
   +'<ul style="list-style:none;padding:0;margin:8px 0">'+CMP[c][l].map(x=>{const ok=cmCmp(c,l,x);return '<li style="display:flex;gap:8px;align-items:flex-start;font-size:15px;margin-top:6px"><span aria-hidden="true">'+(ok?'✅':'⬜')+'</span><span>'+esc(x[1])+' <span class="mute" style="font-size:13px">· '+CMA[x[0]]+(f?' · confirmada: '+RBN[(f.r||[])[x[0]]]:'')+'</span></span></li>'}).join('')+'</ul>';
  if(L.t){h+='<p style="font-size:14px;margin-top:4px">Para el certificado del Nivel '+(l+1)+':</p><ul style="padding-left:20px;margin:4px 0 8px;font-size:14px"><li>'+(L.ok?'✅':'⬜')+' Terminar las '+L.t+' clases del nivel ('+L.d+' listas)</li><li>'+(f?'✅':'⬜')+' Evaluación final del nivel (mes '+3*(l+1)+') aprobada por tu docente</li></ul>';
   if(L.ok&&f)h+='<button class="btn m4mini" data-cert="'+c+':'+l+'">🎓 Descargar mi certificado</button>'+(cd?'<p class="mute" style="font-size:13px;margin-top:6px">Código: <b>'+esc(cd.code)+'</b></p>':'')}
  h+='</details>'}
 return h+'</div>'}

/* ---- Certificado en PDF ---- */
async function cmCert(c,l){const f=cmFin(EVme,c,l),L=cmLvl(c,l);if(!L.ok||!f){toast('Todavía faltan requisitos para este certificado.');return}
 if(!S.name||!S.name.trim()){toast('Escribe tu nombre completo en tu Perfil antes de descargar el certificado.');return}
 if(!UIDS){toast('El certificado necesita tu cuenta: abre la plataforma en claude.ai.');return}
 if(!DLD){toast('La descarga en PDF no está disponible en esta vista. Abre la plataforma en claude.ai.');return}
 toast('Preparando el certificado…');try{await pdf4lib()}catch(e){toast('No se pudo preparar el PDF. Revisa tu conexión e inténtalo de nuevo.');return}
 const code=cmCode(UIDS,c,l),fecha=new Date().toISOString();let blob;
 try{const D=new window.jspdf.jsPDF({unit:'mm',format:'a4',orientation:'landscape'}),W=297,H=210,cx=W/2,P=s=>pcl4(s);
  D.setDrawColor(150,100,20);D.setLineWidth(1.2);D.rect(10,10,W-20,H-20);D.setLineWidth(0.4);D.rect(14,14,W-28,H-28);
  D.setTextColor(150,100,20);D.setFont('helvetica','bold');D.setFontSize(13);D.text(P('ACADEMIA DE MÚSICA ARPA'),cx,30,{align:'center'});
  D.setTextColor(34,28,22);D.setFont('times','bold');D.setFontSize(30);D.text(P('Certificado de Nivel '+(l+1)),cx,46,{align:'center'});
  D.setFont('helvetica','normal');D.setFontSize(12);D.setTextColor(115,104,92);D.text(P('Se certifica que'),cx,58,{align:'center'});
  D.setFont('times','bolditalic');D.setFontSize(24);D.setTextColor(34,28,22);D.text(P(S.name.trim()),cx,70,{align:'center'});
  D.setFont('helvetica','normal');D.setFontSize(12);D.setTextColor(115,104,92);
  D.text(P('completó el Nivel '+(l+1)+' · '+CMN[l]+' de la carrera de '+CARN[c]+' y demostró estas competencias:'),cx,80,{align:'center'});
  D.setTextColor(34,28,22);D.setFontSize(11);let y=92;
  CMP[c][l].forEach(x=>{const t=D.splitTextToSize(P('•  '+x[1]+'  ('+CMA[x[0]]+': '+RBN[(f.r||[])[x[0]]]+')'),220);D.text(t,cx-110,y);y+=t.length*5.4+1.5});
  D.setFontSize(11);D.setTextColor(115,104,92);D.text(P('Evaluación final del nivel: '+evAvg(f).toFixed(1)+' / 4 · '+fdS(f.fecha)),cx,Math.max(y+6,150),{align:'center'});
  D.setDrawColor(115,104,92);D.setLineWidth(0.3);D.line(40,178,120,178);D.line(W-120,178,W-40,178);
  D.setFontSize(10);D.text(P('Dirección académica'),80,184,{align:'center'});D.text(P('Fecha: '+fdS(fecha)),W-80,184,{align:'center'});
  D.setFontSize(9);D.text(P('Código de verificación: '+code+' · La academia lo comprueba en su registro de seguimiento.'),cx,194,{align:'center'});
  blob=D.output('blob')}catch(e){toast('No se pudo crear el certificado.');return}
 S.cert=S.cert||{};if(!S.cert[c+l])S.cert[c+l]={car:c,nivel:l+1,code:code,fecha:fecha};save();
 try{await DLD.save({filename:'arpa-certificado-'+c+'-nivel-'+(l+1)+'.pdf',data:blob});toast('Certificado guardado')}catch(err){if(!err||err.code!=='declined')toast('No se pudo guardar el certificado')}
 if(visS('v-perfil'))segPerfil()}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-cert]');if(!b)return;const p=b.dataset.cert.split(':');cmCert(p[0],+p[1])});

/* ---- Seguimiento: comprobar un código de certificado ---- */
function cmVerif(){const q=(document.getElementById('cm-q').value||'').trim().toUpperCase(),o=document.getElementById('cm-res');if(!q){o.innerHTML='';return}
 let hit=null;PROGS.forEach(p=>{Object.values(p.cert||{}).forEach(x=>{if(x&&String(x.code).toUpperCase()===q)hit={p:p,x:x}})});
 if(!hit){o.innerHTML='<p class="m4st wait" style="margin-top:8px">No hay ningún certificado con ese código.</p>';return}
 const c=hit.x.car,l=hit.x.nivel-1,ok=cmCode(hit.p._id,c,l)===hit.x.code,f=cmFin(EVALS[hit.p._id],c,l),dn=(hit.p.done||[]),L=cmKeys(c,l).filter(k=>LD[k]),ld=L.filter(k=>dn.indexOf(k)>=0).length;
 o.innerHTML='<div class="m4row" style="display:block;margin-top:8px"><b>'+esc(hit.p.nombre||'Estudiante sin nombre')+'</b> · '+esc(CARN[c]||c)+' · Nivel '+(l+1)+'<div class="atchips"><span>Emitido: <b>'+esc(fdS(hit.x.fecha))+'</b></span><span>Clases: <b>'+ld+' / '+L.length+'</b></span><span>Evaluación final: <b>'+(f?evAvg(f).toFixed(1)+' / 4':'no registrada')+'</b></span></div><p class="m4st '+(ok&&f&&ld===L.length?'ok':'wait')+'" style="margin-top:8px">'+(ok&&f&&ld===L.length?'Certificado válido':'Revisar: no cumple todos los requisitos')+'</p></div>'}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#cm-go'))cmVerif()});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&e.target.id==='cm-q')cmVerif()});
