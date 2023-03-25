import { useState } from "react";
import { ModalLogin } from "../ModalLogin/ModalLogin";

const ProfileButton = ({perfil}) => {
    const [open, setOpen] = useState(false);
    return (
    <>
        <button onClick={() => {setOpen(!open)}} className="py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2">
              <img className="w-4 inline-block align-middle mr-2" src={perfil} alt='ingresar'/>
              Ingresar
        </button>
        <ModalLogin isOpen={open} setOpen={setOpen}/>
    </>
    )
}

export default ProfileButton