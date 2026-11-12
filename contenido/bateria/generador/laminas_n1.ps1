# Láminas del Nivel 1 de batería (clases 1–12). Uso:
#   powershell -File contenido/bateria/generador/laminas_n1.ps1
. (Join-Path $PSScriptRoot 'lib_bat.ps1')
$script:OUT = Join-Path $PSScriptRoot '..\nivel-1\img'
New-Item -ItemType Directory -Force $script:OUT | Out-Null
$rc = 'stroke-linecap="round"'
$C8 = @('1', 'y', '2', 'y', '3', 'y', '4', 'y')

# 1 · Los tres sonidos básicos -----------------------------------------------------
NewSvg 2400 1000 'Los tres sonidos básicos de la batería'
Head 'Los tres sonidos básicos de la batería' 'Grave, medio y agudo, igual que las notas'
Kit 60 230 1.3 @{ crash = @{ fill = '#F2C94C' }; caja = @{ fill = '#BFD7F5' }; bombo = @{ fill = '#C8E8D2' } }
$snd = @(@('Platillo', 'agudo y largo: sigue sonando', 'baqueta', '#F2C94C', 'agudo'), @('Redoblante', 'medio y seco, como una palmada', 'baqueta', '#BFD7F5', 'medio'), @('Bombo', 'grave, como un latido', 'pie derecho', '#C8E8D2', 'grave'))
Arrow 1330 860 1330 300 $GOLDT 6 22; T 1330 270 'agudo' 30 700 $GOLDT; T 1330 905 'grave' 30 700 $GOLDT
for ($i = 0; $i -lt 3; $i++) { $yy = 330 + $i * 210; Rc 1400 ($yy - 70) 900 160 $snd[$i][3] $INK 2.5 24; T 1440 ($yy - 4) $snd[$i][0] 46 700 $INK 'start'; T 1440 ($yy + 46) $snd[$i][1] 30 500 $INK 'start' $FI; T 2270 ($yy - 4) $snd[$i][2] 28 600 $GRAY 'end' $FI }
Save 'B1_sonidos'

# 2 · Las 10 partes ----------------------------------------------------------------
NewSvg 2400 1250 'Las 10 partes de la batería'
Head 'Las 10 partes de la batería' 'Cada parte tiene un trabajo'
$sc = 1.75; $kx0 = 70; $ky0 = 230
Kit $kx0 $ky0 $sc @{} -banco
$PARTS = @(@('bombo', 'Bombo', 0, 75), @('pedalB', 'Pedal del bombo', 0, 55), @('caja', 'Redoblante', -40, -30), @('hihat', 'Hi-hat', 0, -40), @('tom1', 'Tom 1', 0, -40), @('tom2', 'Tom 2', 0, -40), @('piso', 'Tom de piso', 0, -40), @('crash', 'Crash', 0, -40), @('ride', 'Ride', 0, -40), @('banco', 'Banco', 0, -55))
for ($i = 0; $i -lt 10; $i++) { $pp = $PARTS[$i]; Num ((KX $kx0 $sc $pp[0]) + $pp[2]) ((KY $ky0 $sc $pp[0]) + $pp[3]) ($i + 1) 30 }
for ($i = 0; $i -lt 10; $i++) { $yy = 240 + $i * 92; Num 1735 $yy ($i + 1) 28; T 1785 ($yy + 12) $PARTS[$i][1] 38 700 $INK 'start' }
Save 'B1_partes'

# 3 · Postura en 7 pasos (vista de lado) -------------------------------------------
NewSvg 2400 1200 'Postura en la batería en 7 pasos'
Head 'Postura en la batería en 7 pasos' 'Sentado, relajado y con todo al alcance'
L 60 1085 1180 1085 $GRAY 4
# banco
Rc 250 700 300 42 '#4A4F5C' $INK 2 14; Rc 385 742 30 330 '#4A4F5C'; Rc 300 1062 200 24 '#4A4F5C' $INK 2 8
# bombo de lado y pedal
Rc 860 760 300 320 $SHELL $INK 3 14; L 860 760 860 1080 '#9AA0A6' 10; L 1160 760 1160 1080 '#9AA0A6' 10
Rc 690 1058 170 20 '#6B7280' $INK 2 6; L 860 1050 820 930 '#9AA0A6' 8 $rc; C 820 925 16 '#E8E3D6' $INK 2
# redoblante
L 760 800 760 1080 '#9AA0A6' 6; Rc 640 735 240 50 $SHELL $INK 2 8; Rc 640 727 240 12 $DRUMHEAD $INK 2 4
# cuerpo
Rc 330 390 190 330 '#283593' $INK 3 60
L 470 705 700 735 $GRAY 90 $rc
L 700 735 720 1030 $GRAY 70 $rc
Rc 670 1035 140 34 $INK $INK 2 14
C 430 300 72 $SKIN $INK 3
# brazo y baqueta
L 450 440 520 620 '#283593' 44 $rc
L 520 620 660 690 $SKIN 32 $rc
C 668 694 22 $SKIN $INK 3
L 650 700 880 735 '#B08850' 10 $rc
$calls = @(@(1, 470, 805), @(2, 300, 800), @(3, 290, 520), @(4, 790, 1150), @(5, 930, 690), @(6, 590, 545), @(7, 1010, 640))
foreach ($c0 in $calls) { Num $c0[1] $c0[2] $c0[0] 28 }
$steps = @(
  @('Muslos casi paralelos al suelo', 'rodillas un poco más bajas que la cadera'),
  @('En la mitad delantera del banco', 'sin apoyarme atrás'),
  @('Espalda recta y hombros sueltos', 'sin encorvarme sobre la batería'),
  @('Pie derecho en el bombo, pie izquierdo en el hi-hat', 'los dos pies sobre sus pedales'),
  @('El redoblante entre las rodillas', 'un poco arriba de las piernas, plano'),
  @('Brazos relajados', 'codos cerca del cuerpo'),
  @('Todo al alcance de la mano', 'no me estiro para llegar a un tom o un platillo')
)
for ($i = 0; $i -lt 7; $i++) { $yy = 250 + $i * 125; Num 1290 $yy ($i + 1) 30; T 1340 ($yy + 4) $steps[$i][0] 38 700 $INK 'start'; T 1340 ($yy + 46) $steps[$i][1] 30 500 $GRAY 'start' $FI }
Save 'B1_postura'

# 4 · Agarre paralelo ---------------------------------------------------------------
NewSvg 2400 1000 'El agarre paralelo de las baquetas'
Head 'Así tomo las baquetas: agarre paralelo' 'Las dos manos igual, palma hacia abajo, sin apretar'
# baqueta
Rc 160 430 1000 30 '#C9A06A' $INK 2.5 15
A '<ellipse cx="1172" cy="445" rx="26" ry="20" fill="#C9A06A" stroke="#1A1A1A" stroke-width="2.5"/>'
L 493 405 493 485 $GOLD 6; L 493 545 493 575 $GOLD 4; T 560 610 'punto de apoyo' 30 700 $GOLDT 'start'
P 'M160 380 Q326 350 493 380' 'none' $GRAY 3; T 326 360 '1/3' 30 700 $GRAY
P 'M493 380 Q830 340 1172 380' 'none' $GRAY 3; T 830 350 '2/3' 30 700 $GRAY
# mano estilizada
A '<ellipse cx="430" cy="455" rx="120" ry="80" fill="#F2D3B3" stroke="#1A1A1A" stroke-width="3" opacity=".9"/>'
Rc 440 410 120 30 $SKIN $INK 3 15; T 590 405 'pulgar' 26 600 $GRAY 'start' $FI
for ($k = 0; $k -lt 3; $k++) { Rc (350 + $k * 50) 470 44 70 $SKIN $INK 2.5 20 }
Rc 500 455 60 40 $SKIN $INK 2.5 18; T 560 650 '(entre el pulgar y el índice)' 24 500 $GRAY 'start' $FI
$tips = @('El punto de apoyo: entre el pulgar y el índice', 'Los otros dedos rodean la baqueta sin apretar', 'La baqueta debe poder rebotar')
for ($k = 0; $k -lt 3; $k++) { T 160 (730 + $k * 60) ('• ' + $tips[$k]) 32 600 $INK 'start' $FI }
# vista de arriba: la V
C 1800 520 230 $DRUMHEAD $SHELL 6; T 1800 470 'redoblante' 30 600 $GRAY 'middle' $FI
L 1540 900 1730 560 '#C9A06A' 22 $rc; L 2060 900 1870 560 '#C9A06A' 22 $rc
Chip 1540 900 'I' 36; Chip 2060 900 'D' 36
T 1800 640 'V' 70 700 $GOLDT
Save 'B1_agarre'

# 5 · Las cuatro extremidades -------------------------------------------------------
NewSvg 2400 1100 'Las cuatro extremidades y sus colores'
Head 'Mis cuatro extremidades' 'Cada una con su letra y su color AMA'
$sc = 1.5; $kx0 = 70; $ky0 = 260
Kit $kx0 $ky0 $sc @{ hihat = @{ fill = '#F4A7A3' }; ride = @{ fill = '#F4A7A3' }; crash = @{ fill = '#F4A7A3' }; caja = @{ fill = '#A9C8F0' }; bombo = @{ fill = '#A8DDB8' }; pedalB = @{ fill = $PDC }; pedalH = @{ fill = $PIC } }
Chip (KX $kx0 $sc 'crash') ((KY $ky0 $sc 'crash') + 75) 'D' 30; Chip (KX $kx0 $sc 'ride') ((KY $ky0 $sc 'ride') + 80) 'D' 30; Chip (KX $kx0 $sc 'hihat') ((KY $ky0 $sc 'hihat') - 30) 'D' 30
Chip (KX $kx0 $sc 'caja') ((KY $ky0 $sc 'caja') + 50) 'I' 30; Chip (KX $kx0 $sc 'bombo') ((KY $ky0 $sc 'bombo') + 75) 'PD' 32; Chip ((KX $kx0 $sc 'pedalH') + 70) ((KY $ky0 $sc 'pedalH') - 20) 'PI' 32
$LG = @(@('D', 'Mano derecha', 'hi-hat, ride y crash'), @('I', 'Mano izquierda', 'redoblante'), @('PD', 'Pie derecho', 'bombo'), @('PI', 'Pie izquierdo', 'pedal del hi-hat'))
for ($i = 0; $i -lt 4; $i++) { $yy = 330 + $i * 170; Chip 1520 $yy $LG[$i][0] 50; T 1600 ($yy - 6) $LG[$i][1] 42 700 $INK 'start'; T 1600 ($yy + 42) $LG[$i][2] 30 500 $GRAY 'start' $FI }
Save 'B1_extremidades'

# 6 · Del agudo al grave -------------------------------------------------------------
NewSvg 2400 820 'Los tambores del agudo al grave'
Head 'Del agudo al grave' 'Cuanto más grande el tambor, más grave su sonido'
$DR = @(@('Tom 1', 120, 90), @('Tom 2', 150, 110), @('Tom de piso', 190, 200), @('Bombo', 200, 0))
$xx = 220
for ($i = 0; $i -lt 4; $i++) { $w = $DR[$i][1] * 1.6; $h = $DR[$i][2]; $cx = $xx + $w / 2
  if ($i -lt 3) { Rc $xx (640 - $h) $w $h $SHELL $INK 2 10; A ('<ellipse cx="{0}" cy="{1}" rx="{2}" ry="{3}" fill="{4}" stroke="{5}" stroke-width="3"/>' -f (N $cx), (640 - $h), (N ($w / 2)), (N ($w * 0.14)), $DRUMHEAD, $SHELL) }
  else { C $cx (640 - $w / 2) ($w / 2) $SHELL $INK 2; C $cx (640 - $w / 2) ($w / 2 - 18) $DRUMHEAD $SHELL 3 }
  T $cx 700 $DR[$i][0] 36 700 $INK; $xx += $w + 150 }
Arrow 260 230 2050 230 $GOLDT 6 24; T 260 200 'agudo' 34 700 $GOLDT 'start'; T 2050 200 'grave' 34 700 $GOLDT 'end'
Save 'B1_toms_altura'

# 7 · Tres alturas de baqueta ---------------------------------------------------------
NewSvg 2400 900 'Tres alturas de la baqueta, tres volúmenes'
Head 'Tres alturas, tres volúmenes' 'La baqueta cae y rebota; cuanto más alta, más fuerte'
$HT = @(@('baja · unos 5 cm', 'p', 'suave', 70, 1), @('media · unos 15 cm', 'mf', 'mediano', 200, 2), @('alta · unos 30 cm', 'f', 'fuerte', 380, 3))
for ($i = 0; $i -lt 3; $i++) { $x0 = 120 + $i * 760
  Rc ($x0 + 60) 700 560 40 $DRUMHEAD $SHELL 4 10; Rc ($x0 + 60) 740 560 60 $SHELL $INK 2 6
  $gx = $x0 + 120; $gy = 660; $tx = $x0 + 470; $ty = 690 - $HT[$i][3]
  L $gx $gy $tx $ty '#C9A06A' 18 $rc; C $tx $ty 14 '#C9A06A' $INK 2
  P ('M{0} {1} Q{2} {3} {4} 690' -f ($tx + 30), $ty, ($tx + 90), (($ty + 690) / 2), ($tx + 40)) 'none' $GOLD 5 'stroke-dasharray="12 10"'
  L ($x0 + 600) $ty ($x0 + 600) 700 $GRAY 3; T ($x0 + 610) (($ty + 700) / 2) $HT[$i][0] 26 600 $GRAY 'start' $FI
  T ($x0 + 340) 860 ($HT[$i][1] + ' · ' + $HT[$i][2]) 44 700 $INK
  for ($b = 0; $b -lt 3; $b++) { $fill = '#D5D9E0'; if ($b -lt $HT[$i][4]) { $fill = $GOLD }; Rc ($x0 + 520 + $b * 34) (230 - $b * 26) 24 (40 + $b * 26) $fill $INK 1.5 4 } }
Save 'B1_alturas'

# 8 · La partitura de batería ----------------------------------------------------------
NewSvg 2400 760 'Dónde va cada pieza en la partitura de batería'
Head 'La partitura de batería' 'Clave de percusión · cabeza redonda = tambor · cabeza en ✕ = platillo'
$sp = 44; $sy = 300
DStaff 100 $sy 2200 $sp
$LEG = @(@('crash', 'Crash'), @('hihat', 'Hi-hat'), @('ride', 'Ride'), @('tom1', 'Tom 1'), @('tom2', 'Tom 2'), @('caja', 'Redoblante'), @('piso', 'Tom de piso'), @('bombo', 'Bombo'), @('hhpie', 'Hi-hat (pie)'))
for ($i = 0; $i -lt 9; $i++) { $cx = 330 + $i * 235; DHead $cx $sy $sp $LEG[$i][0]; T $cx 610 $LEG[$i][1] 32 700 $INK }
T 1200 700 'Más arriba = más agudo · más abajo = más grave' 30 600 $GRAY 'middle' $FI
Save 'B1_partitura'

# 9 · Lectura en negras -------------------------------------------------------------------
NewSvg 2400 780 'Negras en redoblante y bombo'
Head 'Mi primera lectura: negras' 'Redoblante con la mano izquierda (I) · bombo con el pie derecho (PD)'
$sp = 40; $sy = 330
DStaff 100 $sy 2200 $sp 4 4
$NG = @('bombo', 'caja', 'bombo', 'caja', 'bombo', 'bombo', 'caja', 'caja')
for ($i = 0; $i -lt 8; $i++) { $cx = 420 + $i * 230 + [Math]::Floor($i / 4) * 90; $p0 = $NG[$i]; DHead $cx $sy $sp $p0
  if ($p0 -eq 'bombo') { [void](StemDownTo $cx $sy $sp 'bombo' ((PY $sy $sp 'bombo') + 3.2 * $sp)); Chip $cx ($sy - 80) 'PD' 32 } else { [void](StemUpTo $cx $sy $sp 'caja' ((PY $sy $sp 'caja') - 3.2 * $sp)); Chip $cx ($sy - 160) 'I' 30 }
  T $cx 720 "$(($i % 4) + 1)" 40 700 $INK }
L 1305 $sy 1305 ($sy + 4 * $sp) $INK 3
Save 'B1_lectura_negras'

# 10 · Las figuras en el redoblante ---------------------------------------------------------
NewSvg 2400 1150 'Redondas, blancas y negras en el redoblante'
Head 'Las figuras en el redoblante' 'Cada bloque es un golpe; su largo es lo que dura · las manos se alternan'
$gx = 520; $cw = 440; $gy = 260
for ($k = 0; $k -lt 4; $k++) { Rc ($gx + $k * $cw + 4) ($gy - 10) ($cw - 8) 840 $LIGHT 'none' 0 16; T ($gx + ($k + 0.5) * $cw) ($gy + 40) "$($k + 1)" 46 700 $INK }
$FIGROWS = @(@('w', 'Redonda', 1, 'taa-aa-aa-aa', @('D')), @('h', 'Blanca', 2, 'taa-aa', @('D', 'I')), @('q', 'Negra', 4, 'ta', @('D', 'I', 'D', 'I')), @('q', 'Bombo en negras', 4, 'ta', @('PD', 'PD', 'PD', 'PD')))
for ($r = 0; $r -lt 4; $r++) { $yy = $gy + 110 + $r * 190; $fr = $FIGROWS[$r]
  FigSym 140 ($yy + 60) $fr[0] 1.1; T 190 ($yy + 70) $fr[1] 34 700 $INK 'start'
  $span = 4 / $fr[2]
  for ($k = 0; $k -lt $fr[2]; $k++) { $bx = $gx + $k * $span * $cw + 10; $bw = $span * $cw - 20; $lt = $fr[4][$k]
    Rc $bx $yy $bw 120 $LIMB[$lt] $INK 2.5 18; T ($bx + 50) ($yy + 76) $lt 44 700 '#FFFFFF'; T ($bx + $bw / 2 + 30) ($yy + 76) $fr[3] 36 600 '#FFFFFF' } }
Save 'B1_figuras_caja'

# 11 · Lectura con silencios ------------------------------------------------------------------
NewSvg 2400 760 'Lectura con silencios en el redoblante'
Head 'Lectura con silencios' 'En el silencio digo «sh» y sigo contando'
$sp = 40; $sy = 300
DStaff 100 $sy 2200 $sp 4 4
$EV = @(@(420, 'q', 'ta'), @(640, 'qr', 'sh'), @(860, 'q', 'ta'), @(1080, 'qr', 'sh'), @(1420, 'h', 'taa-aa'), @(1860, 'hr', 'sh-sh'))
foreach ($e in $EV) { $cx = $e[0]
  if ($e[1] -eq 'qr') { QRest $cx $sy $sp } elseif ($e[1] -eq 'hr') { HRest $cx $sy $sp } else { DHead $cx $sy $sp 'caja' ($e[1] -eq 'h'); [void](StemUpTo $cx $sy $sp 'caja' ((PY $sy $sp 'caja') - 3.2 * $sp)) }
  T $cx 640 $e[2] 38 700 $INK }
L 1260 $sy 1260 ($sy + 4 * $sp) $INK 3
$CT = @(@(420, '1'), @(640, '2'), @(860, '3'), @(1080, '4'), @(1420, '1 2'), @(1860, '3 4')); foreach ($cq in $CT) { T $cq[0] 700 $cq[1] 30 600 $GRAY 'middle' $FI }
Save 'B1_silencios'

# 12 · El vals ---------------------------------------------------------------------------------
NewSvg 2400 760 'El vals en la batería'
Head 'El vals en la batería · 3/4' 'UN-dos-tres: bombo en el 1, hi-hat en el 2 y el 3'
KGrid 120 230 @('1', '2', '3', '1', '2', '3') @(@{ n = 'Hi-hat'; l = 'D'; h = @(1, 2, 4, 5) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 3) }) 300 130 300 36
Save 'B1_vals'

# 13 · Corcheas en el hi-hat ----------------------------------------------------------------------
NewSvg 2400 860 'Corcheas en el hi-hat'
Head 'Corcheas en el hi-hat' 'Mano derecha (D) · cuento 1 y 2 y 3 y 4 y'
$sp = 40; $sy = 400
DStaff 100 $sy 2200 $sp 4 4
$tip = $sy - 3.0 * $sp; $xs = @()
for ($i = 0; $i -lt 8; $i++) { $cx = 440 + $i * 225; DHead $cx $sy $sp 'hihat'; $xs += (StemUpTo $cx $sy $sp 'hihat' $tip); Chip $cx ($tip - 60) 'D' 26; $col = $GRAY; if ($i % 2 -eq 0) { $col = $INK }; T $cx 680 $C8[$i] 40 700 $col }
for ($b = 0; $b -lt 4; $b++) { Beam $xs[2 * $b] $xs[2 * $b + 1] $tip $sp }
T 1200 790 'El pie izquierdo (PI) mantiene el hi-hat cerrado' 30 600 $GRAY 'middle' $FI
Save 'B1_corcheas'

# 14 · Golpe sencillo ---------------------------------------------------------------------------------
NewSvg 2400 440 'Rudimento 1: el golpe sencillo'
Head 'Rudimento 1 · El golpe sencillo' 'Las manos se alternan, una y una, igual de fuertes'
Sticking 160 260 @('D', 'I', 'D', 'I', 'D', 'I', 'D', 'I') 220 120 $C8
Save 'B1_golpe_sencillo'

# 15 · Ritmo de rock básico ----------------------------------------------------------------------------
NewSvg 2400 1300 'El ritmo de rock básico'
Head 'Ritmo básico #2 · el rock en corcheas' 'Lo armo por capas: hi-hat, después redoblante, después bombo'
KGrid 120 200 $C8 @(@{ n = '1 · Hi-hat'; l = 'D'; h = 0..7 }, @{ n = '2 · Redoblante'; l = 'I'; h = @(2, 6) }, @{ n = '3 · Bombo'; l = 'PD'; h = @(0, 4) }) 240 110 360 32
$sp = 34; $sy = 860
DStaff 120 $sy 2160 $sp 4 4
$tip = $sy - 2.6 * $sp; $xs = @()
for ($i = 0; $i -lt 8; $i++) { $cx = 520 + $i * 215; DHead $cx $sy $sp 'hihat'; $low = 'hihat'; if ($i -eq 2 -or $i -eq 6) { DHead $cx $sy $sp 'caja'; $low = 'caja' }
  $xs += (StemUpTo $cx $sy $sp $low $tip)
  if ($i -eq 0 -or $i -eq 4) { DHead $cx $sy $sp 'bombo'; [void](StemDownTo $cx $sy $sp 'bombo' ((PY $sy $sp 'bombo') + 2.6 * $sp)) }
  $col = $GRAY; if ($i % 2 -eq 0) { $col = $INK }; T $cx 1250 $C8[$i] 34 700 $col }
for ($b = 0; $b -lt 4; $b++) { Beam $xs[2 * $b] $xs[2 * $b + 1] $tip $sp }
T 1200 1180 '«bum - chi - pa - chi - bum - chi - pa - chi»' 30 600 $GRAY 'middle' $FI
Save 'B1_rock'

# 16 · El Himno con la batería --------------------------------------------------------------------------
NewSvg 2400 900 'El Himno de la alegría con la batería'
Head '«Himno de la alegría» con la batería' '8 compases · Ritmo básico #2 a 70 BPM · crash al empezar cada frase'
for ($i = 0; $i -lt 8; $i++) { $row = [Math]::Floor($i / 4); $bx = 300 + ($i % 4) * 500; $by = 270 + $row * 290
  $fill = '#FFFFFF'; if ($i -eq 0 -or $i -eq 4) { $fill = '#FFF3CF' }; if ($i -eq 7) { $fill = '#FCE1DF' }
  Rc $bx $by 460 210 $fill $INK 2.5 18; T ($bx + 30) ($by + 50) ("Compás " + ($i + 1)) 30 700 $GRAY 'start' $FI
  if ($i -eq 0 -or $i -eq 4) { T ($bx + 230) ($by + 125) 'crash + bombo en el 1' 32 700 $GOLDT; T ($bx + 230) ($by + 170) 'y Ritmo básico #2' 28 500 $INK 'middle' $FI }
  elseif ($i -eq 7) { T ($bx + 230) ($by + 125) 'golpe final en el 3' 32 700 $DC; T ($bx + 230) ($by + 170) 'crash + bombo y dejo sonar' 28 500 $INK 'middle' $FI }
  else { T ($bx + 230) ($by + 140) 'Ritmo básico #2' 32 600 $INK 'middle' $FI } }
T 120 380 'Frase 1' 34 700 $INK 'start'; T 120 410 'pregunta' 26 500 $GRAY 'start' $FI
T 120 670 'Frase 2' 34 700 $INK 'start'; T 120 700 'respuesta' 26 500 $GRAY 'start' $FI
Save 'B1_himno'

# 17 · Ritmos básicos #1, #3 y #4 · ritmos adicionales · coordinación · técnica del bombo -------------------
$C4 = @('1', '2', '3', '4')
function RockRows($kick, $hh = (0..7)) { @(@{ n = 'Hi-hat'; l = 'D'; h = $hh }, @{ n = 'Redoblante'; l = 'I'; h = @(2, 6) }, @{ n = 'Bombo'; l = 'PD'; h = $kick }) }

NewSvg 2400 760 'Ritmo básico #1'
Head 'Ritmo básico #1 · todo en negras' 'Hi-hat en los 4 tiempos · bombo en 1 y 3 · redoblante en 2 y 4'
KGrid 160 210 $C4 @(@{ n = 'Hi-hat'; l = 'D'; h = 0..3 }, @{ n = 'Redoblante'; l = 'I'; h = @(1, 3) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2) }) 440 120 360 34
Save 'B1_ritmo1'

NewSvg 2400 760 'Ritmo básico #3'
Head 'Ritmo básico #3' 'El #2 con un cambio: el bombo agrega la «y» del 3'
KGrid 120 210 $C8 (RockRows @(0, 4, 5)) 240 120 360 32
Rc (120 + 360 + 5 * 240 + 6) 230 228 470 'none' $GOLD 5 16
Save 'B1_ritmo3'

NewSvg 2400 760 'Ritmo básico #4'
Head 'Ritmo básico #4' 'El #3 con un cambio: el bombo agrega la «y» del 2'
KGrid 120 210 $C8 (RockRows @(0, 3, 4, 5)) 240 120 360 32
Rc (120 + 360 + 3 * 240 + 6) 230 228 470 'none' $GOLD 5 16
Save 'B1_ritmo4'

NewSvg 2400 640 'La marcha en la batería'
Head 'Ritmo adicional 1 · La marcha · 2/4' 'UN-dos: bombo en el 1, redoblante en el 2'
KGrid 160 200 @('1', '2', '1', '2') @(@{ n = 'Redoblante'; l = 'I'; h = @(1, 3) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2) }) 440 130 360 36
Save 'B1_marcha'

NewSvg 2400 760 'La balada en la batería'
Head 'Ritmo adicional 3 · La balada' 'Lenta y suave (60–70 BPM): hi-hat en negras, bombo en el 1, redoblante en el 3'
KGrid 160 210 $C4 @(@{ n = 'Hi-hat'; l = 'D'; h = 0..3 }, @{ n = 'Redoblante'; l = 'I'; h = @(2) }, @{ n = 'Bombo'; l = 'PD'; h = @(0) }) 440 120 360 34
Save 'B1_balada'

NewSvg 2400 1500 'Ejercicio de coordinación I'
Head 'Ejercicio de coordinación I · en negras' 'A: una después de otra · B: juntas · C: tres extremidades'
$CO = @(@('A', @(@{ n = 'Hi-hat'; l = 'D'; h = @(0, 2) }, @{ n = 'Bombo'; l = 'PD'; h = @(1, 3) })),
  @('B', @(@{ n = 'Hi-hat'; l = 'D'; h = @(0, 2) }, @{ n = 'Redoblante'; l = 'I'; h = @(1, 3) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2) })),
  @('C', @(@{ n = 'Hi-hat'; l = 'D'; h = 0..3 }, @{ n = 'Redoblante'; l = 'I'; h = @(1, 3) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2) })))
$yy = 170
foreach ($cx1 in $CO) { T 120 ($yy + 50) ('Paso ' + $cx1[0]) 40 700 $GOLDT 'start'; KGrid 120 ($yy + 60) $C4 $cx1[1] 420 80 360 28; $yy += 120 + 80 * ($cx1[1].Count + 1) }
Save 'B1_coordinacion1'

NewSvg 2400 1550 'Ejercicio de coordinación II'
Head 'Ejercicio de coordinación II · en corcheas' 'La mano derecha sigue en corcheas; las otras extremidades entran una por una'
$CO2 = @(@('A · bombo en cada número', @(@{ n = 'Hi-hat'; l = 'D'; h = 0..7 }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2, 4, 6) })),
  @('B · redoblante en cada «y»', @(@{ n = 'Hi-hat'; l = 'D'; h = 0..7 }, @{ n = 'Redoblante'; l = 'I'; h = @(1, 3, 5, 7) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2, 4, 6) })),
  @('C · ride y pie izquierdo', @(@{ n = 'Ride'; l = 'D'; h = 0..7 }, @{ n = 'Hi-hat (pie)'; l = 'PI'; h = @(2, 6) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 4) })))
$yy = 170
foreach ($cx2 in $CO2) { T 120 ($yy + 50) ('Paso ' + $cx2[0]) 40 700 $GOLDT 'start'; KGrid 120 ($yy + 60) $C8 $cx2[1] 230 78 340 28; $yy += 120 + 78 * ($cx2[1].Count + 1) }
Save 'B1_coordinacion2'

NewSvg 2400 900 'Técnicas para el bombo'
Head 'Técnicas para el bombo' 'Talón abajo: control · talón arriba: fuerza · el mazo siempre vuelve atrás'
foreach ($tk in @(@(120, 'Talón abajo', 'se mueve el tobillo · empiezo con esta', 0), @(1300, 'Talón arriba', 'se mueve toda la pierna · más fuerza', 1))) {
  $x0 = $tk[0]; L ($x0) 760 ($x0 + 1000) 760 $GRAY 4
  # bombo y mazo
  Rc ($x0 + 760) 380 240 380 $SHELL $INK 3 12; L ($x0 + 760) 380 ($x0 + 760) 760 '#9AA0A6' 10
  L ($x0 + 690) 470 ($x0 + 740) 470 '#9AA0A6' 8 $rc; C ($x0 + 744) 470 20 '#E8E3D6' $INK 2
  L ($x0 + 690) 470 ($x0 + 640) 700 '#9AA0A6' 6 $rc
  # pedal
  P ('M{0} 745 L{1} 690 L{2} 700 L{3} 752 Z' -f ($x0 + 330), ($x0 + 650), ($x0 + 652), ($x0 + 330)) '#6B7280' $INK 2
  # pie
  if ($tk[3] -eq 0) { P ('M{0} 728 Q{1} 700 {2} 676 L{3} 690 Q{4} 720 {5} 745 Z' -f ($x0 + 340), ($x0 + 470), ($x0 + 620), ($x0 + 640), ($x0 + 480), ($x0 + 345)) $INK $INK 2; L ($x0 + 360) 720 ($x0 + 330) 420 $GRAY 70 $rc }
  else { P ('M{0} 640 Q{1} 650 {2} 676 L{3} 690 Q{4} 680 {5} 665 Z' -f ($x0 + 380), ($x0 + 500), ($x0 + 620), ($x0 + 640), ($x0 + 500), ($x0 + 385)) $INK $INK 2; L ($x0 + 400) 650 ($x0 + 330) 360 $GRAY 70 $rc; Arrow ($x0 + 300) 700 ($x0 + 300) 610 $GOLDT 5 18 }
  T ($x0 + 500) 830 $tk[1] 42 700 $INK; T ($x0 + 500) 875 $tk[2] 28 500 $GRAY 'middle' $FI }
Save 'B1_bombo_tecnica'

# 18 · Afinación en estrella (pasa al Nivel 2, clase 20) -------------------------------------------------------
$script:OUT = Join-Path $PSScriptRoot '..\nivel-2\img'; New-Item -ItemType Directory -Force $script:OUT | Out-Null
NewSvg 2400 950 'Afinación en estrella'
Head 'Afino en estrella' 'Uno y el de enfrente · el mismo giro en cada afinador'
$ORD = @(@(6, @(0, 3, 1, 4, 2, 5), 560, '6 afinadores (toms)'), @(8, @(0, 4, 2, 6, 1, 5, 3, 7), 1300, '8 afinadores (redoblante y bombo)'))
foreach ($od in $ORD) { $nl = $od[0]; $cx = $od[2]; $cy = 540; $rr = 260
  C $cx $cy ($rr + 18) $SHELL $INK 2; C $cx $cy $rr $DRUMHEAD $SHELL 4
  $pts = @(); for ($k = 0; $k -lt $nl; $k++) { $ang = -[Math]::PI / 2 + 2 * [Math]::PI * $k / $nl; $pts += , @(($cx + ($rr + 40) * [Math]::Cos($ang)), ($cy + ($rr + 40) * [Math]::Sin($ang))) }
  $seq = $od[1]; $d = ''; for ($k = 0; $k -lt $nl; $k++) { $q = $pts[$seq[$k]]; $q2 = @(($cx + ($q[0] - $cx) * 0.78), ($cy + ($q[1] - $cy) * 0.78)); if ($k -eq 0) { $d += 'M' } else { $d += ' L' }; $d += ('{0} {1}' -f (N $q2[0]), (N $q2[1])) }
  P $d 'none' $GOLD 4 'stroke-dasharray="14 10"'
  for ($k = 0; $k -lt $nl; $k++) { $q = $pts[$seq[$k]]; Num $q[0] $q[1] ($k + 1) 26 }
  T $cx 900 $od[3] 32 700 $INK }
T 1900 420 'Más apretado' 38 700 $INK 'start'; T 1900 470 '= más agudo' 34 600 $GOLDT 'start'
T 1900 600 'Más flojo' 38 700 $INK 'start'; T 1900 650 '= más grave' 34 600 $GOLDT 'start'
Save 'B2_afinacion'
$script:OUT = Join-Path $PSScriptRoot '..\nivel-1\img'

# 19 · Doble golpe -------------------------------------------------------------------------------------------
NewSvg 2400 440 'Rudimento 2: el doble golpe'
Head 'Rudimento 2 · El doble golpe' 'Dos golpes con cada mano; el segundo sale del rebote'
Sticking 160 260 @('D', 'D', 'I', 'I', 'D', 'D', 'I', 'I') 220 120 $C8
Save 'B1_doble_golpe'

# 20 · Recorrido por los toms ---------------------------------------------------------------------------------
NewSvg 2400 1000 'El recorrido por los toms'
Head 'El recorrido por los toms' 'Del más agudo al más grave, como bajar una escala'
$sc = 1.5; $kx0 = 80; $ky0 = 230
Kit $kx0 $ky0 $sc @{ caja = @{ fill = '#FFE59A' }; tom1 = @{ fill = '#FFE59A' }; tom2 = @{ fill = '#FFE59A' }; piso = @{ fill = '#FFE59A' } }
$RT = @('caja', 'tom1', 'tom2', 'piso'); $pts = @()
for ($i = 0; $i -lt 4; $i++) { $pts += , @((KX $kx0 $sc $RT[$i]), ((KY $ky0 $sc $RT[$i]) + 70)) }
$d = ('M{0} {1}' -f (N $pts[0][0]), (N $pts[0][1])); for ($i = 1; $i -lt 4; $i++) { $d += (' Q{0} {1} {2} {3}' -f (N (($pts[$i - 1][0] + $pts[$i][0]) / 2)), (N ([Math]::Min($pts[$i - 1][1], $pts[$i][1]) - 120)), (N $pts[$i][0]), (N $pts[$i][1])) }
P $d 'none' $GOLDT 6 'stroke-dasharray="16 10"'
for ($i = 0; $i -lt 4; $i++) { Num $pts[$i][0] ($pts[$i][1] + 4) ($i + 1) 30 }
$TOMNAMES = @('Redoblante', 'Tom 1', 'Tom 2', 'Tom de piso')
for ($i = 0; $i -lt 4; $i++) { $yy = 330 + $i * 150; Num 1560 $yy ($i + 1) 30; T 1610 ($yy + 12) $TOMNAMES[$i] 40 700 $INK 'start' }
T 1560 930 'agudo → grave · golpes alternos D I D I' 30 600 $GRAY 'start' $FI
Save 'B1_recorrido'

# 21 · Mi primer relleno ------------------------------------------------------------------------------------------
NewSvg 2400 1200 'Mi primer relleno'
Head 'Mi primer relleno' '3 compases de ritmo · relleno en el compás 4 · crash con bombo en el 1'
for ($i = 0; $i -lt 4; $i++) { $bx = 140 + $i * 540; $fill = '#FFFFFF'; $txt = 'Ritmo básico #2'; if ($i -eq 3) { $fill = '#FFF3CF'; $txt = 'relleno' }
  Rc $bx 200 500 120 $fill $INK 2.5 16; T ($bx + 250) 255 ("Compás " + ($i + 1)) 30 700 $GRAY 'middle' $FI; T ($bx + 250) 300 $txt 34 700 $INK }
T 1200 400 'El compás 4, de cerca:' 34 700 $INK
KGrid 120 440 @('1', 'y', '2', 'y', '3', 'y', '4', 'y', '1') @(
  @{ n = 'Crash'; l = 'D'; h = @(8) },
  @{ n = 'Hi-hat'; l = 'D'; h = @(0, 1, 2, 3) },
  @{ n = 'Redoblante'; l = 'I'; h = @(2, 4, 5); lt = @{ 4 = 'D' } },
  @{ n = 'Tom 1'; l = 'D'; h = @(6, 7); lt = @{ 7 = 'I' } },
  @{ n = 'Bombo'; l = 'PD'; h = @(0, 8) }) 210 115 340 30
Rc (120 + 340 + 4 * 210) 460 (4 * 210) 650 'none' $GOLD 5 18
T (120 + 340 + 6 * 210) 1170 'relleno de 2 tiempos' 30 700 $GOLDT
Save 'B1_relleno'

# 22 · Mapa de una canción ------------------------------------------------------------------------------------------
NewSvg 2400 1100 'El mapa de una canción: Estrellita'
Head 'El mapa de la canción · «Estrellita»' '3 frases de 4 compases · crash al empezar · relleno al terminar cada frase'
$CH = @('C', 'F C', 'F C', 'G C', 'C F', 'C G', 'C F', 'C G', 'C', 'F C', 'F C', 'G C')
for ($i = 0; $i -lt 12; $i++) { $row = [Math]::Floor($i / 4); $bx = 380 + ($i % 4) * 470; $by = 230 + $row * 250
  $fill = '#FFFFFF'; $tag = ''; $tc = $INK
  if ($i % 4 -eq 0) { $fill = '#FFF3CF'; $tag = 'crash'; $tc = $GOLDT }
  if ($i % 4 -eq 3) { $fill = '#E3EEFB'; $tag = 'relleno'; $tc = $IC }
  if ($i -eq 11) { $fill = '#FCE1DF'; $tag = 'golpe final'; $tc = $DC }
  Rc $bx $by 430 190 $fill $INK 2.5 16; T ($bx + 24) ($by + 42) "$($i + 1)" 28 700 $GRAY 'start' $FI
  T ($bx + 215) ($by + 115) $CH[$i] 52 700 $INK 'middle' $FS
  if ($tag) { T ($bx + 215) ($by + 168) $tag 30 700 $tc } }
for ($r = 0; $r -lt 3; $r++) { T 120 (340 + $r * 250) ('Frase ' + ($r + 1)) 36 700 $INK 'start' }
Save 'B1_mapa_cancion'

# 23 · Mis ritmos del Nivel 1 ------------------------------------------------------------------------------------------
NewSvg 2400 1520 'Mis ritmos del Nivel 1'
Head 'Mis ritmos del Nivel 1' 'Los ritmos básicos #1 a #4, los ritmos adicionales y los dos rudimentos'
$RB = @(@('Ritmo básico #1', $C4, @(@{ n = 'Hi-hat'; l = 'D'; h = 0..3 }, @{ n = 'Redoblante'; l = 'I'; h = @(1, 3) }, @{ n = 'Bombo'; l = 'PD'; h = @(0, 2) })),
  @('Ritmo básico #2', $C8, (RockRows @(0, 4))), @('Ritmo básico #3', $C8, (RockRows @(0, 4, 5))), @('Ritmo básico #4', $C8, (RockRows @(0, 3, 4, 5))))
$yy = 180
foreach ($rbx in $RB) { T 60 ($yy + 40) $rbx[0] 34 700 $GOLDT 'start'; $cwx = 105; if ($rbx[1].Count -eq 4) { $cwx = 210 }; KGrid 60 ($yy + 50) $rbx[1] $rbx[2] $cwx 62 220 24; $yy += 330 }
$AD = @(@('Marcha · 2/4', @('1', '2'), @(@{ n = 'Redoblante'; l = 'I'; h = @(1) }, @{ n = 'Bombo'; l = 'PD'; h = @(0) })),
  @('Vals · 3/4', @('1', '2', '3'), @(@{ n = 'Hi-hat'; l = 'D'; h = @(1, 2) }, @{ n = 'Bombo'; l = 'PD'; h = @(0) })),
  @('Balada · 4/4 lenta', $C4, @(@{ n = 'Hi-hat'; l = 'D'; h = 0..3 }, @{ n = 'Redoblante'; l = 'I'; h = @(2) }, @{ n = 'Bombo'; l = 'PD'; h = @(0) })))
$yy = 180
foreach ($adx in $AD) { T 1300 ($yy + 40) $adx[0] 34 700 $IC 'start'; KGrid 1300 ($yy + 50) $adx[1] $adx[2] 150 62 220 24; $yy += 100 + 62 * ($adx[2].Count + 1) }
T 1300 ($yy + 40) 'Golpes alternos' 34 700 $GOLDT 'start'; Sticking 1300 ($yy + 70) @('D', 'I', 'D', 'I') 110 80
T 1300 ($yy + 230) 'Redoble abierto' 34 700 $GOLDT 'start'; Sticking 1300 ($yy + 260) @('D', 'D', 'I', 'I') 110 80
Save 'B1_resumen'
'listo'
