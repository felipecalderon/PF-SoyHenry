import { useEffect, useState } from "react"
import ListaUsuarios from "./TablaUsuarios"
import axios from "axios"
import FormularioPostulante from "../Registro/FormularioPostulante"


const Derecha = ({datos}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
    return (
    <>
        <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
        <ListaUsuarios datos={datos} />
        {/* <FormularioPostulante handleOpen={handleOpen}/> */}
        </section>
    </>
    )
}

export default Derecha