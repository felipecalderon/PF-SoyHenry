require('dotenv').config()
const session = require('supertest-session');
const express = require('express');
const app = express()
const agent = session(app); //VIVE AQUI SOLO PARA HACER CORRER TESTS

app.get('/', (req, res) => {
    return res.json({msje: 'en home'})
})

app.listen(3001, () => {
    console.log('API ACTIVADA')
})

module.exports = {agent};