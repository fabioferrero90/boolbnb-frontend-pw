import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const headerMenu = [
  { route: "/", name: "Inserisci appartamento", key: "create" },
  { route: "/results", name: "Risultati Ricerca", key: "results" }
];

const DefaultLayout = () => {
  return (
    <div>
    <header><Header headerMenu={headerMenu}/></header>
    <main><Outlet /></main>
    <footer><Footer /></footer>
  </div>
  )
}

export default DefaultLayout