import { useEffect, useState } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { FaHeart, FaBed } from "react-icons/fa";
import { MdMeetingRoom, MdWc } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";
import axios from "axios";
import FilterModal from "../Components/partials/FilterModal";
import OrderResults from "../Components/partials/OrderResults";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import loadingimg from "../assets/loading.json";
import notFound from "../assets/notfound.json";
import SearchBar from "../Components/ResultsSearchBar";

const Results = () => {
  const {
    filteredResults,
    setFilteredResults,
    fetchResults,
    ratingNames,
    fetchRatings,
    orderedBy,
    results,
  } = useGlobalContext();
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  const { query } = useParams();

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRatings();
      await fetchResults(query);
      setTimeout(() => setLoading(false), 500);
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    if (filteredResults && filteredResults.length > 0) {
      setLiked(filteredResults.map((house) => house.liked || false));
    }
  }, [filteredResults]);

  useEffect(() => {
    if (orderedBy) {
      let sortedResults = [...filteredResults];
      switch (orderedBy) {
        case "price-asc":
          sortedResults.sort((a, b) => a.price_pernight - b.price_pernight);
          break;
        case "price-desc":
          sortedResults.sort((a, b) => b.price_pernight - a.price_pernight);
          break;
        case "most-liked":
          sortedResults.sort((a, b) => b.likes - a.likes);
          break;
        default:
          break;
      }
      setFilteredResults(sortedResults);
    }
  }, [orderedBy]);

  const manageLike = async (id, index) => {
    try {
      setLiked((prevLiked) => {
        const updatedLiked = [...prevLiked];
        updatedLiked[index] = !updatedLiked[index];
        return updatedLiked;
      });

      const updatedResults = filteredResults.map((house, i) => {
        if (i === index) {
          return {
            ...house,
            likes: liked[index] ? house.likes - 1 : house.likes + 1,
            liked: !house.liked,
          };
        }
        return house;
      });
      setFilteredResults(updatedResults);

      if (!liked[index]) {
        await axios.put(`${APIendpoint}/houses/like/${id}`);
      } else {
        await axios.put(`${APIendpoint}/houses/dislike/${id}`);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const getRatingName = (rating) => {
    const ratingObj =
      ratingNames && ratingNames.length > 0
        ? ratingNames.find((r) => r.id === Number(rating))
        : null;
    return ratingObj ? ratingObj.rating_name : "Nessuna Valutazione";
  };

  return loading ? (
    <div className="mx-auto max-w-screen-xl py-8">
      <div className="flex justify-center flex-col p-5">
        <Player
          autoplay
          loop
          src={loadingimg}
          style={{ height: "200px", width: "200px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
        <h1 className="text-2xl text-center py-5">
          Sto caricando gli alloggi...
        </h1>
      </div>
    </div>
  ) : filteredResults.length == 0 ? (
    <div className="mx-auto max-w-screen-xl py-8">
      <div className="flex justify-center flex-col p-5">
        <Player
          autoplay
          loop
          src={notFound}
          style={{ height: "200px", width: "200px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
        {(results.length == 0 && (
          <>
            <h1 className="text-2xl text-center py-5">
              Nessun risultato trovato
            </h1>
            <a
              href="/"
              className="mx-auto max-w-[50%] justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Torna alla homepage
            </a>
          </>
        )) || (
          <>
            <h1 className="text-2xl text-center py-5">
              Nessun risultato trovato utilizzando questi filtri
            </h1>
            <a
              onClick={() => setFilteredResults(results)}
              className="mx-auto max-w-[50%] justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
            >
              Resetta filtri
            </a>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="mx-auto max-w-screen-xl pb-8">
      <SearchBar />
      <div className="w-full mx-auto flex justify-between items-center gap-8 p-8">
        <FilterModal />
        <OrderResults />
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8">
        {filteredResults &&
          filteredResults.map((house, index) => (
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
                        <p>{house.name}</p>
                        <p className="mb-1 font-normal text-xs text-gray-700">
                          {house.address.city} [{house.address.province}] -{" "}
                          {house.address.address}
                        </p>
                      </h5>
                    </a>
                    <a href="#">
                      <span className="text-xs">Tipologia: </span>
                      <span className="mb-3 text-xs tracking-tight text-gray-500 bg-gray-200 px-3 rounded-full">
                        {house.type}
                      </span>
                    </a>
                  </div>
                  <div>
                    <p className="flex items-center pt-1">
                      <span className="text-xs text-gray-800 pb-2">
                        <strong className="text-lg">
                          {house.price_pernight}
                        </strong>
                        € / Notte
                      </span>
                    </p>
                  </div>
                </section>
                <section className="py-1">
                  <div className="flex">
                    <PiResizeLight />{" "}
                    <span className="text-xs pl-2 pb-2">{house.size} Mq</span>
                  </div>
                  <div className="flex">
                    <FaBed />{" "}
                    <span className="text-xs pl-2 pb-2">
                      {house.beds} letti
                    </span>
                  </div>
                  <div className="flex">
                    <MdMeetingRoom />{" "}
                    <span className="text-xs pl-2 pb-2">
                      {house.rooms} stanze
                    </span>
                  </div>
                  <div className="flex">
                    <MdWc />{" "}
                    <span className="text-xs pl-2 pb-2">
                      {house.bathrooms} bagni
                    </span>
                  </div>
                </section>
                <div className="flex justify-center items-center pt-3 pb-1 text-xs">
                  <FaHeart className="w-5 h-5 text-red-400 " />
                  <span className="px-1 font-bold">{house.likes}</span>-
                  <span className="px-1 font-bold">{`${getRatingName(
                    house.avg_rating
                  )} -`}</span>
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
                  className={`cursor-pointer flex-col absolute top-[2%] border border-gray-400 right-[2%] bg-white rounded-full w-8 h-8 flex items-center justify-center ${
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
    </div>
  );
};

export default Results;
