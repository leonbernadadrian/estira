const DAYS = [
  { n: 1, c: "var(--d1)", title: "Pecho y tríceps", note: "11 series de pecho · 5 de tríceps más lo que trabaja en los press", ex: [
    ["press-inclinado", "Press inclinado con mancuernas", "Banco a 30°", "3 × 6–10", "Va primero para cargar la parte alta del pecho, la que más cuesta desarrollar."],
    ["press-banca", "Press de banca", "Con barra o en máquina", "3 × 6–10", "El ejercicio básico del pecho. Baja hasta tocar el pecho, con el músculo estirado."],
    ["aperturas-polea", "Aperturas en polea", "O contractor (pec deck): asiento en el número 5, donde más lo notas", "3 × 10–15", "Mantiene la tensión cuando el pecho está más estirado, que es donde más hace crecer."],
    ["press-declinado", "Press declinado o press en máquina de pecho", "Agarre a la anchura de los hombros, baja controlado", "2 × 8–12", "Trabaja la parte baja del pecho y el tríceps."],
    ["triceps-cabeza", "Extensión de tríceps sobre la cabeza", "En polea de espaldas a la máquina, o con una mancuerna sentado en banco con respaldo", "3 × 10–15", "Hizo crecer el tríceps alrededor de un 40 % más que la extensión hacia abajo (estudio de Maeo, 2022)."],
    ["fondos-maquina", "Fondos en máquina", "Espalda recta, baja hasta que el codo pase de 90°", "2 × 8–12", "Ejercicio pesado para las cabezas lateral y media del tríceps; la extensión de arriba ya se ocupa de la cabeza larga."],
  ]},
  { n: 2, c: "var(--d2)", title: "Espalda y bíceps", note: "10 series de espalda · 5 de bíceps más lo que trabaja en los remos", ex: [
    ["dominadas", "Dominadas o jalón al pecho", "Agarre algo más ancho que los hombros", "3 × 6–10", "Trabajan el dorsal muy estirado arriba. Si no llegas a 6 dominadas, usa el jalón."],
    ["remo-apoyo", "Remo en T con discos", "Apunta solo los kilos de los discos. Si la máquina tiene apoyo para el pecho, úsalo", "3 × 8–12", "Da grosor a la parte media de la espalda y deja cargar bastante peso."],
    ["remo-polea", "Remo en polea baja sentado", "Agarre cerrado (triángulo), codos pegados al cuerpo", "2 × 10–12", "Lleva los codos hacia la cadera para cargar el dorsal, con mucho estiramiento al ir hacia delante."],
    ["jalon-unilateral", "Jalón a una mano en polea alta", "Sentado o de rodillas, con un estribo; los kg son de un brazo", "2 × 10–12", "Estira mucho el dorsal, como el pullover, pero sin que tire el tríceps: aquí ayuda el bíceps."],
    ["curl-predicador", "Curl predicador", "Con barra Z o máquina", "3 × 8–12", "La parte baja es la más dura y en estudios fue el curl que más hizo crecer."],
    ["curl-inclinado", "Curl inclinado con mancuernas", "Banco a unos 45°", "2 × 10–12", "Estira la cabeza larga del bíceps al tener el brazo por detrás del cuerpo."],
  ]},
  { n: 3, c: "var(--d3)", title: "Pierna", note: "8 series de cuádriceps · 6 de femoral · 3 de gemelo", ex: [
    ["sentadilla", "Sentadilla", "Con barra o hack squat; baja hasta por debajo del paralelo", "3 × 6–10", "En estudios, bajar más hizo crecer más el cuádriceps y el glúteo."],
    ["rumano", "Peso muerto rumano", "Rodillas algo flexionadas y espalda neutra", "3 × 8–10", "Trabaja femoral y glúteo muy estirados."],
    ["prensa", "Prensa", "Pies a la anchura de los hombros", "2 × 10–12", "Suma trabajo de cuádriceps sin cargar la espalda."],
    ["curl-femoral-sentado", "Curl femoral sentado", "Inclínate un poco hacia delante", "3 × 10–12", "Hizo crecer el femoral más que el curl tumbado (estudio de Maeo, 2021)."],
    ["extension-cuadriceps", "Extensión de cuádriceps", "Pausa de 1 segundo arriba", "3 × 12–15", "La única forma de trabajar bien el recto femoral, la parte del cuádriceps que las sentadillas apenas trabajan."],
    ["gemelos", "Gemelos de pie", "Pausa de 2 segundos abajo, estirado", "3 × 10–15", "El gemelo responde mejor cuando trabaja en la parte baja, estirado."],
  ]},
  { n: 4, c: "var(--d4)", title: "Hombro y abdominales", note: "9 series de hombro · 6 de abdominales · extra de brazos opcional", ex: [
    ["press-militar", "Press militar con mancuernas sentado", "Banco a 80–90°", "3 × 6–10", "Base para el deltoides anterior y lateral."],
    ["laterales-polea", "Elevaciones laterales en polea", "Polea baja, un brazo cada vez, por detrás del cuerpo", "4 × 12–20", "La polea mantiene la tensión abajo; con mancuerna la parte baja casi no pesa."],
    ["pajaro", "Pec deck invertido (posterior)", "Sentado de cara al respaldo, brazos casi rectos, abre hasta la línea de los hombros", "2 × 12–15", "Completa el hombro por detrás y ayuda a la postura."],
    ["crunch-maquina", "Crunch abdominal en máquina", "Ajusta el asiento para que el eje de giro quede a la altura del ombligo", "3 × 10–15", "Permite cargar peso con el cuerpo apoyado, sin colgarte ni tirar del hombro."],
    ["crunch-inverso", "Elevación de piernas en el suelo (crunch inverso)", "Tumbado, rodillas dobladas a 90°; sube la pelvis, no balancees las piernas", "3 × 10–15", "Trabaja la parte baja del abdomen sin cargar el hombro, y complementa la máquina, que trabaja la parte alta."],
  ], extra: "<b>Extra de brazos (opcional, 10 min):</b> 2 series de curl con mancuernas y 2 de extensión de tríceps sobre la cabeza. Así entrenas los brazos dos veces por semana, que suele funcionar mejor que una." },
];

const $ = (id) => document.getElementById(id);
const TABS = [...DAYS];
const NOMBRE = Object.fromEntries([["pullover", { name: "Pullover en polea", dia: 2 }], ...DAYS.flatMap(d => d.ex.map(e => [e[0], { name: e[1], dia: d.n }]))]);
const HIST = TABS.length; // índice de la pestaña Historial
const MED = HIST + 1;  // vista Perfil (botón de arriba a la derecha)
let perfil = {}; let docPerfil = null;
let medidas = []; // {id: fecha, fecha, peso, cintura, brazo}
let storeMed = null;
let sesiones = []; let storeSes = null; let sesionesCargadas = false; let eligioTab = false; let aviso = ""; // {id, fecha, dia, titulo, inicio, fin, ejercicios, series, volumen, records:[{nombre, e1rm, antes}]}
let current = 0;
let historial = [];   // {id, ej, texto, fecha: "YYYY-MM-DD", ts}
let abiertos = new Set();
let modo = "series";
try { if (localStorage.getItem("rutina-modo") === "texto") modo = "texto"; } catch {}
function pintarModo() {
  $("modo-series").setAttribute("aria-pressed", modo === "series");
  $("modo-texto").setAttribute("aria-pressed", modo === "texto");
}
["series", "texto"].forEach(m => $("modo-" + m).addEventListener("click", () => {
  modo = m; try { localStorage.setItem("rutina-modo", m); } catch {}
  pintarModo(); render();
}));
pintarModo();
let store = null;


function esc(s) { return String(s ?? "").replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]); }
const isoHoy = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const fmtFecha = (iso, largo) => new Date(iso + "T12:00:00").toLocaleDateString("es-ES", largo ? { weekday: "long", day: "numeric", month: "long" } : { day: "numeric", month: "short", year: "2-digit" }).replace(".", "");
const deEjercicio = (id) => historial.filter(h => h.ej === id).sort((a, b) => b.ts - a.ts);

function renderTabs() {
  const tabs = TABS.map((d, i) => `<button class="tab" role="tab" id="tab-${i}" aria-selected="${i === current}" style="--c:${d.c}"><small>${typeof d.n === "number" ? "DÍA " + d.n : "HOY"}</small><span>${d.title}</span></button>`);
  tabs.push(`<button class="tab" role="tab" id="tab-${HIST}" aria-selected="${current === HIST}" style="--c:var(--accent)"><small>${historial.length} ANOTACIONES</small><span>Historial</span></button>`);
  $("tabs").innerHTML = tabs.join("");
  for (let i = 0; i <= HIST; i++) $("tab-" + i).addEventListener("click", () => { current = i; eligioTab = true; aviso = ""; try { localStorage.setItem("rutina-dia", i); } catch {} render(); });
}

function filaHist(h, conEjercicio) {
  return `<li><span class="d">${fmtFecha(h.fecha)}</span><span>${conEjercicio ? `<b>${esc(NOMBRE[h.ej]?.name || h.ej)}</b> · ` : ""}${esc(h.texto)}</span><button class="x" data-del="${h.id}" aria-label="Borrar anotación">Borrar</button></li>`;
}

function renderDay() {
  const d = TABS[current];
  const plan = planDia(d);
  const primeraGrande = plan.ex.find(e => GRANDES.has(e[0]))?.[0];
  const main = $("day");
  main.style.setProperty("--c", d.c);
  main.innerHTML = `${aviso ? `<div class="aviso">${aviso}</div>` : ""}<div class="day-title"><h2>${typeof d.n === "number" ? "Día " + d.n : "Hoy"} · ${d.title}</h2><p>${d.note}</p></div>
    ${bloqueTiempo(d, plan)}
    <ol class="ex">${plan.ex.map(([id, name, alt, dose, why]) => {
      const h = deEjercicio(id);
      const hoyE = h.find(x => x.fecha === isoHoy() && x.porSerie && !cerrada(x));
      const hechas = hoyE?.series || [];
      const ultimo = h.find(x => x !== hoyE);
      const total = Math.max(plan.series[id], hechas.length);
      const registradoHoy = h.some(x => x.fecha === isoHoy() && !cerrada(x));
      const sug = !hechas.length && !registradoHoy ? sugerencia(id, dose, ultimo) : null;
      const quedan = Array.from({ length: total - hechas.length }, (_, j) => hechas.length + j);
      return `<li>
      <div class="name">${name}</div>
      <button type="button" class="info-btn" data-info="${id}" aria-label="Cómo se hace: ${esc(name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="11" y="10" width="2" height="7" rx="1" fill="currentColor"/><circle cx="12" cy="7" r="1.3" fill="currentColor"/></svg></button>
      <div class="dose">${total === numSeries(dose) ? dose : `${total} ×${dose.split("×")[1]}<s>${numSeries(dose)}</s>`}<small>series × reps</small></div>
      <div class="alt">${alt}</div>
      <div class="why">${why}</div>
      ${sug ? bloqueSugerencia(sug) : ""}
      ${GRANDES.has(id) && !hechas.length ? calentamiento(id, id === primeraGrande, ultimo, sug?.sube ? sug.kg : null) : ""}
      <form class="log" data-id="${id}">
        ${modo === "texto" ? `<div class="log-actions">
          <input class="texto" aria-label="Lo que has hecho hoy" placeholder="${ultimo ? "Última vez: " + esc(ultimo.texto) : "Ej. 22,5 kg × 10, 9, 8"}" maxlength="80">
        </div>` : `
          ${hechas.length ? `<div class="hechas"><span class="ok">✓ Hoy: ${esc(resumen(hechas))}</span><button type="button" class="hist-toggle" data-undo="${id}">Deshacer última</button></div>` : ""}
          ${quedan.length ? `<div class="sets${SIN_PESO.has(id) ? " sin-kg" : ""}">
          <span class="sh"></span>${SIN_PESO.has(id) ? "" : `<span class="sh">Kg</span>`}<span class="sh">Reps</span><span class="sh">Última vez</span><span class="sh"></span>
          ${quedan.map(k => {
            const prev = ultimo?.series?.[k];
            const kgDef = hechas.length ? hechas[hechas.length - 1].kg : prev?.kg ?? "";
            return `<span class="sn">${k + 1}</span>
            ${SIN_PESO.has(id) ? "" : `<input inputmode="decimal" aria-label="Serie ${k + 1}, kilos" data-k="${k}" data-f="kg" value="${esc(kgDef)}" placeholder="kg">`}
            <input inputmode="numeric" aria-label="Serie ${k + 1}, repeticiones" data-k="${k}" data-f="reps" placeholder="${esc(prev?.reps ?? "reps")}">
            <span class="prev">${prev ? (sinKg(prev) ? esc(prev.reps) + " reps" : esc(prev.kg) + " kg × " + esc(prev.reps)) : ""}</span>
            <button type="button" class="set-ok" data-save="${k}" aria-label="Guardar serie ${k + 1}">✓</button>`; }).join("")}
          </div>` : `<div class="hechas"><span class="ok">Ejercicio completado</span><button type="button" class="hist-toggle" data-mas="${id}">+ Añadir otra serie</button></div>`}`}
        <div class="log-actions">
          ${modo === "texto" ? `<button class="save" type="submit">Guardar</button>` : ""}
          ${h.length ? `<button type="button" class="hist-toggle" data-toggle="${id}">${abiertos.has(id) ? "Ocultar" : "Ver"} historial (${h.length})</button>` : ""}
          ${ultimo && !ultimo.series ? `<span class="prev">Última vez: ${esc(ultimo.texto)}</span>` : ""}
        </div>
      </form>
      <div class="ajuste"><span>Solo hoy:</span>
        ${modo === "series" ? `<button type="button" data-serie-menos="${id}" aria-label="Quitar una serie de ${esc(name)}"${total > Math.max(hechas.length, 1) ? "" : " disabled"}>− serie</button><button type="button" data-serie-mas="${id}" aria-label="Añadir una serie a ${esc(name)}">+ serie</button>` : ""}
        ${registradoHoy ? "" : `<button type="button" class="quitar" data-quitar="${id}" aria-label="Quitar ${esc(name)} de hoy">Quitar ejercicio</button>`}
      </div>
      ${h.length && abiertos.has(id) ? `<ul class="hist">${h.map(x => filaHist(x, false)).join("")}</ul>` : ""}
    </li>`; }).join("")}</ol>
    ${bloqueAjustes(d, plan)}
    ${d.extra && !tiempo ? `<div class="extra">${d.extra}</div>` : ""}
    ${zonaFinal(d)}`;
  main.querySelectorAll("[data-tiempo]").forEach(b => b.addEventListener("click", () => {
    tiempo = Number(b.dataset.tiempo);
    guardarTiempo();
    renderDay();
  }));
  main.querySelectorAll("[data-anadir]").forEach(b => b.addEventListener("click", () => {
    anadidos = [...new Set([...anadidos, b.dataset.anadir])];
    guardarTiempo();
    renderDay();
  }));
  main.querySelectorAll("[data-info]").forEach(b => b.addEventListener("click", () => abrirInfo(b.dataset.info)));
  main.querySelectorAll("[data-save]").forEach(b => b.addEventListener("click", () => {
    const f = b.closest("form"), k = b.dataset.save;
    const kgI = f.querySelector(`input[data-f="kg"][data-k="${k}"]`), repsI = f.querySelector(`input[data-f="reps"][data-k="${k}"]`);
    const reps = repsI.value.trim();
    if (!reps) { repsI.focus(); return; }
    guardarSerie(f.dataset.id, { kg: kgI ? kgI.value.trim().replace(".", ",") || "0" : "", reps: Number(reps) || reps }, Number(k) + 1);
  }));
  main.querySelectorAll('input[data-f="reps"]').forEach(r => r.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); r.closest("form").querySelector(`[data-save="${r.dataset.k}"]`)?.click(); }
  }));
  main.querySelectorAll("[data-usar]").forEach(b => b.addEventListener("click", () => {
    b.closest("li").querySelectorAll('input[data-f="kg"]').forEach(i => { i.value = b.dataset.kg; });
    b.textContent = "✓ Puesto"; b.disabled = true;
  }));
  main.querySelectorAll("[data-undo]").forEach(b => b.addEventListener("click", () => deshacerSerie(b.dataset.undo)));
  main.querySelectorAll("[data-mas]").forEach(b => b.addEventListener("click", () => cambiarSeries(d, b.dataset.mas, 1)));
  main.querySelectorAll("[data-serie-mas]").forEach(b => b.addEventListener("click", () => cambiarSeries(d, b.dataset.serieMas, 1)));
  main.querySelectorAll("[data-serie-menos]").forEach(b => b.addEventListener("click", () => cambiarSeries(d, b.dataset.serieMenos, -1)));
  main.querySelectorAll("[data-quitar]").forEach(b => b.addEventListener("click", () => quitarEjercicio(d, b.dataset.quitar)));
  main.querySelectorAll("[data-poner]").forEach(b => b.addEventListener("click", () => ponerEjercicio(d, b.dataset.poner)));
  main.querySelectorAll("[data-ajeno]").forEach(b => b.addEventListener("click", () => anadirAjeno(d, b.dataset.ajeno)));
  main.querySelector("[data-det-mas]")?.addEventListener("toggle", e => { masAbierto = e.target.open; });
  main.querySelectorAll("form.log").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const libre = f.querySelector("input.texto");
    if (libre) {
      const texto = libre.value.trim();
      if (!texto) { libre.focus(); return; }
      iniciarDescanso(f.dataset.id, null);
      return anotar(f.dataset.id, texto, null);
    }
    f.querySelector("[data-save]")?.click();
  }));
  main.querySelectorAll("[data-toggle]").forEach(b => b.addEventListener("click", () => {
    const id = b.dataset.toggle; abiertos.has(id) ? abiertos.delete(id) : abiertos.add(id); renderDay();
  }));
  $("fin-btn")?.addEventListener("click", e => {
    const b = e.currentTarget;
    if (!b.dataset.confirm) { b.dataset.confirm = "1"; b.textContent = "¿Seguro? Pulsa otra vez para cerrar"; return; }
    finalizar(d);
  });
  $("fin-reabrir")?.addEventListener("click", () => reabrir(d));
  bindValorar(main);
  $("fin-siguiente")?.addEventListener("click", () => {
    const ses = sesiones.find(x => x.id === claveSesion(d));
    current = siguienteIndice(ses?.dia ?? 0); eligioTab = true;
    try { localStorage.setItem("rutina-dia", current); } catch {}
    render(); window.scrollTo({ top: 0, behavior: "smooth" });
  });
  bindBorrar(main);
}

function renderHist() {
  const main = $("day");
  main.style.setProperty("--c", "var(--accent)");
  if (!historial.length) {
    main.innerHTML = `<div class="day-title"><h2>Historial</h2></div><p class="empty">Aún no hay anotaciones. Abre el día que te toque, escribe el peso y las repeticiones de un ejercicio y pulsa Guardar. Aparecerá aquí, ordenado por fecha.</p>`;
    return;
  }
  const porFecha = {};
  historial.forEach(h => (porFecha[h.fecha] ||= []).push(h));
  sesiones.forEach(x => { porFecha[x.fecha] ||= []; });
  const todas = Object.keys(porFecha).sort().reverse();
  if (calDia && !porFecha[calDia]) calDia = null;
  const fechas = calDia ? [calDia] : todas;
  main.innerHTML = `<div class="day-title"><h2>Historial</h2><p>${historial.length} anotaciones en ${todas.length} ${todas.length === 1 ? "sesión" : "sesiones"}</p></div>` + calendario() +
    (calDia ? `<p class="cal-filtro">Mostrando solo ${esc(fmtFecha(calDia, true))} · <button type="button" class="hist-toggle" data-cal-todo>Ver todo el historial</button></p>` : "") +
    fechas.map(f => {
      const items = porFecha[f].sort((a, b) => a.ts - b.ts);
      const sesTit = sesiones.filter(x => x.fecha === f).map(x => x.dia ? `Día ${x.dia} · ${x.titulo}` : x.titulo);
      const dias = sesTit.length ? sesTit.join(", ") : [...new Set(items.map(h => NOMBRE[h.ej]?.dia).filter(Boolean))].map(n => `Día ${n} · ${DAYS[n - 1].title}`).join(", ");
      const ses = sesiones.filter(x => x.fecha === f);
      return `<section class="sesion"><h3>${fmtFecha(f, true)}<small>${esc(dias)}</small></h3>${ses.map(x => `<p class="ses-linea">✓ ${esc(x.titulo)}${x.corto ? ` (corto de ${x.corto} min)` : ""} · ${x.minutos} min · ${x.series} series · ${fmtN(x.volumen, 0)} kg movidos${x.records?.length ? ` · ${x.records.length} ${x.records.length === 1 ? "récord" : "récords"}` : ""}</p>${bloqueValoracion(x, true)}`).join("")}<ul class="hist">${items.map(h => filaHist(h, true)).join("")}</ul></section>`;
    }).join("");
  bindCalendario(main);
  bindBorrar(main);
  bindValorar(main);
}

// ---- Calendario de lo entrenado: solo el pasado, sin planes a futuro (con turnos rotativos no hay días fijos) ----
let calMes = isoHoy().slice(0, 7), calDia = null;   // calMes = "AAAA-MM"; calDia = fecha elegida para ver solo ese día
function actividad() {
  const m = new Map();
  const dia = (f) => { let e = m.get(f); if (!e) m.set(f, e = { cuenta: {}, ses: 0, cerrada: false }); return e; };
  historial.forEach(h => { const e = dia(h.fecha), n = NOMBRE[h.ej]?.dia; if (n) e.cuenta[n] = (e.cuenta[n] || 0) + 1; });
  sesiones.forEach(x => { const e = dia(x.fecha); e.cerrada = true; if (x.dia >= 1 && x.dia <= 4) e.ses = x.dia; });
  m.forEach(e => { e.n = e.ses || Number(Object.entries(e.cuenta).sort((a, b) => b[1] - a[1])[0]?.[0]) || 0; });
  return m;
}
const sumaMes = (ym, d) => { const [y, m] = ym.split("-").map(Number), x = new Date(y, m - 1 + d, 1); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`; };
const nombreMes = (ym, conAnio) => { const [y, m] = ym.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleDateString("es-ES", conAnio ? { month: "long", year: "numeric" } : { month: "long" }); };
function haceDias(iso) {
  const n = Math.round((new Date(isoHoy() + "T12:00:00") - new Date(iso + "T12:00:00")) / 864e5);
  return n <= 0 ? "hoy" : n === 1 ? "ayer" : `hace ${n} días`;
}
function calendario() {
  const act = actividad(), hoy = isoHoy(), fechas = [...act.keys()].sort();
  if (!fechas.length) return "";
  const primerMes = fechas[0].slice(0, 7), mesActual = hoy.slice(0, 7);
  if (calMes > mesActual) calMes = mesActual;
  if (calMes < primerMes) calMes = primerMes;
  const [y, m] = calMes.split("-").map(Number);
  const hueco = (new Date(y, m - 1, 1).getDay() + 6) % 7, nDias = new Date(y, m, 0).getDate();   // la semana empieza en lunes
  let celdas = "<span></span>".repeat(hueco);
  for (let d = 1; d <= nDias; d++) {
    const f = `${calMes}-${String(d).padStart(2, "0")}`, e = act.get(f), esHoy = f === hoy;
    if (e) {
      const tit = e.n ? `Día ${e.n} · ${DAYS[e.n - 1].title}` : "Entrenamiento";
      celdas += `<button type="button" class="cal-d${e.cerrada ? "" : " parcial"}${esHoy ? " hoy" : ""}" style="--c:${e.n ? `var(--d${e.n})` : "var(--accent)"}" data-cal-fecha="${f}" aria-pressed="${f === calDia}" aria-label="${esc(`${fmtFecha(f, true)}: ${tit}${e.cerrada ? ", entrenamiento terminado" : ", anotado sin terminar"}`)}">${d}</button>`;
    } else celdas += `<span class="cal-v${esHoy ? " hoy" : ""}${f > hoy ? " fut" : ""}">${d}</span>`;
  }
  const delMes = fechas.filter(f => f.startsWith(calMes)).length, mes = nombreMes(calMes, true);
  return `<section class="cal" aria-label="Calendario de entrenamientos">
    <div class="cal-cab">
      <button type="button" data-cal-mes="-1" aria-label="Mes anterior"${calMes <= primerMes ? " disabled" : ""}>‹</button>
      <h3>${mes[0].toUpperCase() + mes.slice(1)}</h3>
      <button type="button" data-cal-mes="1" aria-label="Mes siguiente"${calMes >= mesActual ? " disabled" : ""}>›</button>
    </div>
    <div class="cal-rej">${["L", "M", "X", "J", "V", "S", "D"].map(s => `<span class="cal-sem">${s}</span>`).join("")}${celdas}</div>
    <p class="cal-resumen"><b>${delMes} ${delMes === 1 ? "día entrenado" : "días entrenados"}</b> en ${nombreMes(calMes)} · último entrenamiento ${haceDias(fechas[fechas.length - 1])} · ${fechas.length} en total desde el ${fmtFecha(fechas[0])}</p>
    <div class="cal-ley">${DAYS.map(d => `<span style="--c:${d.c}"><i></i>Día ${d.n}</span>`).join("")}<small>Relleno: terminado · claro: anotado sin terminar</small></div>
  </section>`;
}
function bindCalendario(root) {
  root.querySelectorAll("[data-cal-mes]").forEach(b => b.addEventListener("click", () => { calMes = sumaMes(calMes, Number(b.dataset.calMes)); renderHist(); }));
  root.querySelectorAll("[data-cal-fecha]").forEach(b => b.addEventListener("click", () => { calDia = calDia === b.dataset.calFecha ? null : b.dataset.calFecha; renderHist(); }));
  root.querySelector("[data-cal-todo]")?.addEventListener("click", () => { calDia = null; renderHist(); });
}

function bindBorrar(root) {
  root.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.confirm) return borrar(b.dataset.del);
    b.dataset.confirm = "1"; b.textContent = "¿Seguro?";
  }));
}

function render() {
  renderTabs();
  $("perfil-btn").setAttribute("aria-pressed", current === MED);
  document.querySelector(".modo").hidden = current >= HIST;
  current === HIST ? renderHist() : current === MED ? renderMed() : renderDay();
}

// ---- Temporizador de descanso ----
const GRANDES = new Set(["press-inclinado", "press-banca", "dominadas", "remo-apoyo", "remo-polea", "sentadilla", "rumano", "prensa", "press-militar"]);
// ---- Calentamiento de los ejercicios grandes: series de aproximación ----
// El primer ejercicio grande del día lleva 3 (2 en el entreno de 20 min); los siguientes, 2, porque el cuerpo ya está caliente.
const PASO_KG = { "press-inclinado": 2, "press-militar": 2, "dominadas": 5, "remo-polea": 5, "prensa": 5 }; // el resto, de 2,5 en 2,5
const APROX_PRIMERO = [[0.5, "10"], [0.7, "5"], [0.85, "2–3"]], APROX_CORTO = [[0.5, "8"], [0.75, "3"]], APROX_SIGUIENTE = [[0.6, "6"], [0.8, "3"]];
// ---- Sugerencia para hoy (doble progresión) ----
// Si la última vez llegaste al tope de repeticiones en todas las series con el peso más alto, hoy toca subir un escalón;
// si no, mismo peso e intentar una repetición más en cada serie.
function sugerencia(id, dose, ultimo) {
  const rango = /×\s*(\d+)\s*[–-]\s*(\d+)/.exec(dose);
  const series = (ultimo?.series || []).filter(x => Number(x.reps) > 0);
  if (!rango || series.length < 2) return null;
  const tope = Number(rango[2]);
  if (SIN_PESO.has(id)) return { sinKg: true, sube: series.every(x => Number(x.reps) >= tope), tope, ultima: resumen(series) };
  const kgs = series.map(x => num(x.kg)).filter(k => k != null);
  if (!kgs.length) return null;
  const peso = Math.max(...kgs), duras = series.filter(x => num(x.kg) === peso);
  const sube = duras.length >= 2 && duras.every(x => Number(x.reps) >= tope);
  return { sube, kg: sube ? peso + (PASO_KG[id] || 2.5) : peso, peso, tope, ultima: resumen(duras) };
}
function bloqueSugerencia(s) {
  if (s.sinKg) return `<div class="sugiere"><p><b>${s.sube ? "Hoy: hazlas más lentas" : "Hoy: una repetición más en cada serie"}</b> <span>· ${s.sube ? `la última vez llegaste a ${s.tope} en todas (${esc(s.ultima)}): baja en 3 segundos y aguanta 1 segundo arriba.` : `la última vez ${esc(s.ultima)}. Cuando llegues a ${s.tope} en todas, hazlas más lentas.`}</span></p></div>`;
  if (s.sube) return `<div class="sugiere"><p><b>Hoy prueba ${fmtN(s.kg)} kg</b> <span>· la última vez llegaste a ${s.tope} en todas (${esc(s.ultima)}).</span></p>${modo === "series" ? `<button type="button" data-usar data-kg="${fmtN(s.kg)}">Usar ${fmtN(s.kg)} kg</button>` : ""}</div>`;
  return `<div class="sugiere"><p><b>Hoy: ${fmtN(s.peso)} kg otra vez</b> <span>· intenta una repetición más en cada serie (la última vez ${esc(s.ultima)}). Con ${s.tope} en todas, subes.</span></p></div>`;
}
function calentamiento(id, primero, ultimo, objetivo) {
  const esquema = primero ? (tiempo === 20 ? APROX_CORTO : APROX_PRIMERO) : APROX_SIGUIENTE;
  const kgs = (ultimo?.series || []).map(x => num(x.kg)).filter(Boolean);
  const trabajo = objetivo || (kgs.length ? Math.max(...kgs) : null);
  let series;
  if (trabajo) {
    const paso = PASO_KG[id] || 2.5;
    const vistos = new Set();
    series = esquema.map(([pct, reps]) => [Math.max(paso, Math.round(trabajo * pct / paso) * paso), reps])
      .filter(([kg]) => kg < trabajo && !vistos.has(kg) && vistos.add(kg))
      .map(([kg, reps]) => `${fmtN(kg)} kg × ${reps}`);
  } else series = esquema.map(([pct, reps]) => `${Math.round(pct * 100)} % × ${reps}`);
  if (!series.length) return "";
  return `<div class="calent"><b>Calentamiento:</b> ${series.join(" · ")}${trabajo ? "" : " del peso que vayas a usar"} <span>· sin llegar al fallo y 1 min entre ellas; no se apuntan${trabajo ? ` (sobre ${objetivo ? `los ${fmtN(trabajo)} kg de hoy` : `tus ${fmtN(trabajo)} kg de la última vez`})` : ""}</span></div>`;
}

// ---- Entrenamiento corto: ajusta ejercicios, series y descansos al tiempo que tengas ----
const TIEMPOS = [[20, "20 min"], [40, "40 min"], [60, "1 h"], [0, "Completo"]];
const DESCANSOS = { 20: [90, 60], 40: [120, 75], 60: [150, 90], 0: [150, 90] }; // segundos: [grandes, aislamiento]
// Qué se queda primero cuando falta tiempo: un ejercicio por músculo, del más importante al menos
const PRIORIDAD = {
  1: ["press-inclinado", "triceps-cabeza", "press-banca", "aperturas-polea", "fondos-maquina", "press-declinado"],
  2: ["dominadas", "remo-apoyo", "curl-predicador", "jalon-unilateral", "remo-polea", "curl-inclinado"],
  3: ["sentadilla", "rumano", "curl-femoral-sentado", "extension-cuadriceps", "prensa", "gemelos"],
  4: ["press-militar", "laterales-polea", "crunch-maquina", "pajaro", "crunch-inverso"],
};
// Medido en tus sesiones: ~1 min por serie grande, 50 s por serie de aislamiento y 2 min para cambiar de máquina
const T_SERIE = [60, 50], T_CAMBIO = 120;
let tiempo = 0, anadidos = []; // anadidos: ejercicios que metes a mano aunque no quepan en el tiempo
try { const t = JSON.parse(localStorage.getItem("rutina-tiempo")); if (t?.fecha === isoHoy()) { tiempo = Number(t.min) || 0; anadidos = Array.isArray(t.anadidos) ? t.anadidos : []; } } catch {}
function guardarTiempo() { try { localStorage.setItem("rutina-tiempo", JSON.stringify({ fecha: isoHoy(), min: tiempo, anadidos })); } catch {} }
const fmtT = (seg) => `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
const fmtMin = (seg) => { const m = Math.round(seg / 60); return m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`; };
function descanso(ej, min = tiempo) { const [g, a] = DESCANSOS[min] || DESCANSOS[0]; return GRANDES.has(ej) ? g : a; }
function duracion(plan, min) {
  let seg = min === 20 ? 180 : 300; // calentamiento
  plan.forEach(([id, n]) => { seg += T_CAMBIO + n * ((GRANDES.has(id) ? T_SERIE[0] : T_SERIE[1]) + descanso(id, min)); });
  if (plan.length) seg -= descanso(plan[plan.length - 1][0], min); // tras la última serie no se descansa
  return seg;
}
// ---- Cambios solo de hoy: quitar o añadir ejercicios y series sin tocar la rutina ----
// Se guardan con la fecha de hoy: mañana la rutina vuelve a salir como siempre.
let ajustes = {}, ajustesFecha = isoHoy(), masAbierto = false; // ajustes[día] = { quitar: [ids], ajenos: [ids de otros días], series: { id: +/- series } }
try { const t = JSON.parse(localStorage.getItem("rutina-hoy")); if (t?.fecha === isoHoy() && t.dias && typeof t.dias === "object") ajustes = t.dias; } catch {}
function guardarAjustes() { try { localStorage.setItem("rutina-hoy", JSON.stringify({ fecha: ajustesFecha, dias: ajustes })); } catch {} }
function ajusteDia(d) {
  if (ajustesFecha !== isoHoy()) { ajustes = {}; ajustesFecha = isoHoy(); }   // la app lleva abierta desde ayer
  const a = ajustes[d.n] ||= {};
  a.quitar ||= []; a.ajenos ||= []; a.series ||= {};
  return a;
}
const ejercicioPorId = (id) => DAYS.flatMap(x => x.ex).find(e => e[0] === id);
function ejerciciosHoy(d) {
  const a = ajusteDia(d);
  return [...d.ex.filter(e => !a.quitar.includes(e[0])), ...a.ajenos.map(ejercicioPorId).filter(Boolean)];
}
function planDia(d) {
  const p = planBase(d), dl = ajusteDia(d).series, series = { ...p.series };
  Object.keys(series).forEach(id => { if (dl[id]) series[id] = Math.max(1, series[id] + dl[id]); });
  return { ...p, series, seg: duracion(p.ex.map(e => [e[0], series[e[0]]]), tiempo || 0) };
}
function planBase(d) {
  const exd = ejerciciosHoy(d);
  const completo = Object.fromEntries(exd.map(e => [e[0], numSeries(e[3])]));
  const lista = (sel) => exd.filter(e => sel[e[0]]).map(e => [e[0], sel[e[0]]]);
  if (!tiempo || typeof d.n !== "number") return { ex: exd, series: completo, completo, fuera: [], seg: duracion(lista(completo), 0) };
  const sel = {}, limite = tiempo * 60, cabe = () => duracion(lista(sel), tiempo) <= limite;
  const hechasHoy = (id) => entradaHoy(id)?.series?.length || 0;
  // Lo que ya has apuntado hoy se queda siempre
  exd.forEach(e => { const h = hechasHoy(e[0]); if (h) sel[e[0]] = Math.max(h, Math.min(2, completo[e[0]])); });
  anadidos.forEach(id => { if (completo[id] && !sel[id]) sel[id] = Math.min(2, completo[id]); });
  ajusteDia(d).ajenos.forEach(id => { if (completo[id] && !sel[id]) sel[id] = Math.min(2, completo[id]); });
  const orden = PRIORIDAD[d.n] || exd.map(e => e[0]);
  // 1º: entran ejercicios con 2 series, por prioridad
  orden.forEach(id => { if (sel[id] || !completo[id]) return; sel[id] = Math.min(2, completo[id]); if (!cabe()) delete sel[id]; });
  // 2º: si sobra tiempo, se recuperan series de una en una, por prioridad
  for (let ronda = 0; ronda < 3; ronda++) orden.forEach(id => {
    if (!sel[id] || sel[id] >= completo[id]) return;
    sel[id]++; if (!cabe()) sel[id]--;
  });
  return { ex: exd.filter(e => sel[e[0]]), series: sel, completo, fuera: exd.filter(e => !sel[e[0]]), seg: duracion(lista(sel), tiempo) };
}
function cambiarSeries(d, id, paso) {
  const a = ajusteDia(d), p = planDia(d), hechas = entradaHoy(id)?.series?.length || 0;
  if (!(id in p.series)) return;
  const total = Math.max(p.series[id], hechas);
  if (paso < 0 && (total <= Math.max(hechas, 1) || total !== p.series[id])) return;   // no se quitan series ya apuntadas
  if (paso > 0 && total >= 12) return;
  a.series[id] = (a.series[id] || 0) + (paso > 0 ? total + 1 - p.series[id] : -1);
  guardarAjustes(); renderDay();
}
function quitarEjercicio(d, id) {
  const a = ajusteDia(d);
  if (a.ajenos.includes(id)) a.ajenos = a.ajenos.filter(x => x !== id);
  else if (!a.quitar.includes(id)) a.quitar.push(id);
  delete a.series[id];
  if (anadidos.includes(id)) { anadidos = anadidos.filter(x => x !== id); guardarTiempo(); }
  guardarAjustes(); renderDay();
}
function ponerEjercicio(d, id) {
  const a = ajusteDia(d);
  a.quitar = a.quitar.filter(x => x !== id);
  guardarAjustes(); renderDay();
}
function anadirAjeno(d, id) {
  const a = ajusteDia(d);
  if (!a.ajenos.includes(id) && ejercicioPorId(id)) a.ajenos.push(id);
  masAbierto = true;                                   // por si quieres añadir más de uno seguido
  guardarAjustes(); renderDay();
  document.querySelector("#day ol.ex > li:last-child")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
function bloqueAjustes(d, plan) {
  const a = ajusteDia(d);
  const quitados = a.quitar.map(id => d.ex.find(e => e[0] === id)).filter(Boolean);
  const otros = DAYS.filter(x => x.n !== d.n).map(x => ({ x, ex: x.ex.filter(e => !a.ajenos.includes(e[0]) && !plan.ex.some(p => p[0] === e[0])) })).filter(g => g.ex.length);
  return `<section class="ajustes" aria-label="Cambios solo de hoy">
    ${quitados.length ? `<p>Quitados hoy (tócalos para volver a ponerlos):</p><div class="tiempo-op">${quitados.map(e => `<button type="button" data-poner="${e[0]}">+ ${esc(e[1])}</button>`).join("")}</div>` : ""}
    <details class="mas-ej" data-det-mas${masAbierto ? " open" : ""}><summary>+ Añadir un ejercicio de otro día</summary>
      ${otros.map(g => `<p>Día ${g.x.n} · ${esc(g.x.title)}</p><div class="tiempo-op">${g.ex.map(e => `<button type="button" data-ajeno="${e[0]}">+ ${esc(e[1])}</button>`).join("")}</div>`).join("")}
    </details>
    <p class="nota-aj">Estos cambios valen solo para hoy: tu rutina no se modifica y mañana sale como siempre.</p>
  </section>`;
}
function bloqueTiempo(d, plan) {
  if (typeof d.n !== "number") return `<div class="tiempo"><p><b>≈ ${fmtMin(plan.seg)}</b> con el calentamiento · ${plan.ex.length} ejercicios · ${Object.values(plan.series).reduce((x, y) => x + y, 0)} series</p></div>`;
  const [g, a] = DESCANSOS[tiempo] || DESCANSOS[0];
  const series = Object.values(plan.series).reduce((x, y) => x + y, 0);
  return `<div class="tiempo">
    <div class="tiempo-op" role="group" aria-label="Tiempo que tienes hoy"><span>¿Cuánto tiempo tienes hoy?</span>${TIEMPOS.map(([m, t]) => `<button type="button" data-tiempo="${m}" aria-pressed="${tiempo === m}">${t}</button>`).join("")}</div>
    <p><b>≈ ${fmtMin(plan.seg)}</b> con el calentamiento · ${plan.ex.length} ejercicios · ${series} series · descansos de ${fmtT(g)} en los grandes y ${fmtT(a)} en el resto${tiempo === 20 ? " · calienta solo con 2 series ligeras del primer ejercicio" : ""}</p>
    ${plan.fuera.length ? `<p>Hoy fuera (tócalo para añadirlo):</p><div class="tiempo-op">${plan.fuera.map(e => `<button type="button" data-anadir="${e[0]}">+ ${esc(e[1])}</button>`).join("")}</div>` : ""}
  </div>`;
}
let tFin = 0, tTotal = 0, tTick = null, tFinTimeout = null, audio = null;
function iniciarDescanso(ej, serie) {
  tTotal = descanso(ej);
  tFin = Date.now() + tTotal * 1000;
  try { audio ||= new (window.AudioContext || window.webkitAudioContext)(); audio.resume?.(); } catch {}
  $("t-label").innerHTML = `<b>Descanso · ${esc(NOMBRE[ej]?.name || "")}</b>${serie ? `Serie ${serie} hecha · ` : ""}${GRANDES.has(ej) ? "Ejercicio grande" : "Aislamiento"}: ${fmtT(tTotal)}`;
  $("timer").classList.remove("fin");
  $("timer").hidden = false; document.body.classList.add("con-timer");
  clearTimeout(tFinTimeout); clearInterval(tTick);
  tTick = setInterval(pintarTimer, 250); pintarTimer();
}
function pintarTimer() {
  const rest = Math.max(0, Math.round((tFin - Date.now()) / 1000));
  $("t-time").textContent = `${Math.floor(rest / 60)}:${String(rest % 60).padStart(2, "0")}`;
  $("t-bar").style.width = (tTotal ? (rest / tTotal) * 100 : 0) + "%";
  if (rest <= 0) {
    clearInterval(tTick);
    $("timer").classList.add("fin");
    $("t-label").innerHTML = "<b>¡A por la siguiente serie!</b>Descanso terminado";
    pitido();
    try { navigator.vibrate?.([300, 150, 300]); } catch {}
    tFinTimeout = setTimeout(pararTimer, 8000);
  }
}
// Técnica de cada ejercicio: pasos, errores típicos y qué trabaja
const TECNICA = {
  "press-inclinado": { musculo: "Pecho (parte alta), hombro delantero y tríceps", pasos: ["Banco a 30°. Siéntate con las mancuernas sobre los muslos y túmbate llevándolas al pecho.", "Junta las escápulas y bájalas, con el pecho hacia arriba y los pies firmes en el suelo.", "Baja las mancuernas despacio hasta la altura del pecho, con los codos a unos 45° del cuerpo.", "Empuja hacia arriba y un poco hacia dentro, sin chocar las mancuernas."], errores: ["Banco demasiado inclinado: trabaja más el hombro que el pecho.", "Abrir los codos a 90°: carga el hombro."] },
  "press-banca": { musculo: "Pecho, hombro delantero y tríceps", pasos: ["Túmbate con los ojos bajo la barra y agárrala algo más ancho que los hombros.", "Junta y baja las escápulas, con un ligero arco en la espalda y los pies firmes.", "Baja la barra controlada hasta tocar la parte baja del pecho, con los codos a unos 45°.", "Empuja hasta estirar los brazos, sin despegar los glúteos del banco."], errores: ["Rebotar la barra en el pecho.", "Levantar el culo del banco para mover más peso."] },
  "aperturas-polea": { musculo: "Pecho", pasos: ["En el contractor (pec deck): asiento en el número 5.", "Poleas a la altura de los hombros o algo más arriba. Agarra un estribo con cada mano y da un paso al frente.", "Codos ligeramente doblados y fijos durante todo el movimiento.", "Abre los brazos hasta notar el pecho estirado.", "Junta las manos delante del pecho, como si abrazaras un árbol."], errores: ["Doblar y estirar los codos: se convierte en un press.", "Recortar la apertura, que es la parte que más trabaja."] },
  "press-declinado": { musculo: "Pecho (parte baja) y tríceps", pasos: ["Ajusta el asiento para que los agarres queden a la altura de la parte baja del pecho.", "Espalda pegada al respaldo y escápulas juntas.", "Empuja hasta casi estirar los brazos, sin bloquear del todo.", "Vuelve despacio hasta notar el estiramiento del pecho."], errores: ["Despegar la espalda del respaldo.", "Bajar de golpe."] },
  "triceps-cabeza": { musculo: "Tríceps, sobre todo la cabeza larga", pasos: ["Polea baja con cuerda. De espaldas a la máquina, con un pie adelantado y el cuerpo algo inclinado hacia delante. Con mancuerna: sentado en banco con respaldo, cogida con las dos manos.", "Codos arriba, junto a la cabeza y apuntando al frente.", "Estira los brazos moviendo solo el antebrazo.", "Baja despacio hasta notar el estiramiento detrás del brazo."], errores: ["Abrir los codos hacia fuera.", "Arquear la espalda por usar demasiado peso."] },
  "fondos-maquina": { musculo: "Tríceps (cabezas lateral y media) y algo de pecho", pasos: ["Siéntate con la espalda recta y agarra las asas a los lados del cuerpo.", "Codos pegados al cuerpo y apuntando hacia atrás.", "Empuja hacia abajo hasta estirar los brazos.", "Sube despacio hasta que el codo pase un poco de 90°."], errores: ["Encoger los hombros hacia las orejas.", "Inclinarse hacia delante: trabaja más pecho y menos tríceps."] },
  "dominadas": { musculo: "Dorsal, bíceps y parte alta de la espalda", pasos: ["Agarre algo más ancho que los hombros, con las palmas hacia delante.", "Parte colgado con los brazos estirados.", "Lleva los codos hacia abajo y hacia atrás, sacando pecho, hasta que la barbilla pase la barra (o la barra llegue al pecho en el jalón).", "Baja despacio hasta estirar del todo."], errores: ["Hacer medio recorrido.", "Balancearse o tirar con el cuello."] },
  "remo-apoyo": { musculo: "Espalda media, dorsal y deltoides posterior", pasos: ["Ponte encima de la barra con los pies a la anchura de los hombros y las rodillas un poco dobladas.", "Inclina el tronco hacia delante unos 45° con la espalda recta, sacando la cadera hacia atrás.", "Con los brazos estirados, tira llevando los codos hacia atrás y pegados al cuerpo hasta que los discos casi toquen el pecho.", "Junta las escápulas arriba y baja despacio hasta estirar los brazos.", "Si la máquina tiene apoyo para el pecho, pégalo al respaldo y no lo despegues."], errores: ["Redondear la espalda o levantar el tronco para subir el peso.", "Tirar a tirones ayudándote con las piernas y la cadera.", "Poner tantos discos que acabas haciendo medio recorrido."] },
  "remo-polea": { musculo: "Dorsal y espalda media", pasos: ["Siéntate con los pies en los apoyos y las rodillas un poco dobladas. Agarra el triángulo.", "Espalda recta y pecho arriba durante todo el movimiento.", "Tira llevando los codos hacia atrás y pegados al cuerpo, hasta que el agarre llegue al ombligo.", "Vuelve despacio estirando los brazos y dejando que los hombros vayan un poco hacia delante, sin redondear la espalda."], errores: ["Balancear el tronco adelante y atrás para mover más peso.", "Tirar hacia el pecho con los codos abiertos: trabaja más la parte alta y menos el dorsal."] },
  "jalon-unilateral": { musculo: "Dorsal", pasos: ["Polea alta con un estribo. Siéntate o arrodíllate de cara a la máquina, un poco ladeado hacia el brazo que trabaja.", "Empieza con el brazo estirado arriba y deja que el hombro suba para estirar el dorsal.", "Tira llevando el codo hacia abajo y hacia la cadera, pegado al cuerpo, hasta que la mano quede a la altura del hombro.", "Sube despacio hasta estirar del todo. Haz todas las repeticiones con un brazo y luego con el otro."], errores: ["Llevar la mano al pecho tirando con el bíceps, en vez de llevar el codo a la cadera.", "Girar el tronco para ayudarte.", "Recortar arriba: el estiramiento es la parte que más trabaja."] },
  "curl-predicador": { musculo: "Bíceps", pasos: ["Ajusta el banco para que la axila quede justo encima del borde del apoyo.", "Brazos apoyados del todo y agarre a la anchura de los hombros.", "Sube la barra hasta que el antebrazo quede casi vertical.", "Baja despacio hasta casi estirar el brazo. Esa parte es la que más trabaja."], errores: ["Dejar caer el peso abajo.", "Levantar los codos del apoyo."] },
  "curl-inclinado": { musculo: "Bíceps, sobre todo la cabeza larga", pasos: ["Banco a unos 45°, con la espalda bien apoyada.", "Brazos colgando por detrás del cuerpo y palmas hacia delante.", "Sube las mancuernas sin adelantar los codos.", "Baja despacio hasta estirar los brazos del todo."], errores: ["Adelantar los hombros al subir.", "Usar tanto peso que tengas que balancearte."] },
  "sentadilla": { musculo: "Cuádriceps y glúteo", pasos: ["Barra sobre la parte alta de la espalda, no en el cuello. Pies a la anchura de los hombros, con las puntas algo abiertas.", "Coge aire, aprieta el abdomen y empieza a bajar doblando rodillas y cadera a la vez.", "Baja hasta que la cadera quede por debajo de las rodillas, con las rodillas en la dirección de los pies.", "Sube empujando el suelo, con el pecho arriba."], errores: ["Rodillas hacia dentro.", "Levantar los talones o redondear la espalda abajo."] },
  "rumano": { musculo: "Femoral y glúteo", pasos: ["De pie, con la barra en las manos y los pies a la anchura de la cadera.", "Rodillas algo dobladas y fijas.", "Echa la cadera hacia atrás y baja la barra pegada a las piernas, con la espalda recta.", "Baja hasta notar el femoral estirado (más o menos por debajo de las rodillas) y sube apretando el glúteo."], errores: ["Redondear la espalda.", "Doblar mucho las rodillas: se convierte en una sentadilla."] },
  "prensa": { musculo: "Cuádriceps y glúteo", pasos: ["Espalda y cadera bien pegadas al respaldo.", "Pies en el centro de la plataforma, a la anchura de los hombros.", "Baja despacio hasta que las rodillas queden a unos 90° o algo más, sin que se despegue la cadera.", "Empuja sin bloquear las rodillas arriba."], errores: ["Bajar tanto que la cadera se levanta del asiento.", "Bloquear las rodillas de golpe."] },
  "curl-femoral-sentado": { musculo: "Femoral", pasos: ["Ajusta el respaldo para que la rodilla quede alineada con el eje de la máquina, y baja el rodillo sobre los muslos.", "Inclínate un poco hacia delante: estira más el femoral.", "Lleva los talones hacia abajo y atrás todo lo que puedas.", "Vuelve despacio hasta casi estirar la pierna."], errores: ["Hacer medio recorrido.", "Despegar los muslos del asiento."] },
  "extension-cuadriceps": { musculo: "Cuádriceps", pasos: ["Rodilla alineada con el eje de la máquina y rodillo sobre el tobillo.", "Agárrate a las asas del asiento.", "Estira las piernas y aguanta 1 segundo arriba.", "Baja despacio hasta 90° o algo más."], errores: ["Dar patadas con impulso.", "Levantar la cadera del asiento."] },
  "gemelos": { musculo: "Gemelos", pasos: ["Punta de los pies en el borde del escalón o de la máquina, con los talones en el aire.", "Rodillas rectas pero sin bloquear.", "Baja los talones todo lo que puedas y aguanta 2 segundos abajo, estirado.", "Sube lo más alto posible, de puntillas."], errores: ["Rebotar abajo.", "Doblar las rodillas para ayudarte."] },
  "press-militar": { musculo: "Hombro (delantero y lateral) y tríceps", pasos: ["Banco a 80–90°, con la espalda pegada al respaldo.", "Mancuernas a la altura de las orejas, palmas al frente y codos algo por delante del cuerpo.", "Empuja hacia arriba hasta casi juntar las mancuernas.", "Baja despacio hasta la altura de las orejas o un poco más."], errores: ["Arquear mucho la espalda baja.", "Bajar solo hasta la frente: recorrido corto."] },
  "laterales-polea": { musculo: "Hombro lateral", pasos: ["Polea baja. Ponte de lado a la máquina y agarra el estribo con la mano más alejada; el cable pasa por delante o por detrás del cuerpo.", "Codo ligeramente doblado.", "Sube el brazo hacia el lado hasta la altura del hombro, guiando con el codo.", "Baja despacio hasta que la mano cruce delante de la cadera."], errores: ["Encoger el hombro hacia la oreja.", "Balancear el cuerpo para subir."] },
  "pajaro": { musculo: "Hombro posterior y parte alta de la espalda", pasos: ["Siéntate de cara al respaldo, con el pecho apoyado. Ajusta las asas a la altura de los hombros.", "Agarra con los brazos casi rectos y las palmas hacia abajo o enfrentadas.", "Abre los brazos hacia atrás hasta la línea de los hombros.", "Vuelve despacio sin que las placas choquen."], errores: ["Juntar las escápulas: así trabaja la espalda en vez del hombro posterior.", "Doblar los codos para tirar."] },
  "crunch-maquina": { musculo: "Abdominales", pasos: ["Siéntate con la espalda en el respaldo y los pies bien apoyados. Ajusta el asiento para que el eje de giro quede a la altura del ombligo.", "Agarra las asas o cruza los brazos sobre el pecho, según la máquina.", "Enrolla el tronco hacia delante acercando las costillas a la pelvis, con el abdomen y no con los brazos.", "Aguanta 1 segundo abajo y vuelve despacio sin soltar el peso de golpe."], errores: ["Tirar con los brazos o las piernas en vez de con el abdomen.", "Soltar el peso al subir en vez de controlarlo.", "Poner tanto peso que solo haces medio recorrido."] },
  "crunch-inverso": { musculo: "Abdominales, sobre todo la parte baja", pasos: ["Túmbate boca arriba con la espalda baja pegada al suelo, las rodillas dobladas a 90° y las piernas en el aire. Brazos a los lados o agarrando algo detrás de la cabeza.", "Aprieta el abdomen y enrolla la pelvis hacia las costillas, levantando la cadera unos centímetros del suelo.", "Aguanta 1 segundo arriba.", "Baja despacio hasta que los glúteos toquen el suelo, sin dejar caer las piernas."], errores: ["Balancear las piernas con impulso.", "Subir solo las rodillas sin levantar la pelvis: no trabaja el abdomen.", "Bajar de golpe y arquear la espalda baja."] },
};
const videoUrl = (name) => "https://www.youtube.com/results?search_query=" + encodeURIComponent("cómo hacer " + name + " técnica");
function abrirInfo(id) {
  const t = TECNICA[id], n = NOMBRE[id]?.name || id;
  if (!t) return;
  $("info-titulo").textContent = n;
  $("info-musculo").textContent = t.musculo;
  $("info-pasos").innerHTML = t.pasos.map(p => `<li>${esc(p)}</li>`).join("");
  $("info-errores").innerHTML = t.errores.map(p => `<li>${esc(p)}</li>`).join("");
  $("info-video").href = videoUrl(n.split(" o ")[0].replace(/\s*\(.*\)/, ""));
  $("info-bg").hidden = false;
  $("info-cerrar").focus();
}
function cerrarInfo() { $("info-bg").hidden = true; }
$("info-cerrar").addEventListener("click", cerrarInfo);
$("info-bg").addEventListener("click", e => { if (e.target === $("info-bg")) cerrarInfo(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("info-bg").hidden) cerrarInfo(); });

// (La valoración por IA solo existía dentro de Claude: aquí no está.)
function bloqueValoracion() { return ""; }
function bindValorar() {}
function valorar() {}

// ---- Finalizar entrenamiento ----
const claveSesion = (d) => `${isoHoy()}_${typeof d.n === "number" ? "dia" + d.n : "hoy"}`;
const e1rm = (x) => { const kg = num(x.kg), r = Number(x.reps); return kg && r ? kg * (1 + r / 30) : 0; };
// Una anotación de hoy ya pertenece a un entrenamiento cerrado si empezó antes de que se cerrara
function cerrada(h) { return sesiones.some(x => x.fecha === h.fecha && x.fin && h.ts <= x.fin); }
function datosHoy(d) {
  const ids = new Set([...d.ex.map(e => e[0]), ...ajusteDia(d).ajenos]);
  return historial.filter(h => h.fecha === isoHoy() && ids.has(h.ej) && !cerrada(h));
}
function zonaFinal(d) {
  const ses = sesiones.find(x => x.id === claveSesion(d));
  if (ses) return tarjetaResumen(ses);
  const hoy = datosHoy(d);
  if (!hoy.length) return "";
  const series = hoy.reduce((n, h) => n + (h.series?.length || 1), 0);
  return `<div class="fin-zona"><span>${hoy.length} de ${planDia(d).ex.length} ejercicios · ${series} series hoy</span><button type="button" class="fin-btn" id="fin-btn">Finalizar entrenamiento</button></div>`;
}
function tarjetaResumen(x) {
  return `<section class="resumen" aria-label="Resumen del entrenamiento">
    <h3>Entrenamiento terminado</h3>
    <div class="res-nums">
      <div><b>${x.minutos}</b><span>minutos</span></div>
      <div><b>${x.ejercicios}</b><span>ejercicios</span></div>
      <div><b>${x.series}</b><span>series</span></div>
      <div><b>${fmtN(x.volumen, 0)}</b><span>kg movidos</span></div>
    </div>
    ${x.records?.length ? `<p class="res-rec"><b>Récords de hoy:</b> ${x.records.map(r => `${esc(r.nombre)} (${fmtN(r.e1rm, 0)} kg estimados${r.antes ? `, antes ${fmtN(r.antes, 0)}` : ""})`).join(" · ")}</p>` : `<p class="res-rec">Sin récords hoy. Lo importante es ir sumando: la próxima vez intenta una repetición más en cada ejercicio.</p>`}
    ${x.faltan?.length ? `<p class="res-rec">Te quedaron por hacer: ${x.faltan.map(esc).join(", ")}.</p>` : ""}
    ${bloqueValoracion(x, false)}
    <div class="res-acciones">
      <button type="button" class="fin-btn" id="fin-siguiente">Siguiente entrenamiento: Día ${DAYS[siguienteIndice(x.dia)].n} · ${esc(DAYS[siguienteIndice(x.dia)].title)} →</button>
      <button type="button" class="hist-toggle" id="fin-reabrir">Reabrir entrenamiento</button>
    </div>
  </section>`;
}
async function finalizar(d) {
  const hoy = datosHoy(d);
  const inicio = Math.min(...hoy.map(h => h.ts));
  const series = hoy.reduce((n, h) => n + (h.series?.length || 1), 0);
  const volumen = hoy.reduce((v, h) => v + (h.series || []).reduce((a, x) => a + (num(x.kg) || 0) * (Number(x.reps) || 0), 0), 0);
  const records = hoy.filter(h => Array.isArray(h.series)).map(h => {
    const hoyMax = Math.max(...h.series.map(e1rm));
    const antes = Math.max(0, ...historial.filter(o => o.ej === h.ej && o.fecha < isoHoy() && Array.isArray(o.series)).flatMap(o => o.series.map(e1rm)));
    return hoyMax > antes ? { nombre: NOMBRE[h.ej]?.name || h.ej, e1rm: Math.round(hoyMax * 10) / 10, antes: antes ? Math.round(antes * 10) / 10 : 0 } : null;
  }).filter(Boolean);
  const hechos = new Set(hoy.map(h => h.ej));
  const ses = {
    fecha: isoHoy(), dia: typeof d.n === "number" ? d.n : 0, titulo: d.title,
    inicio, fin: Date.now(), minutos: Math.max(1, Math.round((Date.now() - inicio) / 60000)),
    ejercicios: hechos.size, series, volumen: Math.round(volumen), records,
    faltan: planDia(d).ex.filter(e => !hechos.has(e[0])).map(e => e[1]),
    ...(tiempo ? { corto: tiempo } : {}),
  };
  pararTimer();
  const id = claveSesion(d);
  if (storeSes) { try { await storeSes.doc(id).set(ses); } catch { return alertaEstado("No se pudo cerrar el entrenamiento"); } }
  else { sesiones = sesiones.filter(x => x.id !== id).concat({ id, ...ses }); try { localStorage.setItem("rutina-sesiones", JSON.stringify(sesiones)); } catch {} render(); }
  valorar(id, { id, ...ses });
  setTimeout(() => document.querySelector(".resumen")?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
}
// Siguiente día de la rutina: tras el día N toca el N+1 (tras el 4, el 1). La sesión suelta (dia 0) va seguida del día 1.
function siguienteIndice(dia) {
  if (!dia) { const ult = sesiones.filter(o => o.dia >= 1).sort((a, b) => (b.fin || 0) - (a.fin || 0))[0]; if (ult) return siguienteIndice(ult.dia); }
  return dia >= 1 && dia <= 3 ? dia : 0;
}
function abrirSiguiente() {
  if (eligioTab) return;
  if (!sesiones.length) return;
  const ultima = sesiones.slice().sort((a, b) => (b.fin || 0) - (a.fin || 0))[0];
  current = siguienteIndice(ultima.dia);
}
async function reabrir(d) {
  const id = claveSesion(d);
  if (storeSes) { try { await storeSes.doc(id).delete(); } catch {} }
  else { sesiones = sesiones.filter(x => x.id !== id); try { localStorage.setItem("rutina-sesiones", JSON.stringify(sesiones)); } catch {} render(); }
}

function pararTimer() { clearInterval(tTick); clearTimeout(tFinTimeout); $("timer").hidden = true; document.body.classList.remove("con-timer"); }
function pitido() {
  if (!audio) return;
  try {
    [0, 0.35].forEach(t => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(audio.destination);
      g.gain.setValueAtTime(0.25, audio.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + t + 0.3);
      o.start(audio.currentTime + t); o.stop(audio.currentTime + t + 0.3);
    });
  } catch {}
}
$("t-mas").addEventListener("click", () => { tFin += 30000; tTotal += 30; if ($("timer").classList.contains("fin")) { $("timer").classList.remove("fin"); clearTimeout(tFinTimeout); clearInterval(tTick); tFin = Date.now() + 30000; tTotal = 30; tTick = setInterval(pintarTimer, 250); } pintarTimer(); });
$("t-menos").addEventListener("click", () => { tFin -= 15000; pintarTimer(); });
$("t-stop").addEventListener("click", pararTimer);

// ---- Perfil: datos, cálculos, medidas y fuerza ----
const METRICAS = [["peso", "Peso", "kg"], ["cintura", "Cintura", "cm"], ["brazo", "Brazo", "cm"], ["cuello", "Cuello", "cm"], ["pecho", "Pecho", "cm"], ["muslo", "Muslo", "cm"]];
const PRINCIPALES = ["peso", "cintura", "brazo"];
const LEVANTAMIENTOS = [["press-banca", "Press de banca"], ["press-inclinado", "Press inclinado"], ["sentadilla", "Sentadilla"], ["rumano", "Peso muerto rumano"], ["press-militar", "Press militar"], ["remo-apoyo", "Remo en T"]];
const num = (v) => { const n = parseFloat(String(v ?? "").replace(",", ".")); return Number.isFinite(n) ? n : null; };
const fmtN = (n, d = 1) => n == null || !Number.isFinite(n) ? "—" : n.toLocaleString("es-ES", { maximumFractionDigits: d });
const fmtD = (n, u) => n == null || !Number.isFinite(n) ? "" : `${n > 0 ? "+" : n < 0 ? "−" : "±"}${fmtN(Math.abs(n))} ${u}`;
function spark(vals) {
  const pts = vals.map((v, i) => [i, v]).filter(p => p[1] != null);
  if (pts.length < 2) return "";
  const ys = pts.map(p => p[1]), min = Math.min(...ys), max = Math.max(...ys), span = max - min || 1;
  const W = 200, H = 40, n = vals.length - 1 || 1;
  const xy = pts.map(([i, v]) => [(i / n) * (W - 8) + 4, H - 4 - ((v - min) / span) * (H - 8)]);
  const last = xy[xy.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polyline points="${xy.map(p => p.join(",")).join(" ")}" fill="none" stroke="var(--d3)" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="${last[0]}" cy="${last[1]}" r="3" fill="var(--d3)"/></svg>`;
}
const ultimoDe = (orden, k) => { for (let i = orden.length - 1; i >= 0; i--) { const v = num(orden[i][k]); if (v != null) return v; } return null; };
function grasaNavy(cintura, cuello, altura) {
  if (!cintura || !cuello || !altura || cintura <= cuello) return null;
  return 495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura)) - 450;
}
function lectura(first, last) {
  const dp = num(last.peso) - num(first.peso), dc = num(last.cintura) - num(first.cintura), db = num(last.brazo) - num(first.brazo);
  if ([dp, dc].some(x => !Number.isFinite(x))) return "Apunta peso y cintura cada semana para ver la tendencia.";
  if (dp > 0.3 && dc <= 0.5) return `Has subido ${fmtN(dp)} kg y la cintura casi no se ha movido${Number.isFinite(db) && db > 0 ? `, y el brazo ha crecido ${fmtN(db)} cm` : ""}. Señal de que ganas sobre todo músculo.`;
  if (dp > 0.3 && dc > 0.5) return `Has subido ${fmtN(dp)} kg y la cintura ${fmtN(dc)} cm. Parte del peso puede ser grasa: si la cintura sigue subiendo, come un poco menos.`;
  if (dp < -0.3 && Number.isFinite(db) && db >= 0) return `Has bajado ${fmtN(-dp)} kg manteniendo el brazo: pierdes grasa sin perder músculo.`;
  if (dp < -0.3) return `Has bajado ${fmtN(-dp)} kg. Si quieres ganar músculo, come un poco más.`;
  return "Peso estable. Para ganar músculo conviene subir poco a poco, con la cintura estable.";
}
function records() {
  return LEVANTAMIENTOS.map(([id, nombre]) => {
    const sesiones = historial.filter(h => h.ej === id && Array.isArray(h.series)).sort((a, b) => a.ts - b.ts)
      .map(h => ({ fecha: h.fecha, e1rm: Math.max(...h.series.map(x => { const kg = num(x.kg), r = Number(x.reps); return kg && r ? kg * (1 + r / 30) : 0; })) }))
      .filter(x => x.e1rm > 0);
    if (!sesiones.length) return null;
    const mejor = sesiones.reduce((a, b) => b.e1rm > a.e1rm ? b : a);
    return { nombre, mejor, primero: sesiones[0], vals: sesiones.map(x => x.e1rm) };
  }).filter(Boolean);
}
function renderMed() {
  const main = $("day");
  main.style.setProperty("--c", "var(--d3)");
  const orden = medidas.slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
  const ult = orden[orden.length - 1], pri = orden[0];
  let altura = num(perfil.altura); if (altura && altura < 3) altura *= 100; // acepta metros o centímetros
  const edad = num(perfil.edad), act = num(perfil.actividad) || 1.7, objetivo = perfil.objetivo || "ganar";
  const peso = ultimoDe(orden, "peso"), cintura = ultimoDe(orden, "cintura"), cuello = ultimoDe(orden, "cuello");
  const imc = peso && altura ? peso / (altura / 100) ** 2 : null;
  const grasa = grasaNavy(cintura, cuello, altura);
  const magra = peso && grasa != null ? peso * (1 - grasa / 100) : null;
  const ffmi = magra && altura ? magra / (altura / 100) ** 2 + 6.1 * (1.8 - altura / 100) : null;
  const mb = peso && altura && edad ? 10 * peso + 6.25 * altura - 5 * edad + 5 : null;
  const ajuste = { ganar: 300, mantener: 0, definir: -400 }[objetivo];
  const kcal = mb ? Math.round((mb * act + ajuste) / 50) * 50 : null;
  const prot = peso ? [Math.round(peso * 1.6), Math.round(peso * 2.2)] : null;
  let ritmo = null;
  const conPeso = orden.filter(m => num(m.peso) != null);
  if (conPeso.length > 1) {
    const a = conPeso[0], b = conPeso[conPeso.length - 1];
    const semanas = (new Date(b.fecha) - new Date(a.fecha)) / 6048e5;
    if (semanas >= 1) ritmo = ((num(b.peso) - num(a.peso)) / semanas) * 4.345;
  }
  const objMes = peso ? [peso * 0.005, peso * 0.01] : null;
  const calc = [
    ["Grasa corporal", grasa != null ? `${fmtN(grasa)} <small>%</small>` : "—", grasa != null ? "Método de la Marina de EE. UU., ±3–4 puntos" : "Necesita altura, cintura y cuello"],
    ["Masa magra", magra ? `${fmtN(magra)} <small>kg</small>` : "—", "Peso sin la grasa: lo que quieres que suba"],
    ["FFMI", ffmi ? fmtN(ffmi) : "—", ffmi ? (ffmi < 20 ? "Por debajo de 20: hay mucho margen para ganar músculo" : ffmi < 22 ? "20–22: musculatura por encima de la media" : ffmi < 25 ? "22–25: muy musculado" : "Por encima de 25: rarísimo sin ayuda") : "Músculo en relación a tu altura"],
    ["IMC", imc ? fmtN(imc) : "—", "Orientativo: no distingue músculo de grasa"],
    ["Calorías al día", kcal ? `${kcal.toLocaleString("es-ES")} <small>kcal</small>` : "—", kcal ? `Mantenimiento ${Math.round(mb * act).toLocaleString("es-ES")} ${ajuste > 0 ? "+" : ""}${ajuste ? ajuste + " para " + (objetivo === "ganar" ? "ganar músculo" : "definir") : ""}` : "Necesita edad, altura y peso"],
    ["Proteína al día", prot ? `${prot[0]}–${prot[1]} <small>g</small>` : "—", "1,6–2,2 g por kilo de peso"],
    ["Ritmo de peso", ritmo != null ? `${fmtD(ritmo, "kg")}<small>/mes</small>` : "—", objMes && objetivo === "ganar" ? `Objetivo para ganar músculo: +${fmtN(objMes[0])} a +${fmtN(objMes[1])} kg al mes` : "Necesita al menos dos semanas de peso"],
  ].map(([k, v, d]) => `<div class="tile"><span class="k">${k}</span><span class="v">${v}</span><span class="dlt">${d}</span></div>`).join("");
  const tiles = PRINCIPALES.map(k => {
    const [, label, u] = METRICAS.find(m => m[0] === k);
    const vals = orden.map(m => num(m[k]));
    const v = ultimoDe(orden, k), v0 = orden.map(m => num(m[k])).find(x => x != null);
    return `<div class="tile"><span class="k">${label}</span><span class="v">${fmtN(v)} <small>${u}</small></span><span class="dlt">${orden.length > 1 && v != null && v0 != null ? fmtD(v - v0, u) + " desde el " + fmtFecha(pri.fecha) : "Desde tu primera medida"}</span>${spark(vals)}</div>`;
  }).join("");
  const filas = orden.slice().reverse().map((m, i, arr) => {
    const prev = arr[i + 1];
    return `<tr><td>${fmtFecha(m.fecha)}</td>${METRICAS.map(([k]) => {
      const v = num(m[k]), p = prev ? num(prev[k]) : null;
      return `<td>${fmtN(v)}${v != null && p != null && v !== p ? `<small>${fmtD(v - p, "")}</small>` : ""}</td>`; }).join("")}<td><button class="x" data-delmed="${m.id}">Borrar</button></td></tr>`;
  }).join("");
  const recs = records();
  main.innerHTML = `<button type="button" class="volver" id="volver">← Volver a la rutina</button>
    <div class="day-title"><h2>Perfil</h2><p>Tus datos, cómo vas y qué comer para crecer</p></div>

    <section class="bloque">
      <h3>Tus datos</h3>
      <form class="medidas-form" id="f-perfil">
        <label>Edad<input id="p-edad" inputmode="numeric" value="${esc(perfil.edad ?? "")}" placeholder="años"></label>
        <label>Altura (cm)<input id="p-altura" inputmode="decimal" value="${esc(altura ?? "")}" placeholder="178"></label>
        <label>Objetivo<select id="p-objetivo">
          <option value="ganar" ${objetivo === "ganar" ? "selected" : ""}>Ganar músculo</option>
          <option value="mantener" ${objetivo === "mantener" ? "selected" : ""}>Mantener</option>
          <option value="definir" ${objetivo === "definir" ? "selected" : ""}>Perder grasa</option></select></label>
        <label>Actividad<select id="p-actividad">
          <option value="1.55" ${act === 1.55 ? "selected" : ""}>Moderada</option>
          <option value="1.7" ${act === 1.7 ? "selected" : ""}>Alta: trabajo activo + gym</option>
          <option value="1.9" ${act === 1.9 ? "selected" : ""}>Muy alta</option></select></label>
        <button type="submit">Guardar datos</button>
      </form>
    </section>

    <section class="bloque">
      <h3>Cómo vas</h3>
      <div class="tiles">${calc}</div>
      ${orden.length > 1 ? `<div class="lectura">${lectura(pri, ult)}</div>` : ""}
    </section>

    <section class="bloque">
      <h3>Medidas de la semana</h3>
      <p class="nota">Una vez por semana, el mismo día, por la mañana en ayunas. Peso, cintura y brazo son lo básico. El cuello sirve para calcular la grasa, y pecho y muslo para ver dónde creces.</p>
      <form class="medidas-form" id="f-med">
        <label>Fecha<input type="date" id="m-fecha" value="${isoHoy()}" required></label>
        ${METRICAS.map(([k, label, u]) => { const v = ultimoDe(orden, k); return `<label>${label} (${u})<input id="m-${k}" inputmode="decimal" placeholder="${v != null ? fmtN(v) : ""}"></label>`; }).join("")}
        <button type="submit">Guardar medida</button>
      </form>
      <p class="nota">Cintura a la altura del ombligo, relajado. Cuello justo debajo de la nuez. Brazo contraído y muslo a media altura, en la parte más ancha.</p>
      ${orden.length ? `<div class="tiles">${tiles}</div>
        <div class="tabla-wrap"><table class="med"><thead><tr><th>Fecha</th>${METRICAS.map(([, l, u]) => `<th>${l} ${u}</th>`).join("")}<th></th></tr></thead><tbody>${filas}</tbody></table></div>`
        : `<p class="empty">Aún no hay medidas. Apunta la primera hoy: en dos o tres semanas ya verás si lo que ganas es músculo.</p>`}
    </section>

    <section class="bloque">
      <h3>Fuerza</h3>
      <p class="nota">Tu máximo estimado a una repetición en los ejercicios principales, calculado con lo que apuntas serie por serie. Si sube mes a mes, estás ganando músculo.</p>
      ${recs.length ? `<div class="tiles">${recs.map(r => `<div class="tile"><span class="k">${r.nombre}</span><span class="v">${fmtN(r.mejor.e1rm, 0)} <small>kg</small></span><span class="dlt">${r.vals.length > 1 ? fmtD(r.mejor.e1rm - r.primero.e1rm, "kg") + " desde el " + fmtFecha(r.primero.fecha) : "Mejor marca el " + fmtFecha(r.mejor.fecha)}</span>${spark(r.vals)}</div>`).join("")}</div>`
        : `<p class="empty">Aparecerá cuando apuntes en modo "Serie por serie" el press de banca, la sentadilla, el rumano, el press militar o el remo.</p>`}
    </section>

    <section class="bloque">
      <h3>Copia de seguridad</h3>
      <p class="nota">Guarda todos tus datos (historial, entrenos, medidas y perfil) en un archivo. Con él puedes recuperarlos si cambias de móvil o pasarlos a otra versión de la app.</p>
      <div class="res-acciones">
        <button type="button" class="fin-btn" id="exportar">Descargar mis datos</button>
        <label class="hist-toggle" for="importar" style="cursor:pointer">Importar un archivo</label>
        <input type="file" id="importar" accept="application/json,.json" hidden>
      </div>
      <div class="cargar">
        <p class="nota"><b>Cargar mi historial guardado.</b> Viaja dentro de la app, cifrado: escribe tu código para abrirlo.</p>
        <div class="res-acciones">
          <input class="codigo-in" id="codigo" placeholder="XXXX-XXXX-XXXX-XXXX" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="24" aria-label="Código del historial">
          <button type="button" class="fin-btn" id="cargar-historial">Cargar historial</button>
        </div>
      </div>
      <p class="nota" id="copia-estado"></p>
    </section>

    <section class="bloque">
      <h3>Fotos de progreso</h3>
      <p class="nota">Cada 2–3 semanas: de frente, de lado y de espaldas, relajado y contraído, por la mañana y con la misma luz. Guárdalas en un álbum del móvil. Si sube el peso y no ves cambio en las fotos ni en el brazo, revisa la comida.</p>
    </section>`;
  $("exportar").addEventListener("click", exportarDatos);
  $("importar").addEventListener("change", e => { const f = e.target.files?.[0]; if (f) importarDatos(f); e.target.value = ""; });
  $("cargar-historial").addEventListener("click", cargarHistorialCifrado);
  $("codigo").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); cargarHistorialCifrado(); } });
  $("volver").addEventListener("click", () => { current = 0; try { localStorage.setItem("rutina-dia", 0); } catch {} render(); });
  $("f-perfil").addEventListener("submit", async e => {
    e.preventDefault(); document.activeElement?.blur?.();
    let alt = num($("p-altura").value); if (alt && alt < 3) alt = Math.round(alt * 100);
    const data = { edad: num($("p-edad").value), altura: alt, objetivo: $("p-objetivo").value, actividad: num($("p-actividad").value) };
    Object.keys(data).forEach(k => data[k] == null && delete data[k]);
    if (docPerfil) { try { await docPerfil.set(data); } catch { alertaEstado("No se pudieron guardar tus datos"); } }
    else { perfil = data; try { localStorage.setItem("rutina-perfil", JSON.stringify(perfil)); } catch {} render(); }
  });
  $("f-med").addEventListener("submit", async e => {
    e.preventDefault();
    document.activeElement?.blur?.();
    const fecha = $("m-fecha").value;
    const data = { fecha };
    METRICAS.forEach(([k]) => { const v = num($("m-" + k).value); if (v != null) data[k] = v; });
    if (Object.keys(data).length < 2) { $("m-peso").focus(); return; }
    if (storeMed) {
      const previo = medidas.find(m => m.id === fecha);
      const { id: _id, ...resto } = previo || {}; try { await storeMed.doc(fecha).set({ ...resto, ...data }); } catch { alertaEstado("No se pudo guardar la medida"); }
    } else {
      const previo = medidas.find(m => m.id === fecha) || {};
      medidas = medidas.filter(m => m.id !== fecha).concat({ ...previo, id: fecha, ...data });
      try { localStorage.setItem("rutina-medidas", JSON.stringify(medidas)); } catch {}
      render();
    }
  });
  main.querySelectorAll("[data-delmed]").forEach(b => b.addEventListener("click", async () => {
    if (!b.dataset.confirm) { b.dataset.confirm = "1"; b.textContent = "¿Seguro?"; return; }
    const id = b.dataset.delmed;
    if (storeMed) { try { await storeMed.doc(id).delete(); } catch { alertaEstado("No se pudo borrar"); } }
    else { medidas = medidas.filter(m => m.id !== id); try { localStorage.setItem("rutina-medidas", JSON.stringify(medidas)); } catch {} render(); }
  }));
}
$("perfil-btn").addEventListener("click", () => { current = current === MED ? 0 : MED; try { localStorage.setItem("rutina-dia", current); } catch {} render(); });

const LS = "rutina-historial";
function saveLocal() { try { localStorage.setItem(LS, JSON.stringify(historial)); } catch {} }

function numSeries(dose) { return Number(dose.split("×")[0]) || 3; }
// Ejercicios de peso corporal: solo repeticiones, sin casilla de kilos
const SIN_PESO = new Set(["crunch-inverso"]);
const sinKg = (x) => x.kg === "" || x.kg == null;
function resumen(series) {
  if (series.every(sinKg)) return `${series.map(x => x.reps).join(", ")} reps`;
  const kgs = [...new Set(series.map(x => x.kg))];
  return kgs.length === 1 ? `${kgs[0]} kg × ${series.map(x => x.reps).join(", ")}` : series.map(x => sinKg(x) ? `${x.reps} reps` : `${x.kg} kg × ${x.reps}`).join(" · ");
}
// Serie a serie: una entrada por ejercicio y día que va creciendo
function entradaHoy(ej) { return historial.find(h => h.ej === ej && h.fecha === isoHoy() && h.porSerie && !cerrada(h)); }
async function escribirHoy(ej, series) {
  const id = entradaHoy(ej)?.id || `${isoHoy()}_${ej}_${Date.now().toString(36)}`;
  const entry = { ej, texto: resumen(series), series, fecha: isoHoy(), ts: entradaHoy(ej)?.ts || Date.now(), porSerie: true };
  document.activeElement?.blur?.();
  if (store) {
    try { series.length ? await store.doc(id).set(entry) : await store.doc(id).delete(); } catch { alertaEstado("No se pudo guardar la serie"); }
  } else {
    historial = historial.filter(h => h.id !== id);
    if (series.length) historial.push({ id, ...entry });
    saveLocal(); render();
  }
}
function guardarSerie(ej, serie, n) {
  const series = [...(entradaHoy(ej)?.series || []), serie];
  iniciarDescanso(ej, n);
  return escribirHoy(ej, series);
}
function deshacerSerie(ej) {
  const series = (entradaHoy(ej)?.series || []).slice(0, -1);
  return escribirHoy(ej, series);
}
async function anotar(ej, texto, series) {
  const entry = { ej, texto, fecha: isoHoy(), ts: Date.now() };
  if (series) entry.series = series;
  if (store) {
    try { await store.add(entry); } catch { alertaEstado("No se pudo guardar la anotación"); }
  } else {
    historial.push({ id: "h" + entry.ts.toString(36), ...entry }); saveLocal(); render();
  }
}
async function borrar(id) {
  if (store) {
    try { await store.doc(id).delete(); } catch { alertaEstado("No se pudo borrar"); }
  } else {
    historial = historial.filter(h => h.id !== id); saveLocal(); render();
  }
}
function alertaEstado(t) { const p = document.createElement("p"); p.className = "empty"; p.textContent = t; $("day").prepend(p); }

// ---- Copia de seguridad: exportar / importar ----
function paqueteDatos() {
  const limpio = (arr) => arr.map(({ id, ...r }) => ({ id, ...r }));
  return { app: "rutina", version: 1, exportado: new Date().toISOString(), historial: limpio(historial), sesiones: limpio(sesiones), medidas: limpio(medidas), perfil };
}
async function exportarDatos() {
  const texto = JSON.stringify(paqueteDatos(), null, 2);
  const nombre = `rutina-${isoHoy()}.json`;
  const estado = (t) => { const el = $("copia-estado"); if (el) el.textContent = t; };
  try {
    const archivo = new File([texto], nombre, { type: "application/json" });
    if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [archivo] })) {
      await navigator.share({ files: [archivo], title: "Copia de la rutina" }); estado("Copia lista: " + nombre); return;
    }
  } catch (err) { if (err?.name === "AbortError") return; }
  try {
    const url = URL.createObjectURL(new Blob([texto], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = nombre; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    estado("Archivo descargado: " + nombre);
  } catch { estado("Este navegador no deja descargar el archivo"); }
}
// Une los datos de una copia con los que ya hay, sin duplicar nada (se reconocen por su identificador).
function aplicarPaquete(d, estado, pisarPerfil) {
  const fusion = (actual, nuevos) => [...actual.filter(a => !(nuevos || []).some(b => b.id === a.id)), ...(nuevos || [])];
  historial = fusion(historial, d.historial); sesiones = fusion(sesiones, d.sesiones); medidas = fusion(medidas, d.medidas);
  if (d.perfil && (pisarPerfil || !Object.keys(perfil).length)) perfil = d.perfil;   // un perfil ya escrito aquí no se pisa al cargar el historial
  guardarTodoLocal(); render();
  estado(`Datos cargados: ${historial.length} anotaciones y ${sesiones.length} entrenamientos`);
}
async function importarDatos(file) {
  const estado = (t) => { const el = $("copia-estado"); if (el) el.textContent = t; };
  let d;
  try { d = JSON.parse(await file.text()); } catch { return estado("Ese archivo no es una copia de la rutina"); }
  if (!["rutina", "rutina-adrian"].includes(d?.app)) return estado("Ese archivo no es una copia de la rutina");
  aplicarPaquete(d, estado, true);
}

// Historial que viaja dentro de la app (datos.enc), cifrado con AES-256: sin el código no se puede leer.
// El código se escribe aquí, en el móvil, y nunca se publica.
async function descifrarHistorial(codigo) {
  const res = await fetch("datos.enc", { cache: "no-store" });
  if (!res.ok) throw new Error("sin-archivo");
  const e = await res.json();
  const de64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(codigo.toUpperCase().replace(/[^A-Z0-9]/g, "")), "PBKDF2", false, ["deriveKey"]);
  const clave = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: de64(e.salt), iterations: e.iter, hash: "SHA-256" }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  const claro = await crypto.subtle.decrypt({ name: "AES-GCM", iv: de64(e.iv) }, clave, de64(e.datos));
  return JSON.parse(new TextDecoder().decode(claro));
}
async function cargarHistorialCifrado() {
  const estado = (t) => { const el = $("copia-estado"); if (el) el.textContent = t; };
  const codigo = $("codigo").value;
  if (codigo.replace(/[^a-z0-9]/gi, "").length < 16) return estado("Escribe el código completo (16 letras y números)");
  estado("Abriendo el historial…");
  let d;
  try { d = await descifrarHistorial(codigo); }
  catch (err) { return estado(err?.message === "sin-archivo" ? "No hay historial guardado en la app" : "Ese código no abre el historial. Revísalo y prueba otra vez."); }
  aplicarPaquete(d, estado, false);
}
function guardarTodoLocal() {
  try {
    localStorage.setItem(LS, JSON.stringify(historial));
    localStorage.setItem("rutina-sesiones", JSON.stringify(sesiones));
    localStorage.setItem("rutina-medidas", JSON.stringify(medidas));
    localStorage.setItem("rutina-perfil", JSON.stringify(perfil));
  } catch {}
}
// Versión independiente: la primera vez que se abre, carga los datos que venían dentro del archivo
try {
  const seed = document.getElementById("seed");
  if (seed && localStorage.getItem(LS) === null) {
    const d = JSON.parse(seed.textContent);
    historial = d.historial || []; sesiones = d.sesiones || []; medidas = d.medidas || []; perfil = d.perfil || {};
    guardarTodoLocal();
  }
} catch {}

try { historial = JSON.parse(localStorage.getItem(LS) || "[]"); } catch {}
try { medidas = JSON.parse(localStorage.getItem("rutina-medidas") || "[]"); } catch {}
try { perfil = JSON.parse(localStorage.getItem("rutina-perfil") || "{}"); } catch {}
try { sesiones = JSON.parse(localStorage.getItem("rutina-sesiones") || "[]"); } catch {}
abrirSiguiente();
render();
