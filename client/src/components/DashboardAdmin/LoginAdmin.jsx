import React, { useState } from "react"
import { useNavigate } from "react-router"
import validations from "../ModalLogin/validations";
import axios from 'axios'

const LoginAdmin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
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
    event.preventDefault();
    const { email, password } = form
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      })
      const { data } = response
      await axios.post('/userPk', { id: data.id })
      .then(res=>{
        localStorage.setItem('userLogin', JSON.stringify(res.data))
      })
      if (data.user === 'Admin') return navigate('/dashboardadmin')
      navigate('/')
    } catch (error) {
      console.log(error)
        setError(error.response.data.message)
    }
  }
  return (
    <div className='z-50 fixed top-0 left-0 right-0 bottom-0 bg-primary-dark bg-opacity-80 flex justify-center items-center' >
      <article className='w-1/2 mx-auto relative'>
        <div className="rounded-3xl bg-primary-light dark:bg-primary-dark">
          <h2 className="pt-10 text-center text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Ingreso SuperAdmin</h2>
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
            </div>
          </form>
          <div>
          </div>
        </div>
      </article>
    </div >
  )
};

export default LoginAdmin