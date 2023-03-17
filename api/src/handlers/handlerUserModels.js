// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const { User, Admin, Postulant, Company } = require("../models/relations.js");

// Post
const createUsers = async ({ username, email, rol, names, lastnames, phone, disability, active, gender, password, name, description, location, website, logo}) => {
    try {
        const usuario = await User.create({
            username, email, rol, active, password
            });
        switch (rol) {
            case 'Postulante':
                const dataPostulante = await Postulant.create({
                        names, lastnames, phone, disability, gender, 
                        userId: usuario.id
                    });
                return dataPostulante
            case 'Empresa':                       
                const dataEmpresa = await Company.create({
                    name, description, phone, location, gender, website, logo, 
                        userId: usuario.id
                    });
                return dataEmpresa
            default:
                throw 'Tipo de usuario no válido'
        }
    } catch(err) {
        console.log(err)
        throw err
    }
}

//      Activos
const getUsers = async () => {
    const users = await User.findAll({
        where: {
            active: true
        },
    });
    return users;
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