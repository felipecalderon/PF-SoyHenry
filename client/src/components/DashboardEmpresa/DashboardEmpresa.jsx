import React from "react";
import Footer from '../Footer/Footer'
import { NavEmpresa } from '../NavEmpresa/NavEmpresa'
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { CardsOfertasDb } from "./CardsOfertasDb";

export const DashboardEmpresa = () => {
    return (
        <div>
            <NavEmpresa/>
            <h2 className='flex justify-center text-2xl font-bold mt-[1rem]'>Dashboard Empresa</h2>
            <Link to='/offerscreate' className='flex justify-center text-md mt-[1rem] pb-[1rem]'><button>Crear oferta</button></Link>
            <div className="flex flex-row justify-center">
                <div className="w-1/2 pl-8"><Profile /></div>
            
                <div className="w-1/2"><CardsOfertasDb/></div>
            </div>
            <Footer/>
        </div>
    )
}