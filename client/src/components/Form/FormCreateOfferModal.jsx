import React from "react";

const ModalConfirmChanges = ({isVisible, onClose, children}) => {
    if (!isVisible) return null;

    const handleClose = (event) => {
        if (event.target.id === 'wrapper') onClose();
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50' id='wrapper' onClick={handleClose}>
            <div className="w-auto flex relative">
                <div>{children}</div>
            </div>
        </div>
    )
}

export default ModalConfirmChanges