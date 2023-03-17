require('dotenv').config()
const express = require('express');
const app = express()
const route = require('./routes/')
const sequelize = require('./database')
const cors = require('cors')
const passport = require('passport')
const { loginRouter } = require ('./auth/github');

// middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
sequelize.sync({ force: true })

app.use(route)
app.use(passport.initialize())
// app.use('/auth', loginRouter)

// inicio de server
app.listen(3001, () => {
    console.log('API ACTIVADA')
})

module.exports = { app };