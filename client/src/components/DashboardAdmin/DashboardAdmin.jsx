import { NavLanding } from '../NavLanding/NavLanding';
import Left from './Panelder';
import Rigth from './Panelizq';
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
                <h2 className="text-center pt-6 mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
                    Panel de Adminisitración
                </h2>
            <section className="py-10 w-full flex flex-row flex-wrap text-center bg-secondary-light dark:bg-primary-dark">
                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                    <Left /> 
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                    <Rigth />
                </div>
            </section>
            </div>
    </>
    )
}

export default DashAdmin