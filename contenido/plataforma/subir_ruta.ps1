param([string]$IN, [string]$OUT)
# Prioridad 3 · Ruta adaptativa: «Tu ruta de hoy» en Inicio.
# IN: la página ya sin envoltorio. Aplica el mismo cambio a seguimiento.js.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$segF = "$PSScriptRoot\seguimiento.js"
$seg = [IO.File]::ReadAllText($segF, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
$old = "x+=rtMini();if(ADMS)"; $new = "x+=ruCard()+rtMini();if(ADMS)"
if ((Cnt $t $old) -ne 1) { throw 'Página: sin rtMini' }
$t = $t.Replace($old, $new)
if ((Cnt $seg $old) -eq 1) { $seg = $seg.Replace($old, $new) } elseif ((Cnt $seg $new) -ne 1) { throw 'seguimiento.js: sin rtMini' }
$js = [IO.File]::ReadAllText("$PSScriptRoot\ruta.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
