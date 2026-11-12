param([string]$IN, [string]$OUT)
# Prioridad 1 de la auditoría en la plataforma: progreso en la nube, panel del docente, prueba de ubicación,
# evaluación mensual con rúbrica y un solo aviso para las materias sin clases.
# IN: el archivo leído del artifact CON su envoltorio.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
$i = $t.IndexOf("<body>`n"); if ($i -lt 0) { throw 'sin envoltorio' }
$t = $t.Substring($i + 7); $t = $t -replace "\r?\n</body></html>\s*$", "`n"
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
# Vistas nuevas
Rep '<section class="view" id="v-perfil" hidden></section>' '<section class="view" id="v-perfil" hidden></section>
<section class="view" id="v-ubic" hidden></section>
<section class="view" id="v-seg" hidden></section>'
Rep "if(v==='perfil')perfil();" "if(v==='perfil'){perfil();segPerfil()}if(v==='ubic')ubicView();if(v==='seg')segView();"
# Cada guardado también sube el resumen a la nube
Rep "const save=()=>{try{localStorage.setItem('arp',JSON.stringify(S))}catch(e){}};" "const save=()=>{try{localStorage.setItem('arp',JSON.stringify(S))}catch(e){}if(window.SEGsync)SEGsync()};"
# Inicio: tarjeta de ubicación y acceso del docente
Rep 'function home(){if(!LAV[S.lvl])S.lvl=0;applyMode();' 'function home(){if(!LAV[S.lvl])S.lvl=0;applyMode();setTimeout(()=>{if(typeof segHome==="function")segHome()},0);'
# Clases: las materias sin clases se agrupan en un solo aviso
Rep "const rows=L.s.map((_,si)=>{const x=subj(S.lvl,si);if(!x)return '';if(isAT(S.lvl,si))return '';" "const EMPTY=[];const rows=L.s.map((_,si)=>{const x=subj(S.lvl,si);if(!x)return '';if(isAT(S.lvl,si))return '';"
Rep "if(!ks.length)return x[2]" "if(!ks.length&&si>0){EMPTY.push(x[0]);return ''}if(!ks.length)return x[2]"
Rep "`$('#subs').innerHTML=wkc+rows.slice(1).join('')+carr;" "`$('#subs').innerHTML=wkc+rows.slice(1).join('')+segEmpty(EMPTY);"
# Módulo de seguimiento
$seg = [IO.File]::ReadAllText("$PSScriptRoot\seguimiento.js", $utf8)
Rep 'function perfil(){' ($seg.TrimEnd() + "`nfunction perfil(){")
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
