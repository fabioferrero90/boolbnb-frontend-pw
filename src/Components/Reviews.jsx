import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Reviews = () => {
  const { renderReviews, reviews, ratingNames, fetchRatings } =
    useGlobalContext();
  const { id } = useParams();

  // Stato per gestire la recensione selezionata
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per apertura/chiusura della modal

  useEffect(() => {
    renderReviews(id);
    fetchRatings();
  }, [id]);

  // Funzione per gestire il click su una recensione e aprire la modal
  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true); // Apre la modal
  };

  // Funzione per chiudere la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null); // Resetta la recensione selezionata
  };

  const date = new Date(selectedReview?.date);
  const formattedDate = date.toLocaleDateString('it-IT');

  return (
    <div className="mt-5">
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => {
          const matchingRating = ratingNames.find(
            (rating) => rating.id === review.rating_id
          );

          return (
            <SwiperSlide key={review.id}>
              <div className="text-sm leading-6 m-2">
                <div className="relative group mx-5">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r custom-bg-color-primary blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <div
                    className="relative leading-none rounded-lg reviews-box custom-bg-color-primary ring-1 ring-gray-900/5 cursor-pointer"
                    onClick={() => handleReviewClick(review)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src="/user-propic/ProfilePH.png"
                        className="w-12 h-12 bg-center bg-cover border rounded-full"
                        alt={review.name}
                      />
                      <div>
                        <h3 className="text-lg text-white font-semibold">
                          {review.name}
                        </h3>
                        <p className="text-gray-400 text-md">
                          {matchingRating ? matchingRating.rating_name : ""}
                        </p>
                      </div>
                    </div>
                    <p className="leading-normal text-md mt-4 text-center text-white reviews-text">
                      {review.review_text}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {isModalOpen && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full modal-custom-bg"
          aria-hidden="true" justify-betwee
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relativerounded-lg shadow-sm">
              <div className="flex items-centern p-4 justify-between md:p-5 border-b rounded-t-md border-gray-200 custom-bg-color-primary text-white ">

                <div className="flex items-center">
                  <img
                    src="/user-propic/ProfilePH.png"
                    className="w-12 h-12 bg-center bg-cover border rounded-full mr-3"
                    alt={selectedReview.name}
                  />
                  <h3 className="text-xl font-semibold text-gray-90">
                    {selectedReview?.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-300">{formattedDate}</p>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer md:ml-4 ml-2"
                    onClick={closeModal}
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
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-5 space-y-4 bg-white rounded-b-md">
                <p className="text-base leading-relax">
                  {selectedReview?.review_text}
                </p>
                <p className="text-sm text-gray-400">
                  Voto:{" "}
                  {ratingNames.find(
                    (rating) => rating.id === selectedReview?.rating_id
                  )?.rating_name || "Nessun voto"}
                </p>
              </div>
            </div>
          </div>
        </div >
      )}
    </div >
  );
};

export default Reviews;

