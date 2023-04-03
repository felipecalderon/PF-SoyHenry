import { Button } from '@mui/material';
import { NavLanding } from '../NavLanding/NavLanding';
import Rigth from './Panelder';
import Left from './Panelizq';
import { Group, GroupAdd, Groups, PersonAddAlt1, Work } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';

// funcion para transformar fecha del backend
export const tranformarFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal)
  
    const dia = fecha.getDate().toString().padStart(2, "0")
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const anio = fecha.getFullYear().toString()
  
    const fechaFormateada = `${dia}/${mes}/${anio}`
    return fechaFormateada
  }

const menuUserProfile = [
    {
        name: "Inicio",
        link: "/"
    }
]
const DashAdmin = () => {
    const [listaUsers, setListaUsers] = useState([])
    const users = JSON.parse(localStorage.getItem('userList'))
    
    const handleFiltro = (e) => {
        e.preventDefault()
        console.log(e.target.id);
        const filtro = users?.filter(user => { 
            return user.rol === e.target.id
        })
        console.log(filtro);
        setListaUsers(filtro)
    }

    useEffect(()=>{
      axios.get("/user")
      .then(({data}) => {
        const cleanData = data.map(user => {
          return (
            {
              id: data.id,
              rol: user.rol,
              name: `${user.names} ${user.lastnames} (${user.email})`,
              fecha_registro: tranformarFecha(user.createdAt),
              activo: user.active
            }
          )
        })
        localStorage.setItem("userList", JSON.stringify(cleanData))
        setListaUsers(cleanData)
      })
    },[])

    return (
    <>
        <div className="bg-primary-light dark:bg-secondary-dark pt-20">
                <NavLanding menu={menuUserProfile} />
                <h2 className="text-center pt-6 mb-10 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
                    Panel de Adminisitración
                </h2>
            <section className="gap-3 flex flex-row flex-wrap justify-center text-center">
                <Button variant="contained" startIcon={<PersonAddAlt1 />}>Agregar Postulante </Button>
                <Button variant="contained" startIcon={<GroupAdd />}>Agregar Reclutador </Button>
                <Button id='Postulante' onClick={handleFiltro} variant="contained" startIcon={<Group />}>Ver Postulantes </Button>
                <Button id='Empresa' onClick={handleFiltro} variant="contained" startIcon={<Groups />}>Ver Reclutadores </Button>
                <Button variant="contained" startIcon={<Work />}>Ver Ofertas </Button>
            </section>
            <section className="py-5 gap-3 flex flex-row flex-wrap justify-center text-center">
                <div className="w-11/12 sm:w-1/3 flex flex-col">
                    <Left /> 
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                    <Rigth datos={listaUsers}/>
                </div>
            </section>
            </div>
    </>
    )
}

export default DashAdmin