import { useNavigate } from "react-router-dom"

const Header = ( {headerMenu} ) => {

  const navigate = useNavigate()

  return (
    <>
      <nav className="bg-white border-gray-200 custom-bg-color-primary">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/boolbnb-logo.png" className="h-12" alt="BoolB&B Logo" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Apri Menu Utente</span>
              <img className="w-12 h-12 rounded-full cursor-pointer" src="/user-propic/user.jpeg" alt="user photo"/>
            </button>
            <div className="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow-sm bg-gray-700 divide-gray-600" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-white">Mauro Formisano</span>
                <span className="block text-sm truncate text-gray-400">mauro@boolean.it</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Impostazioni</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Guadagni</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Disconnetti</a>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Apri Menu Principale</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 border-gray-700">
            {headerMenu.map(item => (
              <li key={item.key}>
                <a href="#" className="lock py-2 px-3 text-l rounded-sm md:p-0 text-white md:hover:text-teal-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700" aria-current="page" onClick={() => navigate(item.route)}>{item.name} </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </nav>
    </>
  )
}

export default Header