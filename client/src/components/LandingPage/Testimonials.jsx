import { useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Maria from "../../assets/Maria.png"
import axios from "axios";

const Testimonials = () => {
  const [testimonios, setTestimonios] = useState([])    

  useEffect(() => {
    axios('/review')
      .then(res => {
        setTestimonios(res.data)
      })
    
    
  }, [])
    const testimoniosHTML = testimonios.map(testimonio => {
      return <div className="max-w-screen-md mx-auto text-center" key={testimonio.id}>
          <svg
            aria-hidden="true"
            className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
              "{testimonio.comentario}"
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={testimonio.photo}
              alt="test" />
          <p className="italic text-gray-900 dark:text-white">
              "{testimonio.usuario}"
            </p>
        </figcaption>
      </div>
    })
    if(testimonios.length === 0) return null
    return (
    <section className="py-10 w-full flex flex-col flex-wrap bg-secondary-light dark:bg-primary-dark">
      <h2 className="pt-3 text-center mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Comentarios de Fusionistas</h2>
      <p className="text-center mb-6 text-lg font-normal text-gray-700 lg:text-xl pr-10 dark:text-gray-400">Esto comentan los usuarios de FusionaJobs</p>
      <AliceCarousel
        mouseTracking
        infinite={true}
        autoPlayInterval={3000}
        autoPlay={true}
        items={testimoniosHTML}
        controlsStrategy="alternate"
      />
    </section>
    )
    }

export default Testimonials