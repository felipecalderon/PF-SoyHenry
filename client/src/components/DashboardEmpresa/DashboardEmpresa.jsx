import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer'
import { NavEmpresa } from '../NavEmpresa/NavEmpresa'
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
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
        <div className="bg-primary-light dark:bg-secondary-dark">
            <NavEmpresa/>
            <h2 className=' text-center py-6 mb-4 text-2x pr-10 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white'>Dashboard Empresa</h2>
            <Link to='/offerscreate' className='flex justify-center text-md mt-[1rem] pb-[1rem]'><button>Crear oferta</button></Link>
            <div className="flex flex-row justify-center">
                <div className="w-1/2 pl-8"><Profile company={userdata?.Companies[0]}/></div>
            
                <div className="w-1/2"><CardsOfertasDb offers={offers}/></div>
            </div>
            <Footer/>
        </div>
    )
}