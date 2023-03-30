const { User, Offers, Company, FavoritesComp, SaveOffer, Aplications, Postulant } = require("../models/relations.js");
const SaveOfferApi = require("../models/SaveOffersApiModel.js");

const putState = async (offerId, userId, status) => { // Aplicacion
    try {
        // Buscar al usuario y la oferta en la base de datos
        const offer = await Offers.findByPk(offerId);
        const user = await User.findByPk(userId);
        if (!user || !offer) {
            throw Error('Usuario u Oferta no encontrada');
        }

        // Agrega y suma el contador al aplicar // estados del postulante → send, cancel. estados del recluter →  viewed, select, no_select. 
        if (status === 'send') { // 
            await Aplications.create({ userId, offerId, status });
            await Offers.update({ applications_count: offer.applications_count + 1 }, { where: { id: offerId } });
            return `La postulacion ha sido enviada`;
        }
        if (status === 'cancel') {
            const apli = await Aplications.findOne({ where: { userId, offerId } });
            await apli.destroy();
            await Offers.update({ applications_count: offer.applications_count - 1 }, { where: { id: offerId } });
            return 'Se ha cancelado la postulacion';
        }
        await Aplications.update({ status }, { where: { userId, offerId } });

        return `La postulacion ha sido ${status}`;
    } catch (error) {
        throw error
    }
};

const getAplications = async (id) => {
    try {
        if (Number(id)) {
            const offerid = await Offers.findByPk(id);
            if (offerid) {
                const OffersAplicated = await Aplications.findAll({
                    include: {
                        model: User,
                        include: [
                            {
                                model: Postulant,
                            }
                        ]
                    },
                    where: {
                        offerId: id
                    },
                })
                return OffersAplicated
            }
        }
        const userid = await User.findByPk(id);
        if (userid) {
            const userAplicate = await Aplications.findAll({
                include: {
                    model: Offers
                },
                where: {
                    userId: id
                },
            })
            return userAplicate
        }
        throw Error('Usuario o Empresa no encontrada')
    } catch (error) {
        throw error
    }
};

const putSave = async (offerId, userId, save) => { // Guardar la oferta
    try {
        // Buscar al usuario y la oferta en la base de datos
        const offer = await Offers.findByPk(offerId);
        const user = await User.findByPk(userId);

        if (!user || !offer) {
            throw Error('Usuario u Oferta no encontrada');
        }
        // se guarda o elimina la oferta de SaveOffer
        if (save === "save") {
            await SaveOffer.create({ userId, offerId });
            return 'Oferta guardada'
        }
        if (save === 'unsave') {
            const offert = await SaveOffer.findOne({ where: { userId, offerId } });
            await offert.destroy();
            return 'Oferta eliminada'
        }
        return 'Estado no valido'
    } catch (error) {
        throw error
    }
};

const putSaveApi = async (offerId, userId, save, title) => {
    try {
        // Buscar al usuario y la oferta en la base de datos
        const user = await User.findByPk(userId);

        if (!user) {
            throw Error('Usuario no encontrada');
        }

        // se guarda o elimina la oferta de SaveOfferApi
        if (save === "save") {
            await SaveOfferApi.create({ userId, offerId, title });
            return 'Oferta guardada'
        }
        if (save === 'unsave') {
            const offertApiSave = await SaveOfferApi.findOne({ where: { userId, offerId } });
            console.log(offertApiSave)
            await offertApiSave.destroy();
            return 'Oferta eliminada'
        }
        return 'Estado no valido'
    } catch (error) {
        throw error
    }
};

const getSavedOffers = async (id) => {
    try {
        const userid = await User.findByPk(id);

        if (userid) {
            const offersSaveByUser = await SaveOffer.findAll({
                include: {
                    model: Offers
                },
                where: {
                    userId: id
                },
            })
            const offersSaveApi = await SaveOfferApi.findAll({
                where: {
                    userId: id
                },
            })
            return [...offersSaveByUser, ...offersSaveApi]
        };
        throw Error('Usuario no encontrada');
    } catch (error) {
        throw error
    }
};

const putSaveCompany = async (companyId, userId, save) => { // Guardar la empresa como Favoritos
    try {
        // Buscar al usuario y la empresa en la base de datos
        const company = await Company.findByPk(companyId);
        const user = await User.findByPk(userId);
        if (!user || !company) {
            throw Error('Usuario u Oferta no encontrada');
        }

        // Quita el like de la tabla y disminuye el conteo si es dislike
        if (save === 'dislike') {
            const favorite = await FavoritesComp.findOne({
                where: { companyId, userId },
            });
            // Actualizar el número de postulantes de la oferta
            await favorite.destroy();
            await Company.update({ likes_count: company.likes_count - 1 }, { where: { id: companyId } });
            return 'Removido de Favoritos'
        }

        // Agrega o actualiza
        await FavoritesComp.create({ userId, companyId })
        await Company.update({ likes_count: company.likes_count + 1 }, { where: { id: companyId } })
        return 'Agregado a Favoritos'
    } catch (error) {
        throw error
    }
};

const getfavorites = async (id) => {
    try {
        const userid = await User.findByPk(id);
        const companyid = await Company.findByPk(id)
        if (userid) {
            const favorites = await FavoritesComp.findAll({
                include: {
                    model: Company
                },
                where: {
                    userId: id
                },
            })
            return favorites
        }
        if (companyid) {
            const favorites = await FavoritesComp.findAll({
                include: {
                    model: User
                },
                where: {
                    companyId: id
                },
            })
            return favorites
        }
        throw Error('Usuario o Empresa no encontrada')
    } catch (error) {
        throw error
    }
};

module.exports = {
    putState,
    putSave,
    putSaveApi,
    putSaveCompany,
    getfavorites,
    getAplications,
    getSavedOffers
};