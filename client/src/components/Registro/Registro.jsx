import React, { useState } from "react";
import validationsRegister from './validationsRegister';
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working1 from '../../assets/working1.png';
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { postFetchNewUsers } from "../../redux/actions/postFetchNewUser";

export const Registro = () => {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: '',
        apellido: '',
        email: '',
        password: '',
        documento: '',
        rol: 'Postulante'
    });

    const [errors, setErrors] = useState({
        username: '',
        apellido: '',
        email: '',
        password: '',
        documento: ''
    });

    const handleNombre = (event) => {
        setForm({
            ...form,
            username: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            username: (event.target.value)
        }));
    };

    const handleApellido = (event) => {
        setForm({
            ...form,
            apellido: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            apellido: (event.target.value)
        }));
    };

    const handleEmail = (event) => {
        setForm({
            ...form,
            email: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            email: (event.target.value)
        }));
    };

    const handleContraseña = (event) => {
        setForm({
            ...form,
            password: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            password: (event.target.value)
        }));
    };
    
    const handleDocumento = (event) => {
        setForm({
            ...form,
            documento: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            documento: (event.target.value)
        }));
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postFetchNewUsers(form))
        alert('Usuario registrado');
    };

    return (
        <div className='relative bg-yellow-100'>

            <div className='bg-secondary-dark dark:bg-primary-dark h-16'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[16rem] ml-[32rem]'/>
                <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
                <Link to='/companyregister'><button className='absolute top-5 right-10 text-red-600 font-bold hover:text-xl transition-all'>Registrate como empresa</button></Link>
            </div>

            <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
                <h2 className='font-bold'>¡Crea tu cuenta y encuentra ese empleo IT deseado!</h2>
            </div>

            <div className='flex absolute right-0 mr-[5rem]'>
                <img src={working1} alt='work1' className='w-[35rem] mt-[1rem]'/>
            </div>


            <div className='flex relative w-[27.5rem] ml-[14rem] mt-[5rem] pt-[.5rem]'>

                <form className='relative' onSubmit={(event) => handleSubmit(event)}>

                    <div className='relative ml-[1.5rem]'>
                        <label>Nombre:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' name='username' value={form.username} onChange={handleNombre} className='border-2 rounded-2xl px-2'></input>
                        {errors.username && <p className='absolute text-red-500' >{errors.username}</p>}
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label>Email:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' name='email' value={form.email} onChange={handleEmail} className='border-2 rounded-2xl px-2'></input>
                        {errors.email && <p className='absolute mt-15 text-red-500' >{errors.email}</p>}
                    </div>

                    <div className='absolute ml-[15.5rem] top-0'>
                        <label>Apellido:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[1.5rem] top-0'>
                        <input type='text' name='apellido' value={form.apellido} onChange={handleApellido} className='border-2 rounded-2xl px-2'></input>
                        {errors.apellido && <p className='absolute mt-15 text-red-500' >{errors.apellido}</p>}
                    </div>

                    <div className='absolute ml-[15.5rem] mt-[5.2rem] top-0'>
                        <label>Contraseña:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[6.8rem] top-0'>
                        <input type='password' name='password' value={form.password} onChange={handleContraseña} className='border-2 rounded-2xl px-2'></input>
                        {errors.password && <p className='absolute mt-15 text-red-500' >{errors.password}</p>}
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label>Documento:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[1rem]'>
                        <input type='text' pattern="^[0-9]\d*$" name='documento' value={form.documento} onChange={handleDocumento} className='border-2 rounded-2xl px-2'></input>
                        {errors.documento && <p className='absolute mt-15 text-red-500' >{errors.documento}</p>}
                    </div>

                    <div className='relative mt-[6rem] ml-[20rem] font-bold pb-[3rem]'>
                        <button disabled={( Object.keys(errors).length > 0)} type='submit' className='w-32 h-8 disabled:opacity-50 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Crear cuenta</button>
                    </div>

                </form>

            </div>

            <div className='absolute ml-[15rem] mt-[31rem] top-0'>
                <p className='text-black'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
            </div>

            <div className='bottom-0'>
                <Footer/>
            </div>
        </div>
    )
}