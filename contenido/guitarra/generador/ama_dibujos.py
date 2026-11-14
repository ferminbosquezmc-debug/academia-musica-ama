"""Dibujos AMA reutilizables (originales, sin marcas): púa, capotraste visto de lado y corte del mástil."""
def pick(cx,cy,sc=1,rot=0,col='#E74C3C',edge='#922B21'):
    # forma clásica de púa: triángulo con esquinas redondeadas; la punta mira hacia abajo (rot=-90: hacia la derecha)
    d='M-100 -90 Q0 -132 100 -90 Q138 -66 110 -18 L22 124 Q0 152 -22 124 L-110 -18 Q-138 -66 -100 -90 Z'
    return f'<g transform="translate({cx} {cy}) rotate({rot}) scale({sc})"><path d="{d}" fill="{col}" stroke="{edge}" stroke-width="{8/sc:.1f}"/><path d="M-60 -70 Q0 -96 60 -70" fill="none" stroke="#FFFFFF" stroke-opacity=".35" stroke-width="{10/sc:.1f}" stroke-linecap="round"/></g>'
def neck_section(cx,cy,sc=1):
    s=[f'<g transform="translate({cx} {cy}) scale({sc})">',
       '<path d="M-150 -60 L150 -60 Q150 100 0 100 Q-150 100 -150 -60 Z" fill="#C49A6C" stroke="#6E4B2A" stroke-width="6"/>',
       '<rect x="-150" y="-70" width="300" height="12" fill="#5D3A1A"/>']
    for k in range(6): s.append(f'<circle cx="{-125+k*50}" cy="-78" r="{5+k*0.7:.1f}" fill="#BDC3C7" stroke="#7F8C8D" stroke-width="2"/>')
    s.append('</g>'); return s
def capo_side(cx,cy,sc=1,open_ang=0):
    # capotraste de tornillo visto de lado: brazo de arriba con goma, cuerpo en «C», brazo de abajo que gira y perilla
    B='#222222'; P='#7F8C8D'
    s=[f'<g transform="translate({cx} {cy}) scale({sc})">',
       f'<path d="M-185 -112 L140 -112 Q205 -112 208 -48 L212 40" fill="none" stroke="{B}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>',
       f'<rect x="-175" y="-92" width="300" height="16" rx="6" fill="{P}"/>',
       f'<g transform="rotate({open_ang} 212 40)">',
       f'<path d="M212 40 Q205 124 130 124 L-50 124" fill="none" stroke="{B}" stroke-width="36" stroke-linecap="round"/>',
       f'<rect x="-45" y="100" width="150" height="10" rx="4" fill="{P}"/>',
       f'<circle cx="236" cy="132" r="46" fill="#333" stroke="{B}" stroke-width="6"/>']
    for k in range(8): s.append(f'<line x1="{236-36+k*10}" y1="96" x2="{236-36+k*10}" y2="168" stroke="#555" stroke-width="3"/>')
    s.append(f'<circle cx="212" cy="40" r="9" fill="#888"/></g></g>')
    return s
