/* Ajustes de la revisión completa (15/11/2026): las herramientas pasan a cubrir las cinco carreras.
   Uso: node ajustes_cinco_carreras.js IN OUT   (IN = página publicada sin envoltorio)
   Aplica los mismos cambios a los módulos fuente de esta carpeta cuando encuentra el texto original. */
const fs = require('fs'), path = require('path');
const [IN, OUT] = process.argv.slice(2), D = __dirname;
let t = fs.readFileSync(IN, 'utf8');
const SRC = ['competencias.js', 'seguimiento.js', 'retos.js', 'pistas.js', 'partitura.js'].map(f => path.join(D, f)).concat([path.join(D, '..', 'GUIA_DOCENTE.md')]);
const S = {}; SRC.forEach(f => { if (fs.existsSync(f)) S[f] = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n'); });
const cnt = (s, a) => s.split(a).length - 1;
function rep(a, b, n = 1) {
  const c = cnt(t, a); if (c !== n) throw new Error('Página: ' + c + ' coincidencias (se esperaban ' + n + ') para: ' + a.slice(0, 90));
  t = t.split(a).join(b);
  for (const f in S) if (cnt(S[f], a)) S[f] = S[f].split(a).join(b);
}

/* 1 · Guitarra N2–N3: claves de las clases nuevas en competencias, certificados y conteos */
rep("const cmK=(c,l,n)=>c==='guitarra'&&l===0?'0-0guitarra-c'+n:l+'-0'+c+'-'+(n-1);", "const cmK=(c,l,n)=>c==='guitarra'?l+'-0guitarra-c'+(n+12*l):l+'-0'+c+'-'+(n-1);");
rep("const cmKeys=(c,l)=>c==='guitarra'&&l===0?[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>cmK(c,l,n)):", "const cmKeys=(c,l)=>c==='guitarra'?[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>cmK(c,l,n)):");
rep("const segTot=c=>Object.keys(LD).filter(k=>k.indexOf('-0'+c+'-')>0).length;", "const segTot=c=>[0,1,2].reduce((a,l)=>a+cmKeys(c,l).filter(k=>LD[k]).length,0);");
rep(" done.forEach(k=>{const m=k.match(/^\\d-0([a-z]+)-/);if(m)car[m[1]]=(car[m[1]]||0)+1});",
  " const VK=new Set();Object.keys(CARN).forEach(c=>[0,1,2].forEach(l=>cmKeys(c,l).forEach(k=>VK.add(k))));\n done.forEach(k=>{const m=k.match(/^\\d-0([a-z]+)-/);if(m&&VK.has(k))car[m[1]]=(car[m[1]]||0)+1});");
/* 2 · Competencias: guitarra N2–N3 con las clases publicadas; bajo y canto nuevas */
const a0 = t.indexOf(" [[0,'Toca la cejilla móvil"), endTxt = "[3,'Presenta el taller final de nivel',[8]]]],", a1 = t.indexOf(endTxt);
if (a0 < 0 || a1 < 0) throw new Error('competencias de guitarra');
const oldG = t.slice(a0, a1 + endTxt.length);
const newG = ` [[2,'Nombra las notas con ♯ y ♭, lee los bordones y cuenta intervalos',[1,2]],
  [2,'Construye la escala mayor, toca Sol mayor y nombra los grados',[3,7]],
  [0,'Toca los acordes de la tonalidad y el F con cejilla con cambios limpios',[4,8,9]],
  [1,'Rasguea patrones con acento y arpegia con p–i–m–a',[5,6]],
  [3,'Acompaña canciones completas con I–IV–V y expresión',[10,11,12]]],
 [[2,'Toca escalas menores, lee armaduras y nombra los intervalos',[1,2]],
  [0,'Toca legato y staccato, séptimas e inversiones',[3,4]],
  [2,'Usa funciones y cadencias y cambia de tonalidad',[5,7]],
  [3,'Acompaña en varios estilos e improvisa con la pentatónica',[6,8]],
  [3,'Analiza una obra, toca en grupo y presenta el recital final',[9,10,11,12]]]],
bajo:[
 [[0,'Conoce su bajo, se sienta bien y usa los dedos de las dos manos',[1,2,3]],
  [2,'Lee en clave de fa las notas de las cuerdas MI, LA y RE',[4,8]],
  [1,'Mantiene el pulso con el bombo en negras, silencios y corcheas',[5,6,7]],
  [0,'Toca la raíz de los acordes y encuentra tonos y semitonos en el mástil',[9,10]],
  [3,'Toca la escala de Do y acompaña canciones con la raíz',[11,12]]],
 [[2,'Lee las cuerdas en el pentagrama y las notas con alteraciones en las 5 cuerdas',[1,10]],
  [1,'Toca raíz y quinta, también en tresillos',[2,3]],
  [0,'Toca la escala mayor y sus patrones 1 y 4 con la digitación correcta',[4,5,8]],
  [2,'Toca arpegios mayores, menores, de tríadas y la séptima dominante',[6,7,9,11]],
  [3,'Acompaña canciones completas con la banda',[12]]],
 [[2,'Usa intervalos y octavas en el diapasón',[1,2,4]],
  [0,'Toca ligados, slap, funk y con púa',[3,5,6,7]],
  [0,'Domina los 5 patrones de la escala y hace rellenos',[8,10]],
  [2,'Lee una partitura completa de bajo',[9]],
  [3,'Toca con el grupo y presenta el recital final',[10,11,12]]]],
canto:[
 [[0,'Respira, se para con buena postura y calienta la voz',[1,2,3]],
  [2,'Lee notas en el pentagrama y canta su primera melodía',[4,8]],
  [1,'Mantiene el pulso y respira en los silencios',[5,6,7]],
  [2,'Canta arpegios, tonos y semitonos y la escala de Do',[9,10,11]],
  [3,'Canta canciones completas, afinado y con expresión',[12]]],
 [[2,'Canta intervalos y la escala mayor, y lee sin color',[1,2,3,7]],
  [3,'Canta con acompañamiento, con buena dicción y fraseo',[4,5]],
  [0,'Usa el legato, el puntillo y el micrófono',[6,9]],
  [1,'Canta a dos voces y en coro',[8,10]],
  [3,'Canta con expresión y se presenta ante la clase',[11,12]]],
 [[2,'Distingue mayor y menor y entrena su oído',[1,2]],
  [0,'Amplía sus registros y su agilidad cuidando la voz',[3,11]],
  [1,'Canta a tres voces y resuelve los finales de frase',[4,5]],
  [3,'Canta en varios estilos, en su tonalidad, e improvisa',[6,7,8]],
  [3,'Interpreta, dirige voces y presenta su recital',[9,10,12]]]],`;
rep(oldG, newG);
rep("const CMF={guitarra:'G',piano:'P',bateria:'B'};", "const CMF={guitarra:'G',piano:'P',bateria:'B',bajo:'J',canto:'C'};");
rep("const cmCar=()=>{const c=(S.ubic&&S.ubic.car)||getInst(S.lvl||0)||getInst(0);return CMP[c]?c:null};", "const cmCar=()=>{const c=(S.ubic&&S.ubic.car)||getInst(S.lvl||0)||getInst(0);return CMP[c]&&AVAIL[c]?c:null};");
/* 3 · Premios de la racha para bajo y canto */
rep(" bateria:[[3,'Ritmo de marcha'", ` bajo:[[3,'Raíz y quinta','El patrón más usado del bajo',['Do','Sol']],[7,'Línea de vals','Raíz en el 1 y quinta en el 3',['Do','Sol','Do']],[14,'Arpegio mayor','Raíz, tercera y quinta',['Do','Mi','Sol']],[21,'Arpegio menor','La, Do y Mi: el color oscuro',['La','Do','Mi']],[30,'Insignia Arpa Dorada','Las 7 cuerdas encendidas',NORD]],
 canto:[[3,'Tres notas para calentar','Do, Re y Mi con «lu»',['Do','Re','Mi']],[7,'Arpegio para la voz','Do, Mi y Sol en legato',['Do','Mi','Sol']],[14,'Acorde a tres voces','Fa, La y Do para armonizar',['Fa','La','Do']],[21,'La dominante','Sol, Si y Re: la voz que pide volver a casa',['Sol','Si','Re']],[30,'Insignia Arpa Dorada','Las 7 cuerdas encendidas',NORD]],
 bateria:[[3,'Ritmo de marcha'`);
rep(" const tb=cmCar()==='guitarra'?'guitarra':'piano',fs=r[3].map(x=>(JG_N.find(n=>n.name===x)||{}).f).filter(Boolean);",
  " const cc=cmCar(),tb=cc==='guitarra'||cc==='bajo'?'guitarra':cc==='canto'?'canto':'piano',fs=r[3].map(x=>(JG_N.find(n=>n.name===x)||{}).f).filter(Boolean).map(f=>cc==='bajo'?f/4:f);");
/* 4 · Prueba de ubicación: bajo y canto; batería con sus tres niveles */
rep("const UCAP={bateria:3};/* meses con clases publicadas: batería solo tiene el Nivel 1 */", "const UCAP={};/* las cinco carreras tienen sus 9 meses publicados */");
rep("\nconst UCAP={};", `
UA.bajo=['Conozco las partes del bajo, me siento bien y leo en clave de fa las notas de la cuerda MI.','Toco negras, silencios y corcheas en las cuerdas LA y RE junto con el bombo (por ejemplo, el «Himno de la alegría»).','Toco la raíz de los acordes y la escala de Do en una canción.','Toco raíz y quinta, también en tresillos, y la escala mayor de una octava.','Toco arpegios mayores y menores y los patrones 1 y 4 de la escala.','Toco la séptima dominante y acompaño canciones completas con la banda.','Uso intervalos, octavas y ligados en el diapasón.','Toco slap, funk y con púa, y hago rellenos.','Leo una partitura completa de bajo y toco con los 5 patrones de la escala.'];
UA.canto=['Respiro bien, me paro con buena postura, caliento la voz y leo notas en el pentagrama.','Canto con pulso estable y respiro en los silencios (por ejemplo, el «Himno de la alegría»).','Canto arpegios, la escala de Do y canciones completas afinado.','Canto intervalos y la escala mayor con acompañamiento.','Canto con buena dicción y legato, y a dos voces.','Canto con micrófono, en coro y me presento ante un grupo.','Distingo mayor y menor de oído y amplío mis registros.','Canto a tres voces, en varios estilos y en mi tonalidad.','Improviso, interpreto con expresión y dirijo las voces de un equipo.'];
const UCAP={};`);
/* 5 · Pistas: bajo y canto */
const MAPC = "({piano:'p',bateria:'b',bajo:'j',canto:'c'}[c]||'g')";
rep("c==='piano'?'p':c==='bateria'?'b':'g'", MAPC, 3);
rep("[['g','🎸 Guitarra'],['p','🎹 Piano'],['b','🥁 Batería']]", "[['g','🎸 Guitarra'],['p','🎹 Piano'],['b','🥁 Batería'],['j','🎸 Bajo'],['c','🎤 Canto']]", 2);
rep("const PTCR={g:'guitarra',p:'piano',b:'bateria'};", "const PTCR={g:'guitarra',p:'piano',b:'bateria',j:'bajo',c:'canto'};");
rep("PTpart.dr=PTcar!=='b'}", "PTpart.dr=PTcar!=='b';PTpart.bj=PTcar!=='j'}");
rep("'Hi-hat en semicorcheas y notas fantasma en el redoblante.']];", `'Hi-hat en semicorcheas y notas fantasma en el redoblante.'],
 ['j1a','j',1,'La raíz con la banda','Clase 9','pop',70,['C','G','Am','F'],'Toca la raíz de cada acorde en negras, junto con el bombo. La línea de bajo de la pista empieza apagada: el bajo eres tú.'],
 ['j1b','j',1,'Mis primeras canciones','Clase 12','balada',72,['C','F','G','C'],'Raíz en el 1 y en el 3. Mira siempre el acorde que viene.'],
 ['j2a','j',2,'Raíz y quinta','Clase 14','pop',80,['G','C','D','G'],'Raíz en el 1 y quinta en el 3: el patrón más usado del bajo.'],
 ['j2b','j',2,'Arpegios con la banda','Clase 18','balada',72,['C','Am','F','G'],'Raíz, tercera y quinta de cada acorde, en negras.'],
 ['j3a','j',3,'Funk con la banda','Clase 30','pop',96,['Em7','A7','Em7','A7'],'Pulgar en la raíz y pop en la octava: el slap de las clases 29 y 30.'],
 ['j3b','j',3,'Blues en La','Clase 32','shuffle',90,['A7','A7','A7','A7','D7','D7','A7','A7','E7','D7','A7','E7'],'Camina por raíz, tercera, quinta y sexta sobre la forma del blues.'],
 ['c1a','c',1,'Canto con la banda','Clase 8','balada',70,['C','F','G','C'],'Canta el «Himno de la alegría»: empieza en MI después del compás de click.'],
 ['c1b','c',1,'Mis primeras canciones','Clase 12','vals',84,['C','C','G','G','G','G','C','C'],'Respira al final de cada frase, nunca en medio de una palabra.'],
 ['c2a','c',2,'Canto con acompañamiento','Clase 16','pop',84,['G','C','D','G'],'Escucha el acorde antes de entrar y busca tu primera nota.'],
 ['c2b','c',2,'Armonías a dos voces','Clase 20','balada',72,['C','Am','F','G'],'Una voz canta la melodía; la otra, una tercera más arriba.'],
 ['c3a','c',3,'Mayor y menor','Clase 25','balada',72,['Am','Dm','E7','Am'],'Escucha el color menor y llévalo a tu interpretación.'],
 ['c3b','c',3,'Improvisación vocal','Clase 32','shuffle',84,['C7','C7','F7','C7','G7','F7','C7','G7'],'Improvisa con la pentatónica de Do: pocas notas y muchos silencios.']];`);
/* 6 · Partituras: bajo (clave de fa, suena una octava más grave) y canto */
rep(" const P=scPc(SCsel),m=P.gtr?n.midi-12:n.midi,f=440*Math.pow(2,(m-69)/12),c=AC();\n if(P.gtr){", " const P=scPc(SCsel),m=(P.gtr||P.bj)?n.midi-12:n.midi,f=440*Math.pow(2,(m-69)/12),c=AC();\n if(P.gtr||P.bj){");
rep("analiza primero la tonalidad (Sol mayor, un sostenido) y la forma en dos frases.'}];", `analiza primero la tonalidad (Sol mayor, un sostenido) y la forma en dos frases.'},
 {id:'him1c',car:'c',lv:1,t:'Himno de la alegría',cl:'Clase 8',au:'Ludwig van Beethoven',ts:[4,4],key:0,bpm:76,v:[{clef:'G',n:scHim(['C4','D4','E4','F4','G4']).replace(/q\\d|h\\d/g,m=>m[0])}],tip:'Primero con «lu», después con el nombre de las notas. Respira en cada blanca.'},
 {id:'estc',car:'c',lv:2,t:'Estrellita',cl:'Lectura',au:'Melodía popular francesa (dominio público)',ts:[4,4],key:0,bpm:80,v:[{clef:'G',n:'C4q C4q G4q G4q | A4q A4q G4h | F4q F4q E4q E4q | D4q D4q C4h | G4q G4q F4q F4q | E4q E4q D4h | G4q G4q F4q F4q | E4q E4q D4h | C4q C4q G4q G4q | A4q A4q G4h | F4q F4q E4q E4q | D4q D4q C4h'}],tip:'El salto de DO a SOL es una quinta: imagínalo antes de cantarlo.'},
 {id:'him2c',car:'c',lv:2,t:'Himno de la alegría en Sol',cl:'Clase 16',au:'Ludwig van Beethoven',ts:[4,4],key:1,bpm:80,v:[{clef:'G',n:scHim(['G4','A4','B4','C5','D5']).replace(/q\\d|h\\d/g,m=>m[0])}],tip:'Más agudo: apoya la respiración y no subas los hombros.'},
 {id:'him3c',car:'c',lv:3,t:'Himno de la alegría en Re (ritmo original)',cl:'Clase 31',au:'Ludwig van Beethoven',ts:[4,4],key:2,bpm:84,v:[{clef:'G',n:scHim(['D4','E4','F#4','G4','A4'],1).replace(/q\\d|qd\\d|h\\d|e\\d/g,m=>m.replace(/\\d$/,''))}],tip:'Cambio de tonalidad y ritmo con puntillo: busca tu tonalidad cómoda.'},
 {id:'raizj',car:'j',lv:1,t:'Raíces: C – G – Am – F',cl:'Clase 9',ts:[4,4],key:0,bpm:70,bj:1,v:[{clef:'F',n:'C3q C3q C3q C3q | G2q G2q G2q G2q | A2q A2q A2q A2q | F2q F2q F2q F2q | C3q C3q C3q C3q | G2q G2q G2q G2q | F2q F2q G2q G2q | C3w'}],tip:'DO en la cuerda LA (traste 3), SOL y FA en la cuerda MI, LA al aire.'},
 {id:'him1j',car:'j',lv:1,t:'Himno de la alegría en el bajo',cl:'Clase 8',au:'Ludwig van Beethoven',ts:[4,4],key:0,bpm:70,bj:1,v:[{clef:'F',n:scHim(['C3','D3','E3','F3','G3']).replace(/q\\d|h\\d/g,m=>m[0])}],tip:'La melodía en las cuerdas LA y RE. El bajo suena una octava más grave de lo que se escribe.'},
 {id:'r5j',car:'j',lv:2,t:'Raíz y quinta: G – C – D – G',cl:'Clase 14',ts:[4,4],key:0,bpm:80,bj:1,v:[{clef:'F',n:'G2h D3h | C3h G3h | D3h A3h | G2h D3h | G2h D3h | C3h G3h | D3h A3h | G2w'}],tip:'La quinta está siempre en la cuerda de al lado, dos trastes más arriba.'},
 {id:'arpj',car:'j',lv:2,t:'Arpegios: C – Am – F – G',cl:'Clase 18',ts:[4,4],key:0,bpm:76,bj:1,v:[{clef:'F',n:'C3q E3q G3q E3q | A2q C3q E3q C3q | F2q A2q C3q A2q | G2q B2q D3q B2q | C3w'}],tip:'Raíz, tercera y quinta de cada acorde.'},
 {id:'bluesj',car:'j',lv:3,t:'Blues en La: la línea que camina',cl:'Clase 32',ts:[4,4],key:0,bpm:84,bj:1,v:[{clef:'F',n:'A2q C#3q E3q F#3q | A2q C#3q E3q F#3q | A2q C#3q E3q F#3q | A2q C#3q E3q F#3q | D3q F#3q A3q B3q | D3q F#3q A3q B3q | A2q C#3q E3q F#3q | A2q C#3q E3q F#3q | E3q G#3q B3q C#4q | D3q F#3q A3q B3q | A2q C#3q E3q F#3q | E3q G#3q B3q E3q'}],tip:'Raíz, tercera, quinta y sexta de cada acorde: el walking del blues.'}];`);
rep("mid:e.n.x?0:(P.gtr?e.n.midi-12:e.n.midi)", "mid:e.n.x?0:((P.gtr||P.bj)?e.n.midi-12:e.n.midi)");
/* 7 · Guía del docente: las cinco carreras */
rep("Sirve para guitarra, piano y batería, y para las carreras que se vayan abriendo.", "Sirve para las cinco carreras: guitarra, piano, batería, bajo y canto.");
fs.writeFileSync(OUT, t);
for (const f in S) fs.writeFileSync(f, S[f]);
console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
