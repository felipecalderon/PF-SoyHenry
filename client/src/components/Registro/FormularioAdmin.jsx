import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from "axios";

const FormularioAdmin = () => {
    const [form, setForm] = useState({
        names: "",
        lastnames: "",
        email: "",
        phone: "",
        password: "",
        pais: "",
        ciudad: "",
        rol: 'Admin',
        active: true,
    })

    const [errors, setErrors] = useState({
        names: "",
        lastnames: "",
        email: "",
        phone: "",
        password: "",
        pais: "",
        ciudad: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const validationConfPassword = (validar) => {
        if (validar.hasOwnProperty('confpassword')) {
            if (validar.confpassword === '') return { ...errors, confpassword: 'Se requiere validar la contraseña *' };
            if (form.password !== validar.confpassword) return { ...errors, confpassword: 'Las contraseñas no son' }
            if (form.password === validar.confpassword) return { ...errors, confpassword: '' };
        }
    }
    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true);
    
            // Crea el usuario en la base de datos
            const registroUsuario = await axios.post('/auth/register', form)
            console.log(registroUsuario);
            return alert('Administrador creado exitosamente')
        } catch (error) {
            console.log(error);
            setForm({
                names: "",
                lastnames: "",
                email: "",
                phone: "",
                password: "",
                pais: "",
                ciudad: "",
                rol: 'Admin',
                active: true,
            })
            return alert('No se pudo crear al Administrador')
        }

    }
    return(
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
            <div className="w-full flex flex-wrap justify-center">
                <div className="mr-4 my-4">
                    <TextField label="Nombre del Admin" value={form.names} onChange={handleChange} variant="standard" name='names' />
                </div>
                <div className="mr-4 my-4">
                    <TextField label="Apellid del Admin" value={form.lastnames} onChange={handleChange}  variant="standard" name='lastnames' />
                </div>
                <div className="mr-4 my-4">
                    <TextField label="Email del Admin" value={form.email} onChange={handleChange} variant="standard" name='email' />
                </div>
                <div className="mr-4 my-4">
                    <TextField label="Teléfono del Admin" value={form.phone} onChange={handleChange} variant="standard" name='phone' />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-center">
                <div className="mr-4 my-4">
                    <TextField
                        label="Contraseña" value={form.password} onChange={handleChange} variant="standard" name='password'
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
                    onClick={handleSubmit}
                    color="warning"
                    loadingPosition="center"
                    variant="contained"
                    type='submit'
                >
                    <span>Crear cuenta</span>
                </LoadingButton>
            </Box>
        </div>
    </form>
    )
}

export default FormularioAdmin