# Láminas del Nivel 3 de piano (clases 25–36). Uso:
#   powershell -File contenido/piano/generador/laminas_n3.ps1
# Retiro del color: 25–32 notas negras con su nombre · 33–36 partitura convencional.
. (Join-Path $PSScriptRoot 'lib2.ps1')
$script:OUT = Join-Path $PSScriptRoot '..\nivel-3\img'
New-Item -ItemType Directory -Force $script:OUT | Out-Null
$script:NMODE = 'black'
function E3($a, $t = 'q', $f = $null) { @{ a = $a; t = $t; f = $f } }
function TSarc($pts, $types, $yy) {
  for ($i = 0; $i -lt $types.Count; $i++) {
    $x1 = $pts[$i]; $x2 = $pts[$i + 1]; $mid = ($x1 + $x2) / 2; $col = $GRAY; if ($types[$i] -eq 'S') { $col = $GOLD }
    P ('M{0} {1} Q{2} {3} {4} {1}' -f (N ($x1 + 16)), (N $yy), (N $mid), (N ($yy - 70)), (N ($x2 - 16))) 'none' $col 5 'stroke-linecap="round"'
    C $mid ($yy - 56) 26 $col; T $mid ($yy - 44) $types[$i] 32 700 '#FFFFFF'
  }
}
function PaleKeys($list) { $h = @{}; foreach ($a in $list) { $h[[int]$a] = @{ fill = '#FBF1D3'; lbl = (NoteName $a) } }; $h }

# 25 · Mayor y menor ---------------------------------------------------------
NewSvg 2400 1000 'Escala mayor y escala menor relativa'
Head 'Mayor y menor: las relativas' 'Las mismas teclas blancas, distinta nota «casa»'
T 90 420 'Do mayor' 40 700 $INK 'start'; T 90 470 'T T S T T T S' 30 700 $GOLDT 'start'
$m1 = PaleKeys @(7, 8, 9, 10, 11, 12, 13, 14); $m1[7] = @{ fill = $GOLD; lbl = 'DO' }; $m1[14] = @{ fill = $GOLD; lbl = 'DO' }
Kb 500 330 220 240 7 8 $m1 -nameSize 34
$pts = @(); foreach ($a in 7..14) { $pts += Kx 500 220 7 $a }; TSarc $pts @('T', 'T', 'S', 'T', 'T', 'T', 'S') 315
T 90 820 'La menor' 40 700 $INK 'start'; T 90 870 'T S T T S T T' 30 700 $GOLDT 'start'
$m2 = PaleKeys @(5, 6, 7, 8, 9, 10, 11, 12); $m2[5] = @{ fill = $GOLD; lbl = 'LA' }; $m2[12] = @{ fill = $GOLD; lbl = 'LA' }
Kb 500 730 220 240 5 8 $m2 -nameSize 34
$pts = @(); foreach ($a in 5..12) { $pts += Kx 500 220 5 $a }; TSarc $pts @('T', 'S', 'T', 'T', 'S', 'T', 'T') 715
Save 'P3_mayor_menor'

# 25 · Canción de la luna ------------------------------------------------------
NewSvg 2400 1500 'Canción de la luna (composición AMA)'
$sp = 30
$Am = @(-2, 0, 2); $Dm = @(-2, 1, 3); $Em = @(-3, -1, 2)
$RR = @(@(12, 14, 16), @(, 15), @(14, 13, 12), @(, 13), @(12, 14, 16), @(15, 14), @(16, 15, 13), @(, 12))
$RT = @(@('q', 'q', 'q'), @(, 'hd'), @('q', 'q', 'q'), @(, 'hd'), @('q', 'q', 'q'), @('h', 'q'), @('q', 'q', 'q'), @(, 'hd'))
$LL = @(@($Am, 'Am'), @($Dm, 'Dm/A'), @($Am, 'Am'), @($Em, 'Em/G'), @($Am, 'Am'), @($Dm, 'Dm/A'), @($Em, 'Em/G'), @($Am, 'Am'))
for ($s = 0; $s -lt 2; $s++) {
  $rh = @(); $lh = @()
  for ($k = $s * 4; $k -lt $s * 4 + 4; $k++) {
    $bar = @(); for ($j = 0; $j -lt $RR[$k].Count; $j++) { $ev = E3 $RR[$k][$j] $RT[$k][$j] ($RR[$k][$j] - 11); if ($j -eq 0) { $ev.ch = $LL[$k][1] }; $bar += , $ev }
    $rh += , $bar; $lh += , @(@{ as = $LL[$k][0]; t = 'hd' })
  }
  $y = 170 + $s * 660
  System 120 $y 2160 $sp 3 $(if ($s -eq 0) { 3 } else { $null }) 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 12 * $sp; open = ($s -eq 0) }
  FingRow 0 ($y - 4.2 * $sp) $sp 'dedo'
  NameRow 0 ($y + 4 * $sp + 2.4 * $sp) 36 $sp
}
Save 'P3_cancion_luna'

# 26 · Intervalos clasificados ---------------------------------------------------
NewSvg 2400 1100 'Intervalos clasificados desde DO'
Head 'Intervalos clasificados' 'El número se cuenta con las notas · la especie, con los semitonos'
$INTS = @(
  @(@(8, 'b', '2.ª menor', 1), @(8, $null, '2.ª mayor', 2), @(9, 'b', '3.ª menor', 3), @(9, $null, '3.ª mayor', 4), @(10, $null, '4.ª justa', 5), @(11, $null, '5.ª justa', 7)),
  @(@(12, 'b', '6.ª menor', 8), @(12, $null, '6.ª mayor', 9), @(13, 'b', '7.ª menor', 10), @(13, $null, '7.ª mayor', 11), @(14, $null, '8.ª justa', 12)))
for ($s = 0; $s -lt 2; $s++) {
  $bars = @()
  foreach ($iv in $INTS[$s]) { $ev = @{ as = @(7, $iv[0]); t = 'w' }; if ($iv[1]) { $ev.acc = @{ ([int]$iv[0]) = $iv[1] } }; $bars += , @($ev) }
  $y = 300 + $s * 400
  System 100 $y 2200 38 4 $null $null @(@{ clef = 'G'; bars = $bars }) @{ open = ($s -eq 0) }
  $k = 0
  foreach ($v in $script:SYS[0].evs) {
    $iv = $INTS[$s][$k]
    T ($v.cx + 10) ($y - 70) $iv[2] 34 700 $GOLDT
    T ($v.cx + 10) ($y + 4 * 38 + 95) ('DO – ' + (NoteLabel $iv[0] $iv[1])) 30 700 $INK
    T ($v.cx + 10) ($y + 4 * 38 + 140) "$($iv[3]) semitonos" 26 600 $GRAY
    $k++
  }
}
Save 'P3_intervalos'

# 26 · Manos juntas -----------------------------------------------------------------
$script:NMODE = 'plain'
NewSvg 2400 900 'Escala de Do con manos juntas'
Head 'Escala de Do con las dos manos juntas' 'Movimiento contrario (espejo) y paralelo'
$sp = 30
$rh = @(@((E3 7 'q' 1), (E3 8 'q' 2), (E3 9 'q' 3), (E3 10 'q' 1)), @((E3 11 'q' 2), (E3 12 'q' 3), (E3 13 'q' 4), (E3 14 'q' 5)), @((E3 7 'q' 1), (E3 8 'q' 2), (E3 9 'q' 3), (E3 10 'q' 1)), @((E3 11 'q' 2), (E3 12 'q' 3), (E3 13 'q' 4), (E3 14 'q' 5)))
$lh = @(@((E3 0 'q' 1), (E3 (-1) 'q' 2), (E3 (-2) 'q' 3), (E3 (-3) 'q' 1)), @((E3 (-4) 'q' 2), (E3 (-5) 'q' 3), (E3 (-6) 'q' 4), (E3 (-7) 'q' 5)), @((E3 0 'q' 5), (E3 1 'q' 4), (E3 2 'q' 3), (E3 3 'q' 2)), @((E3 4 'q' 1), (E3 5 'q' 3), (E3 6 'q' 2), (E3 7 'q' 1)))
$y = 300
System 120 $y 2160 $sp 4 4 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 11 * $sp }
FingRow 0 ($y - 2.4 * $sp) $sp 'MD'
FingRow 1 ($y + 11 * $sp + 4 * $sp + 4.2 * $sp) $sp 'MI'
$e0 = $script:SYS[0].evs
T (($e0[0].cx + $e0[7].cx) / 2) ($y - 4.4 * $sp) 'Movimiento contrario: los mismos dedos a la vez' 32 700 $GOLDT
T (($e0[8].cx + $e0[15].cx) / 2) ($y - 4.4 * $sp) 'Paralelo: los pulgares pasan en distinto momento' 32 700 $GOLDT
$script:NMODE = 'black'
Save 'P3_manos_juntas'

# 27 · Articulación ---------------------------------------------------------------
$script:NMODE = 'plain'
NewSvg 2400 760 'Ligadura de expresión, caída y elevación y staccato'
Head 'Legato, staccato y frase' 'Curva sobre notas distintas = legato · punto = staccato'
$sp = 36
$bars = @(
  @(@{ a = 9; t = 'q'; sl = 's' }, @{ a = 8; t = 'q'; sl = 'e' }, @{ a = 9; t = 'q'; sl = 's' }, @{ a = 8; t = 'q'; sl = 'e' }),
  @(@{ a = 10; t = 'q'; sl = 's' }, @{ a = 9; t = 'q'; sl = 'e' }, @{ a = 8; t = 'h' }),
  @(@{ a = 7; t = 'q'; st = $true }, @{ a = 9; t = 'q'; st = $true }, @{ a = 11; t = 'q'; st = $true }, @{ a = 9; t = 'q'; st = $true }),
  @(@{ a = 8; t = 'q'; sl = 's' }, @{ a = 9; t = 'q' }, @{ a = 10; t = 'q' }, @{ a = 8; t = 'q'; sl = 'e' }),
  @(, @{ a = 7; t = 'w' }))
System 120 300 2160 $sp 4 4 4 @(@{ clef = 'G'; bars = $bars })
$ev = $script:SYS[0].evs
T (($ev[0].cx + $ev[6].cx) / 2) 560 'caída y elevación («PA-ra»)' 32 700 $GOLDT
T (($ev[7].cx + $ev[10].cx) / 2) 560 'staccato: corta, con rebote' 32 700 $GOLDT
T (($ev[11].cx + $ev[14].cx) / 2) 560 'legato: unidas' 32 700 $GOLDT
T 1200 690 'Pregunta (compases 1–2) y respuesta (compases 3–5)' 30 500 $GRAY 'middle' $FI
$script:NMODE = 'black'
Save 'P3_articulacion'

# 28 · Inversiones y G7 ---------------------------------------------------------------
NewSvg 2400 1100 'Inversiones y séptima de dominante'
Head 'Inversiones y séptima de dominante' 'El mismo acorde con otra nota en el bajo · G7 pide volver a C'
$bars = @(@(, @{ as = @(7, 9, 11); t = 'w' }), @(, @{ as = @(9, 11, 14); t = 'w' }), @(, @{ as = @(11, 14, 16); t = 'w' }), @(, @{ as = @(11, 13, 15, 17); t = 'w' }))
System 100 300 2200 38 4 $null $null @(@{ clef = 'G'; bars = $bars }) @{ open = $true }
$lab = @(@('C · fundamental', 'DO – MI – SOL'), @('C/E · 1.ª inversión', 'MI – SOL – DO'), @('C/G · 2.ª inversión', 'SOL – DO – MI'), @('G7', 'SOL – SI – RE – FA')); $k = 0
foreach ($v in $script:SYS[0].evs) { T ($v.cx + 10) 230 $lab[$k][0] 34 700 $GOLDT; T ($v.cx + 10) 560 $lab[$k][1] 30 700 $INK; $k++ }
$bars = @(@(@{ as = @(7, 9, 11); t = 'h' }, @{ as = @(6, 10, 11); t = 'h' }), @(, @{ as = @(7, 9, 11); t = 'w' }))
System 100 760 1300 38 4 $null $null @(@{ clef = 'G'; bars = $bars })
$ev = $script:SYS[0].evs; $lab = @(@('C', '1-3-5'), @('G7/B', '1-4-5'), @('C', '1-3-5'))
for ($k = 0; $k -lt 3; $k++) { T ($ev[$k].cx + 10) 700 $lab[$k][0] 34 700 $GOLDT; T ($ev[$k].cx + 10) 1020 ('dedos ' + $lab[$k][1]) 28 700 $INK }
T 1500 860 'SI sube a DO (la sensible)' 32 700 $INK 'start'; T 1500 920 'FA baja a MI' 32 700 $INK 'start'
Save 'P3_inversiones_g7'

# 29 · Funciones --------------------------------------------------------------------
NewSvg 2400 1000 'I – IV – V7 – I en Do, Sol y Fa'
Head 'La familia de acordes: I – IV – V7 – I' 'Tónica = reposo · subdominante = movimiento · dominante = tensión'
$FC = @{ T = '#DCEFE0'; S = '#DCEBF7'; D = '#F9D9D7' }
$fn = @(@('I', 'Tónica', 'T'), @('IV', 'Subdominante', 'S'), @('V7', 'Dominante', 'D'), @('I', 'Tónica', 'T'))
for ($i = 0; $i -lt 4; $i++) { $x = 420 + $i * 480; T ($x + 220) 230 ('{0} · {1}' -f $fn[$i][0], $fn[$i][1]) 32 700 $INK }
$rows = @(
  @('Do mayor', @(@('C', 'DO-MI-SOL'), @('F/C', 'DO-FA-LA'), @('G7/B', 'SI-FA-SOL'), @('C', 'DO-MI-SOL'))),
  @('Sol mayor', @(@('G', 'SOL-SI-RE'), @('C/G', 'SOL-DO-MI'), @('D7/F♯', 'FA♯-DO-RE'), @('G', 'SOL-SI-RE'))),
  @('Fa mayor', @(@('F', 'FA-LA-DO'), @('B♭/F', 'FA-SI♭-RE'), @('C7/E', 'MI-SI♭-DO'), @('F', 'FA-LA-DO'))))
for ($r = 0; $r -lt 3; $r++) {
  $y = 270 + $r * 230; T 90 ($y + 110) $rows[$r][0] 36 700 $INK 'start'
  for ($i = 0; $i -lt 4; $i++) { $x = 420 + $i * 480; Rc $x $y 440 190 $FC[$fn[$i][2]] $INK 2 18; T ($x + 220) ($y + 90) $rows[$r][1][$i][0] 56 700 $INK; T ($x + 220) ($y + 150) $rows[$r][1][$i][1] 30 600 $GRAY }
}
T 1200 975 'Mano derecha con acordes vecinos · mano izquierda: el bajo de cada grado' 28 500 $GRAY 'middle' $FI
Save 'P3_funciones'

# 30 · Estilos de acompañamiento --------------------------------------------------------
NewSvg 2400 1080 'Cuatro estilos de acompañamiento'
Head 'Estilos de acompañamiento' 'Cuento en corcheas: 1 y 2 y 3 y 4 y'
$cols = @('1', 'y', '2', 'y', '3', 'y', '4', 'y'); $x0 = 560; $cw = 210
for ($i = 0; $i -lt 8; $i++) { T ($x0 + $i * $cw + $cw / 2) 230 $cols[$i] 40 700 $(if ($i % 2 -eq 0) { $INK } else { $GRAY }) }
$rows = @(
  @('Balada · mano derecha', @{ 0 = 'DO'; 1 = 'MI'; 2 = 'SOL'; 3 = 'MI'; 4 = 'DO'; 5 = 'MI'; 6 = 'SOL'; 7 = 'MI' }, '#FBF1D3'),
  @('Balada · mano izquierda', @{ 0 = 'bajo (redonda)' }, '#DCEBF7'),
  @('Pop · mano derecha', @{ 0 = '●'; 3 = '●'; 6 = '●' }, '#FBF1D3'),
  @('Pop · mano izquierda', @{ 0 = 'B'; 2 = 'B'; 4 = 'B'; 6 = 'B' }, '#DCEBF7'),
  @('Caribeño · mano derecha', @{ 1 = '●'; 3 = '●'; 5 = '●'; 7 = '●' }, '#FBF1D3'),
  @('Caribeño · mano izquierda', @{ 0 = 'B'; 4 = 'B' }, '#DCEBF7'))
for ($r = 0; $r -lt 6; $r++) {
  $y = 260 + $r * 110; T ($x0 - 30) ($y + 62) $rows[$r][0] 30 700 $INK 'end'
  for ($i = 0; $i -lt 8; $i++) { Rc ($x0 + $i * $cw + 4) $y ($cw - 8) 92 '#FFFFFF' $GRAY 1.5 10 }
  foreach ($k in $rows[$r][1].Keys) { $w = $(if ($rows[$r][1][$k] -like 'bajo*') { 8 * $cw - 8 } else { $cw - 8 }); Rc ($x0 + $k * $cw + 4) $y $w 92 $rows[$r][2] $GOLD 2.5 10; T ($x0 + $k * $cw + 4 + $w / 2) ($y + 60) $rows[$r][1][$k] 32 700 $INK }
}
T 1200 990 '● = acorde · B = bajo · Pop = 3 + 3 + 2 · Caribeño = acordes a contratiempo (en las «y»)' 30 500 $GRAY 'middle' $FI
T 1200 1040 'Vals (3/4): bajo en el 1 · acorde en el 2 y el 3' 30 500 $GRAY 'middle' $FI
Save 'P3_estilos'

# 31 · Transportar ----------------------------------------------------------------------
NewSvg 2400 1140 'Transportar con la misma forma de la mano'
Head 'Transportar: la misma forma, otra casa' 'Posiciones de cinco dedos para el «Himno de la alegría»'
$pos = @(
  @('Do', @(7, 8, 9, 10, 11), @{}, 'MI MI FA SOL | SOL FA MI RE…'),
  @('Sol', @(11, 12, 13, 14, 15), @{}, 'SI SI DO RE | RE DO SI LA…'),
  @('Fa', @(10, 11, 12, 14), @{ 12 = @{ fill = $GOLD; lbl = @('SI♭'); fing = 4 } }, 'LA LA SI♭ DO | DO SI♭ LA SOL…'))
for ($r = 0; $r -lt 3; $r++) {
  $y = 230 + $r * 280; $p = $pos[$r]; $mk = @{}; $fg = 1
  foreach ($a in $p[1]) { $mk[[int]$a] = @{ fill = '#FBF1D3'; lbl = (NoteName $a) } }
  $ord = @($p[1]); if ($r -eq 2) { $ord = @(10, 11, 12, 'Bb', 14) }
  for ($j = 0; $j -lt 5; $j++) { if ($ord[$j] -ne 'Bb') { $mk[[int]$ord[$j]].fing = $j + 1 } }
  T 90 ($y + 130) ('Posición de ' + $p[0].ToUpper()) 34 700 $INK 'start'
  Kb2 480 ($y + 50) 120 200 7 10 $mk $p[2] -nameSize 26 -fr 22
  T 1720 ($y + 150) $p[3] 30 700 $GOLDT 'start'
}
T 1200 1110 'Dedos 1 – 2 – 3 – 4 – 5 en las tres: solo cambian las teclas' 30 500 $GRAY 'middle' $FI
Save 'P3_transporte'

# 32 · Pentatónica ----------------------------------------------------------------------
NewSvg 2400 900 'La pentatónica de La menor'
Head 'La pentatónica de La menor' 'La escala menor sin el II y el VI grado · cinco notas, cinco dedos'
$mk = @{}; $o = @(5, 7, 8, 9, 11); for ($j = 0; $j -lt 5; $j++) { $mk[$o[$j]] = @{ fill = $GOLD; lbl = (NoteName $o[$j]); fing = $j + 1 } }
$mk[6] = @{ fill = '#E6E1D6'; lbl = 'SI' }; $mk[10] = @{ fill = '#E6E1D6'; lbl = 'FA' }
Kb 400 300 200 300 5 8 $mk -nameSize 34
T 1200 680 'Dorado = pentatónica · gris = las notas que se quitan (SI y FA)' 30 500 $GRAY 'middle' $FI
T 1200 760 'Acompañamiento para improvisar: Am – F – G – Am' 36 700 $INK
T 1200 830 'Empieza y termina en LA · deja silencios · pregunta y respuesta' 30 500 $GRAY 'middle' $FI
Save 'P3_pentatonica'

# 33 · Minueto en Sol --------------------------------------------------------------------
$script:NMODE = 'plain'
NewSvg 2400 1560 'Minueto en Sol (Christian Petzold), versión simplificada'
$sp = 30
function Mq($a, $f) { @{ a = $a; t = 'q'; f = $f } }
function Me($a, $f, $bb) { @{ a = $a; t = 'e'; f = $f; b = $bb } }
$MR = @(
  @((Mq 15 5), (Me 11 1 1), (Me 12 2 1), (Me 13 3 2), (Me 14 4 2)),
  @((Mq 15 5), (Mq 11 1), (Mq 11 1)),
  @((Mq 16 3), (Me 14 1 3), (Me 15 2 3), (Me 16 3 4), (Me 17 4 4)),
  @((Mq 18 5), (Mq 11 1), (Mq 11 1)),
  @((Mq 14 4), (Me 15 5 5), (Me 14 4 5), (Me 13 3 6), (Me 12 2 6)),
  @((Mq 13 3), (Me 14 4 7), (Me 13 3 7), (Me 12 2 8), (Me 11 1 8)),
  @((Mq 10 1), (Me 11 2 9), (Me 12 3 9), (Me 13 4 10), (Me 11 2 10)),
  @(, @{ a = 12; t = 'hd'; f = 3 }))
$ML = @(4, -1, 0, -1, -2, -3, 1, 1)
$KS = @(@{ k = @(, @(17, '#')) }, @{ k = @(, @(3, '#')) })
for ($s = 0; $s -lt 2; $s++) {
  $rh = @(); $lh = @(); for ($k = $s * 4; $k -lt $s * 4 + 4; $k++) { $rh += , $MR[$k]; $lh += , @(@{ a = $ML[$k]; t = 'hd' }) }
  $y = 330 + $s * 680
  System 120 $y 2160 $sp 3 $(if ($s -eq 0) { 3 } else { $null }) 4 @(@{ clef = 'G'; bars = $rh; key = $KS[0].k }, @{ clef = 'F'; bars = $lh; key = $KS[1].k }) @{ gap = 12 * $sp; open = ($s -eq 0) }
  FingRow 0 ($y - 4.4 * $sp) $sp 'dedo'
}
T 120 120 'Minueto en Sol · Christian Petzold' 44 700 $INK 'start'; T 120 165 'Sol mayor · 3/4 · Moderato · versión simplificada AMA (dominio público)' 28 500 $GRAY 'start' $FI
$script:NMODE = 'black'
Save 'P3_minueto'

# 34 · Tocamos juntos ----------------------------------------------------------------------
NewSvg 2400 1000 'Cuatro manos y el piano en la banda'
Head 'Tocamos juntos' 'Cuatro manos · el piano en la banda'
Kb 200 220 70 220 (-7) 29 @{}
Rc 200 450 1015 70 '#DCEBF7' $INK 2 12; T 707 497 'Secondo · acordes y bajo (izquierda)' 30 700 $INK
Rc 1215 450 1015 70 '#FBF1D3' $INK 2 12; T 1722 497 'Primo · melodía una octava arriba (derecha)' 30 700 $INK
T 200 620 'En la banda: cada uno en su lugar' 38 700 $INK 'start'
T 200 680 'grave' 28 700 $GRAY 'start'; T 2230 680 'agudo' 28 700 $GRAY 'end'; Arrow 320 672 2100 672 $GRAY 3 14
Rc 200 710 600 70 '#F9D9D7' $INK 2 12; T 500 757 'Bajo eléctrico' 30 700 $INK
Rc 650 800 1000 70 '#FBF1D3' $INK 2 12; T 1150 847 'Piano: acordes en el registro medio' 30 700 $INK
Rc 1300 890 930 70 '#DCEFE0' $INK 2 12; T 1765 937 'Voz o melodía' 30 700 $INK
Save 'P3_tocamos_juntos'

# 36 · Resumen de los tres niveles ------------------------------------------------------------
NewSvg 2400 1180 'Acordes y escalas de los tres niveles'
Head 'Lo que aprendí en los tres niveles de piano' 'Escalas, acordes y progresiones'
$cards = @(
  @('Escalas mayores', @('Do · sin alteraciones', 'Sol · FA♯', 'Re · FA♯ DO♯', 'La · FA♯ DO♯ SOL♯', 'Fa · SI♭')),
  @('Escalas menores', @('La menor · sin alteraciones', 'Mi menor · FA♯', 'Pentatónica de La menor', 'Escala cromática')),
  @('Acordes', @('Mayores: C D E F G A', 'Menores: Am Dm Em Cm', 'Disminuido: B°', 'Séptimas: G7 D7 C7')),
  @('Armonía', @('Inversiones: C · C/E · C/G', 'I – IV – V7 – I', 'I – V – vi – IV', 'Cadencia V7 → I')),
  @('Técnica', @('Manos juntas: contrario y paralelo', 'Legato y staccato', 'Pedal sincopado', 'Caída y elevación')),
  @('Música', @('Lectura en dos claves', 'Estilos: balada, pop, vals, caribeño', 'Transporte y armonización', 'Improvisación')))
for ($i = 0; $i -lt 6; $i++) {
  $x = 60 + ($i % 3) * 770; $y = 190 + [Math]::Floor($i / 3) * 480
  Rc $x $y 730 440 $PAPER $GOLD 3 22; T ($x + 40) ($y + 70) $cards[$i][0] 40 700 $INK 'start'
  $k = 0; foreach ($l in $cards[$i][1]) { T ($x + 40) ($y + 150 + $k * 70) ('• ' + $l) 32 600 $INK 'start'; $k++ }
}
Save 'P3_resumen'
"N3 ok"
