import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ModalConfirmChanges from '../Form/FormCreateOfferModal';
import axios from 'axios';
import { saveOffers } from '../../redux/slices/recruiterSlice';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '1rem',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  marginBottom: '.2rem'
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const CardsOfertasDb = () => {
  
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('panel1');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);  
  const [showModal4, setShowModal4] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [offerIdclose_delete, setOfferIdclose_delete] = useState(null)
  const [aplicantsModalList, setAplicantsModalList ] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const {offers} = useSelector((state) => state.recruiterSlice) 
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    axios.get(`/jobsdb/${userData?.Companies instanceof Array ? userData?.Companies[0].id : userData?.Companies?.id}`)
            .then(res => {
                dispatch( saveOffers(res.data.Offers))
            })
  },[showModal,actualizar])
 
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAplicants = (offer) => {
    const aplicants = offer.Aplications.map(Apply => {
      return(
        {
          userId: Apply.userId,
          offerId: Apply.offerId,           
          name: Apply.User.names,
          lastnames: Apply.User.lastnames,
          technologies: Apply.User.Postulants[0].tecnology,
          experience: Apply.User.Postulants[0].experience,
          cv: Apply.User.Postulants[0].curriculum_pdf,
          email: Apply.User.email,
          status: Apply.status
        }
        )
      })    
      setAplicantsModalList([aplicants,{title: offer.title}])   
    
  }
  
  const handleViewCV = (event) => {
    
    setShowModal3(true)
    const email = event.target.attributes.email.value
    axios.post(`/user/email/`, {email: email} ).then((res) => setPerfil(res.data))
    const offerid = event.target.attributes.offerid.value
    const userid = event.target.attributes.userid.value
    
    
    if (event.target.attributes.status.value === 'viewed' || event.target.attributes.status.value === 'select' || event.target.attributes.status.value === 'no_select' ) return
    axios.put(`/rel_offers/${offerid}/${userid}?state=viewed`).then((res) => console.log(res))
    
  }  

  const handleSelected = (event) => {
    
    const userid = event.target.attributes.userid.value
    const offerid = event.target.attributes.offerid.value
    
    if (event.target.checked ) {
      axios.put(`/rel_offers/${offerid}/${userid}?state=${event.target.value}`).then((res) => console.log(res))
      if (event.target.name === 'select') document.getElementById(event.target.index).checked = false;
      if (event.target.name === 'no_select') document.getElementById('select').checked = false;      
    } 
    setActualizar(!actualizar)
  }

  const handleCloseOffer = (id, active) => {
    if(active === false) return
    axios.put(`jobsld/${id}`,{active: false}).then((res) => console.log(res))    
    setActualizar(!actualizar)

  }

  const handleDate = (date, active, udpate, expiration) => {
    let fecha
    if(active) {
      fecha = date.slice(0,10)
      let day =fecha.slice(0,2)
      let month = fecha.slice(3,5)
      let year = fecha.slice(6,11)
      fecha = ( year + '-' +month+ '-'+ day)
      fecha = new Date(fecha)
      fecha.setDate(fecha.getDate() + expiration + 1)

      return fecha.toLocaleDateString('es-ES')

    } else {
      
      return new Date(udpate).toLocaleDateString('es-ES')
    }
  }

  const handleDeleteOffer = (id) => {
    axios.delete(`/jobdb/${id}`).then((res) => console.log(res))
    setActualizar(!actualizar)
  }

  const handleContarNuevos = (offer) => {
    let contador = 0;
    offer.Aplications.map( (apply) => {
       if (apply.status ==='send') contador += 1
    })   
    
    return contador
  }

  const handleContarDias = (offer) => {
    if (offer.active === false) return 'closed'
    let today = new Date().getTime()
    let vencimiento = new Date( offer.createdAt)
    vencimiento.setDate(vencimiento.getDate() + offer.expiration + 1)
    vencimiento = vencimiento.getTime()
    let diff = vencimiento - today

    return Math.floor(diff/(1000*60*60*24)) 
  }
  
  offers?.map((offer) => {
    let today = new Date()
    let vencimiento = new Date( offer.createdAt)
    vencimiento.setDate(vencimiento.getDate() + offer.expiration + 1 )
    
    if(today.toLocaleDateString('es-ES') === vencimiento.toLocaleDateString('es-ES')) {
    handleCloseOffer(offer.id, offer.active)
    }
    
  })

 
  if (offers?.length === 0) return <h3 className='flex justify-center font-semibold'>Aún no creaste ninguna oferta.</h3>;
  
  return (
     <Fragment>
     <div className='w-full'>
       {offers?.map((offer, index) => (
         <Accordion 
          key={index} 
          expanded={expanded === `panel${index + 1}`} 
          onChange={handleChange(`panel${index + 1}`)}>
           <AccordionSummary 
            aria-controls={`panel${index + 1}d-content`} 
            id={`panel${index + 1}d-header`}>
             <Typography className='flex'>
                <div className='font-bold items-center border-r-2 border-slate-500 pr-1 text-sm'>
                  {offer.title.slice(0, 20)}{offer.title.length > 20 ? '...' : ''} 
                </div>
                <div>
                  <p className='relative ml-1 items-center border-l-black h-0 font-bold text-sm'>Postulantes: {offer.applications_count}</p>
                </div>
                <div>
                  <p className='relative ml-2 items-center border-l-black h-0 font-bold text-sm'>Postulantes sin evaluar: {handleContarNuevos(offer)}</p>
                </div>
                <div>
                  <p className='relative ml-2 items-center border-l-black h-0 font-bold text-sm'>Dias restantes: {handleContarDias(offer)} </p>
                </div>
              </Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <p className='mb-2 text-left'><strong>Nombre: </strong>{offer.title}</p>
               <p className='mb-2 text-left'><strong>Requisitos: </strong>{offer.requeriments}</p>
               <p className='mb-2 text-left'><strong>Beneficios: </strong>{offer.benefits}</p>
               <p className='mb-2 text-left'><strong>Funciones: </strong>{offer.functions}</p>
               <p className='mb-2 text-left'><strong>Modalidad: </strong>{offer.modality === 'fully_remote' 
                                                                      ? "Remoto" 
                                                                      : offer.modality === 'remote_local' 
                                                                      ? 'Remoto local' 
                                                                      : offer.modality === 'hybrid' 
                                                                      ? 'Híbrido' 
                                                                      : offer.modality === 'no_remote' 
                                                                      ? 'Presencial' 
                                                                      : 'No especificado'}</p>
               <p className='mb-2 text-left'><strong>Ventajas: </strong>{offer.perks.map((p) => p).join(', ')}</p>
               <p className='mb-2 text-left'><strong>Tecnologías requeridas: </strong>{offer.technologies.map((t) => t).join(', ')}</p>
               <p className='mb-2 text-left'><strong>Experiencia: </strong>{offer.experience} Año/s</p>
               <p className='mb-2 text-left'><strong>Salario: </strong>{offer.min_salary === 0 && offer.max_salary === 0 ? 'Sin informar'  : `$${offer.min_salary} - $${offer.max_salary}`}</p>
               <p className='mb-2 text-left'><strong>Fecha de creación: </strong>{offer.date_post.slice(0,10)}</p>
               <p className='mb-2 text-left'><strong>Fecha de finalización: </strong>{ handleDate(offer.date_post, offer.active, offer.updatedAt, offer.expiration)}</p>
               <p className='mb-2 text-left'><strong>Postulantes: </strong>{offer.applications_count}</p>
               {(offer.applications_count !== 0) && <Link><button
                className='py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'
                onClick={() => {
                  setShowModal(true)
                  handleAplicants(offer)
                  }  }>{offer.active ? 'Ver postulantes' : 'Postulantes cerrados'}</button></Link>}
               <div className='flex justify-center pt-5'>
                <Link to={`/detail/${offer.id}?${offer.title}`}>
                  <button className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Ver oferta</button>
                </Link>
                <Link>
                  <button disabled={offer.active ? false : true} className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'
                  onClick={() => {
                    setShowModal2(true)
                    setOfferIdclose_delete(offer.id)                    
                    } }>{offer.active ? 'Cerrar oferta' : 'Oferta cerrada'}</button>
                </Link>
                <Link>
                  <button onClick={() => {
                    setShowModal4(true)
                    setOfferIdclose_delete(offer.id)
                    }} className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Borrar oferta</button>
                </Link>
               </div>
                {!offer.active && <div >
                  <h1 className='mt-3 font-bold border-t-2 border-black text-lg'>Resumen de oferta</h1>
                  <h2 className='font-semibold mb-1'>Datos de postulantes seleccionados</h2>
                  {offer.Aplications.map( apply => {
                    if (apply.status === 'select') {
                      return (
                        <div className='flex justify-center'>
                        <table>
                          <thead>
                            <th className='border-2 border-black px-2'>Nombre</th>
                            <th className='border-2 border-black px-2'>Email</th>
                            <th className='border-2 border-black px-2'>LinkedIn</th>
                            <th className='border-2 border-black px-2'>Perfil</th>
                            <tr></tr>
                          </thead>
                            <tbody>
                              <td className='border-2 border-black px-2'>{apply.User.names} {apply.User.lastnames}</td>
                              <td className='border-2 border-black px-2'><a href={`mailto:${apply.User.email}`}><p className='text-blue-600'>{apply.User.email && apply.User.email.slice(0, 13)}{apply.User.email && apply.User.email.length > 13 ? '...' : ''}</p></a></td>                          
                              <td className='border-2 border-black px-2'><a target="_blank" rel="noopener noreferrer" href={apply.User.Postulants[0].linkedin}><p className='text-blue-600'><LinkedInIcon sx={{ fontSize: 30 }} /></p></a></td>
                              <td className='border-2 border-black px-2'><button onClick={(event)=>handleViewCV(event)} email={apply.User.email}>Ver perfil</button></td>
                            </tbody>
                        </table>
                        </div>
                      )
                    }
                  } )}
                </div>}
             </Typography>
           </AccordionDetails>
         </Accordion>
       ))}
     </div>
     <ModalConfirmChanges isVisible={showModal} onClose={() => setShowModal(false)} >
        {aplicantsModalList && aplicantsModalList[0].length ?  
        <div className="flex relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-auto rounded-2xl flex-col justify-center items-center sm:w-11/12">          
          <div className='flex flex-col relative'>
          <div className="absolute z-96 top-0 right-0 m-1 mt-2 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal(false)}>
            <HighlightOffIcon sx={{color:'red'}} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center dark:text-white">{aplicantsModalList[1]?.title}</h1>
          <p className="text-2xl font-semibold text-center dark:text-white">
            <div className='flex py-2 text-lg justify-center'>
              <span>Ordenar por:</span>
                <label className='border-r-2 border-black px-2'><input type="radio" name='ordenar' onClick={() => setAplicantsModalList ( [ aplicantsModalList[0].sort(function (a,b) { return Number( (b.experience).slice(0,1) )- Number((a.experience).slice(0,1))} ), aplicantsModalList[1] ])}/> Mayor experiencia</label> 
                <label className='border-r-2 border-black px-2'><input type="radio" name='ordenar' onClick={() => setAplicantsModalList ([ aplicantsModalList[0].sort(function (a,b) { return b.technologies.length - a.technologies.length} ), aplicantsModalList[1] ])} /> Mayor tecnologías</label> 
                <label className='border-r-2 border-black px-2'><input type="radio" name='ordenar' onClick={() => setAplicantsModalList ([ aplicantsModalList[0].sort(function (a,b) { return  Number( (a.experience).slice(0,1) ) - Number( (b.experience).slice(0,1) )} ), aplicantsModalList[1] ])}/> Menor experiencia</label> 
                <label className='px-2'><input type="radio" name='ordenar' onClick={() => setAplicantsModalList ([aplicantsModalList[0].sort(function (a,b) { return a.technologies.length - b.technologies.length} ), aplicantsModalList[1] ])} /> Menor tecnologías</label>
            </div>
          </p>
          <table>
            <thead>
              <tr>
                <th className='border-2 border-black dark:border-white dark:text-text-dark px-2'>Nombre</th>
                <th className='border-2 border-black dark:border-white dark:text-text-dark px-2'>Tecnologías</th>
                <th className='border-2 border-black dark:border-white dark:text-text-dark px-2'>Experiencia</th>
                <th className='border-2 border-black dark:border-white dark:text-text-dark px-2'>información</th>
                <th className='border-2 border-black dark:border-white dark:text-text-dark px-2' colSpan={3}>Acciones sobre el postulante</th>
              </tr>
            </thead>
            <tbody>
              {aplicantsModalList[0]?.map((aplicant, index) => {
                return(
                  <tr>                                 
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2'>{aplicant.name} {aplicant.lastnames}</td>  
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2'>{aplicant.technologies && aplicant.technologies.join(', ')}</td>  
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2'>{aplicant.experience} Año/s</td>
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2 py-2'><button onClick={(event)=>handleViewCV(event)} offerid={aplicant.offerId} userid={aplicant.userId} status={aplicant.status} email={aplicant.email}>Ver perfil</button></td>
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2 py-2'><input type='checkbox' value={'viewed'} disabled='disabled' defaultChecked={aplicant.status !== 'send' ? true : false} /> Perfil o CV visto </td>
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2'><input type='radio' disabled={aplicant.status === 'no_select' || aplicant.status === 'select' ? true : false  } defaultChecked={aplicant.status === 'no_select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'no_select'} offerid={aplicant.offerId} userid={aplicant.userId} /> Postulante rechazado </td>
                    <td className='border-2 border-black dark:border-white dark:text-text-dark  px-2'><input type='radio' disabled={aplicant.status === 'no_select' || aplicant.status === 'select' ? true : false  } defaultChecked={aplicant.status === 'select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'select'} offerid={aplicant.offerId} userid={aplicant.userId}/> Postulante preseleccionado </td>
                  </tr>
                )
              })}
            </tbody>
          </table>           
        </div>
        </div>
        : 
        <div className='bg-primary-light dark:bg-primary-dark border-4 dark:border-white rounded-3xl mx-auto w-11/12 sm:w-2/3 lg:w-full'>
            <div className='flex flex-col relative'>
              <div className="absolute z-96 top-0 right-0 mt-2 pr-3 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal(false)}>
                <HighlightOffIcon sx={{color:'red'}} />
              </div>
                <h1 className='flex justifycenter font-semibold my-14 mr-10 pr-2 ml-10 text-3xl dark:text-text-dark'>'Esta oferta no tiene postulantes preseleccionados'</h1>
              </div>
          </div>
        }
    </ModalConfirmChanges>

    <ModalConfirmChanges isVisible={showModal2} onClose={() => setShowModal2(false)}>
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-auto rounded-2xl flex-col justify-center items-center">
        <div className='flex flex-col relative'>
          <div className="absolute z-96 top-0 right-0 m-1 mt-2 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal2(false)}>
            <HighlightOffIcon sx={{color:'red'}} />
          </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center dark:text-white">Atención</h1>
        <p className="text-2xl py-5 font-bold text-center dark:text-white">Esta acción cerrará la oferta</p>
        <p className="mb-3 text-2xl font-semibold text-center dark:text-white">Esto indica que dejará de recibir postulaciones, ya no será visible en el catálogo de ofertas y se les informará a los postulantes si fueron seleccionados, o no.</p>
        <div className='flex justify-center pt-5'>
        <button
        className='m-2 h-14 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={() => {setShowModal2(false) 
                        handleCloseOffer(offerIdclose_delete)}}>Cerrar oferta</button>
        <button
        className='m-2 h-14 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
        onClick={() => setShowModal2(false)}>Volver</button>        
        </div>
        </div>     
      </div>     
    </ModalConfirmChanges>

    <ModalConfirmChanges isVisible={showModal4} onClose={() => setShowModal4(false)}>
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-auto rounded-2xl flex-col justify-center items-center">
        <div className='flex flex-col relative'>
          <div className="absolute z-96 top-0 right-0 m-1 mt-2 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal4(false)}>
            <HighlightOffIcon sx={{color:'red'}} />
          </div> 
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center dark:text-white">Atención</h1>
        <p className="text-2xl py-5 font-bold text-center dark:text-white">Esta acción borrará la oferta</p>
        <p className="mb-3 text-2xl font-semibold text-center dark:text-white"> ¡Alerta! esta acción no puede deshacerse, borrará la oferta con toda su información y postulantes, ya no estará visible en el dashboard</p>
        <div className='flex justify-center pt-5'>
        <button
        className='m-2 h-14 bg-red-600 hover:bg-red-900  dark:bg-red-600 dark:hover:bg-red-900  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={() => {setShowModal4(false) 
                                handleDeleteOffer(offerIdclose_delete)}}>Borrar oferta</button>
        <button
        className='m-2 h-14 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
        onClick={() => setShowModal4(false)}>Volver</button>        
        </div>
        </div>     
      </div>     
    </ModalConfirmChanges>

    
    <ModalConfirmChanges isVisible={showModal3} onClose={() => setShowModal3(false)}>
      {perfil &&
      <div className="flex relative w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-auto rounded-2xl flex-col justify-center items-center">
        <div className='flex flex-col relative'>
          <div className="absolute z-96 top-0 right-0 m-1 mt-2 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal3(false)}>
            <HighlightOffIcon sx={{color:'red'}} />
          </div> 
        <h1 className="text-3xl md:text-4xl font-bold mb-1 text-center dark:text-white">Perfil de postulante</h1>
        <div className='flex flex-row mt-5'>
          <div className='flex flex-col w-1/2 h-1/2'>
            <h2 className="text-2xl font-semibold mt-2 text-center dark:text-white">Datos personales</h2>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Nombre: </strong>{perfil.names}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Apellido: </strong>{perfil.lastnames}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Edad: </strong>{perfil.Postulants[0].age}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Género: </strong>{perfil.Postulants[0].gender}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>País: </strong>{perfil.country}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Ciudad: </strong>{perfil.city}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Teléfono: </strong>{perfil.phone}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Email: </strong><a href={`mailto:${perfil.email}`}><p className='text-blue-600'>{perfil.email}</p></a></p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>LinkedIn: </strong><a target="_blank" rel="noopener noreferrer" href={perfil.Postulants[0].linkedin}><p className='text-blue-600'>{perfil.Postulants[0].linkedin}</p></a></p>
          </div>
          <div className='flex flex-col w-1/2 h-1/2'>
            <h2 className="text-2xl mt-2 font-semibold text-center dark:text-white">Información profesional</h2>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Como se describe: </strong>{perfil.Postulants[0].description_postulant}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Se autotitula como: </strong>{perfil.Postulants[0].title}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Lenguaje: </strong>{perfil.Postulants[0].languages}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Tecnologías: </strong>{perfil.Postulants[0].technologies}</p>
            <p className="mb-2 mt-2 text-md font-semibold text-center dark:text-white"><strong>Experiencia: </strong>{perfil.Postulants[0].experience} Año/s</p>
            {perfil.Postulants[0].curriculum_pdf
            ? <button className='m-2 h-auto w-auto bg-primary-dark hover:bg-purple-900 dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline'><a target="_blank" rel="noopener noreferrer" href={perfil.Postulants[0].curriculum_pdf}>Ver CV</a></button>
            : 'El usuario no cargo el CV'}
          </div>
        </div>
      </div> 
      </div>
      }
    </ModalConfirmChanges>
    </Fragment>
  );
};