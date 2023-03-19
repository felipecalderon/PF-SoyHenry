import React from "react";
import Footer from '../Footer/Footer'
import { NavEmpresa } from '../NavEmpresa/NavEmpresa'
import { Link } from "react-router-dom";

export const DashboardEmpresa = () => {
    return (
        <div>
            <NavEmpresa/>
            <h2>Dashboard Empresa</h2>
            <Link to='/offerscreate'><button>Crear oferta</button></Link>
            <Footer/>
        </div>
    )
}