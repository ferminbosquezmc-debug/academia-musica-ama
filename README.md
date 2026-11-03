# Academia de Música ARPA (AMA)

Landing page de la Academia de Música ARPA · ARP Music Academy · Panamá.

Fundada por Dawn de Bosquez y Fermín Bósquez McKenzie.

## Estructura

- `index.html`: la página.
- `img/`: logo, foto de los fundadores e ilustraciones.
- `.github/workflows/publicar.yml`: publica el sitio automáticamente en GitHub Pages cada vez que hay cambios en `main`.

## Plataforma del estudiante

La plataforma (clases, práctica, biblioteca y perfil) es un artifact de claude.ai:
https://claude.ai/artifact/WJNwYKDShseYxAFLTbHmxS

- Niveles 1, 2 y 3: preparación técnica musical. El progreso se guarda en cada dispositivo.
- Nivel 4, ARPA | Formación Ministerial (Diplomado en Formación Integral del Músico y Líder Ministerial): seis módulos con 24 clases (cada clase es un espacio propio; su contenido se agrega desde la administración), dos vías de ingreso (académica y ministerial) y administración propia. Usa la base de datos del artifact:
  - `n4plan/config` y `n4plan/a1`…`a6`: parámetros y módulos; cada módulo guarda sus clases (`c1`…`c24`) con objetivos, contenido, materiales, tarea y evaluación. Los leen todos; los cambia la dirección.
  - `n4sol/<id>`: solicitudes de ingreso. Cada estudiante escribe la suya; solo la dirección las lee.
  - `n4mat/<id>`: matrículas, avances y evaluaciones. Solo la dirección.
  - `n4est/<id>`: estado que ve cada estudiante. Lo escribe la dirección.
- La dirección es el propietario del artifact y las personas con acceso de Editor. Los estudiantes necesitan acceso de Colaborador para enviar su solicitud desde la plataforma; si no lo tienen, la descargan y la entregan.

## Pendiente

- Correo, WhatsApp y dirección de la academia (sección Inscripciones).
- Nombres y fotos del equipo docente.
- Fotos reales de las clases para reemplazar las ilustraciones.
