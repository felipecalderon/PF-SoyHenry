import React from 'react'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'
import Curriculum from './Curriculum'
import Postulaciones from "./Postulaciones"
import Favoritos from './Favoritos'
import Configuracion from "./Configuracion"
import User from './User'

// Validacion del usuario 
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import fbapp from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { spinnerPurple } from '../Cards/spinner'




function UserProfile() {
    // Obtenemos la instancia de Firebase Auth
    const auth = getAuth(fbapp);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const [isLogin, SetIsLogin] = useState(true)
    const [inConfig, SetInConfig] = useState(false)
    const [selectedValueBarraPerfil, SetSelectedValueBarraPerfil] = useState({
        valorSeleccionado: "curriculum"
    })
    const [data, SetData] = useState({
        nombre: "nombre",
        apellido: "apellido",
        edad: 20,
        ubicacion: "",
        titulo: "Titulo",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur nisi perspiciatis earum neque aspernatur recusandae numquam, corrupti quasi explicabo alias placeat libero cumque ad repellat adipisci aut! Obcaecati, quasi!",
        idioma: "",
        habilidades: ["javascript", "css"],
        contacto: {
            tel: "123456789",
            mail: "hola@gmail.com",
            redes_sociales: {
                linkedin: "",
                facebook: "",
                instagram: ""
            },
            direccion: "calle falsa 123"
        }
    })

    const handleBarraPerfil = (event) => {
        const { value } = event.target
        SetSelectedValueBarraPerfil({
            valorSeleccionado: value
        })
    }
    const actualizarData = (event) => {
        const { name, value } = event.target;
        SetData({
            ...data,
            [name]: value
        })
    }

    const displayComponente = (selectedValueBarraPerfil) => {
        switch (selectedValueBarraPerfil.valorSeleccionado) {
            case "curriculum":
                return <Curriculum />
            case "postulaciones":
                return <Postulaciones />
            case "favoritos":
                return <Favoritos />
        };
    };
    // useEffect(()=>{
    //     displayComponente(selectedValueBarraPerfil)
    // },[selectedValueBarraPerfil])
    if (user) {
        return (
            <>
                <div className='flex justify-evenly bg-primary-light '>
                    <input
                        className='invisible'
                        type="radio"
                        name="barra-perfil"
                        value="curriculum"
                        id="curriculum"
                        checked={selectedValueBarraPerfil.valorSeleccionado === "curriculum"}
                        onChange={handleBarraPerfil}
                    />
                    <label for="curriculum" className='cursor-pointer select-none '>Curriculum</label>
                    <input
                        className='invisible'
                        type="radio"
                        name="barra-perfil"
                        value="postulaciones"
                        id="postulaciones"
                        checked={selectedValueBarraPerfil.valorSeleccionado === "postulaciones"}
                        onChange={handleBarraPerfil}
                    />
                    <label for="postulaciones" className='cursor-pointer select-none'>Postulaciones</label>
                    <input
                        className='invisible'
                        type="radio"
                        name="barra-perfil"
                        value="favoritos"
                        id="favoritos"
                        checked={selectedValueBarraPerfil.valorSeleccionado === "favoritos"}
                        onChange={handleBarraPerfil}
                    />
                    <label for="favoritos" className='cursor-pointer select-none'>Favoritos</label>
                </div>
                <section className="bg-primary-light flex  ">
                    <section className='bg-secondary-light m-5 p-4 border rounded-xl w-full '>
                        {inConfig ? <button onClick={() => SetInConfig(!inConfig)}>Volver</button> : <button onClick={() => SetInConfig(!inConfig)}>Configurar</button>}
                        {inConfig ? <Configuracion /> : <User />}
                    </section>
                    <section className='bg-secondary-light m-5 p-4 border rounded-xl w-full flex-grow ' >
                        {displayComponente(selectedValueBarraPerfil)}
                    </section>
                </section>
                <Footer />
            </>
        )
    } else {
        spinnerPurple()
        navigate('/')
    }
}

export default UserProfile;
