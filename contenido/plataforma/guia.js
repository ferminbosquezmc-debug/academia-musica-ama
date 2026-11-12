/* ===== Guía del docente (Prioridad 2 de la auditoría) =====
   El texto sale de contenido/GUIA_DOCENTE.md; el script de subida lo inserta en GUIA_MD. */
const GUIA_MD=__GUIA__;
function guiaView(){const v=document.getElementById('v-guia');if(!v)return;
 const md=GUIA_MD.replace(/^#\s.*\n/,'');
 v.innerHTML='<button class="link" data-go="'+(ADMS?'seg':'home')+'" style="font-size:16px;min-height:44px">⬅ Volver'+(ADMS?' al seguimiento':' a Inicio')+'</button><h2>Guía del docente</h2><p class="mute">Cómo damos clase en ARPA: el Método ARPA, la clase de 60 minutos, la rúbrica, el seguimiento y los certificados.</p>'+gCards(gSecs(md))}
