// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const UsersModel = require("../models/UsersModel.js");


// Post
const createUsers = async ( nombres, apellidos, celular, correo, discapacidad, genero ) => {
    // crea el susuario
    const newUser = await UsersModel.create({ nombres, apellidos, celular, correo, discapacidad, genero });
    console.log(newUser);
    return newUser;
};

// Gets
//      Activos
const getUsers = async () => {
    const users = await UsersModel.findAll({
        where: {
            estado: 1
        },
    });
    return users;
};
const getUsersByName = async ( name ) => {
    const users = await Users.findAll({
        where: {
            nombres: { [Op.iLike]: `%${name}%` },
            estado: 1
        },
    });
    return users;
};
const getUsersById = async ( id ) => {
    const user = await Users.findByPk( id, {
        where: {
            estado: 1
        },
    } );
    return user;
};

//      Inactivos
const getUsersInact = async () => {
    const usersInact = await Users.findAll({
        where: {
            estado: 0
        },
    });
    return usersInact;
};
const getUsersInactById = async ( id ) => {
    const userInact = await Users.findByPk( id, {
        where: {
            estado: 0
        },
    } );
    return userInact;
};

// Puts
const putUsers = async ( id, nombres, apellidos, celular, correo, discapacidad, genero ) => {
    // Comprueba si existe el usuario
    const user = await Users.findByPk( id );
    if( !user ) throw Error( `El usuario con id: ${id} no existe` );
    
    // Comprueba si falta algun dato
    if( !nombres || !apellidos || !celular || !correo || !discapacidad || !genero ) throw Error('Faltan Datos');

    // Actualiza los datos
    await Users.update(
        { nombres, apellidos, celular, correo, discapacidad, genero },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};
const putState = async ( id, estado ) => {
    // Comprueba si existe el usuario
    const user = await Users.findByPk( id );
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
    const deleteUsers = await Users.findByPk( id );
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