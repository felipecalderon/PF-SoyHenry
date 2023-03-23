require('dotenv').config()
const express = require('express');
const app = express()
const route = require('./routes/')
const sequelize = require('./database')
const cors = require('cors')
const passport = require('passport')
const axios = require('axios')
const morgan = require('morgan');


axios.defaults.baseURL = 'https://www.getonbrd.com';
const port = process.env.PORT || 3001
// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: '*',
    methods: '*'
  }))
sequelize.sync({ force: true })

app.use(route)
app.use(passport.initialize())

// inicio de server
app.listen(port, () => {
    console.log('API ACTIVADA EN PUERTO ', port)
})

module.exports = { app };