import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPostulacion, getDataEmpresa, getPostulate } from "../../redux/slices/postSlices";
import useFetch from '../Hooks/useFetch'
import { NavCards } from "../Cards/Nav/NavCards";
import Footer from "../Footer/Footer";
import { spinnerPurple } from "../Cards/spinner";
import {addFavorites} from "../../redux/slices/userRegisterSlice"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";

// Validacion del usuario 
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import fbapp from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Perks from "./Perks";


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
  
  const dataUserLocal = localStorage.getItem("userLogin"); 
  const dataUser = JSON.parse(dataUserLocal);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Llamamos a scrollTo() para desplazarnos al inicio
    if (data) dispatch(getDataPostulacion(data))
  }, [data, dispatch])
  
  const [isFavorite, setIsFavorite] = useState("");
  const favFilter = axios.get(`/fav_company/${dataUser.id}`)
  .then( (res)=> res.data.filter((cb) => cb.offerId === jobId.id ))
  
  !favFilter ? setIsFavorite("save") : setIsFavorite("unsave")
  const offersFav = {offerId: jobId&&jobId.id , fav: isFavorite}

  if (!jobId) return spinnerPurple()
  if (isLoading) return spinnerPurple()
  
   

  const handleToggleFavorite = () => {
    axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=${isFavorite}`) // guarda favorito o desmarca favorito
  };


  const handlePostulate = () => {
    const offerId = jobId.id
    const userId = dataUser.id
    axios.put(`/rel_offers/${offerId}/${userId}?state=send`)
    alert(`Enhorabuena! has aplicado a la oferta "${jobId.title}" `)
  };

  // obtener perks en español desde la api getonbrd
  const [perksApi, setPerksApi] = useState([])
    useEffect(() => {
        axios.get('https://www.getonbrd.com/api/v0/perks')
            .then(res => setPerksApi(res.data.data))
    }, [])

  // filtrar según las perks que tenga la oferta de trabajo
  const cleanPerks = perksApi?.filter((perk) => jobId?.perks?.includes(perk.id)).map(perk => perk.attributes.name)
  
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
      <div className="flex justify-center max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8 dark:bg-gray-800">
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
            <h2 className="text-lg font-semibold dark:text-white py-3"> Ventajas </h2>
            <div className="flex flex-row flex-wrap gap-3">
              {cleanPerks?.map((ventajas) => { 
                return <Perks perk={ventajas} />
              })}
            </div>
            <div className="mt-8 flex justify-center">
              {
                Number(jobId.id)
                  ? <button onClick={handlePostulate} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Aplicar
                    </span>
                  </button>
                  : <a href={jobId.link} target="_blank" rel="noreferrer" >
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Aplicar en la Pagina
                      </span>
                    </button>
                  </a>
              }
               <Box >
              <Fab
              sx={{ backgroundColor: isFavorite === "save" ? 'red' : 'white' }}
               aria-label="like"
               onClick={handleToggleFavorite}
              >
                {isFavorite ? <FavoriteBorderIcon />  : <FavoriteIcon />}
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