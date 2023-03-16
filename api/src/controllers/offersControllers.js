const {
    searchCompaniesAPI,
    getOffersApiGetonbrd,
    createOfferHandler,
    getOffersDb
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
const getAllOffersController = async (querys) => {
    try {
        // DataBase
        // const offer_db = await getOffersDb();
        
        // Apis
        //      Api Getonbrd
        const { data } = await getOffersApiGetonbrd(querys);
        // concatena las ofertas de las apis y de la DB
        // all_offers = [  ...offer_db, ...data ] 
        
        return data
    } catch (error) {
        throw error
    }
}

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
        return error
    }
}

module.exports = { 
    createOfferController,
    getAllOffersController, 
    getCompanyById
};

