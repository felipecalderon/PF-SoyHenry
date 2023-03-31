const { Technologies } = require("../models/relations.js");

const createTechnologies = async () => {

    const technology = [
        'React',
        'Javascript',
        'Phyton',
        'PostgreSQL',
        'Desarrollo web',
        'Desarrollo móvil',
        'Bases de datos',
        'Seguridad informática',
        'Redes de computadoras',
        'Inteligencia artificial',
        'Aprendizaje automático',
        'Ciencia de datos',
        'Gestión de proyectos',
        'Diseño UX/UI',
        'Análisis de negocios',
        'Cloud computing',
        'DevOps',
        'Automatización de pruebas',
        'Ingeniería de software',
        'Realidad virtual y aumentada',
        'Blockchain',
        'Ciberseguridad',
        'Arquitectura de software',
        'Gestión de la información',
        'PHP',
        'Java',
        'Swift',
        'Ruby on Rails',
        'MySQL',
        'Big Data',
        'Redes neuronales',
        'Comunicación',
        'Liderazgo',
        'Trabajo en equipo',
        'Resolución de conflictos',
        'Adaptabilidad',
        'Pensamiento crítico',
        'Creatividad',
        'Comunicación efectiva',
        'Gestión del tiempo',
        'Negociación',
        'Empatía',
    ];


    technology.map(async (techno) => await Technologies.findOrCreate({
        where: { Technology: techno }
    }))
}
const getTechnologies = async () => {
    createTechnologies()
    try {
        return Technologies.findAll();
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTechnologies, getTechnologies }