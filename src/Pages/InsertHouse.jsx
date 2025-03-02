import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import sections from "../assets/data/InsertSections";

const InsertHouse = () => {

  return (
    <div className="relative">
      <div className="headbg">
        <div className="max-w-screen-xl mx-auto p-8">
          <section className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text max-w-[90%] lg:max-w-[50%]">
              <h1 className="block font-bold pb-3 text-4xl text-white text-center md:text-right self-center">
                Affittare la tua casa con Bool
                <span className="custom-teal-color">B&B</span> è veramente facile!.
              </h1>
              <h4 className="block pb-8 text-white text-center md:text-right self-center">
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
      <div className="max-w-screen-xl flex flex-col justify-center items-center mx-auto py-9 md:p-8 px-2">
        <h2 className="text-center font-bold pt-2 text-2xl">Come procedere all'inserimento della tua struttura?</h2>
        <p className="text-center py-2">
          Inserire la tua casa, B&B o struttura alberghiera su BoolB&B è semplice e guidato. Ti verranno richiesti i dati generici della struttura e i dati di contatto per fare in modo che gli utenti della piattaforma possano contattarti facilmente. Dopo aver completato la procedura, potrai subito iniziare a guadagnare con BoolB&B.
        </p>
        <p className="text-center py-2">
          La procedura di inserimento è stata progettata per essere intuitiva e veloce. Durante il processo, ti guideremo passo dopo passo, assicurandoci che tu fornisca tutte le informazioni necessarie per rendere la tua struttura attraente per i potenziali ospiti. Non preoccuparti se non hai mai fatto qualcosa di simile prima, siamo qui per aiutarti in ogni fase.
        </p>
        <p className="text-center py-2">
          Una volta completato l'inserimento, la tua struttura sarà visibile sulla nostra piattaforma e potrai iniziare a ricevere prenotazioni immediatamente. Non perdere l'opportunità di guadagnare condividendo la tua casa con viaggiatori da tutto il mondo.
        </p>

        <h2 className="text-center font-bold text-xl py-2">Compila il modulo ora:</h2>
        <button className="custom-bg-color-primary text-white font-bold py-2 px-4 rounded-full mt text-xl">
          <a href="/insertnew">Inserisci la tua struttura</a>
        </button>
      </div>
      
    </div>
  );
};

export default InsertHouse;