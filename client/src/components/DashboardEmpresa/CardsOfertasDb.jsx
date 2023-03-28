import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (offers.length === 0) return <h3 className='flex justify-center font-semibold'>Aún no creaste ninguna oferta.</h3>;
  
  return (
     <div>
       {offers.map((offer, index) => (
         <Accordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
           <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
             <Typography>{offer.title} Postulantes:{offer.applications_count}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
               <p>Requisitos: {offer.requeriments}</p>
               <p>Beneficios: {offer.benefits}</p>
               <p>Funciones: {offer.functions}</p>
               <p>Modalidad: {offer.modality}</p>
               <p>Tecnologias: {offer.perks.map((p) => p).join(', ')}</p>
               <p>Experiencia: {offer.experience} Año/s</p>
               <p>Salario: ${offer.min_salary} - ${offer.max_salary}</p>
               <p>Fecha de creación: {offer.date_post}</p>
               <p>Fecha de finalización:</p>
               <p>Postulantes: {offer.applications_count}</p>
               <Link><button>Ver postulantes</button></Link>
               <br/><br/>
               <Link to={`/detail/${offer.id}?${offer.title}`}><button>Ver oferta</button></Link>
               <br/><br/>
               <Link><button>Cerrar oferta</button></Link>
               <br/><br/>
               <Link><button>Borrar oferta</button></Link>
             </Typography>
           </AccordionDetails>
         </Accordion>
       ))}
     </div>
   );
};