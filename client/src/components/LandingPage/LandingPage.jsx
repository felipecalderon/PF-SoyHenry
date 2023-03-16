import React from 'react'
import work1 from "../../assets/working1.png"
import work2 from "../../assets/working2.png"
import subscripciones from "../../assets/subscripciones.png"
import Anna from "../../assets/Anna.png"
import Maria from "../../assets/Maria.png"
import Juan from "../../assets/Juan.png"
import Footer from '../Footer/Footer'



import { NavLanding } from '../NavLanding/NavLanding'
import "./LandingPage.css"



function LandingPage() {
  return (
    <div>
    <NavLanding/>
    <section className='section1-landing-page'>
      <div className='section1-img-container'><img src={work1} alt="" /></div>
      <div className='text-container'>
        <h2 className=''>Encuentra tu trabajo ideal aquí</h2>
        <p>Únete ahora a nuestra plataforma y comienza a encontrar oportunidades de trabajo que se ajusten a tu perfil y habilidades</p>
        <span className='call-to-action'>Comienza Ahora!</span>
      </div>
    </section>
    <section className='section2-landing-page'>
      <div className='text-container'>
        <div className='card'>
          <p>La búsqueda y contratación laboral pueden ser complicadas: encontrar trabajos adecuados, información sobre empresas, candidatos cualificados y coordinar entrevistas puede ser un reto. Fusionajob simplifica todo esto con una plataforma en línea fácil de usar que conecta a candidatos con empleadores de manera eficiente y efectiva. ¡Encuentra tu trabajo ideal con Fusionajob!</p>
        </div>
        </div>
    <div className='section2-img-container'>
      <img src={work2} alt="" /></div>
    </section>
 
    <section className='soluciones'>
      <h2>Como  Fusionajob ayuda a solucionar estos problemas</h2>
      <section className='section-soluciones'>
        <article>
          <h2>Empresa</h2>
          <ul>
            <li>Facilita la comunicación entre empleadores y candidatos:
              permite a los empleadores y candidatos interactuar y coordinar entrevistas y otros detalles.</li>
            
            <li>Ayuda a los empleadores a encontrar al candidato adecuado</li>
          </ul>
          </article>
        <article>
        <h2>Candidato</h2>

          <ul>
            <li>Simplifica el proceso de búsqueda de trabajo</li>
       <li>permitirles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente</li>
   </ul>
        </article>
      </section>

    </section>
    <section className="section-testimonios">
        <h2 className='title-testimonios'>Testimonios</h2>
      <section className='testimonios'>

        <article>
          <img src={Anna} width="420px" className='img-testimonio' alt='testimonio-ana'/>
        <h2>Anna</h2>
            <p>Gracias a Fusionajob conseguí mi trabajo soñado. ¡Lo recomiendo totalmente!</p>
        </article>
        <article>
          <img src={Maria} width="420px" className='img-testimonio' alt='testimonio-Maria'/>
            <h2>María</h2>
            <p>Nunca había sido tan fácil encontrar trabajo hasta que encontré Fusionajob. ¡Gracias por hacerlo posible!</p>
          </article>
        <article>
          <img src={Juan} width="420px" className='img-testimonio' alt='testimonio-Juan'/>
            <h2>Juan</h2>
            <p>Fusionajob me ayudó a conseguir mi primer trabajo después de graduarme.  ¡Increíble servicio de búsqueda laboral!</p>
        </article>
      </section>


    </section>
    <section className='section-subscripciones'>
      <h2>Subscripciones</h2>
      <img src={subscripciones} alt="" />
      </section>
      <Footer/>

    </div>
  )
}

export default LandingPage



function Tabla() {
  const filas = [
    { titulo: '', columna1: 'Free', columna2: 'Premium', columna3: 'Pro' },
    { titulo: 'Funciones Básicas', columna1: 'Ok', columna2: 'Ok', columna3: 'Ok' },
    { titulo: 'Acceso Completo', columna1: 'No', columna2: 'Ok', columna3: 'Ok' },
    { titulo: 'Asesoramiento de un Profesional', columna1: 'No', columna2: 'No', columna3: 'Ok' }
  ];

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Free</th>
          <th>Premium</th>
          <th>Pro</th>
        </tr>
      </thead>
      <tbody>
        {filas.map((fila, index) => (
          <tr key={index}>
            <th>{fila.titulo}</th>
            <td>{fila.columna1}</td>
            <td>{fila.columna2}</td>
            <td>{fila.columna3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}