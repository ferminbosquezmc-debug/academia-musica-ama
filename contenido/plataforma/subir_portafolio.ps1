param([string]$IN, [string]$OUT)
# Prioridad 2 · Portafolio con entrega de audio o video, revisión del docente y guía actualizada.
# IN: la página ya sin envoltorio. Aplica los mismos cambios a seguimiento.js.
# Al publicar: declarar assets {upload:"interact"} y las reglas db port, port/{self}, portc, portc/{self}.
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
Pag '<section class="view" id="v-lab" hidden></section>' '<section class="view" id="v-lab" hidden></section>
<section class="view" id="v-port" hidden></section>'
Pag "if(v==='lab')lbView();" "if(v==='lab')lbView();if(v==='port')pfView();"
Both "h+=cmPerfil();c.innerHTML=h;segBadge()}" "h+=pfCard()+cmPerfil();c.innerHTML=h;segBadge()}"
Both " if(!SEGsub){SEGsub=true;" " if(!SEGsub){SEGsub=true;pfSubAll();"
Both "📝 Evaluar con la rúbrica</button></div></div>'}).join('');" "📝 Evaluar con la rúbrica</button>'+pfBtn(p._id)+'</div></div>'}).join('');"
Pag "<div class=`"row`" style=`"margin-top:10px`"><button class=`"btn m4mini`" data-se=" "<div class=`"row`" style=`"margin-top:10px;flex-wrap:wrap;gap:8px`"><button class=`"btn m4mini`" data-se="
$seg = $seg.Replace("<div class=`"row`" style=`"margin-top:10px`"><button class=`"btn m4mini`" data-se=", "<div class=`"row`" style=`"margin-top:10px;flex-wrap:wrap;gap:8px`"><button class=`"btn m4mini`" data-se=")
# Guía del docente actualizada
$md = [IO.File]::ReadAllText("$PSScriptRoot\..\GUIA_DOCENTE.md", $utf8) -replace "`r`n", "`n"
$re = [regex]'const GUIA_MD=".*?";\r?\n'
if ($re.Matches($t).Count -ne 1) { throw 'sin GUIA_MD' }
$t = $re.Replace($t, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) 'const GUIA_MD=' + (ConvertTo-Json $md -Compress) + ";`n" }, 1)
$js = [IO.File]::ReadAllText("$PSScriptRoot\portafolio.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
