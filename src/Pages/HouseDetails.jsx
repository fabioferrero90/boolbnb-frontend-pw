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
import Gallery from "../Components/Gallery";

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
    type,
    price_pernight,
    likes,
  } = house;

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-8 flex justify-between">
        <h1 className=" font-bold pr-2">{name}</h1>
        <div className="pr-2 text-gray-700">
          {type} di {host_name}
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-8 flex flex-col lg:flex-row items-center mb-5">
        <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
          <Gallery />
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 p-5 bg-white ">
          <div className="flex items-center mt-2">
            <GiPositionMarker />{" "}
            <span className="pl-2">
              Indirizzo: {address.city} {address.number}, {address.region},{" "}
              {address.address}, {address.country}, {address.province},{" "}
              {address["postal-code"]}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <PiResizeLight /> <span className=" pl-2">{size} Mq</span>
            </div>
            <div className="flex items-center mt-2">
              <MdMeetingRoom /> <span className=" pl-2">{rooms} stanze</span>
            </div>
            <div className="flex items-center mt-2">
              <MdWc /> <span className=" pl-2">{bathrooms} bagni</span>
            </div>
            <div className="flex items-center mt-2">
              <FaBed /> <span className=" pl-2">{beds} letti</span>
            </div>
            <div className="flex items-center mt-2">
              <MdAlternateEmail /> <span className=" pl-2">{email}</span>
            </div>
            <div className="flex items-center mt-2">
              <FaPhone /> <span className=" pl-2">{phone_number}</span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <FaHeart /> <span className=" pl-2">{likes}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="flex w-full justify-between flex-col lg:flex-row items-center">
          <p className="w-[80%]">
            <p>
              <strong>Descrizione: </strong>
            </p>
            {abstract}
          </p>
          <div className="w-[20%] text-center">
            Prezzo per notte: <strong>{price_pernight}€</strong>
          </div>
        </div>
        <div>
          <h1 className="mt-5 font-bold">RECENSIONI:</h1>
          <Reviews />
        </div>
      </div>
    </>
  );
};

export default HouseDetails;
