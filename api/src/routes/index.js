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
} = require('./offersRoute')

const route = Router()

// users
route.get('/user', allUsers)
route.post('/user', createUser)

// Offers
route.post('/jobs' , createOffer)
route.get('/jobs' , allOffers)

// company
route.get('/company/:id', companiesRoute)

module.exports = route;
