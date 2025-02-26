import { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const congiunzioni = ['e', 'o', 'ma', 'anche', 'però', 'oppure', 'anzi', 'quindi', 'dunque', 'cioè', 'di'];

  function filtraParoleChiave(input) {
    const splittedWord = input.split(' ').filter(parola => !congiunzioni.includes(parola.toLowerCase()));
    return splittedWord.join(' ');
  }

  const fetchResults = (value) => {
    const query = filtraParoleChiave(value);
    axios
      .get(`http://localhost:3000/houses/search?q=${query}`)
      .then((res) => {
        setResults(res.data);
        setFilteredResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [ratingNames, setRatingNames] = useState([]);
  const fetchRatings = () => {
    axios
      .get("http://localhost:3000/reviews/ratings")
      .then((res) => {
        setRatingNames(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const value = {
    results,
    filteredResults,
    setFilteredResults,
    setResults,
    fetchResults,
    ratingNames,
    fetchRatings,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
