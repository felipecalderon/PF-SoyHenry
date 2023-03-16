//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { 
    allUsers, 
    createUser
} = require('./userRoute')
const { 
    allOffers, 
    createOffer,
    allOffersDb,
    deleteOffer,
    putOffers,
    putLdOffers,
    getOffersById
} = require('./offersRoute');
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
