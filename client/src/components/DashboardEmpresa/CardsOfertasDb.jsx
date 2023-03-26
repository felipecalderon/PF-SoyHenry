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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
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
  const [expanded, setExpanded] = useState('panel1');
  const [offers, setOffers] = useState([]);
  const { user } = useSelector((state) => state.userRegisterSlice)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/jobsdb/${user.Companies[0].id}`);
        setOffers(response.data.Offers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (offers.length > 0) {
    return (
      <div>
        {offers.map((offer, index) => (
          <Accordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
            <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
              <Typography>{offer.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>Descripción: {offer.description}</p>
                <p>Requisitos: {offer.requeriments}</p>
                <p>Beneficios: {offer.benefits}</p>
                <p>Funciones: {offer.functions}</p>
                <p>Modalidad: {offer.modality}</p>
                <p>Perks: {offer.perks.map((p) => p).join(', ')}</p>
                <p>Experiencia: {offer.experience} año/s</p>
                <p>Salario mínimo: ${offer.min_salary}</p>
                <p>Salario máximo: ${offer.max_salary}</p>
                <p>Fecha de creación: {offer.date_post}</p>
                <p>Cantidad de aplicantes: {offer.applications_count}</p>
                <Link><button>Ver aplicantes</button></Link>
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
  } else {
    return <h3>Aún no creaste ninguna oferta.</h3>;
  }
};