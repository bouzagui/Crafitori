import React from 'react'
import logoWhite from '../../assets/images/logoWhite.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='font-Poppins bg-text text-white mb-0 bottom-0 mt-40 py-8 px-4 md:px-8 lg:px-24'>
        <div className='mx-auto grid gri md:grid-cols-3 gap-8'>
          <div>
          <img src={logoWhite} alt='logoWhite' className="w-32 cursor-pointer" />
            <p className='mt-4'>At <a href='/' className='font-semibold  text-lg hover:underline'>CRAFITORI</a>, we are dedicated to connecting you with top-quality products and services. Our marketplace brings together a community of trusted sellers and satisfied customers, ensuring a seamless shopping experience. Whether you're looking for the latest trends or unique, handcrafted items, we are committed to providing you with exceptional value and support. Thank you for choosing us—your satisfaction is our priority!</p>

          </div>
          <div className='flex flex-col mt-4 md:items-center'>
            <h4 className='text-lg font-semibold'>Quick Links</h4>
            <ul className='mt-4 space-y-4'>
              <li>
                <Link to="/" className='hover:underline hover:scale-75'>Home</Link>
              </li>
              <li>
                <Link to="aboutUs" className='hover:underline hover:scale-105'>about Us</Link>
              </li>
              <li>
                <Link to="contactUs" className='hover:underline hover:scale-105'>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg mt-4 font-semibold'>Follow Us</h4>
            <div className='flex space-x-4 mt-4 '>
              <a href=''  className='text-2xl transform transition-all duration-300 hover:scale-150'><FaFacebook/></a>
              <a href='' className='transform transition-all duration-300 hover:scale-150'><FaTwitter className='text-2xl'/></a>
              <a href='' className='transform transition-all duration-300 hover:scale-150'><FaInstagram className='text-2xl'/></a>
              <a href='' className='transform transition-all duration-300 hover:scale-150'><FaLinkedinIn className='text-2xl'/></a>
            </div>
            <form className='flex items-center justify-center mt-8'>
              <input type='email' placeholder='Enter Email' 
              className='w-full p-2 rounded-l-xl bg-primaryBlack border border-primaryBlackHover'></input>
              <button className='bg-secondary transform transition-all duration-300 hover:scale-105 hover:bg-orange-600 text-white border border-secondary px-4 py-2 rounded-r-xl'>Subscribe</button>
            </form>
          </div>
        </div>
        <div className='text-white mt-8 border-t border-primary pt-4 '>
          <div className='mx-auto flex flex-col md:flex-row justify-between items-center'>
            <p>&copy; 2024 <a href='/' className='font-semibold  text-lg hover:underline'>CRAFITORI</a> All right reserved.</p>
            <div className='flex space-x-4 md:mt-0'>
              <a href="" className='hover:underline transform transition-all duration-300 hover:scale-105'>Privacy Policy</a>
              <a href="" className='hover:underline transform transition-all duration-300 hover:scale-105'>Terms & Conditions</a>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer