import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <ul className="space-y-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const matchingRating = ratingNames.find(
            (rating) => rating.id === review.rating_id
          );

          return (
            <li className="text-sm leading-6 m-2" key={review.id}>
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r custom-bg-color-primary blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>

                <div className="relative p-6 leading-none rounded-lg custom-bg-color-primary ring-1 ring-gray-900/5">
                  <div className="flex items-center space-x-4">
                    <img
                      src="/user-propic/ProfilePH.png"
                      className="w-12 h-12 bg-center bg-cover border rounded-full"
                      alt={review.name}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {review.name}
                      </h3>
                      <p className="text-gray-500 text-md">
                        {matchingRating ? matchingRating.rating_name : ""}
                      </p>
                    </div>
                  </div>
                  <p className="leading-normal text-gray-300 text-md">
                    {review.review_text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
