import { useState } from "react"
import ListaUsuarios from "./TablaUsuarios"
import FormularioPostulante from "../Registro/FormularioPostulante"
import FormularioRecluter from "../Registro/FormularioRecluter";
import FormularioAdmin from "./FormularioAdmin";
import AllOffersDb from "./AllOffersDb";

const Derecha = ({ datos, addpostulant, addRecluter, addAdmin, addOffers }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <section className="bg-secondary-light dark:bg-primary-dark m-5 py-3 px-2 border rounded-xl w-full flex flex-col">
        <div style={{display: addpostulant || addRecluter || addAdmin || addOffers? 'none' : 'block' }}>
          <ListaUsuarios datos={datos} />
        </div>
        <div className="w-full mt-4 bg-gray-100 rounded" style={{display: addpostulant ? 'block' : 'none'}}>
          <FormularioPostulante handleOpen={handleOpen} />
        </div>
        <div className="w-full mt-4 bg-gray-100 rounded" style={{display: addRecluter ? 'block' : 'none'}}>
          <FormularioRecluter handleOpen={handleOpen} />
        </div>
        <div className="w-full mt-4 bg-gray-100 rounded" style={{display: addAdmin ? 'block' : 'none'}}>
          <FormularioAdmin handleOpen={handleOpen} />
        </div>
        <div className="w-full mt-4 bg-gray-100 rounded" style={{display: addOffers ? 'block' : 'none'}}>
          <AllOffersDb handleOpen={handleOpen} />
        </div>
      </section>
    </>
  )
}

export default Derecha