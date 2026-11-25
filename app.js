/* Estira: lógica de la app. Sin dependencias, funciona abriendo index.html o instalada en el móvil.
   Truco para probar: añade ?rapido a la dirección y todo va 10 veces más deprisa (?rapido=30 para 30 veces). */
(() => {
'use strict';

const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
const ESC = params.has('rapido') ? (Number(params.get('rapido')) > 0 ? Number(params.get('rapido')) : 10) : 1;

const DURACIONES = [10, 15, 20, 30, 45];
// Cuánto se mantiene cada postura según la duración de la sesión. Menos de un minuto (así se pidió):
// 30-50 s, un poco más largas cuanto más larga es la sesión.
const HOLD_POR_DURACION = { 10: 30, 15: 35, 20: 40, 30: 45, 45: 50 };
const DEFECTO = { zonas: ['cuello', 'espalda'], minutos: 20, volumen: 70, campanas: false };
const INTRO = 45, CIERRE_MIN = 45, T_NORMAL = 6, T_CAMBIO_POSICION = 10, T_LADO = 4, HOLD_MAX = 100;

/* ---------- ajustes e historial (con try/catch: en modo privado el almacenamiento puede fallar) ---------- */
function leer(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
function escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

let ajustes = (() => {
  const j = Object.assign({}, DEFECTO, leer('estira.ajustes', {}));
  j.zonas = (j.zonas || []).filter(z => ZONAS.some(x => x.id === z));
  if (!j.zonas.length) j.zonas = DEFECTO.zonas.slice();
  if (!DURACIONES.includes(j.minutos)) j.minutos = DEFECTO.minutos;
  delete j.hold; delete j.ambientes;              // ya no existen: el tiempo lo decide la app y la música la pones tú
  j.volumen = Math.min(100, Math.max(0, Number(j.volumen) || 0));
  if (j.v !== 2) { j.campanas = false; j.v = 2; } // se quitaron los sonidos generados: la campana empieza apagada
  else j.campanas = j.campanas === true;
  return j;
})();
const guardar = () => escribir('estira.ajustes', ajustes);

/* ---------- utilidades ---------- */
const fmt = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const fmtHold = s => (s % 60 === 0 ? (s / 60) + ' min' : s < 60 ? s + ' s' : fmt(s));
const zonaDe = id => ZONAS.find(z => z.id === id);
function barajar(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- creador de sesiones ----------
   1) calcula cuántas posturas caben en la duración elegida (más tiempo = más posturas y algo más largas)
   2) elige posturas repartidas por igual entre las zonas marcadas y NUNCA repite una dentro de la sesión.
      De una sesión a otra da prioridad a las que llevas más tiempo sin hacer (se apunta en el propio móvil)
      y a las que no has hecho nunca, así van saliendo las variantes nuevas.
   3) las ordena de pie → sentado → arrodillado → tumbado, para no estar subiendo y bajando
   4) ajusta el tiempo de cada postura y la relajación final para que la suma sea exactamente la duración */
function construirSesion(a) {
  const total = a.minutos * 60;
  const disponible = total - INTRO - CIERRE_MIN;
  const usos = leer('estira.usos', {});
  const ruido = 3 * 864e5;                          // algo de azar entre las que llevan parecido sin hacerse
  const porRecencia = z => POSTURAS.filter(p => p.zona === z)
    .map(p => ({ p, k: (usos[p.id] || 0) + Math.random() * ruido }))
    .sort((x, y) => x.k - y.k).map(x => x.p);
  // La mayoría de posturas son en el suelo (esterilla, cuatro apoyos, yoga). Las de pie son 1 de cada 5 como mucho.
  const dividir = lista => ({ suelo: lista.filter(p => p.etapa >= 2), pie: lista.filter(p => p.etapa === 1) });
  const colas = a.zonas.map(z => dividir(porRecencia(z)));
  const otras = ZONAS.map(z => z.id).filter(z => !a.zonas.includes(z)).map(z => dividir(porRecencia(z)));

  // Tiempo objetivo por postura según la duración. Nunca se alargan más allá de HOLD_MAX: si las zonas marcadas
  // no tienen posturas para llenar el tiempo, se completa con posturas de otras zonas (y se avisa).
  const holdObj = HOLD_POR_DURACION[a.minutos] || 60;
  // floor y no round: si hay que elegir, mejor posturas algo más largas que más cortas
  const objetivo = Math.max(2, Math.floor(disponible / (holdObj + 7)));

  const zonasIdx = id => ZONAS.findIndex(z => z.id === id);
  const elegidas = [];
  let holds = 0;
  const tomar = (grupo, deOtraZona) => {              // reparte por igual entre las zonas del grupo
    let quedan = true;
    while (quedan && holds < objetivo) {
      quedan = false;
      for (const c of grupo) {
        if (!c.suelo.length && !c.pie.length) continue;
        quedan = true;
        const quierePie = elegidas.length % 5 === 4;                       // la 5.ª, la 10.ª...: de pie
        const cola = quierePie ? (c.pie.length ? c.pie : c.suelo) : (c.suelo.length ? c.suelo : c.pie);
        const p = cola.shift(); elegidas.push({ p, extra: deOtraZona }); holds += p.lados ? 2 : 1;
        if (holds >= objetivo) break;
      }
    }
  };
  tomar(colas, false);
  if (holds < objetivo) tomar(otras, true);
  elegidas.sort((x, y) => (x.p.etapa - y.p.etapa) || (zonasIdx(x.p.zona) - zonasIdx(y.p.zona)));
  const bloques = elegidas;

  let sumaTrans = 0; holds = 0;
  bloques.forEach((b, i) => {
    const prev = bloques[i - 1];
    b.trans = !prev ? T_NORMAL : (prev.p.etapa !== b.p.etapa ? T_CAMBIO_POSICION : T_NORMAL);
    sumaTrans += b.trans;
    if (b.p.lados) { sumaTrans += T_LADO; holds += 2; } else holds += 1;
  });
  // Todas las posturas duran lo mismo (con 1 s de diferencia como mucho). El sobrante se reparte entre ellas
  // para que la suma cuadre exacta y la relajación final se quede en su duración fija.
  const base = total - INTRO - CIERRE_MIN - sumaTrans;
  // Tope por postura (HOLD_MAX): si aun así sobrara tiempo, se queda en la relajación final.
  let h = Math.floor(base / holds), resto = 0;
  if (h >= HOLD_MAX) h = HOLD_MAX;
  else { h = Math.max(30, h); resto = Math.max(0, base - h * holds); }
  const extra = Math.floor(resto / holds), conUno = resto % holds;
  let k = 0;
  const durHold = () => h + extra + (k++ < conUno ? 1 : 0);

  const pasos = [{ tipo: 'respira', dur: INTRO, bloque: -1 }];
  bloques.forEach((b, i) => {
    pasos.push({ tipo: 'prepara', dur: b.trans, bloque: i, p: b.p, lado: 0 });
    if (b.p.lados) {
      pasos.push({ tipo: 'postura', dur: durHold(), bloque: i, p: b.p, lado: 0 });
      pasos.push({ tipo: 'cambio', dur: T_LADO, bloque: i, p: b.p, lado: 1 });
      pasos.push({ tipo: 'postura', dur: durHold(), bloque: i, p: b.p, lado: 1 });
    } else {
      pasos.push({ tipo: 'postura', dur: durHold(), bloque: i, p: b.p, lado: null });
    }
  });
  const cierre = total - pasos.reduce((x, s) => x + s.dur, 0);
  pasos.push({ tipo: 'cierre', dur: cierre, bloque: bloques.length });

  const prefijo = []; let acc = 0;
  pasos.forEach(s => { prefijo.push(acc); acc += s.dur; });
  const hold = Math.round((h + resto / holds) / 5) * 5;                   // solo para mostrarlo: "unos 1 min"
  return { pasos, bloques, hold, cierre, total: acc, prefijo, minutos: a.minutos, deOtras: bloques.filter(b => b.extra).length };
}

let sesionActual = construirSesion(ajustes);
const rehacer = () => { sesionActual = construirSesion(ajustes); };

/* ---------- pantallas ---------- */
const PANTALLAS = ['home', 'preview', 'session', 'fin'];
function mostrar(id) {
  PANTALLAS.forEach(p => { const e = $('#' + p); if (e) e.hidden = (p !== id); });
  window.scrollTo(0, 0);
}

/* ---------- inicio ---------- */
function semana() {
  const lim = Date.now() - 7 * 864e5;
  return leer('estira.historial', []).filter(t => t > lim).length;
}

function pintarInicio() {
  const n = semana();
  $('#subtitulo').textContent = n > 0
    ? `Esta semana llevas ${n} ${n === 1 ? 'sesión' : 'sesiones'}. Qué bien te estás cuidando.`
    : 'Estiramientos guiados para soltar tensión.';

  $('#zonas').innerHTML = ZONAS.map(z => {
    const cuantas = POSTURAS.filter(p => p.zona === z.id).length;
    return `<button class="zona" data-z="${z.id}" aria-pressed="${ajustes.zonas.includes(z.id)}">
      <span class="tick">✓</span><b>${z.nombre}</b><small>${cuantas} posturas</small></button>`;
  }).join('');
  $('#duracion').innerHTML = DURACIONES.map(m =>
    `<button class="chip" data-m="${m}" aria-pressed="${ajustes.minutos === m}">${m} min</button>`).join('');
  $('#volumen').value = ajustes.volumen;
  $('#campanas').setAttribute('aria-pressed', String(ajustes.campanas));
  pintarResumen();
  pintarMusica();
}

/* ---------- mi música (canciones guardadas en este dispositivo) ---------- */
const mb = bytes => bytes >= 1048576 ? (bytes / 1048576).toLocaleString('es-ES', { maximumFractionDigits: 1 }) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let escuchando = null;                                                   // id de la canción que suena en la lista
Sonido.alParar = () => { if (escuchando !== null) { escuchando = null; pintarMusica(); } };   // la prueba se apagó sola

async function pintarMusica() {
  const caja = $('#musica');
  if (!Musica.soportado()) { caja.innerHTML = '<p class="nota">Este navegador no permite guardar música en el dispositivo.</p>'; return; }
  let lista = [];
  try { lista = await Musica.lista(); } catch (e) { caja.innerHTML = '<p class="nota">No se pudo abrir tu música. Prueba a cerrar y abrir la app.</p>'; return; }
  pintarRecomendada(lista);
  if (!lista.length) {
    caja.innerHTML = '<p class="vacio">Aún no tienes música. Añade la recomendada de aquí abajo, o tus propias canciones con «Añadir mis canciones». Se guardan solo en este dispositivo.</p>';
    return;
  }
  caja.innerHTML = lista.map(m => `<div class="pista" data-id="${m.id}">
      <button class="pista-on" aria-pressed="${m.activa}" aria-label="Incluir «${esc(m.nombre)}» en las sesiones"><span>✓</span></button>
      <div class="pista-n"><b>${esc(m.nombre)}</b><small>${mb(m.tam)}${m.activa ? '' : ' · no se usa'}</small></div>
      <button class="pista-play" aria-label="Escuchar «${esc(m.nombre)}»">${escuchando === m.id ? '■' : '▶'}</button>
      <button class="pista-x" aria-label="Quitar «${esc(m.nombre)}»">✕</button>
    </div>`).join('');
}
// Música relajante con licencia libre que viene con la app: se descarga una vez y se guarda en el dispositivo.
const packsAbiertos = new Set();
const durac = seg => seg >= 3600 ? `${Math.floor(seg / 3600)} h ${Math.round(seg % 3600 / 60)} min` : `${Math.round(seg / 60)} min`;
function pintarRecomendada(lista) {
  const hechas = new Set(lista.map(m => m.origen).filter(Boolean));
  const caja = $('#musica-reco');
  const credito = `<p class="nota">${CREDITO_MUSICA}</p>`;
  const tarjetas = Object.keys(PACKS_MUSICA).map(id => {
    const faltan = MUSICA_INCLUIDA.filter(m => (m.grupo || 'suave') === id && !hechas.has(m.archivo));
    if (!faltan.length) return '';
    const pack = PACKS_MUSICA[id];
    const tam = faltan.reduce((n, m) => n + m.bytes, 0), seg = faltan.reduce((n, m) => n + m.seg, 0);
    const piezas = faltan.map(m => `<li><span><b>${m.titulo}</b><small>${durac(m.seg)} · ${mb(m.bytes)}</small></span>
        <button class="pieza-mas" data-pieza="${m.archivo}" type="button" aria-label="Añadir ${m.titulo}">+</button></li>`).join('');
    return `<div class="reco">
      <b>${pack.nombre}</b>
      <p>${pack.texto} ${faltan.length} ${faltan.length === 1 ? 'pieza' : 'piezas'}, ${durac(seg)}. Hace falta internet una sola vez; después suenan sin conexión.</p>
      <button class="btn primary" data-pack="${id}" type="button">Añadir todo el pack · ${mb(tam)}</button>
      <details data-det="${id}"${packsAbiertos.has(id) ? ' open' : ''}><summary>O elige solo algunas piezas</summary><ul class="piezas">${piezas}</ul></details>
      <p class="nota" data-estado="${id}" aria-live="polite"></p>
    </div>`;
  }).join('');
  caja.innerHTML = tarjetas + (tarjetas || lista.some(m => m.origen) ? credito : '');
}
let descargando = false;
async function bajarPiezas(pack, filtro) {
  if (descargando) return;
  descargando = true;
  const estado = () => $(`#musica-reco [data-estado="${pack}"]`);
  document.querySelectorAll('#musica-reco button').forEach(b => { b.disabled = true; });
  const hechas = new Set((await Musica.lista()).map(m => m.origen).filter(Boolean));
  const faltan = MUSICA_INCLUIDA.filter(m => (m.grupo || 'suave') === pack && !hechas.has(m.archivo) && filtro(m));
  let n = 0;
  for (const m of faltan) {
    if (estado()) estado().textContent = `Descargando ${n + 1} de ${faltan.length}: ${m.titulo} (${mb(m.bytes)})…`;
    try {
      const r = await fetch(m.archivo);
      if (!r.ok) throw new Error('http ' + r.status);
      await Musica.anadirBlob(await r.blob(), m.titulo, m.archivo);
      n++;
    } catch (e) {
      descargando = false; await pintarMusica();
      if (estado()) estado().textContent = `No se pudo descargar «${m.titulo}». Revisa la conexión y vuelve a probar.`;
      return;
    }
  }
  descargando = false;
  await pintarMusica();
  $('#musica-estado').textContent = `Añadidas ${n} ${n === 1 ? 'pieza' : 'piezas'} de música relajante.`;
}
$('#musica-reco').addEventListener('click', e => {
  const p = e.target.closest('[data-pieza]'), b = e.target.closest('[data-pack]');
  if (p) bajarPiezas(p.closest('[data-det]').dataset.det, m => m.archivo === p.dataset.pieza);
  else if (b) bajarPiezas(b.dataset.pack, () => true);
});
$('#musica-reco').addEventListener('toggle', e => {
  const d = e.target.closest && e.target.closest('[data-det]');
  if (d) d.open ? packsAbiertos.add(d.dataset.det) : packsAbiertos.delete(d.dataset.det);
}, true);
$('#musica-anadir').addEventListener('click', () => $('#musica-archivo').click());
$('#musica-archivo').addEventListener('change', async e => {
  const archivos = [...e.target.files]; e.target.value = '';
  if (!archivos.length) return;
  $('#musica-estado').textContent = 'Guardando…';
  try {
    const n = await Musica.anadir(archivos);
    $('#musica-estado').textContent = n ? `Añadidas ${n} ${n === 1 ? 'canción' : 'canciones'}.` : 'Esos archivos no parecen audio (prueba con mp3 o m4a).';
  } catch (err) { $('#musica-estado').textContent = 'No se pudo guardar (¿falta espacio en el dispositivo?).'; }
  pintarMusica();
});
$('#musica').addEventListener('click', async e => {
  const fila = e.target.closest('.pista'); if (!fila) return;
  const id = Number(fila.dataset.id);
  if (e.target.closest('.pista-on')) { Musica.incluir(id, fila.querySelector('.pista-on').getAttribute('aria-pressed') !== 'true'); pintarMusica(); }
  else if (e.target.closest('.pista-x')) {
    if (!e.target.dataset.seguro) { e.target.dataset.seguro = '1'; e.target.textContent = '¿Quitar?'; e.target.classList.add('seguro'); return; }
    if (escuchando === id) { Sonido.pararPrueba(); escuchando = null; }
    await Musica.borrar(id); pintarMusica();
  } else if (e.target.closest('.pista-play')) {
    if (escuchando === id) { Sonido.pararPrueba(); escuchando = null; } else { escuchando = id; Sonido.probar(id, ajustes.volumen / 100); }
    pintarMusica();
  }
});

function pintarResumen() {
  const s = sesionActual;
  $('#resumen').innerHTML = `<b>${s.minutos} min</b> · ${s.bloques.length} posturas · unos ${fmtHold(s.hold)} cada una`;
  $('#nota-dur').textContent = `Cada postura se mantiene unos ${fmtHold(s.hold)}, sin prisas. Las de un solo lado se hacen en los dos lados.`
    + (s.deOtras ? ` Para llenar el tiempo se añaden ${s.deOtras} ${s.deOtras === 1 ? 'postura' : 'posturas'} de otras zonas.` : '');
}

$('#zonas').addEventListener('click', e => {
  const b = e.target.closest('.zona'); if (!b) return;
  const z = b.dataset.z, i = ajustes.zonas.indexOf(z);
  if (i >= 0) { if (ajustes.zonas.length === 1) return; ajustes.zonas.splice(i, 1); } else ajustes.zonas.push(z);
  ajustes.zonas = ZONAS.map(x => x.id).filter(id => ajustes.zonas.includes(id));
  guardar(); rehacer(); pintarInicio();
});
$('#duracion').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  ajustes.minutos = Number(b.dataset.m); guardar(); rehacer(); pintarInicio();
});
$('#volumen').addEventListener('input', e => { ajustes.volumen = Number(e.target.value); guardar(); Sonido.volumen(ajustes.volumen / 100); });
$('#campanas').addEventListener('click', () => {
  ajustes.campanas = !ajustes.campanas; guardar(); Sonido.campanas(ajustes.campanas);
  $('#campanas').setAttribute('aria-pressed', String(ajustes.campanas));
});

/* ---------- vista previa ---------- */
function pintarPrevia() {
  const s = sesionActual;
  $('#prev-sub').textContent = `${s.minutos} minutos · ${s.bloques.length} posturas · ${s.pasos.filter(x => x.tipo === 'postura').length} tiempos de ${fmtHold(s.hold)}`;
  const filas = [`<li class="extra"><span class="n">~</span><div><b>Respiración inicial</b><small>Inhala 4 · exhala 6</small></div><span class="t">${fmt(INTRO)}</span></li>`];
  s.bloques.forEach((b, i) => {
    const dosLados = !!b.p.lados;
    const dur = s.pasos.filter(x => x.tipo === 'postura' && x.bloque === i).reduce((a, x) => a + x.dur, 0);
    filas.push(`<li><span class="n">${i + 1}</span><div><b>${b.p.nombre}</b>
      <small>${zonaDe(b.p.zona).corto}${dosLados ? ' · cada lado' : ''}${b.extra ? ' · para completar' : ''}</small></div>
      <span class="t">${fmt(dur)}</span></li>`);
  });
  filas.push(`<li class="extra"><span class="n">☾</span><div><b>Relajación final</b><small>Respira y suelta el cuerpo</small></div><span class="t">${fmt(s.cierre)}</span></li>`);
  $('#lista').innerHTML = filas.join('');
}
$('#ver').addEventListener('click', () => { pintarPrevia(); mostrar('preview'); });
$('#atras').addEventListener('click', () => { pintarInicio(); mostrar('home'); });
$('#otra').addEventListener('click', () => { rehacer(); pintarPrevia(); });

/* ---------- pantalla encendida durante la sesión ---------- */
let wl = null;
async function pedirPantalla() {
  try {
    if ('wakeLock' in navigator && !wl) {
      wl = await navigator.wakeLock.request('screen');
      wl.addEventListener('release', () => { wl = null; });
    }
  } catch (e) { wl = null; }
}
function soltarPantalla() { try { if (wl) wl.release(); } catch (e) {} wl = null; }

/* ---------- sesión en marcha ---------- */
let S = null;
const durMs = paso => paso.dur * 1000 / ESC;
const transcurrido = () => (S.pausa || Date.now()) - S.t0;
const CIRC = 2 * Math.PI * 54;

const TEXTO_RESPIRA = 'Inhala por la nariz contando cuatro y suelta el aire despacio contando seis. Deja caer los hombros y la mandíbula.';
const TEXTO_CIERRE = 'Quédate quieto, cierra los ojos y respira con calma. Siente el cuerpo más suelto y pesado.';

function empezar() {
  if (S) return;
  const ses = sesionActual;
  // Se apuntan las posturas de hoy para que la próxima sesión use otras, y se prepara ya la siguiente.
  const usos = leer('estira.usos', {}), hoy = Date.now();
  ses.bloques.forEach(b => { usos[b.p.id] = hoy; });
  escribir('estira.usos', usos);
  rehacer();
  S = { ses, pasos: ses.pasos, i: 0, t0: Date.now(), pausa: null, timer: null, ultimaEtiqueta: '' };
  mostrar('session');
  escuchando = null;
  Sonido.iniciar({ volumen: ajustes.volumen / 100, campanas: ajustes.campanas });
  pedirPantalla();
  entrarPaso(0);
  S.timer = setInterval(tick, 200);
}

function entrarPaso(i) {
  S.i = i; S.ultimaEtiqueta = '';
  const paso = S.pasos[i], p = paso.p;
  const respira = paso.tipo === 'respira' || paso.tipo === 'cierre';

  // figura
  const f = $('#figura'); f.className = 'figura'; f.innerHTML = '';
  if (respira) {
    f.classList.add('resp-card');
    f.innerHTML = '<div class="resp"></div><div class="resp-txt" id="resp-txt">Inhala</div>';
    if (S.pausa) f.firstChild.style.animationPlayState = 'paused';
  } else {
    if (paso.lado === 1) f.classList.add('espejo');
    const img = new Image(); img.alt = p.nombre; img.decoding = 'async';
    img.onerror = () => { f.classList.remove('espejo'); f.innerHTML = `<div class="vacio">${zonaDe(p.zona).icono}</div>`; };
    img.src = p.img; f.appendChild(img);
    // precarga la siguiente
    const sig = S.pasos.slice(i + 1).find(x => x.p && x.p !== p);
    if (sig) { const pre = new Image(); pre.src = sig.p.img; }
  }

  // textos
  const fase = { respira: 'Respira', prepara: 'Prepárate', postura: 'Mantén y respira', cambio: 'Cambia de lado', cierre: 'Relajación final' }[paso.tipo];
  $('#fase').textContent = fase;
  $('#nombre').textContent = respira ? (paso.tipo === 'respira' ? 'Llega con calma' : 'Quédate así') : p.nombre;
  $('#texto').textContent = respira ? (paso.tipo === 'respira' ? TEXTO_RESPIRA : TEXTO_CIERRE) : p.texto;
  const lado = $('#lado');
  if (!respira && p.lados && paso.lado !== null) { lado.hidden = false; lado.textContent = p.lados[paso.lado]; } else lado.hidden = true;

  // campanas
  if (paso.tipo === 'prepara') Sonido.campana('prepara');
  else if (paso.tipo === 'postura' && paso.lado !== 1) Sonido.campana('postura');
  else if (paso.tipo === 'cambio') Sonido.campana('lado');
  else if (paso.tipo === 'cierre') Sonido.campana('postura');

  pintarTiempo(0);
}

function pintarTiempo(ms) {
  const paso = S.pasos[S.i], dur = durMs(paso);
  const resta = Math.max(0, dur - ms);
  $('#tiempo').textContent = fmt(Math.ceil(resta * ESC / 1000));
  $('#avance').style.strokeDashoffset = String(CIRC * Math.min(1, ms / dur));

  const hecho = S.ses.prefijo[S.i] + Math.min(paso.dur, ms * ESC / 1000);
  $('#prog').style.width = (100 * hecho / S.ses.total) + '%';
  const total = S.ses.bloques.length;
  const donde = paso.bloque < 0 ? 'Inicio' : paso.bloque >= total ? 'Final' : `Postura ${paso.bloque + 1} de ${total}`;
  const etiqueta = `<b>${donde}</b> · quedan ${fmt(S.ses.total - hecho)}`;
  if (etiqueta !== S.ultimaEtiqueta) { S.ultimaEtiqueta = etiqueta; $('#meta').innerHTML = etiqueta; }

  const t = $('#resp-txt');
  if (t) { const c = (ms * ESC / 1000) % 10; const v = c < 4 ? 'Inhala' : 'Exhala'; if (t.textContent !== v) t.textContent = v; }
}

function tick() {
  if (!S || S.pausa) return;
  const ahora = Date.now();
  let i = S.i, t0 = S.t0, cambio = false;
  while (ahora - t0 >= durMs(S.pasos[i])) {         // si el móvil estuvo dormido, se pone al día de una vez
    t0 += durMs(S.pasos[i]);
    if (i === S.pasos.length - 1) { S.t0 = t0; terminar(true); return; }
    i++; cambio = true;
  }
  if (cambio) { S.t0 = t0; entrarPaso(i); }
  pintarTiempo(ahora - S.t0);
}

function alternarPausa() {
  if (!S) return;
  const b = $('#pausa'), resp = $('#figura .resp');
  if (!S.pausa) {
    S.pausa = Date.now(); Sonido.bajar(true);
    b.textContent = '▶'; b.setAttribute('aria-label', 'Reanudar');
    if (resp) resp.style.animationPlayState = 'paused';
  } else {
    S.t0 += Date.now() - S.pausa; S.pausa = null; Sonido.bajar(false);
    b.textContent = '❚❚'; b.setAttribute('aria-label', 'Pausar');
    if (resp) resp.style.animationPlayState = 'running';
    pedirPantalla();
  }
}

function saltar(dir) {
  if (!S) return;
  const ahora = S.pausa || Date.now();
  if (dir > 0) {
    if (S.i === S.pasos.length - 1) { terminar(true); return; }
    S.t0 = ahora; entrarPaso(S.i + 1);
  } else {
    const retroceso = transcurrido() > 3000 / ESC || S.i === 0;
    S.t0 = ahora; entrarPaso(retroceso ? S.i : S.i - 1);
  }
}

function terminar(completa) {
  if (!S) return;
  clearInterval(S.timer); soltarPantalla();
  const ses = S.ses; S = null;
  $('#pausa').textContent = '❚❚'; $('#pausa').setAttribute('aria-label', 'Pausar');
  $('#velo').hidden = true;
  if (completa) {
    const h = leer('estira.historial', []); h.push(Date.now()); escribir('estira.historial', h.slice(-200));
    Sonido.campana('fin'); setTimeout(() => Sonido.parar(8), 3500);
    $('#fin-txt').textContent = `${ses.bloques.length} posturas en ${ses.minutos} minutos. Tómate un momento antes de levantarte.`;
    mostrar('fin');
  } else {
    Sonido.parar(2); pintarInicio(); mostrar('home');
  }
}

$('#empezar').addEventListener('click', empezar);
$('#empezar2').addEventListener('click', empezar);
$('#pausa').addEventListener('click', alternarPausa);
$('#next').addEventListener('click', () => saltar(1));
$('#prev').addEventListener('click', () => saltar(-1));
$('#salir').addEventListener('click', () => { $('#velo').hidden = false; $('#velo-seguir').focus(); });
$('#velo-seguir').addEventListener('click', () => { $('#velo').hidden = true; });
$('#velo-fin').addEventListener('click', () => terminar(false));
$('#repetir').addEventListener('click', () => { rehacer(); empezar(); });
$('#inicio').addEventListener('click', () => { pintarInicio(); mostrar('home'); });

// En el ordenador: espacio pausa, flechas saltan, Esc pregunta si salir.
document.addEventListener('keydown', e => {
  if (!S) return;
  if (e.key === ' ' || e.key === 'k') { e.preventDefault(); alternarPausa(); }
  else if (e.key === 'ArrowRight') saltar(1);
  else if (e.key === 'ArrowLeft') saltar(-1);
  else if (e.key === 'Escape') { $('#velo').hidden = !$('#velo').hidden; }
});

// Al volver a la app (por ejemplo tras bloquear el móvil) recupera pantalla, sonido y tiempo.
document.addEventListener('visibilitychange', () => {
  if (document.hidden || !S) return;
  pedirPantalla(); Sonido.despertar(); tick();
});

/* ---------- arranque ---------- */
pintarInicio();
mostrar('home');
window.Estira = { sesion: () => sesionActual, estado: () => S, construirSesion, ajustes: () => ajustes, pintarMusica };

// El modo sin conexión se registra desde registro-sw.js (lo carga estira.html).
})();
