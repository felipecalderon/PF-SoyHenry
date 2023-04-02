import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveUser } from "../../redux/slices/userRegisterSlice";
import axios from "axios";

import working1 from '../../assets/working1.png';
import validationsRegister from './validationsRegister';

// Components
import { NavLanding } from "../NavLanding/NavLanding";
import Footer from "../Footer/Footer";

// Mui core;
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import FormularioPostulante from "./FormularioPostulante";

export const menu = [
    {
        name: "Planes",
        link: "#"
    },
    {
        name: "Sobre Nosotros",
        link: "/about"
    },
    {
        name: "Registrarme como recruiter",
        link: "/companyregister"
    },
]

export const Registro = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClick = async () => {
        // bloquea el boton
        setLoading(true);

        // Crea el usuario en la base de datos
        const userDbData = await axios.post('/auth/register', form)
            .catch(() => {
                setErrors({
                    ...errors,
                    email: '¡Este correo ya esta registrado!'
                })
                setLoading(false);
            })

        // Guarda los datos en localStorage 
        const objetoJSON = JSON.stringify(userDbData?.data)
        localStorage.setItem('userLogin', objetoJSON)

        // Guarda los datos en Redux
        dispatch(saveUser(userDbData.data))

        // Mensaje y redirige si todo fue exitoso
        handleOpen()
    };

    // validacion para habilitar el boton
    const formValues = Object.values(form);
    const errorsValue = Object.values(errors);
    const isFormComplete = formValues.every(value => value !== '' && value !== null);
    const isErrorsEmpty = errorsValue.every(value => value === '');
    console.log(isFormComplete)
    console.log(isErrorsEmpty)
    console.log(form)
    return (
        <div className="w-full h-screen flex flex-col justify-between bg-primary-light dark:bg-secondary-dark">
            <NavLanding menu={menu} />
            <div className='w-full mx-auto px-4 py-8 mt-14 bg-primary-light dark:bg-secondary-dark'>
                <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white'>¡Crea tu cuenta y encuentra ese empleo IT deseado!</h2>
                <div className='flex flex-col md:flex-row items-center justify-center mb-12'>
                    <img src={working1} alt='work1' className='w-full md:w-3/5 lg:w-2/5 mb-8 md:mb-0 rounded-lg' />
                    
                    <FormularioPostulante handleOpen={handleOpen} />
                </div>
                <div>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl flex-col justify-center items-center">
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
            </div>
            <Footer />
        </div>
    )
}