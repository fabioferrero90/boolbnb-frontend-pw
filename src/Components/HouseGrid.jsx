import { FaHeart } from 'react-icons/fa';

const HouseGrid = () => {

  const houses = [
    {
      name: "Casa 1",
      abstract: "Casa 1 è una casa molto bella",
      cover_image: "/houses/casa1.jpeg",
      likes: 29
    },
    {
      name: "Casa 2",
      abstract: "Casa 2 è una casa moderna con piscina",
      cover_image: "/houses/casa2.jpeg",
      likes: 42
    },
    {
      name: "Casa 3",
      abstract: "Casa 3 è una casa rustica in campagna",
      cover_image: "/houses/casa3.jpeg",
      likes: 79
    }
  ]


  return (
    <div className="max-w-[80%] mx-auto flex flex-col items-center justify-center pt-20">
      <h1 className="block font-bold pb-8 text-3xl self-start text-white">Preferiti dagli utenti:</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {houses.map((house, index) => (
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
                <div className="mt-auto">
                  <a href="#" className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white custom-bg-color-primary rounded-lg hover:custom-teal-bg focus:ring-4 focus:outline-none focus:ring-blue-300">
                      Scopri di più
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
                </div>
            </div>
            <div className="cursor-pointer flex flex-col absolute top-[-5%] border border-gray-400 left-[-5%] bg-white text-red-400 rounded-full w-12 h-12 flex items-center justify-center">
              <FaHeart className="w-7 h-7" />
              <span className="absolute font-bold text-xs text-white">{house.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HouseGrid