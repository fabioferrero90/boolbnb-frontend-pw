import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";

const AddNewReview = () => {
  const { renderReviews } = useGlobalContext();
  const api_url = "http://localhost:3000/reviews";
  const { id } = useParams();

  const initialFormReview = {
    name: "",
    rating_id: "",
    review_text: "",
    house_id: id,
  };

  const [formReview, setFormReview] = useState(initialFormReview);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setFieldValue = (e) => {
    const { value, name } = e.target;
    setFormReview((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = () => {
    axios
      .post(api_url, formReview, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setFormReview(initialFormReview);
        renderReviews(id);
      })
      .catch((err) => {
        console.error("Errore durante l'invio della recensione:", err);
      });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="button"
      >
        Clicca qui per lasciare la tua recensione
      </button>
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <form
                className="max-w-sm mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlerSubmit();
                  setIsModalOpen(false);
                }}
              >
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Inserisci il tuo nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formReview.name}
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Inserisci il tuo nome..."
                    onChange={setFieldValue}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="review_text"
                    className="block mb-2 text-sm font-medium"
                  >
                    Inserisci la tua recensione
                  </label>
                  <textarea
                    name="review_text"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Scrivi una recensione..."
                    onChange={setFieldValue}
                    value={formReview.review_text}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="rating_id"
                    className="block mb-2 text-sm font-medium"
                  >
                    Inserisci un voto da 1 a 5
                  </label>
                  <input
                    type="number"
                    name="rating_id"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    min={1}
                    max={5}
                    placeholder="Digita un numero da 1 a 5..."
                    value={formReview.rating_id}
                    onChange={setFieldValue}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-white custom-bg-color-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer w-full"
                >
                  Invia recensione
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewReview;