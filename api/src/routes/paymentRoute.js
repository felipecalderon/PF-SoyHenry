const { Router } = require("express");


const { ACCESS_TOKEN } = process.env;

const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: "TEST-6211791135239272-032209-8b75c12f0a4574ac7c53cdd51f4daeef-492187591",//secret key de mercado pago..
});

const paymentSub = async (req, res) => {
    const {name,price} = req.body;
    
    const items = {
      title:name,
      unit_price: price,
      quantity: 1,
      currency_id: "ARS",
    };
  
    let preference = {
      items:[items] ,
      
      back_urls: {
        success: "http://localhost:3001/succes",//esta a modo de prueba sino rompe
        failure: "",
        pending: "",
      },
      
      auto_return: "approved",
     
      payed:true,
    };
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response.body.init_point);
        res.send(response.body.init_point);
        console.log("succes");
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  module.exports={paymentSub}