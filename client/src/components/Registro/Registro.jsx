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
        <div className='relative bg-primary-light dark:bg-secondary-dark'>

            <div className='bg-secondary-light dark:bg-primary-dark h-16'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[16rem] ml-[32rem]' />
                <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
                <Link to='/companyregister'><button className='absolute top-5 right-10 text-red-600 font-bold hover:text-xl transition-all'>Registrate como recruiter</button></Link>
            </div>

            <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
                <h2 className='font-bold dark:text-text-dark'>¡Crea tu cuenta y encuentra ese empleo IT deseado!</h2>
            </div>

            <div className='flex absolute right-0 mr-[5rem]'>
                <img src={working1} alt='work1' className='w-[35rem] mt-[1rem]' />
            </div>


            <div className='flex relative w-[27.5rem] ml-[14rem] mt-[5rem] pt-[.5rem]'>

                <form className='relative' onSubmit={(event) => handleSubmit(event)}>

                    <div className='relative ml-[1.5rem]'>
                        <label className='dark:text-text-dark'>Nombres:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' name='username' value={form.username} onChange={handleChange} className='border-2 rounded-2xl px-2'></input>
                        {errors.username && <p className='absolute text-red-500' >{errors.username}</p>}
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label className='dark:text-text-dark'>Email:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' name='email' value={form.email} onChange={handleChange} className='border-2 rounded-2xl px-2'></input>
                        {errors.email && <p className='absolute mt-15 text-red-500' >{errors.email}</p>}
                    </div>

                    <div className='absolute ml-[15.5rem] top-0'>
                        <label className='dark:text-text-dark'>Apellidos:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[1.5rem] top-0'>
                        <input type='text' name='lastnames' value={form.lastnames} onChange={handleChange} className='border-2 rounded-2xl px-2'></input>
                        {errors.lastnames && <p className='absolute mt-15 text-red-500' >{errors.lastnames}</p>}
                    </div>

                    <div className='absolute ml-[15.5rem] mt-[5.2rem] top-0'>
                        <label className='dark:text-text-dark'>Contraseña:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[6.8rem] top-0'>
                        <input type='password' name='password' value={form.password} onChange={handleChange} className='border-2 rounded-2xl px-2'></input>
                        {errors.password && <p className='absolute mt-15 text-red-500' >{errors.password}</p>}
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label className='dark:text-text-dark'>Documento:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[1rem]'>
                        <input type='text' pattern="^[0-9]\d*$" name='documento' value={form.documento} onChange={handleChange} className='border-2 rounded-2xl px-2'></input>
                        {errors.documento && <p className='absolute mt-15 text-red-500' >{errors.documento}</p>}
                    </div>

                    <div className='relative mt-[6rem] ml-[20rem] font-bold pb-[3rem]'>
                        <button type='submit' className="text-gray-900 border border-gray-800 hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-[1rem] py-[.5rem] dark:border-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-primary-dark dark:focus:ring-gray-800 disabled:opacity-50">Crear cuenta</button>
                    </div>

                </form>

            </div>

            <div className='absolute ml-[15rem] mt-[31rem] top-0'>
                <p className='text-black dark:text-text-dark'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
            </div>

            <div className='bottom-0'>
                <Footer />
            </div>
        </div>
    )
}