import React, {useState} from 'react';
import {Box, Typography, CardContent, CardMedia, Rating, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import validationsDatosEmpresa from './validationsDatosEmpresa';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Profile = ({company}) => {
  const [open, setOpen] = useState(false);
  
  //eslint-disable-next-line no-unused-vars
  const {companyname, description, logo, website} = company
  
  const [info, setInfo] = useState({
    username: company.username,
    companyname: company.companyname,
    lastnames: company.lastnames,
    email: company.email,
    description: company.description,
    location: company.location,
    website: company.website,
    logo: company.logo,
    rol: 'Empresa',
    active: true
  });

//   const [errors, setErrors] = useState({
//     username: '',
//     companyname: '',
//     lastnames: '',
//     email: '',
//     description: '',
//     location: '',
//     website: '',
//     logo: '',
// });

  // const newInfo = (event) => {
  //   const { name, value } = event.target;
  //   setInfo({
  //     ...info,
  //     [name]: value
  //   })
  // };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setInfo({
        ...info,
        [event.target.name]: event.target.value
    })
};

const handleSubmit = async (event) => {
  event.preventDefault();
  await axios.put('/jobsdb/:id', info);
  await axios.put('/', info);
  alert('Los datos se han actualizado.');
  setOpen(false);
};
  
  if(!company) return "No hay info";
  return (
    <>
      <Box className="flex flex-row">
        <CardMedia
          component="img"
          sx={{ width: 200, objectFit: 'contain' }}
          image={logo}
          alt="Live from space album cover"
        />
        <CardContent className="flex flex-col justify-center">
          <Typography component="div" variant="h5" className='text-gray-900 dark:text-white'>
            {companyname}
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-blue-600 dark:text-white'>
            <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
          </Typography>
          <Rating name="ratingCompany" value={4} readOnly />
        </CardContent>
      </Box>
      <Box className="flex flex-row gap-3 w-[29.5rem] pt-[1rem]">   
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<Badge />}>
          Modificar mis datos
        </Button>
        <Link to='/offerscreate'>
          <Button variant="contained" endIcon={<SendIcon />}>
            Crear oferta de empleo
          </Button>
        </Link>
      </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Editar información de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Editar datos de usuario
          </DialogContentText>
          <form>
          <div>
              <TextField label="Nombres" value={info.username} onChange={handleChange} /*error={!!errors.username} helperText={errors.username}*/ variant="standard" name='username' />
          </div>
          <div>
              <TextField label="Apellidos" value={info.lastnames} onChange={handleChange} /*error={!!errors.lastnames} helperText={errors.lastnames}*/ variant="standard" name='lastnames' />
          </div>
          <div>
              <TextField label="Email" value={info.email} onChange={handleChange} /*error={!!errors.email} helperText={errors.email}*/ variant="standard" name='email' />
          </div>
          <div>
              <TextField label="Nombre de la empresa" value={info.companyname} onChange={handleChange} /*error={!!errors.companyname} helperText={errors.companyname}*/ variant="standard" name='companyname' />
          </div>
          <div>
              <TextField label="Logo" value={info.logo} onChange={handleChange} /*error={!!errors.logo} helperText={errors.logo}*/ variant="standard" name='logo' />
          </div>
          <div>
              <TextField label="Website" value={info.website} onChange={handleChange} /*error={!!errors.website} helperText={errors.website}*/ variant="standard" name='website' />
          </div>
          <div>
              <TextField label="Ubicación" value={info.location} onChange={handleChange} /*error={!!errors.location} helperText={errors.location}*/ variant="standard" name='location' />
          </div>
          <div>
              <TextField label="Descripción" value={info.description} onChange={handleChange} /*error={!!errors.description} helperText={errors.description}*/ variant="standard" name='description' />
          </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default Profile