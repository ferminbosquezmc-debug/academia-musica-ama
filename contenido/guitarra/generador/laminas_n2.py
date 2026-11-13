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

# ===================== MES 5 (clases 17–20) =====================
CLEF = "M434 2Q464 -103 464 -170Q464 -223 427.0 -257.0Q390 -291 337 -291Q287 -291 250.0 -261.5Q213 -232 213 -190Q213 -160 233.5 -133.5Q254 -107 283.5 -107.0Q313 -107 331.5 -128.5Q350 -150 350 -178Q350 -240 280 -240Q298 -268 338 -268Q353 -268 368.5 -263.5Q384 -259 401.0 -248.0Q418 -237 428.5 -213.5Q439 -190 439 -157Q439 -136 411 -6Q389 -12 356 -12Q259 -12 189.5 60.0Q120 132 120 232Q120 267 131.5 303.0Q143 339 157.5 366.5Q172 394 200.5 428.5Q229 463 248.5 483.5Q268 504 303 539Q280 621 280 689Q280 779 313.0 839.5Q346 900 379 900Q389 900 401.5 887.0Q414 874 426.0 851.0Q438 828 446.5 790.5Q455 753 455 710Q455 551 342 447L368 329Q384 332 397 332Q458 332 500.0 282.5Q542 233 542 162Q542 44 434 2ZM426 746Q426 801 394 801Q358 801 333.0 748.0Q308 695 308 630Q308 588 321 557Q359 580 392.5 639.5Q426 699 426 746ZM498 128Q498 183 466.0 216.0Q434 249 383 249L428 23Q498 52 498 128ZM407 17 361 247Q334 241 311.5 214.0Q289 187 289 158Q289 143 295.0 128.5Q301 114 309.5 104.0Q318 94 327.0 86.0Q336 78 342.0 74.5Q348 71 348 71L340 66Q307 75 277.5 106.0Q248 137 248 184Q248 231 277.5 270.5Q307 310 343 323L325 430Q168 299 168 177Q168 104 223.0 55.0Q278 6 348 6Q365 6 407 17Z"
def staff(s, x1, x2, y0, sp=34):
    for k in range(5): s.line(x1, y0 + k * sp, x2, y0 + k * sp, INK, 3)
    sc = 0.21 * sp / 34
    s.add(f'<path d="{CLEF}" fill="{INK}" transform="translate({x1 + 8:.1f},{y0 + 4 * sp - 6:.1f}) scale({sc:.4f},{-sc:.4f})"/>')
STEP = {'DO': -2, 'RE': -1, 'MI': 0, 'FA': 1, 'SOL': 2, 'LA': 3, 'SI': 4, 'DO5': 5, 'RE5': 6}
def qnote(s, x, y0, n, sp=34, fill=None, half=False):
    st = STEP[n]; y = y0 + 4 * sp - st * sp / 2
    if st <= -2: s.line(x - 30, y0 + 5 * sp, x + 30, y0 + 5 * sp, INK, 3)
    base = n.replace('5', '')
    c = fill or INK
    s.add(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{sp*0.62:.1f}" ry="{sp*0.44:.1f}" transform="rotate(-20 {x:.1f} {y:.1f})" fill="{c}" stroke="{INK}" stroke-width="2.5"/>')
    if half: s.add(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{sp*0.36:.1f}" ry="{sp*0.17:.1f}" transform="rotate(-35 {x:.1f} {y:.1f})" fill="#FFFFFF"/>')
    sx = x + sp * 0.55 if st < 4 else x - sp * 0.55
    s.line(sx, y, sx, y - 3.3 * sp if st < 4 else y + 3.3 * sp, INK, 3.5)
    return y

def chordbox(s, bx, top, sym, name, sh, gx=62, fh=105, barre=None):
    s.text(bx + 2.5 * gx, top - 110, sym, 54, 700); s.text(bx + 2.5 * gx, top - 72, name, 24, 500, GRAY, 'middle', FI)
    s.rect(bx - 6, top - 14, 5 * gx + 12, 16, INK)
    for f in range(1, 5): s.line(bx, top + f * fh, bx + 5 * gx, top + f * fh, FRET, 4)
    if barre:
        f, a, b = barre; xa, xb = bx + (6 - a) * gx, bx + (6 - b) * gx
        s.rect(min(xa, xb) - 24, top + (f - 0.5) * fh - 24, abs(xb - xa) + 48, 48, INK, rx=24)
    for j, st in enumerate((6, 5, 4, 3, 2, 1)):
        x = bx + j * gx; s.line(x, top, x, top + 4 * fh, STR, 2 + st * 0.7)
        v = sh[st]
        if v == 'x': s.text(x, top - 26, '✕', 26, 700, GRAY); continue
        f, d = (v, None) if v == 0 else v
        if f == 0: s.circle(x, top - 34, 12, 'none', INK, 4)
        else:
            s.circle(x, top + (f - 0.5) * fh, 25, INK); s.text(x, top + (f - 0.5) * fh + 10, str(d), 27, 700, '#FFFFFF')
        n = note(st, f)
        if n not in FLAT:
            s.rect(x - 29, top + 4 * fh + 24, 58, 32, COL[n], INK, 2, 16)
            s.text(x, top + 4 * fh + 46, n, 15 if len(n) > 2 else 17, 700, '#FFFFFF' if n in WHITE_TXT else INK)

# 17 · Patrones de rasgueo -----------------------------------------------------
s = Svg(2400, 1240, 'Patrones de rasgueo')
s.head('Patrones de rasgueo', '↓ hacia abajo · ↑ hacia arriba · dorado = acento · la mano sigue moviéndose aunque no toque')
PAT = [('1 · Básico', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['D', '', 'D', '', 'D', '', 'D', '']),
       ('2 · Abajo y arriba', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U']),
       ('3 · Balada y pop', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['D', '', 'D', 'U', '', 'U', 'D', 'U']),
       ('4 · Vals', '3/4', ['1', '2', '3'], ['B', 'D', 'D'])]
for r, (nm, cp, cnt, st) in enumerate(PAT):
    y = 230 + r * 245
    s.text(60, y + 60, nm, 36, 700, INK, 'start'); s.text(60, y + 105, cp, 30, 600, GRAY, 'start', FI)
    n = len(cnt); cw = 1700 / 8
    for k in range(n):
        x = 560 + k * cw + cw / 2
        s.rect(x - cw / 2 + 6, y, cw - 12, 200, '#F3F1EA' if cnt[k] != 'y' else '#FAFAF7', rx=14)
        s.text(x, y + 180, cnt[k], 34, 700, INK if cnt[k] != 'y' else GRAY)
        a = st[k]; acc = (k == 0)
        col = GOLD if acc else INK
        if a == 'D':
            s.line(x, y + 30, x, y + 120, col, 12 if acc else 9); s.add(f'<path d="M{x-24} {y+108} L{x+24} {y+108} L{x} {y+146} Z" fill="{col}"/>')
        elif a == 'U':
            s.line(x, y + 60, x, y + 146, GRAY, 8); s.add(f'<path d="M{x-20} {y+70} L{x+20} {y+70} L{x} {y+36} Z" fill="{GRAY}"/>')
        elif a == 'B':
            s.circle(x, y + 85, 38, GOLD, INK, 3); s.text(x, y + 97, 'p', 36, 700)
s.text(1200, 1210, 'Vals: en el 1 el pulgar (p) toca el bajo del acorde; en el 2 y el 3, rasgueo suave.', 30, 500, GRAY, 'middle', FI)
s.save('G2_rasgueos')

# 18 · Arpegio p-i-m-a ------------------------------------------------------------
s = Svg(2400, 1050, 'Arpegio con los dedos p, i, m y a')
s.head('Mis dedos cantan: el arpegio', 'Mano derecha: p = pulgar · i = índice · m = medio · a = anular')
x0, y0, sg = 260, 260, 70
for i, st in enumerate((1, 2, 3, 4, 5, 6)):
    s.line(x0, y0 + i * sg, x0 + 900, y0 + i * sg, STR, 2 + st * 0.8)
    s.text(x0 - 50, y0 + i * sg + 10, f'{st}ª', 28, 600, GRAY)
FING = [(1, 'a', '#8E3BB8'), (2, 'm', '#283593'), (3, 'i', '#2AA7E8')]
for st, f, c in FING:
    y = y0 + (st - 1) * sg; s.circle(x0 + 980, y, 30, c, INK, 2); s.text(x0 + 980, y + 11, f, 32, 700, '#FFFFFF')
s.rect(x0 + 945, y0 + 3 * sg - 30, 70, 2 * sg + 60, GOLD, INK, 2, 35); s.text(x0 + 980, y0 + 4 * sg + 12, 'p', 36, 700)
s.text(x0 + 1050, y0 + 4 * sg + 10, 'el pulgar toca el bajo (6.ª, 5.ª o 4.ª)', 28, 600, GRAY, 'start', FI)
s.text(x0 + 1050, y0 + 1 * sg + 10, 'un dedo para cada cuerda aguda', 28, 600, GRAY, 'start', FI)
y = 820; s.text(60, y - 70, 'Patrón en 3/4 (seis corcheas):', 34, 700, INK, 'start')
SEQ = [('p', 'bajo', GOLD), ('i', '3ª', '#2AA7E8'), ('m', '2ª', '#283593'), ('a', '1ª', '#8E3BB8'), ('m', '2ª', '#283593'), ('i', '3ª', '#2AA7E8')]
for k, (f, c, col) in enumerate(SEQ):
    x = 160 + k * 330
    s.rect(x - 140, y - 40, 280, 150, '#F3F1EA', rx=16)
    s.circle(x, y + 10, 36, col, INK, 2); s.text(x, y + 23, f, 36, 700, '#FFFFFF' if f != 'p' else INK)
    s.text(x, y + 90, c, 26, 600, GRAY, 'middle', FI)
    s.text(x, y - 55, ['1', 'y', '2', 'y', '3', 'y'][k], 30, 700, INK if k % 2 == 0 else GRAY)
s.save('G2_arpegio')

# 19 · Escala de Do mayor con grados ---------------------------------------------
s = Svg(2400, 1000, 'Escala de Do mayor en primera posición')
s.head('Escala de DO mayor · primera posición', 'Del DO de la 5.ª cuerda (traste 3) al DO de la 2.ª cuerda (traste 1) · sin alteraciones')
x0, y0, fw, sg = 420, 250, 420, 110
fretboard(s, x0, y0, 4, fw, sg)
SC = [(5, 3, 3), (4, 0, 0), (4, 2, 2), (4, 3, 3), (3, 0, 0), (3, 2, 2), (2, 0, 0), (2, 1, 1)]
GR = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
for k, (st, f, d) in enumerate(SC):
    i = (1, 2, 3, 4, 5, 6).index(st); x, y = fx(x0, fw, f), y0 + i * sg
    pill(s, x, y, note(st, f), 26, 104)
    s.circle(x + 66, y - 40, 26, GOLD, INK, 2); s.text(x + 66, y - 31, GR[k], 20 if len(GR[k]) > 2 else 24, 700, INK)
    if d: s.text(x - 62, y - 34, f'd{d}', 22, 700, GRAY)
s.text(1200, 920, 'Los grados se escriben con números romanos: I = DO, IV = FA, V = SOL… y VIII vuelve a ser DO.', 30, 500, GRAY, 'middle', FI)
s.save('G2_escala_do')

# 19 · Lectura sin color ------------------------------------------------------------
s = Svg(2400, 700, 'Lectura sin color: melodía en Do')
s.head('🖤 Lectura sin color', 'Melodía «Primer paseo» (composición AMA) · escribe el nombre de cada nota en su cuadro')
MEL = [('DO', 0), ('RE', 0), ('MI', 0), ('DO', 0), ('MI', 0), ('FA', 0), ('SOL', 1), ('SOL', 0), ('LA', 0), ('SOL', 0), ('FA', 0), ('MI', 0), ('RE', 0), ('DO', 1)]
y0 = 260; staff(s, 60, 2340, y0)
x = 300; bars = [4, 7, 11]
for k, (n, h) in enumerate(MEL):
    qnote(s, x, y0, n, half=bool(h))
    s.rect(x - 48, 540, 96, 60, '#FFFFFF', INK, 2, 10)
    x += 240 if h else 120
    if k + 1 in bars: s.line(x - 50, y0, x - 50, y0 + 4 * 34, INK, 3); x += 30
s.line(2330, y0, 2330, y0 + 136, INK, 4); s.line(2318, y0, 2318, y0 + 136, INK, 2)
s.save('G2_lectura_sin_color')

# 20 · Los acordes de la tonalidad --------------------------------------------------
s = Svg(2400, 1150, 'Los acordes de la tonalidad de Do mayor')
s.head('Los acordes de la tonalidad de DO', 'Sobre cada grado se forma una tríada: mayor (I, IV, V), menor (ii, iii, vi) o disminuida (vii°)')
ROW = [('I', 'C', 'mayor'), ('ii', 'Dm', 'menor'), ('iii', 'Em', 'menor'), ('IV', 'F', 'mayor'), ('V', 'G', 'mayor'), ('vi', 'Am', 'menor'), ('vii°', 'B°', 'disminuido')]
for k, (g, c, q) in enumerate(ROW):
    x = 190 + k * 336
    col = '#FFF3C4' if q == 'mayor' else '#E6EEF8' if q == 'menor' else '#EEEEEE'
    s.rect(x - 150, 190, 300, 210, col, INK, 2, 18)
    s.text(x, 255, g, 40, 700, DGOLD); s.text(x, 330, c, 52, 700); s.text(x, 378, q, 24, 600, GRAY, 'middle', FI)
chordbox(s, 520, 640, 'Dm', 'Re menor', {6: 'x', 5: 'x', 4: 0, 3: (2, 2), 2: (3, 3), 1: (1, 1)})
chordbox(s, 1420, 640, 'F', 'Fa mayor (pequeño)', {6: 'x', 5: 'x', 4: (3, 3), 3: (2, 2), 2: (1, 1), 1: (1, 1)}, barre=(1, 2, 1))
s.text(1200, 1120, 'En F, el dedo 1 pisa a la vez la 1.ª y la 2.ª cuerda en el traste 1: es tu primera mini-cejilla.', 30, 500, GRAY, 'middle', FI)
s.save('G2_acordes_tonalidad')

# ===================== MES 6 (clases 21–24) =====================
# 21 · La cejilla --------------------------------------------------------------------
s = Svg(2400, 1150, 'La cejilla: formas de Mi y de La menor')
s.head('La cejilla', 'El dedo 1 pisa varias cuerdas a la vez, como un traste nuevo · F (forma de Mi) y Bm (forma de La menor)')
chordbox(s, 330, 470, 'F', 'Fa mayor · cejilla en el traste 1', {6: (1, 1), 5: (3, 3), 4: (3, 4), 3: (2, 2), 2: (1, 1), 1: (1, 1)}, barre=(1, 6, 1))
chordbox(s, 1430, 470, 'Bm', 'Si menor · cejilla en el traste 2', {6: 'x', 5: (2, 1), 4: (4, 3), 3: (4, 4), 2: (3, 2), 1: (2, 1)}, barre=(2, 5, 1))
s.text(1200, 1040, 'Pulgar detrás del mástil, a la altura del dedo 1 · el dedo 1 bien recto y pegado al traste.', 30, 500, GRAY, 'middle', FI)
s.text(1200, 1100, 'Revisa la cejilla cuerda por cuerda: cada una debe sonar limpia.', 30, 600, DGOLD, 'middle', FI)
s.save('G2_cejilla')

# 22 · Acordes de séptima abiertos ---------------------------------------------------
s = Svg(2400, 1000, 'Acordes de séptima: G7, D7, E7 y A7')
s.head('Acordes de séptima', 'Al acorde mayor se le suma una cuarta nota: la séptima. Suenan con ganas de ir al acorde siguiente')
SEP = [('G7', 'Sol séptima', {6: (3, 3), 5: (2, 2), 4: 0, 3: 0, 2: 0, 1: (1, 1)}),
       ('D7', 'Re séptima', {6: 'x', 5: 'x', 4: 0, 3: (2, 2), 2: (1, 1), 1: (2, 3)}),
       ('E7', 'Mi séptima', {6: 0, 5: (2, 2), 4: 0, 3: (1, 1), 2: 0, 1: 0}),
       ('A7', 'La séptima', {6: 'x', 5: 0, 4: (2, 2), 3: 0, 2: (2, 3), 1: 0})]
for c, (sym, name, sh) in enumerate(SEP):
    chordbox(s, 150 + c * 570, 400, sym, name, sh)
s.text(1200, 960, 'G7 lleva a C · D7 lleva a G · A7 lleva a D · E7 lleva a A (o a Am)', 30, 600, DGOLD, 'middle', FI)
s.save('G2_septimas')

# 23 · Dinámicas y forma ---------------------------------------------------------------
s = Svg(2400, 1080, 'Dinámicas y forma A–B–A')
s.head('Toco con expresión', 'Las dinámicas dicen qué tan fuerte o suave se toca · la forma dice cómo se ordenan las partes')
DYN = [('pp', 'pianissimo', 'muy suave'), ('p', 'piano', 'suave'), ('mp', 'mezzo piano', 'medio suave'),
       ('mf', 'mezzo forte', 'medio fuerte'), ('f', 'forte', 'fuerte'), ('ff', 'fortissimo', 'muy fuerte')]
for k, (sym, it, es) in enumerate(DYN):
    x = 260 + k * 376; h = 50 + k * 42
    s.rect(x - 70, 470 - h, 140, h, GOLD if k >= 3 else '#E9D9A6', INK, 2, 10)
    s.add(f'<text x="{x}" y="540" font-family="\'DejaVu Serif\', \'Times New Roman\', serif" font-size="58" font-style="italic" font-weight="700" fill="{INK}" text-anchor="middle">{sym}</text>')
    s.text(x, 585, it, 24, 600, GRAY, 'middle', FI); s.text(x, 620, es, 26, 700, INK, 'middle', FI)
s.add(f'<path d="M260 690 L1000 660 M260 690 L1000 720" stroke="{INK}" stroke-width="5" fill="none"/>'); s.text(630, 770, 'crescendo: cada vez más fuerte', 26, 600, GRAY, 'middle', FI)
s.add(f'<path d="M1400 660 L2140 690 L1400 720" stroke="{INK}" stroke-width="5" fill="none"/>'); s.text(1770, 770, 'decrescendo: cada vez más suave', 26, 600, GRAY, 'middle', FI)
FORM = [('A', 'estrofa', '#2AA7E8'), ('B', 'coro', '#F57C00'), ('A', 'estrofa', '#2AA7E8')]
for k, (l, n, c) in enumerate(FORM):
    x = 520 + k * 680
    s.rect(x - 280, 840, 560, 180, c, INK, 2, 22); s.text(x, 935, l, 72, 700, '#FFFFFF' if c == '#2AA7E8' else INK); s.text(x, 995, n, 30, 700, '#FFFFFF' if c == '#2AA7E8' else INK, 'middle', FI)
s.save('G2_dinamicas_forma')

# 24 · La guitarra en la banda ----------------------------------------------------------
s = Svg(2400, 1000, 'La guitarra en la banda')
s.head('Tocamos en banda', 'Cada instrumento tiene su tarea; la guitarra no tiene que tocarlo todo')
BAND = [('🎤', 'Voz', 'la melodía y la letra', '#E5312B'), ('🎸', 'Guitarra', 'acordes y ritmo', '#2AA7E8'), ('🎹', 'Teclado', 'acordes largos de fondo', '#2E9E4F'),
        ('🎸', 'Bajo', 'las notas graves de cada acorde', '#283593'), ('🥁', 'Batería', 'el pulso y la energía', '#F57C00')]
for k, (em, n, d, c) in enumerate(BAND):
    x = 250 + k * 475
    s.rect(x - 215, 240, 430, 420, '#FAFAF7', c, 6, 24)
    s.text(x, 380, em, 96, 400); s.text(x, 470, n, 44, 700); s.text(x, 530, d, 26, 600, GRAY, 'middle', FI)
TIP = ['Escucha a la batería: ella marca el pulso de todos.', 'Si hay teclado, toca más suave o con arpegios: no tapes al cantante.',
       'Mira al líder: él indica la entrada, el coro y el final.']
for k, tx in enumerate(TIP):
    s.circle(160, 760 + k * 70, 18, GOLD, INK, 2); s.text(200, 770 + k * 70, tx, 32, 600, INK, 'start', FI)
s.save('G2_banda')

# ===================== NIVEL 3 · MES 7 (clases 25–28) =====================
def chordbox_at(s, bx, top, sym, name, sh, start, gx=62, fh=105, barre=None):
    """Diagrama de acorde que empieza en el traste `start` (los trastes de `sh` son relativos: 1 = start)."""
    s.text(bx + 2.5 * gx, top - 110, sym, 54, 700); s.text(bx + 2.5 * gx, top - 72, name, 24, 500, GRAY, 'middle', FI)
    s.line(bx, top, bx + 5 * gx, top, FRET, 4)
    s.text(bx - 40, top + 0.5 * fh + 10, f'{start}', 30, 700, DGOLD, 'end')
    for f in range(1, 5): s.line(bx, top + f * fh, bx + 5 * gx, top + f * fh, FRET, 4)
    if barre:
        f, a, b = barre; xa, xb = bx + (6 - a) * gx, bx + (6 - b) * gx
        s.rect(min(xa, xb) - 24, top + (f - 0.5) * fh - 24, abs(xb - xa) + 48, 48, INK, rx=24)
    for j, st in enumerate((6, 5, 4, 3, 2, 1)):
        x = bx + j * gx; s.line(x, top, x, top + 4 * fh, STR, 2 + st * 0.7)
        v = sh[st]
        if v == 'x': s.text(x, top - 26, '✕', 26, 700, GRAY); continue
        f, d = v
        s.circle(x, top + (f - 0.5) * fh, 25, INK); s.text(x, top + (f - 0.5) * fh + 10, str(d), 27, 700, '#FFFFFF')
        n = note(st, f + start - 1)
        if n in FLAT: s.rect(x - 29, top + 4 * fh + 24, 58, 32, INK, INK, 2, 16); s.text(x, top + 4 * fh + 46, n, 14, 700, '#FFFFFF')
        else:
            s.rect(x - 29, top + 4 * fh + 24, 58, 32, COL[n], INK, 2, 16)
            s.text(x, top + 4 * fh + 46, n, 15 if len(n) > 2 else 17, 700, '#FFFFFF' if n in WHITE_TXT else INK)

def scale_on(s, x0, y0, fw, sg, frets, notes, grades):
    fretboard(s, x0, y0, frets, fw, sg)
    for k, (st, f) in enumerate(notes):
        i = (1, 2, 3, 4, 5, 6).index(st); x, y = fx(x0, fw, f), y0 + i * sg
        pill(s, x, y, note(st, f), 22, 92)
        s.circle(x + 56, y - 32, 21, GOLD, INK, 2); s.text(x + 56, y - 24, grades[k], 18 if len(grades[k]) > 2 else 21, 700, INK)

# 25 · Escalas menores en primera posición ---------------------------------------
s = Svg(2400, 1500, 'Escalas de La menor y Mi menor en primera posición')
s.head('Dos escalas menores', 'La menor (relativa de Do mayor) y Mi menor (relativa de Sol mayor) · fórmula T-S-T-T-S-T-T')
R = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
s.text(140, 230, 'LA menor · sin alteraciones', 34, 700, INK, 'start')
scale_on(s, 420, 320, 380, 82, 4, [(5, 0), (5, 2), (5, 3), (4, 0), (4, 2), (4, 3), (3, 0), (3, 2)], R)
s.text(140, 860, 'MI menor · un FA♯', 34, 700, INK, 'start')
scale_on(s, 420, 950, 380, 82, 4, [(6, 0), (6, 2), (6, 3), (5, 0), (5, 2), (5, 3), (4, 0), (4, 2)], R)
s.save('G3_escalas_menores')

# 25 · Armaduras ------------------------------------------------------------------------
s = Svg(2400, 760, 'Las armaduras: sostenidos y bemoles al inicio del pentagrama')
s.head('La armadura', 'Los ♯ o ♭ que van al principio valen para toda la canción · cada armadura sirve a una mayor y a su relativa menor')
ARM = [('Do mayor · La menor', []), ('Sol mayor · Mi menor', [('♯', 'FA5')]), ('Re mayor · Si menor', [('♯', 'FA5'), ('♯', 'DO5')]), ('Fa mayor · Re menor', [('♭', 'SI')])]
STEP2 = {'FA5': 8, 'DO5': 5, 'SI': 4}
for k, (lab, acc) in enumerate(ARM):
    x1 = 80 + k * 580; y0 = 300; sp = 34
    staff(s, x1, x1 + 500, y0)
    for j, (sg_, pos) in enumerate(acc):
        y = y0 + 4 * sp - STEP2[pos] * sp / 2
        s.add(f'<text x="{x1 + 150 + j * 50}" y="{y + 18:.1f}" font-family="\'DejaVu Serif\', \'Times New Roman\', serif" font-size="64" font-weight="700" fill="{INK}" text-anchor="middle">{sg_}</text>')
    s.text(x1 + 250, 560, lab.split(' · ')[0], 32, 700); s.text(x1 + 250, 605, lab.split(' · ')[1], 28, 600, GRAY, 'middle', FI)
    s.text(x1 + 250, 660, ['sin alteraciones', '1 sostenido', '2 sostenidos', '1 bemol'][k], 26, 600, DGOLD, 'middle', FI)
s.save('G3_armaduras')

# 26 · Quintas y power chords --------------------------------------------------------------
s = Svg(2400, 1050, 'Acordes de quinta (power chords)')
s.head('Acordes de quinta («power chords»)', 'Solo dos notas distintas: la nota base (1) y su quinta justa (5), a veces con la octava (8) · se escriben con un 5')
PW = [('E5', 'en la 6.ª al aire', {6: (0, '1'), 5: (2, '5'), 4: (2, '8')}), ('A5', 'en la 5.ª al aire', {5: (0, '1'), 4: (2, '5'), 3: (2, '8')}),
      ('G5', 'móvil · traste 3', {6: (3, '1'), 5: (5, '5'), 4: (5, '8')}), ('C5', 'móvil · traste 3', {5: (3, '1'), 4: (5, '5'), 3: (5, '8')})]
for k, (sym, sub, sh) in enumerate(PW):
    x0 = 160 + k * 570; y0 = 330; fw, sg = 80, 70
    s.text(x0 + 200, 230, sym, 54, 700); s.text(x0 + 200, 272, sub, 24, 500, GRAY, 'middle', FI)
    for i, st in enumerate((1, 2, 3, 4, 5, 6)): s.line(x0, y0 + i * sg, x0 + 6 * fw, y0 + i * sg, STR, 2 + st * 0.7)
    s.rect(x0 - 8, y0 - 20, 10, 5 * sg + 40, INK)
    for f in range(1, 7): s.line(x0 + f * fw, y0 - 20, x0 + f * fw, y0 + 5 * sg + 20, FRET, 4)
    for st, (f, lab) in sh.items():
        i = (1, 2, 3, 4, 5, 6).index(st); x = x0 - 26 if f == 0 else x0 + (f - 0.5) * fw; y = y0 + i * sg
        s.circle(x, y, 26, GOLD if lab == '1' else INK, INK, 2); s.text(x, y + 10, lab, 26, 700, INK if lab == '1' else '#FFFFFF')
    s.text(x0 + 200, y0 + 5 * sg + 70, 'trastes 1–6', 22, 600, GRAY, 'middle', FI)
s.text(1200, 900, 'La forma no cambia: muévela por el mástil y la nota base (dorada) da el nombre del acorde.', 30, 600, INK, 'middle', FI)
s.text(1200, 960, 'Quinta justa = 7 semitonos · octava = 12 semitonos', 30, 600, DGOLD, 'middle', FI)
s.save('G3_quintas')

# 27 · Ligados --------------------------------------------------------------------------------
s = Svg(2400, 900, 'Ligados: martillo y tirón')
s.head('Los ligados', 'Dos notas con un solo ataque de la mano derecha · H = martillo (sube) · P = tirón (baja)')
def tabrow(s, x0, y0, items, title):
    s.text(x0, y0 - 70, title, 36, 700, INK, 'start')
    for i in range(6): s.line(x0, y0 + i * 40, x0 + 1000, y0 + i * 40, GRAY, 2)
    for i, lab in enumerate(['1ª', '2ª', '3ª', '4ª', '5ª', '6ª']): s.text(x0 - 40, y0 + i * 40 + 9, lab, 22, 600, GRAY)
    for k, (st, f, x, arc) in enumerate(items):
        y = y0 + (st - 1) * 40; s.rect(x0 + x - 22, y - 20, 44, 40, '#FFFFFF'); s.text(x0 + x, y + 11, str(f), 32, 700)
        if arc: a, lab = arc; s.add(f'<path d="M{x0+x} {y-24} Q{x0+x+a/2} {y-80} {x0+x+a} {y-24}" stroke="{DGOLD}" stroke-width="4" fill="none"/>'); s.text(x0 + x + a / 2, y - 70, lab, 26, 700, DGOLD)
tabrow(s, 160, 330, [(1, 0, 120, (160, 'H')), (1, 2, 280, None), (1, 0, 520, (160, 'H')), (1, 3, 680, None)], 'Martillo (H): toco 0 y «martillo» el traste 2')
tabrow(s, 1300, 330, [(1, 2, 120, (160, 'P')), (1, 0, 280, None), (1, 3, 520, (160, 'P')), (1, 0, 680, None)], 'Tirón (P): toco 2 y tiro del dedo hacia abajo')
TX = ['Martillo: el dedo cae con fuerza justo detrás del traste, como un martillo pequeño.', 'Tirón: el dedo jala la cuerda un poco hacia el piso al soltarla, para que siga sonando.', 'Las dos notas deben sonar parejas: escucha que la segunda no se apague.']
for k, tx in enumerate(TX): s.circle(160, 700 + k * 60, 16, GOLD, INK, 2); s.text(195, 710 + k * 60, tx, 30, 600, INK, 'start', FI)
s.save('G3_ligados')

# 28 · Séptimas móviles con cejilla ------------------------------------------------------------
s = Svg(2400, 1100, 'Acordes de séptima con cejilla')
s.head('Séptimas móviles con cejilla', 'Forma de Mi séptima (cejilla en la 6.ª) y forma de La séptima (cejilla en la 5.ª) · el número dorado es el traste')
chordbox_at(s, 330, 470, 'A7', 'forma de Mi7 · traste 5', {6: (1, 1), 5: (3, 3), 4: (1, 1), 3: (2, 2), 2: (1, 1), 1: (1, 1)}, 5, barre=(1, 6, 1))
chordbox_at(s, 1430, 470, 'B7', 'forma de La7 · traste 2', {6: 'x', 5: (1, 1), 4: (3, 3), 3: (1, 1), 2: (3, 4), 1: (1, 1)}, 2, barre=(1, 5, 1))
s.text(1200, 1040, 'Muévelas: la forma de Mi7 en el traste 3 es G7; la forma de La7 en el traste 3 es C7.', 30, 600, INK, 'middle', FI)
s.save('G3_septimas_cejilla')

# 28 · Tríadas en las tres primeras cuerdas -------------------------------------------------
s = Svg(2400, 760, 'El acorde de Do en tres posiciones')
s.head('Un acorde, tres posiciones (inversiones)', 'Acorde de C en las cuerdas 1, 2 y 3 · el número dorado dice qué nota está abajo')
x0, y0, fw, sg = 280, 300, 195, 110
fretboard(s, x0, y0, 10, fw, sg, strings=(1, 2, 3))
SH3 = [([(3, 0), (2, 1), (1, 0)], 'C/G · 2.ª inversión', '5'), ([(3, 5), (2, 5), (1, 3)], 'C · fundamental', '1'), ([(3, 9), (2, 8), (1, 8)], 'C/E · 1.ª inversión', '3')]
for k, (pts, lab, low) in enumerate(SH3):
    xs = []
    for st, f in pts:
        i = (1, 2, 3).index(st); x, y = fx(x0, fw, f), y0 + i * sg; xs.append(x)
        pill(s, x, y, note(st, f), 22, 86)
    cx = sum(xs) / len(xs); s.text(cx, 690, lab, 26, 700, INK, 'middle', FI)
    s.circle(cx, 600, 22, GOLD, INK, 2); s.text(cx, 609, low, 24, 700)
s.save('G3_triadas')

# ===================== NIVEL 3 · MES 8 (clases 29–32) =====================
def fretboard_at(s, x0, y0, f0, f1, fw, sg):
    """Diapasón horizontal de los trastes f0..f1 (sin cejuela); 1.ª cuerda arriba."""
    n = f1 - f0 + 1; W = n * fw
    s.rect(x0, y0 - sg * 0.6, W, sg * 6.2, WOOD, FRET, 2, 10)
    for k in range(n + 1): s.line(x0 + k * fw, y0 - sg * 0.6, x0 + k * fw, y0 + sg * 5.6, FRET, 5)
    for i, st in enumerate((1, 2, 3, 4, 5, 6)):
        s.line(x0 - 30, y0 + i * sg, x0 + W, y0 + i * sg, STR, 2 + st * 0.8); s.text(x0 - 70, y0 + i * sg + 10, f'{st}ª', 26, 600, GRAY)
    for k in range(n): s.text(x0 + (k + 0.5) * fw, y0 + sg * 5.6 + 44, str(f0 + k), 26, 700, DGOLD)
def fxa(x0, fw, f0, f): return x0 + (f - f0 + 0.5) * fw

# 29 · Funciones y cadencias ------------------------------------------------------
s = Svg(2400, 1100, 'Las funciones de los acordes y las cadencias')
s.head('La familia de los acordes', 'Cada acorde tiene una función: reposo (T), alejamiento (S) o tensión (D)')
FAM = [('T', 'Tónica · reposo', 'I · vi · iii', 'C · Am · Em', '#2E9E4F'), ('S', 'Subdominante · alejamiento', 'IV · ii', 'F · Dm', '#2AA7E8'), ('D', 'Dominante · tensión', 'V · V7 · vii°', 'G · G7 · B°', '#E5312B')]
for k, (l, n, g, c, col) in enumerate(FAM):
    x = 420 + k * 780
    s.rect(x - 340, 200, 680, 380, '#FAFAF7', col, 6, 26)
    s.circle(x, 285, 52, col, INK, 2); s.text(x, 305, l, 56, 700, '#FFFFFF')
    s.text(x, 395, n, 34, 700); s.text(x, 460, g, 40, 700, DGOLD); s.text(x, 530, 'en Do: ' + c, 30, 600, GRAY, 'middle', FI)
CAD = [('Cadencia auténtica', 'V → I', 'G7 → C', 'final fuerte, como un punto'), ('Cadencia plagal', 'IV → I', 'F → C', 'final suave, «amén»'),
       ('Semicadencia', '… → V', 'C → G', 'queda en suspenso, como una coma'), ('Cadencia rota', 'V → vi', 'G7 → Am', 'sorpresa: no llega a casa')]
for k, (n, f, e, d) in enumerate(CAD):
    x = 320 + k * 590
    s.rect(x - 270, 680, 540, 340, '#FFF8E1', GOLD, 3, 22)
    s.text(x, 750, n, 32, 700); s.text(x, 830, f, 50, 700, DGOLD); s.text(x, 895, e, 34, 700, INK, 'middle', FI); s.text(x, 960, d, 24, 600, GRAY, 'middle', FI)
s.save('G3_funciones')

# 30 · Estilos de acompañamiento ---------------------------------------------------
s = Svg(2400, 1450, 'Estilos de acompañamiento')
s.head('Estilos de acompañamiento', 'La misma progresión cambia de carácter según el ritmo · ↓ ↑ rasgueo · p bajo con el pulgar · ✕ golpe apagado')
STY = [('Balada', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['p', 'i', 'm', 'a', 'p', 'i', 'm', 'a'], 'arpegio tranquilo'),
       ('Pop', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['D', '', 'D', 'U', '', 'U', 'D', 'U'], 'la «y» del 2 se alarga sobre el 3: síncopa'),
       ('Vals', '3/4', ['1', '2', '3'], ['p', 'D', 'D'], 'bajo y dos rasgueos'),
       ('Caribeño', '4/4', ['1', 'y', '2', 'y', '3', 'y', '4', 'y'], ['p', 'X', '', 'X', 'p', 'X', '', 'X'], 'golpes apagados en las «y»: contratiempo'),
       ('Shuffle', '4/4', ['1', '', 'a', '2', '', 'a', '3', '', 'a', '4', '', 'a'], ['D', '', 'D', 'D', '', 'D', 'D', '', 'D', 'D', '', 'D'], 'tresillo: largo-corto, largo-corto')]
for r, (nm, cp, cnt, st, note_) in enumerate(STY):
    y = 210 + r * 245
    s.text(60, y + 60, nm, 36, 700, INK, 'start'); s.text(60, y + 105, cp, 28, 600, GRAY, 'start', FI); s.text(60, y + 145, note_, 22, 600, DGOLD, 'start', FI)
    n = len(cnt); cw = 1600 / n
    for k in range(n):
        x = 700 + k * cw + cw / 2
        s.rect(x - cw / 2 + 4, y, cw - 8, 190, '#F3F1EA' if cnt[k] not in ('y', 'a', '') else '#FAFAF7', rx=12)
        s.text(x, y + 175, cnt[k], 28, 700, INK if cnt[k] not in ('y', 'a', '') else GRAY)
        a = st[k]
        if a == 'D':
            s.line(x, y + 30, x, y + 110, INK, 8); s.add(f'<path d="M{x-20} {y+100} L{x+20} {y+100} L{x} {y+134} Z" fill="{INK}"/>')
        elif a == 'U':
            s.line(x, y + 55, x, y + 134, GRAY, 7); s.add(f'<path d="M{x-18} {y+64} L{x+18} {y+64} L{x} {y+32} Z" fill="{GRAY}"/>')
        elif a == 'X': s.text(x, y + 100, '✕', 48, 700, '#E5312B')
        elif a: s.circle(x, y + 80, 30, GOLD if a == 'p' else '#2AA7E8', INK, 2); s.text(x, y + 91, a, 30, 700, INK if a == 'p' else '#FFFFFF')
s.save('G3_estilos')

# 31 · Escala mayor móvil ------------------------------------------------------------
s = Svg(2400, 1050, 'Escala mayor móvil con la tónica en la sexta cuerda')
s.head('Escala mayor móvil', 'Dos octavas sin cuerdas al aire · aquí en SOL (tónica en la 6.ª cuerda, traste 3) · los círculos dorados son la tónica')
x0, y0, fw, sg = 330, 260, 330, 105
fretboard_at(s, x0, y0, 2, 6, fw, sg)
MOV = {6: [3, 5], 5: [2, 3, 5], 4: [2, 4, 5], 3: [2, 4, 5], 2: [3, 5], 1: [2, 3]}
FING = {2: 1, 3: 2, 4: 3, 5: 4}
for st, fr in MOV.items():
    i = (1, 2, 3, 4, 5, 6).index(st)
    for f in fr:
        x, y = fxa(x0, fw, 2, f), y0 + i * sg; n = note(st, f)
        if n == 'SOL': s.circle(x, y, 44, GOLD, INK, 3)
        pill(s, x, y, n, 22, 84)
        s.text(x + 60, y - 30, f'd{FING[f]}', 20, 700, GRAY)
s.text(1200, 990, 'Mueve la forma: con la tónica en el traste 5 es LA mayor; en el traste 8, DO mayor. Los dedos no cambian.', 30, 600, INK, 'middle', FI)
s.save('G3_escala_movil')

# 32 · Pentatónica menor, caja 1 -------------------------------------------------------
s = Svg(2400, 1050, 'Escala pentatónica de La menor, caja 1')
s.head('Pentatónica de LA menor · caja 1', 'Cinco notas: LA – DO – RE – MI – SOL · dedo 1 en el traste 5 · la tónica (LA) en dorado')
x0, y0, fw, sg = 480, 260, 360, 105
fretboard_at(s, x0, y0, 5, 8, fw, sg)
PEN = {6: [5, 8], 5: [5, 7], 4: [5, 7], 3: [5, 7], 2: [5, 8], 1: [5, 8]}
for st, fr in PEN.items():
    i = (1, 2, 3, 4, 5, 6).index(st)
    for f in fr:
        x, y = fxa(x0, fw, 5, f), y0 + i * sg; n = note(st, f)
        if n == 'LA': s.circle(x, y, 44, GOLD, INK, 3)
        pill(s, x, y, n, 22, 84)
        s.text(x + 60, y - 30, 'd' + str({5: 1, 7: 3, 8: 4}[f]), 20, 700, GRAY)
s.text(1200, 990, 'Sobre Am – F – G – Am, cualquier nota de la caja suena bien: ¡empieza y termina en LA!', 30, 600, INK, 'middle', FI)
s.save('G3_pentatonica')

# ===================== NIVEL 3 · MES 9 (clases 33–36) =====================
# 33 · Estudio en Do (composición AMA al estilo de Sor): tablatura con análisis -----
EST = [('C', [(5, 3), (3, 0), (2, 1)]), ('C', [(5, 3), (3, 0), (1, 0)]), ('G7', [(6, 3), (3, 0), (1, 1)]), ('C', [(5, 3), (3, 0), (1, 0)]),
       ('F', [(4, 3), (3, 2), (2, 1)]), ('C', [(5, 3), (3, 0), (2, 1)]), ('G7', [(6, 3), (3, 0), (2, 0)]), ('C', [(5, 3), (3, 0), (2, 1)])]
s = Svg(2400, 1300, 'Estudio en Do, composición AMA al estilo de Fernando Sor')
s.head('Estudio en Do (composición AMA, al estilo de Sor)', '3/4 · en cada compás: p (bajo) – i – m · lento, legato y con dinámicas')
for row in range(2):
    y0 = 360 + row * 460; x0 = 160
    s.text(x0, y0 - 120, ['Frase A · compases 1–4 · p', 'Frase B · compases 5–8 · mf → p'][row], 34, 700, DGOLD, 'start')
    for i in range(6): s.line(x0, y0 + i * 40, x0 + 2100, y0 + i * 40, GRAY, 2)
    for i, lab in enumerate(['1ª', '2ª', '3ª', '4ª', '5ª', '6ª']): s.text(x0 - 40, y0 + i * 40 + 9, lab, 22, 600, GRAY)
    for m in range(4):
        sym, notes = EST[row * 4 + m]; mx = x0 + m * 525
        s.line(mx, y0, mx, y0 + 200, INK, 3)
        s.text(mx + 262, y0 - 40, f'{row * 4 + m + 1} · {sym}', 30, 700)
        for k, (st, f) in enumerate(notes):
            x = mx + 90 + k * 170; y = y0 + (st - 1) * 40
            s.rect(x - 22, y - 20, 44, 40, '#FFFFFF'); s.text(x, y + 11, str(f), 32, 700)
            s.text(x, y0 + 250, ['p', 'i', 'm'][k], 26, 700, GRAY)
    s.line(x0 + 2100, y0, x0 + 2100, y0 + 200, INK, 5 if row else 3)
    s.add(f'<path d="M{x0+1050+100} {y0+300} q260 -40 520 0" stroke="{DGOLD}" stroke-width="4" fill="none"/>')
    s.text(x0 + 1050 + 360, y0 + 340, 'V7 → I · cadencia auténtica', 28, 700, DGOLD)
s.save('G3_estudio')

# 35 · Plan de ensayo de 7 días ------------------------------------------------------
s = Svg(2400, 1000, 'Plan de ensayo de siete días antes de la presentación')
s.head('Mi semana de ensayo', 'Siete días antes de la presentación · 30 minutos al día')
DAYS = [('1', 'Divido', 'cada obra en secciones de 4 compases'), ('2', 'Memorizo', 'sección por sección, lento'), ('3', 'Uno', 'las secciones de dos en dos'),
        ('4', 'Grabo', 'todo el programa y me escucho'), ('5', 'Corrijo', 'solo las partes difíciles'), ('6', 'Ensayo general', 'de pie, saludo, afino y toco todo'), ('7', 'Descanso', 'repaso suave y duermo bien')]
for k, (d, t_, sub) in enumerate(DAYS):
    x = 190 + k * 340
    s.rect(x - 155, 220, 310, 520, '#FAFAF7' if k < 6 else '#FFF8E1', GOLD if k in (5, 6) else '#C9C3B6', 4, 22)
    s.circle(x, 300, 48, GOLD, INK, 2); s.text(x, 318, d, 48, 700)
    s.text(x, 410, t_, 32 if len(t_) < 10 else 26, 700)
    words = sub.split(); lines = []; cur = ''
    for w in words:
        if len(cur) + len(w) > 14: lines.append(cur); cur = w
        else: cur = (cur + ' ' + w).strip()
    lines.append(cur)
    for j, ln in enumerate(lines): s.text(x, 470 + j * 40, ln, 24, 600, GRAY, 'middle', FI)
TIPS = ['Respira lento 4 veces antes de empezar.', 'Si te equivocas, sigue: el público casi nunca lo nota.', 'Mira un punto fijo o a una persona amiga.']
for k, tx in enumerate(TIPS): s.circle(160, 820 + k * 56, 15, GOLD, INK, 2); s.text(195, 830 + k * 56, tx, 30, 600, INK, 'start', FI)
s.save('G3_ensayo')

# 36 · Programa de la presentación final -----------------------------------------------
s = Svg(2400, 900, 'Programa de la presentación final de guitarra')
s.head('Mi presentación final', 'Cuatro partes · unos 8 a 10 minutos · Academia de Música ARPA')
PRG = [('1', 'Escala', 'mayor móvil o pentatónica', '#2AA7E8'), ('2', 'Obra', 'Estudio en Do (al estilo de Sor)', '#2E9E4F'), ('3', 'Canción', 'acompaño a un cantante o en dúo', '#F57C00'), ('4', 'Improvisación', 'blues en La o Am – F – G – Am', '#8E3BB8')]
for k, (n, t_, sub, c) in enumerate(PRG):
    x = 330 + k * 580
    s.rect(x - 260, 220, 520, 480, '#FAFAF7', c, 6, 26)
    s.circle(x, 320, 56, c, INK, 2); s.text(x, 342, n, 58, 700, '#FFFFFF')
    s.text(x, 460, t_, 42, 700); s.text(x, 530, sub, 26, 600, GRAY, 'middle', FI)
s.text(1200, 800, 'Entro, saludo, afino, toco, agradezco y salgo: todo es parte de la presentación.', 32, 600, INK, 'middle', FI)
s.save('G3_concierto')
print('ok')
