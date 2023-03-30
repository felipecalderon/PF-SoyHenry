import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
// import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { ResumenOfertas } from "./ResumenOfertas";
import { NavLanding } from '../NavLanding/NavLanding';
import { CardsOfertasDb } from "./CardsOfertasDb";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { saveUser } from '../../redux/slices/userRegisterSlice'
import NotFound from "../NotFound/NotFound";

export const DashboardEmpresa = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    dispatch(saveUser(userData))
    const [offers, setOffers] = useState([])
    useEffect(() => {
        axios.get(`/jobsdb/${userData?.Companies instanceof Array ? userData.Companies[0].id : userData.Companies.id}`)
            .then(res => {
                setOffers(res.data.Offers)
            })
    }, []) // eslint-disable-line

    const menuUserProfile = [
        {
            name: 'Inicio',
            link: '/'
        },
        {
            name: 'Sobre nosotros',
            link: '/about'
        },
        {
            name: 'Ofertas',
            link: '/offers'
        }
    ]

    if (userData && userData.rol === 'Empresa') {
        return (
            <div className="bg-primary-light dark:bg-secondary-dark pt-20">
                <NavLanding menu={menuUserProfile} />
                <h2 className="text-center pt-6 mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
                    Dashboard Empresa
                </h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 py-6">
                    <div className="col-span-1 row-span-1 w-full md:w-1/2 pl-8">
                        <Profile company={userData?.Companies instanceof Array ? userData.Companies[0] : userData.Companies} />
                    </div>
                    <div className="col-span-1 row-span-2 flex md:block">
                        <div className="w-full h-full px-4">
                            <CardsOfertasDb offers={offers} />
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 px-4">
                        <div className="pt-1">
                            <ResumenOfertas offers={offers} />
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1"></div>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <NotFound />
        )
    }
}