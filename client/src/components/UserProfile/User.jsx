import React from 'react'
import { useState } from 'react'
import user from "../../assets/user.png"

function User() {
    const [selectedValueBarraPerfil,SetSelectedValueBarraPerfil]=useState({
        valorSeleccionado:"curriculum"
    })
    const [data,SetData]=useState({
        nombre:"nombre",
        apellido:"apellido",
        edad:20,
        ubicacion:"",
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
  return (
    <ul className='flex flex-col justify-between items-start '>
    <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>

    <li className='mb-1 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400'>

    {data.nombre} {data.apellido} , {data.edad}</li>

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
  )
}

export default User