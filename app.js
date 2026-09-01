/* =============================================================================
   BARACCHINO ROSSO — LOGICA DEL SITO
   Legge tutto da DATA (data.js). Non serve modificare questo file per i
   contenuti: cambia solo data.js.
   ========================================================================== */
(function () {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const B  = DATA.brand;

  /* ---------- CONTATTI / LINK GLOBALI ------------------------------------ */
  const waBase = "https://wa.me/" + B.whatsapp;
  const addrFull = B.indirizzo + ", " + B.citta;

  $("#cAddr").textContent = addrFull;
  $("#fAddr").textContent = addrFull;
  ["#cTel", "#fTel"].forEach(sel => {
    const a = $(sel); a.textContent = B.telefono; a.href = "tel:" + B.telefono.replace(/\s/g, "");
  });
  ["#sIg", "#hdrIg"].forEach(sel => $(sel).href = B.instagram);
  $("#sFb").href = B.facebook;
  $("#mapFrame").src = B.mapsEmbed;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- ORARI: "APERTO ORA / CHIUSO" ------------------------------- */
  function toMin(hhmm) { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; }

  function statoApertura(now = new Date()) {
    const day = now.getDay();
    const cur = now.getHours() * 60 + now.getMinutes();

    // finestra di oggi
    const t = DATA.orari[day];
    if (t && !t.chiuso) {
      const apre = toMin(t.apre); let chiude = toMin(t.chiude);
      const overnight = chiude <= apre;      // chiude dopo mezzanotte
      if (!overnight && cur >= apre && cur < chiude) return { open: true, chiude: t.chiude };
      if (overnight && cur >= apre) return { open: true, chiude: t.chiude };
    }
    // finestra di ieri che sconfina dopo mezzanotte
    const yday = (day + 6) % 7;
    const ty = DATA.orari[yday];
    if (ty && !ty.chiuso) {
      const apreY = toMin(ty.apre), chiudeY = toMin(ty.chiude);
      if (chiudeY <= apreY && cur < chiudeY) return { open: true, chiude: ty.chiude };
    }
    // trova prossima apertura
    for (let i = 0; i < 8; i++) {
      const d = (day + i) % 7; const td = DATA.orari[d];
      if (td && !td.chiuso) {
        if (i === 0 && cur < toMin(td.apre)) return { open: false, prossima: "oggi alle " + td.apre };
        if (i > 0) {
          const nomi = ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"];
          return { open: false, prossima: (i === 1 ? "domani" : nomi[d]) + " alle " + td.apre };
        }
      }
    }
    return { open: false, prossima: null };
  }

  function renderStato() {
    const s = statoApertura();
    const box = $("#heroStatus");
    box.classList.remove("open", "closed");
    if (s.open) {
      box.classList.add("open");
      box.querySelector(".txt").textContent = "Aperto ora · fino alle " + s.chiude;
    } else {
      box.classList.add("closed");
      box.querySelector(".txt").textContent = "Chiuso ora" + (s.prossima ? " · riapre " + s.prossima : "");
    }
  }
  renderStato();
  setInterval(renderStato, 60000);

  /* ---------- TABELLA ORARI ---------------------------------------------- */
  (function hours() {
    const nomi = ["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"];
    const idx  = [1,2,3,4,5,6,0];
    const today = new Date().getDay();
    let html = "";
    idx.forEach((d, i) => {
      const t = DATA.orari[d];
      const val = (t && !t.chiuso) ? (t.apre + " – " + t.chiude) : "Chiuso";
      html += `<tr class="${d === today ? "today" : ""}"><td>${nomi[i]}</td><td>${val}</td></tr>`;
    });
    $("#hoursTable").innerHTML = html;
    if (DATA.orariNote) $("#hoursNote").textContent = DATA.orariNote;
  })();

  /* ---------- LISTINO SPIAGGIA ------------------------------------------- */
  function beachHTML() {
    return DATA.spiaggia.aree.map(area => {
      const fasce = area.fasce.map(f => {
        const voci = f.voci.map(v =>
          `<div class="price-row"><span class="n">${v.nome}</span><span class="leader"></span><span class="p">${v.prezzo}</span></div>`
        ).join("");
        return `<div class="fascia"><h4>${f.titolo}</h4>${voci}</div>`;
      }).join("");
      const badge = area.soloMaggiorenni ? `<span class="badge-18">18+</span>` : "";
      return `<div class="beach-card">
        <div class="area-name"><h3>${area.nome}</h3>${badge}</div>
        <p class="area-note">${area.nota || ""}</p>
        ${fasce}
      </div>`;
    }).join("");
  }
  const bhtml = beachHTML();
  if ($("#beachGrid"))  $("#beachGrid").innerHTML  = bhtml;
  if ($("#beachGrid2")) $("#beachGrid2").innerHTML = bhtml;
  if (DATA.spiaggia.periodo) {
    if ($("#beachPeriod"))  $("#beachPeriod").textContent  = DATA.spiaggia.periodo;
    if ($("#beachPeriod2")) $("#beachPeriod2").textContent = DATA.spiaggia.periodo;
  }
  (function incluso() {
    const items = DATA.spiaggia.incluso.map(i =>
      `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>${i}</li>`
    ).join("");
    $("#beachIncluso").innerHTML = `<h4>Cosa è incluso</h4><ul>${items}</ul>`;
  })();

  /* ---------- MENU -------------------------------------------------------- */
  const tagLabel = { pesce: "Pesce", carne: "Carne", veg: "Veg" };
  function menuHTML(nomiListe) {
    const liste = (nomiListe || [])
      .map(nome => DATA.menu.liste[nome])
      .filter(Boolean);            // ignora eventuali nomi scritti male
    return liste.map(list => {
      const items = list.voci.map(v => {
        const star = (v.tag && v.tag.includes("firma")) ? `<span class="star" title="Piatto firma">★</span>` : "";
        const chips = (v.tag || []).filter(t => tagLabel[t])
          .map(t => `<span class="chip ${t}">${tagLabel[t]}</span>`).join("");
        const desc = v.descrizione ? `<div class="mi-desc">${v.descrizione}</div>` : "";
        return `<div class="menu-item">
          <div class="mi-main">
            <span class="mi-name">${v.nome}${star}</span>
            ${chips ? `<span class="mi-tags">${chips}</span>` : ""}
            ${desc}
          </div>
          <span class="mi-price">${v.prezzo}</span>
        </div>`;
      }).join("");
      const sub = list.sottotitolo ? `<p class="blk-sub">${list.sottotitolo}</p>` : "";
      return `<div class="menu-block"><h3>${list.titolo}</h3>${sub}<div class="items">${items}</div></div>`;
    }).join("");
  }
  if ($("#menuPranzo")) $("#menuPranzo").innerHTML = menuHTML(DATA.menu.pranzo);
  if ($("#menuSerate")) $("#menuSerate").innerHTML = menuHTML(DATA.menu.serate);

  /* ---------- EVENTI ----------------------------------------------------- */
  (function events() {
    const wrap = $("#eventsWrap");
    if (!wrap) return;
    const mesi = ["GEN","FEB","MAR","APR","MAG","GIU","LUG","AGO","SET","OTT","NOV","DIC"];
    const future = (DATA.eventi || [])
      .map(e => ({ ...e, dt: new Date(e.data + "T00:00:00") }))
      .filter(e => !isNaN(e.dt) && e.dt >= new Date(new Date().toDateString()))
      .sort((a, b) => a.dt - b.dt);

    if (!future.length) {
      wrap.innerHTML = `<div class="empty-state">
        <h3>Il calendario si accende presto</h3>
        <p>Le prossime serate, gli aperitivi e la musica dal vivo li annunciamo prima su Instagram. Seguici per non perderli.</p>
        <a class="btn btn-primary" href="${B.instagram}" target="_blank" rel="noopener">Seguici su Instagram</a>
      </div>`;
      return;
    }
    wrap.className = "events";
    wrap.innerHTML = future.map(e => `
      <div class="event-card">
        <div class="date"><div class="d">${e.dt.getDate()}</div><div class="m">${mesi[e.dt.getMonth()]}</div></div>
        <div>
          <h3>${e.titolo}</h3>
          ${e.orario ? `<div class="time">Ore ${e.orario}</div>` : ""}
          ${e.descrizione ? `<p>${e.descrizione}</p>` : ""}
        </div>
      </div>`).join("");
  })();

  /* ---------- GALLERY (lazy) --------------------------------------------- */
  function renderGallery(el, list) {
    if (!el || !list) return;
    el.innerHTML = list.map(img =>
      `<figure><img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async"></figure>`
    ).join("");
  }
  renderGallery($("#galleryGrid"), DATA.gallery);
  renderGallery($("#galleryCibo"), DATA.galleryCibo);

  /* ---------- SWITCH DEI TRE MONDI --------------------------------------- */
  const panes = $$(".world-pane");
  const btns  = $$(".world-btn");
  function setWorld(world) {
    document.documentElement.setAttribute("data-mondo", world);
    btns.forEach(b => b.classList.toggle("active", b.dataset.world === world));
    panes.forEach(p => p.classList.toggle("active", p.dataset.pane === world));
    // video serate: parte solo quando serve, in pausa altrove
    const sv = $("#serateVideo");
    if (sv) {
      if (world === "serate") { sv.play().catch(() => {}); }
      else { sv.pause(); }
    }
    // se siamo già scesi oltre lo switch, riallinea la vista subito sotto di esso
    const sw = $("#worldSwitch");
    const swTop = sw.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > swTop - 1) {
      const swH = sw.getBoundingClientRect().height;
      window.scrollTo({ top: swTop - swH + swH, behavior: "smooth" });
    }
    history.replaceState(null, "", "#" + world);
  }
  btns.forEach(b => b.addEventListener("click", () => setWorld(b.dataset.world)));
  $$("[data-world-go]").forEach(b =>
    b.addEventListener("click", () => setWorld(b.dataset.worldGo)));
  // deep-link iniziale
  const initial = (location.hash || "").replace("#", "");
  if (["generale","pranzo","serate"].includes(initial)) setWorld(initial);

  /* ---------- HEADER SCROLL --------------------------------------------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- MODALE PRENOTAZIONE + WHATSAPP ----------------------------- */
  const back = $("#modalBack");
  const formO = $("#formOmbrellone"), formT = $("#formTavolo");
  let mode = "ombrellone";

  function openModal(which) {
    mode = which;
    const isO = which === "ombrellone";
    if (formO) formO.hidden = !isO;
    if (formT) formT.hidden = isO;
    $("#modalTitle").textContent = isO ? "Prenota l'ombrellone" : "Prenota il tavolo";
    $("#modalSub").textContent = "Compila e ti apriamo WhatsApp con il messaggio pronto.";
    // default data = oggi (solo sui campi presenti)
    const today = new Date().toISOString().split("T")[0];
    ["#oData", "#tData"].forEach(sel => {
      const el = $(sel);
      if (el) { el.min = today; if (!el.value) el.value = today; }
    });
    back.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() { back.classList.remove("open"); document.body.style.overflow = ""; }

  // Se esiste un URL esterno per il tavolo, il tasto "tavolo" ci va diretto.
  function handleOpen(which) {
    if (which === "tavolo" && B.prenotazioneTavoloUrl) {
      window.open(B.prenotazioneTavoloUrl, "_blank", "noopener");
      return;
    }
    openModal(which);
  }
  $$("[data-open]").forEach(b => b.addEventListener("click", () => handleOpen(b.dataset.open)));
  $("#modalX").addEventListener("click", closeModal);
  back.addEventListener("click", e => { if (e.target === back) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && back.classList.contains("open")) closeModal(); });

  $("#modalSend").addEventListener("click", () => {
    let msg = "";
    if (mode === "ombrellone") {
      const nome = $("#oNome").value.trim() || "—";
      const data = $("#oData").value ? new Date($("#oData").value + "T00:00:00").toLocaleDateString("it-IT") : "—";
      const num  = $("#oNum").value || "1";
      const tipo = $("#oTipo").value;
      msg = `Ciao Baracchino Rosso, vorrei prenotare in spiaggia.%0A`
          + `Nome: ${nome}%0AData: ${data}%0APostazioni: ${num}%0ATipo: ${tipo}`;
    } else if ($("#tNome")) {
      // ramo usato solo se il form tavolo WhatsApp viene riattivato
      const nome = $("#tNome").value.trim() || "—";
      const pers = $("#tPers").value || "1";
      const data = $("#tData").value ? new Date($("#tData").value + "T00:00:00").toLocaleDateString("it-IT") : "—";
      const ora  = $("#tOra").value || "—";
      msg = `Ciao Baracchino Rosso, vorrei prenotare un tavolo per la serata.%0A`
          + `Nome: ${nome}%0APersone: ${pers}%0AData: ${data}%0AOrario: ${ora}`;
    } else {
      return;
    }
    window.open(waBase + "?text=" + msg, "_blank", "noopener");
  });

  /* ---------- METEO (Open-Meteo, senza chiave) --------------------------- */
  (function weather() {
    const box = $("#weatherBox");
    if (!box || !B.lat || !B.lng) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${B.lat}&longitude=${B.lng}`
              + `&current=temperature_2m,weather_code&timezone=Europe%2FRome`;
    const icons = { clear:"☀︎", cloud:"⛅", rain:"🌧", storm:"⛈", snow:"❄︎", fog:"🌫" };
    function pick(code) {
      if (code === 0) return ["clear","Sereno"];
      if (code <= 3)  return ["cloud","Poco nuvoloso"];
      if (code <= 48) return ["fog","Nebbia"];
      if (code <= 67) return ["rain","Pioggia"];
      if (code <= 77) return ["snow","Neve"];
      if (code <= 82) return ["rain","Rovesci"];
      if (code <= 99) return ["storm","Temporale"];
      return ["cloud","—"];
    }
    fetch(url).then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        const c = d.current; if (!c) throw 0;
        const [k, label] = pick(c.weather_code);
        $("#wIcon").textContent = icons[k] || "☀︎";
        $("#wTemp").textContent = Math.round(c.temperature_2m) + "°";
        $("#wDesc").textContent = label + " · ora a Castel Volturno";
        box.hidden = false;
      })
      .catch(() => { /* meteo non disponibile: resta nascosto, nessun errore visibile */ });
  })();

})();
