const { Router } = require("express");
const { 
    createUsersController, 
    getUsersControllers, 
    getUsersInactControllers, 
    putUsersControllers, 
    putStateControllers, 
    deleteUsersControllers,
    getUsersInactByIdControllers,
    getUsersByIdControllers,
} = require("../controllers/usersControllers");

const usersRoute = Router();

// Post
usersRoute.post( '/auth/register', createUsersController );

// Gets
usersRoute.get( '/auth/register', getUsersControllers );
usersRoute.get( '/:id', getUsersByIdControllers );
usersRoute.get( '/inact', getUsersInactControllers );
usersRoute.get( '/inact/:id', getUsersInactByIdControllers );

// Puts
usersRoute.put( '/:id', putUsersControllers );
usersRoute.put( '/ld/:id', putStateControllers );

// Delete
usersRoute.delete( '/:id', deleteUsersControllers );

module.exports = usersRoute;