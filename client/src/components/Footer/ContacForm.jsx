import { useEffect, useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from 'axios'
import validationsDatosContac from "./validationsDatosContac";


const ContactForm = ({ open, handleClose, data }) => {

  const [form, setForm] = useState({
    userId: data ? data.id : 'No obtenido',
    usuario: data ? data.names + ' ' + data.lastnames : '',
    correo: data ? data.email : '',
    asunto: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({
    usuario: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });


  const [loading, setLoading] = useState(false);
  const [existReview, setExistReview] = useState(false) // eslint-disable-line
  const formValues = Object.values(form);
  const isFormComplete = formValues.every(value => value !== '' && value !== null);

  useEffect(() => {
    axios.get(`/review/${data?.id}`)
      .then(res => {
        if (res.data) return setExistReview(true)
      })
  }, []) // eslint-disable-line

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    setForm({
      ...form,
      [name]: value
    })
    const validationErrors =
      validationsDatosContac({
        [name]: value
      })
    setErrors({ ...errors, ...validationErrors });
  };
  console.log(errors)

  const handleClick = async () => {
    // bloquea el boton
    setLoading(true);

    // Crea el Comentario
    await axios.post(`/pqrs`, form)
      .then(res => {
        // Mensaje y redirige si todo fue exitoso
        alert('Gracias por tu PQRS ¡Nuestros asesores se contactaran contigo muy pronto!')
        handleClose();
        setForm({
          userId: data ? data.id : 'No obtenido',
          usuario: data ? data.names + ' ' + data.lastnames : '',
          correo: data ? data.email : '',
          asunto: '',
          mensaje: '',
        });
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        alert('Seprodujo un error al hacer la PQRS, intentalo nuevamente, si el problema persiste Contactanos por medio de nuestras redes ¡Sociales!')
        handleClose()
        setLoading(false);
      })
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-30 py-4 px-8 h-auto sm:h-auto rounded-2xl flex-col justify-center items-center"
          component="form"
          noValidate
          autoComplete="on"
        >
          <div className="absolute top-0 right-0 m-4 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={handleClose}>
            <HighlightOffIcon sx={{ color: 'red' }} />
          </div>
          <form className='w-full flex flex-col m-4'>
            <div className="w-full">
              <div className="flex flex-col justify-center align-Center mr-4 my-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-1 text-center dark:text-white mt-4">
                  !PQRS!
                </h1>
                <p className="w-full flex justify-center mb-8 dark:text-white ">
                  (Peticiones, Quejas, Reclamos y sugerencias)
                </p>
                <div className="w-full flex flex-col md:pr-40 mb-5">
                  <TextField sx={{
                    '& > :not(style)': { m: 1 },
                    '& .MuiInputBase-input': { color: 'darkorange' },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "darkorange",
                    },
                    '& .MuiInputLabel-root': { color: 'darkorange', mt: '-10px' },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: 'darkorange'
                    }
                  }}
                    label="Nombre"
                    className="custom-textfield "
                    value={form.usuario}
                    onChange={handleChange}
                    variant="standard"
                    name={data ? '' : 'usuario'}
                    error={!!errors.usuario} helperText={errors.usuario}
                  />
                </div>
                <div className="w-full flex flex-col md:pr-40 mb-5">
                  <TextField sx={{
                    '& > :not(style)': { m: 1 },
                    '& .MuiInputBase-input': { color: 'darkorange' },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "darkorange",
                    },
                    '& .MuiInputLabel-root': { color: 'darkorange', mt: '-10px' },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: 'darkorange'
                    }
                  }}
                    label="Correo"
                    className="custom-textfield"
                    value={form.correo}
                    onChange={handleChange}
                    variant="standard"
                    name={data ? '' : 'correo'}
                    error={!!errors.correo} helperText={errors.correo}
                  />
                </div>
                <div className="w-full flex flex-col md:pr-40 mb-5">
                  <TextField sx={{
                    '& > :not(style)': { m: 1 },
                    '& .MuiInputBase-input': { color: 'darkorange' },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "darkorange",
                    },
                    '& .MuiInputLabel-root': { color: 'darkorange', mt: '-10px' },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: 'darkorange'
                    }
                  }}
                    label="Asunto"
                    className="custom-textfield"
                    value={form.asunto}
                    onChange={handleChange}
                    variant="standard"
                    name='asunto'
                    error={!!errors.asunto} helperText={errors.asunto}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <TextField sx={{
                    '& > :not(style)': { m: 1 },
                    '& .MuiInputBase-input': { color: 'darkorange' },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "darkorange",
                    },
                    '& .MuiInputLabel-root': { color: 'darkorange', mt: '-10px' },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: 'darkorange'
                    }
                  }}
                    label="Mensaje"
                    multiline
                    rows={6}
                    rowsMax={10}
                    style={{ width: '100%' }}
                    className="custom-textfield"
                    value={form.mensaje}
                    onChange={handleChange}
                    variant="standard"
                    name='mensaje'
                    error={!!errors.mensaje} helperText={errors.mensaje}

                  />
                </div>
              </div>
            </div>
          </form>
          <div className='flex items-center justify-center mb-4'>
            <Box sx={{ '& > button': { m: 1, width: '200px', height: '60px', fontWeight: '700' } }}>
              <LoadingButton
                className={`${isFormComplete ? "" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
                onClick={handleClick}
                loading={loading}
                color="warning"
                loadingPosition="center"
                variant="contained"
                type='submit'
              >
                <span> Enviar </span>
              </LoadingButton>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactForm;
