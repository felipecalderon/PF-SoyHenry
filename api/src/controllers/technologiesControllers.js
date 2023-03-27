const { getTechnologies } = require('../handlers/handlerTechnologies')

const getTechnologiesController = async () => {
    try {
        const technologies = await getTechnologies()
        return technologies 
    } catch (error) {
        throw error
    }
};

module.exports = { getTechnologiesController }