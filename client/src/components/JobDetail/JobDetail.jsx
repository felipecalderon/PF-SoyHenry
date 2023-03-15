import React ,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllJobInfo } from "../../redux/slices/postSlices";


const JobDetail = ({jobId}) => {
const dispatch = useDispatch();

useEffect(()=>{
  const fetchJobInfo= async ()=>{
  const response = await fetch(`http://localhost:3001/jobs?language=javascrip`);
  const data = await response.json();
  dispatch(getAllJobInfo(data));
};
fetchJobInfo();
}, [dispatch])

    return (
      <div className="bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="" alt="Job Posting" />
            </div>
            <div className="p-8">
            <span class="material-symbols-outlined">star_rate</span>  {/* como solucionar */}
              <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold">{jobId?.idEmpresa}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{jobId?.title}</h2>
              <div>{jobId?.modality}</div>
              <p className="mt-2 text-gray-600">{jobId?.description}</p>
              <div>{jobId?.benefits}</div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Requisitos</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>{jobId?.perks[0]}</li>
                  <li>{jobId?.perks[1]}</li>
                  <li>{jobId?.perks[2]}</li>
                </ul>
              </div>
              <div>Rango salarial: {jobId?.min_salary && jobId?.max_salary}</div>
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