param([string]$IN, [string]$OUT)
# Prioridad 3 · Partituras interactivas (vista v-score, tarjeta en Práctica).
# IN: la página ya sin envoltorio. La clave de sol sale de piano/nivel-1/img/generador/clave_sol.txt.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Pag([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new) }
Pag '<section class="view" id="v-pistas" hidden></section>' '<section class="view" id="v-pistas" hidden></section>
<section class="view" id="v-score" hidden></section>'
Pag "if(v==='pistas')ptView();" "if(v==='pistas')ptView();if(v==='score')scView();"
Pag '<button class="btn" data-go="pistas" style="margin-top:10px">Abrir las pistas</button>
  </div>' '<button class="btn" data-go="pistas" style="margin-top:10px">Abrir las pistas</button>
  </div>
  <div class="card" style="border-color:var(--gold)">
    <h3>🎼 Partituras interactivas</h3>
    <p class="mute" style="margin-top:4px">Partituras que suenan y marcan cada nota: con color, con nombres o solo la partitura, a tu tempo.</p>
    <button class="btn" data-go="score" style="margin-top:10px">Abrir las partituras</button>
  </div>'
$clef = ([IO.File]::ReadAllText("$PSScriptRoot\..\piano\nivel-1\img\generador\clave_sol.txt", $utf8)).Trim()
$js = [IO.File]::ReadAllText("$PSScriptRoot\partitura.js", $utf8).Replace('__CLEF__', $clef)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
