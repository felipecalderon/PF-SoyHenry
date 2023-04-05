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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLanding } from "../NavLanding/NavLanding";
export const menu = [
    {
      name: "Registro",
      link: "/registro"
    },
  ]
export const About = () => {

    return (
        <>
        <NavLanding menu={menu}/>
        <div className='flex pt-20 w-full bg-primary-light dark:bg-secondary-dark dark:text-text-dark'>
            <div className="flex flex-col">
                <div className="flex flex-col justify-center">
                    <h2 className="flex justify-center font-bold text-4xl pt-3 pb-6 ">Sobre nosotros</h2>
                    <div className="flex flex-col justify-center p-10 m-6 w-auto bg-secondary-light dark:bg-primary-dark rounded-3xl  border-2 border-black dark:border-white">
                    <p className="flex justify-center pb-4 text-lg">¡Bienvenidos a <strong>Fusionajob</strong>!</p>
                    <p>Somos un equipo de desarrolladores apasionados por la creación de soluciones tecnológicas innovadoras para la búsqueda y posteo de trabajos <strong>IT</strong> en línea.{<br/>}{<br/>}
                    Nos enorgullece haber creado una plataforma que permite a los empleadores y candidatos interactuar, coordinar entrevistas entre otros detalles, y que ayuda a los empleadores a encontrar al candidato adecuado. Además, nuestro sitio web simplifica el proceso de búsqueda de trabajo para los candidatos, permitiéndoles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente.{<br/>}{<br/>}
                    Estamos comprometidos con la excelencia en la experiencia del usuario y en brindar un servicio de alta calidad. Estamos emocionados de tener la oportunidad de ayudar a las personas a encontrar trabajo y a los empleadores a encontrar el talento adecuado.</p>
                    <p className="flex justify-center pt-4 text-lg">¡Gracias por elegir <strong>Fusionajob</strong>!</p>
                    </div>
                </div>

                <div className="flex justify-center font-semibold pt-2 pb-2 text-3xl">
                    <h2>Equipo de desarrollo:</h2>
                </div>

            <div className="flex flex-col w-full">
                {/* Felipe */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Felipe Calderón Espinoza</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/felipecalderone/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Felipedev} alt='feli' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(31 años, Temuco, Chile)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Es un diseñador de páginas WordPress con años de experiencia previa en trabajo freelance.</p>
                </div>

                {/* Leandro */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                        <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Leandro Carrizo</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/leandro-javier-carrizo/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Leandrodev} al='lean' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(38 años, Rosario, Santa Fe, Argentina)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Trabajó en la industria de la gastronomía antes de retomar sus estudios. Actualmente estudia una tecnicatura universitaria en IA.</p>
                </div>

                {/* Lisi */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Lisi Daniela Gonzalez</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/lisi-gonzalez/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Lisidev} alt='lisi' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(22 años, Córdoba, Argentina)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Es estudiante de Licenciatura en Relaciones Internacionales.</p>
                </div>

                {/* William */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>William Henao</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/william-henao-29a2b2251/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Williamdev} al='will' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(23 años, Colombia)</p> 
                    <p className="flex justify-center pt-1 pb-4 px-4">Trabajó como auxiliar de mantenimiento eléctrico industrial antes de decidir estudiar programación.</p>
                </div>

                {/* Santiago */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Santiago Pagge</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/santiagopagge/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Santiagodev} alt='santi' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(29 años, Junín, Buenos Aires, Argentina)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Trabajó como vendedor en una estación de servicio y en una estación de peajes antes de unirse al equipo.</p>
                </div>

                {/* Franco */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 mt-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Franco Valdez</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/franco-valdez-122869251/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Francodev} alt='franco' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(23 años, Córdoba, Argentina)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Es estudiante de Ingeniería Electrónica y su experiencia laboral previa incluye trabajo como administrador de E-Commerce.</p>
                </div>

                {/* Eric */}
                <div className="flex flex-col justify-center bg-secondary-light dark:bg-primary-dark rounded-3xl mx-8 my-8 border-2 border-black dark:border-white">
                    <div className="flex flex-col justify-center items-center">
                        <p className="flex p-4 text-xl"><strong>Eric Palacio</strong><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/in/eric-palacio-139046223/`}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></p>
                        <img src={Ericdev} al='eric' className="w-52 rounded-full"/>
                    </div>
                    <p className="flex justify-center pt-2">(28 años, Corralito, Córdoba, Argentina)</p>
                    <p className="flex justify-center pt-1 pb-4 px-4">Trabajó durante muchos años como electricista antes de decidir estudiar programación. </p>
                </div>
            </div>
            </div>
        </div>        
        <Footer/>
    </>
    )
} 