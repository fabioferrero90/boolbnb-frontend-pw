import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
const HouseGrid = () => {

  const [liked, setLiked] = useState([true,false,false])

  const manageLike = (id, index) => {
    setLiked(liked.map((like, i) => i === index ? !like : like))
    if (liked[index] == true) {
      // axios.put(`http://localhost:3000/houses/${id}`)
      // .then(response => {
      //   console.log(response)
      // })
    } else {
      // axios.put(`http://localhost:3000/houses/${id}`)
      // .then(response => {
      //   console.log(response)
      // })
    }
  }

  const houses = [
    {
      id: 1,
      name: "Casa 1",
      abstract: "Casa 1 è una casa molto bella",
      cover_image: "/houses/casa1.jpeg",
      likes: 29,
      reviews: 1209,
      avg_rating: 4
    },
    {
      id: 2,
      name: "Casa 2",
      abstract: "Casa 2 è una casa moderna con piscina",
      cover_image: "/houses/casa2.jpeg",
      likes: 42,
      reviews: 124,
      avg_rating: 3
    },
    {
      id: 3,
      name: "Casa 3",
      abstract: "Casa 3 è una casa rustica in campagna",
      cover_image: "/houses/casa3.jpeg",
      likes: 79,
      reviews: 1982,
      avg_rating: 5
    },
    {
      id: 4,
      name: "Casa 4",
      abstract: "Casa 4 è una casa rustica in campagna",
      cover_image: "/houses/casa4.jpeg",
      likes: 79,
      reviews: 1982,
      avg_rating: 5
    },
  ]

  const ratingNames = [
    {
      rating: 1,
      rating_name: "Scarso",
    },
    {
      rating: 2,
      rating_name: "Decente",
    },
    {
      rating: 3,
      rating_name: "Buono",
    },
    {
      rating: 4,
      rating_name: "Ottimo",
    },
    {
      rating: 5,
      rating_name: "Superbo",
    }
  ]

  return (
    <div className="max-w-[80%] mx-auto flex flex-col items-center justify-center pt-20">
      <h1 className="block font-bold pb-8 text-3xl self-start text-white">Preferiti dagli utenti:</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {houses.splice(0,3).map((house, index) => (
          
          <div key={index} className={`relative w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            <a href="#">
                <img className="rounded-t-lg w-full h-[30vh] object-cover" src={house.cover_image} alt="" />
            </a>
            <div className="p-5 flex flex-col flex-grow">
                <div>
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{house.name}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">{house.abstract}</p>
                </div>
                <div className="flex items-center pb-4 text-xs">
                <FaHeart className="w-5 h-5 text-red-400 " />
                <span className="px-1 font-bold">{house.likes}</span>
                -
                <span className="px-1 font-bold">{ratingNames.find(r => r.rating === house.avg_rating)?.rating_name}</span>
                -
                <span className="px-1 text-gray-500">{house.reviews} recensioni</span>
                </div>
                <div className="mt-auto">
                  <a href="#" className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300">
                      Scopri di più
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
                </div>
                <div className={`cursor-pointer flex flex-col absolute top-[2%] border border-gray-400 right-[2%] bg-white rounded-full w-8 h-8 flex items-center justify-center ${liked[index] ? 'text-red-400' : 'text-gray-400'}`} onClick={() => manageLike(house.id, index)}>
              <FaHeart className="w-4 h-4" />

            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HouseGrid