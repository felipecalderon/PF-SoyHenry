require('dotenv').config()
const express = require('express');
const app = express()
const route = require('./routes/')

//middlewares
app.use(express.json())

app.use(route)
app.listen(3001, () => {
    console.log('API ACTIVADA')
})

module.exports = { app };