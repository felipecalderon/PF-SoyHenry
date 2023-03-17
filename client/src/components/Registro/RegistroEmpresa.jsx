import React from "react";
import { Link } from "react-router-dom";
import logofusionajob from '../../assets/logofusionajob.png';
import working1 from '../../assets/working1.png';
import Footer from "../Footer/Footer";

export const RegistroEmpresa = () => {
    return (
        <div className='bg-yellow-100'>
            <div className=' bg-slate-300'>
                <img src={logofusionajob} alt='Fusionalogo' className='flex relative w-[11rem] ml-[35rem]'/>
                <Link to='/'><button className='absolute top-2 left-5 w-auto h-auto bg-blue-300 rounded-[6px] border-black py-[.1rem] px-2'>Volver</button></Link>
                <Link to='/registro'><button className='absolute top-2 right-5 text-red-600 font-bold'>Registrate como postulante</button></Link>
            </div>
            <div className='flex absolute right-0 mr-[5rem]'>
                <img src={working1} alt='work1' className='w-[25rem]'/>
            </div>
            <h2>Creá tu cuenta y encontrá al mejor postulante!</h2>
            <form>
                <label>Nombre de la empresa:</label>
                <input></input>

                <label>Razón social o CUIT:</label>
                <input></input>

                <label>Email:</label>
                <input></input>

                <label>Contraseña:</label>
                <input></input>

                {/* <label>Documento:</label>
                <input></input> */}
            </form>
            <p className='text-black'>Al hacer click en Crear Cuenta, acepto las Condiciones de uso y las Políticas de privacidad de Fusionajob.</p>
            <div className='bottom-0'>
                <Footer/>
            </div>
        </div>
    )
}