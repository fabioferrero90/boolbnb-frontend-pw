import { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [typeVariables, setTypeVariables] = useState([]);
  const [orderedBy, setOrderedBy] = useState("most-liked");
  const [house, setHouse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [ratingNames, setRatingNames] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [houseTypes, setHouseTypes] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const defaultNotificationData = {
    title: "",
    message: "",
    type: ""
  };
  const [notificationData, setNotificationData] = useState(defaultNotificationData);
  const [showNotify, setShowNotify] = useState(false);

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

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

  const Notify = (title, message, type) => {
    setNotificationData({ title, message, type });
    setShowNotify(true);
    setTimeout(() => {
      setShowNotify(false);
      setTimeout(()=> {
        setNotificationData(defaultNotificationData);
      }, 2000);
    }, 5000);
  };

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
        setTypeVariables(types);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const fetchHouseTypes = () => {
    axios
      .get(`${APIendpoint}/houses/types`)
      .then((res) => {
        setHouseTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrderByChange = (e) => {
    setOrderedBy(e.target.value);
  };

  const fetchHouse = (id) => {
    axios
      .get(`${APIendpoint}/houses/${id}`)
      .then((res) => {
        setHouse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderReviews = (id) => {
    axios
      .get(`${APIendpoint}/reviews/${id}`)
      .then((res) => {
        const reviewsData = Array.isArray(res.data) ? res.data : [res.data];
        setReviews(reviewsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchGallery = (id) => {
    axios
      .get(`${APIendpoint}/houses/gallery/${id}`)
      .then((res) => {
        setGallery(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    fetchGallery,
    gallery,
    renderReviews,
    reviews,
    houseTypes,
    fetchHouseTypes,
    orderedBy,
    setOrderedBy,
    handleOrderByChange,
    fetchHouse,
    house,
    previewData,
    setPreviewData,
    setNotificationData,
    setShowNotify,
    notificationData,
    showNotify,
    Notify
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };