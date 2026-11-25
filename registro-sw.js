/* Registra el modo sin conexión en todas las pantallas de la app.
   Si hay una versión nueva, la app se recarga sola una vez para enseñarla (sin tener que abrirla dos veces). */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    // Al desarrollar en el propio ordenador no se usa el modo sin conexión, para ver siempre la última versión.
    navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => {});
    if (window.caches) caches.keys().then(ks => ks.forEach(k => caches.delete(k))).catch(() => {});
  } else {
    const habiaControlador = !!navigator.serviceWorker.controller;      // false = primera vez que se abre: no hay nada que actualizar
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!habiaControlador) return;
      let ya = false;
      try {                                                              // como mucho una recarga por minuto (evita bucles)
        ya = Date.now() - Number(sessionStorage.getItem('sw-recargado') || 0) < 60000;
        if (!ya) sessionStorage.setItem('sw-recargado', String(Date.now()));
      } catch (e) {}
      if (ya) return;
      const a = document.activeElement;
      if (a && a.matches && a.matches('input, textarea, select')) return; // si estás escribiendo, no se interrumpe
      location.reload();
    });
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
