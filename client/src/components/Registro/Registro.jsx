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

            <div className=' bg-slate-300 h-16'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[16rem] ml-[32rem]'/>
                <Link to='/'><button className='absolute top-4 left-14 w-auto h-auto bg-blue-300 rounded-[6px] border-black py-[.1rem] px-2'>← Home</button></Link>
                <Link to='/companyregister'><button className='absolute top-5 right-10 text-red-600 font-bold'>Registrate como empresa</button></Link>
            </div>

            <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
                <h2>¡Crea tu cuenta y encuentra ese empleo deseado!</h2>
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
                        <button disabled={( Object.keys(errors).length > 0)} type='submit' className='bg-blue-300 hover:bg-blue-400 w-32 h-8 rounded-lg border-black hover:text-yellow-200'>Crear cuenta</button>
                    </div>

                </form>

            </div>

            <div className='absolute ml-[15rem] mt-[30rem] top-0'>
                <p className='text-black'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
            </div>

            <div className='bottom-0'>
                <Footer/>
            </div>
        </div>
    )
}