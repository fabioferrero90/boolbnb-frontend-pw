import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const sections = [
  {
    id: "section1",
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
    title: "3. Indirizzo della struttura",
    fields: [
      {
        label: "Stato",
        type: "text",
        id: "address_state",
        description: "In quale stato si trova la struttura",
      },
      {
        label: "Regione",
        type: "text",
        id: "address_region",
        description: "In quale regione si trova la struttura",
      },
      {
        label: "Provincia",
        type: "text",
        id: "address_province",
        description: "In quale provincia si trova la struttura",
      },
      {
        label: "Città",
        type: "text",
        id: "address_city",
        description: "In quale città si trova la struttura",
      },
      {
        label: "CAP",
        type: "text",
        id: "address_cap",
        description: "In quale città si trova la struttura",
      },
      {
        label: "Via, Corso, Piazza",
        type: "text",
        id: "address_street",
        description: "In quale via si trova la struttura",
      },
      {
        label: "Civico",
        type: "text",
        id: "address_number",
        description: "A quale civico si trova la struttura",
      },
      
    ],
  },
  {
    id: "section4",
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
];

const InsertHouse = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="headbg">
        <div className="max-w-screen-xl mx-auto p-8">
          <section className="flex items-center justify-center gap-8">
            <div className="text">
              <h1 className="block font-bold pb-3 text-5xl text-white text-right self-center">
                Affittare la tua casa con Bool
                <span className="custom-teal-color">B&B</span> è semplice.
              </h1>
              <h4 className="block pb-8 text-white text-right self-center">
                Inizia subito a guadagnare affittando la tua casa a turisti di
                tutto il mondo.
              </h4>
            </div>
            <div>
              <img
                className="rounded-2xl max-w-110"
                src="/houses/casainsert.jpeg"
                alt=""
              />
            </div>
          </section>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="container w-full flex flex-wrap mx-auto px-2 pt-2 lg:pt-2 mt-5">
          <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
            <p className="text-sm flex justify-center items-center font-bold py-2 rounded-lg custom-bg-color-primary text-white">
              Sezioni del form
            </p>
            <div className="block lg:hidden sticky inset-0">
              <button
                id="menu-toggle"
                className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-600 appearance-none focus:outline-none"
              >
                <svg
                  className="fill-current h-3 float-right"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
            </div>
            <div
              className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
              style={{ top: "6em" }}
              id="menu-content"
            >
              <ul className="list-reset py-2 md:py-0">
                {sections.map((section, index) => (
                  <li
                    key={index}
                    className={`py-1 md:my-2 hover:bg-purple-100 lg:hover:bg-transparent border-l-4 ${
                      activeSection === section.id
                        ? "font-bold border-purple-600"
                        : "border-transparent"
                    }`}
                  >
                    <a
                      href={`#${section.id}`}
                      className="block pl-4 align-middle text-gray-700 no-underline hover:text-purple-600"
                    >
                      <span className="pb-1 md:pb-0 text-sm">
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className="w-full lg:w-4/5">
            {sections.map((section, index) => (
              <div
                key={index}
                id={section.id}
                className="p-5 lg:mt-0 rounded-2xl shadow bg-white"
              >
                <h2 className="h-[3rem] flex pl-5 justify-start items-center font-sans font-bold break-normal custom-bg-color-primary text-white text-xl rounded-2xl mb-8">
                  {section.title}
                </h2>
                <form className="px-8">
                  {section.fields.map((field, idx) => (
                    <div key={idx} className="md:flex mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-800 font-bold md:text-left mb-3 md:mb-0 pr-4"
                          htmlFor={field.id}
                        >
                          {field.label}
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        {field.type === "text" && (
                          <input
                            className="form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                            id={field.id}
                            type="text"
                          />
                        )}
                        {field.type === "number" && (
                          <input
                            className="form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                            id={field.id}
                            type="number"
                          />
                        )}
                        {field.type === "textarea" && (
                          <textarea
                            className="form-textarea block w-full rounded-xl border border-gray-300 focus:bg-white"
                            id={field.id}
                            rows="5"
                          ></textarea>
                        )}
                        {field.type === "select" && (
                          <select
                            className="form-multiselect block w-full"
                            multiple
                            id={field.id}
                          >
                            {field.options.map((option, optIdx) => (
                              <option key={optIdx}>{option}</option>
                            ))}
                          </select>
                        )}
                        {field.type === "radio" && (
                          <div className="mt-2">
                            {field.options.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className="inline-flex items-center ml-6"
                              >
                                <input
                                  type="radio"
                                  className="form-radio"
                                  name={field.id}
                                  value={option}
                                />
                                <span className="ml-2">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {field.type === "checkbox" && (
                          <div>
                            {field.options.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className="inline-flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  defaultChecked
                                />
                                <span className="ml-2">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        <p className="py-2 text-sm text-gray-800">
                          {field.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                      <button
                        onClick={() =>
                          document
                            .getElementById(
                              sections[index + 1]?.id || "section6"
                            )
                            .scrollIntoView({ behavior: "smooth" })
                        }
                        className="cursor-pointer shadow custom-bg-color-primary hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                      >
                        {index < sections.length
                          ? "Sezione Successiva"
                          : "Conferma inserimento"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ))}
            <hr className="bg-gray-300 my-12" />
            <div
              id="section6"
              className="p-8 mt-6 lg:mt-0 rounded shadow bg-white"
            >
              <h2 className="h-[3rem] flex pl-5 justify-start items-center font-sans font-bold break-normal custom-bg-color-primary text-white text-xl rounded-2xl mb-8">
                6. Conferma inserimento
              </h2>
              <blockquote className="border-l-4 border-purple-600 italic my-4 pl-8 md:pl-12">
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
              </blockquote>
              <div className="pt-8">
                <button
                  className="shadow custom-bg-color-primary hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-xl mr-4"
                  type="button"
                >
                  Conferma inserimento
                </button>
                <button
                  className="shadow bg-purple-100 hover:bg-purple-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded-xl mr-4"
                  type="button"
                >
                  Leggi la Privacy Policy
                </button>
                <button
                  className="shadow bg-purple-100 hover:bg-purple-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded-xl"
                  type="button"
                >
                  Leggi i Termini e Condizioni
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InsertHouse;
