param([string]$IN, [string]$OUT)
# Prioridad 2 · Pistas de acompañamiento (banda virtual) y guía del docente actualizada.
# IN: la página ya sin envoltorio.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Pag([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new) }
Pag '<section class="view" id="v-port" hidden></section>' '<section class="view" id="v-port" hidden></section>
<section class="view" id="v-pistas" hidden></section>'
Pag "if(v==='port')pfView();" "if(v==='port')pfView();if(v==='pistas')ptView();"
Pag '<button class="btn" data-go="lab" style="margin-top:10px">Abrir el laboratorio</button>
  </div>' '<button class="btn" data-go="lab" style="margin-top:10px">Abrir el laboratorio</button>
  </div>
  <div class="card" style="border-color:var(--gold)">
    <h3>🎶 Pistas de acompañamiento</h3>
    <p class="mute" style="margin-top:4px">Toca con una banda virtual: batería, bajo y acordes con las progresiones de tu nivel. Cambia el tempo y apaga la parte que tocas tú.</p>
    <button class="btn" data-go="pistas" style="margin-top:10px">Abrir las pistas</button>
  </div>'
$md = [IO.File]::ReadAllText("$PSScriptRoot\..\GUIA_DOCENTE.md", $utf8) -replace "`r`n", "`n"
$re = [regex]'const GUIA_MD=".*?";\r?\n'
if ($re.Matches($t).Count -ne 1) { throw 'sin GUIA_MD' }
$t = $re.Replace($t, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) 'const GUIA_MD=' + (ConvertTo-Json $md -Compress) + ";`n" }, 1)
$js = [IO.File]::ReadAllText("$PSScriptRoot\pistas.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
