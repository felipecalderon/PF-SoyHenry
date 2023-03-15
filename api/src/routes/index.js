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
//const{allAdmin,createAdmin,putAdmin,deleteadmin,getadminbyid}=require('./adminRoute')

//
const{allCompany,
    newCompany,
    companyById,
    putCompany,
    deleteCompany
    }=require('./companyRoute');
//

const route = Router()

// users
route.get('/user', allUsers)
route.post('/user', createUser)

// Offers
route.post('/jobs' , createOffer)
route.get('/jobs' , allOffers)

// company
//route.get('/company/:id', companiesRoute)


route.get('/company',allCompany);
route.post('/company',newCompany);
route.get('/company/:id',companyById);
route.put('/company', putCompany);
route.delete('/company/:id',deleteCompany);
//


//admin
/*route.get('/admin',allAdmin )
route.post('/admin',createAdmin )
route.put('/admin/:id', putAdmin)
route.delete('/admin/:id', deleteadmin)
route.get('/admin/:id',getadminbyid)*/
//


module.exports = route;
