//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { allUsers } = require('./userRoute')
const { homeRoute } = require('./homeRoute')

const route = Router()

route.get('/users', allUsers)
route.get('/home' , homeRoute)

module.exports = route
