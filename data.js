/* =============================================================================
   BARACCHINO ROSSO — DATI DEL SITO (UNICO FILE DA MODIFICARE)
   -----------------------------------------------------------------------------
   Qui dentro c'è TUTTO il contenuto del sito: contatti, orari, listino
   spiaggia, menu, vini, eventi. Per cambiare un prezzo, un orario o un piatto
   modifica SOLO questo file. Non serve toccare il layout.

   Come si scrive un prezzo:  prezzo: "16€"   (metti sempre le virgolette)
   Come si aggiunge un piatto: copia una riga { ... } e cambiala.
   Come si toglie un piatto:   cancella la sua riga { ... } (e la virgola).
   ========================================================================== */

const DATA = {

  /* --- ANAGRAFICA / CONTATTI ------------------------------------------- */
  brand: {
    nome: "Baracchino Rosso",
    tagline: "Mediterranean Club",
    claim: "Lido e ristorante sul mare di Castel Volturno",
    // Numero per WhatsApp e telefono. Formato internazionale, solo cifre.
    whatsapp: "393501427341",
    telefono: "+39 350 142 7341",
    email: "",                       // lascia "" se non c'è
    indirizzo: "Via N. Paganini, km 40.400",
    citta: "81030 Castel Volturno (CE)",
    // Coordinate per mappa e meteo (Castel Volturno, lido).
    lat: 41.0206,
    lng: 13.9330,
    mapsEmbed: "https://www.google.com/maps?q=Lido%20Baracchino%20Rosso%20Castel%20Volturno&output=embed",
    mapsLink: "https://www.google.com/maps/place/Lido+Baracchino+Rosso/@41.0206,13.9330,15z",
    instagram: "https://www.instagram.com/lido_baracchinorosso/",
    facebook: "https://www.facebook.com/Lidobaracchinorosso/",
    // URL prenotazione tavolo. Se compilato, TUTTI i pulsanti "Tavolo / Serata"
    // aprono questo indirizzo. Lascia "" per tornare al vecchio form WhatsApp.
    prenotazioneTavoloUrl: "prenota.html?c=baracchino-rosso"
  },

  /* --- ORARI DI APERTURA ---------------------------------------------------
     Formato 24h "HH:MM". Se chiude dopo mezzanotte, usa una chiusura tipo
     "01:00": il sito capisce da solo che è il giorno dopo.
     Per un giorno di chiusura metti:  { chiuso: true }
  ------------------------------------------------------------------------- */
  orari: {
    0: { apre: "09:00", chiude: "01:00" }, // Domenica
    1: { apre: "09:00", chiude: "20:00" }, // Lunedì
    2: { apre: "09:00", chiude: "20:00" }, // Martedì
    3: { apre: "09:00", chiude: "01:00" }, // Mercoledì
    4: { apre: "09:00", chiude: "01:00" }, // Giovedì
    5: { apre: "09:00", chiude: "01:00" }, // Venerdì
    6: { apre: "09:00", chiude: "01:00" }  // Sabato
  },
  orariNote: "Cucina serale attiva da mercoledì a domenica.",

  /* --- LISTINO SPIAGGIA ----------------------------------------------------
     Il lido ha due aree: MARE e PISCINA (piscina solo maggiorenni).
     Prezzi ingressi Agosto 2026 (dal listino ufficiale).
  ------------------------------------------------------------------------- */
  spiaggia: {
    periodo: "Ingressi Agosto 2026",
    incluso: [
      "Accesso alla spiaggia privata e alla battigia",
      "Doccia, spogliatoi e servizi",
      "Servizio bar e ristorante al lettino",
      "Wi-Fi libero e parcheggio nelle vicinanze"
    ],
    aree: [
      {
        nome: "Mare",
        nota: "La spiaggia con sabbia fine e fondale basso, ideale per le famiglie.",
        fasce: [
          {
            titolo: "Lun – Ven",
            voci: [
              { nome: "Lettino", prezzo: "10€" },
              { nome: "Ombrellone", prezzo: "10€" },
              { nome: "Lettino + drink", prezzo: "15€" },
              { nome: "Postazione bamboo · 2 persone", prezzo: "36€" }
            ]
          },
          {
            titolo: "Sabato & Domenica",
            voci: [
              { nome: "Lettino", prezzo: "12€" },
              { nome: "Ombrellone", prezzo: "12€" },
              { nome: "Lettino + drink", prezzo: "17€" },
              { nome: "Postazione bamboo · 2 persone", prezzo: "45€" },
              { nome: "Capanna · 2 persone", prezzo: "45€" }
            ]
          }
        ]
      },
      {
        nome: "Piscina",
        nota: "Area solarium con piscina, riservata agli ospiti maggiorenni.",
        soloMaggiorenni: true,
        fasce: [
          {
            titolo: "Lun – Ven",
            voci: [
              { nome: "Lettino", prezzo: "12€" },
              { nome: "Ombrellone", prezzo: "12€" },
              { nome: "Lettino + drink", prezzo: "15€" }
            ]
          },
          {
            titolo: "Sabato & Domenica",
            voci: [
              { nome: "Lettino", prezzo: "15€" },
              { nome: "Ombrellone", prezzo: "15€" },
              { nome: "Lettino + drink", prezzo: "20€" }
            ]
          }
        ]
      }
    ]
  },

  /* --- MENU ----------------------------------------------------------------
     COME FUNZIONA:
     1) In "liste" definisci OGNI lista una sola volta (Take Away, Antipasti,
        Vini...). Ogni voce: nome, prezzo, (facoltativo) descrizione e tag.
        Tag disponibili: "pesce", "carne", "veg", "firma"
        ("firma" mette la stellina sui piatti-simbolo).
     2) In "pranzo" e "serate" scrivi solo i NOMI delle liste da mostrare,
        nell'ordine che vuoi. Così una stessa lista può comparire in entrambe
        le sezioni: la modifichi in un punto solo e si aggiorna ovunque.
        Per togliere una lista da una sezione, cancella il suo nome dall'elenco.
  ------------------------------------------------------------------------- */
  menu: {

    // ============ LE LISTE (definite una volta sola) ============
    liste: {

      takeaway: {
        titolo: "Take Away · Ristobar",
        sottotitolo: "Tu prendi e porti a tavola. Food · Bar · Stile.",
        voci: [
          { nome: "Panino con la mortadella", prezzo: "5€" },
          { nome: "Panino prosciutto crudo", prezzo: "5€" },
          { nome: "Panino crudo e mozzarella", prezzo: "7€" },
          { nome: "Panino cotoletta & patatine", prezzo: "8€" },
          { nome: "Bruschettone pomodoro & stracciata", prezzo: "8€", tag: ["veg"] },
          { nome: "Patatine fritte", prezzo: "6€", tag: ["veg"] },
          { nome: "Frittura all'italiana", prezzo: "5€" },
          { nome: "Frittura gamberi & calamari", prezzo: "13€", tag: ["pesce", "firma"] },
          { nome: "Insalata di pasta", prezzo: "7€" },
          { nome: "Penne al sugo", prezzo: "5€", tag: ["veg"] },
          { nome: "Pasta al forno", prezzo: "7€" }
        ]
      },

      antipasti: {
        titolo: "Menu Mediterraneo · Antipasti",
        voci: [
          { nome: "Insalata di mare", prezzo: "16€", tag: ["pesce"] },
          { nome: "Bruschettone crema di tartufo e tartare di Fassona", prezzo: "17€", tag: ["carne"] },
          { nome: "Bruschettone stracciata di mozzarella, tartare di gamberi e lime", prezzo: "16€", tag: ["pesce", "firma"] }
        ]
      },

      primi: {
        titolo: "Menu Mediterraneo · Primi",
        voci: [
          { nome: "Trofie alla Nerano", prezzo: "17€", tag: ["veg", "firma"] },
          { nome: "Linguine con vongole e pomodorino confit", prezzo: "20€", tag: ["pesce"] },
          { nome: "Spaghetti al riccio di mare", prezzo: "23€", tag: ["pesce", "firma"] }
        ]
      },

      secondi: {
        titolo: "Menu Mediterraneo · Secondi",
        voci: [
          { nome: "Frittura di gamberi, calamari e verdurine", prezzo: "22€", tag: ["pesce", "firma"] },
          { nome: "Grigliata di mare", prezzo: "25€", tag: ["pesce"] },
          { nome: "Black Angus con patate al forno", prezzo: "27€", tag: ["carne"] }
        ]
      },

      viniBianchi: {
        titolo: "Carta dei Vini · Bianchi",
        voci: [
          { nome: "Falanghina Sciore", prezzo: "24€" },
          { nome: "Falanghina Colli Ramati", prezzo: "28€" },
          { nome: "Fiano Colli Ramati", prezzo: "28€" },
          { nome: "Fiano Sciore", prezzo: "24€" },
          { nome: "Greco Colli Ramati", prezzo: "28€" },
          { nome: "Greco Sciore", prezzo: "24€" },
          { nome: "Coda di Volpe Sciore", prezzo: "24€" },
          { nome: "Gewürztraminer Maison Castel", prezzo: "35€" },
          { nome: "Chardonnay Colterenzio", prezzo: "35€" },
          { nome: "Sauvignon Blanc Rue La Fayette", prezzo: "35€" },
          { nome: "Chenin Blanc Villiera", prezzo: "35€" },
          { nome: "Blangé Ceretto", prezzo: "40€" },
          { nome: "Ribolla Gialla Ca' del Borgo", prezzo: "30€" },
          { nome: "Cavabianca Terre Carsiche", prezzo: "45€" },
          { nome: "Chablis Domaine Michaut Frères", prezzo: "45€" }
        ]
      },

      viniRose: {
        titolo: "Carta dei Vini · Rosé",
        voci: [
          { nome: "Federica Vitis Aurunca", prezzo: "35€" }
        ]
      },

      bollicine: {
        titolo: "Carta dei Vini · Bollicine",
        voci: [
          { nome: "Exilia Colli Ramati", prezzo: "35€" },
          { nome: "Franciacorta Ferghettina Brut", prezzo: "60€" },
          { nome: "Franciacorta Ca' del Bosco", prezzo: "80€" },
          { nome: "Champagne Pannier Brut", prezzo: "65€" },
          { nome: "Champagne Pannier Blanc de Blancs", prezzo: "95€" },
          { nome: "Champagne Mumm", prezzo: "85€" },
          { nome: "Champagne Mumm Ice", prezzo: "130€" },
          { nome: "Champagne Moët Ice", prezzo: "150€" },
          { nome: "Champagne Moët Ice Rosé", prezzo: "180€" }
        ]
      }
    },

    // ============ QUALI LISTE MOSTRARE IN OGNI SEZIONE ============
    // Scrivi i nomi delle liste, nell'ordine che vuoi.
    pranzo: ["takeaway", "antipasti", "primi", "secondi"],
    serate: ["antipasti", "primi", "secondi", "viniBianchi", "viniRose", "bollicine"]
  },

  /* --- EVENTI --------------------------------------------------------------
     Aggiungi le serate qui. Se lasci la lista vuota [] compare un messaggio
     che invita a seguire Instagram. La data usa il formato "AAAA-MM-GG".
  ------------------------------------------------------------------------- */
  eventi: [
    // Esempio: { titolo: "Aperitivo al tramonto", data: "2026-08-15", orario: "19:00", descrizione: "Dj set e cocktail vista mare." },
  ],

  /* --- GALLERIA GENERALE (mostrata nella sezione Generale) -----------------
     Solo foto d'ambiente: spiaggia, tramonto, cabine, serate.
  ------------------------------------------------------------------------- */
  gallery: [
    { src: "assets/lido/lido-09.webp", alt: "Ombrellone in macramè contro il cielo azzurro" },
    { src: "assets/lido/lido-04.webp", alt: "File di lettini in bambù con ombrelloni in macramè" },
    { src: "assets/lido/lido-03.webp", alt: "Cabine e gazebo in legno lungo la spiaggia" },
    { src: "assets/lido/lido-01.webp", alt: "Piscina con palma e tenda al tramonto" },
    { src: "assets/lido/lido-05.webp", alt: "Tavoli in terrazza al tramonto sul mare" },
    { src: "assets/lido/lido-06.webp", alt: "Calici di vino al tramonto sul mare" },
    { src: "assets/lido/lido-08.webp", alt: "Grande luna luminosa nell'area serale" },
    { src: "assets/lido/lido-02.webp", alt: "Insegna al neon Baracchino Rosso" },
    { src: "assets/lido/lido-07.webp", alt: "Insegna lavagna con il logo del lido" }
  ],

  /* --- GALLERIA CIBO (mostrata solo nella sezione Pranzo) ------------------ */
  galleryCibo: [
    { src: "assets/pranzo/food-03.webp", alt: "Frittura di gamberi e calamari" },
    { src: "assets/pranzo/food-01.webp", alt: "Spaghetti al riccio di mare" },
    { src: "assets/pranzo/food-02.webp", alt: "Trofie e piatti mediterranei" },
    { src: "assets/pranzo/food-04.webp", alt: "Tartare di pesce servita al tavolo" }
  ]
};
