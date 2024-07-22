import React from 'react'
import './Home.css'
import Slide from './Slider/Slide'
import Welcome from './Welcome/Welcome'
import Banner from './Banner/Banner'
import Gift from './Gift/Gift'
import Join from './Join/Join'
import Laos from './Laos/Laos'
import Footer from '../../Component/Footer/Footer'
import OurBookStore from './OurBookStore/OurBookStore'
import Header from '../../Component/Header/Header'


const Home = () => {
  return (
    <div>
       <Header />  
      <Slide/>
      <Welcome/>
      <Banner/>
      <OurBookStore/>
      <Gift/>
      <Laos/>
      <Join/>
      <Footer/>
    </div>
  )
}

export default Home