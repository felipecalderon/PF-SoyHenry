// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const { User, Admin, Postulant, Company, Offers } = require("../models/relations.js");

// Post
const createUsers = async ({ username, email, rol, names, lastnames, phone, disability, active, gender, password, name, description, location, website, logo, experience, tecnology }) => {
    try {
        const [ usuario, created ] = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                lastnames,
                rol,
                active,
                password
            }
        });
        // if(usuario) {
            // return usuario.dataValues
        // }
        // if (!created) {
            switch (rol) {
                case 'Postulante':
                    const postulant = await Postulant.create({
                            names, 
                            lastnames, 
                            phone, 
                            disability, 
                            gender, 
                            experience, 
                            tecnology,
                            userId: usuario.id
                        });
                    return { ...usuario.dataValues, postulant }
                case 'Empresa':                       
                    const company = await Company.create({
                        name,
                        description,
                        location,
                        website,
                        phone,
                        logo, 
                        userId: usuario.id
                    });
                    return { ...usuario.dataValues, company }
                default:
                    throw 'Tipo de usuario no válido'
            }
        // }
    } catch(err) {
        console.log(err)
        throw err
    }
}

//      Activos
const getUsers = async () => {
    const users = await User.findAll({
        include:[
            {
                model: Admin,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
                model: Postulant,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
                model: Company,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
                model: Offers,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        ],
        where: {
            active: true
        },
    });
    return users
};
const getUsersByName = async ( name ) => {
    const users = await User.findAll({
        where: {
            nombres: { [Op.iLike]: `%${name}%` },
            estado: 1
        },
    });
    return users;
};
const getUsersById = async ( id ) => {
    const user = await User.findByPk( id, {
        where: {
            estado: 1
        },
    } );
    return user;
};

//      Inactivos
const getUsersInact = async () => {
    const usersInact = await User.findAll({
        where: {
            estado: 0
        },
    });
    return usersInact;
};
const getUsersInactById = async ( id ) => {
    const userInact = await User.findByPk( id, {
        where: {
            estado: 0
        },
    } );
    return userInact;
};

// Puts
const putUsers = async ( id, nombres, apellidos, celular, correo, discapacidad, genero ) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk( id );
    if( !user ) throw Error( `El usuario con id: ${id} no existe` );
    
    // Comprueba si falta algun dato
    if( !nombres || !apellidos || !celular || !correo || !discapacidad || !genero ) throw Error('Faltan Datos');

    // Actualiza los datos
    await User.update(
        { nombres, apellidos, celular, correo, discapacidad, genero },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};
const putState = async ( id, estado ) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk( id );
    if( !user ) throw Error( `El id: ${id} no existe` );

    // Actualiza el estado
    await Users.update(
        { estado },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};

// Delete
const deleteUsers = async ( id ) => {
    const deleteUsers = await User.findByPk( id );
    await deleteUsers.destroy();
    return `${deleteUsers.nombres} ha sido eliminado con éxito de la base de datos.`;
};

module.exports = {
    createUsers,
    getUsers,
    getUsersById,
    getUsersByName,
    getUsersInact,
    getUsersInactById,
    putUsers,
    putState,
    deleteUsers
};