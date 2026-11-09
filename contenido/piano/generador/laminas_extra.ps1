# Láminas añadidas (noviembre 2026): símbolos de las figuras, los 8 grados, los elementos de la música
# y más ilustraciones para las clases de piano. Uso:
#   powershell -File contenido/piano/generador/laminas_extra.ps1
. (Join-Path $PSScriptRoot 'lib2.ps1')
$GIMG = Join-Path $PSScriptRoot '..\..\guitarra\img'
$P1 = Join-Path $PSScriptRoot '..\nivel-1\img'
$P2 = Join-Path $PSScriptRoot '..\nivel-2\img'
$P3 = Join-Path $PSScriptRoot '..\nivel-3\img'

# ===== Símbolos oficiales de las figuras (nota y su silencio) =====
$script:OUT = $GIMG
function Flag($sx, $fy) { P ('M{0} {1} C{2} {3} {4} {5} {6} {7} C{8} {9} {10} {11} {0} {12} Z' -f (N $sx), (N $fy), (N ($sx + 3)), (N ($fy + 9)), (N ($sx + 18)), (N ($fy + 13)), (N ($sx + 15)), (N ($fy + 31)), (N ($sx + 13)), (N ($fy + 20)), (N ($sx + 5)), (N ($fy + 15)), (N ($fy + 13))) $INK }
function FigRest($cx, $y0, $sp, $nh) {
  $len = $sp * (1.6 + $nh); $ty = $y0 + $sp - ($nh - 1) * $sp * 0.5; $tx = $cx + 7
  L $tx $ty ($tx - 0.3 * $len) ($ty + $len) $INK 3.2 'stroke-linecap="round"'
  for ($k = 0; $k -lt $nh; $k++) {
    $ya = $ty + $k * $sp + 2; $xa = $tx - 0.3 * ($ya - $ty)
    C ($xa - 12) ($ya + 2) 4.6 $INK
    P ('M{0} {1} Q{2} {3} {4} {5}' -f (N ($xa - 12)), (N ($ya + 5)), (N ($xa - 5)), (N ($ya + 7)), (N $xa), (N $ya)) 'none' $INK 3
  }
}
$FIGS = @(
  @('redonda', 'Redonda', 0), @('blanca', 'Blanca', 0), @('negra', 'Negra', 0), @('corchea', 'Corchea', 1),
  @('semicorchea', 'Semicorchea', 2), @('fusa', 'Fusa', 3), @('semifusa', 'Semifusa', 4))
foreach ($fg in $FIGS) {
  $id = $fg[0]; $nf = $fg[2]
  NewSvg 320 170 ($fg[1] + ': figura y silencio')
  $sp = 16; $y0 = 46
  for ($k = 0; $k -lt 5; $k++) { L 12 ($y0 + $k * $sp) 308 ($y0 + $k * $sp) '#9AA0A6' 2 }
  $cx = 92; $ny = $y0 + 2.5 * $sp
  if ($id -eq 'redonda') {
    A ('<ellipse cx="{0}" cy="{1}" rx="13" ry="8.5" fill="{2}"/>' -f $cx, (N $ny), $INK)
    A ('<ellipse cx="{0}" cy="{1}" rx="5.5" ry="7" transform="rotate(-55 {0} {1})" fill="#FFFFFF"/>' -f $cx, (N $ny))
  } else {
    A ('<ellipse cx="{0}" cy="{1}" rx="11" ry="7.6" transform="rotate(-20 {0} {1})" fill="{2}"/>' -f $cx, (N $ny), $INK)
    if ($id -eq 'blanca') { A ('<ellipse cx="{0}" cy="{1}" rx="7" ry="3.2" transform="rotate(-35 {0} {1})" fill="#FFFFFF"/>' -f $cx, (N $ny)) }
    $sx = $cx + 10; $tip = $ny - 3.5 * $sp - [Math]::Max(0, $nf - 2) * 12
    L $sx ($ny - 2) $sx $tip $INK 3
    for ($k = 0; $k -lt $nf; $k++) { Flag $sx ($tip + $k * 12) }
  }
  $rx = 226
  switch ($id) {
    'redonda' { Rc ($rx - 11) ($y0 + $sp) 22 9 $INK }
    'blanca' { Rc ($rx - 11) ($y0 + 2 * $sp - 9) 22 9 $INK }
    'negra' { QRest $rx $y0 $sp }
    default { FigRest $rx $y0 $sp $nf }
  }
  T $cx 164 'figura' 17 600 $GRAY 'middle' $FI
  T $rx 164 'silencio' 17 600 $GRAY 'middle' $FI
  Save ('fig_' + $id)
}

# ===== Los 8 grados: teclado (piano) y pentagrama (guitarra) =====
function GradosArc($xa, $xb, $yy) {
  P ('M{0} {1} Q{2} {3} {4} {1}' -f (N $xa), (N $yy), (N (($xa + $xb) / 2)), (N ($yy - 110)), (N $xb)) 'none' $GOLD 6 'stroke-dasharray="14 10" stroke-linecap="round"'
  Rc (($xa + $xb) / 2 - 330) ($yy - 92) 660 56 '#FFFFFF' $GOLD 3 28
  T (($xa + $xb) / 2) ($yy - 54) 'El 1 y el 8: la misma nota, una octava' 30 700 $GOLDT
}
$script:OUT = $P1
NewSvg 2400 1020 'Los 8 grados de la escala de DO en el teclado'
Head 'Los 8 grados de la escala de DO' 'Siete nombres de notas, ocho grados: la escala empieza y termina en DO'
$ww = 230; $x0 = 280; $ky = 400
$mk = @{}; foreach ($a in 7..14) { $mk[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a) } }
Kb $x0 $ky $ww 420 7 8 $mk -nameSize 40
GradosArc (Kx $x0 $ww 7 7) (Kx $x0 $ww 7 14) 300
foreach ($a in 7..14) { $gx = Kx $x0 $ww 7 $a; Num $gx 345 ($a - 6) 32; T $gx 880 $CIF[(NoteName $a)] 44 700 $INK 'middle' $FS }
T 150 360 'Grado' 30 700 $GOLDT 'end'; T 150 882 'Cifrado' 30 700 $GOLDT 'end'
T (Kx $x0 $ww 7 7) 960 '▼ DO grave' 34 700 $INK
T (Kx $x0 $ww 7 14) 960 'DO agudo ▲' 34 700 $INK
Save 'P1_grados'

$script:OUT = $GIMG
NewSvg 2400 900 'Los 8 grados de la escala de DO en el pentagrama'
Head 'Los 8 grados de la escala de DO' 'El grado 1 es DO grave; el grado 8 es DO agudo: la misma nota, una octava más arriba'
$sp = 34; $sy = 380
Staff 160 $sy 2120 $sp
$xs = @(); foreach ($a in 7..14) { $xs += 560 + ($a - 7) * 230 }
for ($i = 0; $i -lt 8; $i++) {
  $a = 7 + $i; $hx = $xs[$i]; $hy = NY $sy $sp $a
  Ledger $hx $sy $sp $a
  NHead $hx $hy $sp $a $true
  Num $hx 290 ($i + 1) 30
  Pill $hx 650 (NoteName $a) 50
  T $hx 730 $CIF[(NoteName $a)] 42 700 $INK 'middle' $FS
}
GradosArc $xs[0] $xs[7] 250
T 400 300 'Grado' 30 700 $GOLDT 'end'; T 400 732 'Cifrado' 30 700 $GOLDT 'end'
T $xs[0] 820 '▼ DO grave' 34 700 $INK
T $xs[7] 820 'DO agudo ▲' 34 700 $INK
Save 'G1_grados'

# ===== Los elementos de la música (común a todas las carreras) =====
NewSvg 2400 900 'Melodía, armonía y ritmo'
Head 'Los tres elementos de la música' 'Melodía, armonía y ritmo'
$panels = @(@(60, 'Melodía', 'notas una después de otra'), @(840, 'Armonía', 'notas al mismo tiempo'), @(1620, 'Ritmo', 'sonidos largos y cortos sobre el pulso'))
foreach ($pn in $panels) {
  Rc $pn[0] 170 720 680 $PAPER $INK 3 24
  T ($pn[0] + 360) 245 $pn[1] 52 700 $INK
  T ($pn[0] + 360) 300 $pn[2] 28 500 $GRAY 'middle' $FI
}
$sp = 26; $sy = 420
Staff 100 $sy 640 $sp
$mel = @(7, 8, 9, 10, 11)
for ($i = 0; $i -lt 5; $i++) { $a = $mel[$i]; $hx = 290 + $i * 100; Ledger $hx $sy $sp $a; NHead $hx (NY $sy $sp $a) $sp $a $false; Stem $hx (NY $sy $sp $a) $sp $a }
Arrow 260 700 700 700 $GOLD 6 22; T 480 770 '1 · 2 · 3 · 4 · 5' 34 700 $GOLDT
Staff 880 $sy 640 $sp
foreach ($a in @(7, 9, 11)) { Ledger 1200 $sy $sp $a; NHead 1200 (NY $sy $sp $a) $sp $a $true }
L 1290 (NY $sy $sp 11) 1290 (NY $sy $sp 7) $GOLD 6 'stroke-linecap="round"'
T 1200 770 'DO + MI + SOL = C' 34 700 $GOLDT
for ($i = 0; $i -lt 4; $i++) { $px = 1720 + $i * 150; P ('M{0} 470 c-18 -26 -54 -6 -30 22 l30 28 l30 -28 c24 -28 -12 -48 -30 -22 z' -f (N ($px + 30))) '#E5312B'; T ($px + 30) 545 "$($i + 1)" 30 700 $INK }
$rb = @(@(0, 2, 'taa-aa'), @(2, 1, 'ta'), @(3, 0.5, 'ti'), @(3.5, 0.5, 'ti'))
foreach ($r in $rb) { $bx = 1720 + $r[0] * 150 + 6; $bw = $r[1] * 150 - 12; Rc $bx 600 $bw 70 $GOLD $INK 3 14; T ($bx + $bw / 2) 720 $r[2] 30 700 $INK }
T 2010 800 'pulso ♥ · ritmo ▬' 28 600 $GRAY 'middle' $FI
Save 'AMA_elementos'

# ===== Piano · clase 8: el «Himno» en la posición de DO =====
$script:OUT = $P1
NewSvg 2400 1000 'Himno de la alegría: notas y dedos'
Head '«Himno de la alegría» en la posición de DO' 'Cinco notas, cinco dedos: cada dedo vive en su tecla'
$mk = @{}; for ($a = 7; $a -le 11; $a++) { $mk[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = ($a - 6) } }
Kb 300 260 300 360 6 7 $mk -nameSize 40 -fy 205
$rows = @(@('Frase 1', @(3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 3, 2, 2), 'pregunta: termina en RE'), @('Frase 2', @(3, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 3, 2, 1, 1), 'respuesta: termina en DO'))
$ry = 720
foreach ($rw in $rows) {
  T 90 ($ry + 12) $rw[0] 34 700 $INK 'start'
  for ($i = 0; $i -lt 15; $i++) { $fx = 330 + $i * 118 + [Math]::Floor($i / 4) * 40; $nm = $NAMES[$rw[1][$i] - 1]; C $fx $ry 38 $NC[$nm] $INK 2.5; T $fx ($ry + 13) "$($rw[1][$i])" 36 700 $NTX[$nm] }
  T 2340 ($ry + 70) $rw[2] 26 500 $GRAY 'end' $FI
  $ry += 170
}
Save 'P1_himno_dedos'

# ===== Piano · clase 9: cómo se construye la tríada =====
NewSvg 2400 1000 'Cómo se construye la tríada de DO mayor'
Head 'Construyo una tríada: tocar una, saltar una' 'DO (1) · salto RE · MI (3) · salto FA · SOL (5)'
$mk = @{ 7 = @{ fill = $NC.DO; lbl = 'DO'; fing = 1 }; 8 = @{ fill = '#EEEEEE'; lbl = 'salto' }; 9 = @{ fill = $NC.MI; lbl = 'MI'; fing = 3 }; 10 = @{ fill = '#EEEEEE'; lbl = 'salto' }; 11 = @{ fill = $NC.SOL; lbl = 'SOL'; fing = 5 } }
Kb 200 300 230 400 6 7 $mk -nameSize 34 -fy 240
foreach ($pr in @(@(7, 9), @(9, 11))) { $xa = Kx 200 230 6 $pr[0]; $xb = Kx 200 230 6 $pr[1]; P ('M{0} 760 Q{1} 860 {2} 760' -f (N $xa), (N (($xa + $xb) / 2)), (N $xb)) 'none' $GOLD 6 'stroke-linecap="round"'; Arrow ($xb - 30) 778 $xb 760 $GOLD 6 20 }
foreach ($g in @(@(7, '1'), @(9, '3'), @(11, '5'))) { Num (Kx 200 230 6 $g[0]) 900 $g[1] 34 }
T 2050 500 '1 + 3 + 5' 60 700 $INK; T 2050 600 '= C' 72 700 $GOLDT; T 2050 665 '(DO mayor)' 32 500 $GRAY 'middle' $FI
Save 'P1_construir_triada'

# ===== Piano · clase 12: cómo se lee un cifrado =====
NewSvg 2400 820 'Cómo se lee un cifrado'
Head 'Cómo se lee un cifrado (4/4)' 'La letra vale hasta que aparece otra · dos letras en un compás: 2 tiempos cada una'
$bars = @(@(, @('C', 4)), @(@('F', 2), @('C', 2)), @(@('F', 2), @('C', 2)), @(@('G', 2), @('C', 2)))
$CC = @{ C = $NC.DO; F = $NC.FA; G = $NC.SOL }
$bw = 540; $bx0 = 120
for ($b = 0; $b -lt 4; $b++) {
  $x = $bx0 + $b * $bw
  L $x 250 $x 560 $INK 5
  $t = 0
  foreach ($ch in $bars[$b]) {
    $cx0 = $x + 20 + $t * ($bw - 40) / 4; $cw = $ch[1] * ($bw - 40) / 4 - 12
    Rc $cx0 290 $cw 130 $CC[$ch[0]] $INK 3 18
    T ($cx0 + $cw / 2) 378 $ch[0] 70 700 $(if ($ch[0] -eq 'G') { $INK } else { '#FFFFFF' }) 'middle' $FS
    $t += $ch[1]
  }
  for ($k = 0; $k -lt 4; $k++) { $tx = $x + 20 + ($k + 0.5) * ($bw - 40) / 4; C $tx 480 20 $GOLD $INK 2; T $tx 490 "$($k + 1)" 26 700 $INK }
}
L ($bx0 + 4 * $bw) 250 ($bx0 + 4 * $bw) 560 $INK 5
T ($bx0 + 0.5 * $bw) 640 'C: 4 tiempos' 32 700 $GOLDT
T ($bx0 + 1.5 * $bw) 640 'F 2 + C 2' 32 700 $GOLDT
T 1200 740 'Miro el cifrado un compás antes de tocarlo.' 30 500 $GRAY 'middle' $FI
Save 'P1_leer_cifrado'

# ===== Piano · clase 15: las posiciones de cinco dedos =====
$script:OUT = $P2
NewSvg 2400 1500 'Posiciones de cinco dedos: DO, SOL, RE y LA'
Head 'Las posiciones de cinco dedos' 'T – T – S – T desde cada nota · mano derecha, dedos 1 a 5'
$POS = @(@('DO', 7, $null), @('SOL', 11, $null), @('RE', 8, 10), @('LA', 12, 14))
for ($p = 0; $p -lt 4; $p++) {
  $px = 80 + ($p % 2) * 1200; $py = 330 + [Math]::Floor($p / 2) * 600; $first = $POS[$p][1] - 1
  T ($px + 20) ($py - 100) ('Posición de ' + $POS[$p][0]) 40 700 $INK 'start'
  $mk = @{}; $bm = @{}; $fn = 1
  for ($a = $POS[$p][1]; $fn -le 5; $a++) {
    if ($POS[$p][2] -and $a -eq $POS[$p][2]) { $bm[$a] = @{ fill = $GOLD; lbl = @(($NAMES[$a % 7]), '♯'); fing = $fn }; $fn++; continue }
    $mk[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = $fn }; $fn++
  }
  Kb2 $px $py 135 330 $first 8 $mk $bm -nameSize 26 -fr 24
}
Save 'P2_posiciones_cinco'

# ===== Piano · clase 21: los acordes menores de Do mayor =====
NewSvg 2400 900 'Los acordes menores de Do mayor: Dm, Em y Am'
Head 'Los acordes menores de Do mayor' 'Tocar una, saltar una · dedos 1 – 3 – 5 · sonido más oscuro que el mayor'
$CH = @(@('Dm', 'ii · RE menor', 8), @('Em', 'iii · MI menor', 9), @('Am', 'vi · LA menor', 12))
for ($q = 0; $q -lt 3; $q++) {
  $kx = 70 + $q * 790; $root = $CH[$q][2]; $first = $root - 1
  T ($kx + 350) 260 $CH[$q][0] 64 700 $INK 'middle' $FS
  T ($kx + 350) 310 $CH[$q][1] 30 500 $GRAY 'middle' $FI
  $mk = @{}; $fs = @(1, 3, 5); $j = 0
  foreach ($a in @($root, ($root + 2), ($root + 4))) { $mk[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = $fs[$j] }; $j++ }
  Kb ($kx) 440 100 360 $first 7 $mk -nameSize 24 -fr 24 -fy 400
}
Save 'P2_acordes_menores'

# ===== Piano · clase 35: memorizar y manejar los nervios =====
$script:OUT = $P3
NewSvg 2400 1150 'Memorizar con inteligencia y la respiración 4-4-4'
Head 'Memorizo con inteligencia' 'Por secciones, con puntos de rescate y con mis tres memorias'
$secs = @(@('A', 'compases 1–4'), @('B', 'compases 5–8'), @('A', 'compases 9–12'))
for ($s = 0; $s -lt 3; $s++) {
  $sx = 120 + $s * 520; Rc $sx 220 470 150 $PAPER $INK 3 20; T ($sx + 235) 300 $secs[$s][0] 64 700 $INK 'middle' $FS; T ($sx + 235) 350 $secs[$s][1] 26 500 $GRAY 'middle' $FI
  P ('M{0} 214 l0 -44 l34 12 l-34 12' -f (N ($sx + 20))) $GOLD $INK 2
}
T 1760 280 '⚑ = punto de rescate' 34 700 $GOLDT 'start'; T 1760 330 'Si me pierdo, sigo desde ahí.' 28 500 $GRAY 'start' $FI
$mem = @(@('✋', 'Los dedos', 'lo que toco'), @('👁', 'Los ojos', 'cómo se ve el teclado'), @('👂', 'El oído', 'cómo suena'))
for ($m = 0; $m -lt 3; $m++) { $mx = 120 + $m * 520; C ($mx + 70) 520 60 $GOLD $INK 3; T ($mx + 70) 545 $mem[$m][0] 60 400; T ($mx + 150) 510 $mem[$m][1] 36 700 $INK 'start'; T ($mx + 150) 555 $mem[$m][2] 26 500 $GRAY 'start' $FI }
T 120 720 'Respiración 4-4-4 antes de sentarme' 40 700 $INK 'start'
$br = @(@('Inhalo', '1 2 3 4', '#2AA7E8'), @('Sostengo', '1 2 3 4', $GOLD), @('Suelto', '1 2 3 4', '#2E9E4F'))
for ($b = 0; $b -lt 3; $b++) { $bx = 120 + $b * 700; Rc $bx 770 620 170 $br[$b][2] $INK 3 85; T ($bx + 310) 845 $br[$b][0] 46 700 $INK; T ($bx + 310) 905 $br[$b][1] 34 600 $INK 'middle' $FI; if ($b -lt 2) { Arrow ($bx + 630) 855 ($bx + 690) 855 $INK 6 20 } }
T 1200 1060 'Si me equivoco, sigo: el público nota cuando nos detenemos, casi nunca el error.' 30 600 $GRAY 'middle' $FI
Save 'P3_memorizar'
'listo'
