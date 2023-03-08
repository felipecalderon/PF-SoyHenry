require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    return res.json({msje: 'en home'})
})

app.listen(3001, () => {
    console.log('API ACTIVADA')
})
