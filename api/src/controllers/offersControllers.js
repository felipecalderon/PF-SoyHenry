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
const getAllOffersController = async ({ language = 'junior', page = 1, limit = 10, title }) => {
    try {
        // DataBase
        const offer_db = title ? await getOffersByTitleDb( title ) : await getOffersDb();
        
        // Apis
        //      Api Getonbrd
        const jobsGetonbrd = title ? await getOffersApiGetonbrd( title, page, limit ) : await getOffersApiGetonbrd( language, page, limit );
        
        // concatena las ofertas de las apis y de la DB
        all_offers = [  ...offer_db, ...jobsGetonbrd ] 
        
        return all_offers
    } catch (error) {
        throw error
    }
}
const getAllOffersDbController = async () => {
    try {
        const offersDb = await getAllOffersDb();
        return offersDb
    } catch (error) {
        throw error
    }
}
const getOfferByIdController = async ({ id }) => {
    try {
        // si el id es un numero buscara en la Db sino buscara en la api
        const offert = !isNaN( id )? await getOffersById( id ) : await getOffersByIdApi( id );
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

