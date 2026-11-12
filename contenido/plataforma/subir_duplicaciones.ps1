param([string]$IN, [string]$OUT)
# Prioridad 2 · Duplicaciones: producción, formación ministerial y teoría.
# IN: la página ya sin envoltorio (salida de la versión anterior).
# Las materias no se borran de la lista (los índices sostienen las claves de las lecciones de Audio Técnica):
# se reemplazan en su lugar o se dejan en null, que la plataforma ya salta.
$utf8 = New-Object Text.UTF8Encoding($false)
$t = [IO.File]::ReadAllText($IN, $utf8)
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
# Formación ministerial I–III: lo práctico del músico en el culto; identidad, emociones, carácter, derechos y liderazgo quedan en el Nivel 4.
Rep "['Formación ministerial I',['El corazón del adorador','Fundamentos bíblicos de la alabanza','Servir en equipo','Disciplina y puntualidad']]" "['Formación ministerial I',['El corazón del adorador','Fundamentos bíblicos de la alabanza','El músico dentro del culto: orden y momentos del servicio','Preparación personal antes de servir']]"
Rep "['Formación ministerial II',['El arte de componer canciones','Deberes y derechos de los ministros','Sanidad emocional y autoestima','Preparar un repertorio de servicio']]" "['Formación ministerial II',['Letras con fundamento bíblico','Elegir canciones para cada momento del servicio','Fluir con el pastor y el director durante el culto','Preparar un repertorio de servicio']]"
Rep "['Liderazgo ministerial',['Carácter y mentoría','Cuidar y formar a otros','Visión y planificación del ministerio musical','Proyecto final de servicio']]" "['Formación ministerial III',['Aprender de un mentor del ministerio','Acompañar y formar a un músico nuevo','Servir en distintos tipos de culto y eventos','Puente al Nivel 4: tu plan de formación ministerial']]"
# Producción musical: un solo lugar, la carrera. Sale de las materias del Nivel 3.
Rep "['Producción musical',['Grabación básica en casa','Edición y mezcla','Arreglo y producción de una canción','Derechos de autor y licencias']]," "null, /* Producción musical vive solo como carrera */"
Rep "const atSi=l=>LEV[l].s.findIndex(x=>x[2]===AUD);" "const atSi=l=>LEV[l].s.findIndex(x=>x&&x[2]===AUD);"
# Teoría: ya está dentro de cada clase de instrumento; no se anuncia como materia por abrir.
Rep "function segEmpty(L){if(!L.length)return '';" "function segEmpty(L){L=L.filter(n=>!/^Teor/.test(n));if(!L.length)return '';"
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
