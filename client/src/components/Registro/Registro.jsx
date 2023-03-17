import React from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working1 from '../../assets/working1.png';
import Footer from "../Footer/Footer";

export const Registro = () => {
    return (
        <div className='relative bg-yellow-100'>

            <div className=' bg-slate-300'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[11rem] ml-[35rem]'/>
                <Link to='/'><button className='absolute top-2 left-5 w-auto h-auto bg-blue-300 rounded-[6px] border-black py-[.1rem] px-2'>Volver</button></Link>
                <Link to='/companyregister'><button className='absolute top-2 right-5 text-red-600 font-bold'>Registrate como empresa</button></Link>
            </div>

            <div className='flex relative justify-center mt-[2rem] mb-[2rem] text-4xl'>
                <h2>Crea tu cuenta y encuentra ese empleo deseado!</h2>
            </div>

            <div className='flex absolute right-0 mr-[5rem]'>
                <img src={working1} alt='work1' className='w-[35rem] mt-[1rem]'/>
            </div>


            <div className='flex relative w-[27.5rem] ml-[14rem] mt-[5rem] pt-[.5rem]'>

                <form className='relative'>

                    <div className='relative ml-[1.5rem]'>
                        <label>Nombre:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' className='border-8 rounded-2xl px-2'></input>
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label>Email:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[2rem]'>
                        <input type='text' className='border-8 rounded-2xl px-2'></input>
                    </div>

                    <div className='absolute ml-[15.5rem] top-0'>
                        <label>Apellido:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[1.5rem] top-0'>
                        <input type='text' className='border-8 rounded-2xl px-2'></input>
                    </div>

                    <div className='absolute ml-[15.5rem] mt-[6rem] top-0'>
                        <label>Contraseña:</label>
                    </div>
                    <div className='absolute ml-[15rem] mt-[7.5rem] top-0'>
                        <input type='password' className='border-8 rounded-2xl px-2'></input>
                    </div>

                    <div className='relative ml-[1.5rem]'>
                        <label>Documento:</label>
                    </div>
                    <div className='relative ml-[1rem] mb-[1rem]'>
                        <input type='text' pattern="^[0-9]\d*$" className='border-8 rounded-2xl px-2'></input>
                    </div>

                    <div className='relative mt-[6rem] ml-[20rem] font-bold pb-[3rem]'>
                        <button className='bg-blue-300 hover:bg-blue-400 w-32 h-8 rounded-lg border-black hover:text-yellow-200'>Crear cuenta</button>
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