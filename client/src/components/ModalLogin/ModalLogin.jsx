import React from "react"
import facebook from '../../assets/facebook.png'
import googlelogo from '../../assets/googlelogo.png'
import github from '../../assets/github.png'


export const ModalLogin = ({isOpen, setOpen}) => {

    const closeModal = () => {
        setOpen(false)
    }

    const handleModalContainerClick = (event) => event.stopPropagation() //.stopPropagation hace que no se cierre el modal al hacer click dentro

    if(!isOpen) return null
    return (
        <div className='relative mt-5'>
            <article className='flex justify-center' onClick={closeModal}>
                <div className="bg-yellow-200 w-96 h-auto rounded-3xl" onClick={handleModalContainerClick}>
                        <h3 className="text-center font-medium text-2xl px-4 py-0 mb-2 mt-2 drop-shadow-md">Ingresar a Fusionajob</h3>
                    <form>
                        <div className='flex justify-center items-center'>
                            <input type='text' name='username' placeholder="Email:" className='mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                        </div>
                        <div className='flex justify-center items-center'>
                            <input type='password' name='password' placeholder="Contraseña:" className='mb-2 border-8 rounded-2xl w-80 h-12 px-2'></input>
                        </div>
                    </form>
                    <div className='flex ml-14'>
                        <button className='w-8 pt-32 mx-6'><img src={facebook} alt='flogo'/></button>
                        <button className='w-8 pt-32 mx-6'><img src={googlelogo} alt='glogo'/></button>
                        <button className='w-8 pt-32 mx-6'><img src={github} alt='ghlogo'/></button>
                    </div>
                    <div className='flex flex-col w-auto'>
                        <button className='hover:text-yellow-200 font-medium mx-auto w-full py-2 bg-indigo-600'>Ingresar</button>
                        <button className='hover:text-gray-400 font-medium text-sm mx-auto w-full py-2 bg-lime-900'>No tengo cuenta</button>
                    </div>
                </div>
            </article>
        </div>
    )
}