/* Motor de sonido: todo se genera aquí (sin archivos), así funciona sin internet y nunca suena igual dos veces.
   Capas: pads (acordes lentos), gotas (gotas de agua afinadas), olas (muy suaves) y cuencos.
   Un "ambiente" es una mezcla de capas; si eliges varios, la app pasa de uno a otro con un fundido largo. */

const Sonido = (() => {
  let ctx = null, master, limiter, musicBus, bellBus, reverb, reverbSend, analizador = null;
  let pad = null, gotas = null, mar = null;
  let volume = 0.7, bellsOn = true, ducked = false, running = false, sesion = false;
  let ambientes = ['pads'], sceneIdx = 0;
  let sceneTimer = null, bowlTimer = null, dropTimer = null, pruebaTimer = null;
  let bowlRate = 0.6, dropRate = 0;
  let noiseBuf = null;

  //                 pad   gotas  olas  cuencos
  const ESCENAS = {
    pads:    { pad: 1.00, drops: 0.0, sea: 0.0, bowls: 0.45 },
    gotas:   { pad: 0.55, drops: 1.0, sea: 0.0, bowls: 0.0 },
    olas:    { pad: 0.60, drops: 0.0, sea: 1.0, bowls: 0.0 },
    cuencos: { pad: 0.45, drops: 0.0, sea: 0.0, bowls: 1.0 }
  };
  const NIVEL = { pad: 0.34, drops: 0.9, sea: 0.65 };         // niveles base, medidos para que todos suenen parecido y suave
  const ACORDES = [                                           // notas MIDI: quintas y cuartas, siempre consonantes
    [50, 57, 64, 69], [43, 50, 57, 62], [47, 54, 61, 66], [45, 52, 59, 64]
  ];
  const ESCALA = [62, 64, 66, 69, 71, 74, 76];                // pentatónica de re
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

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

    musicBus = ctx.createGain(); musicBus.gain.value = 1; musicBus.connect(master);
    bellBus = ctx.createGain(); bellBus.gain.value = 1; bellBus.connect(master);

    reverb = ctx.createConvolver(); reverb.buffer = impulso(3.4, 2.3);
    reverbSend = ctx.createGain(); reverbSend.gain.value = 0.6;
    reverbSend.connect(reverb); reverb.connect(master);

    noiseBuf = ruido(10);
  }

  function impulso(seg, caida) {
    const n = Math.floor(ctx.sampleRate * seg), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, caida);
    }
    return b;
  }

  function ruido(seg) {                                       // ruido rosa (solo lo usan las olas)
    const n = Math.floor(ctx.sampleRate * seg), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      }
    }
    return b;
  }

  function lfo(freq, profundidad, destino, fase) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = freq; g.gain.value = profundidad;
    o.connect(g); g.connect(destino); o.start(ctx.currentTime + (fase || 0));
    return o;
  }

  /* ---------- pads ---------- */
  function crearPad() {
    const out = ctx.createGain(); out.gain.value = 0;
    out.connect(musicBus); out.connect(reverbSend);
    const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 900; filtro.Q.value = 0.4;
    filtro.connect(out);
    lfo(0.045, 380, filtro.frequency);
    const voces = [];
    ACORDES[0].forEach((m, i) => {
      [['sine', 0], ['triangle', 7]].forEach(([tipo, cents], j) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = tipo; o.frequency.value = mtof(m); o.detune.value = cents + (i - 1.5) * 2;
        g.gain.value = (j === 0 ? 0.22 : 0.07) / (1 + i * 0.15);
        o.connect(g); g.connect(filtro); o.start();
        voces.push({ o, i });
      });
    });
    return { out, voces, acorde: 0, timer: null };
  }
  function siguienteAcorde() {
    if (!pad || !running) return;
    pad.acorde = (pad.acorde + 1 + Math.floor(Math.random() * 2)) % ACORDES.length;
    const notas = ACORDES[pad.acorde], t = ctx.currentTime;
    pad.voces.forEach(v => v.o.frequency.setTargetAtTime(mtof(notas[v.i]), t, 2.6));
    pad.timer = setTimeout(siguienteAcorde, 17000 + Math.random() * 9000);
  }

  /* ---------- gotas: gotas de agua afinadas con la escala del pad, con mucha reverberación ---------- */
  function crearGotas() {
    const out = ctx.createGain(); out.gain.value = 0;
    out.connect(musicBus); out.connect(reverbSend);
    return { out };
  }
  function gota() {
    if (!gotas) return;
    const t = ctx.currentTime + 0.02;
    const nota = ESCALA[Math.floor(Math.random() * ESCALA.length)] + (Math.random() < 0.55 ? 12 : 24);
    const f = mtof(nota), dur = 0.28 + Math.random() * 0.45, amp = 0.18 + Math.random() * 0.4;
    const salida = ctx.createGain(); salida.gain.value = 1;
    let destino = salida;
    if (ctx.createStereoPanner) {                             // cada gota cae en un sitio distinto
      const p = ctx.createStereoPanner(); p.pan.value = Math.random() * 1.6 - 0.8; salida.connect(p); destino = p;
    }
    destino.connect(gotas.out);
    [[1, 1, 1], [2.01, 0.18, 0.5]].forEach(([r, a, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f * r * 0.9, t);
      o.frequency.exponentialRampToValueAtTime(f * r * 1.07, t + 0.05);   // el "bloop" sube un poco de tono
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(amp * a, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur * d);
      o.connect(g); g.connect(salida); o.start(t); o.stop(t + dur * d + 0.1);
    });
  }
  function bucleGotas() {
    if (!running) return;
    if (dropRate > 0.02 && !ducked) {
      gota();
      if (Math.random() < 0.2) setTimeout(() => { if (running && !ducked) gota(); }, 110 + Math.random() * 220);
    }
    dropTimer = setTimeout(bucleGotas, (450 + Math.random() * 2000) / Math.max(0.3, dropRate));
  }

  /* ---------- olas: muy graves y suaves, con subidas y bajadas lentas ---------- */
  function crearMar() {
    const out = ctx.createGain(); out.gain.value = 0; out.connect(musicBus); out.connect(reverbSend);
    [[12.4, 0], [16.1, 5]].forEach(([periodo, fase]) => {
      const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(0, Math.random() * 6);
      const f = ctx.createBiquadFilter(), g = ctx.createGain();
      f.type = 'lowpass'; f.frequency.value = 240; f.Q.value = 0.3;
      g.gain.value = 0.5;
      s.connect(f); f.connect(g); g.connect(out);
      lfo(1 / periodo, 0.32, g.gain, fase);                   // sube y baja entre 0,18 y 0,82
      lfo(1 / periodo, 90, f.frequency, fase);
    });
    return { out };
  }

  /* ---------- cuencos ---------- */
  function cuenco(freq, volumen, destino, cuando, dur) {
    const t = cuando || ctx.currentTime, out = ctx.createGain();
    out.gain.value = volumen; out.connect(destino || bellBus); out.connect(reverbSend);
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
  function cuencoAmbiente() {
    if (!running) return;
    if (bowlRate > 0.02 && !ducked) {
      // notas medias y agudas: los graves casi no se oyen en el altavoz de un móvil
      const nota = ESCALA[Math.floor(Math.random() * ESCALA.length)] + (Math.random() < 0.4 ? 12 : 0);
      cuenco(mtof(nota), 0.42 * Math.min(1, bowlRate + 0.25), musicBus, undefined, 9);
    }
    const base = bowlRate > 0.8 ? 7000 : 20000;
    bowlTimer = setTimeout(cuencoAmbiente, base + Math.random() * base * 0.8);
  }

  /* ---------- escenas ---------- */
  function aplicarEscena(nombre, seg) {
    const e = ESCENAS[nombre] || { pad: 0, drops: 0, sea: 0, bowls: 0 }, t = ctx.currentTime;
    const k = seg === undefined ? 8 : seg;
    const sube = (capa, v) => capa && capa.out.gain.setTargetAtTime(v, t, Math.max(0.2, k / 3));
    sube(pad, e.pad * NIVEL.pad); sube(gotas, e.drops * NIVEL.drops); sube(mar, e.sea * NIVEL.sea);
    bowlRate = e.bowls; dropRate = e.drops;
  }
  function ciclo() {
    if (!running) return;
    if (ambientes.length > 1) {
      sceneIdx = (sceneIdx + 1) % ambientes.length;
      aplicarEscena(ambientes[sceneIdx], 10);
    }
    sceneTimer = setTimeout(ciclo, 210000);                   // cada 3,5 minutos cambia de ambiente
  }

  function nivelMaestro() { return Math.pow(volume, 1.6) * 0.9 * (ducked ? 0.35 : 1); }

  /* ---------- API ---------- */
  return {
    soportado: () => !!(window.AudioContext || window.webkitAudioContext),

    // Debe llamarse desde un toque del usuario (requisito de iPhone).
    // vistaPrevia = true: sonido de prueba desde la pantalla de inicio, no es una sesión.
    async iniciar(opciones, vistaPrevia) {
      if (!this.soportado()) return;
      if (!ctx) crear();
      if (opciones) { volume = opciones.volumen; bellsOn = opciones.campanas; ambientes = (opciones.ambientes || []).slice(); }
      if (!vistaPrevia) { sesion = true; clearTimeout(pruebaTimer); }
      try { await ctx.resume(); } catch (e) {}
      if (!running) {
        running = true; ducked = false;
        pad = pad || crearPad(); gotas = gotas || crearGotas(); mar = mar || crearMar();
        pad.timer = setTimeout(siguienteAcorde, 14000);
        sceneTimer = setTimeout(ciclo, 210000);
        bowlTimer = setTimeout(cuencoAmbiente, vistaPrevia ? 1500 : 6000);
        dropTimer = setTimeout(bucleGotas, 800);
      }
      sceneIdx = Math.floor(Math.random() * Math.max(1, ambientes.length));
      aplicarEscena(ambientes[sceneIdx], vistaPrevia ? 1.5 : 2);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 1.0);
    },

    // Escucha un ambiente unos 9 segundos desde la pantalla de inicio.
    async probar(id, volumenUI) {
      if (!this.soportado() || sesion) return;
      clearTimeout(pruebaTimer);
      await this.iniciar({ volumen: volumenUI, campanas: false, ambientes: [id] }, true);
      if (id === 'cuencos') cuenco(mtof(ESCALA[2] + 12), 0.42, musicBus, undefined, 9);
      if (id === 'gotas') gota();
      pruebaTimer = setTimeout(() => { if (!sesion) this.parar(2.5); }, 9000);
    },
    pararPrueba() { if (!sesion) { clearTimeout(pruebaTimer); this.parar(1.2); } },

    parar(segundos) {
      if (!ctx) return;
      sesion = false; clearTimeout(pruebaTimer);
      if (!running) return;
      running = false;
      clearTimeout(sceneTimer); clearTimeout(bowlTimer); clearTimeout(dropTimer); if (pad) clearTimeout(pad.timer);
      const k = (segundos === undefined ? 5 : segundos);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, k / 3);
      setTimeout(() => {                                      // silencia las capas y duerme el motor para no gastar batería
        if (running || !ctx) return;
        [pad, gotas, mar].forEach(c => c && c.out.gain.setValueAtTime(0, ctx.currentTime));
        try { ctx.suspend(); } catch (e) {}
      }, k * 1000 + 500);
    },
    despertar() { if (ctx && running && ctx.state !== 'running') { try { ctx.resume(); } catch (e) {} } },
    volumen(v) { volume = v; if (ctx && running) master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 0.2); },
    campanas(on) { bellsOn = on; },
    bajar(si) { ducked = si; if (ctx && running) master.gain.setTargetAtTime(nivelMaestro(), ctx.currentTime, 0.4); },
    ambientes(lista) {
      ambientes = lista.slice();
      if (ctx && running && sesion) { sceneIdx = 0; aplicarEscena(ambientes[0], 4); }
    },
    enMarcha: () => running,

    // Nivel RMS (0..1) de lo que está sonando. Sirve para comprobar volúmenes.
    nivel() {
      if (!ctx) return null;
      if (!analizador) { analizador = ctx.createAnalyser(); analizador.fftSize = 2048; limiter.connect(analizador); }
      const d = new Float32Array(analizador.fftSize); analizador.getFloatTimeDomainData(d);
      let s = 0; for (let i = 0; i < d.length; i++) s += d[i] * d[i];
      return Math.sqrt(s / d.length);
    },
    estado: () => (ctx ? ctx.state : 'sin-iniciar'),

    // Campanas de aviso. Suaves y espaciadas, para no sacar de la relajación.
    campana(tipo) {
      if (!ctx || !bellsOn || ctx.state !== 'running') return;
      const t = ctx.currentTime;
      if (tipo === 'postura')      cuenco(392.0, 0.36, null, t, 6.5);
      else if (tipo === 'prepara') cuenco(293.7, 0.26, null, t, 4.5);
      else if (tipo === 'lado')  { cuenco(329.6, 0.3, null, t, 5); cuenco(440.0, 0.26, null, t + 0.9, 5); }
      else if (tipo === 'fin')   { cuenco(392.0, 0.36, null, t, 8); cuenco(294.0, 0.32, null, t + 1.6, 9); cuenco(196.0, 0.36, null, t + 3.4, 11); }
    }
  };
})();
