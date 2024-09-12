import React from 'react';
import logoBlack from '../assets/images/logoBlack.png';
import logoWhite from '../assets/images/logoWhite.png';
import DarkMode from './navBar/DarkMode';
import { FaShoppingCart } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';

const registrationLink = [
  {
    id: 1,
    name: "Login",
    link: "/login/"
  },
  {
    id: 2,
    name: "Sign Up",
    link: "/sign-up/"
  },
];

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <div className="bg-primary dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex items-center justify-between">
          <div id='logo'>
            <a href="/home">
              <img
                src={logoBlack}
                alt='logoBlack'
                className="
                  w-1/2
                  cursor-pointer
                  block dark:hidden
                  hover:opacity-85"
              />
              <img
                src={logoWhite}
                alt='logoWhite'
                className="
                  w-1/2
                  cursor-pointer
                  hidden dark:block"
              />
            </a>
          </div>
          <div id='searchBar' className="
              w-2/5
              h-16
              bg-primaryBlack
              dark:bg-white
              rounded-full
              flex 
              justify-start
              items-center">
            <input
              type='text'
              placeholder='Search...'
              className="
                w-5/6
                h-12
                rounded-full
                ml-3
                p-6"
            />
          </div>
          <div className='hidden lg:flex items-center gap-6'>
            {!isLoggedIn ? (
              <ul className="
                flex 
                justify-start
                items-center
                gap-6 
                font-bold
                text-xl
                text-primaryBlack
                dark:text-white">
                {registrationLink.map((data) => (
                  <li key={data.id}>
                    <a href={data.link}
                      className="
                        hover:opacity-85
                        inline-block
                        px-4">
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <a href="/cart" className="
                  hover:opacity-85
                  text-2xl">
                  <FaShoppingCart />
                </a>
                <div className="relative group">
                  <button className="hover:opacity-85 text-2xl">
                    <BsPersonFill />
                  </button>
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl hidden group-hover:block">
                    <a href="/profile" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600">Profile</a>
                    <a href="/logout" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600">Logout</a>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
