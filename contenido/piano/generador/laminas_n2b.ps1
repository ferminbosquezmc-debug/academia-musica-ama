# Láminas del Nivel 2 de piano (segunda parte: clases 22–24)
. (Join-Path $PSScriptRoot 'lib2.ps1')
$script:OUT = Join-Path $PSScriptRoot '..\nivel-2\img'
$script:NMODE = 'color'

# 22 · Cascabeles -----------------------------------------------------------------------
NewSvg 2400 1520 'Cascabeles (James Lord Pierpont, 1857)'
$sp = 28
function Cb($a, $t, $ch = $null, $b = $null) { $h = @{ a = $a; t = $t; f = ($a - 6) }; if ($ch) { $h.ch = $ch }; if ($b) { $h.b = $b }; $h }
$CB = @(
  @((Cb 9 'q' 'C'), (Cb 9 'q'), (Cb 9 'h')), @((Cb 9 'q' 'C'), (Cb 9 'q'), (Cb 9 'h')), @((Cb 9 'q' 'C'), (Cb 11 'q'), (Cb 7 'qd'), (Cb 8 'e')), @(, (Cb 9 'w' 'C')),
  @((Cb 10 'q' 'F'), (Cb 10 'q'), (Cb 10 'qd'), (Cb 10 'e')), @((Cb 10 'q' 'C'), (Cb 9 'q'), (Cb 9 'q'), (Cb 9 'e' $null 1), (Cb 9 'e' $null 1)), @((Cb 9 'q' 'G'), (Cb 8 'q'), (Cb 8 'q'), (Cb 9 'q')), @((Cb 8 'h' 'G'), (Cb 11 'h')),
  @((Cb 9 'q' 'C'), (Cb 9 'q'), (Cb 9 'h')), @((Cb 9 'q' 'C'), (Cb 9 'q'), (Cb 9 'h')), @((Cb 9 'q' 'C'), (Cb 11 'q'), (Cb 7 'qd'), (Cb 8 'e')), @(, (Cb 9 'w' 'C')),
  @((Cb 10 'q' 'F'), (Cb 10 'q'), (Cb 10 'q'), (Cb 10 'q')), @((Cb 10 'q' 'C'), (Cb 9 'q'), (Cb 9 'q'), (Cb 9 'e' $null 2), (Cb 9 'e' $null 2)), @((Cb 11 'q' 'G'), (Cb 11 'q'), (Cb 10 'q'), (Cb 8 'q')), @(, (Cb 7 'w' 'C')))
for ($s = 0; $s -lt 4; $s++) {
  $bars = @(); for ($b = $s * 4; $b -lt $s * 4 + 4; $b++) { $bars += , $CB[$b] }
  $y = 130 + $s * 350
  System 120 $y 2160 $sp 4 $(if ($s -eq 0) { 4 } else { $null }) 4 @(@{ clef = 'G'; bars = $bars }) @{ open = ($s -lt 3) }
  NameRow 0 ($y + 4 * $sp + 2.3 * $sp) 32 $sp
  FingRow 0 ($y + 4 * $sp + 4.3 * $sp) $sp 'dedo'
}
T 2280 1500 'Melodía: James Lord Pierpont (1857), dominio público · versión AMA simplificada' 24 500 $GRAY 'end' $FI
Save 'P2_cascabeles'

# 23 · Dinámicas y forma ----------------------------------------------------------------
NewSvg 2400 900 'Dinámicas y forma A–B–A'
Head 'Dinámicas y forma' 'La fuerza sale del peso del brazo · la forma es el mapa de la pieza'
$dy = @(@('p', 'piano · suave', 70), @('mf', 'mezzoforte · medio fuerte', 140), @('f', 'forte · fuerte', 210))
for ($k = 0; $k -lt 3; $k++) { $x = 160 + $k * 300; Rc $x (440 - $dy[$k][2]) 120 $dy[$k][2] $GOLD $INK 2 10; T ($x + 60) 510 $dy[$k][0] 64 700 $INK 'middle' $FS 'font-style="italic"'; T ($x + 60) 555 $dy[$k][1] 22 600 $GRAY }
P 'M1150 330 L1550 270 M1150 330 L1550 390' 'none' $INK 6 'stroke-linecap="round"'; T 1350 450 'crescendo · cada vez más fuerte' 28 700 $INK
P 'M1700 270 L2100 330 M1700 390 L2100 330' 'none' $INK 6 'stroke-linecap="round"'; T 1900 450 'diminuendo · cada vez más suave' 28 700 $INK
$fm = @(@('A', 'Paso a paso', 'p', '#FBF1D3'), @('B', 'Idea nueva', 'f  (cresc.)', '#F9D9D7'), @('A', 'Vuelve el comienzo', 'mf → dim.', '#FBF1D3'))
for ($k = 0; $k -lt 3; $k++) {
  $x = 160 + $k * 720
  Rc $x 640 620 180 $fm[$k][3] $GOLD 3 20
  T ($x + 70) 760 $fm[$k][0] 90 700 $INK 'middle' $FS
  T ($x + 150) 720 $fm[$k][1] 36 700 $INK 'start'
  T ($x + 150) 775 $fm[$k][2] 34 700 $GOLDT 'start' $FS 'font-style="italic"'
  if ($k -lt 2) { Arrow ($x + 630) 730 ($x + 710) 730 $GOLDT 5 16 }
}
Save 'P2_dinamicas_forma'

# 24 · Acordes del Nivel 2 ------------------------------------------------------------------
NewSvg 2400 1000 'Acordes del Nivel 2'
Head 'Mis acordes del Nivel 2' 'Mayor: 4 + 3 semitonos · menor: 3 + 4 · el dedo del medio decide'
$chs = @(
  @('C', 'DO mayor', @(7, 9, 11), @{}), @('D', 'RE mayor', @(8, 12), @{ 10 = 'FA' }), @('E', 'MI mayor', @(9, 13), @{ 11 = 'SOL' }), @('F', 'FA mayor', @(10, 12, 14), @{}), @('G', 'SOL mayor', @(11, 13, 15), @{}),
  @('A', 'LA mayor', @(12, 16), @{ 14 = 'DO' }), @('Cm', 'DO menor', @(7, 11), @{ 8 = 'MI' }), @('Dm', 'RE menor', @(8, 10, 12), @{}), @('Em', 'MI menor', @(9, 11, 13), @{}), @('Am', 'LA menor', @(12, 14, 16), @{})
)
$txt = @{ C = 'DO – MI – SOL'; D = 'RE – FA♯ – LA'; E = 'MI – SOL♯ – SI'; F = 'FA – LA – DO'; G = 'SOL – SI – RE'; A = 'LA – DO♯ – MI'; Cm = 'DO – MI♭ – SOL'; Dm = 'RE – FA – LA'; Em = 'MI – SOL – SI'; Am = 'LA – DO – MI' }
for ($i = 0; $i -lt 10; $i++) {
  $c = $chs[$i]; $x0 = 40 + ($i % 5) * 470; $y0 = 190 + [Math]::Floor($i / 5) * 400
  $m = @{}; foreach ($a in $c[2]) { $m[$a] = @{ fill = $NC[(NoteName $a)] } }
  $bm = @{}; foreach ($k in $c[3].Keys) { $bm[$k] = @{ fill = $NC[$c[3][$k]] } }
  T ($x0 + 220) $y0 ('{0} · {1}' -f $c[0], $c[1]) 34 700
  Kb2 $x0 ($y0 + 30) 40 200 7 11 $m $bm
  T ($x0 + 220) ($y0 + 280) $txt[$c[0]] 28 700 $GRAY
}
Save 'P2_acordes_nivel2'
"N2 parte B ok"
