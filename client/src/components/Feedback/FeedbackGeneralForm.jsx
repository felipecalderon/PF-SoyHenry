import { Box, Modal, Rating, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const FeedbackGeneralForm = ({open, handleClose}) => {
  const [form, setForm] = useState({
    names: '',
    lastnames: '',
    email: '',
    password: '',
    confpassword: '',
    phone: '',
    rol: 'Postulante',
    active: true
  });
  return (
    <div>
      <Modal
        open={ open }
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl flex-col justify-center items-center">
          <Stack spacing={1}>
            <Rating name="size-large" defaultValue={2} size="large" />
          </Stack>
          <button onClick={handleClose()}>
            close
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
            !Gracias por unirte a FusionaJob!
          </h1>
          <h2 className="text-2xl  text-center dark:text-white">
            Por favor continúa completando tu perfíl para...
          </h2>
          <h3 className="mb-8 text-2xl font-bold text-center dark:text-white">
            !Aplicar a las ofertas!
          </h3>
          <div w-full flex flex-wrap justify-center >
            <Link to={'/profile'}>
              <button className="m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Completar Perfil
              </button>
            </Link>
            <Link to={'/offers'}>
              <button className=" m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Ver ofertas
              </button>
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackGeneralForm;