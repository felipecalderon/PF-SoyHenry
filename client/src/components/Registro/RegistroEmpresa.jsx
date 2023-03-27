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
        <div className='relative bg-primary-light dark:bg-secondary-dark'>

            <div className='bg-secondary-light dark:bg-primary-dark h-16'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[16rem] ml-[32rem]' />
                <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
                <Link to='/registro'><button className='absolute top-5 right-10 text-red-600 font-bold hover:text-xl transition-all'>Registrate como candidato</button></Link>
            </div>

            <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
                <h2 className='font-bold dark:text-text-dark'>¡Registrate como Recruiter y encuentra al mejor candidato!</h2>
            </div>

            <div className='flex absolute right-0 mr-[5rem]'>
                <img src={working2} alt='work1' className='w-[35rem] mt-[5rem]' />
            </div>


            <div className='flex relative w-[27.5rem] ml-[14rem] mt-[5rem] pt-[.5rem]'>

                <form className='relative' onSubmit={(event) => handleSubmit(event)}>

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

                    <div className='relative mt-[2rem] ml-[20rem] font-bold pb-[3rem]'>
                        <button type='submit' className="text-gray-900 border border-gray-800 hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-[1rem] py-[.5rem] dark:border-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-primary-dark dark:focus:ring-gray-800 disabled:opacity-50">Crear cuenta</button>
                    </div>

                </form>

            </div>

            <div className='absolute ml-[15rem] mt-[39rem] top-0'>
                <p className='dark:text-text-dark'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
            </div>

            <div className='bottom-0'>
                <Footer />
            </div>
        </div>
    )
}