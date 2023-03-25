import React, { useState } from "react"
import { useDispatch } from "react-redux"
import validations from './validations'
import fblogo from '../../assets/fbwhite.png'
import gglogo from '../../assets/ggwhite.png'
import ghlogo from '../../assets/ghwhite.png'
import { useNavigate } from "react-router"
import fbapp from "../../firebaseConfig"
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { saveUser } from '../../redux/slices/userRegisterSlice'

export const ModalLogin = ({ isOpen, setOpen }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const auth = getAuth(fbapp)

    const authWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const usergoogle = {
                photo: result.user.photoURL,
                email: result.user.email,
                name: result.user.displayName,
            }
            const objetoJSON = JSON.stringify(usergoogle) 
            localStorage.setItem('usergoogle', objetoJSON) 
            return usergoogle
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
      } 
      
    const handleLogin = async () => {
        try {
            const {email} = await authWithGoogle()
            const verifyUsrExist = await axios.post(`/user/email`, {email})

            if(!verifyUsrExist.data) {
                alert("Gracias por unirte a FusionaJob! Por favor continúa completando tu perfíl")
                return navigate('/profile')
            }
            dispatch(saveUser(verifyUsrExist.data))
            localStorage.setItem('userLogin', JSON.stringify(verifyUsrExist.data))
            if (verifyUsrExist.data.rol === 'Empresa') navigate('/dashboardempresa')
            if (verifyUsrExist.data.rol === 'Postulante') navigate('/offers')
          } catch (error) {
            console.log(error)
            setError(error.response.data.message)
            alert("Hubo un error en el acceso, intente nuevamente")
          }
        }

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const closeModal = () => {
        setOpen(false)
    }

    const handleForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: (event.target.value)
        })
        setErrors(validations({
            ...form,
            [event.target.name]: (event.target.value)
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = form
        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            })
            const { data } = response
            if (data.user === 'Empresa') navigate('/dashboardempresa')
            if (data.user === 'Postulante') navigate('/offers')
            const responseUserPk = await axios.post('/userPk', { id: data.id })
            dispatch(saveUser(responseUserPk.data))
            const objetoJSON = JSON.stringify(responseUserPk.data)
            localStorage.setItem('userLogin', objetoJSON)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    const handleModalContainerClick = (event) => event.stopPropagation() //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if (!isOpen) return null
    return (
        <div className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center' onClick={closeModal}>
            <article className='w-1/2 mx-auto relative'>
                <div className="rounded-3xl bg-primary-light dark:bg-primary-dark" onClick={handleModalContainerClick}>
                    <div className="absolute top-0 right-0 m-4 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={closeModal}> x </div>
                    <h2 className="pt-10 text-center text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Ingresar a Fusionajob</h2>
                    {error && <h3 className="text-center text-white font-medium w-1/2 rounded-lg mx-auto bg-red-700">{error}</h3>}
                    <form onSubmit={handleSubmit} className="px-8 py-6">
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 dark:text-white font-medium mb-2'>Email:</label>
                            <input type='text' name='email' value={form.email} onChange={handleForm} className='border-2 rounded-lg w-full px-3 py-2 text-gray-700' id="email" />
                            {errors.email && <p className='text-red-500 mt-2' >{errors.email}</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 dark:text-white font-medium mb-2'>Contraseña:</label>
                            <input type='password' name='password' value={form.password} onChange={handleForm} className='border-2 rounded-lg w-full px-3 py-2 text-gray-700' id="password" />
                            {errors.password && <p className='text-red-500 mt-2' >{errors.password}</p>}
                        </div>

                        <div className='flex flex-col w-auto pb-3'>
                            <button type="submit" className='bg-primary-dark dark:bg-secondary-light hover:text-lg transition-all text-white dark:text-gray-800 font-medium py-2 px-4 rounded-md my-2 duration-200'>Ingresar</button>
                            <button className='border-2 border-gray-400 hover:border-gray-500 text-gray-400 hover:text-gray-500 font-medium py-2 px-4 rounded-md my-2 transition duration-200'>Crear cuenta</button>
                        </div>
                        <div className='flex justify-center items-center text-sm'>
                            <button onClick={handleLogin} className='w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mr-4'>
                                <img src={gglogo} className='w-6 h-6 inline-block align-middle mr-2' alt='Google' />Ingresar con Google
                            </button>
                            <button className='w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md mr-4'>
                                <img src={fblogo} className='w-6 h-6 inline-block align-middle mr-2' alt='Facebook' />Ingresar con Facebook
                            </button>
                            <button className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md'>
                                <img src={ghlogo} className='w-6 h-6 inline-block align-middle mr-2' alt='GitHub' />Ingresar con GitHub
                            </button>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </article>
        </div>
    )

}