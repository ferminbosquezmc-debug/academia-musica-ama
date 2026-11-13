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
print('ok')
