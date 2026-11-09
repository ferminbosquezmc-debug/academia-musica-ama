param([string]$IN, [string]$OUT)
# Versión 61: lector de texto en todas las lecciones, botón «Volver» fijo arriba, símbolos y sonido de las figuras,
# y las clases de guitarra I y piano actualizadas (datos desde los .md).
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$i = $t.IndexOf("<body>`n"); if ($i -ge 0) { $t = $t.Substring($i + 7); $t = $t -replace "\r?\n</body></html>\s*$", "`n" }
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
# ---- datos de las clases (mismo procedimiento que subir_nivel1_a_plataforma.ps1) ----
$tmp = [IO.Path]::GetTempFileName()
# (datos)
& (Join-Path $PSScriptRoot 'subir_nivel1_a_plataforma.ps1') -IN $IN -OUT $tmp | Out-Null
$t = [IO.File]::ReadAllText($tmp, $utf8); Remove-Item $tmp

# ---- CSS ----
Rep '@media (prefers-reduced-motion:reduce){*{transition:none!important}.cf{display:none}}' (@'
/* Botón «Volver» siempre visible arriba en las clases */
.view>button.link:first-child{position:sticky;top:0;z-index:8;display:block;width:calc(100% + 36px);margin:0 -18px;padding:0 18px;min-height:44px!important;box-sizing:content-box;text-align:left;background:rgba(0,0,0,.95);border-bottom:1px solid var(--line);text-decoration:none;font-weight:600}
.view:has(>button.link:first-child) #r4-bar{top:45px}
#v-leccion #r4-bar{margin-top:12px}
/* Figuras: símbolos en la tabla y botones para escucharlas */
.gtb .gimg[src*="fig_"]{min-width:150px;max-width:190px}
.figsnd{margin-top:16px;border-top:1px solid var(--line);padding-top:12px}
.figbt{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.chip[data-fig][aria-pressed=true]{background:var(--gold);color:#000;border-color:var(--gold);font-weight:600}
@media (prefers-reduced-motion:reduce){*{transition:none!important}.cf{display:none}}
'@).TrimEnd()

# ---- Figuras: [[figuras-sonido]] en el Markdown de las clases ----
Rep "  if(s.startsWith('>')){h+='<p class=`"m4key`">'+gInl(s.replace(/^>\s*/,''))+'</p>';i++;continue}" ("  if(s.startsWith('>')){h+='<p class=`"m4key`">'+gInl(s.replace(/^>\s*/,''))+'</p>';i++;continue}`n" + "  if(s==='[[figuras-sonido]]'){h+=figSnd();i++;continue}")
Rep 'function mdR(t){' (@'
/* Escuchar las figuras: 4 pulsos a 60 bpm (clic) y la nota repetida según la figura */
const FIGS=[['Redonda',1],['Blanca',2],['Negra',4],['Corchea',8],['Semicorchea',16],['Fusa',32],['Semifusa',64]];let FIGT=null;
function figSnd(){return '<div class="figsnd"><h4 class="m4h4">🔊 Escucha cómo suena cada figura</h4><p class="mute" style="font-size:14px;margin-top:4px">Suenan 4 pulsos a 60 bpm: el clic marca el pulso y la nota suena con la figura que elijas. Cuenta cuántas notas caben en cada pulso.</p><div class="figbt">'+FIGS.map((f,i)=>'<button class="chip" data-fig="'+i+'" aria-pressed="false">▶ '+f[0]+'</button>').join('')+'</div><div class="dots fig-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="mute fig-st" aria-live="polite" style="font-size:14px;text-align:center;min-height:22px"></p></div>'}
function figStop(){if(FIGT){FIGT.o.forEach(o=>{try{o.stop()}catch(e){}});FIGT.t.forEach(clearTimeout)}FIGT=null;document.querySelectorAll('.fig-dots i').forEach(x=>x.classList.remove('on'));document.querySelectorAll('[data-fig]').forEach(b=>{b.setAttribute('aria-pressed','false');b.textContent='▶ '+FIGS[+b.dataset.fig][0]})}
function figPlay(i,btn){figStop();const c=AC();if(c.resume)c.resume();const n=FIGS[i][1],du=4/n,t0=c.currentTime+0.15,O=[],T=[];
 const beep=(f,ty,s,len,v)=>{const o=c.createOscillator(),g=c.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(v,s+0.008);g.gain.setValueAtTime(v,s+Math.max(0.009,len*0.7));g.gain.exponentialRampToValueAtTime(0.0001,s+len);o.connect(g).connect(c.destination);o.start(s);o.stop(s+len+0.02);O.push(o)};
 for(let k=0;k<4;k++)beep(k?900:1300,'square',t0+k,0.05,0.18);
 for(let k=0;k<n;k++)beep(523.25,'triangle',t0+k*du,Math.max(0.035,du*0.85),0.35);
 const box=btn.closest('.figsnd'),dots=box?box.querySelectorAll('.fig-dots i'):[],st=box&&box.querySelector('.fig-st');
 for(let k=0;k<4;k++)T.push(setTimeout(()=>{dots.forEach((d,j)=>d.classList.toggle('on',j===k))},(0.15+k)*1000));
 T.push(setTimeout(figStop,4300));FIGT={o:O,t:T};
 btn.setAttribute('aria-pressed','true');btn.textContent='⏹ '+FIGS[i][0];
 if(st)st.textContent=FIGS[i][0]+': '+(n<4?'1 sonido que dura '+(4/n)+' pulsos':n===4?'1 sonido en cada pulso':(n/4)+' sonidos en cada pulso')+'.'}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fig]');if(!b)return;if(b.getAttribute('aria-pressed')==='true')figStop();else figPlay(+b.dataset.fig,b)});
function mdR(t){
'@).TrimEnd()

# ---- Lector de texto también en las lecciones (guitarra, piano y las demás carreras) ----
Rep 'const R4={on:false,pause:false,tok:0,i:0,q:[],blk:null};' "var R4root='#v-u4';const R4={on:false,pause:false,tok:0,i:0,q:[],blk:null};"
Rep "document.querySelectorAll('#v-u4 h2,#v-u4 .m4rdz h3,#v-u4 .m4rdz h4,#v-u4 .m4rdz p,#v-u4 .m4rdz li').forEach(el=>{const{L,t}=r4nodes(el)" "document.querySelectorAll(R4root==='#v-leccion'?'#lec-t,#lec-body h3,#lec-body h4,#lec-body p,#lec-body li':'#v-u4 h2,#v-u4 .m4rdz h3,#v-u4 .m4rdz h4,#v-u4 .m4rdz p,#v-u4 .m4rdz li').forEach(el=>{if(el.closest('#r4-bar,button,.ph'))return;const{L,t}=r4nodes(el)"
Rep "u.onend=()=>{if(t===R4.tok&&R4.on&&!R4.pause&&!`$('#v-u4').hidden)r4say(i+1)};" "u.onend=()=>{if(t===R4.tok&&R4.on&&!R4.pause&&!`$(R4root).hidden)r4say(i+1)};"
Rep "if(vis4('v-u4')&&!R4.on)r4fill()" "if((vis4('v-u4')||vis4('v-leccion'))&&!R4.on)r4fill()"
Rep 'function u4(){r4stop();' "function u4(){R4root='#v-u4';r4stop();"
Rep "function lec(){`n {const b=`$('#lec-back')" "function lec(){if(R4.on)r4stop();R4root='#v-leccion';setTimeout(r4fill,0);figStop();`n {const b=`$('#lec-back')"
Rep " `$('#lec-body').innerHTML=b;`n}" " `$('#lec-body').innerHTML=r4bar4()+b;`n}"
Rep "'+sayB('o')+'" "'+'"
Rep "`$('#v-u4').addEventListener('click',e=>{if(e.target.closest('#u4-ok'))" (@'
$('#v-leccion').addEventListener('change',e=>{const t=e.target;if(t.id==='r4-voz'){S.n4.voz=t.value;save();if(R4.on&&!R4.pause)r4say(R4.i)}});
$('#v-leccion').addEventListener('click',e=>{const t=e.target;
 if(t.closest('#r4-go'))return r4toggle();if(t.closest('#r4-stop'))return r4stop();
 if(!R4.on||t.closest('a,button,select,label,input,textarea,#r4-bar'))return;
 const el=t.closest('h2,h3,h4,p,li');if(!el)return;const i=R4.q.findIndex(x=>x.el===el||el.contains(x.el));if(i>-1){R4.pause=false;r4ui();r4say(i)}});
/* Al salir de una clase se detiene la lectura y el sonido de las figuras */
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-go],[data-m4],nav button')){if(R4.on)r4stop();figStop()}},true);
$('#v-u4').addEventListener('click',e=>{if(e.target.closest('#u4-ok'))
'@).TrimEnd()

[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
