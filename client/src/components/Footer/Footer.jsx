import React, { useEffect, useState } from 'react'
import { ModalLogin } from "../ModalLogin/ModalLogin";
import "./Footer.css"
import FeedbackGeneralForm from '../Feedback/FeedbackGeneralForm';
import { Navigate, useNavigate } from 'react-router-dom';
import ContactForm from './ContacForm';

function Footer() {
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    const navigate=useNavigate()


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        if (!userData) localStorage.setItem('modalFeedback', true)
    }
    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('modalFeedback')
    }

    const [openContact, setOpenContact] = useState(false)
    const handleContactOpen = () => {
        setOpenContact(true)
        if (!userData) localStorage.setItem('modalContact', true)
    };
    const handleContactClose = () => {
        setOpenContact(false)
        localStorage.removeItem('modalContact')
    };

    useEffect(() => {
        if (localStorage.getItem('modalFeedback') && userData) {
            setOpen(true)
        };
        if (localStorage.getItem('modalContact') && userData) {
            setOpenContact(true)
        };
    }, []) // eslint-disable-line

    const SVG_FACEBOOK = <svg className='dark:text-white' width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    const SVG_INSTAGRAM = <svg className='dark:text-white' width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <path d="M17.5 6.5h.01"></path>
    </svg>
    const SVG_LINKEDIN = <svg className='dark:text-white' width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <path d="M2 9h4v12H2z"></path>
        <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"></path>
    </svg>

    return (
        <footer className='dark:bg-primary-dark dark:text-white '>
            <hr />
            <div className="pt-4">
                <section className='footer-section1'>
                    <article>
                        <ul className='firts-list'>
                            <li className='dark:text-white'  onClick={()=>navigate("/about")}>Sobre Nosotros</li>
                            <li className='dark:text-white' >
                                <button onClick={handleOpen}>
                                    Feedback
                                </button>
                            </li>                        
                        </ul>
                    </article>
                <section>                
                    <ul className='list-redes-sociales'>
                        <li className="px-2">{SVG_FACEBOOK}</li>
                        <li className="px-2">{SVG_LINKEDIN}</li>
                        <li className="px-2">{SVG_INSTAGRAM}</li>
                    </ul>                
                </section>
                    <article>
                        <ul className='second-list'>
                            <li className='dark:text-white'  onClick={()=>navigate("/terminosdeservicio")}>Terminos de servicio</li>
                            <li className='dark:text-white' >
                                <button onClick={handleContactOpen}>
                                    Ayuda y soporte 
                                </button>
                            </li>
                        </ul>
                    </article>
                </section>            
                <h2 className="mb-2"><b > © 2023 FusionaJob </b></h2>
            </div>
            {
                userData
                    ? <FeedbackGeneralForm open={open} handleClose={handleClose} handleContactOpen={handleContactOpen} data={userData} />
                    : <ModalLogin isOpen={open} setOpen={setOpen} />
            }
            <ContactForm open={openContact} handleClose={handleContactClose} data={userData} />
        </footer>
    )
}

export default Footer