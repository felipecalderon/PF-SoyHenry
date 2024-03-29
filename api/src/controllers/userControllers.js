const {
    createUsers,
    getUsers,
    getUsersById,
    getUsersByName,
    deleteUsers,
    getUsersInact,
    getUsersInactById,
    putState,
    putUsers,
    getUsersByEmail,
    pqrsUser
} = require('../handlers/handlerUserModels') 

const createUsersController = async (body) => {
    // Trae los datos de req.body destructurado en la fn
    try {
        const newUser = await createUsers(body);
        return newUser
    } catch (error) {
        throw error
    }
};

// Gets
const getUsersControllers = async ( { name, email } ) => {
    try {
        const response = name ? await getUsersByName( name ) : email? await getUsersByEmail(email) : await getUsers()  ;
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

const getUsersInactByIdControllers = async (  id  ) => {
    try {
        const response = await getUsersById( id );
        return response 
    } catch (error) {
        throw { error: error.message }
    }
};

// Puts
const putUsersControllers = async ( id, body ) => {
    try {
        const response = await putUsers( id, body );
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
        throw error
    }
};

// PQRS
const pqrsControllers = async ( body ) => {
    try {
        const response = await pqrsUser( body );
        return response
    } catch (error) {
        throw error
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
    deleteUsersControllers,
    pqrsControllers
}