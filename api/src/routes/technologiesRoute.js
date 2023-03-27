const { getTechnologiesController } = require('../controllers/technologiesControllers')

const getTechnologies = async (req, res) => {
    try {
        const data = await getTechnologiesController()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    getTechnologies
}