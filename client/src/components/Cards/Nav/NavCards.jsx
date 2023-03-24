import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dia from '../../../assets/sun.png'
import noche from '../../../assets/moon.png'
import logofusionajob from '../../../assets/logofusionajob.png'
import perfil from '../../../assets/user.png'


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
        if(localDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [localDark])

    return(
        <nav className='felx bg-secondary-light dark:bg-primary-dark h-16'>
            <div className="flex">
                <Link to='/profile'>
                    <button className='absolute font-medium py-[.1rem] px-2 h-[2.5rem] top-3 rounded-md ml-[75rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white shadow-md hover:bg-gray-400'>
                        <img className="w-4 inline-block align-middle mr-2" src={ perfil } alt='ingresar'/>
                        Perfil
                    </button>
                </Link>
                <div onClick={ handleToggle } className="cursor-pointer absolute py-2 px-2 top-3 ml-[79rem] bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-light">
                    {
                        isDarkMode 
                        ? <img className="w-6" src={dia} alt='dia'/>
                        : <img className="w-6" src={noche} alt='noche'/>
                    }
                </div>
                <Link to='/'>
                    <button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>
                        ← Home
                    </button>
                </Link>
                <div className="flex-shrink-0">
                    <img src={logofusionajob} alt='logo' className="h-10 top-3 w-auto relative ml-[9rem]"/>
                </div>
            </div>
        </nav>
    )
}