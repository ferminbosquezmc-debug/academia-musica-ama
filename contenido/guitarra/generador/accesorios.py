#!/usr/bin/env python3
"""Lámina original AMA: Mis accesorios (púa, capotraste y correa). Uso: python3 accesorios.py <carpeta_salida>"""
import sys, os
F1="Poppins, Montserrat, 'Trebuchet MS', Arial, sans-serif"; F2="Inter, 'Segoe UI', Arial, sans-serif"
def t(x,y,s,sz=32,w=500,c='#1A1A1A',a='middle',f=F2): return f'<text x="{x}" y="{y}" font-family="{f}" font-size="{sz}" font-weight="{w}" fill="{c}" text-anchor="{a}">{s}</text>'
v=['<?xml version="1.0" encoding="UTF-8"?>','<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1200" viewBox="0 0 2400 1200" role="img" aria-label="Mis accesorios: púa, capotraste y correa">',
'<title>Mis accesorios: púa, capotraste y correa</title>','<rect width="2400" height="1200" fill="#FFFFFF"/>',
t(40,72,'Mis accesorios: púa, capotraste y correa',48,700,a='start',f=F1),
t(40,124,'Tres ayudantes de la guitarra: para tocar, para cambiar el tono y para tocar de pie',32,500,'#555',a='start')]
# paneles
for i,col in enumerate(['#F2A31B','#2E86C1','#8E44AD']):
    x=40+i*780; v.append(f'<rect x="{x}" y="170" width="740" height="990" rx="36" fill="#FAFAF7" stroke="{col}" stroke-width="6"/>')
# 1 púa
cx=410; v.append(t(cx,250,'1 · Púa',44,700,'#B9770E',f=F1))
v.append(f'<path d="M{cx} 760 C{cx-170} 560 {cx-200} 360 {cx} 340 C{cx+200} 360 {cx+170} 560 {cx} 760 Z" fill="#F2A31B" stroke="#7E5109" stroke-width="8"/>')
v.append(f'<path d="M{cx} 740 L{cx} 690" stroke="#7E5109" stroke-width="6"/>'); v.append(t(cx+120,735,'Punta',30,600,'#7E5109',a='start'))
for k,(nm,yy) in enumerate([('Delgada · suave, para rasguear',870),('Media · ideal para empezar',930),('Gruesa · más control en notas sueltas',990)]): v.append(t(cx,yy,nm,30,500,'#333'))
v.append(t(cx,1070,'Se toma entre el pulgar y el índice',30,600)); v.append(t(cx,1112,'con la punta asomando poco',30,600))
# 2 capotraste
cx=1200; v.append(t(cx,250,'2 · Capotraste',44,700,'#1B4F72',f=F1))
v.append(f'<rect x="{cx-330}" y="440" width="660" height="200" fill="#C49A6C" stroke="#6E4B2A" stroke-width="6"/>')
for k in range(5): xx=cx-280+k*150; v.append(f'<rect x="{xx}" y="440" width="10" height="200" fill="#9AA3A8"/>')
for k in range(6): yy=460+k*32; v.append(f'<line x1="{cx-330}" y1="{yy}" x2="{cx+330}" y2="{yy}" stroke="#E8E8E8" stroke-width="{3+k*0.8}"/>')
v.append(f'<rect x="{cx-50}" y="400" width="70" height="280" rx="20" fill="#2E86C1" stroke="#1B4F72" stroke-width="6"/>')
v.append(t(cx-15,380,'Traste 2',30,600,'#1B4F72'))
v.append(t(cx,760,'Aprieta todas las cuerdas a la vez',30,600)); v.append(t(cx,802,'justo detrás de un traste',30,600))
v.append(t(cx,880,'Cada traste sube un semitono',30,500,'#333')); v.append(t(cx,930,'las formas de los acordes no cambian',30,500,'#333'))
v.append(t(cx,1060,'Capo en el traste 2: SOL suena como LA',30,600,'#1B4F72'))
# 3 correa
cx=1990; v.append(t(cx,250,'3 · Correa',44,700,'#5B2C6F',f=F1))
v.append(f'<ellipse cx="{cx+60}" cy="640" rx="190" ry="230" fill="#D4A373" stroke="#6E4B2A" stroke-width="6"/>')
v.append(f'<circle cx="{cx+60}" cy="600" r="60" fill="#3B2A1A"/>')
v.append(f'<rect x="{cx-10}" y="300" width="70" height="140" fill="#8B5E3C"/>')
v.append(f'<circle cx="{cx+60}" cy="875" r="16" fill="#555"/><circle cx="{cx+80}" cy="420" r="14" fill="#555"/>')
v.append(f'<path d="M{cx+60} 875 C{cx-260} 860 {cx-300} 420 {cx+80} 420" fill="none" stroke="#8E44AD" stroke-width="26" stroke-linecap="round"/>')
v.append(t(cx+110,920,'Botón',28,600,'#333',a='start')); v.append(t(cx+110,400,'Botón',28,600,'#333',a='start'))
v.append(t(cx,1010,'Se engancha en los dos botones',30,600)); v.append(t(cx,1052,'para tocar de pie',30,600))
v.append('</svg>')
out=sys.argv[1] if len(sys.argv)>1 else '.'
open(os.path.join(out,'G1_accesorios.svg'),'w',encoding='utf-8').write('\n'.join(v))
print('ok')
