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
        
                    

                    <ul className='flex flex-col justify-between items-start '>
                        <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>

                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400  w-full flex content-center  justify-items-start '>
                             <label for="nombre"></label><input type="text" 
                             id="nombre" placeholder='Nombre' className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-1/3  " name="nombre" value={data.nombre} onChange={actualizarData} required/>
                            <label for="apellido"></label>
                           <input type="text" id="pellido" className="form-input mt-1 block  rounded-md border-gray-300 shadow-sm w-1/3" placeholder='Apellido' name="apellido" value={data.apellido} onChange={actualizarData}/>
                           <label for="edad">Edad<input type="number" id="edad" className="form-input mt-1 block rounded-md border-gray-300 shadow-sm"  min="18" max="120" name="edad" value={data.edad} onChange={actualizarData}/>
                           </label>
                        
                          
                       </li>
                        <hr className='border border-b-gray-100  w-full ' />
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex-grow' ><label for="ubicacion">Ubicacion <input type="text" /></label> </li>
                        <hr className='border border-b-gray-100  w-full ' />
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Titulo <input type="text"  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" width="100%" /> </li>
                        <hr className='border border-b-gray-100  w-full ' />

                        <li className=''>
                            <h2 className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Descripcion</h2>
                            <p className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>
                      <textarea></textarea>
                       </p>
                            
                                    </li>
                                    <hr className='border border-b-gray-100  w-full ' />

                                   <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Idioma
                                   <input type="text" /></li>     
                                        
                          <hr className='border border-b-gray-100  w-full ' />
                                        

                                    <li className=''>
                                <h2 className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Habilidades:</h2>
                                <ul className='flex flex-wrap justify-start'>
                                    <li className='m-1 p-1 px-2 rounded-xl bg-slate-200 select-none'>javascript</li>
                                    <li className=' m-1 p-1 rounded-xl  bg-slate-200 select-none'>html</li>
                                    <li className='m-1 p-1 rounded-xl bg-slate-200 select-none'>css</li>
                                    <li className='m-1 p-1  rounded-xl bg-slate-200 select-none'>react</li>
                                    
                                    </ul>
                            </li>
                            <hr className='border border-b-gray-100  w-full ' />
                            <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Datos de contacto 
                                <ul>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>tel:<input type="text"/></li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>mail: <input type="email"/></li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>redes sociales: </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>direccion:<input type="text"/></li>
                                </ul>
                                </li>
                                    </ul>
                                
                              
                    <button>OK</button><hr />
                    <button onClick={()=>SetInConfig(!inConfig)}>cancel</button>
                
    </div>
  )
 
  
}

export default Configuracion