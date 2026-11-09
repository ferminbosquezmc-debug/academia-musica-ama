# Lámina «Postura con la guitarra en 7 pasos» (guitarra/img/G1_postura.svg)
. (Join-Path $PSScriptRoot '..\..\piano\nivel-1\img\generador\lib.ps1')
$script:OUT = Join-Path $PSScriptRoot '..\img'
New-Item -ItemType Directory -Force $script:OUT | Out-Null
$WOOD = '#C98B4A'; $DARK = '#6B4C35'; $rc = 'stroke-linecap="round"'
NewSvg 2400 1200 'Postura con la guitarra en 7 pasos'
Head 'Postura con la guitarra en 7 pasos' 'Sentado, relajado y con la guitarra sobre la pierna derecha'
L 80 1085 1180 1085 $GRAY 4
# Silla
Rc 330 330 30 440 '#2A1E16' $INK 2 8
Rc 300 760 520 40 '#2A1E16' $INK 2 8
Rc 320 800 26 285 '#2A1E16'; Rc 770 800 26 285 '#2A1E16'
# Cuerpo
Rc 430 410 240 380 '#283593' $INK 3 60
Rc 420 760 120 60 $GRAY $INK 2 20; Rc 580 760 120 60 $GRAY $INK 2 20
Rc 435 800 90 260 $GRAY $INK 2 20; Rc 595 800 90 260 $GRAY $INK 2 20
Rc 405 1050 150 36 $INK $INK 2 16; Rc 585 1050 150 36 $INK $INK 2 16
C 550 330 72 $SKIN $INK 3
# Guitarra (inclinada: el mástil sube hacia la mano izquierda)
A '<g transform="rotate(-24 500 700)">'
A ('<ellipse cx="430" cy="700" rx="150" ry="125" fill="{0}" stroke="{1}" stroke-width="4"/>' -f $WOOD, $INK)
A ('<ellipse cx="600" cy="700" rx="112" ry="98" fill="{0}" stroke="{1}" stroke-width="4"/>' -f $WOOD, $INK)
A ('<ellipse cx="515" cy="700" rx="110" ry="88" fill="{0}"/>' -f $WOOD)
Rc 700 682 300 36 $DARK $INK 3 4
Rc 995 668 100 64 $DARK $INK 3 10
C 580 700 38 '#2A1E16' $INK 3
Rc 392 684 22 32 '#2A1E16'
for ($k = 0; $k -lt 6; $k++) { L 405 (688 + $k * 5) 1000 (688 + $k * 5) '#EDE3D2' 1.5 }
for ($k = 1; $k -lt 6; $k++) { L (700 + $k * 55) 682 (700 + $k * 55) 718 '#C9C9C9' 3 }
A '</g>'
# Brazos
L 445 450 405 600 '#283593' 40 $rc
L 405 600 548 676 $SKIN 34 $rc
L 655 450 760 565 '#283593' 40 $rc
L 760 565 850 520 $SKIN 32 $rc
C 862 515 28 $SKIN $INK 3
# Números
$calls = @(@(1, 660, 1150), @(2, 270, 780), @(3, 330, 880), @(4, 380, 470), @(5, 1060, 430), @(6, 330, 600), @(7, 920, 600))
foreach ($c in $calls) { Num $c[1] $c[2] $c[0] 28 }
$steps = @(
  @('Pies planos en el suelo', 'firmes, sin cruzar las piernas'),
  @('En el borde de la silla', 'sin apoyar la espalda en el respaldo'),
  @('La guitarra sobre la pierna derecha', 'la cintura de la guitarra apoyada en el muslo'),
  @('Espalda recta y hombros sueltos', 'sin encorvarse sobre la guitarra'),
  @('El mástil un poco hacia arriba', 'el clavijero a la altura del hombro'),
  @('Brazo derecho sobre la caja', 'la mano queda sobre la boca'),
  @('Mano izquierda: pulgar detrás del mástil', 'los dedos arqueados, listos para pisar')
)
for ($i = 0; $i -lt 7; $i++) { $yy = 250 + $i * 125; Num 1290 $yy ($i + 1) 30; T 1340 ($yy + 4) $steps[$i][0] 38 700 $INK 'start'; T 1340 ($yy + 46) $steps[$i][1] 30 500 $GRAY 'start' $FI }
Save 'G1_postura'
"ok"
