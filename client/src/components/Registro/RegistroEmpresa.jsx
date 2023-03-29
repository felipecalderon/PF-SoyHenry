import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working2 from '../../assets/working2.png';
import Footer from "../Footer/Footer";
import { postFetchNewCompany } from '../../redux/actions/postFetchNewCompany'
import validationsRegisterCompany from "./validationsRegisterCompany";
import { useDispatch } from "react-redux";
import axios from "axios";

// Mui core;
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { NavLanding } from "../NavLanding/NavLanding";
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
      name: "Registrarme como postulante",
      link: "/registro"
    },
  ]
export const RegistroEmpresa = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        companyname: '',
        lastnames: '',
        password: '',
        email: '',
        description: '',
        location: '',
        website: '',
        logo: '',
        rol: 'Empresa',
        active: true
    });

    const [errors, setErrors] = useState({
        username: '',
        companyname: '',
        lastnames: '',
        password: '',
        email: '',
        description: '',
        location: '',
        website: '',
        logo: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorsNew = validationsRegisterCompany(form);
        setErrors(errorsNew);
        if (Object.keys(errorsNew).length === 0) {
            await axios.post('/auth/register', form)
            const userdata = await axios.post(`/user/email`, { email: form.email })
            console.log(userdata);
            const objetoJSON = JSON.stringify(userdata.data)
            localStorage.setItem('userLogin', objetoJSON)
            navigate('/dashboardempresa');
        }
    };

    return (
        <>
        <NavLanding menu={menu}/>
        <div className='w-full mx-auto px-4 py-8 mt-14 bg-primary-light dark:bg-secondary-dark'>
            <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white'>¡Registrate como Recruiter y encuentra al mejor candidato!</h2>
            <div className='flex flex-col md:flex-row items-center justify-center mb-12'>
              <img src={working2} alt='work1' className='w-full md:w-3/5 lg:w-2/5 mb-8 md:mb-0 rounded-lg' />
              <form className='w-full md:w-2/5 lg:w-3/5 md:ml-8' onSubmit={(event) => handleSubmit(event)}>

                    <Box
                        className="grid grid-cols-2"
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <div>
                            <TextField label="Nombres" value={form.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} variant="standard" name='username' />
                        </div>
                        <div>
                            <TextField label="Apellidos" value={form.lastnames} onChange={handleChange} error={!!errors.lastnames} helperText={errors.lastnames} variant="standard" name='lastnames' />
                        </div>
                        <div>
                            <TextField label="Email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} variant="standard" name='email' />
                        </div>
                        <div>
                            <TextField label="Contraseña" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} variant="standard" name='password' type="password" />
                        </div>
                        <div>
                            <TextField label="Nombre de la empresa" value={form.companyname} onChange={handleChange} error={!!errors.companyname} helperText={errors.companyname} variant="standard" name='companyname' />
                        </div>
                        <div>
                            <TextField label="Logo" value={form.logo} onChange={handleChange} error={!!errors.logo} helperText={errors.logo} variant="standard" name='logo' />
                        </div>
                        <div>
                            <TextField label="Website" value={form.website} onChange={handleChange} error={!!errors.website} helperText={errors.website} variant="standard" name='website' />
                        </div>
                        <div>
                            <TextField label="Ubicación" value={form.location} onChange={handleChange} error={!!errors.location} helperText={errors.location} variant="standard" name='location' />
                        </div>
                        <div>
                            <TextField label="Descripción" value={form.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} variant="standard" name='description' />
                        </div>
                    </Box>
                    <div className='flex items-center justify-center'>
                    <button type='submit' className="bg-secondary-light hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Crear cuenta
                    </button>
                </div>
                <div className='mt-4 text-center'>
                    <p className='text-gray-700 dark:text-white text-sm'>Al hacer click en Crear Cuenta, aceptas las <a href='#'>Condiciones de uso</a> y las <a href='#'>Políticas de privacidad</a> de Fusionajob.</p>
                </div>
            </form>
        </div>
    </div>

    <Footer />
    </>
    )
}