//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require("express");
const { allUsers, createUser } = require("./userRoute");
const { homeRoute, companiesRoute } = require("./homeRoute");

const route = Router();

// route.get('/user', allUsers)
// route.post('/user', createUser)
// route.get('/jobs' , homeRoute)
// route.get('/company/:id', companiesRoute)

module.exports = route;
