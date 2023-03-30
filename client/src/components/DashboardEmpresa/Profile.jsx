import React, {useState} from 'react';
import {Box, Typography, CardContent, CardMedia, Rating, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import validationsDatosEmpresa from './validationsDatosEmpresa';
import ModalConfirmChangesCompany from './ModalConfirmChangesCompany';
import FormControl from '@mui/material/FormControl';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Profile = ({company, user}) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  //eslint-disable-next-line no-unused-vars
  const {id, companyname, email_company, logo, location, website, phone_company, likes_count} = company;
  const {city, country} = user;
  
  const [info, setInfo] = useState({
		companyname: company.companyname,
    email_company: company.email_company,
		description: company.description,
		location: company.location,
		phone_company: company.phone_company,
		website: company.website,
		logo: company.logo,
		likes_count: company.likes_count
  });

  const [errors, setErrors] = useState({
    companyname: '',
    email_company: '',
    description: '',
    location: '',
    phone_company: '',
    website: '',
    logo: '',
    likes_count: '',
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
  event.preventDefault();
  const errorsNew = validationsDatosEmpresa(info);
  console.log(info);
  setErrors(errorsNew);
  if (Object.keys(errorsNew).length === 0) {
    await axios.put(`/company/${id}`, info);
    alert('Los datos se han actualizado.');
    setShowModal(false);
    setOpen(false);
  }
};
  
  if(!company) return "No hay info";
  return (
    <>
      <Box className="flex flex-row">
        <CardMedia
          className='ml-[3rem]'
          component="img"
          sx={{ width: 200, objectFit: 'contain' }}
          image={logo}
          alt="Live from space album cover"
        />
        <CardContent className="flex flex-col justify-center">
          <Typography component="div" variant="h4" className='text-gray-900 dark:text-white'>
            {companyname}
          </Typography>
          <Typography component="div" variant="h6" className='text-gray-900 dark:text-white'>
            <p className='text-sm'>{city}, {country}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-blue-600'>
            <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p target="_blank" rel="noopener noreferrer">{location}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p target="_blank" rel="noopener noreferrer">{phone_company}</p>
          </Typography>
          <Rating name="ratingCompany" value={4} readOnly />
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p target="_blank" rel="noopener noreferrer">Likes: {likes_count}</p>
          </Typography>
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
              <TextField 
                label="Nombre de la empresa" 
                value={info.companyname} 
                onChange={handleChange} 
                error={!!errors.companyname} 
                helperText={errors.companyname} 
                variant="standard" 
                name='companyname'/>
          </div>
          <div>
              <TextField 
                label="Email de la empresa" 
                value={info.email_company} 
                onChange={handleChange} 
                error={!!errors.email_company} 
                helperText={errors.email_company} 
                variant="standard" 
                name='email_company'/>
          </div>
          <div>
              <TextField 
                label="Logo" 
                value={info.logo} 
                onChange={handleChange}
                error={!!errors.logo} 
                helperText={errors.logo} 
                variant="standard" 
                name='logo'/>
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
          {/* <div>
          <FormControl variant="standard" sx={{ '& > :not(style)': { m: 1, width: '30ch' } }} >
            <InputLabel id="demo-simple-select-standard-label"> País </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedCountry}
                onChange={handleCountryChange}
                MenuProps={MenuProps}
                label="País"
                name='country'>
                  {
                    countryData?.map((country) => (
                      <MenuItem key={country.country} value={country.country}>
                        {country.country}
                      </MenuItem>
                    ))
                  }
              </Select>
          </FormControl>
          </div>
        <div className="mr-4 my-4">
            <FormControl variant="standard" sx={{ '& > :not(style)': { m: 1, width: '30ch' } }} >
                <InputLabel id="demo-simple-select-standard-label"> Ciudad </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedCity}
                  onChange={handleCityChange}
                  MenuProps={MenuProps}
                  label="Ciudad"
                  name='city'
                  disabled={!selectedCountry} 
                  className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-full mx-2 text-base">
                    {
                    filteredCities?.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))
                  }
                </Select>
            </FormControl>
          </div>   */}
          <div>
              <TextField label="Descripción" value={info.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} variant="standard" name='description' />
          </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => setShowModal(true)}>Aceptar</Button>
        </DialogActions>
        <ModalConfirmChangesCompany isVisible={showModal} onClose={() => setShowModal(false)} >
          <h1 className='flex font-bold justify-center p-3 dark:text-text-dark'>Antes de confirmar, verifique los datos</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Nombre de la empresa:</strong> {info.companyname}</h1>                
          <h1 className='p-1 dark:text-text-dark'><strong>Email de la empresa:</strong> {info.email_company}</h1>                
          <h1 className='p-1 dark:text-text-dark'><strong>Logo:</strong> {info.logo}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Website:</strong> {info.website}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Ubicacion:</strong> {info.location}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Descripción:</strong> {info.description} </h1>
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

export default Profile