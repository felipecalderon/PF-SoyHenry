import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import tw from "tailwind-styled-components";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const PremiumButton = tw.button`
  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600
  text-white
  font-bold
  py-2
  px-4
  rounded
  animate-pulse
`;

const PremiumModal = tw.div`
  flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl flex-col justify-center items-center
`;

const PremiumModalTitle = tw.h1`
  text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white
`;

const CloseButton = tw.button`
  absolute
  top-4
  right-4
  text-gray-500
  hover:text-gray-900
  focus:outline-none
`;

export default function PremiumButtonComponent() {
  const navigate=useNavigate()
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const email=dataUserLocalStorage.email
  const [isPulsing, setIsPulsing] = useState(false);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userLogin'));
  const handleClickPremium=()=>{
   axios.post(`/stripe`,{customerEmail: email})
   .then((res)=>{
   const link = document.createElement('a');
   link.href = res.data.url;
   link.target = '_blank';
   link.rel = 'noopener noreferrer';
   link.click()
  })
   .catch((err)=>console.log(err))
  }
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);

  const handleOpen = () => {
    setOpen(true);
    setClosed(false);
  };

  const handleClose = () => {
    setOpen(false);
    setClosed(true);
  };

  if (!userData?.premium) {
    return (
      <>
        <PremiumButton
          css={isPulsing ? { animation: `${pulse} 1s ease-in-out infinite` } : {}}
          className="border border-solid border-gold-500"
          onClick={handleOpen}
        >
         Hazte usuario premium
      </PremiumButton>
      
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PremiumModal>
            {!closed && (
              <CloseButton onClick={handleClose}>
                <CloseIcon />
              </CloseButton>
            )}
            <PremiumModalTitle>
              ¡Disfruta los grandes beneficios del plan Premium!
            </PremiumModalTitle>
            <ul className="text-lg md:text-xl text-center dark:text-text-dark">
              <li className="py-2 font-semibold">
                Accede a más ofertas laborales disponibles en nuestra base de datos
              </li>
              <li className="py-2 font-semibold">
                Usa filtros combinados para encontrar tu trabajo ideal
              </li>
              <li className="py-2 font-semibold">
                Guarda tantas ofertas como quieras y aplica en el momento que
                quieras
              </li>
          </ul>
          <button className='mt-6 h-14 bg-green-600 hover:bg-green-900 dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleClickPremium}>Hazte Premium</button>
        </PremiumModal>
          </Modal>
        </div> 
      </>
    );
  }
  return null;
}
