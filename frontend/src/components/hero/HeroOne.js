import React from 'react'
import Buyer1 from '../../assets/images/buyer1.png'
import Buyer2 from '../../assets/images/buyer2.png'
import Arrow1 from '../../assets/images/arrow1.png'
import { Link } from 'react-router-dom'

const HeroOne = () => {
  return (
  <section class="relative font-Poppins bg-primary dark:bg-primaryBlack text-white">
    <div class="lg:mx-8 flex flex-col md:flex-row items-center p-16">
      
      {/* <!-- Left Side: Text Section --> */}
      <div class="md:w-1/2 lg:w-1/2  flex flex-col items-start justify-center px-4 md:px-4  ">
        <h1 class="lg:text-8xl md:text-4xl font-bold leading-tight mt-5">
          From Craftsmen <br /> To Your Hands
        </h1>
        <div className='h-1.5 mt-10 md:w-48 lg:w-96 mx-10 mb-6 bg-secondary rounded-full'></div>
        <p class="lg:text-xl px-5 md:text-lg md:mt-2 md:mb-8 font-medium">
          Shop Authentic, Handcrafted Goods Today!
        </p>

          <div className='md:mx-10 lg:mx-24 mt-10 md:hover:scale-95 transition-all duration-300'>
            <Link to="#" class="bg-secondary text-white lg:text-3xl md:text-2xl font-semibold lg:py-1 lg:px-10 md:py-1 md:px-8 rounded-full hover:bg-orange-600 ">
              SHOP NOW
            </Link>
          </div>
        
        
      </div>

      {/* <!-- Right Side: Image Section --> */}
      <div class="lg:w-1/2 lg:mx-20 relative m-8 md:-top-6 flex justify-center">
        
        {/* <!-- Upper Image --> */}
        <div class="relative hover:scale-105 lg:-inset-0 md:-right-5 lg:right-96 transition-all duration-300 overflow-hidden transform z-20 -rotate-[25deg] drop-shadow-3xl">
          <img src={Buyer1} alt="Delivery Image" class="lg:w-full lg:h-full md:w-52 md:h-72 object-contain" />
        </div>

        {/* <!-- Lower Image --> */}
        <div class=" relative hover:scale-105 md:-left-0 lg:inset-0 transition-all duration-300 overflow-hidden transform z-10 rotate-[25deg] drop-shadow-4xl">
          <img src={Buyer2} alt="Craftsman Image" class="lg:w-full lg:h-full md:w-52 md:h-72 object-contain" />
        </div>

        {/* <!-- Decorative Arrow --> */}
        <div className='absolute md:-bottom-44 lg:right-72 md:right-28 transform lg:hover:scale-105  hover:scale-105 transition-all duration-300 '>
          <img src={Arrow1} alt="Craftsman Image" class="lg:w-52 md:w-32 md:h-72 object-contain" />
        </div>
      </div>
    </div>
</section>

  )
}

export default HeroOne