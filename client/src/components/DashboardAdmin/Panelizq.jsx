import GraficoLineal from "./GraficoLineal"
import { Button } from "@mui/material"; 
import { Group, Groups, Work } from '@mui/icons-material';
import Tabla from "./TablaResumen";
const datos = {
    meses: ['Noviembre', 'Diciembre', 'Enero', 'Febrero'],
    ventas: [200, 480, 360, 390],
}
const Izquierda = () => {
    return (
    <>
        <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
            <Tabla />
            <GraficoLineal datos={datos}/>
            <div className="flex flex-col gap-6 mt-6">
            <Button variant="contained" startIcon={<Groups />}> Lista de Postulante </Button>
            <Button variant="contained" startIcon={<Group />}> Lista de Reclutadores </Button>
            <Button variant="contained" startIcon={<Work />}> Listado de Ofertas </Button>
            </div>
        </section>
    </>
    )
}

export default Izquierda