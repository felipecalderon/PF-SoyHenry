//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { 
    allUsers, 
    createUser
} = require('./userRoute')
const { 
    companiesRoute, 
    allOffers, 
    createOffer,
    allOffersDb,
    deleteOffer,
    putOffers,
    putLdOffers,
    getOffersById
} = require('./offersRoute');

const route = Router()

// users
route.get('/user', allUsers);
route.post('/user', createUser);

// Offers
route.post('/jobs' , createOffer);
route.get('/jobs' , allOffers);
route.get('/jobsdb' , allOffersDb);
route.get('/jobsdb/:id' , getOffersById);
route.put('/jobdb/:id' , putOffers);
route.put('/jobsld/:id' , putLdOffers); // Logical deletion
route.delete('/jobdb/:id' , deleteOffer); // Physical deletion




// company
route.get('/company/:id', companiesRoute);

module.exports = route;
