import { Box, Modal } from "@mui/material";
// import { useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../Footer/ContacForm";
import { useState } from "react";

const ModalBann = () => {
    const userData = JSON.parse(localStorage.getItem('userLogin'))

    const open = true;
    
    const [openContact, setOpenContact] = useState(false)
    const handleContactOpen = () => { setOpenContact(true) };
    const handleContactClose = () => { setOpenContact(false) };
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-30 p-4 h-auto sm:h-auto rounded-2xl flex-col justify-center items-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
                        !Lamentamos informarte que has sido Baneado!
                    </h1>
                    <p className="text-2xl  text-center dark:text-white">
                        Lo sentimos, pero tu cuenta ha sido baneada por infringir nuestras normativas. Esto significa que no podrás acceder a tu cuenta ni realizar ninguna acción en el sitio.
                        <br /> Si tienes alguna pregunta o quieres apelar tu baneo, por favor contacta con nuestro 
                        <button className="text-yellow-500 mb-4 ml-1" onClick={handleContactOpen} target="_blank" rel="noreferrer"> equipo de soporte.</button>
                    </p>
                    <div w-full flex justify-center >
                        <Link to={'/'}>
                            <button onClick={() => { localStorage.removeItem('userLogin'); localStorage.removeItem('usergoogle') }} className="m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Regresar a la pagina principal
                            </button>
                        </Link>
                    </div>
                </Box>
            </Modal>
            <ContactForm open={openContact} handleClose={handleContactClose} data={userData} />
        </div>
    )
}

export default ModalBann