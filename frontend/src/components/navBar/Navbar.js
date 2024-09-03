import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../../assets/images/logoBlack.png';
import logoWhite from '../../assets/images/logoWhite.png';
// import DarkMode from './navBar/DarkMode';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import axiosInstance from '../../components/axios/axiosInstance';

const registrationLink = [
  { id: 1, name: "Login", link: "/login/" },
  { id: 2, name: "Sign Up", link: "/sign-up/" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.error('No refresh token found.');
      return;
    }
    
    try {
      await axiosInstance.post('/auth/logout/', { refresh_token: refreshToken });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfile = () => {
    navigate("/auth/profile/");
  };

  return (
    <div className="bg-primary dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div id='logo' className="flex-shrink-0">
            <a href="/home">
              <img src={logoBlack} alt='logoBlack' className="w-32 cursor-pointer block dark:hidden hover:opacity-85" />
              <img src={logoWhite} alt='logoWhite' className="w-32 cursor-pointer hidden dark:block" />
            </a>
          </div>
          <div id='searchBar' className="flex-grow max-w-2xl mx-4">
            <div className="relative">
              <input type='text' placeholder='Search...' className="w-full h-12 rounded-full pl-6 pr-10 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            {!isLoggedIn ? (
              <ul className="flex items-center gap-6 font-bold text-xl">
                {registrationLink.map((data) => (
                  <li key={data.id}>
                    <a href={data.link} className="hover:opacity-85 inline-block px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700">{data.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <button onClick={() => navigate('/cart')} className="hover:opacity-85 text-2xl p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FaShoppingCart />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="hover:opacity-85 text-2xl p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <BsPersonFill />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                      <button onClick={handleProfile} className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Profile</button>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="ml-4">
            {/* <DarkMode /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;