import React from 'react'
import work1 from "../../assets/working1.png"
import work2 from "../../assets/working2.png"
import Maria from "../../assets/Maria.png"
import Footer from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { NavLanding } from '../NavLanding/NavLanding'

export const menu = [
  {
    name: "Planes",
    link: "#"
  },
  {
    name: "Sobre Nosotros",
    link: "/about"
  },
  {
    name: "Registro",
    link: "/registro"
  },
]

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <NavLanding menu={menu} />
      <section className="pt-20 pb-10 w-full flex flex-row flex-wrap bg-primary-light dark:bg-secondary-dark">
        <div className="w-full sm:w-1/2">
          <img src={work1} alt="img_working" className="p-10" />
        </div>
        <div className="w-full sm:w-1/2 text-center sm:text-left flex flex-col justify-center">
          <h2 className="mb-4 text-2x pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Encuentra tu trabajo ideal aquí</h2>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl pr-10 dark:text-gray-400">Únete ahora a nuestra plataforma y comienza a encontrar oportunidades de trabajo que se ajusten a tu perfil y habilidades.</p>
          <button onClick={() => navigate("/registro")} type="button" className="w-full sm:w-1/3 text-gray-900 border border-gray-800 hover:bg-secondary-light focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-primary-dark dark:focus:ring-gray-800">Comienza Ahora</button>
        </div>
      </section>

      <section className="py-10 w-full flex flex-row flex-wrap bg-secondary-light dark:bg-primary-dark">
        <div className="w-full sm:w-1/2 text-center sm:text-left flex flex-col justify-center">
          <ul className="w-full p-6 md:p-10 text-center md:text-right text-sm font-medium text-gray-900 border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <h3 className="mb-4 text-xl md:pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Ahorra tiempo y esfuerzo</h3>
              <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl pr-10 dark:text-gray-400">Publica o busca trabajos en minutos.</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <h3 className="mb-4 text-xl md:pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Amplía tu alcance</h3>
              <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl pr-10 dark:text-gray-400">Encuentra trabajos que se ajusten a tus necesidades y habilidades.</p>
            </li>
            <li className="w-full px-4 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
              <h3 className="mb-4 text-xl md:pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Mejora tus posibilidades</h3>
              <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl pr-10 dark:text-gray-400">Aumenta tus opciones entre una amplia variedad de trabajos.</p>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 ">
          <img src={work2} alt="img_working" className=" h-full w-full object-contain" />
        </div>
      </section>

      <section className="py-10 w-full flex flex-col flex-wrap bg-primary-light dark:bg-secondary-dark">
        <h2 className="pt-3 text-center mb-4 text-2x pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">FusionaJob</h2>
        <p className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl pr-10 dark:text-gray-400">La solución completa para encontrar trabajo o candidatos</p>
        <div className="w-full flex flex-row flex-wrap justify-evenly bg-primary-light dark:bg-secondary-dark">
          <div className="w-1/3 bg-secondary-light border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            <div className="h-full p-5 flex flex-col flex-wrap items-center align-middle justify-center text-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Empresa</h5>
              <ul className="w-full p-3 text-center text-sm font-medium text-gray-900 border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
                <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">Permite a los empleadores y candidatos interactuar y coordinar entrevistas y otros detalles.</p>
                </li>
                <li className="w-full px-4 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                  <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">Ayuda a los empleadores a encontrar al candidato adecuado.</p>
                </li>
              </ul>
              <button onClick={() => navigate("/companyregister")} type="button" className="w-full sm:w-1/2 text-gray-900 border border-gray-800 hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-primary-dark dark:focus:ring-gray-800">Registrate como Empresa</button>
            </div>
          </div>
          <div className="w-1/3 bg-secondary-light border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            <div className="h-full p-5 flex flex-col flex-wrap items-center align-middle justify-center text-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Candidato</h5>
              <ul className="w-full p-3 text-center text-sm font-medium text-gray-900 border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
                <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">Simplifica el proceso de búsqueda de trabajo.</p>
                </li>
                <li className="w-full px-4 py-2 border-gray-200 rounded-t-lg dark:border-gray-600">
                  <p className="mb-6 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">Permitirles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente.</p>
                </li>
              </ul>
              <button onClick={() => navigate("/registro")} type="button" className="w-full sm:w-1/2 text-gray-900 border border-gray-800 hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-primary-dark dark:focus:ring-gray-800">Registrate como Candidato</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 w-full flex flex-col flex-wrap bg-secondary-light dark:bg-primary-dark">
        <h2 className="pt-3 text-center mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Testimonios</h2>
        <figure className="max-w-screen-md mx-auto text-center">
          <svg aria-hidden="true" className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-gray-900 dark:text-white">"Nunca había sido tan fácil encontrar trabajo hasta que encontré Fusionajob. ¡Gracias por hacerlo posible!."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img className="w-10 h-10 rounded-full object-cover" src={Maria} alt="testimonio" />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-gray-900 dark:text-white">María Mercedes</cite>
              <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">CEO en Rappi</cite>
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="py-10 w-full flex flex-col flex-wrap bg-primary-light dark:bg-secondary-dark">
        <h2 className="pt-3 text-center mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Suscríbete!</h2>
        <div className='flex flex-grow flex-col items-center md:flex-row justify-center gap-6'>
          <div className=" flex flex-col w-full content-center max-w-sm p-4 bg-secondary-light rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-400">Plan Básico</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">Free</span>
            </div>
            <ul className="space-y-5 my-7">
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Filtrado simple</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Empleos de database externa</span>
              </li>
              <li className="flex space-x-3 line-through decoration-gray-500">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500">Empleos de database interna</span>
              </li>
              <li className="flex space-x-3 line-through decoration-gray-500">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500">Filtrado avanzado</span>
              </li>
              <li className="flex space-x-3 line-through decoration-gray-500">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500">Guardar Ofertas ilimitas</span>
              </li>
              <li className="flex space-x-3 line-through decoration-gray-500">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500">Poder ver el estado de todas las ofertas a la que aplicaste</span>
              </li>
            </ul>
            <Link to= "/registro" >
            <button type="button" className="text-gray-800 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Registrate Ahora</button>
            </Link>
          </div>
          <div className="w-full content-center max-w-sm p-4 bg-secondary-light rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 items-center text-xl font-medium text-gray-800 dark:text-gray-400">Plan Premium</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">15</span>
              <span className="ml-1 text-xl font-normal text-gray-800 dark:text-gray-400">/mes</span>
            </div>
            <ul className="space-y-5 my-7">
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Filtrado simple</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Empleos de database externa</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Empleos de database interna</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Filtro Avanzado</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Guardar Ofertas ilimitas</span>
              </li>
              <li className="flex space-x-3">
                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-50 dark:bg-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Poder ver el estaado de todas las ofertas a la que aplicaste</span>
              </li>
            </ul>
            <button type="button" className="text-gray-800 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Elegir cuenta premium</button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default LandingPage