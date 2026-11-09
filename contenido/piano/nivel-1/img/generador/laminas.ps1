param([string]$OUT)
. (Join-Path $PSScriptRoot 'lib.ps1')
$script:OUT = $OUT
New-Item -ItemType Directory -Force $OUT | Out-Null
function NoteMarks($list, [switch]$lbl) { $m = @{}; foreach ($p in $list) { $a = [int]$p[0]; $h = @{ fill = $NC[(NoteName $a)] }; if ($lbl) { $h.lbl = NoteName $a }; if ($p.Count -gt 1 -and $p[1]) { $h.fing = $p[1] }; $m[$a] = $h }; $m }

# 1 · Partes del piano ------------------------------------------------------
NewSvg 2400 1250 'Partes del piano y del teclado'
Head 'Partes del piano y del teclado' 'Piano vertical visto de frente'
Rc 170 200 1160 46 '#2A1E16' $INK 3 10
Rc 200 246 1100 314 '#4A3424' $INK 3
Rc 470 300 560 200 '#6B4C35' $INK 3 8
Rc 515 322 470 156 '#FFFFFF' $INK 2 4
for ($k = 0; $k -lt 5; $k++) { L 540 (350 + $k * 22) 960 (350 + $k * 22) $GRAY 2 }
foreach ($p in @(@(600, 405), @(680, 383), @(760, 372), @(840, 394), @(920, 416))) { C $p[0] $p[1] 10 $INK }
Rc 190 540 40 170 '#2A1E16' $INK 3 4
Rc 1270 540 40 170 '#2A1E16' $INK 3 4
Kb 230 560 (1040 / 22) 120 0 22 @{}
Rc 190 680 1120 30 '#2A1E16' $INK 3
Rc 200 710 1100 300 '#4A3424' $INK 3
Rc 260 750 980 220 'none' '#2A1E16' 4 10
Rc 200 1010 1100 30 '#2A1E16' $INK 3
foreach ($px in @(660, 735, 810)) { Rc $px 980 54 22 $GOLD $INK 2 6 }
L 120 1040 1380 1040 $GRAY 3
$parts = @(
  @(1, 'Tapa', 'cubre las cuerdas y los martillos', 1240, 223, 250),
  @(2, 'Atril', 'sostiene la partitura', 1030, 400, 400),
  @(3, 'Teclas blancas', 'las notas naturales: DO, RE, MI…', 1150, 665, 550),
  @(4, 'Teclas negras', 'en grupos de 2 y de 3', 1128, 595, 700),
  @(5, 'Mueble', 'dentro: cuerdas, martillos y apagadores', 1240, 880, 850),
  @(6, 'Pedales', 'el derecho sostiene el sonido', 837, 991, 1000)
)
foreach ($p in $parts) {
  L $p[3] $p[4] 1440 $p[5] $GRAY 2.5
  C $p[3] $p[4] 8 $GOLD $INK 2
  Num 1480 $p[5] $p[0] 30
  T 1530 ($p[5] + 4) $p[1] 40 700 $INK 'start'
  T 1530 ($p[5] + 46) $p[2] 30 500 $GRAY 'start' $FI
}
T 40 1150 'Pedal derecho = de resonancia: mantiene el sonido al soltar las teclas. En el Nivel 1 no se usa.' 30 500 $GRAY 'start' $FI
T 40 1200 'Piano digital: además tiene botón de encendido, volumen y entrada de audífonos.' 30 500 $GRAY 'start' $FI
Save 'P1_partes_piano'

# 2 · Grupos de teclas negras -----------------------------------------------
NewSvg 2400 830 'Las teclas negras van en grupos de 2 y de 3'
Head 'Las teclas negras van en grupos de 2 y de 3' 'Ese dibujo se repite en todo el teclado: es el mapa del piano.'
$m = @{}; foreach ($a in 0, 7, 14) { $m[$a] = @{ fill = $NC.DO; lbl = 'DO' } }; foreach ($a in 3, 10, 17) { $m[$a] = @{ fill = $NC.FA; lbl = 'FA' } }
$kx = 150; $ky = 290; $ww = 100
Kb $kx $ky $ww 380 0 21 $m -showNames -nameSize 34
for ($o = 0; $o -lt 3; $o++) {
  $b = $o * 7
  foreach ($g in @(@(1, 2, $GOLD, '2'), @(4, 6, $GRAY, '3'))) {
    $x1 = $kx + ($b + $g[0]) * $ww - 0.32 * $ww; $x2 = $kx + ($b + $g[1]) * $ww + 0.32 * $ww
    P ('M{0} 275 L{0} 250 L{1} 250 L{1} 275' -f (N $x1), (N $x2)) 'none' $g[2] 5
    C (($x1 + $x2) / 2) 215 26 $g[2]; T (($x1 + $x2) / 2) 227 $g[3] 32 700 '#FFFFFF'
  }
}
C 190 745 24 $GOLD; T 190 756 '2' 30 700 '#FFFFFF'; T 230 757 'Grupo de 2 negras: DO está justo a su izquierda' 34 600 $INK 'start'
C 1250 745 24 $GRAY; T 1250 756 '3' 30 700 '#FFFFFF'; T 1290 757 'Grupo de 3 negras: FA está justo a su izquierda' 34 600 $INK 'start'
Save 'P1_grupos_negras'

# 3 · Cualidades del sonido en el piano -------------------------------------
NewSvg 2400 900 'Las cuatro cualidades del sonido en el piano'
Head 'Las cuatro cualidades del sonido en el piano'
$cards = @(@('ALTURA', '¿Agudo o grave?'), @('DURACIÓN', '¿Largo o corto?'), @('INTENSIDAD', '¿Fuerte o suave?'), @('TIMBRE', '¿Quién suena?'))
for ($i = 0; $i -lt 4; $i++) { $x0 = 40 + $i * 590; Rc $x0 150 560 700 $PAPER $GOLD 3 24; T ($x0 + 280) 225 $cards[$i][0] 44 700; T ($x0 + 280) 270 $cards[$i][1] 32 500 $GRAY 'middle' $FI }
# Altura
$cx = 320
Kb ($cx - 245) 320 35 210 0 14 @{ 0 = @{ fill = '#9AA0A6' }; 13 = @{ fill = $GOLD } }
Arrow ($cx - 30) 590 ($cx - 240) 590 $INK 5; Arrow ($cx + 30) 590 ($cx + 240) 590 $INK 5
T ($cx - 240) 640 'grave' 32 700 $INK 'start'; T ($cx + 240) 640 'agudo' 32 700 $INK 'end'
T $cx 730 'Derecha = agudo' 34 600; T $cx 780 'Izquierda = grave' 34 600
# Duración
$cx = 910
T ($cx - 220) 370 'Largo' 34 700 $INK 'start'; Rc ($cx - 220) 390 440 50 $GOLD $INK 2 25
T $cx 480 'Dejo la tecla abajo' 30 500 $GRAY 'middle' $FI
T ($cx - 220) 570 'Corto' 34 700 $INK 'start'; for ($k = 0; $k -lt 4; $k++) { Rc ($cx - 220 + $k * 120) 590 50 50 $GOLD $INK 2 25 }
T $cx 680 'La suelto rápido' 30 500 $GRAY 'middle' $FI
# Intensidad
$cx = 1500
P ('M{0} 330 L{1} 330 L{1} 470 L{2} 470 L{3} 560 L{4} 470 L{5} 470 L{5} 330 Z' -f (N ($cx - 155)), (N ($cx - 155)), (N ($cx - 195)), (N ($cx - 120)), (N ($cx - 45)), (N ($cx - 85))) $INK
P ('M{0} 430 L{0} 500 L{1} 500 L{2} 560 L{3} 500 L{4} 500 L{4} 430 Z' -f (N ($cx + 105)), (N ($cx + 85)), (N ($cx + 120)), (N ($cx + 155)), (N ($cx + 135))) $GRAY
T ($cx - 120) 650 'f' 96 700 $INK 'middle' $FS 'font-style="italic"'; T ($cx + 120) 650 'p' 96 700 $GRAY 'middle' $FS 'font-style="italic"'
T $cx 730 'Más peso del brazo = fuerte' 32 600; T $cx 780 'Menos peso = suave' 32 600
# Timbre
$cx = 2090; $k = 0
foreach ($ins in 'Piano', 'Voz', 'Guitarra') { $yy = 320 + $k * 110; Rc ($cx - 210) $yy 420 80 '#FFFFFF' $INK 3 40; T ($cx - 180) ($yy + 52) $ins 36 700 $INK 'start'; Pill ($cx + 130) ($yy + 40) 'DO' 50; $k++ }
T $cx 730 'La misma nota DO…' 32 600; T $cx 780 '…con distinto «color»' 32 600
Save 'P1_cualidades_piano'

# 4 · Postura ----------------------------------------------------------------
NewSvg 2400 1200 'Postura AMA frente al piano'
Head 'Postura AMA frente al piano' 'Siete pasos, de los pies a las manos'
L 80 1080 1100 1080 $GRAY 4
Rc 160 760 300 34 '#2A1E16' $INK 2 6; Rc 180 794 26 286 '#2A1E16'; Rc 414 794 26 286 '#2A1E16'
$rc = 'stroke-linecap="round"'
L 340 750 540 760 $GRAY 52 $rc; L 540 760 545 1045 $GRAY 44 $rc; L 530 1062 625 1066 $INK 30 $rc
Rc 760 330 260 750 '#4A3424' $INK 3; Rc 740 310 300 30 '#2A1E16' $INK 3 6
Rc 640 600 140 40 '#FFFFFF' $INK 3 4; Rc 640 640 140 22 '#2A1E16' $INK 2
L 330 745 345 470 '#283593' 80 $rc
L 350 500 430 650 '#283593' 40 $rc
L 430 650 600 615 $SKIN 34 $rc
P 'M598 612 Q636 566 672 606' 'none' $SKIN 30 $rc
C 360 380 62 $SKIN $INK 3
Arrow 550 700 462 700 $GOLDT 3 14; Arrow 550 700 638 700 $GOLDT 3 14
L 430 590 760 590 $GOLDT 3 'stroke-dasharray="10 8"'
$calls = @(@(1, 550, 700), @(2, 390, 840), @(3, 660, 1020), @(4, 245, 600), @(5, 450, 560), @(6, 580, 560), @(7, 700, 540))
foreach ($c in $calls) { Num $c[1] $c[2] $c[0] 26 }
$steps = @(
  @('Banco frente al DO central', 'a una distancia en la que los brazos quedan un poco doblados'),
  @('En la mitad delantera del banco', 'sentado, sin apoyarse en el respaldo'),
  @('Pies planos en el suelo', 'si no llego, en un banquito'),
  @('Espalda recta, hombros relajados', 'sin rigidez; los hombros, abajo'),
  @('Antebrazos a la altura del teclado', 'si el banco no se ajusta, un cojín firme'),
  @('Muñeca recta', 'en línea con el antebrazo: ni caída ni levantada'),
  @('Mano redonda', 'como si sostuviera una burbuja; toco con la yema')
)
for ($i = 0; $i -lt 7; $i++) { $yy = 250 + $i * 125; Num 1200 $yy ($i + 1) 30; T 1250 ($yy + 4) $steps[$i][0] 38 700 $INK 'start'; T 1250 ($yy + 46) $steps[$i][1] 30 500 $GRAY 'start' $FI }
Save 'P1_postura'

# 5 · Dedos -------------------------------------------------------------------
NewSvg 2400 1050 'Los dedos en el piano'
Head 'Los dedos en el piano' 'Las dos manos usan los mismos números'
T 600 250 'Mano izquierda' 44 700; T 1800 250 'Mano derecha' 44 700
function Hand($fingers, $palmX, $thumbX, $rot, $tnx) {
  foreach ($f in $fingers) { Rc $f[1] $f[2] 60 (700 - $f[2]) $SKIN $INK 5 30 }
  Rc $palmX 620 300 290 $SKIN $INK 5 80
  $tcx = $thumbX + 34
  Rc $thumbX 630 68 190 $SKIN $INK 5 34 ('transform="rotate({0} {1} 750)"' -f $rot, (N $tcx))
  Rc ($palmX + 10) 625 280 60 $SKIN
  foreach ($f in $fingers) { Fing ($f[1] + 30) ($f[2] - 40) $f[0] 38 }
  Fing $tnx 600 1 38
}
Hand @(@(5, 465, 470), @(4, 535, 415), @(3, 605, 400), @(2, 675, 445)) 450 741 35 880
Hand @(@(2, 1665, 445), @(3, 1735, 400), @(4, 1805, 415), @(5, 1875, 470)) 1650 1591 -35 1520
T 1200 990 '1 pulgar · 2 índice · 3 medio · 4 anular · 5 meñique' 40 700
Save 'P1_dedos'

# 6 · Teclas blancas -----------------------------------------------------------
NewSvg 2400 800 'Las teclas blancas: las 7 notas con su color'
Head 'Las teclas blancas: las 7 notas con su color' 'DO está justo a la izquierda del grupo de 2 teclas negras'
$m = NoteMarks @(@(7), @(8), @(9), @(10), @(11), @(12), @(13), @(14)) -lbl
Kb 240 190 240 400 7 8 $m -nameSize 52
for ($a = 7; $a -le 14; $a++) { T (Kx 240 240 7 $a) 650 $CIF[(NoteName $a)] 40 700 $GRAY }
P ('M{0} 672 L{1} 692 L{2} 692 Z' -f (N 360), (N 346), (N 374)) $GOLDT
T 360 725 'DO central' 30 700 $GOLDT
T 1320 770 'Después de SI vuelve DO: la serie se repite en todo el teclado.' 32 500 $GRAY 'middle' $FI
Save 'P1_teclas_blancas'

# 7 · Octavas ------------------------------------------------------------------
NewSvg 2400 780 'La octava: el mismo nombre, más agudo'
Head 'La octava: el mismo nombre, más agudo' 'Todos los DO tienen el mismo color; el número dice cuál es'
$m = @{}; foreach ($a in 0, 7, 14, 21) { $m[$a] = @{ fill = $NC.DO; lbl = 'DO' } }
Kb 144 280 96 300 0 22 $m -showNames -nameSize 28
for ($k = 0; $k -lt 3; $k++) {
  $x1 = Kx 144 96 0 ($k * 7); $x2 = Kx 144 96 0 ($k * 7 + 7)
  P ('M{0} 268 L{0} 240 L{1} 240 L{1} 268' -f (N ($x1 + 8)), (N ($x2 - 8))) 'none' $GOLD 5
  T (($x1 + $x2) / 2) 222 '1 octava' 32 700 $GOLDT
}
$lab = @('DO3', 'DO4', 'DO5', 'DO6'); for ($k = 0; $k -lt 4; $k++) { T (Kx 144 96 0 ($k * 7)) 625 $lab[$k] 34 700 $GOLDT }
T (Kx 144 96 0 7) 662 'DO central' 28 600 $GRAY 'middle' $FI
Arrow 1000 735 760 735 $GRAY 4 16; Arrow 1400 735 1640 735 $GRAY 4 16
T 1200 746 'izquierda · derecha' 32 600 $GRAY; T 740 746 'grave' 32 700 $INK 'end'; T 1660 746 'agudo' 32 700 $INK 'start'
Save 'P1_octavas'

# 8 · El DO central en el pentagrama ---------------------------------------
NewSvg 2400 860 'El DO central en el pentagrama'
Head 'El DO central en el pentagrama' 'Desde DO, cada nota sube un paso'
$sp = 50; $y = 240; Staff 150 $y 2100 $sp; $yb = $y + 4 * $sp
$desc = @('línea adicional', 'debajo de la 1.ª línea', '1.ª línea', '1.er espacio', '2.ª línea')
for ($k = 0; $k -lt 5; $k++) {
  $a = 7 + $k; $cx = 700 + $k * 330; $ny = NY $y $sp $a
  Ledger $cx $y $sp $a; NHead $cx $ny $sp $a $false; Stem $cx $ny $sp $a
  Pill $cx ($yb + 2.3 * $sp) (NoteName $a) 56
  T $cx ($yb + 4.4 * $sp) "$($k + 1)" 44 700 $GOLDT
  T $cx ($yb + 5.5 * $sp) $desc[$k] 30 500 $GRAY 'middle' $FI
}
T 150 ($yb + 4.4 * $sp) 'dedo (mano derecha)' 30 700 $GOLDT 'start'
T 1200 820 'La clave de sol nace en la 2.ª línea: ahí vive SOL.' 32 600 $INK
Save 'P1_pentagrama_do_central'

# 9 · Posición de DO -------------------------------------------------------
NewSvg 2400 840 'Posición de DO: un dedo para cada tecla'
Head 'Posición de DO: un dedo para cada tecla' 'Las dos manos en posición de DO; la izquierda, una octava más abajo'
$m = NoteMarks @(@(0, 5), @(1, 4), @(2, 3), @(3, 2), @(4, 1), @(7, 1), @(8, 2), @(9, 3), @(10, 4), @(11, 5)) -lbl
Kb 150 330 140 360 0 15 $m -nameSize 38
T (Kx 150 140 0 2) 240 'Mano izquierda' 40 700; T (Kx 150 140 0 9) 240 'Mano derecha' 40 700
$dx = Kx 150 140 0 7
P ('M{0} 712 L{1} 734 L{2} 734 Z' -f (N $dx), (N ($dx - 16)), (N ($dx + 16))) $GOLDT
T $dx 768 'DO central' 32 700 $GOLDT
T 1200 820 'En la mano derecha los números suben con las notas; en la izquierda, bajan.' 32 500 $GRAY 'middle' $FI
Save 'P1_posicion_do'

# 10 · Taller práctico #1: DO-RE-MI ---------------------------------------
NewSvg 2400 560 'Taller práctico 1: DO-RE-MI con la mano derecha'
$f = { param($a) $a - 6 }
$bars = @(@((Q 7 1), (Q 8 2), (Q 9 3), (Q 8 2)), @((Q 7 1), (Q 8 2), (Q 9 3), (Q 9 3)), @((Q 8 2), (Q 7 1), (Q 8 2), (Q 7 1)))
Music 60 110 2280 42 4 4 4 $bars @{ pills = $true; fing = $true; fingLabel = 'dedo' }
Save 'P1_do_re_mi'

# 11 · Ejercicio de cinco dedos -------------------------------------------
NewSvg 2400 700 'Ejercicio de cinco dedos'
$bars = @(@((Q 7 1), (Q 8 2), (Q 9 3), (Q 10 4)), @((Q 11 5), (Q 10 4), (Q 9 3), (Q 8 2)), @(, (Wn 7 1)))
Music 60 110 2280 42 4 4 4 $bars @{ pills = $true; fing = $true; fingLabel = 'mano der.' }
foreach ($v in $script:EVS) { T $v.cx ($script:ROW + 0.3 * 42) "$(6 - $v.e.f)" (0.85 * 42) 700 $GRAY }
T 60 ($script:ROW + 0.3 * 42) 'mano izq.' (0.62 * 42) 700 $GRAY 'start'
Save 'P1_cinco_dedos'

# 12 · Lectura con silencios ----------------------------------------------
NewSvg 2400 640 'Lectura con silencios en 4/4'
$sh = @{ t = 'qr'; s = 'sh' }
$bars = @(@((Q 7 1), (Q 9 3), (Q 11 5), $sh), @((Q 11 5), (Q 10 4), (Q 9 3), $sh), @((Q 8 2), (Q 8 2), (Q 9 3), $sh), @((Hn 7 1), @{ t = 'hr'; s = 'sh' }))
Music 60 110 2280 42 4 4 4 $bars @{ pills = $true; fing = $true; syl = $true; fingLabel = 'dedo' }
Save 'P1_lectura_silencios'

# 13 · Vals en 3/4 ---------------------------------------------------------
NewSvg 2400 660 'Vals en 3/4'
$bars = @(@((Q 7 1), (Q 9 3), (Q 9 3)), @((Q 8 2), (Q 10 4), (Q 10 4)), @((Q 9 3), (Q 11 5), (Q 11 5)), @((Hn 7 1), @{ t = 'qr'; s = 'sh' }))
Music 60 110 2280 42 3 3 4 $bars @{ pills = $true; fing = $true; fingLabel = 'mano der.' }
$seen = @{}
foreach ($v in $script:EVS) { if (-not $seen.ContainsKey($v.bar)) { $seen[$v.bar] = 1; Pill $v.cx ($script:ROW + 0.1 * 42) 'DO' 44 } }
T 60 ($script:ROW + 0.25 * 42) 'mano izq.' (0.62 * 42) 700 $GRAY 'start'
T 1200 ($script:ROW + 1.9 * 42) 'La mano izquierda toca DO en el tiempo 1 de cada compás: UN-dos-tres.' 30 500 $GRAY 'middle' $FI
Save 'P1_vals'

# 14 · Corcheas -------------------------------------------------------------
NewSvg 2400 720 'Corcheas en posición de DO'
$bars = @(
  @((En 7 1 1 '1'), (En 8 2 1 'y'), (En 9 3 2 '2'), (En 10 4 2 'y'), @{ a = 11; t = 'q'; f = 5; s = 'ta'; c = '3' }, @{ a = 11; t = 'q'; f = 5; s = 'ta'; c = '4' }),
  @((En 10 4 3 '1'), (En 9 3 3 'y'), (En 8 2 4 '2'), (En 9 3 4 'y'), @{ a = 7; t = 'h'; f = 1; s = 'taa-aa'; c = '3' })
)
Music 60 130 2280 44 4 4 4 $bars @{ pills = $true; fing = $true; syl = $true; cnt = $true; fingLabel = 'dedo' }
Save 'P1_corcheas'

# 15 · Himno de la alegría ---------------------------------------------------
NewSvg 2400 1200 'Himno de la alegría (versión piano, posición de DO)'
$sp = 40
$s1 = @(@((Q 9 3), (Q 9 3), (Q 10 4), (Q 11 5)), @((Q 11 5), (Q 10 4), (Q 9 3), (Q 8 2)), @((Q 7 1), (Q 7 1), (Q 8 2), (Q 9 3)), @((Q 9 3), (Q 8 2), (Hn 8 2)))
$s2 = @(@((Q 9 3), (Q 9 3), (Q 10 4), (Q 11 5)), @((Q 11 5), (Q 10 4), (Q 9 3), (Q 8 2)), @((Q 7 1), (Q 7 1), (Q 8 2), (Q 9 3)), @((Q 8 2), (Q 7 1), (Hn 7 1)))
$mi = @(@('DO', 'SOL', 'DO', 'SOL'), @('DO', 'SOL', 'DO', 'DO'))
$sys = @(@(150, $s1, 'Frase 1'), @(690, $s2, 'Frase 2'))
for ($k = 0; $k -lt 2; $k++) {
  $yy = $sys[$k][0]
  T 60 ($yy - 85) $sys[$k][2] 34 700 $GOLDT 'start'
  Music 60 $yy 2280 $sp 4 4 4 $sys[$k][1] @{ pills = $true; fing = $true; fingLabel = 'dedo' }
  $seen = @{}
  foreach ($v in $script:EVS) { if (-not $seen.ContainsKey($v.bar)) { $seen[$v.bar] = 1; Pill $v.cx ($script:ROW + 0.1 * $sp) $mi[$k][$v.bar] 42 } }
  T 60 ($script:ROW + 0.25 * $sp) 'mano izq. (redonda)' (0.62 * $sp) 700 $GRAY 'start'
}
Save 'P1_himno_alegria'

# 16 · Acorde de DO mayor ----------------------------------------------------
NewSvg 2400 820 'Acorde de DO mayor (C)'
Head 'Acorde de DO mayor (C)' 'Tres notas al mismo tiempo: tecla sí, tecla no, tecla sí'
$m = NoteMarks @(@(7, 1), @(9, 3), @(11, 5)) -lbl
Kb 100 300 130 380 7 8 $m -nameSize 40
$yn = @('sí', 'no', 'sí', 'no', 'sí'); $cl = @($GOLDT, $GRAY, $GOLDT, $GRAY, $GOLDT)
for ($k = 0; $k -lt 5; $k++) { T (Kx 100 130 7 (7 + $k)) 730 $yn[$k] 34 700 $cl[$k] }
$sp = 50; $y = 330; Staff 1300 $y 900 $sp
foreach ($a in 7, 9, 11) { $ny = NY $y $sp $a; Ledger 1700 $y $sp $a; NHead 1700 $ny $sp $a $true; Pill 1860 $ny (NoteName $a) 44 }
T 1750 650 'Mano derecha: 1 – 3 – 5 · Mano izquierda: 5 – 3 – 1' 32 700
T 1750 700 'DO, la nota de abajo, es la fundamental: le da nombre al acorde.' 28 500 $GRAY 'middle' $FI
Save 'P1_acorde_C'

# 17 · Tono y semitono -------------------------------------------------------
NewSvg 2400 780 'Tono y semitono en el teclado'
Head 'Tono y semitono en el teclado' 'Entre MI–FA y SI–DO no hay tecla negra en medio: son semitonos'
$m = @{}; foreach ($a in 9, 10, 13, 14) { $m[$a] = @{ fill = '#FBF1D3' } }
Kb 280 350 230 330 7 8 $m -showNames -nameSize 44
for ($i = 0; $i -lt 7; $i++) {
  $a = 7 + $i; $x1 = Kx 280 230 7 $a; $x2 = Kx 280 230 7 ($a + 1); $mid = ($x1 + $x2) / 2
  $isS = (($a % 7) -eq 2) -or (($a % 7) -eq 6)
  $col = $GRAY; $lab = 'T'; if ($isS) { $col = $GOLD; $lab = 'S' }
  P ('M{0} 335 Q{1} 250 {2} 335' -f (N ($x1 + 20)), (N $mid), (N ($x2 - 20))) 'none' $col 5 'stroke-linecap="round"'
  C $mid 262 30 $col; T $mid 276 $lab 38 700 '#FFFFFF'
}
T 1200 740 'S = semitono: la tecla vecina, sin ninguna en medio  ·  T = tono: dos semitonos (hay una tecla negra en medio)' 30 500 $GRAY 'middle' $FI
Save 'P1_tono_semitono'

# 18 · Tríadas C, F y G ------------------------------------------------------
NewSvg 2400 760 'Tríadas mayores: C, F y G'
Head 'Tríadas mayores con notas naturales' 'Mano derecha · dedos 1 – 3 – 5 · tecla sí, tecla no'
$ch = @(@(7, 'C · DO mayor'), @(10, 'F · FA mayor'), @(11, 'G · SOL mayor'))
for ($i = 0; $i -lt 3; $i++) {
  $px = 70 + $i * 780; $r = $ch[$i][0]
  $m = NoteMarks @(@($r, 1), @(($r + 2), 3), @(($r + 4), 5)) -lbl
  T ($px + 324) 220 $ch[$i][1] 44 700
  Kb $px 310 72 300 7 9 $m -nameSize 24
  T ($px + 324) 680 ('{0} – {1} – {2}' -f (NoteName $r), (NoteName ($r + 2)), (NoteName ($r + 4))) 38 700 $GRAY
}
Save 'P1_triadas_CFG'

# 19 · Escala de Do con el paso del pulgar -----------------------------------
NewSvg 2400 1160 'Escala de Do mayor con la mano derecha'
Head 'Escala de Do mayor · mano derecha' 'El paso del pulgar: después de MI, el 1 pasa por debajo hasta FA'
$m = NoteMarks @(@(7, 1), @(8, 2), @(9, 3), @(10, 1), @(11, 2), @(12, 3), @(13, 4), @(14, 5)) -lbl
Kb 280 280 230 300 7 8 $m -nameSize 40
$xa = Kx 280 230 7 9; $xb = Kx 280 230 7 10
P ('M{0} 600 Q{1} 680 {2} 600' -f (N ($xa - 60)), (N (($xa + $xb) / 2)), (N ($xb - 10))) 'none' $GOLDT 5 'stroke-linecap="round"'
Arrow ($xb - 40) 625 ($xb - 8) 602 $GOLDT 5 18
T (($xa + $xb) / 2) 712 'paso del pulgar' 32 700 $GOLDT
$bars = @(@((Q 7 1), (Q 8 2), (Q 9 3), (Q 10 1)), @((Q 11 2), (Q 12 3), (Q 13 4), (Q 14 5)), @((Q 14 5), (Q 13 4), (Q 12 3), (Q 11 2)), @((Q 10 1), (Q 9 3), (Q 8 2), (Q 7 1)))
T 60 790 'Subo' 32 700 $GOLDT 'start'; T 1330 790 'Bajo' 32 700 $GOLDT 'start'
Music 60 860 2280 38 4 4 4 $bars @{ pills = $true; fing = $true; fingLabel = 'dedo' }
Save 'P1_escala_do_md'

# 20 · Acompañamiento C–F–G–C y patrones ------------------------------------
NewSvg 2400 1540 'Mi primer acompañamiento: C – F – G – C'
Head 'Mi primer acompañamiento: C – F – G – C' 'Mano izquierda: el bajo · mano derecha: el acorde'
$pan = @(
  @('C', 'DO mayor', 0, 5, 7, 'DO', 'DO – MI – SOL'),
  @('F', 'FA mayor', 3, 2, 10, 'FA', 'FA – LA – DO'),
  @('G', 'SOL mayor', 4, 1, 11, 'SOL', 'SOL – SI – RE'),
  @('C', 'DO mayor', 0, 5, 7, 'DO', 'DO – MI – SOL')
)
for ($i = 0; $i -lt 4; $i++) {
  $p = $pan[$i]; $px = 40 + ($i % 2) * 1180; $py = 165 + [Math]::Floor($i / 2) * 470
  Rc $px $py 1140 440 $PAPER $GOLD 3 22
  T ($px + 40) ($py + 72) $p[0] 64 700 $INK 'start'
  T ($px + 120) ($py + 70) ('{0} · 4 tiempos' -f $p[1]) 32 500 $GRAY 'start' $FI
  Num ($px + 1090) ($py + 52) ($i + 1) 28
  $r = $p[4]
  $m = NoteMarks @(@($p[2], $p[3]), @($r, 1), @(($r + 2), 3), @(($r + 4), 5))
  Kb ($px + 30) ($py + 160) 67.5 200 0 16 $m -fr 24
  T ($px + 40) ($py + 410) ('Mano izquierda: {0} (dedo {1})' -f $p[5], $p[3]) 32 700 $INK 'start'
  T ($px + 1100) ($py + 410) ('Mano derecha: {0}' -f $p[6]) 32 700 $INK 'end'
}
$rows = @(
  @('Patrón 1 · Bloque (4/4)', @(,@(0, 4, 'Las dos manos juntas: 1 golpe, 4 tiempos'))),
  @('Patrón 2 · Bajo y acorde (4/4)', @(@(0, 2, 'Tiempos 1-2 · Mano izquierda: DO (blanca)'), @(2, 4, 'Tiempos 3-4 · Mano derecha: DO-MI-SOL (blanca)'))),
  @('Patrón 3 · Vals (3/4)', @(@(0, 1, '1 · Mano izq.: DO'), @(1, 2, '2 · Mano der.: acorde'), @(2, 3, '3 · Mano der.: acorde')))
)
T 40 1145 'Patrones de acompañamiento' 40 700 $INK 'start'
for ($k = 0; $k -lt 3; $k++) {
  $yy = 1180 + $k * 115; $beats = 4; if ($k -eq 2) { $beats = 3 }
  T 40 ($yy + 58) $rows[$k][0] 32 700 $INK 'start'
  $bw = 1660 / $beats
  foreach ($bx in $rows[$k][1]) {
    $fill = '#FBF1D3'; if ($bx[2] -like '*izq*') { $fill = '#F9D9D7' }
    Rc (700 + $bx[0] * $bw + 6) $yy (($bx[1] - $bx[0]) * $bw - 12) 90 $fill $GOLD 2.5 16
    T (700 + ($bx[0] + $bx[1]) / 2 * $bw) ($yy + 56) $bx[2] 28 600 $INK 'middle' $FI
  }
}
Save 'P1_acompanamiento'
"parte 3 ok"
