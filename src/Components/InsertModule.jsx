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
    <div className="relative min-h-[100vh]">
      <div className="max-w-screen-xl mx-auto md:px-8 py-5">
        <div className="z-9999 container w-full flex flex-col flex-wrap mx-auto px-2">
          <ol className="flex justify-center items-center w-full mx-auto text-sm font-medium text-center text-gray-100 sm:text-base sticky top-0 bg-white border-2 border-white custom-bg-color-primary py-3 rounded-3xl overflow-hidden">
            {sections.map((section, index) => (
              <>
                {index !== 0 && (
                  <div className="px-2 md:px-3">
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
                    {activeSection === section.id && (
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    )}
                    <a href={"#" + section.id} className="hidden md:inline-flex md:ms-2">
                      {section.menuName}
                    </a>
                    <a href={"#" + section.id} className="inline-flex font-medium md:hidden">
                      {index + 1}.
                    </a>
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
                  className="slider-item p-5 my-5 anchor-target min-h-[80vh] rounded-2xl shadow bg-white border-4 border-gray-200"
                >
                  <h2 className="h-[3rem] flex pl-5 justify-start items-center font-sans font-bold break-normal custom-bg-color-primary text-white text-xl rounded-2xl mb-8">
                    {section.title}
                  </h2>
                  <form className="px-8">
                    {section.fields.map((field, idx) => (
                      <div key={idx} className="md:flex mb-6">
                        <div className="md:w-1/4">
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
                          {field.type === "blockquote" && (
                            <blockquote
                              className="border-l-4 border-purple-600 italic my-4 pl-8 md:pl-7"
                              dangerouslySetInnerHTML={{ __html: field.content }}
                            ></blockquote>
                          )}
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
          <div className='fixed-buttons flex justify-center items-center bottom-5 gap-5'>
            <button
              id="actionButton"
              onClick={handleBackButtonClick}
              className={`cursor-pointer shadow-4xl bg-gray-300 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded-2xl text-xl ${sections.findIndex((section) => section.id === activeSection) === 0 && "hidden"}`}
              type="button"
            >
              Sezione Precedente
            </button>
            <button
              id="actionButton"
              onClick={handleNextButtonClick}
              className={`cursor-pointer shadow-4xl custom-bg-color-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-2xl text-xl`}
              type="button"
            >
              {sections.findIndex((section) => section.id === activeSection) + 1 < sections.length
                ? "Sezione Successiva"
                : "Conferma Inserimento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertModule;