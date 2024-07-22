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


const Home = () => {
  return (
    <div>
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