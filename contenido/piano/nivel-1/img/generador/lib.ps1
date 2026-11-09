# Biblioteca de dibujo de las láminas de piano (estilo del Método Integral AMA)
[Threading.Thread]::CurrentThread.CurrentCulture = [Globalization.CultureInfo]::InvariantCulture
$utf8 = New-Object Text.UTF8Encoding($false)
$FP = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"
$FI = "Inter, 'Segoe UI', Arial, sans-serif"
$FS = "'DejaVu Serif', 'Times New Roman', serif"
$INK = '#1A1A1A'; $GOLD = '#C9A227'; $GOLDT = '#8A6A0A'; $GRAY = '#5F6368'; $PAPER = '#FAF6EE'; $SKIN = '#F2D3B3'
$NAMES = @('DO','RE','MI','FA','SOL','LA','SI')
$NC  = @{ DO='#E5312B'; RE='#F57C00'; MI='#FFD21F'; FA='#2E9E4F'; SOL='#2AA7E8'; LA='#283593'; SI='#8E3BB8' }
$NTX = @{ DO='#FFFFFF'; RE=$INK; MI=$INK; FA=$INK; SOL=$INK; LA='#FFFFFF'; SI='#FFFFFF' }
$CIF = @{ DO='C'; RE='D'; MI='E'; FA='F'; SOL='G'; LA='A'; SI='B' }
$CLEF = (Get-Content -Raw (Join-Path $PSScriptRoot 'clave_sol.txt')).Trim()

function N($v) { ([double]$v).ToString('0.##') }
function E([string]$s) { $s.Replace('&','&amp;').Replace('<','&lt;').Replace('>','&gt;') }
function A([string]$s) { [void]$script:sb.AppendLine($s) }
function NewSvg($w, $h, $title) {
  $script:sb = New-Object Text.StringBuilder
  A '<?xml version="1.0" encoding="UTF-8"?>'
  A ('<svg xmlns="http://www.w3.org/2000/svg" width="{0}" height="{1}" viewBox="0 0 {0} {1}" role="img" aria-label="{2}">' -f $w, $h, (E $title))
  A ('<title>{0}</title>' -f (E $title))
  A ('<rect width="{0}" height="{1}" fill="#FFFFFF"/>' -f $w, $h)
}
function Save($name) { A '</svg>'; [IO.File]::WriteAllText((Join-Path $script:OUT "$name.svg"), $script:sb.ToString(), $utf8) }
function T($x, $y, $s, $size = 36, $w = 700, $fill = $INK, $anchor = 'middle', $font = $FP, $extra = '') {
  A ('<text x="{0}" y="{1}" font-family="{2}" font-size="{3}" font-weight="{4}" fill="{5}" text-anchor="{6}" {7}>{8}</text>' -f (N $x), (N $y), $font, (N $size), $w, $fill, $anchor, $extra, (E $s))
}
function Rc($x, $y, $w, $h, $fill, $stroke = 'none', $sw = 0, $rx = 0, $extra = '') {
  A ('<rect x="{0}" y="{1}" width="{2}" height="{3}" rx="{4}" fill="{5}" stroke="{6}" stroke-width="{7}" {8}/>' -f (N $x), (N $y), (N $w), (N $h), (N $rx), $fill, $stroke, (N $sw), $extra)
}
function C($cx, $cy, $r, $fill, $stroke = 'none', $sw = 0) {
  A ('<circle cx="{0}" cy="{1}" r="{2}" fill="{3}" stroke="{4}" stroke-width="{5}"/>' -f (N $cx), (N $cy), (N $r), $fill, $stroke, (N $sw))
}
function L($x1, $y1, $x2, $y2, $stroke = $INK, $sw = 3, $extra = '') {
  A ('<line x1="{0}" y1="{1}" x2="{2}" y2="{3}" stroke="{4}" stroke-width="{5}" {6}/>' -f (N $x1), (N $y1), (N $x2), (N $y2), $stroke, (N $sw), $extra)
}
function P($d, $fill = 'none', $stroke = 'none', $sw = 0, $extra = '') {
  A ('<path d="{0}" fill="{1}" stroke="{2}" stroke-width="{3}" {4}/>' -f $d, $fill, $stroke, (N $sw), $extra)
}
function Head($t, $sub) { T 40 72 $t 48 700 $INK 'start'; if ($sub) { T 40 124 $sub 32 500 $GRAY 'start' $FI } }
function Pill($cx, $cy, $name, $h = 48) {
  $w = [Math]::Max($h * 1.9, $name.Length * $h * 0.5 + $h * 0.9)
  Rc ($cx - $w / 2) ($cy - $h / 2) $w $h $NC[$name] $INK 2.5 ($h / 2)
  T $cx ($cy + $h * 0.19) $name ($h * 0.52) 700 $NTX[$name]
}
function Fing($cx, $cy, $num, $r = 30) { C $cx $cy $r $INK; T $cx ($cy + $r * 0.4) "$num" ($r * 1.15) 700 $GOLD }
function Num($cx, $cy, $num, $r = 30) { C $cx $cy $r $GOLD $INK 2.5; T $cx ($cy + $r * 0.38) "$num" ($r * 1.1) 700 $INK }
function Arrow($x1, $y1, $x2, $y2, $col = $INK, $sw = 5, $hs = 18) {
  L $x1 $y1 $x2 $y2 $col $sw 'stroke-linecap="round"'
  $a = [Math]::Atan2($y2 - $y1, $x2 - $x1)
  $p1x = $x2 - $hs * [Math]::Cos($a - 0.45); $p1y = $y2 - $hs * [Math]::Sin($a - 0.45)
  $p2x = $x2 - $hs * [Math]::Cos($a + 0.45); $p2y = $y2 - $hs * [Math]::Sin($a + 0.45)
  P ('M{0} {1} L{2} {3} L{4} {5} Z' -f (N $x2), (N $y2), (N $p1x), (N $p1y), (N $p2x), (N $p2y)) $col
}
function NoteName($abs) { $NAMES[$abs % 7] }

# ---------- Teclado ----------
# abs = índice de tecla blanca: 0 = DO3, 7 = DO4 (DO central), 14 = DO5
# marks: @{ abs = @{ fill; lbl; fing } }
function Kx($x, $ww, $first, $abs) { $x + ($abs - $first + 0.5) * $ww }
function Kb($x, $y, $ww, $wh, $first, $n, $marks = @{}, [switch]$showNames, $nameSize = 0, $fy = $null, $fr = 0) {
  if (-not $nameSize) { $nameSize = [Math]::Min($ww * 0.34, 40) }
  for ($i = 0; $i -lt $n; $i++) {
    $abs = $first + $i; $nm = NoteName $abs; $m = $null
    if ($marks.ContainsKey($abs)) { $m = $marks[$abs] }
    $fill = '#FFFFFF'; if ($m -and $m.fill) { $fill = $m.fill }
    Rc ($x + $i * $ww) $y $ww $wh $fill $INK 3 6
    $lbl = $null; if ($m -and $m.lbl) { $lbl = $m.lbl } elseif ($showNames) { $lbl = $nm }
    if ($lbl) {
      $tc = $GRAY
      if ($m -and $m.fill) { if ($m.fill -eq $NC[$nm]) { $tc = $NTX[$nm] } else { $tc = $INK } }
      T ($x + ($i + 0.5) * $ww) ($y + $wh - $nameSize * 0.6) $lbl $nameSize 700 $tc
    }
  }
  for ($i = 0; $i -lt $n - 1; $i++) {
    $abs = $first + $i
    if (@(0, 1, 3, 4, 5) -contains (($abs % 7 + 7) % 7)) { $bw = $ww * 0.58; Rc ($x + ($i + 1) * $ww - $bw / 2) $y $bw ($wh * 0.62) $INK $INK 2 4 }
  }
  $r = $fr; if (-not $r) { $r = [Math]::Min($ww * 0.34, 34) }
  foreach ($k in $marks.Keys) {
    $m = $marks[$k]
    if ($m.fing) { $cy = $fy; if ($null -eq $cy) { $cy = $y - $r - 14 }; Fing (Kx $x $ww $first $k) $cy $m.fing $r }
  }
}

# ---------- Pentagrama ----------
function Staff($x, $y, $w, $sp) {
  for ($k = 0; $k -lt 5; $k++) { L $x ($y + $k * $sp) ($x + $w) ($y + $k * $sp) $INK 3 }
  $s = 0.006214 * $sp
  A ('<path d="{0}" fill="{1}" transform="translate({2},{3}) scale({4},{5})"/>' -f $CLEF, $INK, (N ($x + 0.15 * $sp)), (N ($y + 4 * $sp - 0.1585 * $sp)), (N $s), (N (-$s)))
}
function TimeSig($x, $y, $sp, $a, $b) {
  T $x ($y + 1.92 * $sp) "$a" (2.3 * $sp) 700 $INK 'middle' $FS
  T $x ($y + 4 * $sp) "$b" (2.3 * $sp) 700 $INK 'middle' $FS
}
function NY($y, $sp, $abs) { $y + 4 * $sp - ($abs - 9) * $sp / 2 }
function Ledger($cx, $y, $sp, $abs) {
  $st = $abs - 9; $yb = $y + 4 * $sp
  for ($s = -2; $s -ge $st; $s -= 2) { L ($cx - 1.05 * $sp) ($yb - $s * $sp / 2) ($cx + 1.05 * $sp) ($yb - $s * $sp / 2) $INK 3 }
  for ($s = 10; $s -le $st; $s += 2) { L ($cx - 1.05 * $sp) ($yb - $s * $sp / 2) ($cx + 1.05 * $sp) ($yb - $s * $sp / 2) $INK 3 }
}
function NHead($cx, $ny, $sp, $abs, $hollow) {
  $nm = NoteName $abs
  A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-20 {0} {1})" fill="{4}" stroke="{5}" stroke-width="3"/>' -f (N $cx), (N $ny), (N (0.66 * $sp)), (N (0.47 * $sp)), $NC[$nm], $INK)
  if ($hollow) { A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-35 {0} {1})" fill="#FFFFFF"/>' -f (N $cx), (N $ny), (N (0.4 * $sp)), (N (0.19 * $sp))) }
}
function StemUp($abs) { ($abs - 9) -lt 4 }
function Stem($cx, $ny, $sp, $abs, $tip = $null) {
  if (StemUp $abs) { $sx = $cx + 0.62 * $sp; $ty = $tip; if ($null -eq $ty) { $ty = $ny - 3.5 * $sp }; L $sx $ny $sx $ty $INK 4 }
  else { $sx = $cx - 0.62 * $sp; L $sx $ny $sx ($ny + 3.5 * $sp) $INK 4 }
}
function QRest($cx, $y, $sp) {
  $m = $y + 2 * $sp
  $d = 'M{0} {1} L{2} {3} L{4} {5} L{6} {7} Q{8} {9} {10} {11}' -f (N ($cx - 0.25 * $sp)), (N ($m - 1.5 * $sp)), (N ($cx + 0.4 * $sp)), (N ($m - 0.7 * $sp)), (N ($cx - 0.3 * $sp)), (N ($m + 0.05 * $sp)), (N ($cx + 0.4 * $sp)), (N ($m + 0.8 * $sp)), (N ($cx - 0.55 * $sp)), (N ($m + 0.55 * $sp)), (N ($cx + 0.05 * $sp)), (N ($m + 1.45 * $sp))
  P $d 'none' $INK (0.28 * $sp) 'stroke-linejoin="round" stroke-linecap="round"'
}
function HRest($cx, $y, $sp) { Rc ($cx - 0.55 * $sp) ($y + 2 * $sp - 0.5 * $sp) (1.1 * $sp) (0.5 * $sp) $INK }
function WRest($cx, $y, $sp) { Rc ($cx - 0.55 * $sp) ($y + $sp) (1.1 * $sp) (0.5 * $sp) $INK }
function Dur($t) { switch ($t) { 'q' { 1 } 'h' { 2 } 'w' { 4 } 'e' { 0.5 } 'qr' { 1 } 'hr' { 2 } 'wr' { 4 } } }

# bars: arreglo de compases; cada compás, arreglo de eventos @{a; t; f; s; b}
# opt: pills, fing, syl, cnt (filas debajo), fingLabel
function Music($x, $y, $w, $sp, $beats, $tsA, $tsB, $bars, $opt = @{}) {
  Staff $x $y $w $sp
  $start = $x + 3.0 * $sp
  if ($tsA) { TimeSig ($x + 4.4 * $sp) $y $sp $tsA $tsB; $start = $x + 6.0 * $sp }
  $nb = $bars.Count; $bw = ($x + $w - $start) / $nb; $yb = $y + 4 * $sp
  $evs = New-Object System.Collections.ArrayList
  for ($b = 0; $b -lt $nb; $b++) {
    $bx = $start + $b * $bw; $pad = 0.8 * $sp; $inner = $bw - 2 * $pad; $beat = 0.0
    foreach ($e in $bars[$b]) {
      $d = Dur $e.t
      if ($d -ge $beats) { $cx = $bx + $bw / 2 } else { $cx = $bx + $pad + ($beat + 0.42 * [Math]::Min($d, 1)) / $beats * $inner }
      [void]$evs.Add(@{ cx = $cx; e = $e; bar = $b })
      $beat += $d
    }
    $ex = $bx + $bw
    if ($b -eq $nb - 1) { L ($ex - 0.45 * $sp) $y ($ex - 0.45 * $sp) $yb $INK 3; Rc ($ex - 0.25 * $sp) $y (0.25 * $sp) (4 * $sp) $INK }
    else { L $ex $y $ex $yb $INK 3 }
  }
  # notas y silencios
  $i = 0
  while ($i -lt $evs.Count) {
    $v = $evs[$i]; $e = $v.e
    if ($e.t -eq 'qr') { QRest $v.cx $y $sp } elseif ($e.t -eq 'hr') { HRest $v.cx $y $sp } elseif ($e.t -eq 'wr') { WRest $v.cx $y $sp }
    elseif ($e.t -eq 'e') {
      $g = @(); $j = $i
      while ($j -lt $evs.Count -and $evs[$j].e.t -eq 'e' -and $evs[$j].e.b -eq $e.b) { $g += $evs[$j]; $j++ }
      $tip = ($g | ForEach-Object { NY $y $sp $_.e.a } | Measure-Object -Minimum).Minimum - 3.3 * $sp
      foreach ($u in $g) { $ny = NY $y $sp $u.e.a; Ledger $u.cx $y $sp $u.e.a; NHead $u.cx $ny $sp $u.e.a $false; Stem $u.cx $ny $sp $u.e.a $tip }
      $x1 = $g[0].cx + 0.62 * $sp; $x2 = $g[-1].cx + 0.62 * $sp
      Rc ($x1 - 2) $tip ($x2 - $x1 + 4) (0.48 * $sp) $INK
      $i = $j; continue
    }
    else {
      $ny = NY $y $sp $e.a; Ledger $v.cx $y $sp $e.a
      NHead $v.cx $ny $sp $e.a ($e.t -eq 'h' -or $e.t -eq 'w')
      if ($e.t -ne 'w') { Stem $v.cx $ny $sp $e.a }
    }
    $i++
  }
  # filas
  $row = $yb + 2.3 * $sp
  if ($opt.pills) { foreach ($v in $evs) { if ($null -ne $v.e.a) { Pill $v.cx $row (NoteName $v.e.a) (1.15 * $sp) } }; $row += 1.95 * $sp }
  if ($opt.fing) {
    if ($opt.fingLabel) { T $x ($row + 0.3 * $sp) $opt.fingLabel (0.62 * $sp) 700 $GOLDT 'start' }
    foreach ($v in $evs) { if ($v.e.f) { T $v.cx ($row + 0.3 * $sp) "$($v.e.f)" (0.85 * $sp) 700 $GOLDT } }
    $row += 1.6 * $sp
  }
  if ($opt.syl) { foreach ($v in $evs) { if ($v.e.s) { T $v.cx ($row + 0.2 * $sp) $v.e.s (0.7 * $sp) 600 $GRAY } }; $row += 1.4 * $sp }
  if ($opt.cnt) { foreach ($v in $evs) { if ($v.e.c) { T $v.cx ($row + 0.2 * $sp) $v.e.c (0.7 * $sp) 700 $INK } }; $row += 1.4 * $sp }
  $script:EVS = $evs; $script:ROW = $row
}
function Q($a, $f, $s = 'ta') { @{ a = $a; t = 'q'; f = $f; s = $s } }
function Hn($a, $f, $s = 'taa-aa') { @{ a = $a; t = 'h'; f = $f; s = $s } }
function Wn($a, $f, $s = 'taa-aa-aa-aa') { @{ a = $a; t = 'w'; f = $f; s = $s } }
function En($a, $f, $b, $c = '') { @{ a = $a; t = 'e'; f = $f; s = 'ti'; b = $b; c = $c } }
