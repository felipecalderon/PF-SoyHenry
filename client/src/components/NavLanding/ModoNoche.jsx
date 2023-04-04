import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ModoNoche = () => {
    const localDark = JSON.parse(localStorage.getItem('isDarkMode')) || false;
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
    }, [localDark]);


    return (
      <Switch
    checked={isDarkMode}
    onChange={handleToggle}
    color="primary"
    inputProps={{ 'aria-label': 'toggle dark mode' }}
    icon={<Brightness7Icon fontSize="large" sx={{ fontSize: '30px', marginTop: '-3px'}} />}
    checkedIcon={<Brightness4Icon fontSize="large" sx={{ fontSize: '30px', marginTop: '-3px' }} />}
    sx={{
      '& .MuiSwitch-thumb': {
        width: '100px',
        height: '100px',
      }
    }}
    
/>

  
    )
}

export default ModoNoche;
