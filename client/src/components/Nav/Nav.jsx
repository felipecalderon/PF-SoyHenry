import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
// import { useModal } from "../Hooks/useModal";
// import { ModalLogin } from "../ModalLogin/ModalLogin";

export const Nav = () => {
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
      <div>
        <nav className="relative dark:bg-black bg-slate-300 w-screen h-16">
      <div className="container flex justify-start items-center h-full w-full mx-auto px-4">
        <img src={logofusionajob} alt='logo' className="flex h-16 w-60 mr-4" />
        <div className="flex items-center dark:text-yellow-100 text-gray-900">
          <Link href="#" className="inline-block dark:hover:text-yellow-200 font-medium px-4 py-2">Inicio</Link>
          <Link href="#" className="inline-block dark:hover:text-yellow-200 font-medium px-4 py-2">Empleadores</Link>
          <Link to='/offersCreate'>Crear oferta laboral  </Link>
          <div className="relative">
            <select className="border-none  dark:bg-black bg-slate-300 appearance-none cursor-pointer px-4 py-2" name="Trabajos">
              <option value="trabajos">Trabajos ▼</option>
              <option value="remoto">Remoto</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Planes/Tarifas</Link>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Registro</Link>
            <Link href="#" className="inline-block hover:text-yellow-200 font-medium px-4 py-2">Ingreso</Link>
          <div className="ml-6">
            <button onClick={handleToggle} id="toggleButton" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">{isDarkMode ? 'Día' : 'Noche'}</button>
          </div>
        </div>
      </div>
        </nav>
      </div>
    )
}