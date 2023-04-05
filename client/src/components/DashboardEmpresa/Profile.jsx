import React, {useState, useEffect} from 'react';
import {Box, Typography, CardContent, CardMedia, Rating, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material/';
import {Badge} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import validationsDatosEmpresa from './validationsDatosEmpresa';
import ModalConfirmChangesCompany from './ModalConfirmChangesCompany';
import { useDispatch } from 'react-redux';
import { fetchCountries } from '../../redux/slices/countriesSlices';
import { TextField } from "@mui/material";
import usuario from "../../assets/user.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import FormOfferClean from '../Form/FormCreateOfferClean';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Profile = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countryData, setCountryData] = useState()
  const [selectedCountry, setSelectedCountry] = useState()
  const [selectedCity, setSelectedCity] = useState()
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('userLogin'))
  const company = user.Companies[0]

      // Ajustes para selects
      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;
      const MenuProps = {
          PaperProps: {
              style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
              },
          },
      };
  
//------------------------------------------------Logo de Empresa----------------------------------------------------------------------//

const [imageToRender, setImageToRender] = useState(null);
const [imagetosend, setImageTosend] = useState(null)
const [notValidImage, setNotValidImage] = useState(true);
const idUser = user.id

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
    .post(`/upload-logo-company/${idUser}`, formData)
    .then((response) => {
      console.log(response.data);
      // actualizar localStorage
      let userLogin = JSON.parse(localStorage.getItem('userLogin',))
      userLogin = response.data
      console.log(userLogin);
      localStorage.setItem('userLogin', JSON.stringify(userLogin))
      alert("se modifico el logo de empresa")
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

//----------------------------------------------------------------------------------------------------------------------------------//


  //eslint-disable-next-line no-unused-vars
  const {id, companyname, email_company , company_city, company_country, logo, website, phone_company} = company;

  const [info, setInfo] = useState({
    companyname: company.companyname,
    email_company: company.email_company,
    description: company.description,
    company_city: company.company_city,
    company_country: company.company_country,
    phone_company: company.phone_company,
    website: company.website,
    logo: company.logo
  });

  const [errors, setErrors] = useState({
    companyname: '',
    email_company: '',
    description: '',
    phone_company: '',
    website: '',
  });

  useEffect(() => {
    dispatch(fetchCountries())
    .then((response) => setCountryData(response.payload));
  }, [dispatch]);

const handleCountryChange = (event) => {
    const country = event.target.value;
    setInfo({
        ...info,
        company_country: event.target.value
    })
    setSelectedCountry(country);
    setSelectedCity('');
};
const handleCityChange = (event) => {
    setInfo({
        ...info,
        company_city: event.target.value
    })
    setSelectedCity(event.target.value);
};

const filteredCities = selectedCountry
    ? countryData.find((country) => country.country === selectedCountry)?.cities
    : [];

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
      await axios.put(`/company/${id}`, info);
      const verifyUsrExist = await axios.post(`/user/email`, { email: user.email })
      localStorage.setItem('userLogin', JSON.stringify(verifyUsrExist.data))
      setShowModal(false);
      setOpen(false);
  } catch (error) {
    console.log(error);
  }
};
  
  if(!company) return "No hay info";
  return (
    <div className='bg-primary-light border border-slate-900 dark:border-white dark:text-text-dark dark:bg-secondary-dark m-3 rounded-2xl'>
      <h1 className='text-2xl font-semibold p-2'>Datos de la Empresa</h1>
      <Box className="flex flex-row pt-2 pb-2 px-3 text-left items-center">
      <div className='flex flex-col px-6 w-2/5 items-center gap-6 '>  
        <CardMedia
          className='w-30 h-30 mx-auto object-cover border-2 border-slate-900 dark:border-white'
          component="img"
          image={info?.logo || usuario}
          alt="Live from space album cover"
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
            {companyname}
          </Typography>
          <Typography component="div" variant="h6" className='text-gray-900 dark:text-white'>
            <p><strong>Ubicación: </strong></p><p className='text-sm'>{company_city}, {company_country}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Email: </strong></p><p target="_blank" rel="noopener noreferrer">{email_company}</p>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-gray-900 dark:text-white'>
            <p><strong>Sitio web: </strong></p><a className='text-blue-600' href={website} target="_blank" rel="noopener noreferrer">{website && website.slice(0, 30)}{website && website.length > 30 ? '...' : ''}</a>
          </Typography>
          <Typography component="div" variant="subtitle1" className='text-black-600 dark:text-white'>
            <p><strong>Teléfono: </strong></p><p target="_blank" rel="noopener noreferrer">{phone_company}</p>
          </Typography>
          <div className='flex flex-col'>
          <div className='pt-2'>
            <Button variant="outlined" className='w-full' onClick={() => handleClickOpen()} startIcon={<Badge />}>
            Modificar datos de empresa
            </Button>
          </div>
          <div className='pt-2'>
            <Button variant="contained" onClick={() => setOpenForm(true)} endIcon={<SendIcon />}>
            Crear oferta de empleo
            </Button>
          </div>
          </div>
        </CardContent>
      </Box>
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className='flex w-auto justify-center'>
        <DialogTitle>Editar información de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Editar datos de usuario
          </DialogContentText>
          <info>
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
                label="Teléfono de la empresa" 
                value={info.phone_company} 
                onChange={handleChange} 
                error={!!errors.phone_company} 
                helperText={errors.phone_company} 
                variant="standard" 
                name='phone_company'/>
          </div>
          <div>
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
                  className="info-input mt-1 block rounded-md border-gray-300 shadow-sm w-full mx-2 text-base">
                    {
                    filteredCities?.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))
                  }
                </Select>
            </FormControl>
          </div>  
          <div>
              <TextField 
                label="Descripción" 
                value={info.description} 
                onChange={handleChange} 
                error={!!errors.description} 
                helperText={errors.description} 
                variant="standard" 
                name='description'/>
          </div>
          </info>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button 
          // onClick={() => errorsNew.length === 0 ? setShowModal(true) : setErrors(errorsNew)}>Aceptar</Button>
          // onClick={() => setShowModal(true)}>Aceptar</Button>
          onClick={() => {
            const errorsNew = validationsDatosEmpresa(info);
            setErrors(errorsNew);
            const noErrors = Object.values(errorsNew).every(error => error === '');
            if (noErrors) {
              setShowModal(true);
            }
          }}>Aceptar</Button>
        </DialogActions>
        <ModalConfirmChangesCompany isVisible={showModal} onClose={() => setShowModal(false)} >
          <h1 className='flex font-bold justify-center p-3 dark:text-text-dark'>Antes de confirmar, verifique los datos</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Nombre de la empresa:</strong> {info.companyname}</h1>                
          <h1 className='p-1 dark:text-text-dark'><strong>Email de la empresa:</strong> {info.email_company}</h1>                
          <h1 className='p-1 dark:text-text-dark'><strong>Logo:</strong> {info.logo}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Website:</strong> {info.website}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>País:</strong> {info.company_country}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Ciudad:</strong> {info.company_city}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Teléfono:</strong> {info.phone_company}</h1>
          <h1 className='p-1 dark:text-text-dark'><strong>Descripción:</strong> {info.description} </h1>
          <div className='flex justify-center p-5'>
            <button className='h-10 w-24 bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2' 
              type='submit' 
              onClick={handleSubmit}>Confirmar</button>
          </div>
        </ModalConfirmChangesCompany>
      </Dialog>

      <Dialog
          open={openForm}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenForm(false)}
          aria-describedby="alert-dialog-slide-description"
          className='flex w-auto justify-center bg-black bg-opacity-50'>
        <DialogTitle className='bg-secondary-light dark:text-white dark:bg-primary-dark'>Crear nueva oferta de empleo</DialogTitle>
        <DialogContent className='flex justify-center bg-primary-light bg-opacity-50'>
          <FormOfferClean/>
        </DialogContent>
      </Dialog>
    </div>
    )
}

export default Profile