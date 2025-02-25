import { useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { FaHeart } from "react-icons/fa";

const Results = () => {
  const { results, fetchResults, ratingNames, fetchRatings} = useGlobalContext();

  useEffect(() => {
    fetchRatings()
    fetchResults('giardino lago villa franco')
  }, []);

  
  return (
    <div className=" mx-auto max-w-screen-xl ">
   <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-8">
      {results &&
        results.map((house, index) => (
          <div
              key={index}
              className={`relative w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between`}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-[30vh] object-cover"
                  src={house.cover_image}
                  alt={house.name}
                />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {house.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">
                    {house.abstract}
                  </p>
                </div>
                <div className="flex items-center pb-4 text-xs">
                  <FaHeart className="w-5 h-5 text-red-400 " />
                  <span className="px-1 font-bold">{house.likes}</span>-
                  <span className="px-1 font-bold">
                    {
                      ratingNames.find((r) => r.rating === house.avg_rating)
                        ?.rating_name
                    }
                  </span>
                  -
                  <span className="px-1 text-gray-500">
                    {house.reviews} recensioni
                  </span>
                </div>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Vedi dettagli
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
                {/* <div
                  className={`cursor-pointer flex flex-col absolute top-[2%] border border-gray-400 right-[2%] bg-white rounded-full w-8 h-8 flex items-center justify-center ${
                    liked[index] ? "text-red-400" : "text-gray-400"
                  }`}
                  onClick={() => manageLike(house.id, index)}
                >
                  <FaHeart className="w-4 h-4" />
                </div> */}
              </div>
            </div>
        ))}
    </div>
    </div>
  );
};

export default Results;
