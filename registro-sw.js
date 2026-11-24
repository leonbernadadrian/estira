/* Registra el modo sin conexión. Se usa en la pantalla de inicio y en el gimnasio
   (Estiramientos lo hace desde app.js). Con registrar dos veces no pasa nada. */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    // Al desarrollar en el propio ordenador no se usa el modo sin conexión, para ver siempre la última versión.
    navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => {});
    if (window.caches) caches.keys().then(ks => ks.forEach(k => caches.delete(k))).catch(() => {});
  } else {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
