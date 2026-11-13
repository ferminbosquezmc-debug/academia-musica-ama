#!/usr/bin/env python3
"""Láminas del Método Integral AMA de Canto. Dibujos originales AMA (esquemas, no anatomía detallada).
Uso: python3 laminas.py <carpeta de salida>   (normalmente academia-arpa/canto/img)"""
import sys, os
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
FT = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; FI = "Inter, 'Segoe UI', Arial, sans-serif"
INK, GRAY, GOLD, DGOLD, BOX = '#1A1A1A', '#5F6368', '#C9A227', '#8A6A0A', '#EEF0F4'
RED, BLUE, GREEN, PURPLE, ORANGE = '#E5312B', '#2370D6', '#2E9E4F', '#8E3BB8', '#F57C00'

class Svg:
    def __init__(s, w, h, title): s.w, s.h, s.t, s.a = w, h, title, []
    def add(s, x): s.a.append(x)
    def text(s, x, y, t, size, weight=700, fill=INK, anchor='middle', font=FT):
        s.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{t}</text>')
    def line(s, x1, y1, x2, y2, c=INK, w=3, extra=''): s.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" stroke-width="{w}" stroke-linecap="round" {extra}/>')
    def rect(s, x, y, w, h, fill, stroke='none', sw=0, rx=0): s.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def circle(s, x, y, r, fill, stroke='none', sw=0): s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def head(s, title, sub): s.text(40, 72, title, 48, 700, INK, 'start'); s.text(40, 124, sub, 32, 500, GRAY, 'start', FI)
    def save(s, name):
        open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8').write(
            f'<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="{s.w}" height="{s.h}" viewBox="0 0 {s.w} {s.h}" role="img" aria-label="{s.t}">\n<title>{s.t}</title>\n<rect width="{s.w}" height="{s.h}" fill="#FFFFFF"/>\n' + '\n'.join(s.a) + '\n</svg>\n')

def num(s, x, y, n): s.circle(x, y, 26, GOLD, INK, 2); s.text(x, y + 10, str(n), 28, 700)

# 2 · Cómo se produce la voz ------------------------------------------------------------------
s = Svg(2400, 1000, 'Cómo se produce la voz: cuatro partes')
s.head('Mi voz en 4 partes', 'El aire sube, los pliegues vocales vibran, el sonido crece en las cavidades y la boca forma las palabras')
PARTS = [('1', 'Respiración', 'pulmones y diafragma', 'el aire es la «gasolina» de la voz', BLUE),
         ('2', 'Vibración', 'pliegues vocales (en la laringe)', 'vibran muy rápido y crean el sonido', RED),
         ('3', 'Resonancia', 'garganta, boca y nariz', 'agrandan y dan color al sonido', ORANGE),
         ('4', 'Articulación', 'lengua, labios, dientes y paladar', 'forman las vocales y consonantes', GREEN)]
for k, (n, t, w, d, c) in enumerate(PARTS):
    x = 80 + k * 570
    s.rect(x, 230, 520, 460, c, INK, 2, 26); s.circle(x + 260, 320, 50, '#FFFFFF', INK, 2); s.text(x + 260, 340, n, 52, 700)
    s.text(x + 260, 450, t, 44, 700, '#FFFFFF'); s.text(x + 260, 520, w, 22, 700, '#FFFFFF', 'middle', FI); s.text(x + 260, 600, d, 22, 600, '#FFFFFF', 'middle', FI)
    if k < 3: s.text(x + 545, 470, '→', 50, 700, GRAY)
s.text(1200, 800, 'Los pliegues vocales son delicados: no se grita, no se fuerza y se descansa la voz', 30, 700, INK, 'middle', FI)
s.text(1200, 870, 'Si hay dolor o ronquera que no se va, se para y se consulta a un especialista', 26, 600, DGOLD, 'middle', FI)
s.save('C1_voz')

# 2 · Postura en 7 pasos ---------------------------------------------------------------------
s = Svg(2400, 1200, 'Postura para cantar en siete pasos')
s.head('Mi postura para cantar · 7 pasos', 'De pie, como un árbol: raíces en el suelo y la copa libre')
cx = 520
s.circle(cx, 330, 70, '#FDE7C8', INK, 4)
s.line(cx, 400, cx, 720, INK, 10)
s.line(cx, 470, cx - 120, 640, INK, 10); s.line(cx, 470, cx + 120, 640, INK, 10)
s.line(cx, 720, cx - 90, 1000, INK, 10); s.line(cx, 720, cx + 90, 1000, INK, 10)
s.line(cx - 140, 1010, cx - 40, 1010, INK, 12); s.line(cx + 40, 1010, cx + 140, 1010, INK, 12)
s.add(f'<path d="M {cx-60} 560 Q {cx} 610 {cx+60} 560" fill="none" stroke="{BLUE}" stroke-width="6" stroke-dasharray="10 8"/>')
MARK = [(1, cx - 150, 1010), (2, cx + 120, 860), (3, cx - 80, 720), (4, cx + 40, 560), (5, cx - 150, 470), (6, cx + 90, 330), (7, cx - 120, 400)]
for n, x, y in MARK: num(s, x, y, n)
STEPS = ['Pies separados al ancho de los hombros, el peso repartido', 'Rodillas sueltas, nunca trabadas', 'Cadera derecha, sin sacar la panza ni la cola',
         'Costillas abiertas: el aire baja a la cintura (línea azul)', 'Hombros abajo y relajados, brazos sueltos', 'Cabeza derecha, mirada al frente, mentón paralelo al suelo',
         'Cuello y mandíbula libres, sin tensión']
for k, t in enumerate(STEPS):
    y = 300 + k * 110; num(s, 980, y - 10, k + 1); s.text(1030, y, t, 28, 600, INK, 'start', FI)
s.text(1200, 1130, 'Sentado: en el borde de la silla, espalda recta y los dos pies en el suelo', 26, 600, DGOLD, 'middle', FI)
s.save('C1_postura')

# 3 · La respiración baja --------------------------------------------------------------------
s = Svg(2400, 1100, 'La respiración baja para cantar')
s.head('La respiración baja (costo-diafragmática)', 'El aire entra hacia abajo: se abren las costillas y la cintura, los hombros no suben')
for k, (t, d, w, c) in enumerate([('Inhalo', 'el diafragma baja, la cintura se abre', 320, BLUE), ('Exhalo cantando', 'el aire sale despacio y parejo', 230, GREEN)]):
    x = 300 + k * 900
    s.add(f'<ellipse cx="{x + 200}" cy="560" rx="{w / 2}" ry="210" fill="{c}" opacity=".18" stroke="{c}" stroke-width="5"/>')
    s.line(x + 60, 300, x + 340, 300, INK, 6); s.text(x + 200, 280, 'hombros quietos', 22, 600, GRAY, 'middle', FI)
    for dx in (-1, 1): s.text(x + 200 + dx * (w / 2 + 50), 575, '→' if dx > 0 else '←', 46, 700, c) if k == 0 else s.text(x + 200 + dx * (w / 2 + 50), 575, '←' if dx > 0 else '→', 46, 700, c)
    s.text(x + 200, 850, t, 40, 700, c); s.text(x + 200, 905, d, 24, 600, INK, 'middle', FI)
s.rect(1900, 360, 420, 400, BOX, 'none', 0, 20)
s.text(2110, 430, 'Ejercicio', 32, 700)
for k, t in enumerate(['inhalo en 4', 'sostengo 4', 'exhalo con «sss» en 8', 'subo a 12 y 16']):
    s.text(1940, 510 + k * 60, f'{k + 1}. {t}', 26, 600, INK, 'start', FI)
s.text(1200, 1030, 'Pon una mano en la cintura: al inhalar se mueve hacia afuera', 28, 700, DGOLD, 'middle', FI)
s.save('C1_respiracion')

# 3 · Calentamiento de 5 minutos ----------------------------------------------------------------
s = Svg(2400, 900, 'Calentamiento vocal de cinco minutos')
s.head('Mi calentamiento de 5 minutos', 'Siempre antes de cantar · suave, sin forzar · en orden')
CAL = [('1 min', 'Cuerpo', 'estiro el cuello, los hombros y la cara', BLUE), ('1 min', 'Respiración', 'inhalo en 4 y exhalo con «sss» en 8', GREEN),
       ('1 min', 'Labios', 'vibro los labios «brrr» subiendo y bajando', ORANGE), ('1 min', 'Resonancia', 'tarareo con «mmm» en notas cómodas', PURPLE),
       ('1 min', 'Vocales', 'canto «mi-me-ma-mo-mu» en DO-RE-MI-RE-DO', RED)]
for k, (tm, t, d, c) in enumerate(CAL):
    x = 80 + k * 456
    s.rect(x, 230, 420, 440, c, INK, 2, 22); s.text(x + 210, 310, tm, 30, 700, '#FFFFFF'); s.text(x + 210, 420, t, 42, 700, '#FFFFFF')
    words = d.split(' '); l1 = ' '.join(words[:len(words) // 2]); l2 = ' '.join(words[len(words) // 2:])
    s.text(x + 210, 520, l1, 22, 600, '#FFFFFF', 'middle', FI); s.text(x + 210, 560, l2, 22, 600, '#FFFFFF', 'middle', FI)
s.text(1200, 780, 'Al terminar de cantar, enfrío: tarareo suave bajando y tomo agua', 28, 700, INK, 'middle', FI)
s.text(1200, 840, 'Si algo duele, paro', 26, 600, DGOLD, 'middle', FI)
s.save('C1_calentamiento')

# ===================== MES 2 (clases 5–8) =====================
# 6 · Dónde respiro --------------------------------------------------------------------------------
s = Svg(2400, 900, 'Dónde respirar al cantar')
s.head('¿Dónde respiro?', 'En los silencios y al final de cada frase · la marca de respiración es una comita (’)')
FR = [('Frase 1', 'compases 1 a 4', BLUE), ('Frase 2', 'compases 5 a 8', GREEN)]
for k, (t, d, c) in enumerate(FR):
    x = 120 + k * 1100
    s.add(f'<path d="M {x} 420 Q {x + 450} 230 {x + 900} 420" fill="none" stroke="{c}" stroke-width="10" stroke-linecap="round"/>')
    s.text(x + 450, 380, t, 40, 700, c); s.text(x + 450, 440, d, 26, 600, GRAY, 'middle', FI)
    s.text(x + 960, 330, '’', 120, 700, RED); s.text(x + 960, 470, 'respiro', 24, 700, RED, 'middle', FI)
s.rect(120, 560, 2160, 260, BOX, 'none', 0, 20)
for k, t in enumerate(['1. Respiro ANTES de empezar, con calma, contando la entrada', '2. No respiro en medio de una palabra', '3. En los silencios largos tomo aire lleno; en los cortos, «aire rápido» por la boca']):
    s.text(170, 630 + k * 70, t, 28, 600, INK, 'start', FI)
s.save('C1_respiro')

# 7 · Las cinco vocales -------------------------------------------------------------------------------
s = Svg(2400, 900, 'Las cinco vocales cantadas')
s.head('Las 5 vocales del canto', 'Boca abierta y redonda · la mandíbula suelta · la lengua relajada detrás de los dientes de abajo')
VOC = [('A', 'boca bien abierta', 120, 120, RED), ('E', 'sonrisa suave', 140, 80, ORANGE), ('I', 'sonrisa, sin apretar', 140, 55, '#C9A227'), ('O', 'labios redondos', 95, 115, GREEN), ('U', 'labios hacia adelante', 60, 80, BLUE)]
for k, (v, d, rx, ry, c) in enumerate(VOC):
    x = 280 + k * 460
    s.add(f'<ellipse cx="{x}" cy="420" rx="{rx}" ry="{ry}" fill="{c}" opacity=".2" stroke="{c}" stroke-width="8"/>')
    s.text(x, 445, v, 80, 700, c); s.text(x, 640, d, 26, 600, INK, 'middle', FI)
s.text(1200, 780, 'Ejercicio: «mi – me – ma – mo – mu» en una nota, cambiando solo la forma de la boca', 28, 700, DGOLD, 'middle', FI)
s.save('C1_vocales')

# ===================== MES 3 (clases 9–12) =====================
# 11 · Tipos de voz (rangos aproximados) ----------------------------------------------------------
s = Svg(2400, 1200, 'Tipos de voz y sus rangos aproximados')
s.head('Tipos de voz · rangos aproximados', 'Cada voz es distinta: estos rangos son una guía, no una regla · el número indica la octava (DO4 = DO central)')
NOTES = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']
def pos(n, o): return (o - 2) * 7 + NOTES.index(n)  # DO2 = 0
x0, step = 300, 66
lo, hi = pos('DO', 2), pos('DO', 6)
for k in range(lo, hi + 1):
    x = x0 + k * step; n = NOTES[k % 7]; o = 2 + k // 7
    s.rect(x - step / 2 + 2, 230, step - 4, 90, '#FFFFFF' if n != 'DO' else '#F4E9C7', INK, 1.5, 6)
    if n == 'DO': s.text(x, 290, f'DO{o}', 18, 700)
s.text(x0 + pos('DO', 4) * step, 350, '▲ DO central', 20, 700, RED, 'middle', FI)
VOZ = [('Soprano', ('DO', 4), ('LA', 5), RED), ('Mezzosoprano', ('LA', 3), ('FA', 5), ORANGE), ('Contralto', ('FA', 3), ('RE', 5), '#C9A227'),
       ('Tenor', ('DO', 3), ('LA', 4), GREEN), ('Barítono', ('LA', 2), ('FA', 4), BLUE), ('Bajo', ('MI', 2), ('RE', 4), PURPLE)]
for k, (v, a, b, c) in enumerate(VOZ):
    y = 420 + k * 105; xa = x0 + pos(*a) * step; xb = x0 + pos(*b) * step
    s.rect(xa - 20, y, xb - xa + 40, 70, c, INK, 2, 35); s.text(xa - 40, y + 46, v, 28, 700, INK, 'end')
    s.text((xa + xb) / 2, y + 46, f'{a[0]}{a[1]} – {b[0]}{b[1]}', 24, 700, '#FFFFFF' if c not in ('#C9A227',) else INK)
s.text(1200, 1100, 'Las voces de niños y niñas suelen estar entre DO4 y DO5, y crecen con los años · VibraVoice y tu profesor te ayudan a conocer la tuya', 24, 600, DGOLD, 'middle', FI)
s.save('C1_extension')

# ===================== NIVEL 2 (clases 13–24) =====================
NC = {'DO': '#E5312B', 'RE': '#F57C00', 'MI': '#FFD21F', 'FA': '#2E9E4F', 'SOL': '#2AA7E8', 'LA': '#283593', 'SI': '#8E3BB8'}
def pill(s, x, y, n, size=26, w=None):
    b = n.replace('↑', '').strip(); c = NC.get(b, INK); tc = '#FFFFFF' if b in ('DO', 'LA', 'SI') or b not in NC else INK
    w = w or max(80, len(n) * size * 0.75 + 24)
    s.rect(x - w / 2, y - size * 0.95, w, size * 1.7, c, INK, 2.5, size * 0.85); s.text(x, y + size * 0.38, n, size, 700, tc)

# 14 · Intervalos con melodías de referencia ----------------------------------------------------
s = Svg(2400, 1050, 'Intervalos con melodías de referencia')
s.head('3.ª, 5.ª y 8.ª: las recuerdo con canciones', 'Si recuerdo cómo empieza una canción, recuerdo el intervalo')
IV = [('3.ª mayor', 'DO', 'MI', '«Mi voz» (clase 12): «Ca-da dí-a…»', 260, GREEN), ('5.ª justa', 'DO', 'SOL', '«Estrellita»: «Bri-lla, bri-lla…»', 420, BLUE), ('8.ª justa', 'DO', 'DO↑', 'la escala de Do: del primero al último', 560, PURPLE)]
for k, (t, a, b, ref, h, c) in enumerate(IV):
    x = 260 + k * 760
    s.rect(x - 200, 220, 600, 640, BOX, 'none', 0, 22); s.text(x + 100, 290, t, 40, 700, c)
    pill(s, x, 780, a, 32, 130); pill(s, x + 200, 780 - h, b, 32, 130)
    s.add(f'<path d="M {x} 730 Q {x + 40} {780 - h / 2} {x + 160} {800 - h}" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round"/>')
    s.text(x + 100, 940, ref, 24, 600, INK, 'middle', FI)
s.text(1200, 1010, '↑ = la nota de la octava de arriba', 22, 600, GRAY, 'middle', FI)
s.save('C2_intervalos')

# 20 · Segunda voz en terceras -------------------------------------------------------------------
s = Svg(2400, 900, 'Segunda voz en terceras')
s.head('La segunda voz: una tercera abajo', '«Estrellita»: la voz 1 canta la melodía y la voz 2 canta 3 notas más abajo · al final se juntan')
V1 = ['DO', 'DO', 'SOL', 'SOL', 'LA', 'LA', 'SOL', 'FA', 'FA', 'MI', 'MI', 'RE', 'RE', 'DO']
V2 = ['LA', 'LA', 'MI', 'MI', 'FA', 'FA', 'MI', 'RE', 'RE', 'DO', 'DO', 'SI', 'SI', 'DO']
s.text(80, 300, 'Voz 1', 34, 700, BLUE, 'start'); s.text(80, 470, 'Voz 2', 34, 700, ORANGE, 'start')
for k, (a, b) in enumerate(zip(V1, V2)):
    x = 300 + k * 148; pill(s, x, 290, a, 22, 104); pill(s, x, 460, b, 22, 104)
    if k < 13: s.line(x, 330, x, 410, '#C9C3B6', 3, 'stroke-dasharray="6 6"')
s.text(300 + 13 * 148, 560, 'unísono', 24, 700, RED, 'middle', FI)
s.rect(120, 640, 2160, 180, BOX, 'none', 0, 20)
s.text(1200, 715, 'Voz 2 de abajo: LA está 3 notas debajo de DO, MI debajo de SOL, FA debajo de LA…', 28, 700, INK, 'middle', FI)
s.text(1200, 775, 'Cada voz aprende su parte sola; después se juntan, despacio y escuchándose', 24, 600, DGOLD, 'middle', FI)
s.save('C2_terceras')

# 21 · El micrófono --------------------------------------------------------------------------------
s = Svg(2400, 1000, 'Cómo cantar con micrófono')
s.head('Cantar con micrófono', 'Distancia, ángulo y movimiento · distancias aproximadas, el técnico de sonido ajusta el resto')
for k, (t, d, dist, c) in enumerate([('Normal', 'a unos 3 a 5 cm, frente a la boca', 120, GREEN), ('Notas fuertes o agudas', 'me alejo un poco: 10 a 15 cm', 300, ORANGE), ('Muy cerca', 'sonido grave y «pegado»: lo evito', 30, RED)]):
    x = 140 + k * 760; y = 420
    s.circle(x + 100, y, 70, '#FDE7C8', INK, 3); s.add(f'<path d="M {x+150} {y+20} q 18 8 0 22" fill="none" stroke="{INK}" stroke-width="4"/>')
    mx = x + 170 + dist; s.rect(mx, y - 10, 170, 40, '#5F6368', INK, 2, 18); s.circle(mx, y + 10, 30, '#9AA0A6', INK, 2)
    s.line(x + 175, y + 70, mx, y + 70, c, 4); s.text((x + 175 + mx) / 2 + 6, y + 110, '↔', 30, 700, c)
    s.text(x + 280, 620, t, 32, 700, c); s.text(x + 280, 670, d, 22, 600, INK, 'middle', FI)
s.rect(120, 760, 2160, 190, BOX, 'none', 0, 20)
for k, t in enumerate(['Apunto el micrófono a la boca, no al pecho ni a la nariz', 'Lo tomo del cuerpo, no de la rejilla, y no lo golpeo', 'No apunto el micrófono a los altavoces: produce acople (pitido)']):
    s.text(170, 820 + k * 50, '• ' + t, 26, 600, INK, 'start', FI)
s.save('C2_microfono')

# 22 · Voces de coro sobre I – IV – V --------------------------------------------------------------------
s = Svg(2400, 900, 'Voces de coro sobre I, IV y V')
s.head('Voces de coro: cada voz canta una nota del acorde', 'Progresión C – F – G – C (I – IV – V – I) · la voz se mueve lo menos posible')
CH = [('C', 'I', 'MI', 'DO'), ('F', 'IV', 'FA', 'DO'), ('G', 'V', 'RE', 'SI'), ('C', 'I', 'MI', 'DO')]
for k, (c, g, a, b) in enumerate(CH):
    x = 300 + k * 520
    s.rect(x - 200, 200, 400, 520, BOX, 'none', 0, 22); s.text(x, 270, c, 48, 700); s.text(x, 320, g, 30, 700, GRAY)
    pill(s, x, 450, a, 30, 130); pill(s, x, 600, b, 30, 130)
s.text(60, 460, 'alta', 26, 700, BLUE, 'start'); s.text(60, 610, 'baja', 26, 700, ORANGE, 'start')
s.text(1200, 820, 'La voz baja canta DO – DO – SI – DO: casi no se mueve, y por eso suena unida', 26, 600, DGOLD, 'middle', FI)
s.save('C2_coro')

# ===================== NIVEL 3 (clases 25–36) =====================
# 27 · Registros de la voz -------------------------------------------------------------------------
s = Svg(2400, 1050, 'Los registros de la voz')
s.head('Voz de pecho, voz de cabeza y la zona de paso', 'La meta es una sola voz pareja de abajo hacia arriba, sin «quiebres» ni gritos')
REG = [('Voz de cabeza', 'notas agudas · se siente vibrar en la cabeza y la cara', BLUE, 230), ('Zona de paso', 'donde la voz quiere «quebrarse» · se canta más liviano', ORANGE, 470),
       ('Voz de pecho', 'notas graves y medias · se siente vibrar en el pecho', RED, 710)]
s.rect(200, 230, 120, 700, BOX, INK, 2, 20)
for t, d, c, y in REG:
    s.rect(200, y, 120, 220, c, INK, 2, 16); s.text(380, y + 100, t, 40, 700, c, 'start'); s.text(380, y + 150, d, 26, 600, INK, 'start', FI)
s.text(260, 210, 'agudo', 24, 700, GRAY, 'middle', FI); s.text(260, 970, 'grave', 24, 700, GRAY, 'middle', FI)
s.rect(1500, 300, 820, 560, BOX, 'none', 0, 22); s.text(1910, 370, 'Voz mixta', 40, 700, PURPLE)
for k, t in enumerate(['mezcla de pecho y cabeza', 'une los registros sin quiebre', 'ejercicios: sirena con «u»,', 'labios «brrr» subiendo y bajando,', 'escalas de 5 notas con «ng-a»', 'siempre suave, nunca forzado']):
    s.text(1560, 450 + k * 62, '• ' + t, 26, 600, INK, 'start', FI)
s.save('C3_registros')

# 28 · Armonía a tres voces ------------------------------------------------------------------------
s = Svg(2400, 1000, 'Armonía a tres voces')
s.head('Tres voces sobre C – F – G7 – C', 'Cada voz canta una nota del acorde y se mueve lo menos posible · en G7, la voz media canta la séptima (FA)')
CH3 = [('C', 'SOL', 'MI', 'DO'), ('F', 'LA', 'FA', 'DO'), ('G7', 'SOL', 'FA', 'SI'), ('C', 'SOL', 'MI', 'DO')]
NC3 = {'DO': RED, 'RE': ORANGE, 'MI': '#FFD21F', 'FA': GREEN, 'SOL': '#2AA7E8', 'LA': '#283593', 'SI': PURPLE}
def p3(x, y, n):
    c = NC3[n]; s.rect(x - 65, y - 30, 130, 54, c, INK, 2.5, 27); s.text(x, y + 10, n, 30, 700, '#FFFFFF' if n in ('DO', 'LA', 'SI') else INK)
for k, (c, a, m, b) in enumerate(CH3):
    x = 420 + k * 500
    s.rect(x - 200, 200, 400, 640, BOX, 'none', 0, 22); s.text(x, 270, c, 48, 700)
    p3(x, 420, a); p3(x, 570, m); p3(x, 720, b)
for y, t, c in ((420, 'alta', BLUE), (570, 'media', GREEN), (720, 'baja', ORANGE)): s.text(60, y + 10, t, 28, 700, c, 'start')
s.text(1200, 920, 'En G7 → C: FA baja a MI y SI sube a DO · así se resuelve la tensión', 28, 700, DGOLD, 'middle', FI)
s.save('C3_tres_voces')

# 36 · Recital final ----------------------------------------------------------------------------------
s = Svg(2400, 900, 'Programa del recital final de canto')
s.head('¡Recital final! · Canto', 'El programa de mi recital · Nivel 3')
for k, (n, t, d, col) in enumerate([('1', 'Vocalización', 'escalas, arpegios y registros', '#2AA7E8'), ('2', 'Canción solista', 'con micrófono y acompañamiento', GREEN),
                                     ('3', 'Canción a voces', 'a dos o tres voces, en coro', ORANGE), ('4', 'Improvisación', 'pregunta y respuesta con la banda', RED)]):
    x = 80 + k * 570; s.rect(x, 220, 540, 460, col, INK, 2, 24); s.circle(x + 270, 320, 50, '#FFFFFF', INK, 2); s.text(x + 270, 340, n, 52, 700)
    s.text(x + 270, 460, t, 44, 700, '#FFFFFF'); s.text(x + 270, 540, d, 22, 600, '#FFFFFF', 'middle', FI)
s.text(1200, 790, 'Antes: caliento, tomo agua y respiro · Después: enfrío la voz, saludo y agradezco', 30, 600, GRAY, 'middle', FI)
s.save('C3_recital')
print('ok')
