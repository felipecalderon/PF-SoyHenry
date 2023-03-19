import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import dia from '../../assets/sun.png'
import noche from '../../assets/moon.png'
import perfil from '../../assets/user.png'
import { ModalLogin } from "../ModalLogin/ModalLogin";

export const NavLanding = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      setIsDarkMode(!isDarkMode);
    };
    // Creamos un estado para controlar si el menú está abierto o cerrado
    const [open, setOpen] = useState(false);

    return (
    <nav className="bg-secondary-dark dark:bg-primary-dark transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-10 w-auto"
              src={logofusionajob}
              alt="Workflow"
            />
          </div>
          {/* Menú */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-baseline space-x-4 dark:text-text-dark text-gray-900">
            <Link className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Planes</Link>
            <Link to='/about' className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Sobre nosotros</Link>
            <Link to='/dashboardempresa' className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Dashboard Empresa</Link>
            <Link to='/registro' className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Registro</Link>
          </div>
          </div>
          {/* Botones */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 gap-3">
            <button onClick={() => {setOpen(!open)}} className="py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2">
            <img className="w-4 inline-block align-middle mr-2" src={perfil} alt='ingresar'/>
              Ingresar
            </button>
            <div onClick={handleToggle} className="cursor-pointer py-2 px-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-dark">{isDarkMode 
            ? <img className="w-6" src={dia} alt='dia'/>
            : <img className="w-6" src={noche} alt='noche'/>
            }</div>
              </div>
          </div>
        </div>
      </div>
      <ModalLogin isOpen={open} setOpen={setOpen}/>
    </nav>
)
}