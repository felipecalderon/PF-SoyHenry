import { Link } from "react-router-dom"


const Card = ({ title, description, id, modality, salario_minimo, salario_maximo }) => {

  let salaryRange = null;
  if (salario_minimo === salario_maximo) {
    salaryRange = salario_minimo
  } else {
    salaryRange = `${salario_minimo} - ${salario_maximo}`
  }

  function recortarTexto(texto, longitudMaxima) {
    if (texto.length > longitudMaxima) {
      return texto.substring(0, longitudMaxima) + "...";
    } else {
      return texto;
    }
  }
  return (
    <div >
      <div className=" inline-block max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-96 ">
        <Link to={`/detail/${id}?title=${title}`}>
          <div className="relative w-1/6 mx-auto">
            <img src="https://cdn-icons-png.flaticon.com/512/9968/9968834.png" alt="Imagen" className="h-auto" />
            <div className="absolute inset-0 bg-yellow-300 mix-blend-difference opacity-100 rounded-full"></div>
          </div>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: recortarTexto(description, 200) }}></p>

          <h3 className="text-gray-600 dark:text-gray-300">Modalidad: {
            modality?.split("_").join(' ')
          }</h3>
          {
            salaryRange !== 0 && salaryRange && (
              <h4 className="text-gray-600 dark:text-gray-300">
                Rango salarial: { salaryRange }
              </h4>
            )
          }
        </Link>
      </div>
    </div>
  )
}

export default Card