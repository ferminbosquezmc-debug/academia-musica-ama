/* Página pública: las cinco carreras disponibles, sin Producción musical y con la IA como materia. Uso: node pagina_publica_cinco.js ../../index.html */
const fs = require('fs'); const F = process.argv[2];
let t = fs.readFileSync(F, 'utf8'); const CR = t.includes('\r\n'); t = t.replace(/\r\n/g, '\n');
const cnt = (a) => t.split(a).length - 1;
function rep(a, b, n = 1) { const c = cnt(a); if (c !== n) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.split(a).join(b); }
const OFF = 'border:1px solid #3a3321;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:12px;background:#0f0d09">';
const ON = 'border:1px solid #f2a31b;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:12px;background:#1a1405">';
const SOON = 'background:transparent;color:#c9bfa6">Próximamente</span>';
const AV = 'background:#f2a31b;color:#0a0908">Disponible · Niveles 1, 2 y 3</span>';
rep('Guitarra, piano y batería ya tienen sus clases en la plataforma. Canto y bajo se abren por etapas.', 'Las cinco carreras ya tienen sus tres niveles en la plataforma: guitarra, piano, batería, bajo y canto.');
function card(img, desc0, desc1) {
  const a = t.indexOf(img), s = t.lastIndexOf('<div style="flex:1 1 300px', a), e = t.indexOf('</div>', a); if (a < 0) throw new Error(img);
  let c = t.slice(s, e); c = c.replace(OFF, ON).replace(desc0, desc1).replace(SOON, AV); t = t.slice(0, s) + c + t.slice(e);
}
card('img/canto.svg', 'Respiración, afinación, fraseo y presencia en vivo.', 'Respiración, afinación, lectura, dicción, armonía a dos y tres voces, micrófono y recital.');
card('img/bajo.svg', 'Pulso, raíces y líneas que sostienen a la banda.', 'Clave de fa, raíz y quinta, arpegios, escalas, slap y funk, y tocar con la banda.');
rep('color:#0a0908">Disponible · Nivel 1</span>', 'color:#0a0908">Disponible · Niveles 1, 2 y 3</span>');
rep('<li>Producción musical y audio</li><li>Dirección musical</li><li>Liderazgo ministerial</li>', '<li>Dirección musical</li><li>Formación ministerial III</li>');
/* Producción musical: la carrera se quitó */
const p = t.indexOf('img/produccion.svg'); if (p < 0) throw new Error('tarjeta de producción');
const ps = t.lastIndexOf('<div style="flex:1 1 300px', p), pe = t.indexOf('</div>', p) + '</div>'.length;
t = t.slice(0, ps) + t.slice(pe).replace(/^\s*\n/, '\n');
/* Música e inteligencia artificial: es una materia de los tres niveles, no una carrera */
rep('border:1px solid #f2a31b;color:#f2a31b">En preparación</span>\n<h3 style="font-family:\'Bodoni Moda\',serif;font-weight:700;font-size:28px;line-height:1.1">Música e inteligencia artificial</h3>', 'border:1px solid #5fbf7a;color:#5fbf7a">Materia en los 3 niveles</span>\n<h3 style="font-family:\'Bodoni Moda\',serif;font-weight:700;font-size:28px;line-height:1.1">Música e inteligencia artificial</h3>');
rep('<option>Producción musical (carrera)</option><option>Música e inteligencia artificial (carrera)</option>', '');
fs.writeFileSync(F, CR ? t.replace(/\n/g, '\r\n') : t); console.log('ok', CR ? 'CRLF' : 'LF');
