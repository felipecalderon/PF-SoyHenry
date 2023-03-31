import { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ModalConfirmChanges from '../Form/FormCreateOfferModal';

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

export const CardsOfertasDb = ({offers}) => {
  const [expanded, setExpanded] = useState('panel1');
  const [showModal, setShowModal] = useState(false);
  const [aplicantsModalList, setAplicantsModalList ] = useState(null)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAplicants = (offer) => {
    const aplicants = offer.Aplications.map(Apply => {
      return(
        {
          name: Apply.User.Postulants[0].lastnames,
          technologies: Apply.User.Postulants[0].tecnology          
        }
      )
    })    
    setAplicantsModalList(aplicants)   
  }   

 
  if (offers.length === 0) return <h3 className='flex justify-center font-semibold'>Aún no creaste ninguna oferta.</h3>;
  
  return (
     <Fragment>
     <div>
       {offers.map((offer, index) => (
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
                  <p className='relative ml-5 border-l-black h-0 font-bold'>| Postulantes:{offer.applications_count}</p>
                </div>
              </Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <p className='mb-[.5rem]'><strong>Requisitos: </strong>{offer.requeriments}</p>
               <p className='mb-[.5rem]'><strong>Beneficios: </strong>{offer.benefits}</p>
               <p className='mb-[.5rem]'><strong>Funciones: </strong>{offer.functions}</p>
               <p className='mb-[.5rem]'><strong>Modalidad: </strong>{offer.modality}</p>
               <p className='mb-[.5rem]'><strong>Tecnologias: </strong>{offer.perks.map((p) => p).join(', ')}</p>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aplicantsModalList?.map(aplicant => {
                return(
                  <tr>
                    <td>{aplicant.name}</td>  
                    <td>{aplicant.technologies}</td>  
                    <td><button>ver CV</button><button> ver perfil</button> </td>
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