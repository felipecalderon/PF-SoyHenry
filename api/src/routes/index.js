//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { 
    allUsers, 
    createUser,
    deleteUsers
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
const {
    authUserCreate,
    authUserCreateGoogleBtn,
    authUserGoogleBtnCB,
    authUserLoginCredentials
} = require('./authRoute')
//
const{allCompany,
    newCompany,
    companyById,
    companyByIdDatBas,
    putCompany,
    deleteCompany
    }=require('./companyRoute');
//

const route = Router();

// Offers
route.post('/jobs' , createOffer);
route.get('/jobs' , allOffers);
route.get('/jobs/:id' , getOffersById);
route.get('/jobsdb' , allOffersDb);
route.put('/jobdb/:id' , putOffers);
route.put('/jobsld/:id' , putLdOffers); // Logical deletion
route.delete('/jobdb/:id' , deleteOffer); // Physical deletion

// company
//route.get('/company/:id', companiesRoute)
route.get('/company',allCompany);
route.post('/company',newCompany); // se deberia crear desde user
route.get('/company/:id',companyById);//id de la api
route.get('/companydb/:id',companyByIdDatBas);//id dela db
route.put('/company/:id', putCompany);
route.delete('/company/:id',deleteCompany);
//

route.get('/user', allUsers);
// route.get('/user/:id', getUserById )
route.post('/auth/login', authUserLoginCredentials)
route.post('/auth/register', authUserCreate)
route.get('/auth/google/:token', authUserCreateGoogleBtn)
//admin
/*route.get('/admin',allAdmin )
route.post('/admin',createAdmin )
route.put('/admin/:id', putAdmin)
route.delete('/admin/:id', deleteadmin)
route.get('/admin/:id',getadminbyid)*/
//

module.exports = route;
