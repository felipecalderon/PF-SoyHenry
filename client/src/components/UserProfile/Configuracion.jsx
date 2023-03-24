import React from 'react'
import { useState } from 'react'
import user from "../../assets/user.png"
const skills = [
  "Desarrollo web",
  "Desarrollo móvil",
  "Bases de datos",
  "Seguridad informática",
  "Redes de computadoras",
  "Inteligencia artificial",
  "Aprendizaje automático",
  "Ciencia de datos",
  "Gestión de proyectos",
  "Diseño UX/UI",
  "Análisis de negocios",
  "Cloud computing",
  "DevOps",
  "Automatización de pruebas",
  "Ingeniería de software",
  "Realidad virtual y aumentada",
  "Blockchain",
  "Ciberseguridad",
  "Arquitectura de software",
  "Gestión de la información",
];

function Configuracion() {
  const [form,SetForm]=useState({
    nombre:"",
    apellido:"",
    edad:18,
    ubicacion:"",
    descripcion:"",
    idiomas:[],
    habilidades:[],
    tel:"",
    mail:"",
    linkedin:"",
    facebook:"",
    github:""
  })
  const [inConfig,SetInConfig]=useState(false)
  const [selectedValueBarraPerfil,SetSelectedValueBarraPerfil]=useState({
      valorSeleccionado:"curriculum"
  })

/**ni bien se renderiza guarda en el Estado form los valores del user 
 * 
 */
  
const actualizarData = (event) => {
  const { name, value } = event.target;
  SetForm({
      ...form,
      [name]: value
  })
}
 

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div>    

                    <ul className='flex flex-col justify-between items-start p-8'>
                        <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>

                        <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400  w-full flex items-center justify-between'>
                             
                             <input
                             type="text" 
                             id="nombre"
                              placeholder='Nombre' 
                              className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base " 
                              name="nombre" value={form.nombre} onChange={actualizarData} required/>
                         
                           <input
                            type="text"
                             id="apellido" className="form-input mt-1 block  rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base"
                              placeholder='Apellido'
                               name="apellido"
                                value={form.apellido} onChange={actualizarData}/>
                           <label for="edad">Edad</label>

                           <input
                            type="number"
                             id="edad"
                            className="form-input mt-1 block rounded-md border-gray-300 shadow-sm mx-2 text-base"  
                             min="18"
                             max="120"
                            name="edad"
                             value={form.edad}
                             onChange={actualizarData}/>
                          
                       </li>
                        
                          <li
                           className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full' >
                                <label for="ubicacion">Ubicacion </label>
                                <input 
                                    placeholder=' Buenos Aires , Argentina'
                                    id="ubicacion"
                                    type="text"
                                className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-full mx-2 text-base" />
                           </li>
                      
                        <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>

                           <label for="titulo">Titulo</label>
                           <input type="text"
                            placeholder='Por ejemplo: Desarrollador Web Full Stack con experiencia en React y Node.js'
                             id="titulo"
                             className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm mx-2 text-base"
                              width="100%"
                                />
                               </li>
                     
                        <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-col'>


                              <label for="descripcion"
                               className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Descripcion</label>
                            
                            <textarea id="descripcion" 
                            className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base ' style={{maxHeight:"200px" , minHeight:"200px"}}
                            placeholder="Describa sus habilidades, experiencia y objetivos profesionales relacionados con el sector de TI. Incluya detalles sobre sus conocimientos en lenguajes de programación, tecnologías y herramientas, así como su capacidad para trabajar en equipo y resolver problemas técnicos complejos."></textarea>
                       </li>
                                    

                                   <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full '>
                                    <label for="idioma">Idioma</label>
                                   <input 
                                   placeholder='Ejemplo: Inglés - Avanzado, Español - Nativo, Francés - Básico'
                                   id='idioma'
                                   type="text"
                                   className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm mx-2 text-basetext-base text-base' /></li>     
                                        
                          
                              <li className=''>
                                        

                                <h2 className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Habilidades:</h2>
                                <ul className='flex flex-wrap justify-start overflow-y-auto'
                                 style={{maxHeight:"90px"}}>
                                    {skills.map((el) => (
                                      <li className='m-2 p-2 rounded-xl bg-white border text-sm text-center flex justify-between items-center '>{el}</li>))}
                            </ul>
                            </li>
                           
                            <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>
                              Datos de contacto 
                                <ul>
                                <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>
                                  <label for="tel">tel:</label>

                                <input 
                                id='tel'
                                type="tel"
                                placeholder=' Por ejemplo: +1 555-123-4567'
                                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base'/>
                                </li>
                                <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>

                                <label for="mail">mail:</label>
                                  <input 
                                  id='mail'
                                  type="email"
                                  placeholder='juan.perez@gmail.com'
                                  className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base'/>
                                </li>
                                <li className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex  w-full'>
                                  <label for="facebook">Facebook</label>
                                  <input
                                  placeholder='https://www.facebook.com/tu_nombre_de_usuario'
                                  className='w-2/5 form-input mt-1 block rounded-md border-gray-300 shadow-sm text-base'
                                  id='facebook'
                                   type="text"
                                  />
                                  <label for="linkedin">Linkedin</label>
                                    <input
                                    placeholder='https://www.linkedin.com/in/tu_nombre_de_usuario'
                                    className='w-2/5 form-input mt-1 block rounded-md border-gray-300 shadow-sm text-base'
                                    id='linkedin'
                                    type="text"
                                    />
                                    
                                </li>


                                
                                </ul>
                                </li>
                                    </ul>
                                
                              
                    <div className='flex justify-around mb-2'>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Aceptar Cambios</button>
                      <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  "
                      onClick={()=>SetInConfig(!inConfig)}>Descartar Cambios</button>
                    </div>
                
    </div>
  )
 
  
}

export default Configuracion