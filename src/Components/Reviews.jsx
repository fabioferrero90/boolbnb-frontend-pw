import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { renderReviews, reviews } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    renderReviews(id);
  }, [id]);

  return (
    <div>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col p-5 border border-gray-200 rounded-lg my-5"
        >
          <h1 className="text-2xl font-bold">{review.name}</h1>
          <p className="text-lg">{review.review_text}</p>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
