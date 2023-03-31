const {
    putSave,
    putSaveCompany,
    putState,
    getfavorites,
    getAplications,
    getSavedOffers,
    putSaveApi
} = require("../handlers/handlerRelation");

const stateAplicationController = async ({ idOffer, idUser }, { state, save, origin, title }) => {
    try {
        const response = state ? await putState(idOffer, idUser, state)
            : origin === 'db' ? await putSave(idOffer, idUser, save)
                : await putSaveApi(idOffer, idUser, save, title);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
};

const getAplicateController = async ({ id }) => {
    try {
        const response = await getAplications(id);
        return response
    } catch (error) {
        throw error
    }
}

const getSaveOffersController = async ({ id }) => {
    try {
        const response = await getSavedOffers(id);
        return response
    } catch (error) {
        throw error
    }
}

const saveCompanyController = async ({ idCompany, idUser }, { save }) => {
    try {
        const response = await putSaveCompany(idCompany, idUser, save);
        return response
    } catch (error) {
        throw error
    }
};

const getFavoriteCompController = async ({ id }) => {
    try {
        const response = await getfavorites(id);
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    stateAplicationController,
    saveCompanyController,
    getFavoriteCompController,
    getAplicateController,
    getSaveOffersController
};