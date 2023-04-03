import React from "react";

const ModalConfirmChanges = ({isVisible, onClose, children}) => {
    if (!isVisible) return null;

    const handleClose = (event) => {
        if (event.target.id === 'wrapper') onClose();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className="w-[700px] flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={()=> onClose()}>X</button>
                <div className="bg-white p-2 rounded">{children}</div>
            </div>
        </div>
    )
}

export default ModalConfirmChanges