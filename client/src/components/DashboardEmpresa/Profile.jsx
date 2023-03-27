import * as React from 'react';
import {Box, Typography, CardContent, CardMedia, Rating, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Profile = ({company}) => {
  //eslint-disable-next-line no-unused-vars
  console.log(company);
  const [open, setOpen] = React.useState(false);
  if(!company) return "No hay info"

  const {companyname, description, logo, website, email} = company 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
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
      <Typography component="div" variant="subtitle1" className='text-gray-900 dark:text-white'>
        {website}
      </Typography>
      <Rating name="ratingCompany" value={4} readOnly />
    </CardContent>
  </Box>
  <Box className="flex flex-row gap-3">   
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
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Editar información de la empresa y recruiter</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Este modal servirá para abrir un form que edite la información del usuario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
</>
    )
}

export default Profile