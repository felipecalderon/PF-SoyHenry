//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { postImagepostulante,
        postImageRecruiter,
        postCvpostulante } = require("./uploadImagesRoute")
const upload = require("../handlers/Utils/multer")
const {
    allUsers,
    deleteUsers,
    getUsersById,
    putUsersById,
    getUsersRouteClaveForanea,
    getUsersRouteByEmail,
    pqrs
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
    respuestasMP,
    pagoStripe,
    recepcionPago,
    rutaVerPagos,
    statisticspayments
} = require('./suscriptionRoute');
const {  handlerSaveApplyApiOffer,
    handlerGetApplyApiOffer}=require("../handlers/handlerApplyApiOffer")

const { getAllData } = require('./adminRoute');

const{newReview,allReview,putReviews,deleteReviews, allReviewById}=require('./reviewRoute');

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

// User physical delete
route.delete('/user/:id', deleteUsers);

// PQRS
route.post('/pqrs', pqrs)

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
route.post("/upload-logo-company/:idUser", upload.single("imagenes"), postImageRecruiter)

//Subir y Actualizar pdf
route.post("/upload-cv-user/:idPostulante", upload.single("pdf"), postCvpostulante)

// Payments
route.post('/plan', planRoute)
route.post('/mercadopago', respuestasMP)
route.post('/stripe', pagoStripe)
route.get('/pago', recepcionPago)
route.get('/verpagos', rutaVerPagos)

// Admin
route.get('/all_data', getAllData)
route.get('/statisticspayments', statisticspayments)

// Review
route.post('/review',newReview );
route.get('/review',allReview);
route.get('/review/:id',allReviewById);
route.put('/review/:id',putReviews);
route.delete('/review/:id',deleteReviews);

//ruta que guardara las postulaciones de la api 
route.post("/applyapioffer",handlerSaveApplyApiOffer)

//ruta que traera oferta guardada de la api
route.get("/applyapioffer/:userId",handlerGetApplyApiOffer)

module.exports = route;