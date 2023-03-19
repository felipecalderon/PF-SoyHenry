const axios = require('axios');
const { Op } = require("sequelize");
//const Company = require('../models/companyModel');
const { User, Admin, Postulant, Company } = require("../models/relations.js");
const { cleaningGetonbrdCompany } = require('./Utils/companiesCleaning');
const { cloudinary } = require("./Utils/cloudinaryConfig");

//const{imgUploader}=require('./Utils/uploaderimages')
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
        return dataAPI.data.data.attributes;
      
       
    } catch (error) {
        return error
    }
}

const postCompany = async ({ username,rol,email,active,password,name,description,location,website,logo}) => {
    try {

        const result = await cloudinary.uploader.upload(logo)

        const newUser = await User.create({
            username, email, rol, active,password
            });

        const newCompany = await Company.create({
            name,
            description,
            location,
            website,
            logo: result.secure_url,
            userId:newUser.id
        });
        
        
        return newCompany
    } catch(err) {
        throw err
    }
}

//trae todos los company de la db
const getCompanywithDb = async () => {
    const companyDatB = await Company.findAll();
    return companyDatB;
}
//este trae los id de la company de la dB
const getCompanywithDbId = async (id) => {
    
    try {
        const offert = await Company.findByPk( id );
        return offert;
    } catch (error) {
        throw error
    }
}

const putCompany = async ( {id}, {name,description,location,website,logo}) => {
    

    try {
        const company = await Company.findByPk( id );
    if( !company ) throw Error( `la compania con id: ${id} no existe` );
    
    
    await Company.update(
        {  name,description,location,website,logo },
        {
            where: { id }
        }
    )
    return `company has been updated`;
    } catch (error) {
        throw error
    }
    
};


//borrado logico de la db
const deleteCompany = async ( { id }, { active }) => {
    /*const deletecomp = await Company.findByPk( id );
    await deletecomp.destroy();
    return "Companii boorrado correctamente";*/

    try {
       
        const company = await Company.findByPk( id );
        if( !company ) throw Error( `La compania con id: ${id} no existe` );
        
        
        await Company.update(
            { active },
            {
                where: { id }
            }
        )
        
        return active === true ?  'La compania ha sido re-activada': 'la compania ha sido desactivada' ;
    } catch (error) {
        throw error
    }
};






module.exports={
    getCompanyAPI,
    postCompany,
    getCompanywithDb,
    deleteCompany,
    searchCompanyAPI,
    putCompany,
    getCompanywithDbId
}