import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const headerMenu = [
  { route: "/inserthouse", name: "Inserisci appartamento", key: "inserthouse" },
  { route: "/", name: "Perchè sceglierci?", key: "whychoose" },
  { route: "/", name: "Programma Affiliazione", key: "affiliateprogram" },
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