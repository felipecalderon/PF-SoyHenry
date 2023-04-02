/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../../redux/slices/countriesSlices";
import { saveUser } from "../../redux/slices/userRegisterSlice";
import axios from "axios";

import working2 from '../../assets/working2.png';
import validationsRegisterCompany from "./validationsRegisterCompany";

import { NavLanding } from "../NavLanding/NavLanding";
import Footer from "../Footer/Footer";

// Mui core;
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';


export const menu = [
    {
        name: "Planes",
        link: "#"
    },
    {
        name: "Sobre Nosotros",
        link: "/about"
    },
    {
        name: "Registrarme como postulante",
        link: "/registro"
    },
]

export const RegistroEmpresa = () => {
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

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [userDbData, setUserDbData] = useState(null);

    const [form, setForm] = useState({
        names: '',
        companyname: '',
        email_company: '',
        phone_company: '',
        lastnames: '',
        password: '',
        confpassword: '',
        email: '',
        description: '',
        company_city: '',
        company_country: '',
        website: '',
        logo: '',
        rol: 'Empresa',
        active: true
    });

    const [errors, setErrors] = useState({
        names: '',
        companyname: '',
        email_company: '',
        phone_company: '',
        lastnames: '',
        password: '',
        confpassword: '',
        email: '',
        description: '',
        company_city: '',
        company_country: '',
        website: '',
        logo: '',
    });

    const userData = JSON.parse(localStorage.getItem('usergoogle'))

    useEffect(() => {
        if (userData) {
            const [names, lastnames] = userData.name.split(" ");
            setForm({
                ...form,
                names,
                lastnames,
                email: userData.email,
            })
        }
    }, []) // eslint-disable-line

    const [countryData, setCountryData] = useState()
    const [selectedCountry, setSelectedCountry] = useState()
    const [selectedCity, setSelectedCity] = useState()

    useEffect(() => {
        dispatch(fetchCountries())
            .then((response) => setCountryData(response.payload));
    }, [dispatch]);

    const handleCountryChange = (event) => {
        const company_country = event.target.value;
        setForm({
            ...form,
            company_country: company_country
        })
        setSelectedCountry(company_country);
        setSelectedCity('');
    };
    const handleCityChange = (event) => {
        setForm({
            ...form,
            company_city: event.target.value
        })
        setSelectedCity(event.target.value);
    };

    const filteredCities = selectedCountry
        ? countryData.find((company_country) => company_country.country === selectedCountry)?.cities
        : [];

    // validacion de confpassword
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validationConfPassword = (validar) => {
        if (validar.hasOwnProperty('confpassword')) {
            if (validar.confpassword === '') return { ...errors, confpassword: 'Se requiere validar la contraseña *' };
            if (form.password !== validar.confpassword) return { ...errors, confpassword: 'Las contraseñas no son' }
            if (form.password === validar.confpassword) return { ...errors, confpassword: '' };
        }
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })

        const validationErrors = event.target.name !== 'confpassword' ?
            validationsRegisterCompany({
                [event.target.name]: event.target.value
            })
            : validationConfPassword({
                [event.target.name]: event.target.value,
            });
        setErrors({ ...errors, ...validationErrors });
    };

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClick = async () => {
        // bloquea el boton
        setLoading(true);

        // Crea el usuario en la base de datos
        const registroUsuario = await axios.post('/auth/register', form)

        // Guarda los datos en localStorage 
        const verifyUsrExist = await axios.post(`/user/email`, { email: registroUsuario.data.email })
        localStorage.setItem('userLogin', JSON.stringify(verifyUsrExist.data))


        // Guarda los datos en Redux
        dispatch(saveUser(registroUsuario.data))

        // Mensaje y redirige si todo fue exitoso
        handleOpen()
    };

    // validacion para habilitar el boton
    const formValues = Object.values(form);
    const errorsValue = Object.values(errors);
    const isFormComplete = formValues.every(value => value !== '' && value !== null);
    const isErrorsEmpty = errorsValue.every(value => value === '');

    return (
        <div className="w-full h-screen flex flex-col justify-between bg-primary-light dark:bg-secondary-dark">
            <NavLanding menu={menu} />
            <div className='w-full mx-auto px-4 py-8 mt-14 bg-primary-light dark:bg-secondary-dark'>
                <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white'>¡Registrate como Recruiter y encuentra al mejor candidato!</h2>
                <div className='flex flex-col md:flex-row items-center justify-center mb-12'>
                    <img src={working2} alt='work1' className='w-full md:w-3/5 lg:w-2/5 mb-8 md:mb-0 rounded-lg' />
                    <form className='w-full flex flex-col m-4' >
                        <Box
                            className="flex flex-col"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                                '& .MuiInputBase-input': { color: 'darkorange' },
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "darkorange",
                                },
                                '& .MuiInputLabel-root': { color: 'darkorange' }
                            }}
                            noValidate
                            autoComplete="on"
                        >
                            <p className='w-full text-2xl font-bold mb-8 text-center dark:text-white'>
                                Datos del Reclutador
                            </p>
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField label="Nombres del Recruiter" value={form.names} onChange={handleChange} error={!!errors.names} helperText={errors.names} variant="standard" name='names' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Apellidos del Recruiter" value={form.lastnames} onChange={handleChange} error={!!errors.lastnames} helperText={errors.lastnames} variant="standard" name='lastnames' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Email del Recruiter" value={userData ? userData.email : form.email} onChange={handleChange} error={!!errors.email} helperText={userData ? 'No puedes modificar el correo' : errors.email ? errors.email : 'Ej. correo@gmail.com'} variant="standard" name='email' />
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField
                                        label="Contraseña" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} variant="standard" name='password'
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField
                                        label="Confirmar contraseña" onChange={handleChange} error={!!errors.confpassword} helperText={errors.confpassword} variant="standard" name='confpassword'
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='w-full my-5 text-2xl font-bold text-center dark:text-white'>
                                Datos de la Empresa
                            </div>
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField label="Nombre de la empresa" value={form.companyname} onChange={handleChange} error={!!errors.companyname} helperText={errors.companyname} variant="standard" name='companyname' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Número de contacto" value={form.phone_company} onChange={handleChange} error={!!errors.phone_company} helperText={errors.phone_company ? errors.phone_company : 'Ej. +573215894786'} variant="standard" name='phone_company' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Correo de la empresa" value={form.email_company} onChange={handleChange} error={!!errors.email_company} helperText={errors.email_company ? errors.email_company : 'Ej. contacto@empresa.com'} variant="standard" name='email_company' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Logo" value={form.logo} onChange={handleChange} error={!!errors.logo} helperText={errors.logo ? errors.logo : "http://www.logo.com"} variant="standard" name='logo' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Website" value={form.website} onChange={handleChange} error={!!errors.website} helperText={errors.website ? errors.website : "http://www.website.com"} variant="standard" name='website' />
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <FormControl variant="standard" sx={{ '& > :not(style)': { m: 1, width: '30ch' } }} >
                                        <InputLabel id="demo-simple-select-standard-label"> País </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                            MenuProps={MenuProps}
                                            label="País"
                                            name='company_country'
                                        >
                                            {
                                                countryData?.map((company_country) => (
                                                    <MenuItem key={company_country.country} value={company_country.country}>
                                                        {company_country.country}
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
                                            name='company_city'
                                            disabled={!selectedCountry} className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-full mx-2 text-base"
                                        >
                                            {
                                                filteredCities?.map((company_city) => (
                                                    <MenuItem key={company_city} value={company_city}>
                                                        {company_city}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mr-4 my-4">
                                <TextField label="Descripción" multiline rows={6} rowsMax={10} style={{ width: '100%', margin: 16 }} className="custom-textfield" value={form.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} variant="standard" name='description' />
                            </div>
                        </Box>
                        <div className='flex items-center justify-center'>
                            <Box sx={{ '& > button': { m: 1, width: '150px', height: '60px', fontWeight: '700' } }}>
                                <LoadingButton
                                    className={`${isErrorsEmpty && isFormComplete ? "" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
                                    onClick={handleClick}
                                    loading={loading}
                                    color="warning"
                                    loadingPosition="center"
                                    variant="contained"
                                    type='submit'
                                >
                                    <span>Crear cuenta</span>
                                </LoadingButton>
                            </Box>
                        </div>
                        <div className='mt-4 text-center'>
                            <p className='text-gray-700 dark:text-white text-sm'>Al hacer click en Crear Cuenta, aceptas las <a className="text-secondary-light dark:text-primary-dark" href='#'>Condiciones de uso</a> y las <a className="text-secondary-light dark:text-primary-dark" href='#'>Políticas de privacidad</a> de Fusionajob.</p>
                        </div>
                    </form>
                </div>
                <div>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl flex-col justify-center items-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
                                !Gracias por unirte a FusionaJob!
                            </h1>
                            <h2 className="text-2xl  text-center dark:text-white">
                                Ya puedes empezar a...
                            </h2>
                            <h3 className="mb-8 text-2xl font-bold text-center dark:text-white">
                                !Publicar ofertas!
                            </h3>
                            <div w-full flex flex-wrap justify-center >
                                <Link to={'/dashboardempresa'}>
                                    <button className="m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Ir al Perfil
                                    </button>
                                </Link>
                                <Link to={'/offersCreate'}>
                                    <button className="m-3 h-16 w-40 bg-primary-dark hover:bg-purple-900  dark:bg-secondary-light dark:hover:bg-yellow-500  text-white dark:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Publicar ofertas
                                    </button>
                                </Link>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    )
}