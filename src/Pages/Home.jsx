import SearchBar from "../Components/SearchBar";
import HouseGrid from "../Components/HouseGrid";
import Statistics from "../Components/partials/Statistics";
import { useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";

const Home = () => {
  const { fetchRatings } = useGlobalContext();

  useEffect(() => {
    fetchRatings();
  }, []);
  return (
    <div className="home flex flex-col items-center justify-center custom-bg-dark py-30">
      <SearchBar />
      <Statistics />
      <HouseGrid />
    </div>
  );
};

export default Home;
