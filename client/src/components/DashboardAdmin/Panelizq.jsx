import GraficoLineal from "./GraficoLineal"
import { Button } from "@mui/material"; 
import { Group, Groups, Work } from '@mui/icons-material';
import Tabla from "./TablaResumen";
const datosVentas = {
    meses: ['Noviembre', 'Diciembre', 'Enero', 'Febrero'],
    ventas: [200, 480, 360, 390],
}

const datosResumen = [
    {
      name: "Postulantes",
      cantidad: 33,
    },
    {
      name: "Reclutadores",
      cantidad: 14,
    },
    {
      name: "Ofertas activas",
      cantidad: 37,
    },
    {
      name: "Ofertas por caducar",
      cantidad: 11,
    },
    {
      name: "Ofertas caducadas",
      cantidad: 7,
    },
  ]
const Izquierda = () => {
    return (
    <>
        <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
            <Tabla datos={datosResumen} />
            <GraficoLineal datos={datosVentas}/>
        </section>
    </>
    )
}

export default Izquierda