import { Link } from "react-router-dom"


const Card = ({title, description, id, modality, salario_minimo, salario_maximo}) => {

 let salaryRange = null;
 if(salario_minimo === salario_maximo){
    salaryRange = salario_minimo
 }else{
    salaryRange = `${salario_minimo} - ${salario_maximo}`
 }

    // const showSalaryRange = salario_minimo && salario_maximo;
    return (
    <div className="max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative w-1/6 mx-auto">
            <img src="https://cdn-icons-png.flaticon.com/512/9968/9968834.png" alt="Imagen" className="h-auto" />
            <div className="absolute inset-0 bg-yellow-300 mix-blend-difference opacity-100 rounded-full"></div>
        </div>
        
        <Link to={`/detail/${id}`}>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: description }}></p>

        <h3 className="text-gray-600 dark:text-gray-300"> {modality}</h3>
        {salaryRange && (
        <h4 className="text-gray-600 dark:text-gray-300">
          Rango salarial: {salaryRange}
        </h4>
      )}
        <Link className="inline-flex items-center dark:text-blue-300 hover:underline text-blue-900">
            click aquí para postular
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
        </Link>
    </div>
    )
}

export default Card