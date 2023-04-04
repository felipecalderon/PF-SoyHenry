import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Modal, Rating, Stack, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";


const FeedbackGeneralForm = ({ open, handleClose, data }) => {
  const [form, setForm] = useState({
    username: '',
    rating: 2,
    comentario: '',
  });
  if (!data) return null
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="flex flex-col justify-center items-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl"
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
                <Stack spacing={1} className="w-full flex items-center">
                  <Rating name="size-large" value={form.rating} defaultValue={2} size="large" />
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
                  variant="standard"
                  name='comentario' />
              </div>
            </div>
          </form>
          <div className='flex items-center justify-center mb-4'>
            <Box sx={{ '& > button': { m: 1, width: '200px', height: '60px', fontWeight: '700' } }}>
              <LoadingButton
                // className={`${isErrorsEmpty && isFormComplete ? "" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
                // onClick={handleClick}
                // loading={loading}
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
