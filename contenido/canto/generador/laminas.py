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
print('ok')
