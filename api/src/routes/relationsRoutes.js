const {
    stateAplicationController,
    saveCompanyController,
    getFavoriteCompController,
    getAplicateController,
    getSaveOffersController,
} = require("../controllers/relationsController");

const stateAplication = async (req, res) => {
    try {
        const response = await stateAplicationController(req.params, req.query)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

const getAplicates = async (req, res) => {
    try {
        const response = await getAplicateController(req.params)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getSaveOffers = async (req, res) => {
    try {
        const response = await getSaveOffersController(req.params)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const saveCompany = async (req, res) => {
    try {
        const response = await saveCompanyController(req.params, req.query)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

const getFavoriteComp = async (req, res) => {
    try {
        const response = await getFavoriteCompController(req.params)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    stateAplication,
    saveCompany,
    getFavoriteComp,
    getAplicates,
    getSaveOffers
};