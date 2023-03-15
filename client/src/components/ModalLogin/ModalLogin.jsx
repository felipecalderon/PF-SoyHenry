import React from "react"

export const ModalLogin = ({isOpen, setOpen}) => {

    const closeModal = () => {
        setOpen(false)
    }

    const handleModalContainerClick = (event) => event.stopPropagation() //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null
    return (
        <div className='relative'>
            <article className='flex justify-center' onClick={closeModal}>
                <div className="bg-yellow-200 w-96 h-72 rounded-3xl" onClick={handleModalContainerClick}>
                    <h3 className="flex justify-center font-medium text-2xl px-4 py-0 mb-2 mt-2 drop-shadow-md">Ingresar a Fusionajob</h3>
                <div className='flex justify-center items-center'>
                    <input type='text' name='username' placeholder="Email:" className='mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                </div>
                <div className='flex justify-center items-center'>
                    <input type='password' name='password' placeholder="Contraseña:" className='flex mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                </div>
                    <button><img src=''/></button>
                    <button></button>
                    <button></button>
                    <button className='flex hover:text-yellow-200 font-medium px-40 py-2'>Ingresar</button>
                    <button className='flex hover:text-gray-400 font-medium text-sm pl-32 py-2'>No tengo cuenta</button>
                </div>
            </article>
        </div>
    )
}