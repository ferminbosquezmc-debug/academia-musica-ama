# Biblioteca de dibujo de las láminas de batería (Método Integral AMA)
# Usa las funciones básicas del generador de piano (T, Rc, C, L, P, Head, Num, Arrow, NewSvg, Save, QRest, HRest, WRest, TimeSig).
. (Join-Path $PSScriptRoot '..\..\piano\nivel-1\img\generador\lib.ps1')
# Colores AMA por extremidad
$DC = '#E5312B'; $IC = '#2370D6'; $PDC = '#2E9E4F'; $PIC = '#8E3BB8'
$LIMB = @{ D = $DC; I = $IC; PD = $PDC; PI = $PIC }
$SHELL = '#2B2F3A'; $DRUMHEAD = '#F3F1EA'; $METAL = '#C9A227'; $METALDK = '#8A6A0A'; $LIGHT = '#EEF0F4'

# ---------- Batería vista de frente (coordenadas propias 900 x 470) ----------
# marks: @{ pieza = @{ fill = color } } · piezas: crash ride hihat tom1 tom2 bombo caja piso pedalB pedalH banco
$KITPT = @{ crash = @(150, 60); ride = @(750, 52); hihat = @(90, 212); tom1 = @(387, 120); tom2 = @(513, 116); bombo = @(450, 330); caja = @(270, 268); piso = @(675, 256); pedalB = @(450, 452); pedalH = @(90, 452); banco = @(845, 395) }
function KX($x0, $sc, $p) { $x0 + $KITPT[$p][0] * $sc }
function KY($y0, $sc, $p) { $y0 + $KITPT[$p][1] * $sc }
function Kit($x0, $y0, $sc, $marks = @{}, [switch]$banco) {
  function F($p, $def) { if ($marks.ContainsKey($p) -and $marks[$p].fill) { $marks[$p].fill } else { $def } }
  A ('<g transform="translate({0},{1}) scale({2})">' -f (N $x0), (N $y0), (N $sc))
  foreach ($sx in @(150, 750, 90)) { L $sx 120 $sx 448 '#9AA0A6' 4 }
  # platillos
  A ('<ellipse cx="150" cy="110" rx="105" ry="28" fill="{0}" stroke="{1}" stroke-width="2"/>' -f (F 'crash' $METAL), $METALDK)
  A ('<ellipse cx="750" cy="110" rx="122" ry="32" fill="{0}" stroke="{1}" stroke-width="2"/>' -f (F 'ride' $METAL), $METALDK)
  C 750 108 16 $METALDK; C 150 108 9 $METALDK
  A ('<ellipse cx="90" cy="252" rx="70" ry="16" fill="{0}" stroke="{1}" stroke-width="2"/>' -f (F 'hihat' $METAL), $METALDK)
  A ('<ellipse cx="90" cy="242" rx="70" ry="16" fill="{0}" stroke="{1}" stroke-width="2"/>' -f (F 'hihat' $METAL), $METALDK)
  # banco (detrás)
  if ($banco) { Rc 790 375 110 26 '#4A4F5C' $INK 2 12; L 845 401 845 448 '#4A4F5C' 10; L 815 448 875 448 '#4A4F5C' 8 }
  # toms sobre el bombo
  Rc 335 150 104 60 $SHELL $INK 2 8; A ('<ellipse cx="387" cy="150" rx="52" ry="17" fill="{0}" stroke="{1}" stroke-width="3"/>' -f (F 'tom1' $DRUMHEAD), $SHELL)
  Rc 455 148 116 66 $SHELL $INK 2 8; A ('<ellipse cx="513" cy="148" rx="58" ry="19" fill="{0}" stroke="{1}" stroke-width="3"/>' -f (F 'tom2' $DRUMHEAD), $SHELL)
  # bombo
  C 450 330 118 $SHELL $INK 2; C 450 330 102 (F 'bombo' $DRUMHEAD) $SHELL 3
  T 450 338 'AMA' 32 700 $GOLDT
  # redoblante
  L 270 352 270 448 '#9AA0A6' 4
  Rc 205 300 130 50 $SHELL $INK 2 8; A ('<ellipse cx="270" cy="300" rx="65" ry="21" fill="{0}" stroke="{1}" stroke-width="3"/>' -f (F 'caja' $DRUMHEAD), $SHELL)
  L 205 325 335 325 $METAL 3
  # tom de piso
  Rc 600 290 150 130 $SHELL $INK 2 10; A ('<ellipse cx="675" cy="290" rx="75" ry="23" fill="{0}" stroke="{1}" stroke-width="3"/>' -f (F 'piso' $DRUMHEAD), $SHELL)
  L 612 420 606 452 '#9AA0A6' 5; L 738 420 744 452 '#9AA0A6' 5
  # pedales
  Rc 425 440 50 14 (F 'pedalB' '#6B7280') $INK 2 4
  Rc 62 440 56 14 (F 'pedalH' '#6B7280') $INK 2 4
  A '</g>'
}

# ---------- Cuadrícula de colores ----------
# rows: @(@{ n = 'Hi-hat'; l = 'D'; h = @(0,1,…); lt = @{ idx = 'I' } })  · cols: etiquetas del conteo
function KGrid($x, $y, $cols, $rows, $cw = 120, $rh = 90, $lw = 260, $fsz = 30) {
  $ncol = $cols.Count
  # fondo por tiempo
  for ($k = 0; $k -lt $ncol; $k++) { if (-not ($cols[$k] -match '^[0-9]+$')) { continue }; Rc ($x + $lw + $k * $cw + 4) ($y + 6) ($cw - 8) ($rh * ($rows.Count + 0.75)) $LIGHT 'none' 0 14 }
  for ($k = 0; $k -lt $ncol; $k++) {
    $lb = [string]$cols[$k]; $col = $GRAY; if ($lb -match '^[0-9]+$') { $col = $INK }
    T ($x + $lw + ($k + 0.5) * $cw) ($y + $rh * 0.55) $lb ($fsz * 1.15) 700 $col
  }
  for ($r = 0; $r -lt $rows.Count; $r++) {
    $row = $rows[$r]; $cy = $y + $rh * ($r + 1.2)
    T $x ($cy + 10) $row.n $fsz 700 $INK 'start'
    L ($x + $lw) $cy ($x + $lw + $ncol * $cw) $cy '#D5D9E0' 2
    foreach ($k in $row.h) {
      $lt = $row.l; if ($row.lt -and $row.lt.ContainsKey([int]$k)) { $lt = $row.lt[[int]$k] }
      $cx = $x + $lw + ([int]$k + 0.5) * $cw; $rr = [Math]::Min($cw, $rh) * 0.36
      C $cx $cy $rr $LIMB[$lt] $INK 2
      T $cx ($cy + $rr * 0.36) $lt ($rr * 0.9) 700 '#FFFFFF'
    }
  }
}

# ---------- Partitura de batería ----------
function DStaff($x, $y, $w, $sp, $tsA = $null, $tsB = $null) {
  for ($k = 0; $k -lt 5; $k++) { L $x ($y + $k * $sp) ($x + $w) ($y + $k * $sp) $INK 3 }
  Rc ($x + 0.7 * $sp) ($y + $sp) (0.32 * $sp) (2 * $sp) $INK; Rc ($x + 1.25 * $sp) ($y + $sp) (0.32 * $sp) (2 * $sp) $INK
  L ($x + $w) $y ($x + $w) ($y + 4 * $sp) $INK 4
  if ($tsA) { TimeSig ($x + 2.9 * $sp) $y $sp $tsA $tsB }
}
$PIECEY = @{ crash = -1; hihat = -0.5; ride = 0; tom1 = 0.5; tom2 = 1; caja = 1.5; piso = 2.5; bombo = 3.5; hhpie = 4.5 }
function PY($y, $sp, $p) { $y + $PIECEY[$p] * $sp }
function IsCym($p) { @('crash', 'hihat', 'ride', 'hhpie') -contains $p }
function DHead($cx, $y, $sp, $p, $hollow = $false, $col = $INK) {
  $hy = PY $y $sp $p
  if ($p -eq 'crash') { L ($cx - 1.0 * $sp) ($y - $sp) ($cx + 1.0 * $sp) ($y - $sp) $INK 3 }
  if (IsCym $p) { $d = 0.42 * $sp; L ($cx - $d) ($hy - $d) ($cx + $d) ($hy + $d) $col 4 'stroke-linecap="round"'; L ($cx - $d) ($hy + $d) ($cx + $d) ($hy - $d) $col 4 'stroke-linecap="round"' }
  else {
    A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-20 {0} {1})" fill="{4}"/>' -f (N $cx), (N $hy), (N (0.62 * $sp)), (N (0.44 * $sp)), $col)
    if ($hollow) { A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-35 {0} {1})" fill="#FFFFFF"/>' -f (N $cx), (N $hy), (N (0.38 * $sp)), (N (0.18 * $sp))) }
  }
}
# Plica hacia arriba (manos) desde la nota más baja del grupo hasta $tip; devuelve x de la plica
function StemUpTo($cx, $y, $sp, $lowP, $tip) { $sx = $cx + 0.56 * $sp; if (IsCym $lowP) { $sx = $cx + 0.42 * $sp }; L $sx (PY $y $sp $lowP) $sx $tip $INK 3.5; $sx }
function StemDownTo($cx, $y, $sp, $p, $tip) { $sx = $cx - 0.56 * $sp; L $sx (PY $y $sp $p) $sx $tip $INK 3.5; $sx }
function Beam($x1, $x2, $yb, $sp, $down = $false) { $h = 0.45 * $sp; $yy = $yb; if ($down) { $yy = $yb - $h }; Rc $x1 $yy ($x2 - $x1) $h $INK }

# Símbolo de figura pequeño (para filas): w, h, q
function FigSym($cx, $cy, $t, $sz = 1) {
  $rx = 15 * $sz; $ry = 10.5 * $sz
  if ($t -eq 'w') { A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" fill="{4}"/>' -f (N $cx), (N $cy), (N ($rx * 1.15)), (N $ry), $INK); A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-55 {0} {1})" fill="#FFFFFF"/>' -f (N $cx), (N $cy), (N (6 * $sz)), (N (8.5 * $sz))); return }
  A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-20 {0} {1})" fill="{4}"/>' -f (N $cx), (N $cy), (N $rx), (N $ry), $INK)
  if ($t -eq 'h') { A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" transform="rotate(-35 {0} {1})" fill="#FFFFFF"/>' -f (N $cx), (N $cy), (N (9 * $sz)), (N (4 * $sz))) }
  L ($cx + 13.5 * $sz) ($cy - 2) ($cx + 13.5 * $sz) ($cy - 62 * $sz) $INK (3.5 * $sz)
}
# Fila de digitación (rudimentos): cajas D / I
function Sticking($x, $y, $seq, $bw = 110, $bh = 90, $cnt = $null) {
  for ($k = 0; $k -lt $seq.Count; $k++) {
    $lt = $seq[$k]; $bx = $x + $k * ($bw + 14) + [Math]::Floor($k / 4) * 30
    if ($cnt) { $c0 = $GRAY; if ($cnt[$k] -match '^[0-9]+$') { $c0 = $INK }; T ($bx + $bw / 2) ($y - 22) $cnt[$k] 34 700 $c0 }
    Rc $bx $y $bw $bh $LIMB[$lt] $INK 2.5 16
    T ($bx + $bw / 2) ($y + $bh * 0.66) $lt 48 700 '#FFFFFF'
  }
}
function Chip($cx, $cy, $lt, $r = 30) { C $cx $cy $r $LIMB[$lt] $INK 2; T $cx ($cy + $r * 0.36) $lt ($r * (1.0 - 0.18 * ($lt.Length - 1))) 700 '#FFFFFF' }
