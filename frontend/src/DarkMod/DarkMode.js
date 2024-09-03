import React, { useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";


const DarkMode = () => {
  const [theme, setTheme] = useState("dark")
  return (
    <div className="relative">
        <MdDarkMode onClick={() => setTheme(theme === "dark" ? "light" : "dark" )} className={`text-3xl text-primaryBlack cursor-pointer right-0 z-10  ${theme === "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`}/>


        <MdOutlineDarkMode onClick={() => setTheme(theme === "dark" ? "light" : "dark" )} className={`text-3xl cursor-pointer `}/>
    </div>
  )
}

export default DarkMode