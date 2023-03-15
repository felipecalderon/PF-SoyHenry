import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
// import { useModal } from "../Hooks/useModal";
// import { ModalLogin } from "../ModalLogin/ModalLogin";

export const NavLanding = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    // const [isOpenModalLogin, openModalLogin, closeModalLogin] = useModal(false);

    const handleToggle = () => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      setIsDarkMode(!isDarkMode);
    };
    return (
      <div className="flex bg-slate-300">
        <nav className="relative dark:bg-black bg-slate-300 w-screen h-16">
      <div className="container flex justify-start items-center h-full w-full mx-auto px-4">
        <img src={logofusionajob} alt='logo' className="flex h-16 w-60 mr-4" />
        <div className="flex items-center dark:text-yellow-400 text-gray-900">
          <div className="relative">
          </div>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Planes/Tarifas</Link>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Registro</Link>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Ingreso</Link>
          
        </div>
      </div>
        </nav>
      </div>
    )
}