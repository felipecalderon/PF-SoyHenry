import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { NavEmpresa } from '../NavEmpresa/NavEmpresa'
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { CardsOfertasDb } from "./CardsOfertasDb";
import axios from 'axios';

export const DashboardEmpresa = () => {
    const navigate = useNavigate()
    const userdata = JSON.parse(localStorage.getItem('userLogin'))
    const [offers, setOffers] = useState([])
    useEffect(() => {
        if(!userdata){
            alert('Por favor inicie sesión')
            navigate('/')
        }
        axios.get(`/jobsdb/${userdata.Companies[0].id}`)
            .then(res => setOffers(res.data.Offers))
    }, []) // eslint-disable-line
    return (
        <div>
            <NavEmpresa/>
            <h2 className='flex justify-center text-2xl font-bold mt-[1rem]'>Dashboard Empresa</h2>
            <Link to='/offerscreate' className='flex justify-center text-md mt-[1rem] pb-[1rem]'><button>Crear oferta</button></Link>
            <div className="flex flex-row justify-center">
                <div className="w-1/2 pl-8"><Profile company={userdata?.Companies[0]}/></div>
            
                <div className="w-1/2"><CardsOfertasDb offers={offers}/></div>
            </div>
            <Footer/>
        </div>
    )
}