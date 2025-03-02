import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingimg from "../assets/loading.json";
import { FaHeart, FaBed, FaPhone } from "react-icons/fa";
import { MdMeetingRoom, MdWc, MdOutlineEmail } from "react-icons/md";
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
      <div className="custom-bg-color-primary py-8">
        <div className="flex justify-between">
          <div className=" mx-auto max-w-screen-xl p-8">
            <h1 className=" font-bold pr-2 text-white text-4xl">{name}</h1>
            <div className="pr-2 text-green-400">
              {type} di {host_name}
            </div>
          </div>
          <div className="flex mx-auto py-10 items-center">
            <FaHeart className="text-green-400 text-2xl" />
            <p className="pl-2 text-white">{likes} like</p>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-8">
          <div className="w-full mb-5 lg:mb-0">
            <Gallery />
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-screen-xl px-8 py-8">
        <div className="w-full mt-8 lg:mt-5 p-5 bg-white border rounded-2xl">
          <div className="flex items-center mt-2">
            <GiPositionMarker />{" "}
            <span className="pl-2 text-2xl">
              Indirizzo: {address.city} {address.number}, {address.region},{" "}
              {address.address}, {address.country}, {address.province},{" "}
              {address["postal-code"]}
            </span>
          </div>

          <div className="flex mx-4 text-gray-500">
            <div className="flex items-center mx-2">
              <PiResizeLight /> <span className=" pl-2">{size} Mq</span>
            </div>
            <div className="flex items-center mx-2">
              <MdMeetingRoom /> <span className=" pl-2">{rooms} stanze</span>
            </div>
            <div className="flex items-center mx-2">
              <MdWc /> <span className=" pl-2">{bathrooms} bagni</span>
            </div>
            <div className="flex items-center mx-2">
              <FaBed /> <span className=" pl-2">{beds} letti</span>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-bold">Conttatta l'host</h3>
            <div className="flex">
              <div className="flex items-center mt-1 mx-5">
                <MdOutlineEmail /> <span className="pl-2">{email}</span>
              </div>
              <div className="flex items-center mt-2">
                <FaPhone /> <span className=" pl-2">{phone_number}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between flex-col lg:flex-row items-center my-10">
          <div className="w-[70%] border-r p-5 py-15">
            <span className="pt-4 text-2xl">
              <strong>Descrizione: </strong>
            </span>
            <p className="mt-4">{abstract}</p>
          </div>
          <div className="w-[25%] text-center">
            <p className="font-semibold text-4xl">{price_pernight}€ / notte</p>
            <button type="button" class="text-white custom-bg-color-primary  cursor-pointer font-medium rounded-lg px-5 py-2.5 me-2 mt-6">Prenota ora!</button>
            <p className="mt-2 text-sm">Clicca sul tasto per prenotare il tuo soggiorno</p>
          </div>
        </div>
      </div>
      <div className="custom-bg-color-primary px-8 py-10">
        <div className="mx-auto max-w-screen-xl px-5">
          <h1 className="mt-5 font-bold text-2xl text-white px-8">RECENSIONI:</h1>
          <Reviews />
        </div>
      </div>

    </>
  );
};

export default HouseDetails;
