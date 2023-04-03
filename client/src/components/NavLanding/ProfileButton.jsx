import { useState } from "react";
import { ModalLogin } from "../ModalLogin/ModalLogin";
import { Login } from '@mui/icons-material'

const ProfileBtn = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => { setOpen(!open) }} className="py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2">
                <Login />
                <span className="pl-3">Ingresar</span>
            </button>
            <ModalLogin isOpen={open} setOpen={setOpen} />
        </>
    )
}

export default ProfileBtn