import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Modal, Rating, Stack, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import axios from 'axios'


const FeedbackGeneralForm = ({ open, handleClose, data }) => {
  
  const userData = JSON.parse(localStorage.getItem('usergoogle'))
  const [form, setForm] = useState({
    idUser: data.id ,
    username: data.names,
    photo: data?.photo || userData?.photo,
    puntuacion: 3,
    comentario: '',
  });

  const [loading, setLoading] = useState(false);
  const [existReview, setExistReview] = useState(false)
  const formValues = Object.values(form);
  const isFormComplete = formValues.every(value => value !== '' && value !== null);

  useEffect(() => {
    axios.get(`/review/${data?.id}`)
    .then(res=>{
      console.log(res.data)
      if (res.data) return setExistReview(true)
  })
  },[])

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    setForm({
      ...form,
      [name]: value
    })
  };

  const handleClick = async () => {
    // bloquea el boton
    setLoading(true);

    // Crea el Comentario
    await axios.post(`/review`, form)
      .then(res => {
        // Mensaje y redirige si todo fue exitoso
        alert('Gracias por tu FeedBack, que ¡Tengas un gran día!')
        handleClose()
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
        alert('Seprodujo un error al hacer el comentario, intentalo nuevamente, si el problema persiste Contactate con Soporte')
        handleClose()
        setLoading(false);
      })
  };

  if (!data) return null
  if (existReview) return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-30 p-4 h-auto sm:h-auto rounded-2xl flex-col justify-center items-center"
        component="form"
        noValidate
        autoComplete="on"
      >
        <div className="absolute top-0 right-0 m-4 px-2 rounded-full cursor-pointer text-xl dark:text-white hover:scale-150 transition-all" onClick={handleClose}>
          <HighlightOffIcon sx={{ color: 'red' }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white mt-4">
          !Gracias! ya recibimos tu feedback, solo recibimos uno por usuario si deseas comentarnos algo más...
        </h1>
        <div className='flex items-center justify-center mb-4'>
          <Link to={'/contact'}>
          <Box sx={{ '& > button': { m: 1, width: '200px', height: '60px', fontWeight: '700' } }}>
            <LoadingButton
              color="warning"
              loadingPosition="center"
              variant="contained"
              type='submit'
            >
              <span>Contacta con nosotros</span>
            </LoadingButton>
          </Box>
          </Link>
        </div>
      </Box>
    </Modal>
  )
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-30 p-4 h-auto sm:h-auto rounded-2xl flex-col justify-center items-center"
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
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white mt-4">
                  !Comentanos y Puntua tu experiencia!
                </h1>
                <div className="w-full flex justify-center align-Center">
                  <img src={form.photo} style={{ width: "70px", borderRadius: '15px' }} alt="Foto de Usuario" />
                </div>
                <div className="w-full flex justify-center align-Center">
                  <h2 className="text-black dark:text-white">{form.names}</h2>
                </div>
                <Stack spacing={1} className="w-full flex items-center">
                  <Rating name="puntuacion" onChange={handleChange} value={form.puntuacion} size="large" />
                </Stack>
                <TextField sx={{
                  '& > :not(style)': { m: 1 },
                  '& .MuiInputBase-input': { color: 'darkorange' },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "darkorange",
                  },
                  '& .MuiInputLabel-root': { color: 'darkorange' }
                }}
                  label="Comentario"
                  multiline
                  rows={6}
                  rowsMax={10}
                  style={{ width: '100%', margin: 16 }}
                  className="custom-textfield"
                  value={form.comentario}
                  onChange={handleChange}
                  variant="standard"
                  name='comentario' />
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
                <span>Enviar Comentario</span>
              </LoadingButton>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackGeneralForm;
