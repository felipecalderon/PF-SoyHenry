//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { allUsers } = require('./userRoute')
const { homeRoute, companiesRoute } = require('./homeRoute')

const route = Router()

route.get('/users', allUsers)
route.get('/home' , homeRoute)
route.get('/company/:id', companiesRoute)

module.exports = route
