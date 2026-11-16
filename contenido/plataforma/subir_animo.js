/* Arpi con porras y confeti al aprobar, cara triste y ánimo al fallar; el docente verifica las prácticas marcadas
   y ve los resultados de los juegos. Se aplica después de subir_entrega.js. Uso: node subir_animo.js IN OUT */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep('.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}', '.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}\n#arpi-ov{position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:45;display:flex;align-items:flex-end;gap:10px;width:min(92vw,520px);background:rgba(0,0,0,.9);border:1px solid var(--gold);border-radius:18px;padding:10px 12px;box-shadow:0 8px 30px rgba(0,0,0,.6)}#arpi-ov .jg-arpi{width:64px;height:76px;flex:none}#arpi-ov .jg-bub{font-size:16px}');
/* Prueba de la lección */
rep("if(L.score===Q.length){party();toast(kid()?'¡Perfecto! Ganaste ⭐':'¡Perfecto!')}}",
  "arpiCheer(L.score===Q.length?2:L.score*2>=Q.length?1:0,L.score===Q.length?'Todas las respuestas correctas a la primera.':'Acertaste '+L.score+' de '+Q.length+'. Lee la pista y corrige las que faltan.')}");
/* Clase terminada */
rep("party();toast(kid()?'¡Misión cumplida! +3 ⭐':'Lección terminada')", "arpiCheer(2,'Terminaste la clase. Ya puedes pasar a la siguiente.')");
/* ¿Qué suena? (no anima cuando solo se restaura al volver) */
rep("const r=document.getElementById('qs-res');if(r)r.innerHTML=(ok===5?",
  "if(!qsRev.q)arpiCheer(ok===5?2:ok>=3?1:0,ok===5?'Reconociste los 5 fragmentos.':'Acertaste '+ok+' de 5. Escucha otra vez los que faltan.');const r=document.getElementById('qs-res');if(r)r.innerHTML=(ok===5?");
/* Seguimiento: resultados de juegos y prácticas marcadas */
rep('retos:(S.retos||[]).length,', 'retos:(S.retos||[]).length,chk:chkSum(),gd:S.gd&&S.gd.fin?{fin:S.gd.fin,hist:(S.gd.hist||[]).slice(-5)}:null,qs:S.qs?{best:S.qs.best||0,last:S.qs.last||0}:null,');
rep("+'<div class=\"row\" style=\"margin-top:10px;flex-wrap:wrap;gap:8px\"><button class=\"btn m4mini\" data-se=\"'+esc(p._id)+'\">📝 Evaluar con la rúbrica</button>'+pfBtn(p._id)+'</div></div>'",
  "+(segJuegos(p)?'<div class=\"atchips\">'+segJuegos(p)+'</div>':'')+'<div class=\"row\" style=\"margin-top:10px;flex-wrap:wrap;gap:8px\"><button class=\"btn m4mini\" data-se=\"'+esc(p._id)+'\">📝 Evaluar con la rúbrica</button>'+pfBtn(p._id)+segChkBtn(p)+'</div></div>'");
/* Guardar una evaluación conserva las verificaciones de prácticas (campo ver) */
rep("items=((g.exists&&g.data().items)||[]).concat([it]);await r.set({items:items});", "items=((g.exists&&g.data().items)||[]).concat([it]),ver=(g.exists&&g.data().ver)||null;await r.set(ver?{items:items,ver:ver}:{items:items});");
const js = fs.readFileSync(path.join(__dirname, 'animo.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
