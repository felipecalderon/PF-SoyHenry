import React ,{ useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPostulacion, getDataEmpresa } from "../../redux/slices/postSlices";
import useFetch from '../Hooks/useFetch'

const JobDetail = () => {
const dispatch = useDispatch();
const query = new URLSearchParams(window.location.search);
const title = query.get('title');
const {jobId} = useSelector((state) => state.postSlice)
const {id} = useParams()
const url = `/jobs/${id}?title=${title}`
const {data} = useFetch(url)
const [empresa, setEmpresa] = useState(null)
const jobDescriptionHTML = { __html: jobId?.description };
const jobBenefitsHTML = { __html: jobId?.benefits };

useEffect(() => {
  if(data) dispatch(getDataPostulacion(data))
}, [data])

    if(!jobId) return null
    
    return (
      <div className="bg-primary-light dark:bg-primary-dark py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {/* <img className="h-48 w-full object-cover md:w-48 flex justify-center items-center" src={empresa ? empresa.logo : null} alt="Job Posting" /> */}
            </div>
            <div className="p-8">
            {/* <span className="material-symbols-outlined">star_rate</span> ver como medir el "valor/renking" de la empresa  */}
              <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold">{empresa ? empresa.name : null}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{jobId.title}</h2>
              <h3 className="text-gray-600 dark:text-gray-300">Modalidad: {jobId.modality?.split("_").join(" ")}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={jobDescriptionHTML}></p>
              <h3 className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={jobBenefitsHTML}></h3>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Requisitos</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
                {jobId?.perks?.map((requisito) => {
                  return <li key={requisito}>{requisito?.split("_").join(" ")}</li>
                }).slice(0,3)}
              
                </ul>
              </div>
              <h4 className="text-gray-600 dark:text-gray-300">
                  Rango salarial: 
                   {jobId.min_salary === jobId.max_salary 
                    ? jobId.min_salary 
                     : `${jobId.min_salary}-${jobId.max_salary}`
                   }
              </h4>
              <div className="mt-8">
                <button className="bg-purple-400 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full">
                  Aplicar 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default JobDetail;