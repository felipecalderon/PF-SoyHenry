import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { NavEmpresa } from '../NavEmpresa/NavEmpresa'
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { ResumenOfertas } from "./ResumenOfertas";
import { CardsOfertasDb } from "./CardsOfertasDb";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { saveUser } from '../../redux/slices/userRegisterSlice'


export const DashboardEmpresa = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userdata = JSON.parse(localStorage.getItem('userLogin'))
    dispatch(saveUser(userdata))
    const [offers, setOffers] = useState([])
    useEffect(() => {
        if(!userdata){
            alert('Por favor inicie sesión')
            navigate('/')
        }
        axios.get(`/jobsdb/${userdata.Companies[0].id}`)
            .then(res => {
                setOffers(res.data.Offers)
            })
    }, []) // eslint-disable-line
    return (
        <>
        <div className="bg-primary-light dark:bg-secondary-dark">
            <NavEmpresa />
            <h2 className="text-center pt-6 mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
            Dashboard Empresa
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 py-6">
                <div className="col-span-1 row-span-1 w-full md:w-1/2 pl-8">
                <Profile company={userdata?.Companies[0]} />
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
        </div>
            <Footer />
        </>
    )
}