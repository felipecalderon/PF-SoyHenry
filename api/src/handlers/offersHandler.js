const axios = require('axios');
const Offers = require('../models/offersModel');
// const { Offers } = require('../models/relations.js');
const { cleaningGetonbrd } = require('./Utils/offersCleaning');

//post
const createOfferHandler = async ({ title, description, benefits, perks, min_salary, max_salary, modality, applications_count, bd_create }) => {
    try {
        const newOffer = await Offers.create({
            title, description, benefits, perks, min_salary, max_salary, modality, applications_count, bd_create
        });
        
        return newOffer
    } catch(err) {
        throw err
    }
}

//gets
const getOffersDb = async () => {
    const offerts_db = await Offers.findAll();
    return offerts_db;
}
const getOffersApiGetonbrd = async (language) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/search/jobs?query=${language}`);
        const offers = cleaningGetonbrd( dataAPI.data );
        return offers;
    } catch (error) {
        return error
    }
}

// esto ira en el handler company
const searchCompaniesAPI = async (id) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/companies/${id}`)
        return dataAPI.data.data.attributes
    } catch (error) {
        return error
    }
}

module.exports = {
    createOfferHandler,
    getOffersDb,
    getOffersApiGetonbrd, 
    searchCompaniesAPI,
};