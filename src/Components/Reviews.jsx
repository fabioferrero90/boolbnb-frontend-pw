import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const Reviews = () => {
  const { renderReviews, reviews, ratingNames, fetchRatings } =
    useGlobalContext();
  const { id } = useParams();


  useEffect(() => {
    renderReviews(id);
    fetchRatings();
  }, [id]);

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
          1024: { slidesPerView: 3 }
        }}>
        {reviews.map((review) => {
          const matchingRating = ratingNames.find(
            (rating) => rating.id === review.rating_id
          );
          return (
            <SwiperSlide key={review.id}>
              <div className="text-sm leading-6 m-2">
                <div className="relative group mx-5">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r bg-gray-200 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <div className="relative p-6 leading-none rounded-lg bg-gray-200 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img
                        src="/user-propic/ProfilePH.png"
                        className="w-12 h-12 bg-center bg-cover border rounded-full"
                        alt={review.name}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {review.name}
                        </h3>
                        <p className="text-gray-500 text-md">
                          {matchingRating ? matchingRating.rating_name : ""}
                        </p>
                      </div>
                    </div>
                    <p className="leading-normal text-md mt-4 text-center">
                      {review.review_text}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>


    </div>
  );
};

export default Reviews;
