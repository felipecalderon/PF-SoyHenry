import React, { useState } from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working2 from '../../assets/working2.png';
import Footer from "../Footer/Footer";
import validationsRegister from "./validationsRegister";

export const RegistroEmpresa = () => {

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        nombreEmpresa: '',
        cuit: '',
        documento: ''
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        nombreEmpresa: '',
        cuit: '',
        documento: ''
    });

    const handleNombre = (event) => {
        setForm({
            ...form,
            nombre: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            nombre: (event.target.value)
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
            contraseña: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            contraseña: (event.target.value)
        }));
    };

    const handleNombreEmpresa = (event) => {
        setForm({
            ...form,
            nombreEmpresa: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            nombreEmpresa: (event.target.value)
        }));
    };

    const handleCuit = (event) => {
        setForm({
            ...form,
            cuit: (event.target.value)
        });
        setErrors(validationsRegister({
            ...form,
            cuit: (event.target.value)
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

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     login(form);
    // };

    return (
        <div className='relative bg-yellow-100'>

        <div className=' bg-slate-300 h-16'>
            <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[16rem] ml-[32rem]'/>
            <Link to='/'><button className='absolute top-4 left-14 w-auto h-auto bg-blue-300 rounded-[6px] border-black py-[.1rem] px-2'>← Home</button></Link>
            <Link to='/registro'><button className='absolute top-5 right-10 text-red-600 font-bold'>Registrate como candidato</button></Link>
        </div>

        <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
            <h2>¡Registra tu empresa y encuentra al mejor candidato!</h2>
        </div>

        <div className='flex absolute right-0 mr-[5rem]'>
            <img src={working2} alt='work1' className='w-[35rem] mt-[1rem]'/>
        </div>


        <div className='flex relative w-[27.5rem] ml-[14rem] mt-[5rem] pt-[.5rem]'>

            <form className='relative'>

                <div className='relative ml-[1.5rem]'>
                    <label>Nombre:</label>
                </div>
                <div className='relative ml-[1rem] mb-[2rem]'>
                    <input type='text' name='nombre' value={form.nombre} onChange={handleNombre} className='border-2 rounded-2xl px-2'></input>
                    {errors.nombre && <p className='absolute mt-15 text-red-500' >{errors.nombre}</p>}
                </div>

                <div className='relative ml-[1.5rem]'>
                    <label>Email:</label>
                </div>
                <div className='relative ml-[1rem] mb-[2rem]'>
                    <input type='text' name='email' value={form.email} onChange={handleEmail} className='border-2 rounded-2xl px-2'></input>
                    {errors.email && <p className='absolute mt-15 text-red-500' >{errors.email}</p>}
                </div>

                <div className='relative ml-[1.5rem]'>
                    <label>Nombre de la empresa:</label>
                </div>
                <div className='relative ml-[1rem] mb-[2rem]'>
                    <input type='text' name='nombreEmpresa' value={form.nombreEmpresa} onChange={handleNombreEmpresa} className='border-2 rounded-2xl px-2'></input>
                    {errors.nombreEmpresa && <p className='absolute mt-15 text-red-500' >{errors.nombreEmpresa}</p>}
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
                    <input type='password' name='contraseña' value={form.contraseña} onChange={handleContraseña} className='border-2 rounded-2xl px-2'></input>
                    {errors.contraseña && <p className='absolute mt-15 text-red-500' >{errors.contraseña}</p>}
                </div>

                <div className='absolute ml-[15.5rem] mt-[10.5rem] top-0'>
                    <label>CUIT:</label>
                </div>
                <div className='absolute ml-[15rem] mt-[12rem] top-0'>
                    <input type='text' name='cuit' value={form.cuit} onChange={handleCuit} className='border-2 rounded-2xl px-2'></input>
                    {errors.cuit && <p className='absolute mt-15 text-red-500' >{errors.cuit}</p>}
                </div>

                <div className='relative ml-[1.5rem]'>
                    <label>Documento:</label>
                </div>
                <div className='relative ml-[1rem] mb-[1rem]'>
                    <input type='text' pattern="^[0-9]\d*$" name='documento' value={form.documento} onChange={handleDocumento} className='border-2 rounded-2xl px-2'></input>
                    {errors.documento && <p className='absolute mt-15 text-red-500' >{errors.documento}</p>}
                </div>

                <div className='relative mt-[6rem] ml-[20rem] font-bold pb-[3rem]'>
                    <button type='submit' className='bg-blue-300 hover:bg-blue-400 w-32 h-8 rounded-lg border-black hover:text-yellow-200' disabled = {( Object.keys(errors).length !== 0)}>Crear cuenta</button>
                </div>

            </form>

        </div>

        <div className='absolute ml-[15rem] mt-[35rem] top-0'>
            <p className='text-black'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
        </div>

        <div className='bottom-0'>
            <Footer/>
        </div>
    </div>
    )
}