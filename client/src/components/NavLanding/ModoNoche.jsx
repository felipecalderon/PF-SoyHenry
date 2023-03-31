import { useEffect, useState } from "react";
import dia from '../../assets/sun.png'
import noche from '../../assets/moon.png'
const ModoNoche = () => {
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
    
    return (
        <div onClick={handleToggle} className="cursor-pointer py-2 px-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-light">{isDarkMode 
            ? <img className="select-none w-6" src={dia} alt='dia'/>
            : <img className="select-none w-6" src={noche} alt='noche'/>
            }</div>
    )
}

export default ModoNoche