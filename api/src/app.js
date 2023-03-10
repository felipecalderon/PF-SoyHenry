require('dotenv').config()
const express = require('express');
const app = express()
const route = require('./routes/')
const sequelize = require('./database')
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(cors())
sequelize.sync({ force: true })

app.use(route)

// inicio de server
app.listen(3001, () => {
    console.log('API ACTIVADA')
})

module.exports = { app };