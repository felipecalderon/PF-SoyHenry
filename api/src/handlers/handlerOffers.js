const axios = require('axios');
const { Op } = require('sequelize');
const { Offers, User, Company } = require("../models/relations.js");
const { cleaningGetonbrd } = require('./Utils/offersCleaning');
const paginate = require('./Utils/paginate');

//post
const createOfferHandler = async ({ title, requeriments, functions, benefits, perks, min_salary, max_salary, modality, experience, applications_count, bd_create, by,idRecruiterOfferCreate, idAplicants }) => {
    try {

        const newOffer = await Offers.create({
            title, requeriments, functions, benefits, perks, min_salary, max_salary, modality, experience, applications_count, bd_create,
            userId: by,idRecruiterOfferCreate, idAplicants
        });

        return newOffer
    } catch(err) {
        throw err
    }
};

//gets
const getOffersDb = async () => {
    try {
        const offerts_db = await Offers.findAll({
            include: {
                model: User,
                attributes: [ "id","username" ],
                include: [
                    {
                        model: Company,
                        attributes: ["id","website"]
                    }
                ]
            },
            where: {
                active: true
            },
        });
        return offerts_db;    
    } catch (error) {
        throw error
    }
};
const getAllOffersDb = async ({ page = 1, limit = 10 }) => {
    try {
        // trae todos las ofertas de la Db
        const offerts_db = await Offers.findAll();
        
        // hace el paginado
        const offers = paginate( offerts_db, page, limit )
        
        return offers;
    } catch (error) {
        throw error
    }
};
const getAllOffersDbId = async ( id ) => {
    try {
        // trae todos las ofertas de la Db
        const offerts_dbid = await Company.findOne({
            where: {
                id
            },
            include: {
                model: User,
                attributes: [ "id","username" ],
                include: [
                    {
                        model: Company,
                        attributes: ["id","website"]
                    }
                ]
            },
            include: {
                model: aplications
            },
        });
        return offerts_dbid;
    } catch (error) {
        throw error
    }
};
const getOffersByTitleDb = async ( title ) => {
    try {
        const offerts_db = await Offers.findAll({
            where: {
                title: { [Op.iLike]: `%${title}%` },
                active: true
            },
        });
        return offerts_db;
    } catch (error) {
        throw error
    }
};
const getOffersById = async ( id ) => {
    try {
        const offert = await Offers.findByPk( id );
        return offert;
    } catch (error) {
        throw error
    }
};

// gets and cleaning Api
const getOffersApiGetonbrd = async ( title ) => {
    try {
        let dataAPI = await axios(`/api/v0/search/jobs?query=${title}`);
        const offers = cleaningGetonbrd( dataAPI.data );
        return offers
        
    } catch (error) {
        throw error;
    }
};
const getOffersByIdApi = async (id, title) => {
    try {
        // id es el titulo de la oferta como la api no tiene un end poin para solicitar por id 
        // hace la busqueda por el titulo

        let dataAPI = await axios(`/api/v0/search/jobs?query=${title}`);
        // filtra la oferta que tenga el titulo buscado
        const offers = cleaningGetonbrd( dataAPI.data );

        const offerById = offers.find(offert => offert.id === id)
        return offerById;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// Puts
const putOffert = async ({ id }, { title, requeriments, functions, benefits, perks, min_salary, max_salary, modality, experience, applications_count, idRecruiterOfferCreate, idAplicants }) => {
    try {   
        // Comprueba si existe la oferta
        const Offert = await Offers.findByPk( id );
        if( !Offert ) throw Error( `La oferta con id: ${id} no existe` );
        
        // Comprueba si falta algun dato
        if( !title || !requeriments || !functions || !benefits || !perks || !min_salary || !max_salary || !modality || !idAplicants || !experience ||!applications_count ||!idRecruiterOfferCreate ) throw Error('Faltan Datos');
        
        // Actualiza los datos
        await Offers.update(
            { title, requeriments, functions, benefits, perks, min_salary, max_salary, modality, idAplicants, experience, applications_count, idRecruiterOfferCreate },
            {
                where: { id }
            }
        )
        return 'La oferta se ha actualizada';
    } catch (error) {
        throw error
    }
}

//     Borrado logico (Logical deletion)
const putOffertLD = async ({ id }, { active }) => {
    try {
        // Comprueba si existe la oferta
        const Offert = await Offers.findByPk( id );
        if( !Offert ) throw Error( `La oferta con id: ${id} no existe` );
        
        // Actualiza el estado
        await Offers.update(
            { active },
            {
                where: { id }
            }
        )
        
        // mensaje dependiendo del valor de active
        return active === true ?  'La oferta ha sido re-activada': 'la oferta ha sido desactivada' ;
    } catch (error) {
        throw error
    }
}

// Delete (Borrado fisico)
const deleteOffers = async ( id ) => {
    try {
        // Comprueba si existe la oferta
        const offert = await Offers.findByPk( id );
        if( !offert ) throw Error( `La oferta con id: ${id} no existe` );
        
        // Elimina los datos
        await offert.destroy();
        return 'la oferta ha sido eliminada con éxito de la base de datos.';
    } catch (error) {
        throw error
    }
};

module.exports = {
    createOfferHandler,
    getOffersDb,
    getAllOffersDb,
    getAllOffersDbId,
    getOffersByTitleDb,
    getOffersApiGetonbrd,
    getOffersById,
    getOffersByIdApi,
    putOffert,
    putOffertLD,
    deleteOffers,
};