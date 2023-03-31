import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { selectIsPremium } from './premiumSlice';

const PremiumButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: '#F59E0B',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#D97706',
  },
}));

const LoadingStyled = styled(CircularProgress)(({ theme }) => ({
  color: '#F59E0B',
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-12px',
  marginLeft: '-12px',
}));

export default function PremiumButton() {
  const isPremium = useSelector(selectIsPremium);

  const buttonContent = isPremium ? 'Usuario premium' : 'Convertirse en premium';

  return (
    <PremiumButtonStyled
      variant="contained"
      disableElevation
      disabled={isPremium}
      startIcon={isPremium ? null : <i className="fas fa-crown"></i>}
    >
      {buttonContent}
      {isPremium && <LoadingStyled size={24} thickness={5} />}
    </PremiumButtonStyled>
  );
}
