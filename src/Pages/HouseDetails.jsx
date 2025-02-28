import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingimg from "../assets/loading.json";
import { FaHeart, FaBed, FaPhone } from "react-icons/fa";
import { MdMeetingRoom, MdWc, MdAlternateEmail } from "react-icons/md";
import { PiResizeLight } from "react-icons/pi";
import { GiPositionMarker } from "react-icons/gi";
import Reviews from "../Components/Reviews";

const HouseDetails = () => {
  const { fetchHouse, house } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchHouse(id);
  }, [id]);

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
    cover_image,
    type,
    price_pernight,
    likes,
  } = house;

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-8 flex flex-col lg:flex-row items-center">
        <div className="w-full max-w-2xl p-5">
          <img src={cover_image} alt={name} className="rounded w-full" />
        </div>
        <div className="w-[100%] max-w-2xl lg:ml-8 mt-8 lg:mt-0 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold">{name}</h1>
          <h3 className="text-lg text-gray-700">{host_name}</h3>
          <p className="mt-4">{abstract}</p>
          <div className="mt-4">
            <div className="flex items-center">
              <PiResizeLight /> <span className="text-xs pl-2">{size} Mq</span>
            </div>
            <div className="flex items-center mt-2">
              <MdMeetingRoom />{" "}
              <span className="text-xs pl-2">{rooms} stanze</span>
            </div>
            <div className="flex items-center mt-2">
              <MdWc /> <span className="text-xs pl-2">{bathrooms} bagni</span>
            </div>
            <div className="flex items-center mt-2">
              <FaBed /> <span className="text-xs pl-2">{beds} letti</span>
            </div>
            <div className="flex items-center mt-2">
              <MdAlternateEmail /> <span className="text-xs pl-2">{email}</span>
            </div>
            <div className="flex items-center mt-2">
              <FaPhone /> <span className="text-xs pl-2">{phone_number}</span>
            </div>
            <div className="flex items-center mt-2">
              <GiPositionMarker />{" "}
              <span className="text-xs pl-2">
                Indirizzo: {address.city} {address.number}, {address.region},{" "}
                {address.address}, {address.country}, {address.province},{" "}
                {address["postal-code"]}
              </span>
            </div>
          </div>
          <div className="mt-2">Tipo: {type}</div>
          <div className="mt-2">Prezzo per notte: {price_pernight}</div>
          <div className="flex items-center mt-2">
            <FaHeart /> <span className="text-xs pl-2">{likes}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-8">
        <Reviews />
      </div>
    </>
  );
};

export default HouseDetails;
