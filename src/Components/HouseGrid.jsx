import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../Contexts/GlobalContext";

const HouseGrid = () => {
  const { ratingNames } = useGlobalContext();
  const [liked, setLiked] = useState([false, false, false]);
  const [houses, setHouses] = useState([]);

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  const fetchHouses = () => {
    axios
      .get(`${APIendpoint}/houses/mostliked`)
      .then((res) => {
        setHouses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const manageLike = (id, index) => {
    setLiked(liked.map((like, i) => (i === index ? !like : like)));
    if (!liked[index]) {
      axios.put(`${APIendpoint}/houses/like/${id}`).then((response) => {
        fetchHouses();
      });
    } else {
      axios
        .put(`${APIendpoint}/houses/dislike/${id}`)
        .then((response) => {
          fetchHouses();
        });
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <div className="xl:w-6xl md:w-3xl sm:w-xl w-sm mx-auto flex flex-col items-center justify-center pt-20">
      <h1 className="block font-bold pb-8 text-3xl self-start text-white">
        Preferiti dagli utenti:
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 no-select">
        {houses &&
          houses.slice(0, 3).map((house, index) => (
            <div
              key={index}
              className={`relative w-full bg-white border-gray-200 rounded-lg shadow-sm flex flex-col justify-between ${
                index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-[30vh] object-cover"
                  src={house.cover_image}
                  alt=""
                />
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <div>
                <section className="flex justify-between pb-2">
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
                  <p className="my-3 font-normal text-gray-500 h-20 overflow-hidden">
                    {house.abstract.length > 120 ? house.abstract.slice(0,120)+"..." : house.abstract}
                  </p>
                </div>
                <div className="flex justify-center items-center pt-3 pb-1 text-xs">
                  <FaHeart className="w-5 h-5 text-red-400 " />
                  <span className="px-1 font-bold">{house.likes}</span>-
                  <span className="px-1 font-bold">{
                      ratingNames.find((r) => r.id === Number(house.avg_rating))
                        ?.rating_name
                    }</span>
                  <span className="px-1 text-gray-500">
                    {house.reviews} recensioni
                  </span>
                </div>
                <div className="mt-auto">
                  <a
                    href="#"
                    className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Scopri di più
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

export default HouseGrid;
