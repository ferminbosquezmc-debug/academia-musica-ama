# Piano · Nivel 1 · Método Integral AMA (clases 1–12) · BORRADOR PARA REVISAR

Versión para el estudiante de las 12 clases de `Clases_Piano_Nivel_1.pdf`, en el mismo formato que la Guitarra I de la plataforma (bloque `GNC1`). **Todavía no está en la plataforma.** Cuando esté revisado, cada archivo `clase-N.md` se convierte en una entrada `{n, t, mes, o, md}` de un bloque `PNC1`, y sus preguntas de repaso en `P1Q`.

## Cómo está armado cada archivo

- **Encabezado:** título (`t`), mes (`mes`) y objetivo de la clase (`o`), como en guitarra.
- **Cuerpo (`md`):** las secciones `###` que la plataforma reparte en sus pasos:
  - 📖 Aprendo · 👀 Observo → paso «Leer».
  - 🎹 Practico · 🎵 Interpreto · ✏️ Escribo → paso «Practicar» (con metrónomo a 60).
  - 🏠 Mi tarea → paso «En casa».
  - ✅ ¿Lo logré? · ⭐ → paso «Final».
- **Preguntas de repaso:** 3 por clase, con la respuesta correcta marcada con ✔ y la explicación que ve el estudiante.

## Qué se tomó del PDF y qué no

- Se tomaron los apartados 3 (teoría común), 4 (aplicación al piano), 5 (ilustraciones), 7 y 8 (ejercicios y práctica), 9 (evaluación → «¿Lo logré?»), 10 (espacio de trabajo → «✏️ Escribo») y 11 (tarea).
- Quedan fuera, como en guitarra, los apartados del profesor: la identificación, la demostración práctica y la adaptación por edades. Solo se usaron dos frases de la adaptación infantil en «👧 Para los más pequeños» (clases 2 y 3).
- No se agregó contenido nuevo: ni puntillo, ni legato, ni improvisación (ver «Por decidir»).

## Cambios respecto del PDF

1. **«MI» (mano izquierda) → «mano izquierda».** En el PDF, «MI» quería decir a la vez mano izquierda y nota MI. Aquí las manos se escriben siempre completas («mano derecha», «mano izquierda»).
2. **Escalas con sostenidos (clase 11):** la tabla de Sol, Re y La mayor no se incluye, porque los sostenidos son del Nivel 2. Solo aparece la escala de Do mayor.
3. **Ejemplo de acorde menor (clase 9):** «Cm = Do menor» en vez de «Em», que es un acorde de guitarra.
4. **Cifrados de la clase 12:** se presentan compás por compás, en filas de 4 compases. Los acordes son los del PDF.
5. **Tareas:** no se mencionan los «Ejercicios teóricos #1–#9» porque la plataforma todavía no los tiene. Los «Ejercicios de lectura» sí se mencionan: los ritmos #1, #2, #3 y #5 son los mismos de las imágenes de ritmo que se reutilizan de guitarra. Los ritmos #4 (3/4) y #6 todavía no tienen imagen.

## Imágenes

Las imágenes de ritmo y pentagrama de guitarra no muestran la guitarra, así que se reutilizan: `guitarra/img/N1_ritmo_negras`, `N1_ritmo_figuras`, `N1_ritmo_silencios`, `N1_ritmo_corcheas`, `N1_figuras`, `N1_compases`, `N1_pentagrama_basico` y `guitarra/atlas/Personajes_AMA`.

**Láminas de piano** (carpeta `img/`, se citan como `piano/img/…`). Siguen el estilo de las de guitarra: fondo blanco, 2400 de ancho, colores oficiales de `ama-colores.json`, la misma clave de sol, cabezas de nota de color con su nombre debajo y dedos en dorado. Se generan con `img/generador/laminas.ps1` (PowerShell):

```
powershell -File contenido/piano/nivel-1/img/generador/laminas.ps1 -OUT contenido/piano/nivel-1/img
```

**Ritmos reconstruidos:** el PDF da las notas de estas partituras, pero no su ritmo completo. Revísalos:
- `P1_do_re_mi`: 12 negras en 3 compases de 4/4.
- `P1_cinco_dedos`: DO-RE-MI-FA | SOL-FA-MI-RE | DO (redonda).
- `P1_lectura_silencios`: DO MI SOL 𝄽 | SOL FA MI 𝄽 | RE RE MI 𝄽 | DO (blanca) + silencio de blanca.
- `P1_vals`: DO MI MI | RE FA FA | MI SOL SOL | DO (blanca) + silencio de negra. Se evita la blanca con puntillo porque no se enseña en el nivel.
- `P1_corcheas`: DO-RE MI-FA SOL SOL | FA-MI RE-MI DO (blanca). Son las 11 notas del PDF con el ritmo de la lectura #5.

| Archivo | Clase | Qué muestra |
|---|---|---|
| P1_partes_piano.svg | 2 | Partes del piano y del teclado (6 partes) |
| P1_grupos_negras.svg | 2 | Grupos de 2 y 3 teclas negras, DO y FA |
| P1_cualidades_piano.svg | 2 | Las 4 cualidades del sonido en el piano |
| P1_postura.svg | 3 | Postura AMA en 7 pasos |
| P1_dedos.svg | 3 | Numeración de los dedos de las dos manos |
| P1_teclas_blancas.svg | 3 | Las 7 notas con su color sobre el teclado |
| P1_octavas.svg | 3 | DO3 · DO4 (central) · DO5 · DO6 |
| P1_pentagrama_do_central.svg | 4 | DO central y DO-RE-MI-FA-SOL en el pentagrama |
| P1_posicion_do.svg | 4, 5, 6 | Posición de DO de las dos manos |
| P1_do_re_mi.svg | 4 | Partitura del Taller práctico #1 |
| P1_cinco_dedos.svg | 6 | Ejercicio de cinco dedos |
| P1_lectura_silencios.svg | 7 | Lectura con silencios (4/4) |
| P1_vals.svg | 7 | Vals en 3/4 |
| P1_corcheas.svg | 8 | Corcheas en posición de DO |
| P1_himno_alegria.svg | 8 | «Himno de la alegría», versión piano |
| P1_acorde_C.svg | 9 | Tríada de DO mayor en el teclado |
| P1_tono_semitono.svg | 10 | Tono y semitono en el teclado |
| P1_triadas_CFG.svg | 10, 12 | Tríadas C, F y G |
| P1_escala_do_md.svg | 11 | Escala de Do con el paso del pulgar |
| P1_acompanamiento.svg | 11 | C–F–G–C con bajo y acorde, y los 3 patrones |

## Para subirlo a la plataforma (cuando esté aprobado)

- Agregar 🎹 a la regla que reparte las secciones (`gCat`), que hoy solo reconoce 🎸.
- Permitir imágenes `piano/img/…` en `gImg`, que hoy solo acepta `guitarra/…`.
- Claves de avance: `0-0piano-c1` … `0-0piano-c12`. Las 4 lecciones de piano que hay hoy en el Nivel 1 solo tienen título, así que se reemplazan.
- Crédito: «Método Integral AMA de Piano · © Academia de Música ARPA».

## Por decidir (lo vio la revisión del PDF)

- ¿Enseñar la **blanca con puntillo** en la clase 7? Se usa en 3/4 y no se enseña.
- ¿Presentar el **legato** en la clase 6 u 8?
- ¿Cargar los **Ejercicios teóricos comunes #1–#9** en la plataforma, como teoría común a todas las carreras?
- La «Forma A» sigue pendiente en el PDF.

## Clases

| Mes | Clase |
|---|---|
| 1 · Conociendo la música y el piano | [1 · ¡Bienvenidos a la música!](clase-1.md) · [2 · Conozco mi piano](clase-2.md) · [3 · Mi postura y mis manos](clase-3.md) · [4 · El teclado y el pentagrama](clase-4.md) |
| 2 · Primeras notas y ritmos | [5 · Siento el pulso](clase-5.md) · [6 · Las figuras y el compás](clase-6.md) · [7 · El silencio también es música](clase-7.md) · [8 · Mi primera melodía](clase-8.md) |
| 3 · Mis primeros acordes | [9 · ¿Qué es un acorde?](clase-9.md) · [10 · Fa mayor y Sol mayor](clase-10.md) · [11 · Mi primer acompañamiento](clase-11.md) · [12 · Mis primeras canciones](clase-12.md) |
