import { useNavigate } from "react-router-dom"
import {NavLanding} from "../NavLanding/NavLanding"
const ModalNewUser = () => {
    const navigate = useNavigate()
    return (
        <>
        <NavLanding />
        <div className="bg-primary-light dark:bg-secondary-dark flex h-screen justify-center items-center">
          <div className="text-center dark:text-white rounded-lg p-8 w-1/2 -mt-10">
            <h2 className="text-2xl font-medium mb-4">
              ¡Bienvenido a FusionaJob!
            </h2>
            <p className="font-medium">
              Vamos a proceder a completar tu cuenta. 
            </p>
            <p className="mb-4">
              Por favor selecciona la opción que más cumpla con tus necesidades
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-secondary-light dark:bg-primary-dark dark:text-white py-2 px-4 rounded-md"
                onClick={() => navigate('/registro')}
              >
                Quiero buscar empleos
              </button>
              <button
                className="bg-secondary-light dark:bg-primary-dark dark:text-white py-2 px-4 rounded-md"
                onClick={() => navigate('/companyregister')}
              >
                Quiero publicar ofertas de trabajo
              </button>
            </div>
          </div>
        </div>
      </>
      )
}

export default ModalNewUser