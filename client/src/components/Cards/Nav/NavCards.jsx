import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dia from '../../../assets/sun.png'
import noche from '../../../assets/moon.png'
import logofusionajob from '../../../assets/logofusionajob.png'


export const NavCards = () => {
    const localDark = JSON.parse(localStorage.getItem('isDarkMode')) || false
    const [isDarkMode, setIsDarkMode] = useState(localDark);

    const handleToggle = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (!newIsDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('isDarkMode', 'false');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('isDarkMode', 'true');
        }
    };

    useEffect(() => {
        if (localDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [localDark])

    const hadleSignOut = () => {
        // Eliminar todo el contenido del localStorage
        localStorage.clear();
        // Agregar el elemento que desea mantener de nuevo al localStorage
        localStorage.setItem('isDarkMode', localDark);
    }

    const [showMenu, setShowMenu] = useState(false);

    function handleAvatarClick() {
        setShowMenu(!showMenu);
    }


    return (
        <nav className='flex justify-center bg-secondary-light dark:bg-primary-dark h-16'>
            <div className="flex">
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
                    <div className="flex dark:text-text-dark text-gray-900">
                        <Link to='/cards' className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Ofertas</Link>
                        <Link to='/about' className="dark:hover:text-yellow-200 hover:text-xl transition-all inline-block font-medium px-4 py-2">Sobre nosotros</Link>
                        <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="https://st2.depositphotos.com/1309454/5538/v/450/depositphotos_55380965-stock-illustration-avatars-characters.jpg" alt="User dropdown" onClick={handleAvatarClick} />
                        {/* Menu desplegable */}
                        <div id="userDropdown" className={`fixed z-10 ${showMenu ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 translate-y-12 translate-x-40 `}>
                            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>Bonnie Green</div>
                                <div class="font-medium truncate">name@flowbite.com</div>
                            </div>
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                <li>
                                    <Link href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Postulaciones</Link>
                                </li>
                                <li>
                                    <Link href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ofertas Guardadas</Link>
                                </li>
                                <li>
                                    <Link href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Favoritos</Link>
                                </li>
                                <li>
                                    <Link to={'/profile'} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                </li>
                            </ul>
                            <div class="py-1">
                                <Link to={"/"} onClick={hadleSignOut} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                            </div>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 gap-3">
                            <div onClick={handleToggle} className="cursor-pointer py-2 px-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-light">{isDarkMode
                                ? <img className="w-6" src={dia} alt='dia' />
                                : <img className="w-6" src={noche} alt='noche' />
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}