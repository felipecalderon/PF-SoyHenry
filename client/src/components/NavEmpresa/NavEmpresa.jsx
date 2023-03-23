import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'

export const NavEmpresa = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      setIsDarkMode(!isDarkMode);
    };
    return (
      <div>
          <nav className="bg-secondary-light dark:bg-primary-dark w-full h-16 transition-all">
        <div className="container flex justify-start items-center h-full w-full mx-auto px-4">
          <img src={logofusionajob} alt='logo' className="h-10 w-auto relative ml-[5rem]"/>
          <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
        </div>
          </nav>
      </div>
    )
  }