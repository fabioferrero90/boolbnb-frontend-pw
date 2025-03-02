import React, { useState, useRef } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import sections from "../assets/data/InsertSections";
import AddressInput from "./partials/AddressInput";
import "../styles/animations.css";

const InsertModule = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [direction, setDirection] = useState("right");
  const [errors, setErrors] = useState({});
  const containerRef = useRef(null);
  const fieldRefs = useRef({});

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

  const validateSection = () => {
    const currentSection = sections.find(
      (section) => section.id === activeSection
    );
    const newErrors = {};
    currentSection.fields.forEach((field) => {
      if (field.type === "addressAPI") {
        const addressValue = fieldRefs.current["address"]?.value;
        if (!addressValue) {
          newErrors["address"] = "Questo campo è obbligatorio";
        } else {
          const geo = getGeocode({ address: addressValue }).then((results) => {
            const addressComponents = results[0].address_components;
            const address = {
              Stato: getAddressComponent(addressComponents, "country"),
              Regione: getAddressComponent(addressComponents, "administrative_area_level_1"),
              Provincia: getAddressComponent(addressComponents, "administrative_area_level_2", "short_name"),
              Città: getAddressComponent(addressComponents, "locality"),
              CAP: getAddressComponent(addressComponents, "postal_code"),
              Via: getAddressComponent(addressComponents, "route"),
              Civico: getAddressComponent(addressComponents, "street_number"),
            };

            if (!address.Civico) {
              newErrors["address"] = "Indirizzo incompleto: Il Numero Civico è obbligatorio";
            } else if (!address.Via) {
              newErrors["address"] = "Indirizzo incompleto: La Via è obbligatoria";
            } else if (!address.CAP) {
              newErrors["address"] = "Indirizzo incompleto: Il CAP è obbligatorio";
            } else if (!address.Città) {
              newErrors["address"] = "Indirizzo incompleto: La Città è obbligatoria";
            } else if (!address.Provincia) {
              newErrors["address"] = "Indirizzo incompleto: La Provincia è obbligatoria";
            } else if (!address.Regione) {
              newErrors["address"] = "Indirizzo incompleto: La Regione è obbligatoria";
            } else if (!address.Stato) {
              newErrors["address"] = "Indirizzo incompleto: Lo Stato è obbligatorio";
            }
            console.log(geo)
          });
        }
      } else {
        const fieldValue = fieldRefs.current[field.id]?.value;
        if (field.required && (!fieldValue || fieldValue === "")) {
          newErrors[field.id] = `Questo campo è obbligatorio`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextButtonClick = () => {
    if (validateSection()) {
      const currentIndex = sections.findIndex(
        (section) => section.id === activeSection
      );
      if (currentIndex < sections.length - 1) {
        const nextSectionId = sections[currentIndex + 1].id;
        setDirection("left");
        setActiveSection(nextSectionId);
      }
    }
  };

  const handleMenuClick = (sectionId) => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    const newIndex = sections.findIndex((section) => section.id === sectionId);
    setDirection(newIndex > currentIndex ? "left" : "right");
    setActiveSection(sectionId);
  };

  const getTransformValue = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    return `translateX(-${currentIndex * 100}%)`;
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "GetFullAddress",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      const newErrors = {};
      getGeocode({ address: description }).then((results) => {
        const addressComponents = results[0].address_components;
        const address = {
          Stato: getAddressComponent(addressComponents, "country"),
          Regione: getAddressComponent(addressComponents, "administrative_area_level_1"),
          Provincia: getAddressComponent(addressComponents, "administrative_area_level_2", "short_name"),
          Città: getAddressComponent(addressComponents, "locality"),
          CAP: getAddressComponent(addressComponents, "postal_code"),
          Via: getAddressComponent(addressComponents, "route"),
          Civico: getAddressComponent(addressComponents, "street_number"),
        };

        if (!address.Civico) {
          newErrors["address"] = "Indirizzo incompleto: Il Numero Civico è obbligatorio";
        } else if (!address.Via) {
          newErrors["address"] = "Indirizzo incompleto: La Via è obbligatoria";
        } else if (!address.CAP) {
          newErrors["address"] = "Indirizzo incompleto: Il CAP è obbligatorio";
        } else if (!address.Città) {
          newErrors["address"] = "Indirizzo incompleto: La Città è obbligatoria";
        } else if (!address.Provincia) {
          newErrors["address"] = "Indirizzo incompleto: La Provincia è obbligatoria";
        } else if (!address.Regione) {
          newErrors["address"] = "Indirizzo incompleto: La Regione è obbligatoria";
        } else if (!address.Stato) {
          newErrors["address"] = "Indirizzo incompleto: Lo Stato è obbligatorio";
        } else {
          setErrors({});
          console.log("📍 Address: ", address);
        }
      });
    };

  const getAddressComponent = (components, type) => {
    const component = components.find((c) => c.types.includes(type));
    if (type == "administrative_area_level_2") {
      return component ? component.short_name : "";
    }
    return component ? component.long_name : "";
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto md:px-8 py-5">
        <div className="container w-full flex flex-col flex-wrap mx-auto px-2">
          <ol className="flex justify-center items-center w-full mx-auto text-sm font-medium text-center text-gray-100 sm:text-base sticky top-0 bg-white border-2 border-white custom-bg-color-primary py-3 rounded-3xl overflow-hidden">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                {index !== 0 && (
                  <div className="md:px-3">
                    <IoMdArrowDroprightCircle />
                  </div>
                )}
                <li
                  className={`flex justify-center items-center w-full ${
                    activeSection === section.id && "custom-teal-color font-bold"
                  }`}
                >
                  <span className="flex items-center">
                    <a
                      href={"#" + section.id}
                      className="inline-flex"
                      onClick={() => handleMenuClick(section.id)}
                    >
                      {section.menuName}
                    </a>
                  </span>
                </li>
              </React.Fragment>
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
                              className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                              id={field.id}
                              type="text"
                              ref={(el) => (fieldRefs.current[field.id] = el)}
                            />
                          )}
                          {field.type === "number" && (
                            <input
                              className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                              id={field.id}
                              type="number"
                              ref={(el) => (fieldRefs.current[field.id] = el)}
                            />
                          )}
                          {field.type === "textarea" && (
                            <textarea
                              className="px-3 py-1 form-textarea block w-full rounded-xl border border-gray-300 focus:bg-white"
                              id={field.id}
                              rows="8"
                              ref={(el) => (fieldRefs.current[field.id] = el)}
                            ></textarea>
                          )}
                          {field.type === "select" && (
                            <select
                              className="px-3 py-1 form-multiselect block w-full"
                              multiple
                              id={field.id}
                              ref={(el) => (fieldRefs.current[field.id] = el)}
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
                                    ref={(el) => (fieldRefs.current[field.id] = el)}
                                  />
                                  <span className="ml-2">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {field.type === "addressAPI" && (
                           <div ref={ref}>
                            <input
                              className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                              value={value}
                              onChange={handleInput}
                              disabled={!ready}
                              placeholder=""
                              ref={(el) => (fieldRefs.current["address"] = el)}
                            />
                            {/* We can use the "status" to decide whether we should display the dropdown or not */}
                            {status === "OK" && <ul>{renderSuggestions()}</ul>}
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
                                    ref={(el) => (fieldRefs.current[field.id] = el)}
                                  />
                                  <span className="ml-2">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          <p className="py-2 text-sm text-gray-800">
                            {field.description}
                          </p>
                          {errors[field.id] && (
                            <p className="text-red-500 text-xs italic">
                              {errors[field.id]}
                            </p>
                          )}
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