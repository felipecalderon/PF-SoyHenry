import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Felipedev from '../../assets/Felipedev.jpeg';
import Francodev from '../../assets/Francodev.jpg';
import Lisidev from '../../assets/Lisidev.jpeg';
import Williamdev from '../../assets/Williamdev.jpeg';
import Leandrodev from '../../assets/Leandrodev.jpg';
import Santiagodev from '../../assets/Santiagodev.jpg';
import Ericdev from '../../assets/Ericdev.jpeg';
import { NavLanding } from "../NavLanding/NavLanding";

export const About = () => {

    return (
    <>
        <NavLanding />
        <div className='bg-primary-light dark:bg-primary-dark'>
            <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
            <div>
                <div className=''>
                    <h2 className='flex relative justify-center mt-[2rem] mb-[2rem] text-2xl font-bold dark:text-text-dark'>Sobre nosotros</h2>
                    <div>
                    <p className='m-[1rem] p-[2rem] text-lg rounded-3xl bg-overlay-light dark:text-text-dark dark:bg-secondary-dark'>¡Bienvenidos a FusionaJob!{<br/>}Somos un equipo de desarrolladores apasionados por la creación de soluciones tecnológicas innovadoras para la búsqueda y posteo de trabajos IT en línea.{<br/>}{<br/>}
                    En Fusionajob, nos enorgullece haber creado una plataforma que permite a los empleadores y candidatos interactuar, coordinar entrevistas entre otros detalles, y que ayuda a los empleadores a encontrar al candidato adecuado. Además, nuestro sitio web simplifica el proceso de búsqueda de trabajo para los candidatos, permitiéndoles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente.{<br/>}{<br/>}
                    Estamos comprometidos con la excelencia en la experiencia del usuario y en brindar un servicio de alta calidad. Estamos emocionados de tener la oportunidad de ayudar a las personas a encontrar trabajo y a los empleadores a encontrar el talento adecuado. ¡Gracias por elegir Fusionajob!</p>
                    </div>
                </div>
                <div className='flex relative justify-center mt-[2rem] mb-[1rem]'>
                    <h2 className='font-bold text-2xl dark:text-text-dark'>Equipo de desarrollo:</h2>
                </div>

                {/* Felipe */}
                <div className='flex ml-[2rem]'>
                    <img src={Felipedev} alt='feli' className='absolute w-[13rem] h-[13rem] rounded-full ml-[34rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pt-[1.5rem] rounded-r-full pr-[20rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Felipe Calderón Espinoza{<br/>}(31 años, Temuco, Chile) es un diseñador de páginas WordPress con experiencia previa en trabajo freelance. Actualmente trabaja en el área de Front.</p>
                </div>

                {/* Leandro */}
                <div className='flex ml-[33rem]'>
                    <img src={Leandrodev} al='lean' className='absolute w-[13rem] h-[13rem] rounded-full ml-[2rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pr-[1.5rem] pt-[.4rem] rounded-l-full pl-[15.5rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Leandro Carrizo{<br/>}(38 años, Rosario, Santa Fe, Argentina) trabajó en la industria de la gastronomía antes de retomar sus estudios. Actualmente estudia una tecnicatura universitaria en IA y trabaja en colaboración tanto en el área de Front como de Back.</p>
                </div>

                {/* Lisi */}
                <div className='flex ml-[2rem]'>
                <img src={Lisidev} alt='lisi' className='absolute w-[13rem] h-[13rem] rounded-full ml-[34rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pt-[2rem] rounded-r-full pr-[20rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Lisi Daniela Gonzalez{<br/>}(22 años, Córdoba, Argentina) es estudiante de Licenciatura en Relaciones Internacionales y trabaja en el área de Front.</p>
                </div>

                {/* William */}
                <div className='flex ml-[33rem]'>
                <img src={Williamdev} al='alex' className='absolute w-[13rem] h-[13rem] rounded-full ml-[2rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pr-[1.5rem] pt-[1.5rem] rounded-l-full pl-[20rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>William Henao{<br/>}(23 años, Colombia) trabajó como auxiliar de mantenimiento eléctrico industrial antes de decidir estudiar programación. Actualmente trabaja en el área de Back.</p>
                </div>

                {/* Santiago */}
                <div className='flex ml-[2rem]'>
                <img src={Santiagodev} alt='santi' className='absolute w-[13rem] h-[13rem] rounded-full ml-[34rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pt-[1.5rem] rounded-r-full pr-[15rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Santiago Pagge{<br/>}(29 años, Junín, Buenos Aires, Argentina) trabajó como vendedor en una estación de servicio y luego en una estación de peajes antes de unirse a nuestro equipo. Actualmente trabaja en el área de Front.</p>
                </div>

                {/* Eric */}
                <div className='flex ml-[33rem]'>
                <img src={Ericdev} al='eric' className='absolute w-[13rem] h-[13rem] rounded-full ml-[2rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pt-[2rem] pr-[1.5rem] rounded-l-full pl-[18rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Eric Palacio{<br/>}(28 años, Corralito, Córdoba, Argentina) trabajaba como ayudante de electricista antes de decidir estudiar programación. Actualmente trabaja en el área de Back. </p>
                </div>

                {/* Franco */}
                <div className='flex ml-[2rem] mb-[1rem]'>
                <img src={Francodev} alt='franco' className='absolute w-[13rem] h-[13rem] rounded-full ml-[34rem] mt-[2rem]'/>
                    <p className='bg-overlay-light m-[1rem] p-[2rem] pt-[1rem] rounded-r-full pr-[15rem] h-[15rem] w-[47rem] text-2xl dark:text-text-dark dark:bg-secondary-dark'>Franco Valdez{<br/>}(23 años, Córdoba, Argentina) es estudiante de Ingeniería Electrónica y Administrador de E-Commerce, y trabaja en el área de Front. Su experiencia laboral previa incluye trabajo como administrador de E-Commerce.</p>
                </div>
            </div>

            <div className="bottom-0">
                <Footer/>
            </div>
        </div>        
    </>
    )
} 