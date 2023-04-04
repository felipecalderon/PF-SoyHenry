import React, {useState, useEffect} from 'react';
import {Box, Typography, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import axios from 'axios';
import usuario from "../../assets/user.png"
import validationsDatosRecruiter from './validationsDatosRecruiter';
import ModalConfirmChangesCompany from './ModalConfirmChangesCompany';
import { TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ProfileRecruiter = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('userLogin'))
  const recruiter = user
  const dataUserGoogle = JSON.parse(localStorage.getItem('usergoogle'))
  let dataUser = JSON.parse(localStorage.getItem("userLogin"));

//------------------------------------------------Foto de Perfil----------------------------------------------------------------------//

  const [imageToRender, setImageToRender] = useState(null);
  const [imagetosend, setImageTosend] = useState(null)
  const [notValidImage, setNotValidImage] = useState(true);
  const idUser = dataUser.id

  const handleImageInputChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage.size > 5 * 1024 * 1024) {
      // manejar el caso en el que la imagen seleccionada es demasiado grande
      setImageToRender(null);
      setNotValidImage(true);
    }
    if (!["image/png", "image/jpeg"].includes(selectedImage.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setImageToRender(null);
      setNotValidImage(true);
    } else {
      setNotValidImage(false);
      setImageToRender(URL.createObjectURL(selectedImage));
      console.log(imageToRender)
      setImageTosend(selectedImage)
    }
  };
  
  const handleSubmitImage = (event) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("imagenes", imagetosend);
    console.log(formData)
    axios
      .post(`/upload-photo-user/${idUser}`, formData)
      .then((response) => {
        // actualizar localStorage
        let userLogin = JSON.parse(localStorage.getItem('userLogin'))
        userLogin = response.data
        localStorage.setItem('userLogin', JSON.stringify(userLogin))
        alert("se modifico la foto de perfil")
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
//----------------------------------------------------------------------------------------------------------------------------------//
  
  //eslint-disable-next-line no-unused-vars
  const {id, names, lastnames, email, phone, photo, website} = recruiter;

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
      await axios.put(`/user/${id}`, info);
      const verifyUsrExist = await axios.post(`/user/email`, { email: user.email })
      localStorage.setItem('userLogin', JSON.stringify(verifyUsrExist.data))
      setShowModal(false);
      setOpen(false);
  } catch (error) {
    console.log(error);
  }
};
  
  if(!recruiter) return "No hay info";
  return (
    <div className='bg-primary-light border border-slate-900 dark:border-white dark:text-text-dark dark:bg-secondary-dark m-3 rounded-2xl'>
      <h1 className='text-2xl font-semibold p-2'>Datos del reclutador</h1>
      <Box className="flex flex-row pt-2 pb-6 px-3 items-center">
        <div className='flex flex-col w-2/5 px-6 items-center gap-6'>
        <CardMedia
          className='w-30 h-30 mx-auto object-cover rounded-full border-2 border-slate-900 dark:border-white'
          component="img"
          image={info?.photo || dataUserGoogle?.photo || usuario}
          alt="ProfilePhoto"
        />
        <div className='flex justify-center'>
            <LoadingButton
              onClick={handleSubmitImage}
              disabled={notValidImage}
              loading={loading}
              color="warning"
              loadingPosition="center"
              variant="contained">
              <span>Modificar imagen</span>
            </LoadingButton>
          </div>
          <input className='flex w-52 sm:w-40' type="file" onChange={handleImageInputChange}/>
        </div>
        <CardContent className="flex flex-col w-3/5 justify-center text-left">
          <Typography component="div" variant="h4" className='text-gray-900 dark:text-white'>
            {names} {lastnames} 
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Email: </strong></p><p target="_blank" rel="noopener noreferrer">{email}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Sitio web: </strong></p><a href={website} target="_blank" rel="noopener noreferrer" className='text-blue-600'>{website && website.slice(0, 30)}{website && website.length > 30 ? '...' : ''}</a>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Teléfono: </strong></p><p target="_blank" rel="noopener noreferrer">{phone}</p>
          </Typography>
          <div className='flex pt-2'>
            <Button variant="outlined" className='w-full' onClick={handleClickOpen} startIcon={<Badge />}>
            Modificar datos personales
            </Button>
          </div>
        </CardContent>
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
          <Button 
          // onClick={() => errorsNew.length === 0 ? setShowModal(true) : setErrors(errorsNew)}>Aceptar</Button>
          // onClick={() => setShowModal(true)}>Aceptar</Button>
          onClick={() => {
            const errorsNew = validationsDatosRecruiter(info);
            setErrors(errorsNew);
            const noErrors = Object.values(errorsNew).every(error => error === '');
            if (noErrors) {
              setShowModal(true);
            }
          }}>Aceptar</Button>
        </DialogActions>
        <ModalConfirmChangesCompany isVisible={showModal}>
          <div className='flex flex-col relative'>
            <div className="absolute top-0 right-0 m-1 mt-2 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={() => setShowModal(false)}>
              <HighlightOffIcon sx={{color:'red'}} />
            </div>
              <h1 className='flex font-bold justify-center p-3 dark:text-text-dark'>Antes de confirmar, verifique los datos</h1>
              <h1 className='p-1 dark:text-text-dark'><strong>Nombre:</strong> {info.names}</h1>
              <h1 className='p-1 dark:text-text-dark'><strong>Apellido:</strong> {info.lastnames}</h1>
              <h1 className='p-1 dark:text-text-dark'><strong>Email:</strong> {info.email}</h1>
              <h1 className='p-1 dark:text-text-dark'><strong>Website:</strong> {info.website}</h1>
              <h1 className='p-1 dark:text-text-dark'><strong>Teléfono:</strong> {info.phone}</h1>
              <div className='flex justify-center p-5'>
                <button className='h-10 w-24 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2' 
                  type='submit' 
                  onClick={handleSubmit}>Confirmar</button>
              </div>            
          </div>
        </ModalConfirmChangesCompany>
      </Dialog>
    </div>
    )
}

export default ProfileRecruiter