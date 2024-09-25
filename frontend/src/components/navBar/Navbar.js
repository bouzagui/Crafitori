import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'; 
import Modal from '../modal/Modal';
import CartPage from '../cart/CartPage';  // CartPage for modal display
import logoBlack from '../../assets/images/logoBlack.png';
import logoWhite from '../../assets/images/logoWhite.png';
import axiosInstance from '../axios/axiosInstance';
import { IoClose } from "react-icons/io5";

const registrationLinks = [
  { id: 1, name: "Login", link: "/login/" },
  { id: 2, name: "Sign Up", link: "/sign-up/" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const toggleCartModal = () => setIsCartOpen(prevState => !prevState);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axiosInstance.post('/auth/logout/', { refresh_token: refreshToken });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfileClick = () => navigate("/auth/profile/");
  const handleDashboardClick = () => navigate("/dashboard");

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav>
      <div className="bg-primary dark:bg-gray-900 dark:text-white duration-200 relative z-40">
        <div className="py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div id="logo" className="flex-shrink-0">
              <a href="/home">
                <img src={logoBlack} alt="logo" className="w-32 cursor-pointer block dark:hidden hover:opacity-85" />
                <img src={logoWhite} alt="logo" className="w-32 cursor-pointer hidden dark:block" />
              </a>
            </div>
            <div id="searchBar" className="flex-grow max-w-2xl mx-4">
              <div className="relative">
                <input type="text" placeholder="Search..." className="w-full h-12 rounded-full pl-6 pr-10 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {!isLoggedIn ? (
                <ul className="flex items-center gap-6 font-bold text-xl text-nowrap  ">
                  {registrationLinks.map(link => (
                    <li key={link.id}>
                      <a href={link.link} className="hover:opacity-85 inline-block px-4 py-2 hover:rounded-full transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">{link.name}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <button
                    onClick={toggleCartModal}
                    className="relative hover:opacity-85 text-2xl p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaShoppingCart className="text-2xl text-text dark:text-white" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  <div ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="hover:opacity-85 text-2xl text-text dark:text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <BsPersonFill />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                        <button onClick={handleProfileClick} className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Profile</button>
                        <button onClick={handleDashboardClick} className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</button>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <Modal onClose={toggleCartModal}>
          <CartPage />
          <button onClick={toggleCartModal} className="absolute top-2 right-2">
            <IoClose className="text-text text-3xl" />
          </button>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
