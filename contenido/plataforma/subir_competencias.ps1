param([string]$IN, [string]$OUT)
# Prioridad 2 · Marco de competencias y certificados de nivel.
# IN: la página ya sin envoltorio (salida de la versión anterior).
# Los mismos cambios se aplican a seguimiento.js para que el código fuente quede igual que lo publicado.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$segF = "$PSScriptRoot\seguimiento.js"
$seg = [IO.File]::ReadAllText($segF, $utf8)
function Cnt([string]$s, [string]$old) { ([regex]::Matches($s, [regex]::Escape($old))).Count }
function Both([string]$old, [string]$new) {
  if ((Cnt $script:t $old) -ne 1) { throw "Página: se esperaba 1 coincidencia para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
  $n = Cnt $script:seg $old
  if ($n -eq 1) { $script:seg = $script:seg.Replace($old, $new) }
  elseif ((Cnt $script:seg $new) -ne 1) { throw "seguimiento.js: no se encontró: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
}
# El avance en la nube lleva también los certificados emitidos
Both "cur:S.cur||'',ubic:S.ubic||null,act:" "cur:S.cur||'',ubic:S.ubic||null,cert:S.cert||null,act:"
Both "if(!S.ubic&&p.ubic){S.ubic=p.ubic;ch=true}" "if(!S.ubic&&p.ubic){S.ubic=p.ubic;ch=true}if(!S.cert&&p.cert){S.cert=p.cert;ch=true}"
# Perfil: competencias y certificados
Both "c.innerHTML=h;segBadge()}" "h+=cmPerfil();c.innerHTML=h;segBadge()}"
# Seguimiento: comprobar un código y ver los certificados de cada estudiante
Both "aria-pressed=`"'+(SEGfil==='inactivos')+'`">Solo inactivos</button></div>';" "aria-pressed=`"'+(SEGfil==='inactivos')+'`">Solo inactivos</button></div>'
 +'<div class=`"card`"><h3>Comprobar un certificado</h3><div class=`"row`" style=`"gap:8px;flex-wrap:wrap;margin-top:8px`"><input class=`"fi`" id=`"cm-q`" placeholder=`"ARPA-G1-XXXXXXX`" autocomplete=`"off`" style=`"flex:1;min-width:180px`"><button class=`"btn m4mini`" id=`"cm-go`">Comprobar</button></div><div id=`"cm-res`"></div></div>';"
Both "' en total)</p>':'')" "' en total)</p>':'')
  +(p.cert&&Object.keys(p.cert).length?'<p style=`"font-size:14px;margin-top:6px`">🎓 Certificados: '+Object.values(p.cert).map(x=>esc(CARN[x.car]||x.car)+' · Nivel '+x.nivel+' (<b>'+esc(x.code)+'</b>)').join(', ')+'</p>':'')"
Both "'<option value=`"'+m+'`">Mes '+m+' · Nivel '+Math.ceil(m/3)+'</option>'" "'<option value=`"'+m+'`">Mes '+m+' · Nivel '+Math.ceil(m/3)+(m%3===0?' · evaluación final':'')+'</option>'"
Both "Aprueba con un promedio de 3 (Logrado) o más.</p>" "Aprueba con un promedio de 3 (Logrado) o más. La evaluación de los meses 3, 6 y 9 es la final del nivel: si la aprueba y terminó las clases, el estudiante puede descargar su certificado.</p>"
# Módulo de competencias, después del de seguimiento
$cm = [IO.File]::ReadAllText("$PSScriptRoot\competencias.js", $utf8)
if ((Cnt $t 'function perfil(){') -ne 1) { throw 'sin perfil()' }
$t = $t.Replace('function perfil(){', $cm.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
[IO.File]::WriteAllText($segF, $seg, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
