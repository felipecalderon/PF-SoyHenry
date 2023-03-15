const axios = require('axios');
const { Op } = require("sequelize");
const Company = require('../models/companyModel');
const { cleaningGetonbrdCompany } = require('./Utils/companiesCleaning');

const getCompanyAPI = async () => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/companies`)
        const company = cleaningGetonbrdCompany( dataAPI.data );
        return company;
    } catch (error) {
        return error
    }
}

const searchCompanyAPI = async (id) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/companies/${id}`)
        return dataAPI.data.data.attributes
    } catch (error) {
        return error
    }
}

const postCompany = async ({ name,description,location,website,logo}) => {
    try {
        const newCompany = await Company.create({
            name,
            description,
            location,
            website,
            logo,
            
        });
        
        return newCompany
    } catch(err) {
        throw err
    }
}


const getCompanywithDb = async () => {
    const companyDatB = await Company.findAll();
    return companyDatB;
}

const putCompany = async ( id, name,description,location,website,logo) => {
    
    const company = await Company.findByPk( id );
    if( !company ) throw Error( `la compania con id: ${id} no existe` );
    
    
    await Company.update(
        {  name,description,location,website,logo },
        {
            where: { id }
        }
    )
    return `company has been updated`;
};


//borrado de la db
const deleteCompany = async ( id) => {
    const deletecomp = await Company.findByPk( id );
    await deletecomp.destroy();
    return "Companii boorrado correctamente";
};






module.exports={
    getCompanyAPI,
    postCompany,
    getCompanywithDb,
    deleteCompany,
    searchCompanyAPI,
    putCompany,
}