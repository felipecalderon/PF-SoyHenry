import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLanding } from '../NavLanding/NavLanding';
import Rigth from './Panelder';
import Left from './Panelizq';
import { Button } from '@mui/material';
import { Group, GroupAdd, Groups, PersonAddAlt1, Work } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// funcion para transformar fecha del backend
export const tranformarFecha = (fechaOriginal) => {
  const fecha = new Date(fechaOriginal)

  const dia = fecha.getDate().toString().padStart(2, "0")
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
  const anio = fecha.getFullYear().toString()

  const fechaFormateada = `${dia}/${mes}/${anio}`
  return fechaFormateada
}

// const menuUserProfile = [
//   {
//     name: "Inicio",
//     link: "/"
//   }
// ]

const DashAdmin = () => {
  const users = JSON.parse(localStorage.getItem('userList'))
  const [listaUsers, setListaUsers] = useState([])
  const [addPostulant, setAddPostulant] = useState(false)
  const [addRecluter, setAddRecluter] = useState(false)
  const [addAdmin, setAddAdmin] = useState(false)
  const [addOffers, setAddOffers] = useState(false)

  const [mostrarBotones, setMostrarBotones] = useState(false);
  function handleClick() {
    setMostrarBotones(true);
  }
  const handleFiltro = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const filtro = id === 'all' ? users : users.filter(user => user.rol === id);
    setListaUsers(filtro);
    setMostrarBotones(false);
    setAddPostulant(false);
    setAddRecluter(false);
    setAddAdmin(false);
    setAddOffers(false);
  }

  const handlePostulant = (e) => {
    e.preventDefault()
    setAddPostulant(true);
    setAddRecluter(false);
    setAddAdmin(false);
    setAddOffers(false);
  };
  const handleRecluter = (e) => {
    e.preventDefault()
    setAddPostulant(false);
    setAddRecluter(true);
    setAddAdmin(false);
    setAddOffers(false);
  };
  const handleAdmin = (e) => {
    e.preventDefault()
    setAddPostulant(false);
    setAddRecluter(false);
    setAddAdmin(true);
    setAddOffers(false);
  };
  const handleOffers = (e) => {
    e.preventDefault()
    setAddPostulant(false);
    setAddRecluter(false);
    setAddAdmin(false);
    setAddOffers(true);
  };

  useEffect(() => {
    axios.get("/user")
      .then(({ data }) => {
        const cleanData = data.map(user => {
          return (
            {
              id: user.id,
              rol: user.rol,
              name: `${user.names} ${user.lastnames} (${user.email})`,
              fecha_registro: tranformarFecha(user.createdAt),
              activo: user.active,
              premium: user.premium
            }
          )
        })
        localStorage.setItem("userList", JSON.stringify(cleanData))
        setListaUsers(cleanData)
      })
  }, [])

  return (
    <>
      <div className="bg-primary-light dark:bg-secondary-dark pt-20">
        <NavLanding />
        <h2 className="text-center pt-6 mb-10 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
          Panel de Adminisitración
        </h2>
        <section className="gap-3 flex flex-row flex-wrap justify-center text-center">
          <div>
            <Button className='m-1' variant="contained" onClick={handleClick} startIcon={<AssignmentIndIcon />} >Usuarios</Button>
            {mostrarBotones &&
              <div className='gap-3 flex flex-col mt-3'>
                <Button id='all' variant="contained" onClick={handleFiltro} startIcon={<Diversity3Icon />} >Todos los Usuarios</Button>
                <Button id='Postulante' variant="contained" onClick={handleFiltro} startIcon={<Group />} >Postulantes</Button>
                <Button id='Empresa' variant="contained" onClick={handleFiltro} startIcon={<Groups />} >Reclutadores</Button>
              </div>
            }
          </div>
          <Button variant="contained" onClick={handlePostulant} startIcon={<PersonAddAlt1 />} sx={{ height: '36px' }} >Agregar Postulante </Button>
          <Button variant="contained" onClick={handleRecluter} startIcon={<GroupAdd />} sx={{ height: '36px' }} >Agregar Reclutador </Button>
          <Button variant="contained" onClick={handleAdmin} startIcon={<SupervisorAccountIcon />} sx={{ height: '36px' }} >Agregar Admin </Button>
          <Button variant="contained" onClick={handleOffers} startIcon={<Work />} sx={{ height: '36px' }} >Ver Ofertas </Button>
        </section>
        <section className="py-5 gap-3 flex flex-row flex-wrap justify-center text-center">
          <div className="w-full sm:w-1/2 flex flex-col">
            <Rigth datos={listaUsers} addpostulant={addPostulant} addRecluter={addRecluter} addAdmin={addAdmin} addOffers={addOffers} />
          </div>
          <div className="w-11/12 sm:w-1/3 flex flex-col">
            <Left />
          </div>
        </section>
      </div>
    </>
  )
}

export default DashAdmin