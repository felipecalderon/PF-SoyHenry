const User = require('../models/userModel')

const createUsersController = async (  ) => {
    // Trae los datos del cuepo de la req.
    const { nombres, apellidos, celular, correo, discapacidad, genero } = req.body;
    try {
        const newUser = await createUsers( nombres, apellidos, celular, correo, discapacidad, genero );
        return newUser
    } catch (error) {
        throw { error: error.message }
    }
};

// Gets
const getUsersControllers = async (  ) => {
    const { name } = req.query;
    try {
        const response = name ? await getUsersByName( name ) : await getUsers();
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const getUsersByIdControllers = async (  ) => {
    const { id } = req.params;
    try {
        const response = await getUsersById( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const getUsersInactControllers = async (  ) => {
    try {
        const response = await getUsersInact();
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const getUsersInactByIdControllers = async (  ) => {
    const { id } = req.params;
    try {
        const response = await getUsersById( id );
        return response 
    } catch (error) {
        throw { error: error.message }
    }
};

// Puts
const putUsersControllers = async (  ) => {
    const { id } = req.params;
    const { nombres, apellidos, celular, correo, discapacidad, genero } = req.body;
    try {
        const response = await putUsers( id, nombres, apellidos, celular, correo, discapacidad, genero );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const putStateControllers = async (  ) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const response = await putState( id, estado );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};

// Delete
const deleteUsersControllers = async (  ) => {
    const { id } = req.params;
    try {
        const response = await deleteUsers( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};

module.exports = {
    createUsersController,
    getUsersControllers,
    getUsersByIdControllers,
    getUsersInactControllers,
    getUsersInactByIdControllers,
    putUsersControllers,
    putStateControllers,
    deleteUsersControllers
}

module.exports = { getUsers }