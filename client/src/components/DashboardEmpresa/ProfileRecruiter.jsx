import React, {useState} from 'react';
import {Box, Typography, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import axios from 'axios';
import validationsDatosRecruiter from './validationsDatosRecruiter';
import ModalConfirmChangesCompany from './ModalConfirmChangesCompany';
import { TextField } from "@mui/material";

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ProfileRecruiter = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem('userLogin'))
  const recruiter = user
  console.log(user)
  
  //eslint-disable-next-line no-unused-vars
  const {id, names, lastnames, email, photo, phone, website} = recruiter;

  const [info, setInfo] = useState({
    names: recruiter.names,
    lastnames: recruiter.lastnames,
    email: recruiter.email,
    phone: recruiter.phone,
    website: recruiter.website,
    photo: recruiter.photo
  });

  const [errors, setErrors] = useState({
    names: '',
    lastnames: '',
    email: '',
    phone: '',
    website: '',
    photo: ''
  });

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
    });
  };


const handleSubmit = async (event) => {
  try {
    const errorsNew = validationsDatosRecruiter(info);
    setErrors(errorsNew);
    if (Object.keys(errorsNew).length === 0) {
      await axios.put(`/user/${id}`, info);
      const verifyUsrExist = await axios.post(`/user/email`, { email: user.email })
      localStorage.setItem('userLogin', JSON.stringify(verifyUsrExist.data))
      setShowModal(false);
      setOpen(false);
    }
  } catch (error) {
    console.log(error);
  }
};
  
  if(!recruiter) return "No hay info";
  return (
    <>
      <Box className="flex flex-row">
        <CardMedia
          className='ml-[3rem] mt-[2rem] h-44 rounded-full'
          component="img"
          sx={{ width: 200, objectFit: 'contain' }}
          image={photo}
          alt="ProfilePhoto"
        />
        <CardContent className="flex flex-col justify-center">
          <Typography component="div" variant="h4" className='text-gray-900 dark:text-white w-96'>
            {names} {lastnames} 
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Email: </strong></p><p target="_blank" rel="noopener noreferrer">{email}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Sitio web: </strong></p><a href={website} target="_blank" rel="noopener noreferrer" className='text-blue-600'>{website}</a>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Teléfono: </strong></p><p target="_blank" rel="noopener noreferrer">{phone}</p>
          </Typography>
        </CardContent>
      </Box>
      <Box className="flex flex-row gap-3 w-[29.5rem] pt-[1rem] justify-center">   
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<Badge />}>
          Modificar datos personales
        </Button>
      </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Editar información personal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Editar datos de usuario
          </DialogContentText>
          <info>
          <div>
              <TextField 
                label="Nombre" 
                value={info.names} 
                onChange={handleChange} 
                error={!!errors.names} 
                helperText={errors.names} 
                variant="standard" 
                name='names'/>
          </div>
          <div>
              <TextField 
                label="Apellido" 
                value={info.lastnames} 
                onChange={handleChange} 
                error={!!errors.lastnames} 
                helperText={errors.lastnames} 
                variant="standard" 
                name='lastnames'/>
          </div>
          <div>
              <TextField 
                label="Email" 
                value={info.email}
                onChange={handleChange} 
                error={!!errors.email} 
                helperText={errors.email} 
                variant="standard" 
                name='email'/>
          </div>
          <div>
              <TextField 
                label="Foto" 
                value={info.photo} 
                onChange={handleChange}
                error={!!errors.photo} 
                helperText={errors.photo} 
                variant="standard" 
                name='photo'/>
          </div>
          <div>
              <TextField 
                label="Website" 
                value={info.website} 
                onChange={handleChange}
                error={!!errors.website} 
                helperText={errors.website} 
                variant="standard" 
                name='website'/>
          </div>
          <div>
              <TextField 
                label="Teléfono personal" 
                value={info.phone} 
                onChange={handleChange} 
                error={!!errors.phone} 
                helperText={errors.phone} 
                variant="standard" 
                name='phone'/>
          </div>
          </info>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => setShowModal(true)}>Aceptar</Button>
        </DialogActions>
        <ModalConfirmChangesCompany isVisible={showModal} onClose={() => setShowModal(false)} >
          <h1 className='flex font-bold justify-center p-3 dark:text-text-dark'>Antes de confirmar, verifique los datos</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Nombre:</strong> {info.names}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Apellido:</strong> {info.lastnames}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Email:</strong> {info.email}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Foto:</strong> {info.photo}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Website:</strong> {info.website}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Teléfono:</strong> {info.phone}</h1>
          <div className='flex justify-center p-5'>
            <button className='h-10 w-24 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2' 
              type='submit' 
              onClick={handleSubmit}>Confirmar</button>
          </div>            
        </ModalConfirmChangesCompany>
      </Dialog>
    </>
    )
}

export default ProfileRecruiter