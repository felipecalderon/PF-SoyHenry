import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import tw from "tailwind-styled-components";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


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
bg-orange-600

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
  const [isPulsing, setIsPulsing] = useState(false);
  const dispatch = useDispatch();
  const [isPremium, setIsPremium] = useState(localStorage.getItem("premium"));

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
  
  return  (
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
            <ul className="text-lg md:text-xl text-center">
              <li>
                Usa filtros combinados para encontrar tu trabajo ideal
              </li>
              <li>
                Guarda tantas ofertas como quieras y aplica en el momento que
                quieras
              </li>
            <li>Puedes encontrar más ofertas laborales en este modal</li>
          </ul>
        </PremiumModal>
      </Modal>
</div> 

</>
  
  );
}
