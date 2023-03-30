import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import logofusionajob from '../../assets/logofusionajob.png'


function Favoritos() {

    const [favoritos, setFavoritos] = useState();

//     Number(jobId.id) ? 
// axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=unsave&title=${jobId.title}&origin=db`)
// : axios.put(`/rel_offers/${jobId.id}/${dataUser.id}?save=unsave&title=${jobId.title}&origin=api`) 
// setIsFavorite(false)
// return alert("Se ha eliminado la oferta de tu lista guardados")

    
  return (
    <>
    {
      favoritos?.length?
    <>
     { favoritos.map((favorito) => (
        <Box key={favorito.id}>
          <h2 className="bg-white rounded-xl p-4 border mb-4 text-center flex justify-between">
            <Fab
              sx={{ backgroundColor: 'lightblue' }}
              aria-label="like"
              
            >
              <TurnedInIcon />
            </Fab>
            {favorito.title}
          </h2>
        </Box>
      ))}
    </>:
    <div className='flex flex-col justify-around w-full h-2/3'>
      <h2 className="text-3xl font-bold text-white mb-3 text-center">No hay elementos en tus favoritos aún </h2>
    <p className='text-gray-400 text-2xl text-center'>¡Agrega algunos elementos a tu lista de favoritos para tenerlos siempre a mano!</p>
    <img src={logofusionajob} alt='logo' className="text-center" />
    </div>
    
    }
  </>
  )
}

export default Favoritos