import React, { useEffect, useState } from "react";
import validations from './validations';
import fblogo from '../../assets/facebook.png';
import gglogo from '../../assets/googlelogo.png';
import ghlogo from '../../assets/github.png';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';


export const ModalLogin = ({isOpen, setOpen}) => {


    const email = 'proyecto@henry.com';
    const contraseña = 'aprobado123'; // el login funciona como tal solamente con estos datos por el momento
    const navigate = useNavigate();
    const [access, setAccess] = useState(false);
    // const login = (form) => {
    //     if(form.email === email && form.contraseña === contraseña){
    //         setAccess(true);
    //         navigate('/cards');
    //     }
    // }

    useEffect(() => {
        !access && navigate('/')
    }, [access]);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password:''
    });

    const closeModal = () => {
        setOpen(false)
    };

    const handleForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: (event.target.value)
        });
        setErrors(validations({
            ...form,
            [event.target.name]: (event.target.value)
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('form enviado')
    };

    const handleModalContainerClick = (event) => event.stopPropagation(); //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null;
    return (
        <div className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-80 flex justify-center items-center' onClick={closeModal}>
            <article className='w-1/2 mx-auto relative'>
                <div className="rounded-3xl bg-primary-light" onClick={handleModalContainerClick}>
                <div className="absolute top-0 right-0 m-4 cursor-pointer text-2xl" onClick={closeModal}> x </div>
                <h3 className="text-center font-medium text-2xl py-4">Ingresar a Fusionajob</h3>
                    <form onSubmit={handleSubmit} className="px-8 py-6">
                        <div className='mb-4'>
                          <label htmlFor="email" className='block text-gray-700 font-medium mb-2'>Email:</label>
                          <input type='text' name='email' value={form.email} onChange={handleForm} className='border-2 rounded-lg w-full px-3 py-2 text-gray-700' id="email" />
                          {errors.email && <p className='text-red-500 mt-2' >{errors.email}</p>}
                        </div>
                        <div className='mb-4'>
                          <label htmlFor="password" className='block text-gray-700 font-medium mb-2'>Contraseña:</label>
                          <input type='password' name='password' value={form.password} onChange={handleForm} className='border-2 rounded-lg w-full px-3 py-2 text-gray-700' id="password" />
                          {errors.password && <p className='text-red-500 mt-2' >{errors.password}</p>}
                        </div>
                        <div className='flex flex-col w-auto pb-3'>
                            <button className='bg-primary-dark hover:text-lg transition-all text-white font-medium py-2 px-4 rounded-md my-2 duration-200'>Ingresar</button>
                            <button className='border-2 border-gray-400 hover:border-gray-500 text-gray-400 hover:text-gray-500 font-medium py-2 px-4 rounded-md my-2 transition duration-200'>Crear cuenta</button>
                        </div>
                        <div className='flex justify-center items-center text-sm'>
                          <button className='w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mr-4'>
                          <img src={gglogo} className='w-6 h-6 inline-block align-middle mr-2' alt='Google'/>Ingresar con Google
                          </button>
                          <button className='w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-4'>
                          <img src={fblogo} className='w-6 h-6 inline-block align-middle mr-2' alt='Facebook'/>Ingresar con Facebook
                          </button>
                          <button className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md'>
                          <img src={ghlogo} className='w-6 h-6 inline-block align-middle mr-2' alt='GitHub'/>Ingresar con GitHub
                          </button>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </article>
        </div>
    );
    
};