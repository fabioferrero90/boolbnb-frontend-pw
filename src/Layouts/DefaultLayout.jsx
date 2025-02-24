import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const DefaultLayout = () => {
  return (
    <div>
    <header><Header /></header>
    <main><Outlet /></main>
    <footer><Footer /></footer>
  </div>
  )
}

export default DefaultLayout