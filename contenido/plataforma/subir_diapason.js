/* Diapasón interactivo de guitarra: al tocar una cuerda en un traste, la nota aparece SOBRE la cuerda,
   con su color del Método Integral («Fa · F»), además de sonar. Se aplica después de subir_carreras_un_lugar.js.
   Uso: node subir_diapason.js IN OUT */
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
let t = fs.readFileSync(IN, 'utf8');
const cnt = a => t.split(a).length - 1;
function rep(a, b, n = 1) { const c = cnt(a); if (c !== n) throw new Error(c + ' coincidencias para: ' + a.slice(0, 80)); t = t.split(a).join(b); }
rep("function fbPlay(k,el){const[s,f]=k.split(',').map(Number);tone(OP[s]*Math.pow(2,f/12),1.3,'triangle',.35);const c=el&&el.closest('.card'),p=c&&c.querySelector('.fbcap');if(p)p.textContent=fbName(s,f)}",
  "function fbPlay(k,el){const[s,f]=k.split(',').map(Number);tone(OP[s]*Math.pow(2,f/12),1.3,'triangle',.35);const c=el&&el.closest('.card'),p=c&&c.querySelector('.fbcap');if(p)p.textContent=fbName(s,f);fbMark(el,s,f)}\n"
  + "/* La nota tocada aparece sobre la cuerda, en su color; queda hasta el siguiente toque */\n"
  + "function fbMark(el,s,f){const sv=el&&el.closest&&el.closest('svg');if(!sv)return;const o=sv.querySelector('.fbtap');if(o)o.remove();let cx,cy;\n"
  + " if(el.tagName==='rect'){cx=+el.getAttribute('x')+(+el.getAttribute('width'))/2;cy=+el.getAttribute('y')+9}else{const ci=el.querySelector('circle');if(!ci)return;cx=+ci.getAttribute('cx');cy=+ci.getAttribute('cy')}\n"
  + " const i=(OI[s]+f)%12,n=SN[i],col=nc(n)||'#f2a31b',lab=n+' · '+CN[i],w=Math.max(34,lab.length*5.6+10);cx=Math.max(w/2+1,Math.min(309-w/2,cx));\n"
  + " const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','fbtap');g.setAttribute('pointer-events','none');\n"
  + " g.innerHTML='<rect x=\"'+(cx-w/2)+'\" y=\"'+(cy-8.5)+'\" width=\"'+w+'\" height=\"17\" rx=\"8.5\" fill=\"'+col+'\" stroke=\"#fff\" stroke-width=\"1.6\"/><text x=\"'+cx+'\" y=\"'+(cy+3.6)+'\" text-anchor=\"middle\" fill=\"'+ntx(col)+'\" font-size=\"10\" font-weight=\"700\">'+lab+'</text>';sv.appendChild(g)}");
rep('Toca un punto para escucharlo.', 'Toca una cuerda en cualquier traste: la nota aparece sobre la cuerda, con su color, y suena.', 2);
rep("'Toca un punto del diapasón para escuchar la nota.'", "'Toca una cuerda en cualquier traste: la nota aparece sobre la cuerda, con su color, y suena.'");
fs.writeFileSync(OUT, t); console.log('ok', (t.length / 1e6).toFixed(2), 'M caracteres');
