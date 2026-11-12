param([string]$IN, [string]$OUT)
# Prioridad 3 · Análisis de la ejecución desde una grabación (en las partituras) y enlace al afinador con micrófono.
# IN: la página ya sin envoltorio. Aplica los mismos cambios a seguimiento.js.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$segF = "$PSScriptRoot\seguimiento.js"
$seg = [IO.File]::ReadAllText($segF, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Both([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
  if ((Cnt $script:seg $old) -eq 1) { $script:seg = $script:seg.Replace($old, $new) }
  elseif ((Cnt $script:seg $new) -ne 1) { throw "seguimiento.js: no se encontró: $($old.Substring(0, [Math]::Min(70, $old.Length)))" } }
Both "retos:(S.retos||[]).length,act:" "retos:(S.retos||[]).length,anal:(S.anal||[]).slice(-5),act:"
Both "+(p.retos?'<span>🏆 Retos: <b>'" "+(p.anal&&p.anal.length?'<span>🎙️ Análisis: <b>'+esc(p.anal[p.anal.length-1].t)+'</b> · notas '+p.anal[p.anal.length-1].np+'%'+(p.anal[p.anal.length-1].pct!=null?' · pulso '+p.anal[p.anal.length-1].pct+'%':'')+'</span>':'')+(p.retos?'<span>🏆 Retos: <b>'"
$js = [IO.File]::ReadAllText("$PSScriptRoot\analisis.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
