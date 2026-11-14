#!/usr/bin/env python3
"""Láminas del Método Integral AMA de Bajo (bajo de 5 cuerdas). Dibujos originales AMA.
Uso: python3 laminas.py <carpeta de salida>   (normalmente academia-arpa/bajo/img)"""
import sys, os
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
FT = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; FI = "Inter, 'Segoe UI', Arial, sans-serif"
INK, GRAY, GOLD, DGOLD, BOX = '#1A1A1A', '#5F6368', '#C9A227', '#8A6A0A', '#EEF0F4'
WOOD, FRET, STR, BODY = '#F4E9D8', '#8C8279', '#4E453D', '#6B3E26'
COL = {'DO': '#E5312B', 'RE': '#F57C00', 'MI': '#FFD21F', 'FA': '#2E9E4F', 'SOL': '#2AA7E8', 'LA': '#283593', 'SI': '#8E3BB8'}
WHITE_TXT = {'DO', 'LA', 'SI'}
CHROM = ['DO', 'DO♯', 'RE', 'RE♯', 'MI', 'FA', 'FA♯', 'SOL', 'SOL♯', 'LA', 'LA♯', 'SI']
# cuerdas del bajo de 5: 1 SOL (aguda) … 5 SI (grave)
OPEN = {1: 7, 2: 2, 3: 9, 4: 4, 5: 11}
SNAME = {1: 'SOL', 2: 'RE', 3: 'LA', 4: 'MI', 5: 'SI'}

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

def pill(s, x, y, name, size=26, w=None):
    base = name.rstrip('♯♭'); alt = name != base
    fill = INK if alt else COL[base]; tc = '#FFFFFF' if (alt or base in WHITE_TXT) else INK
    w = w or max(70, len(name) * size * 0.72 + 22)
    s.rect(x - w / 2, y - size * 0.95, w, size * 1.7, fill, INK, 2.5, size * 0.85); s.text(x, y + size * 0.38, name, size, 700, tc)

def num(s, x, y, n): s.circle(x, y, 26, GOLD, INK, 2); s.text(x, y + 10, str(n), 28, 700)

def fretboard(s, x0, y0, frets, fw, sg, strings=(1, 2, 3, 4, 5)):
    """Diapasón horizontal: la 1.ª cuerda (SOL) arriba, como en la tablatura."""
    n = len(strings); W = frets * fw
    s.rect(x0, y0 - sg * 0.6, W, sg * (n - 1) + sg * 1.2, WOOD, FRET, 2, 10)
    for f in range(1, frets + 1): s.line(x0 + f * fw, y0 - sg * 0.6, x0 + f * fw, y0 + sg * (n - 1) + sg * 0.6, FRET, 5)
    s.rect(x0 - 12, y0 - sg * 0.6, 14, sg * (n - 1) + sg * 1.2, INK)
    for i, st in enumerate(strings):
        s.line(x0 - 60, y0 + i * sg, x0 + W, y0 + i * sg, STR, 2 + st * 1.1)
        s.text(x0 - 185, y0 + i * sg + 10, f'{st}.ª', 26, 600, GRAY)
        pill(s, x0 - 120, y0 + i * sg, SNAME[st], 20, 66)
    for f in (3, 5, 7, 9):
        if f <= frets: s.circle(x0 + (f - 0.5) * fw, y0 + sg * (n - 1) / 2, 10, '#D8CBB4')
    for f in range(1, frets + 1): s.text(x0 + (f - 0.5) * fw, y0 + sg * (n - 1) + sg * 0.6 + 40, str(f), 24, 600, GRAY)

def fx(x0, fw, f): return x0 - 40 if f == 0 else x0 + (f - 0.5) * fw

def fclef(s, x, y0, sp):
    """Clave de fa dibujada: el punto grande y los dos puntos rodean la 4.ª línea (FA)."""
    y4 = y0 + sp  # 4.ª línea (contando desde abajo) = segunda desde arriba
    s.circle(x + 14, y4, sp * 0.32, INK)
    s.add(f'<path d="M {x+4:.1f} {y4:.1f} C {x+4:.1f} {y4-sp*1.3:.1f}, {x+sp*1.9:.1f} {y4-sp*1.3:.1f}, {x+sp*1.9:.1f} {y4+sp*0.2:.1f} C {x+sp*1.9:.1f} {y4+sp*1.6:.1f}, {x+sp*0.9:.1f} {y4+sp*2.6:.1f}, {x:.1f} {y4+sp*3.1:.1f}" fill="none" stroke="{INK}" stroke-width="{sp*0.22:.1f}" stroke-linecap="round"/>')
    s.circle(x + sp * 2.4, y4 - sp * 0.5, sp * 0.14, INK); s.circle(x + sp * 2.4, y4 + sp * 0.5, sp * 0.14, INK)

def staff(s, x1, x2, y0, sp):
    for k in range(5): s.line(x1, y0 + k * sp, x2, y0 + k * sp, INK, 3)
    fclef(s, x1 + 14, y0, sp)

# Escritura en clave de fa (como se escribe el bajo): paso 0 = SOL de la 1.ª línea
LET = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']
def step_of(name, octv): return (octv * 7 + LET.index(name)) - (2 * 7 + 4)  # SOL2 = 0
def note_bf(s, x, y0, sp, name, octv, half=False):
    st = step_of(name, octv); yb = y0 + 4 * sp; y = yb - st * sp / 2
    for k in range(-2, st - 1, -2): s.line(x - 34, yb - k * sp / 2, x + 34, yb - k * sp / 2, INK, 3)
    for k in range(10, st + 1, 2): s.line(x - 34, yb - k * sp / 2, x + 34, yb - k * sp / 2, INK, 3)
    s.add(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{sp*0.62:.1f}" ry="{sp*0.44:.1f}" transform="rotate(-20 {x:.1f} {y:.1f})" fill="{COL[name]}" stroke="{INK}" stroke-width="2.5"/>')
    if half: s.add(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{sp*0.36:.1f}" ry="{sp*0.17:.1f}" transform="rotate(-35 {x:.1f} {y:.1f})" fill="#FFFFFF"/>')
    up = st < 4; sx = x + sp * 0.55 if up else x - sp * 0.55
    s.line(sx, y, sx, y - 3.3 * sp if up else y + 3.3 * sp, INK, 3.5)
    return y

# ===================== NIVEL 1 · MES 1 (clases 1–4) =====================
# 1 · Las cuerdas del bajo -------------------------------------------------------------
s = Svg(2400, 1180, 'Las cinco cuerdas del bajo')
s.head('Las cuerdas de mi bajo', 'Bajo de 5 cuerdas: de la más aguda (1.ª, arriba) a la más grave (5.ª, abajo)')
fretboard(s, 420, 300, 5, 300, 120)
for i, st in enumerate((1, 2, 3, 4, 5)):
    s.text(2000, 300 + i * 120 + 12, ['la más aguda', '', '', '', 'la más grave'][i], 28, 600, GRAY, 'middle', FI)
s.rect(120, 900, 2160, 200, BOX, 'none', 0, 20)
s.text(160, 970, 'Para recordarlas, de la 5.ª a la 1.ª:  SI · MI · LA · RE · SOL', 34, 700, INK, 'start')
s.text(160, 1040, 'Bajo de 4 cuerdas: igual, pero sin la cuerda SI. Si tu bajo es de 4, omite siempre la cuerda SI.', 28, 600, DGOLD, 'start', FI)
s.save('J1_cuerdas')

# 1 · El bajo en la banda --------------------------------------------------------------
s = Svg(2400, 900, 'El bajo en la banda')
s.head('El bajo: el puente de la banda', 'Une el ritmo de la batería con la armonía del piano y la guitarra')
for k, (t, d, c) in enumerate([('Batería', 'el ritmo y el pulso', '#E5312B'), ('Bajo', 'notas graves con ritmo', GOLD), ('Piano y guitarra', 'los acordes (armonía)', '#2AA7E8')]):
    x = 120 + k * 760
    s.rect(x, 260, 640, 330, c, INK, 2, 26)
    s.text(x + 320, 400, t, 56, 700, '#FFFFFF' if k != 1 else INK); s.text(x + 320, 480, d, 30, 600, '#FFFFFF' if k != 1 else INK, 'middle', FI)
for x in (790, 1550): s.text(x + 30, 445, '⟷', 70, 700)
s.text(1200, 700, 'El bajo toca con el bombo (ritmo) y sobre la nota principal del acorde (armonía).', 32, 700, INK, 'middle', FI)
s.text(1200, 770, 'Si el bajo se detiene, la banda «pierde el piso».', 28, 600, GRAY, 'middle', FI)
s.save('J1_banda')

# 2 · Partes del bajo ------------------------------------------------------------------
s = Svg(2400, 1100, 'Las partes del bajo eléctrico')
s.head('Las 10 partes de mi bajo', 'Bajo eléctrico de 5 cuerdas · vista de frente')
cy = 560
# pala y clavijas
s.add(f'<path d="M 120 {cy-110} L 380 {cy-80} L 380 {cy+80} L 120 {cy+120} Z" fill="{BODY}" stroke="{INK}" stroke-width="3"/>')
for k in range(5): s.circle(170 + k * 46, cy - 128 + k * 6 if k < 3 else cy + 130 - (k - 3) * 6, 18, '#C7C7C7', INK, 2)
# mástil
s.rect(380, cy - 70, 1080, 140, WOOD, FRET, 3, 6); s.rect(372, cy - 70, 14, 140, INK)
fw = 1080 / 14
for f in range(1, 15): s.line(380 + f * fw, cy - 70, 380 + f * fw, cy + 70, FRET, 4)
for f in (3, 5, 7, 9): s.circle(380 + (f - 0.5) * fw, cy, 9, '#BBA98C')
for d in (-30, 30): s.circle(380 + 11.5 * fw, cy + d, 9, '#BBA98C')
# cuerpo
s.add(f'<path d="M 1440 {cy-150} C 1560 {cy-330}, 1760 {cy-300}, 1880 {cy-230} C 2000 {cy-170}, 2140 {cy-300}, 2260 {cy-200} C 2340 {cy-120}, 2340 {cy+120}, 2260 {cy+210} C 2140 {cy+320}, 1980 {cy+220}, 1860 {cy+260} C 1700 {cy+310}, 1520 {cy+300}, 1440 {cy+150} Z" fill="{BODY}" stroke="{INK}" stroke-width="3"/>')
s.rect(1650, cy - 80, 70, 160, INK, 'none', 0, 10); s.rect(1820, cy - 80, 70, 160, INK, 'none', 0, 10)
s.rect(2050, cy - 85, 90, 170, '#9AA0A6', INK, 2, 8)
for k in range(3): s.circle(2060 + k * 70, cy + 190, 22, '#C7C7C7', INK, 2)
s.circle(2290, cy + 150, 14, '#C7C7C7', INK, 2)
for k in range(5): s.line(250, cy - 40 + k * 20, 2110, cy - 40 + k * 20, STR, 1.5 + (4 - k) * 0.6)
PTS = [(1, 'Pala', 230, cy - 20, 230, 300), (2, 'Clavijas', 260, cy + 140, 300, 920), (3, 'Cejuela', 378, cy - 70, 420, 300),
       (4, 'Mástil y diapasón', 900, cy - 70, 760, 300), (5, 'Trastes', 380 + 6 * fw, cy + 70, 860, 920), (6, 'Marcadores', 380 + 4.5 * fw, cy, 1100, 300),
       (7, 'Cuerpo', 1560, cy - 200, 1500, 300), (8, 'Pastillas', 1760, cy + 80, 1640, 920), (9, 'Puente', 2095, cy - 85, 2000, 300), (10, 'Controles y salida', 2130, cy + 210, 2100, 920)]
for n, lab, px, py, lx, ly in PTS:
    s.line(px, py, lx, ly + (30 if ly < cy else -30), GRAY, 2)
    num(s, lx, ly + (0 if ly < cy else 0), n); s.text(lx, ly + (-44 if ly < cy else 66), lab, 28, 700)
s.text(1200, 1070, 'Los controles cambian el volumen y el tono; la salida (jack) conecta el cable al amplificador', 26, 600, GRAY, 'middle', FI)
s.save('J1_partes')

# 2 · Los dedos -----------------------------------------------------------------------
s = Svg(2400, 1050, 'Los dedos de cada mano en el bajo')
s.head('Mis dedos en el bajo', 'Mano izquierda: números · mano derecha: letras')
s.text(80, 230, 'Mano izquierda: un dedo por traste', 36, 700, INK, 'start')
fretboard(s, 330, 330, 4, 260, 80)
for f, c in zip((1, 2, 3, 4), ('#E5312B', '#F57C00', '#2E9E4F', '#2370D6')):
    s.circle(330 + (f - 0.5) * 260, 330 + 3 * 80, 34, c, INK, 2); s.text(330 + (f - 0.5) * 260, 330 + 3 * 80 + 12, str(f), 34, 700, '#FFFFFF')
for k, (n, d) in enumerate([('1', 'índice'), ('2', 'medio'), ('3', 'anular'), ('4', 'meñique')]):
    s.text(1500 + (k % 2) * 420, 360 + (k // 2) * 80, f'{n} = {d}', 32, 700, INK, 'start')
s.text(1500, 560, 'El pulgar va detrás del mástil, a la altura del dedo 2', 26, 600, GRAY, 'start', FI)
s.text(80, 810, 'Mano derecha: índice (i) y medio (m), siempre alternando', 36, 700, INK, 'start')
for k in range(8):
    x = 200 + k * 200; lab = 'i' if k % 2 == 0 else 'm'
    s.circle(x, 920, 52, '#E5312B' if lab == 'i' else '#2370D6', INK, 2); s.text(x, 938, lab, 48, 700, '#FFFFFF')
s.text(1900, 910, 'el pulgar descansa', 28, 600, GRAY, 'middle', FI); s.text(1900, 950, 'en la pastilla o en la cuerda SI', 28, 600, GRAY, 'middle', FI)
s.save('J1_dedos')

# 3 · Apagar las cuerdas --------------------------------------------------------------
s = Svg(2400, 1000, 'Apagar las cuerdas que no suenan')
s.head('Solo suena la cuerda que toco', 'Las demás cuerdas se apagan para que el bajo suene limpio')
y0 = 320
for i, st in enumerate((1, 2, 3, 4, 5)):
    y = y0 + i * 110; on = st == 3
    s.line(380, y, 1700, y, STR if on else '#C9C3B6', 3 + st * 1.1)
    pill(s, 300, y, SNAME[st], 22, 76)
    s.text(1760, y + 10, 'suena' if on else 'apagada', 30, 700, '#2E9E4F' if on else GRAY, 'start', FI)
s.add(f'<path d="M 900 {y0+110-30} q 30 -40 60 0 q 30 40 60 0 q 30 -40 60 0" fill="none" stroke="#2E9E4F" stroke-width="5"/>')
s.rect(80, 860, 1080, 110, BOX, 'none', 0, 18); s.text(120, 928, 'Mano izquierda: los dedos tocan suave las cuerdas agudas', 26, 700, INK, 'start', FI)
s.rect(1240, 860, 1080, 110, BOX, 'none', 0, 18); s.text(1280, 928, 'Pulgar derecho: descansa sobre las cuerdas graves', 26, 700, INK, 'start', FI)
s.save('J1_apagar')

# 4 · Clave de fa y notas en la cuerda MI ----------------------------------------------
s = Svg(2400, 1300, 'La clave de fa y las notas MI, FA y SOL en la cuerda MI')
s.head('La clave de fa', 'El bajo se lee en clave de fa: sus dos puntos rodean la 4.ª línea, donde vive FA')
sp = 40; y0 = 300
staff(s, 120, 1100, y0, sp)
yfa = y0 + sp; s.text(1140, yfa + 12, '← 4.ª línea = FA', 30, 700, '#2E9E4F', 'start', FI)
s.text(600, y0 + 4 * sp + 90, 'Líneas de abajo hacia arriba: SOL · SI · RE · FA · LA', 28, 600, GRAY, 'middle', FI)
s.text(1500, 260, 'Cuerda MI (4.ª) · traste 0, 1 y 3', 34, 700, INK, 'start')
staff(s, 1500, 2300, y0 + 40, sp)
for k, (n, o) in enumerate([('MI', 2), ('FA', 2), ('SOL', 2)]):
    x = 1760 + k * 200; note_bf(s, x, y0 + 40, sp, n, o)
s.text(1900, y0 + 40 + 4 * sp + 150, 'MI en la 1.ª línea adicional de abajo · FA en el espacio de abajo · SOL en la 1.ª línea', 22, 600, GRAY, 'middle', FI)
fretboard(s, 600, 780, 4, 300, 80)
for f, n in ((0, 'MI'), (1, 'FA'), (3, 'SOL')):
    if f: pill(s, fx(600, 300, f), 780 + 3 * 80, n, 24, 80)
    else: s.circle(fx(600, 300, 0), 780 + 3 * 80, 26, COL['MI'], INK, 2); s.text(fx(600, 300, 0), 780 + 3 * 80 + 8, 'MI', 20, 700)
s.text(1200, 1260, 'El bajo suena una octava más grave de lo que se escribe: así sus notas caben en el pentagrama', 26, 600, DGOLD, 'middle', FI)
s.save('J1_clavefa')

# ===================== NIVEL 1 · MES 2 (clases 5–8) =====================
def bar_grid(s, x0, y0, cw, rows, counts=('1', '2', '3', '4')):
    for k, c in enumerate(counts):
        s.rect(x0 + k * cw + 4, y0, cw - 8, 70 + 110 * len(rows), BOX, 'none', 0, 14); s.text(x0 + (k + 0.5) * cw, y0 + 50, c, 34, 700)
    for r, (name, hits, col) in enumerate(rows):
        y = y0 + 70 + r * 110 + 55
        s.text(x0 - 30, y + 11, name, 30, 700, INK, 'end'); s.line(x0, y, x0 + len(counts) * cw, y, '#D5D9E0', 2)
        for k, lab, ln in hits:
            if ln > 1: s.rect(x0 + (k + 0.5) * cw, y - 12, (ln - 1) * cw, 24, col, 'none', 0, 12)
            s.circle(x0 + (k + 0.5) * cw, y, 38, col, INK, 2); s.text(x0 + (k + 0.5) * cw, y + 12, lab, 30, 700, '#FFFFFF' if col != COL['MI'] else INK)

# 5 · El bajo con el bombo ---------------------------------------------------------------
s = Svg(2400, 1150, 'El bajo toca con el bombo')
s.head('El bajo y el bombo, juntos', 'Mismo pulso, mismo lugar: así la banda suena firme')
s.text(60, 240, 'Negras: una nota en cada pulso', 34, 700, INK, 'start')
bar_grid(s, 420, 270, 440, [('Bombo', [(k, '●', 1) for k in range(4)], '#2E9E4F'), ('Bajo', [(k, 'MI', 1) for k in range(4)], COL['MI'])])
s.text(60, 720, 'Blancas: el bajo suena 2 pulsos, en el 1 y en el 3', 34, 700, INK, 'start')
bar_grid(s, 420, 750, 440, [('Bombo', [(0, '●', 1), (2, '●', 1)], '#2E9E4F'), ('Bajo', [(0, 'LA', 2), (2, 'LA', 2)], COL['LA'])])
s.save('J1_bombo')

# 6 · Cuerda LA ---------------------------------------------------------------------------
s = Svg(2400, 1200, 'Las notas LA, SI y DO en la cuerda LA')
s.head('Cuerda LA (3.ª): LA · SI · DO', 'Al aire, traste 2 (dedo 2) y traste 3 (dedo 3)')
sp = 40
staff(s, 140, 1000, 280, sp)
for k, (n, o) in enumerate([('LA', 2), ('SI', 2), ('DO', 3)]): note_bf(s, 470 + k * 200, 280, sp, n, o)
s.text(570, 280 + 4 * sp + 90, 'LA: 1.er espacio · SI: 2.ª línea · DO: 2.º espacio', 26, 600, GRAY, 'middle', FI)
fretboard(s, 1350, 300, 4, 230, 70)
y3 = 300 + 2 * 70
s.circle(fx(1350, 230, 0), y3, 24, COL['LA'], INK, 2); s.text(fx(1350, 230, 0), y3 + 8, 'LA', 18, 700, '#FFFFFF')
pill(s, fx(1350, 230, 2), y3, 'SI', 22, 70); pill(s, fx(1350, 230, 3), y3, 'DO', 22, 76)
s.text(60, 830, 'El silencio en el bajo: apago la cuerda con la mano', 34, 700, INK, 'start')
for k, (a, b) in enumerate([('3/4 · vals', ['LA', '𝄽', '𝄽']), ('4/4', ['DO', '𝄽', 'SI', '𝄽'])]):
    x0 = 120 + k * 1150; s.text(x0, 920, a, 30, 700, GRAY, 'start', FI)
    for j, n in enumerate(b):
        x = x0 + 60 + j * 230
        if n in COL: pill(s, x + 40, 1030, n, 30, 110)
        else: s.rect(x - 15, 985, 110, 90, BOX, 'none', 0, 14); s.text(x + 40, 1045, 'silencio', 22, 700, GRAY, 'middle', FI)
s.text(1200, 1160, 'En el silencio, la mano izquierda afloja el dedo (sin soltar la cuerda) y la nota se apaga', 26, 600, DGOLD, 'middle', FI)
s.save('J1_cuerdaLA')

# 7 · Cuerda RE y corcheas -------------------------------------------------------------------
s = Svg(2400, 1150, 'Las notas RE, MI y FA en la cuerda RE y las corcheas')
s.head('Cuerda RE (2.ª): RE · MI · FA', 'Al aire, traste 2 (dedo 2) y traste 3 (dedo 3)')
staff(s, 140, 1000, 280, sp)
for k, (n, o) in enumerate([('RE', 3), ('MI', 3), ('FA', 3)]): note_bf(s, 470 + k * 200, 280, sp, n, o)
s.text(570, 280 + 4 * sp + 90, 'RE: 3.ª línea · MI: 3.er espacio · FA: 4.ª línea', 26, 600, GRAY, 'middle', FI)
fretboard(s, 1350, 300, 4, 230, 70)
y2 = 300 + 70
s.circle(fx(1350, 230, 0), y2, 24, COL['RE'], INK, 2); s.text(fx(1350, 230, 0), y2 + 8, 'RE', 18, 700)
pill(s, fx(1350, 230, 2), y2, 'MI', 22, 70); pill(s, fx(1350, 230, 3), y2, 'FA', 22, 70)
s.text(60, 820, 'Corcheas: dos notas en cada pulso, alternando i y m', 34, 700, INK, 'start')
for k in range(8):
    x = 260 + k * 250; c = str(k // 2 + 1) if k % 2 == 0 else 'y'
    s.text(x, 900, c, 34, 700, INK if k % 2 == 0 else GRAY)
    lab = 'i' if k % 2 == 0 else 'm'; s.circle(x, 990, 44, '#E5312B' if lab == 'i' else '#2370D6', INK, 2); s.text(x, 1006, lab, 40, 700, '#FFFFFF')
s.text(1200, 1100, 'Digo «ti-ti» en cada pulso · el pie sigue marcando solo el 1, 2, 3, 4', 26, 600, DGOLD, 'middle', FI)
s.save('J1_cuerdaRE')

# 8 · Himno de la alegría en el bajo ---------------------------------------------------------
s = Svg(2400, 1300, 'Himno de la alegría en el bajo')
s.head('«Himno de la alegría» · L. van Beethoven', 'Melodía de dominio público · versión AMA para bajo, en clave de fa')
MEL = [[('MI', 1), ('MI', 1), ('FA', 1), ('SOL', 1)], [('SOL', 1), ('FA', 1), ('MI', 1), ('RE', 1)], [('DO', 1), ('DO', 1), ('RE', 1), ('MI', 1)], [('MI', 1), ('RE', 1), ('RE', 2)],
       [('MI', 1), ('MI', 1), ('FA', 1), ('SOL', 1)], [('SOL', 1), ('FA', 1), ('MI', 1), ('RE', 1)], [('DO', 1), ('DO', 1), ('RE', 1), ('MI', 1)], [('RE', 1), ('DO', 1), ('DO', 2)]]
sp = 36
for row in range(2):
    y0 = 230 + row * 330; x1, x2 = 120, 2280
    staff(s, x1, x2, y0, sp); bw = (x2 - x1 - 160) / 4
    for b in range(4):
        bx = x1 + 160 + b * bw
        s.line(bx + bw, y0, bx + bw, y0 + 4 * sp, INK, 3 if b < 3 else 7)
        t = 0
        for n, d in MEL[row * 4 + b]:
            note_bf(s, bx + 60 + t * (bw - 80) / 4, y0, sp, n, 3, half=(d == 2)); t += d
s.text(60, 950, 'Dónde toco cada nota', 34, 700, INK, 'start')
MAP = [('DO', 'cuerda LA · traste 3'), ('RE', 'cuerda RE al aire'), ('MI', 'cuerda RE · traste 2'), ('FA', 'cuerda RE · traste 3'), ('SOL', 'cuerda SOL al aire')]
for k, (n, d) in enumerate(MAP):
    x = 80 + k * 460; s.rect(x, 990, 430, 200, BOX, 'none', 0, 18); pill(s, x + 215, 1060, n, 32, 130); s.text(x + 215, 1150, d, 24, 600, INK, 'middle', FI)
s.text(1200, 1260, 'Nueva: SOL es la 1.ª cuerda al aire · la blanca dura 2 pulsos', 26, 600, DGOLD, 'middle', FI)
s.save('J1_himno')

# ===================== NIVEL 1 · MES 3 (clases 9–12) =====================
def tab(s, x0, y0, w, items, gap=46, lab=True):
    """Tablatura de 5 líneas (SOL arriba, SI abajo). items: [(cuerda, traste, nota)]"""
    for i, st in enumerate((1, 2, 3, 4, 5)):
        s.line(x0, y0 + i * gap, x0 + w, y0 + i * gap, '#9AA0A6', 3)
        if lab: s.text(x0 - 20, y0 + i * gap + 10, SNAME[st][0] if st != 1 else 'G', 26, 700, GRAY, 'end')
    s.text(x0 + 40, y0 + 2 * gap + 12, 'TAB', 30, 700, INK, 'middle')
    step = (w - 120) / len(items)
    for k, (st, fr, n) in enumerate(items):
        x = x0 + 120 + (k + 0.5) * step; y = y0 + (st - 1) * gap
        s.rect(x - 22, y - 22, 44, 44, '#FFFFFF'); s.text(x, y + 12, str(fr), 34, 700, COL.get(n, INK) if n not in ('MI',) else DGOLD)

# 9 · La raíz del acorde -------------------------------------------------------------------
s = Svg(2400, 1150, 'La raíz de los acordes en el bajo')
s.head('La raíz: la nota que nombra al acorde', 'El bajo toca la letra del cifrado · la «m» de menor no cambia la nota del bajo')
fretboard(s, 520, 300, 4, 300, 90)
ROOT = [(3, 3, 'C', 'DO'), (2, 0, 'D', 'RE'), (4, 0, 'E', 'MI'), (4, 1, 'F', 'FA'), (4, 3, 'G', 'SOL'), (3, 0, 'A', 'LA')]
for st, fr, ch, n in ROOT:
    y = 300 + (st - 1) * 90; x = fx(520, 300, fr) if fr else 520 - 40
    pill(s, x, y, n, 22, 84 if len(n) > 2 else 70)
    s.text(x, y - 34, ch, 28, 700, INK)
s.text(1900, 330, 'Cifrado → nota del bajo', 32, 700)
for k, (ch, n) in enumerate([('C', 'DO'), ('G', 'SOL'), ('Am', 'LA'), ('F', 'FA'), ('Em', 'MI'), ('D', 'RE')]):
    y = 410 + k * 70; s.text(1800, y, ch, 34, 700, INK, 'end'); s.text(1830, y, '→', 30, 700, GRAY, 'middle'); pill(s, 1920, y - 10, n, 22, 84)
s.rect(120, 960, 2160, 140, BOX, 'none', 0, 20)
s.text(1200, 1020, 'Mayor (C) y menor (Cm) tienen la misma raíz: DO. Lo que cambia son las notas del piano y la guitarra.', 28, 700, INK, 'middle', FI)
s.text(1200, 1070, 'Si hay una barra (C/E), el bajo toca la nota después de la barra: MI.', 24, 600, DGOLD, 'middle', FI)
s.save('J1_raiz')

# 10 · Tonos y semitonos · cuerda SI ---------------------------------------------------------
s = Svg(2400, 1200, 'Tonos y semitonos en el bajo y la cuerda SI')
s.head('Un traste = un semitono · dos trastes = un tono', 'Cuerda SI (5.ª): SI al aire · DO traste 1 · RE traste 3')
x0, fw = 300, 250
fretboard(s, x0, 300, 5, fw, 70, strings=(5,))
for fr, n in ((0, 'SI'), (1, 'DO'), (2, 'DO♯'), (3, 'RE'), (4, 'RE♯'), (5, 'MI')):
    x = fx(x0, fw, fr) if fr else x0 - 40
    if fr == 0: s.circle(x, 300, 26, COL['SI'], INK, 2); s.text(x, 308, 'SI', 18, 700, '#FFFFFF')
    else: pill(s, x, 300, n, 22, 86)
for a, b, lab, c in ((0, 1, 'semitono', '#E5312B'), (1, 3, 'tono', '#2370D6'), (3, 5, 'tono', '#2370D6')):
    xa = fx(x0, fw, a) if a else x0 - 40; xb = fx(x0, fw, b)
    s.add(f'<path d="M {xa:.0f} 410 Q {(xa+xb)/2:.0f} 480 {xb:.0f} 410" fill="none" stroke="{c}" stroke-width="5"/>'); s.text((xa + xb) / 2, 510, lab, 28, 700, c)
s.text(1800, 300, 'MI–FA y SI–DO:', 30, 700, INK, 'start'); s.text(1800, 345, 'semitonos naturales', 26, 600, GRAY, 'start', FI)
s.text(80, 600, 'En el pentagrama (clave de fa): debajo, con líneas adicionales', 32, 700, INK, 'start')
staff(s, 140, 1300, 680, 40)
for k, (n, o) in enumerate([('SI', 1), ('DO', 2), ('RE', 2)]): note_bf(s, 520 + k * 240, 680, 40, n, o)
s.text(1700, 760, 'SI cuelga de la 2.ª línea adicional', 26, 600, GRAY, 'start', FI)
s.text(1700, 810, 'DO va sobre la 2.ª línea adicional', 26, 600, GRAY, 'start', FI)
s.text(1700, 860, 'RE va entre las dos líneas adicionales', 26, 600, GRAY, 'start', FI)
s.text(1200, 1150, 'Bajo de 4 cuerdas: estas notas graves no existen; tócalas una octava arriba (DO: cuerda LA, traste 3)', 26, 600, DGOLD, 'middle', FI)
s.save('J1_semitono')

# 11 · Escala de Do ----------------------------------------------------------------------------
s = Svg(2400, 1250, 'La escala de Do en el bajo de cinco cuerdas')
s.head('La escala de Do · una octava', 'Bajo de 5 cuerdas: empieza en la cuerda SI, traste 1 · todo en los trastes 0 a 3')
ESC = [('DO', 2, 5, 1), ('RE', 2, 5, 3), ('MI', 2, 4, 0), ('FA', 2, 4, 1), ('SOL', 2, 4, 3), ('LA', 2, 3, 0), ('SI', 2, 3, 2), ('DO', 3, 3, 3)]
staff(s, 140, 2280, 260, 36)
for k, (n, o, st, fr) in enumerate(ESC): note_bf(s, 470 + k * 230, 260, 36, n, o)
for k, d in enumerate(['T', 'T', 'S', 'T', 'T', 'T', 'S']):
    x = 470 + (k + 0.5) * 230; c = '#E5312B' if d == 'S' else '#2370D6'
    s.circle(x, 560, 30, c, INK, 2); s.text(x, 571, d, 28, 700, '#FFFFFF')
tab(s, 230, 680, 2050, [(st, fr, n) for n, o, st, fr in ESC])
for k, (n, o, st, fr) in enumerate(ESC): pill(s, 230 + 120 + (k + 0.5) * (2050 - 120) / 8, 950, n, 22, 84)
s.text(1200, 1060, 'Dedos: traste 1 = dedo 1 · traste 2 = dedo 2 · traste 3 = dedo 3 · al aire = sin dedo', 28, 700, INK, 'middle', FI)
s.text(1200, 1130, 'Bajo de 4 cuerdas: empieza en DO de la cuerda LA (traste 3) y sigue en las cuerdas RE y SOL', 26, 600, DGOLD, 'middle', FI)
s.save('J1_escala')

# 12 · Mapa de raíces de una canción ------------------------------------------------------------
s = Svg(2400, 1150, 'Raíces de «Cuando los santos marchan»')
s.head('«Cuando los santos marchan» (tradicional) · las raíces', 'Leo el cifrado, toco la raíz de cada acorde: un compás por acorde, en negras o blancas')
SANTOS = ['C', 'C', 'C', 'C', 'C', 'C', 'G', 'G', 'C', 'C', 'F', 'F', 'C', 'G', 'C', 'C']
RN = {'C': 'DO', 'G': 'SOL', 'F': 'FA'}
for k, ch in enumerate(SANTOS):
    r, c = divmod(k, 4); x = 140 + c * 540; y = 230 + r * 200
    s.rect(x, y, 520, 160, BOX, 'none', 0, 16); s.line(x + 520, y + 10, x + 520, y + 150, INK, 4)
    s.text(x + 40, y + 60, ch, 40, 700, INK, 'start')
    for j in range(4): pill(s, x + 150 + j * 95, y + 105, RN[ch], 18, 78)
s.text(1200, 1080, 'DO: cuerda LA traste 3 (o cuerda SI traste 1) · FA: cuerda MI traste 1 · SOL: cuerda MI traste 3', 26, 600, DGOLD, 'middle', FI)
s.save('J1_santos')

# ===================== NIVEL 2 · MES 4 (clases 13–16) =====================
def shape(s, x0, y0, fw, sg, frets, strings, marks):
    """marks: [(cuerda, traste, etiqueta, color, nota)] sobre un diapasón parcial"""
    fretboard(s, x0, y0, frets, fw, sg, strings)
    for st, fr, lab, col, n in marks:
        i = strings.index(st); x = fx(x0, fw, fr) if fr else x0 - 40; y = y0 + i * sg
        s.circle(x, y, 32, col, INK, 2); s.text(x, y + 10, lab, 26, 700, '#FFFFFF' if col not in (COL['MI'], GOLD) else INK)
        if n: s.text(x + 42, y + 8, n, 24, 700, INK, 'start')

def tsig(s, x, y0, sp, a, b):
    s.text(x, y0 + 2 * sp - 6, a, sp * 1.5, 700, INK, 'middle', "'DejaVu Serif', serif"); s.text(x, y0 + 4 * sp - 6, b, sp * 1.5, 700, INK, 'middle', "'DejaVu Serif', serif")

# 13 · Las cuerdas en el pentagrama -------------------------------------------------------------
s = Svg(2400, 1250, 'Las cuerdas del bajo en el pentagrama y las líneas adicionales')
s.head('Las cuerdas en el pentagrama', 'Las 5 cuerdas al aire en clave de fa · las notas graves usan líneas adicionales')
sp = 40
staff(s, 140, 2280, 330, sp); tsig(s, 300, 330, sp, '4', '4')
OPN = [('SI', 1, '5.ª cuerda'), ('MI', 2, '4.ª cuerda'), ('LA', 2, '3.ª cuerda'), ('RE', 3, '2.ª cuerda'), ('SOL', 3, '1.ª cuerda')]
for k, (n, o, lab) in enumerate(OPN):
    x = 560 + k * 380; note_bf(s, x, 330, sp, n, o, half=True)
    s.text(x, 330 + 4 * sp + 230, lab, 26, 700, GRAY, 'middle', FI); pill(s, x, 330 + 4 * sp + 290, n, 22, 84)
s.text(80, 960, 'Signo de medida: arriba, cuántos pulsos · abajo, qué figura vale un pulso', 32, 700, INK, 'start')
for k, (a, b, d) in enumerate([('4', '4', '4 negras'), ('3', '4', '3 negras · vals'), ('6', '8', '6 corcheas'), ('12', '8', '12 corcheas')]):
    x = 200 + k * 560
    for j in range(5): s.line(x - 120, 1010 + j * 26, x + 120, 1010 + j * 26, INK, 2)
    tsig(s, x, 1010, 26, a, b); s.text(x + 260, 1075, d, 26, 600, GRAY, 'middle', FI)
s.save('J2_cuerdas')

# 14 · Raíz y quinta ------------------------------------------------------------------------------
s = Svg(2400, 1150, 'Raíz y quinta en el bajo')
s.head('Raíz y quinta: la forma que sirve en todo el mástil', 'Quinta arriba: una cuerda más aguda y dos trastes más · quinta abajo: una cuerda más grave, mismo traste')
shape(s, 400, 300, 220, 90, 6, (1, 2, 3, 4, 5), [(3, 3, 'R', '#E5312B', 'DO'), (2, 5, '5', '#2370D6', 'SOL'), (4, 3, '5', '#2370D6', 'SOL')])
s.text(1900, 330, 'Acorde de C', 34, 700); s.text(1900, 390, 'R = raíz (DO)', 28, 600, '#E5312B', 'middle', FI); s.text(1900, 440, '5 = quinta (SOL)', 28, 600, '#2370D6', 'middle', FI)
s.text(1900, 500, 'misma forma en cualquier traste', 24, 600, GRAY, 'middle', FI)
s.text(80, 860, 'Patrones de acompañamiento (4/4)', 32, 700, INK, 'start')
for k, (t, p) in enumerate([('blancas', ['R', '–', '5', '–']), ('negras', ['R', '5', 'R', '5']), ('negras', ['R', 'R', '5', '5'])]):
    x0 = 120 + k * 760
    s.text(x0, 920, t, 26, 600, GRAY, 'start', FI)
    for j, c in enumerate(p):
        x = x0 + 60 + j * 160
        if c == '–': s.line(x - 50, 1000, x + 50, 1000, '#E5312B' if p[j - 1] == 'R' else '#2370D6', 8)
        else: s.circle(x, 1000, 40, '#E5312B' if c == 'R' else '#2370D6', INK, 2); s.text(x, 1012, c, 32, 700, '#FFFFFF')
s.save('J2_quinta')

# 15 · Raíz, quinta y octava en tresillos ----------------------------------------------------------
s = Svg(2400, 1200, 'Raíz, quinta y octava en tresillos')
s.head('Raíz – quinta – octava en tresillos', 'La octava: dos cuerdas más agudas y dos trastes más · perfecta para el 12/8 y el 6/8')
shape(s, 400, 300, 220, 80, 6, (1, 2, 3, 4, 5), [(4, 1, 'R', '#E5312B', 'FA'), (3, 3, '5', '#2370D6', 'DO'), (2, 3, '8', '#2E9E4F', 'FA')])
s.text(1900, 330, 'Acorde de F', 34, 700); s.text(1900, 390, '8 = octava (FA agudo)', 28, 600, '#2E9E4F', 'middle', FI)
for row, (lab, cnt, pat) in enumerate([('12/8 (4 pulsos de tres)', ['1', 'o', 'la', '2', 'o', 'la', '3', 'o', 'la', '4', 'o', 'la'], ['R', '5', '8'] * 4),
                                       ('6/8 (2 pulsos de tres)', ['1', 'o', 'la', '2', 'o', 'la'], ['R', '5', '8', '8', '5', 'R'])]):
    y0 = 760 + row * 210; s.text(80, y0, lab, 28, 700, INK, 'start')
    cw = 170 if len(cnt) == 12 else 340
    for k, c in enumerate(cnt):
        x = 150 + (k + 0.5) * cw; s.text(x, y0 + 50, c, 26, 700, INK if k % 3 == 0 else GRAY)
        p = pat[k]; col = {'R': '#E5312B', '5': '#2370D6', '8': '#2E9E4F'}[p]
        s.circle(x, y0 + 115, 32, col, INK, 2); s.text(x, y0 + 125, p, 26, 700, '#FFFFFF')
s.save('J2_tresillo')

# 16 · La escala mayor móvil -------------------------------------------------------------------------
s = Svg(2400, 1350, 'La escala mayor de una octava, forma móvil')
s.head('La escala mayor en una octava: forma móvil', 'Empiezo con el dedo 2 · 3 cuerdas · un dedo por traste · sirve para cualquier tonalidad')
def scale_shape(x0, y0, st0, f, name, notes):
    strs = (st0 - 2, st0 - 1, st0); fw, sg = 210, 90
    fretboard(s, x0, y0, f + 3, fw, sg, strs)
    pos = [(st0, f, 2), (st0, f + 2, 4), (st0 - 1, f - 1, 1), (st0 - 1, f, 2), (st0 - 1, f + 2, 4), (st0 - 2, f - 1, 1), (st0 - 2, f + 1, 3), (st0 - 2, f + 2, 4)]
    for k, (st, fr, d) in enumerate(pos):
        x = fx(x0, fw, fr); y = y0 + strs.index(st) * sg; n = notes[k]
        pill(s, x, y, n, 20, 96 if len(n) > 3 else 80); s.text(x, y + 54, 'dedo ' + str(d), 18, 600, GRAY, 'middle', FI)
    s.text(x0 + (f + 3) * fw + 40, y0 + sg + 10, name, 32, 700, INK, 'start')
scale_shape(330, 300, 4, 3, 'SOL mayor · desde la cuerda MI', ['SOL', 'LA', 'SI', 'DO', 'RE', 'MI', 'FA♯', 'SOL'])
scale_shape(330, 780, 3, 3, 'DO mayor · desde la cuerda LA', ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI', 'DO'])
s.text(1200, 1290, 'T – T – S – T – T – T – S · ♯ = un traste más agudo · ♭ = un traste más grave', 28, 700, DGOLD, 'middle', FI)
s.save('J2_escala')

# ===================== NIVEL 2 · MES 5 (clases 17–20) =====================
MAJ = [0, 2, 4, 5, 7, 9, 11]
def nname(pc): return CHROM[pc % 12]
def scale_box(x0, y0, root_pc, b, fw=200, sg=78, strings=(1, 2, 3, 4, 5), show='nota', title=None, root_mark=True):
    """Caja de 4 trastes (b..b+3), un dedo por traste. show: 'nota' | 'grado'."""
    frets = b + 3
    # diapasón parcial: dibujo trastes b..b+3
    W = 4 * fw; n = len(strings)
    s.rect(x0, y0 - sg * 0.6, W, sg * (n - 1) + sg * 1.2, WOOD, FRET, 2, 10)
    for k in range(5): s.line(x0 + k * fw, y0 - sg * 0.6, x0 + k * fw, y0 + sg * (n - 1) + sg * 0.6, FRET, 5)
    for i, st in enumerate(strings):
        s.line(x0 - 30, y0 + i * sg, x0 + W, y0 + i * sg, STR, 2 + st * 1.1)
        pill(s, x0 - 80, y0 + i * sg, SNAME[st], 18, 60)
    for k in range(4): s.text(x0 + (k + 0.5) * fw, y0 + sg * (n - 1) + sg * 0.6 + 36, f'traste {b + k}', 20, 600, GRAY, 'middle', FI)
    for i, st in enumerate(strings):
        for k in range(4):
            fr = b + k; pc = (OPEN[st] + fr) % 12; d = (pc - root_pc) % 12
            if d in MAJ:
                deg = MAJ.index(d) + 1; x = x0 + (k + 0.5) * fw; y = y0 + i * sg
                if show == 'grado':
                    col = '#E5312B' if deg == 1 else ('#FFFFFF')
                    s.circle(x, y, 28, col, INK, 2.5); s.text(x, y + 9, str(deg), 26, 700, '#FFFFFF' if deg == 1 else INK)
                else:
                    nm = nname(pc); pill(s, x, y, nm, 18, 86 if len(nm) > 3 else 70)
                    if root_mark and d == 0: s.circle(x + 44, y - 22, 9, '#E5312B', INK, 1.5)
    for k in range(4): s.text(x0 + (k + 0.5) * fw, y0 - sg * 0.6 - 14, f'dedo {k + 1}', 20, 700, DGOLD, 'middle', FI)
    if title: s.text(x0 - 120, y0 - sg * 0.6 - 60, title, 30, 700, INK, 'start')

# 17 · Grados y digitación ------------------------------------------------------------------------
s = Svg(2400, 1150, 'Grados y digitación de la escala mayor')
s.head('Los grados de la escala mayor en el bajo', 'SOL mayor, raíz con el dedo 2 · cada número es el lugar de la nota en la escala')
scale_box(300, 380, 7, 2, show='grado', title='Grados (1 = raíz)')
scale_box(1460, 380, 7, 2, show='nota', title='Las mismas notas')
s.rect(120, 900, 2160, 190, BOX, 'none', 0, 20)
s.text(1200, 965, 'Los grados no cambian aunque cambie la tonalidad: el 1 siempre es la raíz, el 5 la quinta, el 8 la octava', 26, 700, INK, 'middle', FI)
s.text(1200, 1030, 'Un dedo por traste: dedo 1 en el primer traste de la caja, dedo 4 en el último', 24, 600, DGOLD, 'middle', FI)
s.save('J2_grados')

# 18 · Arpegio mayor --------------------------------------------------------------------------------
def arp(x0, y0, marks, title, fw=230, sg=86):
    shape(s, x0, y0, fw, sg, 8, (1, 2, 3, 4, 5), marks); s.text(x0 - 200, y0 - 80, title, 32, 700, INK, 'start')
s = Svg(2400, 1450, 'El arpegio mayor en el bajo')
s.head('El arpegio mayor: 1 – 3 – 5 – 8', 'Las notas del acorde, una por una · la forma se mueve a cualquier raíz')
arp(330, 330, [(3, 3, '1', '#E5312B', 'DO'), (2, 2, '3', '#F57C00', 'MI'), (2, 5, '5', '#2370D6', 'SOL'), (1, 5, '8', '#2E9E4F', 'DO')], 'C mayor · raíz en la cuerda LA (dedo 2)')
arp(330, 960, [(4, 3, '1', '#E5312B', 'SOL'), (3, 2, '3', '#F57C00', 'SI'), (3, 5, '5', '#2370D6', 'RE'), (2, 5, '8', '#2E9E4F', 'SOL')], 'G mayor · raíz en la cuerda MI (dedo 2)')
s.save('J2_arpmayor')

# 19 · Arpegio menor ----------------------------------------------------------------------------------
s = Svg(2400, 1450, 'El arpegio menor en el bajo')
s.head('El arpegio menor: 1 – ♭3 – 5 – 8', 'La tercera baja un traste: suena más triste · raíz con el dedo 1')
arp(330, 330, [(4, 5, '1', '#E5312B', 'LA'), (4, 8, '♭3', '#8E3BB8', 'DO'), (3, 7, '5', '#2370D6', 'MI'), (2, 7, '8', '#2E9E4F', 'LA')], 'Am · raíz en la cuerda MI, traste 5')
arp(330, 960, [(3, 5, '1', '#E5312B', 'RE'), (3, 8, '♭3', '#8E3BB8', 'FA'), (2, 7, '5', '#2370D6', 'LA'), (1, 7, '8', '#2E9E4F', 'RE')], 'Dm · raíz en la cuerda LA, traste 5')
s.save('J2_arpmenor')

# 20 · Patrones 1 y 4 ------------------------------------------------------------------------------------
s = Svg(2400, 1300, 'Patrones 1 y 4 de la escala mayor')
s.head('Patrones 1 y 4 de la escala mayor (SOL mayor)', 'Cajas de 4 trastes que cubren todas las cuerdas · el punto rojo marca cada SOL (la raíz)')
scale_box(300, 400, 7, 2, title='Patrón 1 · raíz en la cuerda MI con el dedo 2')
scale_box(1460, 400, 7, 9, title='Patrón 4 · raíz en la cuerda LA con el dedo 2')
s.text(1200, 1000, 'Patrón 1 en SOL: trastes 2 a 5 · Patrón 4 en SOL: trastes 9 a 12', 28, 700, INK, 'middle', FI)
s.text(1200, 1060, 'Para otra tonalidad, muevo la caja: la raíz siempre queda bajo el mismo dedo', 26, 600, DGOLD, 'middle', FI)
s.text(1200, 1120, 'Bajo de 4 cuerdas: igual, sin la fila de la cuerda SI', 24, 600, GRAY, 'middle', FI)
s.save('J2_patrones14')

# ===================== NIVEL 2 · MES 6 (clases 21–24) =====================
# 21 · Tríadas ---------------------------------------------------------------------------------------
s = Svg(2400, 1400, 'Las tríadas mayor, menor y disminuida en el bajo')
s.head('Tres clases de tríadas', 'Mayor 1–3–5 · menor 1–♭3–5 · disminuida 1–♭3–♭5 (raíz en la cuerda LA)')
for k, (t, marks) in enumerate([('Mayor · C', [(3, 3, '1', '#E5312B', 'DO'), (2, 2, '3', '#F57C00', 'MI'), (2, 5, '5', '#2370D6', 'SOL')]),
                                 ('Menor · Cm', [(3, 3, '1', '#E5312B', 'DO'), (3, 6, '♭3', '#8E3BB8', 'MI♭'), (2, 5, '5', '#2370D6', 'SOL')]),
                                 ('Disminuida · B°', [(3, 2, '1', '#E5312B', 'SI'), (3, 5, '♭3', '#8E3BB8', 'RE'), (2, 3, '♭5', '#5F6368', 'FA')])]):
    x0 = 280 + k * 760; y0 = 330
    fretboard(s, x0, y0, 6, 80, 70, (1, 2, 3, 4))
    for st, fr, lab, col, n in marks:
        x = fx(x0, 80, fr); y = y0 + (st - 1) * 70; s.circle(x, y, 28, col, INK, 2); s.text(x, y + 9, lab, 22, 700, '#FFFFFF')
    s.text(x0 + 240, y0 - 80, t, 32, 700)
s.text(80, 820, 'Las tríadas de DO mayor (una sobre cada grado)', 32, 700, INK, 'start')
TR = [('I', 'C', 'mayor'), ('ii', 'Dm', 'menor'), ('iii', 'Em', 'menor'), ('IV', 'F', 'mayor'), ('V', 'G', 'mayor'), ('vi', 'Am', 'menor'), ('vii°', 'B°', 'disminuida')]
for k, (g, c, t) in enumerate(TR):
    x = 100 + k * 316; col = {'mayor': '#E5312B', 'menor': '#2370D6', 'disminuida': '#5F6368'}[t]
    s.rect(x, 870, 290, 300, BOX, 'none', 0, 18); s.text(x + 145, 940, g, 40, 700, col); s.text(x + 145, 1030, c, 48, 700); s.text(x + 145, 1110, t, 24, 600, GRAY, 'middle', FI)
s.text(1200, 1290, 'Fórmula: mayor – menor – menor – mayor – mayor – menor – disminuida', 28, 700, DGOLD, 'middle', FI)
s.save('J2_triadas')

# 22 · Mapa del mástil ---------------------------------------------------------------------------------
s = Svg(2400, 1000, 'Las notas naturales en las cinco cuerdas')
s.head('El mapa de mi mástil: trastes 0 a 12', 'Notas naturales en color · los puntos negros son notas con ♯ o ♭ · en el traste 12 todo se repite')
x0, fw, sg = 300, 160, 100
fretboard(s, x0, 280, 12, fw, sg)
for i, st in enumerate((1, 2, 3, 4, 5)):
    for fr in range(0, 13):
        nm = CHROM[(OPEN[st] + fr) % 12]; x = fx(x0, fw, fr) if fr else x0 - 40; y = 280 + i * sg
        if '♯' in nm: s.circle(x, y, 10, INK)
        elif fr: pill(s, x, y, nm, 18, 72)
s.text(1200, 960, 'Truco: las notas con punto doble (traste 12) son las mismas de las cuerdas al aire, una octava más agudas', 26, 600, DGOLD, 'middle', FI)
s.save('J2_mastil')

# 23 · Séptima dominante y blues -------------------------------------------------------------------------
s = Svg(2400, 1400, 'Arpegio de séptima dominante y blues de 12 compases')
s.head('Séptima dominante: 1 – 3 – 5 – ♭7', 'G7: el arpegio mayor más la séptima menor · la ♭7 está dos cuerdas arriba, en el mismo traste de la raíz')
shape(s, 400, 300, 230, 80, 6, (1, 2, 3, 4, 5), [(4, 3, '1', '#E5312B', 'SOL'), (3, 2, '3', '#F57C00', 'SI'), (3, 5, '5', '#2370D6', 'RE'), (2, 3, '♭7', '#8E3BB8', 'FA')])
s.text(80, 830, 'Blues de 12 compases en LA (raíces al aire)', 32, 700, INK, 'start')
BL = ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7']
RT = {'A7': 'LA', 'D7': 'RE', 'E7': 'MI'}
for k, ch in enumerate(BL):
    r, c = divmod(k, 4); x = 140 + c * 540; y = 870 + r * 160
    s.rect(x, y, 520, 130, BOX, 'none', 0, 16); s.line(x + 520, y + 10, x + 520, y + 120, INK, 4)
    s.text(x + 40, y + 80, ch, 40, 700, INK, 'start'); pill(s, x + 330, y + 66, RT[ch], 24, 100)
s.save('J2_septima')

# ===================== NIVEL 3 (clases 25–36) =====================
def pattern_box(x0, y0, b, title, root_pc=7):
    scale_box(x0, y0, root_pc, b, title=title)

# 25 · El bajo es doble ----------------------------------------------------------------------------------
s = Svg(2400, 1450, 'El bajo es doble: desde el traste 12 las notas se repiten')
s.head('El bajo es doble', 'Del traste 0 al 11 están las 12 notas · en el traste 12 empieza todo otra vez, una octava más agudo')
x0, fw = 180, 88
s.rect(x0, 300, 24 * fw, 90, WOOD, FRET, 2, 10); s.rect(x0 - 12, 300, 14, 90, INK)
for fr in range(1, 25): s.line(x0 + fr * fw, 300, x0 + fr * fw, 390, FRET, 6 if fr == 12 else 3)
s.line(x0 - 40, 345, x0 + 24 * fw, 345, STR, 6)
for fr in range(0, 25):
    nm = CHROM[(4 + fr) % 12]; x = x0 + (fr - 0.5) * fw if fr else x0 - 24
    if '♯' in nm: s.circle(x, 345, 9, INK)
    else: s.text(x, 290, nm, 18, 700, INK)
for fr in (3, 5, 7, 9, 15, 17, 19, 21): s.circle(x0 + (fr - 0.5) * fw, 420, 8, '#BBA98C')
for fr in (12, 24): [s.circle(x0 + (fr - 0.5) * fw + d, 420, 8, '#BBA98C') for d in (-12, 12)]
s.text(x0 + 6 * fw, 480, 'primera vuelta: trastes 0 a 11', 26, 700, '#2370D6', 'middle', FI); s.text(x0 + 18 * fw, 480, 'segunda vuelta: trastes 12 a 23', 26, 700, '#E5312B', 'middle', FI)
pattern_box(330, 720, 4, 'Patrón 2 de SOL mayor · raíz en la cuerda RE con el dedo 2 (trastes 4 a 7)')
s.text(1900, 900, 'Cuerda MI', 30, 700); s.text(1900, 950, 'traste 0 = MI', 26, 600, GRAY, 'middle', FI); s.text(1900, 995, 'traste 12 = MI (octava)', 26, 600, GRAY, 'middle', FI)
s.save('J3_doble')

# 26 · Intervalos ---------------------------------------------------------------------------------------------
s = Svg(2400, 1150, 'Intervalos mayores y justos en el mástil')
s.head('Intervalos mayores y justos desde DO', 'Raíz en la cuerda LA, traste 3 · las mismas formas sirven desde cualquier raíz')
INT = [(3, 3, '1', 'DO'), (3, 5, '2M', 'RE'), (2, 2, '3M', 'MI'), (2, 3, '4J', 'FA'), (2, 5, '5J', 'SOL'), (1, 2, '6M', 'LA'), (1, 4, '7M', 'SI'), (1, 5, '8J', 'DO')]
fretboard(s, 400, 300, 6, 230, 90, (1, 2, 3, 4, 5))
for st, fr, lab, n in INT:
    x = fx(400, 230, fr); y = 300 + (st - 1) * 90; col = '#E5312B' if lab == '1' else ('#2370D6' if 'M' in lab else '#2E9E4F')
    s.circle(x, y, 34, col, INK, 2); s.text(x, y + 10, lab, 24, 700, '#FFFFFF')
s.text(1950, 330, 'M = mayor', 30, 700, '#2370D6'); s.text(1950, 380, 'J = justo', 30, 700, '#2E9E4F')
s.text(1950, 440, '2.ª, 3.ª, 6.ª y 7.ª: mayores', 24, 600, GRAY, 'middle', FI); s.text(1950, 480, '4.ª, 5.ª y 8.ª: justas', 24, 600, GRAY, 'middle', FI)
for k, (a, b) in enumerate([('2M', '2 trastes, misma cuerda'), ('3M', 'cuerda siguiente, 1 traste atrás'), ('4J', 'cuerda siguiente, mismo traste'), ('5J', 'cuerda siguiente, 2 trastes adelante'),
                            ('6M', 'dos cuerdas arriba, 1 traste atrás'), ('7M', 'dos cuerdas arriba, 1 traste adelante'), ('8J', 'dos cuerdas arriba, 2 trastes adelante')]):
    x = 100 + (k % 4) * 560; y = 830 + (k // 4) * 120
    s.rect(x, y, 530, 100, BOX, 'none', 0, 16); s.text(x + 60, y + 62, a, 32, 700, '#2370D6' if 'M' in a else '#2E9E4F'); s.text(x + 120, y + 60, b, 22, 600, INK, 'start', FI)
s.save('J3_intervalos')

# 27 · Ligados y patrón 3 --------------------------------------------------------------------------------------
s = Svg(2400, 1450, 'Ligados en el bajo y patrón 3 de la escala mayor')
s.head('Ligados: dos notas con una sola pulsación', 'Hammer-on (H) · pull-off (P) · slide (S) · en la tablatura se escriben con una curva o una línea')
for k, (t, d, a, b, sym) in enumerate([('Hammer-on (H)', 'pulso la 1.ª y «martillo» la 2.ª con otro dedo', 5, 7, 'H'), ('Pull-off (P)', 'pulso la 1.ª y jalo el dedo para que suene la 2.ª', 7, 5, 'P'), ('Slide (S)', 'pulso y deslizo el mismo dedo al otro traste', 5, 7, 'S')]):
    x = 100 + k * 760
    s.rect(x, 230, 720, 420, BOX, 'none', 0, 20); s.text(x + 360, 300, t, 34, 700); s.text(x + 360, 350, d, 22, 600, GRAY, 'middle', FI)
    for i in range(5): s.line(x + 80, 420 + i * 40, x + 640, 420 + i * 40, '#9AA0A6', 2)
    xa, xb = x + 230, x + 490; y = 420 + 2 * 40
    for xx, n in ((xa, a), (xb, b)): s.rect(xx - 22, y - 22, 44, 44, BOX); s.text(xx, y + 12, str(n), 32, 700)
    if sym == 'S': s.line(xa + 30, y + 14, xb - 30, y - 14, INK, 4)
    else: s.add(f'<path d="M {xa:.0f} {y-30:.0f} Q {(xa+xb)/2:.0f} {y-90:.0f} {xb:.0f} {y-30:.0f}" fill="none" stroke="{INK}" stroke-width="4"/>'); s.text((xa + xb) / 2, y - 70, sym, 28, 700, '#E5312B')
pattern_box(330, 840, 7, 'Patrón 3 de SOL mayor · raíz en la cuerda SI con el dedo 2 o en la cuerda LA con el dedo 4 (trastes 7 a 10)')
s.save('J3_ligados')

# 28 · Octavas ---------------------------------------------------------------------------------------------------
s = Svg(2400, 1200, 'Octavas en el bajo')
s.head('El truco de las octavas', 'Octava arriba: dos cuerdas más agudas, dos trastes adelante · octava abajo: dos cuerdas más graves, dos trastes atrás')
shape(s, 400, 300, 230, 90, 7, (1, 2, 3, 4, 5), [(4, 3, '1', '#E5312B', 'SOL'), (2, 5, '8', '#2E9E4F', 'SOL'), (3, 5, '1', '#E5312B', 'RE'), (1, 7, '8', '#2E9E4F', 'RE'), (5, 3, '8↓', '#8E3BB8', 'RE')])
s.text(80, 860, 'Construyo una escala mayor en una sola cuerda: T – T – S – T – T – T – S', 32, 700, INK, 'start')
x0 = 160
for k, (n, d) in enumerate([('DO', 0), ('RE', 2), ('MI', 4), ('FA', 5), ('SOL', 7), ('LA', 9), ('SI', 11), ('DO', 12)]):
    x = x0 + k * 270; pill(s, x, 960, n, 26, 110); s.text(x, 1030, f'traste {3 + d}', 22, 600, GRAY, 'middle', FI)
    if k < 7: s.text(x + 135, 960, ['T', 'T', 'S', 'T', 'T', 'T', 'S'][k], 30, 700, '#E5312B' if k in (2, 6) else '#2370D6')
s.text(1200, 1120, 'Cuerda LA desde el traste 3 · si empiezo en otro traste, construyo otra escala mayor', 26, 600, DGOLD, 'middle', FI)
s.save('J3_octavas')

# 29 · Slap ------------------------------------------------------------------------------------------------------
s = Svg(2400, 1250, 'Técnica de slap: pulgar y pop')
s.head('Slap: pulgar (T) y pop (P)', 'T = golpe del pulgar en la cuerda grave · P = el índice engancha y suelta la cuerda aguda')
for k, (t, l1, l2, c) in enumerate([('T · pulgar', 'golpeo con el hueso del pulgar', 'al final del mástil y reboto', '#E5312B'), ('P · pop', 'el índice engancha la cuerda RE o SOL', 'la jala y la suelta contra los trastes', '#2370D6'), ('x · nota muerta', 'la mano izquierda apoya sin pisar', 'suena un golpe sin nota', GRAY)]):
    x = 100 + k * 760
    s.rect(x, 230, 720, 330, BOX, 'none', 0, 20); s.circle(x + 360, 320, 50, c, INK, 2); s.text(x + 360, 336, t[0], 44, 700, '#FFFFFF')
    s.text(x + 360, 420, t, 32, 700); s.text(x + 360, 470, l1, 22, 600, GRAY, 'middle', FI); s.text(x + 360, 505, l2, 22, 600, GRAY, 'middle', FI)
s.text(80, 680, 'Ejercicio de octavas en MI: T en la raíz, P en la octava', 32, 700, INK, 'start')
cnt = ['1', 'e', 'y', 'a', '2', 'e', 'y', 'a']; pat = ['T', '', 'P', '', 'T', 'T', 'P', '']
for k in range(8):
    x = 260 + k * 250; s.text(x, 760, cnt[k], 30, 700, INK if k % 4 == 0 else GRAY)
    p = pat[k]
    if p: s.circle(x, 860, 46, '#E5312B' if p == 'T' else '#2370D6', INK, 2); s.text(x, 876, p, 40, 700, '#FFFFFF')
s.text(1200, 990, 'T: cuerda MI al aire · P: cuerda RE, traste 2 (MI una octava arriba)', 28, 700, INK, 'middle', FI)
s.text(1200, 1060, 'Empieza lento (60 BPM): el slap se aprende con precisión, no con fuerza', 26, 600, DGOLD, 'middle', FI)
s.save('J3_slap')

# 30 · Funk slap ----------------------------------------------------------------------------------------------------
s = Svg(2400, 900, 'Groove de funk con slap')
s.head('Groove de funk con slap (en MI)', 'Semicorcheas: «1 e y a» · T pulgar · P pop · x nota muerta')
cnt = ['1', 'e', 'y', 'a'] * 4; pat = ['T', '', 'x', 'P', '', 'T', 'x', 'P', 'T', '', 'x', 'P', 'T', 'T', 'x', 'P']
for k in range(16):
    x = 160 + k * 136; s.text(x, 260, cnt[k] if k % 4 else str(k // 4 + 1), 28, 700, INK if k % 4 == 0 else GRAY)
    if k % 4 == 0: s.rect(x - 60, 290, 4 * 136 - 8, 220, BOX, 'none', 0, 14)
for k in range(16):
    x = 160 + k * 136; p = pat[k]
    if p: s.circle(x, 400, 40, {'T': '#E5312B', 'P': '#2370D6', 'x': '#9AA0A6'}[p], INK, 2); s.text(x, 414, p, 34, 700, '#FFFFFF')
s.text(1200, 620, 'T = MI al aire (cuerda MI) · P = MI en la cuerda RE, traste 2 · x = nota muerta', 28, 700, INK, 'middle', FI)
s.text(1200, 690, 'Toca con el reproductor de funk: el pulgar cae con el bombo', 26, 600, DGOLD, 'middle', FI)
s.save('J3_funk')

# 31 · Transformar intervalos --------------------------------------------------------------------------------------
s = Svg(2400, 1100, 'Transformar intervalos en el mástil')
s.head('Transformo intervalos: un traste cambia todo', 'Mayor – 1 traste = menor · justo + 1 traste = aumentado · justo – 1 traste = disminuido')
TF = [('3M → 3m', 'MI → MI♭', 'un traste atrás'), ('6M → 6m', 'LA → LA♭', 'un traste atrás'), ('7M → 7m', 'SI → SI♭', 'un traste atrás'), ('5J → 5dim', 'SOL → SOL♭', 'un traste atrás'), ('4J → 4aum', 'FA → FA♯', 'un traste adelante')]
for k, (a, b, c) in enumerate(TF):
    x = 100 + k * 450; s.rect(x, 250, 420, 330, BOX, 'none', 0, 20)
    s.text(x + 210, 340, a, 38, 700); s.text(x + 210, 420, b, 30, 700, '#2370D6'); s.text(x + 210, 490, c, 24, 600, GRAY, 'middle', FI)
s.text(80, 700, 'Transportar: muevo toda la forma y la canción suena en otra tonalidad', 32, 700, INK, 'start')
for k, (t, r) in enumerate([('en DO', 'cuerda LA, traste 3'), ('en RE', 'cuerda LA, traste 5'), ('en MI', 'cuerda LA, traste 7')]):
    x = 140 + k * 740; s.rect(x, 760, 700, 220, BOX, 'none', 0, 20); s.text(x + 350, 840, 'misma línea ' + t, 32, 700); s.text(x + 350, 910, 'raíz: ' + r, 26, 600, GRAY, 'middle', FI)
s.save('J3_transforma')

# 32 · Patrón 5 y pentatónica -----------------------------------------------------------------------------------------
s = Svg(2400, 1450, 'Patrón 5 de la escala mayor y pentatónica menor')
s.head('Patrón 5 y la pentatónica menor', 'La pentatónica tiene 5 notas: 1 – ♭3 – 4 – 5 – ♭7 · ideal para rellenos e improvisación')
pattern_box(330, 330, 12, 'Patrón 5 de SOL mayor · raíz en la cuerda SOL con el dedo 1 o en la cuerda MI con el dedo 4 (trastes 12 a 15)')
fretboard(s, 400, 930, 4, 230, 80, (1, 2, 3, 4, 5))
PEN = {1: [(5, 'DO'), (7, 'RE')], 2: [(5, 'SOL'), (7, 'LA')], 3: [(5, 'RE'), (7, 'MI')], 4: [(5, 'LA'), (8, 'DO')], 5: [(5, 'MI'), (8, 'SOL')]}
for st, lst in PEN.items():
    for fr, n in lst:
        x = 400 + (fr - 4.5) * 230; y = 930 + (st - 1) * 80
        s.circle(x, y, 30, '#E5312B' if n == 'LA' else '#FFFFFF', INK, 2.5); s.text(x, y + 8, n, 18, 700, '#FFFFFF' if n == 'LA' else INK)
for k in range(4): s.text(400 + (k + 0.5) * 230, 1300, f'traste {k + 5}', 20, 600, GRAY, 'middle', FI)
s.text(1700, 960, 'LA menor pentatónica', 32, 700, INK, 'start'); s.text(1700, 1010, 'LA – DO – RE – MI – SOL', 26, 600, GRAY, 'start', FI)
s.text(1700, 1060, 'raíz LA en rojo · trastes 5 a 8', 24, 600, GRAY, 'start', FI)
s.save('J3_penta')

# 33 · Chart de bajo -------------------------------------------------------------------------------------------------------
s = Svg(2400, 1400, 'Un chart de bajo en clave de fa')
s.head('Leo un chart completo de bajo', 'Secciones, cifrado, repeticiones, casillas y saltos · sin colores, como en la banda')
def rowstaff(y, label, chords, rep_l=False, rep_r=False, casillas=False, fine=False, dc=False):
    staff(s, 140, 2280, y, 30); s.text(140, y - 70, label, 32, 700, INK, 'start'); bw = (2280 - 260) / 4
    for m in range(4):
        bx = 260 + m * bw; s.line(bx + bw, y, bx + bw, y + 120, INK, 7 if (m == 3 and (fine or dc)) else 3)
        s.text(bx + 30, y - 22, chords[m], 30, 700, INK, 'start')
        for q in range(4):
            xx = bx + 60 + q * (bw - 80) / 4; s.line(xx - 12, y + 85, xx + 12, y + 35, INK, 8)
    if rep_l: s.rect(266, y, 8, 120, INK); s.circle(290, y + 45, 5, INK); s.circle(290, y + 75, 5, INK)
    if rep_r:
        xr = 260 + 3 * bw - 4; s.rect(xr - 8, y, 8, 120, INK); s.circle(xr - 24, y + 45, 5, INK); s.circle(xr - 24, y + 75, 5, INK)
    if casillas:
        for k, (xa, xb) in enumerate([(260 + 2 * bw, 260 + 3 * bw - 30), (260 + 3 * bw, 2280)]):
            s.line(xa, y - 60, xb, y - 60, INK, 3); s.line(xa, y - 60, xa, y - 40, INK, 3); s.text(xa + 160, y - 66, f'{k + 1}.', 26, 700, INK, 'start')
    if fine: s.text(2280, y + 175, 'Fine', 30, 700, INK, 'end', "'DejaVu Serif', serif", 'font-style="italic"')
    if dc: s.text(2280, y + 175, 'D.C. al Fine', 30, 700, INK, 'end', "'DejaVu Serif', serif", 'font-style="italic"')
rowstaff(330, 'Intro', ['C', 'G', 'Am', 'F'])
rowstaff(650, 'Estrofa (2 veces)', ['C', 'F', 'G', 'C'], rep_l=True, rep_r=True, casillas=True, fine=True)
rowstaff(970, 'Coro', ['F', 'G', 'C', 'C'], dc=True)
s.text(1200, 1330, 'Barras inclinadas = toco raíces o mi línea, siguiendo el cifrado · Fine está al final de la estrofa', 26, 600, DGOLD, 'middle', FI)
s.save('J3_chart')

# 34 · Los 5 patrones ------------------------------------------------------------------------------------------------------
s = Svg(2400, 900, 'Los cinco patrones de la escala mayor en el mástil')
s.head('Los 5 patrones cubren todo el mástil (SOL mayor)', 'Cada patrón es una caja de 4 trastes · se encadenan uno detrás del otro')
x0, fw = 160, 140
s.rect(x0, 300, 16 * fw, 330, WOOD, FRET, 2, 10)
for fr in range(1, 17): s.line(x0 + fr * fw, 300, x0 + fr * fw, 630, FRET, 4)
for fr in range(1, 17): s.text(x0 + (fr - 0.5) * fw, 670, str(fr), 22, 600, GRAY)
for k, (p, b, col) in enumerate([(1, 2, '#E5312B'), (2, 4, '#F57C00'), (3, 7, '#2E9E4F'), (4, 9, '#2370D6'), (5, 12, '#8E3BB8')]):
    y = 320 + (k % 2) * 150
    s.rect(x0 + (b - 1) * fw + 6, y, 4 * fw - 12, 130, col, INK, 2, 16)
    s.text(x0 + (b + 1) * fw, y + 82, f'Patrón {p}', 32, 700, '#FFFFFF')
s.text(1200, 760, 'Patrón 1: trastes 2–5 · 2: 4–7 · 3: 7–10 · 4: 9–12 · 5: 12–15 · después del 5 vuelve el 1 (trastes 14–17)', 26, 700, INK, 'middle', FI)
s.text(1200, 820, 'Para otra tonalidad, toda la cadena se mueve junta', 24, 600, DGOLD, 'middle', FI)
s.save('J3_patrones')

# 35 · Equipo -------------------------------------------------------------------------------------------------------------
s = Svg(2400, 900, 'El camino del sonido del bajo')
s.head('Mi equipo: el camino del sonido', 'Del bajo a la sala · revisa cada paso antes del ensayo')
CH = [('Bajo', 'volumen arriba, tono a gusto'), ('Cable', 'sin nudos, bien conectado'), ('Afinador', 'afino antes de empezar'), ('Amplificador', 'volumen moderado, graves sin exceso'), ('Caja directa', 'envía la señal a la consola')]
for k, (t, d) in enumerate(CH):
    x = 80 + k * 460; s.rect(x, 280, 400, 300, GOLD if k == 0 else BOX, INK, 2, 22)
    s.text(x + 200, 400, t, 38, 700); s.text(x + 200, 470, d, 20, 600, INK, 'middle', FI)
    if k < 4: s.text(x + 430, 445, '→', 50, 700, GRAY)
s.text(1200, 700, 'Encender: primero el bajo y los cables, al final el amplificador · apagar: primero el amplificador', 28, 700, INK, 'middle', FI)
s.text(1200, 770, 'Cuida tu oído: tapones para músicos y volumen moderado en el escenario', 26, 600, DGOLD, 'middle', FI)
s.save('J3_equipo')

# 36 · Presentación final --------------------------------------------------------------------------------------------------
s = Svg(2400, 900, 'Programa de la presentación final de bajo')
s.head('¡Presentación final! · Bajo', 'El programa de mi concierto · Nivel 3')
for k, (n, t, d, col) in enumerate([('1', 'Escalas', 'los 5 patrones y la pentatónica', '#2AA7E8'), ('2', 'Tres estilos', 'balada, rock, cumbia o reggae', '#2E9E4F'),
                                     ('3', 'Canción con banda', 'leo el chart y sigo las señales', '#F57C00'), ('4', 'Groove de slap', 'mi groove de funk con slap', '#E5312B')]):
    x = 80 + k * 570; s.rect(x, 220, 540, 460, col, INK, 2, 24); s.circle(x + 270, 320, 50, '#FFFFFF', INK, 2); s.text(x + 270, 340, n, 52, 700)
    s.text(x + 270, 460, t, 44, 700, '#FFFFFF'); s.text(x + 270, 540, d, 22, 600, '#FFFFFF', 'middle', FI)
s.text(1200, 790, 'Antes: afino, reviso cables y amplificador · Después: saludo, agradezco y guardo mi equipo', 30, 600, GRAY, 'middle', FI)
s.save('J3_final')
print('ok')
