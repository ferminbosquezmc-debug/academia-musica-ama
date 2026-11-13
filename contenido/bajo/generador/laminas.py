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
print('ok')
