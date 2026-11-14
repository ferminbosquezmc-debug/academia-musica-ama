/* Guitarra · Niveles 2 y 3 en el formato del Método Integral AMA (clases 13–36).
   Uso: node subir_guitarra23.js IN OUT   (IN = página sin envoltorio)
   · Claves nuevas: '1-0guitarra-c13'…'c24' y '2-0guitarra-c25'…'c36' (las antiguas '1-0guitarra-0…10' y '2-0guitarra-0…7' se conservan como «Para profundizar»).
   · Convalidación: si el estudiante terminó todas las lecciones antiguas de un tema, la clase nueva queda hecha.
   · Aplica los mismos cambios a competencias.js, pistas.js y seguimiento.js. */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2), D = __dirname, G = D;
let t = fs.readFileSync(IN, 'utf8');
const PL = path.join(D, '..', '..', 'plataforma'), src = { comp: path.join(PL, 'competencias.js'), pist: path.join(PL, 'pistas.js'), seg: path.join(PL, 'seguimiento.js') };
const S = {}; for (const k in src) S[k] = fs.readFileSync(src[k], 'utf8');
const cnt = (s, a) => s.split(a).length - 1;
function rep(a, b, file) { if (cnt(t, a) !== 1) throw new Error('Página: ' + cnt(t, a) + ' coincidencias para: ' + a.slice(0, 80));
  t = t.replace(a, () => b);
  if (file) { if (cnt(S[file], a) === 1) S[file] = S[file].replace(a, () => b); else if (cnt(S[file], b) !== 1) throw new Error(file + ': no se encontró: ' + a.slice(0, 80)); } }

/* 1 · Datos de las 24 clases */
const arr = []; for (let n = 13; n <= 36; n++) arr.push({ n, raw: fs.readFileSync(path.join(G, 'nivel-' + (n <= 24 ? 2 : 3), 'clase-' + n + '.md'), 'utf8').replace(/\r/g, '') });
const json = JSON.stringify(arr).replace(/<\//g, '<\\/');
const js = `
/* ===== Guitarra · Método Integral AMA, Niveles 2 y 3 (clases 13–36) =====
   Claves nuevas '1-0guitarra-c13…c24' y '2-0guitarra-c25…c36'. Las lecciones del formato anterior quedan dentro de su clase como «Para profundizar». */
const GNC23=${json};
const G23OLD=[['1-0guitarra-0',21],['1-0guitarra-1',22],['1-0guitarra-2',16],['1-0guitarra-3',15],['1-0guitarra-4',32],['1-0guitarra-5',17],['1-0guitarra-6',23],['1-0guitarra-7',18],['1-0guitarra-8',19],['1-0guitarra-9',24],['1-0guitarra-10',24],
 ['2-0guitarra-0',26],['2-0guitarra-1',31],['2-0guitarra-2',31],['2-0guitarra-3',26],['2-0guitarra-4',28],['2-0guitarra-5',30],['2-0guitarra-6',32],['2-0guitarra-7',36]];
const G2K=[],G3K=[];
G23OLD.forEach(([k])=>{if(LD[k]){LD[k].old=1;delete LD[k].w}});
const gOld2=k=>{const o=LD[k];if(!o)return '';return '<details class="card guide"><summary style="min-height:44px;cursor:pointer;color:var(--gold)">Para profundizar: '+esc(o.t)+'</summary>'+(typeof o.g==='function'?o.g():o.g||'')+'</details>'+(o.z?o.z():'')};
GNC23.forEach(r=>{const c=Object.assign({n:r.n},pParse(r.raw)),l=c.n<=24?1:2,i=(c.n-1)%12,S2=gSecs(c.md),pick=k=>S2.filter(s=>gCat(s.h)===k);
 const tar=pick('e').map(s=>s.b).join('\\n').split('\\n').map(x=>x.trim()).filter(x=>/^[-*\\d]/.test(x)).map(x=>gInl(x.replace(/^([-*]|\\d+\\.)\\s*/,'').replace(/^☐\\s*/,'')));
 const k=l+'-0guitarra-c'+c.n,old=G23OLD.filter(x=>x[1]===c.n).map(x=>x[0]).filter(x=>LD[x]);(l===1?G2K:G3K).push(k);
 LD[k]={u:'Clase '+c.n,t:c.t,s:'Guitarra '+['I','II','III'][l]+' · Mes '+String(c.mes).split(' ')[0]+' · Clase '+c.n+' · Nivel '+(l+1)+' · Semana '+(i+1),w:[i+1],o:esc(c.o),v:1,
  leer:()=>gCards(pick('leer'))+old.map(gOld2).join('')+gCred(c),
  p:()=>gCards(pick('p'))+'<div class="card">'+mmBox(['60 bpm'])+'</div>',
  q:c.q,
  e:(tar.length?'<b>Tu tarea:</b> '+tar.join(' · ')+'<br><br>':'')+'Cuéntale a tu docente cómo te fue: qué lograste y qué te costó.',
  fin:()=>gCards(pick('fin')),icon:licon(c.t)}});
INS.guitarra[1]=G2K.map(k=>LD[k].u+' · '+LD[k].t);INS.guitarra[2]=G3K.map(k=>LD[k].u+' · '+LD[k].t);LAV[1]=1;LAV[2]=1;
var GK=[G1K,G2K,G3K];
/* Avance anterior: la clase nueva queda hecha si el estudiante ya terminó todas las lecciones antiguas de su tema */
function gConv23(){let ch=false;const by={};G23OLD.forEach(([k,n])=>{(by[n]=by[n]||[]).push(k)});
 Object.keys(by).forEach(n=>{const ks=by[n].filter(k=>LD[k]),nk=(n<=24?1:2)+'-0guitarra-c'+n;if(ks.length&&ks.every(k=>S.done[k])&&!S.done[nk]){S.done[nk]=true;ch=true}});return ch}
if(gConv23())save();
`;
rep('AVAIL.piano=1;', 'AVAIL.piano=1;\n' + js);
/* 2 · Claves: Guitarra I, II y III usan las clases del Método Integral */
rep("const lk=(l,s,i)=>(s===0&&l===0&&getInst(0)==='guitarra'&&window.G1K&&G1K.length)?G1K[i]:", "const lk=(l,s,i)=>(s===0&&getInst(l)==='guitarra'&&window.GK&&GK[l]&&GK[l].length)?GK[l][i]:");
/* 3 · Competencias de guitarra N2–N3 con las clases nuevas */
const a0 = S.comp.indexOf(" [[0,'Toca la cejilla móvil"), a1 = S.comp.indexOf("[3,'Presenta el taller final de nivel',[8]]]],");
if (a0 < 0 || a1 < 0) throw new Error('competencias: bloque de guitarra');
const oldG = S.comp.slice(a0, a1 + "[3,'Presenta el taller final de nivel',[8]]]],".length);
const newG = ` [[2,'Nombra las notas del mástil con ♯ y ♭ y lee las notas graves',[1,2]],
  [2,'Toca las escalas de Do y Sol mayor y nombra sus grados',[3,7]],
  [0,'Toca G, C, los acordes de Do y el F con cejilla con cambios limpios',[4,8,9]],
  [1,'Rasguea balada, pop y vals, arpegia y toca semicorcheas y síncopa',[5,6,11]],
  [3,'Acompaña canciones completas con I–IV–V7, dinámicas y banda',[10,12]]],
 [[2,'Toca escalas menores, lee con armadura y clasifica intervalos',[1,2]],
  [0,'Toca ligados, staccato, acordes de poder y acordes móviles con cejilla',[3,4,5]],
  [2,'Usa funciones, cadencias y transporte con escala móvil y capotraste',[5,7]],
  [3,'Acompaña en varios estilos e improvisa con la pentatónica y el blues',[6,8]],
  [3,'Lee el Minueto, toca en grupo y presenta un recital completo',[9,10,11,12]]]],`;
rep(oldG, newG, 'comp');
rep("const cmK=(c,l,n)=>c==='guitarra'&&l===0?'0-0guitarra-c'+n:l+'-0'+c+'-'+(n-1);", "const cmK=(c,l,n)=>c==='guitarra'?l+'-0guitarra-c'+(n+12*l):l+'-0'+c+'-'+(n-1);", 'comp');
rep("const cmKeys=(c,l)=>c==='guitarra'&&l===0?[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>cmK(c,l,n)):", "const cmKeys=(c,l)=>c==='guitarra'?[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>cmK(c,l,n)):", 'comp');
/* 4 · Seguimiento: totales y conteos solo con las clases vigentes; convalidación también tras leer la nube */
rep("const segTot=c=>Object.keys(LD).filter(k=>k.indexOf('-0'+c+'-')>0).length;", "const segTot=c=>[0,1,2].reduce((a,l)=>a+cmKeys(c,l).filter(k=>LD[k]).length,0);", 'seg');
rep("done.forEach(k=>{const m=k.match(/^\\d-0([a-z]+)-/);if(m)car[m[1]]=(car[m[1]]||0)+1});", "done.forEach(k=>{const m=k.match(/^\\d-0([a-z]+)-/);if(m&&LD[k]&&!LD[k].old&&!/^0-0guitarra-\\d+$/.test(k))car[m[1]]=(car[m[1]]||0)+1});", 'seg');
rep("if(p.inst&&!Object.keys(S.inst||{}).length){S.inst=p.inst;ch=true}", "if(p.inst&&!Object.keys(S.inst||{}).length){S.inst=p.inst;ch=true}if(typeof gConv23==='function'&&gConv23())ch=true;", 'seg');
/* 5 · Pistas: referencias a las clases nuevas */
[["'Grados y progresiones','pop',90", "'Clase 22','pop',90"], ["'Acompañar una canción','pop',92", "'Clase 20','pop',92"], ["'Arpegios','b68',60", "'Clase 18','b68',60"], ["'Blues de 12 compases','shuffle',90", "'Clase 32','shuffle',90"], ["'Solos e improvisación','pop',84", "'Clase 32','pop',84"]].forEach(([a, b]) => rep(a, b, 'pist'));
fs.writeFileSync(OUT, t);
for (const k in src) fs.writeFileSync(src[k], S[k]);
console.log('ok', (t.length / 1e6).toFixed(2) + ' M caracteres');
