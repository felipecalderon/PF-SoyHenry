import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';



function Favoritos({ favorites, onDeleteFavorite }) {

    const [favoritos, setFavoritos] = useState(favorites);

    const handleDelete = (id) => {
      const updatedFavorites = favoritos.filter((favorito) => favorito.id !== id);
      setFavoritos(updatedFavorites);
      onDeleteFavorite(id);
    };
  

    
  return (
    <>
    {favoritos?.map((favorito) => (
      <Box key={favorito.id}>
        <h2 className="bg-white rounded-xl p-4 border mb-4 text-center flex justify-between">
          <Fab
            sx={{ backgroundColor: 'red' }}
            aria-label="like"
            onClick={() => handleDelete(favorito.id)}
          >
            <FavoriteIcon />
          </Fab>
          {favorito.nombre}
        </h2>
      </Box>
    ))}
  </>
  )
}

export default Favoritos