import React from "react";
import { useState } from "react";
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom";

// Componentes
import Curriculum from "./Curriculum";
import Postulaciones from "./Postulaciones";
import Favoritos from "./Guardados";
import Configuracion from "./Configuracion";
import User from "./User";
import { NavLanding } from "../NavLanding/NavLanding";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

function UserProfile() {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('userLogin'))

    // const [isLogin, SetIsLogin] = useState(true)
    const [inConfig, SetInConfig] = useState(false)
    const [selectedValueBarraPerfil, SetSelectedValueBarraPerfil] = useState({
        valorSeleccionado: "curriculum"
    })
    // const [data, SetData] = useState({
    //     nombre: "nombre",
    //     apellido: "apellido",
    //     edad: 20,
    //     ubicacion: "",
    //     titulo: "Titulo",
    //     descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur nisi perspiciatis earum neque aspernatur recusandae numquam, corrupti quasi explicabo alias placeat libero cumque ad repellat adipisci aut! Obcaecati, quasi!",
    //     idioma: "",
    //     habilidades: ["javascript", "css"],
    //     contacto: {
    //         tel: "123456789",
    //         mail: "hola@gmail.com",
    //         redes_sociales: {
    //             linkedin: "",
    //             facebook: "",
    //             instagram: ""
    //         },
    //         direccion: "calle falsa 123"
    //     }
    // })

    const handleBarraPerfil = (event) => {
        const { value } = event.target
        SetSelectedValueBarraPerfil({
            valorSeleccionado: value
        })

    };
    const displayComponente = (selectedValueBarraPerfil) => {
        // eslint-disable-next-line default-case
        switch (selectedValueBarraPerfil.valorSeleccionado) {
            case "curriculum":
                return <Curriculum />;
            case "postulaciones":
                return <Postulaciones />;
            case "favoritos":
                return <Favoritos />;
        }
    };

    const menu = [
        {
            name: "Ofertas",
            link: "/offers"

        },
        {
            name: "Sobre Nosotros",
            link: "/about"
        },
    ]


    if (userData && userData.rol === 'Postulante') {
        return (
            <>
                <NavLanding menu={menu} />
                <div className="flex justify-around bg-primary-light  dark:bg-secondary-dark pt-20">
                    <input
                        className="invisible"
                        type="radio"
                        name="barra-perfil"
                        value="curriculum"
                        id="curriculum"
                        checked={
                            selectedValueBarraPerfil.valorSeleccionado === "curriculum"
                        }
                        onChange={handleBarraPerfil}
                    />
                    <label for="curriculum" className={`cursor-pointer select-none rounded-md mt-3 py-2 px-3  ${selectedValueBarraPerfil.valorSeleccionado === "curriculum" ? "bg-secondary-light text-white  dark:bg-primary-dark " : ""}`}>
                        Curriculum
                    </label>
                    <input
                        className="invisible"
                        type="radio"
                        name="barra-perfil"
                        value="postulaciones"
                        id="postulaciones"
                        checked={selectedValueBarraPerfil.valorSeleccionado === "postulaciones"}
                        onChange={handleBarraPerfil}
                    />
                    <label for="postulaciones" className={`cursor-pointer select-none rounded-md mt-3 py-2 px-3  ${selectedValueBarraPerfil.valorSeleccionado === "postulaciones" ? "bg-secondary-light text-white dark:bg-primary-dark " : ""}`}>
                        Postulaciones
                    </label>
                    <input
                        className="invisible"
                        type="radio"
                        name="barra-perfil"
                        value="favoritos"
                        id="favoritos"
                        checked={selectedValueBarraPerfil.valorSeleccionado === "favoritos"}
                        onChange={handleBarraPerfil}
                    />
                    <label for="favoritos" className={`cursor-pointer select-none rounded-md mt-3 py-2 px-3 ${selectedValueBarraPerfil.valorSeleccionado === "favoritos" ? "bg-secondary-light text-white  dark:bg-primary-dark " : ""}`}>
                        Favoritos
                    </label>
                </div>

                <section className="bg-primary-light flex  w-full dark:bg-secondary-dark flex-wrap justify-center ">
                    <section
                        className="bg-secondary-light dark:bg-primary-dark m-5 p-1 border rounded-xl w-full flex flex-col  items-end  "
                        style={{ minHeight: " 1200px", minWidth: "330px", maxWidth: "616px" }}>
                        {inConfig ? (
                            <button
                                className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded "
                                style={{
                                    position: "relative",
                                    top: "10%",
                                    right: "15%",
                                }}
                                onClick={() => SetInConfig(!inConfig)} >Volver</button>) :
                            (<button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                style={{
                                    position: "relative",
                                    top: "10%",
                                    right: "15%",
                                }}
                                onClick={() => SetInConfig(!inConfig)}>
                                Configurar
                            </button>
                            )}
                        {inConfig ? <Configuracion /> : <User />}
                    </section>

                    <section className="bg-secondary-light dark:bg-primary-dark m-5 p-4 border rounded-xl w-full  flex flex-col justify-start " style={{ minWidth: "330px", maxWidth: "616px", minHeight: " 1200px" }}>
                        {displayComponente(selectedValueBarraPerfil)}
                    </section>
                </section>

                <Footer />
            </>
        );
    } else {
        return (
            <NotFound />
        )
    }
}

export default UserProfile;