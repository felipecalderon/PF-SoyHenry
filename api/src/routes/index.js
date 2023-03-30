//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const upload =require("../handlers/Utils/multer")
const { 
    allUsers, 
    createUser,
    deleteUsers,
    getUsersRouteClaveForanea,
    getUsersRouteByEmail
} = require('./userRoute')
const { 
    allOffers, 
    createOffer,
    allOffersDb,
    allOffersDbId,
    deleteOffer,
    putOffers,
    putLdOffers,
    getOffersById
} = require('./offersRoute');
const {
    authUserCreate,
    authUserCreateGoogleBtn,
    authUserGoogleBtnCB,
    authUserLoginCredentials
} = require('./authRoute')
const{
    allCompany,
    newCompany,
    companyById,
    companyByIdDatBas,
    putCompany,
    deleteCompany

}=require('./companyRoute');
const { 
    getUsersControllers, 
    getUsersInactControllers, 
    putUsersControllers, 
    putStateControllers, 
    deleteUsersControllers,
    getUsersInactByIdControllers,
    getUsersByIdControllers,
} = require("../controllers/userControllers");
const { 
    stateAplication, 
    saveCompany,
    getFavoriteComp,
    getAplicates,
    getSaveOffers
} = require('./relationsRoutes');

const { getTechnologies } = require('./technologiesRoute'); 
const { planRoute, 
    subscriptionRoute,
    respuestasMP,
    pagoStripe,
    recepcionPago
} = require('./suscriptionRoute');

const route = Router();

// users
route.post('/auth/login', authUserLoginCredentials)
route.post('/auth/register', authUserCreate)
route.get('/auth/google/:token', authUserCreateGoogleBtn)
route.get('/user', allUsers);
route.post('/user/email', getUsersRouteByEmail);
route.post('/userPk', getUsersRouteClaveForanea);

// Offers
route.post('/jobs' , createOffer);
route.get('/jobs' , allOffers);
route.get('/jobs/:id' , getOffersById);
route.get('/jobsdb' , allOffersDb);
route.get('/jobsdb/:id' , allOffersDbId);
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

// relations
route.put('/rel_offers/:idOffer/:idUser' , stateAplication);
route.put('/rel_company/:idCompany/:idUser' , saveCompany);
route.get('/aplicates/:id', getAplicates) // id del User o de offer
route.get('/save_offers/:id', getSaveOffers) // id del User
route.get('/fav_company/:id', getFavoriteComp) // id del User o de company

// Gets
// route.get('user/:id', getUsersByIdControllers );
// route.get('user/:email', getUsersByIdControllers );
// route.get('user/inact', getUsersInactControllers );
// route.get('user/inact/:id', getUsersInactByIdControllers );
// // Puts
// route.put('user/:id', putUsersControllers );
// route.put('user/ld/:id', putStateControllers );
// // Delete
// route.delete('user/:id', deleteUsersControllers );

//admin
// route.get('/admin',allAdmin )
// route.post('/admin',createAdmin )
// route.put('/admin/:id', putAdmin)
// route.delete('/admin/:id', deleteadmin)
// route.get('/admin/:id',getadminbyid)
//


//technologies
route.get('/technologies', getTechnologies)

route.post('/plan', planRoute)
route.post('/mercadopago', respuestasMP)
route.post('/stripe', pagoStripe)
route.get('/pago', recepcionPago)
module.exports = route;
