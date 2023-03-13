const { 
    createUsers, 
    getUsersByName, 
    getUsers,
    getUsersById,
    getUsersInact,
    putState,
    putUsers,
    deleteUsers, 
} = require("../handlers/usersHandlers");

// Post
const createUsersController = async ( req, res ) => {
    // Trae los datos del cuepo de la req.
    const { nombres, apellidos, celular, correo, discapacidad, genero } = req.body;
    try {
        const newUser = await createUsers( nombres, apellidos, celular, correo, discapacidad, genero );
        res.status( 201 ).json( newUser );
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
    }
};

// Gets
const getUsersControllers = async ( req, res ) => {
    const { name } = req.query;
    try {
        const response = name ? await getUsersByName( name ) : await getUsers();
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 404 ).json({ error: error.message });
    }
};
const getUsersByIdControllers = async ( req, res ) => {
    const { id } = req.params;
    try {
        const response = await getUsersById( id );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 404 ).json({ error: error.message });
    }
};
const getUsersInactControllers = async ( req, res ) => {
    try {
        const response = await getUsersInact();
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 404 ).json({ error: error.message });
    }
};
const getUsersInactByIdControllers = async ( req, res ) => {
    const { id } = req.params;
    try {
        const response = await getUsersById( id );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 404 ).json({ error: error.message });
    }
};

// Puts
const putUsersControllers = async ( req, res ) => {
    const { id } = req.params;
    const { nombres, apellidos, celular, correo, discapacidad, genero } = req.body;
    try {
        const response = await putUsers( id, nombres, apellidos, celular, correo, discapacidad, genero );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 400 ).json({ error: error.message })
    }
};
const putStateControllers = async ( req, res ) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const response = await putState( id, estado );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
    }
};

// Delete
const deleteUsersControllers = async ( req, res ) => {
    const { id } = req.params;
    try {
        const response = await deleteUsers( id );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
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