import React from 'react';
import Button from '@mui/material/Button';
import StarSharpIcon from '@mui/icons-material/StarSharp';

const PremiumButton = () => {
  return (
    <Button
      className="bg-orange-600"
    >
    <StarSharpIcon  className="bg-orange-600"/>
      Usuario Premium
    </Button>
  );
};

export default PremiumButton;



