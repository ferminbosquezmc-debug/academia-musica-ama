param([string]$IN, [string]$OUT)
# Prioridad 2 · Guía del docente dentro de la plataforma (vista v-guia, enlaces desde Inicio y Seguimiento).
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
Pag '<section class="view" id="v-seg" hidden></section>' '<section class="view" id="v-seg" hidden></section>
<section class="view" id="v-guia" hidden></section>'
Pag "if(v==='seg')segView();" "if(v==='seg')segView();if(v==='guia')guiaView();"
Both "<small>Avance, actividad y evaluaciones con rúbrica</small></span></button>';" "<small>Avance, actividad y evaluaciones con rúbrica</small></span></button>'
  +'<button class=`"m4home athome`" data-go=`"guia`"><span class=`"em`" aria-hidden=`"true`">📘</span><span>Guía del docente<small>Método ARPA, rúbrica, seguimiento y certificados</small></span></button>';"
Both "Lo ven la dirección y el equipo docente.</p>'" "Lo ven la dirección y el equipo docente.</p><button class=`"btn ghost m4mini`" data-go=`"guia`" style=`"margin-top:4px`">📘 Guía del docente</button>'"
$md = [IO.File]::ReadAllText("$PSScriptRoot\..\GUIA_DOCENTE.md", $utf8) -replace "`r`n", "`n"
$js = [IO.File]::ReadAllText("$PSScriptRoot\guia.js", $utf8).Replace('__GUIA__', (ConvertTo-Json $md -Compress))
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
