const mercadopago = require('mercadopago');

const {MP_TOKEN} = process.env

mercadopago.configure({
    access_token: MP_TOKEN
  });

module.exports = {mercadopago}