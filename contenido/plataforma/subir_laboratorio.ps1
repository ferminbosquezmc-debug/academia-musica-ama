param([string]$IN, [string]$OUT)
# Prioridad 2 · Laboratorio de oído: afinador, alto o bajo, intervalos, mayor o menor y evaluador de pulso.
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
Pag '<section class="view" id="v-guia" hidden></section>' '<section class="view" id="v-guia" hidden></section>
<section class="view" id="v-lab" hidden></section>'
Pag "if(v==='guia')guiaView();" "if(v==='guia')guiaView();if(v==='lab')lbView();"
Pag '<div class="card" id="jg-racha"></div>' '<div class="card" id="jg-racha"></div>
  <div class="card" style="border-color:var(--gold)">
    <h3>🔬 Laboratorio de oído</h3>
    <p class="mute" style="margin-top:4px">Afinador, alto o bajo, intervalos, acordes mayores y menores, y un evaluador de pulso que te dice si te adelantas o te atrasas.</p>
    <button class="btn" data-go="lab" style="margin-top:10px">Abrir el laboratorio</button>
  </div>'
Both "ubic:S.ubic||null,cert:S.cert||null,act:" "ubic:S.ubic||null,cert:S.cert||null,oido:S.oido||null,act:"
Both "+'<span>⏱️ '+(p.min||0)+' min de práctica</span></div>'" "+'<span>⏱️ '+(p.min||0)+' min de práctica</span>'+segOido(p.oido)+'</div>'"
Both "const fdS=s=>" "function segOido(o){if(!o)return '';let ok=0,n=0;['alto','int','acor'].forEach(k=>{if(o[k]){ok+=o[k].ok;n+=o[k].n}});
 return (n?'<span>👂 Oído: <b>'+Math.round(100*ok/n)+'%</b> ('+n+')</span>':'')+(o.pulso?'<span>🥁 Pulso: <b>'+o.pulso.pct+'%</b> a tiempo a '+o.pulso.bpm+' BPM</span>':'')}
const fdS=s=>"
$js = [IO.File]::ReadAllText("$PSScriptRoot\laboratorio.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $js.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
