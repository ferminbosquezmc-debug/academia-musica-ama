/* Comentarios del piloto: botón 💬, encuesta semanal, «Mis comentarios» y panel de la dirección.
   Uso: node subir_comentarios.js IN OUT   (IN = página publicada sin envoltorio)
   Al publicar: añadir las reglas db opi, opi/{self} (view/interact), opir (admin/admin), opir/{self} (view/admin). */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b) { const c = cnt(a); if (c !== 1) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.replace(a, () => b); }
rep('<section class="view" id="v-score" hidden></section>', '<section class="view" id="v-score" hidden></section>\n<section class="view" id="v-opi" hidden></section>');
rep("if(v==='score')scView();", "if(v==='score')scView();if(v==='opi')opView();");
rep("x+=ruCard()+rtMini();if(ADMS)x+='<button class=\"m4home athome\" data-go=\"seg\">",
  "x+=opSurveyCard()+ruCard()+rtMini();if(ADMS)x+='<button class=\"m4home athome\" data-go=\"opi\"><span class=\"em\" aria-hidden=\"true\">💬</span><span>Comentarios del piloto<small>Errores, dudas e ideas de los estudiantes</small></span></button>';if(ADMS)x+='<button class=\"m4home athome\" data-go=\"seg\">");
rep('h+=pfCard()+cmPerfil();', 'h+=pfCard()+opCard()+cmPerfil();');
const js = fs.readFileSync(path.join(__dirname, 'comentarios.js'), 'utf8').replace(/\r\n/g, '\n');
rep('function perfil(){', js.trimEnd() + '\nfunction perfil(){');
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
