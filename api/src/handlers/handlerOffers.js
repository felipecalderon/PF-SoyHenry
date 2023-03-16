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

const getOffersApiGetonbrd = async ({language = 'junior', page = 1, limit = 10}) => {
    try {
        if(!language) throw 'debe agregar un language en query'
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/search/jobs?query=${language}`);
        const offers = cleaningGetonbrd( dataAPI.data );
        const startIndex = (page - 1) * limit;
        const endIndex = Number(startIndex) + Number(limit);
        const total = offers.length;
        const data = offers.slice(startIndex, endIndex);
        return { total, page, data };
        
    } catch (error) {
        console.log(error)
        throw error
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