/* Sonido de la app.
   - Música propia: las canciones que añades tú (mp3, m4a...) se guardan SOLO en este dispositivo (IndexedDB) y suenan
     durante la sesión, mezcladas al azar y con un fundido suave entre una y otra. No se suben a ningún sitio.
   - Campana suave opcional al cambiar de postura (generada, sin archivos). */

// Un archivo de audio vacío. iPhone solo deja reproducir si empieza dentro de un toque del usuario; se "cebó"
// el reproductor con esto en el toque y después se cambia por la canción de verdad.
const SILENCIO = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

/* ---------------- biblioteca de canciones (en el dispositivo) ---------------- */
const Musica = (() => {
  const BD = 'estira-musica', ALMACEN = 'pistas', CLAVE_APAGADAS = 'estira.musica-apagadas';
  let bd = null;

  function abrir() {
    if (bd) return Promise.resolve(bd);
    return new Promise((ok, mal) => {
      const r = indexedDB.open(BD, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(ALMACEN, { keyPath: 'id', autoIncrement: true });
      r.onsuccess = () => { bd = r.result; ok(bd); };
      r.onerror = () => mal(r.error);
    });
  }
  const leerApagadas = () => { try { return JSON.parse(localStorage.getItem(CLAVE_APAGADAS) || '[]'); } catch (e) { return []; } };
  const guardarApagadas = l => { try { localStorage.setItem(CLAVE_APAGADAS, JSON.stringify(l)); } catch (e) {} };

  return {
    soportado: () => 'indexedDB' in window,
    // Lista sin el contenido de las canciones (pesan mucho): id, nombre, tamaño y si está incluida.
    async lista() {
      const db = await abrir(), apagadas = leerApagadas();
      return new Promise((ok, mal) => {
        const salida = [], c = db.transaction(ALMACEN).objectStore(ALMACEN).openCursor();
        c.onsuccess = e => {
          const cur = e.target.result;
          if (cur) { const { blob, ...meta } = cur.value; salida.push({ ...meta, activa: !apagadas.includes(meta.id) }); cur.continue(); }
          else ok(salida);
        };
        c.onerror = () => mal(c.error);
      });
    },
    async obtener(id) {
      const db = await abrir();
      return new Promise((ok, mal) => { const r = db.transaction(ALMACEN).objectStore(ALMACEN).get(id); r.onsuccess = () => ok(r.result); r.onerror = () => mal(r.error); });
    },
    async anadir(archivos) {
      const db = await abrir();
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}   // pide que el sistema no las borre
      let n = 0;
      for (const f of archivos) {
        if (f.type && !/^audio\//.test(f.type) && !/\.(mp3|m4a|aac|wav|ogg|oga|flac|opus|webm)$/i.test(f.name)) continue;
        await new Promise((ok, mal) => {
          const t = db.transaction(ALMACEN, 'readwrite');
          t.objectStore(ALMACEN).add({ nombre: f.name.replace(/\.[^.]+$/, ''), tam: f.size, tipo: f.type, fecha: Date.now(), blob: f });
          t.oncomplete = () => { n++; ok(); };
          t.onerror = () => mal(t.error); t.onabort = () => mal(t.error);
        });
      }
      return n;
    },
    async borrar(id) {
      const db = await abrir();
      await new Promise((ok, mal) => { const t = db.transaction(ALMACEN, 'readwrite'); t.objectStore(ALMACEN).delete(id); t.oncomplete = ok; t.onerror = () => mal(t.error); });
      guardarApagadas(leerApagadas().filter(x => x !== id));
    },
    incluir(id, si) { const l = leerApagadas().filter(x => x !== id); if (!si) l.push(id); guardarApagadas(l); }
  };
})();

/* ---------------- reproductor y campana ---------------- */
const Sonido = (() => {
  let ctx = null, master, limiter, musicBus, bellBus, reverb, reverbSend, analizador = null;
  let pista = null, gainPista = null, urlActual = null;
  let cola = [], pos = 0, generacion = 0, fallos = 0, cebando = false, saliendo = false;
  let volume = 0.7, bellsOn = false, ducked = false, running = false, sesion = false, pruebaTimer = null;
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const barajar = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function crear() {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    // En iPhone, esto hace que suene aunque el interruptor lateral esté en silencio (Safari 16.4+).
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}

    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -10; limiter.knee.value = 12; limiter.ratio.value = 8;
    limiter.attack.value = 0.01; limiter.release.value = 0.4;
    master = ctx.createGain(); master.gain.value = 0;
    master.connect(limiter); limiter.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.connect(master);
    bellBus = ctx.createGain(); bellBus.connect(master);

    reverb = ctx.createConvolver(); reverb.buffer = impulso(3.0, 2.4);
    reverbSend = ctx.createGain(); reverbSend.gain.value = 0.5;
    reverbSend.connect(reverb); reverb.connect(master);
  }
  function impulso(seg, caida) {
    const n = Math.floor(ctx.sampleRate * seg), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, caida); }
    return b;
  }
  const nivelMaestro = () => Math.pow(volume, 1.6) * 0.95 * (ducked ? 0.35 : 1);

  /* ----- canciones ----- */
  function prepararReproductor() {
    if (pista) return;
    pista = new Audio(); pista.preload = 'auto'; pista.setAttribute('playsinline', '');
    const nodo = ctx.createMediaElementSource(pista);
    gainPista = ctx.createGain(); gainPista.gain.value = 0;
    nodo.connect(gainPista); gainPista.connect(musicBus);
    pista.addEventListener('ended', () => { if (!cebando) siguiente(); });
    pista.addEventListener('error', () => { if (!cebando && running) { fallos++; siguiente(); } });
    pista.addEventListener('timeupdate', () => {                 // fundido de salida en los últimos segundos
      if (cebando || saliendo || !pista.duration || !isFinite(pista.duration)) return;
      const resta = pista.duration - pista.currentTime;
      if (resta < 4) {
        saliendo = true;
        const t = ctx.currentTime;
        gainPista.gain.cancelScheduledValues(t); gainPista.gain.setValueAtTime(gainPista.gain.value, t);
        gainPista.gain.linearRampToValueAtTime(0, t + Math.max(0.3, resta));
      }
    });
  }
  function cebar() {                                              // dentro del toque del usuario
    cebando = true; pista.src = SILENCIO;
    const p = pista.play(); if (p && p.catch) p.catch(() => {});
  }
  async function tocar(i, gen) {
    if (!cola.length || gen !== generacion || !running) return;
    const rec = await Musica.obtener(cola[i % cola.length].id).catch(() => null);
    if (gen !== generacion || !running) return;
    if (!rec) { fallos++; return siguiente(); }
    const url = URL.createObjectURL(rec.blob), vieja = urlActual;
    urlActual = url; cebando = false; saliendo = false;
    const t = ctx.currentTime;
    gainPista.gain.cancelScheduledValues(t); gainPista.gain.setValueAtTime(0, t);
    pista.src = url;
    try { await pista.play(); } catch (e) { if (vieja) URL.revokeObjectURL(vieja); fallos++; return siguiente(); }
    if (gen !== generacion) return;
    fallos = 0;
    gainPista.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);   // entra poco a poco
    if (vieja) URL.revokeObjectURL(vieja);
  }
  function siguiente() {
    if (!running || !cola.length || fallos > cola.length) return;       // si todas fallan, se queda en silencio
    pos = (pos + 1) % cola.length;
    tocar(pos, generacion);
  }

  /* ----- campana suave (generada) ----- */
  function cuenco(freq, volumen, cuando, dur) {
    const t = cuando || ctx.currentTime, out = ctx.createGain();
    out.gain.value = volumen; out.connect(bellBus); out.connect(reverbSend);
    [[1, 1, 1], [2.756, 0.5, 0.62], [5.404, 0.26, 0.4], [8.933, 0.12, 0.25]].forEach(([r, a, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq * r + (Math.random() - 0.5) * 0.6;
      const largo = (dur || 7) * d;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(a, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + largo);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + largo + 0.1);
    });
  }

  return {
    soportado: () => !!(window.AudioContext || window.webkitAudioContext),

    // Debe llamarse desde un toque del usuario (requisito del iPhone).
    async iniciar(opciones) {
      if (!this.soportado()) return;
      if (!ctx) crear();
      if (opciones) { volume = opciones.volumen; bellsOn = !!opciones.campanas; }
      sesion = true; clearTimeout(pruebaTimer);
      prepararReproductor(); cebar();                              // todo esto va ANTES del primer await
      const reanudar = ctx.resume().catch(() => {});
      running = true; ducked = false; generacion++; fallos = 0;
      const gen = generacion;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 1.0);
      await reanudar;
      const lista = (await Musica.lista().catch(() => [])).filter(m => m.activa);
      cola = barajar(lista);
      let ultima = null; try { ultima = Number(localStorage.getItem('estira.ultimaPista')); } catch (e) {}
      if (cola.length > 1 && cola[0].id === ultima) cola.push(cola.shift());     // no empezar siempre por la misma
      if (cola.length) { try { localStorage.setItem('estira.ultimaPista', String(cola[0].id)); } catch (e) {} }
      pos = 0;
      if (gen === generacion) tocar(0, gen);
    },

    // Escuchar una canción desde la lista, sin empezar una sesión.
    async probar(id, vol) {
      if (!this.soportado() || sesion) return;
      if (!ctx) crear();
      if (vol !== undefined) volume = vol;
      prepararReproductor(); cebar();
      const reanudar = ctx.resume().catch(() => {});
      clearTimeout(pruebaTimer);
      running = true; ducked = false; generacion++; fallos = 0;
      const gen = generacion;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 0.3);
      await reanudar;
      cola = [{ id }]; pos = 0;
      if (gen === generacion) tocar(0, gen);
      pruebaTimer = setTimeout(() => { if (!sesion) this.parar(2); }, 25000);
    },
    pararPrueba() { if (!sesion) { clearTimeout(pruebaTimer); this.parar(0.8); } },

    parar(segundos) {
      if (!ctx) return;
      sesion = false; clearTimeout(pruebaTimer); generacion++;
      if (typeof this.alParar === 'function') setTimeout(this.alParar, 0);   // la pantalla actualiza el botón ▶/■
      if (!running) return;
      running = false;
      const k = segundos === undefined ? 5 : segundos;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, Math.max(0.05, k / 3));
      setTimeout(() => {                                          // se para del todo para no gastar batería
        if (running || !ctx) return;
        try { pista.pause(); } catch (e) {}
        if (urlActual) { URL.revokeObjectURL(urlActual); urlActual = null; }
        try { ctx.suspend(); } catch (e) {}
      }, k * 1000 + 500);
    },
    despertar() {                                                 // al volver a la app tras bloquear el móvil
      if (!ctx || !running) return;
      if (ctx.state !== 'running') { try { ctx.resume(); } catch (e) {} }
      if (pista && pista.paused && !cebando && urlActual) { const p = pista.play(); if (p && p.catch) p.catch(() => {}); }
    },
    volumen(v) { volume = v; if (ctx && running) master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 0.2); },
    campanas(on) { bellsOn = on; },
    bajar(si) { ducked = si; if (ctx && running) master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 0.4); },
    enMarcha: () => running,
    estado: () => (ctx ? ctx.state : 'sin-iniciar'),
    nivel() {                                                     // nivel RMS (0..1) de lo que suena, para comprobaciones
      if (!ctx) return null;
      if (!analizador) { analizador = ctx.createAnalyser(); analizador.fftSize = 2048; limiter.connect(analizador); }
      const d = new Float32Array(analizador.fftSize); analizador.getFloatTimeDomainData(d);
      let s = 0; for (let i = 0; i < d.length; i++) s += d[i] * d[i];
      return Math.sqrt(s / d.length);
    },

    // Campana suave al cambiar de postura (solo si está activada).
    campana(tipo) {
      if (!ctx || !bellsOn || ctx.state !== 'running') return;
      const t = ctx.currentTime;
      if (tipo === 'postura')      cuenco(392.0, 0.22, t, 6);
      else if (tipo === 'prepara') cuenco(293.7, 0.16, t, 4);
      else if (tipo === 'lado')  { cuenco(329.6, 0.2, t, 4.5); cuenco(440.0, 0.17, t + 0.9, 4.5); }
      else if (tipo === 'fin')   { cuenco(392.0, 0.24, t, 7); cuenco(294.0, 0.22, t + 1.6, 8); cuenco(196.0, 0.24, t + 3.4, 10); }
    }
  };
})();
