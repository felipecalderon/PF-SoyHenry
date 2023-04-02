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
  const [aplicantsModalList, setAplicantsModalList ] = useState(null)
  const  {offers} = useSelector((state) => state.recruiterSlice) 
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    axios.get(`/jobsdb/${userData?.Companies instanceof Array ? userData?.Companies[0].id : userData?.Companies?.id}`)
            .then(res => {
                dispatch( saveOffers(res.data.Offers))
            })
  },[showModal,dispatch])
 
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
          status: Apply.status
        }
      )
    })    
    setAplicantsModalList(aplicants)   
  }
  
  const handleViewCV = (event) => {
    //if (event.target.attributes.status.value === 'viewed' || event.target.attributes.status.value === 'select' || event.target.attributes.status.value === 'no_select' ) return

    const userid = event.target.attributes.userid.value
    const offerid = event.target.attributes.offerid.value

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
  }


 
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
              </Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <p className='mb-[.5rem]'><strong>Requisitos: </strong>{offer.requeriments}</p>
               <p className='mb-[.5rem]'><strong>Beneficios: </strong>{offer.benefits}</p>
               <p className='mb-[.5rem]'><strong>Funciones: </strong>{offer.functions}</p>
               <p className='mb-[.5rem]'><strong>Modalidad: </strong>{offer.modality === 'fully_remote' 
                                                                      ? "Remoto" 
                                                                      : offer.modality === 'remote_local' 
                                                                      ? 'Remoto local' 
                                                                      : offer.modality === 'hybrid' 
                                                                      ? 'Híbrido' 
                                                                      : offer.modality === 'no_remote' 
                                                                      ? 'Presencial' 
                                                                      : 'No especificado'}</p>
               <p className='mb-[.5rem]'><strong>Ventajas: </strong>{offer.perks.map((p) => p).join(', ')}</p>
               <p className='mb-[.5rem]'><strong>Tecnologías requeridas: </strong>{offer.technologies.map((t) => t).join(', ')}</p>
               <p className='mb-[.5rem]'><strong>Experiencia: </strong>{offer.experience} Año/s</p>
               <p className='mb-[.5rem]'><strong>Salario: </strong>${offer.min_salary} - ${offer.max_salary}</p>
               <p className='mb-[.5rem]'><strong>Fecha de creación: </strong>{offer.date_post}</p>
               <p className='mb-[.5rem]'><strong>Fecha de finalización: </strong></p>
               <p className='mb-[.5rem]'><strong>Postulantes: </strong>{offer.applications_count}</p>
               <Link><button
                className='py-2 px-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'
                onClick={() => {
                  setShowModal(true)
                  handleAplicants(offer)
                  } }>Ver postulantes</button></Link>
               <div className='flex justify-center pt-5'>
                <Link to={`/detail/${offer.id}?${offer.title}`}>
                  <button className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Ver oferta</button>
                </Link>
                <Link>
                  <button className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Cerrar oferta</button>
                </Link>
                <Link>
                  <button className='py-2 px-2 mx-2 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>Borrar oferta</button>
                </Link>
               </div>
             </Typography>
           </AccordionDetails>
         </Accordion>
       ))}
     </div>
     <ModalConfirmChanges isVisible={showModal} onClose={() => setShowModal(false)} >
        <div>          
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tecnologias</th>
                <th>informacion del postulante</th>
                <th>Acciones sobre el postulante </th>
              </tr>
            </thead>
            <tbody>
              {aplicantsModalList?.map((aplicant, index) => {
                return(
                  <tr>                                 
                    <td>{aplicant.name}</td>  
                    <td>{aplicant.technologies}</td>  
                    <td><button onClick={(event)=>handleViewCV(event)} offerid={aplicant.offerId} userid={aplicant.userId} status={aplicant.status}>ver CV</button><button> ver perfil</button> </td>
                    <label ><input type='checkbox' value={'viewed'} disabled='disabled' defaultChecked={aplicant.status !== 'send' ? true : false} /> perfil o CV visto</label>
                    <label ><input type='radio'  defaultChecked={aplicant.status === 'no_select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'no_select'} offerid={aplicant.offerId} userid={aplicant.userId}/> postulante rechazado</label>
                    <label ><input type='radio' defaultChecked={aplicant.status === 'select' ? true : false} name={index} onChange={(event) => handleSelected(event)} value={'select'} offerid={aplicant.offerId} userid={aplicant.userId}/> postulante preseleccionado</label>
                  </tr>
                )
              })}
            </tbody>
          </table>           
        </div>
     </ModalConfirmChanges>

     </Fragment>
   );
};