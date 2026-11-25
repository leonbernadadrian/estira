/* Modo sin conexión: guarda la app y los dibujos en el móvil la primera vez que se abre con internet.
   Después arranca siempre desde el móvil (rápido y sin depender de la red) y, si hay conexión,
   se actualiza sola en segundo plano para la próxima vez.
   Si cambias archivos de la app, sube el número de CACHE para que se vuelvan a guardar todos. */
importScripts('data.js');                       // para saber qué dibujos hay que guardar

const CACHE = 'cuerpo-v7';
const BASE = ['./', 'index.html', 'estira.html', 'gimnasio.html', 'gimnasio.css', 'gimnasio.js', 'registro-sw.js',
              'styles.css', 'data.js', 'audio.js', 'app.js', 'manifest.webmanifest',
              'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    const lista = BASE.concat(POSTURAS.map(p => p.img));
    // cache: 'reload' = pregunta siempre a la red. GitHub Pages deja los archivos 10 min en la caché del navegador
    // y sin esto se podía guardar de nuevo una copia vieja justo después de publicar una versión nueva.
    await Promise.all(lista.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));   // si falta un archivo, no se cae todo
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (new URL(r.url).pathname.endsWith('/datos.enc')) return;      // el historial cifrado siempre va a la red: nunca una copia vieja
  if (new URL(r.url).pathname.includes('/musica/')) return;        // la música pesa mucho: se guarda en la app (IndexedDB), no aquí
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const guardado = await c.match(r, { ignoreSearch: true });
    // no-cache = comprueba con la red si hay versión nueva (si no la hay, es una respuesta rápida y sin descarga)
    const red = fetch(new Request(r.url, { cache: 'no-cache', credentials: 'same-origin' }))
      .then(res => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => null);
    if (guardado) { try { e.waitUntil(red); } catch (_) {} return guardado; }
    const res = await red;
    if (res) return res;
    if (r.mode === 'navigate') { const inicio = await c.match('index.html'); if (inicio) return inicio; }
    return Response.error();
  })());
});
