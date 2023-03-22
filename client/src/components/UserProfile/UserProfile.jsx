import React from 'react'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'
import user from "../../assets/user.png"
import {Nav} from "../Nav/Nav"
import Curriculum from './Curriculum'
import Postulaciones from "./Postulaciones"
import Favoritos  from './Favoritos'
import Configuracion from "./Configuracion"


const SVG_PENCIL=<svg width="46" height="26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="m17.069 5.875-12.99 13.02L3 21.004l2.109-1.078 13.02-12.99-1.06-1.061Z"></path>
<path d="m19.72 3.22-1.06 1.06 1.06 1.06 1.06-1.06a.75.75 0 0 0 0-1.06v0a.75.75 0 0 0-1.06 0v0Z"></path>
</svg>



function UserProfile() {

const [isLogin,SetIsLogin]=useState(true)
const [selectedValueBarraPerfil,SetSelectedValueBarraPerfil]=useState({
    valorSeleccionado:"curriculum"
})
const handleSortOrderChange =(event)=>{
    const {value}=event.target
    SetSelectedValueBarraPerfil({
        valorSeleccionado:value
    })
}
const displayComponente=(selectedValueBarraPerfil)=>{
    switch (selectedValueBarraPerfil.valorSeleccionado) {
        case "curriculum":
            return <Curriculum/>
        case "postulaciones":
            return <Postulaciones/>    
        case "configuracion":
            return <Configuracion/>
          case "favoritos":
            return <Favoritos/>  
          };
};
// useEffect(()=>{
//     displayComponente(selectedValueBarraPerfil)
// },[selectedValueBarraPerfil])
 if(isLogin) {
    return (
        <>
        <Nav/>

 <div className='flex justify-around bg-primary-light '>
 <input
            className='invisible'
            type="radio"
            name="barra-perfil"
            value="curriculum"
            id="curriculum"
            checked={selectedValueBarraPerfil.valorSeleccionado === "curriculum"}
            onChange={handleSortOrderChange}
                  />
<label for="curriculum" className='checked:bg-secondary-light'>Curriculum</label>
                <input
                className='invisible'
            type="radio"
            name="barra-perfil"
            value="postulaciones"
            id="postulaciones"
            checked={selectedValueBarraPerfil.valorSeleccionado === "postulaciones"}
            onChange={handleSortOrderChange}


                  />
<label for="postulaciones">Postulaciones</label>         
<input
className='invisible'
            type="radio"
            name="barra-perfil"
            value="favoritos"
            id="favoritos"
            checked={selectedValueBarraPerfil.valorSeleccionado === "favoritos"}
            onChange={handleSortOrderChange}


                  />
<label for="favoritos">Favoritos</label>

<input
className='invisible'
            type="radio"
            name="barra-perfil"
            value="configuracion"
            id="configuracion"
            checked={selectedValueBarraPerfil.valorSeleccionado === "configuracion"}
            onChange={handleSortOrderChange}


                  />
<label for="configuracion">Configuracion</label>
                </div>

            <section className="bg-primary-light flex  ">
                <section className='bg-secondary-light m-5 p-4 border rounded-xl w-full '>
                    <ul className='flex flex-col justify-between items-start '>
                        <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>

                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>nombre Apellido , edad</li>
                        <hr className='border border-b-gray-100  w-full ' />
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'  >Ubicacion </li>
                        <hr className='border border-b-gray-100  w-full ' />
                        <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Titulo </li>
                        <hr className='border border-b-gray-100  w-full ' />

                        <li className=''>
                            <h2 className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Descripcion</h2>
                            <p className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur nisi perspiciatis earum neque aspernatur recusandae numquam, corrupti quasi explicabo alias placeat libero cumque ad repellat adipisci aut! Obcaecati, quasi!</p>
                            
                                    </li>
                                    <hr className='border border-b-gray-100  w-full ' />

                                   <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Idioma</li>     
                                        
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
                            <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>Datos de contacto :
                                <ul>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>tel:</li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>mail: </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>redes sociales: </li>
                                <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>direccion:</li>
                                </ul>
                                </li>
                                
                              
                    
                                    </ul>
                </section>
                <section className='bg-secondary-light m-5 p-4 border rounded-xl w-full flex-grow ' >
                
                {  displayComponente(selectedValueBarraPerfil)}
                  
                </section>
                
            </section>
                <Footer/>
        </>
  )}else{ 
    return (
    <div >
        <h2>Debes ingresar el usuario</h2>
        < Footer/>
    </div>
  )}
}

export default UserProfile




