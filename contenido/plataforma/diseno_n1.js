/* ===== Rediseño de Guitarra Nivel 1 (2026-11-18): láminas nuevas con fondo oscuro, fotos con números que no se mueven
   ([[partes-foto]], [[postura-foto]], [[manos-foto]], [[tipos-foto]]) y el paso «Aprender» en diapositivas, una idea por pantalla.
   Lo que el estudiante ve queda guardado: la diapositiva en la que iba (S.ls[clase].dzi) y si prefiere ver todo en una página (dzt). ===== */
var DZNEW=new Set(/*DZNEW*/);
(function(){const T=/*DZTX*/;if(typeof IMGTX==='object')Object.assign(IMGTX,T)})();
(function(){const st=document.createElement('style');st.textContent=`
.gimg.gnew{background:none;max-width:760px;margin-left:auto;margin-right:auto}
.gtb .gimg.gnew{min-width:120px}
.dzfi{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:14px;align-items:start;margin-top:10px}
.dzlam{background:radial-gradient(ellipse at 50% 40%,#231a10,#0d0a07 75%);border-radius:16px;padding:6px;display:flex;justify-content:center}
.dzfoto{display:block;width:100%;height:auto;max-height:calc(100dvh - 230px)}
.dzpi{display:flex;flex-direction:column;gap:10px}
.dznums{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}.dznums.n7{grid-template-columns:repeat(4,minmax(0,1fr))}
.dznums button{min-height:44px;border-radius:12px;border:1px solid var(--line);background:#1c160f;color:var(--ivory);font:700 18px inherit;font-family:inherit;cursor:pointer}
.dznums button.on{background:var(--gold);color:#120c04;border-color:var(--gold2)}
.dzinfo{min-height:92px;background:#1c160f;border:1px solid var(--line);border-radius:14px;padding:12px 14px;line-height:1.4}.dzinfo b{font-size:22px;color:var(--gold2)}
.dzpnav{display:flex;gap:8px}.dzpnav .btn{flex:1;min-width:0;margin:0}.dzpnav .btn.ghost{flex:0 0 56px}
.dzgtr .mk,.dzpost .pm{cursor:pointer;outline:none}.dzgtr .mk circle,.dzpost .pm circle{transition:transform .15s;transform-box:fill-box;transform-origin:center}
.dzgtr .mk.on circle,.dzgtr .mk:focus-visible circle,.dzpost .pm.on circle,.dzpost .pm:focus-visible circle{transform:scale(1.22);fill:var(--gold2)}
.dzgtr .hl{opacity:0;transition:opacity .2s;stroke:var(--gold2);fill:none;pointer-events:none}.dzgtr .hl.on{opacity:1}
.dzmanos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:10px}
.dzmanos figure{margin:0;background:#1c160f;border:1px solid var(--line);border-radius:16px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.dzmanos svg{width:min(220px,100%);height:auto}.dzmanos span{color:var(--mute);font-size:15px}
.dztipos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:10px}
.dztipos article{background:#1c160f;border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.dztipos img{display:block;width:100%;height:220px;object-fit:contain;background:#000}.dztipos div{padding:10px 12px;display:flex;flex-direction:column;gap:4px}
.dztipos b{font-size:20px;color:var(--gold2)}.dztipos small{color:var(--mute);font-size:14px}
.dzv>.dzs{display:none}.dzv>.dzs.on,.dzv.todo>.dzs{display:block}.dzv>.dzs.on{animation:dzin .25s ease-out}
@keyframes dzin{from{transform:translateX(18px)}to{transform:none}}
.dztop{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:4px 0 8px;font-size:14px;color:var(--mute)}
.dztop .link{min-height:40px}
.dzbar{display:flex;align-items:center;gap:8px;margin-top:14px;background:#13110d;border:1px solid var(--line);border-radius:16px;padding:8px}
.dzbar .btn{margin:0;min-height:46px}.dzbar .btn.ghost{flex:0 0 56px}.dzbar .btn.sig{flex:0 1 auto;margin-left:auto}
.dzpts{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;flex:1;min-width:0}
.dzpts button{width:10px;height:10px;border-radius:99px;border:0;padding:0;background:#4a3f2c;cursor:pointer}.dzpts button.on{width:22px;background:var(--gold)}
.dzn{font-weight:700;color:var(--gold2);font-size:16px}
.dzv.todo~.dzbar,.dzv.todo .dzbar{display:none}
@media (max-width:720px){.dzfi{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:8px}.dzfoto{max-height:calc(100dvh - 200px)}
 .dznums{gap:4px}.dznums button{min-height:36px;font-size:15px;border-radius:10px}.dzinfo{min-height:0;padding:8px 10px;font-size:14px}.dzinfo b{font-size:17px}
 .dzpnav .btn{min-height:40px;padding:6px 8px;font-size:14px}.dzpnav .btn.ghost{flex:0 0 44px}
 .dztipos{grid-template-columns:minmax(0,1fr)}.dztipos article{flex-direction:row}.dztipos img{width:42%;height:150px}
 .dzbar{margin-right:62px}.dzbar .btn{min-height:42px;padding:8px 12px;font-size:15px}}
`;document.head.appendChild(st)})();

/* ---------- Fotos con números ---------- */
const DZPARTES=[['Clavijero','La cabeza de la guitarra. Sostiene las clavijas.'],['Clavijas','Giran para tensar o aflojar cada cuerda: así se afina.'],['Cejuela','Pieza blanca que guía las cuerdas al salir del clavijero.'],['Mástil','La parte larga de madera que va de la cabeza a la caja.'],['Diapasón','La cara del mástil donde pisamos las cuerdas.'],['Trastes','Barritas metálicas. De un traste al siguiente hay un semitono.'],['Boca','El agujero redondo por donde sale el sonido.'],['Cuerdas','Seis: de la 6.ª (la más gruesa y grave) a la 1.ª (la más delgada y aguda).'],['Caja de resonancia','El cuerpo hueco que amplifica el sonido de las cuerdas.'],['Puente','Sujeta las cuerdas sobre la tapa, cerca de la boca.']];
const DZPASOS=['Pies planos en el suelo.','Me siento en el borde de la silla.','La guitarra se apoya en mi <b>pierna derecha</b>.','Espalda recta y hombros sueltos.','El mástil, un poco hacia arriba.','El brazo derecho descansa sobre la caja; la mano queda sobre la boca.','Mano izquierda: <b>el pulgar detrás del mástil</b> y los dedos arqueados.'];
const dzMK=(c,n,x,y,r)=>'<g class="'+c+'" data-n="'+n+'" tabindex="0" role="button" aria-label="'+(c==='mk'?'Parte ':'Paso ')+n+'"><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#f2b93b" stroke="#1b1206" stroke-width="'+(r/6)+'"/><text x="'+x+'" y="'+(y+r*.36)+'" text-anchor="middle" font-family="Jost,sans-serif" font-size="'+(r*1.05)+'" font-weight="700" fill="#1b1206">'+n+'</text></g>';
const dzLN=(a,b,c,d)=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="#f2b93b" stroke-width="5" stroke-dasharray="10 8" opacity=".85"/>';
function dzBotones(n,cols){let h='<div class="dznums'+(cols?' n7':'')+'" role="group">';for(let i=1;i<=n;i++)h+='<button data-dzb="'+i+'" aria-label="'+i+'">'+i+'</button>';return h+'</div>'}
function dzFicha(svg,n,tipo){return '<div class="dzw dzfi" data-dzt="'+tipo+'" data-max="'+n+'"><div class="dzlam">'+svg+'</div><div class="dzpi">'+dzBotones(n,n===7)+'<div class="dzinfo" aria-live="polite"><span class="mute">Toca un número.</span></div><div class="dzpnav"><button class="btn ghost" data-dzm="-1" aria-label="Anterior">←</button><button class="btn" data-dzm="1">Siguiente →</button></div></div></div>'}
function dzFoto(k){
 if(k==='partes'){const hl=[[1,'<rect x="470" y="12" width="150" height="255" rx="30"/>'],[2,'<rect x="440" y="80" width="40" height="160" rx="14"/><rect x="608" y="80" width="40" height="160" rx="14"/>'],[3,'<rect x="488" y="262" width="114" height="24" rx="6"/>'],[4,'<rect x="482" y="278" width="126" height="420" rx="10"/>'],[5,'<rect x="494" y="280" width="102" height="545" rx="6"/>'],[6,'<rect x="488" y="330" width="114" height="230" rx="6"/>'],[7,'<circle cx="545" cy="905" r="80"/>'],[8,'<rect x="512" y="270" width="66" height="900" rx="12"/>'],[9,'<path d="M545,684 C450,684 345,700 340,790 C336,860 372,900 362,950 C350,1010 262,1060 262,1200 C262,1330 380,1398 545,1398 C710,1398 828,1330 828,1200 C828,1060 740,1010 728,950 C718,900 754,860 750,790 C745,700 640,684 545,684 Z"/>'],[10,'<rect x="400" y="1138" width="288" height="48" rx="8"/>']];
  const mk=[[1,545,48],[2,700,160],[3,680,274],[4,420,520],[5,545,470],[6,680,420],[7,545,905],[8,640,1060],[9,740,1290],[10,760,1162]];
  const svg='<svg class="dzgtr dzfoto" viewBox="235 0 620 1448" role="group" aria-label="Partes de la guitarra clásica"><image href="guitarra/img/G02_partes_guitarra.jpg" x="0" y="0" width="1086" height="1448"/>'+dzLN(602,274,650,274)+dzLN(482,520,450,520)+dzLN(602,420,650,420)+dzLN(688,1162,730,1162)+dzLN(648,160,670,160)+hl.map(([n,s])=>'<g class="hl" data-h="'+n+'" style="stroke-width:8px">'+s+'</g>').join('')+mk.map(([n,x,y])=>dzMK('mk',n,x,y,21)).join('')+'</svg>';
  return dzFicha(svg,10,'p')}
 if(k==='postura'){const mk=[[1,560,1300],[2,560,905],[3,300,820],[4,560,420],[5,1000,180],[6,300,520],[7,960,360]];
  return dzFicha('<svg class="dzpost dzfoto" viewBox="150 0 940 1402" role="group" aria-label="Postura con la guitarra en 7 pasos"><image href="guitarra/img/G03_postura.jpg" x="0" y="0" width="1122" height="1402"/>'+mk.map(([n,x,y])=>dzMK('pm',n,x,y,25)).join('')+'</svg>',7,'s')}
 if(k==='manos'){const m=izq=>{const lab=izq?[['1',880,200,'#2AA7E8'],['2',637,105,'#2E9E4F'],['3',430,190,'#F57C00'],['4',252,360,'#8E3BB8'],['atrás',1135,660,'#6b6457']]:[['i',420,195,'#2AA7E8'],['m',640,110,'#2E9E4F'],['a',855,195,'#F57C00'],['p',210,610,'#E5312B']];
   return '<svg viewBox="0 0 1254 1254" role="img" aria-label="Mano '+(izq?'izquierda':'derecha')+'"><image href="guitarra/img/'+(izq?'G04_mano_izquierda':'G05_mano_derecha')+'.jpg" x="0" y="0" width="1254" height="1254"/>'+lab.map(([t,x,y,c])=>'<circle cx="'+x+'" cy="'+y+'" r="'+(t.length>1?52:46)+'" fill="'+c+'" stroke="#1b1206" stroke-width="6"/><text x="'+x+'" y="'+(y+(t.length>1?12:18))+'" text-anchor="middle" font-family="Jost,sans-serif" font-weight="700" font-size="'+(t.length>1?32:54)+'" fill="'+(/2AA7E8|2E9E4F|F57C00/.test(c)?'#111':'#fff')+'">'+t+'</text>').join('')+'</svg>'};
  return '<div class="dzmanos"><figure>'+m(1)+'<figcaption><b>Mano izquierda · pisa</b><br><span>Números: 1 índice · 2 medio · 3 anular · 4 meñique. El pulgar va detrás del mástil.</span></figcaption></figure><figure>'+m(0)+'<figcaption><b>Mano derecha · toca</b><br><span>Letras: <b>p</b> pulgar · <b>i</b> índice · <b>m</b> medio · <b>a</b> anular.</span></figcaption></figure></div>'}
 if(k==='tipos')return '<div class="dztipos">'+[['G09_clasica','Clásica','Cuerdas de nailon','Sonido cálido y dulce. Es la que usamos en el Nivel 1.'],['G10_acustica','Acústica','Cuerdas de acero','Sonido brillante y fuerte.'],['G11_electrica','Eléctrica','Acero + amplificador','Necesita corriente y un amplificador para sonar.']].map(t=>'<article><img src="guitarra/img/'+t[0]+'.jpg" alt="Guitarra '+t[1].toLowerCase()+'" loading="lazy"><div><b>'+t[1]+'</b><span>'+t[2]+'</span><small>'+t[3]+'</small></div></article>').join('')+'</div>';
 return ''}
function dzMarca(w,n){const t=w.dataset.dzt,max=+w.dataset.max;n=((n-1+max)%max)+1;w.dataset.sel=n;
 w.querySelectorAll('.mk,.pm').forEach(m=>m.classList.toggle('on',+m.dataset.n===n));w.querySelectorAll('.hl').forEach(h=>h.classList.toggle('on',+h.dataset.h===n));
 w.querySelectorAll('[data-dzb]').forEach(b=>b.classList.toggle('on',+b.dataset.dzb===n));
 const i=w.querySelector('.dzinfo');if(i)i.innerHTML=t==='p'?'<b>'+n+'. '+DZPARTES[n-1][0]+'</b><br>'+DZPARTES[n-1][1]:'<b>Paso '+n+'</b><br>'+DZPASOS[n-1]}
document.addEventListener('click',e=>{const w=e.target.closest&&e.target.closest('.dzw');if(!w)return;
 const m=e.target.closest('.mk,.pm,[data-dzb]');if(m)return dzMarca(w,+(m.dataset.n||m.dataset.dzb));
 const v=e.target.closest('[data-dzm]');if(v)dzMarca(w,(+w.dataset.sel||0)+(+v.dataset.dzm))});
document.addEventListener('keydown',e=>{const m=e.target.closest&&e.target.closest('.dzw .mk,.dzw .pm');if(m&&(e.key==='Enter'||e.key===' ')){e.preventDefault();dzMarca(m.closest('.dzw'),+m.dataset.n)}});

/* ---------- «Aprender» en diapositivas ---------- */
function dzSlides(html,K){return '<div class="dzv" data-k="'+K+'">'+html+'</div>'}
function dzInit(v){v.dataset.on=1;const K=v.dataset.k,L=(S.ls[K]=S.ls[K]||{}),kids=[...v.children],G=[];
 kids.forEach(c=>{if(!G.length||c.matches('.card'))G.push([]);G[G.length-1].push(c)});
 if(G.length<2)return;
 G.forEach(g=>{const s=document.createElement('section');s.className='dzs';g[0].before(s);g.forEach(c=>s.append(c))});
 const S2=[...v.querySelectorAll(':scope>.dzs')],N=S2.length,body=v.parentElement,nx=()=>body&&body.querySelector('.btn[data-st="2"]');
 const top=document.createElement('div');top.className='dztop';top.innerHTML='<span class="dzcnt"></span><button class="link dztodo"></button>';v.prepend(top);
 const bar=document.createElement('div');bar.className='dzbar';bar.innerHTML='<button class="btn ghost" data-dzv="-1" aria-label="Diapositiva anterior">←</button><div class="dzpts">'+(N<=6?S2.map((_,i)=>'<button data-dzi="'+i+'" aria-label="Ir a la diapositiva '+(i+1)+'"></button>').join(''):'<span class="dzn"></span>')+'</div><button class="btn sig" data-dzv="1"></button>';v.after(bar);
 let cur=Math.min(+L.dzi||0,N-1),todo=!!L.dzt;
 const pinta=(mover)=>{v.classList.toggle('todo',todo);bar.hidden=todo;S2.forEach((s,i)=>s.classList.toggle('on',i===cur));
  bar.querySelectorAll('[data-dzi]').forEach((b,i)=>{b.classList.toggle('on',i===cur);b.setAttribute('aria-current',i===cur)});
  [cur,cur+1].forEach(j=>S2[j]&&S2[j].querySelectorAll('img[loading="lazy"]').forEach(im=>{im.loading='eager'}));if(todo)v.querySelectorAll('img[loading="lazy"]').forEach(im=>{im.loading='eager'});
  const dn=bar.querySelector('.dzn');if(dn)dn.textContent=(cur+1)+' / '+N;
  top.querySelector('.dzcnt').textContent=todo?'Toda la explicación':'Diapositiva '+(cur+1)+' de '+N;top.querySelector('.dztodo').textContent=todo?'Ver en diapositivas':'Ver todo en una página';
  bar.querySelector('[data-dzv="-1"]').disabled=cur===0;bar.querySelector('.sig').textContent=cur===N-1?'Siguiente: practicar ▶':'Siguiente →';
  const b=nx();if(b)b.hidden=!todo;
  L.dzi=cur;L.dzt=todo?1:0;if(typeof save==='function')save();
  if(mover){const y=v.getBoundingClientRect().top+window.scrollY-80;if(window.scrollY>y)window.scrollTo({top:y,behavior:'smooth'})}};
 const ir=i=>{if(i>=N){const b=nx();if(b)b.click();return}cur=Math.max(0,i);pinta(1)};
 top.querySelector('.dztodo').onclick=()=>{todo=!todo;pinta(1)};
 bar.addEventListener('click',e=>{const d=e.target.closest('[data-dzv]'),p=e.target.closest('[data-dzi]');if(d)ir(cur+(+d.dataset.dzv));else if(p)ir(+p.dataset.dzi)});
 let x0=null,y0=0;v.addEventListener('touchstart',e=>{if(todo||e.target.closest('.dzw,.gtw,input,textarea,button'))return x0=null;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 v.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)ir(cur+(dx<0?1:-1))},{passive:true});
 pinta(0)}
(function(){const lb=document.getElementById('lec-body');if(!lb)return;new MutationObserver(()=>lb.querySelectorAll('.dzv:not([data-on])').forEach(dzInit)).observe(lb,{childList:true,subtree:true})})();
[].concat(typeof G1K!=='undefined'?G1K:[],typeof G2K!=='undefined'?G2K:[],typeof G3K!=='undefined'?G3K:[],[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>'0-0piano-'+i),[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>'1-0piano-'+i)).forEach(k=>{const D=LD[k];if(!D||!D.leer||D.dzw)return;const o=D.leer;D.dzw=1;D.leer=(K,L)=>dzSlides(o(K,L),k)});
