import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validationsRegister from "./validationsRegister";
import axios from "axios";
import { saveUser } from "../../redux/slices/userRegisterSlice";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const FormularioPostulante = ({handleOpen}) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        confpassword: '',
        phone: '',
        rol: 'Postulante',
        active: true
    });

    const [errors, setErrors] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        confpassword: '',
        phone: ''
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
            validationsRegister({
                [event.target.name]: event.target.value
            })
            : validationConfPassword({
                [event.target.name]: event.target.value,
            });
        setErrors({ ...errors, ...validationErrors });
    };

    // const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        // bloquea el boton
        setLoading(true);

        // Crea el usuario en la base de datos
        const userDbData = await axios.post('/auth/register', form)
            .catch(() => {
                setErrors({
                    ...errors,
                    email: '¡Este correo ya esta registrado!'
                })
            })
            .finally(() => {
                setLoading(false);
            })

        // Guarda los datos en localStorage 
        const objetoJSON = JSON.stringify(userDbData.data)
        const usuarioLogueado = JSON.parse(localStorage.getItem('userLogin'))
        if(!usuarioLogueado) {
            localStorage.setItem('userLogin', objetoJSON)
            dispatch(saveUser(userDbData.data))
            handleOpen()
        }else{
            setForm({
                names: '',
                lastnames: '',
                email: '',
                password: '',
                confpassword: '',
                phone: '',
                rol: 'Postulante',
                active: true
            })
            alert('Postulante Creado')
        }
    };
    

    // validacion para habilitar el boton
    const formValues = Object.values(form);
    const errorsValue = Object.values(errors);
    const isFormComplete = formValues.every(value => value !== '' && value !== null);
    const isErrorsEmpty = errorsValue.every(value => value === '');

    return (
    <>
        <form className='w-full flex flex-col m-4'>
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
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField label="Nombres" value={form.names} onChange={handleChange} error={!!errors.names} helperText={errors.names} variant="standard" name='names' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Apellidos" value={form.lastnames} onChange={handleChange} error={!!errors.lastnames} helperText={errors.lastnames} variant="standard" name='lastnames' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Email" value={userData ? userData.email : form.email} onChange={handleChange} error={!!errors.email} helperText={userData ? 'No puedes modificar el correo' : errors.email ? errors.email : 'Ej. correo@gmail.com'} variant="standard" name='email' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Phone" value={form.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone ? errors.phone : 'Ej. +573215894786'} variant="standard" name='phone' />
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
    </>
    )
}

export default FormularioPostulante