import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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
  marginBottom: '.5rem',
  marginLeft: '1rem',
  width: '35rem'
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
  const  {offers} = useSelector((state) => state.recruiterSlice) 
  
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
          technologies: Apply.User.Postulants[0].tecnology,
          experience: Apply.User.Postulants[0].experience,
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

  const handleCloseOffer = (id) => {
    
    axios.put(`jobsld/${id}`,{active: false}).then((res) => console.log(res))    
    setActualizar(!actualizar)

  }

  const handleDate = (date, active, udpate) => {
    let fecha
    if(active) {
      fecha = date.slice(0,10)
      let day =fecha.slice(0,2)
      let month = fecha.slice(3,5)
      let year = fecha.slice(6,11)
      fecha = ( year + '-' +month+ '-'+ day)
      fecha = new Date(fecha)
      fecha.setDate(fecha.getDate()+15)

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
    vencimiento.setDate(vencimiento.getDate()+15)
    vencimiento = vencimiento.getTime()
    let diff = vencimiento - today

    return Math.floor(diff/(1000*60*60*24)) 
  }
  
  offers?.map((offer) => {
    let today = new Date()
    let vencimiento = new Date( offer.createdAt)
    vencimiento.setDate(vencimiento.getDate()+15)
    
    if(today.toLocaleDateString('es-ES') === vencimiento.toLocaleDateString('es-ES')) {
    handleCloseOffer(offer.id)
    setActualizar(!actualizar)
    }     
    
  })

 
  if (offers?.length === 0) return <h3 className='flex justify-center font-semibold'>Aún no creaste ninguna oferta.</h3>;
  
  return (
     <Fragment>
     <div>
       {offers?.map((offer, index) => (
         <Accordion 
          key={index} 
          expanded={expanded === `panel${index + 1}`} 
          onChange={handleChange(`panel${index + 1}`)}>
           <AccordionSummary 
            aria-controls={`panel${index + 1}d-content`} 
            id={`panel${index + 1}d-header`}>
             <Typography className='flex'>
                <div className='font-bold'>
                  {offer.title.slice(0, 35)}{offer.title.length > 35 ? '...' : ''} 
                </div>
                <div>
                  <p className='relative ml-5 border-l-black h-0 font-bold'>| Postulantes: {offer.applications_count}</p>
                </div>
                <div>
                  <p>Postulantes sin evaluar: {handleContarNuevos(offer)}</p>
                </div>
                <div>
                  <p>Dias restantes: {handleContarDias(offer)} </p>
                </div>
              </Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <p className='mb-[.5rem]'><strong>Requisitos: </strong>{offer.requeriments}</p>
               <p className='mb-[.5rem]'><strong>Beneficios: </strong>{offer.benefits}</p>
               <p className='mb-[.5rem]'><strong>Funciones: </strong>{offer.functions}</p>
               <p className='mb-[.5rem]'><strong>Modalidad: </strong>{offer.modality}</p>
               <p className='mb-[.5rem]'><strong>Ventajas: </strong>{offer.perks.map((p) => p).join(', ')}</p>
               <p className='mb-[.5rem]'><strong>Experiencia: </strong>{offer.experience} Año/s</p>
               <p className='mb-[.5rem]'><strong>Salario: </strong>{offer.min_salary === 0 && offer.max_salary === 0 ? 'Sin informar'  : '$ ' + offer.min_salary - '$ ' + offer.max_salary }</p>
               <p className='mb-[.5rem]'><strong>Fecha de creación: </strong>{offer.date_post.slice(0,10)}</p>
               <p className='mb-[.5rem]'><strong>Fecha de finalización: </strong>{ handleDate(offer.date_post, offer.active, offer.updatedAt)}</p>
               <p className='mb-[.5rem]'><strong>Postulantes: </strong>{offer.applications_count}</p>
               <Link><button
                className='py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'
                onClick={() => {
                  setShowModal(true)
                  handleAplicants(offer)
                  }  }>{offer.active ? 'Ver postulantes' : 'Postulantes cerrados'}</button></Link>
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
                  <h1>Resumen de oferta</h1>
                  <h2>Datos de postulantes seleccionados</h2>
                  {offer.Aplications.map( apply => {
                    if (apply.status === 'select') {
                      return (
                        <div>
                          <span>{apply.User.names}</span>
                          <span>{apply.User.lastnames}</span>
                          <span>{apply.User.email}</span>                          
                          <span>{apply.User.Postulants[0].linkedin}</span>
                         <button onClick={(event)=>handleViewCV(event)}  email={apply.User.email}>Perfil</button>
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
        {aplicantsModalList && aplicantsModalList[0].length &&  
        <div>          
          <h1>{aplicantsModalList[1]?.title}</h1>
          <p>
            <span>Ordenar por: </span> <br />
              <label > mayor experiencia <input type="radio" name='ordenar' onChange={() => aplicantsModalList[0].sort(function (a,b) { return b.experience - a.experience} )}/></label> 
              <label > mayor tecnologias <input type="radio" name='ordenar' onChange={() => aplicantsModalList[0].sort(function (a,b) { return b.technologies.length - a.technologies.length} )} /></label> 
              <br />
              <label > menor experiencia <input type="radio" name='ordenar' onChange={() => aplicantsModalList[0].sort(function (a,b) { return a.experience - b.experience} )}/></label> 
              <label > menor tecnologias <input type="radio" name='ordenar' onChange={() => aplicantsModalList[0].sort(function (a,b) { return a.technologies.length - b.technologies.length} )} /></label> 
          </p>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tecnologias</th>
                <th>Experiencia</th>
                <th>informacion del postulante</th>
                <th>Acciones sobre el postulante </th>
              </tr>
            </thead>
            <tbody>
              {aplicantsModalList[0]?.map((aplicant, index) => {
                return(
                  
                  <tr>                                 
                    <td>{aplicant.name}</td>  
                    <td>{aplicant.technologies}</td>  
                    <td>{aplicant.experience}</td>
                    <td><button onClick={(event)=>handleViewCV(event)} offerid={aplicant.offerId} userid={aplicant.userId} status={aplicant.status} email={aplicant.email}>ver perfil</button></td>
                    <td>
                    <label ><input type='checkbox' value={'viewed'} disabled='disabled' defaultChecked={aplicant.status !== 'send' ? true : false} /> perfil o CV visto</label>
                    <label ><input type='radio' disabled={aplicant.status === 'no_select' || aplicant.status === 'select' ? true : false  } defaultChecked={aplicant.status === 'no_select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'no_select'} offerid={aplicant.offerId} userid={aplicant.userId} /> postulante rechazado</label>
                    <label ><input type='radio' disabled={aplicant.status === 'no_select' || aplicant.status === 'select' ? true : false  } defaultChecked={aplicant.status === 'select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'select'} offerid={aplicant.offerId} userid={aplicant.userId}/> postulante preseleccionado</label>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>           
        </div>
        }   
        {aplicantsModalList && aplicantsModalList[0].length === 0 && 
          <div>
            <h1>Esta oferta aun no recibio postulaciones</h1>
          </div>
        }
    </ModalConfirmChanges>

    <ModalConfirmChanges isVisible={showModal2} onClose={() => setShowModal2(false)}>
      <div>
        <h1>Atencion</h1>
        <p>Esta accion cerrara la oferta</p>
        <p> esto indica que dejara de recibir postulaciones, no sera mas visible en el catalogo de ofertas y ademas se les informara a los postulantes si fueron seleccionados, o no.</p>
        <button onClick={() => {setShowModal2(false) 
                                handleCloseOffer(offerIdclose_delete)}}>Cerrar oferta</button>
        <button onClick={() => setShowModal2(false)}>Volver</button>        
      </div>     
    </ModalConfirmChanges>

    <ModalConfirmChanges isVisible={showModal4} onClose={() => setShowModal4(false)}>
      <div>
        <h1>Atencion</h1>
        <p>Esta accion borrara la oferta</p>
        <p> Alerta, esta accion no podra deshacerse, borrara la oferta con toda su informacion y postulantes, no estara mas visible en el dashboard</p>
        <button onClick={() => {setShowModal4(false) 
                                handleDeleteOffer(offerIdclose_delete)}}>Borrar oferta</button>
        <button onClick={() => setShowModal4(false)}>Volver</button>        
      </div>     
    </ModalConfirmChanges>

    
    <ModalConfirmChanges isVisible={showModal3} onClose={() => setShowModal3(false)}>
      {perfil && 
      <div>
        <h1>Perfil de postulante</h1>
        <h2>Datos personales</h2>
        <p>Nombre: {perfil.names}</p>
        <p>Apellido: {perfil.lastnames}</p>
        <p>Edad: {perfil.Postulants[0].age}</p>
        <p>Genero: {perfil.Postulants[0].gender}</p>
        <p>Pais: {perfil.country}</p>
        <p>Ciudad: {perfil.city}</p>
        <p>Telefono: {perfil.phone}</p>
        <p>Email: {perfil.email}</p>
        <p>LinkedIn: {perfil.Postulants[0].linkedin}</p>

        <h2>Informacion profesional </h2>
        <p>Como se describe: {perfil.Postulants[0].description_postulant}</p>
        <p>Se autotitula como: {perfil.Postulants[0].title}</p>
        <p>Lenguaje: {perfil.Postulants[0].languages}</p>
        <p>Tecnologias: {perfil.Postulants[0].technologies}</p>
        <p>Experiencia: {perfil.Postulants[0].experience}</p>
        <p></p>


      </div>
      }
      <button onClick={() => setShowModal3(false)}>Volver</button>
    </ModalConfirmChanges>
      
    </Fragment>
  );
};