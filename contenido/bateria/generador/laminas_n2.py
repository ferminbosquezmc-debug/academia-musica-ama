#!/usr/bin/env python3
"""Láminas de Batería Nivel 2 (clases 13–24), mismo estilo que las del Nivel 1.
Uso: python3 laminas_n2.py <carpeta de salida>   (normalmente academia-arpa/bateria/img)"""
import sys, os
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
FT = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; FI = "Inter, 'Segoe UI', Arial, sans-serif"; FS = "'DejaVu Serif', 'Times New Roman', serif"
INK, GRAY, GOLD, DGOLD, BOX, LINE = '#1A1A1A', '#5F6368', '#C9A227', '#8A6A0A', '#EEF0F4', '#D5D9E0'
LIMB = {'D': '#E5312B', 'I': '#2370D6', 'PD': '#2E9E4F', 'PI': '#8E3BB8'}

class Svg:
    def __init__(s, w, h, title): s.w, s.h, s.t, s.a = w, h, title, []
    def add(s, x): s.a.append(x)
    def text(s, x, y, t, size, weight=700, fill=INK, anchor='middle', font=FT, extra=''):
        s.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" {extra}>{t}</text>')
    def line(s, x1, y1, x2, y2, c=INK, w=3, extra=''): s.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" stroke-width="{w}" {extra}/>')
    def rect(s, x, y, w, h, fill, stroke='none', sw=0, rx=0): s.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def circle(s, x, y, r, fill, stroke='none', sw=0): s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def head(s, title, sub): s.text(40, 72, title, 48, 700, INK, 'start'); s.text(40, 124, sub, 32, 500, GRAY, 'start', FI)
    def save(s, name):
        open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8').write(
            f'<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="{s.w}" height="{s.h}" viewBox="0 0 {s.w} {s.h}" role="img" aria-label="{s.t}">\n<title>{s.t}</title>\n<rect width="{s.w}" height="{s.h}" fill="#FFFFFF"/>\n' + '\n'.join(s.a) + '\n</svg>\n')

def hitc(s, x, y, limb, r=38, acc=False, lab=None):
    s.circle(x, y, r, LIMB[limb], GOLD if acc else INK, 6 if acc else 2)
    s.text(x, y + r * 0.36, lab or limb, r * 0.9, 700, '#FFFFFF')

def grid(s, x0, y0, counts, rows, cw, rh=110, beat=2, title=None):
    """rows: [(nombre, {paso: (extremidad, acento, etiqueta)})]"""
    n = len(counts)
    for b in range(n // beat):
        s.rect(x0 + b * beat * cw + 4, y0, beat * cw - 8, 70 + rh * len(rows), BOX, rx=14)
    for k, c in enumerate(counts):
        s.text(x0 + (k + 0.5) * cw, y0 + 50, c, 32, 700, INK if k % beat == 0 else GRAY)
    for r, (name, hits) in enumerate(rows):
        y = y0 + 70 + r * rh + rh / 2
        s.text(x0 - 30, y + 11, name, 30, 700, INK, 'end')
        s.line(x0, y, x0 + n * cw, y, LINE, 2)
        for k, v in hits.items(): hitc(s, x0 + (k + 0.5) * cw, y, v[0], 36, v[1], v[2])

# 13 · Hi-hat abierto y cerrado + Ritmo básico #5 ------------------------------------
s = Svg(2400, 1200, 'Hi-hat abierto y cerrado y el ritmo básico 5')
s.head('Hi-hat cerrado (+) y abierto (o)', 'El pie izquierdo (PI) decide: pedal abajo = cerrado · pedal arriba = abierto')
for k, (lab, gap, sym, desc) in enumerate([('Cerrado', 0, '+', 'sonido corto: «chik»'), ('Abierto', 34, 'o', 'sonido largo: «tsss»')]):
    cx = 360 + k * 620
    s.add(f'<ellipse cx="{cx}" cy="{300 - gap / 2}" rx="190" ry="26" fill="#E9D9A6" stroke="{INK}" stroke-width="3"/>')
    s.add(f'<ellipse cx="{cx}" cy="{330 + gap / 2}" rx="190" ry="26" fill="#E9D9A6" stroke="{INK}" stroke-width="3"/>')
    s.line(cx, 330 + gap / 2, cx, 470, INK, 6); s.rect(cx - 70, 470, 140, 24, '#9AA0A6', INK, 2, 8)
    s.text(cx, 560, lab, 40, 700); s.text(cx, 610, desc, 28, 600, GRAY, 'middle', FI)
    s.circle(cx + 230, 300, 40, '#FFFFFF', INK, 3); s.text(cx + 230, 316, sym, 48, 700)
s.text(1800, 300, 'En la partitura:', 32, 700); s.text(1800, 360, '+ encima = cerrado', 30, 600, GRAY, 'middle', FI); s.text(1800, 410, 'o encima = abierto', 30, 600, GRAY, 'middle', FI)
s.text(1800, 470, 'cerrar = bajar el pie en el pulso siguiente', 26, 600, DGOLD, 'middle', FI)
s.text(60, 715, 'Ritmo básico #5', 36, 700, INK, 'start')
grid(s, 520, 690, ['1', 'y', '2', 'y', '3', 'y', '4', 'y'],
     [('Hi-hat', {**{k: ('D', False, None) for k in range(7)}, 7: ('D', True, 'o')}), ('Redoblante', {2: ('I', False, None), 6: ('I', False, None)}),
      ('Bombo', {0: ('PD', False, None), 4: ('PD', False, None)}), ('Pie (PI)', {0: ('PI', False, None)})], 220, 100)
s.save('B2_hihat_abierto')

# 13 · Signo de medida y líneas adicionales --------------------------------------------
s = Svg(2400, 1000, 'El signo de medida y las líneas adicionales')
s.head('El signo de medida y las líneas adicionales', 'Arriba: cuántos pulsos tiene el compás · abajo: qué figura vale un pulso')
SIG = [('4', '4', '4 negras', 'rock, pop'), ('3', '4', '3 negras', 'vals'), ('2', '4', '2 negras', 'marcha'), ('6', '8', '6 corcheas', 'balada en 6/8'), ('12', '8', '12 corcheas', 'tresillos')]
for k, (a, b, d1, d2) in enumerate(SIG):
    x = 260 + k * 470; y0 = 250
    for j in range(5): s.line(x - 150, y0 + j * 30, x + 150, y0 + j * 30, INK, 3)
    s.text(x, y0 + 56, a, 74, 700, INK, 'middle', FS); s.text(x, y0 + 116, b, 74, 700, INK, 'middle', FS)
    s.text(x, y0 + 200, d1, 30, 700); s.text(x, y0 + 240, d2, 26, 600, GRAY, 'middle', FI)
s.text(60, 620, 'Líneas adicionales: rayitas cortas para escribir arriba o abajo del pentagrama', 32, 700, INK, 'start')
y0 = 700
for j in range(5): s.line(200, y0 + j * 34, 2200, y0 + j * 34, INK, 3)
def xhead(x, y): s.line(x - 15, y - 15, x + 15, y + 15, INK, 5); s.line(x - 15, y + 15, x + 15, y - 15, INK, 5)
for x, yy, lab, ledger in [(500, y0 - 17, 'hi-hat', []), (850, y0 - 34, 'crash', [y0 - 34]), (1200, y0 - 51, 'crash (más arriba)', [y0 - 34, y0 - 68]), (1600, y0 + 4 * 34 + 17, 'hi-hat con el pie', []), (1950, y0 + 4 * 34 + 34, 'debajo', [y0 + 5 * 34])]:
    for ly in ledger: s.line(x - 40, ly, x + 40, ly, INK, 3)
    if lab == 'debajo': s.add(f'<ellipse cx="{x}" cy="{yy}" rx="20" ry="14" fill="{INK}"/>')
    else: xhead(x, yy)
    s.text(x, 960, lab, 26, 600, GRAY, 'middle', FI)
s.save('B2_medida')

# 14 · Tresillos con manos alternadas ------------------------------------------------
s = Svg(2400, 760, 'Redobles alternados en tresillos')
s.head('Redobles alternados en tresillos', 'Tres golpes en cada pulso: tri-o-la · el acento (borde dorado) cambia de mano en cada pulso')
cnt = []; hits = {}
for b in range(4):
    cnt += [str(b + 1), 'o', 'la']
    lead = 'D' if b % 2 == 0 else 'I'; other = 'I' if lead == 'D' else 'D'
    for k, h in enumerate([lead, other, lead]): hits[b * 3 + k] = (h, k == 0, None)
grid(s, 300, 230, ['tri' if c.isdigit() else c for c in cnt], [('Redoblante', hits)], 170, 140, 3)
for b in range(4): s.text(300 + (b * 3 + 0.5) * 170, 200, str(b + 1), 34, 700, DGOLD)
s.text(1200, 620, 'D I D · I D I · D I D · I D I — las manos siempre se alternan', 34, 700, INK, 'middle', FI)
s.text(1200, 680, 'Di «tri-o-la» en voz alta: las tres sílabas igual de largas', 28, 600, GRAY, 'middle', FI)
s.save('B2_tresillo')

# 16 · Redobles en semicorcheas ----------------------------------------------------------
s = Svg(2400, 760, 'Redobles en semicorcheas')
s.head('Redobles en semicorcheas', 'Cuatro golpes en cada pulso: 1 e y a · manos alternadas, el acento en el pulso')
hits = {k: ('D' if k % 2 == 0 else 'I', k % 4 == 0, None) for k in range(16)}
cnt = []
for b in range(4): cnt += [str(b + 1), 'e', 'y', 'a']
grid(s, 300, 230, cnt, [('Redoblante', hits)], 125, 140, 4)
s.text(1200, 620, 'D I D I · D I D I · D I D I · D I D I', 34, 700, INK, 'middle', FI)
s.text(1200, 680, 'Empieza a 50 BPM: cuando salga parejo tres veces, sube 5 BPM', 28, 600, GRAY, 'middle', FI)
s.save('B2_semicorcheas')

# ===================== MES 5 (clases 17–20) =====================
import math
C8 = ['1', 'y', '2', 'y', '3', 'y', '4', 'y']
HH8 = {k: ('D', False, None) for k in range(8)}
SN = {2: ('I', False, None), 6: ('I', False, None)}
# 17 · Patrones de rock: el bombo cambia ---------------------------------------------
s = Svg(2400, 1500, 'Patrones de rock: el bombo cambia de lugar')
s.head('Patrones de rock', 'Hi-hat en corcheas y redoblante en el 2 y el 4 siempre iguales · solo cambia el bombo')
PAT = [('A', [0, 4]), ('B', [0, 4, 5]), ('C', [0, 3, 4, 5]), ('D', [0, 1, 4, 6])]
for r, (lab, bb) in enumerate(PAT):
    y0 = 200 + r * 320
    s.circle(110, y0 + 150, 44, GOLD, INK, 2); s.text(110, y0 + 166, lab, 44, 700)
    grid(s, 450, y0, C8, [('Hi-hat', HH8), ('Redoblante', SN), ('Bombo', {k: ('PD', False, None) for k in bb})], 230, 80)
s.save('B2_rock_bombo')

# 18 · Desplazamientos ------------------------------------------------------------------
s = Svg(2400, 1000, 'Desplazamientos del hi-hat al contratiempo')
s.head('Desplazamiento: el hi-hat en las «y»', 'El hi-hat se mueve al contratiempo · A: con el bombo en cada pulso · B: con el redoblante')
off = {k: ('D', False, None) for k in (1, 3, 5, 7)}
s.circle(110, 340, 44, GOLD, INK, 2); s.text(110, 356, 'A', 44, 700)
grid(s, 450, 190, C8, [('Hi-hat', off), ('Bombo', {k: ('PD', False, None) for k in (0, 2, 4, 6)})], 230, 90)
s.circle(110, 740, 44, GOLD, INK, 2); s.text(110, 756, 'B', 44, 700)
grid(s, 450, 560, C8, [('Hi-hat', off), ('Redoblante', SN), ('Bombo', {0: ('PD', False, None), 4: ('PD', False, None)})], 230, 90)
s.save('B2_desplazamiento')

# 19 · Fills de 1, 2 y 4 tiempos -----------------------------------------------------------
s = Svg(2400, 1180, 'Fills de uno, dos y cuatro tiempos')
s.head('Fills (rellenos)', 'Tres compases de ritmo y uno de relleno · al terminar: crash + bombo en el 1')
PZC = {'R': ('Redoblante', '#2370D6'), 'T1': ('Tom 1', '#F57C00'), 'T2': ('Tom 2', '#2AA7E8'), 'P': ('Tom de piso', '#283593'), 'Rit': ('Ritmo', '#C9C3B6')}
FIL = [('1 tiempo', ['Rit', 'Rit', 'Rit', 'R']), ('2 tiempos', ['Rit', 'Rit', 'R', 'T1']), ('4 tiempos', ['R', 'T1', 'T2', 'P'])]
for r, (lab, beats) in enumerate(FIL):
    y = 230 + r * 270
    s.text(60, y + 95, lab, 36, 700, INK, 'start')
    for b, pz in enumerate(beats):
        x = 420 + b * 420; nm, col = PZC[pz]
        s.rect(x, y, 400, 190, col if pz != 'Rit' else '#F3F1EA', INK, 2, 18)
        s.text(x + 200, y + 70, str(b + 1) + (' e y a' if pz != 'Rit' else ''), 34, 700, '#FFFFFF' if pz not in ('Rit',) else GRAY)
        s.text(x + 200, y + 140, nm if pz != 'Rit' else 'ritmo de rock', 32, 700, '#FFFFFF' if pz != 'Rit' else GRAY)
    s.circle(2200, y + 95, 70, '#C9A227', INK, 3); s.text(2200, y + 85, 'crash', 28, 700); s.text(2200, y + 120, '+ bombo', 22, 700)
s.text(1200, 1100, 'En cada tiempo del fill: 4 semicorcheas con las manos alternadas (D I D I)', 32, 600, INK, 'middle', FI)
s.save('B2_fills')

# 20 · Afinación en estrella -------------------------------------------------------------
s = Svg(2400, 1100, 'Afinación en estrella y toms escalonados')
s.head('Afinación en estrella', 'Ajusta cada tornillo poco a poco, en este orden: el parche se estira parejo')
cx, cy, R = 600, 600, 320
s.circle(cx, cy, R + 30, '#E8E3D6', INK, 6); s.circle(cx, cy, R - 30, '#F7F4EC', '#C9C3B6', 2)
ORDER = [0, 4, 2, 6, 1, 5, 3, 7]
for pos in range(8):
    a = -math.pi / 2 + pos * math.pi / 4; x, y = cx + R * math.cos(a), cy + R * math.sin(a)
    n = ORDER.index(pos) + 1
    s.circle(x, y, 40, GOLD if n <= 2 else '#FFFFFF', INK, 3); s.text(x, y + 13, str(n), 36, 700)
for k in range(0, 8, 2):
    a1 = -math.pi / 2 + ORDER[k] * math.pi / 4; a2 = -math.pi / 2 + ORDER[k + 1] * math.pi / 4
    s.line(cx + (R - 50) * math.cos(a1), cy + (R - 50) * math.sin(a1), cx + (R - 50) * math.cos(a2), cy + (R - 50) * math.sin(a2), '#C9A227', 3, 'stroke-dasharray="10 8"')
s.text(cx, cy + 10, '¼ de vuelta', 28, 700, GRAY, 'middle', FI)
TOMS = [('Tom 1', 'más agudo', 150), ('Tom 2', 'medio', 185), ('Tom de piso', 'más grave', 230)]
for k, (n, d, r) in enumerate(TOMS):
    x = 1300 + k * 330; y = 560 - k * 0
    s.circle(x, y, r / 2 + 40, '#E8E3D6', INK, 4); s.text(x, y + 10, n, 28, 700); s.text(x, y + r / 2 + 100, d, 26, 600, GRAY, 'middle', FI)
s.text(1630, 860, 'Los toms van de agudo a grave, como una escalera', 30, 600, INK, 'middle', FI)
s.text(1630, 910, '(la distancia exacta entre ellos es a gusto: suele ser una 3.ª o 4.ª, aproximadamente)', 24, 600, GRAY, 'middle', FI)
s.save('B2_afinacion')

# ===================== MES 6 (clases 21–24) =====================
C16 = []
for b in range(4): C16 += [str(b + 1), 'e', 'y', 'a']
# 21 · El puntillo y el shuffle ----------------------------------------------------------
s = Svg(2400, 1250, 'El puntillo y el shuffle')
s.head('El puntillo', 'El puntillo suma la mitad del valor de la figura · el shuffle «largo-corto» sale del tresillo')
s.text(60, 250, 'Negra con puntillo + corchea  ·  «ta-a-ti»  (2 pulsos)', 32, 700, INK, 'start')
grid(s, 520, 280, ['1', 'y', '2', 'y'], [('Redoblante', {0: ('D', True, None), 3: ('I', False, None)})], 300, 110)
s.text(1800, 360, '1½ + ½ = 2 pulsos', 30, 700, DGOLD, 'middle', FI)
s.text(60, 560, 'Corchea con puntillo + semicorchea  ·  «taa-ri»  (1 pulso)', 32, 700, INK, 'start')
grid(s, 520, 590, ['1', 'e', 'y', 'a'], [('Redoblante', {0: ('D', True, None), 3: ('I', False, None)})], 300, 110)
s.text(1800, 670, '¾ + ¼ = 1 pulso', 30, 700, DGOLD, 'middle', FI)
s.text(60, 870, 'Shuffle  ·  tresillo sin la nota del medio: «tri – la»  (1 pulso)', 32, 700, INK, 'start')
grid(s, 520, 900, ['tri', 'o', 'la'], [('Hi-hat', {0: ('D', True, None), 2: ('D', False, None)})], 400, 110, 3)
s.text(1800, 980, 'largo – corto', 30, 700, DGOLD, 'middle', FI)
s.save('B2_puntillo')

# 22 · Estudio del bombo ------------------------------------------------------------------
s = Svg(2400, 1620, 'Estudio del bombo')
s.head('Estudio del bombo', 'Hi-hat en corcheas y redoblante en el 2 y el 4 · el bombo se mueve, también en semicorcheas')
HH16 = {k: ('D', False, None) for k in range(0, 16, 2)}
SN16 = {4: ('I', False, None), 12: ('I', False, None)}
BOM = [('1', 'dos golpes seguidos en corcheas', [0, 2, 8]), ('2', 'bombo en la «y» del 2', [0, 6, 8]), ('3', 'dos golpes en semicorcheas', [0, 1, 8]), ('4', 'bombo en la «a»', [0, 3, 8, 11])]
for r, (n, d, bb) in enumerate(BOM):
    y0 = 190 + r * 350
    s.circle(100, y0 + 150, 42, GOLD, INK, 2); s.text(100, y0 + 165, n, 42, 700)
    s.text(100, y0 + 230, '', 20)
    grid(s, 430, y0, C16, [('Hi-hat', HH16), ('Redoblante', SN16), ('Bombo', {k: ('PD', False, None) for k in bb})], 116, 80, 4)
    s.text(430, y0 + 340, d, 26, 600, GRAY, 'start', FI)
s.save('B2_bombo')

# 23 · Del semicorchea a la fusa: el redoble cerrado ----------------------------------------
s = Svg(2400, 1050, 'Redoble cerrado en fusas')
s.head('Redoble cerrado', 'Dobles golpes (D D I I) tan seguidos que el sonido se vuelve continuo')
s.text(60, 250, 'Semicorcheas · dobles golpes · 4 por pulso', 32, 700, INK, 'start')
grid(s, 420, 280, ['1', 'e', 'y', 'a'], [('Redoblante', {0: ('D', True, None), 1: ('D', False, None), 2: ('I', False, None), 3: ('I', False, None)})], 440, 110)
s.text(60, 620, 'Fusas · dobles golpes · 8 por pulso', 32, 700, INK, 'start')
grid(s, 420, 650, ['1', '', 'e', '', 'y', '', 'a', ''], [('Redoblante', {k: ('D' if (k // 2) % 2 == 0 else 'I', k == 0, None) for k in range(8)})], 220, 110, 8)
s.text(1200, 1000, 'Sube el tempo poco a poco: cuando los dobles golpes van rápido, los dos golpes de cada mano casi se juntan', 28, 600, GRAY, 'middle', FI)
s.save('B2_fusas')

# 24 · Mapa de una canción ---------------------------------------------------------------------
s = Svg(2400, 900, 'Mapa de una canción para la batería')
s.head('El mapa de la canción', 'Antes de tocar, dibujo las partes, el ritmo de cada una y dónde van los fills')
MAP = [('Intro', '4 comp.', 'hi-hat solo', '#C9C3B6', 'p'), ('Estrofa', '8 comp.', 'ritmo suave', '#2AA7E8', 'mp'), ('Coro', '8 comp.', 'ritmo con crash', '#F57C00', 'f'),
       ('Estrofa', '8 comp.', 'ritmo suave', '#2AA7E8', 'mp'), ('Coro', '8 comp.', 'ritmo con crash', '#F57C00', 'f'), ('Final', '2 comp.', 'crash + bombo', '#2E9E4F', 'ff')]
for k, (n, c, r, col, dyn) in enumerate(MAP):
    x = 60 + k * 385
    s.rect(x, 230, 360, 340, col, INK, 2, 20)
    s.text(x + 180, 300, n, 40, 700, '#FFFFFF' if col != '#C9C3B6' else INK); s.text(x + 180, 350, c, 28, 600, '#FFFFFF' if col != '#C9C3B6' else INK, 'middle', FI)
    s.text(x + 180, 420, r, 26, 600, '#FFFFFF' if col != '#C9C3B6' else INK, 'middle', FI)
    s.text(x + 180, 510, dyn, 44, 700, '#FFFFFF' if col != '#C9C3B6' else INK, 'middle', FS, 'font-style="italic"')
    if 0 < k < len(MAP): s.add(f'<path d="M{x - 18} 640 l18 -40 l18 40 Z" fill="{GOLD}" stroke="{INK}" stroke-width="2"/>')
s.text(60, 720, '▲ = fill antes de la parte nueva', 30, 700, DGOLD, 'start', FI)
s.text(60, 790, 'Las letras p, mp, f y ff son las dinámicas: de suave a muy fuerte.', 30, 600, GRAY, 'start', FI)
s.save('B2_mapa')

# ===================== NIVEL 3 · MES 7 (clases 25–28) =====================
# 25 · Paradiddle y ostinato ------------------------------------------------------------
s = Svg(2400, 1300, 'El paradiddle y el ostinato')
s.head('El paradiddle', 'D I D D · I D I I — dos golpes alternos y un doble · el acento en el primero de cada grupo')
PD = ['D', 'I', 'D', 'D', 'I', 'D', 'I', 'I']
grid(s, 360, 200, C16[:8] + C16[:8], [('Redoblante', {k: (PD[k % 8], k % 4 == 0, None) for k in range(16)})], 120, 140, 4)
s.text(60, 600, 'Ostinato: el ride y el bombo no cambian; la mano izquierda lee', 34, 700, INK, 'start')
grid(s, 520, 640, C8, [('Ride', {k: ('D', False, None) for k in range(8)}), ('Redoblante', {1: ('I', False, None), 3: ('I', False, None), 4: ('I', False, None), 7: ('I', False, None)}),
     ('Bombo', {0: ('PD', False, None), 4: ('PD', False, None)}), ('Hi-hat (pie)', {2: ('PI', False, None), 6: ('PI', False, None)})], 220, 100)
s.save('B3_paradiddle')

# 26 · La clave 3-2 y 2-3 ------------------------------------------------------------------
s = Svg(2400, 1000, 'La clave 3-2 y 2-3')
s.head('La clave', 'El patrón de 2 compases que ordena los ritmos latinos · 3 golpes en un compás y 2 en el otro')
def clave(y0, a, b, lab):
    s.text(60, y0 + 120, lab, 40, 700, INK, 'start')
    cnt = ['1', 'y', '2', 'y', '3', 'y', '4', 'y']
    for bar, hits in enumerate((a, b)):
        x0 = 380 + bar * 1000
        for k in range(8):
            x = x0 + k * 120
            s.rect(x + 4, y0, 112, 200, BOX if k % 2 == 0 else '#FAFAF7', rx=12); s.text(x + 60, y0 + 45, cnt[k], 30, 700, INK if k % 2 == 0 else GRAY)
            if k in hits: hitc(s, x + 60, y0 + 125, 'I', 40, False, '●')
        s.text(x0 + 480, y0 + 250, f'compás {bar + 1} · {len(hits)} golpes', 26, 600, GRAY, 'middle', FI)
clave(220, [0, 3, 6], [2, 4], 'Clave 3-2')
clave(600, [2, 4], [0, 3, 6], 'Clave 2-3')
s.save('B3_clave')

# 27 · Notas fantasma, flam y drag ------------------------------------------------------------
s = Svg(2400, 1150, 'Notas fantasma, flam y drag')
s.head('Notas fantasma, flam y drag', 'Golpes muy suaves (entre paréntesis) alrededor de los golpes fuertes')
s.text(60, 250, 'Notas fantasma en el redoblante', 34, 700, INK, 'start')
gh = {4: ('I', True, None), 12: ('I', True, None)}
for k in (7, 9, 14): gh[k] = ('I', False, '( )')
grid(s, 400, 280, C16, [('Redoblante', gh)], 118, 120, 4)
s.text(1200, 520, 'Los golpes acentuados (borde dorado) suenan fuerte; los fantasma, apenas se oyen: baqueta a 1–2 cm (aproximado).', 26, 600, GRAY, 'middle', FI)
for k, (n, desc, gr) in enumerate([('Flam', 'una nota de adorno pegada a la principal', 1), ('Drag', 'dos notas de adorno pegadas a la principal', 2)]):
    x = 300 + k * 1100; y = 700
    s.text(x, y, n, 44, 700, INK, 'start'); s.text(x, y + 50, desc, 26, 600, GRAY, 'start', FI)
    for g in range(gr): s.circle(x + 120 + g * 70, y + 200, 24, '#FFFFFF', '#2370D6', 4); s.text(x + 120 + g * 70, y + 209, 'I', 22, 700, '#2370D6')
    hitc(s, x + 120 + gr * 70 + 90, y + 200, 'D', 52, True)
    s.text(x + 330, y + 320, 'baqueta baja (I) + baqueta alta (D) casi juntas', 24, 600, GRAY, 'middle', FI)
s.save('B3_ghost')

# 28 · Redoble de 5 golpes y fill en tresillos ---------------------------------------------------
s = Svg(2400, 1050, 'Redoble de cinco golpes y fill en tresillos')
s.head('Redoble de 5 golpes', 'Dos dobles golpes y un golpe con acento: D D I I D · luego empieza la otra mano')
FIVE = {0: ('D', False, None), 1: ('D', False, None), 2: ('I', False, None), 3: ('I', False, None), 4: ('D', True, None),
        8: ('I', False, None), 9: ('I', False, None), 10: ('D', False, None), 11: ('D', False, None), 12: ('I', True, None)}
grid(s, 360, 200, C16, [('Redoblante', FIVE)], 120, 140, 4)
s.text(60, 600, 'Fill de 2 tiempos en tresillos por los toms', 34, 700, INK, 'start')
TR = ['3', 'o', 'la', '4', 'o', 'la']
col = ['#2370D6', '#2370D6', '#2370D6', '#F57C00', '#2AA7E8', '#283593']; nm = ['red.', 'red.', 'red.', 'tom 1', 'tom 2', 'piso']
for k in range(6):
    x = 420 + k * 280
    s.rect(x, 650, 260, 230, col[k], INK, 2, 18); s.text(x + 130, 720, TR[k], 34, 700, '#FFFFFF'); s.text(x + 130, 790, ['D', 'I', 'D', 'I', 'D', 'I'][k], 40, 700, '#FFFFFF'); s.text(x + 130, 850, nm[k], 26, 600, '#FFFFFF', 'middle', FI)
s.circle(2200, 765, 80, GOLD, INK, 3); s.text(2200, 755, 'crash', 30, 700); s.text(2200, 790, '+ bombo', 24, 700)
s.save('B3_cinco')

# ===================== NIVEL 3 · MES 8 (clases 29–32) =====================
# 29 · Reggae, ska y dembow ---------------------------------------------------------------
s = Svg(2400, 1520, 'Reggae, ska y dembow')
s.head('Ritmos de contratiempo', 'Reggae (one drop) · ska · dembow: cada uno pone el peso en un lugar distinto')
s.text(60, 240, 'Reggae · one drop', 34, 700, INK, 'start')
grid(s, 480, 260, C8, [('Hi-hat', HH8), ('Aro', {4: ('I', True, None)}), ('Bombo', {4: ('PD', False, None)})], 230, 80)
s.text(60, 680, 'Ska', 34, 700, INK, 'start')
grid(s, 480, 700, C8, [('Hi-hat', {k: ('D', False, None) for k in (1, 3, 5, 7)}), ('Redoblante', SN), ('Bombo', {0: ('PD', False, None), 4: ('PD', False, None)})], 230, 80)
s.text(60, 1120, 'Dembow', 34, 700, INK, 'start')
grid(s, 400, 1140, C16, [('Redoblante', {k: ('I', False, None) for k in (3, 6, 11, 14)}), ('Bombo', {k: ('PD', False, None) for k in (0, 4, 8, 12)})], 116, 100, 4)
s.save('B3_reggae')

# 30 · Funk con notas fantasma -------------------------------------------------------------
s = Svg(2400, 760, 'El funk')
s.head('El funk', 'Hi-hat en corcheas · redoblante fuerte en 2 y 4 con notas fantasma · bombo sincopado')
fk = {4: ('I', True, None), 12: ('I', True, None), 7: ('I', False, '( )'), 9: ('I', False, '( )'), 14: ('I', False, '( )')}
grid(s, 400, 200, C16, [('Hi-hat', HH16), ('Redoblante', fk), ('Bombo', {0: ('PD', False, None), 3: ('PD', False, None), 10: ('PD', False, None)})], 116, 110, 4)
s.text(1200, 700, 'Bombo en el 1, en la «a» del 1 y en la «y» del 3: ese desplazamiento es la síncopa del funk', 28, 600, GRAY, 'middle', FI)
s.save('B3_funk')

# 31 · Mitad y doble tiempo ------------------------------------------------------------------
s = Svg(2400, 1520, 'Mitad de tiempo, tiempo normal y doble tiempo')
s.head('Mitad y doble tiempo', 'El mismo tempo del metrónomo, tres sensaciones distintas · solo cambian el redoblante y el bombo')
TM = [('Mitad de tiempo', 'se siente lento', {4: ('I', True, None)}, [0]), ('Normal', 'el rock de siempre', SN, [0, 4]), ('Doble tiempo', 'se siente rápido', {k: ('I', False, None) for k in (1, 3, 5, 7)}, [0, 2, 4, 6])]
for r, (n, d, sn, bb) in enumerate(TM):
    y0 = 200 + r * 430
    s.text(60, y0 + 140, n, 34, 700, INK, 'start'); s.text(60, y0 + 185, d, 26, 600, GRAY, 'start', FI)
    grid(s, 520, y0, C8, [('Hi-hat', HH8), ('Redoblante', sn), ('Bombo', {k: ('PD', False, None) for k in bb})], 220, 90)
s.save('B3_tiempos')

# 32 · Mi primer solo -------------------------------------------------------------------------
s = Svg(2400, 1050, 'Plan de un solo de ocho compases')
s.head('Mi primer solo · 8 compases', 'Un solo es una historia corta: idea, repetición, subida y final')
SOL = [('1–2', 'Idea', 'un ritmo corto en el redoblante', '#2AA7E8'), ('3–4', 'Repetición', 'la misma idea, cambiando el final', '#2E9E4F'),
       ('5–6', 'Subida', 'más fuerte, por los toms', '#F57C00'), ('7–8', 'Final', 'redoble de 5 golpes + crash y bombo', '#E5312B')]
for k, (c, n, d, col) in enumerate(SOL):
    x = 80 + k * 570
    s.rect(x, 220, 540, 360, col, INK, 2, 22)
    s.text(x + 270, 300, 'compases ' + c, 30, 700, '#FFFFFF'); s.text(x + 270, 390, n, 50, 700, '#FFFFFF'); s.text(x + 270, 470, d, 24, 600, '#FFFFFF', 'middle', FI)
s.text(60, 700, '«Cuatro y cuatro»: el profesor toca 4 compases de solo, yo respondo con 4; la banda mantiene el pulso', 30, 700, INK, 'start', FI)
for k in range(8):
    x = 80 + k * 285; who = 'profesor' if (k // 4) % 2 == 0 else 'yo'
    s.rect(x, 760, 265, 140, '#C9C3B6' if who == 'profesor' else GOLD, INK, 2, 16)
    s.text(x + 132, 820, str(k + 1), 34, 700); s.text(x + 132, 870, who, 26, 600, INK, 'middle', FI)
s.text(1200, 990, 'Consejo: deja silencios y vuelve siempre al 1 con fuerza', 28, 600, GRAY, 'middle', FI)
s.save('B3_solo')
print('ok')
