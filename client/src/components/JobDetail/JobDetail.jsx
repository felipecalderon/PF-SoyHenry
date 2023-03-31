import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPostulacion, getDataEmpresa } from "../../redux/slices/postSlices";
import useFetch from '../Hooks/useFetch'
import { NavLanding } from "../NavLanding/NavLanding"; 
import Footer from "../Footer/Footer";
import { spinnerPurple } from "../Cards/spinner";
import { addFavorites } from "../../redux/slices/userRegisterSlice"
import { Box, Fab, Snackbar } from "@mui/material";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import axios from "axios";
import Perks from "./Perks";
import { fetchEmpresaData } from "../../redux/actions/fetchEmpresa";
import { async } from "@firebase/util";
import { ClassSharp } from "@mui/icons-material";

const JobDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const title = query.get('title');
  const { jobId } = useSelector((state) => state.postSlice);
  const {empresaId} = useSelector((state)=> state.postSlice)
  const { id } = useParams();
  const url = `/jobs/${id}?title=${title}`;

  const { data, isLoading } = useFetch(url);
  const dataUserLocal = localStorage.getItem("userLogin")
  const dataUserGoogle = localStorage.getItem("usergoogle")
  const dataUser = JSON.parse(dataUserLocal);
  const jobBenefitsHTML = { __html: jobId?.benefits };
  const jobFunctionsHTML = { __html: jobId?.functions };
  const jobRequerimentsHTML = { __html: jobId?.requeriments }
  const menu =[
    {
      name:"Ofertas",
      link:"/offers"

  },
  {
    name: "Sobre Nosotros",
    link: "/about"
  }, 
]
const [empresa, setEmpresa] = useState(null);

useEffect(() => {
  if (empresaId) {
    axios.get(`/api/v0/companies/${empresaId}`)
      .then((response) => {
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [empresaId]);

console.log(empresa)
console.log(empresaId)

//FAVORITOS AHORA ES GUARDADOS
const [isPremium, setIsPremium] = useState(localStorage.getItem("userLogin"));
const [openSnackbar, setOpenSnackbar] = useState(false);
const [isFavorite, setIsFavorite] = useState(false);
const [favFilter, setFavFilter]  = useState([]);
const [savedOffers, setSavedOffers] = useState([]);

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};



const OffersSave = async() => {
const get = await axios.get(`/save_offers/${dataUser.id}`)
.then((res)=>res.data.find(cb => cb.offerId === jobId?.id))
if(get !== undefined) {
  return setIsFavorite(true)
}
return setIsFavorite(false)
}

OffersSave()

useEffect(()=>{
  axios.get(`/fav_company/${dataUser?.id}`)
  .then( (res)=> res.data.filter((cb) => cb.offerId === jobId?.id ))
  .then((res)=> setFavFilter(res))
},[dataUser?.id, jobId?.id]);


const handleToggleFavorite = () => {
  if (savedOffers.length >= 5 && isPremium === "false") {
    setOpenSnackbar(true);
   
    return;
  }
  if (!isFavorite) {
    Number(jobId.id)
      ? axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=save&title=${jobId.title}&origin=db`)
      : axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=save&title=${jobId.title}&origin=api`);
    setIsFavorite(true);
    setSavedOffers([...savedOffers, jobId.id]);
    alert('Se ha guardado la oferta');
  } else {
    Number(jobId.id)
      ? axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=unsave&title=${jobId.title}&origin=db`)
      : axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=unsave&title=${jobId.title}&origin=api`);
    setIsFavorite(false);
    setSavedOffers(savedOffers.filter((savedId) => savedId !== jobId.id));
    alert('Se ha eliminado la oferta de tu lista guardada');
  }
};





useEffect(() => {
  window.scrollTo(0, 0); // Llamamos a scrollTo() para desplazarnos al inicio
  if (data) {
    dispatch(getDataPostulacion(data));
    
  }
}, [data, dispatch, jobId?.companyId]);


  const handlePostulateDb = () => {
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
  
  useEffect(() => {
    if (!dataUserLocal && !dataUserGoogle) navigate('/')
  }, [])

  if (!jobId) return spinnerPurple()
  if (isLoading) return spinnerPurple()
  return (
    <div className="bg-primary-light dark:bg-secondary-dark pt-20">
    <NavLanding menu={menu}/>
    {/* Datos de la empresa */}
    <div className="md:flex-shrink-0">
      <img className="h-48 w-full object-cover md:w-48 flex justify-center items-center" src={empresa?.logo} alt="Job Posting" />
      <div className="uppercase tracking-wide text-xs text-gray-400 font-semibold">
        {empresa?.name}
      </div>
    </div>

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
            {jobId.benefits && <>
              <h2 className="text-lg font-semibold dark:text-white"> Beneficios </h2>
              <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobBenefitsHTML}></h3>
            </>
            }
            <br />
            {jobId.functions && <>
              <h2 className="text-lg font-semibold dark:text-white"> Funciones a realizar </h2>
              <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobFunctionsHTML}></h3>
            </>
            }
            <br />
            {jobId.requeriments && <>
              <h2 className="text-lg font-semibold dark:text-white">Requisitos</h2>
              <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={jobRequerimentsHTML}></h3>
            </>}

            <br />
            {jobId.perks &&
              <h2 className="text-lg font-semibold dark:text-white py-3"> Ventajas </h2>}
            <div className="flex flex-row flex-wrap gap-3">
              {cleanPerks?.map((ventajas) => {
                return <Perks perk={ventajas} />
              })}
            </div>
      
            <div className="mt-8 flex justify-center">
              {
                Number(jobId.id)
                  ? <button onClick={handlePostulateDb} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
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

                <Box>
                  <Fab
                    sx={{ backgroundColor: "lightblue" }}
                    aria-label="like"
                    onClick={handleToggleFavorite}
                  >
                    {isFavorite ? <TurnedInIcon /> : <TurnedInNotIcon />}
                  </Fab>
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    message="Solo puede guardar 5 ofertas de trabajo por tener el plan free"
                  />
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