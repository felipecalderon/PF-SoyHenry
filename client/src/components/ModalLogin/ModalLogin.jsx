import React from "react"

export const ModalLogin = ({children, isOpen, closeModal}) => {

    const handleModalContainerClick = (event) => event.stopPropagation()

    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalContainerClick}>
                <button className="modal-close" onClick={closeModal}>X</button>
                {children}
            </div>
        </article>
    )
}