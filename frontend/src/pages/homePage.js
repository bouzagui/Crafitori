import React from 'react'
import Navbar from '../components/navBar/Navbar'
import HeroOne from '../components/hero/HeroOne'
import HeroTwo from '../components/hero/HeroTwo'
import Products from '../components/products/Products'
import CategorySlide from '../components/category/CategorySlide.js'
import Footer from '../components/footer/Footer.js'

const HomePage = () => {
  return (  
    <div>
      <Navbar />
      <HeroOne />
      <HeroTwo />
      <CategorySlide />
      <Products />
      <Footer />
    </div>
  ) 
}

export default HomePage 