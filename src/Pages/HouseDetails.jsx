import { useGlobalContext } from "../Contexts/GlobalContext"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


const HouseDetails = () => {
  const { fetchHouse, house } = useGlobalContext();
  const { id } = useParams();

  const { name, abstract, host_name, rooms, beds, bathrooms, size, address, cover_image, type, price_pernight, likes } = house;

  useEffect(() => {
    fetchHouse(id);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <p>{abstract}</p>
    </div>
  )
}

export default HouseDetails