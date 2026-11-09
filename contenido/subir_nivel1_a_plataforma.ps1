param([string]$IN, [string]$OUT)
$utf8 = New-Object Text.UTF8Encoding($false)
$C = 'C:\Users\EL COMANDANTE\Documents\Proyectos\academia-musica-ama\.claude\worktrees\piano-classes-content-review-3b2362\contenido'
$t = [IO.File]::ReadAllText($IN, $utf8)
$i = $t.IndexOf("<body>`n"); if ($i -lt 0) { throw 'sin envoltorio' }
$t = $t.Substring($i + 7)
$t = $t -replace "\r?\n</body></html>\s*$", "`n"
function Rep([string]$old, [string]$new) {
  $n = ([regex]::Matches($script:t, [regex]::Escape($old))).Count
  if ($n -ne 1) { throw "Se esperaba 1 coincidencia y hay $n para: $($old.Substring(0, [Math]::Min(70, $old.Length)))" }
  $script:t = $script:t.Replace($old, $new)
}
function ParseMd($raw) {
  $L = $raw.Replace("`r", '') -split "`n"
  $title = ([regex]::Match($L[0], ':\s*(.+)$')).Groups[1].Value
  $mes = (($L | Where-Object { $_ -like '- **Mes:**' + '*' }) | Select-Object -First 1) -replace '^- \*\*Mes:\*\*\s*', ''
  $obj = (($L | Where-Object { $_ -like '- **Objetivo:**' + '*' }) | Select-Object -First 1) -replace '^- \*\*Objetivo:\*\*\s*', ''
  $a = [Array]::IndexOf($L, '---'); $qi = -1; for ($k = 0; $k -lt $L.Count; $k++) { if ($L[$k] -like '## Preguntas de repaso*') { $qi = $k; break } }
  $body = @($L[($a + 1)..($qi - 1)]); while ($body.Count -and (-not $body[-1].Trim() -or $body[-1].Trim() -eq '---')) { $body = @($body[0..($body.Count - 2)]) }
  $qs = New-Object System.Collections.ArrayList; $q = $null
  foreach ($l in $L[($qi + 1)..($L.Count - 1)]) {
    if ($l -match '^\d+\.\s+(.*)') { $q = [System.Collections.ArrayList]@($Matches[1], (New-Object System.Collections.ArrayList), 0, ''); [void]$qs.Add($q) }
    elseif ($q -and $l -match '^\s+-\s+(.*)') { $o = $Matches[1]; if ($o.StartsWith('✔')) { $q[2] = $q[1].Count }; [void]$q[1].Add(($o -replace '^✔\s*', '')) }
    elseif ($q -and $l -match '^\s+>\s*(.*)') { $q[3] = $Matches[1] }
  }
  [pscustomobject]@{ t = $title; mes = $mes; o = $obj; md = ($body -join "`n").Trim(); q = $qs }
}
# ----- Guitarra I: clases, preguntas y relación con las lecciones anteriores -----
$G = @(); $GQ = [ordered]@{}
foreach ($n in 1..12) { $p = ParseMd ([IO.File]::ReadAllText("$C\guitarra\nivel-1\clase-$n.md", $utf8)); $G += [pscustomobject]@{ n = $n; t = $p.t; mes = $p.mes; o = $p.o; md = $p.md }; $GQ["$n"] = $p.q }
$gj = (ConvertTo-Json -InputObject $G -Depth 4 -Compress).Replace('</', '<\/')
$qj = (ConvertTo-Json -InputObject $GQ -Depth 6 -Compress).Replace('</', '<\/')
$t = [regex]::Replace($t, '(?m)^const GNC1=\[.*\];\s*$', { param($m) 'const GNC1=' + $gj + ';' })
foreach ($p in '(?m)^const GNC1=\[.*\];[ \t]*$', '(?m)^const G1Q=\{.*\};[ \t]*$', '(?m)^const PNC=\[.*\];[ \t]*$') { $k = ([regex]::Matches($t, $p)).Count; if ($k -ne 1) { throw "patrón $p coincide $k veces" } }
$t = [regex]::Replace($t, '(?m)^const G1Q=\{.*\};[ \t]*$', { param($m) 'const G1Q=' + $qj + ';' })
# ----- Piano: las 36 clases (el Nivel 1 cambió de orden) -----
$arr = @()
foreach ($n in 1..36) { $lv = [Math]::Ceiling($n / 12); $arr += [pscustomobject]@{ n = $n; raw = [IO.File]::ReadAllText("$C\piano\nivel-$lv\clase-$n.md", $utf8).Replace("`r", '') } }
$pj = (ConvertTo-Json -InputObject $arr -Depth 3 -Compress).Replace('</', '<\/')
$t = [regex]::Replace($t, '(?m)^const PNC=\[.*\];\s*$', { param($m) 'const PNC=' + $pj + ';' })
[IO.File]::WriteAllText($OUT, $t, $utf8)
"ok · {0:N0} bytes" -f (Get-Item $OUT).Length
