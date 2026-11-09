param([string]$IN, [string]$OUT)
$utf8 = New-Object Text.UTF8Encoding($false)
$P = 'C:\Users\EL COMANDANTE\Documents\Proyectos\academia-musica-ama\.claude\worktrees\piano-classes-content-review-3b2362\contenido\piano'
$t = [IO.File]::ReadAllText($IN, $utf8)
$i = $t.IndexOf("<body>`n"); if ($i -lt 0) { throw 'sin envoltorio' }
$t = $t.Substring($i + 7)
$t = $t -replace "\r?\n</body></html>\s*$", "`n"
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
# Imágenes de piano y sección 🎹
Rep 'function gImg(alt,src){return /^guitarra\/(img|atlas)\/[\w.-]+\.svg$/.test(src)' 'function gImg(alt,src){return /^(guitarra\/(img|atlas)|piano\/img)\/[\w.-]+\.svg$/.test(src)'
Rep "/^(🎸|🎵|✏️)/.test(h)?'p':'leer';" "/^(🎸|🎹|🎵|✏️)/.test(h)?'p':'leer';"
# Datos de las 36 clases
$arr = @()
foreach ($n in 1..36) { $lv = [Math]::Ceiling($n / 12); $arr += [pscustomobject]@{ n = $n; raw = [IO.File]::ReadAllText("$P\nivel-$lv\clase-$n.md", $utf8).Replace("`r", '') } }
$json = (ConvertTo-Json -InputObject $arr -Depth 3 -Compress).Replace('</', '<\/')
$js = @'
/* ===== Piano · Método Integral AMA (Niveles 1–3, clases 1–36) =====
   Cada clase es el texto del método en Markdown: encabezado (título, mes y objetivo), secciones «### …» y «Preguntas de repaso».
   Claves de avance: '<nivel>-0piano-<i>' (i = 0…11), las que la plataforma ya usaba para Piano. */
const PNC=/*PNC*/;
function pParse(raw){const L=raw.split('\n'),t=(L[0].match(/:\s*(.+)$/)||[,''])[1],get=k=>{const l=L.find(x=>x.startsWith('- **'+k+':**'));return l?l.replace('- **'+k+':**','').trim():''};
 const a=L.indexOf('---'),qi=L.findIndex(x=>/^## Preguntas de repaso/.test(x));let body=L.slice(a+1,qi<0?L.length:qi);
 while(body.length&&(!body[body.length-1].trim()||body[body.length-1].trim()==='---'))body.pop();
 const qs=[];let q=null;if(qi>=0)L.slice(qi+1).forEach(l=>{let m;if(m=l.match(/^\d+\.\s+(.*)/)){q=[m[1],[],0,''];qs.push(q)}else if(q&&(m=l.match(/^\s+-\s+(.*)/))){if(m[1].startsWith('✔'))q[2]=q[1].length;q[1].push(m[1].replace(/^✔\s*/,''))}else if(q&&(m=l.match(/^\s+>\s*(.*)/)))q[3]=m[1]});
 return {t:t,mes:get('Mes'),o:get('Objetivo'),md:body.join('\n'),q:qs}}
const pCred=c=>'<p class="mute" style="font-size:13px;margin-top:16px">Método Integral AMA de Piano · © Academia de Música ARPA.'+(/Beethoven/.test(c.md)?' «Himno de la alegría»: Ludwig van Beethoven (dominio público), versión AMA.':'')+(/Gruber/.test(c.md)?' «Noche de paz»: Franz Gruber (1818), dominio público.':'')+(/Pierpont/.test(c.md)?' «Cascabeles»: James Lord Pierpont (1857), dominio público.':'')+(/Petzold/.test(c.md)?' «Minueto en Sol»: Christian Petzold, dominio público, versión simplificada AMA.':'')+(/(composición|ejercicio) AMA/.test(c.md)?' Las piezas marcadas «composición AMA» o «ejercicio AMA» son originales de la academia.':'')+'</p>';
INS.piano=[[],[],[]];
PNC.forEach(r=>{const c=Object.assign({n:r.n},pParse(r.raw)),l=Math.floor((c.n-1)/12),i=(c.n-1)%12,S2=gSecs(c.md),pick=k=>S2.filter(s=>gCat(s.h)===k);
 const tar=pick('e').map(s=>s.b).join('\n').split('\n').map(x=>x.trim()).filter(x=>/^[-*\d]/.test(x)).map(x=>gInl(x.replace(/^([-*]|\d+\.)\s*/,'').replace(/^☐\s*/,'')));
 const k=l+'-0piano-'+i;
 LD[k]={u:'Clase '+c.n,t:c.t,s:'Piano '+['I','II','III'][l]+' · Mes '+String(c.mes).split(' ')[0]+' · Clase '+c.n+' · Nivel '+(l+1)+' · Semana '+(i+1),w:[i+1],o:esc(c.o),v:1,
  leer:()=>gCards(pick('leer'))+pCred(c),
  p:()=>gCards(pick('p'))+'<div class="card">'+mmBox(['60 bpm'])+'</div>',
  q:c.q,
  e:(tar.length?'<b>Tu tarea:</b> '+tar.join(' · ')+'<br><br>':'')+'Cuéntale a tu docente cómo te fue: qué lograste y qué te costó.',
  fin:()=>gCards(pick('fin')),icon:licon(c.t)};
 INS.piano[l][i]=LD[k].u+' · '+c.t});
AVAIL.piano=1;
'@
$js = $js.Replace('/*PNC*/', $json)
$anchor = 'Object.keys(LD).forEach(k=>{if(/guitarra/.test(k))LD[k].icon=licon(LD[k].t)});'
Rep $anchor ($anchor + "`n" + $js)
# El aviso de «en revisión» ya no aplica
Rep "const CRMSG={piano:'El Nivel 1 de Piano (Método Integral AMA, 12 clases) está en revisión y llegará pronto.'};" "const CRMSG={};"
Rep "SY=['👀','📖','🎸','✅','📤']" "SY=['👀','📖',/piano/.test(S.cur)?'🎹':'🎸','✅','📤']"
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
