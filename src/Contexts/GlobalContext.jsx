import { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [typeVariables, setTypeVariables] = useState([]);
  const [orderedBy, setOrderedBy] = useState("most-liked");

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  console.log(APIendpoint);
  const congiunzioni = [
    "e",
    "o",
    "ma",
    "anche",
    "però",
    "oppure",
    "anzi",
    "quindi",
    "dunque",
    "cioè",
    "di",
  ];

  function filtraParoleChiave(input) {
    const splittedWord = input
      .split(" ")
      .filter((parola) => !congiunzioni.includes(parola.toLowerCase()));
    return splittedWord.join(" ");
  }

  const fetchResults = (value) => {
    const query = filtraParoleChiave(value);
    axios
      .get(`${APIendpoint}/houses/search?q=${query}`)
      .then((res) => {
        setResults(res.data);
        setFilteredResults(res.data);
        const types = [];
        res.data.filter((house) => {
          if (!types.includes(house.type)) {
            types.push(house.type);
          }
        });
        console.log(types);
        setTypeVariables(types);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [ratingNames, setRatingNames] = useState([]);
  const fetchRatings = () => {
    axios
      .get(`${APIendpoint}/reviews/ratings`)
      .then((res) => {
        setRatingNames(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrderByChange = (e) => {
    setOrderedBy(e.target.value);
  };

  const value = {
    results,
    filteredResults,
    setFilteredResults,
    setResults,
    typeVariables,
    fetchResults,
    ratingNames,
    fetchRatings,
    orderedBy,
    setOrderedBy,
    handleOrderByChange,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
