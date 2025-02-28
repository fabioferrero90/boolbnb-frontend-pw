import React, { useState, useRef } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import sections from "../assets/data/InsertSections";
import AddressInput from "./partials/AddressInput";
import "../styles/animations.css";

const InsertModule = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [direction, setDirection] = useState("right");
  const containerRef = useRef(null);

  const handleBackButtonClick = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    if (currentIndex > 0) {
      const nextSectionId = sections[currentIndex - 1].id;
      setDirection("right");
      setActiveSection(nextSectionId);
    }
  };

  const handleNextButtonClick = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    if (currentIndex < sections.length - 1) {
      const nextSectionId = sections[currentIndex + 1].id;
      setDirection("left");
      setActiveSection(nextSectionId);
    }
  };

  const getTransformValue = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    return `translateX(-${currentIndex * 100}%)`;
  };

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto md:px-8 py-5">
        <div className="container w-full flex flex-col flex-wrap mx-auto px-2">
          <ol className="flex justify-center items-center w-full mx-auto text-sm font-medium text-center text-gray-100 sm:text-base sticky top-0 bg-white border-2 border-white custom-bg-color-primary py-3 rounded-3xl overflow-hidden">
            {sections.map((section, index) => (
              <>
                {index !== 0 && (
                  <div className="md:px-3">
                    <IoMdArrowDroprightCircle />
                  </div>
                )}
                <li
                  key={section.id}
                  className={`flex justify-center items-center w-full ${
                    activeSection === section.id && "custom-teal-color font-bold"
                  }`}
                >
                  <span className="flex items-center">
                    <a href={"#" + section.id} className="inline-flex">
                      {section.menuName}
                    </a>
                    {/* <a href={"#" + section.id} className="inline-flex font-medium md:hidden">
                      {index + 1}.
                    </a> */}
                  </span>
                </li>
              </>
            ))}
          </ol>

          <section className="w-full overflow-hidden">
            <div
              className="slider-container"
              ref={containerRef}
              style={{ transform: getTransformValue() }}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="slider-item p-5 my-5 anchor-target rounded-2xl shadow bg-white border-4 border-gray-200"
                >
                  <h2 className="h-[3rem] flex pl-5 justify-start items-center font-sans font-bold break-normal custom-bg-color-primary text-white text-xl rounded-2xl mb-8">
                    {section.title}
                  </h2>
                  <form className="px-8">
                    {section.fields.map((field, idx) => (
                      <div key={idx} className="md:flex mb-6">
                        <div className="md:w-1/5">
                          <label
                            className="block text-gray-800 font-bold md:text-left mb-3 md:mb-0 pr-4"
                            htmlFor={field.id}
                          >
                            {field.label}
                          </label>
                        </div>
                        <div className="md:w-3/4">
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
                              rows="8"
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
                          {/* {field.type === "blockquote" && (
                            <blockquote
                              className="border-l-4 w-3/4 border-purple-600 italic my-4 md:pl-4"
                              dangerouslySetInnerHTML={{ __html: field.content }}
                            ></blockquote>
                          )} */}
                          {field.type === "addressAPI" && (
                            <AddressInput />
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
                  </form>
                </div>
              ))}
            </div>
          </section>
          <div className=' flex justify-center items-center bottom-5 gap-5 sticky'>
            <button
              id="actionButton"
              onClick={handleBackButtonClick}
              className={`cursor-pointer shadow-4xl bg-gray-300 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded-2xl text-xl ${sections.findIndex((section) => section.id === activeSection) === 0 && "hidden"}`}
              type="button"
            >
              Indietro
            </button>
            <button
              id="actionButton"
              onClick={handleNextButtonClick}
              className={`cursor-pointer shadow-4xl custom-bg-color-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-2xl text-xl`}
              type="button"
            >
              {sections.findIndex((section) => section.id === activeSection) + 1 < sections.length
                ? "Avanti"
                : "Conferma Inserimento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertModule;