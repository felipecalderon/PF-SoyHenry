import React from 'react'
import work1 from "../../assets/working1.png"
import work2 from "../../assets/working2.png"
import subscripciones from "../../assets/subscripciones.png"
import Anna from "../../assets/Anna.png"
import Maria from "../../assets/Maria.png"
import Juan from "../../assets/Juan.png"
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { NavLanding } from '../NavLanding/NavLanding'
import "./LandingPage.css"



function LandingPage() {
  const checkmark=<svg width="46" height="26" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm5.074 6.482-6.3 7.5a.748.748 0 0 1-.562.268h-.013a.75.75 0 0 1-.557-.248l-2.7-3a.751.751 0 0 1 .88-1.186c.09.045.17.107.234.182l2.123 2.36 5.747-6.84a.75.75 0 0 1 1.148.964Z"></path>
</svg>
const navigate=useNavigate()
  return (
    <div>
    <NavLanding/>
    <section className='section1-landing-page'>
      <div className='section1-img-container'><img src={work1} alt="" /></div>
      <div className='text-container'>
        <h2 className='section1-h2'>Encuentra tu trabajo ideal aquí</h2>
        <p className='section1-p'>Únete ahora a nuestra plataforma y comienza a encontrar oportunidades de trabajo que se ajusten a tu perfil y habilidades</p>
        <span className='call-to-action' onClick={()=>navigate("/registro")}>Comienza Ahora!</span>
      </div>
    </section>
    <section className='section2-landing-page'>
      <div className='text-container'>
        <div className='card'>
        <ul className='section2-ul'>
          <li>
            <h2 className='section2-list-h2'>{checkmark}Ahorra tiempo y esfuerzo</h2>
            <p className='section2-list-p'>publica o busca trabajos en minutos.</p>
          </li>
          
          <li>
            <h2 className='section2-list-h2'>{checkmark}Amplía tu alcance</h2>
            <p className='section2-list-p'>encuentra o publica trabajos que se ajusten a tus necesidades y habilidades.</p>
          </li>
          
          <li>
            
            <h2 className='section2-list-h2'>{checkmark}Mejora tus posibilidades</h2>
             <p className='section2-list-p'>aumenta tus opciones al buscar o seleccionar entre una amplia variedad de trabajos o solicitantes de empleo.</p>
          </li>
        </ul>
        </div>
        </div>
      <img src={work2} alt="" />

    </section>
 
    <section className='section3 soluciones'>
      <h2 className='section3-h2' id='section3-h2'>FusionaJob: La solución completa para encontrar trabajo o candidatos</h2>
      <section className='section-soluciones'>
        <article className='soluciones-article'>
          <h2 className='section3-h2'>Empresa</h2>
          <ul  className="section3-ul">
            <li className='section3-ul-li'>{checkmark}
              Permite a los empleadores y candidatos interactuar y coordinar entrevistas y otros detalles.</li>
            
            <li className='section3-ul-li'>{checkmark}Ayuda a los empleadores a encontrar al candidato adecuado</li>
          </ul>
          <h2 className='section3-h2 section3-btn-registro' onClick={()=>navigate("/companyregister")}>Registrate como Empresa</h2>

          </article>
        <article className='soluciones-article'>
        <h2 className='section3-h2'>Candidato</h2>

          <ul className="section3-ul">
            <li className='section3-ul-li'>{checkmark} Simplifica el proceso de búsqueda de trabajo</li>
              <li  className='section3-ul-li'>{checkmark}Permitirles crear un perfil, subir su currículum y buscar trabajos de manera fácil y eficiente</li>
   </ul>
   <h2 className='section3-h2 section3-btn-registro' onClick={()=>navigate("/registro")}>Registrate como Candidato</h2>

        </article>
      </section>

    </section>
    <section className="section-testimonios">
        <h2 className='title-testimonios'>Testimonios</h2>
      <section className='testimonios'>

        <article className='testimonios-article'>
          <img src={Anna} width="420px" className='img-testimonio' alt='testimonio-ana'/>
        <h2>Anna</h2>
            <p>Gracias a Fusionajob conseguí mi trabajo soñado. ¡Lo recomiendo totalmente!</p>
        </article>
        <article className='testimonios-article'>
          <img src={Maria} width="420px" className='img-testimonio' alt='testimonio-Maria'/>
            <h2>María</h2>
            <p>Nunca había sido tan fácil encontrar trabajo hasta que encontré Fusionajob. ¡Gracias por hacerlo posible!</p>
          </article>
        <article className='testimonios-article'>
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