
const getSearchByLanguage = require('../controllers/getSearchByLanguage')

const homeRoute = async (req, res) => {
    try {
        const {language} = req.query
        console.log(language)
        
        if (language) {
            return res.status(200).send(await getSearchByLanguage(language))
        }
        
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {homeRoute}