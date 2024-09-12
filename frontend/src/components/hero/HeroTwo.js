import React from 'react'
import Seller1 from '../../assets/images/seller.png'
import Seller2 from '../../assets/images/map.png'
import Arrow2 from '../../assets/images/arrow2.png'
import { Link } from 'react-router-dom'

const HeroTwo = () => {
  return (


  //   <div className="bg-secondary p-8">
  //   <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
  //     <div className="md:w-1/2 mb-8 md:mb-0">
  //       <h1 className="text-4xl md:text-5xl font-bold text-blue-600 leading-tight mb-4">
  //         Sell Your Craft<br />
  //         To Every Corner<br />
  //         Of Morocco
  //       </h1>
  //       <p className="text-xl text-blue-600 mb-6">
  //         Showcase Your Work<br />
  //         To A Nationwide Audience!
  //       </p>
  //       <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300">
  //         Become A Seller
  //       </button>
  //     </div>
  //     <div className="md:w-1/2 relative">
  //       <div className="relative z-10 transform -rotate-6">
  //         <img 
  //           src={Seller1} 
  //           alt="Craftsman working" 
  //           className="rounded-lg shadow-lg mb-4 md:mb-0"
  //         />
  //       </div>
  //       <div className="absolute top-10 left-10 z-0 transform rotate-6">
  //         <img 
  //           src={Seller2} 
  //           alt="Map of Morocco" 
  //           className="rounded-lg shadow-lg"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // </div>


  <section class="relative font-Poppins w-full bg-secondary dark:bg-secondaryBlack text-white ">
    <div class="py-20 pb-28 lg:mx-8 flex mr-0 ml-8 flex-col md:flex-row md:justify-between items-center p-16">
      
      {/* <!-- Right Side: Text Section --> */}

      <div class="lg:w-1/2 lg:mx-20 relative mt-16 md:-top-6 flex justify-between">
        
        {/* <!-- Upper Image --> */}
        <div class="relative hover:scale-105 lg:-right-20 transition-all duration-300 overflow-hidden transform z-20 -rotate-[25deg] drop-shadow-3xl">
          <img src={Seller1} alt="Delivery Image" class="lg:w-full lg:h-full md:w-52 md:h-72 object-contain" />
        </div>

        {/* <!-- Lower Image --> */}
        <div class=" relative hover:scale-105 md:-left-5 lg:-left-32 transition-all duration-300 overflow-hidden transform z-10 rotate-[25deg] drop-shadow-4xl">
          <img src={Seller2} alt="Craftsman Image" class="lg:w-full lg:h-full md:w-52 md:h-72 object-contain" />
        </div>

        {/* <!-- Decorative Arrow --> */}
        <div className='absolute md:-bottom-44 lg:right-72 md:right-32 transform lg:hover:scale-105  hover:scale-105 transition-all duration-300 '>
          <img src={Arrow2} alt="Craftsman Image" class="lg:w-52 md:w-32 md:h-72 object-contain" />
        </div>
      </div>


      {/* <!-- Left Side: Image Section --> */}

      <div class="md:w-1/2 lg:w-1/2 items-start mr-0 ml-20 flex flex-col justify-center px-4 md:px-4  ">
        <h1 class="lg:text-7xl md:text-4xl font-bold leading-tight mt-5">
          Sell Your Craft<br />To Every Corner<br />Of Morocco
        </h1>
        <div className='h-1.5 md:w-48 mt-10 lg:w-96 mx-6 mb-10 bg-primary rounded-full'></div>
        <div className=' '>
          <p class="lg:text-xl lg:items-end px-5 md:text-lg md:mt-2 md:mb-8 font-medium">
          Showcase Your Work<br /> To A Nationwide Audience!
          </p>
        </div>

          <div className='md:mx-10 lg:mx-24 lg:pt-16 mt-10 md:hover:scale-95 transition-all duration-300'>
             <Link to='#' className="bg-primary text-white py-3 px-6 text-lg hover:bg-blue-600  font-semibold md:font-bold lg:py-4 lg:px-6 lg:text-2xl rounded-full">
               Become A Seller
            </Link>
          </div>
      </div>
    </div>
</section>
 
  )
}

export default HeroTwo