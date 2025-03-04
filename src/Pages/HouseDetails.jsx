import { useGlobalContext } from "../Contexts/GlobalContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingimg from "../assets/loading.json";
import { FaHeart, FaBed, FaPhone } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { RiHomeHeartFill } from "react-icons/ri";
import { MdMeetingRoom, MdWc, MdOutlineEmail } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";
import Reviews from "../Components/Reviews";
import Gallery from "../Components/Gallery";
import AddNewReview from "../Components/AddNewReview";

const HouseDetails = () => {
  const { fetchHouse, house } = useGlobalContext();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  useEffect(() => {
    fetchHouse(id);
  }, [id]);

  const manageLike = async (id) => {
    try {
      if (!liked) {
        await axios.put(`${APIendpoint}/houses/like/${id}`);
      } else {
        await axios.put(`${APIendpoint}/houses/dislike/${id}`);
      }
      setLiked(!liked);
      fetchHouse(id);
    } catch (error) {
      console.error("Errore durante l'aggiornamento del like:", error);
      setLiked(liked);
    }
  };

  if (!house || !house.address) {
    return (
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
            Sto caricando l'alloggio...
          </h1>
        </div>
      </div>
    );
  }

  const {
    name,
    email,
    phone_number,
    abstract,
    host_name,
    rooms,
    beds,
    bathrooms,
    size,
    address,
    type,
    price_pernight,
    likes,
    services,
  } = house;

  return (
    <>
      <div className="py-8">
        <div className="mx-auto flex justify-between max-w-screen-xl p-8">
          <div>
            <h1 className="font-bold pr-2 text-4xl sm:text-5xl">{name}</h1>
            <div className="pr-2 text-green-400 text-lg sm:text-xl">
              {type} di {host_name}
            </div>
          </div>
          <div className="flex items-center no-select">
            <div className="border p-3 rounded-full custom-bg-color-primary">
              <FaHeart
                className={`text-2xl cursor-pointer ${
                  liked ? "text-red-500" : "text-green-400"
                }`}
                onClick={() => manageLike(id)}
              />
            </div>
            <p className="pl-2">{likes} like</p>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-8 no-select">
          <div className="w-full mb-5 lg:mb-0 custom-gallery ">
            <Gallery />
          </div>
        </div>
      </div>

      <div className="py-8 custom-bg-color-primary">
        <div className="mx-auto max-w-screen-xl px-8">
          <div className="w-full mt-8 p-5 bg-white border rounded-2xl">
            <div className="flex flex-row items-start mt-2 text-4xl">
              <GiPositionMarker />
              <span className="pl-2 text-2xl">
                Indirizzo: {address.city} {address.number}, {address.region},{" "}
                {address.address}, {address.country}, {address.province},{" "}
                {address["postal-code"]}
              </span>
            </div>

            <div className="flex flex-wrap mx-4 text-gray-500 mt-4">
              <div className="flex items-center mx-2 mb-2 lg:mb-0">
                <PiResizeLight /> <span className="pl-2">{size} Mq</span>
              </div>
              <div className="flex items-center mx-2 mb-2 lg:mb-0">
                <MdMeetingRoom /> <span className="pl-2">{rooms} stanze</span>
              </div>
              <div className="flex items-center mx-2 mb-2 lg:mb-0">
                <MdWc /> <span className="pl-2">{bathrooms} bagni</span>
              </div>
              <div className="flex items-center mx-2 mb-2 lg:mb-0">
                <FaBed /> <span className="pl-2">{beds} letti</span>
              </div>
            </div>

            <div className="mx-auto max-w-screen-xl px-5 pt-5">
              <div className="flex items-center text-xl md:mt-6 mt-2">
                <RiHomeHeartFill />{" "}
                <span className="pl-2 font-semi-bold">Servizi:</span>
              </div>
              {services.map((service) => (
                <div className="flex items-center py-2">
                  <span className="pr-2">
                    <TbPointFilled />
                  </span>
                  {service.name}
                </div>
              ))}
            </div>

            <div className="md:mt-10 mt-5 mx-5">
              <div className="font-semi-bold flex items-center text-xl">
                <span className="">
                  <FaHouseUser />
                </span>
                <span className="pl-2 font-semi-bold">Contatta l'host:</span>
              </div>
              <div className="flex flex-col lg:flex-row md:flex-row mt-2">
                <div className="flex items-center mt-1 hover:underline">
                  <MdOutlineEmail />{" "}
                  <a href={`mailto:${email}`} className="pl-2">
                    {email}
                  </a>
                </div>
                <div className="flex items-center mt-2 lg:mt-0 lg:pl-8 md:pl-8 hover:underline">
                  <FaPhone />{" "}
                  <a href={`phoneto:${email}`} className="pl-2">
                    {phone_number}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between items-center my-10">
            <div className="w-full lg:w-[70%] lg:border-r p-5 py-15 border-white ">
              <span className="pt-4 text-2xl text-white">
                <strong>Descrizione: </strong>
              </span>
              <p className="mt-4 text-white">{abstract}</p>
            </div>

            <div className="w-full lg:w-[25%] text-center mt-4 lg:mt-0">
              <p className="font-semibold text-4xl text-white">
                {price_pernight}€ / notte
              </p>
              <button
                type="button"
                className="text-white bg-green-400 cursor-pointer font-medium rounded-lg px-5 py-2.5 me-2 mt-6"
              >
                <a href={`mailto:${email}`}>Contatta l'host!</a>
              </button>
              <p className="mt-2 text-sm text-white">
                Clicca sul tasto per prenotare il tuo soggiorno
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-15">
        <div className="mx-auto max-w-screen-xl px-5">
          <Reviews />
          <div className="m-10 pt-10 text-center">
            <h1 className="text-2xl font-medium mb-5">
              Il tuo parere è importante per noi, lascia una recensione per
              dirci cosa ne pensi
            </h1>
            <AddNewReview />
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseDetails;
