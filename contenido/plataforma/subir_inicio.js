/* Inicio sencillo: nombre → dos caminos (convalidar o desde cero) → instrumento; Inicio sin tarjetas de más.
   Uso: node subir_inicio.js IN OUT   (IN = página publicada sin envoltorio) */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
/* Estilos: mientras se hace la bienvenida, Inicio muestra solo el logo y los pasos */
rep('.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}',
  '.gblk:focus{outline:2px solid var(--gold);outline-offset:1px}\n#v-home.obon>*:not(.hero){display:none!important}\n.ob-m{text-align:left}.ob-m .mode{min-height:170px}\n.ob-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px;margin-top:14px}');
/* Inicio: primero la bienvenida */
rep('function home(){lvFix();applyMode();setTimeout', 'function home(){lvFix();applyMode();if(obHome())return;setTimeout');
/* Modo: Estudiante por defecto (se cambia en Perfil); la tarjeta solo aparece si se pide desde la ayuda */
rep("if(!S.mode){md.hidden=false;", "if(S.mode===undefined){S.mode='adult';save()}if(!S.mode){md.hidden=false;");
/* «Cómo empezar» ya no hace falta: la bienvenida guía los primeros pasos */
rep('if(dn===0&&S.mode){', 'if(dn===0&&S.mode&&!1){');
/* Inicio sin la prueba de ubicación (está en la bienvenida y en Perfil), sin la ruta y sin el resumen de retos */
rep("if(!S.ubic&&!anyDone&&!kid())x+='<div class=\"card\" style=\"border-color:var(--gold)\"><h3>¿Ya tocas o cantas?</h3>", "if(!1)x+='<div class=\"card\" style=\"border-color:var(--gold)\"><h3>¿Ya tocas o cantas?</h3>");
rep('x+=opSurveyCard()+ruCard()+rtMini();', 'x+=opSurveyCard();');
/* La ruta de hoy se ve en Práctica */
rep("if(v==='practica'&&typeof jgRacha==='function')jgRacha();", "if(v==='practica'&&typeof jgRacha==='function')jgRacha();if(v==='practica')obRuta();");
const js = fs.readFileSync(path.join(__dirname, 'inicio.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
