import React from "react";
import { NavLanding } from "../NavLanding/NavLanding";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
function Terminosdeservicio() {
  const navigate = useNavigate();
  return (
    <>
      <NavLanding />
      <div className="flex flex-col  bg-primary-light  dark:bg-secondary-dark pt-20 pb-2">
        <div className="mx-20 pb-20">
          <button
            type="button"
            className=" text-white  bg-secondary-light  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => navigate(-1)}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Icon description</span>
            volver
          </button>
          <h2 className="text-3xl font-bold mb-4    text-gray-800 dark:text-gray-400 ">
            Términos y Condiciones de FusionaJob
          </h2>

          <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
            Bienvenido/a a FusionaJob, una plataforma en línea dedicada a la
            publicación y postulación de ofertas de empleo. Por favor, lee
            detenidamente estos términos y condiciones antes de utilizar nuestro
            servicio. Al acceder y utilizar nuestra plataforma, aceptas estos
            términos y condiciones en su totalidad. Si no estás de acuerdo con
            estos términos y condiciones, por favor, no utilices nuestro
            servicio.
          </p>
          <br />
          <br />
          <ul className=" mb-6">
            <li className="mb-2">
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Descripción del servicio
              </span>{" "}
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                FusionaJob es una plataforma en línea que permite a los usuarios
                publicar y buscar ofertas de empleo. Los usuarios gratuitos
                tienen acceso a un filtrado simple de empleos de una base de
                datos externa, mientras que los usuarios premium tienen acceso a
                un filtrado simple y avanzado de empleos de una base de datos
                externa e interna. Los usuarios premium también pueden guardar
                un número ilimitado de ofertas durante el tiempo que dure su
                suscripción.
              </p>
            </li>

            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Contenido de la plataforma
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                FusionaJob no es responsable de la precisión, integridad,
                legalidad, fiabilidad, relevancia o disponibilidad de las
                ofertas de empleo publicadas por los usuarios. Los usuarios son
                responsables de garantizar que el contenido de sus publicaciones
                sea preciso, no infrinja los derechos de terceros y cumpla con
                las leyes y regulaciones aplicables.
              </p>
            </li>
            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Propiedad intelectual
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                FusionaJob es propiedad de Fusionajob y está protegido por las
                leyes de propiedad intelectual. Todos los derechos de propiedad
                intelectual relacionados con la plataforma y su contenido son
                propiedad de Fusionajob. Los usuarios no están autorizados a
                copiar, reproducir, modificar, distribuir, transmitir, exhibir o
                vender cualquier contenido de la plataforma sin el
                consentimiento expreso por escrito de Fusionajob.
              </p>
            </li>
            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Responsabilidad y garantías
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                FusionaJob no garantiza que el servicio sea ininterrumpido,
                seguro, libre de errores, preciso, completo, actualizado o
                adecuado para un propósito particular. FusionaJob no se hace
                responsable de cualquier daño o perjuicio que pueda surgir del
                uso o la imposibilidad de usar la plataforma. Los usuarios son
                responsables de su propio contenido y FusionaJob no se hace
                responsable de cualquier reclamo, demanda o daño que surja del
                contenido publicado por los usuarios.
              </p>
            </li>

            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Suscripción y pago
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                Los usuarios pueden optar por una suscripción gratuita o una
                suscripción premium por un costo de $15 por mes. Los usuarios
                premium tienen acceso a todas las funciones de la plataforma
                durante un mes desde la fecha de pago. La renovación automática
                de la suscripción es opcional y puede ser cancelada en cualquier
                momento.
              </p>
            </li>

            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Modificaciones y cambios
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                FusionaJob se reserva el derecho de modificar, cambiar,
                suspender o interrumpir el servicio en cualquier momento y sin
                previo aviso. Los cambios en los términos y condiciones serán
                efectivos a partir de su publicación en la plataforma.
              </p>
            </li>

            <li>
              <br />
              <br />
              <span className="font-bold mb-6 inline  text-gray-800 dark:text-gray-400 text-base  ">
                Ley aplicable
              </span>
              <br />
              <br />
              <p className="mb-6 inline  text-gray-800 dark:text-gray-400 text-base font-normal">
                Estos términos y condiciones se rigen por las leyes del país
                donde se encuentra Fusionajob. Los usuarios aceptan que
                cualquier disputa o reclamo relacionado con el servicio será
                resuelto por un tribunal competente en Argentina .
              </p>
            </li>
            <br />
            <br />
          </ul>
          {/* <h2 className="mb-6 inline  text-gray-800 dark:text-gray-400 text-xl font-bold">
            Si tienes alguna pregunta o comentario sobre estos términos y
            condiciones, por favor contáctanos a través de
            <button className="text-secondary-light dark:text-primary-dark hover:underline ml-2">
              {" "}
              nuestra seccion PQRS
            </button>
          </h2> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terminosdeservicio;
