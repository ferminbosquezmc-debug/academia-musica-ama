param([string]$IN, [string]$OUT)
# Prioridad 2 · Recompensas por carrera y retos semanales.
# IN: la página ya sin envoltorio. Aplica los mismos cambios a seguimiento.js.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$segF = "$PSScriptRoot\seguimiento.js"
$seg = [IO.File]::ReadAllText($segF, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Pag([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new) }
function Both([string]$old, [string]$new) { Pag $old $new
  if ((Cnt $script:seg $old) -eq 1) { $script:seg = $script:seg.Replace($old, $new) }
  elseif ((Cnt $script:seg $new) -ne 1) { throw "seguimiento.js: no se encontró: $($old.Substring(0, [Math]::Min(70, $old.Length)))" } }
# Práctica: tarjeta de retos encima de la racha
Pag '<div class="card" id="jg-racha"></div>' '<div class="card" id="jg-reto"></div>
  <div class="card" id="jg-racha"></div>'
# La racha original queda reemplazada por la de retos.js (premios según la carrera)
Pag 'function jgRacha(){const e=$(''#jg-racha'');if(!e)return;const n=streak(),nx=JG_RW.find(' 'function jgRacha0(){const e=$(''#jg-racha'');if(!e)return;const n=streak(),nx=JG_RW.find('
Pag 'const n=streak(),w=JG_RW.find(r=>r[0]>before' 'const n=streak(),w=jgRW().find(r=>r[0]>before'
# Inicio: resumen de los retos; seguimiento: semanas cumplidas
Both "if(ADMS)x+='<button class=`"m4home athome`" data-go=`"seg`">" "x+=rtMini();if(ADMS)x+='<button class=`"m4home athome`" data-go=`"seg`">"
Both "oido:S.oido||null,act:" "oido:S.oido||null,retos:(S.retos||[]).length,act:"
Both "+segOido(p.oido)+'</div>'" "+segOido(p.oido)+(p.retos?'<span>🏆 Retos: <b>'+p.retos+'</b> semana'+(p.retos>1?'s':'')+'</span>':'')+'</div>'"
$js = [IO.File]::ReadAllText("$PSScriptRoot\retos.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
