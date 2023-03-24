import React from 'react'
import { useState } from 'react'
import user from "../../assets/user.png"


function Configuracion() {
  const [isLogin,SetIsLogin]=useState(true)
  const [inConfig,SetInConfig]=useState(false)
  const [selectedValueBarraPerfil,SetSelectedValueBarraPerfil]=useState({
      valorSeleccionado:"curriculum"
  })
  const [data,SetData]=useState({
      nombre:"nombre",
      apellido:"apellido",
      edad:20,
      ubicacion:"argentina",
      titulo:"Titulo",
      descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur nisi perspiciatis earum neque aspernatur recusandae numquam, corrupti quasi explicabo alias placeat libero cumque ad repellat adipisci aut! Obcaecati, quasi!",
      idioma:"",
      habilidades:["javascript","css"],
      contacto:{
          tel:"123456789",
          mail:"hola@gmail.com",
          redes_sociales:{
              linkedin:"",
              facebook:"",
              instagram:""
          },
         direccion:"calle falsa 123" 
      }
  })
  const actualizarData =(event)=>{
    const {name,value}=event.target;
    SetData({
        ...data,
        [name]:value
    })
  }
 

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <div>
        
                    

                    <ul className='flex flex-col justify-between items-start p-8'>
                        <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>

                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400  w-full flex items-center justify-between'>
                             <input type="text" 
                             id="nombre" placeholder='Nombre' className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-1/3 text-center " name="nombre" value={data.nombre} onChange={actualizarData} required/>
                         
                           <input type="text" id="pellido" className="form-input mt-1 block  rounded-md border-gray-300 shadow-sm w-1/3 text-center" placeholder='Apellido' name="apellido" value={data.apellido} onChange={actualizarData}/>
                           <label for="edad">Edad
                           </label>
                           <input type="number" id="edad" className="form-input mt-1 block rounded-md border-gray-300 shadow-sm"  min="18" max="120" name="edad" value={data.edad} onChange={actualizarData}/>
                          
                       </li>
                        
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full' >
                          <label for="ubicacion">Ubicacion </label>
                          <input 
                          id="ubicacion"
                          type="text"
                          className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-full" /> </li>
                      
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>
                          <label for="titulo">Titulo</label><input type="text"  id="titulo" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" width="100%" /> </li>
                     

                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-col'>

                              <label for="descripcion" className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Descripcion</label>
                            
                        <textarea id="descripcion" className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm' style={{maxHeight:"200px" , minHeight:"200px"}} ></textarea>
                       </li>
                                    

                                   <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>
                                    <label for="idioma">Idioma</label>
                                   <input 
                                   id='idioma'
                                   type="text"
                                   className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm' /></li>     
                                        
                          
                                        

                                    <li className=''>
                                <h2 className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Habilidades:</h2>
                                <ul className='flex flex-wrap justify-start'>
                                    <li className='m-1 p-1 px-2 rounded-xl bg-slate-200 select-none'>javascript</li>
                                    <li className=' m-1 p-1 rounded-xl  bg-slate-200 select-none'>html</li>
                                    <li className='m-1 p-1 rounded-xl bg-slate-200 select-none'>css</li>
                                    <li className='m-1 p-1  rounded-xl bg-slate-200 select-none'>react</li>
                                    
                                    </ul>
                            </li>
                           
                            <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Datos de contacto 
                                <ul>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>
                                  <label for="tel">tel:</label>
                                <input 
                                id='tel'
                                type="number"
                                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm'/>
                                </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>

                                <label for="mail">mail:</label>
                                  <input 
                                  id='mail'
                                  type="email"
                                  className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm'/>
                                </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex  w-full'>
                                  <label for="facebook">Facebook</label>
                                  <input
                                  className='w-2/5 form-input mt-1 block rounded-md border-gray-300 shadow-sm'
                                  id='facebook'
                                   type="text"
                                  />
                                  <label for="linkedin">Linkedin</label>
                                  <input
                                  className='w-2/5 form-input mt-1 block rounded-md border-gray-300 shadow-sm'
                                  id='linkedin'
                                   type="text"
                                  />
                                </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full'>
                                  <label for="direccion">direccion</label>
                                <input
                                id='direccion'
                                type="text"
                                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm'/>
                                </li>
                                </ul>
                                </li>
                                    </ul>
                                
                              
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Aceptar Cambios</button>
                    <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded
                    "
                    onClick={()=>SetInConfig(!inConfig)}>Descartar Cambios</button>
                
    </div>
  )
 
  
}

export default Configuracion