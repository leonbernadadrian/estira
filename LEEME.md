# Estira · estiramientos guiados

App web sin instalación ni cuentas. Funciona en iPhone y en el ordenador, y una vez instalada en el móvil funciona sin internet.

## Cómo funciona
- Eliges **zonas** (cuello, espalda, caderas, piernas) y **duración** (10 a 45 min).
- La app monta la sesión: respiración inicial, posturas, relajación final. El tiempo de cada postura lo decide ella
  según la duración (de ~45 s a ~1:30), y cada lado de las posturas asimétricas se hace por separado.
- **Nunca repite una postura dentro de una sesión**, y de una sesión a otra da prioridad a las que llevas más tiempo
  sin hacer (o nunca hiciste).
- Sonido generado en el propio móvil: pads suaves, gotas, olas suaves, cuencos. Si marcas varios, va pasando de uno a otro.
  Al tocar un ambiente suena unos segundos para que lo escuches.

## Usarla en el ordenador
Doble clic en `index.html`. (Sin modo sin conexión: eso solo se activa cuando está alojada en una dirección https.)

## Ponerla en el iPhone
1. La carpeta se publica en una dirección https (GitHub Pages, Netlify…).
2. Abre esa dirección en **Safari** del iPhone (no en Chrome).
3. Compartir → **Añadir a pantalla de inicio**.
4. Ábrela una vez con internet: se guarda todo en el móvil. Desde ahí funciona sin conexión.

## Probar rápido
Añade `?rapido` a la dirección y todo va 10 veces más deprisa (`?rapido=30` para 30 veces).

## Añadir posturas nuevas
1. Deja el dibujo (JPG) en `_originales/` con el mismo nombre que el `id` de la postura.
2. Ejecuta `python herramientas/optimizar.py .` (recorta y reduce los dibujos a `img/`).
3. Añade la ficha en `data.js`.

## Archivos
- `index.html`, `styles.css`, `app.js`: la app.
- `audio.js`: el sonido (todo se genera, no hay archivos de audio).
- `data.js`: zonas y posturas.
- `sw.js`, `manifest.webmanifest`, `icons/`: instalación y modo sin conexión.
- `img/`: dibujos ligeros que usa la app. `_originales/`: dibujos originales (no hace falta publicarlos).
