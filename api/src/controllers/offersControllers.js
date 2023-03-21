const {
    getOffersApiGetonbrd,
    createOfferHandler,
    getOffersDb,
    getOffersByTitleDb,
    getAllOffersDb,
    deleteOffers,
    putOffert,
    putOffertLD,
    getOffersById,
    getOffersByIdApi,
} = require('../handlers/handlerOffers');
const filters = require('../handlers/Utils/filters');
const paginate = require('../handlers/Utils/paginate');

// post
const createOfferController = async (body) => {
    try {
        const newOffer = await createOfferHandler(body);
        return newOffer
    } catch (error) {
        throw error
    }
}

// gets
const getAllOffersController = async ({ title = 'a', dt, exp, mty, sly }) => {
    try {
        // DataBase
        const offer_db = title !== 'a' ? await getOffersByTitleDb( title ) : await getOffersDb();
        
        // Apis
        // Api Getonbrd
        const jobsGetonbrd = await getOffersApiGetonbrd( title );
        
        // concatena las ofertas de las apis y de la DB
        all_offers = [  ...offer_db, ...jobsGetonbrd ] 
        
        // si hay filtros los aplica 
        const offertFilters = dt || exp || mty || sly ?  filters( all_offers, dt, exp, mty, sly ) : all_offers
    
        // hace el paginado
        // const offers = paginate( offertFilters, page, limit )

        return offertFilters
    } catch (error) {
        throw error
    }
}
const getAllOffersDbController = async ( query ) => {
    try {
        const offersDb = await getAllOffersDb( query );
        return offersDb
    } catch (error) {
        throw error
    }
}
const getOfferByIdController = async ({ id }, {title}) => {
    try {
        // si el id es un numero buscara en la Db sino buscara en la api
        const offert = !isNaN( id )? await getOffersById( id ) : await getOffersByIdApi( id, title );
        return offert 
    } catch (error) {
        throw error
    }
}

// Puts
const putOffertController = async ( id , body) => {
    try {
        const response = await putOffert( id, body );
        return response
    } catch (error) {
        throw error
    }
}
//     Borrado logico (Logical deletion)
const putOffertLDController = async ( id , body ) => {
    try {
        const response = await putOffertLD( id, body );
        return response
    } catch (error) {
        throw error
    }
}

// Delete (Borrado fisico)
const deleteOffersController = async ( { id } ) => {
    try {
        const response = await deleteOffers( id );
        return response
    } catch (error) {
        throw error
    }
};

module.exports = { 
    createOfferController,
    getAllOffersController, 
    getAllOffersDbController,
    getOfferByIdController,
    putOffertController,
    putOffertLDController,
    deleteOffersController,
};

