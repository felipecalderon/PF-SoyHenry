import { useEffect, useState } from "react";
import axios from "axios";

// Components
import GraficoLineal from "./GraficoLineal"
import ResumenInfo from "./TablaResumen";

const Izquierda = () => {
  const [datosResumen, setDatosResumen] = useState([]);
  const [datosVentas, setDatosVentas] = useState([]);

  useEffect(()=>{
    axios.get("/all_data")
    .then(res => setDatosResumen(res.data))

    axios.get("/statisticspayments")
    .then(res => setDatosVentas(res.data))
  },[])

  return (
    <>
      <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
        <ResumenInfo datos={datosResumen} />
        <GraficoLineal datos={datosVentas} />
      </section>
    </>
  )
}

export default Izquierda