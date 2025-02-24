import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const DefaultLayout = () => {
  return (
    <div>
    <header className=""><Header /></header>
    <main><Outlet /></main>
    <footer className=""><Footer /></footer>
  </div>
  )
}

export default DefaultLayout