# Extensión del generador de láminas para los Niveles 2 y 3:
# clave de fa, gran pentagrama, alteraciones, armadura, puntillo, ligaduras, staccato,
# acordes en el pentagrama, cifrado sobre el compás y lectura sin color.
. (Join-Path $PSScriptRoot '..\nivel-1\img\generador\lib.ps1')
$script:NMODE = 'color'   # color | black (negro con nombre) | plain (partitura convencional)
$ACCG = @{ '#' = '♯'; 'b' = '♭'; 'n' = '♮' }
$BASE = @{ G = 9; F = -3 }   # índice de la nota en la 1.ª línea: MI4 (sol) · SOL2 (fa)

function NoteLabel($a, $acc) { (NoteName $a) + $(if ($acc -and $acc -ne 'n') { $ACCG[$acc] } else { '' }) }
function Y2($y, $sp, $a, $clef) { $y + 4 * $sp - ($a - $BASE[$clef]) * $sp / 2 }
function BassClef($x, $y, $sp) {
  $cx = $x + 0.55 * $sp; $cy = $y + $sp
  C $cx $cy (0.36 * $sp) $INK
  $d = 'M{0} {1} C{2} {3} {4} {5} {6} {7} C{8} {9} {10} {11} {12} {13}' -f (N ($cx - 0.1 * $sp)), (N ($cy - 0.25 * $sp)), (N ($cx + 0.2 * $sp)), (N ($y - 0.25 * $sp)), (N ($x + 2.35 * $sp)), (N ($y - 0.2 * $sp)), (N ($x + 2.3 * $sp)), (N ($y + 1.2 * $sp)), (N ($x + 2.25 * $sp)), (N ($y + 2.5 * $sp)), (N ($x + 1.2 * $sp)), (N ($y + 3.3 * $sp)), (N ($x + 0.15 * $sp)), (N ($y + 3.8 * $sp))
  P $d 'none' $INK (0.3 * $sp) 'stroke-linecap="round"'
  C ($x + 2.85 * $sp) ($y + 0.5 * $sp) (0.17 * $sp) $INK
  C ($x + 2.85 * $sp) ($y + 1.5 * $sp) (0.17 * $sp) $INK
}
function Staff2($x, $y, $w, $sp, $clef) {
  for ($k = 0; $k -lt 5; $k++) { L $x ($y + $k * $sp) ($x + $w) ($y + $k * $sp) $INK 3 }
  if ($clef -eq 'G') { $s = 0.006214 * $sp; A ('<path d="{0}" fill="{1}" transform="translate({2},{3}) scale({4},{5})"/>' -f $script:CLEF, $INK, (N ($x + 0.15 * $sp)), (N ($y + 4 * $sp - 0.1585 * $sp)), (N $s), (N (-$s))) }
  else { BassClef ($x + 0.3 * $sp) $y $sp }
}
function AccGlyph($x, $ny, $sp, $acc) {
  $dy = 0.35; if ($acc -eq 'b') { $dy = 0.15 }
  T $x ($ny + $dy * $sp) $ACCG[$acc] (1.7 * $sp) 400 $INK 'middle' "'DejaVu Sans', 'Segoe UI Symbol', 'Arial Unicode MS', sans-serif"
}
function KeySig($x, $y, $sp, $clef, $accs) {
  # accs: arreglo de @(abs, '#'|'b') ya en la octava correcta para esa clave
  $i = 0; foreach ($k in $accs) { AccGlyph ($x + $i * 1.0 * $sp) (Y2 $y $sp $k[0] $clef) $sp $k[1]; $i++ }
  return $i
}
function Ledger2($cx, $y, $sp, $a, $clef) {
  $st = $a - $BASE[$clef]; $yb = $y + 4 * $sp
  for ($s = -2; $s -ge $st; $s -= 2) { L ($cx - 1.05 * $sp) ($yb - $s * $sp / 2) ($cx + 1.05 * $sp) ($yb - $s * $sp / 2) $INK 3 }
  for ($s = 10; $s -le $st; $s += 2) { L ($cx - 1.05 * $sp) ($yb - $s * $sp / 2) ($cx + 1.05 * $sp) ($yb - $s * $sp / 2) $INK 3 }
}
function Head2($cx, $ny, $sp, $a, $hollow, $new = $false) {
  $fill = $INK
  if ($script:NMODE -eq 'color' -or $new) { $fill = $NC[(NoteName $a)] }
  A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-20 {0} {1})" fill="{4}" stroke="{5}" stroke-width="3"/>' -f (N $cx), (N $ny), (N (0.66 * $sp)), (N (0.47 * $sp)), $fill, $INK)
  if ($hollow) { A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-35 {0} {1})" fill="#FFFFFF"/>' -f (N $cx), (N $ny), (N (0.4 * $sp)), (N (0.19 * $sp))) }
}
function NamePill($cx, $cy, $label, $h, $new = $false) {
  if ($script:NMODE -eq 'plain') { return }
  $nm = $label -replace '[♯♭]', ''
  if ($script:NMODE -eq 'color' -or $new) {
    $w = [Math]::Max($h * 1.9, $label.Length * $h * 0.5 + $h * 0.9)
    Rc ($cx - $w / 2) ($cy - $h / 2) $w $h $NC[$nm] $INK 2.5 ($h / 2)
    T $cx ($cy + $h * 0.19) $label ($h * 0.52) 700 $NTX[$nm]
  } else {
    T $cx ($cy + $h * 0.19) $label ($h * 0.55) 700 $INK
  }
}
function Dur2($t) { switch ($t) { 'q' { 1 } 'h' { 2 } 'w' { 4 } 'e' { 0.5 } 'qd' { 1.5 } 'hd' { 3 } 'qr' { 1 } 'hr' { 2 } 'wr' { 4 } 'er' { 0.5 } } }
function Notes($e) { if ($e.as) { @($e.as) } elseif ($null -ne $e.a) { @($e.a) } else { @() } }

# Un sistema de uno o varios pentagramas que comparten los compases.
# staves: @( @{ clef='G'; bars=@(...); key=@(...) }, @{ clef='F'; ... } )
# evento: @{ a=índice | as=@(acorde); acc=@{índice='#'}; t; f; s; c; b(barra); tie; sl='s'|'e'; st; dyn; ch(cifrado); new }
function System($x, $y, $w, $sp, $beats, $tsA, $tsB, $staves, $opt = @{}) {
  $gap = 9 * $sp; if ($opt.gap) { $gap = $opt.gap }
  $ys = @(); for ($k = 0; $k -lt $staves.Count; $k++) { $ys += $y + $k * $gap }
  $start = $x + 3.4 * $sp
  $nk = 0
  for ($k = 0; $k -lt $staves.Count; $k++) { Staff2 $x $ys[$k] $w $sp $staves[$k].clef; if ($staves[$k].key) { $nk = KeySig ($x + 3.6 * $sp) $ys[$k] $sp $staves[$k].clef $staves[$k].key } }
  $start += $nk * 1.0 * $sp
  if ($tsA) { foreach ($yy in $ys) { TimeSig ($start + 0.9 * $sp) $yy $sp $tsA $tsB }; $start += 2.6 * $sp }
  if ($staves.Count -gt 1) {
    L $x $ys[0] $x ($ys[-1] + 4 * $sp) $INK 4
    $by = $ys[0]; $bh = $ys[-1] + 4 * $sp - $by
    P ('M{0} {1} Q{2} {3} {4} {5} Q{6} {7} {8} {9} Q{6} {10} {0} {11}' -f (N ($x - 0.4 * $sp)), (N $by), (N ($x - 1.4 * $sp)), (N ($by + $bh * 0.1)), (N ($x - 1.0 * $sp)), (N ($by + $bh * 0.45)), (N ($x - 1.0 * $sp)), (N ($by + $bh * 0.5)), (N ($x - 1.6 * $sp)), (N ($by + $bh * 0.5)), (N ($by + $bh * 0.55)), (N ($by + $bh))) 'none' $INK (0.28 * $sp)
  }
  $nb = $staves[0].bars.Count; $bw = ($x + $w - $start) / $nb
  $script:SYS = @()
  for ($k = 0; $k -lt $staves.Count; $k++) {
    $clef = $staves[$k].clef; $yy = $ys[$k]; $evs = New-Object System.Collections.ArrayList
    for ($b = 0; $b -lt $nb; $b++) {
      $bx = $start + $b * $bw; $pad = 0.9 * $sp; $inner = $bw - 2 * $pad; $beat = 0.0
      foreach ($e in $staves[$k].bars[$b]) {
        $d = Dur2 $e.t
        if ($d -ge $beats -and $e.t -ne 'hd' -or ($e.t -eq 'hd' -and $beats -eq 3)) { $cx = $bx + $bw / 2 - 0.3 * $sp } else { $cx = $bx + $pad + ($beat + 0.42 * [Math]::Min([double]$d, 1.0)) / $beats * $inner }
        [void]$evs.Add(@{ cx = $cx; e = $e; bar = $b }); $beat += $d
      }
    }
    $script:SYS += , @{ y = $yy; clef = $clef; evs = $evs }
  }
  # barras de compás (atraviesan todo el sistema)
  for ($b = 1; $b -le $nb; $b++) {
    $ex = $start + $b * $bw; $y1 = $ys[0]; $y2 = $ys[-1] + 4 * $sp
    if ($b -eq $nb -and -not $opt.open) { L ($ex - 0.45 * $sp) $y1 ($ex - 0.45 * $sp) $y2 $INK 3; Rc ($ex - 0.25 * $sp) $y1 (0.25 * $sp) ($y2 - $y1) $INK }
    else { L $ex $y1 $ex $y2 $INK 3 }
  }
  foreach ($st in $script:SYS) { DrawEvents $st.evs $st.y $sp $st.clef }
  # cifrado sobre el primer pentagrama
  foreach ($v in $script:SYS[0].evs) { if ($v.e.ch) { T ($v.cx - 0.3 * $sp) ($ys[0] - 2.6 * $sp) $v.e.ch (1.0 * $sp) 700 $GOLDT 'start' } }
}
function DrawEvents($evs, $y, $sp, $clef) {
  $mid = $BASE[$clef] + 4
  $i = 0
  while ($i -lt $evs.Count) {
    $v = $evs[$i]; $e = $v.e
    if ($e.t -eq 'qr') { QRest $v.cx $y $sp; $i++; continue }
    if ($e.t -eq 'hr') { HRest $v.cx $y $sp; $i++; continue }
    if ($e.t -eq 'wr') { WRest $v.cx $y $sp; $i++; continue }
    if ($e.t -eq 'e' -and $e.b) {
      $g = @(); $j = $i
      while ($j -lt $evs.Count -and $evs[$j].e.t -eq 'e' -and $evs[$j].e.b -eq $e.b) { $g += $evs[$j]; $j++ }
      $avg = ($g | ForEach-Object { (Notes $_.e)[0] } | Measure-Object -Average).Average
      $up = $avg -lt $mid
      if ($up) { $tip = ($g | ForEach-Object { Y2 $y $sp ((Notes $_.e) | Measure-Object -Maximum).Maximum $clef } | Measure-Object -Minimum).Minimum - 3.3 * $sp }
      else { $tip = ($g | ForEach-Object { Y2 $y $sp ((Notes $_.e) | Measure-Object -Minimum).Minimum $clef } | Measure-Object -Maximum).Maximum + 3.3 * $sp }
      foreach ($u in $g) { DrawNote $u $y $sp $clef $up $tip }
      $x1 = $g[0].cx; $x2 = $g[-1].cx; $off = $(if ($up) { 0.62 * $sp } else { -0.62 * $sp }); $by = $(if ($up) { $tip } else { $tip - 0.48 * $sp })
      Rc ($x1 + $off - 2) $by ($x2 - $x1 + 4) (0.48 * $sp) $INK
      $i = $j; continue
    }
    $ns = Notes $e; $up = (($ns | Measure-Object -Average).Average) -lt $mid
    DrawNote $v $y $sp $clef $up $null
    $i++
  }
  # ligaduras (prolongación y expresión)
  for ($i = 0; $i -lt $evs.Count; $i++) {
    $e = $evs[$i].e
    if ($e.tie -and $i + 1 -lt $evs.Count) { $ny = Y2 $y $sp (Notes $e)[0] $clef; Arc $evs[$i].cx $evs[$i + 1].cx ($ny + 0.7 * $sp) 1 $sp }
    if ($e.sl -eq 's') { for ($j = $i + 1; $j -lt $evs.Count; $j++) { if ($evs[$j].e.sl -eq 'e') { $top = [Math]::Min((Y2 $y $sp (Notes $e)[0] $clef), (Y2 $y $sp (Notes $evs[$j].e)[0] $clef)) - 4.2 * $sp; Arc $evs[$i].cx $evs[$j].cx $top -1 $sp; break } } }
    if ($e.dyn) { T $evs[$i].cx ($y + 6.6 * $sp) $e.dyn (1.3 * $sp) 700 $INK 'middle' $FS 'font-style="italic"' }
  }
}
function Arc($x1, $x2, $yy, $dir, $sp) {
  $h = 0.9 * $sp * $dir
  P ('M{0} {1} Q{2} {3} {4} {1}' -f (N ($x1 + 0.2 * $sp)), (N $yy), (N (($x1 + $x2) / 2)), (N ($yy + $h)), (N ($x2 - 0.2 * $sp))) 'none' $INK (0.16 * $sp) 'stroke-linecap="round"'
}
function DrawNote($v, $y, $sp, $clef, $up, $tip) {
  $e = $v.e; $ns = Notes $e; $cx = $v.cx
  $hollow = @('h', 'w', 'hd') -contains $e.t
  $ns = @($ns | Sort-Object); $prevShift = $false
  for ($j = 0; $j -lt $ns.Count; $j++) {
    $a = $ns[$j]; $hx = $cx
    if ($j -gt 0 -and ($a - $ns[$j - 1]) -eq 1 -and -not $prevShift) { $hx = $cx + 1.25 * $sp; $prevShift = $true } else { $prevShift = $false }
    $ny = Y2 $y $sp $a $clef
    Ledger2 $hx $y $sp $a $clef
    $acc = $null; if ($e.acc) { $acc = $e.acc[[int]$a] }
    if ($acc) { AccGlyph ($cx - 1.55 * $sp) $ny $sp $acc }
    Head2 $hx $ny $sp $a $hollow $e.new
    if ($e.t -eq 'qd' -or $e.t -eq 'hd') { $dy = $(if ((($a - $BASE[$clef]) % 2 + 2) % 2 -eq 0) { -0.5 * $sp } else { 0 }); C ($hx + 1.0 * $sp) ($ny + $dy) (0.16 * $sp) $INK }
  }
  if ($e.t -ne 'w') {
    $hi = Y2 $y $sp (($ns | Measure-Object -Maximum).Maximum) $clef; $lo = Y2 $y $sp (($ns | Measure-Object -Minimum).Minimum) $clef
    if ($up) { $sx = $cx + 0.62 * $sp; $ty = $tip; if ($null -eq $ty) { $ty = $hi - 3.5 * $sp }; L $sx $lo $sx $ty $INK 4 }
    else { $sx = $cx - 0.62 * $sp; $ty = $tip; if ($null -eq $ty) { $ty = $lo + 3.5 * $sp }; L $sx $hi $sx $ty $INK 4 }
  }
  if ($e.st) { $sy = $(if ($up) { (Y2 $y $sp (($ns | Measure-Object -Minimum).Minimum) $clef) + 1.1 * $sp } else { (Y2 $y $sp (($ns | Measure-Object -Maximum).Maximum) $clef) - 1.1 * $sp }); C $cx $sy (0.18 * $sp) $INK }
}
# Filas de nombres y dedos debajo (o encima) de un pentagrama del sistema
function NameRow($k, $yy, $h, $sp) {
  foreach ($v in $script:SYS[$k].evs) { $ns = Notes $v.e; if ($ns.Count -eq 1) { $acc = $null; if ($v.e.acc) { $acc = $v.e.acc[[int]$ns[0]] }; NamePill $v.cx $yy (NoteLabel $ns[0] $acc) $h $v.e.new } }
}
function FingRow($k, $yy, $sp, $label = '') {
  if ($label) { T ($script:SYS[$k].evs[0].cx - 2.5 * $sp) $yy $label (0.6 * $sp) 700 $GOLDT 'end' }
  foreach ($v in $script:SYS[$k].evs) { if ($v.e.f) { T $v.cx $yy "$($v.e.f)" (0.85 * $sp) 700 $GOLDT } }
}
function TextRow($k, $yy, $sp, $field, $col = $GRAY) { foreach ($v in $script:SYS[$k].evs) { if ($v.e[$field]) { T $v.cx $yy $v.e[$field] (0.7 * $sp) 600 $col } } }

# Teclado con teclas negras marcadas. bmarks: @{ abs_de_la_blanca_izquierda = @{ fill; lbl=@('DO♯','RE♭'); fing } }
function Kb2($x, $y, $ww, $wh, $first, $n, $marks = @{}, $bmarks = @{}, [switch]$showNames, $nameSize = 0, $fr = 0) {
  Kb $x $y $ww $wh $first $n $marks -showNames:$showNames -nameSize $nameSize -fr $fr
  $bw = $ww * 0.58; $r = $fr; if (-not $r) { $r = [Math]::Min($ww * 0.34, 34) }
  foreach ($k in $bmarks.Keys) {
    $m = $bmarks[$k]; $i = $k - $first; $bx = $x + ($i + 1) * $ww - $bw / 2
    if ($m.fill) { Rc $bx $y $bw ($wh * 0.62) $m.fill $INK 2 4 }
    if ($m.lbl) { $ly = $y + $wh * 0.62 - 14 - ($m.lbl.Count - 1) * $bw * 0.42; foreach ($l in $m.lbl) { T ($bx + $bw / 2) $ly $l ([Math]::Min($bw * 0.36, 28)) 700 '#FFFFFF'; $ly += $bw * 0.42 } }
    if ($m.fing) { Fing ($bx + $bw / 2) ($y - $r - 14) $m.fing $r }
  }
}
function BX($x, $ww, $first, $k) { $x + ($k - $first + 1) * $ww }   # centro de la tecla negra a la derecha de la blanca k
