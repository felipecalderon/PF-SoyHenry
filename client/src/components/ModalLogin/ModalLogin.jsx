import React, { useEffect, useState } from "react";
import validations from './validations';
import facebook from '../../assets/facebook.png';
import googlelogo from '../../assets/googlelogo.png';
import github from '../../assets/github.png';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';


export const ModalLogin = ({isOpen, setOpen}) => {


    const email = 'proyecto@henry.com';
    const contraseña = 'aprobado123';
    const navigate = useNavigate();
    const [access, setAccess] = useState(false);
    const login = (form) => {
        if(form.email === email && form.contraseña === contraseña){
            setAccess(true);
            navigate('/cards');
        }
    }

    useEffect(() => {
        !access && navigate('/')
    }, [access]);

    const [form, setForm] = useState({
        email: '',
        contraseña: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        contraseña:''
    });

    const closeModal = () => {
        setOpen(false)
    };

    const handleEmail = (event) => {
        setForm({
            ...form,
            email: (event.target.value)
        });
        setErrors(validations({
            ...form,
            email: (event.target.value)
        }));
    };

    const handleContraseña = (event) => {
        setForm({
            ...form,
            contraseña: (event.target.value)
        })
        validations({
            ...form,
            contraseña: (event.target.value)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(form);
    };

    const handleModalContainerClick = (event) => event.stopPropagation(); //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null;
    return (
        <div className='relative mt-5'>
            <article className='ml-[15rem]' onClick={closeModal}>
                <div className="bg-yellow-200 w-[28rem] h-[26rem] rounded-3xl" onClick={handleModalContainerClick}>
                        <h3 className="text-center font-medium text-2xl py-0 mb-6 mt-2 drop-shadow-md">Ingresar a Fusionajob</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center items-center'>
                            <label htmlFor="email" className='absolute mr-64'>Email:</label>
                            <input type='text' name='email' value={form.email} onChange={handleEmail} className='absolute mb-2 mt-20 border-8 rounded-2xl w-80 h-12'></input>
                            {errors.email && <p className='absolute mt-36 text-red-700' >{errors.email}</p>}
                        </div>
                        <div className='flex justify-center items-center'>
                            <label htmlFor="contraseña" className='absolute mt-52 mr-56'>Contraseña:</label>
                            <input type='password' name='contraseña' value={form.contraseña} onChange={handleContraseña} className='absolute mb-2 mt-72 border-8 rounded-2xl w-80 h-12'></input>
                            {errors.contraseña && <p className='absolute text-red-700 mt-[22rem]' >{errors.contraseña}</p>}
                        </div>
                        <div className='flex ml-14'>
                            <Link to='/'><button className='absolute w-8 mt-80 mx-6 ml-[4rem]'><img src={facebook} alt='flogo'/></button></Link>
                            <Link to='/'><button className='absolute w-8 mt-80 mx-6 ml-[9.5rem]'><img src={googlelogo} alt='glogo'/></button></Link>
                            <Link to='/'><button className='absolute w-8 mt-80 mx-6 ml-[15rem]'><img src={github} alt='ghlogo'/></button></Link>
                        </div>
                        <div className='flex flex-col w-auto'>
                            <button className='hover:text-yellow-200 font-medium mx-auto w-auto py-2 mt-[16rem]'>Ingresar</button>
                            <Link to='/'><button className='hover:text-gray-400 font-medium text-sm ml-[11rem] w-auto'>No tengo cuenta</button></Link>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </article>
        </div>
    );
    
};