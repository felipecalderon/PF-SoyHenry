import React from 'react'
import Footer from '../Footer/Footer'
import { useState } from 'react'
import user from "../../assets/user.png"

    const SVG_PENCIL=<svg width="46" height="26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="m17.069 5.875-12.99 13.02L3 21.004l2.109-1.078 13.02-12.99-1.06-1.061Z"></path>
<path d="m19.72 3.22-1.06 1.06 1.06 1.06 1.06-1.06a.75.75 0 0 0 0-1.06v0a.75.75 0 0 0-1.06 0v0Z"></path>
</svg>



function UserProfile() {

const [isLogin,SetIsLogin]=useState(true)

 if(isLogin) {
    return (
        <>

            <section className="bg-primary-light flex  items-center">
                <section className='m-5 p-4 border rounded-xl border-primary-dark  w-full border-dashed '>
                    <ul className='flex flex-col justify-between items-start '>
                        <li><img src={user} alt="" width="150px" className='border rounded-full m-4' /></li>
                        <li className=''>nombre Apellido , edad</li>
                        <hr className='border border-primary-dark  w-full border-dashed' />
                        <li className=''  >Ubicacion </li>
                        <hr className='border border-primary-dark  w-full border-dashed' />
                        <li className=' '>Titulo </li>
                        <hr className='border border-primary-dark  w-full border-dashed' />

                        <li className=''>
                            <h2>Descripcion</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur nisi perspiciatis earum neque aspernatur recusandae numquam, corrupti quasi explicabo alias placeat libero cumque ad repellat adipisci aut! Obcaecati, quasi!</p>
                            
                                    </li>
                                    <hr className='border border-primary-dark  w-full border-dashed' />

                                   <li>Idioma</li>     
                                        
                        <hr className='border border-primary-dark  w-full border-dashed' />
                                        

                                    <li className='fdfdf'>
                                <h2>Habilidades:</h2>
                                <ul className='flex flex-nowrap justify-around'>
                                    <li>javascript</li>
                                    <li>html</li>
                                    <li>css</li>
                                    <li>react</li>
                                   </ul>
                            </li>
                            <hr className='border border-primary-dark  w-full border-dashed' />
                            <li>Datos de contacto :
                                <ul>
                                <li>tel:</li>
                                <li>mail: </li>
                                <li>redes sociales: </li>
                                <li>direccion:</li>
                                </ul>
                                </li>
                                <hr className='border border-primary-dark  w-full border-dashed' />                            <li><button><strong>MI CV</strong></button></li>
                            
                    </ul>
                </section>
                <section className='m-5 p-4 border rounded-xl border-primary-dark  w-full border-dashed h-full'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quo magni tempora illo dolore cum itaque asperiores? Minima distinctio, consequatur quasi nulla eligendi, saepe suscipit fugit nam ad possimus ex.
                </section>
                <section className='h-full flex justify-between' >
                <ul className='flex flex-col justify-around '>
                    <li><button>Postulaciones</button></li>
                    <li><button>Me gusta</button></li>
                    <li><button>Mensajes</button></li>
                </ul>
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




