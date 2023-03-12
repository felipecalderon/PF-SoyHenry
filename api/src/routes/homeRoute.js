
const {getSearchByLanguage, getCompanyById} = require('../controllers/getSearchByLanguage')

const homeRoute = async (req, res) => {
    try {
        const dataApi = await getSearchByLanguage(req.query)
        return res.status(200).json(dataApi)
        
    } catch (error) {
        res.status(404).json(error)
    }
}

const companiesRoute = async (req, res) => {
    try {
        const dataApi = await getCompanyById(req.params)
        return res.status(200).json(dataApi)
        
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports = {homeRoute, companiesRoute}