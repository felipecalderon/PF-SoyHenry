import React, { useState } from "react";
import validationsRegister from './validationsRegister';
import { Link, useNavigate } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working1 from '../../assets/working1.png';
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { postFetchNewUsers } from "../../redux/actions/postFetchNewUser";
import fbapp from "../../firebaseConfig"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
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
      name: "Registrarme como recruiter",
      link: "/companyregister"
    },
  ]
export const Registro = () => {
    const auth = getAuth(fbapp);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        documento: '',
        rol: 'Postulante',
        active: true
    });

    const [errors, setErrors] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        documento: ''
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorsNew = validationsRegister(form);
        console.log(form)
        setErrors(errorsNew);
        if (Object.keys(errorsNew).length === 0) {
            await axios.post('/auth/register', form)
            // signInWithEmailAndPassword(auth, form.email, form.password)
            const userdata = await axios.post(`/user/email`, { email: form.email })
            const objetoJSON = JSON.stringify(userdata.data)
            localStorage.setItem('userLogin', objetoJSON)
            alert("Gracias por unirte a FusionaJob! Por favor continúa completando tu perfíl");
            navigate('/profile');
        }
    };

    return (
        <>
        <NavLanding menu={menu}/>
        <div className='container mx-auto px-4 py-8 mt-14 bg-primary-light dark:bg-secondary-dark'>
            <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white'>¡Crea tu cuenta y encuentra ese empleo IT deseado!</h2>
            <div className='flex flex-col md:flex-row items-center justify-center mb-12'>
              <img src={working1} alt='work1' className='w-full md:w-3/5 lg:w-2/5 mb-8 md:mb-0' />
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
                            <TextField label="Documento" value={form.documento} onChange={handleChange} error={!!errors.documento} helperText={errors.documento} variant="standard" name='documento' />
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