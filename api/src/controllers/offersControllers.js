const {
    searchCompaniesAPI,
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
const getAllOffersController = async ({ language, title }) => {
    try {
        // DataBase
        const offer_db = title ? await getOffersByTitleDb( title ) : await getOffersDb();
        
        // Apis
        //      Api Getonbrd
        if(!language) throw 'debe agregar un language en query'
        const jobsGetonbrd = title ? await getOffersApiGetonbrd( title ) : await getOffersApiGetonbrd( language );
        
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


// esto ira en el controller company
const getCompanyById = async ({id}) => {
    try {
        const companies = await searchCompaniesAPI(id)
        let social = {
            facebook: companies.facebook !== '' ? companies.facebook : null,
            twitter: companies.twitter !== '' ? companies.twitter : null,
            github: companies.github !== '' ? companies.github : null,
        }

        return {
            name: companies.name,
            description: companies.description,
            benefits: companies.benefits,
            web: companies.web,
            logo: companies.logo,
            social
        }
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createOfferController,
    getAllOffersController, 
    getAllOffersDbController,
    getOfferByIdController,
    putOffertController,
    putOffertLDController,
    deleteOffersController,
    getCompanyById,
};

