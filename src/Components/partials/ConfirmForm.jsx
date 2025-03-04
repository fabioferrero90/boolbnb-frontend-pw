import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Contexts/GlobalContext";
import { FaHeart, FaBed } from "react-icons/fa";
import { MdMeetingRoom, MdWc } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";const ConfirmForm = () => {

  const { previewData, houseTypes } = useGlobalContext();

  const [completePreviewData, setCompletePreviewData] = useState(false);

  useEffect(() => {
    if (
      previewData?.house_name &&
      previewData?.address &&
      previewData?.house_type &&
      previewData?.size &&
      previewData?.bathrooms &&
      previewData?.rooms &&
      previewData?.beds &&
      previewData?.abstract &&
      previewData?.price_pernight
    ) {
      setCompletePreviewData(true);
      console.log(previewData)
    }
  }, [previewData]);

  return (    
    <div className="flex flex-col lg:flex-row gap-8 items-center slider-item p-5 my-5 anchor-target rounded-2xl shadow bg-white border-4 border-gray-200">
      {completePreviewData && (
        <div
        className={`relative max-w-[350px] shrink-0 bg-white border-2 border-gray-200 rounded-lg shadow-sm flex flex-col justify-between`}
      >
        <a>
          <img
            className="rounded-t-lg w-full h-[30vh] object-cover"
            src={URL.createObjectURL(previewData.cover_photo) || "/previewPlaceholder.png"} 
            alt=""
          />
        </a>
        <div className="p-5 flex flex-col flex-grow">
          <div>
            <section className="flex justify-between pb-2">
              <div>
                <a>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    <p>{previewData.house_name}</p>
                    <p className="mb-1 font-normal text-xs text-gray-700">
                      {previewData.address.city} [{previewData.address.province}] -{" "}
                      {previewData.address.address}
                    </p>
                    <p>
                      <span className="text-xs">Tipologia: </span>
                      <span className="mb-3 text-xs tracking-tight text-gray-500 bg-gray-200 px-3 rounded-full">
                        {houseTypes.find(type => type.id == previewData.house_type).type_name}
                      </span>
                    </p>
                  </h5>
                </a>
              </div>
              <div>
                <p className="flex items-center pt-1">
                  <span className="text-xs text-gray-800 pb-2">
                    <strong className="text-lg">
                      {previewData.price_pernight}
                    </strong>
                    € / Notte
                  </span>
                </p>
              </div>
            </section>
            <section className="py-1">
              <div className="flex">
                <PiResizeLight />{" "}
                <span className="text-xs pl-2 pb-2">{previewData.size} Mq</span>
              </div>
              <div className="flex">
                <FaBed />{" "}
                <span className="text-xs pl-2 pb-2">
                  {previewData.beds} letti
                </span>
              </div>
              <div className="flex">
                <MdMeetingRoom />{" "}
                <span className="text-xs pl-2 pb-2">
                  {previewData.rooms} stanze
                </span>
              </div>
              <div className="flex">
                <MdWc />{" "}
                <span className="text-xs pl-2 pb-2">
                  {previewData.bathrooms} bagni
                </span>
              </div>
            </section>
            <p className="my-3 font-normal text-gray-500 h-20 overflow-hidden">
              {previewData.abstract.length > 120
                ? previewData.abstract.slice(0, 120) + "..."
                : previewData.abstract}
            </p>
          </div>
          <div className="flex justify-center items-center pt-3 pb-1 text-xs">
            <span className="text-gray-500 font-bold text-center">
              Questa è un anteprima di ciò che vedranno gli utenti
            </span>
          </div>
        </div>
      </div>
    )}
      <div className="">
        <h4 className="p-2 custom-bg-color-primary text-white rounded-lg">
            <strong>Termini e Condizioni di BoolB&B</strong>
          </h4>
          <ol>
            <li class="py-2 text-sm pt-3">
              Prima di completare la registrazione della tua struttura su
              BoolB&B, ti invitiamo a leggere attentamente i seguenti
              termini e condizioni, cliccando sul tasto di "Conferma"
              accetti integralmente i presenti termini e condizioni.
            </li>
            <li class="py-2">
              1. <strong>Accettazione dei Termini</strong>
              <br/>
              Registrando la
              tua struttura su BoolB&B, accetti di rispettare i termini e
              le condizioni qui riportati. Se non sei d'accordo con uno
              qualsiasi dei termini, ti preghiamo di non procedere con la
              registrazione.
            </li>
            <li class="py-2">
              2. <strong>Responsabilità dell'Utente</strong>
              <br/>
              Sei responsabile dell'accuratezza e della veridicità delle
              informazioni fornite sulla tua struttura. BoolB&B non è
              responsabile per eventuali errori o omissioni nelle
              informazioni fornite dagli utenti.
            </li>
            <li class="py-2">
              3. <strong>Uso del Sito</strong>
              <br/>
              L'uso del sito BoolB&B è consentito solo a scopi leciti. Non è consentito l'uso del
              sito per attività fraudolente, ingannevoli o illegali.
            </li>
            <li class="py-2">
              4. <strong>Modifiche ai Termini</strong>
              <br/>
              BoolB&B si riserva il diritto di modificare i termini e le condizioni in
              qualsiasi momento. Le modifiche saranno comunicate agli
              utenti tramite il sito web. Continuando a utilizzare il sito
              dopo le modifiche, accetti i nuovi termini e condizioni.
            </li>
            <li className="py-2">
              5. <strong>Privacy e Protezione dei Dati</strong>
              <br/>
              I dati personali forniti durante la registrazione saranno trattati
              in conformità con la nostra politica sulla privacy. Ti
              invitiamo a consultare la nostra Privacy Policy per maggiori
              informazioni.
            </li>
            <li className="py-5 text-red-500">
              Cliccando su "Conferma inserimento", dichiari di aver letto
              e accettato i termini e le condizioni sopra riportati.
            </li>
          </ol>
      </div>
    </div>
  );
};

export default ConfirmForm;
