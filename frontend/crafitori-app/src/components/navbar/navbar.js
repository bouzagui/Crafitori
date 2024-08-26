import React from 'react'
import './navbar.css'
import logoBlack from '../assets/images/logoBlack.png'
import search_icon from '../assets/images/search.svg'


const navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logoBlack} alt='logoBlack'></img>
        </div>

    </div>
  )
}

export default navbar