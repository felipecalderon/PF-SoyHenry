import { Link, useNavigate } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png'
import UserPremiumButton from "../BotonPremium/UserPremiumBoton";
import ModoNoche from "./ModoNoche";
import UserMenu from "./UserMenu";
import {Menu} from '@mui/icons-material'
import { useState } from "react";

export const NavLanding = ({menu}) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userLogin'))
  const userGoogle = JSON.parse(localStorage.getItem('usergoogle'))

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const estaRegistrado = menu?.filter((e) => {
    if (user && e.link === '/registro') return false
    return true
  })
  
  return (
    <nav className="z-50 bg-secondary-light dark:bg-primary-dark fixed top-0 w-full transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo y Menú */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-auto cursor-pointer"
              src={logofusionajob}
              alt="Fusiona Job"
              onClick={() => navigate('/')}
            />
          </div>
          <div className="ml-6 items-baseline space-x-4 dark:text-text-dark text-gray-900 hidden md:block">
          {
            estaRegistrado?.map(item => {
              return <Link key={item.name} to={item.link} className="dark:hover:text-yellow-200 hover:scale-110 transition-all inline-block font-medium px-4 py-2">{ item.name }</Link>
            })
          }
          </div>
        </div>
        {/* Botones */}
        <div className="flex">
          <div className="ml-4 hidden md:flex items-center justify-end md:ml-6 gap-3">
            {/* Botón para mostrar menú en dispositivos móviles */}
            <UserMenu user={user} userGoogle={userGoogle}/>
            <ModoNoche />
          </div>
            <button onClick={toggleMenu} className="md:hidden">
              <Menu className="text-gray-800 dark:text-white"/>
            </button>
        </div>
      </div>
      {/* Menú en dispositivos móviles */}
      <div className={`${isMenuOpen ? 'flex flex-col items-end gap-3 pb-6' : 'hidden'} md:hidden`}>
        {
          estaRegistrado?.map(item => {
            return <Link key={item.name} to={item.link} className="block dark:text-yellow-200 hover:scale-110 transition-all font-medium px-4 py-2">{ item.name }</Link>
          })
        }
        <UserPremiumButton/>
        <UserMenu user={user} userGoogle={userGoogle}/>
        <ModoNoche />
      </div>
    </div>
  </nav>
)
}