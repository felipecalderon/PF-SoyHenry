import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Dropdown = ({rol}) => {
    const menuEmpresa = [
        {
            link: "/offersCreate",
            name: "Crear oferta"
        },
        {
            link: "/dashboardempresa",
            name: "Perfíl de reclutador",
        },
    ]
    
    const menuPostulante = [
        
        {
            link: "/profile",
            name: "Perfíl de postulante",
        },
    ]

    const [menuRol, setMenuRol] = useState([])

    useEffect(() => {
        if(rol === 'Postulante') setMenuRol(menuPostulante)
        if(rol === 'Empresa') setMenuRol(menuEmpresa)
    }, [rol]) //eslint-disable-line

    console.log(menuRol);
    return (
        <>
        {menuRol.map(menu => {
            return (
                <div key={menu.name} className="py-1">
                    <Link
                        to={menu.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    {menu.name}
                    </Link>
                </div>
            )
        })}
        </>
    )
}

export default Dropdown