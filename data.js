/* Catálogo de zonas y posturas.
   - etapa: orden natural de una sesión (1 de pie, 2 sentado, 3 arrodillado, 4 boca abajo, 5 tumbado, 6 final de relajación)
   - lados: si la postura es de un solo lado, dos etiquetas [primero, segundo]. La primera es la que muestra el dibujo tal cual;
            en la segunda el dibujo se refleja en espejo.
   - img: archivo en /img (JPG). Si falta, la app enseña un icono de la zona. */

const ZONAS = [
  { id: 'cuello',  nombre: 'Cuello y hombros', corto: 'Cuello',  icono: '◠' },
  { id: 'espalda', nombre: 'Espalda',          corto: 'Espalda', icono: '≈' },
  { id: 'caderas', nombre: 'Caderas y glúteos',corto: 'Caderas', icono: '◇' },
  { id: 'piernas', nombre: 'Piernas y pies',   corto: 'Piernas', icono: '⌇' }
];

const POSTURAS = [
  /* ---------- CUELLO Y HOMBROS ---------- */
  { id: 'cuello-inclinacion', zona: 'cuello', etapa: 2, nombre: 'Inclinación lateral del cuello',
    lados: ['Hacia el hombro izquierdo', 'Hacia el hombro derecho'], img: 'img/cuello-inclinacion.jpg',
    texto: 'Siéntate con la espalda recta. Deja caer la oreja hacia el hombro sin subirlo. Si quieres más, apoya la mano suavemente sobre la cabeza, sin tirar.' },
  { id: 'cuello-barbilla', zona: 'cuello', etapa: 2, nombre: 'Barbilla al pecho', lados: null, img: 'img/cuello-barbilla.jpg',
    texto: 'Baja despacio la barbilla hacia el pecho y deja que el peso de la cabeza haga el trabajo. Nota cómo se alarga la nuca. Hombros sueltos.' },
  { id: 'cuello-brazo-cruzado', zona: 'cuello', etapa: 1, nombre: 'Brazo cruzado sobre el pecho',
    lados: ['Brazo derecho', 'Brazo izquierdo'], img: 'img/cuello-brazo-cruzado.jpg',
    texto: 'Lleva un brazo estirado por delante del pecho y sujétalo por encima del codo con la otra mano. Mantén el hombro bajo y respira lento.' },
  { id: 'cuello-triceps', zona: 'cuello', etapa: 1, nombre: 'Tríceps tras la cabeza',
    lados: ['Brazo derecho', 'Brazo izquierdo'], img: 'img/cuello-triceps.jpg',
    texto: 'Sube un brazo y dobla el codo para que la mano caiga entre los omóplatos. Con la otra mano empuja el codo suavemente. No arquees la espalda.' },
  { id: 'cuello-pecho', zona: 'cuello', etapa: 1, nombre: 'Apertura de pecho', lados: null, img: 'img/cuello-pecho.jpg',
    texto: 'Entrelaza las manos detrás de la espalda, estira los brazos y abre el pecho. Mira al frente y deja caer los hombros hacia atrás.' },
  { id: 'cuello-muneca', zona: 'cuello', etapa: 1, nombre: 'Muñeca y antebrazo',
    lados: ['Primer brazo', 'Segundo brazo'], img: 'img/cuello-muneca.jpg',
    texto: 'Estira el brazo al frente con la palma hacia delante. Con la otra mano tira suavemente de los dedos hacia ti hasta notar el antebrazo.' },

  /* ---------- ESPALDA ---------- */
  { id: 'espalda-lateral', zona: 'espalda', etapa: 1, nombre: 'Inclinación lateral',
    lados: ['Inclinación a la izquierda', 'Inclinación a la derecha'], img: 'img/espalda-lateral.jpg',
    texto: 'De pie, sube un brazo y inclínate hacia el lado contrario, como una media luna. Alarga el costado sin girar el cuerpo.' },
  { id: 'espalda-gato', zona: 'espalda', etapa: 3, nombre: 'Espalda redonda (gato)', lados: null, img: 'img/espalda-gato.jpg',
    texto: 'A cuatro apoyos, empuja el suelo con las manos y redondea la espalda hacia el techo. Suelta la cabeza y respira hacia la zona lumbar.' },
  { id: 'espalda-nino', zona: 'espalda', etapa: 3, nombre: 'Postura del niño', lados: null, img: 'img/espalda-nino.jpg',
    texto: 'Siéntate sobre los talones y baja el torso hacia delante con los brazos estirados. Deja caer la frente y respira profundo hacia la espalda.' },
  { id: 'espalda-esfinge', zona: 'espalda', etapa: 4, nombre: 'Esfinge', lados: null, img: 'img/espalda-esfinge.jpg',
    texto: 'Boca abajo, apóyate en los antebrazos con los codos bajo los hombros. Mira al frente y deja que la zona lumbar se abra sin forzar.' },
  { id: 'espalda-rodillas', zona: 'espalda', etapa: 5, nombre: 'Rodillas al pecho', lados: null, img: 'img/espalda-rodillas.jpg',
    texto: 'Tumbado boca arriba, abraza las rodillas contra el pecho. Deja que la zona lumbar se apoye en el suelo y respira lento.' },
  { id: 'espalda-torsion', zona: 'espalda', etapa: 5, nombre: 'Torsión tumbada',
    lados: ['Rodillas hacia un lado', 'Rodillas hacia el otro lado'], img: 'img/espalda-torsion.jpg',
    texto: 'Tumbado con los brazos abiertos, deja caer las rodillas flexionadas hacia un lado. Mira hacia el lado contrario y mantén los hombros en el suelo.' },

  /* ---------- CADERAS Y GLÚTEOS ---------- */
  { id: 'cadera-cuclillas', zona: 'caderas', etapa: 1, nombre: 'Cuclillas profundas', lados: null, img: 'img/cadera-cuclillas.jpg',
    texto: 'Baja a cuclillas con los talones en el suelo y empuja las rodillas suavemente hacia fuera con los codos. Apóyate en algo si lo necesitas.' },
  { id: 'cadera-mariposa', zona: 'caderas', etapa: 2, nombre: 'Mariposa sentada', lados: null, img: 'img/cadera-mariposa.jpg',
    texto: 'Sentado, junta las plantas de los pies y deja caer las rodillas a los lados. Espalda larga; si quieres más, inclínate despacio hacia delante.' },
  { id: 'cadera-zancada', zona: 'caderas', etapa: 3, nombre: 'Zancada baja',
    lados: ['Primera pierna delante', 'Segunda pierna delante'], img: 'img/cadera-zancada.jpg',
    texto: 'Con una rodilla en el suelo y la otra pierna delante a 90°, lleva la cadera suavemente hacia delante con el torso erguido.' },
  { id: 'cadera-figura4', zona: 'caderas', etapa: 5, nombre: 'Figura 4 tumbada',
    lados: ['Primera pierna', 'Segunda pierna'], img: 'img/cadera-figura4.jpg',
    texto: 'Tumbado boca arriba, apoya un tobillo sobre la rodilla contraria. Tira del muslo de abajo hacia el pecho hasta notar el glúteo.' },
  { id: 'cadera-bebe', zona: 'caderas', etapa: 5, nombre: 'Bebé feliz', lados: null, img: 'img/cadera-bebe.jpg',
    texto: 'Tumbado boca arriba, lleva las rodillas hacia las axilas y sujeta los pies. Deja que la cadera se abra y la espalda descanse en el suelo.' },

  /* ---------- PIERNAS Y PIES ---------- */
  { id: 'pierna-cuadriceps', zona: 'piernas', etapa: 1, nombre: 'Cuádriceps de pie',
    lados: ['Primera pierna', 'Segunda pierna'], img: 'img/pierna-cuadriceps.jpg',
    texto: 'De pie, lleva un talón hacia el glúteo y sujeta el pie. Rodillas juntas y cadera hacia delante. Apóyate en una pared si necesitas equilibrio.' },
  { id: 'pierna-gemelos', zona: 'piernas', etapa: 1, nombre: 'Gemelos en la pared',
    lados: ['Primera pierna atrás', 'Segunda pierna atrás'], img: 'img/pierna-gemelos.jpg',
    texto: 'Apoya las manos en la pared, lleva una pierna atrás con el talón en el suelo y flexiona la de delante. Empuja la cadera suavemente hacia la pared.' },
  { id: 'pierna-isquios-sentado', zona: 'piernas', etapa: 2, nombre: 'Isquios sentado', lados: null, img: 'img/pierna-isquios-sentado.jpg',
    texto: 'Sentado con las piernas estiradas, alarga la espalda y baja el pecho hacia los muslos. No hace falta llegar a los pies: busca el estiramiento detrás de la pierna.' },
  { id: 'pierna-planta', zona: 'piernas', etapa: 3, nombre: 'Planta del pie', lados: null, img: 'img/pierna-planta.jpg',
    texto: 'Arrodillado, apoya los dedos de los pies en el suelo y siéntate sobre los talones. Sube despacio hasta notar la planta del pie.' },
  { id: 'pierna-isquios-tumbado', zona: 'piernas', etapa: 5, nombre: 'Isquios tumbado',
    lados: ['Primera pierna arriba', 'Segunda pierna arriba'], img: 'img/pierna-isquios-tumbado.jpg',
    texto: 'Tumbado boca arriba, sube una pierna y sujétala por detrás del muslo. Estírala poco a poco, sin bloquear la rodilla.' },
  { id: 'pierna-pared', zona: 'piernas', etapa: 6, nombre: 'Piernas en la pared', lados: null, img: 'img/pierna-pared.jpg',
    texto: 'Tumbado con las piernas apoyadas en la pared. Cierra los ojos, suelta los brazos y respira lento. Es el mejor final de sesión.' }
];

/* ---------- VARIANTES NUEVAS ----------
   Más posturas, casi todas sobre esterilla (a cuatro apoyos, tumbado, sentado en el suelo) y de yoga.
   Una postura entra en las sesiones cuando su id está en NUEVAS_ACTIVAS, es decir, cuando su dibujo está revisado. */
const POSTURAS_NUEVAS = [
  /* CUELLO Y HOMBROS */
  { id: 'cuello-giro', zona: 'cuello', etapa: 2, nombre: 'Giro de cabeza', lados: ['Mirando a un lado', 'Mirando al otro lado'], img: 'img/cuello-giro.jpg',
    texto: 'Sentado con la espalda recta, gira despacio la cabeza para mirar por encima del hombro sin subir la barbilla. Respira y suelta la nuca.' },
  { id: 'cuello-diagonal', zona: 'cuello', etapa: 2, nombre: 'Cuello en diagonal', lados: ['Primer lado', 'Segundo lado'], img: 'img/cuello-diagonal.jpg',
    texto: 'Gira la cabeza unos 45° y baja la barbilla hacia la axila. Con la mano de ese lado sobre la nuca, deja que sea el peso quien haga el trabajo.' },
  { id: 'cuello-aguila', zona: 'cuello', etapa: 1, nombre: 'Brazos de águila', lados: ['Primer brazo arriba', 'Segundo brazo arriba'], img: 'img/cuello-aguila.jpg',
    texto: 'Cruza un brazo sobre el otro, dobla los codos y junta las manos. Levanta un poco los codos y deja caer los hombros.' },
  { id: 'cuello-vaca-brazos', zona: 'cuello', etapa: 1, nombre: 'Brazos de vaca', lados: ['Primer brazo arriba', 'Segundo brazo arriba'], img: 'img/cuello-vaca-brazos.jpg',
    texto: 'Sube un brazo doblado por detrás de la cabeza y lleva el otro por la espalda; intenta unir las manos. Usa una toalla si no llegas.' },
  { id: 'cuello-manos-nuca', zona: 'cuello', etapa: 1, nombre: 'Codos abiertos', lados: null, img: 'img/cuello-manos-nuca.jpg',
    texto: 'Entrelaza los dedos detrás de la nuca y abre los codos hacia los lados. Lleva el pecho hacia delante y mira al frente.' },
  { id: 'cuello-pared-pecho', zona: 'cuello', etapa: 1, nombre: 'Pecho en la pared', lados: ['Primer brazo', 'Segundo brazo'], img: 'img/cuello-pared-pecho.jpg',
    texto: 'Apoya el antebrazo en una pared o marco de puerta con el codo a la altura del hombro y gira el cuerpo suavemente hacia el otro lado.' },
  { id: 'cuello-vaca-sentada', zona: 'cuello', etapa: 2, nombre: 'Brazos de vaca sentado', lados: ['Primer brazo arriba', 'Segundo brazo arriba'], img: 'img/cuello-vaca-sentada.jpg',
    texto: 'Sentado con las piernas cruzadas, sube un brazo y dobla el codo hacia la espalda; lleva el otro por abajo e intenta unir las manos. Usa una toalla si no llegas.' },

  /* ESPALDA */
  { id: 'espalda-vaca', zona: 'espalda', etapa: 3, nombre: 'Espalda arqueada (vaca)', lados: null, img: 'img/espalda-vaca.jpg',
    texto: 'A cuatro apoyos, deja caer el vientre y levanta el pecho y la mirada con suavidad. Es la otra mitad del gato: suelta la columna.' },
  { id: 'espalda-hilo-aguja', zona: 'espalda', etapa: 3, nombre: 'Hilo de la aguja', lados: ['Primer brazo', 'Segundo brazo'], img: 'img/espalda-hilo-aguja.jpg',
    texto: 'Desde cuatro apoyos, pasa un brazo por debajo del otro y apoya el hombro y la oreja en el suelo. Respira hacia la espalda alta.' },
  { id: 'espalda-nino-lateral', zona: 'espalda', etapa: 3, nombre: 'Niño hacia un lado', lados: ['Primer lado', 'Segundo lado'], img: 'img/espalda-nino-lateral.jpg',
    texto: 'En la postura del niño, camina con las manos hacia un lado hasta notar el costado contrario. Respira hacia esa zona.' },
  { id: 'espalda-cachorro', zona: 'espalda', etapa: 3, nombre: 'Cachorro', lados: null, img: 'img/espalda-cachorro.jpg',
    texto: 'Desde cuatro apoyos, camina con las manos hacia delante y baja el pecho y la frente hacia el suelo, con la cadera alta sobre las rodillas. Respira hacia los hombros.' },
  { id: 'espalda-lateral-sentada', zona: 'espalda', etapa: 2, nombre: 'Media luna sentada', lados: ['Inclinación a la derecha', 'Inclinación a la izquierda'], img: 'img/espalda-lateral-sentada.jpg',
    texto: 'Sentado con las piernas cruzadas, apoya una mano en el suelo y estira el otro brazo por encima de la cabeza hacia el lado. Alarga el costado.' },
  { id: 'espalda-torsion-sentada', zona: 'espalda', etapa: 2, nombre: 'Torsión sentada', lados: ['Primer giro', 'Segundo giro'], img: 'img/espalda-torsion-sentada.jpg',
    texto: 'Sentado con la espalda larga, gira el torso hacia un lado con una mano en la rodilla contraria y la otra detrás. Mira por encima del hombro.' },
  { id: 'espalda-cobra', zona: 'espalda', etapa: 4, nombre: 'Cobra', lados: null, img: 'img/espalda-cobra.jpg',
    texto: 'Boca abajo, apoya las palmas bajo los hombros y sube el pecho despacio, con los codos algo doblados. Mira al frente y deja la zona lumbar larga y sin apretar.' },
  { id: 'espalda-puente', zona: 'espalda', etapa: 5, nombre: 'Puente suave', lados: null, img: 'img/espalda-puente.jpg',
    texto: 'Tumbado con las rodillas dobladas y los pies en el suelo, sube la cadera despacio hasta formar una línea. Aprieta suave los glúteos y respira hacia el pecho.' },
  { id: 'espalda-libro-abierto', zona: 'espalda', etapa: 5, nombre: 'Libro abierto', lados: ['Primer lado', 'Segundo lado'], img: 'img/espalda-libro-abierto.jpg',
    texto: 'Tumbado de lado con las rodillas dobladas y los brazos al frente, abre el brazo de arriba hacia atrás como si abrieras un libro. Mira la mano y suelta el pecho.' },

  /* CADERAS Y GLÚTEOS */
  { id: 'cadera-cruzada-adelante', zona: 'caderas', etapa: 2, nombre: 'Piernas cruzadas e inclinación', lados: ['Primera pierna delante', 'Segunda pierna delante'], img: 'img/cadera-cruzada-adelante.jpg',
    texto: 'Sentado con las piernas cruzadas, camina con las manos hacia delante y baja el torso. En el segundo lado cambia la pierna de delante.' },
  { id: 'cadera-90-90', zona: 'caderas', etapa: 2, nombre: 'Cadera 90/90', lados: ['Primer lado', 'Segundo lado'], img: 'img/cadera-90-90.jpg',
    texto: 'Sentado con las dos piernas dobladas a 90° hacia el mismo lado. Mantén la espalda larga e inclínate suavemente hacia delante.' },
  { id: 'cadera-pinza-abierta', zona: 'caderas', etapa: 2, nombre: 'Pinza con piernas abiertas', lados: null, img: 'img/cadera-pinza-abierta.jpg',
    texto: 'Sentado con las piernas abiertas en V, inclínate hacia delante con la espalda larga y los brazos al frente. Busca el estiramiento por dentro de las piernas.' },
  { id: 'cadera-paloma', zona: 'caderas', etapa: 3, nombre: 'Paloma', lados: ['Primera pierna delante', 'Segunda pierna delante'], img: 'img/cadera-paloma.jpg',
    texto: 'Desde cuatro apoyos, lleva una rodilla hacia delante con la espinilla cruzada y estira la otra pierna atrás. Baja el torso con calma.' },
  { id: 'cadera-lagarto', zona: 'caderas', etapa: 3, nombre: 'Lagarto', lados: ['Primera pierna delante', 'Segunda pierna delante'], img: 'img/cadera-lagarto.jpg',
    texto: 'Desde cuatro apoyos, lleva un pie al exterior de la mano del mismo lado y baja la cadera. Apóyate en los antebrazos si puedes.' },
  { id: 'cadera-rana', zona: 'caderas', etapa: 3, nombre: 'Rana', lados: null, img: 'img/cadera-rana.jpg',
    texto: 'A cuatro apoyos, abre las rodillas a los lados y lleva la cadera hacia atrás. Apoya los antebrazos y respira. Sal con calma si molesta.' },
  { id: 'cadera-mariposa-tumbada', zona: 'caderas', etapa: 5, nombre: 'Mariposa tumbada', lados: null, img: 'img/cadera-mariposa-tumbada.jpg',
    texto: 'Tumbado boca arriba, junta las plantas de los pies y deja caer las rodillas a los lados. Manos sobre el vientre y respiración lenta.' },

  /* PIERNAS Y PIES */
  { id: 'pierna-cabeza-rodilla', zona: 'piernas', etapa: 2, nombre: 'Cabeza a la rodilla', lados: ['Primera pierna', 'Segunda pierna'], img: 'img/pierna-cabeza-rodilla.jpg',
    texto: 'Sentado con una pierna estirada y la planta del otro pie junto al muslo, inclínate hacia la pierna estirada con la espalda larga.' },
  { id: 'pierna-media-pinza', zona: 'piernas', etapa: 3, nombre: 'Media pinza', lados: ['Primera pierna delante', 'Segunda pierna delante'], img: 'img/pierna-media-pinza.jpg',
    texto: 'Con una rodilla en el suelo, estira la otra pierna al frente con el talón apoyado. Inclínate con la espalda larga hacia el pie.' },
  { id: 'pierna-perro', zona: 'piernas', etapa: 3, nombre: 'Perro boca abajo', lados: null, img: 'img/pierna-perro.jpg',
    texto: 'Desde cuatro apoyos, sube la cadera hacia el techo formando una V. Flexiona las rodillas si hace falta y pedalea suave con los talones.' },
  { id: 'pierna-cuadriceps-lado', zona: 'piernas', etapa: 5, nombre: 'Cuádriceps tumbado de lado', lados: ['Primera pierna', 'Segunda pierna'], img: 'img/pierna-cuadriceps-lado.jpg',
    texto: 'Tumbado de lado, lleva el talón de arriba hacia el glúteo y sujeta el pie. Mantén las rodillas juntas y la cadera hacia delante.' },
  { id: 'pierna-estiron-tumbado', zona: 'piernas', etapa: 5, nombre: 'Estirón tumbado', lados: null, img: 'img/pierna-estiron-tumbado.jpg',
    texto: 'Tumbado, estira los brazos por encima de la cabeza y las piernas hacia delante, alargando todo el cuerpo. Suelta y vuelve a alargarte con cada respiración.' }
];

// Las de abajo ya tienen su dibujo revisado. Se van añadiendo ids según llegan los dibujos nuevos.
const NUEVAS_ACTIVAS = [
  'cuello-giro', 'cuello-diagonal', 'cuello-aguila', 'cuello-vaca-brazos', 'cuello-manos-nuca', 'cuello-pared-pecho',
  'espalda-vaca', 'espalda-hilo-aguja', 'espalda-lateral-sentada'
];
POSTURAS.push(...POSTURAS_NUEVAS.filter(p => NUEVAS_ACTIVAS.includes(p.id)));
