//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { postImagepostulante,
    postCvpostulante } = require("./uploadImagesRoute")
const upload = require("../handlers/Utils/multer")
const {
    allUsers,
    deleteUsers,
    getUsersById,
    putUsersById,
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
    authUserLoginCredentials,
    updatePremium
} = require('./authRoute')
const {
    allCompany,
    newCompany,
    companyById,
    companyByIdDatBas,
    putCompany,
    deleteCompany
} = require('./companyRoute');
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
    recepcionPago,
    rutaVerPagos,
    statisticspayments
} = require('./suscriptionRoute');
const { getAllData } = require('./adminRoute');

const{newReview,allReview,putReviews,deleteReviews}=require('./reviewRoute');

const route = Router();

// users
route.post('/auth/login', authUserLoginCredentials)
route.post('/auth/register', authUserCreate)
route.put('/update/:id', updatePremium)
route.get('/auth/google/:token', authUserCreateGoogleBtn)
route.get('/user', allUsers);
route.get('/user/:id', getUsersById);
route.put('/user/:id', putUsersById);
route.post('/user/email', getUsersRouteByEmail);
route.post('/userPk', getUsersRouteClaveForanea);
// Physical delete
route.delete('/user/:id', deleteUsers);

// Offers
route.post('/jobs', createOffer);
route.get('/jobs', allOffers);
route.get('/jobs/:id', getOffersById);
route.get('/jobsdb', allOffersDb);
route.get('/jobsdb/:id', allOffersDbId);
route.put('/jobdb/:id', putOffers);
route.put('/jobsld/:id', putLdOffers); // Logical deletion
route.delete('/jobdb/:id', deleteOffer); // Physical deletion

// company
//route.get('/company/:id', companiesRoute)
route.get('/company', allCompany);
route.post('/company', newCompany); // se deberia crear desde user
route.get('/company/:id', companyById);//id de la api
route.get('/companydb/:id', companyByIdDatBas);//id dela db
route.put('/company/:id', putCompany);
route.delete('/company/:id', deleteCompany);

// relations
route.put('/rel_offers/:idOffer/:idUser', stateAplication);
route.put('/rel_company/:idCompany/:idUser', saveCompany);
route.get('/aplicates/:id', getAplicates) // id del User o de offer
route.get('/save_offers/:id', getSaveOffers) // id del User
route.get('/fav_company/:id', getFavoriteComp) // id del User o de company

//technologies
route.get('/technologies', getTechnologies)

//Subir y Actualizar imagenes usuario
route.post("/upload-photo-user/:idUser", upload.single("imagenes"), postImagepostulante)

//Subir y Actualizar pdf
route.post("/upload-cv-user/:idPostulante", upload.single("pdf"), postCvpostulante)

// Payments
route.post('/plan', planRoute)
route.post('/mercadopago', respuestasMP)
route.post('/stripe', pagoStripe)
route.get('/pago', recepcionPago)
route.get('/verpagos', rutaVerPagos)

route.get('/statisticspayments', statisticspayments)

// Admin
route.get('/all_data', getAllData)






route.get('/review',allReview);
route.post('/review',newReview );
route.put('/review/:id',putReviews);
route.delete('/review/:id',deleteReviews);

module.exports = route;

// Gets
// route.get('user/:id', getUsersByIdControllers );
// route.get('user/:email', getUsersByIdControllers );
// route.get('user/inact', getUsersInactControllers );
// route.get('user/inact/:id', getUsersInactByIdControllers );
// route.put('user/:id', putUsersControllers );
// // Puts
// route.put('user/ld/:id', putStateControllers );

//admin
// route.get('/admin',allAdmin )
// route.post('/admin',createAdmin )
// route.put('/admin/:id', putAdmin)
// route.delete('/admin/:id', deleteadmin)
// route.get('/admin/:id',getadminbyid)
//