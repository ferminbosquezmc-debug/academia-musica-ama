param([string]$IN, [string]$OUT)
# Sube Batería · Nivel 1 (12 clases) a la plataforma: datos de las clases, reproductor de ritmos, batería digital
# y el plan de los Niveles 2 y 3 (aparecen «en preparación»).
$utf8 = New-Object Text.UTF8Encoding($false)
$B = Split-Path $PSScriptRoot -Parent
$t = [IO.File]::ReadAllText($IN, $utf8)
$i = $t.IndexOf("<body>`n"); if ($i -ge 0) { $t = $t.Substring($i + 7); $t = $t -replace "\r?\n</body></html>\s*$", "`n" }
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
# Imágenes de batería, sección 🥁 y su icono en los pasos
Rep 'function gImg(alt,src){return /^(guitarra\/(img|atlas)|piano\/img)\/[\w.-]+\.svg$/.test(src)' 'function gImg(alt,src){return /^(guitarra\/(img|atlas)|piano\/img|bateria\/img)\/[\w.-]+\.svg$/.test(src)'
Rep "/^(🎸|🎹|🎵|✏️)/.test(h)?'p':'leer';" "/^(🎸|🎹|🥁|🎵|✏️)/.test(h)?'p':'leer';"
Rep "/piano/.test(S.cur)?'🎹':'🎸'" "/piano/.test(S.cur)?'🎹':/bateria/.test(S.cur)?'🥁':'🎸'"
# Reproductor de ritmos y batería digital dentro del Markdown de las clases
Rep "  if(s==='[[figuras-sonido]]'){h+=figSnd();i++;continue}" ("  if(s==='[[figuras-sonido]]'){h+=figSnd();i++;continue}`n" + "  if(m=s.match(/^\[\[ritmos:([\w,]+)\]\]$/)){h+=DRP.player(m[1]);i++;continue}`n" + "  if(s==='[[bateria-digital]]'){h+=DRP.kit();i++;continue}")
$drp = [IO.File]::ReadAllText("$PSScriptRoot\ritmos.js", $utf8)
Rep 'function mdR(t){' ($drp.TrimEnd() + "`nfunction mdR(t){")
$css = [IO.File]::ReadAllText("$PSScriptRoot\ritmos.css", $utf8)
Rep '@media (prefers-reduced-motion:reduce){*{transition:none!important}.cf{display:none}}' ($css.TrimEnd() + "`n@media (prefers-reduced-motion:reduce){*{transition:none!important}.cf{display:none}}")
Rep " `$('#lec-body').innerHTML=r4bar4()+b;" " `$('#lec-body').innerHTML=r4bar4()+b;DRP.mount(`$('#lec-body'));"
Rep 'function lec(){if(R4.on)r4stop();' 'function lec(){DRP.stop();if(R4.on)r4stop();'
Rep '{if(R4.on)r4stop();figStop()}' '{if(R4.on)r4stop();figStop();DRP.stop()}'
# Datos de las 12 clases del Nivel 1
$arr = @(); foreach ($n in 1..12) { $arr += [pscustomobject]@{ n = $n; raw = [IO.File]::ReadAllText("$B\nivel-1\clase-$n.md", $utf8).Replace("`r", '') } }
$json = (ConvertTo-Json -InputObject $arr -Depth 3 -Compress).Replace('</', '<\/')
$js = @'
/* ===== Batería · Método Integral AMA (Nivel 1, clases 1–12; Niveles 2 y 3 en preparación) =====
   Mismo formato que piano. Claves de avance: '0-0bateria-<i>' (i = 0…11). */
const BNC=/*BNC*/;
const bCred=c=>'<p class="mute" style="font-size:13px;margin-top:16px">Método Integral AMA de Batería · © Academia de Música ARPA.'+(/Beethoven/.test(c.md)?' «Himno de la alegría»: Ludwig van Beethoven (dominio público), versión AMA.':'')+'</p>';
INS.bateria=[[],
 ['Clase 13 · El grip y el hi-hat abierto (Ritmo básico #5 · disco/pop)','Clase 14 · El tresillo','Clase 15 · Hi-hat y tresillo (Ritmo básico #6 · balada en 6/8)','Clase 16 · Redobles en semicorcheas · Taller #1','Clase 17 · Ritmo básico #7 y patrones de rock','Clase 18 · Desplazamientos','Clase 19 · Fills (rellenos)','Clase 20 · Afinación de la batería','Clase 21 · El puntillo (shuffle)','Clase 22 · Estudio del bombo','Clase 23 · Redobles en semicorcheas y fusas · Taller #2','Clase 24 · Canciones completas · Evaluación final'],
 ['Clase 25 · Independencia y paradiddle','Clase 26 · Ritmos latinos: cumbia y bossa nova','Clase 27 · Notas fantasma, flam y drag','Clase 28 · Rellenos avanzados','Clase 29 · Contratiempo y síncopa: reggae','Clase 30 · El funk','Clase 31 · Mitad y doble tiempo','Clase 32 · Mi primer solo','Clase 33 · Leo una partitura completa','Clase 34 · Tocamos juntos','Clase 35 · Ensayo general','Clase 36 · ¡Presentación final!']];
BNC.forEach(r=>{const c=Object.assign({n:r.n},pParse(r.raw)),i=c.n-1,S2=gSecs(c.md),pick=k=>S2.filter(s=>gCat(s.h)===k);
 const tar=pick('e').map(s=>s.b).join('\n').split('\n').map(x=>x.trim()).filter(x=>/^[-*\d]/.test(x)).map(x=>gInl(x.replace(/^([-*]|\d+\.)\s*/,'').replace(/^☐\s*/,'')));
 const k='0-0bateria-'+i;
 LD[k]={u:'Clase '+c.n,t:c.t,s:'Batería I · Mes '+String(c.mes).split(' ')[0]+' · Clase '+c.n+' · Nivel 1 · Semana '+(i+1),w:[i+1],o:esc(c.o),v:1,
  leer:()=>gCards(pick('leer'))+bCred(c),
  p:()=>gCards(pick('p'))+'<div class="card">'+mmBox(['60 bpm'])+'</div>',
  q:c.q,
  e:(tar.length?'<b>Tu tarea:</b> '+tar.join(' · ')+'<br><br>':'')+'Cuéntale a tu docente cómo te fue: qué lograste y qué te costó.',
  fin:()=>gCards(pick('fin')),icon:'🥁'};
 INS.bateria[0][i]=LD[k].u+' · '+c.t});
AVAIL.bateria=1;
'@
$js = $js.Replace('/*BNC*/', $json)
Rep 'AVAIL.piano=1;' ("AVAIL.piano=1;`n" + $js.TrimEnd())
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
