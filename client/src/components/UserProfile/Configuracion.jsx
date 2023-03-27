import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react'
import usuario from "../../assets/user.png"
import validacionConfig from './validacionconfig';


function Configuracion() {
  const [skills,setSkills]=useState([])
  const [showErrors,SetShowErrors]=useState(false)
  const [form,SetForm]=useState({
    nombre:"",
    apellido:"",
    edad:"",
    ubicacion:"",
    descripcion:"",
    idioma:"",
    habilidades:[],
    tel:"",
    linkedin:"",
    facebook:"",

  })
  const [error,SetError]=useState({
    nombre:"",
    apellido:"",
    edad:"",
    ubicacion:"",
    descripcion:"",
    idiomas:"",
    habilidades:"",
    tel:"",
    linkedin:"",
    facebook:"",

  })

  const [inConfig,SetInConfig]=useState(false)

  const handleSelectSkills =(event)=>{
    const { value } = event.target;
    if (form.habilidades.includes(value)) {
      SetForm({
        ...form,
        habilidades: [...form.habilidades].filter((element) => element !== value),
      });
    } else if (value !== "") {
      SetForm({ ...form, habilidades: [...form.habilidades, value] });
    };
  
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in error) {
      if (error[key]) {
        SetShowErrors(true)
      }
    }
   
  };
  const actualizarData = (event) => {
    const { name, value } = event.target;
    SetForm({
        ...form,
        [name]: value
    });
    console.log(form)
  }

  useEffect(() => {
          if(skills.length===0){
            axios("/technologies")
            .then((res)=>setSkills(res.data))
            
          }

            validacionConfig(form,SetError)
            
          }
    , [form,skills])
    
   
  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-between items-start p-4'>    

                          <img src={usuario} alt="" width="150px" className='border rounded-full m-4' />
                
                        
                          

                        <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400  w-full flex items-center justify-between'>
                            
                             <input
                             type="text" 
                             id="nombre"
                              placeholder='Nombre' 
                              className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base " 
                              name="nombre"
                             value={form.nombre}
                             onChange={actualizarData} />
                         
                           <input
                            type="text"
                             id="apellido" 
                             className="form-input mt-1 block  rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base"
                              placeholder='Apellido'
                             name="apellido"
                            value={form.apellido}
                            onChange={actualizarData}/>
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
                       </div>
                       {showErrors?<>
                         <span className='text-sm text-red-500'>{error.nombre}</span>
                         <span className='text-sm'>{error?.apellido} </span>
                         <span className='text-sm'>{error.edad}</span>
                       </>:null}
                              <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>
                              <label for="ubicacion">Ubicacion </label>
                                <input 
                                    placeholder=' Buenos Aires , Argentina'
                                    id="ubicacion"
                                    name="ubicacion"
                                    type="text"
                                    value={form.ubicacion}
                                    onChange={actualizarData}
                                className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-full mx-2 text-base" />
                              </div>
                              
                           
                      
                        <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>

                           <label for="titulo">Titulo</label>
                           <input type="text"
                           value={form.titulo}
                           onChange={actualizarData}
                            placeholder='Por ejemplo: Desarrollador Web Full Stack con experiencia en React y Node.js'
                             id="titulo"
                             className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm mx-2 text-base"
                              width="100%"
                                />
                               </div>
                     
                        <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-col'>
                              <label for="descripcion"
                               className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Descripcion</label>
                            <textarea id="descripcion" 
                            name='descripcion'
                            value={form.descripcion}
                            onChange={actualizarData}
                            className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base px-2 py-1 ' style={{maxHeight:"160px" , minHeight:"160px"}}
                            placeholder="Describa sus habilidades, experiencia y objetivos profesionales relacionados con el sector de TI. Incluya detalles sobre sus conocimientos en lenguajes de programación, tecnologías y herramientas, así como su capacidad para trabajar en equipo y resolver problemas técnicos complejos."></textarea>
                       </div>


                            
                                    

                        <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full '>
                                    <label for="idioma">Idioma</label>
                                   <input 
                                    type="text"
                                   placeholder='Ej: Inglés - Avanzado, Español - Nativo, Francés - Básico'
                                   id='idioma'
                                   name='idioma'
                                   value={form.idioma}
                                   onChange={actualizarData}
                                   className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm mx-2 text-basetext-base text-base' /></div>     
                                        
                          
                              <div className='flex flex-wrap justify-start content-start w-full items-start' style={{height:"140px"}}>
                                        
                             <h2 className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 '>Habilidades:</h2>

                            <select name="skills" id="" onChange={handleSelectSkills} className="w-2/3 form-input mt-1 block  rounded-md border-gray-300 shadow-sm text-base">
                            <option value="">Seleccionar Habilidad</option>
                          
                                 {
                                  skills?.map((el)=><option value={el.Technology}>{el.Technology}</option>)
                                 } 

                            </select>
                            
                            
                            <div className='flex flex-wrap justify-start overflow-y-auto' 
                            style={{
                              height:" 50%",
                               width: "100%",
                              alignContent: "start"}}>
                             {form.habilidades.length ?
                              form.habilidades.map((skill,index) => (
                                        
                                <button 
                                className='m-2 p-1 rounded-xl bg-white border text-sm text-center flex justify-between items-center hover:bg-gray-100 active:bg-gray-200 focus:outline-none flex-shrink'
                                onClick={(event)=>SetForm({...form,habilidades:[...form.habilidades].filter((el)=>el!==event.target.value)})}
                                value={skill} key={skill} id={index}>{skill}</button>
                              
                    
                             )) :null                             
                             }
                                     
                                      </div>
                                      
                            
                                  </div>
                           
                            <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 w-full'>
                              Datos de contacto 
                                <div>

                                <div className='mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-wrap'>
                                  <label for="tel">Telefono</label>

                                <input 
                                id='tel'
                                type="tel"
                                name="tel"
                                value={form.tel}
                                onChange={actualizarData}
                                placeholder=' Por ejemplo: +1 555-123-4567'
                                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-base'/>
                                </div>

                               
                                
                                  <label for="facebook">Facebook</label>
                                  <input
                                  type="url"
                                  id='facebook'
                                  name='facebook'
                                  value={form.facebook}
                                  onChange={actualizarData}
                                  placeholder='https://www.facebook.com/tu_nombre_de_usuario'
                                  className='w-full form-input mt-1 block rounded-md border-gray-300 shadow-sm text-base'
                                   
                                  />
                                  <label for="linkedin">Linkedin</label>
                                    <input
                                      type="url"
                                      id="linkedin"
                                      name='linkedin'
                                      value={form.linkedin}
                                      onChange={actualizarData}
                                      placeholder='https://www.linkedin.com/in/tu_nombre_de_usuario'
                                    className='w-full form-input mt-1 block rounded-md border-gray-300 shadow-sm text-base'
                               
                                    />
                                </div>
                                    
                                


                                
                                </div>
                                    
                                
                              
                    <div className='flex justify-around  w-full'>
                      <button
                      type='submit'
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Aceptar Cambios</button>
                      <button
                    
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  "
                      onClick={()=>SetInConfig(!inConfig)}>Descartar Cambios</button>
                    </div>
                
    </form>
  )
 
  
}

export default Configuracion