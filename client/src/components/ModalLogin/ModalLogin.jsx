import React, { useEffect, useState } from "react"
import validations from './validations'
import facebook from '../../assets/facebook.png'
import googlelogo from '../../assets/googlelogo.png'
import github from '../../assets/github.png'
import { useNavigate } from "react-router"


export const ModalLogin = ({isOpen, setOpen}) => {


    const email = 'proyecto@henry.com';
    const contraseña = 'aprobado123';
    const navigate = useNavigate()
    const [access, setAccess] = useState(false);
    const login = (form) => {
        if(form.email === email && form.contraseña === contraseña){
            setAccess(true);
            navigate('/cards')
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
    })

    const closeModal = () => {
        setOpen(false)
    };

    const handleEmail = (event) => {
        setForm({
            ...form,
            email: (event.target.value)
        })
        setErrors(validations({
            ...form,
            email: (event.target.value)
        }))
    }

    const handleContraseña = (event) => {
        setForm({
            ...form,
            contraseña: (event.target.value)
        })
        setErrors( validations({
            ...form,
            contraseña: (event.target.value)
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(form);
    }

    const handleModalContainerClick = (event) => event.stopPropagation() //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null
    return (
        <div className='relative mt-5'>
            <article className='flex justify-center' onClick={closeModal}>
                <div className="bg-yellow-200 w-96 h-auto rounded-3xl" onClick={handleModalContainerClick}>
                        <h3 className="text-center font-medium text-2xl px-4 py-0 mb-2 mt-2 drop-shadow-md">Ingresar a Fusionajob</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-center items-center'>
                            <input type='text' name='email' value={form.email} placeholder="Email:" onChange={handleEmail} className='mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                            {errors.email && <p className='text-red-700' >{errors.email}</p>}
                        </div>
                        <div className='flex justify-center items-center'>
                            <input type='password' name='contraseña' value={form.contraseña} placeholder="Contraseña:" onChange={handleContraseña} className='mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                            {errors.contraseña && <p className='text-red-700' >{errors.contraseña}</p>}
                        </div>
                        <div className='flex ml-14'>
                            <button className='w-8 pt-32 mx-6'><img src={facebook} alt='flogo'/></button>
                            <button className='w-8 pt-32 mx-6'><img src={googlelogo} alt='glogo'/></button>
                            <button className='w-8 pt-32 mx-6 h-auto'><img src={github} alt='ghlogo'/></button>
                        </div>
                        <div className='flex flex-col w-auto'>
                            <button className='hover:text-yellow-200 font-medium mx-auto w-full py-2 bg-indigo-600'>Ingresar</button>
                            <button className='hover:text-gray-400 font-medium text-sm mx-auto w-full py-2 bg-lime-900'>No tengo cuenta</button>
                        </div>
                    </form>
                </div>
            </article>
        </div>
    )
}