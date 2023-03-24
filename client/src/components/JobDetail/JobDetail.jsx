import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPostulacion, getDataEmpresa } from "../../redux/slices/postSlices";
import useFetch from '../Hooks/useFetch'
import { NavCards } from "../Cards/Nav/NavCards";
import Footer from "../Footer/Footer";
import { spinnerPurple } from "../Cards/spinner";
import {addFavorites} from "../../redux/slices/userRegisterSlice"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Validacion del usuario 
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import fbapp from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';


const JobDetail = () => {
  // Obtenemos la instancia de Firebase Auth
  const auth = getAuth(fbapp);
  const [user] = useAuthState(auth);
  const navigate = useNavigate()
  
  // valida si el usuario inicio sesion 
  if (!user) {
    spinnerPurple();
    navigate('/');
  }
  
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const title = query.get('title');
  const { jobId } = useSelector((state) => state.postSlice);
  const { id } = useParams();
  const url = `/jobs/${id}?title=${title}`;
  const { data, isLoading } = useFetch(url);
  const [empresa, setEmpresa] = useState(null);

  const jobBenefitsHTML = { __html: jobId?.benefits };
  const jobFunctionsHTML = { __html: jobId?.functions };
  const jobRequerimentsHTML = { __html: jobId?.requeriments }


  useEffect(() => {
    window.scrollTo(0, 0); // Llamamos a scrollTo() para desplazarnos al inicio
    if (data) dispatch(getDataPostulacion(data))
  }, [data, dispatch])

  const handleAddFavorite = (favorite)=>{
    dispatch(addFavorites(favorite))
  }
  
  if (!jobId) return spinnerPurple()
  if (isLoading) return spinnerPurple()

  return (
    <div className="bg-primary-light dark:bg-secondary-dark">
      <NavCards />
      {/* Datos de la empresa */}
      {/* <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48 flex justify-center items-center" src={empresa ? empresa.logo : null} alt="Job Posting" />
          <span className="material-symbols-outlined">star_rate</span> ver como medir el "valor/renking" de la empresa 
          <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold">
            {empresa ? empresa.name : null}
          </div>
        </div> */}
      {/* Detalles de la oferta */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8 dark:bg-gray-800">
        <div className="md:flex">
          <div className="p-8">
            <h1 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white mb-4">{jobId.title}</h1>
            <section className="flex my-4">
            {jobId.modality &&
                   <h3 className="text-gray-600 dark:text-gray-300">
                   Modalidad: {jobId.modality?.split("_").join(" ")}
                   </h3>
              }
              <h3 className="text-lg font-semibold dark:text-white">
                Rango salarial:
                {
                  !jobId.min_salary && !jobId.min_salary ? <p className="inline mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" > No Especificado </p>
                    : jobId.min_salary === jobId.max_salary
                      ? jobId.min_salary
                      : <p className="inline mt-2 text-gray-800 dark:text-gray-400 text-base font-normal"> ${jobId.min_salary} - ${jobId.max_salary}usd </p>
                }
              </h3>
            </section>
            { jobId.benefits && <>
              <h2 className="text-lg font-semibold dark:text-white"> Beneficios </h2>
            <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobBenefitsHTML}></h3>
            </>
            }
            <br />
            { jobId.functions && <>
              <h2 className="text-lg font-semibold dark:text-white"> Funciones a realizar </h2>
            <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobFunctionsHTML}></h3>
            </>
            }
            <br />
            { jobId.requeriments && <>
            <h2 className="text-lg font-semibold dark:text-white">Requisitos</h2>
            <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobRequerimentsHTML}></h3>
            </>}
           
            <br />
            {jobId.perks && jobId.perks.length > 0 && <>
            <h2 className="text-lg font-semibold dark:text-white"> Ventajas </h2>
            <ul className="list-disc list-inside mt-2 text-gray-800 dark:text-gray-400">
              {jobId?.perks?.map((ventajas) => {
                return <li key={ventajas}>{ventajas?.split("_").join(" ")}</li>
              }).slice(0, 3)}
            </ul>
              </>}
            <div className="mt-8 flex justify-center">
              <button className="bg-purple-400 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full">
                Aplicar
              </button>

              <Box >
                <Fab color="red" 
                  aria-label="add" 
                  className="ml-4"
                  onClick={() => handleAddFavorite(jobId)}>
                  < FavoriteBorderIcon />

                </Fab>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

             

export default JobDetail;