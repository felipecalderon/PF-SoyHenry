import React from 'react';
import Button from '@mui/material/Button';
import StarSharpIcon from '@mui/icons-material/StarSharp';

const PremiumButton = () => {
  const userData = JSON.parse(localStorage.getItem('userLogin'));
  if(userData?.premium){
  return (
    <div>
      <Button
        className="pointer-events-none cursor-default text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        style={{ color: 'gold' }}
      >
        <StarSharpIcon style={{ color: 'gold' }} />
        Usuario Premium
      </Button>
    </div>
  );
  }
  return null
};

export default PremiumButton
