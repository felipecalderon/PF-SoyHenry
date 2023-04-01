import { Button } from '@mui/material';
import { NavLanding } from '../NavLanding/NavLanding';
import Rigth from './Panelder';
import Left from './Panelizq';
import { Group, GroupAdd, Groups, PersonAddAlt1, Work } from '@mui/icons-material';
const menuUserProfile = [
    {
        name: "Inicio",
        link: "/"
    }
]
const DashAdmin = () => {
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
                <Button variant="contained" startIcon={<Group />}>Ver Postulantes </Button>
                <Button variant="contained" startIcon={<Groups />}>Ver Reclutadores </Button>
                <Button variant="contained" startIcon={<Work />}>Ver Ofertas </Button>
            </section>
            <section className="py-5 gap-3 flex flex-row flex-wrap justify-center text-center">
                <div className="w-11/12 sm:w-1/3 flex flex-col">
                    <Left /> 
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                    <Rigth />
                </div>
            </section>
            </div>
    </>
    )
}

export default DashAdmin