import { Box, Modal } from "@mui/material";
// import { useState } from "react";
import { Link } from "react-router-dom";

const ModalBann = () => {
    const open = true;
    return (
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-30 p-4 h-auto sm:h-1/2 rounded-2xl flex-col justify-center items-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
                            !Lamentamos informarte que has sido Baneado!
                        </h1>
                        <p className="text-2xl  text-center dark:text-white">
                            Lo sentimos, pero tu cuenta ha sido baneada por infringir nuestras normativas.
                            <br /> Esto significa que no podrás acceder a tu cuenta ni realizar ninguna acción en el sitio.
                            <br /> Si tienes alguna pregunta o quieres apelar tu baneo, por favor contacta con
                            <br />
                            <a className="text-yellow-500" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">nuestro equipo de soporte.</a>
                        </p>
                        <div w-full flex justify-center >
                            <Link to={'/'}>
                                <button onClick={()=>{localStorage.removeItem('userLogin'); localStorage.removeItem('usergoogle')}} className="m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Regresar a la pagina principal
                                </button>
                            </Link>
                        </div>
                    </Box>
                </Modal>
            </div>
    )
}

export default ModalBann