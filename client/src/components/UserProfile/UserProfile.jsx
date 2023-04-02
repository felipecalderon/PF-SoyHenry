import React, { useEffect } from "react";
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
import axios from "axios";
import { spinnerPurple } from "../Cards/spinner";

//mui
import EditIcon from '@mui/icons-material/Edit';

import { IconButton } from "@mui/material";
import PremiumButtonComponent from "../BotonPremium/BotonPremium";

function UserProfile() {

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userLogin')));
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.post('/user/email', { email: userData?.email })
            .then(res => {
                const objetoJSON = JSON.stringify(res.data)
                localStorage.setItem('userLogin', objetoJSON);
                setUserData(res.data);
                setLoading(false)
            })
    }, [])


    const [inConfig, SetInConfig] = useState(false)

    const [selectedValueBarraPerfil, SetSelectedValueBarraPerfil] = useState({
        valorSeleccionado: "curriculum"
    })

    if (loading) return spinnerPurple()

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
                < PremiumButtonComponent/>
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
                        className="w-full bg-secondary-light dark:bg-primary-dark m-4 border rounded-xl w-full flex flex-col"

                        style={{ minHeight: " 1200px", minWidth: "330px", maxWidth: "616px" }}>
                        <div className="w-full flex flex-col  items-end">
                            {
                                inConfig ? (
                                    <button
                                        className="m-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded items-end "
                                        onClick={() => SetInConfig(!inConfig)} >Volver</button>) :
                                    (<button
                                        className="m-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => SetInConfig(!inConfig)}>
                                        <EditIcon /> Editar
                                    </button>
                                    )
                            }
                        </div>
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