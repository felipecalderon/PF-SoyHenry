const { 
    getAllOffersController,
    createOfferController,
    putOffertController,
    putOffertLDController,
    deleteOffersController,
    getOfferByIdController,
    getAllOffersDbController, 
} = require('../controllers/offersControllers')

// post
const createOffer = async (req, res) => {
    try {
        const dataApi = await createOfferController(req.body)
        return res.status(201).json(dataApi)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// gets
const allOffers = async (req, res) => {
    try {
        const offers = await getAllOffersController(req.query)
        return res
        .status(200)
        .header('Access-Control-Allow-Origin', 'https://fusionajobs-production.up.railway.app')
        .json( offers )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
const allOffersDb = async (req, res) => {
    try {
        const offers = await getAllOffersDbController(req.query)
        return res.status(200).json( offers )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
const getOffersById = async (req, res) => {
    try {
        const offert = await getOfferByIdController(req.params)
        return res.status(200).json( offert )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// put
const putOffers =async (req, res) => {
    try {
        const offers = await putOffertController(req.params, req.body)
        return res.status(200).json( offers )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//     Borrado logico (Logical deletion)
const putLdOffers =async (req, res) => {
    try {
        const offers = await putOffertLDController(req.params, req.body)
        return res.status(200).json( offers )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// delete
const deleteOffer =async (req, res) => {
    try {
        const offers = await deleteOffersController(req.params)
        return res.status(200).json( offers )
        
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = { 
    createOffer,
    allOffers,
    allOffersDb,
    getOffersById,
    putOffers,
    putLdOffers,
    deleteOffer,
}