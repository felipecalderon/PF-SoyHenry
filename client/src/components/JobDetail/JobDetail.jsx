import React ,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllJobInfo } from "../../redux/slices/postSlices";
import useFetch from '../Hooks/useFetch'

const JobDetail = (props) => {
const dispatch = useDispatch();
const params = useParams()
const {jobId} = useSelector((state) => state.postSlice)
const url = `http://localhost:3001/jobsdb/${params}`
const {data} = useFetch(url)

useEffect(() => {
  if(data) dispatch(getAllJobInfo(data))
}, [dispatch, data])

    if(!jobId) return null
    
    return (
      <div className="bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="" alt="Job Posting" />
            </div>
            <div className="p-8">
            <span class="material-symbols-outlined">star_rate</span>  {/* como solucionar */}
              <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold">{jobId.idEmpresa}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{jobId.title}</h2>
              <div>{jobId.modality}</div>
              <p className="mt-2 text-gray-600">{jobId.description}</p>
              <div>{jobId.benefits}</div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Requisitos</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                {
                jobId?.perks?.map((requisito) => {
                  return <li key={requisito}>{requisito}</li>
                }).slice(0,3)
                }
                </ul>
              </div>
              <div>Rango salarial: {jobId.min_salary && jobId.max_salary}</div>
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