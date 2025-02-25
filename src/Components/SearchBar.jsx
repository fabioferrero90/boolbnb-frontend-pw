import { useGlobalContext } from "../Contexts/GlobalContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const { fetchResults } = useGlobalContext()
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }


  const submitSearch = (e) => {
    e.preventDefault()
    fetchResults(search)
    navigate('/results')
  }

  useEffect(() => {
    setSearch('')
  }, [])

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="block font-bold pb-8 text-3xl self-start text-white">Cerca l'alloggio per te:</h1>
      <form onSubmit={submitSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Cerca
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={handleSearch}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-white"
            placeholder="Cerca l'alloggio che fa per te..."
            required
          />
          <button
            type="submit"
            className="cursor-pointer text-white absolute end-2.5 bottom-2.5 custom-bg-color-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cerca
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar