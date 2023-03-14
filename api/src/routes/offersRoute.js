const { 
    getAllOffersController,
    getCompanyById,
    createOfferController, 
} = require('../controllers/offersControllers')

// post
const createOffer = async (req, res) => {
    try {
        const dataApi = await createOfferController(req.body)
        return res.status(201).json(dataApi)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// gets
const allOffers = async (req, res) => {
    try {
        const offers = await getAllOffersController(req.query)
        return res.status(200).json( offers )
        
    } catch (error) {
        res.status(404).json( error )
    }
}

// put

// delete

// esto ira en la ruta company
const companiesRoute = async (req, res) => {
    try {
        const dataApi = await getCompanyById(req.params)
        return res.status(200).json(dataApi)
        
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = { 
    allOffers,
    createOffer,
    companiesRoute,
}