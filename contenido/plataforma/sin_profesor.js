/* Ejercicios que dependían de que el profesor estuviera presente → el estudiante los hace solo o con la plataforma.
   [[oido:int|acor|alto]] = botón al Laboratorio de oído en ese ejercicio; [[pistas]] = botón a las pistas de acompañamiento.
   Uso: node sin_profesor.js IN OUT   (página publicada sin envoltorio; aplica también el visor de los marcadores)
        node sin_profesor.js --repo   (.md de las cinco carreras) */
const fs = require('fs'), path = require('path');
const O = t => '\n\n[[oido:' + t + ']]\n', PI = '\n\n[[pistas]]\n';
const R = [
  /* ---- Evaluaciones: se presentan en video con la entrega ---- */
  ['Presento a mi profesor:', 'Me grabo en video (o audio) y lo envío a mi docente con la entrega:'],
  ['Preparo y presento a mi profesor:', 'Preparo y me grabo en video para enviarlo a mi docente con la entrega:'],
  ['Preparo y toco para mi profesor, con el reproductor o con la pista:', 'Preparo y me grabo en video, con el reproductor o con la pista, para enviarlo a mi docente con la entrega:'],
  ['Presento a mi profesor: ', 'Me grabo en video y lo envío a mi docente con la entrega: '],
  ['Tu profesor te pedirá:', 'En tu video de entrega muestra:'],
  ['Tu profesor evaluará:', 'Tu docente evaluará en tu video:'],
  /* ---- ¿Dónde está? (partes del instrumento) ---- */
  ['- ☐ **¿Dónde está?** Toco en mi guitarra la parte que dice mi profesor.', '- ☐ **¿Dónde está?** Miro la lámina de las partes, tapo los nombres y toco en mi guitarra cada parte diciendo su nombre.'],
  ['- ☐ **¿Dónde está?** Señalo la parte del piano que dice mi profesor.', '- ☐ **¿Dónde está?** Miro la lámina de las partes, tapo los nombres y señalo en mi piano cada parte diciendo su nombre.'],
  ['- ☐ **¿Dónde está?** Toco la parte que dice mi profesor.', '- ☐ **¿Dónde está?** Miro la lámina de las partes, tapo los nombres y toco cada parte diciendo su nombre.'],
  ['- ☐ **¿Dónde está?** Señalo la parte del bajo que dice mi profesor.', '- ☐ **¿Dónde está?** Miro la lámina de las partes, tapo los nombres y señalo en mi bajo cada parte diciendo su nombre.'],
  /* ---- Oído: al Laboratorio de oído ---- */
  ['- ☐ **Adivina el intervalo:** mi profesor toca dos notas; yo digo si es una 3.ª, una 5.ª o una 8.ª.', '- ☐ **Adivina el intervalo:** en el Laboratorio de oído escucho dos notas y digo si es una 3.ª, una 5.ª o una 8.ª.' + O('int')],
  ['- ☐ **Eco de intervalos:** mi profesor toca DO y otra nota; digo qué intervalo es.', '- ☐ **Eco de intervalos:** en el Laboratorio de oído escucho dos notas y digo qué intervalo es.' + O('int')],
  ['- ☐ **¿Alegre o triste?** Mi profesor toca una tríada; digo si es mayor o menor.', '- ☐ **¿Alegre o triste?** En el Laboratorio de oído escucho una tríada y digo si es mayor o menor.' + O('acor')],
  ['- ☐ **Oído:** mi profesor toca DO–MI y DO–MI♭. ¿Cuál es 3.ª mayor y cuál menor?', '- ☐ **Oído:** toco DO–MI y DO–MI♭ y comparo: ¿cuál es 3.ª mayor y cuál menor? Luego practico en el Laboratorio de oído.' + O('int')],
  ['- ☐ **¿Mayor o menor?** Mi profesor toca dos acordes y digo cuál es alegre y cuál es triste.', '- ☐ **¿Mayor o menor?** En el Laboratorio de oído escucho acordes y digo cuál es alegre y cuál es triste.' + O('acor')],
  ['- ☐ **Tono o semitono:** mi profesor toca dos notas seguidas y digo si es tono o semitono.', '- ☐ **Tono o semitono:** en el Laboratorio de oído escucho dos notas seguidas y digo si es tono (2.ª mayor) o semitono (2.ª menor).' + O('int')],
  ['- ☐ **¿Tono o semitono?** Mi profesor toca dos notas y digo cuál es.', '- ☐ **¿Tono o semitono?** En el Laboratorio de oído escucho dos notas y digo si es tono (2.ª mayor) o semitono (2.ª menor).' + O('int')],
  ['- ☐ **Mayor y menor:** mi profesor toca C y Cm en el piano o la guitarra; yo toco DO en los dos.', '- ☐ **Mayor y menor:** en el Laboratorio de oído escucho acordes mayores y menores; mientras suenan, toco DO y siento cómo cambia el color.' + O('acor')],
  ['- ☐ **¿Mayor o menor?** Mi profesor toca arpegios y digo cuál es cuál.', '- ☐ **¿Mayor o menor?** En el Laboratorio de oído escucho acordes y digo cuál es mayor y cuál menor.' + O('acor')],
  ['- ☐ **De oído:** mi profesor toca dos notas; digo si es 3.ª, 5.ª u 8.ª.', '- ☐ **De oído:** en el Laboratorio de oído escucho dos notas y digo si es 3.ª, 5.ª u 8.ª.' + O('int')],
  ['- ☐ **De oído:** mi profesor toca dos notas y digo si es 3.ª, 5.ª u 8.ª.', '- ☐ **De oído:** en el Laboratorio de oído escucho dos notas y digo si es 3.ª, 5.ª u 8.ª.' + O('int')],
  ['- ☐ **¿Mayor o menor?** Mi profesor toca acordes y digo cuál es cuál.', '- ☐ **¿Mayor o menor?** En el Laboratorio de oído escucho acordes y digo cuál es mayor y cuál menor.' + O('acor')],
  ['- ☐ **Eco:** mi profesor toca 3 notas con DO, RE y MI, y yo las repito de oído.', '- ☐ **Eco:** toco 3 notas con DO, RE y MI sin mirar, las canto y las vuelvo a encontrar de oído. Luego practico «Alto o bajo» en el Laboratorio de oído.' + O('alto')],
  ['- ☐ **Unísono:** mi profesor toca DO, RE y MI en el piano y yo los canto después de escucharlos.', '- ☐ **Unísono:** escucho DO, RE y MI en el afinador o el Laboratorio de oído y los canto después de escucharlos.' + O('alto')],
  ['- ☐ **Dictado:** mi profesor toca 3 notas y las repito; luego 4; luego 5.', '- ☐ **Dictado:** en el Laboratorio de oído escucho notas y las repito con la voz; empiezo con 3, luego 4 y luego 5.' + O('alto')],
  /* ---- Oído sin ejercicio en el laboratorio: escucho una canción o lo toco yo ---- */
  ['- ☐ **Oído:** mi profesor toca una cadencia; yo digo si suena a punto, a coma o a sorpresa.', '- ☐ **Oído:** toco las cadencias de la clase (V–I, I–V y V–vi) y digo si suenan a punto, a coma o a sorpresa.'],
  ['- ☐ **¿Reposo o tensión?** Mi profesor se detiene en un acorde; digo «tónica», «subdominante» o «dominante».', '- ☐ **¿Reposo o tensión?** Toco C – F – G y me detengo en uno al azar; digo «tónica», «subdominante» o «dominante» y escucho si pide seguir.'],
  ['- ☐ **Escucho finales:** mi profesor toca acordes en el piano o la guitarra; levanto la mano cuando siento que la frase termina (cadencia).', '- ☐ **Escucho finales:** escucho una canción que me guste y levanto la mano cada vez que siento que una frase termina (cadencia).'],
  ['- ☐ **¿Terminó o no?** Mi profesor toca frases que terminan en I o en V; digo si la frase cerró.', '- ☐ **¿Terminó o no?** Escucho una canción que me guste y en cada frase digo si cerró (termina en I) o quedó abierta (termina en V).'],
  ['- ☐ **Forma:** mi profesor toca una canción; yo levanto la mano cuando empieza el coro ([[nn:B]]).', '- ☐ **Forma:** escucho una canción que me guste y levanto la mano cuando empieza el coro ([[nn:B]]).'],
  /* ---- Preguntas del profesor: las hago yo ---- */
  ['- ☐ **¿Cómo se llama?** Mi profesor dice un traste de la 1.ª cuerda; yo digo la nota con sus dos nombres.', '- ☐ **¿Cómo se llama?** Elijo un traste de la 1.ª cuerda al azar, digo la nota con sus dos nombres y la compruebo en el diapasón de la clase.'],
  ['- ☐ **¿Qué grado es?** Mi profesor dice un grado (por ejemplo «el V de Do»); yo lo toco y digo la nota (SOL).', '- ☐ **¿Qué grado es?** Escribo los números del I al VII en papelitos, saco uno (por ejemplo «el V de Do») y lo toco diciendo la nota (SOL).'],
  ['- ☐ **¿Cómo se llama?** Mi profesor señala una tecla negra; digo su nombre con ♯ y con ♭.', '- ☐ **¿Cómo se llama?** Toco una tecla negra al azar y digo su nombre con ♯ y con ♭; compruebo en la lámina.'],
  ['- ☐ **¿Cuál es la raíz?** Mi profesor dice un acorde («Am», «G», «F») y yo toco su raíz.', '- ☐ **¿Cuál es la raíz?** Escribo acordes en papelitos («Am», «G», «F»), saco uno y toco su raíz.'],
  ['- ☐ **Busca la nota:** mi profesor dice una nota y la toco en 3 cuerdas distintas.', '- ☐ **Busca la nota:** elijo una nota al azar y la toco en 3 cuerdas distintas.'],
  ['La misma progresión, con un estilo distinto en cada vuelta. Mi profesor dice el estilo y yo cambio sin detenerme.', 'La misma progresión, con un estilo distinto en cada vuelta. Sigo el orden de abajo y cambio sin detenerme.'],
  ['Al final, mi profesor elige una tonalidad sorpresa.', 'Al final, saco una tonalidad sorpresa de unos papelitos (Re, Mi, La).'],
  ['4. Los patrones 1 y 4 en SOL mayor y en una tonalidad que elija mi profesor.', '4. Los patrones 1 y 4 en SOL mayor y en otra tonalidad que saco al azar.'],
  ['**Taller #5:** construyo y toco dos escalas mayores que elige mi profesor.', '**Taller #5:** construyo y toco dos escalas mayores que saco al azar de unos papelitos.'],
  ['3. Los intervalos desde una raíz que elija mi profesor.', '3. Los intervalos desde una raíz que saco al azar.'],
  /* ---- Lecturas que escribía el profesor: las escribo yo ---- */
  ['- ☐ **Lectura:** mi profesor escribe 4 compases que mezclan corcheas y tresillos; los digo y después los toco en el redoblante.', '- ☐ **Lectura:** escribo yo 4 compases que mezclen corcheas y tresillos; los digo y después los toco en el redoblante.'],
  ['- ☐ **Lectura con ligadura:** mi profesor escribe 4 compases con ligaduras; digo el ritmo callando las notas ligadas y después lo toco.', '- ☐ **Lectura con ligadura:** escribo yo 4 compases con ligaduras; digo el ritmo callando las notas ligadas y después lo toco.'],
  ['- ☐ **Leo signos:** mi profesor escribe 4 compases con barras de repetición y un símil; los toco completos.', '- ☐ **Leo signos:** escribo yo 4 compases con barras de repetición y un símil; los toco completos.'],
  ['leo y toco 8 compases que mezclan negras, corcheas, tresillos y semicorcheas (los escribe mi profesor).', 'escribo y toco 8 compases que mezclen negras, corcheas, tresillos y semicorcheas.'],
  ['- ☐ **Lectura con redoble en tresillos y puntillo:** mi profesor escribe 4 compases', '- ☐ **Lectura con redoble en tresillos y puntillo:** escribo yo 4 compases'],
  ['- **La mano izquierda lee:** toca en el redoblante los ritmos que escribe tu profesor, mientras el ostinato sigue igual.', '- **La mano izquierda lee:** toca en el redoblante ritmos que escribes tú, mientras el ostinato sigue igual.'],
  ['y luego la lectura de mi profesor.', 'y luego un ritmo que escribo yo.'],
  ['- ☐ **Leo y toco:** mi profesor escribe un compás con MI, FA y SOL y lo toco.', '- ☐ **Leo y toco:** escribo yo un compás con MI, FA y SOL y lo toco.'],
  ['- ☐ **Leo y toco:** mi profesor escribe 8 notas al aire (redondas) y las toco sin mirar el bajo.', '- ☐ **Leo y toco:** escribo 8 notas al aire (redondas) en desorden y las toco sin mirar el bajo.'],
  ['- ☐ **Lectura sin color:** leo 4 compases de un ejercicio en blanco y negro que me da mi profesor.', '- ☐ **Lectura sin color:** leo 4 compases de la lámina de la clase sin mirar los colores (los tapo con un papel).'],
  ['- ☐ **Leo una línea escrita** que me da mi profesor, sin colores.', '- ☐ **Leo una línea escrita** de la lámina de la clase, tapando los colores.'],
  ['- ☐ **Leo un compás** con DO, RE y MI que escribe mi profesor y lo canto.', '- ☐ **Leo un compás** con DO, RE y MI que escribo yo y lo canto.'],
  ['- ☐ **Leo con armadura:** mi profesor escribe una melodía en SOL mayor y la canto.', '- ☐ **Leo con armadura:** escribo una melodía corta en SOL mayor y la canto.'],
  ['- ☐ **Lectura sorpresa:** mi profesor me da 2 compases nuevos cada semana.', '- ☐ **Lectura sorpresa:** cada semana escribo 2 compases nuevos, los guardo un día y al siguiente los leo como si fueran de otra persona.'],
  ['- ☐ **Marco las respiraciones:** en una melodía corta que me da mi profesor, escribo las comitas.', '- ☐ **Marco las respiraciones:** en una melodía corta de la clase, escribo las comitas.'],
  ['- ☐ Le pido a mi profesor otro chart sencillo y lo recorro con el dedo.', '- ☐ Busco otro chart sencillo de una canción que me guste y lo recorro con el dedo.'],
  ['- ☐ Le pido a mi profesor otro chart sencillo.', '- ☐ Busco otro chart sencillo de una canción que me guste.'],
  /* ---- Tocar con otra persona: con la pista, un compañero o un familiar ---- */
  ['Un rasgueo hacia abajo en cada pulso (4 por compás). Mi profesor o un compañero canta o toca la melodía de la clase 15.', 'Un rasgueo hacia abajo en cada pulso (4 por compás). Canto la melodía de la clase 15 mientras rasgueo, o la canta un compañero.'],
  ['Mi profesor o un compañero canta o toca la melodía; yo la acompaño', 'Canto la melodía mientras acompaño (o la canta un compañero o un familiar); la acompaño'],
  ['Las canciones son melodías tradicionales: mi profesor o un compañero canta o toca la melodía, y yo acompaño.', 'Las canciones son melodías tradicionales: canto la melodía mientras acompaño, o la canta un compañero o un familiar.'],
  ['Las canciones son melodías tradicionales: mi profesor, un compañero o la pista toca la melodía y los acordes, y yo acompaño.', 'Las canciones son melodías tradicionales: la pista de la plataforma o un compañero toca la melodía y los acordes, y yo acompaño.' + PI],
  ['Las canciones son melodías tradicionales o canciones AMA: mi profesor, un compañero o la pista toca la melodía y los acordes, y yo acompaño.', 'Las canciones son melodías tradicionales o canciones AMA: la pista de la plataforma o un compañero toca la melodía y los acordes, y yo acompaño.' + PI],
  ['Mi profesor o un compañero canta encima.', 'Canto la melodía encima o la canta un compañero.'],
  ['**Acompañamiento** (mano izquierda o el profesor)', '**Acompañamiento** (mano izquierda o la pista de la plataforma)'],
  ['- ☐ **Eco:** mi profesor toca 2 compases con la pentatónica; yo los repito.', '- ☐ **Eco:** toco 2 compases con la pentatónica, los grabo y luego los repito igual escuchando la grabación.'],
  ['- ☐ **Pregunta y respuesta:** el profesor pregunta (2 compases); yo respondo terminando en LA.', '- ☐ **Pregunta y respuesta:** toco una pregunta de 2 compases y me respondo con otros 2 terminando en LA.'],
  ['- ☐ Toco el vals mientras mi profesor canta o toca «Sublime gracia».', '- ☐ Toco el vals mientras canto o escucho «Sublime gracia».'],
  ['Mi profesor (o la pista de la plataforma) toca la melodía.', 'La pista de la plataforma toca la melodía.'],
  ['Mi profesor o la pista toca la melodía; yo acompaño', 'La pista de la plataforma toca la melodía; yo acompaño'],
  ['con la pista o con mi profesor.', 'con la pista de la plataforma.'],
  ['tocar «cuatro y cuatro» con mi profesor', 'tocar «cuatro y cuatro» con la pista'],
  ['Mi profesor toca **4 compases de solo** y yo **respondo** con 4.', 'Toco **4 compases de ritmo** y luego **4 de solo**, una y otra vez.'],
  ['- ☐ **Cuatro y cuatro** con mi profesor, tres vueltas.', '- ☐ **Cuatro y cuatro** con la pista: 4 de ritmo y 4 de solo, tres vueltas.'],
  ['- ☐ **Pregunta y respuesta:** mi profesor toca 1 compás; yo respondo con 1 compás parecido pero distinto.', '- ☐ **Pregunta y respuesta:** toco 1 compás y me respondo con 1 compás parecido pero distinto.'],
  ['   > El profesor toca 4 compases y yo respondo con 4.', '   > Toco 4 compases de ritmo y respondo con 4 de solo.'],
  ['- ☐ **Bombo con el bajo:** mi profesor (o una pista) toca una línea de bajo y copio sus lugares con el bombo.', '- ☐ **Bombo con el bajo:** con una pista de la plataforma, escucho la línea de bajo y copio sus lugares con el bombo.' + PI],
  ['- ☐ **Señales:** mi profesor hace señales mientras toco y yo respondo: corte, repetir, más suave, más fuerte.', '- ☐ **Señales:** un compañero o familiar hace señales mientras toco (corte, repetir, más suave, más fuerte) y yo respondo; si estoy solo, las escribo en papelitos y saco una cada 4 compases.'],
  ['- ☐ **Señales:** mi profesor hace señales mientras toco y respondo.', '- ☐ **Señales:** un compañero o familiar hace señales mientras toco y respondo; si estoy solo, las escribo en papelitos y saco una cada 4 compases.'],
  ['- ☐ **Si me equivoco, sigo:** mi profesor me distrae a propósito y yo no paro.', '- ☐ **Si me equivoco, sigo:** toco con la pista y, aunque me equivoque, no paro hasta el final.'],
  ['- ☐ **Con mi profesor o la pista:** las dos canciones que elegí, completas y sin parar.', '- ☐ **Con la pista:** las dos canciones que elegí, completas y sin parar.'],
  ['- ☐ **Con mi profesor:** mi profesor toca la melodía en el piano o la guitarra y yo la toco una octava abajo.', '- ☐ **Con la melodía:** canto la melodía (o la escucho grabada) y la toco una octava abajo.'],
  ['- ☐ **Con mi profesor o la banda:** dos canciones completas sin parar.', '- ☐ **Con la pista o la banda:** dos canciones completas sin parar.'],
  ['- ☐ **Pregunta y respuesta:** mi profesor toca 1 compás; respondo con 1 compás de la pentatónica.', '- ☐ **Pregunta y respuesta:** toco 1 compás y me respondo con 1 compás de la pentatónica.'],
  ['- ☐ **Con el bombo:** mi profesor o la pista toca un ritmo y copio sus lugares con la raíz.', '- ☐ **Con el bombo:** con una pista de la plataforma, escucho el bombo y copio sus lugares con la raíz.' + PI],
  ['- ☐ **Pregunta y respuesta:** mi profesor toca una frase corta de 4 notas en la caja; yo la repito y después invento una respuesta.', '- ☐ **Pregunta y respuesta:** toco una frase corta de 4 notas en la caja, la repito y después invento una respuesta.'],
  /* ---- Canto ---- */
  ['- ☐ **Con acompañamiento:** mi profesor, un compañero o la pista toca los acordes y yo canto.', '- ☐ **Con acompañamiento:** la pista de la plataforma toca los acordes y yo canto.' + PI],
  ['- ☐ El himno completo con la letra AMA, con mi profesor en el piano.', '- ☐ El himno completo con la letra AMA, con la pista de la plataforma.'],
  ['- ☐ **Unísono:** mi profesor o un compañero canta conmigo; nuestras voces se «funden».', '- ☐ **Unísono:** un compañero o familiar canta conmigo; nuestras voces se «funden». Si estoy solo, canto junto con la nota del afinador.'],
  ['- ☐ **Con el piano:** mi profesor toca el acorde de C y yo canto DO, luego MI, luego SOL: cada nota «cabe» dentro del acorde.', '- ☐ **Con el acorde:** suena el acorde de C en la pista de la plataforma y yo canto DO, luego MI, luego SOL: cada nota «cabe» dentro del acorde.' + PI],
  ['2. **La primera nota:** la escucho en el acorde. Si dudo, le pido a mi profesor que me la dé.', '2. **La primera nota:** la escucho en el acorde. Si dudo, la busco en el afinador.'],
  ['- ☐ **Introducciones:** mi profesor toca 2 o 4 compases y entro justo a tiempo, cinco veces.', '- ☐ **Introducciones:** pongo una pista de la plataforma, cuento 2 o 4 compases de introducción y entro justo a tiempo, cinco veces.' + PI],
  ['- ☐ **Las dos voces:** mi profesor canta la melodía de «Estrellita» y yo la segunda voz; luego cambiamos.', '- ☐ **Las dos voces:** me grabo cantando la melodía de «Estrellita» y canto la segunda voz encima de la grabación; luego al revés.'],
  ['- ☐ Mi profesor toca C y luego Am; canto la misma frase y siento el cambio de color.', '- ☐ Con la pista, suena C y luego Am; canto la misma frase y siento el cambio de color.' + PI],
  ['- Una canción que proponga mi profesor, en una tonalidad cómoda para mí.', '- Una canción que me guste, en una tonalidad cómoda para mí.'],
  ['luego una frase en LA menor que invente mi profesor.', 'luego una frase en LA menor que invento yo.'],
  ['- ☐ **Pregunta y respuesta:** mi profesor canta 2 compases con la pentatónica y respondo con 2, sobre Am – G – Am.', '- ☐ **Pregunta y respuesta:** canto 2 compases con la pentatónica y me respondo con otros 2, sobre Am – G – Am.'],
  ['- ☐ **Mi tonalidad:** con mi profesor, busco la mejor tonalidad para «Mi voz».', '- ☐ **Mi tonalidad:** con el afinador, busco la mejor tonalidad para «Mi voz» y se la cuento a mi docente en la entrega.'],
  ['- ☐ **Mi extensión:** con mi profesor o con el VocalMap, busco', '- ☐ **Mi extensión:** con el VocalMap, busco'],
  ['- Mi profesor me ayuda a que la intención se **escuche** y no solo se piense.', '- Me grabo y escucho si la intención se **escucha** y no solo se piensa.'],
  ['**La orquesta del silencio:** toco cuando mi profesor levanta la mano y paro cuando la baja.', '**La orquesta del silencio:** con el metrónomo, toco 4 tiempos y callo 4 tiempos; si hay un compañero o familiar, toco cuando levanta la mano y paro cuando la baja.'],
  ['«Cuatro y cuatro»: el profesor toca 4 compases de solo, yo respondo con 4; la banda mantiene el pulso', '«Cuatro y cuatro»: 4 compases de ritmo y 4 de solo; la pista mantiene el pulso'],
  ['VibraVoice y tu profesor te ayudan a conocer la tuya', 'VibraVoice y tu docente te ayudan a conocer la tuya'],
  /* ---- Afinar la batería: con ayuda de un adulto ---- */
  ['- Afina siempre con la ayuda de tu profesor: un parche demasiado tenso se puede romper.', '- Afina con calma y poco a poco (con un adulto si eres menor): un parche demasiado tenso se puede romper.'],
  ['- ☐ **Afino** un tom con mi profesor siguiendo la estrella.', '- ☐ **Afino** un tom siguiendo la estrella.'],
  /* ---- Piano clase 1 ---- */
  ['- ☐ **Primer sonido:** mi profesor me muestra el **DO central**.', '- ☐ **Primer sonido:** busco el **DO central** con la lámina (la tecla blanca a la izquierda de las dos negras, en el centro del piano).'],
  /* ---- Metas: se cuentan al docente en la entrega ---- */
  ['- ☐ Elijo mi próxima meta musical y se la cuento a mi profesor.', '- ☐ Elijo mi próxima meta musical y se la cuento a mi docente en la entrega.'],
  ['- ☐ Elijo con mi profesor la siguiente etapa:', '- ☐ Elijo mi siguiente etapa y se la cuento a mi docente en la entrega:'],
  /* ---- Avisos y consejos: el docente acompaña a distancia ---- */
  ['lo digo a mi profesor y a mi familia', 'se lo escribo a mi docente y lo digo a mi familia'],
  ['Paro y lo digo a mi profesor y a mi familia', 'Paro, se lo escribo a mi docente y lo digo a mi familia'],
  ['como te muestre tu profesor.', 'como muestra la lámina de la clase.'],
  ['tu profesor confirma el tipo con el tiempo.', 'tu docente confirma el tipo con tus grabaciones.'],
  ['y se comenta con el profesor.', 'y se le cuenta al docente en la entrega.'],
  ['tu profesor te ayuda a encontrarla.', 'el VocalMap y tu docente te ayudan a encontrarla.'],
  ['tu profesor puede traerte una edición original para comparar.', 'puedes buscar una edición original en internet para comparar.'],
];
function fix(t, N) {
  const n = {}; for (const [a, b0] of R) { const b = N ? b0.replace(/\n/g, N) : b0; const c = t.split(a).length - 1; if (c) { n[a.slice(0, 50)] = c; t = t.split(a).join(b); } } return [t, n];
}
const A = process.argv.slice(2);
if (A[0] === '--repo') {
  const base = path.join(__dirname, '..');
  for (const c of ['guitarra', 'piano', 'bateria', 'bajo', 'canto']) for (const lv of ['nivel-1', 'nivel-2', 'nivel-3']) {
    const d = path.join(base, c, lv); if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).filter(f => /^clase-\d+\.md$/.test(f))) {
      const p = path.join(d, f); let t = fs.readFileSync(p, 'utf8'); const CR = t.includes('\r\n'); t = t.replace(/\r\n/g, '\n');
      const [u, n] = fix(t); if (u !== t) fs.writeFileSync(p, CR ? u.replace(/\n/g, '\r\n') : u);
    }
  }
  console.log('repo ok');
} else {
  const [IN, OUT] = A; let [t, n] = fix(fs.readFileSync(IN, 'utf8'), '\\n');
  const used = Object.keys(n).length; console.log('reemplazos usados', used, 'de', R.length);
  const miss = R.filter(([a]) => !n[a.slice(0, 50)]).map(([a]) => a.slice(0, 70)); if (miss.length) console.log('SIN USAR:\n ' + miss.join('\n '));
  /* Visor de los marcadores [[oido:…]] y [[pistas]] */
  const A0 = "  if(s==='[[que-suena]]'){h+=qsCard();i++;continue}";
  if (t.split(A0).length !== 2) throw new Error('marcador que-suena');
  t = t.replace(A0, A0 + "\n  if(m=s.match(/^\\[\\[oido:(\\w+)\\]\\]$/)){h+='<button class=\"btn ghost\" data-rtl=\"'+m[1]+'\" style=\"margin:4px 0 10px\">🎧 Abrir el Laboratorio de oído</button>';i++;continue}\n  if(s==='[[pistas]]'){h+='<button class=\"btn ghost\" data-rpt=\"1\" style=\"margin:4px 0 10px\">🎶 Abrir las pistas de acompañamiento</button>';i++;continue}");
  fs.writeFileSync(OUT, t); console.log('ok');
}
