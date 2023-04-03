import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDataPostulacion } from "../../redux/slices/postSlices";

// Components
import { NavLanding } from "../NavLanding/NavLanding";
import { spinnerPurple } from "../Cards/spinner";
import useFetch from '../Hooks/useFetch'
import Footer from "../Footer/Footer";
import Perks from "./Perks";

// Mui
import { Box, Fab, Snackbar } from "@mui/material";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import PremiumButtonComponent from "../BotonPremium/BotonPremium";

const JobDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const title = query.get('title');
  const { jobId } = useSelector((state) => state.postSlice);
  const { empresaId } = useSelector((state) => state.postSlice)
  const { id } = useParams();
  const url = `/jobs/${id}?title=${title}`;


  const { data, isLoading } = useFetch(url);
  const dataUserLocal = localStorage.getItem('userLogin')
  const dataUserGoogle = localStorage.getItem("usergoogle")
  const dataUser = JSON.parse(dataUserLocal);
  const jobBenefitsHTML = { __html: jobId?.benefits };
  const jobFunctionsHTML = { __html: jobId?.functions };
  const jobRequerimentsHTML = { __html: jobId?.requeriments }
  const menu = [
    {
      name: "Ofertas",
      link: "/offers"

    },
    {
      name: "Sobre Nosotros",
      link: "/about"
    },
  ]


  const [empresa, setEmpresa] = useState(null);
  useEffect(() => {
    if (data?.idEmpresa) {
      axios.get(`https://www.getonbrd.com/api/v0/companies/${data?.idEmpresa}`)
        .then((response) => {
          setEmpresa(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  const [empresaApi, setEmpresaApi] = useState()
  console.log(empresaApi)
  useEffect(() => {
    if (jobId?.id) {
      axios.get(`/jobs/${jobId?.id}`)
        .then((response) => {
          setEmpresaApi(response.data?.User?.Companies[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [jobId?.id])

const [rol, setRol] = useState(dataUser?.rol);

useEffect(() => {
  axios.get(`/user/${dataUser.id}`)
  .then((res) => {
    const userRol = res.data?.rol;
    setRol(userRol);
    // console.log(res.data.rol)
  })
  .catch((error) => {
    console.log(error);
  });
},[]);

  console.log(dataUser?.rol)

  //FAVORITOS AHORA ES GUARDADOS
  const [isPremium] = useState(JSON.parse(localStorage.getItem('userLogin')));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSnackbar, setSnackbat] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false);
  const [favFilter, setFavFilter] = useState([]);
  const [countOffers, setCountOffers] = useState()
  const [savedOffers, setSavedOffers] = useState([]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = ()=>{
    setSnackbat(false)
  }

  const OffersSave = async () => {
    const get = await axios.get(`/save_offers/${dataUser.id}`)
      .then((res) => {
        setCountOffers(res.data.length)
        return res.data.find(cb => cb.offerId === jobId?.id)
      })
    if (get !== undefined) {
      setIsFavorite(true)
      return
      
    }
    return setIsFavorite(false)
  }

  useEffect(() => {
    OffersSave()
    OffersSave()
    axios.get(`/fav_company/${dataUser?.id}`)
      .then((res) => res.data.filter((cb) => cb.offerId === jobId?.id))
      .then((res) => setFavFilter(res))
  }, [dataUser?.id, jobId?.id]);

  const handleToggleFavorite = () => {
  
    if (countOffers >= 5 && dataUser?.premium === false ) {
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
  }, [data, jobId?.companyId]);

  const handlePostulateDb = () => {
    const offerId = jobId.id
    const userId = dataUser.id
    if(dataUser.premium){
      axios.put(`/rel_offers/${offerId}/${userId}?state=send`)
      alert(`Enhorabuena! has aplicado a la oferta "${jobId.title}" `)
    }else{
      isSnackbar(true)
    }
  };


  // obtener perks en español desde la api getonbrd
  const [perksApi, setPerksApi] = useState([])
  useEffect(() => {
    axios.get('https://www.getonbrd.com/api/v0/perks')
      .then(res => setPerksApi(res.data.data))
  }, [])

  // filtrar según las perks que tenga la oferta de trabajo
  const cleanPerks = perksApi?.filter((perk) => jobId?.perks.includes(perk.id)).map(perk => perk.attributes.name)

  useEffect(() => {
    if (!dataUserLocal && !dataUserGoogle) navigate('/')
  }, [])

  if (!jobId) return spinnerPurple()
  if (isLoading) return spinnerPurple()

  const cleanHtml = { __html: empresa?.data.attributes.long_description }

  const SaveApplyToBdd=()=>{
    axios.post(`/applyapioffer?userId=${dataUser.id}&&offerId=${jobId.id}&&title=${jobId.title}`)
    .then((res)=>{
      console.log("se envio la postulacion a la bdd ")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="bg-primary-light dark:bg-secondary-dark pt-20">
      <NavLanding menu={menu} />
      <div class="flex justify-center items-center">
           <PremiumButtonComponent />
        </div>
      <div className="relative flex flex-wrap space-around">
        <Link to={'/offers'}>
          <button type="button" class="absolute text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{
              top: -10,
              left: 5,
            }}
          >
            <svg aria-hidden="true" class="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Icon description</span>
            volver
          </button>
        </Link>

        {/* Detalles de la oferta */}
        <div className="relative pt-5 flex justify-center max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl my-8 dark:bg-gray-800">
          <div className=" md:flex">
            <button className="absolute focus:outline-none text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" style={{
              top: -20,
              right: '43%',
              fontSize: 25
            }}>
              Oferta
            </button>
            <div className="p-8">
              <h1 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white mb-4">{jobId.title}</h1>
              <section className=" w-full flex ">
                {jobId.modality &&
                  <h3 className="text-lg font-semibold dark:text-white mr-4">
                    Modalidad: <p className="inline mt-2 text-gray-800 dark:text-gray-400 text-base font-normal"> {jobId.modality?.split("_").join(" ")} </p>
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
              {
                !jobId?.technologies
                  ? null
                  : <div>
                    <h2 className="text-lg font-semibold dark:text-white py-3"> Tecnologias requeridas </h2>
                    <div className="flex flex-row flex-wrap gap-3">
                      {jobId?.technologies.map((tecnologia) => { return <Perks perk={tecnologia} /> })}
                    </div>
                  </div>

              }

              <br />
              {
                jobId?.perks &&
                <h2 className="text-lg font-semibold dark:text-white py-3"> Ventajas </h2>
              }
              <div className="flex flex-row flex-wrap gap-3">
                {
                  cleanPerks.length !== 0
                    ? cleanPerks?.map((ventajas) => { return <Perks perk={ventajas} /> })
                    : jobId.perks?.map((ventajas) => { return <Perks perk={ventajas} /> })
                }
              </div>

            {rol === 'Postulante' &&
            <div className="mt-8 flex justify-center">
                {
                  Number(jobId?.id)
                    ? <button onClick={handlePostulateDb} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"  disabled={!dataUser?.premium} style={{opacity: dataUser?.premium ? 1 : 0.5, cursor: dataUser?.premium ? 'pointer' : 'not-allowed'}}>
                    <span className="relative px-5 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Aplicar
                    </span>
                    <Snackbar
                    open={Snackbar}
                    autoHideDuration={7000}
                    onClose={handleClose}
                    message="Debes ser premium para aplicar a esta oferta"
                    
                  />
                  </button>
                    : <a href={jobId.link} target="_blank" rel="noreferrer" >
                      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={SaveApplyToBdd}>
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
                    autoHideDuration={7000}
                    onClose={handleCloseSnackbar}
                    message="Solo puedes guardar 5 ofertas de trabajo. para guardar mas ofertas y más beneficios asciende a premium"
                    
                  />
                </Box>
              </div>
            }
          </div>
          </div>

        </div>
        {/* Datos de la empresa */}
        <div className="relative flex justify-center max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl my-8 dark:bg-gray-800">
          <div className="md:flex">
            <div className="p-8">
              <button className="absolute focus:outline-none text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" style={{
                top: -20,
                right: '39%',
                fontSize: 25
              }}>
                Empresa
              </button>
              <div className=" w-full flex justify-center items-center mb-4 mt-6 ">
                <img className="flex justify-center items-center " src={empresa?.data.attributes.logo || empresaApi?.logo} alt="Logo company" />
              </div>
              <h1 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white m-8">{empresa?.data.attributes.name || empresaApi?.companyname}</h1>
              <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal" dangerouslySetInnerHTML={cleanHtml}></h3>
              <h3 className="mt-2 text-gray-800 dark:text-gray-400 text-base font-normal"> {empresaApi?.description} </h3>
              <section className="w-full flex justify-center items-center my-10">
                <a href={empresa?.data.attributes.web || empresaApi?.website} target="_blank" rel="noreferrer">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Visita la Web de {empresa?.data.attributes.name || empresaApi?.companyname}
                    </span>
                  </button>
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};






export default JobDetail;