import { useEffect, useState } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { FaHeart, FaBed } from "react-icons/fa";
import { MdMeetingRoom, MdWc } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import axios from "axios";

const Results = () => {
  const { results, setResults, fetchResults, ratingNames, fetchRatings } = useGlobalContext();
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    fetchRatings();
    fetchResults('a');
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      setLiked(results.map(house => house.liked || false));
    }
  }, [results]);

  const manageLike = async (id, index) => {
    try {
      setLiked(prevLiked => {
        const updatedLiked = [...prevLiked];
        updatedLiked[index] = !updatedLiked[index];
        return updatedLiked;
      });

      const updatedResults = results.map((house, i) => {
        if (i === index) {
          return {
            ...house,
            likes: liked[index] ? house.likes - 1 : house.likes + 1,
            liked: !house.liked
          };
        }
        return house;
      });
      setResults(updatedResults);

      if (!liked[index]) {
        await axios.put(`http://localhost:3000/houses/like/${id}`);
      } else {
        await axios.put(`http://localhost:3000/houses/dislike/${id}`);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const getRatingName = (rating) => {
    const ratingObj = ratingNames && ratingNames.length > 0 ? ratingNames.find((r) => r.id === Number(rating)) : null;
    return ratingObj ? ratingObj.rating_name : "Nessuna Valutazione";
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div>
        <div className="max-w-screen-xl mt-auto pt-8 px-8">
          <a
            href="#"
            className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
            data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
            type="button"
          >
            <span className="pr-2">
              Filtra risultati
            </span>
            <IoFilter/>
          </a>
        </div>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-8">
        {results &&
          results.map((house, index) => (
            <div
              key={index}
              className={`no-select relative w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between`}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-[30vh] object-cover"
                  src={house.cover_image}
                  alt={house.name}
                />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <section className="flex justify-between pb-5">
                  <div>
                    <a href="#">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        {house.name}
                      </h5>
                    </a>
                    <a href="#">
                      <span className="mb-3 text-xs tracking-tight text-gray-500 bg-gray-200 px-3 rounded-full">
                        {house.type}
                      </span>
                    </a>
                  </div>
                  <div>
                    <p className="flex items-center pt-1">
                      <span className="text-xs text-gray-800 pb-2">
                        <strong className="text-lg">{house.price_pernight}</strong>€ / Notte
                      </span>
                    </p>
                  </div>
                </section>
                <section className="py-1">
                  <div className="flex">
                    <PiResizeLight /> <span className="text-xs pl-2 pb-2">{house.size} Mq</span>
                  </div>
                  <div className="flex">
                    <FaBed /> <span className="text-xs pl-2 pb-2">{house.beds} letti</span>
                  </div>
                  <div className="flex">
                    <MdMeetingRoom /> <span className="text-xs pl-2 pb-2">{house.rooms} stanze</span>
                  </div>
                  <div className="flex">
                    <MdWc /> <span className="text-xs pl-2 pb-2">{house.bathrooms} bagni</span>
                  </div>
                </section>
                <div className="flex justify-center items-center pt-3 pb-1 text-xs">
                  <FaHeart className="w-5 h-5 text-red-400 " />
                  <span className="px-1 font-bold">{house.likes}</span>-
                  <span className="px-1 font-bold">
                    {`${getRatingName(house.avg_rating)} -`}
                  </span>
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
                <div
                  className={`cursor-pointer flex flex-col absolute top-[2%] border border-gray-400 right-[2%] bg-white rounded-full w-8 h-8 flex items-center justify-center ${
                    liked[index] ? "text-red-400" : "text-gray-400"
                  }`}
                  onClick={() => manageLike(house.id, index)}
                >
                  <FaHeart className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h3>
                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    </div>
    
  );
};

export default Results;