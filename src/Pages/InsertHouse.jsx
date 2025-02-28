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
      <div className="max-w-screen-xl flex flex-col justify-center items-center mx-auto py-9 md:p-8">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga et consectetur cum doloribus similique possimus sequi necessitatibus! Doloribus repellat minus, in totam quaerat, ut odio, cumque a iure odit aut.
        </p>

        <h2 className="text-center font-bold pt-5">Compila il modulo ora</h2>
        <button className="custom-bg-color-primary text-white font-bold py-2 px-4 rounded-full mt">
          <a href="/insertnew">Inserisci la tua struttura</a>
        </button>
      </div>
    </div>
  );
};

export default InsertHouse;