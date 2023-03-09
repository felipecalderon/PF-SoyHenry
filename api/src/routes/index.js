//ACA IMPORTAN Y SE DEFINEN LAS RUTAS
const { Router } = require('express')
const { allUsers } = require('./userRoute')

const route = Router()

route.get('/users', allUsers)

module.exports = route
