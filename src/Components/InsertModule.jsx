import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import sections from "../assets/data/InsertSections";
import ConfirmForm from "./partials/ConfirmForm";
import "../styles/animations.css";
import "@yaireo/tagify/dist/tagify.css";
import "../styles/custom-tagify.css";
import Tagify from "@yaireo/tagify";
import axios from "axios";

const InsertModule = () => {
  const [activeSection, setActiveSection] = useState("1");
  const [direction, setDirection] = useState("right");
  const [errors, setErrors] = useState({});
  const containerRef = useRef(null);
  const fieldRefs = useRef({});
  const [services, setServices] = useState([]);

  const debugFormData = {
    host_name: "Mario Rossi",
    house_name: "Casa di Mario",
    host_mail: "mario@example.com",
    host_phone: "+393337823290",
    rooms: 3,
    beds: 6,
    bathrooms: 2,
    size: 100,
    house_type: 1,
    abstract: "Casa molto bella",
    price_pernight: 100,
    services: ["Wi-Fi", "Parcheggio", "Cucina"],
  };

  const [formData, setFormData] = useState(debugFormData);
  const { houseTypes, fetchHouseTypes, setPreviewData } = useGlobalContext();

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  useEffect(() => {
    axios
      .get(`${APIendpoint}/houses/services`)
      .then((res) => setServices(res.data.map((service) => service.name)))
      .catch((error) => console.error("Error fetching services:", error));
    fetchHouseTypes();
  }, []);

  useEffect(() => {
    const input = document.querySelector("input[name=services]");
    if (input && services.length > 0) {
      const tagify = new Tagify(input, {
        whitelist: services,
        focusable: false,
        dropdown: { position: "input", enabled: 1 },
      });
      tagify.on("change", (e) => {
        const servicesArray = JSON.parse(e.detail.value).map(
          (service) => service.value
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          services: servicesArray,
        }));
      });
      fieldRefs.current["services"] = tagify;
    }
  }, [services]);

  const handleBackButtonClick = () => {
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    if (currentIndex > 0) {
      setDirection("right");
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const validateSection = async () => {
    const currentSection = sections.find(
      (section) => section.id === activeSection
    );
    const newErrors = {};
    const promises = [];
    currentSection.fields.forEach((field) => {
      if (field.type === "addressAPI") {
        const addressValue = fieldRefs.current["address"]?.value;
        if (!addressValue) {
          newErrors["address"] = "Questo campo è obbligatorio";
        } else {
          const promise = getGeocode({ address: addressValue })
            .then((results) => {
              const { newErrors: addressErrors } = validateAddress(
                results[0].address_components
              );
              Object.assign(newErrors, addressErrors);
            })
            .catch((error) => {
              if (error.message === "ZERO_RESULTS")
                newErrors["address"] =
                  "Indirizzo non trovato. Si prega di inserire un indirizzo valido.";
              else
                newErrors["address"] =
                  "Errore nella geocodifica dell'indirizzo.";
            });
          promises.push(promise);
        }
      } else if (field.type === "services") {
        const servicesValue = formData["services"];
        if (field.required && (!servicesValue || servicesValue.length === 0)) {
          newErrors["services"] = "Devi aggiungere almeno un servizio";
        }
      } else {
        const fieldValue = fieldRefs.current[field.id]?.value;
        if (field.required && (!fieldValue || fieldValue === "")) {
          newErrors[field.id] = `Questo campo è obbligatorio`;
        }
      }
    });

    await Promise.all(promises);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    const houseData = {
      host_name: formData.host_name,
      name: formData.house_name,
      email: formData.host_mail,
      phone_number: formData.host_phone,
      rooms: formData.rooms,
      beds: formData.beds,
      bathrooms: formData.bathrooms,
      size: formData.size,
      address: formData.address,
      cover_image: formData.cover_photo,
      type: formData.house_type,
      abstract: formData.abstract,
      price_pernight: formData.price_pernight,
      services: formData.services,
      gallery: formData.photo_gallery,
      likes: 0,
    };
  
    const dataToSend = new FormData();
  
    for (let key in houseData) {
      if (key === "services" || key === "address") {
        dataToSend.append(key, JSON.stringify(houseData[key]));
      } else if (key === "cover_image" && houseData[key] instanceof File) {
        dataToSend.append(key, houseData[key]);
      } else if (key === "gallery" && Array.isArray(houseData[key])) {
        houseData[key].forEach((file) => {
          dataToSend.append("gallery", file);
        });
      } else {
        dataToSend.append(key, houseData[key]);
      }
    }
  
    axios
      .post(`${APIendpoint}/houses`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("Success:", res.data);
      })
      .catch((error) =>
        console.error("Errore nell'inserimento della casa:", error)
      );
  };

  const handleNextButtonClick = async () => {
    const isValid = await validateSection();
    if (isValid) {
      setPreviewData(formData);
      const currentIndex = sections.findIndex(
        (section) => section.id === activeSection
      );
      if (currentIndex + 1 == sections.length) {
        handleFormSubmit();
      } else if (currentIndex < sections.length - 1) {
        setDirection("left");
        setActiveSection(sections[currentIndex + 1].id);
      }
    }
  };

  const handleMenuClick = (sectionId) => {
    if (sectionId == 4) {
      setPreviewData(formData);
    }
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
    requestOptions: {},
    debounce: 300,
  });
  const ref = useOnclickOutside(() => clearSuggestions());

  const handleInput = (e) => setValue(e.target.value);

  const validateAddress = (addressComponents) => {
    const address = {
      country: getAddressComponent(addressComponents, "country"),
      region: getAddressComponent(
        addressComponents,
        "administrative_area_level_1"
      ),
      province: getAddressComponent(
        addressComponents,
        "administrative_area_level_2",
        "short_name"
      ),
      city: getAddressComponent(addressComponents, "locality"),
      "postal-code": getAddressComponent(addressComponents, "postal_code"),
      address: getAddressComponent(addressComponents, "route"),
      number: getAddressComponent(addressComponents, "street_number"),
    };
    const newErrors = {};
    if (!address.number)
      newErrors["address"] =
        "Indirizzo incompleto: Il Numero Civico è obbligatorio";
    else if (!address.address)
      newErrors["address"] = "Indirizzo incompleto: La Via è obbligatoria";
    else if (!address["postal-code"])
      newErrors["address"] = "Indirizzo incompleto: Il CAP è obbligatorio";
    else if (!address.city)
      newErrors["address"] = "Indirizzo incompleto: La Città è obbligatoria";
    else if (!address.province)
      newErrors["address"] =
        "Indirizzo incompleto: La Provincia è obbligatoria";
    else if (!address.region)
      newErrors["address"] = "Indirizzo incompleto: La Regione è obbligatoria";
    else if (!address.country)
      newErrors["address"] = "Indirizzo incompleto: Lo Stato è obbligatorio";
    return { address, newErrors };
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const { address, newErrors } = validateAddress(
          results[0].address_components
        );
        if (Object.keys(newErrors).length === 0) {
          setErrors({});
          setFormData((prevFormData) => ({ ...prevFormData, address }));
        } else {
          setErrors(newErrors);
        }
      });
    };

  const getAddressComponent = (components, type) => {
    const component = components.find((c) => c.types.includes(type));
    return type === "administrative_area_level_2"
      ? component?.short_name
      : component?.long_name;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
                    activeSection === section.id &&
                    "custom-teal-color font-bold"
                  }`}
                >
                  <span className="flex items-center">
                    <a
                      className="inline-flex cursor-pointer"
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
              key="slider-container"
              className="slider-container anchor-target"
              ref={containerRef}
              style={{ transform: getTransformValue() }}
            >
              {sections.map((section) =>
                section.id == 5 ? (
                  <ConfirmForm formData={formData} />
                ) : (
                  <div
                    key={`section-${section.id}`}
                    id={section.id}
                    className="slider-item p-5 my-5 anchor-target rounded-2xl shadow bg-white border-4 border-gray-200"
                  >
                    <h2 className="h-[3rem] flex pl-5 justify-start items-center font-sans font-bold break-normal custom-bg-color-primary text-white text-xl rounded-2xl mb-8">
                      {section.title}
                    </h2>
                    <form className="px-8">
                      {section.fields.map((field, idx) => (
                        <div key={`field-${idx}`} className="md:flex mb-6">
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
                                name={field.id}
                                type="text"
                                value={formData[field.id] || ""}
                                onChange={handleFieldChange}
                                ref={(el) => (fieldRefs.current[field.id] = el)}
                              />
                            )}
                            {field.type === "phone" && (
                              <div className="flex">
                                <select
                                  className="px-3 py-1 form-select block rounded-xl border border-gray-300 focus:bg-white"
                                  name="phonePrefix"
                                  onChange={handleFieldChange}
                                >
                                  <option value="+39">Italia(+39)</option>
                                  <option value="+41">Svizzera(+41)</option>
                                </select>
                                <input
                                  type="text"
                                  id={field.id}
                                  name={field.id}
                                  value={formData[field.id] || ""}
                                  onChange={handleFieldChange}
                                  ref={(el) =>
                                    (fieldRefs.current[field.id] = el)
                                  }
                                  aria-describedby="helper-text-explanation"
                                  className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300"
                                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                  placeholder="333-7823290"
                                  required
                                />
                              </div>
                            )}
                            {field.type === "number" && (
                              <input
                                className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                                id={field.id}
                                name={field.id}
                                type="number"
                                value={formData[field.id] || ""}
                                onChange={handleFieldChange}
                                ref={(el) => (fieldRefs.current[field.id] = el)}
                              />
                            )}
                            {field.type === "select" && (
                              <select
                                className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ""}
                                onChange={handleFieldChange}
                                ref={(el) => (fieldRefs.current[field.id] = el)}
                              >
                                <option value="" disabled>
                                  Seleziona tipologia
                                </option>
                                {houseTypes.map((houseType) => (
                                  <option
                                    key={houseType.id}
                                    value={houseType.id}
                                  >
                                    {houseType.type_name}
                                  </option>
                                ))}
                              </select>
                            )}
                            {field.type === "textarea" && (
                              <textarea
                                className="px-3 py-1 form-textarea block w-full rounded-xl border border-gray-300 focus:bg-white"
                                id={field.id}
                                name={field.id}
                                rows="8"
                                value={formData[field.id] || ""}
                                onChange={handleFieldChange}
                                ref={(el) => (fieldRefs.current[field.id] = el)}
                              ></textarea>
                            )}
                            {field.type === "addressAPI" && (
                              <div ref={ref}>
                                <input
                                  className="px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
                                  value={value}
                                  onChange={handleInput}
                                  disabled={!ready}
                                  placeholder=""
                                  ref={(el) =>
                                    (fieldRefs.current["address"] = el)
                                  }
                                />
                                {status === "OK" && (
                                  <ul>{renderSuggestions()}</ul>
                                )}
                              </div>
                            )}
                            {field.type === "services" && (
                              <div>
                                <input
                                  className="customLook px-3 py-1 form-input block w-full rounded-xl border border-gray-300 focus:bg-white custom-tagify-services"
                                  name="services"
                                />
                              </div>
                            )}
                            {field.type === "upload_single" && (
                              <div>
                                <input
                                  type="file"
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () =>
                                        setFormData((prevFormData) => ({
                                          ...prevFormData,
                                          [field.id]: file,
                                        }));
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                {formData[field.id] instanceof File && (
                                  <img
                                    src={URL.createObjectURL(
                                      formData[field.id]
                                    )}
                                    alt="Preview"
                                    className="mt-2 h-32 w-32 object-cover"
                                  />
                                )}
                              </div>
                            )}
                            {field.type === "upload_multiple" && (
                              <div>
                                <input
                                  type="file"
                                  multiple
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                  onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      [field.id]: files,
                                    }));
                                  }}
                                />
                                {formData[field.id] &&
                                  formData[field.id].map((file, index) => (
                                    <img
                                      key={index}
                                      src={URL.createObjectURL(file)}
                                      alt={`Preview ${index}`}
                                      className="mt-2 h-32 w-32 object-cover"
                                    />
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
                )
              )}
            </div>
          </section>
          <div className="flex justify-center items-center bottom-5 gap-5 sticky">
            <button
              id="actionButton"
              onClick={handleBackButtonClick}
              className={`cursor-pointer shadow-4xl bg-gray-300 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded-2xl text-xl ${
                sections.findIndex(
                  (section) => section.id === activeSection
                ) === 0 && "hidden"
              }`}
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
              {sections.findIndex((section) => section.id === activeSection) +
                1 <
              sections.length
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
