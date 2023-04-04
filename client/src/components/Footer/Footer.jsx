import React, { useState } from 'react'
import { ModalLogin } from "../ModalLogin/ModalLogin";
import "./Footer.css"
import FeedbackGeneralForm from '../Feedback/FeedbackGeneralForm';
import { Navigate, useNavigate } from 'react-router-dom';

function Footer() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    const navigate=useNavigate()
    const SVG_FACEBOOK = <svg className='dark:text-white' width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    const SVG_INSTAGRAM = <svg className='dark:text-white' width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <path d="M17.5 6.5h.01"></path>
    </svg>
    const SVG_LINKEDIN = <svg className='dark:text-white' width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <path d="M2 9h4v12H2z"></path>
        <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"></path>
    </svg>
    return (
        <footer className='dark:bg-primary-dark dark:text-white '>
            <hr />
            <section className='footer-section1'>
                <article>
                    <ul className='firts-list'>
                        <li className='dark:text-white' >Sobre Nosotros</li>
                        <li className='dark:text-white' >
                            <button onClick={handleOpen}>
                                Feedback
                            </button>
                        </li>
                        <li>
                            <ul className='list-redes-sociales'>
                                <li>{SVG_FACEBOOK}</li>
                                <li>{SVG_LINKEDIN}</li>
                                <li>{SVG_INSTAGRAM}</li>
                            </ul>
                        </li>
                    </ul>
                </article>
                <article>
                    <ul className='second-list'>
                        <li className='dark:text-white'  onClick={()=>navigate("/terminosdeservicio")}>Terminos de servicio</li>
                        <li className='dark:text-white' >Ayuda y soporte</li>
                    </ul>
                </article>
            </section>
            <section>
                <h2><b> © 2023 FusionaJob </b></h2>
            </section>
            {
                userData 
                ? <FeedbackGeneralForm open={open} handleClose={handleClose} data={userData}  />
                : <ModalLogin isOpen={open} setOpen={setOpen} />
            }
        </footer>
    )
}

export default Footer