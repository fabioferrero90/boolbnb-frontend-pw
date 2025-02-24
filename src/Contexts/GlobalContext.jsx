import { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);

  const fetchHouses = () => {
    axios
      .get("http://localhost:3000/houses")
      .then((res) => {
        setHouses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    houses,
    fetchHouses,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
