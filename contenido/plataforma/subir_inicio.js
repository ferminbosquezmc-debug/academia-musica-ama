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
/* Vista de estudiante nuevo (solo la dirección): un estado en blanco que vive en sessionStorage y no toca el avance real */
rep("try{Object.assign(S,JSON.parse(localStorage.getItem('arp')||'{}'))}catch(e){}",
  "const PREV=(()=>{try{return sessionStorage.getItem('arpPrev')==='1'}catch(e){return false}})();\ntry{Object.assign(S,JSON.parse((PREV?sessionStorage.getItem('arpPrevS'):localStorage.getItem('arp'))||'{}'))}catch(e){}");
rep("const save=()=>{try{localStorage.setItem('arp',JSON.stringify(S))}catch(e){}if(window.SEGsync)SEGsync()};",
  "const save=()=>{if(PREV){try{sessionStorage.setItem('arpPrevS',JSON.stringify(S))}catch(e){}return}try{localStorage.setItem('arp',JSON.stringify(S))}catch(e){}if(window.SEGsync)SEGsync()};");
rep("if(u){UIDS=await u.id();ADMS=!!(await u.canEdit())}", "if(u){UIDS=await u.id();ADMS=!!(await u.canEdit())&&!PREV}");
rep(" try{const g=await DBS.doc('prog/'+UIDS).get();", " if(PREV){segBadge();return}\n try{const g=await DBS.doc('prog/'+UIDS).get();");
rep("window.SEGsync=function(){if(!DBS||!UIDS)return;", "window.SEGsync=function(){if(PREV||!DBS||!UIDS)return;");
rep("if(ADMS)x+='<button class=\"m4home athome\" data-go=\"opi\">",
  "if(ADMS)x+='<button class=\"m4home athome\" data-prev=\"on\"><span class=\"em\" aria-hidden=\"true\">👁</span><span>Ver como estudiante nuevo<small>Una vista limpia para revisar · no borra tu avance</small></span></button>';if(ADMS)x+='<button class=\"m4home athome\" data-go=\"opi\">");
rep('#v-home.obon>*:not(.hero){display:none!important}',
  '#v-home.obon>*:not(.hero){display:none!important}\n#prev-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;background:#5fbf7a;color:#000;padding:8px 14px;font-weight:600;font-size:15px}#prev-bar .btn{background:#000;color:#fff;padding:6px 14px;min-height:36px}');
const js = fs.readFileSync(path.join(__dirname, 'inicio.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
