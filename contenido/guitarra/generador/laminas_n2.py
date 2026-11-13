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
print('ok')
