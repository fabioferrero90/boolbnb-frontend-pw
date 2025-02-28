const sections = [
  {
    id: "section1",
    menuName: "Host",
    title: "1. Dati personali",
    fields: [
      {
        label: "Nome della struttura",
        type: "text",
        id: "structure-name",
        description:
          "Questo sarà il nome visualizzato dagli utenti per identificare la tua struttura",
      },
      {
        label: "Nome dell'Host",
        type: "text",
        id: "host-name",
        description:
          "Inserisci il tuo nome, questo verrà visualizzato dagli utenti interessati a contattarti",
      },
      {
        label: "Descrizione della struttura",
        type: "textarea",
        id: "structure-description",
        description:
          "Scrivi una breve descrizione che possa incuriosire gli utenti, la creatività verrà premiata 😉",
      },
    ],
  },
  {
    id: "section2",
    menuName: "Struttura",
    title: "2. Dati della struttura",
    fields: [
      {
        label: "Dimensione (Metri Quadri)",
        type: "number",
        id: "size",
        description: "Indica la dimensione della struttura",
      },
      {
        label: "Numero di Bagni",
        type: "number",
        id: "bathrooms",
        description: "Quanti bagni sono presenti nella struttura?",
      },
      {
        label: "Numero di Stanze",
        type: "number",
        id: "rooms",
        description: "Quante stanze sono presenti nella struttura?",
      },
      {
        label: "Numero di Letti",
        type: "number",
        id: "beds",
        description: "Quanti letti sono presenti nella struttura?",
      },
    ],
  },
  {
    id: "section3",
    menuName: "Indirizzo",
    title: "3. Indirizzo della struttura",
    fields: [
      {
        label: "Stato",
        type: "text",
        id: "address_state",
        description: "In quale stato si trova la struttura?",
      },
      {
        label: "Regione",
        type: "text",
        id: "address_region",
        description: "In quale regione si trova la struttura?",
      },
      {
        label: "Provincia",
        type: "text",
        id: "address_province",
        description: "In quale provincia si trova la struttura?",
      },
      {
        label: "Città",
        type: "text",
        id: "address_city",
        description: "In quale città si trova la struttura?",
      },
      {
        label: "CAP",
        type: "text",
        id: "address_cap",
        description: "Qual'è il CAP della città dove si trova la struttura?",
      },
      {
        label: "Via, Corso, Piazza",
        type: "text",
        id: "address_street",
        description: "In quale via si trova la struttura?",
      },
      {
        label: "Civico",
        type: "text",
        id: "address_number",
        description: "A quale civico si trova la struttura?",
      },

    ],
  },
  {
    id: "section4",
    menuName: "Contatti",
    title: "4. Dati di contatto",
    fields: [
      {
        label: "Radio Buttons",
        type: "radio",
        id: "radio-buttons",
        options: ["Radio A", "Radio B"],
        description: "add notes about populating the field",
      },
      {
        label: "Checkboxes",
        type: "checkbox",
        id: "checkboxes",
        options: ["Option 1", "Option 2", "Option 3"],
        description: "add notes about populating the field",
      },
    ],
  },
  {
    id: "section5",
    menuName: "Foto",
    title: "5. Foto della struttura",
    fields: [
      {
        label: "Continua",
        type: "radio",
        id: "photo-radio",
        options: ["Radio A", "Radio B"],
        description: "add notes about populating the field",
      },
      {
        label: "Checkboxes",
        type: "checkbox",
        id: "photo-checkboxes",
        options: ["Option 1", "Option 2", "Option 3"],
        description: "add notes about populating the field",
      },
    ],
  },
  {
    id: "section6",
    menuName: "Conferma",
    title: "6. Conferma Inserimento",
    fields: [
      {
        label: "Conferma",
        type: "blockquote",
        content: `
          <h4>
            <strong>Termini e Condizioni di BoolB&B</strong>
          </h4>
          <ol>
            <li className="py-2">
              Prima di completare la registrazione della tua struttura su
              BoolB&B, ti invitiamo a leggere attentamente i seguenti
              termini e condizioni. Cliccando sul tasto "Conferma",
              accetti integralmente i presenti termini e condizioni.
            </li>
            <li className="py-2">
              1. <strong>Accettazione dei Termini</strong> Registrando la
              tua struttura su BoolB&B, accetti di rispettare i termini e
              le condizioni qui riportati. Se non sei d'accordo con uno
              qualsiasi dei termini, ti preghiamo di non procedere con la
              registrazione.
            </li>
            <li className="py-2">
              2. <strong>Responsabilità dell'Utente</strong> Sei
              responsabile dell'accuratezza e della veridicità delle
              informazioni fornite sulla tua struttura. BoolB&B non è
              responsabile per eventuali errori o omissioni nelle
              informazioni fornite dagli utenti.
            </li>
            <li className="py-2">
              3. <strong>Uso del Sito</strong> L'uso del sito BoolB&B è
              consentito solo a scopi leciti. Non è consentito l'uso del
              sito per attività fraudolente, ingannevoli o illegali.
            </li>
            <li className="py-2">
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