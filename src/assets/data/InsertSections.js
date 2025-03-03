const sections = [
  {
    id: "1",
    menuName: "Info",
    title: "1. Informazioni Generali",
    fields: [
      {
        label: "Nome della struttura",
        type: "text",
        id: "house_name",
        required: true,
        description:
          "Questo sarà il nome visualizzato dagli utenti per identificare la tua struttura",
      },
      {
        label: "Indirizzo della struttura",
        type: "addressAPI",
        id: "address",
        required: true,
        description:
          "Inizia a scrivere l'indirizzo completo di numero civico e selezionane uno tra quelli proposti",
      },
      {
        label: "Tipo di Struttura",
        type: "select",
        id: "house_type",
        required: true,
        description:
          "Seleziona il tipo di struttura che stai inserendo",
      },
      {
        label: "Descrizione della struttura",
        type: "textarea",
        id: "abstract",
        required: true,
        description:
          "Scrivi una breve descrizione che possa incuriosire gli utenti, la creatività verrà premiata 😉",
      }
    ],
  },
  {
    id: "2",
    menuName: "Struttura",
    title: "2. Dati della struttura",
    fields: [
      {
        label: "Dimensione (Metri Quadri)",
        type: "number",
        id: "size",
        required: true,
        description: "Indica la dimensione della struttura",
      },
      {
        label: "Numero di Bagni",
        type: "number",
        id: "bathrooms",
        required: true,
        description: "Quanti bagni sono presenti nella struttura?",
      },
      {
        label: "Numero di Stanze",
        type: "number",
        id: "rooms",
        required: true,
        description: "Quante stanze sono presenti nella struttura?",
      },
      {
        label: "Numero di Letti",
        type: "number",
        id: "beds",
        required: true,
        description: "Quanti letti sono presenti nella struttura?",
      },
      {
        label: "Servizi offerti",
        type: "services",
        id: "services",
        required: true,
        description: "Quali servizi offri nella struttura?",
      },
    ],
  },
  {
    id: "3",
    menuName: "Gestione",
    title: "3. Dati di gestione",
    fields: [
      {
        label: "Nome dell'Host",
        type: "text",
        id: "host-name",
        required: true,
        description:
          "Inserisci il tuo nome, questo verrà visualizzato dagli utenti interessati a contattarti",
      },
      {
        label: "Numero di Telefono",
        type: "phone",
        id: "host-phone",
        required: true,
        description:
          "Questo sarà il numero di telefono a cui gli utenti potranno contattarti",
      },
      {
        label: "Indirizzo Mail",
        type: "text",
        id: "host-mail",
        required: true,
        description:
          "Questa sarà la mail a cui gli utenti potranno inviare messaggi e richieste di prenotazione",
      },
      {
        label: "Prezzo per Notte",
        type: "number",
        id: "price-pernight",
        required: true,
        description:
          "Questo sarà il prezzo visualizzato dagli utenti per una notte di soggiorno",
      },
    ],
  },
  {
    id: "4",
    menuName: "Foto",
    title: "4. Foto della struttura",
    fields: [
      {
        label: "Foto di Copertina",
        type: "upload_single",
        id: "cover_photo",
        description: "Carica la foto di copertina",
      },
      {
        label: "Galleria Foto",
        type: "upload_multiple",
        id: "photo-gallery",
        description: "Carica altre foto della struttura",
      },
    ],
  },
  {
    id: "5",
    menuName: "Conferma",
    title: "5. Conferma Inserimento",
    fields: [
      {
        label: "Condizioni di utilizzo della piattaforma",
        type: "blockquote",
        content: `
          <h4>
            <strong>Termini e Condizioni di BoolB&B</strong>
          </h4>
          <ol>
            <li class="py-2">
              Prima di completare la registrazione della tua struttura su
              BoolB&B, ti invitiamo a leggere attentamente i seguenti
              termini e condizioni. Cliccando sul tasto "Conferma",
              accetti integralmente i presenti termini e condizioni.
            </li>
            <li class="py-2">
              1. <strong>Accettazione dei Termini</strong> Registrando la
              tua struttura su BoolB&B, accetti di rispettare i termini e
              le condizioni qui riportati. Se non sei d'accordo con uno
              qualsiasi dei termini, ti preghiamo di non procedere con la
              registrazione.
            </li>
            <li class="py-2">
              2. <strong>Responsabilità dell'Utente</strong> Sei
              responsabile dell'accuratezza e della veridicità delle
              informazioni fornite sulla tua struttura. BoolB&B non è
              responsabile per eventuali errori o omissioni nelle
              informazioni fornite dagli utenti.
            </li>
            <li class="py-2">
              3. <strong>Uso del Sito</strong> L'uso del sito BoolB&B è
              consentito solo a scopi leciti. Non è consentito l'uso del
              sito per attività fraudolente, ingannevoli o illegali.
            </li>
            <li class="py-2">
              4. <strong>Modifiche ai Termini</strong> BoolB&B si riserva
              il diritto di modificare i termini e le condizioni in
              qualsiasi momento. Le modifiche saranno comunicate agli
              utenti tramite il sito web. Continuando a utilizzare il sito
              dopo le modifiche, accetti i nuovi termini e condizioni.
            </li>
            <li className="py-2">
              5. <strong>Privacy e Protezione dei Dati</strong> I dati
              personali forniti durante la registrazione saranno trattati
              in conformità con la nostra politica sulla privacy. Ti
              invitiamo a consultare la nostra Privacy Policy per maggiori
              informazioni.
            </li>
            <li className="py-2">
              Cliccando su "Conferma inserimento", dichiari di aver letto
              e accettato i termini e le condizioni sopra riportati.
            </li>
          </ol>
        `,
      },
    ],
  },
];

export default sections;