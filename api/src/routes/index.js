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

<<<<<<< HEAD
=======
//admin
route.get('/admin',allAdmin )
route.post('/admin',createAdmin )
route.put('/admin/:id', putAdmin)
route.delete('/admin/:id', deleteadmin)
route.get('/admin/:id',getadminbyid)
//

>>>>>>> a2cbde1651922db0cb2c2d4c2905cd9dd021325d
module.exports = route;
