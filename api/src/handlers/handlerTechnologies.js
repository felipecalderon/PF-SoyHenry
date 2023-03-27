const { Technologies } = require("../models/relations.js");

const createTechnologies = async () => {
    
    const technology = ['React','javascript','Phyton', 'PostgreSQL'];
    
    technology.map( async (techno) => await Technologies.findOrCreate( {
            where: {Technology: techno}      
            }
        )
    )
}
const getTechnologies = async () => {
    createTechnologies()    
    try {
        return Technologies.findAll();
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createTechnologies, getTechnologies}