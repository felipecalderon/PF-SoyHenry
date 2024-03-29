import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import logofusionajob from '../../assets/logofusionajob.png'



function Favoritos() {
  const dataUserLocal = localStorage.getItem("userLogin");
  const dataUserGoogle = localStorage.getItem("usergoogle");
  const dataUser = JSON.parse(dataUserLocal);
  const [saveOffers, setSavedOffers] = useState([]);

  const [setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`/save_offers/${dataUser.id}`)
      .then((res) => setSavedOffers(res.data))
      .catch((err) => console.log(err));
  }, [dataUser.id]);

  const handleRemoveOffer = (offerId, offerTitle) => {
    const apiUrl = `/rel_offers/${offerId}/${dataUser.id}?save=unsave&title=${offerTitle}&origin=api`;
    const dbUrl = `/rel_offers/${offerId}/${dataUser.id}?save=unsave&title=${offerTitle}&origin=db`;
    const url = Number(offerId) ? dbUrl : apiUrl;

    if (window.confirm("¿Estás seguro que deseas eliminar esta oferta de tus favoritos?")) {
      axios
        .put(url)
        .then(() => {
          const newSavedOffers = saveOffers.filter(offer => offer.offerId !== offerId);
          setSavedOffers(newSavedOffers);
          setIsFavorite(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const displayedOffers = dataUser.isPremium ? saveOffers : saveOffers.slice(0, 5);

  return (
    <>
      {displayedOffers?.length ? (
        <>
          {displayedOffers.map((offer) => (
            <Box key={offer.offerId}>
              <h2 className="z- 10 bg-white dark:bg-secondary-dark rounded-xl p-4 border mb-4 text-center flex justify-between items-center">
                <Fab
                  sx={{ backgroundColor: 'lightblue', zIndex: 0 }}
                  aria-label="like"
                  onClick={() => handleRemoveOffer(offer.offerId)}
                >
                  <TurnedInIcon  />
                </Fab>
                <Link to={`/detail/${offer.offerId}?title=${ offer?.Offer?.title || offer.title}`} className='text-3xl dark:text-white font-bold'>
                  {offer.hasOwnProperty("Offer") ? offer.Offer.title : offer.title}
                </Link>
              </h2>
            </Box>
          ))}
        </>
      ) :
          <div className='flex flex-col justify-start w-full h-2/3'>
            <h2 className="text-3xl font-bold text-white mt-3 mb-3 text-center">No hay elementos en tus favoritos aún </h2>
            <p className='text-gray-400 text-2xl mt-3 mb-3 text-center'>¡Agrega algunos elementos a tu lista de favoritos para tenerlos siempre a mano!</p>
            <img src={logofusionajob} alt='logo' className="text-center mt-3 mb-3" />
          </div>

      }
    </>

  )
}

export default Favoritos