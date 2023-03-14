import React from 'react'
import work1 from "../../assets/working1.png"
import { Nav } from '../Nav/Nav'


function LandingPage() {
  return (
    <div>
    <Nav/>
    <section>
      <img src={work1} alt="" />
      <h2>Encuentra tu trabajo ideal aquí</h2>
      <p>Únete ahora a nuestra plataforma y comienza a encontrar oportunidades de trabajo que se ajusten a tu perfil y habilidades</p>
    </section>
    </div>
  )
}

export default LandingPage
