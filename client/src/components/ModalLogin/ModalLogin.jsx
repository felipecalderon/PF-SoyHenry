import React from "react"

export const ModalLogin = ({isOpen, setOpen}) => {

    const closeModal = () => {
        setOpen(false)
    }

    const handleModalContainerClick = (event) => event.stopPropagation() //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null
    return (
        <article className='flex justify-center' onClick={closeModal}>
            <div className="bg-yellow-200 w-72 h-72 modal-container" onClick={handleModalContainerClick}>
                <button className="flex relative hover:text-yellow-200 font-medium text-2xl px-4 py-0 mb-4 mt-2">Ingresar a Fusionajob</button>

                <label htmlFor='username' className='px-4'>Usuario: </label>
                <input type='text' name='username' className='mb-2'></input>
                
                <label htmlFor='password' className='px-1'>Contraseña: </label>
                <input type='password' name='password' className='mb-2'></input>

                <button className="flex hover:text-yellow-200 font-medium px-4 py-2">Ingresar</button>
                <button className="flex hover:text-yellow-200 font-medium px-4 py-2">No tengo cuenta</button>
            </div>
        </article>
    )
}