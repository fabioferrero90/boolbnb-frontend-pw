import { useGlobalContext } from "../Contexts/GlobalContext";
import { useEffect } from "react";

const Results = () => {
  const { houses, fetchHouses } = useGlobalContext();

  useEffect(() => {
    fetchHouses();
  }, []);

  console.log(houses);

  return (
    <div className=" mx-auto max-w-screen-xl">
      {houses &&
        houses.map((house) => (
          <div key={house.id}>
            <h2>{house.name}</h2>
            <p>{house.abstract}</p>
          </div>
        ))}
    </div>
  );
};

export default Results;
