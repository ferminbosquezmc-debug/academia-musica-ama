param([string]$IN, [string]$OUT)
# Prioridad 3 · Tutor ARPA: conversación por clase que reemplaza la ayuda «Explícamelo de otra forma».
# IN: la página ya sin envoltorio. Las funciones paintHelp y explain de tutor.js sustituyen a las originales
# (declaraciones posteriores del mismo nombre); la constante original helpCard se renombra.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Pag([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new) }
Pag 'const helpCard=K=>{if(!SMP)return' 'const helpCard0=K=>{if(!SMP)return'
Pag 'function paintHelp(K){const e=document.getElementById(''hp'')' 'function paintHelp0(K){const e=document.getElementById(''hp'')'
Pag 'async function explain(K){' 'async function explain0(K){'
$js = [IO.File]::ReadAllText("$PSScriptRoot\tutor.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
