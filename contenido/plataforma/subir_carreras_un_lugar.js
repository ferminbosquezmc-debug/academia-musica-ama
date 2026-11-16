/* Una sola carrera por estudiante y un solo lugar para elegirla («Selecciona tu instrumento»), con Audio Técnica
   y Formación Ministerial (sin el título «Nivel 4»). Se aplica DESPUÉS de subir_inicio.js y subir_grados.js.
   Uso: node subir_carreras_un_lugar.js IN OUT */
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b, n = 1) { const c = cnt(a); if (c !== n) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.split(a).join(b); }
/* Clases: sin «Cambiar de carrera» para estudiantes, sin Audio Técnica ni Ministerial en la lista y sin el chip del Nivel 4 */
rep("<button class=\"link\" data-chg=\"1\" style=\"min-height:44px;font-size:16px\">🔄 Cambiar de carrera</button>';",
  "'+(ADMS?'<button class=\"link\" data-chg=\"1\" style=\"min-height:44px;font-size:16px\">🔄 Cambiar de carrera</button>':'<p class=\"mute\" style=\"font-size:14px;grid-column:1/-1;margin-top:4px\">Esta es tu carrera. Para cambiarla, escribe a la academia.</p>');");
rep("const L=Object.keys(INSN).map(k=>({k:k,e:EMO[k]||'',n:INSN[k]})).concat([", "const L=Object.keys(INSN).map(k=>({k:k,e:EMO[k]||'',n:INSN[k]})).concat(!ADMS?[]:[");
rep("+'<button class=\"chip m4c\" data-go=\"n4\">🕊️ Nivel 4 · Ministerial (opcional)</button>';", ";");
/* Quien eligió Audio Técnica o Formación Ministerial: «Clases» abre su carrera */
rep("function go(v){", "function go(v){if(v==='clases'&&S.esp&&!myCarr())v=S.esp==='at'?'asig':'n4';");
/* Inicio de quien estudia Audio Técnica o Formación Ministerial */
rep("$('#week').innerHTML=hh;$('#wk-total').textContent=tot+' min';", "$('#week').innerHTML=hh;$('#wk-total').textContent=tot+' min';obEsp();");
/* La prueba de ubicación solo muestra la carrera del estudiante (la dirección ve todas) */
rep("const opts=Object.keys(UA).filter(k=>AVAIL[k]);", "const opts=Object.keys(UA).filter(k=>AVAIL[k]&&(ADMS||!myCarr()||k===myCarr()));");
/* Formación Ministerial: si es la carrera del estudiante, «Volver» lleva a Inicio (Clases abre esta misma vista) */
rep("<button class=\"link\" data-go=\"clases\" style=\"font-size:16px;min-height:44px\">⬅ Volver a Clases</button>'",
  "<button class=\"link\" data-go=\"'+(S.esp&&!myCarr()?'home':'clases')+'\" style=\"font-size:16px;min-height:44px\">⬅ Volver a '+(S.esp&&!myCarr()?'Inicio':'Clases')+'</button>'");
/* Ícono del bajo en azul (la misma guitarra, teñida) para distinguirlo de la guitarra */
rep("const EMO={piano:'🎹',guitarra:'🎸',bajo:'🎸',", "const EMO={piano:'🎹',guitarra:'🎸',bajo:'<span style=\"display:inline-block;filter:hue-rotate(200deg) saturate(1.6)\">🎸</span>',");
/* Sin el título «Nivel 4» */
rep("NIVEL 4 · FORMACIÓN SUPERIOR", "FORMACIÓN SUPERIOR");
rep("NIVEL 4 · MÓDULO '+(i+1)+'", "MÓDULO '+(i+1)+'");
rep("Los niveles 1, 2 y 3 forman al músico. El Nivel 4 forma a la persona y al servidor.", "Las carreras forman al músico. Este diplomado forma a la persona y al servidor.");
rep("n4:'Nivel 4'", "n4:'Formación Ministerial'");
rep("kick('ARPA | Formación Ministerial · Nivel 4", "kick('ARPA | Formación Ministerial", 2);
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
