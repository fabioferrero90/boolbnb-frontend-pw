import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { MdMeetingRoom, MdWc } from "react-icons/md";
import { useGlobalContext } from "../../Contexts/GlobalContext";

const FilterModal = () => {
  const { results, setFilteredResults, typeVariables } = useGlobalContext();

  const initialFormData = {
    minPrice: "",
    maxPrice: "",
    minMq: 50,
    rooms: 2,
    bedrooms: 2,
    bathrooms: 1,
    types: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIncrement = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field] > 1 ? prevState[field] - 1 : 1,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      types: checked
        ? [...prevState.types, id]
        : prevState.types.filter((type) => type !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const handledResults = results.filter((result) => {
      return (
        result.size >= formData.minMq &&
        result.rooms >= formData.rooms &&
        result.beds >= formData.bedrooms &&
        result.bathrooms >= formData.bathrooms &&
        result.price_pernight >= (formData.minPrice || 0) &&
        result.price_pernight <= (formData.maxPrice || 999999999) &&
        (formData.types.length === 0 || formData.types.includes(result.type))
      );
    });
    setFilteredResults(handledResults);
    setIsModalOpen(false);
  };

  return (
    <div className="grow">
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
          type="button"
        >
          <span className="pr-2">Filtra risultati</span>
          <IoFilter />
        </button>
      </div>
      {isModalOpen && (
        <div
          id="filter-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full modal-custom-bg"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 md:px-5 md:py-2 border-b rounded-t border-gray-200 custom-bg-color-primary">
                <h3 className="text-l font-semibold text-gray-100">
                  Affina la ricerca:
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Chiudi</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                  <div className="pb-3">
                    <div className="relative mb-6">
                      <label htmlFor="labels-range-input" className="text-sm">
                        Metri quadri minimi:{" "}
                        <strong>
                          {formData.minMq == 500 ? "500+" : formData.minMq} Mq
                        </strong>
                      </label>
                      <input
                        id="labels-range-input"
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={formData.minMq}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                        name="minMq"
                        onChange={handleChange}
                      />
                      <span className="text-xs text-gray-500 absolute start-0 -bottom-6">
                        20 Mq
                      </span>
                      <span className="text-xs text-gray-500 absolute end-0 -bottom-6">
                        500+ Mq
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center max-w-full">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="rooms-input"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                      onClick={() => handleDecrement("rooms")}
                    >
                      <svg
                        className="w-3 h-3 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="rooms-input"
                      data-input-counter
                      data-input-counter-min="1"
                      data-input-counter-max="10"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6"
                      placeholder=""
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                      <MdMeetingRoom />
                      <span>Stanze</span>
                    </div>
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="rooms-input"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                      onClick={() => handleIncrement("rooms")}
                    >
                      <svg
                        className="w-3 h-3 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <div className="relative flex items-center max-w-[11rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="bedrooms-input"
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        onClick={() => handleDecrement("bedrooms")}
                      >
                        <svg
                          className="w-3 h-3 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="bedrooms-input"
                        data-input-counter
                        data-input-counter-min="1"
                        data-input-counter-max="10"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6"
                        placeholder=""
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                      />
                      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                        <FaBed />
                        <span>Letti</span>
                      </div>
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="bedrooms-input"
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        onClick={() => handleIncrement("bedrooms")}
                      >
                        <svg
                          className="w-3 h-3 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative flex items-center max-w-[11rem]">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="bathrooms-input"
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        onClick={() => handleDecrement("bathrooms")}
                      >
                        <svg
                          className="w-3 h-3 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="bathrooms-input"
                        data-input-counter
                        data-input-counter-min="1"
                        data-input-counter-max="5"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6"
                        placeholder=""
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                      />
                      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                        <MdWc />
                        <span>Bagni</span>
                      </div>
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="bathrooms-input"
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                        onClick={() => handleIncrement("bathrooms")}
                      >
                        <svg
                          className="w-3 h-3 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex-col flex items-center justify-center relative w-full">
                    <button
                      id="type-dropdown"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="justify-between w-full bg-primary-700 hover:bg-primary-800 rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center border border-gray-300 text-gray-500"
                      type="button"
                    >
                      Tipologia struttura
                      <svg
                        className="w-4 h-4 ml-2 "
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="typeDropdown"
                      className={`z-10 ${
                        isDropdownOpen ? "block" : "hidden"
                      } w-full p-3 bg-white rounded-lg shadow absolute top-12 z-100`}
                    >
                      <ul
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm"
                        aria-labelledby="type-dropdown"
                      >
                        {typeVariables?.map((type, index) => {
                          return (
                            <li key={index} className="flex items-center">
                              <input
                                id={type}
                                type="checkbox"
                                checked={formData.types.includes(type)}
                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                                onChange={handleCheckboxChange}
                              />
                              <label
                                htmlFor={type}
                                className="ml-2 text-sm font-medium text-gray-900"
                              >
                                {type}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-between pb-5">
                    <div className="relative">
                      <input
                        type="text"
                        id="price-min"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={formData.minPrice}
                        name="minPrice"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="price-min"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Prezzo minimo
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="price-max"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={formData.maxPrice}
                        name="maxPrice"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="price-max"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Prezzo massimo
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white custom-bg-color-primary cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Applica filtri
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
