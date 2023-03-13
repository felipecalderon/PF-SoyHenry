//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express');
const { homeRoute } = require('./homeRoute');
const usersRoute = require('./usersRoute');

const route = Router()

route.use('/users', usersRoute);
route.get('/home' , homeRoute);

module.exports = route;
