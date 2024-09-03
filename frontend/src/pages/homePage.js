import React from 'react'
import Navbar from '../components/navBar/Navbar'
import HeroOne from '../components/hero/HeroOne'
import HeroTwo from '../components/hero/HeroTwo'
import Category1 from '../components/category/Category1.js'
import Products from '../components/products/Products'
import CategoryList from '../components/category/CategoryList'

const homePage = () => {
  return (  
    <div>
      <Navbar />
      <HeroOne />
      <HeroTwo />
      <Category1 />
      <CategoryList />
      <Products />
    </div>
  ) 
}

export default homePage 