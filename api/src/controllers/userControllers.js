const {
    createUsers,
    getUsers,
    getUsersById,
    getUsersByName,
    deleteUsers,
    getUsersInact,
    getUsersInactById,
    putState,
    putUsers
} = require('../handlers/handlerUserModels') 

const createUsersController = async ( { nombres, apellidos, celular, correo, discapacidad, genero } ) => {
    // Trae los datos del cuepo de la req.
    try {
        const newUser = await createUsers( nombres, apellidos, celular, correo, discapacidad, genero );
        return newUser
    } catch (error) {
        console.log(error)
        throw { error: error.message }
    }
};

// Gets
const getUsersControllers = async ( { name } ) => {
    try {
        const response = name ? await getUsersByName( name ) : await getUsers();
        return response
    } catch (error) {
        console.log(error)
        throw { error: error.message }
    }
};
const getUsersByIdControllers = async ( { id } ) => {
    try {
        const response = await getUsersById( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const getUsersInactControllers = async () => {
    try {
        const response = await getUsersInact();
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const getUsersInactByIdControllers = async ( { id } ) => {
    try {
        const response = await getUsersById( id );
        return response 
    } catch (error) {
        throw { error: error.message }
    }
};

// Puts
const putUsersControllers = async ( { id } ) => {
    const { nombres, apellidos, celular, correo, discapacidad, genero } = req.body;
    try {
        const response = await putUsers( id, nombres, apellidos, celular, correo, discapacidad, genero );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};
const putStateControllers = async ( { id } ) => {
    const { estado } = req.body;
    try {
        const response = await putState( id, estado );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};

// Delete
const deleteUsersControllers = async ( { id } ) => {
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