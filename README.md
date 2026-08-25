# Baracchino Rosso — Sito web

Sito statico (HTML + CSS + JavaScript, nessun server). Spiaggia + ristorante,
con tre sezioni selezionabili: **Generale · Pranzo · Serate**.

## Come modificare i contenuti

**Tutto il contenuto sta in un solo file: `data.js`.** Non serve toccare altro.

Apri `data.js` con un editor di testo (o direttamente su GitHub) e cambia ciò che ti serve:

- **Prezzi spiaggia** → sezione `spiaggia`. Scrivi sempre il prezzo tra virgolette: `prezzo: "12€"`.
- **Menu (pranzo e serate)** → sezione `menu`. Prima definisci le liste dentro `liste`
  (ogni piatto è una riga `{ nome: "...", prezzo: "..." }`); poi in `pranzo` e `serate`
  scrivi solo i **nomi** delle liste da mostrare. Così la stessa lista può stare in entrambe
  le sezioni e la modifichi una volta sola. Per la stellina "piatto firma" aggiungi
  `tag: ["firma"]`. Altri tag: `"pesce"`, `"carne"`, `"veg"`.
- **Orari** → sezione `orari`. Formato 24 ore. Se chiudi dopo mezzanotte metti `"01:00"`: il sito capisce da solo.
  Per un giorno di chiusura: `{ chiuso: true }`.
- **Eventi / serate** → sezione `eventi`. Copia l'esempio commentato e togli le `//` davanti.
  Se lasci la lista vuota, il sito mostra da solo l'invito a seguire Instagram.
- **Numero WhatsApp, indirizzo, social** → sezione `brand`.
- **Prenotazione tavolo con sito esterno** (es. TheFork): metti l'indirizzo in `prenotazioneTavoloUrl`.
  Se resta vuoto (`""`), il tasto "Prenota tavolo" usa WhatsApp.

Dopo aver salvato `data.js`, il sito è aggiornato. Se usi GitHub Pages, basta fare "commit".

## Come pubblicare su GitHub Pages

1. Crea un repository su GitHub e carica tutti questi file (mantieni la cartella `assets`).
2. Vai su **Settings → Pages**.
3. In "Source" scegli il branch `main` e la cartella `/ (root)`. Salva.
4. Dopo qualche minuto il sito è online all'indirizzo che GitHub ti mostra.

Il file `.nojekyll` è già incluso: serve a far funzionare correttamente le cartelle.

## Foto

Le foto stanno in `assets/`. Per cambiarle, sostituisci i file mantenendo lo stesso nome,
oppure aggiungine di nuove e aggiorna la lista `gallery` dentro `data.js`.
Consiglio: salva le foto in formato `.webp` e larghe max 1400px, così il sito resta veloce.

## File del progetto

- `index.html` — la struttura della pagina
- `style.css` — la grafica
- `app.js` — la logica (menu, orari, prenotazioni, meteo)
- `data.js` — **il file dei contenuti (quello che modifichi tu)**
- `assets/` — foto, logo e video di sfondo
