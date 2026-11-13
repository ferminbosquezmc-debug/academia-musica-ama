#!/usr/bin/env python3
"""Láminas de Guitarra Nivel 2 (clases 13–24), mismo estilo que las del Nivel 1.
Uso: python3 laminas_n2.py <carpeta_de_salida>   (normalmente academia-arpa/guitarra/img)"""
import sys, os
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
FT = "Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; FI = "Inter, 'Segoe UI', Arial, sans-serif"
INK, GRAY, GOLD, DGOLD, WOOD, FRET, STR = '#1A1A1A', '#5F6368', '#C9A227', '#8A6A0A', '#F4E9D8', '#8C8279', '#4E453D'
COL = {'DO': '#E5312B', 'RE': '#F57C00', 'MI': '#FFD21F', 'FA': '#2E9E4F', 'SOL': '#2AA7E8', 'LA': '#283593', 'SI': '#8E3BB8'}
WHITE_TXT = {'DO', 'LA', 'SI'}
CHROM = ['DO', 'DO♯', 'RE', 'RE♯', 'MI', 'FA', 'FA♯', 'SOL', 'SOL♯', 'LA', 'LA♯', 'SI']
OPEN = {6: 4, 5: 9, 4: 2, 3: 7, 2: 11, 1: 4}  # cuerda -> índice cromático al aire (MI LA RE SOL SI MI)
FLAT = {'DO♯': 'RE♭', 'RE♯': 'MI♭', 'FA♯': 'SOL♭', 'SOL♯': 'LA♭', 'LA♯': 'SI♭'}

class Svg:
    def __init__(s, w, h, title):
        s.w, s.h, s.t, s.a = w, h, title, []
    def add(s, x): s.a.append(x)
    def text(s, x, y, t, size, weight=700, fill=INK, anchor='middle', font=FT):
        s.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{t}</text>')
    def line(s, x1, y1, x2, y2, c=INK, w=3, extra=''):
        s.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" stroke-width="{w}" {extra}/>')
    def rect(s, x, y, w, h, fill, stroke='none', sw=0, rx=0):
        s.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def circle(s, x, y, r, fill, stroke='none', sw=0):
        s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')
    def head(s, title, sub):
        s.text(40, 72, title, 48, 700, INK, 'start'); s.text(40, 124, sub, 32, 500, GRAY, 'start', FI)
    def save(s, name):
        body = '\n'.join(s.a)
        svg = (f'<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="{s.w}" height="{s.h}" '
               f'viewBox="0 0 {s.w} {s.h}" role="img" aria-label="{s.t}">\n<title>{s.t}</title>\n<rect width="{s.w}" height="{s.h}" fill="#FFFFFF"/>\n{body}\n</svg>\n')
        open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8').write(svg)

def note(string, fret): return CHROM[(OPEN[string] + fret) % 12]

def pill(s, x, y, name, size=26, w=None):
    base = name.rstrip('♯♭')
    alt = name != base
    fill = INK if alt else COL[base]
    tc = '#FFFFFF' if (alt or base in WHITE_TXT) else INK
    w = w or max(70, len(name) * size * 0.72 + 22)
    s.rect(x - w / 2, y - size * 0.95, w, size * 1.7, fill, INK, 2.5, size * 0.85)
    s.text(x, y + size * 0.38, name, size, 700, tc)

def fretboard(s, x0, y0, frets, fw, sg, strings=(1, 2, 3, 4, 5, 6), nut=True):
    """Diapasón horizontal: la 1.ª cuerda arriba (como en la tablatura)."""
    n = len(strings); W = frets * fw
    s.rect(x0, y0 - sg * 0.6, W, sg * (n - 1) + sg * 1.2, WOOD, FRET, 2, 10)
    for f in range(1, frets + 1):
        s.line(x0 + f * fw, y0 - sg * 0.6, x0 + f * fw, y0 + sg * (n - 1) + sg * 0.6, FRET, 5)
    if nut: s.rect(x0 - 12, y0 - sg * 0.6, 14, sg * (n - 1) + sg * 1.2, INK)
    for i, st in enumerate(strings):
        s.line(x0 - 60, y0 + i * sg, x0 + W, y0 + i * sg, STR, 2 + st * 0.8)
        s.text(x0 - 90, y0 + i * sg + 10, f'{st}ª', 28, 600, GRAY)
    for f in (3, 5, 7, 9):
        if f <= frets: s.circle(x0 + (f - 0.5) * fw, y0 + sg * (n - 1) / 2, 9, '#D8CBB4')
    if frets >= 12: [s.circle(x0 + 11.5 * fw, y0 + sg * (n - 1) / 2 + d, 9, '#D8CBB4') for d in (-sg, sg)]
    for f in range(0, frets + 1):
        s.text(x0 + (f - 0.5) * fw if f else x0 - 30, y0 + sg * (n - 1) + sg * 0.6 + 44, str(f) if f else 'aire', 24, 600, GRAY)

def fx(x0, fw, f): return x0 - 30 if f == 0 else x0 + (f - 0.5) * fw

# 13 · Escala cromática en la 1.ª cuerda --------------------------------------
s = Svg(2400, 640, 'La escala cromática en la primera cuerda')
s.head('Un traste = un semitono', 'Escala cromática en la 1.ª cuerda: cada traste sube medio tono')
x0, fw = 230, 172
s.rect(x0, 300, 12 * fw, 60, WOOD, FRET, 2, 10); s.rect(x0 - 12, 300, 14, 60, INK)
for f in range(1, 13): s.line(x0 + f * fw, 300, x0 + f * fw, 360, FRET, 5)
s.line(x0 - 60, 330, x0 + 12 * fw, 330, STR, 3)
s.text(70, 340, '1ª', 30, 600, GRAY)
for f in range(0, 13):
    n = note(1, f); x = fx(x0, fw, f)
    pill(s, x, 250, n, 24, 104)
    if n in FLAT: s.text(x, 200, FLAT[n], 22, 600, GRAY)
    s.text(x, 410, str(f) if f else 'aire', 24, 600, GRAY)
s.text(1200, 500, 'Las notas con ♯ o ♭ van en negro. Entre MI–FA y SI–DO no hay nota en medio: están a un semitono.', 30, 500, GRAY, 'middle', FI)
s.text(1200, 570, 'En el traste 12 vuelve MI, una octava más aguda.', 30, 600, DGOLD, 'middle', FI)
s.save('G2_cromatica')

# 14 · Mapa de la primera posición (todas las cuerdas, trastes 0–3) ---------------
s = Svg(2400, 1000, 'Las notas de la primera posición')
s.head('Las notas de la primera posición', 'Cuerdas 4, 5 y 6: los bordones (graves) · trastes 0 a 3')
x0, y0, fw, sg = 420, 260, 380, 110
fretboard(s, x0, y0, 4, fw, sg)
POS = {1: [0, 1, 3], 2: [0, 1, 3], 3: [0, 2], 4: [0, 2, 3], 5: [0, 2, 3], 6: [0, 1, 3]}
for i, st in enumerate((1, 2, 3, 4, 5, 6)):
    for f in POS[st]:
        pill(s, fx(x0, fw, f), y0 + i * sg, note(st, f), 26 if st >= 4 else 22, 96 if st >= 4 else 84)
s.rect(x0 + 4 * fw + 40, y0 + 3 * sg - 50, 300, 3 * sg - 10, '#FFF8E1', GOLD, 3, 16)
s.text(x0 + 4 * fw + 190, y0 + 3 * sg + 20, 'bordones', 34, 700, DGOLD)
s.text(x0 + 4 * fw + 190, y0 + 3 * sg + 70, 'cuerdas 4, 5 y 6', 26, 600, GRAY, 'middle', FI)
s.text(1200, 960, 'Dedo 1 en el traste 1, dedo 2 en el traste 2, dedo 3 en el traste 3.', 30, 500, GRAY, 'middle', FI)
s.save('G2_primera_posicion')

# 15 · Escala de Sol mayor en primera posición ------------------------------------
s = Svg(2400, 1000, 'Escala de Sol mayor en primera posición')
s.head('Escala de SOL mayor · primera posición', 'De SOL grave (6.ª cuerda, traste 3) a SOL agudo (3.ª al aire) · tiene un FA♯')
x0, y0, fw, sg = 420, 250, 360, 110
fretboard(s, x0, y0, 5, fw, sg)
SC = [(6, 3, 2), (5, 0, 0), (5, 2, 1), (5, 3, 2), (4, 0, 0), (4, 2, 1), (4, 4, 4), (3, 0, 0)]
for k, (st, f, d) in enumerate(SC):
    i = (1, 2, 3, 4, 5, 6).index(st); x, y = fx(x0, fw, f), y0 + i * sg
    pill(s, x, y, note(st, f), 26, 104)
    s.circle(x + 62, y - 40, 22, GOLD, INK, 2); s.text(x + 62, y - 31, str(k + 1), 24, 700, INK)
    if d: s.text(x - 62, y - 34, f'd{d}', 22, 700, GRAY)
s.text(1200, 920, 'Los números dorados son los grados (1 a 8). d1, d2, d4: el dedo de la mano izquierda.', 30, 500, GRAY, 'middle', FI)
s.save('G2_escala_sol')

# 16 · Los cinco acordes del mes ----------------------------------------------------
CH = [('G', 'Sol mayor', {6: (3, 2), 5: (2, 1), 4: 0, 3: 0, 2: 0, 1: (3, 3)}),
      ('C', 'Do mayor', {6: 'x', 5: (3, 3), 4: (2, 2), 3: 0, 2: (1, 1), 1: 0}),
      ('D', 'Re mayor', {6: 'x', 5: 'x', 4: 0, 3: (2, 1), 2: (3, 3), 1: (2, 2)}),
      ('Em', 'Mi menor', {6: 0, 5: (2, 2), 4: (2, 3), 3: 0, 2: 0, 1: 0}),
      ('Am', 'La menor', {6: 'x', 5: 0, 4: (2, 2), 3: (2, 3), 2: (1, 1), 1: 0})]
s = Svg(2400, 1000, 'Los cinco acordes del mes 4: G, C, D, Em y Am')
s.head('Mis cinco acordes', 'G · C · D · Em · Am — los números son los dedos de la mano izquierda')
for c, (sym, name, sh) in enumerate(CH):
    bx = 120 + c * 450; gx = 70; top = 320; fh = 120
    s.text(bx + 2.5 * gx, 210, sym, 60, 700); s.text(bx + 2.5 * gx, 255, name, 26, 500, GRAY, 'middle', FI)
    s.rect(bx - 6, top - 14, 5 * gx + 12, 16, INK)
    for f in range(1, 5): s.line(bx, top + f * fh, bx + 5 * gx, top + f * fh, FRET, 4)
    for j, st in enumerate((6, 5, 4, 3, 2, 1)):
        x = bx + j * gx; s.line(x, top, x, top + 4 * fh, STR, 2 + st * 0.7)
        v = sh[st]
        if v == 'x':
            s.text(x, top - 40, '✕', 30, 700, GRAY); continue
        f, d = (v, None) if v == 0 else v
        if f == 0: s.circle(x, top - 50, 14, 'none', INK, 4)
        else:
            s.circle(x, top + (f - 0.5) * fh, 28, INK); s.text(x, top + (f - 0.5) * fh + 11, str(d), 30, 700, '#FFFFFF')
        n = note(st, f)
        if n not in FLAT:
            col = COL[n]; s.rect(x - 32, top + 4 * fh + 30, 64, 36, col, INK, 2, 18)
            s.text(x, top + 4 * fh + 55, n, 16 if len(n) > 2 else 18, 700, '#FFFFFF' if n in WHITE_TXT else INK)
s.text(1200, 940, '✕ = esa cuerda no suena · ○ = cuerda al aire', 30, 500, GRAY, 'middle', FI)
s.save('G2_acordes_mes4')
print('ok')
