# Cuerpo · gimnasio y estiramientos

App web sin cuentas ni instalación de tiendas. Funciona en iPhone y en el ordenador, y una vez instalada en el móvil
funciona sin internet. Al abrirla aparecen dos opciones:

- **Gimnasio** (`gimnasio.html`): rutina de cuatro días, apuntar series, descansos con temporizador, historial,
  medidas, perfil y fuerza estimada. Los datos se guardan **solo en el dispositivo**.
- **Estiramientos** (`estira.html`): sesiones guiadas por zonas del cuerpo con tiempos y dibujos. La mayoría de posturas son
  sobre esterilla (a cuatro apoyos, tumbado, sentado en el suelo) y de yoga, de 30 a 50 segundos cada una según la duración.
  Nunca repite una postura dentro de una sesión. La música es la tuya: se añade desde la propia app y se guarda solo en el
  dispositivo (no se sube a internet).

## Tus datos
Todo se guarda en el propio dispositivo (no hay servidor ni cuenta). El móvil y el ordenador son independientes.
En **Gimnasio → Perfil → Copia de seguridad** puedes descargar tus datos a un archivo e importarlos en otro dispositivo.
Hazlo de vez en cuando: si se borran los datos del navegador, se pierden.

## Ponerla en el iPhone
1. Abre la dirección de la app en **Safari**.
2. Compartir → **Añadir a pantalla de inicio** (deja marcada "Abrir como app web").
3. Ábrela una vez con internet: se guarda todo y después funciona sin conexión.

## Probar rápido (Estiramientos)
Añade `?rapido` a la dirección de `estira.html` y todo va 10 veces más deprisa.

## Archivos
- `index.html`: pantalla de inicio con las dos opciones.
- `gimnasio.html`, `gimnasio.css`, `gimnasio.js`: el gimnasio.
- `estira.html`, `styles.css`, `app.js`, `audio.js`, `data.js`: estiramientos (`audio.js` guarda y reproduce tu música).
- `sw.js`, `registro-sw.js`, `manifest.webmanifest`, `icons/`: instalación y modo sin conexión.
  Si cambias archivos de la app, sube el número de `CACHE` en `sw.js` para que se vuelvan a guardar.
- `img/`: dibujos de las posturas.

## Música incluida y créditos
La app trae dos packs de música relajante que se descargan al dispositivo con su botón «Añadir este pack»
(Estiramientos → Mi música): «Piano y meditación» (7 piezas cortas, unos 55 minutos, 96 kbps) y «Zen largo»
(8 piezas largas de flauta, arpa, lluvia y fondos suaves, 80 kbps). Los packs se definen en `PACKS_MUSICA` y
`MUSICA_INCLUIDA` (campo `grupo`) de `data.js`. Son de **Kevin MacLeod (incompetech.com)**, licencia
**Creative Commons: By Attribution 4.0** (http://creativecommons.org/licenses/by/4.0/). Se ajustaron el volumen y el peso.
Están en `musica/` y los créditos en `musica/CREDITOS.txt`. Las canciones que añadas tú no se suben a ningún sitio.
