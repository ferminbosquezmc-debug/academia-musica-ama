#!/usr/bin/env python3
"""Láminas originales AMA (paso a paso) para la clase 2 de guitarra:
G1_pua.svg (cómo tomo la púa), G1_capo.svg (cómo pongo el capotraste), G1_correa.svg (cómo me pongo la correa).
Uso: python3 accesorios_acciones.py <carpeta_salida>"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ama_dibujos import pick as pick_svg, neck_section, capo_side
F1="Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; F2="Inter, 'Segoe UI', Arial, sans-serif"
SK, SKD = '#F1C27D', '#B07B3E'          # piel
WOOD, WOODD = '#D4A373', '#6E4B2A'
def T(x,y,s,sz=32,w=500,c='#1A1A1A',a='middle',f=F2): return f'<text x="{x}" y="{y}" font-family="{f}" font-size="{sz}" font-weight="{w}" fill="{c}" text-anchor="{a}">{s}</text>'
def head(title,sub,col):
    v=['<?xml version="1.0" encoding="UTF-8"?>',f'<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1200" viewBox="0 0 2400 1200" role="img" aria-label="{title}">',
       f'<title>{title}</title>','<rect width="2400" height="1200" fill="#FFFFFF"/>',
       '<defs><marker id="ar" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#C0392B"/></marker></defs>',
       T(40,72,title,48,700,a='start',f=F1),T(40,124,sub,32,500,'#555',a='start')]
    for i in range(3):
        x=40+i*780; v.append(f'<rect x="{x}" y="170" width="740" height="990" rx="36" fill="#FAFAF7" stroke="{col}" stroke-width="6"/>')
        v.append(f'<circle cx="{x+70}" cy="240" r="40" fill="{col}"/>'+T(x+70,254,str(i+1),40,700,'#FFF',f=F1))
    return v
def cap(v,cx,lines,y0=880):
    for k,(s,b) in enumerate(lines): v.append(T(cx,y0+k*48,s,32,700 if b else 500,'#1A1A1A' if b else '#333'))
def save(v,out,name): v.append('</svg>'); open(os.path.join(out,name),'w',encoding='utf-8').write('\n'.join(v))

# ---------- 1. La púa ----------
def hand(cx,cy,pick=False,thumb=False):
    s=[f'<ellipse cx="{cx-250}" cy="{cy+120}" rx="125" ry="150" fill="{SK}" stroke="{SKD}" stroke-width="6"/>']
    idx=f'M{cx-230} {cy+70} C{cx-60} {cy+80} {cx+40} {cy} {cx+20} {cy-110} C{cx} {cy-190} {cx-90} {cy-190} {cx-110} {cy-130}'
    s+= [f'<path d="{idx}" fill="none" stroke="{SKD}" stroke-width="78" stroke-linecap="round"/>',f'<path d="{idx}" fill="none" stroke="{SK}" stroke-width="64" stroke-linecap="round"/>']
    if pick:
        px,py=cx+30,cy-80
        s.append(pick_svg(px+20,py-10,.62,-75))
    if thumb:
        th=f'M{cx-270} {cy-40} L{cx+40} {cy-95}'
        s+= [f'<path d="{th}" stroke="{SKD}" stroke-width="80" stroke-linecap="round"/>',f'<path d="{th}" stroke="{SK}" stroke-width="66" stroke-linecap="round"/>']
    return s
def pua(out):
    v=head('Cómo tomo la púa','Tres pasos con la mano derecha. Así la púa no se cae y el sonido sale parejo','#F2A31B')
    for i,(pk,th) in enumerate([(False,False),(True,False),(True,True)]):
        cx=410+i*780; v+=hand(cx,560,pk,th)
    # cuerdas del paso 3
    cx=1970
    for k in range(3): v.append(f'<line x1="{cx+200+k*36}" y1="330" x2="{cx+200+k*36}" y2="780" stroke="#999" stroke-width="{3+k}"/>')
    v.append(T(cx+236,820,'Cuerdas',28,600,'#555'))
    v.append(f'<path d="M{cx+120} 520 L{cx+170} 520" stroke="#C0392B" stroke-width="6" marker-end="url(#ar)"/>')
    cap(v,410,[('Doblo el índice',True),('como si fuera un gancho.',False),('La mano queda suelta, sin apretar.',False)])
    cap(v,1190,[('Pongo la púa sobre el índice',True),('acostada sobre el costado del dedo,',False),('con la punta mirando a las cuerdas.',False)])
    cap(v,1970,[('El pulgar la sujeta encima',True),('Solo asoma la punta, poquito.',False),('Toco desde la muñeca: ↓ bajo · ↑ subo.',False)])
    save(v,out,'G1_pua.svg')

# ---------- 2. El capotraste ----------
def neck(cx,cy,capx=None,openc=False):
    s=[f'<rect x="{cx-320}" y="{cy-100}" width="640" height="200" fill="{WOOD}" stroke="{WOODD}" stroke-width="6"/>']
    fr=[cx-250+k*150 for k in range(4)]
    for x in fr: s.append(f'<rect x="{x}" y="{cy-100}" width="10" height="200" fill="#9AA3A8"/>')
    for k in range(6): s.append(f'<line x1="{cx-320}" y1="{cy-85+k*34}" x2="{cx+320}" y2="{cy-85+k*34}" stroke="#EDEDED" stroke-width="{3+k*0.8}"/>')
    s.append(T(cx-330,cy+150,'← hacia la cabeza',26,500,'#666',a='start')); s.append(T(cx+330,cy+150,'hacia la caja →',26,500,'#666',a='end'))
    return s,fr
def capo_top(x,y1,y2):
    # visto desde arriba: el brazo negro cruza las cuerdas; la perilla queda abajo, detrás del mástil
    return [f'<rect x="{x}" y="{y1}" width="60" height="{y2-y1}" rx="24" fill="#222" stroke="#000" stroke-width="4"/>',
            f'<rect x="{x+8}" y="{y1+14}" width="44" height="{y2-y1-28}" rx="14" fill="#555"/>']
def capof(out):
    v=head('Cómo pongo el capotraste','Siempre justo detrás del traste, recto y apretando todas las cuerdas','#2E86C1')
    # paso 1: capo abierto (visto de lado) junto al mástil cortado
    cx=410; v+=capo_side(cx-60,520,1.0,open_ang=-24)
    v.append(f'<path d="M{cx+250} 780 A60 60 0 1 1 {cx+300} 710" fill="none" stroke="#C0392B" stroke-width="6" marker-end="url(#ar)"/>')
    v.append(T(cx+150,830,'giro la perilla y se abre',26,700,'#C0392B'))
    v.append(T(cx-40,360,'Visto de lado, abierto',28,600,'#555'))
    # paso 2: visto desde arriba, detrás del traste 2
    cx=1190; s,fr=neck(cx,620); v+=s
    x=fr[1]-68; v.append(f'<rect x="{x-8}" y="514" width="76" height="212" rx="12" fill="#27AE6033" stroke="#27AE60" stroke-width="6" stroke-dasharray="14 10"/>')
    v.append(T(x-20,470,'aquí',30,700,'#27AE60',a='end')); v+=capo_top(x,300,440)
    v.append(f'<path d="M{x+30} 450 L{x+30} 500" stroke="#C0392B" stroke-width="6" marker-end="url(#ar)"/>')
    v.append(f'<path d="M{fr[1]+60} 470 L{fr[1]+14} 512" stroke="#555" stroke-width="4"/>'); v.append(T(fr[1]+66,466,'traste',26,600,'#555',a='start'))
    v.append(T(cx,360-90,'Visto desde arriba',28,600,'#555'))
    # paso 3: cerrado, apretando el mástil (visto de lado)
    cx=1970; v+=neck_section(cx-40,600,1.0); v+=capo_side(cx-40,600,1.0)
    v.append(T(cx,400,'✓ Todas las cuerdas suenan claras',30,700,'#27AE60'))
    cap(v,410,[('Abro el capotraste',True),('Giro la perilla para abrirlo.',False),('(Si es de resorte, aprieto la pinza.)',False)])
    cap(v,1190,[('Lo pongo justo detrás del traste',True),('cerca del traste, no encima de él,',False),('y bien recto, de lado a lado.',False)])
    cap(v,1970,[('Cierro y pruebo',True),('Giro la perilla solo hasta que suene',False),('claro. Si una cuerda zumba, lo acerco.',False)])
    save(v,out,'G1_capo.svg')

# ---------- 3. La correa ----------
def guitar(x,y,ang,sc,body=True):
    g=[f'<g transform="translate({x} {y}) rotate({ang}) scale({sc})">',
       f'<rect x="-28" y="-600" width="56" height="380" fill="#8B5E3C" stroke="{WOODD}" stroke-width="6"/>',
       f'<rect x="-45" y="-700" width="90" height="110" rx="14" fill="#5D3A1A"/>',
       f'<circle cx="0" cy="-150" r="95" fill="{WOOD}" stroke="{WOODD}" stroke-width="8"/>',
       f'<circle cx="0" cy="0" r="125" fill="{WOOD}" stroke="{WOODD}" stroke-width="8"/>',
       f'<rect x="-95" y="-160" width="190" height="80" fill="{WOOD}"/>',
       f'<circle cx="0" cy="-110" r="40" fill="#3B2A1A"/>',
       '<circle cx="0" cy="128" r="18" fill="#444"/><circle cx="0" cy="-232" r="16" fill="#444"/></g>']
    return g
def pt(x,y,ang,sc,px,py):
    import math; a=math.radians(ang); return (x+sc*(px*math.cos(a)-py*math.sin(a)), y+sc*(px*math.sin(a)+py*math.cos(a)))
def correa(out):
    v=head('Cómo me pongo la correa','Dos botones, un hombro y la guitarra a la misma altura que cuando estoy sentado','#8E44AD')
    PU='#8E44AD'
    # paso 1: guitarra acostada, engancho el botón de abajo
    cx=410; G=(cx-30,520,90,.4); v+=guitar(*G)
    ex,ey=pt(*G,0,128); v.append(f'<path d="M{ex} {ey} C{ex-60} {ey+150} {ex+80} {ey+260} {ex+220} {ey+230}" fill="none" stroke="{PU}" stroke-width="24" stroke-linecap="round"/>')
    v.append(f'<circle cx="{ex}" cy="{ey}" r="34" fill="none" stroke="#C0392B" stroke-width="6"/>'); v.append(T(ex+40,ey-70,'botón de abajo',28,700,'#C0392B'))
    # paso 2: el otro extremo al botón del mástil
    cx=1190; G=(cx-30,520,90,.4); v+=guitar(*G)
    ex,ey=pt(*G,0,128); hx,hy=pt(*G,0,-232)
    v.append(f'<path d="M{ex} {ey} C{ex-40} {ey+260} {hx+40} {hy+260} {hx} {hy}" fill="none" stroke="{PU}" stroke-width="24" stroke-linecap="round"/>')
    v.append(f'<circle cx="{hx}" cy="{hy}" r="34" fill="none" stroke="#C0392B" stroke-width="6"/>'); v.append(T(hx+40,hy-70,'botón del mástil',28,700,'#C0392B'))
    # paso 3: persona con la guitarra colgada
    cx=1970
    v.append(f'<rect x="{cx-110}" y="380" width="220" height="380" rx="70" fill="#5DADE2" stroke="#2471A3" stroke-width="6"/>')
    v.append(f'<circle cx="{cx}" cy="315" r="60" fill="{SK}" stroke="{SKD}" stroke-width="6"/>')
    v.append(f'<rect x="{cx-90}" y="740" width="70" height="100" fill="#34495E"/><rect x="{cx+20}" y="740" width="70" height="100" fill="#34495E"/>')
    G=(cx-50,640,58,.5); ex,ey=pt(*G,0,128); hx,hy=pt(*G,0,-232); sh=(cx+80,395)
    v.append(f'<path d="M{sh[0]} {sh[1]} C{cx+170} 470 {hx+60} {hy} {hx} {hy}" fill="none" stroke="{PU}" stroke-width="20" stroke-dasharray="20 14" opacity=".7"/>')
    v+=guitar(*G)
    v.append(f'<path d="M{ex} {ey} C{cx-200} 520 {cx-60} 400 {sh[0]} {sh[1]}" fill="none" stroke="{PU}" stroke-width="24" stroke-linecap="round"/>')
    v.append(f'<path d="M{cx+230} 560 L{sh[0]+14} {sh[1]+20}" stroke="#C0392B" stroke-width="4" marker-end="url(#ar)"/>'); v.append(T(cx+240,600,'hombro izquierdo',26,700,'#C0392B'))
    cap(v,410,[('Engancho un extremo',True),('en el botón de abajo de la caja.',False),('Que entre bien hasta el fondo.',False)])
    cap(v,1190,[('Engancho el otro extremo',True),('en el botón cerca del mástil.',False),('Reviso que los dos estén firmes.',False)])
    cap(v,1970,[('Me la cuelgo y ajusto el largo',True),('La correa pasa por el hombro izquierdo.',False),('La guitarra, a la altura de sentado.',False)])
    save(v,out,'G1_correa.svg')

out=sys.argv[1] if len(sys.argv)>1 else '.'
pua(out); capof(out); correa(out); print('ok')
