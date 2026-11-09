# Láminas del Nivel 2 de piano (clases 13–24). Uso:
#   powershell -File contenido/piano/generador/laminas_n2.ps1
. (Join-Path $PSScriptRoot 'lib2.ps1')
$script:OUT = Join-Path $PSScriptRoot '..\nivel-2\img'
New-Item -ItemType Directory -Force $script:OUT | Out-Null
$script:NMODE = 'color'
function E2($a, $t = 'q', $f = $null) { @{ a = $a; t = $t; f = $f } }
function Ch($as, $t = 'w', $ch = $null) { @{ as = $as; t = $t; ch = $ch } }
function TS($pts, $types, $yy) {
  for ($i = 0; $i -lt $types.Count; $i++) {
    $x1 = $pts[$i]; $x2 = $pts[$i + 1]; $mid = ($x1 + $x2) / 2; $col = $GRAY; if ($types[$i] -eq 'S') { $col = $GOLD }
    P ('M{0} {1} Q{2} {3} {4} {1}' -f (N ($x1 + 18)), (N $yy), (N $mid), (N ($yy - 80)), (N ($x2 - 18))) 'none' $col 5 'stroke-linecap="round"'
    C $mid ($yy - 64) 28 $col; T $mid ($yy - 51) $types[$i] 34 700 '#FFFFFF'
  }
}

# 13 · Teclas negras ---------------------------------------------------------
NewSvg 2400 780 'Las teclas negras tienen dos nombres'
Head 'Las teclas negras tienen dos nombres' '♯ sube a la tecla vecina de la derecha · ♭ baja a la de la izquierda'
$bm = @{ 7 = @{ lbl = @('DO♯', 'RE♭') }; 8 = @{ lbl = @('RE♯', 'MI♭') }; 10 = @{ lbl = @('FA♯', 'SOL♭') }; 11 = @{ lbl = @('SOL♯', 'LA♭') }; 12 = @{ lbl = @('LA♯', 'SI♭') } }
Kb2 200 200 250 460 7 8 @{} $bm -showNames -nameSize 40
T 1200 730 'Entre MI–FA y SI–DO no hay tecla negra: están a un semitono.' 32 500 $GRAY 'middle' $FI
Save 'P2_teclas_negras'

# 13 · Alteraciones en el pentagrama -------------------------------------------
NewSvg 2400 640 'Sostenido, bemol y becuadro'
Head 'Sostenido, bemol y becuadro' 'Se escriben delante de la nota y valen hasta el final del compás'
$bars = @(
  @((E2 10 'h'), @{ a = 10; t = 'h'; acc = @{ 10 = '#' } }),
  @((E2 13 'h'), @{ a = 13; t = 'h'; acc = @{ 13 = 'b' } }),
  @(@{ a = 10; t = 'h'; acc = @{ 10 = '#' } }, @{ a = 10; t = 'h'; acc = @{ 10 = 'n' } })
)
System 100 230 2200 40 4 $null $null @(@{ clef = 'G'; bars = $bars })
NameRow 0 (230 + 4 * 40 + 95) 46 40
$lab = @('♯ sube un semitono: FA → FA♯', '♭ baja un semitono: SI → SI♭', '♮ anula: FA♯ → FA'); $bw = (2300 - (100 + 3.4 * 40)) / 3
for ($k = 0; $k -lt 3; $k++) { T (100 + 3.4 * 40 + ($k + 0.5) * $bw) 600 $lab[$k] 32 600 $INK }
Save 'P2_alteraciones'

# 14 · Intervalos ----------------------------------------------------------------
NewSvg 2400 700 'Los intervalos desde DO'
Head 'Los intervalos desde DO' 'Se cuentan las dos notas · en el teclado, además, los semitonos'
$bars = @(); for ($k = 1; $k -le 7; $k++) { $bars += , @(@{ as = @(7, (7 + $k)); t = 'w' }) }
System 100 270 2200 40 4 $null $null @(@{ clef = 'G'; bars = $bars })
$nm = @('2.ª', '3.ª', '4.ª', '5.ª', '6.ª', '7.ª', '8.ª'); $sm = @(2, 4, 5, 7, 9, 11, 12); $k = 0
foreach ($v in $script:SYS[0].evs) { T ($v.cx + 0.3 * 40) 215 $nm[$k] 40 700 $GOLDT; T ($v.cx + 0.3 * 40) 550 ('DO – ' + (NoteName (7 + $k + 1))) 34 700 $INK; T ($v.cx + 0.3 * 40) 620 "$($sm[$k]) semitonos" 28 600 $GRAY; $k++ }
Save 'P2_intervalos'

# 14 · Clave de fa ----------------------------------------------------------------
NewSvg 2400 760 'La clave de fa'
Head 'La clave de fa' 'Sus dos puntos rodean la 4.ª línea: ahí vive FA, justo debajo del DO central'
$bars = @(); foreach ($a in -3, -1, 1, 3, 5, -2, 0, 2, 4) { $bars += , @((E2 $a 'w')) }
System 300 280 2000 42 4 $null $null @(@{ clef = 'F'; bars = $bars })
NameRow 0 (280 + 4 * 42 + 100) 48 42
$x0 = $script:SYS[0].evs[0].cx; $x4 = $script:SYS[0].evs[4].cx; $x5 = $script:SYS[0].evs[5].cx; $x8 = $script:SYS[0].evs[8].cx
P ('M{0} 245 L{0} 225 L{1} 225 L{1} 245' -f (N ($x0 - 40)), (N ($x4 + 40))) 'none' $GOLD 5; T (($x0 + $x4) / 2) 205 'Líneas: SOL – SI – RE – FA – LA' 32 700 $GOLDT
P ('M{0} 245 L{0} 225 L{1} 225 L{1} 245' -f (N ($x5 - 40)), (N ($x8 + 40))) 'none' $GRAY 5; T (($x5 + $x8) / 2) 205 'Espacios: LA – DO – MI – SOL' 32 700 $GRAY
T 270 (280 + 42 + 12) 'FA →' 34 700 $NC.FA 'end'
T 1200 700 'La clave de fa es la clave de la mano izquierda.' 32 500 $GRAY 'middle' $FI
Save 'P2_clave_fa'

# 14 · Gran pentagrama --------------------------------------------------------------
NewSvg 2400 1080 'El gran pentagrama'
Head 'El gran pentagrama' 'Arriba la mano derecha (clave de sol) · abajo la mano izquierda (clave de fa)'
$sp = 36; $y = 300
$rh = @(@((E2 7 'q' 1), (E2 8 'q' 2), (E2 9 'q' 3), (E2 10 'q' 4)), @((E2 11 'h' 5), @{ t = 'hr' }), @(, (E2 7 'w')))
$lh = @(@((E2 0 'q' 5), (E2 1 'q' 4), (E2 2 'q' 3), (E2 3 'q' 2)), @((E2 4 'h' 1), @{ t = 'hr' }), @(, (E2 7 'w')))
System 200 $y 2000 $sp 4 $null $null @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 12 * $sp }
FingRow 0 ($y - 2.4 * $sp) $sp 'dedo'
NameRow 0 ($y + 4 * $sp + 2.6 * $sp) 40 $sp
NameRow 1 ($y + 12 * $sp + 4 * $sp + 2.4 * $sp) 40 $sp
FingRow 1 ($y + 12 * $sp + 4 * $sp + 4.4 * $sp) $sp 'dedo'
$cx = $script:SYS[0].evs[-1].cx
T ($cx - 90) ($y + 8.2 * $sp) 'DO central: la misma tecla en las dos claves →' 30 700 $GOLDT 'end'
T 200 1030 'Mano izquierda en posición de DO: DO 2.º espacio · RE 3.ª línea · MI 3.er espacio · FA 4.ª línea · SOL 4.º espacio' 28 500 $GRAY 'start' $FI
Save 'P2_gran_pentagrama'

# 14 · Himno con dos claves -----------------------------------------------------------
NewSvg 2400 1600 'Himno de la alegría con gran pentagrama'
$sp = 30
$m = @(@(9, 9, 10, 11), @(11, 10, 9, 8), @(7, 7, 8, 9), @(9, 8, 8), @(9, 9, 10, 11), @(11, 10, 9, 8), @(7, 7, 8, 9), @(8, 7, 7))
$lhn = @(0, 4, 0, 4, 0, 4, 0, 0)
for ($s = 0; $s -lt 2; $s++) {
  $rh = @(); $lh = @()
  for ($b = $s * 4; $b -lt $s * 4 + 4; $b++) {
    $bar = @(); $ns = $m[$b]
    if ($ns.Count -eq 4) { foreach ($a in $ns) { $bar += , (E2 $a 'q' ($a - 6)) } } else { $bar += , (E2 $ns[0] 'q' ($ns[0] - 6)); $bar += , (E2 $ns[1] 'q' ($ns[1] - 6)); $bar += , (E2 $ns[2] 'h' ($ns[2] - 6)) }
    $rh += , $bar; $lh += , @((E2 $lhn[$b] 'w' $(if ($lhn[$b] -eq 0) { 5 } else { 1 })))
  }
  $y = 120 + $s * 780
  System 120 $y 2160 $sp 4 $(if ($s -eq 0) { 4 } else { $null }) 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 12 * $sp; open = ($s -eq 0) }
  FingRow 0 ($y - 2.6 * $sp) $sp 'dedo'
  NameRow 0 ($y + 4 * $sp + 2.4 * $sp) 36 $sp
  NameRow 1 ($y + 16 * $sp + 2.6 * $sp) 36 $sp
  FingRow 1 ($y + 16 * $sp + 4.6 * $sp) $sp 'dedo'
}
Save 'P2_himno_dos_claves'

# 15 · Escala mayor ------------------------------------------------------------------
NewSvg 2400 760 'La fórmula de la escala mayor'
Head 'La fórmula de la escala mayor: T – T – S – T – T – T – S' 'Sol mayor: la fórmula pide FA♯ (tecla negra)'
$m = @{}; foreach ($a in 4, 5, 6, 7, 8, 9, 11) { $m[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a) } }
Kb2 240 330 240 340 4 8 $m @{ 10 = @{ fill = $NC.FA; lbl = @('FA♯') } } -nameSize 40
$pts = @(); foreach ($a in 4, 5, 6, 7, 8, 9) { $pts += Kx 240 240 4 $a }; $pts += BX 240 240 4 10; $pts += Kx 240 240 4 11
TS $pts @('T', 'T', 'S', 'T', 'T', 'T', 'S') 315
T 1200 730 'T = tono (dos semitonos) · S = semitono (la tecla vecina)' 30 500 $GRAY 'middle' $FI
Save 'P2_escala_mayor'

# 16 · Acordes vecinos (mano izquierda) -----------------------------------------------
NewSvg 2400 720 'Acordes vecinos en la mano izquierda'
Head 'Acordes vecinos · mano izquierda' 'Del acorde de DO solo se mueven dos dedos'
$pan = @(@('C', @(0, 2, 4), @(5, 3, 1), 'DO – MI – SOL'), @('F/C', @(0, 3, 5), @(5, 2, 1), 'DO – FA – LA'), @('G/B', @(-1, 1, 4), @(5, 3, 1), 'SI – RE – SOL'))
for ($i = 0; $i -lt 3; $i++) {
  $p = $pan[$i]; $x0 = 80 + $i * 780; $m = @{}
  for ($j = 0; $j -lt 3; $j++) { $a = $p[1][$j]; $m[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = $p[2][$j] } }
  T ($x0 + 315) 220 $p[0] 56 700
  Kb $x0 330 78.75 300 (-1) 8 $m -nameSize 24
  T ($x0 + 315) 690 ('{0} · dedos {1}' -f $p[3], ($p[2] -join '-')) 30 700 $GRAY
}
Save 'P2_acordes_vecinos_mi'

# 16 · Paso a paso ------------------------------------------------------------------
NewSvg 2400 1500 'Paso a paso (composición AMA)'
$sp = 30
$C = @(0, 2, 4); $F = @(0, 3, 5); $G = @(-1, 1, 4)
$R = @(
  @((E2 11 'q' 5), (E2 9 'q' 3), (E2 7 'q' 1), (E2 9 'q' 3)), @((E2 10 'q' 4), (E2 10 'q' 4), (E2 10 'h' 4)), @((E2 8 'q' 2), (E2 8 'q' 2), (E2 11 'h' 5)), @((E2 9 'h' 3), (E2 7 'h' 1)),
  @((E2 11 'q' 5), (E2 9 'q' 3), (E2 7 'q' 1), (E2 9 'q' 3)), @((E2 10 'q' 4), (E2 10 'q' 4), (E2 7 'h' 1)), @((E2 11 'h' 5), (E2 8 'h' 2)), @(, (E2 7 'w' 1)))
$Lc = @(@($C, 'C'), @($F, 'F'), @($G, 'G'), @($C, 'C'), @($C, 'C'), @($F, 'F'), @($G, 'G'), @($C, 'C'))
for ($s = 0; $s -lt 2; $s++) {
  $rh = @(); $lh = @()
  for ($b = $s * 4; $b -lt $s * 4 + 4; $b++) { $bar = @($R[$b]); $bar[0] = $bar[0].Clone(); $bar[0].ch = $Lc[$b][1]; $rh += , $bar; $lh += , @((Ch $Lc[$b][0] 'w')) }
  $y = 170 + $s * 690
  System 120 $y 2160 $sp 4 $(if ($s -eq 0) { 4 } else { $null }) 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 12 * $sp; open = ($s -eq 0) }
  FingRow 0 ($y - 4.2 * $sp) $sp 'dedo'
  NameRow 0 ($y + 4 * $sp + 2.4 * $sp) 36 $sp
}
Save 'P2_paso_a_paso'

# 17 · Patrones de la mano izquierda ---------------------------------------------------
NewSvg 2400 1180 'Tres patrones para la mano izquierda'
Head 'Tres patrones para la mano izquierda' 'Las mismas notas del acorde, con distinto ritmo'
$sp = 30
$p1 = @(@((E2 0 'q' 5), (E2 4 'q' 1), (E2 0 'q' 5), (E2 4 'q' 1)), @((E2 0 'q' 5), (E2 4 'q' 1), (E2 0 'q' 5), (E2 4 'q' 1)))
$p2 = @(@(@{ a = 0; t = 'e'; b = 1; f = 5 }, @{ a = 4; t = 'e'; b = 1; f = 1 }, @{ a = 2; t = 'e'; b = 2; f = 3 }, @{ a = 4; t = 'e'; b = 2; f = 1 }, @{ a = 0; t = 'e'; b = 3; f = 5 }, @{ a = 4; t = 'e'; b = 3; f = 1 }, @{ a = 2; t = 'e'; b = 4; f = 3 }, @{ a = 4; t = 'e'; b = 4; f = 1 }),
        @(@{ a = 0; t = 'e'; b = 5; f = 5 }, @{ a = 4; t = 'e'; b = 5; f = 1 }, @{ a = 2; t = 'e'; b = 6; f = 3 }, @{ a = 4; t = 'e'; b = 6; f = 1 }, @{ a = 0; t = 'e'; b = 7; f = 5 }, @{ a = 4; t = 'e'; b = 7; f = 1 }, @{ a = 2; t = 'e'; b = 8; f = 3 }, @{ a = 4; t = 'e'; b = 8; f = 1 }))
$p3 = @(@((E2 0 'q' 5), @{ as = @(2, 4); t = 'q'; f = '3·1' }, @{ as = @(2, 4); t = 'q'; f = '3·1' }), @((E2 0 'q' 5), @{ as = @(2, 4); t = 'q'; f = '3·1' }, @{ as = @(2, 4); t = 'q'; f = '3·1' }))
$rows = @(@('1 · Bajo alterno (4/4)', $p1, 4, 4), @('2 · Acorde quebrado (4/4)', $p2, 4, 4), @('3 · Vals (3/4)', $p3, 3, 3))
for ($k = 0; $k -lt 3; $k++) {
  $y = 260 + $k * 320
  T 120 ($y - 50) $rows[$k][0] 36 700 $INK 'start'
  System 120 $y 2160 $sp $rows[$k][2] $rows[$k][3] 4 @(@{ clef = 'F'; bars = $rows[$k][1] })
  FingRow 0 ($y + 4 * $sp + 2.4 * $sp) $sp 'dedo'
}
Save 'P2_patrones_mi'

# 18 · Puntillo y ligadura ---------------------------------------------------------
NewSvg 2400 900 'El puntillo y la ligadura de prolongación'
Head 'El puntillo y la ligadura de prolongación' 'El puntillo suma la mitad · la ligadura une dos notas iguales'
$sp = 36
$b1 = @(@(, @{ a = 11; t = 'hd'; s = 'taa-aa-aa' }), @(@{ a = 11; t = 'qd'; s = 'ta-a' }, @{ a = 12; t = 'e'; s = 'ti' }, @{ a = 11; t = 'q'; s = 'ta' }))
System 120 240 1000 $sp 3 3 4 @(@{ clef = 'G'; bars = $b1 })
TextRow 0 (240 + 4 * $sp + 2.4 * $sp) $sp 's'
T 620 (240 + 4 * $sp + 4.6 * $sp) 'blanca con puntillo = 2 + 1 = 3 · negra con puntillo + corchea = 2' 28 600 $INK
$b2 = @(@(@{ a = 9; t = 'h'; tie = $true; s = 'taa-aa' }, @{ a = 9; t = 'q'; s = '(-aa)' }, @{ t = 'qr'; s = 'sh' }), @(@{ t = 'hr'; s = 'sh' }, @{ a = 11; t = 'h'; tie = $true; s = 'taa-aa' }), @(@{ a = 11; t = 'h'; s = '(-aa-aa)' }, @{ t = 'hr'; s = 'sh' }))
System 1220 240 1080 $sp 4 4 4 @(@{ clef = 'G'; bars = $b2 })
TextRow 0 (240 + 4 * $sp + 2.4 * $sp) $sp 's'
T 1760 (240 + 4 * $sp + 4.6 * $sp) 'la 2.ª nota ligada no se toca: se suman los tiempos' 28 600 $INK
Rc 120 600 2180 220 $PAPER $GOLD 3 20
T 160 670 'Blanca con puntillo  →  taa-aa-aa  =  3 tiempos (llena un compás de 3/4)' 34 700 $INK 'start'
T 160 730 'Negra con puntillo   →  ta-a  =  1½ tiempos' 34 700 $INK 'start'
T 160 790 'Blanca ligada a negra  →  2 + 1  =  3 tiempos' 34 700 $INK 'start'
Save 'P2_puntillo_ligadura'

# 18 · Arpegio a dos manos ----------------------------------------------------------
NewSvg 2400 780 'Arpegio de DO a dos manos'
Head 'Arpegio de DO a dos manos' 'La mano que termina pasa la música a la otra'
$m = @{}; $o = @(0, 2, 4, 7, 9, 11); $fg = @(5, 3, 1, 1, 3, 5)
for ($k = 0; $k -lt 6; $k++) { $m[$o[$k]] = @{ fill = $NC[(NoteName $o[$k])]; lbl = (NoteName $o[$k]); fing = $fg[$k] } }
Kb 150 300 140 320 0 15 $m -nameSize 30
T (Kx 150 140 0 2) 190 'Mano izquierda · 5 – 3 – 1' 34 700; T (Kx 150 140 0 9) 190 'Mano derecha · 1 – 3 – 5' 34 700
for ($k = 0; $k -lt 6; $k++) { Num (Kx 150 140 0 $o[$k]) 680 ($k + 1) 28; if ($k -lt 5) { Arrow ((Kx 150 140 0 $o[$k]) + 36) 680 ((Kx 150 140 0 $o[$k + 1]) - 36) 680 $GOLDT 4 14 } }
T 1200 750 'Sube 1 → 6 y vuelve 6 → 1 sin cortar el sonido' 30 500 $GRAY 'middle' $FI
Save 'P2_arpegio_dos_manos'

# 18 · Noche de paz ---------------------------------------------------------------
NewSvg 2400 1500 'Noche de paz (Franz Gruber, 1818)'
$sp = 30
$C = @(0, 2, 4); $G = @(-1, 1, 4)
$R = @(
  @(@{ a = 11; t = 'qd'; f = 3 }, @{ a = 12; t = 'e'; f = 4 }, @{ a = 11; t = 'q'; f = 3 }), @(, @{ a = 9; t = 'hd'; f = 1 }),
  @(@{ a = 11; t = 'qd'; f = 3 }, @{ a = 12; t = 'e'; f = 4 }, @{ a = 11; t = 'q'; f = 3 }), @(, @{ a = 9; t = 'hd'; f = 1 }),
  @(@{ a = 15; t = 'h'; f = 5 }, @{ a = 15; t = 'q'; f = 5 }), @(, @{ a = 13; t = 'hd'; f = 3 }),
  @(@{ a = 14; t = 'h'; f = 4 }, @{ a = 14; t = 'q'; f = 4 }), @(, @{ a = 11; t = 'hd'; f = 1 }))
$Lc = @(@($C, 'C'), @($C, ''), @($C, ''), @($C, ''), @($G, 'G'), @($G, ''), @($C, 'C'), @($C, ''))
for ($s = 0; $s -lt 2; $s++) {
  $rh = @(); $lh = @()
  for ($b = $s * 4; $b -lt $s * 4 + 4; $b++) { $bar = @($R[$b]); $bar[0] = $bar[0].Clone(); if ($Lc[$b][1]) { $bar[0].ch = $Lc[$b][1] }; $rh += , $bar; $lh += , @((Ch $Lc[$b][0] 'hd')) }
  $y = 170 + $s * 660
  System 120 $y 2160 $sp 3 $(if ($s -eq 0) { 3 } else { $null }) 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 12 * $sp; open = ($s -eq 0) }
  FingRow 0 ($y - 4.2 * $sp) $sp 'dedo'
  NameRow 0 ($y + 4 * $sp + 2.4 * $sp) 36 $sp
}
T 2280 1470 'Melodía: Franz Gruber (1818), dominio público · versión AMA en 3/4' 26 500 $GRAY 'end' $FI
Save 'P2_noche_de_paz'

# 19 · Escalas de Do y Sol con cada mano ---------------------------------------------
NewSvg 2400 1160 'Escalas de Do y Sol mayor'
Head 'Escalas de Do y Sol mayor · cada mano' 'Arriba, los dedos de la mano derecha · abajo, los de la mano izquierda'
$rows = @(
  @('Do mayor', 7, @(7, 8, 9, 10, 11, 12, 13, 14), @{}, 250),
  @('Sol mayor', 4, @(4, 5, 6, 7, 8, 9, 11), @{ 10 = @{ fill = $NC.FA; lbl = @('FA♯'); fing = 4 } }, 740)
)
$md = @(1, 2, 3, 1, 2, 3, 4, 5); $mi = @(5, 4, 3, 2, 1, 3, 2, 1)
foreach ($r in $rows) {
  $first = $r[1]; $y = $r[4]; $m = @{}; $k = 0
  $seq = @(); foreach ($a in $r[2]) { $seq += $a }; if ($r[0] -eq 'Sol mayor') { $seq = @(4, 5, 6, 7, 8, 9, 'F#', 11) }
  for ($k = 0; $k -lt 8; $k++) { $a = $seq[$k]; if ($a -ne 'F#') { $m[[int]$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = $md[$k] } } }
  T 90 ($y + 150) $r[0] 40 700 $INK 'start'
  Kb2 520 $y 210 260 $first 8 $m $r[3] -nameSize 34
  for ($k = 0; $k -lt 8; $k++) { $a = $seq[$k]; $cx = $(if ($a -eq 'F#') { BX 520 210 $first 10 } else { Kx 520 210 $first ([int]$a) }); Num $cx ($y + 300) $mi[$k] 26 }
  T 500 ($y - 40) 'MD' 28 700 $GOLDT 'end'; T 500 ($y + 310) 'MI' 28 700 $GOLDT 'end'
}
Save 'P2_escalas_do_sol'

# 19 · Lectura sin color -------------------------------------------------------------
$script:NMODE = 'plain'
NewSvg 2400 1080 'Lectura sin color en posición de SOL'
Head 'Lectura sin color · posición de SOL' 'Escribe el nombre de cada nota en su casilla y después tócala'
$sp = 32
$M = @(@(11, 12, 13, 14), @(15, 13), @(14, 13, 12, 11), @(, 12), @(13, 14, 15, 13), @(14, 12), @(13, 12, 11, 12), @(, 11))
$Tp = @('q', 'h', 'q', 'w', 'q', 'h', 'q', 'w')
for ($s = 0; $s -lt 2; $s++) {
  $bars = @(); for ($b = $s * 4; $b -lt $s * 4 + 4; $b++) { $bar = @(); foreach ($a in $M[$b]) { $bar += , (E2 $a $Tp[$b] ($a - 10)) }; $bars += , $bar }
  $y = 260 + $s * 420
  System 120 $y 2160 $sp 4 $(if ($s -eq 0) { 4 } else { $null }) 4 @(@{ clef = 'G'; bars = $bars }) @{ open = ($s -eq 0) }
  FingRow 0 ($y - 2.4 * $sp) $sp 'dedo'
  foreach ($v in $script:SYS[0].evs) { Rc ($v.cx - 40) ($y + 4 * $sp + 1.6 * $sp) 80 56 '#FFFFFF' $GRAY 2 8 }
}
$script:NMODE = 'color'
Save 'P2_lectura_sin_color'

# 20 · Tríadas sobre los grados ----------------------------------------------------
NewSvg 2400 760 'Tríadas sobre los grados de Do mayor'
Head 'Tríadas sobre los grados de Do mayor' 'Tecla sí, tecla no · solo notas de la escala'
$bars = @(); for ($a = 7; $a -le 13; $a++) { $bars += , @(@{ as = @($a, ($a + 2), ($a + 4)); t = 'w' }) }
System 100 290 2200 38 4 $null $null @(@{ clef = 'G'; bars = $bars })
$rom = @('I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'); $nm = @('C', 'Dm', 'Em', 'F', 'G', 'Am', 'B°'); $ty = @('mayor', 'menor', 'menor', 'mayor', 'mayor', 'menor', 'disminuido'); $k = 0
foreach ($v in $script:SYS[0].evs) { T $v.cx 225 $rom[$k] 46 700 $GOLDT; T $v.cx 600 $nm[$k] 46 700 $INK; T $v.cx 650 $ty[$k] 28 600 $GRAY; $k++ }
T 1200 730 'Mayúscula = acorde mayor · minúscula = menor · ° = disminuido' 30 500 $GRAY 'middle' $FI
Save 'P2_triadas_grados'

# 20 · Lectura sorpresa ----------------------------------------------------------------
$script:NMODE = 'plain'
NewSvg 2400 820 'Lectura sorpresa con las dos manos'
Head 'Lectura sorpresa · sin color' 'Primero los nombres, después el ritmo con sílabas y al final, despacio, en el piano'
$sp = 32
$rh = @(@((E2 9), (E2 8), (E2 7), (E2 8)), @((E2 9), (E2 9), (E2 9 'h')), @((E2 8), (E2 8), (E2 9), (E2 8)), @(, (E2 7 'w')))
$lh = @(@(, (E2 0 'w')), @(, (E2 0 'w')), @(, (E2 4 'w')), @(, (E2 0 'w')))
System 160 260 2120 $sp 4 4 4 @(@{ clef = 'G'; bars = $rh }, @{ clef = 'F'; bars = $lh }) @{ gap = 11 * $sp }
$script:NMODE = 'color'
Save 'P2_lectura_sorpresa'

# 21 · Pedal sincopado ------------------------------------------------------------------
NewSvg 2400 760 'El pedal sincopado'
Head 'El pedal sincopado: toco – levanto – bajo' 'El pedal se cambia justo después de tocar el acorde nuevo'
$x0 = 360; $sw = 480; $chs = @('C', 'F', 'C', 'G')
T 330 300 'Manos' 34 700 $INK 'end'; T 330 520 'Pedal' 34 700 $INK 'end'
for ($i = 0; $i -lt 4; $i++) { $xs = $x0 + $i * $sw; Rc $xs 250 $sw 80 '#FBF1D3' $GOLD 2.5 12; T ($xs + 30) 304 $chs[$i] 40 700 $INK 'start'; L $xs 230 $xs 600 $GRAY 2 'stroke-dasharray="8 8"' }
$d = 'M{0} 450 L{0} 520' -f $x0
for ($i = 1; $i -lt 4; $i++) { $xs = $x0 + $i * $sw; $d += (' L{0} 520 L{1} 470 L{2} 520' -f ($xs + 30), ($xs + 50), ($xs + 70)) }
$d += (' L{0} 520 L{0} 450' -f ($x0 + 4 * $sw - 10))
P $d 'none' $INK 6 'stroke-linejoin="round"'
for ($i = 1; $i -lt 4; $i++) { $xs = $x0 + $i * $sw; T ($xs + 50) 575 'levanto y bajo' 26 700 $GOLDT; T ($xs + 6) 220 'toco' 26 700 $GOLDT 'start' }
T $x0 575 'bajo' 26 700 $GOLDT 'start'
T 1200 690 'Talón en el suelo · la punta del pie sube y baja sin golpear' 30 500 $GRAY 'middle' $FI
Save 'P2_pedal'

# 22 · Acordes vecinos (mano derecha) -----------------------------------------------------
NewSvg 2400 700 'Acordes vecinos con la mano derecha'
Head 'Acordes vecinos · mano derecha' 'Progresión popular C – G – Am – F casi sin mover la mano'
$pan = @(@('C', @(7, 9, 11), @(1, 3, 5)), @('G/B', @(6, 8, 11), @(1, 2, 5)), @('Am/C', @(7, 9, 12), @(1, 2, 5)), @('F/C', @(7, 10, 12), @(1, 3, 5)))
for ($i = 0; $i -lt 4; $i++) {
  $p = $pan[$i]; $x0 = 40 + $i * 590; $m = @{}
  for ($j = 0; $j -lt 3; $j++) { $a = $p[1][$j]; $m[$a] = @{ fill = $NC[(NoteName $a)]; lbl = (NoteName $a); fing = $p[2][$j] } }
  T ($x0 + 272) 210 $p[0] 50 700
  Kb $x0 320 68 280 6 8 $m -nameSize 20
  T ($x0 + 272) 660 (($p[1] | ForEach-Object { NoteName $_ }) -join ' – ') 30 700 $GRAY
}
Save 'P2_acordes_vecinos_md'

"N2 parte A ok"
